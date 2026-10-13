/**
 * 微雪博客 · Algolia Crawler Editor 配置（中文分词优化版）
 * ===========================================================================
 * 用法：Algolia Crawler Dashboard → 你的 Crawler → Editor →
 *      用本文件整体替换原配置 → Save → Restart crawl。
 *
 * 重要：initialIndexSettings 只在索引「第一次」爬取时生效。tinysnowio 这个索引
 *      已经存在，所以光改这里不会改线上设置，必须额外去 Dashboard 手动改设置
 *      （或删掉索引重爬）。详细步骤见同目录 README.md。
 *
 * 相对原配置的改动：
 *   1. 打开中文语种支持：indexLanguages / queryLanguages = ['zh','en']。
 *      这是 Algolia 在 CJK 文本里启用「按词切分（词典分词）」的开关，
 *      原配置完全没设，引擎因此退化成「按单字顺序匹配」。
 *   2. 额外写一份按词切好的可搜索属性 hierarchy_words / content_words，
 *      用 Intl.Segmenter（ICU 中文词典，和 Algolia 引擎同一套 CJK 数据）分词。
 *      原来的 hierarchy / content 继续保留可搜索，因此无论引擎是否按词切分，
 *      两种查询方式都有路可走，不会把搜索改坏。
 *   3. 抽取范围收窄到 <main>，并修掉原配置里几个失效的坑：
 *        - 原配置删的是 #sidebar / #menu-bar，本主题里根本没有这两个 id
 *          （本主题叫 #mdbook-sidebar / #mdbook-menu-bar），等于没删；
 *        - 正文选择器里的 span / a / em / strong / ul / ol 会让同一句话被抽
 *          3~4 遍，且完全抓不到表格（本站 114 个页面有 <table>）。
 *   4. 跳过 print.html（整本书合订本，19MB）/ toc.html / 404.html。
 */

/* ============================ 1. 开关 ============================ */
const OPTIONS = {
  // 中文预分词：额外写一份「按词」的属性
  //   true  = 索引里同时有「按词」和「按字」两套 token，两种查询都能命中（推荐）
  //   false = 只保留原来的按字索引（等价于原配置的检索行为）
  preSegment: true,
  // 分词副本最多保留多少字符，防止单条记录超过 Algolia 的大小上限（默认 10KB/条）
  segmentMaxChars: 3000,
  // 把图片 alt 文本并入正文（本站 30 个页面有带 alt 的图片，原来完全搜不到）
  indexImageAlt: true,
  // 超过该字节数的页面直接跳过
  maxPageBytes: 4 * 1024 * 1024,
  // 这些路径不是文章内容
  skipPaths: ['/print.html', '/toc.html', '/404.html'],
};

/* ========================= 2. 中文分词 ========================= */
const LEVELS = ['lvl0', 'lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'];
const HAS_CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;

// Intl.Segmenter 在 Node 16+/现代浏览器里都可用；取不到就退化为不分词（不影响爬取）
const zhSegmenter = (() => {
  try {
    if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
      return new Intl.Segmenter('zh-Hans', { granularity: 'word' });
    }
  } catch (e) {
    /* 环境不支持，走不分词分支 */
  }
  return null;
})();

/**
 * 把一段文本切成「词 + 空格」：<br>
 *   重装系统 8->7  →  重装 系统 8 7
 * 不含中文的文本原样返回（英文单词、代码、URL 不动）。
 */
function segmentZh(input) {
  const text = String(input == null ? '' : input);
  if (!zhSegmenter || !HAS_CJK.test(text)) return text;
  const words = [];
  for (const part of zhSegmenter.segment(text)) {
    if (part.isWordLike) words.push(part.segment);
  }
  return words.join(' ');
}

function segmentRecordField(value) {
  if (!value) return null;
  const text = String(value);
  const segmented = segmentZh(text);
  return segmented.length > OPTIONS.segmentMaxChars
    ? segmented.slice(0, OPTIONS.segmentMaxChars)
    : segmented;
}

/* ====================== 3. 可搜索属性顺序 ====================== */
// 「按词」的副本放前面：Algolia 的 attribute 排序准则优先看靠前的属性，
// 因此按词命中的记录会排在只按字命中的记录前面。
const searchableAttributes = [];
if (OPTIONS.preSegment) {
  LEVELS.forEach((lvl) => searchableAttributes.push(`unordered(hierarchy_words.${lvl})`));
  searchableAttributes.push('content_words');
}
// 原来的按字属性保留兜底：万一某次查询没被分词，也还能命中
LEVELS.forEach((lvl) => searchableAttributes.push(`unordered(hierarchy.${lvl})`));
searchableAttributes.push('content');

/* ============================ 4. 配置 ============================ */
new Crawler({
  rateLimit: 8,
  maxDepth: 10,
  maxUrls: 5000,
  startUrls: ['https://tinysnow.github.io'],
  renderJavaScript: false,
  sitemaps: [],
  ignoreCanonicalTo: false,
  discoveryPatterns: [
    'https://tinysnow.github.io/**',
    // 不再抓合订本和目录页（print.html 是整本书，19MB）
    '!https://tinysnow.github.io/print.html',
    '!https://tinysnow.github.io/toc.html',
    '!https://tinysnow.github.io/404.html',
  ],
  schedule: 'at 13:14 on Tuesday',
  actions: [
    {
      indexName: 'tinysnowio',
      pathsToMatch: [
        'https://tinysnow.github.io/**',
        '!https://tinysnow.github.io/print.html',
        '!https://tinysnow.github.io/toc.html',
        '!https://tinysnow.github.io/404.html',
      ],
      recordExtractor: ({ url, $, contentLength, helpers }) => {
        // ---- 跳过非文章页 / 超大页 ----
        if (OPTIONS.skipPaths.indexOf(url.pathname) !== -1) return [];
        if (contentLength && contentLength > OPTIONS.maxPageBytes) return [];

        // ---- 图片 alt 并入正文 ----
        // mdBook 里很多图片 alt 只有文件名，过滤掉没有信息量的
        if (OPTIONS.indexImageAlt) {
          $('main img[alt]').each((_, el) => {
            const alt = ($(el).attr('alt') || '').trim();
            if (!/[\u4e00-\u9fffA-Za-z]{2,}/.test(alt)) return;
            const safe = alt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            $(el).after(`<p>${safe}</p>`);
          });
        }

        // ---- 抽取记录 ----
        const records = helpers.docsearch({
          recordProps: {
            // 故意不用站点标题 h1.menu-title：否则「微雪」会命中每一个页面。
            // 保持原配置的 defaultValue，也让 lvl0 不影响检索。
            lvl0: {
              selectors: '',
              defaultValue: '博客',
            },
            // 页面标题 = <main> 里的 h1，避免菜单栏的 h1.menu-title 混进来
            lvl1: ['main h1', '#mdbook-content h1'],
            lvl2: ['main h2', '#mdbook-content h2'],
            lvl3: ['main h3', '#mdbook-content h3'],
            lvl4: ['main h4', '#mdbook-content h4'],
            lvl5: ['main h5', '#mdbook-content h5'],
            lvl6: ['main h6', '#mdbook-content h6'],
            // 正文：只取 <main> 里的块级元素。
            // 去掉了 span/a/em/strong/ul/ol（会造成同一句话重复抽取），
            // 补上 td/th（表格）与 dd/dt。
            content: [
              'main p, main li, main td, main th, main code, main dd, main dt',
              '#mdbook-content p, #mdbook-content li, #mdbook-content td, #mdbook-content th, #mdbook-content code, #mdbook-content dd, #mdbook-content dt',
            ],
          },
          aggregateContent: true,
          indexHeadings: true,
          recordVersion: 'v3',
        });

        // ---- 补语言 + 写一份按词切分的副本 ----
        records.forEach((record) => {
          record.lang = 'zh-CN';
          if (!OPTIONS.preSegment) return;

          if (record.content) {
            record.content_words = segmentRecordField(record.content);
          }

          const hierarchy = record.hierarchy || {};
          const hierarchyWords = {};
          LEVELS.forEach((lvl) => {
            const value = hierarchy[lvl];
            if (value) hierarchyWords[lvl] = segmentRecordField(value);
          });
          record.hierarchy_words = hierarchyWords;
        });

        return records;
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
      ],
      attributesToHighlight: ['hierarchy', 'content'],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'content'],
      // 由上方计算得到：按词副本在前，按字原文在后
      searchableAttributes: searchableAttributes,
      distinct: true,
      attributeForDistinct: 'url',
      customRanking: ['desc(weight.pageRank)', 'desc(weight.level)', 'asc(weight.position)'],
      ranking: ['words', 'filters', 'typo', 'attribute', 'proximity', 'exact', 'custom'],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      // ↓↓↓ 本次新增：中文按词切分的开关（原配置完全没有这两项）
      indexLanguages: ['zh', 'en'],
      queryLanguages: ['zh', 'en'],
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional',
    },
  },
  appId: 'GX9RTL51BH',
  // 保持你现有 Crawler 的 apiKey；不要把这个 key 提交进公开仓库
  apiKey: 'PlaceHolder',
});
