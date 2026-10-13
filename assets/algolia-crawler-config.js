new Crawler({
  // ⚠️ 三条硬性兼容要求（改动前请先看 assets/algolia-crawler.md 第三节）：
  //   1. 第 1 行必须就是 new Crawler({，前面不能有注释或代码（algolia/docsearch#2190）
  //   2. 不用模板字符串
  //   3. 配置内部不写嵌套函数/回调：编辑器的静态检查解析不了嵌套作用域里的
  //      参数绑定，会把回调参数报成未定义标识符（曾把 .each((_, el) => ...) 的
  //      el 标红）。所以下面全部用普通下标循环 + 直筒代码，没有闭包。
  appId: 'GX9RTL51BH',
  // 保持你现有 Crawler 的 apiKey（不要把这个可写 key 提交进公开仓库）
  apiKey: 'PlaceHolder',
  rateLimit: 8,
  maxDepth: 10,
  maxUrls: 5000,
  startUrls: ['https://tinysnow.github.io'],
  renderJavaScript: false,
  sitemaps: [],
  ignoreCanonicalTo: false,
  // 排除非文章页：print.html 是整本书合订本（19MB），toc.html / 404.html 也不是内容。
  // 用它能拦掉下载，比只在 recordExtractor 里 return [] 更省流量。
  exclusionPatterns: [
    'https://tinysnow.github.io/print.html',
    'https://tinysnow.github.io/toc.html',
    'https://tinysnow.github.io/404.html',
  ],
  discoveryPatterns: ['https://tinysnow.github.io/**'],
  schedule: 'at 13:14 on Tuesday',
  actions: [
    {
      indexName: 'tinysnowio',
      pathsToMatch: ['https://tinysnow.github.io/**'],
      recordExtractor: ({ url, $, contentLength, helpers }) => {
        /* ============================ 开关 ============================ */
        const SKIP_PATHS = ['/print.html', '/toc.html', '/404.html'];
        const MAX_PAGE_BYTES = 4 * 1024 * 1024;    // 超过这个体积的页面跳过
        const INDEX_IMAGE_ALT = true;              // 把图片 alt 并入正文
        const PRE_SEGMENT = true;                  // 额外写一份「按词」的属性
        const SEGMENT_MAX_CHARS = 3000;            // 分词副本截断长度
        const MAX_RECORDS_PER_PAGE = 700;          // 爬虫单页硬上限是 750
        const MERGE_MAX_CHARS = 1200;
        const LEVELS = ['lvl0', 'lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'];
        const HAS_CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;

        // 中文分词器：ICU 词典，与 Algolia 引擎声称使用的 CJK 词典同源。
        // 环境不支持 Intl.Segmenter 时退化为不分词，不影响爬取。
        let segmenter = null;
        try {
          if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
            segmenter = new Intl.Segmenter('zh-Hans', { granularity: 'word' });
          }
        } catch (e) { /* 忽略：走不分词分支 */ }

        /* ========================== 跳过规则 ========================== */
        if (SKIP_PATHS.indexOf(url.pathname) !== -1) return [];
        if (contentLength && contentLength > MAX_PAGE_BYTES) return [];
        // 抽取主体不存在就直接跳过，避免抽出菜单栏之类的垃圾
        if ($('main').length === 0 && $('#mdbook-content').length === 0) return [];

        /* ======================= 图片 alt 并入正文 ======================= */
        // 用下标循环，不用回调，避免嵌套作用域
        if (INDEX_IMAGE_ALT) {
          const images = $('main img[alt]');
          for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const alt = ($(image).attr('alt') || '').trim();
            // 只保留有信息量的 alt：含连续中文，或含连续英文且不像文件名。
            // 实测本站 114 个去重 alt 里有 21 个是 image-20260531144550242、
            // Snipaste_2023-10-22 这类文件名，靠下面这行挡掉。
            const meaningful =
              /[\u4e00-\u9fff]{2,}/.test(alt) ||
              (/[A-Za-z]{2,}/.test(alt) && !/[_0-9]/.test(alt));
            if (!meaningful) continue;
            const safe = alt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            $(image).after('<p>' + safe + '</p>');
          }
        }

        /* =========================== 抽取记录 =========================== */
        const records = helpers.docsearch({
          recordProps: {
            // 故意不用站点标题 h1.menu-title：否则「微雪」会命中每一个页面
            lvl0: {
              selectors: '',
              defaultValue: '博客',
            },
            // 页面标题 = <main> 里的 h1，避免菜单栏的 h1.menu-title 混进来
            lvl1: ['main h1', '#mdbook-content h1', 'head > title'],
            lvl2: ['main h2', '#mdbook-content h2'],
            lvl3: ['main h3', '#mdbook-content h3'],
            lvl4: ['main h4', '#mdbook-content h4'],
            lvl5: ['main h5', '#mdbook-content h5'],
            lvl6: ['main h6', '#mdbook-content h6'],
            // 正文：只取 <main> 里的块级元素。去掉了 span/a/em/strong/ul/ol
            // （同一句话会被抽 3~4 遍），补上 td/th（表格）与 dd/dt，
            // code 同时覆盖块级和行内代码。
            content: [
              'main p, main li, main td, main th, main code, main dd, main dt',
              '#mdbook-content p, #mdbook-content li, #mdbook-content td, #mdbook-content th, #mdbook-content code, #mdbook-content dd, #mdbook-content dt',
            ],
            // 语言交给 helper 写进每条记录
            lang: { defaultValue: 'zh-CN' },
          },
          aggregateContent: true,
          indexHeadings: true,
          recordVersion: 'v3',
        });

        /* ================== 单页记录数保护（内联，无函数）================== */
        // 爬虫单页超过 750 条记录会直接报 Extractors returned too many records。
        // 超过阈值时把「同一锚点、类型为 content」的相邻记录合并，标题原样保留；
        // 在副本上合并，不改动 helper 返回的原对象。
        let finalRecords = records;
        if (records.length > MAX_RECORDS_PER_PAGE) {
          const packed = [];
          let pending = null;
          for (let i = 0; i < records.length; i++) {
            const record = records[i];
            const isContent = record.type === 'content' && typeof record.content === 'string';
            const canMerge =
              pending &&
              isContent &&
              pending.url === record.url &&
              pending.content.length + record.content.length < MERGE_MAX_CHARS;
            if (canMerge) {
              pending.content += '\n' + record.content;
              continue;
            }
            if (pending) packed.push(pending);
            if (isContent) {
              pending = Object.assign({}, record);
            } else {
              pending = null;
              packed.push(record);
            }
          }
          if (pending) packed.push(pending);
          finalRecords = packed;
        }

        /* ================ 写一份按词切分的副本（内联，无函数）================ */
        // 先把所有要分词的文本收集起来，统一分词后再写回，
        // 这样正文和各级标题共用同一段逻辑，且不需要定义函数。
        if (PRE_SEGMENT) {
          const texts = [];
          const targets = [];
          for (let i = 0; i < finalRecords.length; i++) {
            const record = finalRecords[i];
            if (record.content) {
              texts.push(String(record.content));
              targets.push([i, '']);
            }
            const hierarchy = record.hierarchy || {};
            for (let j = 0; j < LEVELS.length; j++) {
              if (hierarchy[LEVELS[j]]) {
                texts.push(String(hierarchy[LEVELS[j]]));
                targets.push([i, LEVELS[j]]);
              }
            }
          }

          const segmented = [];
          for (let i = 0; i < texts.length; i++) {
            const text = texts[i];
            let result = text;
            if (segmenter && HAS_CJK.test(text)) {
              // 只保留词元，用空格连接：重装系统 8->7 → 重装 系统 8 7
              const parts = Array.from(segmenter.segment(text));
              const words = [];
              for (let k = 0; k < parts.length; k++) {
                if (parts[k].isWordLike) words.push(parts[k].segment);
              }
              result = words.join(' ');
              if (result.length > SEGMENT_MAX_CHARS) result = result.slice(0, SEGMENT_MAX_CHARS);
            }
            segmented.push(result);
          }

          for (let i = 0; i < finalRecords.length; i++) {
            finalRecords[i].hierarchy_words = {};
          }
          for (let i = 0; i < targets.length; i++) {
            const record = finalRecords[targets[i][0]];
            const level = targets[i][1];
            if (level) {
              record.hierarchy_words[level] = segmented[i];
            } else {
              record.content_words = segmented[i];
            }
          }
        }

        return finalRecords;
      },
    },
  ],
  safetyChecks: { beforeIndexPublishing: { maxLostRecordsPercentage: 100 } },
  initialIndexSettings: {
    tinysnowio: {
      attributesForFaceting: ['type', 'lang'],
      attributesToRetrieve: [
        'hierarchy',
        'content',
        'anchor',
        'url',
        'url_without_anchor',
        'type',
        'lang',
      ],
      attributesToHighlight: ['hierarchy', 'content'],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'content'],
      // 前 8 项是按词切分的副本（优先命中），后 8 项是按字的原文（兜底）。
      // 若把上面的 PRE_SEGMENT 改成 false，请删掉前 8 项。
      searchableAttributes: [
        'unordered(hierarchy_words.lvl0)',
        'unordered(hierarchy_words.lvl1)',
        'unordered(hierarchy_words.lvl2)',
        'unordered(hierarchy_words.lvl3)',
        'unordered(hierarchy_words.lvl4)',
        'unordered(hierarchy_words.lvl5)',
        'unordered(hierarchy_words.lvl6)',
        'content_words',
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy.lvl4)',
        'unordered(hierarchy.lvl5)',
        'unordered(hierarchy.lvl6)',
        'content',
      ],
      distinct: true,
      // 按「页面」去重：同一篇文章只出一条命中，避免单页刷屏
      // （原配置是 'url'，含锚点，等于按段落去重）
      attributeForDistinct: 'url_without_anchor',
      customRanking: ['desc(weight.pageRank)', 'desc(weight.level)', 'asc(weight.position)'],
      ranking: ['words', 'filters', 'typo', 'attribute', 'proximity', 'exact', 'custom'],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      // 中文按词切分的开关（原配置完全没有这两项）
      indexLanguages: ['zh', 'en'],
      queryLanguages: ['zh', 'en'],
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional',
    },
  },
});
