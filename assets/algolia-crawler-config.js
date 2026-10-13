new Crawler({
  // ⚠️ 本文件第 1 行必须就是 new Crawler({：Crawler 编辑器不接受前面有任何
  //    注释或代码（algolia/docsearch#2190），否则报 invalid configuration。
  //    因此所有常量、函数都写在 recordExtractor 内部，配置是自包含的。
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
  // 这里能拦掉下载，比只在 recordExtractor 里 return [] 更省流量。
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
        // 这些页面直接跳过（exclusionPatterns 已经拦了下载，这里再兜一层）
        const SKIP_PATHS = ['/print.html', '/toc.html', '/404.html'];
        // 超过这个字节数的页面跳过
        const MAX_PAGE_BYTES = 4 * 1024 * 1024;
        // 把图片 alt 文本并入正文（本站 30 个页面有带 alt 的图片）
        const INDEX_IMAGE_ALT = true;
        // 额外写一份「按词」的可搜索属性 content_words / hierarchy_words。
        // 改成 false 时需要同步删掉索引设置里 *_words 那 8 项 searchableAttributes。
        const PRE_SEGMENT = true;
        // 分词副本的截断长度，防止单条记录超过 Algolia 的大小上限
        const SEGMENT_MAX_CHARS = 3000;
        // 单页记录数保护：爬虫单页超过 750 条会直接报错，这里提前合并
        const MAX_RECORDS_PER_PAGE = 700;
        const MERGE_MAX_CHARS = 1200;

        /* ==================== 中文分词（ICU 词典）==================== */
        // 与 Algolia 引擎声称使用的 CJK 词典是同一套 ICU 数据；
        // 环境不支持 Intl.Segmenter 时退化为不分词，不影响爬取。
        const segmenter = (function () {
          try {
            if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
              return new Intl.Segmenter('zh-Hans', { granularity: 'word' });
            }
          } catch (e) { /* 忽略 */ }
          return null;
        })();
        const HAS_CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;

        // 把一段文本切成「词 + 空格」：重装系统 8->7 → 重装 系统 8 7
        // 不含中文的文本原样返回（英文、代码、URL 不动）
        function segmentField(value) {
          if (!value) return null;
          const text = String(value);
          if (!segmenter || !HAS_CJK.test(text)) return text;
          const parts = Array.from(segmenter.segment(text));
          const words = [];
          for (let i = 0; i < parts.length; i++) {
            if (parts[i].isWordLike) words.push(parts[i].segment);
          }
          const joined = words.join(' ');
          return joined.length > SEGMENT_MAX_CHARS ? joined.slice(0, SEGMENT_MAX_CHARS) : joined;
        }

        // 单页记录数保护：超过阈值时把「同一锚点、类型为 content」的相邻记录合并，
        // 标题等其它记录原样保留；在副本上合并，不改动 helper 返回的原对象。
        function packLargePage(records) {
          if (records.length <= MAX_RECORDS_PER_PAGE) return records;
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
          return packed;
        }

        /* ========================== 跳过规则 ========================== */
        if (SKIP_PATHS.indexOf(url.pathname) !== -1) return [];
        if (contentLength && contentLength > MAX_PAGE_BYTES) return [];
        // 抽取主体不存在就直接跳过，避免抽出菜单栏之类的垃圾
        if ($('main').length === 0 && $('#mdbook-content').length === 0) return [];

        /* ======================= 图片 alt 并入正文 ======================= */
        if (INDEX_IMAGE_ALT) {
          $('main img[alt]').each(function (index, el) {
            const alt = ($(el).attr('alt') || '').trim();
            // 很多图片 alt 只有文件名，过滤掉没有信息量的
            if (!/[\u4e00-\u9fffA-Za-z]{2,}/.test(alt)) return;
            const safe = alt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            $(el).after('<p>' + safe + '</p>');
          });
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

        // 先做记录数保护，再写按词切分的副本，保证副本与最终正文一致
        const finalRecords = packLargePage(records);

        if (PRE_SEGMENT) {
          finalRecords.forEach((record) => {
            if (record.content) {
              record.content_words = segmentField(record.content);
            }
            const hierarchy = record.hierarchy || {};
            const hierarchyWords = {};
            const levels = ['lvl0', 'lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'];
            for (let i = 0; i < levels.length; i++) {
              const value = hierarchy[levels[i]];
              if (value) hierarchyWords[levels[i]] = segmentField(value);
            }
            record.hierarchy_words = hierarchyWords;
          });
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
      // 前 8 项是按词切分的副本（优先），后 8 项是按字的原文（兜底）。
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
