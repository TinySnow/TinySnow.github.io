# Algolia DocSearch（tinysnowio）：中文分词与爬虫配置

这两份文件放在 `assets/` 下，不参与 mdBook 构建，也不会部署到站点：

- [`algolia-crawler-config.js`](./algolia-crawler-config.js)：替换 Algolia Crawler Editor 里的全部内容。

---

## 一、结论：不是「没爬到」，是「按字索引」

我直接用线上索引（`GX9RTL51BH` / `tinysnowio`，`index.hbs` 里的 search-only key）做了实测，可以确定问题出在分词，而不是爬虫漏抓：

| 实测 | 结果 | 说明 |
| --- | --- | --- |
| 索引规模 | 42,148 条记录 / 21,072 个 url / 约 2,360 个页面 | 覆盖率没问题，内容都在 |
| 索引设置 | **没有 `indexLanguages`，也没有 `queryLanguages`** | 中文语种支持从未打开 |
| `重装系统` 的查询分词 | `_rankingInfo.words = 4`，`matchedWords: ["重","装","系","统"]` | 查询被切成 **4 个单字**，不是「重装 / 系统」两个词 |
| 查询时临时加 `queryLanguages: ["zh"]` | 仍然是 `words = 4`，高亮结果完全一样 | 现索引下加这一项**不生效** |
| 顺序敏感性 | `重装` 172 条 vs `装重` 472 条 | 引擎是按**单字顺序**匹配，不是词级匹配 |
| 精确短语排名 | 取 52 个页面正文里 12 个连续汉字做查询：**14 个排第 1，37 个进前 20，15 个连前 20 都进不去**（其中有的 `nbHits` 高达 221） | 这就是你体感「搜不出来」的真实形态 |
| 召回 | 44/44 个随机短语至少有命中 | 召回没问题，**是相关性和排序崩了** |

一句话：中文被拆成单字后，"词"这个概念在索引里根本不存在——所以既没有词级匹配，`words` 排序准则也变成了「命中多少个字」，一个页面命中 4 个字和另一个页面命中 4 个字几乎同分，真正该排前面的页面就被淹了。

顺带实测到的其它问题：

- **抽取范围不对**：原配置删的是 `#sidebar` / `#menu-bar`，而你这套主题实际用的是 `#mdbook-sidebar` / `#mdbook-menu-bar`——删了个寂寞（不过静态 HTML 里侧边栏是空的，靠 JS 填充，所以没造成大灾难）。
- **重复抽取**：正文选择器把 `span` / `a` / `em` / `strong` / `ul` / `ol` 和 `p` / `li` 混在一起，同一句话会被抽 3～4 遍。
- **漏内容**：2,360 个页面里有 **114 个含 `<table>`**，`td` / `th` 完全不在选择器里，表格内容一个字都搜不到；另有 30 个页面有带 `alt` 的图片，也搜不到。
- **`print.html` 有 19MB**（整本书合订本），虽然实测没进索引，但每次爬取都要白抓一遍，且随时可能把 `maxUrls` / 记录大小撑爆。

## 二、这次的改动（`algolia-crawler-config.js`）

1. **打开中文语种**：`indexLanguages` / `queryLanguages` 都设为 `["zh", "en"]`——这是 Algolia 在 CJK 文本里启用**词典分词**的开关。
2. **额外写一份「按词」的可搜索属性**：`hierarchy_words` / `content_words`，用 `Intl.Segmenter`（ICU 中文词典，与 Algolia 引擎声称使用的 CJK 词典是同一套 ICU 数据）分词，例如
   `重装系统 8->7` → `重装 系统 8 7`。
   **原来的 `hierarchy` / `content` 继续保留可搜索**，所以在「引擎自己按词切分」和「引擎仍然按字切分」两种情况下都不会把搜索改坏，只是多占一点索引存储。
3. **抽取范围收窄到 `<main>`**：删除选择器修正为 `main ...` / `#mdbook-content ...`，正文选择器改为 `p, li, td, th, code, dd, dt`（去掉会重复的内联元素，补上表格），标题改为 `main h1..h6`，并跳过图片 `alt` 里无信息量的文件名。
4. **保留 `toc.html` 作为全站发现入口**：站点静态 HTML 的首页只有 `print.html` / `last-updated.html` 两个站内链接、**没有任何 prev/next**，而 `toc.html` 里有 **2359 条站内链接**——它是全站唯一的「链接中枢」。所以 `toc.html` 列进 `startUrls` 保证一定被抓到（不依赖 iframe 能否被识别），再用 `pathsToMatch` 的 `!` 把它排除出索引：只发现链接、不产生记录。**实测教训：把它和另外两页一起丢进 `exclusionPatterns`，覆盖率会从 2360 个页面掉到 297 个**（只剩「生活碎笔」那条章节链，因为只有它的页面能从 `last-updated.html` 顺着 prev/next 走到）。
5. **不抓** `print.html`（19MB 合订本）/ `404.html`，用 `exclusionPatterns` 拦掉下载；页面体积再由 `recordExtractor` 里的 `contentLength` 兜底。
6. **故意不加站点的 sitemap**：`sitemap.xml` / `sitemap.txt` 的 2360 条 URL **全部不带 `.html`**（如 `/个人简介`），而 GitHub Pages 对 `/个人简介` 和 `/个人简介.html` **都直接返回 200、不是 301 跳转**（实测），加进去只会让每个页面被索引两份，配合按页面去重就是成对的重复结果。全站覆盖本来就能靠 `toc.html` + 站内链接拿满（改造前的旧索引就是这个覆盖率）。
7. **`attributeForDistinct` 从 `url` 改成 `url_without_anchor`**（按页面而不是按锚点去重）：同一篇文章只出一条命中，避免单页刷屏。实测「数据结构」这类词，前 20 条命中原本只落在 3~11 个页面上，改成页面级去重后最多能覆盖 20 个页面。这项**只能写进索引设置**（不能作为查询参数传，传了会 400）。
8. 其余设置（ranking、customRanking、weights、`removeWordsIfNoResults: allOptional`、`advancedSyntax`、`aggregateContent: true`）保持你原来的值。
9. **单页记录数保护网**：爬虫单页超过 750 条记录会直接报 `Extractors returned too many records`；超过 700 条时把同一锚点的正文块合并（先在副本上合并，不改动原记录；合并后重新计算按词副本）。按当前的段落级聚合抽取方式几乎不会触发，属于保险。

## 三、怎么用（第 2 步千万别省）

> ⚠️ **`initialIndexSettings` 只在索引「第一次」爬取时生效**（[官方文档](https://www.algolia.com/doc/tools/crawler/apis/configuration/initial-index-settings/)："only applied during the first crawl of an index"）。`tinysnowio` 已经存在，所以**光换 Editor 配置，线上设置一点都不会变**，`indexLanguages` 不会生效，预设的中文分词也就白写了。

> ⚠️ **Crawler 编辑器对配置有 3 条硬性要求**（都是实测踩出来的，改配置时请一并遵守）：
> 1. **`new Crawler(` 必须出现在第 1 行**，前面不能有任何注释或代码，否则报 `invalid configuration`（[algolia/docsearch#2190](https://github.com/algolia/docsearch/issues/2190)）。
> 2. **不要用模板字符串**（反引号），改用 `'<p>' + safe + '</p>'` 这样的拼接。
> 3. **配置里不要出现嵌套函数 / 回调**。编辑器的静态检查解析不了嵌套作用域里的参数绑定，会把回调参数报成未定义标识符——实测就是对 `$('main img[alt]').each((_, el) => {...})` 里的 **`el`** 标红。
>
> 因此 `algolia-crawler-config.js` 里所有逻辑都写成 `recordExtractor` 内部的**直筒代码 + 下标循环**：没有闭包，没有 `.each()` / `.forEach()` 回调，也没有抽出来的公共函数（这就是它看起来有点长、有点重复的原因）。**整份文件就是一条 `new Crawler({...})` 表达式，请从第 1 行开始原样粘贴**，不要在前面加注释头。

> 💡 编辑器有时会提示「add a sitemap」，**这里故意不采纳**：你线上的 `sitemap.xml` 有 2360 条 URL，但**全部是不带 `.html` 的**（如 `/个人简介`），而爬虫顺着页面链接发现的是 `.html` 版本。加进去会让每个页面以两种 URL 各索引一份，配合按页面去重就是成对的重复结果。站点的 2360 个页面本来就能通过链接全部覆盖（实测抽样 60 个页面的标题，索引里都有记录）。

**第 1 步**：Algolia Crawler Dashboard → 你的 Crawler → **Editor** → 用 [`algolia-crawler-config.js`](./algolia-crawler-config.js) 整体替换（从第 1 行开始，不要在前面加东西）→ 末尾的 `apiKey` 改回你原来的值（文件里是 `PlaceHolder`，避免把可写 key 提交进公开仓库）→ Save。

**第 2 步（建议先做，不碰索引）：用编辑器里的 URL Tester 验一次新配置**。Crawler → Editor 页面自带 URL Tester，填 1~2 个真实页面 URL 跑一下，确认：没有报错、抽出来的记录里有 `content_words` / `hierarchy_words`、`content` 里不再有重复句子。

**第 3 步：应用索引设置。** 注意：**Algolia Dashboard 的索引设置页是分区表单，没有给索引设置用的 JSON 编辑器**（找不到是正常的）。三条路任选一条：

- **A（最省事，推荐）：删掉索引再重爬。** Dashboard → **Search** → 选索引 `tinysnowio` → **Manage index > Delete**（输入 `DELETE` 确认）→ 回到 Crawler 点 **Restart crawl**。索引被重新创建时就算它的「第一次爬取」，`initialIndexSettings` 会整套自动套用，不必手改任何一项。代价是爬完之前站内搜索是空的；不用担心旧记录残留——官方文档写明[配置改动之后爬虫不再发条件请求](https://www.algolia.com/doc/tools/crawler/apis/configuration/cache/)，会自动全量重抓、重新抽取。
- **B（不想删索引，手动改）**：Dashboard → **Search** → 索引 `tinysnowio` → **Configuration**，改这三处后 Save：
  1. **Language** → Query Languages（有 Index Languages 就一并）选上 Chinese / English；
  2. **Searchable attributes** → 按顺序加下面 JSON 里那 16 项（顺序不能乱，attribute 排序准则按先后顺序：前 8 项是按词副本，后 8 项是原文），每项都开 `unordered`；
  3. **Distinct** → 开启，Attribute for distinct 填 `url_without_anchor`（这项在 Configuration 里通常归在 ranking 相关分区，实在找不到就走 A 或 C）。
- **C（用脚本直接调 API）**：本目录已备好 [`apply-algolia-settings.mjs`](./apply-algolia-settings.mjs)，它从爬虫配置里读出设置再 `PUT` 到索引（设置只有一份来源，不会两边不一致）：

  ```bash
  node assets/apply-algolia-settings.mjs --dry-run                       # 先看要写入的 JSON
  node assets/apply-algolia-settings.mjs --key <带 editSettings 的 Key>   # 真正写入
  ```

  需要 `editSettings` 权限的 key（Dashboard → API Keys）。写操作必须走 `{appId}.algolia.net`，`-dsn` 那个主机是只读的——脚本已经处理好了。

  下面就是脚本会写入的内容（`--dry-run` 打印的同一份）：

  ```json
  {
    "indexLanguages": ["zh", "en"],
    "queryLanguages": ["zh", "en"],
    "distinct": true,
    "attributeForDistinct": "url_without_anchor",
    "searchableAttributes": [
      "unordered(hierarchy_words.lvl0)",
      "unordered(hierarchy_words.lvl1)",
      "unordered(hierarchy_words.lvl2)",
      "unordered(hierarchy_words.lvl3)",
      "unordered(hierarchy_words.lvl4)",
      "unordered(hierarchy_words.lvl5)",
      "unordered(hierarchy_words.lvl6)",
      "content_words",
      "unordered(hierarchy.lvl0)",
      "unordered(hierarchy.lvl1)",
      "unordered(hierarchy.lvl2)",
      "unordered(hierarchy.lvl3)",
      "unordered(hierarchy.lvl4)",
      "unordered(hierarchy.lvl5)",
      "unordered(hierarchy.lvl6)",
      "content"
    ]
  }
  ```

**第 4 步**：Restart crawl（建议先看一次完整爬取日志，确认没有大面积报错再确认发布）。

## 四、怎么验证分词真的生效了

**先确认覆盖率没掉**：查一次空查询（`{"query":"","hitsPerPage":0}`，索引现在是按页面去重的），`nbHits` 应该接近 **2360**。如果只有几百，说明全站发现入口又出问题了——先看 `startUrls` 里有没有 `toc.html`、`exclusionPatterns` 里是不是又把它排除了。

然后再看分词。用同一个 search-only key 分别查这两个词，看 `_rankingInfo.words`（数字 = 查询被切成了几个 token）：

| 查询 | 分词生效（按词） | 分词没生效（按字，即现状） |
| --- | --- | --- |
| `重装系统` | `words = 2`（重装 / 系统） | `words = 4` |
| `重装 系统`（中间一个空格） | `words = 2`，`nbHits > 0` | `nbHits` 与不空格时明显不同 / 为 0 |

- 如果 `重装系统` 的 `words` 变成 2：引擎自己就能按词切分，问题在这一层已经解决，后续只需要做第二阶段的展示/分页。
- 如果仍然是 4，但 `重装 系统`（带空格）能命中：说明**索引里的按词属性是活的**，只是查询侧还没分词——这正好是第二阶段客户端要补的一环（把用户输入也按词切开再发给 Algolia）。

要的话把爬取结果告诉我，我可以直接用你现在这个 key 跑一遍上面的对照，给出结论。

## 五、回退

- 只想去掉预分词：把配置顶部 `OPTIONS.preSegment` 改成 `false`，`searchableAttributes` 会自动退回原来那 8 项（其余不受影响）。
- 想让同一篇文章的多个小节都出现在结果里：把索引设置里的 `attributeForDistinct` 改回 `url`（含锚点，等于按段落去重）。
- 只想恢复原行为：把本目录文件换回旧配置；索引设置按第 2 步把 `indexLanguages` / `queryLanguages` 删掉即可。

## 六、第二阶段：结果展示与分页（已实现）

### 之前的问题（实测 `@docsearch/js@3.9.0` 源码）

- `docsearch()` **每次查询只发 1 个请求**，且写死 `hitsPerPage: 20` → 第 21 条以后的命中根本没从 Algolia 取回来；界面上那个 `nbHits` 是全库统计，不是能看到的条数。
- 取回后客户端再按 `maxResultsPerGroup`（**默认 5**）切片，而且外层按 lvl0、内层按 lvl1 各切一次 → 「只展示前几个」。
- 它**没有任何分页 / 加载更多**，`docsearch()` 返回 `void`，拿不到内部实例，无法从外部驱动翻页。

### 现在的实现

| 文件 | 改动 |
| --- | --- |
| `theme/customized/search.js` | **新增**。用 `@algolia/autocomplete-js@1.19.12` 自建下拉面板 |
| `theme/index.hbs` | CDN 依赖固定版本，并在 `additional-js` **之前**同步加载；删掉旧的 `docsearch({...})` 初始化 |
| `book.toml` | `additional-js` 增加 `theme/customized/search.js` |
| `theme/customized/style.css` | 面板样式，以及 ayu/navy/coal 暗色主题下的配色 |

面板行为：

- **每页 20 条，底部「加载更多（已显示 X / 共 Y 条）」逐页追加**，可以一直翻到最后一页（`search.js` 顶部的 `perPage` 可调）。
- 顶部显示「共 N 条命中」，不再出现「明明很多命中却只看到 5 条」。
- 每条命中展示：页面标题 + 层级路径（lvl2 › lvl3 …）+ 带 `<mark>` 高亮的正文摘要，点按/回车直接跳到对应锚点。
- 查询直接走 Algolia 的 `POST /1/indexes/{index}/query`，**不引入 `algoliasearch` 客户端**，因此没有 v4（返回 `{results}`）与 v5（返回数组）的版本差异问题。
- `search.js` 顶部 `segmentQuery`（默认 `false`）：改成 `true` 后，查询会先按词切开再发给 Algolia，用于配合本次爬虫新写的 `content_words` / `hierarchy_words`。**等第四节验证完再打开**。
- 自建面板初始化失败时，会自动退回 DocSearch 弹窗（并把抓取条数从 20 提到 40、每组从 5 提到 20）。要强制用回 DocSearch，把 `search.js` 里的 `fallbackToDocSearch` 保持 `true` 并临时让 `window['@algolia/autocomplete-js']` 不可用即可；要彻底移除自建面板，从 `book.toml` 的 `additional-js` 里去掉 `theme/customized/search.js` 并恢复 `index.hbs` 里的 `docsearch({...})` 调用。

### 怎么验证（本地）

```bash
mdbook build          # 或 mdbook serve
```

然后打开任意页面，在菜单栏搜索框里输入中文，检查：

1. 面板顶部有「共 N 条命中」；
2. 列表一次 20 条，底部有「加载更多」，点它（或键盘上下选中后回车）会继续追加，且前面的结果不重复；
3. 中文词有黄色高亮标记；
4. 切换 mdBook 主题（Auto/Light/Rust/Coal/Navy/Ayu）后面板配色仍然正常。

改动只涉及主题文件，`mdbook build` 之后 `book/` 下会生成带哈希的新文件名（`search-xxxxxxxx.js`、`style-xxxxxxxx.css`），部署走原有的 GitHub Actions 流程即可。

## 七、与另一份 AI 生成配置的对比（留档）

后来另有一份 GPT 生成的爬虫配置。两边**核心诊断一致**——都要求打开 `indexLanguages` / `queryLanguages`、把抽取范围收窄到 `<main>`、补上 `td/th/dt/dd`、跳过 `print.html` / `toc.html` / `404.html`。其中有 4 处细节更好，已经吸收进本配置：

1. `lang` 改用 `recordProps.lang = { defaultValue: "zh-CN" }` 交给 helper 写入（比抽完再手写 `record.lang` 更正统），并把 `lang` 加进 `attributesToRetrieve`。
2. `lvl1` 增加 `head > title` 作为最后兜底。
3. 增加「`main` / `#mdbook-content` 都不存在就直接跳过」的判断。
4. 知道爬虫「单页 >750 条记录会报错」的硬上限，据此加了 `packLargePage` 保护网。

没有采纳的部分，以及对应的实测依据：

| GPT 配置的写法 | 实测 / 文档依据 | 结论 |
| --- | --- | --- |
| `distinct: false`，且删掉 `attributeForDistinct` | 在线上索引模拟该设置：`数据结构` 前 20 条命中 **20/20 全来自同一篇文章**，`读书` 10/20，`Docker` 7/20 | 不采纳，改为页面级去重（`url_without_anchor`） |
| `aggregateContent: false` + 自写打包逻辑 | 统计 2,360 个页面 `<main>` 下的 `p/li/td/th/pre/dt/dd` 共 13.6 万个，加 1.6 万条标题 ≈ 15 万条记录（现状索引 4.2 万条）；它那段 700 条阈值的打包代码只有 **5 个**页面会触发 | 不采纳，保留官方默认的 `aggregateContent: true`（文档明确推荐用它来减少记录数） |
| `removeWordsIfNoResults: "none"` | 长中文查询更容易变成 0 结果 | 不采纳，保留 `allOptional` |
| 把 `toc.html` 加进 `startUrls` | **这一条我当时判断错了**：站点静态 HTML 的首页只有 `print.html` / `last-updated.html` 两个站内链接、没有任何 prev/next，而 `toc.html` 有 2359 条站内链接，是全站唯一的发现入口。实测不抓它，覆盖率从 2360 个页面掉到 297 个 | **已改正并采纳**：`toc.html` 进 `startUrls`，再用 `pathsToMatch` 的 `!` 把它排除出索引（只发现链接、不产生记录） |
| `print.html` 只在校验层跳过 | 19MB 的合订本每次爬取仍会被下载 | 不采纳它的做法，改用 `exclusionPatterns` 拦掉下载 |
| 删掉 `advancedSyntax` / `attributeCriteriaComputedByMinProximity` / `ignorePlurals` | 无说明的行为变更 | 不采纳，保持原值 |
| 没有「按词」兜底属性 | 两份配置都还没验证 `indexLanguages` 是否真能让索引按词切分；只有本配置额外写了 `content_words` / `hierarchy_words` 这第二条路 | 保留兜底 |

**两份配置共同待验证的关键点**：重建索引后，查询 `重装系统` 的 `_rankingInfo.words` 是否从 4 变成 2（见第四节）。如果仍是 4 而 `重装 系统` 能命中，再把 `theme/customized/search.js` 里的 `segmentQuery` 打开。

