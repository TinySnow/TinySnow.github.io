# 最近更新 | Last Updated

## Prenote

> NOTICE: This content is presented as `git diff`.

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-13 19:08:03 CMT (UTC+8) | 9488ce649）

### Summary

- Generated at: `2026-10-13 19:08:03 CMT (UTC+8)`
- Base commit: `9488ce649`
- Diff source: `d70db98cdd6e88ecb9ba5cecf3c21fd8375447c5..9488ce649391189cb00f20e9c11283b2a5086999`
- Changed files: `4`
- Total lines: `+121 / -493`

### Commit Messages

- `9488ce64` 搜索：结果展示换回 DocSearch 默认外观，可见条数上限从 5 提到 100

  > - theme/customized/search.js 从「自建 autocomplete 面板」改为 DocSearch 初始化：
  >   外观完全交给 @docsearch/js（按钮 + 弹窗），查询清洗与「优先搜按词属性」改走
  >   官方 transformSearchClient 钩子注入
  > - 找到「只展示前几个」的真正根因：DocSearch 3.9 的分组键是
  >   hit._highlightResult.hierarchy.lvl0.value，而本站每条记录的 lvl0 都是「博客」，
  >   所以所有命中都落进同一个分组 → 可见条数 = maxResultsPerGroup（默认 5），
  >   hitsPerPage 只是抓取上限。现在两者都设成 100
  > - theme/index.hbs 只加载 @docsearch/css@3.9.0 + @docsearch/js@3.9.0，
  >   删掉 autocomplete-js 与 classic 主题的引用
  > - theme/customized/style.css 删除自建面板样式，回到原样
  > - README 第六节改写：记录分组键这个根因、当前实现，以及「曾经有一版真分页」的历史说明
  > - 验证：docsearch() 选项、中文清洗（怎么重装系统 → 重装 系统）、限定按词属性、
  >   参数保留、响应透传、0 命中自动回退、数组/空响应兼容


### Index

1. [assets/algolia-crawler.md](#f-1729175677-assets-algolia-crawler-md-203506374) `+17 / -28`
2. [theme/customized/search.js](#f-1729175677-theme-customized-search-js-2827483100) `+100 / -335`
3. [theme/customized/style.css](#f-1729175677-theme-customized-style-css-2110612380) `+0 / -120`
4. [theme/index.hbs](#f-1729175677-theme-index-hbs-1765250716) `+4 / -10`

### Diffs

<a id="f-1729175677-assets-algolia-crawler-md-203506374"></a>
#### assets/algolia-crawler.md

<details>
<summary><code>+17 / -28</code> Click to expand diff</summary>

~~~~~diff
diff --git a/assets/algolia-crawler.md b/assets/algolia-crawler.md
index 99509bce7..f960b3bd9 100644
--- a/assets/algolia-crawler.md
+++ b/assets/algolia-crawler.md
@@ -149,46 +149,35 @@
 - 想让同一篇文章的多个小节都出现在结果里：把索引设置里的 `attributeForDistinct` 改回 `url`（含锚点，等于按段落去重）。
 - 只想恢复原行为：把本目录文件换回旧配置；索引设置按第 2 步把 `indexLanguages` / `queryLanguages` 删掉即可。
 
-## 六、第二阶段：结果展示与分页（已实现）
+## 六、搜索结果展示（当前：DocSearch 默认外观）
 
-### 之前的问题（实测 `@docsearch/js@3.9.0` 源码）
+### 「看不到后面的命中」的真正原因
 
-- `docsearch()` **每次查询只发 1 个请求**，且写死 `hitsPerPage: 20` → 第 21 条以后的命中根本没从 Algolia 取回来；界面上那个 `nbHits` 是全库统计，不是能看到的条数。
-- 取回后客户端再按 `maxResultsPerGroup`（**默认 5**）切片，而且外层按 lvl0、内层按 lvl1 各切一次 → 「只展示前几个」。
-- 它**没有任何分页 / 加载更多**，`docsearch()` 返回 `void`，拿不到内部实例，无法从外部驱动翻页。
+`@docsearch/js@3.9.0` 源码实测：
+
+- 每次查询只发 1 个请求、`hitsPerPage: 20` → 第 21 条以后的命中根本没从 Algolia 取回来；
+- 取回后按 `maxResultsPerGroup`（**默认 5**）分组截断。关键在分组键：`groupBy(hits, removeHighlightTags, max)`，而 `removeHighlightTags` 取的是 `hit._highlightResult.hierarchy.lvl0.value` —— 本站每条记录的 lvl0 都是「博客」，**所有命中都落在同一个分组里**。也就是说**可见条数直接等于 `maxResultsPerGroup`**，`hitsPerPage` 只是抓取上限。原配置没设这一项 → 永远只显示 5 条。
+- 它没有任何分页，`docsearch()` 返回 `void`，拿不到内部实例。
 
 ### 现在的实现
 
 | 文件 | 改动 |
 | --- | --- |
-| `theme/customized/search.js` | **新增**。用 `@algolia/autocomplete-js@1.19.12` 自建下拉面板 |
-| `theme/index.hbs` | CDN 依赖固定版本，并在 `additional-js` **之前**同步加载；删掉旧的 `docsearch({...})` 初始化 |
-| `book.toml` | `additional-js` 增加 `theme/customized/search.js` |
-| `theme/customized/style.css` | 面板样式，以及 ayu/navy/coal 暗色主题下的配色 |
-
-面板行为：
-
-- **每页 20 条，底部「加载更多（已显示 X / 共 Y 条）」逐页追加**，可以一直翻到最后一页（`search.js` 顶部的 `perPage` 可调）。
-- 顶部显示「共 N 条命中」，不再出现「明明很多命中却只看到 5 条」。
-- 每条命中展示：页面标题 + 层级路径（lvl2 › lvl3 …）+ 带 `<mark>` 高亮的正文摘要，点按/回车直接跳到对应锚点。
-- 查询直接走 Algolia 的 `POST /1/indexes/{index}/query`，**不引入 `algoliasearch` 客户端**，因此没有 v4（返回 `{results}`）与 v5（返回数组）的版本差异问题。
-- `search.js` 顶部 `segmentQuery`（默认 `false`）：改成 `true` 后，查询会先按词切开再发给 Algolia，用于配合本次爬虫新写的 `content_words` / `hierarchy_words`。**等第四节验证完再打开**。
-- 自建面板初始化失败时，会自动退回 DocSearch 弹窗（并把抓取条数从 20 提到 40、每组从 5 提到 20）。要强制用回 DocSearch，把 `search.js` 里的 `fallbackToDocSearch` 保持 `true` 并临时让 `window['@algolia/autocomplete-js']` 不可用即可；要彻底移除自建面板，从 `book.toml` 的 `additional-js` 里去掉 `theme/customized/search.js` 并恢复 `index.hbs` 里的 `docsearch({...})` 调用。
+| `theme/customized/search.js` | DocSearch 初始化：`hitsPerPage: 100` + `maxResultsPerGroup: 100`（最多可见 100 条），并用官方 `transformSearchClient` 注入查询清洗与「优先搜按词属性」 |
+| `theme/index.hbs` | 只加载 `@docsearch/css@3.9.0` + `@docsearch/js@3.9.0`，删掉自建面板用的 autocomplete-js 与 classic 主题；脚本仍在 `additional-js` 之前同步加载 |
+| `theme/customized/style.css` | 自建面板的样式已删除，回到原样 |
+| `book.toml` | `additional-js` 仍是 `assets/custom.js` + `theme/customized/search.js` |
 
-### 怎么验证（本地）
+查询侧的两项改进都在 `search.js` 里，通过官方钩子注入，**不动外观**：
 
-```bash
-mdbook build          # 或 mdbook serve
-```
+1. **清洗中文虚词**：`怎么重装系统` → 实际发 `重装 系统`；
+2. **优先只搜按词属性**，一条都没命中时退回「原查询 + 全部属性」。
 
-然后打开任意页面，在菜单栏搜索框里输入中文，检查：
+改动只涉及主题文件，`mdbook build` 之后 `book/` 下会生成带哈希的新文件名，部署走原有的 GitHub Actions 流程。
 
-1. 面板顶部有「共 N 条命中」；
-2. 列表一次 20 条，底部有「加载更多」，点它（或键盘上下选中后回车）会继续追加，且前面的结果不重复；
-3. 中文词有黄色高亮标记；
-4. 切换 mdBook 主题（Auto/Light/Rust/Coal/Navy/Ayu）后面板配色仍然正常。
+### 历史说明：曾经有一版真正的分页
 
-改动只涉及主题文件，`mdbook build` 之后 `book/` 下会生成带哈希的新文件名（`search-xxxxxxxx.js`、`style-xxxxxxxx.css`），部署走原有的 GitHub Actions 流程即可。
+中间曾用 `@algolia/autocomplete-js` 自建过一版下拉面板，底部有「加载更多（已显示 X / 共 Y 条）」可以逐页翻到最后一页（那一版还专门修过 autocomplete 点 item 时先关面板导致不刷新的坑）。后来按需求换回 DocSearch 默认外观，它就不再被加载了——代码在 git 历史里（`9b26f4e0a` 之后的提交，文件 `theme/customized/search.js`）。如果以后想要「DocSearch 的外观 + 真正的分页」，需要手工复刻 DocSearch 的样式类与变量，工作量比现在这条路线大。
 
 ## 七、与另一份 AI 生成配置的对比（留档）
 

~~~~~

</details>

<a id="f-1729175677-theme-customized-search-js-2827483100"></a>
#### theme/customized/search.js

<details>
<summary><code>+100 / -335</code> Click to expand diff</summary>

~~~~~diff
diff --git a/theme/customized/search.js b/theme/customized/search.js
index ac5780e0c..090a9d5ec 100644
--- a/theme/customized/search.js
+++ b/theme/customized/search.js
@@ -1,17 +1,20 @@
 /* ===========================================================================
- * 微雪博客 · 自建 Algolia 搜索下拉面板
+ * 微雪博客 · DocSearch 初始化
  * ---------------------------------------------------------------------------
- * 为什么不用 @docsearch/js：
- *   DocSearch v3 每次查询只请求 hitsPerPage: 20 条，再在客户端按
- *   maxResultsPerGroup（默认 5）切片，且没有任何分页；命中再多也看不到后面。
- *   这里用 @algolia/autocomplete-js 自建下拉，支持「加载更多」逐页追加，
- *   可以一直翻到最后一页。
+ * UI 用 @docsearch/js 的**默认外观**（菜单栏搜索按钮 + 弹窗），
+ * 搜索质量的两项改进挂在 DocSearch 官方的 transformSearchClient 上：
  *
- * 依赖（见 theme/index.hbs，必须在 additional-js 之前引入）：
- *   https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js@1.19.12/dist/umd/index.production.js
- *   → window['@algolia/autocomplete-js']
- * 查询直接走 Algolia 的 POST /1/indexes/{index}/query，所以不需要再引入
- * algoliasearch 客户端，也就没有 v4（返回 {results}）与 v5（返回数组）的歧义。
+ *   1. 清洗中文虚词。这个引擎对中文是「按单字」处理的（实测把
+ *      indexLanguages/queryLanguages 设成 ["zh","en"] 并重建索引后，查
+ *      「重装系统」的 _rankingInfo.words 仍是 4），所以「怎么重装系统」会变成
+ *      6 个单字的 AND，正确页面因为没有「怎么」反而不满足；
+ *      清洗成「重装系统」后前三名正好是三篇重装系统文章。
+ *   2. 优先只搜「按词」属性（hierarchy_words.* / content_words.*）。
+ *      实测 52 条精确短语：只搜按词属性 top1=33、只搜按字属性 top1=15（=基线）；
+ *      若一条都没命中，自动退回「原查询 + 全部属性」。
+ *
+ * 依赖（见 theme/index.hbs，都在 additional-js 之前同步加载）：
+ *   @docsearch/css@3.9.0 + @docsearch/js@3.9.0
  * =========================================================================== */
 (function () {
     'use strict';
@@ -21,48 +24,38 @@
         apiKey: 'c4caea4202132489213a6c5366c9952d',
         indexName: 'tinysnowio',
         container: '#docsearch',
-        placeholder: '搜索 / Search',
 
-        /* 每次「加载更多」追加多少条 */
-        perPage: 20,
+        /* 一次抓多少条（DocSearch 默认 20，弹窗内可滚动） */
+        hitsPerPage: 100,
+        /* 每个分组最多渲染多少条。
+         * ⚠️ 这个值才是真正的「可见条数」上限：DocSearch 3.9 的分组键是
+         * hierarchy.lvl0（见 docsearch-react 的 groupBy/removeHighlightTags），
+         * 而本站每条记录的 lvl0 都是「博客」，所有命中都落在同一个分组里，
+         * 所以能把结果全部截断的只有 maxResultsPerGroup。
+         * 原配置没设它 → 用默认 5，这就是「明明很多命中却只看到几条」的根因。*/
+        maxResultsPerGroup: 100,
 
-        /* ---- 查询处理（都在客户端做）----
-         * 引擎对中文是「按单字」切分的：实测把 indexLanguages/queryLanguages 设成
-         * ["zh","en"] 并重建索引后依旧如此——查「重装系统」的 _rankingInfo.words
-         * 恒为 4（重/装/系/统），查询中间加空格也一样。于是：
-         *   1. cleanQuery：先把中文虚词去掉，否则「怎么重装系统」会变成 6 个单字的
-         *      AND，正确页面因为没有「怎么」反而不满足，前几条全是无关文章；
-         *      清洗成「重装系统」后前三名正好是三篇重装系统文章（实测）。
-         *   2. preferWordAttributes：优先只搜爬虫写的「按词」属性
-         *      （content_words / hierarchy_words）。实测 52 条精确短语：top1 从 15
-         *      涨到 33、进不了前 20 的从 14 降到 5；而只搜按字原文属性的成绩与基线
-         *      完全相同（拖后腿的是它）。若一条都没命中，会自动退回「原查询 + 全部属性」。 */
         cleanQuery: true,
         preferWordAttributes: true,
         wordAttributes: [
             'hierarchy_words.lvl0', 'hierarchy_words.lvl1', 'hierarchy_words.lvl2',
             'hierarchy_words.lvl3', 'hierarchy_words.lvl4', 'hierarchy_words.lvl5',
             'hierarchy_words.lvl6', 'content_words'
-        ],
-
-        /* 自建面板初始化失败时，退回 DocSearch 弹窗（每页条数已提高） */
-        fallbackToDocSearch: true
+        ]
     };
 
-    /* ===================== 中文查询分词 ===================== */
-    /* 与爬虫端 assets/algolia-crawler-config.js 使用同一套 ICU 规则，
-     * 保证查询和索引切出来的词一致。 */
+    /* ===================== 中文查询清洗 ===================== */
     var segmenter = (function () {
         try {
             if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
                 return new Intl.Segmenter('zh-Hans', { granularity: 'word' });
             }
-        } catch (e) { /* 环境不支持就不分词 */ }
+        } catch (e) { /* 环境不支持就不清洗 */ }
         return null;
     })();
     var HAS_CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;
 
-    /* 单字虚词：作为独立词出现时丢掉（不用正则，避免误伤「上海」里的「上」） */
+    /* 单字虚词：作为独立词出现时丢掉（不用正则替换字符，避免误伤「上海」的「上」） */
     var STOP_CHARS = '的了是在和与及也就都很更最又还只把被给对从到向着并而或但如果因为所以之其此该等';
     /* 多字虚词：ICU 会把它们切成一个词，按词整体丢掉 */
     var STOP_WORDS = {
@@ -75,7 +68,7 @@
         '时候': 1, '现在': 1, '开始': 1, '进行': 1, '关于': 1, '对于': 1, '由于': 1
     };
 
-    /* 把用户输入变成更容易命中的查询；不需要清洗时返回 null（表示按原样发送） */
+    /* 返回清洗后的查询；不需要清洗时返回 null（表示按原样发送） */
     function analyzeQuery(text) {
         if (!CONFIG.cleanQuery || !segmenter || !HAS_CJK.test(text)) {
             return null;
@@ -97,335 +90,107 @@
             words.push(word);
         }
         if (!words.length) {
-            return null;      // 全是虚词，别清洗，直接按原样查
+            return null;                     // 全是虚词，别清洗
         }
         var out = words.join(' ');
         return out === text ? null : out;
     }
 
-    /* ===================== Algolia 查询 ===================== */
-    function searchUrl() {
-        return 'https://' + CONFIG.appId + '-dsn.algolia.net/1/indexes/'
-            + encodeURIComponent(CONFIG.indexName) + '/query';
-    }
-
-    function fetchPage(query, page, useWordAttributes) {
-        var payload = {
-            query: query,
-            hitsPerPage: CONFIG.perPage,
-            page: page,
-            attributesToRetrieve: ['hierarchy', 'content', 'url', 'url_without_anchor', 'anchor', 'type'],
-            attributesToHighlight: ['hierarchy'],
-            attributesToSnippet: ['content:24'],
-            highlightPreTag: '<mark>',
-            highlightPostTag: '</mark>',
-            snippetEllipsisText: '…'
-        };
-        if (useWordAttributes && CONFIG.preferWordAttributes) {
-            payload.restrictSearchableAttributes = CONFIG.wordAttributes;
-        }
-        var init = {
-            method: 'POST',
-            headers: {
-                'X-Algolia-Application-Id': CONFIG.appId,
-                'X-Algolia-API-Key': CONFIG.apiKey,
-                'Content-Type': 'application/json'
-            },
-            body: JSON.stringify(payload)
-        };
-        if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
-            init.signal = AbortSignal.timeout(15000);
-        }
-        return fetch(searchUrl(), init).then(function (res) {
-            if (!res.ok) {
-                throw new Error('Algolia 返回 HTTP ' + res.status);
+    /* ===================== 请求包装 ===================== */
+    /* DocSearch 3.9 的请求是 v5 风格：{ indexName, query, hitsPerPage, ... } 参数在顶层，
+     * searchParameters 在最后展开（所以我们的 searchParameters 能覆盖它的默认值）。 */
+    function prepare(requests) {
+        var list = (requests && requests.requests) ? requests.requests : [];
+        var cleaned = [];
+        var original = [];
+        var changed = false;
+
+        for (var i = 0; i < list.length; i++) {
+            var req = list[i];
+            var rawQuery = String(req.query == null ? '' : req.query);
+            var sent = analyzeQuery(rawQuery) || rawQuery;
+
+            var next = {};
+            for (var key in req) {
+                if (Object.prototype.hasOwnProperty.call(req, key)) {
+                    next[key] = req[key];
+                }
             }
-            return res.json();
-        });
-    }
-
-    /* ===================== 分页状态 ===================== */
-    /* sent：实际发给 Algolia 的查询（可能是清洗过的）
-     * mode：'words' = 只搜按词属性；'all' = 搜全部属性
-     * refresh：autocomplete 的刷新函数，从 getItems 的参数里捕获，供「加载更多」调用 */
-    var store = { query: '', sent: '', mode: '', page: 0, hits: [], nbHits: 0, refresh: null, lastMoreAt: 0 };
-
-    function resetStore(query) {
-        store = {
-            query: query, sent: '', mode: '', page: 0, hits: [], nbHits: 0,
-            refresh: store.refresh, lastMoreAt: 0
-        };
-    }
-
-    function mergeHits(list) {
-        var seen = Object.create(null);
-        var merged = [];
-        list.forEach(function (hit) {
-            if (!hit || !hit.objectID || seen[hit.objectID]) {
-                return;
+            next.query = sent;
+            if (CONFIG.preferWordAttributes) {
+                next.restrictSearchableAttributes = CONFIG.wordAttributes;
+            }
+            cleaned.push(next);
+            original.push(req);
+            if (sent !== rawQuery) {
+                changed = true;
             }
-            seen[hit.objectID] = true;
-            merged.push(hit);
-        });
-        return merged;
-    }
-
-    /* ===================== 渲染 ===================== */
-    /* 优先用 Algolia 的高亮结果：它已经做过 HTML 转义，只额外插入 <mark>；
-     * 爬虫存进索引的层级文本本身也是实体转义过的，所以可以安全地当 HTML 用。 */
-    function levelHtml(item, level) {
-        var hl = item._highlightResult && item._highlightResult.hierarchy;
-        if (hl && hl[level] && hl[level].value) {
-            return hl[level].value;
         }
-        var raw = item.hierarchy && item.hierarchy[level];
-        return raw ? String(raw) : '';
-    }
 
-    function renderLoadMore(item, html) {
-        /* 这个「加载更多」行自己处理点击：
-         * autocomplete 的 item 点击路径会先执行 nextState:{isOpen:false}（关掉面板）
-         * 再调用 onSelect，如果不管它，新的一页就会渲染在已关闭的面板里。
-         * 这里在行内接管 click 并阻止冒泡——li 上的 onClick 不会触发，
-         * 面板保持打开，refresh() 出来的新一页就能正常显示。
-         * 键盘（上下键 + 回车）走不到 DOM click，由 onSelect 里的分支兜底。 */
-        return html`<div class="aa-ItemContent md-search-more"
-            onMouseDown=${stopEvent}
-            onClick=${onLoadMoreClick}>
-            <div class="aa-ItemContentBody">
-                <div class="aa-ItemContentTitle">加载更多（已显示 ${String(item.shown)} / 共 ${String(item.total)} 条）</div>
-            </div>
-        </div>`;
+        return {
+            requests: { requests: cleaned },
+            original: { requests: original },
+            /* 只有清洗过、或限定了属性时才值得回退重试 */
+            canFallback: changed || CONFIG.preferWordAttributes
+        };
     }
 
-    /* 阻止事件继续冒泡/默认行为（避免面板失焦、避免触发 autocomplete 的 item 点击处理） */
-    function stopEvent(event) {
-        if (!event) {
-            return;
-        }
-        if (typeof event.preventDefault === 'function') {
-            event.preventDefault();
-        }
-        if (typeof event.stopPropagation === 'function') {
-            event.stopPropagation();
+    function firstResult(response) {
+        if (!response) {
+            return null;
         }
-    }
-
-    function onLoadMoreClick(event) {
-        stopEvent(event);
-        loadMore();
-    }
-
-    /* 翻到下一页。
-     * 250ms 内的重复触发会被忽略：鼠标点击与 onSelect 有可能同时到达。 */
-    function loadMore() {
-        var now = Date.now();
-        if (store.lastMoreAt && now - store.lastMoreAt < 250) {
-            return;
+        if (Array.isArray(response)) {
+            return response[0] || null;
         }
-        store.lastMoreAt = now;
-        store.page = store.page + 1;
-        if (typeof store.refresh === 'function') {
-            store.refresh();
+        if (response.results && response.results.length) {
+            return response.results[0];
         }
+        return null;
     }
 
-    function renderNotice(text, html) {
-        return html`<div class="aa-ItemContent md-search-notice">
-            <div class="aa-ItemContentBody">
-                <div class="aa-ItemContentTitle">${text}</div>
-            </div>
-        </div>`;
-    }
-
-    function renderHit(item, html) {
-        var title = levelHtml(item, 'lvl1') || levelHtml(item, 'lvl0') || '(无标题)';
-        var path = [];
-        ['lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'].forEach(function (level) {
-            var value = levelHtml(item, level);
-            if (value) {
-                path.push(value);
+    function wrapSearchClient(searchClient) {
+        var wrapped = {};
+        for (var key in searchClient) {
+            if (Object.prototype.hasOwnProperty.call(searchClient, key)) {
+                wrapped[key] = searchClient[key];
             }
-        });
-        var snippet = item._snippetResult && item._snippetResult.content
-            && item._snippetResult.content.value;
-        var pathText = path.join(' › ');
-
-        return html`<a class="aa-ItemLink" href="${item.url}">
-            <div class="aa-ItemContent">
-                <div class="aa-ItemIcon aa-ItemIcon--noBorder md-search-icon">
-                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
-                </div>
-                <div class="aa-ItemContentBody">
-                    <div class="aa-ItemContentTitle" dangerouslySetInnerHTML=${ { __html: title } }></div>
-                    ${pathText ? html`<div class="aa-ItemContentDescription md-search-path" dangerouslySetInnerHTML=${ { __html: pathText } }></div>` : null}
-                    ${snippet ? html`<div class="aa-ItemContentDescription md-search-snippet" dangerouslySetInnerHTML=${ { __html: snippet } }></div>` : null}
-                </div>
-            </div>
-        </a>`;
-    }
-
-    /* ===================== 数据源 ===================== */
-    function buildSources(params) {
-        var query = (params.query || '').trim();
-        if (!query) {
-            return [];
         }
-        return [{
-            sourceId: 'tinysnowio',
-            getItems: function (params) {
-                if (params && typeof params.refresh === 'function') {
-                    store.refresh = params.refresh;
-                }
-                if (store.query !== query) {
-                    resetStore(query);
-                }
-                if (!store.sent) {
-                    store.sent = analyzeQuery(query) || query;   // 清洗虚词，返回 null 就用原查询
-                    store.mode = 'words';
-                }
-                var page = store.page;
-
-                function collect(data) {
-                    store.hits = mergeHits(store.hits.concat((data && data.hits) || []));
-                    if (data && typeof data.nbHits === 'number') {
-                        store.nbHits = data.nbHits;
-                    }
-                    var items = store.hits.slice();
-                    if (items.length > 0 && items.length < store.nbHits) {
-                        items.push({
-                            __loadMore: true,
-                            objectID: '__load_more__',
-                            shown: items.length,
-                            total: store.nbHits
-                        });
-                    }
-                    return items;
+        wrapped.search = function (requests) {
+            var prepared = prepare(requests);
+            return searchClient.search(prepared.requests).then(function (response) {
+                var first = firstResult(response);
+                if (prepared.canFallback && first && first.nbHits === 0) {
+                    /* 一条都没命中 → 退回「原查询 + 全部属性」，不牺牲召回 */
+                    return searchClient.search(prepared.original);
                 }
-
-                return fetchPage(store.sent, page, store.mode === 'words').then(function (data) {
-                    /* 查询已经变了，丢掉过期结果 */
-                    if (store.query !== query) {
-                        return [];
-                    }
-                    /* 只搜「按词」属性一条都没命中 → 退回「原查询 + 全部属性」再试一次 */
-                    if (page === 0 && store.mode === 'words' && data && data.nbHits === 0) {
-                        store.mode = 'all';
-                        store.sent = query;
-                        return fetchPage(query, 0, false).then(function (fallback) {
-                            if (store.query !== query) {
-                                return [];
-                            }
-                            return collect(fallback);
-                        });
-                    }
-                    return collect(data);
-                }).catch(function (err) {
-                    if (window.console && console.warn) {
-                        console.warn('[search] 查询失败：', err);
-                    }
-                    return [{ __notice: true, objectID: '__search_error__', text: '搜索服务暂时不可用，请稍后再试' }];
-                });
-            },
-            templates: {
-                header: function (props) {
-                    if (!store.nbHits) {
-                        return null;
-                    }
-                    return props.html`<div class="md-search-count">共 ${String(store.nbHits)} 条命中</div>`;
-                },
-                item: function (props) {
-                    var item = props.item;
-                    if (!item) {
-                        return null;
-                    }
-                    if (item.__loadMore) {
-                        return renderLoadMore(item, props.html);
-                    }
-                    if (item.__notice) {
-                        return renderNotice(item.text, props.html);
-                    }
-                    return renderHit(item, props.html);
-                },
-                noResults: function () {
-                    return '没有找到结果';
-                }
-            },
-            onSelect: function (p) {
-                var item = p.item || {};
-                if (p.event && typeof p.event.preventDefault === 'function') {
-                    p.event.preventDefault();
-                }
-                if (item.__loadMore) {
-                    /* 键盘选中时走这里：autocomplete 已经先把面板关掉了，要重新打开，
-                     * 否则刷新出来的下一页看不见（鼠标点击由行内 handler 接管）。 */
-                    if (typeof p.setIsOpen === 'function') {
-                        p.setIsOpen(true);
-                    }
-                    loadMore();
-                    return;
-                }
-                if (item.__notice) {
-                    return;
-                }
-                if (item.url) {
-                    window.location.href = item.url;
-                }
-            }
-        }];
+                return response;
+            });
+        };
+        return wrapped;
     }
 
     /* ===================== 启动 ===================== */
-    function mountDocSearchFallback() {
-        if (!CONFIG.fallbackToDocSearch || typeof window.docsearch !== 'function') {
-            return;
-        }
-        try {
-            window.docsearch({
-                appId: CONFIG.appId,
-                apiKey: CONFIG.apiKey,
-                indexName: CONFIG.indexName,
-                container: CONFIG.container,
-                debug: false,
-                /* DocSearch 的默认值：抓 20 条、每组只渲染 5 条。这里都提高。 */
-                searchParameters: { hitsPerPage: 40 },
-                maxResultsPerGroup: 20
-            });
-        } catch (e) {
+    function init() {
+        if (typeof window.docsearch !== 'function') {
             if (window.console && console.error) {
-                console.error('[search] DocSearch 兜底也失败了：', e);
+                console.error('[search] @docsearch/js 没加载成功，搜索按钮不会出现');
             }
-        }
-    }
-
-    function boot() {
-        var container = document.querySelector(CONFIG.container);
-        if (!container) {
             return;
         }
-        var AC = window['@algolia/autocomplete-js'];
-        if (!AC || typeof AC.autocomplete !== 'function' || typeof window.fetch !== 'function') {
-            mountDocSearchFallback();
-            return;
-        }
-        try {
-            AC.autocomplete({
-                container: container,
-                placeholder: CONFIG.placeholder,
-                openOnFocus: false,
-                getSources: buildSources
-            });
-        } catch (e) {
-            if (window.console && console.error) {
-                console.error('[search] 自建面板初始化失败，退回 DocSearch：', e);
-            }
-            mountDocSearchFallback();
-        }
+        window.docsearch({
+            appId: CONFIG.appId,
+            apiKey: CONFIG.apiKey,
+            indexName: CONFIG.indexName,
+            container: CONFIG.container,
+            maxResultsPerGroup: CONFIG.maxResultsPerGroup,
+            searchParameters: { hitsPerPage: CONFIG.hitsPerPage },
+            transformSearchClient: wrapSearchClient
+        });
     }
 
     if (document.readyState === 'loading') {
-        document.addEventListener('DOMContentLoaded', boot);
+        document.addEventListener('DOMContentLoaded', init);
     } else {
-        boot();
+        init();
     }
 })();

~~~~~

</details>

<a id="f-1729175677-theme-customized-style-css-2110612380"></a>
#### theme/customized/style.css

<details>
<summary><code>+0 / -120</code> Click to expand diff</summary>

~~~~~diff
diff --git a/theme/customized/style.css b/theme/customized/style.css
index 2edd368d9..351d2218b 100644
--- a/theme/customized/style.css
+++ b/theme/customized/style.css
@@ -102,123 +102,3 @@ code.editable, .ace_scroller {
 .chapter li .md-viewed {
     color: #777;
 }
-
-/* ===========================================================================
- * 自建搜索面板（逻辑见 theme/customized/search.js）
- * 搜索框占据菜单栏原有的 #docsearch 容器，下拉面板比搜索框宽，所以容器需要
- * position: relative 作为定位参照。
- * =========================================================================== */
-#docsearch {
-    position: relative;
-    align-self: center;
-    width: 210px;
-    margin-right: 6px;
-    z-index: 120;
-    /* classic 主题变量：面板高度、字号、层级 */
-    --aa-panel-max-height: min(70vh, 620px);
-    --aa-font-size: 1.4rem;
-    --aa-search-input-height: 30px;
-    --aa-base-z-index: 300;
-}
-
-#docsearch .aa-Autocomplete,
-#docsearch .aa-Form {
-    width: 100%;
-}
-
-#docsearch .aa-Form {
-    border-radius: 6px;
-    min-height: 30px;
-}
-
-#docsearch .aa-Input {
-    padding: 3px 6px;
-    height: 28px;
-}
-
-/* 面板贴合容器左边缘展开，并限制宽度避免在小屏溢出 */
-#docsearch .aa-Panel {
-    left: 0;
-    width: min(680px, calc(100vw - 32px));
-    border-radius: 8px;
-}
-
-#docsearch .md-search-count {
-    padding: 2px 4px 6px;
-    font-size: 1.2rem;
-    opacity: .65;
-}
-
-#docsearch .aa-ItemContentTitle {
-    font-size: 1.45rem;
-    line-height: 1.45;
-}
-
-#docsearch .md-search-path {
-    font-size: 1.2rem;
-    opacity: .7;
-}
-
-#docsearch .md-search-snippet {
-    display: -webkit-box;
-    -webkit-line-clamp: 2;
-    -webkit-box-orient: vertical;
-    overflow: hidden;
-    font-size: 1.25rem;
-    line-height: 1.5;
-}
-
-#docsearch .md-search-snippet mark,
-#docsearch .md-search-path mark,
-#docsearch .aa-ItemContentTitle mark {
-    background: rgba(255, 214, 0, .45);
-    color: inherit;
-    border-radius: 2px;
-    padding: 0 1px;
-}
-
-#docsearch .md-search-icon {
-    background: none;
-    box-shadow: none;
-}
-
-#docsearch .md-search-more,
-#docsearch .md-search-notice {
-    justify-content: center;
-    text-align: center;
-    color: var(--icons-hover, #7272ff);
-}
-
-#docsearch .md-search-more .aa-ItemContentTitle {
-    font-size: 1.3rem;
-    font-weight: 500;
-}
-
-/* 暗色主题：mdBook 用 html 上的 class 切主题，不是 prefers-color-scheme */
-html.ayu #docsearch,
-html.navy #docsearch,
-html.coal #docsearch {
-    --aa-text-color-rgb: 208, 208, 214;
-    --aa-background-color-rgb: 28, 31, 40;
-    --aa-input-background-color-rgb: 20, 22, 29;
-    --aa-primary-color-rgb: 158, 151, 255;
-    --aa-muted-color-rgb: 150, 150, 170;
-    --aa-icon-color-rgb: 170, 170, 200;
-    --aa-selected-color-rgb: 158, 151, 255;
-    --aa-selected-color-alpha: .28;
-    --aa-panel-border-color-rgb: 90, 94, 115;
-    --aa-input-border-color-rgb: 100, 104, 128;
-    --aa-description-highlight-background-color-rgb: 0, 255, 255;
-    --aa-description-highlight-background-color-alpha: .22;
-    --aa-scrollbar-track-background-color-rgb: 44, 46, 64;
-    --aa-panel-shadow: 0 0 0 1px rgba(120, 124, 150, .25), 0 8px 24px -6px rgba(0, 0, 0, .6);
-}
-
-@media only screen and (max-width: 700px) {
-    #docsearch {
-        width: 140px;
-    }
-    #docsearch .aa-Input {
-        font-size: 1.2rem;
-    }
-}
\ No newline at end of file

~~~~~

</details>

<a id="f-1729175677-theme-index-hbs-1765250716"></a>
#### theme/index.hbs

<details>
<summary><code>+4 / -10</code> Click to expand diff</summary>

~~~~~diff
diff --git a/theme/index.hbs b/theme/index.hbs
index 3ec4b8b5d..82f1fccac 100644
--- a/theme/index.hbs
+++ b/theme/index.hbs
@@ -67,13 +67,9 @@
           gtag('config', 'G-P9324YLFBW');
         </script>
 
-        <!-- Doc Search -->
-        <!-- 自建搜索面板用的 classic 主题，版本与下方 autocomplete-js 保持一致 -->
-        <link
-            rel="stylesheet"
-            href="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-theme-classic@1.19.12/dist/theme.min.css"
-        />
-        <!-- 仅在自建搜索面板初始化失败时，给 DocSearch 弹窗兜底用 -->
+        <!-- Doc Search：UI 用 DocSearch 默认外观（按钮 + 弹窗）
+             查询清洗与「优先搜按词属性」都在 theme/customized/search.js 里，走官方
+             transformSearchClient 注入，不碰它的外观 -->
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3.9.0/dist/style.css" />
         <link rel="preconnect" href="https://GX9RTL51BH-dsn.algolia.net" crossorigin />
         
@@ -443,9 +439,7 @@
         </script>
 
 
-        <!-- 搜索面板依赖：必须在 additional-js（theme/customized/search.js）之前同步加载 -->
-        <script src="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js@1.19.12/dist/umd/index.production.js"></script>
-        <!-- 仅作为自建面板初始化失败时的兜底 -->
+        <!-- DocSearch：必须在 additional-js（theme/customized/search.js）之前同步加载 -->
         <script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3.9.0/dist/umd/index.js"></script>
 
         <!-- Custom JS scripts -->

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->


<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-13 18:55:01 CMT (UTC+8) | d70db98cd）

### Summary

- Generated at: `2026-10-13 18:55:01 CMT (UTC+8)`
- Base commit: `d70db98cd`
- Diff source: `ad11627f86dab249725903d99e09598977d54c79..d70db98cdd6e88ecb9ba5cecf3c21fd8375447c5`
- Changed files: `1`
- Total lines: `+57 / -8`

### Commit Messages

- `d70db98c` 搜索：修复「加载更多」点不动——autocomplete 会先关面板再回调 onSelect

  > 从 @algolia/autocomplete-js@1.19.12 的真实包读出点击路径：
  >   (itemUrl ? resolve() : setState({ nextState: { isOpen: false } })).then(() => source.onSelect({...}))
  > 也就是点 item 时它先把面板关掉、再调用 onSelect，所以 refresh() 出来的下一页
  > 渲染在已关闭的面板里 —— 现象就是「点加载更多没反应」。我的 Node 测试只覆盖了
  > 数据层（手动调 getItems），没覆盖这条交互路径，所以漏了。
  >
  > 修复（两条路径都覆盖）：
  > - 鼠标：在「加载更多」行内挂 onClick/onMouseDown，preventDefault + stopPropagation，
  >   li 上的 autocomplete 处理不会触发 → 面板保持打开，refresh() 直接渲染新一页
  > - 键盘（↑↓ + 回车）：走 onSelect 分支，先 setIsOpen(true) 重新打开面板再 refresh()
  > - 250ms 去重：防止鼠标与 onSelect 同时到达导致一次跳两页
  > - store.refresh 从 getItems 的参数捕获（真实包里 getItems 确实收到 refresh）
  >
  > 验证（用真实 htm/preact 渲染出节点后模拟交互）：
  > - 鼠标点击：stopPropagation 生效、refresh 1 次、刷新后 40 条、请求 page=1
  > - 键盘：setIsOpen(true)、refresh 1 次
  > - 同步连点两次 / 点击+onSelect 双触发：都只翻一页
  > - 命中不足 20 条时不显示「加载更多」


### Index

1. [theme/customized/search.js](#f-3344729701-theme-customized-search-js-2827483100) `+57 / -8`

### Diffs

<a id="f-3344729701-theme-customized-search-js-2827483100"></a>
#### theme/customized/search.js

<details>
<summary><code>+57 / -8</code> Click to expand diff</summary>

~~~~~diff
diff --git a/theme/customized/search.js b/theme/customized/search.js
index c078aa98e..ac5780e0c 100644
--- a/theme/customized/search.js
+++ b/theme/customized/search.js
@@ -146,11 +146,15 @@
 
     /* ===================== 分页状态 ===================== */
     /* sent：实际发给 Algolia 的查询（可能是清洗过的）
-     * mode：'words' = 只搜按词属性；'all' = 搜全部属性 */
-    var store = { query: '', sent: '', mode: '', page: 0, hits: [], nbHits: 0 };
+     * mode：'words' = 只搜按词属性；'all' = 搜全部属性
+     * refresh：autocomplete 的刷新函数，从 getItems 的参数里捕获，供「加载更多」调用 */
+    var store = { query: '', sent: '', mode: '', page: 0, hits: [], nbHits: 0, refresh: null, lastMoreAt: 0 };
 
     function resetStore(query) {
-        store = { query: query, sent: '', mode: '', page: 0, hits: [], nbHits: 0 };
+        store = {
+            query: query, sent: '', mode: '', page: 0, hits: [], nbHits: 0,
+            refresh: store.refresh, lastMoreAt: 0
+        };
     }
 
     function mergeHits(list) {
@@ -179,13 +183,53 @@
     }
 
     function renderLoadMore(item, html) {
-        return html`<div class="aa-ItemContent md-search-more">
+        /* 这个「加载更多」行自己处理点击：
+         * autocomplete 的 item 点击路径会先执行 nextState:{isOpen:false}（关掉面板）
+         * 再调用 onSelect，如果不管它，新的一页就会渲染在已关闭的面板里。
+         * 这里在行内接管 click 并阻止冒泡——li 上的 onClick 不会触发，
+         * 面板保持打开，refresh() 出来的新一页就能正常显示。
+         * 键盘（上下键 + 回车）走不到 DOM click，由 onSelect 里的分支兜底。 */
+        return html`<div class="aa-ItemContent md-search-more"
+            onMouseDown=${stopEvent}
+            onClick=${onLoadMoreClick}>
             <div class="aa-ItemContentBody">
                 <div class="aa-ItemContentTitle">加载更多（已显示 ${String(item.shown)} / 共 ${String(item.total)} 条）</div>
             </div>
         </div>`;
     }
 
+    /* 阻止事件继续冒泡/默认行为（避免面板失焦、避免触发 autocomplete 的 item 点击处理） */
+    function stopEvent(event) {
+        if (!event) {
+            return;
+        }
+        if (typeof event.preventDefault === 'function') {
+            event.preventDefault();
+        }
+        if (typeof event.stopPropagation === 'function') {
+            event.stopPropagation();
+        }
+    }
+
+    function onLoadMoreClick(event) {
+        stopEvent(event);
+        loadMore();
+    }
+
+    /* 翻到下一页。
+     * 250ms 内的重复触发会被忽略：鼠标点击与 onSelect 有可能同时到达。 */
+    function loadMore() {
+        var now = Date.now();
+        if (store.lastMoreAt && now - store.lastMoreAt < 250) {
+            return;
+        }
+        store.lastMoreAt = now;
+        store.page = store.page + 1;
+        if (typeof store.refresh === 'function') {
+            store.refresh();
+        }
+    }
+
     function renderNotice(text, html) {
         return html`<div class="aa-ItemContent md-search-notice">
             <div class="aa-ItemContentBody">
@@ -229,7 +273,10 @@
         }
         return [{
             sourceId: 'tinysnowio',
-            getItems: function () {
+            getItems: function (params) {
+                if (params && typeof params.refresh === 'function') {
+                    store.refresh = params.refresh;
+                }
                 if (store.query !== query) {
                     resetStore(query);
                 }
@@ -310,10 +357,12 @@
                     p.event.preventDefault();
                 }
                 if (item.__loadMore) {
-                    store.page = store.page + 1;
-                    if (typeof p.refresh === 'function') {
-                        p.refresh();
+                    /* 键盘选中时走这里：autocomplete 已经先把面板关掉了，要重新打开，
+                     * 否则刷新出来的下一页看不见（鼠标点击由行内 handler 接管）。 */
+                    if (typeof p.setIsOpen === 'function') {
+                        p.setIsOpen(true);
                     }
+                    loadMore();
                     return;
                 }
                 if (item.__notice) {

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-13 18:01:41 CMT (UTC+8) | ad11627f8）

### Summary

- Generated at: `2026-10-13 18:01:41 CMT (UTC+8)`
- Base commit: `ad11627f8`
- Diff source: `cd8a93c3df320e6f57b56fd2ac7d0d809298b098..ad11627f86dab249725903d99e09598977d54c79`
- Changed files: `2`
- Total lines: `+24 / -0`

### Commit Messages

- `ad11627f` 每日一文：血钻 - 阿林·贝克

### Index

1. [src/SUMMARY.md](#f-3427183660-src-summary-md-3501257646) `+1 / -0`
2. [src/阅读/每日一文/血钻-阿林·贝克.md](#f-3427183660-src-阅读-每日一文-血钻-阿林-贝克-md-249991412) `+23 / -0`

### Diffs

<a id="f-3427183660-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+1 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index 28869369b..4132ddd35 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -1454,6 +1454,7 @@
     - [所有女生要知道](阅读/其他/书籍/所有女生要知道.md)
     - [意象的帝国：诗的写作课](阅读/其他/书籍/意象的帝国：诗的写作课.md)
 - [每日一文 | Daily Article](阅读/每日一文/每日一文.md)
+  - [血钻 - 阿林·贝克](阅读/每日一文/血钻-阿林·贝克.md)
   - [叙述爱的无穷种方式 - 维维阿娜](阅读/每日一文/叙述爱的无穷种方式-维维阿娜.md)
   - [分手唯一的真相 - 陆琪](阅读/每日一文/分手唯一的真相-陆琪.md)
   - [可以吃的纸 - 梁文道](阅读/每日一文/可以吃的纸-梁文道.md)

~~~~~

</details>

<a id="f-3427183660-src-阅读-每日一文-血钻-阿林-贝克-md-249991412"></a>
#### src/阅读/每日一文/血钻-阿林·贝克.md

<details>
<summary><code>+23 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\350\241\200\351\222\273-\351\230\277\346\236\227\302\267\350\264\235\345\205\213.md" "b/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\350\241\200\351\222\273-\351\230\277\346\236\227\302\267\350\264\235\345\205\213.md"
new file mode 100644
index 000000000..595c68378
--- /dev/null
+++ "b/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\350\241\200\351\222\273-\351\230\277\346\236\227\302\267\350\264\235\345\205\213.md"
@@ -0,0 +1,23 @@
+# 血钻
+
+*阿林·贝克*
+
+　　15 年来，全世界都在努力抵制血钻石，然而这个行业依然在冲突和神秘中挣扎。
+
+　　马克斯·罗德里格斯清楚地知道该怎样向长期交往的男朋友麦克·罗佩尔求婚：他已经预定好了假日酒店房间，并在谷歌地图上找到了一个僻静的花园，准备带罗佩尔到那里散步、看日落。他唯一担心的就是婚戒。罗德里格斯听说过钻石引发的冲突，也听说过开采钻石的工人所处的极度恶劣的劳动环境，他很忧虑。34 岁的罗德里格斯在纽约钻石城的瓦莱珠宝 12 层展厅里抚摸着一颗金色图章戒指说：“我不希望象征我们爱情的标志，与混乱、冲突和痛苦联系在一起。”
+
+　　15 岁的穆布依·姆万扎在刚果金西南部的矿上劳动，铲沙砾，筛选石块。钻石对他来说，意味着更紧迫的问题：吃上饭的机会。劳动艰苦，背痛缠身，但是和眼看着家人挨饿相比，这点苦算不了什么。他的父亲失明了，母亲在几年前抛弃了他们。他已经 3 个多月没找到钻石了，买食物和给爸爸买药欠下的债已经堆积如山。“一大块石头，可能生产出一克拉的钻石，我能赚 100 美元。”他说，这就足够让他回到学校上学了。他从 12 岁起辍学做矿工——小村庄里唯一可做的工作。为了生存，他们村的很多男孩也都早早辍学去做矿工了。
+
+　　河水蜿蜒流入刚果河，河岸边的红色沟壑是姆万扎所在的矿区——全世界最重要的宝石级钻石产区之一。但是奇卡帕的贫穷让人无法相信它的地下还埋藏着珍宝：那里没有一条路是铺好的，甚至没有飞机跑道；每年有几百个矿工因为隧道塌陷而死去，但根本无人报道，因为这样的事件太频发了。公立学校的教师管学生要钱，贴补自己微薄的薪水。很多家长最终选择让孩子辍学，到矿上工作。“我们只有这么做，才能混口饭吃，”姆万扎说，“没有多余的钱去念书。”
+
+　　姆万扎和罗德里格斯是这个年销售额 814 亿美元产业上的两个端点，一端连接着非洲矿区，全世界 65% 的钻石产地，另一端则是全世界高端珠宝商闪闪发光的展示厅。钻石开采行业早就应该得到规范管理，2000 年以来，曝光的血钻丑闻越来越多——从非洲战区开采的钻石，通常是强迫劳动所得，其收入用来资助武装反动活动。2003 年，钻石行业颁布了金伯利机制——审核钻石是否符合正当生产程序的国际证书制度。现在十几年过去，虽然金伯利国际证书机制减少了市场上不正当开采的钻石数量，但是它依然存在漏洞，无法阻止从非洲战区或是恶劣劳动环境下开采的钻石流向国际市场。正如姆万扎的案例一样，即便是在非战区开采钻石，工人也会面临恶劣的劳动环境，他们薪资微薄，有些工人甚至还是处于上学年龄的孩子。“简直耻辱，”奇卡帕矿业部门领导撒迦利亚·曼巴说，“我们有如此多的宝藏，但依然很贫穷。我能理解为什么你们美国人不愿意买我们的钻石。钻石带给我们的不是祝福，而是不幸。”
+
+　　由于钻石交易的肮脏现实，购买者通常会放弃购买，或者像罗德里格斯那样选择人造钻石。刚果矿业部门表示，钻石是刚果国家收入非常重要的来源——如果不是唯一来源的话——100 多万刚果矿工在小型矿区工作，他们用双手劳作，挖掘钻石，让这些钻石有一天变成准新娘或准新郎手指上的订婚戒指。“如果人们不买我们的钻石，我们就没饭吃，”姆万扎说，“更别提去上学了，这样对我们有什么好处么？”
+
+　　在供应链透明化的当下，出售 4 美元的拿铁，都要解释咖啡原料的产地，而钻石一类的奢侈品，更有必要证明产业的可持续性。金伯利机制为钻石合法交易做了一些努力，但是真正公平的交易体制，不仅应该抵制非法开采的钻石，还应该允许有良知的消费者购买钻石，帮助“姆万扎”们改进劳动和生活条件。现实的残酷在于，血钻丑闻被推到风口浪尖，人们却几乎没有办法完全确定一颗钻石是否染着非洲矿工的鲜血。
+
+　　非洲未加工钻石的销售收入曾用于资助安哥拉和塞拉利昂内战——2006 年电影《血钻》就反映了这一事件。金伯利进程会议于 2000 年在南非金伯利召开，世界主要钻石生产商和收购商聚集在一起，对血钻石引起的问题进行讨论。2003 年，53 个国家政府和国际组织承认和批准了金伯利机制，建立了钻石“通行证”制度，所有从钻石原产地出口的未加工钻石，都需要进行审核，不能证明钻石是合法开采的国家，将被取消国际钻石交易资格。
+
+　　金伯利机制因成为阻止钻石冲突的主要手段而广受赞誉。伊恩·斯迈利是金伯利机制的主要缔造者，也是鉴定冲突钻石的权威专家，他估算，现在只有 5% 到 10% 的钻石是非法交易的，而 2003 年，非法交易的比例是 25%，这样的变化让出产钻石的国家能够更好地利用自然资源，增加国家财富。
+
+　　但是斯迈利和其他批评者认为，仅依靠金伯利国际证书机制保障钻石交易合法还远远不够。金伯利国际证书机制对于冲突钻石的定义狭窄，很多消费者可以用常识判断为属于冲突钻石的情况，却并不包含在金伯利协议中，钻石贸易中仍然存在非法雇佣关系以及践踏人权但并没有被撤销交易资格的情况。金伯利协议中对冲突钻石的定义是“售卖宝石，以资助试图推翻国家政权的反叛活动”——仅仅如此。所以，2008 年津巴布韦军队占据了一个东部的钻石矿床，屠杀了 200 多个矿工，并不属于金伯利协议中的违规条款。“成千上万的津巴布韦矿工被屠杀、强奸、虐待、奴役，而根据金伯利协议，这并不属于冲突钻石，因为该行为没有‘反叛活动’这一条件。”斯迈利说。

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-13 17:49:46 CMT (UTC+8) | cd8a93c3d）

### Summary

- Generated at: `2026-10-13 17:49:46 CMT (UTC+8)`
- Base commit: `cd8a93c3d`
- Diff source: `59ca20519465f6023a60a0bc305e8539611ecd16..cd8a93c3df320e6f57b56fd2ac7d0d809298b098`
- Changed files: `8`
- Total lines: `+1386 / -97`

### Commit Messages

- `cd8a93c3` 搜索：没有 h1 的 23 个页面改由代码补标题，不再把 head > title 交给 helper
- `9b26f4e0` 搜索：查询侧改造（清虚词＋优先按词属性），并修掉 lvl1 被 head > title 污染

  > 全量重爬后（2342 页 / 31,959 条记录）的实测结论：
  >
  > - 引擎侧中文分词无解：indexLanguages/queryLanguages 设好并重建索引后，查「重装系统」的
  >   _rankingInfo.words 仍是 4、matchedWords 仍是单个汉字，查询中间加空格也一样；
  >   removeStopWords:["zh"] 同样没用（多字查询无影响，单字查询反而变成命中全部）
  > - 爬虫写的「按词」属性才是胜负手：52 条精确短语只搜按字属性 top1=15（=基线），
  >   只搜按词属性 top1=33、进不了前 20 的从 14 降到 5
  > - 自然语言查询被按字 AND 毁掉：把「怎么重装系统」清洗成「重装系统」后，
  >   前三条正好是三篇重装系统文章
  >
  > 前端 theme/customized/search.js：
  >
  > - cleanQuery：用 Intl.Segmenter 分词后丢掉中文虚词（词级 + 单字级两份表，
  >   不直接用正则替换字符，避免误伤「上海」里的「上」）
  > - preferWordAttributes：默认只搜 hierarchy_words / content_words 这 8 项，
  >   0 命中时自动退回「原查询 + 全部属性」
  > - 走真实客户端逻辑重跑那 52 条短语：top1=32 top5=43 top20=48 未进=4
  >   （改造前 15/25/38/14）
  > - 分页、回退分支、空查询、高亮都已用 Node 驱动真实 search.js 验证
  >
  > 爬虫配置 assets/algolia-crawler-config.js：
  >
  > - lvl1 去掉 'head > title'：DocSearch helper 会在所有候选选择器里取文档顺序最靠前的
  >   那个，<title> 永远排第一，导致 lvl1 全变成「重装系统 - 微雪博客」，
  >   连「微雪」「博客」都命中 2342/2342 个页面
  >
  > 文档 assets/algolia-crawler.md：第四节改为本轮实测结果，第七节更正对
  > head > title 与 toc.html 的两处误判，并记录按词属性、截断限制等已知事项

- `5f74165d` 搜索：修掉覆盖率塌陷（把 toc.html 当普通页面排除，掐掉了全站发现入口）

  > - 实测：站点静态 HTML 的首页只有 print.html / last-updated.html 两个站内链接、
  >   没有任何 prev/next；toc.html 里有 2359 条站内链接，是全站唯一的链接中枢
  > - 上一版把 toc.html 放进 exclusionPatterns，爬虫只能从 last-updated.html 进
  >   「生活碎笔」再顺着 prev/next 走完该章节：索引从 2360 个页面掉到 297 个
  >   （其中 290 个属于生活碎笔，与推断完全吻合）
  > - 修复：toc.html 进 startUrls（保证一定被发现）＋ pathsToMatch 用 ! 把它排除
  >   出索引（只发现链接、不产生记录）；exclusionPatterns 只保留 print.html / 404.html
  > - 明确不加站点 sitemap：sitemap.xml / sitemap.txt 的 2360 条 URL 全不带 .html，
  >   而 GitHub Pages 对 /个人简介 与 /个人简介.html 都直接返回 200（不是 301 跳转），
  >   加进去会让每个页面被索引两份
  > - README：更正第七节里对 GPT「toc.html 进 startUrls」的误判（那条其实是对的），
  >   第二节补上发现入口与 sitemap 的说明，第四节加覆盖率自检
  > - 已验证：第 1 行合规、无模板字符串、recordExtractor 内零嵌套函数/回调、
  >   单独序列化后仍能独立运行；附录代码块与配置文件逐字一致

- `192a207e` 搜索：补上直接应用索引设置的脚本，并更正「JSON 编辑器」的说法

  > - Algolia Dashboard 的索引设置页是分区表单，没有给索引设置用的 JSON 编辑器；
  >   之前 README 让用户去「Configuration → JSON 编辑器」粘贴，是错的
  > - 新增 assets/apply-algolia-settings.mjs：从 algolia-crawler-config.js 读出
  >   initialIndexSettings 再 PUT 到索引（设置只有一份来源，不会两边不一致）；
  >   支持 --dry-run 先看 JSON，写入后等 task 并回读核对
  > - 踩到并处理了两个坑：写操作必须走 {appId}.algolia.net（-dsn 是只读主机，
  >   用错会报 "This host is read-only"）；key 缺 editSettings 时 403，
  >   提示里给出「删索引重爬」这条退路
  > - README 第三节改成四步：URL Tester 先验配置 → 应用设置（A 删索引重爬 /
  >   B Dashboard 手动改三处 / C 脚本）→ Restart crawl，并补充「配置改动后爬虫
  >   不再发条件请求、会自动全量重抓」这一依据
  > - 实测：--dry-run 正常输出；用只读 search key 试写得到 403 与明确提示，
  >   未对线上索引做任何写操作

- `5ba72787` 搜索：Crawler 配置改为零嵌套函数（编辑器会把回调参数 el 报成未定义）

  > - 上一条提交只解决了 new Crawler 必须在第 1 行；编辑器仍把
  >   $('main img[alt]').each((_, el) => {...}) 里的 el 标红：它的静态检查
  >   解析不了嵌套作用域里的参数绑定
  > - 因此把 segmentField / packLargePage / .each() 回调 / forEach 回调全部拆掉，
  >   改成 recordExtractor 内部的直筒代码 + 下标循环；配置里只剩 recordExtractor
  >   一个函数，没有闭包、没有回调、没有模板字符串
  > - 分词逻辑改为「先收集待分词文本 → 统一分词 → 写回」，不定义函数也保持 DRY
  > - 图片 alt 过滤按实测收紧：本站 114 个去重 alt 里有 21 个是
  >   image-20260531144550242 / Snipaste_2023-10-22 这类文件名，原来会被放行
  > - 实测：第 1 行合规；无反引号；recordExtractor 内 => 仅 1 处、function 0 处、
  >   .each/.forEach 0 处；单独序列化后仍能独立运行；跳过规则命中；
  >   800 → 478 条合并、192552 字符零丢失、原对象未被改写
  > - assets/algolia-crawler.md 与《博客历史演进》附录同步

- `2d638b7e` 搜索：修掉 Crawler 编辑器的 invalid configuration（new Crawler 必须在第 1 行）

  > - 配置改成一条自包含的 new Crawler({...}) 表达式：第 1 行就是 new Crawler(，
  >   所有常量与函数移入 recordExtractor 内部。此前文件前面有 95 行注释与顶层声明，
  >   编辑器直接报 invalid configuration（见 algolia/docsearch#2190），标红位置
  >   恰好是它放弃解析处的第一个模板字符串
  > - 去掉全部模板字符串，改用字符串拼接
  > - 改用官方 exclusionPatterns 排除 print/toc/404：能拦掉下载，
  >   19MB 的 print.html 不会再被抓
  > - 故意不采纳编辑器的 add a sitemap 提示：线上 sitemap 的 2360 条 URL 全是不带
  >   .html 的（如 /个人简介），而爬虫顺着链接发现的是 .html 版本，加进去会让
  >   每个页面以两种 URL 各索引一份
  > - 实测：recordExtractor 单独序列化后仍可独立运行（无闭包依赖）；
  >   跳过规则、800 → 478 条合并、192552 字符零丢失、原对象未被改写 全部通过
  > - assets/algolia-crawler.md 与《博客历史演进》附录同步

- `aa799d6e` 搜索：吸收另一份配置的优点，distinct 改为按页面去重

  > - attributeForDistinct 从 url（含锚点）改为 url_without_anchor（按页面去重）：
  >   实测「数据结构」前 20 条命中原本只落在 5 个页面上，而 distinct:false 会让
  >   20/20 条全来自同一篇文章；页面级去重后最多能覆盖 20 个页面
  > - lang 改由 recordProps.lang 交给 helper 写入，lvl1 增加 head > title 兜底
  > - 增加「main / #mdbook-content 都不存在就跳过」判断
  > - 增加单页记录数保护网：超过 700 条时合并同锚点正文块（爬虫硬上限 750），
  >   合并在副本上进行，合并后重新计算按词副本；实测 800 → 480 条、字符零丢失
  > - 保留 aggregateContent: true、removeWordsIfNoResults: allOptional、advancedSyntax
  > - assets/algolia-crawler.md 增加与另一份 AI 生成配置的对比留档（含实测数据）
  > - 《博客历史演进》附录同步

- `9c5d98da` 搜索：Algolia 爬虫按词分词 + 自建结果面板支持加载更多

  > 爬虫（assets/algolia-crawler-config.js）：
  > - 打开中文语种 indexLanguages/queryLanguages，这是 Algolia 在 CJK 文本里启用词典分词的开关
  > - 额外写入按词切分的 content_words/hierarchy_words，原来的按字属性保留兜底
  > - 抽取范围收窄到 <main>，修正失效的 #sidebar/#menu-bar 选择器，补上表格 td/th
  > - 跳过 print.html（整本书合订本，19MB）/toc.html/404.html
  >
  > 前端（theme/customized/search.js）：
  > - 用 @algolia/autocomplete-js 自建下拉，每页 20 条 + 「加载更多」，顶部显示命中总数
  > - 查询直连 Algolia REST 接口，不引入 algoliasearch 客户端（避开 v4/v5 返回结构差异）
  > - DocSearch 退化为初始化失败时的兜底，并把每页条数从 20/5 提到 40/20
  >
  > 文档：assets/algolia-crawler.md 记录诊断数据与操作步骤；《博客历史演进》附录同步新配置


### Index

1. [assets/algolia-crawler-config.js](#f-383127424-assets-algolia-crawler-config-js-1386373420) `+289 / -0`
2. [assets/algolia-crawler.md](#f-383127424-assets-algolia-crawler-md-203506374) `+215 / -0`
3. [assets/apply-algolia-settings.mjs](#f-383127424-assets-apply-algolia-settings-mjs-2738715084) `+120 / -0`
4. [book.toml](#f-383127424-book-toml-124843185) `+1 / -1`
5. [src/学习与进步/计算机/文章/博客历史演进.md](#f-383127424-src-学习与进步-计算机-文章-博客历史演进-md-1897282589) `+249 / -71`
6. [theme/customized/search.js](#f-383127424-theme-customized-search-js-2827483100) `+382 / -0`
7. [theme/customized/style.css](#f-383127424-theme-customized-style-css-2110612380) `+120 / -0`
8. [theme/index.hbs](#f-383127424-theme-index-hbs-1765250716) `+10 / -25`

### Diffs

<a id="f-383127424-assets-algolia-crawler-config-js-1386373420"></a>
#### assets/algolia-crawler-config.js

<details>
<summary><code>+289 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/assets/algolia-crawler-config.js b/assets/algolia-crawler-config.js
new file mode 100644
index 000000000..bbbea050d
--- /dev/null
+++ b/assets/algolia-crawler-config.js
@@ -0,0 +1,289 @@
+new Crawler({
+  // ⚠️ 三条硬性兼容要求（改动前请先看 assets/algolia-crawler.md 第三节）：
+  //   1. 第 1 行必须就是 new Crawler({，前面不能有注释或代码（algolia/docsearch#2190）
+  //   2. 不用模板字符串
+  //   3. 配置内部不写嵌套函数/回调：编辑器的静态检查解析不了嵌套作用域里的
+  //      参数绑定，会把回调参数报成未定义标识符（曾把 .each((_, el) => ...) 的
+  //      el 标红）。所以下面全部用普通下标循环 + 直筒代码，没有闭包。
+  appId: 'GX9RTL51BH',
+  // 保持你现有 Crawler 的 apiKey（不要把这个可写 key 提交进公开仓库）
+  apiKey: 'PlaceHolder',
+  rateLimit: 8,
+  maxDepth: 10,
+  maxUrls: 5000,
+  startUrls: [
+    'https://tinysnow.github.io',
+    // ⚠️ toc.html 必须留在 startUrls 里：站点静态 HTML 里首页只有
+    // print.html / last-updated.html 两个站内链接、没有任何 prev/next，
+    // 而 toc.html 里有 2359 条站内链接，是全站唯一的「发现入口」。
+    // 少了它，实测覆盖率会从 2360 个页面掉到 297 个（只剩「生活碎笔」那条章节链）。
+    // 它自己不会进索引：见下面的 pathsToMatch 排除 + recordExtractor 里的 SKIP_PATHS。
+    'https://tinysnow.github.io/toc.html',
+  ],
+  renderJavaScript: false,
+  // 故意不用站点的 sitemap：它的 2360 条 URL 全部不带 .html（如 /个人简介），
+  // 而 GitHub Pages 对 /个人简介 和 /个人简介.html 都直接返回 200（不是 301 跳转），
+  // 用它会变成每个页面被索引两份。全站覆盖靠 toc.html 这个入口 + 站内链接。
+  sitemaps: [],
+  ignoreCanonicalTo: false,
+  // 排除不需要下载的页面：print.html 是整本书合订本（19MB），404.html 没有内容。
+  // ⚠️ 千万不要把 toc.html 放进来——它是发现入口，排除它等于掐掉全站链接。
+  exclusionPatterns: [
+    'https://tinysnow.github.io/print.html',
+    'https://tinysnow.github.io/404.html',
+  ],
+  discoveryPatterns: ['https://tinysnow.github.io/**'],
+  schedule: 'at 13:14 on Tuesday',
+  actions: [
+    {
+      indexName: 'tinysnowio',
+      // 抓但不建索引的三个页面：toc.html 只用来发现链接，print/404 不是内容
+      pathsToMatch: [
+        'https://tinysnow.github.io/**',
+        '!https://tinysnow.github.io/toc.html',
+        '!https://tinysnow.github.io/print.html',
+        '!https://tinysnow.github.io/404.html',
+      ],
+      recordExtractor: ({ url, $, contentLength, helpers }) => {
+        /* ============================ 开关 ============================ */
+        const SKIP_PATHS = ['/print.html', '/toc.html', '/404.html'];
+        const MAX_PAGE_BYTES = 4 * 1024 * 1024;    // 超过这个体积的页面跳过
+        const INDEX_IMAGE_ALT = true;              // 把图片 alt 并入正文
+        const PAGE_TITLE_FALLBACK = true;          // 没有 h1 的页面用 <title> 补 lvl1
+        const PRE_SEGMENT = true;                  // 额外写一份「按词」的属性
+        const SEGMENT_MAX_CHARS = 3000;            // 分词副本截断长度
+        const MAX_RECORDS_PER_PAGE = 700;          // 爬虫单页硬上限是 750
+        const MERGE_MAX_CHARS = 1200;
+        const LEVELS = ['lvl0', 'lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'];
+        const HAS_CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;
+
+        // 中文分词器：ICU 词典，与 Algolia 引擎声称使用的 CJK 词典同源。
+        // 环境不支持 Intl.Segmenter 时退化为不分词，不影响爬取。
+        let segmenter = null;
+        try {
+          if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
+            segmenter = new Intl.Segmenter('zh-Hans', { granularity: 'word' });
+          }
+        } catch (e) { /* 忽略：走不分词分支 */ }
+
+        /* ========================== 跳过规则 ========================== */
+        if (SKIP_PATHS.indexOf(url.pathname) !== -1) return [];
+        if (contentLength && contentLength > MAX_PAGE_BYTES) return [];
+        // 抽取主体不存在就直接跳过，避免抽出菜单栏之类的垃圾
+        if ($('main').length === 0 && $('#mdbook-content').length === 0) return [];
+
+        /* ======================= 图片 alt 并入正文 ======================= */
+        // 用下标循环，不用回调，避免嵌套作用域
+        if (INDEX_IMAGE_ALT) {
+          const images = $('main img[alt]');
+          for (let i = 0; i < images.length; i++) {
+            const image = images[i];
+            const alt = ($(image).attr('alt') || '').trim();
+            // 只保留有信息量的 alt：含连续中文，或含连续英文且不像文件名。
+            // 实测本站 114 个去重 alt 里有 21 个是 image-20260531144550242、
+            // Snipaste_2023-10-22 这类文件名，靠下面这行挡掉。
+            const meaningful =
+              /[\u4e00-\u9fff]{2,}/.test(alt) ||
+              (/[A-Za-z]{2,}/.test(alt) && !/[_0-9]/.test(alt));
+            if (!meaningful) continue;
+            const safe = alt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
+            $(image).after('<p>' + safe + '</p>');
+          }
+        }
+
+        /* =========================== 抽取记录 =========================== */
+        const records = helpers.docsearch({
+          recordProps: {
+            // 故意不用站点标题 h1.menu-title：否则「微雪」会命中每一个页面
+            lvl0: {
+              selectors: '',
+              defaultValue: '博客',
+            },
+            // 页面标题 = <main> 里的 h1。
+            // ⚠️ 千万不要把 'head > title' 之类交给 helper 当兜底：它会在所有候选
+            //    选择器里取「文档顺序最靠前」的那个，<title> 在 <head> 里永远排第一，
+            //    结果 lvl1 全变成「重装系统 - 微雪博客」——标题带上站点名，而且
+            //    「微雪」「博客」会命中每一个页面（实测 2342/2342）。
+            //    没有 h1 的那 23 个页面改在下面用 <title> 补，见 PAGE_TITLE_FALLBACK。
+            lvl1: ['main h1', '#mdbook-content h1'],
+            lvl2: ['main h2', '#mdbook-content h2'],
+            lvl3: ['main h3', '#mdbook-content h3'],
+            lvl4: ['main h4', '#mdbook-content h4'],
+            lvl5: ['main h5', '#mdbook-content h5'],
+            lvl6: ['main h6', '#mdbook-content h6'],
+            // 正文：只取 <main> 里的块级元素。去掉了 span/a/em/strong/ul/ol
+            // （同一句话会被抽 3~4 遍），补上 td/th（表格）与 dd/dt，
+            // code 同时覆盖块级和行内代码。
+            content: [
+              'main p, main li, main td, main th, main code, main dd, main dt',
+              '#mdbook-content p, #mdbook-content li, #mdbook-content td, #mdbook-content th, #mdbook-content code, #mdbook-content dd, #mdbook-content dt',
+            ],
+            // 语言交给 helper 写进每条记录
+            lang: { defaultValue: 'zh-CN' },
+          },
+          aggregateContent: true,
+          indexHeadings: true,
+          recordVersion: 'v3',
+        });
+
+        /* ================== 单页记录数保护（内联，无函数）================== */
+        // 爬虫单页超过 750 条记录会直接报 Extractors returned too many records。
+        // 超过阈值时把「同一锚点、类型为 content」的相邻记录合并，标题原样保留；
+        // 在副本上合并，不改动 helper 返回的原对象。
+        let finalRecords = records;
+        if (records.length > MAX_RECORDS_PER_PAGE) {
+          const packed = [];
+          let pending = null;
+          for (let i = 0; i < records.length; i++) {
+            const record = records[i];
+            const isContent = record.type === 'content' && typeof record.content === 'string';
+            const canMerge =
+              pending &&
+              isContent &&
+              pending.url === record.url &&
+              pending.content.length + record.content.length < MERGE_MAX_CHARS;
+            if (canMerge) {
+              pending.content += '\n' + record.content;
+              continue;
+            }
+            if (pending) packed.push(pending);
+            if (isContent) {
+              pending = Object.assign({}, record);
+            } else {
+              pending = null;
+              packed.push(record);
+            }
+          }
+          if (pending) packed.push(pending);
+          finalRecords = packed;
+        }
+
+        /* ================ 写一份按词切分的副本（内联，无函数）================ */
+        // 先给没有标题的记录补 lvl1：这类页面 <main> 里没有 h1（实测 23 个），
+        // 只能用 <title> 兜底，并去掉「 - 微雪博客」这个站点名后缀。
+        // 放在分词之前，这样 hierarchy_words.lvl1 也会一起生成。
+        if (PAGE_TITLE_FALLBACK) {
+          const pageTitle = ($('head > title').text() || '').replace(/ - 微雪博客$/, '').trim();
+          if (pageTitle) {
+            for (let i = 0; i < finalRecords.length; i++) {
+              const titleHierarchy = finalRecords[i].hierarchy;
+              if (titleHierarchy && !titleHierarchy.lvl1) {
+                titleHierarchy.lvl1 = pageTitle;
+              }
+            }
+          }
+        }
+
+        // 把所有要分词的文本收集起来，统一分词后再写回，
+        // 这样正文和各级标题共用同一段逻辑，且不需要定义函数。
+        if (PRE_SEGMENT) {
+          const texts = [];
+          const targets = [];
+          for (let i = 0; i < finalRecords.length; i++) {
+            const record = finalRecords[i];
+            if (record.content) {
+              texts.push(String(record.content));
+              targets.push([i, '']);
+            }
+            const hierarchy = record.hierarchy || {};
+            for (let j = 0; j < LEVELS.length; j++) {
+              if (hierarchy[LEVELS[j]]) {
+                texts.push(String(hierarchy[LEVELS[j]]));
+                targets.push([i, LEVELS[j]]);
+              }
+            }
+          }
+
+          const segmented = [];
+          for (let i = 0; i < texts.length; i++) {
+            const text = texts[i];
+            let result = text;
+            if (segmenter && HAS_CJK.test(text)) {
+              // 只保留词元，用空格连接：重装系统 8->7 → 重装 系统 8 7
+              const parts = Array.from(segmenter.segment(text));
+              const words = [];
+              for (let k = 0; k < parts.length; k++) {
+                if (parts[k].isWordLike) words.push(parts[k].segment);
+              }
+              result = words.join(' ');
+              if (result.length > SEGMENT_MAX_CHARS) result = result.slice(0, SEGMENT_MAX_CHARS);
+            }
+            segmented.push(result);
+          }
+
+          for (let i = 0; i < finalRecords.length; i++) {
+            finalRecords[i].hierarchy_words = {};
+          }
+          for (let i = 0; i < targets.length; i++) {
+            const record = finalRecords[targets[i][0]];
+            const level = targets[i][1];
+            if (level) {
+              record.hierarchy_words[level] = segmented[i];
+            } else {
+              record.content_words = segmented[i];
+            }
+          }
+        }
+
+        return finalRecords;
+      },
+    },
+  ],
+  safetyChecks: { beforeIndexPublishing: { maxLostRecordsPercentage: 100 } },
+  initialIndexSettings: {
+    tinysnowio: {
+      attributesForFaceting: ['type', 'lang'],
+      attributesToRetrieve: [
+        'hierarchy',
+        'content',
+        'anchor',
+        'url',
+        'url_without_anchor',
+        'type',
+        'lang',
+      ],
+      attributesToHighlight: ['hierarchy', 'content'],
+      attributesToSnippet: ['content:10'],
+      camelCaseAttributes: ['hierarchy', 'content'],
+      // 前 8 项是按词切分的副本（优先命中），后 8 项是按字的原文（兜底）。
+      // 若把上面的 PRE_SEGMENT 改成 false，请删掉前 8 项。
+      searchableAttributes: [
+        'unordered(hierarchy_words.lvl0)',
+        'unordered(hierarchy_words.lvl1)',
+        'unordered(hierarchy_words.lvl2)',
+        'unordered(hierarchy_words.lvl3)',
+        'unordered(hierarchy_words.lvl4)',
+        'unordered(hierarchy_words.lvl5)',
+        'unordered(hierarchy_words.lvl6)',
+        'content_words',
+        'unordered(hierarchy.lvl0)',
+        'unordered(hierarchy.lvl1)',
+        'unordered(hierarchy.lvl2)',
+        'unordered(hierarchy.lvl3)',
+        'unordered(hierarchy.lvl4)',
+        'unordered(hierarchy.lvl5)',
+        'unordered(hierarchy.lvl6)',
+        'content',
+      ],
+      distinct: true,
+      // 按「页面」去重：同一篇文章只出一条命中，避免单页刷屏
+      // （原配置是 'url'，含锚点，等于按段落去重）
+      attributeForDistinct: 'url_without_anchor',
+      customRanking: ['desc(weight.pageRank)', 'desc(weight.level)', 'asc(weight.position)'],
+      ranking: ['words', 'filters', 'typo', 'attribute', 'proximity', 'exact', 'custom'],
+      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
+      highlightPostTag: '</span>',
+      minWordSizefor1Typo: 3,
+      minWordSizefor2Typos: 7,
+      allowTyposOnNumericTokens: false,
+      minProximity: 1,
+      ignorePlurals: true,
+      // 中文按词切分的开关（原配置完全没有这两项）
+      indexLanguages: ['zh', 'en'],
+      queryLanguages: ['zh', 'en'],
+      advancedSyntax: true,
+      attributeCriteriaComputedByMinProximity: true,
+      removeWordsIfNoResults: 'allOptional',
+    },
+  },
+});

~~~~~

</details>

<a id="f-383127424-assets-algolia-crawler-md-203506374"></a>
#### assets/algolia-crawler.md

<details>
<summary><code>+215 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/assets/algolia-crawler.md b/assets/algolia-crawler.md
new file mode 100644
index 000000000..99509bce7
--- /dev/null
+++ b/assets/algolia-crawler.md
@@ -0,0 +1,215 @@
+# Algolia DocSearch（tinysnowio）：中文分词与爬虫配置
+
+这两份文件放在 `assets/` 下，不参与 mdBook 构建，也不会部署到站点：
+
+- [`algolia-crawler-config.js`](./algolia-crawler-config.js)：替换 Algolia Crawler Editor 里的全部内容。
+
+---
+
+## 一、结论：不是「没爬到」，是「按字索引」
+
+我直接用线上索引（`GX9RTL51BH` / `tinysnowio`，`index.hbs` 里的 search-only key）做了实测，可以确定问题出在分词，而不是爬虫漏抓：
+
+| 实测 | 结果 | 说明 |
+| --- | --- | --- |
+| 索引规模 | 42,148 条记录 / 21,072 个 url / 约 2,360 个页面 | 覆盖率没问题，内容都在 |
+| 索引设置 | **没有 `indexLanguages`，也没有 `queryLanguages`** | 中文语种支持从未打开 |
+| `重装系统` 的查询分词 | `_rankingInfo.words = 4`，`matchedWords: ["重","装","系","统"]` | 查询被切成 **4 个单字**，不是「重装 / 系统」两个词 |
+| 查询时临时加 `queryLanguages: ["zh"]` | 仍然是 `words = 4`，高亮结果完全一样 | 现索引下加这一项**不生效** |
+| 顺序敏感性 | `重装` 172 条 vs `装重` 472 条 | 引擎是按**单字顺序**匹配，不是词级匹配 |
+| 精确短语排名 | 取 52 个页面正文里 12 个连续汉字做查询：**14 个排第 1，37 个进前 20，15 个连前 20 都进不去**（其中有的 `nbHits` 高达 221） | 这就是你体感「搜不出来」的真实形态 |
+| 召回 | 44/44 个随机短语至少有命中 | 召回没问题，**是相关性和排序崩了** |
+
+一句话：中文被拆成单字后，"词"这个概念在索引里根本不存在——所以既没有词级匹配，`words` 排序准则也变成了「命中多少个字」，一个页面命中 4 个字和另一个页面命中 4 个字几乎同分，真正该排前面的页面就被淹了。
+
+顺带实测到的其它问题：
+
+- **抽取范围不对**：原配置删的是 `#sidebar` / `#menu-bar`，而你这套主题实际用的是 `#mdbook-sidebar` / `#mdbook-menu-bar`——删了个寂寞（不过静态 HTML 里侧边栏是空的，靠 JS 填充，所以没造成大灾难）。
+- **重复抽取**：正文选择器把 `span` / `a` / `em` / `strong` / `ul` / `ol` 和 `p` / `li` 混在一起，同一句话会被抽 3～4 遍。
+- **漏内容**：2,360 个页面里有 **114 个含 `<table>`**，`td` / `th` 完全不在选择器里，表格内容一个字都搜不到；另有 30 个页面有带 `alt` 的图片，也搜不到。
+- **`print.html` 有 19MB**（整本书合订本），虽然实测没进索引，但每次爬取都要白抓一遍，且随时可能把 `maxUrls` / 记录大小撑爆。
+
+## 二、这次的改动（`algolia-crawler-config.js`）
+
+1. **打开中文语种**：`indexLanguages` / `queryLanguages` 都设为 `["zh", "en"]`——这是 Algolia 在 CJK 文本里启用**词典分词**的开关。
+2. **额外写一份「按词」的可搜索属性**：`hierarchy_words` / `content_words`，用 `Intl.Segmenter`（ICU 中文词典，与 Algolia 引擎声称使用的 CJK 词典是同一套 ICU 数据）分词，例如
+   `重装系统 8->7` → `重装 系统 8 7`。
+   **原来的 `hierarchy` / `content` 继续保留可搜索**，所以在「引擎自己按词切分」和「引擎仍然按字切分」两种情况下都不会把搜索改坏，只是多占一点索引存储。
+3. **抽取范围收窄到 `<main>`**：删除选择器修正为 `main ...` / `#mdbook-content ...`，正文选择器改为 `p, li, td, th, code, dd, dt`（去掉会重复的内联元素，补上表格），标题改为 `main h1..h6`，并跳过图片 `alt` 里无信息量的文件名。**标题兜底必须自己写、不能交给 helper**：`main` 里没有 `h1` 的页面（实测 23 个，内科学那批）由代码用 `<title>` 补 `lvl1` 并去掉「 - 微雪博客」后缀；如果把 `head > title` 交给 helper 当兜底，它会取文档顺序最靠前的候选，**所有页面**的 lvl1 都会变成 `<title>`（见第七节）。
+4. **保留 `toc.html` 作为全站发现入口**：站点静态 HTML 的首页只有 `print.html` / `last-updated.html` 两个站内链接、**没有任何 prev/next**，而 `toc.html` 里有 **2359 条站内链接**——它是全站唯一的「链接中枢」。所以 `toc.html` 列进 `startUrls` 保证一定被抓到（不依赖 iframe 能否被识别），再用 `pathsToMatch` 的 `!` 把它排除出索引：只发现链接、不产生记录。**实测教训：把它和另外两页一起丢进 `exclusionPatterns`，覆盖率会从 2360 个页面掉到 297 个**（只剩「生活碎笔」那条章节链，因为只有它的页面能从 `last-updated.html` 顺着 prev/next 走到）。
+5. **不抓** `print.html`（19MB 合订本）/ `404.html`，用 `exclusionPatterns` 拦掉下载；页面体积再由 `recordExtractor` 里的 `contentLength` 兜底。
+6. **故意不加站点的 sitemap**：`sitemap.xml` / `sitemap.txt` 的 2360 条 URL **全部不带 `.html`**（如 `/个人简介`），而 GitHub Pages 对 `/个人简介` 和 `/个人简介.html` **都直接返回 200、不是 301 跳转**（实测），加进去只会让每个页面被索引两份，配合按页面去重就是成对的重复结果。全站覆盖本来就能靠 `toc.html` + 站内链接拿满（改造前的旧索引就是这个覆盖率）。
+7. **`attributeForDistinct` 从 `url` 改成 `url_without_anchor`**（按页面而不是按锚点去重）：同一篇文章只出一条命中，避免单页刷屏。实测「数据结构」这类词，前 20 条命中原本只落在 3~11 个页面上，改成页面级去重后最多能覆盖 20 个页面。这项**只能写进索引设置**（不能作为查询参数传，传了会 400）。
+8. 其余设置（ranking、customRanking、weights、`removeWordsIfNoResults: allOptional`、`advancedSyntax`、`aggregateContent: true`）保持你原来的值。
+9. **单页记录数保护网**：爬虫单页超过 750 条记录会直接报 `Extractors returned too many records`；超过 700 条时把同一锚点的正文块合并（先在副本上合并，不改动原记录；合并后重新计算按词副本）。按当前的段落级聚合抽取方式几乎不会触发，属于保险。
+
+## 三、怎么用（第 2 步千万别省）
+
+> ⚠️ **`initialIndexSettings` 只在索引「第一次」爬取时生效**（[官方文档](https://www.algolia.com/doc/tools/crawler/apis/configuration/initial-index-settings/)："only applied during the first crawl of an index"）。`tinysnowio` 已经存在，所以**光换 Editor 配置，线上设置一点都不会变**，`indexLanguages` 不会生效，预设的中文分词也就白写了。
+
+> ⚠️ **Crawler 编辑器对配置有 3 条硬性要求**（都是实测踩出来的，改配置时请一并遵守）：
+> 1. **`new Crawler(` 必须出现在第 1 行**，前面不能有任何注释或代码，否则报 `invalid configuration`（[algolia/docsearch#2190](https://github.com/algolia/docsearch/issues/2190)）。
+> 2. **不要用模板字符串**（反引号），改用 `'<p>' + safe + '</p>'` 这样的拼接。
+> 3. **配置里不要出现嵌套函数 / 回调**。编辑器的静态检查解析不了嵌套作用域里的参数绑定，会把回调参数报成未定义标识符——实测就是对 `$('main img[alt]').each((_, el) => {...})` 里的 **`el`** 标红。
+>
+> 因此 `algolia-crawler-config.js` 里所有逻辑都写成 `recordExtractor` 内部的**直筒代码 + 下标循环**：没有闭包，没有 `.each()` / `.forEach()` 回调，也没有抽出来的公共函数（这就是它看起来有点长、有点重复的原因）。**整份文件就是一条 `new Crawler({...})` 表达式，请从第 1 行开始原样粘贴**，不要在前面加注释头。
+
+> 💡 编辑器有时会提示「add a sitemap」，**这里故意不采纳**：你线上的 `sitemap.xml` 有 2360 条 URL，但**全部是不带 `.html` 的**（如 `/个人简介`），而爬虫顺着页面链接发现的是 `.html` 版本。加进去会让每个页面以两种 URL 各索引一份，配合按页面去重就是成对的重复结果。站点的 2360 个页面本来就能通过链接全部覆盖（实测抽样 60 个页面的标题，索引里都有记录）。
+
+**第 1 步**：Algolia Crawler Dashboard → 你的 Crawler → **Editor** → 用 [`algolia-crawler-config.js`](./algolia-crawler-config.js) 整体替换（从第 1 行开始，不要在前面加东西）→ 末尾的 `apiKey` 改回你原来的值（文件里是 `PlaceHolder`，避免把可写 key 提交进公开仓库）→ Save。
+
+**第 2 步（建议先做，不碰索引）：用编辑器里的 URL Tester 验一次新配置**。Crawler → Editor 页面自带 URL Tester，填 1~2 个真实页面 URL 跑一下，确认：没有报错、抽出来的记录里有 `content_words` / `hierarchy_words`、`content` 里不再有重复句子。
+
+**第 3 步：应用索引设置。** 注意：**Algolia Dashboard 的索引设置页是分区表单，没有给索引设置用的 JSON 编辑器**（找不到是正常的）。三条路任选一条：
+
+- **A（最省事，推荐）：删掉索引再重爬。** Dashboard → **Search** → 选索引 `tinysnowio` → **Manage index > Delete**（输入 `DELETE` 确认）→ 回到 Crawler 点 **Restart crawl**。索引被重新创建时就算它的「第一次爬取」，`initialIndexSettings` 会整套自动套用，不必手改任何一项。代价是爬完之前站内搜索是空的；不用担心旧记录残留——官方文档写明[配置改动之后爬虫不再发条件请求](https://www.algolia.com/doc/tools/crawler/apis/configuration/cache/)，会自动全量重抓、重新抽取。
+- **B（不想删索引，手动改）**：Dashboard → **Search** → 索引 `tinysnowio` → **Configuration**，改这三处后 Save：
+  1. **Language** → Query Languages（有 Index Languages 就一并）选上 Chinese / English；
+  2. **Searchable attributes** → 按顺序加下面 JSON 里那 16 项（顺序不能乱，attribute 排序准则按先后顺序：前 8 项是按词副本，后 8 项是原文），每项都开 `unordered`；
+  3. **Distinct** → 开启，Attribute for distinct 填 `url_without_anchor`（这项在 Configuration 里通常归在 ranking 相关分区，实在找不到就走 A 或 C）。
+- **C（用脚本直接调 API）**：本目录已备好 [`apply-algolia-settings.mjs`](./apply-algolia-settings.mjs)，它从爬虫配置里读出设置再 `PUT` 到索引（设置只有一份来源，不会两边不一致）：
+
+  ```bash
+  node assets/apply-algolia-settings.mjs --dry-run                       # 先看要写入的 JSON
+  node assets/apply-algolia-settings.mjs --key <带 editSettings 的 Key>   # 真正写入
+  ```
+
+  需要 `editSettings` 权限的 key（Dashboard → API Keys）。写操作必须走 `{appId}.algolia.net`，`-dsn` 那个主机是只读的——脚本已经处理好了。
+
+  下面就是脚本会写入的内容（`--dry-run` 打印的同一份）：
+
+  ```json
+  {
+    "indexLanguages": ["zh", "en"],
+    "queryLanguages": ["zh", "en"],
+    "distinct": true,
+    "attributeForDistinct": "url_without_anchor",
+    "searchableAttributes": [
+      "unordered(hierarchy_words.lvl0)",
+      "unordered(hierarchy_words.lvl1)",
+      "unordered(hierarchy_words.lvl2)",
+      "unordered(hierarchy_words.lvl3)",
+      "unordered(hierarchy_words.lvl4)",
+      "unordered(hierarchy_words.lvl5)",
+      "unordered(hierarchy_words.lvl6)",
+      "content_words",
+      "unordered(hierarchy.lvl0)",
+      "unordered(hierarchy.lvl1)",
+      "unordered(hierarchy.lvl2)",
+      "unordered(hierarchy.lvl3)",
+      "unordered(hierarchy.lvl4)",
+      "unordered(hierarchy.lvl5)",
+      "unordered(hierarchy.lvl6)",
+      "content"
+    ]
+  }
+  ```
+
+**第 4 步**：Restart crawl（建议先看一次完整爬取日志，确认没有大面积报错再确认发布）。
+
+## 四、验证结果（2026-10-13 全量重爬后实测）
+
+**覆盖率**：2342 个页面 / 31,959 条记录（改造前 2360 个页面），✓ 恢复正常。
+
+**结论一：引擎侧的中文词切分没戏。** 索引按 `indexLanguages` / `queryLanguages = ["zh","en"]` 全量重建后：
+
+| 查询 | `_rankingInfo.words` | `matchedWords` |
+| --- | --- | --- |
+| `重装系统` | 4 | `["重","装","系","统"]` |
+| `数据结构` | 4 | `["数","据","结","构"]` |
+| `重装 系统`（中间加空格） | 4 | —— 加空格也一样 |
+
+也就是说：**这个索引就是按单字处理的**，查询侧和索引侧都是，设置里怎么写都改不动。顺带实测 `removeStopWords: ["zh"]` 也没用——对多字查询毫无影响，对单字查询反而把词删干净变成"命中全部"（查 `的` 从 2209 条变成 2342 条），所以设置里**不要开**它。
+
+**结论二：爬虫写的"按词"属性才是胜负手。** 用 52 条精确短语（每个页面正文取中间 12 个连续汉字）测排序：
+
+| 搜索范围 | top1 | top5 | top20 | 进不了前 20 |
+| --- | --- | --- | --- | --- |
+| 全部 16 项 | 15 | 25 | 38 | 14 |
+| 只搜按字原文 8 项 | 15 | 25 | 38 | 14 |
+| **只搜按词副本 8 项** | **33** | **44** | **47** | **5** |
+
+→ 只搜按字属性 == 基线，说明**拖后腿的就是它**；客户端因此改成默认只搜按词属性（`preferWordAttributes`），一条都没命中才退回全部属性。
+
+**结论三：自然语言查询要靠客户端清洗。** 按单字 AND 时「怎么重装系统」= 6 个字全都要出现，正确页面因为没有「怎么」反而不满足，前三条全是无关文章。客户端去掉中文虚词后：
+
+| 用户输入 | 实际发出 | 前三条 |
+| --- | --- | --- |
+| 怎么重装系统 | `重装 系统` | 重装系统 / 重装系统 8->7 / 重装系统知识 |
+| 如何配置 docsearch | `配置 docsearch` | 博客历史演进 |
+| 保险合同怎么看 | `保险 合同 看` | 你的第一本保险指南 / 一小时搞定全家保险 / 不可不知的保险常识 |
+
+走真实客户端逻辑重跑那 52 条短语：**top1 = 32、top5 = 43、top20 = 48、进不了前 20 = 4**（改造前 15/25/38/14）。
+
+**已知限制**：正文超过 3000 字符的记录（约占 content 记录的 7.7%，p99 约 8000、最大 11008），其按词副本会被 `SEGMENT_MAX_CHARS` 截断，尾部只有在退回全部属性时才能命中。想放宽就调大这个值，但要留意单条记录大小（免费计划 10KB，爬虫侧对应 `Records extracted are too big`；目前索引里已有约 1.1 万字符正文的记录，实际额度比 10KB 宽）。
+
+## 五、回退
+
+- 只想去掉预分词：把配置顶部 `OPTIONS.preSegment` 改成 `false`，`searchableAttributes` 会自动退回原来那 8 项（其余不受影响）。
+- 想让同一篇文章的多个小节都出现在结果里：把索引设置里的 `attributeForDistinct` 改回 `url`（含锚点，等于按段落去重）。
+- 只想恢复原行为：把本目录文件换回旧配置；索引设置按第 2 步把 `indexLanguages` / `queryLanguages` 删掉即可。
+
+## 六、第二阶段：结果展示与分页（已实现）
+
+### 之前的问题（实测 `@docsearch/js@3.9.0` 源码）
+
+- `docsearch()` **每次查询只发 1 个请求**，且写死 `hitsPerPage: 20` → 第 21 条以后的命中根本没从 Algolia 取回来；界面上那个 `nbHits` 是全库统计，不是能看到的条数。
+- 取回后客户端再按 `maxResultsPerGroup`（**默认 5**）切片，而且外层按 lvl0、内层按 lvl1 各切一次 → 「只展示前几个」。
+- 它**没有任何分页 / 加载更多**，`docsearch()` 返回 `void`，拿不到内部实例，无法从外部驱动翻页。
+
+### 现在的实现
+
+| 文件 | 改动 |
+| --- | --- |
+| `theme/customized/search.js` | **新增**。用 `@algolia/autocomplete-js@1.19.12` 自建下拉面板 |
+| `theme/index.hbs` | CDN 依赖固定版本，并在 `additional-js` **之前**同步加载；删掉旧的 `docsearch({...})` 初始化 |
+| `book.toml` | `additional-js` 增加 `theme/customized/search.js` |
+| `theme/customized/style.css` | 面板样式，以及 ayu/navy/coal 暗色主题下的配色 |
+
+面板行为：
+
+- **每页 20 条，底部「加载更多（已显示 X / 共 Y 条）」逐页追加**，可以一直翻到最后一页（`search.js` 顶部的 `perPage` 可调）。
+- 顶部显示「共 N 条命中」，不再出现「明明很多命中却只看到 5 条」。
+- 每条命中展示：页面标题 + 层级路径（lvl2 › lvl3 …）+ 带 `<mark>` 高亮的正文摘要，点按/回车直接跳到对应锚点。
+- 查询直接走 Algolia 的 `POST /1/indexes/{index}/query`，**不引入 `algoliasearch` 客户端**，因此没有 v4（返回 `{results}`）与 v5（返回数组）的版本差异问题。
+- `search.js` 顶部 `segmentQuery`（默认 `false`）：改成 `true` 后，查询会先按词切开再发给 Algolia，用于配合本次爬虫新写的 `content_words` / `hierarchy_words`。**等第四节验证完再打开**。
+- 自建面板初始化失败时，会自动退回 DocSearch 弹窗（并把抓取条数从 20 提到 40、每组从 5 提到 20）。要强制用回 DocSearch，把 `search.js` 里的 `fallbackToDocSearch` 保持 `true` 并临时让 `window['@algolia/autocomplete-js']` 不可用即可；要彻底移除自建面板，从 `book.toml` 的 `additional-js` 里去掉 `theme/customized/search.js` 并恢复 `index.hbs` 里的 `docsearch({...})` 调用。
+
+### 怎么验证（本地）
+
+```bash
+mdbook build          # 或 mdbook serve
+```
+
+然后打开任意页面，在菜单栏搜索框里输入中文，检查：
+
+1. 面板顶部有「共 N 条命中」；
+2. 列表一次 20 条，底部有「加载更多」，点它（或键盘上下选中后回车）会继续追加，且前面的结果不重复；
+3. 中文词有黄色高亮标记；
+4. 切换 mdBook 主题（Auto/Light/Rust/Coal/Navy/Ayu）后面板配色仍然正常。
+
+改动只涉及主题文件，`mdbook build` 之后 `book/` 下会生成带哈希的新文件名（`search-xxxxxxxx.js`、`style-xxxxxxxx.css`），部署走原有的 GitHub Actions 流程即可。
+
+## 七、与另一份 AI 生成配置的对比（留档）
+
+后来另有一份 GPT 生成的爬虫配置。两边**核心诊断一致**——都要求打开 `indexLanguages` / `queryLanguages`、把抽取范围收窄到 `<main>`、补上 `td/th/dt/dd`、跳过 `print.html` / `toc.html` / `404.html`。其中有 3 处细节更好，已经吸收进本配置：
+
+1. `lang` 改用 `recordProps.lang = { defaultValue: "zh-CN" }` 交给 helper 写入（比抽完再手写 `record.lang` 更正统），并把 `lang` 加进 `attributesToRetrieve`。
+2. 增加「`main` / `#mdbook-content` 都不存在就直接跳过」的判断。
+3. 知道爬虫「单页 >750 条记录会报错」的硬上限，据此加了单页记录数保护网。
+
+没有采纳的部分，以及对应的实测依据：
+
+| GPT 配置的写法 | 实测 / 文档依据 | 结论 |
+| --- | --- | --- |
+| `lvl1` 加 `head > title` 兜底 | **这条采纳之后翻车了**：DocSearch helper 会在所有候选选择器里取「文档顺序最靠前」的那个，`<title>` 在 `<head>` 里永远排第一，于是 lvl1 全变成「重装系统 - 微雪博客」，连 `微雪` / `博客` 都命中 **2342/2342** 个页面（实测） | **已撤销**：helper 只给 `['main h1', '#mdbook-content h1']`；23 个没有 `h1` 的页面改由代码在抽取后用 `<title>` 补（去掉站点名后缀） |
+| `distinct: false`，且删掉 `attributeForDistinct` | 在线上索引模拟该设置：`数据结构` 前 20 条命中 **20/20 全来自同一篇文章**，`读书` 10/20，`Docker` 7/20 | 不采纳，改为页面级去重（`url_without_anchor`） |
+| `aggregateContent: false` + 自写打包逻辑 | 统计 2,360 个页面 `<main>` 下的 `p/li/td/th/pre/dt/dd` 共 13.6 万个，加 1.6 万条标题 ≈ 15 万条记录（现状索引 4.2 万条）；它那段 700 条阈值的打包代码只有 **5 个**页面会触发 | 不采纳，保留官方默认的 `aggregateContent: true`（文档明确推荐用它来减少记录数） |
+| `removeWordsIfNoResults: "none"` | 长中文查询更容易变成 0 结果 | 不采纳，保留 `allOptional` |
+| 把 `toc.html` 加进 `startUrls` | **这一条我当时判断错了**：站点静态 HTML 的首页只有 `print.html` / `last-updated.html` 两个站内链接、没有任何 prev/next，而 `toc.html` 有 2359 条站内链接，是全站唯一的发现入口。实测不抓它，覆盖率从 2360 个页面掉到 297 个 | **已改正并采纳**：`toc.html` 进 `startUrls`，再用 `pathsToMatch` 的 `!` 把它排除出索引（只发现链接、不产生记录） |
+| `print.html` 只在校验层跳过 | 19MB 的合订本每次爬取仍会被下载 | 不采纳它的做法，改用 `exclusionPatterns` 拦掉下载 |
+| 删掉 `advancedSyntax` / `attributeCriteriaComputedByMinProximity` / `ignorePlurals` | 无说明的行为变更 | 不采纳，保持原值 |
+| 没有「按词」兜底属性 | 两份配置都还没验证 `indexLanguages` 是否真能让索引按词切分；只有本配置额外写了 `content_words` / `hierarchy_words` 这第二条路 | 保留兜底 |
+
+**那个"共同待验证的关键点"已经有结论了**：全量重建后 `_rankingInfo.words` 仍然是 4，这个引擎就是按单字处理（见第四节）。所以改进全部落在客户端：清洗中文虚词 + 优先搜「按词」属性，也就是 `theme/customized/search.js` 里的 `cleanQuery` / `preferWordAttributes` 两个开关（默认都开）。
+

~~~~~

</details>

<a id="f-383127424-assets-apply-algolia-settings-mjs-2738715084"></a>
#### assets/apply-algolia-settings.mjs

<details>
<summary><code>+120 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/assets/apply-algolia-settings.mjs b/assets/apply-algolia-settings.mjs
new file mode 100644
index 000000000..5dbb2d96d
--- /dev/null
+++ b/assets/apply-algolia-settings.mjs
@@ -0,0 +1,120 @@
+#!/usr/bin/env node
+/**
+ * 把 assets/algolia-crawler-config.js 里的 initialIndexSettings 直接应用到线上索引。
+ * ---------------------------------------------------------------------------
+ * 为什么需要它：Algolia Dashboard 的索引设置页是分区表单，没有给索引设置用的
+ * JSON 编辑器；而 initialIndexSettings 只在索引「第一次」爬取时生效，所以索引
+ * 已存在时它不会自动应用。这个脚本用官方 REST 接口 PUT /1/indexes/{index}/settings
+ * 把同一份设置写进去（设置以爬虫配置为唯一来源，不会两边不一致）。
+ *
+ * 用法：
+ *   node assets/apply-algolia-settings.mjs --dry-run          # 只打印设置，不写入
+ *   node assets/apply-algolia-settings.mjs --key <API_KEY>    # 实际写入
+ *   ALGOLIA_API_KEY=<API_KEY> node assets/apply-algolia-settings.mjs
+ *
+ * 需要的 key 权限：editSettings（以及 settings 读权限会更方便排查）。
+ * ⚠️ 不要把 key 写进这个文件或提交到仓库；用参数或环境变量传。
+ */
+import fs from 'node:fs';
+import path from 'node:path';
+import { fileURLToPath } from 'node:url';
+
+const here = path.dirname(fileURLToPath(import.meta.url));
+const configPath = path.join(here, 'algolia-crawler-config.js');
+
+const args = process.argv.slice(2);
+const dryRun = args.includes('--dry-run');
+const keyIndex = args.indexOf('--key');
+const apiKey = keyIndex >= 0 ? args[keyIndex + 1] : process.env.ALGOLIA_API_KEY;
+
+/* ---- 以爬虫配置为唯一来源，取出 initialIndexSettings ---- */
+const source = fs.readFileSync(configPath, 'utf8');
+let crawlerConfig = null;
+globalThis.Crawler = function Crawler(config) { crawlerConfig = config; };
+(0, eval)(source);
+
+if (!crawlerConfig) {
+  console.error('没能从 algolia-crawler-config.js 里读到配置');
+  process.exit(1);
+}
+
+const appId = crawlerConfig.appId;
+const indexNames = Object.keys(crawlerConfig.initialIndexSettings || {});
+if (indexNames.length !== 1) {
+  console.error('期望 initialIndexSettings 里只有一个索引，实际：' + JSON.stringify(indexNames));
+  process.exit(1);
+}
+const indexName = indexNames[0];
+const settings = crawlerConfig.initialIndexSettings[indexName];
+
+if (dryRun) {
+  console.log('# 索引：' + indexName + '  （appId: ' + appId + '）');
+  console.log('# 下面这段就是会被写入的 JSON：');
+  console.log(JSON.stringify(settings, null, 2));
+  process.exit(0);
+}
+
+if (!apiKey) {
+  console.error('缺少 API Key。用法：node assets/apply-algolia-settings.mjs --key <API_KEY>');
+  console.error('（也可以设置环境变量 ALGOLIA_API_KEY；先用 --dry-run 可以不传 key）');
+  process.exit(1);
+}
+
+// ⚠️ 写操作必须走 {appId}.algolia.net；{appId}-dsn.algolia.net 是只读主机
+//    （用错会返回 "This host is read-only (ie. this is a DSN)"）
+const base = 'https://' + appId + '.algolia.net/1/indexes/' + encodeURIComponent(indexName);
+const headers = {
+  'X-Algolia-Application-Id': appId,
+  'X-Algolia-API-Key': apiKey,
+  'Content-Type': 'application/json',
+};
+
+console.log('→ PUT ' + base + '/settings');
+const res = await fetch(base + '/settings', {
+  method: 'PUT',
+  headers,
+  body: JSON.stringify(settings),
+});
+const text = await res.text();
+let payload = null;
+try { payload = JSON.parse(text); } catch (e) { /* 保留原始文本 */ }
+
+if (!res.ok) {
+  console.error('✗ HTTP ' + res.status + '：' + text.slice(0, 500));
+  if (res.status === 403 || /403|read-only|not authorized|not allowed|invalid api key/i.test(text)) {
+    console.error('');
+    console.error('  这个 key 没有 editSettings 权限（或不是写权限的 key）。两条路：');
+    console.error('  A. 换一个带 editSettings 的 key：Algolia Dashboard → API Keys；');
+    console.error('  B. 干脆走「删掉索引再重爬」：爬虫会在索引的第一次爬取时自动套用 initialIndexSettings，');
+    console.error('     Dashboard → Search → 选索引 tinysnowio → Manage index > Delete（输入 DELETE）→ 然后 Restart crawl。');
+  }
+  process.exit(1);
+}
+
+console.log('✓ 设置已提交' + (payload && payload.taskID !== undefined ? '（taskID ' + payload.taskID + '）' : ''));
+
+/* ---- 等任务完成，确认设置真的生效 ---- */
+if (payload && payload.taskID !== undefined) {
+  const taskUrl = base + '/task/' + payload.taskID;
+  for (let i = 0; i < 30; i++) {
+    const t = await fetch(taskUrl, { headers });
+    const tj = await t.json().catch(() => null);
+    if (tj && tj.status === 'published') {
+      console.log('✓ 索引已更新（status: published）');
+      break;
+    }
+    await new Promise((r) => setTimeout(r, 1000));
+  }
+}
+
+/* ---- 回读核对 ---- */
+const check = await fetch(base + '/settings', { headers });
+if (check.ok) {
+  const now = await check.json();
+  const keys = ['indexLanguages', 'queryLanguages', 'distinct', 'attributeForDistinct'];
+  console.log('\n回读核对：');
+  for (const k of keys) {
+    console.log('  ' + k + ' = ' + JSON.stringify(now[k]));
+  }
+  console.log('  searchableAttributes = ' + JSON.stringify(now.searchableAttributes));
+}

~~~~~

</details>

<a id="f-383127424-book-toml-124843185"></a>
#### book.toml

<details>
<summary><code>+1 / -1</code> Click to expand diff</summary>

~~~~~diff
diff --git a/book.toml b/book.toml
index f6aa2d6b0..88f152ca9 100644
--- a/book.toml
+++ b/book.toml
@@ -11,7 +11,7 @@ preferred-dark-theme = "Ayu"
 # google-analytics = "GTM-5VTTZ9C"
 # no-section-label = true
 additional-css = ["theme/customized/style.css"]
-additional-js = ["assets/custom.js"]
+additional-js = ["assets/custom.js", "theme/customized/search.js"]
 git-repository-url = "https://github.com/TinySnow/TinySnow.github.io"
 git-repository-icon = "fab-github"
 input-404 = "404.md"

~~~~~

</details>

<a id="f-383127424-src-学习与进步-计算机-文章-博客历史演进-md-1897282589"></a>
#### src/学习与进步/计算机/文章/博客历史演进.md

<details>
<summary><code>+249 / -71</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\350\256\241\347\256\227\346\234\272/\346\226\207\347\253\240/\345\215\232\345\256\242\345\216\206\345\217\262\346\274\224\350\277\233.md" "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\350\256\241\347\256\227\346\234\272/\346\226\207\347\253\240/\345\215\232\345\256\242\345\216\206\345\217\262\346\274\224\350\277\233.md"
index c4779e5e8..de6d10498 100644
--- "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\350\256\241\347\256\227\346\234\272/\346\226\207\347\253\240/\345\215\232\345\256\242\345\216\206\345\217\262\346\274\224\350\277\233.md"
+++ "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\350\256\241\347\256\227\346\234\272/\346\226\207\347\253\240/\345\215\232\345\256\242\345\216\206\345\217\262\346\274\224\350\277\233.md"
@@ -146,115 +146,293 @@
 
 ```javascript
 new Crawler({
+  // ⚠️ 三条硬性兼容要求（改动前请先看 assets/algolia-crawler.md 第三节）：
+  //   1. 第 1 行必须就是 new Crawler({，前面不能有注释或代码（algolia/docsearch#2190）
+  //   2. 不用模板字符串
+  //   3. 配置内部不写嵌套函数/回调：编辑器的静态检查解析不了嵌套作用域里的
+  //      参数绑定，会把回调参数报成未定义标识符（曾把 .each((_, el) => ...) 的
+  //      el 标红）。所以下面全部用普通下标循环 + 直筒代码，没有闭包。
+  appId: 'GX9RTL51BH',
+  // 保持你现有 Crawler 的 apiKey（不要把这个可写 key 提交进公开仓库）
+  apiKey: 'PlaceHolder',
   rateLimit: 8,
   maxDepth: 10,
   maxUrls: 5000,
-  startUrls: ["https://tinysnow.github.io"],
+  startUrls: [
+    'https://tinysnow.github.io',
+    // ⚠️ toc.html 必须留在 startUrls 里：站点静态 HTML 里首页只有
+    // print.html / last-updated.html 两个站内链接、没有任何 prev/next，
+    // 而 toc.html 里有 2359 条站内链接，是全站唯一的「发现入口」。
+    // 少了它，实测覆盖率会从 2360 个页面掉到 297 个（只剩「生活碎笔」那条章节链）。
+    // 它自己不会进索引：见下面的 pathsToMatch 排除 + recordExtractor 里的 SKIP_PATHS。
+    'https://tinysnow.github.io/toc.html',
+  ],
   renderJavaScript: false,
+  // 故意不用站点的 sitemap：它的 2360 条 URL 全部不带 .html（如 /个人简介），
+  // 而 GitHub Pages 对 /个人简介 和 /个人简介.html 都直接返回 200（不是 301 跳转），
+  // 用它会变成每个页面被索引两份。全站覆盖靠 toc.html 这个入口 + 站内链接。
   sitemaps: [],
   ignoreCanonicalTo: false,
-  discoveryPatterns: ["https://tinysnow.github.io/ **"],
-  schedule: "at 13:14 on Tuesday",
+  // 排除不需要下载的页面：print.html 是整本书合订本（19MB），404.html 没有内容。
+  // ⚠️ 千万不要把 toc.html 放进来——它是发现入口，排除它等于掐掉全站链接。
+  exclusionPatterns: [
+    'https://tinysnow.github.io/print.html',
+    'https://tinysnow.github.io/404.html',
+  ],
+  discoveryPatterns: ['https://tinysnow.github.io/**'],
+  schedule: 'at 13:14 on Tuesday',
   actions: [
     {
-      indexName: "tinysnowio",
-      pathsToMatch: ["https://tinysnow.github.io/** "],
-      recordExtractor: ({ $, helpers }) => {
-        // 去除不想要的 DOM
-        $("#sidebar").remove();
-        $("#menu-bar").remove();
-        $("#menu-bar").remove();
-
+      indexName: 'tinysnowio',
+      // 抓但不建索引的三个页面：toc.html 只用来发现链接，print/404 不是内容
+      pathsToMatch: [
+        'https://tinysnow.github.io/**',
+        '!https://tinysnow.github.io/toc.html',
+        '!https://tinysnow.github.io/print.html',
+        '!https://tinysnow.github.io/404.html',
+      ],
+      recordExtractor: ({ url, $, contentLength, helpers }) => {
+        /* ============================ 开关 ============================ */
+        const SKIP_PATHS = ['/print.html', '/toc.html', '/404.html'];
+        const MAX_PAGE_BYTES = 4 * 1024 * 1024;    // 超过这个体积的页面跳过
+        const INDEX_IMAGE_ALT = true;              // 把图片 alt 并入正文
+        const PAGE_TITLE_FALLBACK = true;          // 没有 h1 的页面用 <title> 补 lvl1
+        const PRE_SEGMENT = true;                  // 额外写一份「按词」的属性
+        const SEGMENT_MAX_CHARS = 3000;            // 分词副本截断长度
+        const MAX_RECORDS_PER_PAGE = 700;          // 爬虫单页硬上限是 750
+        const MERGE_MAX_CHARS = 1200;
+        const LEVELS = ['lvl0', 'lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'];
+        const HAS_CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;
+
+        // 中文分词器：ICU 词典，与 Algolia 引擎声称使用的 CJK 词典同源。
+        // 环境不支持 Intl.Segmenter 时退化为不分词，不影响爬取。
+        let segmenter = null;
+        try {
+          if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
+            segmenter = new Intl.Segmenter('zh-Hans', { granularity: 'word' });
+          }
+        } catch (e) { /* 忽略：走不分词分支 */ }
+
+        /* ========================== 跳过规则 ========================== */
+        if (SKIP_PATHS.indexOf(url.pathname) !== -1) return [];
+        if (contentLength && contentLength > MAX_PAGE_BYTES) return [];
+        // 抽取主体不存在就直接跳过，避免抽出菜单栏之类的垃圾
+        if ($('main').length === 0 && $('#mdbook-content').length === 0) return [];
+
+        /* ======================= 图片 alt 并入正文 ======================= */
+        // 用下标循环，不用回调，避免嵌套作用域
+        if (INDEX_IMAGE_ALT) {
+          const images = $('main img[alt]');
+          for (let i = 0; i < images.length; i++) {
+            const image = images[i];
+            const alt = ($(image).attr('alt') || '').trim();
+            // 只保留有信息量的 alt：含连续中文，或含连续英文且不像文件名。
+            // 实测本站 114 个去重 alt 里有 21 个是 image-20260531144550242、
+            // Snipaste_2023-10-22 这类文件名，靠下面这行挡掉。
+            const meaningful =
+              /[\u4e00-\u9fff]{2,}/.test(alt) ||
+              (/[A-Za-z]{2,}/.test(alt) && !/[_0-9]/.test(alt));
+            if (!meaningful) continue;
+            const safe = alt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
+            $(image).after('<p>' + safe + '</p>');
+          }
+        }
+
+        /* =========================== 抽取记录 =========================== */
         const records = helpers.docsearch({
           recordProps: {
+            // 故意不用站点标题 h1.menu-title：否则「微雪」会命中每一个页面
             lvl0: {
-              selectors: "",
-              defaultValue: "博客",
+              selectors: '',
+              defaultValue: '博客',
             },
-            lvl1: ["h1"],
-            lvl2: ["h2"],
-            lvl3: ["h3"],
-            lvl4: ["h4"],
-            lvl5: ["h5"],
-            lvl6: ["h6"],
+            // 页面标题 = <main> 里的 h1。
+            // ⚠️ 千万不要把 'head > title' 之类交给 helper 当兜底：它会在所有候选
+            //    选择器里取「文档顺序最靠前」的那个，<title> 在 <head> 里永远排第一，
+            //    结果 lvl1 全变成「重装系统 - 微雪博客」——标题带上站点名，而且
+            //    「微雪」「博客」会命中每一个页面（实测 2342/2342）。
+            //    没有 h1 的那 23 个页面改在下面用 <title> 补，见 PAGE_TITLE_FALLBACK。
+            lvl1: ['main h1', '#mdbook-content h1'],
+            lvl2: ['main h2', '#mdbook-content h2'],
+            lvl3: ['main h3', '#mdbook-content h3'],
+            lvl4: ['main h4', '#mdbook-content h4'],
+            lvl5: ['main h5', '#mdbook-content h5'],
+            lvl6: ['main h6', '#mdbook-content h6'],
+            // 正文：只取 <main> 里的块级元素。去掉了 span/a/em/strong/ul/ol
+            // （同一句话会被抽 3~4 遍），补上 td/th（表格）与 dd/dt，
+            // code 同时覆盖块级和行内代码。
             content: [
-              "p",
-              "li",
-              "ul",
-              "ol",
-              "code",
-              "span",
-              "strong",
-              "a",
-              "em",
+              'main p, main li, main td, main th, main code, main dd, main dt',
+              '#mdbook-content p, #mdbook-content li, #mdbook-content td, #mdbook-content th, #mdbook-content code, #mdbook-content dd, #mdbook-content dt',
             ],
+            // 语言交给 helper 写进每条记录
+            lang: { defaultValue: 'zh-CN' },
           },
           aggregateContent: true,
-          recordVersion: "v3",
+          indexHeadings: true,
+          recordVersion: 'v3',
         });
-        // 添加语言
-        records.forEach((record) => {
-          record.lang = "zh-CN";
-        });
-        return records;
+
+        /* ================== 单页记录数保护（内联，无函数）================== */
+        // 爬虫单页超过 750 条记录会直接报 Extractors returned too many records。
+        // 超过阈值时把「同一锚点、类型为 content」的相邻记录合并，标题原样保留；
+        // 在副本上合并，不改动 helper 返回的原对象。
+        let finalRecords = records;
+        if (records.length > MAX_RECORDS_PER_PAGE) {
+          const packed = [];
+          let pending = null;
+          for (let i = 0; i < records.length; i++) {
+            const record = records[i];
+            const isContent = record.type === 'content' && typeof record.content === 'string';
+            const canMerge =
+              pending &&
+              isContent &&
+              pending.url === record.url &&
+              pending.content.length + record.content.length < MERGE_MAX_CHARS;
+            if (canMerge) {
+              pending.content += '\n' + record.content;
+              continue;
+            }
+            if (pending) packed.push(pending);
+            if (isContent) {
+              pending = Object.assign({}, record);
+            } else {
+              pending = null;
+              packed.push(record);
+            }
+          }
+          if (pending) packed.push(pending);
+          finalRecords = packed;
+        }
+
+        /* ================ 写一份按词切分的副本（内联，无函数）================ */
+        // 先给没有标题的记录补 lvl1：这类页面 <main> 里没有 h1（实测 23 个），
+        // 只能用 <title> 兜底，并去掉「 - 微雪博客」这个站点名后缀。
+        // 放在分词之前，这样 hierarchy_words.lvl1 也会一起生成。
+        if (PAGE_TITLE_FALLBACK) {
+          const pageTitle = ($('head > title').text() || '').replace(/ - 微雪博客$/, '').trim();
+          if (pageTitle) {
+            for (let i = 0; i < finalRecords.length; i++) {
+              const titleHierarchy = finalRecords[i].hierarchy;
+              if (titleHierarchy && !titleHierarchy.lvl1) {
+                titleHierarchy.lvl1 = pageTitle;
+              }
+            }
+          }
+        }
+
+        // 把所有要分词的文本收集起来，统一分词后再写回，
+        // 这样正文和各级标题共用同一段逻辑，且不需要定义函数。
+        if (PRE_SEGMENT) {
+          const texts = [];
+          const targets = [];
+          for (let i = 0; i < finalRecords.length; i++) {
+            const record = finalRecords[i];
+            if (record.content) {
+              texts.push(String(record.content));
+              targets.push([i, '']);
+            }
+            const hierarchy = record.hierarchy || {};
+            for (let j = 0; j < LEVELS.length; j++) {
+              if (hierarchy[LEVELS[j]]) {
+                texts.push(String(hierarchy[LEVELS[j]]));
+                targets.push([i, LEVELS[j]]);
+              }
+            }
+          }
+
+          const segmented = [];
+          for (let i = 0; i < texts.length; i++) {
+            const text = texts[i];
+            let result = text;
+            if (segmenter && HAS_CJK.test(text)) {
+              // 只保留词元，用空格连接：重装系统 8->7 → 重装 系统 8 7
+              const parts = Array.from(segmenter.segment(text));
+              const words = [];
+              for (let k = 0; k < parts.length; k++) {
+                if (parts[k].isWordLike) words.push(parts[k].segment);
+              }
+              result = words.join(' ');
+              if (result.length > SEGMENT_MAX_CHARS) result = result.slice(0, SEGMENT_MAX_CHARS);
+            }
+            segmented.push(result);
+          }
+
+          for (let i = 0; i < finalRecords.length; i++) {
+            finalRecords[i].hierarchy_words = {};
+          }
+          for (let i = 0; i < targets.length; i++) {
+            const record = finalRecords[targets[i][0]];
+            const level = targets[i][1];
+            if (level) {
+              record.hierarchy_words[level] = segmented[i];
+            } else {
+              record.content_words = segmented[i];
+            }
+          }
+        }
+
+        return finalRecords;
       },
     },
   ],
   safetyChecks: { beforeIndexPublishing: { maxLostRecordsPercentage: 100 } },
   initialIndexSettings: {
     tinysnowio: {
-      attributesForFaceting: ["type", "lang"],
+      attributesForFaceting: ['type', 'lang'],
       attributesToRetrieve: [
-        "hierarchy",
-        "content",
-        "anchor",
-        "url",
-        "url_without_anchor",
-        "type",
+        'hierarchy',
+        'content',
+        'anchor',
+        'url',
+        'url_without_anchor',
+        'type',
+        'lang',
       ],
-      attributesToHighlight: ["hierarchy", "content"],
-      attributesToSnippet: ["content:10"],
-      camelCaseAttributes: ["hierarchy", "content"],
+      attributesToHighlight: ['hierarchy', 'content'],
+      attributesToSnippet: ['content:10'],
+      camelCaseAttributes: ['hierarchy', 'content'],
+      // 前 8 项是按词切分的副本（优先命中），后 8 项是按字的原文（兜底）。
+      // 若把上面的 PRE_SEGMENT 改成 false，请删掉前 8 项。
       searchableAttributes: [
-        "unordered(hierarchy.lvl0)",
-        "unordered(hierarchy.lvl1)",
-        "unordered(hierarchy.lvl2)",
-        "unordered(hierarchy.lvl3)",
-        "unordered(hierarchy.lvl4)",
-        "unordered(hierarchy.lvl5)",
-        "unordered(hierarchy.lvl6)",
-        "content",
+        'unordered(hierarchy_words.lvl0)',
+        'unordered(hierarchy_words.lvl1)',
+        'unordered(hierarchy_words.lvl2)',
+        'unordered(hierarchy_words.lvl3)',
+        'unordered(hierarchy_words.lvl4)',
+        'unordered(hierarchy_words.lvl5)',
+        'unordered(hierarchy_words.lvl6)',
+        'content_words',
+        'unordered(hierarchy.lvl0)',
+        'unordered(hierarchy.lvl1)',
+        'unordered(hierarchy.lvl2)',
+        'unordered(hierarchy.lvl3)',
+        'unordered(hierarchy.lvl4)',
+        'unordered(hierarchy.lvl5)',
+        'unordered(hierarchy.lvl6)',
+        'content',
       ],
       distinct: true,
-      attributeForDistinct: "url",
-      customRanking: [
-        "desc(weight.pageRank)",
-        "desc(weight.level)",
-        "asc(weight.position)",
-      ],
-      ranking: [
-        "words",
-        "filters",
-        "typo",
-        "attribute",
-        "proximity",
-        "exact",
-        "custom",
-      ],
+      // 按「页面」去重：同一篇文章只出一条命中，避免单页刷屏
+      // （原配置是 'url'，含锚点，等于按段落去重）
+      attributeForDistinct: 'url_without_anchor',
+      customRanking: ['desc(weight.pageRank)', 'desc(weight.level)', 'asc(weight.position)'],
+      ranking: ['words', 'filters', 'typo', 'attribute', 'proximity', 'exact', 'custom'],
       highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
-      highlightPostTag: "</span>",
+      highlightPostTag: '</span>',
       minWordSizefor1Typo: 3,
       minWordSizefor2Typos: 7,
       allowTyposOnNumericTokens: false,
       minProximity: 1,
       ignorePlurals: true,
+      // 中文按词切分的开关（原配置完全没有这两项）
+      indexLanguages: ['zh', 'en'],
+      queryLanguages: ['zh', 'en'],
       advancedSyntax: true,
       attributeCriteriaComputedByMinProximity: true,
-      removeWordsIfNoResults: "allOptional",
+      removeWordsIfNoResults: 'allOptional',
     },
   },
-  appId: "GX9RTL51BH",
-  apiKey: "PlaceHolder",
 });
 ```
 

~~~~~

</details>

<a id="f-383127424-theme-customized-search-js-2827483100"></a>
#### theme/customized/search.js

<details>
<summary><code>+382 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/theme/customized/search.js b/theme/customized/search.js
new file mode 100644
index 000000000..c078aa98e
--- /dev/null
+++ b/theme/customized/search.js
@@ -0,0 +1,382 @@
+/* ===========================================================================
+ * 微雪博客 · 自建 Algolia 搜索下拉面板
+ * ---------------------------------------------------------------------------
+ * 为什么不用 @docsearch/js：
+ *   DocSearch v3 每次查询只请求 hitsPerPage: 20 条，再在客户端按
+ *   maxResultsPerGroup（默认 5）切片，且没有任何分页；命中再多也看不到后面。
+ *   这里用 @algolia/autocomplete-js 自建下拉，支持「加载更多」逐页追加，
+ *   可以一直翻到最后一页。
+ *
+ * 依赖（见 theme/index.hbs，必须在 additional-js 之前引入）：
+ *   https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js@1.19.12/dist/umd/index.production.js
+ *   → window['@algolia/autocomplete-js']
+ * 查询直接走 Algolia 的 POST /1/indexes/{index}/query，所以不需要再引入
+ * algoliasearch 客户端，也就没有 v4（返回 {results}）与 v5（返回数组）的歧义。
+ * =========================================================================== */
+(function () {
+    'use strict';
+
+    var CONFIG = {
+        appId: 'GX9RTL51BH',
+        apiKey: 'c4caea4202132489213a6c5366c9952d',
+        indexName: 'tinysnowio',
+        container: '#docsearch',
+        placeholder: '搜索 / Search',
+
+        /* 每次「加载更多」追加多少条 */
+        perPage: 20,
+
+        /* ---- 查询处理（都在客户端做）----
+         * 引擎对中文是「按单字」切分的：实测把 indexLanguages/queryLanguages 设成
+         * ["zh","en"] 并重建索引后依旧如此——查「重装系统」的 _rankingInfo.words
+         * 恒为 4（重/装/系/统），查询中间加空格也一样。于是：
+         *   1. cleanQuery：先把中文虚词去掉，否则「怎么重装系统」会变成 6 个单字的
+         *      AND，正确页面因为没有「怎么」反而不满足，前几条全是无关文章；
+         *      清洗成「重装系统」后前三名正好是三篇重装系统文章（实测）。
+         *   2. preferWordAttributes：优先只搜爬虫写的「按词」属性
+         *      （content_words / hierarchy_words）。实测 52 条精确短语：top1 从 15
+         *      涨到 33、进不了前 20 的从 14 降到 5；而只搜按字原文属性的成绩与基线
+         *      完全相同（拖后腿的是它）。若一条都没命中，会自动退回「原查询 + 全部属性」。 */
+        cleanQuery: true,
+        preferWordAttributes: true,
+        wordAttributes: [
+            'hierarchy_words.lvl0', 'hierarchy_words.lvl1', 'hierarchy_words.lvl2',
+            'hierarchy_words.lvl3', 'hierarchy_words.lvl4', 'hierarchy_words.lvl5',
+            'hierarchy_words.lvl6', 'content_words'
+        ],
+
+        /* 自建面板初始化失败时，退回 DocSearch 弹窗（每页条数已提高） */
+        fallbackToDocSearch: true
+    };
+
+    /* ===================== 中文查询分词 ===================== */
+    /* 与爬虫端 assets/algolia-crawler-config.js 使用同一套 ICU 规则，
+     * 保证查询和索引切出来的词一致。 */
+    var segmenter = (function () {
+        try {
+            if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
+                return new Intl.Segmenter('zh-Hans', { granularity: 'word' });
+            }
+        } catch (e) { /* 环境不支持就不分词 */ }
+        return null;
+    })();
+    var HAS_CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;
+
+    /* 单字虚词：作为独立词出现时丢掉（不用正则，避免误伤「上海」里的「上」） */
+    var STOP_CHARS = '的了是在和与及也就都很更最又还只把被给对从到向着并而或但如果因为所以之其此该等';
+    /* 多字虚词：ICU 会把它们切成一个词，按词整体丢掉 */
+    var STOP_WORDS = {
+        '怎么': 1, '怎样': 1, '如何': 1, '什么': 1, '为什么': 1, '哪个': 1, '哪些': 1,
+        '可以': 1, '能否': 1, '是否': 1, '这个': 1, '那个': 1, '这些': 1, '那些': 1,
+        '我们': 1, '你们': 1, '他们': 1, '就是': 1, '还是': 1, '只是': 1, '不是': 1,
+        '因为': 1, '所以': 1, '但是': 1, '不过': 1, '如果': 1, '需要': 1, '应该': 1,
+        '一个': 1, '一种': 1, '一下': 1, '一些': 1, '一直': 1, '已经': 1, '正在': 1,
+        '以及': 1, '并且': 1, '或者': 1, '然后': 1, '这样': 1, '那样': 1, '多少': 1,
+        '时候': 1, '现在': 1, '开始': 1, '进行': 1, '关于': 1, '对于': 1, '由于': 1
+    };
+
+    /* 把用户输入变成更容易命中的查询；不需要清洗时返回 null（表示按原样发送） */
+    function analyzeQuery(text) {
+        if (!CONFIG.cleanQuery || !segmenter || !HAS_CJK.test(text)) {
+            return null;
+        }
+        var parts = Array.from(segmenter.segment(text));
+        var words = [];
+        for (var i = 0; i < parts.length; i++) {
+            var part = parts[i];
+            if (!part.isWordLike) {
+                continue;
+            }
+            var word = part.segment;
+            if (STOP_WORDS[word]) {
+                continue;
+            }
+            if (word.length === 1 && STOP_CHARS.indexOf(word) !== -1) {
+                continue;
+            }
+            words.push(word);
+        }
+        if (!words.length) {
+            return null;      // 全是虚词，别清洗，直接按原样查
+        }
+        var out = words.join(' ');
+        return out === text ? null : out;
+    }
+
+    /* ===================== Algolia 查询 ===================== */
+    function searchUrl() {
+        return 'https://' + CONFIG.appId + '-dsn.algolia.net/1/indexes/'
+            + encodeURIComponent(CONFIG.indexName) + '/query';
+    }
+
+    function fetchPage(query, page, useWordAttributes) {
+        var payload = {
+            query: query,
+            hitsPerPage: CONFIG.perPage,
+            page: page,
+            attributesToRetrieve: ['hierarchy', 'content', 'url', 'url_without_anchor', 'anchor', 'type'],
+            attributesToHighlight: ['hierarchy'],
+            attributesToSnippet: ['content:24'],
+            highlightPreTag: '<mark>',
+            highlightPostTag: '</mark>',
+            snippetEllipsisText: '…'
+        };
+        if (useWordAttributes && CONFIG.preferWordAttributes) {
+            payload.restrictSearchableAttributes = CONFIG.wordAttributes;
+        }
+        var init = {
+            method: 'POST',
+            headers: {
+                'X-Algolia-Application-Id': CONFIG.appId,
+                'X-Algolia-API-Key': CONFIG.apiKey,
+                'Content-Type': 'application/json'
+            },
+            body: JSON.stringify(payload)
+        };
+        if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
+            init.signal = AbortSignal.timeout(15000);
+        }
+        return fetch(searchUrl(), init).then(function (res) {
+            if (!res.ok) {
+                throw new Error('Algolia 返回 HTTP ' + res.status);
+            }
+            return res.json();
+        });
+    }
+
+    /* ===================== 分页状态 ===================== */
+    /* sent：实际发给 Algolia 的查询（可能是清洗过的）
+     * mode：'words' = 只搜按词属性；'all' = 搜全部属性 */
+    var store = { query: '', sent: '', mode: '', page: 0, hits: [], nbHits: 0 };
+
+    function resetStore(query) {
+        store = { query: query, sent: '', mode: '', page: 0, hits: [], nbHits: 0 };
+    }
+
+    function mergeHits(list) {
+        var seen = Object.create(null);
+        var merged = [];
+        list.forEach(function (hit) {
+            if (!hit || !hit.objectID || seen[hit.objectID]) {
+                return;
+            }
+            seen[hit.objectID] = true;
+            merged.push(hit);
+        });
+        return merged;
+    }
+
+    /* ===================== 渲染 ===================== */
+    /* 优先用 Algolia 的高亮结果：它已经做过 HTML 转义，只额外插入 <mark>；
+     * 爬虫存进索引的层级文本本身也是实体转义过的，所以可以安全地当 HTML 用。 */
+    function levelHtml(item, level) {
+        var hl = item._highlightResult && item._highlightResult.hierarchy;
+        if (hl && hl[level] && hl[level].value) {
+            return hl[level].value;
+        }
+        var raw = item.hierarchy && item.hierarchy[level];
+        return raw ? String(raw) : '';
+    }
+
+    function renderLoadMore(item, html) {
+        return html`<div class="aa-ItemContent md-search-more">
+            <div class="aa-ItemContentBody">
+                <div class="aa-ItemContentTitle">加载更多（已显示 ${String(item.shown)} / 共 ${String(item.total)} 条）</div>
+            </div>
+        </div>`;
+    }
+
+    function renderNotice(text, html) {
+        return html`<div class="aa-ItemContent md-search-notice">
+            <div class="aa-ItemContentBody">
+                <div class="aa-ItemContentTitle">${text}</div>
+            </div>
+        </div>`;
+    }
+
+    function renderHit(item, html) {
+        var title = levelHtml(item, 'lvl1') || levelHtml(item, 'lvl0') || '(无标题)';
+        var path = [];
+        ['lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'].forEach(function (level) {
+            var value = levelHtml(item, level);
+            if (value) {
+                path.push(value);
+            }
+        });
+        var snippet = item._snippetResult && item._snippetResult.content
+            && item._snippetResult.content.value;
+        var pathText = path.join(' › ');
+
+        return html`<a class="aa-ItemLink" href="${item.url}">
+            <div class="aa-ItemContent">
+                <div class="aa-ItemIcon aa-ItemIcon--noBorder md-search-icon">
+                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
+                </div>
+                <div class="aa-ItemContentBody">
+                    <div class="aa-ItemContentTitle" dangerouslySetInnerHTML=${ { __html: title } }></div>
+                    ${pathText ? html`<div class="aa-ItemContentDescription md-search-path" dangerouslySetInnerHTML=${ { __html: pathText } }></div>` : null}
+                    ${snippet ? html`<div class="aa-ItemContentDescription md-search-snippet" dangerouslySetInnerHTML=${ { __html: snippet } }></div>` : null}
+                </div>
+            </div>
+        </a>`;
+    }
+
+    /* ===================== 数据源 ===================== */
+    function buildSources(params) {
+        var query = (params.query || '').trim();
+        if (!query) {
+            return [];
+        }
+        return [{
+            sourceId: 'tinysnowio',
+            getItems: function () {
+                if (store.query !== query) {
+                    resetStore(query);
+                }
+                if (!store.sent) {
+                    store.sent = analyzeQuery(query) || query;   // 清洗虚词，返回 null 就用原查询
+                    store.mode = 'words';
+                }
+                var page = store.page;
+
+                function collect(data) {
+                    store.hits = mergeHits(store.hits.concat((data && data.hits) || []));
+                    if (data && typeof data.nbHits === 'number') {
+                        store.nbHits = data.nbHits;
+                    }
+                    var items = store.hits.slice();
+                    if (items.length > 0 && items.length < store.nbHits) {
+                        items.push({
+                            __loadMore: true,
+                            objectID: '__load_more__',
+                            shown: items.length,
+                            total: store.nbHits
+                        });
+                    }
+                    return items;
+                }
+
+                return fetchPage(store.sent, page, store.mode === 'words').then(function (data) {
+                    /* 查询已经变了，丢掉过期结果 */
+                    if (store.query !== query) {
+                        return [];
+                    }
+                    /* 只搜「按词」属性一条都没命中 → 退回「原查询 + 全部属性」再试一次 */
+                    if (page === 0 && store.mode === 'words' && data && data.nbHits === 0) {
+                        store.mode = 'all';
+                        store.sent = query;
+                        return fetchPage(query, 0, false).then(function (fallback) {
+                            if (store.query !== query) {
+                                return [];
+                            }
+                            return collect(fallback);
+                        });
+                    }
+                    return collect(data);
+                }).catch(function (err) {
+                    if (window.console && console.warn) {
+                        console.warn('[search] 查询失败：', err);
+                    }
+                    return [{ __notice: true, objectID: '__search_error__', text: '搜索服务暂时不可用，请稍后再试' }];
+                });
+            },
+            templates: {
+                header: function (props) {
+                    if (!store.nbHits) {
+                        return null;
+                    }
+                    return props.html`<div class="md-search-count">共 ${String(store.nbHits)} 条命中</div>`;
+                },
+                item: function (props) {
+                    var item = props.item;
+                    if (!item) {
+                        return null;
+                    }
+                    if (item.__loadMore) {
+                        return renderLoadMore(item, props.html);
+                    }
+                    if (item.__notice) {
+                        return renderNotice(item.text, props.html);
+                    }
+                    return renderHit(item, props.html);
+                },
+                noResults: function () {
+                    return '没有找到结果';
+                }
+            },
+            onSelect: function (p) {
+                var item = p.item || {};
+                if (p.event && typeof p.event.preventDefault === 'function') {
+                    p.event.preventDefault();
+                }
+                if (item.__loadMore) {
+                    store.page = store.page + 1;
+                    if (typeof p.refresh === 'function') {
+                        p.refresh();
+                    }
+                    return;
+                }
+                if (item.__notice) {
+                    return;
+                }
+                if (item.url) {
+                    window.location.href = item.url;
+                }
+            }
+        }];
+    }
+
+    /* ===================== 启动 ===================== */
+    function mountDocSearchFallback() {
+        if (!CONFIG.fallbackToDocSearch || typeof window.docsearch !== 'function') {
+            return;
+        }
+        try {
+            window.docsearch({
+                appId: CONFIG.appId,
+                apiKey: CONFIG.apiKey,
+                indexName: CONFIG.indexName,
+                container: CONFIG.container,
+                debug: false,
+                /* DocSearch 的默认值：抓 20 条、每组只渲染 5 条。这里都提高。 */
+                searchParameters: { hitsPerPage: 40 },
+                maxResultsPerGroup: 20
+            });
+        } catch (e) {
+            if (window.console && console.error) {
+                console.error('[search] DocSearch 兜底也失败了：', e);
+            }
+        }
+    }
+
+    function boot() {
+        var container = document.querySelector(CONFIG.container);
+        if (!container) {
+            return;
+        }
+        var AC = window['@algolia/autocomplete-js'];
+        if (!AC || typeof AC.autocomplete !== 'function' || typeof window.fetch !== 'function') {
+            mountDocSearchFallback();
+            return;
+        }
+        try {
+            AC.autocomplete({
+                container: container,
+                placeholder: CONFIG.placeholder,
+                openOnFocus: false,
+                getSources: buildSources
+            });
+        } catch (e) {
+            if (window.console && console.error) {
+                console.error('[search] 自建面板初始化失败，退回 DocSearch：', e);
+            }
+            mountDocSearchFallback();
+        }
+    }
+
+    if (document.readyState === 'loading') {
+        document.addEventListener('DOMContentLoaded', boot);
+    } else {
+        boot();
+    }
+})();

~~~~~

</details>

<a id="f-383127424-theme-customized-style-css-2110612380"></a>
#### theme/customized/style.css

<details>
<summary><code>+120 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/theme/customized/style.css b/theme/customized/style.css
index 1034b2f97..2edd368d9 100644
--- a/theme/customized/style.css
+++ b/theme/customized/style.css
@@ -101,4 +101,124 @@ code.editable, .ace_scroller {
 
 .chapter li .md-viewed {
     color: #777;
+}
+
+/* ===========================================================================
+ * 自建搜索面板（逻辑见 theme/customized/search.js）
+ * 搜索框占据菜单栏原有的 #docsearch 容器，下拉面板比搜索框宽，所以容器需要
+ * position: relative 作为定位参照。
+ * =========================================================================== */
+#docsearch {
+    position: relative;
+    align-self: center;
+    width: 210px;
+    margin-right: 6px;
+    z-index: 120;
+    /* classic 主题变量：面板高度、字号、层级 */
+    --aa-panel-max-height: min(70vh, 620px);
+    --aa-font-size: 1.4rem;
+    --aa-search-input-height: 30px;
+    --aa-base-z-index: 300;
+}
+
+#docsearch .aa-Autocomplete,
+#docsearch .aa-Form {
+    width: 100%;
+}
+
+#docsearch .aa-Form {
+    border-radius: 6px;
+    min-height: 30px;
+}
+
+#docsearch .aa-Input {
+    padding: 3px 6px;
+    height: 28px;
+}
+
+/* 面板贴合容器左边缘展开，并限制宽度避免在小屏溢出 */
+#docsearch .aa-Panel {
+    left: 0;
+    width: min(680px, calc(100vw - 32px));
+    border-radius: 8px;
+}
+
+#docsearch .md-search-count {
+    padding: 2px 4px 6px;
+    font-size: 1.2rem;
+    opacity: .65;
+}
+
+#docsearch .aa-ItemContentTitle {
+    font-size: 1.45rem;
+    line-height: 1.45;
+}
+
+#docsearch .md-search-path {
+    font-size: 1.2rem;
+    opacity: .7;
+}
+
+#docsearch .md-search-snippet {
+    display: -webkit-box;
+    -webkit-line-clamp: 2;
+    -webkit-box-orient: vertical;
+    overflow: hidden;
+    font-size: 1.25rem;
+    line-height: 1.5;
+}
+
+#docsearch .md-search-snippet mark,
+#docsearch .md-search-path mark,
+#docsearch .aa-ItemContentTitle mark {
+    background: rgba(255, 214, 0, .45);
+    color: inherit;
+    border-radius: 2px;
+    padding: 0 1px;
+}
+
+#docsearch .md-search-icon {
+    background: none;
+    box-shadow: none;
+}
+
+#docsearch .md-search-more,
+#docsearch .md-search-notice {
+    justify-content: center;
+    text-align: center;
+    color: var(--icons-hover, #7272ff);
+}
+
+#docsearch .md-search-more .aa-ItemContentTitle {
+    font-size: 1.3rem;
+    font-weight: 500;
+}
+
+/* 暗色主题：mdBook 用 html 上的 class 切主题，不是 prefers-color-scheme */
+html.ayu #docsearch,
+html.navy #docsearch,
+html.coal #docsearch {
+    --aa-text-color-rgb: 208, 208, 214;
+    --aa-background-color-rgb: 28, 31, 40;
+    --aa-input-background-color-rgb: 20, 22, 29;
+    --aa-primary-color-rgb: 158, 151, 255;
+    --aa-muted-color-rgb: 150, 150, 170;
+    --aa-icon-color-rgb: 170, 170, 200;
+    --aa-selected-color-rgb: 158, 151, 255;
+    --aa-selected-color-alpha: .28;
+    --aa-panel-border-color-rgb: 90, 94, 115;
+    --aa-input-border-color-rgb: 100, 104, 128;
+    --aa-description-highlight-background-color-rgb: 0, 255, 255;
+    --aa-description-highlight-background-color-alpha: .22;
+    --aa-scrollbar-track-background-color-rgb: 44, 46, 64;
+    --aa-panel-shadow: 0 0 0 1px rgba(120, 124, 150, .25), 0 8px 24px -6px rgba(0, 0, 0, .6);
+}
+
+@media only screen and (max-width: 700px) {
+    #docsearch {
+        width: 140px;
+    }
+    #docsearch .aa-Input {
+        font-size: 1.2rem;
+    }
 }
\ No newline at end of file

~~~~~

</details>

<a id="f-383127424-theme-index-hbs-1765250716"></a>
#### theme/index.hbs

<details>
<summary><code>+10 / -25</code> Click to expand diff</summary>

~~~~~diff
diff --git a/theme/index.hbs b/theme/index.hbs
index 25183d11e..3ec4b8b5d 100644
--- a/theme/index.hbs
+++ b/theme/index.hbs
@@ -68,12 +68,14 @@
         </script>
 
         <!-- Doc Search -->
+        <!-- 自建搜索面板用的 classic 主题，版本与下方 autocomplete-js 保持一致 -->
         <link
             rel="stylesheet"
-            href="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-theme-classic"
+            href="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-theme-classic@1.19.12/dist/theme.min.css"
         />
-        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
-        <link rel="preconnect" href="https://YOUR_APP_ID-dsn.algolia.net" crossorigin />
+        <!-- 仅在自建搜索面板初始化失败时，给 DocSearch 弹窗兜底用 -->
+        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3.9.0/dist/style.css" />
+        <link rel="preconnect" href="https://GX9RTL51BH-dsn.algolia.net" crossorigin />
         
 
         <!-- Provide site root to javascript -->
@@ -441,6 +443,11 @@
         </script>
 
 
+        <!-- 搜索面板依赖：必须在 additional-js（theme/customized/search.js）之前同步加载 -->
+        <script src="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js@1.19.12/dist/umd/index.production.js"></script>
+        <!-- 仅作为自建面板初始化失败时的兜底 -->
+        <script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3.9.0/dist/umd/index.js"></script>
+
         <!-- Custom JS scripts -->
         {{#each additional_js}}
         <script src="{{ resource this}}"></script>
@@ -464,10 +471,6 @@
         {{/if}}
         {{/if}}
 
-        <!-- <script src="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js"></script> -->
-        <!-- <script> -->
-            <!-- const { autocomplete } = window['@algolia/autocomplete-js']; -->
-        <!-- </script> -->
         {{#if fragment_map}}
         <script>
             document.addEventListener('DOMContentLoaded', function() {
@@ -482,24 +485,6 @@
             });
         </script>
         {{/if}}
-        <script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3"></script>
-
-        <script type="text/javascript">
-            docsearch({
-                appId: 'GX9RTL51BH',
-                apiKey: 'c4caea4202132489213a6c5366c9952d',
-                indexName: 'tinysnowio',
-                container: '#docsearch',
-                debug: false // Set debug to true if you want to inspect the modal
-            });
-            // autocomplete({
-            //   container: '#docsearch',
-            //   placeholder: '搜索 / Search',
-            //   getSources() {
-            //     return [];
-            //   },
-            // });
-        </script>
     </div>
     </body>
 </html>

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-13 12:58:45 CMT (UTC+8) | 59ca20519）

### Summary

- Generated at: `2026-10-13 12:58:45 CMT (UTC+8)`
- Base commit: `59ca20519`
- Diff source: `2eef0b4eb6174e7d8b6ca349b059c06857ff2f2f..59ca20519465f6023a60a0bc305e8539611ecd16`
- Changed files: `85`
- Total lines: `+6018 / -84`

### Commit Messages

- `59ca2051` 情感类随记：一级标题同步改为短标题
- `16562c19` 情感类随记：文件名由日期改为短标题，并同步 SUMMARY 目录

### Index

1. [src/SUMMARY.md](#f-3737320117-src-summary-md-3501257646) `+84 / -84`
2. [src/生活碎笔/随笔随记/情感类随记/随记-一句别理他.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-一句别理他-md-2835464952) `+78 / -0`
3. [src/生活碎笔/随笔随记/情感类随记/随记-一句辛苦了.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-一句辛苦了-md-497274961) `+25 / -0`
4. [src/生活碎笔/随笔随记/情感类随记/随记-一杯杨枝甘露.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-一杯杨枝甘露-md-1223859162) `+73 / -0`
5. [src/生活碎笔/随笔随记/情感类随记/随记-一盘留菜.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-一盘留菜-md-2432530295) `+67 / -0`
6. [src/生活碎笔/随笔随记/情感类随记/随记-一袋酥肉.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-一袋酥肉-md-1161987522) `+51 / -0`
7. [src/生活碎笔/随笔随记/情感类随记/随记-不必追.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-不必追-md-1577826122) `+81 / -0`
8. [src/生活碎笔/随笔随记/情感类随记/随记-不烟不酒.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-不烟不酒-md-3339919755) `+206 / -0`
9. [src/生活碎笔/随笔随记/情感类随记/随记-临时车与零食车.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-临时车与零食车-md-1978739004) `+29 / -0`
10. [src/生活碎笔/随笔随记/情感类随记/随记-什么值得展示.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-什么值得展示-md-3427351369) `+71 / -0`
11. [src/生活碎笔/随笔随记/情感类随记/随记-倒装.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-倒装-md-371734931) `+91 / -0`
12. [src/生活碎笔/随笔随记/情感类随记/随记-停转的表.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-停转的表-md-2205869563) `+15 / -0`
13. [src/生活碎笔/随笔随记/情感类随记/随记-兔耳朵恶作剧.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-兔耳朵恶作剧-md-4290298657) `+80 / -0`
14. [src/生活碎笔/随笔随记/情感类随记/随记-发梢的夕烧.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-发梢的夕烧-md-1096137771) `+42 / -0`
15. [src/生活碎笔/随笔随记/情感类随记/随记-后座的安心.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-后座的安心-md-3599437104) `+106 / -0`
16. [src/生活碎笔/随笔随记/情感类随记/随记-围巾与法官.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-围巾与法官-md-1913572542) `+507 / -0`
17. [src/生活碎笔/随笔随记/情感类随记/随记-墨水套装.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-墨水套装-md-3597253762) `+47 / -0`
18. [src/生活碎笔/随笔随记/情感类随记/随记-夜雨美术室.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-夜雨美术室-md-3123971151) `+27 / -0`
19. [src/生活碎笔/随笔随记/情感类随记/随记-夸她好看.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-夸她好看-md-4108073540) `+59 / -0`
20. [src/生活碎笔/随笔随记/情感类随记/随记-她存下的照片.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-她存下的照片-md-1009687509) `+29 / -0`
21. [src/生活碎笔/随笔随记/情感类随记/随记-姓氏壁纸.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-姓氏壁纸-md-342320584) `+63 / -0`
22. [src/生活碎笔/随笔随记/情感类随记/随记-寄往异国的信.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-寄往异国的信-md-1240354025) `+45 / -0`
23. [src/生活碎笔/随笔随记/情感类随记/随记-小店叙旧.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-小店叙旧-md-1621646347) `+71 / -0`
24. [src/生活碎笔/随笔随记/情感类随记/随记-尾号是生日.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-尾号是生日-md-1249434172) `+27 / -0`
25. [src/生活碎笔/随笔随记/情感类随记/随记-应酬是吃饭.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-应酬是吃饭-md-3457922546) `+77 / -0`
26. [src/生活碎笔/随笔随记/情感类随记/随记-开服.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-开服-md-3154549928) `+113 / -0`
27. [src/生活碎笔/随笔随记/情感类随记/随记-成熟与依靠.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-成熟与依靠-md-1569364817) `+45 / -0`
28. [src/生活碎笔/随笔随记/情感类随记/随记-我想成为的人.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-我想成为的人-md-1299313926) `+35 / -0`
29. [src/生活碎笔/随笔随记/情感类随记/随记-报复性熬夜.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-报复性熬夜-md-1624262406) `+39 / -0`
30. [src/生活碎笔/随笔随记/情感类随记/随记-拐弯.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-拐弯-md-1126463769) `+37 / -0`
31. [src/生活碎笔/随笔随记/情感类随记/随记-拼图与落花.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-拼图与落花-md-359347705) `+52 / -0`
32. [src/生活碎笔/随笔随记/情感类随记/随记-推免改方案.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-推免改方案-md-2376539140) `+117 / -0`
33. [src/生活碎笔/随笔随记/情感类随记/随记-搭棚.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-搭棚-md-3327051884) `+58 / -0`
34. [src/生活碎笔/随笔随记/情感类随记/随记-摸黑找开关.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-摸黑找开关-md-398858591) `+43 / -0`
35. [src/生活碎笔/随笔随记/情感类随记/随记-斜坡与轮椅.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-斜坡与轮椅-md-1515422815) `+85 / -0`
36. [src/生活碎笔/随笔随记/情感类随记/随记-旗与故人.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-旗与故人-md-3929869569) `+47 / -0`
37. [src/生活碎笔/随笔随记/情感类随记/随记-晒痕.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-晒痕-md-1567780903) `+49 / -0`
38. [src/生活碎笔/随笔随记/情感类随记/随记-暴雨停电.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-暴雨停电-md-3786261542) `+13 / -0`
39. [src/生活碎笔/随笔随记/情感类随记/随记-未能牵手.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-未能牵手-md-2408345507) `+85 / -0`
40. [src/生活碎笔/随笔随记/情感类随记/随记-枇杷树.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-枇杷树-md-3383266846) `+39 / -0`
41. [src/生活碎笔/随笔随记/情感类随记/随记-梦里的大姐姐.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-梦里的大姐姐-md-1303814127) `+69 / -0`
42. [src/生活碎笔/随笔随记/情感类随记/随记-毅力与星星.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-毅力与星星-md-961395403) `+51 / -0`
43. [src/生活碎笔/随笔随记/情感类随记/随记-母亲的蒸馍.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-母亲的蒸馍-md-3082523425) `+17 / -0`
44. [src/生活碎笔/随笔随记/情感类随记/随记-没能忘记.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-没能忘记-md-3610829421) `+25 / -0`
45. [src/生活碎笔/随笔随记/情感类随记/随记-海豚式俯卧撑.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-海豚式俯卧撑-md-2585757694) `+99 / -0`
46. [src/生活碎笔/随笔随记/情感类随记/随记-渺小如蜉蝣.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-渺小如蜉蝣-md-2745373181) `+29 / -0`
47. [src/生活碎笔/随笔随记/情感类随记/随记-热爱与傲慢.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-热爱与傲慢-md-1945549554) `+123 / -0`
48. [src/生活碎笔/随笔随记/情感类随记/随记-父亲考驾照.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-父亲考驾照-md-2446396298) `+39 / -0`
49. [src/生活碎笔/随笔随记/情感类随记/随记-理发师的三年.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-理发师的三年-md-1013657575) `+89 / -0`
50. [src/生活碎笔/随笔随记/情感类随记/随记-生日与回礼.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-生日与回礼-md-4121230354) `+37 / -0`
51. [src/生活碎笔/随笔随记/情感类随记/随记-生活回来了.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-生活回来了-md-4294559662) `+73 / -0`
52. [src/生活碎笔/随笔随记/情感类随记/随记-白盒黑盒.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-白盒黑盒-md-3853871566) `+173 / -0`
53. [src/生活碎笔/随笔随记/情感类随记/随记-碰拳之约.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-碰拳之约-md-2002422807) `+105 / -0`
54. [src/生活碎笔/随笔随记/情感类随记/随记-祭桥.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-祭桥-md-1438472202) `+29 / -0`
55. [src/生活碎笔/随笔随记/情感类随记/随记-窗外的爵士舞.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-窗外的爵士舞-md-1253142257) `+46 / -0`
56. [src/生活碎笔/随笔随记/情感类随记/随记-第一次吃蛋挞.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-第一次吃蛋挞-md-720831749) `+79 / -0`
57. [src/生活碎笔/随笔随记/情感类随记/随记-第一次拥抱.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-第一次拥抱-md-3820229581) `+97 / -0`
58. [src/生活碎笔/随笔随记/情感类随记/随记-米袋子.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-米袋子-md-3991696132) `+51 / -0`
59. [src/生活碎笔/随笔随记/情感类随记/随记-素描与集市.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-素描与集市-md-1069247063) `+61 / -0`
60. [src/生活碎笔/随笔随记/情感类随记/随记-累而不讨好.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-累而不讨好-md-3145549550) `+69 / -0`
61. [src/生活碎笔/随笔随记/情感类随记/随记-纸箱与痕迹.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-纸箱与痕迹-md-2237151105) `+69 / -0`
62. [src/生活碎笔/随笔随记/情感类随记/随记-翻跟斗的孩子.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-翻跟斗的孩子-md-3879746376) `+39 / -0`
63. [src/生活碎笔/随笔随记/情感类随记/随记-聊天背景.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-聊天背景-md-3684079162) `+105 / -0`
64. [src/生活碎笔/随笔随记/情感类随记/随记-背向太阳.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-背向太阳-md-3299758511) `+113 / -0`
65. [src/生活碎笔/随笔随记/情感类随记/随记-胭脂洪泛.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-胭脂洪泛-md-1394795374) `+159 / -0`
66. [src/生活碎笔/随笔随记/情感类随记/随记-自我实验室.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-自我实验室-md-179623279) `+51 / -0`
67. [src/生活碎笔/随笔随记/情感类随记/随记-舞社的水.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-舞社的水-md-2339455061) `+37 / -0`
68. [src/生活碎笔/随笔随记/情感类随记/随记-茉莉清茶.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-茉莉清茶-md-1785395687) `+231 / -0`
69. [src/生活碎笔/随笔随记/情感类随记/随记-茶叶沉底.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-茶叶沉底-md-2091404330) `+38 / -0`
70. [src/生活碎笔/随笔随记/情感类随记/随记-蒜苔与旧嗓音.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-蒜苔与旧嗓音-md-3400333868) `+83 / -0`
71. [src/生活碎笔/随笔随记/情感类随记/随记-蓝色衣服.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-蓝色衣服-md-3123043634) `+50 / -0`
72. [src/生活碎笔/随笔随记/情感类随记/随记-被喊叔叔.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-被喊叔叔-md-2848297441) `+109 / -0`
73. [src/生活碎笔/随笔随记/情感类随记/随记-被当成测绘师.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-被当成测绘师-md-1822661961) `+37 / -0`
74. [src/生活碎笔/随笔随记/情感类随记/随记-踩着石砖回家.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-踩着石砖回家-md-3089621363) `+27 / -0`
75. [src/生活碎笔/随笔随记/情感类随记/随记-车站显示屏.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-车站显示屏-md-3739074031) `+43 / -0`
76. [src/生活碎笔/随笔随记/情感类随记/随记-银行劝退.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-银行劝退-md-624583535) `+49 / -0`
77. [src/生活碎笔/随笔随记/情感类随记/随记-长大的瞬间.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-长大的瞬间-md-2846214629) `+63 / -0`
78. [src/生活碎笔/随笔随记/情感类随记/随记-雏菊的花语.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-雏菊的花语-md-4085380664) `+33 / -0`
79. [src/生活碎笔/随笔随记/情感类随记/随记-雨中归途.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-雨中归途-md-483138504) `+81 / -0`
80. [src/生活碎笔/随笔随记/情感类随记/随记-雨中牵手.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-雨中牵手-md-1301972727) `+21 / -0`
81. [src/生活碎笔/随笔随记/情感类随记/随记-青春与去爱.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-青春与去爱-md-2853163937) `+91 / -0`
82. [src/生活碎笔/随笔随记/情感类随记/随记-高中的钢笔.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-高中的钢笔-md-627302685) `+37 / -0`
83. [src/生活碎笔/随笔随记/情感类随记/随记-高考前的干拌面.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-高考前的干拌面-md-1520632437) `+39 / -0`
84. [src/生活碎笔/随笔随记/情感类随记/随记-黑白格子.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-黑白格子-md-2814159259) `+51 / -0`
85. [src/生活碎笔/随笔随记/情感类随记/随记-鼎下的空气墙.md](#f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-鼎下的空气墙-md-4145229456) `+93 / -0`

### Diffs

<a id="f-3737320117-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+84 / -84</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index 2ab1f7b7a..28869369b 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -183,91 +183,91 @@
   - [通往优秀的路上，痛苦是一种试炼](生活碎笔/文章与写作/通往优秀的路上，痛苦是一种试炼.md)
 - [随笔随记 | Essays](生活碎笔/随笔随记/随记.md)
   - [情感类随记](生活碎笔/随笔随记/情感类随记/情感类随记.md)
-    - [随记 - 2026 年 4 月 3 日](生活碎笔/随笔随记/情感类随记/随记-2026年4月3日.md)
-    - [随记 - 2025 年 11 月 2 日](生活碎笔/随笔随记/情感类随记/随记-2025年11月2日.md)
+    - [随记 - 青春与去爱](生活碎笔/随笔随记/情感类随记/随记-青春与去爱.md)
+    - [随记 - 海豚式俯卧撑](生活碎笔/随笔随记/情感类随记/随记-海豚式俯卧撑.md)
     - [随记 - Hacker 与舞蹈](生活碎笔/随笔随记/情感类随记/随记-Hacker与舞蹈.md)
-    - [随记 - 2025 年 3 月 23 日](生活碎笔/随笔随记/情感类随记/随记-2025年3月23日.md)
-    - [随记 - 2025 年 1 月 15 日](生活碎笔/随笔随记/情感类随记/随记-2025年1月15日.md)
-    - [随记 - 2024 年 12 月 5 日](生活碎笔/随笔随记/情感类随记/随记-2024年12月5日.md)
-    - [随记 - 2024 年 4 月 12 日](生活碎笔/随笔随记/情感类随记/随记-2024年4月12日.md)
-    - [随记 - 2023 年 12 月 19 日](生活碎笔/随笔随记/情感类随记/随记-2023年12月19日.md)
-    - [随记 - 2023 年 12 月 5 日](生活碎笔/随笔随记/情感类随记/随记-2023年12月5日.md)
-    - [随记 - 2023 年 11 月 25 日](生活碎笔/随笔随记/情感类随记/随记-2023年11月25日.md)
-    - [随记 - 2023 年 11 月 14 日](生活碎笔/随笔随记/情感类随记/随记-2023年11月14日.md)
-    - [随记 - 2023 年 11 月 12 日](生活碎笔/随笔随记/情感类随记/随记-2023年11月12日.md)
-    - [随记 - 2023 年 11 月 11 日](生活碎笔/随笔随记/情感类随记/随记-2023年11月11日.md)
-    - [随记 - 2023 年 10 月 31 日](生活碎笔/随笔随记/情感类随记/随记-2023年10月31日.md)
-    - [随记 - 2023 年 10 月 18 日](生活碎笔/随笔随记/情感类随记/随记-2023年10月18日.md)
-    - [随记 - 2023 年 9 月 28 日](生活碎笔/随笔随记/情感类随记/随记-2023年9月28日.md)
-    - [随记 - 2023 年 9 月 15 日](生活碎笔/随笔随记/情感类随记/随记-2023年9月15日.md)
-    - [随记 - 2023 年 9 月 7 日](生活碎笔/随笔随记/情感类随记/随记-2023年9月7日.md)
-    - [随记 - 2023 年 9 月 4 日](生活碎笔/随笔随记/情感类随记/随记-2023年9月4日.md)
-    - [随记 - 2023 年 8 月 23 日](生活碎笔/随笔随记/情感类随记/随记-2023年8月23日.md)
-    - [随记 - 2023 年 8 月 7 日](生活碎笔/随笔随记/情感类随记/随记-2023年8月7日.md)
-    - [随记 - 2023 年 7 月 22 日](生活碎笔/随笔随记/情感类随记/随记-2023年7月22日.md)
-    - [随记 - 2023 年 7 月 12 日](生活碎笔/随笔随记/情感类随记/随记-2023年7月12日.md)
-    - [随记 - 2023 年 7 月 3 日](生活碎笔/随笔随记/情感类随记/随记-2023年7月3日.md)
-    - [随记 - 2023 年 6 月 27 日](生活碎笔/随笔随记/情感类随记/随记-2023年6月27日.md)
-    - [随记 - 2023 年 6 月 25 日](生活碎笔/随笔随记/情感类随记/随记-2023年6月25日.md)
-    - [随记 - 2023 年 6 月 9 日](生活碎笔/随笔随记/情感类随记/随记-2023年6月9日.md)
-    - [随记 - 2023 年 4 月 4 日](生活碎笔/随笔随记/情感类随记/随记-2023年4月4日.md)
-    - [随记 - 2023 年 1 月 18 日](生活碎笔/随笔随记/情感类随记/随记-2023年1月18日.md)
-    - [随记 - 2022 年 12 月 23 日](生活碎笔/随笔随记/情感类随记/随记-2022年12月23日.md)
-    - [随记 - 2022 年 12 月 22 日](生活碎笔/随笔随记/情感类随记/随记-2022年12月22日.md)
-    - [随记 - 2022 年 11 月 22 日](生活碎笔/随笔随记/情感类随记/随记-2022年11月22日.md)
-    - [随记 - 2022 年 11 月 19 日](生活碎笔/随笔随记/情感类随记/随记-2022年11月19日.md)
-    - [随记 - 2022 年 11 月 6 日](生活碎笔/随笔随记/情感类随记/随记-2022年11月6日.md)
-    - [随记 - 2022 年 10 月 11 日](生活碎笔/随笔随记/情感类随记/随记-2022年10月11日.md)
-    - [随记 - 2022 年 9 月 26 日](生活碎笔/随笔随记/情感类随记/随记-2022年9月26日.md)
-    - [随记 - 2022 年 9 月 18 日](生活碎笔/随笔随记/情感类随记/随记-2022年9月18日.md)
-    - [随记 - 2022 年 7 月 21 日](生活碎笔/随笔随记/情感类随记/随记-2022年7月21日.md)
-    - [随记 - 2022 年 7 月 13 日](生活碎笔/随笔随记/情感类随记/随记-2022年7月13日.md)
-    - [随记 - 2022 年 7 月 7 日](生活碎笔/随笔随记/情感类随记/随记-2022年7月7日.md)
-    - [随记 - 2022 年 6 月 14 日](生活碎笔/随笔随记/情感类随记/随记-2022年6月14日.md)
-    - [随记 - 2022 年 6 月 3 日](生活碎笔/随笔随记/情感类随记/随记-2022年6月3日.md)
-    - [随记 - 2022 年 5 月 25 日](生活碎笔/随笔随记/情感类随记/随记-2022年5月25日.md)
-    - [随记 - 2022 年 5 月 2 日](生活碎笔/随笔随记/情感类随记/随记-2022年5月2日.md)
-    - [随记 - 2022 年 4 月 3 日](生活碎笔/随笔随记/情感类随记/随记-2022年4月3日.md)
-    - [随记 - 2022 年 4 月 1 日](生活碎笔/随笔随记/情感类随记/随记-2022年4月1日.md)
-    - [随记 - 2022 年 3 月 28 日](生活碎笔/随笔随记/情感类随记/随记-2022年3月28日.md)
-    - [随记 - 2022 年 3 月 18 日](生活碎笔/随笔随记/情感类随记/随记-2022年3月18日.md)
-    - [随记 - 2022 年 3 月 13 日](生活碎笔/随笔随记/情感类随记/随记-2022年3月13日.md)
-    - [随记 - 2022 年 2 月 17 日](生活碎笔/随笔随记/情感类随记/随记-2022年2月17日.md)
-    - [随记 - 2022 年 2 月 10 日](生活碎笔/随笔随记/情感类随记/随记-2022年2月10日.md)
-    - [随记 - 2022 年 2 月 7 日](生活碎笔/随笔随记/情感类随记/随记-2022年2月7日.md)
-    - [随记 - 2022 年 1 月 20 日](生活碎笔/随笔随记/情感类随记/随记-2022年1月20日.md)
-    - [随记 - 2021 年 12 月 26 日](生活碎笔/随笔随记/情感类随记/随记-2021年12月26日.md)
-    - [随记 - 2021 年 11 月 30 日](生活碎笔/随笔随记/情感类随记/随记-2021年11月30日.md)
-    - [随记 - 2021 年 11 月 19 日](生活碎笔/随笔随记/情感类随记/随记-2021年11月19日.md)
-    - [随记 - 2021 年 10 月 24 日](生活碎笔/随笔随记/情感类随记/随记-2021年10月24日.md)
-    - [随记 - 2021 年 10 月 22 日](生活碎笔/随笔随记/情感类随记/随记-2021年10月22日.md)
-    - [随记 - 2021 年 10 月 6 日](生活碎笔/随笔随记/情感类随记/随记-2021年10月6日.md)
-    - [随记 - 2021 年 10 月 2 日](生活碎笔/随笔随记/情感类随记/随记-2021年10月2日.md)
-    - [随记 - 2021 年 9 月 30 日](生活碎笔/随笔随记/情感类随记/随记-2021年9月30日.md)
-    - [随记 - 2021 年 9 月 16 日](生活碎笔/随笔随记/情感类随记/随记-2021年9月16日.md)
-    - [随记 - 2021 年 9 月 15 日](生活碎笔/随笔随记/情感类随记/随记-2021年9月15日.md)
-    - [随记 - 2021 年 8 月 31 日](生活碎笔/随笔随记/情感类随记/随记-2021年8月31日.md)
-    - [随记 - 2021 年 8 月 2 日](生活碎笔/随笔随记/情感类随记/随记-2021年8月2日.md)
-    - [随记 - 2021 年 7 月 27 日](生活碎笔/随笔随记/情感类随记/随记-2021年7月27日.md)
-    - [随记 - 2021 年 7 月 21 日](生活碎笔/随笔随记/情感类随记/随记-2021年7月21日.md)
-    - [随记 - 2021 年 7 月 14 日](生活碎笔/随笔随记/情感类随记/随记-2021年7月14日.md)
-    - [随记 - 2021 年 7 月 2 日](生活碎笔/随笔随记/情感类随记/随记-2021年7月2日.md)
-    - [随记之二 - 2021 年 6 月 13 日](生活碎笔/随笔随记/情感类随记/随记之二-2021年6月13日.md)
-    - [随记之一 - 2021 年 6 月 13 日](生活碎笔/随笔随记/情感类随记/随记之一-2021年6月13日.md)
-    - [随记 - 2021 年 6 月 11 日](生活碎笔/随笔随记/情感类随记/随记-2021年6月11日.md)
-    - [随记 - 2021 年 6 月 7 日](生活碎笔/随笔随记/情感类随记/随记-2021年6月7日.md)
-    - [随记 - 2021 年 6 月 6 日](生活碎笔/随笔随记/情感类随记/随记-2021年6月6日.md)
-    - [随记 - 2021 年 5 月 21 日](生活碎笔/随笔随记/情感类随记/随记-2021年5月21日.md)
-    - [随记 - 2021 年 5 月 18 日](生活碎笔/随笔随记/情感类随记/随记-2021年5月18日.md)
-    - [随记 - 2021 年 5 月 10 日](生活碎笔/随笔随记/情感类随记/随记-2021年5月10日.md)
-    - [随记 - 2021 年 3 月 31 日](生活碎笔/随笔随记/情感类随记/随记-2021年3月31日.md)
-    - [随记 - 2021 年 3 月 26 日](生活碎笔/随笔随记/情感类随记/随记-2021年3月26日.md)
-    - [随记 - 2021 年 3 月 5 日](生活碎笔/随笔随记/情感类随记/随记-2021年3月5日.md)
-    - [随记 - 2021 年 2 月 7 日](生活碎笔/随笔随记/情感类随记/随记-2021年2月7日.md)
-    - [随记 - 2021 年 2 月 3 日](生活碎笔/随笔随记/情感类随记/随记-2021年2月3日.md)
-    - [随记 - 2021 年 1 月 28 日](生活碎笔/随笔随记/情感类随记/随记-2021年1月28日.md)
-    - [随记 - 2020 年 10 月 17 日](生活碎笔/随笔随记/情感类随记/随记-2020年10月17日.md)
-    - [随记 - 2020 年 5 月 15 日](生活碎笔/随笔随记/情感类随记/随记-2020年5月15日.md)
+    - [随记 - 梦里的大姐姐](生活碎笔/随笔随记/情感类随记/随记-梦里的大姐姐.md)
+    - [随记 - 发梢的夕烧](生活碎笔/随笔随记/情感类随记/随记-发梢的夕烧.md)
+    - [随记 - 应酬是吃饭](生活碎笔/随笔随记/情感类随记/随记-应酬是吃饭.md)
+    - [随记 - 第一次吃蛋挞](生活碎笔/随笔随记/情感类随记/随记-第一次吃蛋挞.md)
+    - [随记 - 旗与故人](生活碎笔/随笔随记/情感类随记/随记-旗与故人.md)
+    - [随记 - 一袋酥肉](生活碎笔/随笔随记/情感类随记/随记-一袋酥肉.md)
+    - [随记 - 车站显示屏](生活碎笔/随笔随记/情感类随记/随记-车站显示屏.md)
+    - [随记 - 报复性熬夜](生活碎笔/随笔随记/情感类随记/随记-报复性熬夜.md)
+    - [随记 - 雨中归途](生活碎笔/随笔随记/情感类随记/随记-雨中归途.md)
+    - [随记 - 翻跟斗的孩子](生活碎笔/随笔随记/情感类随记/随记-翻跟斗的孩子.md)
+    - [随记 - 银行劝退](生活碎笔/随笔随记/情感类随记/随记-银行劝退.md)
+    - [随记 - 米袋子](生活碎笔/随笔随记/情感类随记/随记-米袋子.md)
+    - [随记 - 摸黑找开关](生活碎笔/随笔随记/情感类随记/随记-摸黑找开关.md)
+    - [随记 - 碰拳之约](生活碎笔/随笔随记/情感类随记/随记-碰拳之约.md)
+    - [随记 - 渺小如蜉蝣](生活碎笔/随笔随记/情感类随记/随记-渺小如蜉蝣.md)
+    - [随记 - 尾号是生日](生活碎笔/随笔随记/情感类随记/随记-尾号是生日.md)
+    - [随记 - 没能忘记](生活碎笔/随笔随记/情感类随记/随记-没能忘记.md)
+    - [随记 - 一盘留菜](生活碎笔/随笔随记/情感类随记/随记-一盘留菜.md)
+    - [随记 - 祭桥](生活碎笔/随笔随记/情感类随记/随记-祭桥.md)
+    - [随记 - 长大的瞬间](生活碎笔/随笔随记/情感类随记/随记-长大的瞬间.md)
+    - [随记 - 暴雨停电](生活碎笔/随笔随记/情感类随记/随记-暴雨停电.md)
+    - [随记 - 什么值得展示](生活碎笔/随笔随记/情感类随记/随记-什么值得展示.md)
+    - [随记 - 晒痕](生活碎笔/随笔随记/情感类随记/随记-晒痕.md)
+    - [随记 - 母亲的蒸馍](生活碎笔/随笔随记/情感类随记/随记-母亲的蒸馍.md)
+    - [随记 - 累而不讨好](生活碎笔/随笔随记/情感类随记/随记-累而不讨好.md)
+    - [随记 - 后座的安心](生活碎笔/随笔随记/情感类随记/随记-后座的安心.md)
+    - [随记 - 搭棚](生活碎笔/随笔随记/情感类随记/随记-搭棚.md)
+    - [随记 - 停转的表](生活碎笔/随笔随记/情感类随记/随记-停转的表.md)
+    - [随记 - 围巾与法官](生活碎笔/随笔随记/情感类随记/随记-围巾与法官.md)
+    - [随记 - 不必追](生活碎笔/随笔随记/情感类随记/随记-不必追.md)
+    - [随记 - 茉莉清茶](生活碎笔/随笔随记/情感类随记/随记-茉莉清茶.md)
+    - [随记 - 自我实验室](生活碎笔/随笔随记/情感类随记/随记-自我实验室.md)
+    - [随记 - 斜坡与轮椅](生活碎笔/随笔随记/情感类随记/随记-斜坡与轮椅.md)
+    - [随记 - 推免改方案](生活碎笔/随笔随记/情感类随记/随记-推免改方案.md)
+    - [随记 - 聊天背景](生活碎笔/随笔随记/情感类随记/随记-聊天背景.md)
+    - [随记 - 胭脂洪泛](生活碎笔/随笔随记/情感类随记/随记-胭脂洪泛.md)
+    - [随记 - 理发师的三年](生活碎笔/随笔随记/情感类随记/随记-理发师的三年.md)
+    - [随记 - 夸她好看](生活碎笔/随笔随记/情感类随记/随记-夸她好看.md)
+    - [随记 - 背向太阳](生活碎笔/随笔随记/情感类随记/随记-背向太阳.md)
+    - [随记 - 一句别理他](生活碎笔/随笔随记/情感类随记/随记-一句别理他.md)
+    - [随记 - 成熟与依靠](生活碎笔/随笔随记/情感类随记/随记-成熟与依靠.md)
+    - [随记 - 雏菊的花语](生活碎笔/随笔随记/情感类随记/随记-雏菊的花语.md)
+    - [随记 - 热爱与傲慢](生活碎笔/随笔随记/情感类随记/随记-热爱与傲慢.md)
+    - [随记 - 开服](生活碎笔/随笔随记/情感类随记/随记-开服.md)
+    - [随记 - 白盒黑盒](生活碎笔/随笔随记/情感类随记/随记-白盒黑盒.md)
+    - [随记 - 黑白格子](生活碎笔/随笔随记/情感类随记/随记-黑白格子.md)
+    - [随记 - 小店叙旧](生活碎笔/随笔随记/情感类随记/随记-小店叙旧.md)
+    - [随记 - 不烟不酒](生活碎笔/随笔随记/情感类随记/随记-不烟不酒.md)
+    - [随记 - 姓氏壁纸](生活碎笔/随笔随记/情感类随记/随记-姓氏壁纸.md)
+    - [随记 - 雨中牵手](生活碎笔/随笔随记/情感类随记/随记-雨中牵手.md)
+    - [随记 - 高考前的干拌面](生活碎笔/随笔随记/情感类随记/随记-高考前的干拌面.md)
+    - [随记 - 寄往异国的信](生活碎笔/随笔随记/情感类随记/随记-寄往异国的信.md)
+    - [随记 - 鼎下的空气墙](生活碎笔/随笔随记/情感类随记/随记-鼎下的空气墙.md)
+    - [随记 - 窗外的爵士舞](生活碎笔/随笔随记/情感类随记/随记-窗外的爵士舞.md)
+    - [随记 - 茶叶沉底](生活碎笔/随笔随记/情感类随记/随记-茶叶沉底.md)
+    - [随记 - 兔耳朵恶作剧](生活碎笔/随笔随记/情感类随记/随记-兔耳朵恶作剧.md)
+    - [随记 - 第一次拥抱](生活碎笔/随笔随记/情感类随记/随记-第一次拥抱.md)
+    - [随记 - 蓝色衣服](生活碎笔/随笔随记/情感类随记/随记-蓝色衣服.md)
+    - [随记 - 倒装](生活碎笔/随笔随记/情感类随记/随记-倒装.md)
+    - [随记 - 拐弯](生活碎笔/随笔随记/情感类随记/随记-拐弯.md)
+    - [随记 - 拼图与落花](生活碎笔/随笔随记/情感类随记/随记-拼图与落花.md)
+    - [随记 - 枇杷树](生活碎笔/随笔随记/情感类随记/随记-枇杷树.md)
+    - [随记 - 毅力与星星](生活碎笔/随笔随记/情感类随记/随记-毅力与星星.md)
+    - [随记 - 未能牵手](生活碎笔/随笔随记/情感类随记/随记-未能牵手.md)
+    - [随记 - 纸箱与痕迹](生活碎笔/随笔随记/情感类随记/随记-纸箱与痕迹.md)
+    - [随记 - 舞社的水](生活碎笔/随笔随记/情感类随记/随记-舞社的水.md)
+    - [随记 - 一句辛苦了](生活碎笔/随笔随记/情感类随记/随记-一句辛苦了.md)
+    - [随记 - 她存下的照片](生活碎笔/随笔随记/情感类随记/随记-她存下的照片.md)
+    - [随记 - 父亲考驾照](生活碎笔/随笔随记/情感类随记/随记-父亲考驾照.md)
+    - [随记 - 素描与集市](生活碎笔/随笔随记/情感类随记/随记-素描与集市.md)
+    - [随记 - 高中的钢笔](生活碎笔/随笔随记/情感类随记/随记-高中的钢笔.md)
+    - [随记 - 夜雨美术室](生活碎笔/随笔随记/情感类随记/随记-夜雨美术室.md)
+    - [随记 - 生日与回礼](生活碎笔/随笔随记/情感类随记/随记-生日与回礼.md)
+    - [随记 - 墨水套装](生活碎笔/随笔随记/情感类随记/随记-墨水套装.md)
+    - [随记 - 临时车与零食车](生活碎笔/随笔随记/情感类随记/随记-临时车与零食车.md)
+    - [随记 - 一杯杨枝甘露](生活碎笔/随笔随记/情感类随记/随记-一杯杨枝甘露.md)
+    - [随记 - 生活回来了](生活碎笔/随笔随记/情感类随记/随记-生活回来了.md)
+    - [随记 - 被当成测绘师](生活碎笔/随笔随记/情感类随记/随记-被当成测绘师.md)
+    - [随记 - 被喊叔叔](生活碎笔/随笔随记/情感类随记/随记-被喊叔叔.md)
+    - [随记 - 蒜苔与旧嗓音](生活碎笔/随笔随记/情感类随记/随记-蒜苔与旧嗓音.md)
+    - [随记 - 踩着石砖回家](生活碎笔/随笔随记/情感类随记/随记-踩着石砖回家.md)
+    - [随记 - 我想成为的人](生活碎笔/随笔随记/情感类随记/随记-我想成为的人.md)
   - [实用类随记](生活碎笔/随笔随记/实用类随记/实用类随记.md)
     - [【AIGC人工校对】别拿状态最好的一天，给以后的每一天定任务](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】别拿状态最好的一天，给以后的每一天定任务.md)
     - [【AIGC人工校对】接受一次帮助，不必立刻还成等价交换](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】接受一次帮助，不必立刻还成等价交换.md)

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-一句别理他-md-2835464952"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-一句别理他.md

<details>
<summary><code>+78 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\345\217\245\345\210\253\347\220\206\344\273\226.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\345\217\245\345\210\253\347\220\206\344\273\226.md"
new file mode 100644
index 000000000..468a70bf1
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\345\217\245\345\210\253\347\220\206\344\273\226.md"
@@ -0,0 +1,78 @@
+# 随记 - 一句别理他
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/fake-delete-account.png)
+
+> 图片制作 | 南国微雪 Miyuki
+>
+> 图源 | 未知
+
+## 正文
+　　昨天中午做了一个很大胆的举动。
+
+　　中午，饭吃得比较晚，一个人，戴着口罩。然后有人过来推销 app。美团优选，快手，京东旗下什么产品之类的。
+
+　　我很反感这种行为，以前也碰到过几次。专挑一个人吃饭的人下手。这就更反感了。
+
+　　有时候和朋友一起，竟也能找上门来。
+
+　　毕竟本身学计算机，知道这背后会发生什么，不止注册一个账号这么简单。可能数据会被拿去销售或者分析。糟糕一点，进社工库。花个几百块能查到所有信息，直接定位到家庭地址。
+
+　　这种黑盒其实还蛮讨人厌的，你不知道所谓的互联网巨头会在背后偷偷搞些什么。
+
+　　滴滴都险些出售国家公共交通道路数据，因为想要上市。而且据说滴滴是第一个以《国家安全法》名义进行审查的公司。
+
+　　当然不知是真是假，茶余饭后之谈而已，并且是旧闻了。
+
+　　国家数据尚能出售，用户数据，大概更不关心。
+
+　　能保护好自己的，永远只能是自己。
+
+　　扯远了。
+
+　　我向来都是，冷漠着手一挥，让这些人走开。有些还挺“执着”，我便再看一眼，然后不再搭理。
+
+　　吃完饭，看见他找上了两个女生。然后有一个人已经拿出手机了。我就大概知道什么情况了。
+
+　　虽然是傲慢的臆测，但大概又是一个不懂得拒绝的孩子。
+
+　　那人坐到那孩子旁边，在交流些什么。大概是她的朋友罢，坐在她对面。
+
+　　我把口罩往上一拉，迅速走到她朋友的旁边，小声说了只一句话：
+
+　　「以后不要理他们。」
+
+　　我很确定推销那人听不到，因为四个人呈平行四边形站位，我和他最远。
+
+　　说完便走了。没有回头。
+
+　　我不知道她有没有被吓到，也不知道她听没听清楚、听没听进去，更不知道她会怎么看这件事、怎么看我。
+
+　　我只是涌起了这样做的冲动和心情，便这样做了。就像我想把这件小事花时间写下来一样。
+
+　　至于为什么想这么做，我不清楚。
+
+　　我知道会触犯某些人的利益。
+
+　　但我还是想这么做。
+
+　　无所谓道不道德，背后被人骂都有可能，但我确实是希望别人能少进入众多的黑盒里。
+
+　　现在，所有的 app 都希望抢占你的时间。
+
+　　父亲在门口安的监控，其远程控制软件里都有新闻推送和短视频播放功能。
+
+　　但我们的时间更应该拿去做更多的事情。比如学习，比如休息，比如工作。
+
+<br />
+
+　　**少注册账号，不止拯救你的数据，也拯救你的时间。**
+
+　　**毕竟，你也不知道注销账号时，你的数据是真的从数据库里消失的物理删除，还是被打上了「已注销」的逻辑删除。**
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 5 月 25 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-一句辛苦了-md-497274961"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-一句辛苦了.md

<details>
<summary><code>+25 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\345\217\245\350\276\233\350\213\246\344\272\206.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\345\217\245\350\276\233\350\213\246\344\272\206.md"
new file mode 100644
index 000000000..d540ed58f
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\345\217\245\350\276\233\350\213\246\344\272\206.md"
@@ -0,0 +1,25 @@
+# 随记 - 一句辛苦了
+
+　　今天接种疫苗第二针。在学校体育馆里。
+
+　　一个办公桌，右边是信息登记，左边是护士拿着针头接种。两个人全副武装。
+
+　　我看到了。
+
+　　登记信息的护士，左手中指包着一块纱布，在手套里面煞是显眼。手套里面因为不透气，各个地方都黏在手上，看起来很乱。
+
+　　打针的护士，在给前一个人和我打的时候，手都很抖。可能因为太多人了吧。
+
+<br />
+
+　　我没什么感想，只说了一句话。
+
+　　辛苦了。
+
+　　不过大概传达不到吧。这种寒暄语。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 6 月 13 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-一杯杨枝甘露-md-1223859162"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-一杯杨枝甘露.md

<details>
<summary><code>+73 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\346\235\257\346\235\250\346\236\235\347\224\230\351\234\262.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\346\235\257\346\235\250\346\236\235\347\224\230\351\234\262.md"
new file mode 100644
index 000000000..730daa239
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\346\235\257\346\235\250\346\236\235\347\224\230\351\234\262.md"
@@ -0,0 +1,73 @@
+# 随记 - 一杯杨枝甘露
+
+　　今天为了一些事情，去老区了，顺带买素描纸。
+
+　　想起自己有一个经常有一搭没一搭聊着天的女孩子，她也住老区。走在路上就跟她发消息，问她老区有没有文具店，她很明确地告诉我没有。然后当我到的时候却找到了。
+
+　　有种自己身边笨蛋越来越多了的感觉。
+
+　　她无意中跟我说，她感冒了，今天请病假，就没去上课。我刚好想喝一杯杨枝甘露，问她要不要一杯，就当慰问她了。但是她好像并不想下宿舍楼，就作罢了。
+
+　　「不想下宿舍楼诶，你别买了，就当为我积德了。」
+
+　　老区外面的小吃街真的有很多吃的东西。
+
+　　一路找文具店都能看到各种各样的吃的东西，路边摊。炒粉，土豆饼，冒菜，烧烤，面筋，串串之类的。
+
+　　很想吃，忍住了。
+
+　　也不知道自己为什么要忍。
+
+　　可能是因为自己一直忍耐惯了吧，而且吃那些东西更容易长胖……
+
+　　但是真的好想吃啊……
+
+　　那些路边做这些的人也很辛苦的样子。
+
+<br />
+
+　　过马路的时候，看到一个小孩子盯着我。
+
+　　可能是他的爷爷之类的人吧，在一边收摊了，配钥匙的那种摊子，然后他也在收拾书包。他面前有一个比他身高略微大一点的书桌，还有小凳子，很明显在大人守摊的时候，他一直在做作业。
+
+　　收拾书包的时候，他也一直在盯着我看。
+
+　　然后我突然意识到，他可能不是盯着我，而是我手上的那一杯杨枝甘露。
+
+　　然后一股罪恶感涌起。
+
+　　他一定也想要一杯吧？不知道是不是我自己意识过剩呢？
+
+<br />
+
+　　慢慢踱回宿舍楼。
+
+　　路上一阵大风，刮得地上的落叶在地上拖着响。
+
+　　落叶很多，拍了一张。
+
+　　感觉平时埋头在手机里的自己，错过了很多很多的东西。
+
+　　那些穿着篮球服在洗手池洗脸的女生，
+
+　　那些谈论着有意思的活动的人们，
+
+　　那些在景观池旁驻足的情侣，
+
+　　那些大风刮起来的落叶，
+
+　　那些忽闪忽现的猫，
+
+　　那些变幻的云，
+
+　　那些倒影。
+
+　　出去走走，一切都会好的。
+
+　　不知道什么时候，这样坚信了起来。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 3 月 26 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-一盘留菜-md-2432530295"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-一盘留菜.md

<details>
<summary><code>+67 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\347\233\230\347\225\231\350\217\234.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\347\233\230\347\225\231\350\217\234.md"
new file mode 100644
index 000000000..0f01f96d1
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\347\233\230\347\225\231\350\217\234.md"
@@ -0,0 +1,67 @@
+# 随记 - 一盘留菜
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">638 字 | 经历 | 工人 | 生活 | 人际关系</p>
+
+## 正文
+
+　　工作日第一天，单位的人抢饭很快。我去的时候菜盆都光了……
+
+　　做饭的阿姨笑说，她数了人，发现少两个，就给我们留了盘菜。那菜盘里每一样菜都挑了一些。
+
+　　吃饭真的挺重要。
+
+　　我想起周六下午，我忙于一个工程，晚饭吃得很敷衍。随便进一家小餐馆吃碗面草草解决。
+
+　　那家餐馆里有工人。餐馆附近有在建大楼。
+
+　　老板娘问：“丝瓜没了，要换成其他的吗？”
+
+　　那些工人围在一张大桌子旁，吵吵闹闹，身上的工作服沾满了各式劳动的证据。
+
+　　“丝瓜没了，就加点黄瓜嘛。”有人笑。
+
+　　“总不可能没得换噻。”有人另笑说。
+
+　　“还说我，这不是瞅着你们哪个不喜欢吃黄瓜吗？”老板娘笑笑抱怨道，“上次还听你们说。”
+
+　　“哎呀，随便了随便。搞快点上菜，饿死了。”
+
+　　工人们都笑。
+
+　　“好好好，别催，马上来啊。”老板娘笑。
+
+　　我看了他们一眼。
+
+　　工人们桌子上，几乎每个人摆一瓶冰镇啤酒，很有夏天的感觉。
+
+　　我不喝酒，但是不让工人们喝，大概算剥夺了他们一天中最快乐和惬意的时间。
+
+　　我看着这个场景，有些感动，又有些失落。
+
+　　我参加工作的头两天，对于各种社会关系总猜不透。去问前辈，得到了这样的答复：“蹭车和一起吃饭不一定代表关系好呀，人与人之间的关系哪有那么简单。”
+
+　　是啊，人与人的关系哪有那么简单。
+
+　　不过有时候，人与人之间的关系，可以非常简单，就如眼前。
+
+　　而失落在于，这群可爱的工人们，如此奔波劳碌辛苦，却还是为很多人潜意识里瞧不起。
+
+　　我算是在这种环境里长大的。
+
+　　底层人民什么时候才能更有生活和底气一些呢？
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 8 月 7 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/christopher-burns-Wiu3w-99tNg-unsplash.jpg)
+
+> 摄影师 | Christopher Burns
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-一袋酥肉-md-1161987522"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-一袋酥肉.md

<details>
<summary><code>+51 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\350\242\213\351\205\245\350\202\211.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\350\242\213\351\205\245\350\202\211.md"
new file mode 100644
index 000000000..00845735e
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\200\350\242\213\351\205\245\350\202\211.md"
@@ -0,0 +1,51 @@
+# 随记 - 一袋酥肉
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">563 字 | 家人 | 文化 | 道歉 | 反思</p>
+
+## 正文
+
+　　向母亲道歉了。不过母亲已经睡了，大概。
+
+　　父亲和母亲前天开着家里的货车，跨了市，来看我。手里提着一袋酥肉。
+
+　　很多。短时间肯定吃不完。而且这东西很容易回潮。
+
+　　今天母亲打电话问我吃得怎么样了。我一向不太习惯在饭点时间以外吃东西，吃饭比较规律。我说没怎么吃，真的吃不完，到最后肯定要丢掉。母亲就帮我出主意，让带去给食堂做饭的阿姨，帮忙放冰箱里。我说更麻烦了，都不一定会想起去吃。说不定放冰箱里都会放坏掉。于是母亲又想其他办法，但我都嫌麻烦。
+
+　　当时我加班到快十点，特别烦躁，便说：“再说吧，再说。我现在不想想这些问题，好烦。”
+
+　　**母亲在电话那边沉默了半晌，哑着声音说：“那好吧，看你。早点休息。”**
+
+　　洗漱，写日记，复盘。
+
+　　最后忽然想起母亲的这句话，心里蓦地针扎一样疼。
+
+　　酥肉，母亲亲手炸的，那么大一口袋。最后听我说吃不完要丢掉。
+
+　　那阵沉默意味着什么。
+
+　　我还是太自私自利了。
+
+　　对家人说一些表露爱意和歉意等等感情的话，我对这件事比较抗拒。但是想起工作上那些人，如果不催，或者不联系，别人根本就不会知道。
+
+　　挣扎再三，还是给母亲发了消息。
+
+　　<u>以东亚为代表的“扫兴”式家庭关系，分享快乐少一半，分享忧愁加一倍。我明明最为痛恨。还曾心里暗自发誓，绝对不要这样。</u>
+
+　　<u>为什么今天自己就成了这副样子呢？</u>
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 12 月 5 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-不必追-md-1577826122"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-不必追.md

<details>
<summary><code>+81 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\215\345\277\205\350\277\275.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\215\345\277\205\350\277\275.md"
new file mode 100644
index 000000000..5dcc47e17
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\215\345\277\205\350\277\275.md"
@@ -0,0 +1,81 @@
+# 随记 - 不必追
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/yande%20246738%20dress%20frac%20motomiya_mitsuki%20wallpaper.jpg)
+
+> 画师 | 佚名
+>
+> 图源 | Yande
+
+## 写在前面
+
+　　<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">908 字</p>
+
+## 正文
+
+　　重大的选择，难免会有些遗憾与难过。
+
+　　不过其实我们都一样吧。当时总觉得无法割舍，但最后都会过去。
+
+　　我现在就站在这样一个岔路口上。
+
+<br />
+
+　　今晚，他们比赛，拿了季军。对一个学校的社团来说，很不容易了。
+
+　　当然，比赛团队里面，没有我。这是我自己做出的决定。
+
+　　前段时间，社团面临无妄之灾，险些除名。我们历经万难，誓死保了下来。前辈们栽的树不能毁在我们手里。
+
+　　今天，他们开庆功宴。
+
+　　新一届的顶梁柱，问我，去吗？
+
+　　我说，不去，是时候隐退了，其实早该隐退的，时间已经延后很久了。
+
+　　我其实知道他会说什么话。
+
+　　他人真的很好很好，每次这种时候都会宽慰我。
+
+　　“玩得开心才是最重要的。”他说。
+
+　　我在屏幕这边笑了笑。
+
+<br />
+
+　　我决定，今天之后淡出他们的视野。这是一个艰难的决定。
+
+　　**亲密关系中有一项很重要的指标，就是一致性。一致性高的亲密关系，更可能以“我们”相称，而非“我和他们”。**
+
+　　我们社团中，有五个大四的。一个特别热爱跳舞的，可能之后会走向职业舞者这条路，他仍在社团活跃着。然后三个隐退的。还有我。
+
+　　那三个人，是刚进大四就隐退了，我本应该也这样做的。但仍然坚持了很久。
+
+　　大四带给我的身份冲击，从来没有现在这么明显。
+
+　　一面是压力。年龄相近的朋友，都在奔波在生存的路上，为自己的未来奋斗着。父母最近打电话给我，都是问我还有没有笔试和面试。我也在按着既定的路线行进着。
+
+　　另一方面是挂心的他们。我很喜欢这里，他们给予我归属感。每每看到他们的笑容，我总觉得，一切都是值得的。他们有着我没有的东西，那就是大学剩下的，未知的体验。
+
+　　沧桑与稚嫩碰撞，迸出的火花，差异巨大。像是理性世界与感性世界之间的摇摆，氛围截然不同。
+
+　　每每他们说，开心最重要，我都想笑，转念看看自己所剩的时日，又忍不住黯然。
+
+　　我觉得是时候放手了。
+
+<br />
+
+　　龙应台在《目送》中写道：**“我慢慢地、慢慢地了解到，所谓父女母子一场，只不过意味着，你和他的缘分就是今生今世不断地在目送他的背影渐行渐远。你站立在小路的这一端，看着他逐渐消失在小路转弯的地方，而且，他用背影默默告诉你：不必追。”**
+
+　　我也不去追他们了吧。
+
+　　我们危难的时候，我不会逃，也不会跑，一起想办法抗过去就好。而锦上添花，越走越远的辉煌，就交给你们了吧。
+
+　　**我爱你们。**
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 11 月 20 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-不烟不酒-md-3339919755"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-不烟不酒.md

<details>
<summary><code>+206 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\215\347\203\237\344\270\215\351\205\222.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\215\347\203\237\344\270\215\351\205\222.md"
new file mode 100644
index 000000000..8ff173d72
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\215\347\203\237\344\270\215\351\205\222.md"
@@ -0,0 +1,206 @@
+# 随记 - 不烟不酒
+
+## 正文
+
+　　今天去城里和朋友们玩。
+
+　　他们平时散落在天涯各处，各个大学，于是根本没有时间聚在一起。这不是刚好过年了嘛。然后一天下来，我发现一件事情。那些我以前可能刻意视而不见的细节。
+
+　　从上一面到这一面，他们似乎一夜之间都成了大男孩。
+
+　　那种市井气和应酬气变得很浓厚，像是提前步入了职场一样。我不是说这两种东西不好，而只是说，只有我一个人好像还在无意义地坚持着些什么。
+
+　　像是一个孩子一样，坚持着原来的自己，不被世俗污染。执拗且幼稚。
+
+　　但是身在人间，总得沾一些烟火气息，哪怕它们只是染在衣服上，并不深入。
+
+　　不抽烟，不喝酒，不打牌。
+
+　　我以为做到这些很容易，因为我自己就是这样，然而似乎没有人这样。
+
+　　“你什么时候学会的抽烟？”我惊奇地看着骆。
+
+　　“其实高中就会了，只是没在你们面前抽过。”他淡淡地说。
+
+　　我一瞬间不知道说什么好。差不多的对话还发生在我去看他们打麻将。他们打牌，打一块钱，然后我因为不会，就坐在一边看书。看灵推荐给我的仍未看完的书。
+
+　　我想着，还是参与一下好，然后便倚着其中一个朋友的麻将椅背，看他们出牌，发呆。
+
+　　有个朋友笑着说：“来啊，雪，我现场教学，来交学费。”
+
+　　他的意思是，要我也参与进去，学着打牌。
+
+　　我笑着摆了摆手：“不了不了，我不搞这些，也不怎么想学。”
+
+　　旁边另一个朋友笑着调侃了一句：“那你以后怎么和你老丈人一起打牌呢？”
+
+　　我笑了笑，没说话。
+
+<br />
+
+　　我必须要承认，他们抽烟的时候、喝酒碰杯的时候、摸牌大笑的时候，很有那种传统的男孩子气。起码我认为是这样的。
+
+　　**但那偏偏是我身为一个男孩子，最为厌恶的部分。**
+
+　　我想要的男孩子的那部分，是坚毅、果断、勇敢、冒险劲和永不服输等等。但不是这种让人困扰的部分。
+
+　　**或许有人会觉得这没什么不好，但我就是喜欢不起来。**
+
+　　**不喜欢的事情，就是喜欢不起来。**
+
+　　在这些事情上面，我的的确确是更偏向于女性化的。这点自己心知肚明。
+
+　　想起喵喵以前大概说过，他的认知最最底层只有一句话构成：“世界上只有一种真正的英雄主义，那就是在认清生活的真相后依然热爱生活。”（罗曼·罗兰《米开朗琪罗》）
+
+　　他还痛斥过我，说我不愿意接触世界的阴暗面，只愿意接受我能接受的那部分世界。
+
+　　我当时大概气昏了脑袋，也没有看所谓的非暴力沟通方式，直接就骂了回去。但其实我应该好好说明的。
+
+　　我不是不愿意接触，我只是懦弱，只是随波逐流。
+
+　　成长的过程中，经历过无数次的自我怀疑，并且最后被证实了，很多时候的的确确是我错了，便不再多么坚定地相信自己。相信别人，因为大部分情况下他们都是正确的。
+
+　　我害怕在注视着所谓的深渊时，就被拉进去，再也出不来。
+
+　　更准确地说，是我不相信自己能出来，那个所谓的世界的阴暗面。
+
+　　关于这方面我原来胡思乱想过很多，最近的丰县事件让我又沉进思绪的大海。暂不论它是否是谣言，又或者被某个机关辟谣，我们只想象这样一个场景。
+
+　　她终于被拯救，然而她这二十多年来所经历的世界的阴暗和深刻，即使她扑进你的怀里哭得天昏地暗，也不再敢相信世界上有善良和温柔。拥抱，摸头，做好吃的，送礼物等等全部失效。
+
+　　这种情况我很久远以前就想过。
+
+　　当时还十分郑重地写下一句话：当一个人的恐惧，即使你用力抱紧也无法缓解，你，又该怎么做？
+
+　　**我原来真正切切地想这个问题，想出过一身冷汗。** 当时的共情值大概是最顶峰。
+
+　　所以到今天，不去看世界的阴暗面已经实实在在的演化成了我的一种生存策略。即使可能那些阴暗的东西，接触后没有想象中的那么糟糕。但是一旦随波逐流沉沦进去后，这个代价我是交付不了的。而我又是最容易这么干的。
+
+　　但是当时只是气昏了头啊，只是骂啊（笑。
+
+　　而且在我学了一点点法语过后，去查了一下这句话的原文，其实意思差别还挺大的，这句话的中文应该掺有一些意译在里面。不过当时也并没有学法语（笑。
+
+　　虽说自说自话地写下这些可能并没有人看吧。扯远了。
+
+　　《亲密关系》里面实验证实：双性化的男人遇上传统型的女人，或者双性化的女人遇上传统型的男人，或者两个双性化的男女碰在一起，他们都比两个传统型的男女相处更为融洽。（《亲密关系（第六版）》，第 26 页）
+
+　　更重要的是：坚持传统刻板性别角色的夫妻一般不如非传统的夫妇婚姻幸福(Helms et al., 2006)。
+
+　　以前我总担心自己这些女性化的部分会影响自己的形象，直到看见这些，我才真正放过自己。
+
+　　突然想起那句话：“所谓人的成长，其实是不断发现个人独特经历是人类普遍经验的一部分的过程。”
+
+　　不过事实上，我的确受到了影响。愿意去看这些难啃的人际关系学术著作的人，终究是少数。大部分人还是在用传统的标准衡量着自己和别人。
+
+　　一如以前的自己。
+
+　　**所以我大概还会坚持不抽烟，不喝酒，不打牌吧。** 取其精华，去其糟粕。
+
+　　**若是以后有谁感兴趣我这条准则背后的原因，或许我会把上面写的东西慢慢念给他/她听。**
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 2 月 10 日
+
+## 补充之一
+
+　　下午上车回家时，有一位女性，闷头往车里钻。
+
+　　然后探头，看到最后一排全是男性，愣了一下，又退了回来。想要跟我调换座位，我有些晕车，坐第二排来着。第二排几乎都是女性。
+
+　　她退回来跟我说：“我们能换一下位置吗？我有些晕车。”
+
+　　我那一瞬间，才真正发觉所谓微博女拳之流给人造成的精神荼毒。我平时都是当段子看的。
+
+　　我那一瞬间有些悲哀。为女性悲哀，也为男性悲哀。为所有人悲哀。
+
+　　希望这是我狂妄且傲慢的擅自臆测吧，如若此，那便再好不过了。
+
+　　我愿意打自己脸看到世界好起来。
+
+## 补充之二
+
+　　下面书籍相应部分（含有笔记勾画）。
+
+　　有一个专栏，一个表和一个图，下文文字粘贴版没有（因为粘不过来……）
+
+## 补充之三
+
+　　《亲密关系（第六版）》性认同差异小节及其所提及参考文献（原书第 23 页至 27 页）：
+
+　　我要对人际关系条分缕析，进一步区分亲密关系中的性别差异和性认同（gender）差异。确切地讲，性别差异指的是源自身体的两性生物性差异。相反，性认同差异指的是由文化和教育引起的两性在社会性和心理上的差异，或者叫社会性别（Wood & Eagly，2009）。例如，养育子女后，女性为母亲，男性为父亲，这就是性别（生理）差异；但认为女性比男性更有爱心，更关心孩子的社会共识，则反映的是一种性认同差异。许多男性和女性一样充满柔情、富有爱心地关心下一代，但如果我们希望和鼓励女性成为儿童的主要照料者，那么我们就会在养育风格上人为地制造文化上的性认同差异，这种性认同差异并非与生俱来的自然天性。
+
+　　要分清性生理和性认同的差异殊为不易，因为加诸于男性和女性的社会期望、教育训练和他们的生物学性别差异常常混淆在一起（Wood & Eagly，2010）。例如，因为女性能哺乳而男性不能，所以人们往往以为半夜为新生儿哺乳的一定是妈妈，而且妈妈肯定比爸爸做得好，即便婴儿吃的是奶粉，只需要把奶瓶放到微波炉加加热！要分清生物和文化在塑造我们的兴趣和能力中所起的作用并不容易。尽管如此，区分性生理和性认同两者的差别仍很重要，因为两性间的性认同差异大部分是在成长过程中习得的。
+
+　　性认同最好的例子是性别角色（gender roles），即社会文化所期待的男女两性应有的“正常”行为模式。男人当然应该有“男子气”，他们应该自信、独立、果敢、能干、好强。女人就应该有“女人味”，热情、敏感、多情、友善。大多数人都认为男人和女人是相反的两性，因此全世界都不同程度地期望男性和女性有各自不同的独特社会行为（Kite et al.，2008）。然而遗传在决定人们自信或友善的倾向时只起到四分之一到三分之一的作用，大部分行为是后天习得的（Cleveland et al.，2001；Lippa & Hershberger，1999）。文化的影响持续而广泛，它通过社会化和榜样学习（而非生物学上的性别差异），促使我们期待所有的男性都应该有阳刚之气，所有的女性都应该温柔细腻（Reid et al.，2008）。
+
+　　然而，刻板印象并不像你认为的那般符合现实中的人；只有一半人的特质刚好符合性别角色期望（Bem，1993）。相当多的人（约 35%）并不是完全的“男子气”或“女人味”，他们既自信又热情，既敏感又独立。这些人同时拥有传统上认为应该属于男性和女性的特质，因而被称为双性化（androgynous）。如果双性化这种说法看起来别扭，那可能是由于过于僵化地使用词汇：表面上看，“男子气”和“女人味”不可能同时并存。实际上，由于这些词语容易使人误解，研究者常用其他词汇来代替。把与任务有关的“男子气”的才能称为工具性（instrumental）特质，把与社交和情感有关的“女人味”的技能称为表达性（expressive）特质。这两类特质在同一个人身上出现就一点也不奇怪了。双性化的人可能是这样一个人：在职场激烈的薪酬谈判中能有效而强悍地捍卫自己的利益；但回家后又能细腻而温柔地安慰刚刚失去宠物的孩子。大多数人只擅长一种技能，在一种情境下显得游刃有余，另一种情境下就不会那么轻松。而双性化的人在两种情况下都能驾驭自如（Cheng，2005）。
+
+　　实际上，最好把工具性和表达性视为男性和女性都拥有的两组能高低变化的不同技能（Choi et al.，2007）。看看 26 页的表 1.2，传统的女人表达性高而工具性低，她们热情友好，但不够自信主动。符合传统期望的男人应该具有高工具性、低表达性的特质，他们是坚忍而强悍的铁血真汉子。双性化的人具备工具性和表达性两种特质。剩下的人（约 15%）要么具有在传统上属于异性的技能（称为“跨类型”），要么缺乏这两组技能（称为“未分化”）。在双性化、跨类型和未分化各类型内的男女比例大体相当，所以就性别差异而言，把两性视为具有不同特质的完全不同的两类人，既简单化又不准确（Bem，1993）。
+
+　　不管怎样，人际关系的研究者都特别关注性认同差异。因为正是这些差异“实际上造成了许多不和谐”，最终导致人际关系失败，而不是让两性关系变得更融洽（Ickes，1985，p.188）。从相遇的那一刻起，传统的男性和女性并不如双性化的人那样欣赏和喜欢对方。在一个经典实验中，研究者（Ickes & Barnes，1978）把男女配成对，一种条件下配对的男女都符合传统的性别角色，另一种条件下配对的双方至少有一位是双性化的。介绍两人认识后，他们有 5 分钟的时间在房间单独相处。研究者秘密地录下了这段时间双方的交往过程。结果令人吃惊，传统型的男女双方很少说话，很少注视对方，甚至看不到笑容，事后报告喜欢对方的程度也没有其他配对高。（请想一想：从行为方式来看，男子气十足的男性和女人味浓厚的女性有哪些共同点？）如果双性化的男人遇上传统型的女人，或双性化的女人遇上传统型的男人，或者两个双性化的男女碰到一起，他们都比两个传统型的男女相处更为融洽。
+
+　　更重要的是，传统型夫妇的这些缺憾并不会随着时间的流逝而消失。对婚姻满意度的调查发现，坚持传统刻板性别角色的夫妇一般不如非传统的夫妇婚姻幸福（Helms et al.，2006）。剽悍大丈夫和温柔小女人因为在处事风格和才干能力上差别很大，他们往往并不如那些不太传统、不太符合性别刻板印象的夫妇幸福快乐（Marshall，2010）。
+
+　　对此无需大惊小怪。人们一旦投身于亲密关系之中，都期望得到关爱、温情和理解（Reis et al.，2000）。表达性低的人（不怎么热情、温柔、敏感）不太容易表现出热情和温柔；也不怎么充满深情（Miller et al.，2003）。因此，长期来看，与表达性低的人结婚就不如与那些更敏感、贴心和友善的人结婚过得满意（SteinerPappalardo & Gurung，2002）。因此，屈从于传统的性别角色对男人是一种伤害，剥夺了他们本可成为更好丈夫的技能。
+
+　　另一方面，低工具性的人（缺乏自信和个人魄力的人）往往不如那些高工具性的人（任务导向的技能高的人）自尊程度高和适应能力强（Stake & Eisele，2010）。在“应对事务”上有能力和效率的人通常自我感觉良好（Reis et al.，2000）。所以，屈从于传统的性别角色对女人也是一种伤害，剥夺了她们可能取得更多成功和成就的技能。传统性别角色也让女人少赚金钱。在全世界，传统型女人比上班的女人收入低（Stickney & Konrad，2007）。
+
+　　这一切都表明，工具性和表达性都是有价值的特质，幸福、适应能力强、有效率和心理健康的人士通常都同时拥有这两组技能（Stake & Eisele，2010）。详而言之，那些拥有满意、幸福伴侣的理想夫妻，他们的工具性和表达性通常都很高（Marshall，2010）。在实际生活中，如果人们可以选择的话，大多数人更喜欢双性化的恋人或配偶，而不是完全男子气或完全女人味的恋人或配偶（Green & Kenrick，1994）。
+
+　　然而讽刺的是，人们往往会给那些不完全符合“恰当”性别角色的人很大的压力。妇女如果表现得如男人那般好强、自信，很容易被人认为霸道、无礼和“不像个女人”（Parks-Stamm et al.，2008），在工作中也更容易受到性骚扰（Berdahl，2007）。然而，如果性别角色期望有什么性别差异的话，那就是对男性的性别角色期望比对女性更为严格（Vandello et al.，2008）。女孩像个假小子，大家都不会放在心上，但是如果男孩子娘娘腔十足，大家就会很担心了（Sandnabba & Ahlberg，1999）。美国社会的性别角色的变化虽然缓慢，但的确在改变，尤其是每一代的新生女性都变得更加具有工具性（Twenge，2009），年轻人也逐渐变得更加男女平等，对男女性别角色的看法也不那么传统了（Bryant，2003）。但无论如何，即使性别角色的刻板印象限制了我们的潜能，甚至有时候还是错误的，但它仍将持续地存在。今天我们仍期望和鼓励男人具有工具性，女人具有表达性（Heilman & Wallen，2010），这些性别角色期望正是使亲密关系变得错综复杂的重要因素。
+
+　　原书该章节相应参考文献：
+
+> 　　Wood,W.,& Eagly,A.H.(2009).Gender identity.In M.R.Leary & R.H.Hoyle (Eds.),Handbook of individual differences in social behavior (pp.109–125).New York: Guilford Press.
+>
+> 　　Wood,W.,& Eagly,A.H.(2010).Gender.In S.Fiske,D.Gilbert,& G.Lindzey (Eds.),Handbook of social psychology (5th ed.,Vol.1,pp.629–667).Hoboken,NJ: Wiley.
+>
+> 　　Kite,M.E.,Deaux,K.,& Haines,E.L.(2008).Gender stereotypes.In F.L.Denmark & M.A.Paludi (Eds.), Psychology of women: A handbook of issues and theories (2 nd ed.,pp.205236).Westport,CT: Praeger.
+>
+> 　　Cleveland,H.H.,Udry,J.R.,& Chantala,K.(2001).Environmental and genetic influences on sextyped behaviors and attitudes of male and female adolescents. Personality and Social Psychology Bulletin,27,1587–1598.
+>
+> 　　Lippa,R.,& Hershberger,S.(1999).Genetic and environmental influences on individual differences in masculinity,femininity,and gender diagnosticity: Analyzing data from a classic twin study. Journal of Personality,67,127–155.
+>
+> 　　Reid,P.T.,Cooper,S.M.,& Banks,K.H.(2008).Girls to women: Developmental theory,research,and issues.In F.L.Denmark & M.A.Paludi (Eds.), Psychology of women: A handbook of issues and theories (2 nd ed.,pp.237–270).Westport,CT: Praeger.
+>
+> 　　Bem, S. L. (1993). The lenses of gender: Transforming the debate on sexual inequality. New Haven, CT:Yale University Press.
+>
+> 　　Cheng,C.(2005).Processes underlying gender-role flexibility: Do androgynous individuals know more or know how to cope–　Journal of Personality,73,645–673.
+>
+> 　　Choi,N.,Fuqua,D.R.,& Newman,J.L.(2007).Hierarchical confirmatory factor analysis of the Bem Sex Role Inventory. Educational and Psychological Measurement,67,818–832.
+>
+> 　　Ickes,W.(1985).Sex-role influences on compatibility in relationships.In W.Ickes (Ed.), Compatible and incompatible relationships (pp.187–208).New York: Springer-Verlag.
+>
+> 　　Ickes,W.,& Barnes,R.D.(1978).Boys and girls together–and alienated: On enacting stereotyped sex roles in mixed-sex dyads. Journal of Personality and Social Psychology,36,669–683.
+>
+> 　　Helms,H.M.,Proulx,C.M.,Klute,M.M.,McHale,S.M.,& Crouter,A.C.(2006).Spouses’ gendertyped attributes and their links with marital quality: A pattern analytic approach. Journal of Social and Personal Relationships,23,843–864.
+>
+> 　　Marshall,T.C.(2010).Gender,peer relations,and intimate romantic relationships.In J.Chrisler & D.McCreary (Eds.),Handbook of gender research in psychology (Vol.2,pp.281–310).New York: Springer.
+>
+> 　　Reis,H.T.,Sheldon,R.M.,Gable,S.L.,Roscoe,J.,& Ryan,R.M.(2000).Daily well-being: The role of autonomy,competence,and relatedness. Personality and Social Psychology Bulletin,26,419-435.
+>
+> 　　Miller,P.J.E.,Caughlin,J.P.,& Huston,T.L.(2003).Trait expressiveness and marital satisfaction: The role of idealization processes. Journal of Marriage and the Family,65,978–995.
+>
+> 　　Steiner-Pappalardo,N.L.,& Gurung,R.A.R.(2002).The femininity effect: Relationship quality,sex,gender,attachment,and significant-other concepts. Personal Relationships,9,313–325.
+>
+> 　　Stake,J.E.,& Eisele,H.(2010).Gender and personality.In J.Chrisler & D.McCreary (Eds.),Handbook of gender research in psychology (Vol.2,pp.19–40).New York: Springer.
+>
+> 　　Stickney,L.T.,& Konrad,A.M.(2007).Gender-role attitudes and earnings: A multinational study of married women and men. Sex Roles,57,801–811.
+>
+> 　　Green,B.L.,& Kenrick,D.T.(1994).The attractiveness of gender-typed traits at different relationship levels: Androgynous characteristics may be desirable after all. Personality and Social Psychology Bulletin,20,244–253.
+>
+> 　　Parks-Stamm,E.J.,Heilman,M.E.,& Hearns,K.A.(2008).Motivated to penalize: Women'S strategic rejection of successful women. Personality and Social Psychology Bulletin,34,237–247.
+>
+> 　　Vandello,J.A.,Bosson,J.K.,Cohen,D.,Burnaford,R.M.,& Weaver,J.R.(2008).Precarious manhood.Journal of Personality and Social Psychology,93,1325–1339.
+>
+> 　　Sandnabba,N.K.,& Ahlberg,C.(1999).Parents– attitudes and expectations about children'S crossgender behavior. Sex Roles,40,249–263.
+>
+> 　　Twenge,J.M.(2009).Status and gender: The paradox of progress in an age of narcissism.Sex Roles,61,338–340.
+>
+> 　　Bryant,A.N.(2003).Changes in attitudes toward women’s roles: Predicting gender-role traditionalism among college students. Sex Roles,48,131–142.
+>
+> 　　Heilman,M.E.,& Wallen,A.S.(2010).Wimpy and undeserving of respect: Penalties for men'S gender-inconsistent success.Journal of Experimental Social Psychology,46,664–667.
+>
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-临时车与零食车-md-1978739004"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-临时车与零食车.md

<details>
<summary><code>+29 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\264\346\227\266\350\275\246\344\270\216\351\233\266\351\243\237\350\275\246.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\264\346\227\266\350\275\246\344\270\216\351\233\266\351\243\237\350\275\246.md"
new file mode 100644
index 000000000..9e38bc463
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\270\264\346\227\266\350\275\246\344\270\216\351\233\266\351\243\237\350\275\246.md"
@@ -0,0 +1,29 @@
+# 随记 - 临时车与零食车
+
+　　前天匆匆忙忙赶去上素描课，途中听到两个小孩子在追逐打闹。有一个小孩的母亲在后面训斥，叫不要乱跑。当时正好是与公路交界的地方。然后我不自觉地一边看着那两个小孩子，一边往教室赶。
+
+　　走了好远才后知后觉地笑自己，我到底在担心什么？
+
+　　上完课已经是 22:30 了，天色已经完全黑了，只有几盏灯还稀稀疏疏地亮着，像渴睡人的眼。
+
+　　进校门的时候，有一辆车通过检查，电子机械女声报出一声：“临时车。”
+
+　　然后我懵了一下。
+
+　　回头一看，是个很正常的汽车，然后才反应过来，是「临时车」，而不是我第一反应的「零食车」。
+
+　　我这是想吃的想疯了（笑。
+
+　　本来应该是昨天发的，事情林林总总的，总忘记了。
+
+　　今早走在路上，下了一点雨，很凉快。有一点微冷。上完课回宿舍的路上，看到各式各样穿着青春靓丽服装的女生，养眼是养眼，但是没有一个跟我有关系，总觉得有点寂寞呢。
+
+　　上课很困，课都没听，就在睡觉。
+
+　　今天，大概也会是平平无奇的一天吧。
+
+<br />
+
+　　南国微雪
+
+　　2021 年 3 月 31 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-什么值得展示-md-3427351369"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-什么值得展示.md

<details>
<summary><code>+71 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\273\200\344\271\210\345\200\274\345\276\227\345\261\225\347\244\272.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\273\200\344\271\210\345\200\274\345\276\227\345\261\225\347\244\272.md"
new file mode 100644
index 000000000..786d04fca
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\344\273\200\344\271\210\345\200\274\345\276\227\345\261\225\347\244\272.md"
@@ -0,0 +1,71 @@
+# 随记 - 什么值得展示
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/antoine-beauvillain-0Kw44ElHN3A-unsplash.jpg)
+
+> 摄影师 | Antoine Beauvillain
+>
+> 图源 | Unsplash
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">860 字 | 思考 | 朋友 | 观念</p>
+
+## 正文
+
+　　忽然看到自己的同学们一个接一个地去旅游了，在朋友圈里大发感慨，还附图。
+
+　　我忽然想起一件事。
+
+　　一个朋友，原来去武汉见一个朋友，钱包被偷了，走投无路，找我借钱改签车票。她和我说了一路上很多趣事，其中就有——陌生人加她好友，看她朋友圈很精彩，约她去旅游。
+
+　　聊天过程中，有一句话特别惹人注意。
+
+　　“我都这样了，还要在朋友圈装出一副岁月静好的样子。”
+
+　　我当时特别不能理解。
+
+　　我觉得自己过得有多好，亦或者有多么糟糕，完全没有必要向别人披露。更不提需要装“我过得很好”这种事情。 **我愿意分享的，从来都是我认为值得分享的事情。**
+
+　　好就是好，坏就是坏，屏幕彼岸究竟不是自己，无法知其辛酸苦辣。
+
+　　精彩绝伦处，没必要给别人脸色炫耀。我总觉得这仿佛昭告天下：“你看看我，再看看你自己！”
+
+　　锅盆惨淡时，也没有必要给别人取笑。谁也不愿自己的窘境沦为众人茶余谈资。
+
+　　于是这样一通下来，发不发朋友圈，是最无关紧要的事了。
+
+　　我拍了很多很多照片。在大学里，相机所摄和 Google Photos 所存，林林总总近七千多照片视频。然而，我基本没怎么发过。
+
+　　写到这里，我忽然想起一个后辈的感情史。有个学妹，在他发言和展示履历时，觉得他很优秀，便向他表白了。
+
+　　如此看来，“展示”这个行为似也颇为重要了。
+
+　　“你不说，我又怎么会知道？”
+
+　　难以言表。想来想去，终究无解。大概这也需要平衡吧。
+
+　　然后，致命的问题接踵而至：什么值得展示？
+
+　　我至今一直认为，我所做的所有事情，没有一件值得给人夸耀。
+
+　　做事，安安静静去做就好了，声张什么呢？
+
+　　做自己想做的事情，本身就是幸福。
+
+　　想去旅行，所以计划行程；想看到有人感同身受、少走弯路，于是开始写作和编撰教程；想锻炼身体与表达感激，于是进行长跑。
+
+　　**这些事情，本质上是自己愿意去做，而非因为值得炫耀或看起来能让人觉得过得很好。** 所以也没有一件值得发表，因为在价值天平上，它们都因“想做”而平等。
+
+　　若非如此，总觉得有些“动机不纯”。
+
+　　时至今日，我还是想不通那个朋友是什么观念，也还是想不通什么值得展示。
+
+　　于是我还是回归我原来的默默无闻罢。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 6 月 27 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-倒装-md-371734931"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-倒装.md

<details>
<summary><code>+91 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\200\222\350\243\205.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\200\222\350\243\205.md"
new file mode 100644
index 000000000..2bd543084
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\200\222\350\243\205.md"
@@ -0,0 +1,91 @@
+# 随记 - 倒装
+
+## 写在前面
+
+　　今天不发日记。作为补偿，发一些我觉得挺暖和挺乐的东西。
+
+　　以下的「她」均指那位小姐。陈述内容根据叙事手法而定，与聊天记录不完全一致。
+
+## 正文
+
+　　（晚上，微雪决定去教室学习和工作，询问了那位小姐的意见得知她不来。不久，微雪有了些困意，于是发了消息。）
+
+　　雪：好想睡觉。
+
+　　她：那就回去嘛。
+
+　　雪：不要，明明才来没多久，这是我最后的倔强。不过我着实怕一觉睡过十点半被锁教学楼里边。
+
+　　她：应该不至于吧。
+
+　　她：现在还很困吗？
+
+　　雪：还好，不过还是想睡觉。
+
+　　她：要不，让你开心一下？我还有一个上镜的视频……暑假不给你看的那个…要看吗？
+
+　　雪：要看w。
+
+　　（随后那位小姐让我找到了视频，然后我和她吐槽了诸多的内容。）
+
+　　她：醒了吧现在？
+
+　　雪：啊……醒了。你这个刺激疗法还挺有效（笑。
+
+　　（微雪默默把打在输入框里的“谢谢”又删掉了，他想起是自己说过不喜欢朋友之间说谢谢。）
+
+　　（微雪回到宿舍，与那位小姐聊了一些乱七八糟的东西。）
+
+　　雪：你好呆啊，小姐。
+
+　　她：天天说我呆，看哪天我再好好嘲笑你一番。
+
+　　雪：欸？我觉得我不至于呆成你那个样子哦（笑
+
+　　她：你确定噢？到时候打脸别怪我。
+
+　　（过了没到五分钟。）
+
+　　雪：你洗漱完了吗？
+
+　　她：嗯嗯。
+
+　　雪：好快。
+
+　　她：我一直在寝室啊。
+
+　　雪：昂。
+
+　　她：主要是。
+
+　　（沉默了大概一分钟。）
+
+　　雪：主要是什么？
+
+　　雪：？
+
+　　她：你还说你不呆！
+
+　　雪：？
+
+　　雪：不是，你话不是没说完吗？
+
+　　她：我发了两句话…
+
+　　雪：我知道啊，然后呢？
+
+　　她：倒装…
+
+　　雪：……
+
+　　她：你看你看！你还天天说我呆！
+
+<br />
+
+　　总结：不要嘲笑别人，免得自己变笨。做人留一线，日后好相见。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 9 月 16 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-停转的表-md-2205869563"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-停转的表.md

<details>
<summary><code>+15 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\201\234\350\275\254\347\232\204\350\241\250.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\201\234\350\275\254\347\232\204\350\241\250.md"
new file mode 100644
index 000000000..dc2253095
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\201\234\350\275\254\347\232\204\350\241\250.md"
@@ -0,0 +1,15 @@
+# 随记 - 停转的表
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">28 字</p>
+
+## 正文
+
+　　对我具有重要意义的那只手表，不知在什么时候，停止了转动。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 12 月 22 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-兔耳朵恶作剧-md-4290298657"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-兔耳朵恶作剧.md

<details>
<summary><code>+80 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\205\224\350\200\263\346\234\265\346\201\266\344\275\234\345\211\247.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\205\224\350\200\263\346\234\265\346\201\266\344\275\234\345\211\247.md"
new file mode 100644
index 000000000..8ca1cc0a4
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\205\224\350\200\263\346\234\265\346\201\266\344\275\234\345\211\247.md"
@@ -0,0 +1,80 @@
+# 随记 - 兔耳朵恶作剧
+
+　　晚上跑步之前，热身。在一个弯道旁边。看见了一个很温暖的场景。
+
+　　前面一个女孩子戴着耳机，自顾自地走着，速度很慢，在回消息的样子。
+
+　　后面有两个女孩子似乎看到了，被其中一个人手拉着手悄悄地跟在后面。安静又迅速。
+
+　　那个戴耳机的人似乎没意识到自己身后藏了两张不怀好意的笑脸。
+
+　　身后的人依旧在笑着。越笑越开心。
+
+　　说时迟那时快，其中有个人，两只手比了两个剪刀手，按在戴耳机的人的头斜上两方，作兔子耳朵状。
+
+　　笑意渐浓。另外那个人甚至捂了嘴巴，眼角弯成月牙。
+
+　　兔子耳朵跟了五六米。
+
+　　那人好像看了看影子，发现有些不对劲，回头看见两张欠揍的笑脸。然后懵了一下。
+
+　　这下直接给俩人笑得蹲在地上。
+
+　　我也笑了。像是看见了某些纯洁无暇的宝石，在月下熠熠，闪着皎白的芒。
+
+<br />
+
+　　跑步途中看见一个女孩子，之前早已忘却却困惑了很久的问题忽然得到了答案。
+
+　　大概在初中想过。
+
+　　为什么，帽子后边的松紧调整带正上面会有那么大一个洞呢？
+
+　　看到眼前这个素不相识的女孩子，想起了那位小姐束起一头长发的样子。
+
+　　随意而慵懒。缱绻的样子，扑面予人一种心动感。
+
+　　像是有人早上从床上坐起，揉着眼睛用懒懒的声音抱怨你烦。
+
+　　像是商店的打折促销广播声。
+
+　　像是无数床单被套，在太阳下随着微风在杆子上舞动。
+
+　　像是早上滴下的露珠和呼吸的那口清新空气。
+
+　　什么时候，也想看她束起头发，戴一下帽子试试看呢。
+
+<br />
+
+　　回程。昏黄的灯光。花坛暗处。
+
+　　两人相拥，一男一女。
+
+　　女孩子把脸埋在男孩子上身，男孩子慢慢地抚摸着她的头发，一次又一次。动作看起来很轻。
+
+　　也许她这边遇到什么事情了，才让她这么撒娇。我不知道。
+
+　　路边看到过有人接吻。
+
+　　内心静如湖面。
+
+　　路边也看到过有人相拥。
+
+　　羡慕得要死要活。
+
+　　感觉自己就很奇怪，跟一般人反着来，对着干。
+
+　　“真好啊。”这样想着，一边往宿舍走去。
+
+<br />
+
+　　夜晚很黑，也很温柔呢。忽然转凉的天气似乎不那么凶狠了。
+
+　　再忍一天吧。
+
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 10 月 6 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-发梢的夕烧-md-1096137771"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-发梢的夕烧.md

<details>
<summary><code>+42 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\217\221\346\242\242\347\232\204\345\244\225\347\203\247.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\217\221\346\242\242\347\232\204\345\244\225\347\203\247.md"
new file mode 100644
index 000000000..a979ad4d9
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\217\221\346\242\242\347\232\204\345\244\225\347\203\247.md"
@@ -0,0 +1,42 @@
+# 随记 - 发梢的夕烧
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">546 字 | 感触 | 坚持 | 生活</p>
+
+## 正文
+
+　　在外面晒太阳。
+
+　　长时间工作，一直对着电脑屏幕，看向蔚蓝的天空居然感觉有些刺眼。
+
+　　低头揉揉眼睛。
+
+　　那一瞬间，刻意蓄长的侧发垂下来，发尾贴在眼角。阳光在发梢之间来回折射跳跃，形成一条条微小的彩色色带。
+
+　　侧发被暖阳映得宛如夕烧斜阳一般，配合正在沉入西方的太阳，让暖极的橙色，异常耀眼。
+
+　　远处是群山在阴影下的暗绿，眼前是透过发丝挤进来的暖橙。
+
+　　我因为留长发被无数人说过，也幻想过自己什么时候会因它而感动，但我没想象过这样的生活细节。
+
+　　那一两秒，我愣住了。
+
+　　然后——
+
+　　觉得自己为此所做的所有抵抗与反叛，都在刚才那一瞬间，闪烁出极为明确的意义。
+
+<br />
+
+
+　　南国微雪 Miyuki
+
+　　2025 年 1 月 18 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师・画师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-后座的安心-md-3599437104"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-后座的安心.md

<details>
<summary><code>+106 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\220\216\345\272\247\347\232\204\345\256\211\345\277\203.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\220\216\345\272\247\347\232\204\345\256\211\345\277\203.md"
new file mode 100644
index 000000000..0bd0ff6f0
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\220\216\345\272\247\347\232\204\345\256\211\345\277\203.md"
@@ -0,0 +1,106 @@
+# 随记 - 后座的安心
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/taylor-kiser-1su-ueyLoe0-unsplash.jpg)
+
+> 摄影师 | Taylor Kiser
+>
+> 图源 | Unsplash
+
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">1362 字 | 心绪强烈</p>
+
+## 正文
+
+　　写这则随记完全出于意外。
+
+　　今天做饭之前，随手拿了一块昨天父母随礼拿回来的巧克力。
+
+　　咬一口，一皱眉。
+
+　　酒心的。
+
+　　我没细看，不知道。我也不知道这算不算“破戒”，我觉得大概不算吧。
+
+　　这个酒心有点甜，但是吃到后面有点涩。涩的感觉很像红酒—— <u>这个味道我记忆犹新，因为红酒，起码我喝的那瓶，很难喝。</u>
+
+<br />
+
+　　红酒是某一年过年，家里亲戚送的。号称两千块钱一瓶，一共送了两瓶。
+
+　　我爸努了努嘴，我心领神会，开瓶。然后被橡胶塞卡了半天。父子两人用尽各种办法，刀划，钳子夹，甚至父亲还上了做彩钢棚的大型工具。然后望瓶兴叹。
+
+　　直到我们发现附赠的螺旋起瓶器。
+
+　　<u>那时候还没有立下不喝酒的誓言，就算这样，第一口也和我想象中形成了巨大的反差。</u>
+
+　　太涩了。不好喝。不对，很难喝。后劲还大。
+
+　　父亲也觉得不好喝。这两瓶，一瓶送人了，开的那瓶，我们花了一周多才喝完。
+
+　　“甚至不如我们村里几块钱一斤的烧老二，”父亲苦笑，**“看来我们没有享受的那个命。”**
+
+　　后面这句话，我到现在都有很深的感触。
+
+　　自打小时候家里就挺穷。那时候父亲接我上下学，一直这样到高中毕业。
+
+　　**用摩托车。**
+
+　　<u>或许也是这样，那时候我很讨厌坐车，不论轿车、面包车还是大巴车，甚至公交车都很讨厌。只要带密闭空间的交通工具，我都不喜欢。</u>
+
+　　父亲有时候会问伏在摩托车后座的我冷不冷。我说，不冷。
+
+　　“四个轮子的，暖和得多，也不用这么遭罪了。”
+
+　　“算了，我晕。”
+
+　　“也是哈，我们这个是天然空调。”父亲调侃，然后一阵哈哈大笑。
+
+　　我也笑。
+
+　　其实我知道，只是因为咱们家穷，跟空调天不天然，没有任何关系。我也知道，父亲心里对于我这副摸样，会心疼，但也无奈。
+
+　　真的不冷吗？真的如此，我的耳朵也不至于每年冬天红得发紫。
+
+　　父亲也是如此。不止耳朵，他在前面驾驶，还会碰到把手。钢铁机械在冬天的温度，每个人至少都能猜到。
+
+　　就算这样，父亲每次也会把我包得牢牢的，甚至为此买了一件老实的军绿色大衣，很厚，很重。还买了很厚的摩托车用的护膝，从脚踝到大腿的那种。
+
+　　<u>这些所有装备套到我身上，让我看起来像一只笨重的企鹅。</u>
+
+　　**我开始很害怕这种样子见到我那些同学，但后面无所谓了——穷不是什么羞耻的事情。**
+
+　　**反而，我有他们所没有的安心的体验。**
+
+　　父亲常年累月地接送，从小学五年级开始，到高三毕业，我想这已经代表了很多事情。光这一点，大概就是很多人难以企及的幸福了。
+
+　　要知道，我家，离我上学的地方，至少一个半马的距离。而且，盘山公路，弯道极多，来去至少一个小时。
+
+　　**这近十年的时间，每次我坐在后座，伏在父亲背上，都能结结实实地感受到：什么叫安心。**
+
+　　只要御寒的东西装备好，往后座一坐，就可以不用管任何事情了。 <u>有时候我甚至还会迷迷糊糊地睡着，虽然父亲总是骂我——要是一个不小心栽下去了怎么办？</u>
+
+　　在雨天，父亲还会穿上雨衣，把我也罩在里面。雨大时，能听到隔着雨衣传过来的，滴滴嗒嗒的声音。它枯燥，但隔着那么近的距离听雨声，让幼时的我很是着迷。
+
+　　**或许这就是穷人苦中作乐的天性吧。**
+
+　　我经历的所有慢慢让我变得有了穷病，有了钱也不敢花。高额消费思考数月之久，一旦决定，从不后悔。有朋友甚至觉得不可思议。
+
+　　现在我确实没有享受的命，因为已经习惯了。
+
+<br />
+
+　　**这一颗巧克力引发的故事，我仍希望看到这里的你们不去经历。**
+
+　　**因为它们，毕竟还算苦难。无论怎样苦中作乐，都不能改变其苦难的本质。**
+
+　　**如果能够避免，那自然最好。**
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 1 月 18 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-围巾与法官-md-1913572542"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-围巾与法官.md

<details>
<summary><code>+507 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\233\264\345\267\276\344\270\216\346\263\225\345\256\230.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\233\264\345\267\276\344\270\216\346\263\225\345\256\230.md"
new file mode 100644
index 000000000..c5ae05ce1
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\233\264\345\267\276\344\270\216\346\263\225\345\256\230.md"
@@ -0,0 +1,507 @@
+# 随记 - 围巾与法官
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">7292 字</p>
+
+## 正文
+
+　　事情从哪里开始说起好呢？
+
+　　这个纪实文学，将会涉及到七位主人公：K，叶，一平，姚，小迪，聪和会长。故事主要发生在前三位身上。
+
+　　离开校园后，我大概会缅怀这些日子吧。
+
+<br />
+
+　　［2022 年 11 月 19 日  周六］
+
+　　白天的事情，我大抵已经记不清了。
+
+　　这天，有个很重要的事情，便是他们去参加市里的街舞齐舞大赛，拿了季军。
+
+　　我们，本濒临灭亡，协会除名，最后我们救了下来。迫于生计，也为了发展，我们与外面的舞室达成了合作协议。本次比赛以他们名义参加，但人我们出，事后宣传之类的权力，也由我们保留。
+
+　　奖牌奖杯之下，他们，笑得开心。
+
+　　每个人都有一张证书，上面写有名字。K拍给我看。虽没有参加，但甚是感慨。后来，群里有人发K拿着奖牌的视频。一得知要拍，她显得甚是慌忙：“等一下！”
+
+　　显然没有料到是录像。
+
+　　我在这边看得笑出声来。
+
+<br />
+
+　　一切，都发生在晚上。
+
+　　彼时我正从图书馆出来，学了一天的民法，脑子里全是浆糊，并且附带被放鸽子的心情减益。
+
+　　起因是我打算去图书馆，问叶要不要去。本只是随口一问，没想到她早上就在了。
+
+　　我：……
+
+　　“那我去找你吧。”
+
+　　“我下午要去走访，可能不会在，也不知道多久回来。”
+
+　　“也行吧，我懒得找座位，帮你看东西也行。”
+
+　　“那你找找吧。”
+
+　　我和她对了很久的座位，顺便某人还说了几个特征，我才找到座位。确实已经没人了。
+
+　　真的有路痴，但肯定不是我，我只是找不到座位。
+
+　　结果是她确实也回来了，不过是来收拾东西的。她看了我一眼。
+
+　　本来说一起学习的，然后本来都快到图书馆了，她猛地被她朋友拉去操场看落日了。顺便还给我甩了一句：“别等了，我是你永远等不到的人。”
+
+　　我听完有些无语。
+
+　　“那你东西呢？送我了？还是放在这不管了。”
+
+　　“我待会儿过来拿。还要上课。”
+
+　　我：……
+
+　　不过本来就是来图书馆学习的，倒也无所谓了。
+
+　　与此同时，社团的人们正在狂欢，聚餐，开庆功宴。聚餐，社团的所有人都可以去。吃完时，已经很久了。他们说，要到操场去玩游戏。不过玩什么还在商讨。
+
+　　我在犹豫要不要去操场，K 忽然发了一条语音过来。
+
+　　“你今晚为啥不来吃饭啊？”
+
+　　说实话，当时我看到转出来的文字时，挺心疼的。
+
+　　因为我才在今天做了一个重大的决定：决定淡出他们的视野。而他们是不知情的，并且才进入这里，对一切都充满期待。
+
+　　总有一种在骗无知的小孩子的感觉。
+
+　　“你要去操场吗？”
+
+　　“我不知道欸。”
+
+　　拉扯半天也没一个明确的答复。不过 K 总觉得我要去的样子。犹豫之下，还是去了。
+
+　　“那个……你到了吗，你要不你带点含片呗，我喉咙现在有点不舒服，晚上出门没戴围巾。”
+
+　　我：……
+
+　　之前给她带了一点药，小迪那个时候也感冒了，K 和他各分了一点。
+
+　　一边无语，一边折返去给她拿药。K 之前说她睡觉都戴着围巾，因为喉咙实在有点疼。所以想了想，又把自己的淡绿围巾从衣柜里扯出来放进包里。
+
+　　“你不是说要来吗？”
+
+　　收到了下一条语音。
+
+　　我的好姐姐，能不能耐心一点……
+
+　　到了操场，一群人高叫我的绰号，我真想一个一个全部刀了，都十一点多了，一群瓜货真能玩儿。
+
+　　然而，这时候的我怎么也想不到，这一天，才只是开始。
+
+　　K 见状马上过来，两个眼睛盯着我：“东西呢？”
+
+　　“你等一下嘛，我掏一下，你这表情就跟我欠你钱似的。”
+
+　　药给她扔过去，她掏出一片扔进嘴里，我拿出围巾给她戴上。
+
+　　“还给你带了这个。你怎么忘了戴了？是落在烤肉店了吗？”
+
+　　“没有啦，就只是忘了戴了。”
+
+　　围着她脖子缠了一圈，K 执意要自己戴，我也就随她去了。我跟她说有另一种戴法可能要暖和一点，她也不听，我就懒得管她了。
+
+　　他们玩儿狼人杀。
+
+　　K 有两三把都死得特别早，就跑过来跟我聊天，还把我拉到一边，远离大部队。我知道，她肯定要说聪的事情了。
+
+　　聪是她喜欢的一个男孩子。跳舞好看。对于我们这群舞者来说，舞蹈审美是重要的，也是致命的。或许就是这个原因吧，K 喜欢上了聪。
+
+　　这个事情目前就我和会长知道。会长和聪关系挺好。
+
+　　K 原来跟我说这个事情，我让她去找会长，可能会有点机会。会长决定帮一把。但就目前的结果看来，聪似乎不太想聊的样子。就留了 K 一个人每天瞻仰似的看着他，然后碎碎地跟我和会长念叨着她和聪今天发生的事情。
+
+　　我不知道 K 和会长关系怎样，但是猜测应该挺好。会长不论是跳舞还是在生活中都很有些男孩子气，我觉得他应该更懂聪一点。
+
+　　K 的话有些多，抓不到重点的样子。经常都是，我们还没有聊完，然后狼人杀下一把就开始了。开始之后，她又跑回去玩儿，在哪天晚上被狼人干掉之后，又拉着我远离大部队开始聊。
+
+　　反反复复，说实话有些折腾。
+
+　　不过这次，似乎不只是她和聪之间的事情，还有她和小迪之间的故事。而后者，成为了我们日后几天一直讨论的主线。
+
+　　我姑且听完她的恋爱观，脑子里瞬间闪过一个词：性单恋。于是随后问她。
+
+　　K 说：“对啊，我就是啊。”
+
+　　K 说她很欣赏 BE 美学，而且喜欢那种虐恋：前天死去活来，昨天甜得要死，今天又哭断心肠的那种。她还说她有过一段恋爱，网恋，就两天，就呈现了这种发展。她说她还特别喜欢这样。
+
+　　我有些无语。好家伙，这下麻烦了。
+
+　　虽说这并不影响K是我们团里的吉祥物就是了。
+
+　　她前两次拉我说话我还挺懵的，后面慢慢地捋顺了，不过实在给不出什么好主意。她似乎也不需要我出主意的样子，我也就这么一直听着，顺便看他们继续狼人杀。
+
+　　小王今晚把把都是狼，老大哥一直在旁边很懵，似乎连规则都不懂的样子。我有些饿，拿了一包袋装果冻，但忘了吃，第二天才吃掉。
+
+　　一行人作鸟兽散去之时，已是两点半了。有的先走，有的骑车，有的善后。因为 K 的门禁卡给了别人，所以我们需要追随小马和另一个女生的步伐。她们有，不然 K 就回不了宿舍了。
+
+　　她们在前，我和 K 在后面慢慢地跟着。
+
+　　K 说小迪在追求她的室友。虽然不是重磅炸弹，但也足够奇怪了。更奇怪的是，K 的室友，姚，似乎总是在吊着迪的样子。
+
+　　姚在 K 和其他室友的面前说，她可以和迪暧昧，但是绝不会和他谈恋爱。并且，K 以前还问过她，要不要加入我们社团，她非常明确地拒绝了，然而现在又天天跟我们玩，甚至他们庆功喝酒时，她也想跟着去。
+
+　　K 说她最近很膈应姚和迪。
+
+　　情况大概就是这个样子。
+
+　　她碎碎地说了很多事情，但我大体上都记不太清了，都是一些非常细节的事情，细节到哪句话，哪个表情还有什么动作。
+
+　　我一直以为她挺没心没肺，不过看来是我想得太过简单了。
+
+　　“还有其他事情，我改天再跟你说。”K 看着小马两人马上就要进去了，才匆忙跑开。
+
+　　我朝她挥了挥手。
+
+　　睡下，已经是凌晨三点了。
+
+　　我决心，明天不能熬夜。一定要好好补一觉。
+
+<br />
+
+　　［2022 年 11 月 20 日  周日］
+
+　　昨晚睡得晚，今天起得晚。而且今天还有社团的团训。
+
+　　不过没关系，昨晚骨干一堆堆的都在狼人杀，所以都起得晚，团训时间整体推了一个小时。
+
+　　昨晚会长说了一句话：“来吧，搞死我，搞死我明天团训就轻松了。”最后每个人都被搞死了，包括会长。然而团训还是不轻松。
+
+　　虽说我没有去团训就是了。
+
+　　我后到的舞室，他们在里面做体能，我在旁边看着，也不参加。看了半天越看越想笑，放声大笑，仰天大笑。
+
+　　于是拿着手机拍照。
+
+　　不行，这种幸灾乐祸的事情我最喜欢了。
+
+　　“怎么了？不行啊，这点体能就趴了？”我边在他们体能队伍中游走，一边大放厥词。
+
+　　“喜欢摸鱼嘛，马上喊你做五十个波比跳。”
+
+　　我哭丧个脸。
+
+　　这时候我才发现叶竟然也来参加了。
+
+　　叶属于那种不太练舞的人。她来社团更多的，是为了玩儿，还有喜欢我们的氛围。所以她来这种痛苦的团训我是真的很意外。
+
+　　当然她也付出了代价。她后来跟我说，第二天她浑身酸痛。
+
+　　至于我？我是来吃饭的，睁眼十二点，早饭都没吃。楼下就是常常聚餐的饭馆，团训完了不免会吃一顿，都已经成默不成文的约定了。
+
+　　“没团训的不准吃饭。”
+
+　　“好哥哥，别这么狠心嘛。”
+
+　　“拍拍拍，喜欢拍，下次手机给你扔了，拿我的拍。”
+
+　　“原来你是这个意思哦……我还以为你多凶呢……”
+
+　　我跟叶坐一起。我问她下午去不去图书馆，她说她还没想好。
+
+　　“你不是要写报告吗？你写了多少了？昨天不是看落日去了吗？”我邪恶地笑了笑。
+
+　　“还没开始动……”她白了我一眼，有气无力地说。
+
+　　我是打算下午去图书馆的，继续学民法。考试说实话有点痛苦。
+
+　　吃到中途，叶跟我说，她决定去图书馆了。
+
+　　“为啥？”
+
+　　“作业真的要写不完了。”
+
+　　我：……真是朴素的理由啊。
+
+　　K 没有和我们一起吃，她有事先走了。还在舞室的时候，她还很着急地就要跑出去。
+
+　　“你不一起吃吗？”
+
+　　“不吃了！我和别人约的下午一点，只有二十分钟了。”
+
+　　K 本来就要跑出去了，然后又跑回来，到我面前。
+
+　　“做完了回来给你看！嘿嘿。”
+
+　　“啥啊？”
+
+　　“做指甲啊。我上周一约的，结果排到周六了，前面都排满了！”她边说边舞着手机，“要是做得不好看，我肯定要投诉他。”
+
+　　“瓜皮，那你还在这里说，快去啊。”
+
+　　“哦哦！对哈。”
+
+　　某人一溜烟跑出去了。
+
+　　吃完饭，我径直去了图书馆。我问叶她多久来，要不要占一个位置。她说她洗个头就来，要一个位置，还需要插座。我找了老半天。
+
+　　事实证明，这人是个摸鱼怪。我在图书馆看了一两个小时了，她才来，估计还睡了个午觉吧。
+
+　　白驹过隙，已是晚餐时。
+
+　　“你吃饭吗？”
+
+　　“不吃。”她看向我说。
+
+　　“欸，为什么？”
+
+　　“不想吃。”
+
+　　“胃是养出来的啊。”
+
+　　“但就是不想吃嘛。”
+
+　　“……那行吧，”我说实话挺无语的，“那你要喝点什么吗？我吃饭回来顺便帮你带一个。”
+
+　　“不知道欸，你随便买吧，都行，”她随后又想了想，“要热的。”
+
+　　“学校的热饮一般都是奶茶……”
+
+　　“不要奶茶。”
+
+　　“那行，我到时候拍照发给你，你看看你要啥。”
+
+　　“也行。”
+
+　　到我吃完饭给她发学校仅存的三个超市的热饮，我发现里面惊人的整齐划一：都是阿萨姆奶茶和雀巢咖啡。我不理解。
+
+　　“算了，我不想喝了。”叶看完之后说。
+
+　　我还觉得自己挺亏的，跑了这么多地方又不要了。然后忽然想起了室友推荐我的饮品。不过不是那种瓶装，而是学校里现做现卖的。
+
+　　“算了，我请你喝个好喝的，我看看还有没有热的。”
+
+　　“什么喔？”
+
+　　“秘密~”
+
+　　我问了一下店家，他们说可以烫热。
+
+　　“嘛，总之敬请期待吧。”
+
+　　发送。
+
+　　“还神神秘秘的。”
+
+　　我等了大概十分钟，拿着做好的燕麦米浆往回走。
+
+　　中途，碰到一平，发生那个经典的事件。
+
+　　一平看到我，向我一伸手，示意我停下。然后就这么一直盯着我，像盯着猎物一样，同时在自己的衣兜里掏着什么。
+
+　　我有些惊恐：“你要干嘛？”
+
+　　然后她给了我一块脆香米。
+
+　　当时真的很无语。我只能说，她那个样子，容易把人吓出心脏病。
+
+　　我回到图书馆。
+
+　　“感觉怎么样？”
+
+　　“感觉还行吧……不过我把吸管弄烂了……”
+
+　　我看了一下，有些尴尬。那吸管好像本来就是烂的，应该是生产出来就有问题。
+
+　　不过不影响饮用，而且她也说味道还可以，我就没太放在心上。
+
+　　“你待会儿去吗？”我问她。
+
+　　社团那群瓜货说，练完舞又准备玩儿狼人杀，没练舞的不准玩。
+
+　　哈哈，又是这句话，没什么威慑力。
+
+　　“去吧……我不知道，不过想去。”
+
+　　我是肯定要去的。他们一群人都想玩儿，狼人杀缺个法官。而我对这个游戏毫无兴趣，适合这个角色。昨天就是我一直当上帝，今天大概也一样吧。
+
+<br />
+
+　　我们带着伞到他们玩游戏的地点，已经是两三个小时之后了。
+
+　　那时候十点多，我之前折回宿舍拿我的门禁卡。事实证明我这个决定是正确的，因为最后离开的时候，已经是凌晨 3:30 了。
+
+　　K 给我看了她做的指甲。
+
+　　“怎么样？”她一边伸出手，一边看着我。
+
+　　我当时差点没忍住笑出声。
+
+　　“你要听吗？”我憋住笑，严肃地问她。
+
+　　“你说呀。”
+
+　　“说实话，我看起来像水泥。”我没忍住，哈哈大笑。
+
+　　然后便挨了一记手刀。我抬起头，看见 K 跑去和会长控诉，用手指着我：“你看他好过分！”
+
+　　我还是没忍住笑出声来，屋内外充满了快活的空气。
+
+　　狼人杀游戏正式开始。
+
+　　我说不清今晚游戏进行了多少局，因为我对这个游戏聊无兴趣。不过可以知道的是，玩到大概两点多的时候，有些人，包括我自己在内，很困了。
+
+　　途中有一些有意思的事情。
+
+　　K 说她自己很渴，要跑下去买水。不知道那个时候几点了，但我对她成功搞到一瓶水上来表示很惊奇，因为照理来讲，那个时候没有商家营业了才对。
+
+　　她那一把游戏死得早。身为法官一天的工作结束之后，她拉我到一边来。
+
+　　“我指甲弄脏了……”
+
+　　“欸，不是今天才做的吗？”
+
+　　“对啊，就刚才，不知道怎么就弄脏了，”她喝了一口水，清了清嗓子，“可能是买水的时候不知道在哪儿刮到了。不过我去做的时候，那个人就告诉我不要做磨砂的，因为磨砂很容易脏。”
+
+　　“那你这个就是磨砂的吗？”
+
+　　“对啊，因为这个颜色不磨砂的话，很难看。”
+
+　　我看了一下，看不太出来。想象不出来是什么样子。
+
+　　“不磨砂的话很平，而且看起来很淡。不知道你看不看得出来，这个蓝色其实是有两种的。”
+
+　　我又看了一下，然后觉得自己色感训练白做了，有点怀疑人生。
+
+　　也不知道是第几局了，K 要玩我的 iPad。她说她一直想要一个平板，用来写字还有学习。但是她的家人说只能笔记本和平板之间选一个。
+
+　　我当时在刷宪法题目，也没有特别急，就给她玩儿了，自己在一边看《西游记》。
+
+　　但是我也确实没有想到，她之后就一直占着我的平板了。写一些她自己收藏的句子。她说她备忘录里收藏了好多。
+
+　　我给她专门新开了一篇笔记，任由她书写。
+
+　　K 写自己的名字很好看。那些收藏的句子，字迹相对没有那么好看，不过因为内容多，整体看起来有一种小家碧玉之感。还写一些我们社团其他人的名字，甚至还在会长和他女朋友之间画了一个大大的红色的爱心。看得我直想笑。
+
+　　开始她还不让我看，不过我也挺理解这种感觉，也就没理她。但是谁知道她后面自己冲过来，举着平板给我看她写的东西。
+
+　　“把骨灰撒在宇宙，远离全人类的罪。”
+
+　　后面还署了名——Ms. Quinn.
+
+　　她还问我：“你听过这首歌没有？”
+
+　　我愣了一下，想了起来。
+
+　　我偶然间发现我和 K 喜欢同一个歌手：Quinn葵因。这是她的一首歌歌名。
+
+　　我们当初发现这个事实的时候，两个人都兴奋了很久。他乡遇知音莫过如此。
+
+　　“听过啊。”我回答说。
+
+　　我们俩人在一边儿交流了半天对这首歌的初印象。
+
+　　“法官呢？”有人喊，“法官！法官玩忽职守。”
+
+　　“哦哦，来了来了。”我讪讪地笑道。
+
+　　后面有很多局，K 也不怎么听别人的发言，就在一边写写画画。她还叫我把写好的东西回去发给她，她不太会弄出来。
+
+　　这样一直持续到狼人杀结束。那时候大概已经三点过了吧。
+
+　　一平后来的，有几局她死得也早，就在一边练舞。我们当时集体哭号：“师傅别卷了，这大半晚上的，还练舞，什么居心啊。”
+
+　　但是她没听：“我就是要卷死你们，嘿嘿。”脸上挂着让人讨厌不起来的笑。
+
+　　狼人杀结束的时候，他们有副扑克牌，准备炸金花，输了的人做俯卧撑。
+
+　　我那个时候已经很困了，困得不行，就躺在垫子上。K 趴在相邻的垫子，还是一直在玩着平板，写些东西。我就这样看着她。
+
+　　我当时感觉距离好近……不过随即摇摇头甩开了这种想法。
+
+　　她好像注意到了的样子，转头看向我，但没说什么，而是说了另外一句。
+
+　　“我感觉我们这样就跟与世隔绝一样。”
+
+　　我侧过身，看了看身后。除了我们两个人，其他人围成一圈，正在洗牌。大概炸金花要开始了吧。
+
+　　我侧回来，冲她笑了笑：“可能是吧。”
+
+　　K 依旧在写着什么，我仰躺着，在一边玩儿手机。半晌，她对我说：“你把悠米抱下来吧，我腰要断了。”
+
+　　我笑出声来。
+
+　　悠米不知道为什么特别喜欢她的背，在 K 的背上一直趴着，得有半个多小时了吧，两只爪子蜷缩着，眼睛闭上，看起来在睡觉。
+
+　　我把悠米抱下来，放在旁边。
+
+　　“要不你就在这躺着，跟悠米一起睡一会儿吧，”她指着悠米，“我去洗个手。”
+
+　　我：……
+
+　　她回来之后，说，她准备回去了，因为太晚了。
+
+　　我一看时间，差不多凌晨三点半了。
+
+　　起身一看，也不知道为什么那群瓜货起来练舞了，就很崩溃。谁深更半夜的不睡觉，在这里练舞蹈基本功啊。我一看那个炸金花的圈子，就只剩两个人了。
+
+　　我把牌借过来，然后有一个人也去跟着练舞了。
+
+　　我一直挺想试试那个魔术的。我请求 K 当观众配合一下，她好像也很有兴趣的样子。
+
+　　不过最终肯定魔术变失败了。这是我第一次干这种事情。
+
+　　“你个憨批，你拿着这张牌跟我说是梅花 7，那我肯定不信啊。”她大笑。
+
+　　原来是这个样子，我下次一定注意。
+
+　　我和 K 提议都要回去了，因为真的很困了，撑不住了。其他人见状也都说散了，一行人终于下楼回宿舍。时间大概凌晨三点半过。
+
+　　接下来是最尴尬的事情。
+
+　　K 一直很在意姚和迪的事情，在下楼的时候似乎又有可以补充的资料，于是跟我碎碎地说着。回我们宿舍区域的，一共四个人，我，K，一平和另外一个女生。
+
+　　K 一直在跟我讲事情，头背过一平她们，但我是能注意到的。
+
+　　走了两步，一平在最那边跟那个女生说：“我们走！不理他们两个了。”声音还有点大。
+
+　　我当时真的很尴尬。而且一平他们真的远离了我和 K 两三步。
+
+　　K 好像没有听到的样子，仍在跟我说着事情，一直到我走到男生宿舍门前，她才放过我，还最后说了一句话：“等我哪天抽空好好跟你聊一哈，我真的，不知道他们什么情况了已经。”
+
+　　我的好姐姐，你饶了我吧……
+
+　　她在途中问过一个问题：“如果我说，不想姚进我们社团，你会觉得我很奇怪吗？”
+
+　　“没有啦，怎么可能，”我笑笑，“有不喜欢的，或者讨厌的人，不想跟他们接触，是很正常的想法。有什么奇怪的，世界上哪来那么多奇怪的事情。”
+
+<br />
+
+　　［尾声］
+
+　　这个随记，从 22 号开始写，到 24 号仍然没有写完。
+
+　　不仅如此，其中还添了更多，我们社团发生的、值得记录的事情。
+
+　　例如，我因为不想吃晚饭，K 给我带了一个饼，而山东煎饼，我上一次吃，大概是两三年以前的事情了；再比如，K 和会长用石头剪刀布决定是练舞还是去操场跑步吃瓜，最后会长满盘皆输。我，一平，K，会长，还有另外一个男孩子在操场上听 K 聊姚和迪，听一平聊她班上那些俗世奇人（贬义），给她们出主意，或者只是跟着一起发笑。那晚，我重新认识了一平，觉得她三观极正；抑或是，一平小姐觉得我是猪，在我吃过饭之后，又提议买个烤红薯，还把 2/3 都给了我，我猜是她自己想吃；又或是今天刚刚发生的，K，叫我给她带一个用过的口罩，后来我才知道她觉得我没有，想用口罩系绳编一个头绳。她对我有头绳这件事表示极大震撼。不过我觉得我那个头绳被眼镜盒箍大了，感觉不好，于是后续重新给她买了一根。
+
+　　诸如此类，很多很多，但我已没有心力再去记叙了。否则越拖越长。
+
+　　我知道我的主观笔下，闻起来大概会有很多恋爱一样的气味。不过我深知，我和他们其中任何一个人都只是单纯的朋友，不会有任何可能。我也欣然如此。
+
+　　我只知道，我和他们是朋友。她们抑或他们都是我可爱的后辈。我们是一个社团的孩子，同是热爱舞蹈的人。
+
+　　仅此而已。
+
+　　故事仍在继续，若有哪天我兴致大发，再拾起笔来，或许我们能看见后续的发展吧。
+
+　　书之至此，悉数掷笔，未尽之事，随风随念。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 11 月 24 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-墨水套装-md-3597253762"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-墨水套装.md

<details>
<summary><code>+47 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\242\250\346\260\264\345\245\227\350\243\205.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\242\250\346\260\264\345\245\227\350\243\205.md"
new file mode 100644
index 000000000..0df945ba2
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\242\250\346\260\264\345\245\227\350\243\205.md"
@@ -0,0 +1,47 @@
+# 随记 - 墨水套装
+
+　　「废物，陪我去取个快递。」
+
+　　「啊？哦，啥快递？」
+
+　　「京东，嘿嘿，一个好东西。」
+
+　　「搞啥啊，这么神神秘秘的。」
+
+　　……
+
+　　「好看吗？」
+
+　　拆开，是一个钢笔墨水套装组合。
+
+　　「你咋突然想起用钢笔了？」
+
+　　我挺惊讶的。
+
+　　「你先说好不好看嘛。」
+
+　　「为啥？」
+
+　　「说好看就送你了，说不好看就不送了。」
+
+　　「你这啥鬼逻辑……」
+
+　　「好不好看嘛。」
+
+　　「还行，不过我还是很好奇，你为啥突然想起用钢笔了？」我把套装盒塞回他手里。
+
+　　「啥啊，我咋可能用钢笔嘛，你也不想一下。」
+
+　　「万一心血来潮了呢。不过你不用钢笔买它干啥？」
+
+　　「废物，这是给你买的。」
+
+<br />
+
+　　然后我懵在原地。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 5 月 10 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-夜雨美术室-md-3123971151"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-夜雨美术室.md

<details>
<summary><code>+27 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\244\234\351\233\250\347\276\216\346\234\257\345\256\244.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\244\234\351\233\250\347\276\216\346\234\257\345\256\244.md"
new file mode 100644
index 000000000..be2f616e9
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\244\234\351\233\250\347\276\216\346\234\257\345\256\244.md"
@@ -0,0 +1,27 @@
+# 随记 - 夜雨美术室
+
+　　现在在美术室。
+
+　　大学，爱下夜雨。每到傍晚，七七八八地，总会落下丝丝纺锤线，敲在地面上。
+
+　　带着深色的颜料，把空气连带着地面，一起浸润。变得清新而有分量。
+
+　　艺术楼尤为甚。美术室在五楼。有窗。
+
+　　窗外面是我所不知名的大树，郁郁苍苍。随风扑腾，响出沙沙声，枝干晃呀悠呀，感觉很是惬意。
+
+　　树旁边不远处，是两盏大灯。明黄明黄的，扎眼，但是很温暖。
+
+　　美术室里很热。听着后边老师的讲课声，站在窗口吹凉风，有种不为人知的舒心感和幸福感。
+
+　　那种凉意只能站在窗口才能感受到。
+
+　　自己，活在世界上的真实感，在这一刻，淋漓尽致。
+
+　　回头继续下笔画画的时候，忽然觉得，生活莫如此。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 5 月 21 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-夸她好看-md-4108073540"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-夸她好看.md

<details>
<summary><code>+59 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\244\270\345\245\271\345\245\275\347\234\213.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\244\270\345\245\271\345\245\275\347\234\213.md"
new file mode 100644
index 000000000..717b3a17b
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\244\270\345\245\271\345\245\275\347\234\213.md"
@@ -0,0 +1,59 @@
+# 随记 - 夸她好看
+
+## 正文
+
+　　这一页是之前多翻了一页，粘在一起没发现，没想到救了命（笑。我不知道那个店家什么情况，还没发货……
+
+　　今天最重要的可能就一件事吧。
+
+　　下午算法实验，一直在干活，所以没太注意，然后签到的时候，我才注意到，紫今天的穿着风格跟以往很不一样，给人以眼前一亮的感觉。黑 T，盘头，JK 格裙。裙子紫色的，不知道是不是因为名字带紫，所以对紫色有些钟爱。 <u>我还觉得挺漂亮的，真心这样想。</u>
+
+　　后面签完到其实可以走了，我把剩下的工作做得差不多了，忽然想到了她。然后想到了以前偶而尔想过几次的那个问题：如果我说出来，对方会不会比较开心？
+
+　　这样想着，决定去给她说。她刚走没多久，我在后边戏谑着她的绰号，一边追上她。她在楼梯上险些没站稳（笑。
+
+　　“怎么了？”
+
+　　“没什么，追上来就想夸一下你。”
+
+　　“夸啥？”
+
+　　“你今天还挺好看的。”
+
+　　她很明显地露出了吃惊的表情，但我没管，仍继续说着。
+
+　　“我是这样想的，然后感觉说出来你会比较开心，就这么说了。所以，感觉怎么样？”
+
+　　我看向她。
+
+　　“当然开心啦。”她笑了一下，还比了个剪刀手。我也笑了。
+
+　　我知道这么做可能有些奇怪，但和正面效应一比大约就无所谓了。我和她的关系说说这些应该也没什么，不会引起警惕。
+
+　　**女孩子大概都喜欢被夸漂亮吧** ，我这样想着。
+
+　　后面在 tg 上碎碎念，有人说我后面说毁了，应该说：“脑袋里这么想的，不小心就说出来了。”
+
+　　我觉得好假，而且味道就变了。虽说我的说法也有问题，像是故意讨她开心似的，但感觉更真诚一点，也更符合我的初衷。
+
+　　以前也做过类似的事，也有被这样对待过的经历，比如梦到我了，跑来和我说，我确实挺开心的。
+
+　　*看过一句话，说，人们对于黑暗会大声反驳斥责，对于美好却几乎总是默默欣赏，沉默不语，但这样别人根本就不知道。* 知情天平早已倾斜不堪。
+
+　　觉得有道理，有时候便留了一些心。我想，这样起码不会后悔吧。
+
+　　余下的，就只是，上课，复习和工作了。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 6 月 14 日
+
+## 写在后面
+
+　　本想作为纯日记发布，但因只记叙了一件核心事件，并随之表达了一些想法，与写作随记时体系结构类似，便以日记兼随记形式放出，一并收集在随记标签里。
+
+　　诸位如不觉得文中想法奇怪，也可稍做尝试，我想，定有收获。
+
+　　最后碎碎念一句：为什么没有人说我帅气……哭了……

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-她存下的照片-md-1009687509"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-她存下的照片.md

<details>
<summary><code>+29 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\245\271\345\255\230\344\270\213\347\232\204\347\205\247\347\211\207.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\245\271\345\255\230\344\270\213\347\232\204\347\205\247\347\211\207.md"
new file mode 100644
index 000000000..eabfd6209
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\245\271\345\255\230\344\270\213\347\232\204\347\205\247\347\211\207.md"
@@ -0,0 +1,29 @@
+# 随记 - 她存下的照片
+
+　　昨天灵跟我说，她想买衣服，但是每次挑着挑着就没了下文。她说想要成熟一点的衣服，最好是套装，因为懒的搭配。
+
+　　我问，青春一点的不也挺适合你的吗。然后想起了我的那件粉色的衣服，想听听她的意见。于是把淘宝里的衣服照片给她发过去了。
+
+　　她说，我觉得挺适合你的呀。
+
+　　我问，为啥。
+
+　　然后她马上发过来一张图，那图我曾经给她发过。那张照片，是五一我穿那件衣服出去玩拍的。
+
+　　她说，这件衣服跟你发的那个衣服挺像的。
+
+　　我说，就是那件。我还问了一下，为什么你这么快？翻聊天记录翻的，还是在相册里有。
+
+　　她说，我觉得挺好看的，就存了。
+
+<br />
+
+　　在自己在意的女孩子的手机里，存着自己的单人照。
+
+　　在那一刻，我第一次觉得，原来这竟是一件让人极其害羞的事情。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 6 月 13 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-姓氏壁纸-md-342320584"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-姓氏壁纸.md

<details>
<summary><code>+63 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\247\223\346\260\217\345\243\201\347\272\270.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\247\223\346\260\217\345\243\201\347\272\270.md"
new file mode 100644
index 000000000..7ab28bc8e
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\247\223\346\260\217\345\243\201\347\272\270.md"
@@ -0,0 +1,63 @@
+# 随记 - 姓氏壁纸
+
+　　因为昨天太忙，没写日记，遂今天写个随记补上吧。
+
+　　昨天中午收到一张图，灵发来的。
+
+　　图上跃着一只老虎，纯红色的背景，还用几个黄色的字写着吉祥话。典型的过年喜庆才会有的图。只是那吉祥话中含有我的姓氏。
+
+　　她说可以用作壁纸。
+
+　　我是奇怪又诧异，在没搞清楚之前还有一丝丝震撼。因为图案太过卡通，我还以为是她画的。
+
+　　“这是你画的？”
+
+　　“没有啊，这是生成的。”
+
+　　“吓死我了，我还以为我需要羞愧而死了。”
+
+　　随后她发来一个链接，这链接点进去是活动页面，他们学校弄的，姓氏壁纸。
+
+　　我其实说不太清楚这种感觉。
+
+　　我试图想象，她在打开那个页面给自己弄一张壁纸之后，出于什么原因又输入我的姓氏去生成这一张壁纸。但我想象不出来。
+
+　　但我确乎是欣喜又有些感动。
+
+　　让我想起前两天和骆玩游戏，因为最近很忙，上线的时间不是很多，所以装备和他们差了一大截。然后一上线，他们看我寒酸得不行都在电话里笑。
+
+　　“来来来，过来，给你这个，看你穷得，真的是。”
+
+　　一群人，围着你，疯狂给你丢东西。像扔垃圾一样（笑。
+
+　　你看着自己的物品栏迅速被填满，那几秒钟其实你不知道说什么好。
+
+　　我自己是这样的。
+
+　　一个人总容易胡思乱想想很多。跟着朋友在一起，很容易因为两个人之间的互动而被拽入现实生活。
+
+　　那种感觉，像什么呢？像，你平时总是站着，感觉与任何时候没有两样，但当你真正躺下来，躺在学校的操场或是什么草坪上，你才会发现：原来自己平时离大地那么遥远。
+
+　　有广袤的大地在下面供自己站立，其实是很安心的一种感觉。
+
+　　我忽然想起了《颠倒的帕特玛》。可能我现在才稍微了解一点吧。
+
+<br />
+
+　　下午，她还给我推荐了几本书，是漫画。
+
+　　有人能分享书，其实也是一件很开心的事情。因为似乎打破了看起来很有道理的那么一句话：“世界上有四种东西是不能分享的：书、电影、音乐和心情。”
+
+<br />
+
+　　今天，家乡下雪了。
+
+　　是微雪，几乎看不到那种。只能通过缓慢的飘落速度来捕捉到。
+
+　　要是能再大一点就好了。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 2 月 7 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-寄往异国的信-md-1240354025"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-寄往异国的信.md

<details>
<summary><code>+45 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\257\204\345\276\200\345\274\202\345\233\275\347\232\204\344\277\241.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\257\204\345\276\200\345\274\202\345\233\275\347\232\204\344\277\241.md"
new file mode 100644
index 000000000..80698706d
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\257\204\345\276\200\345\274\202\345\233\275\347\232\204\344\277\241.md"
@@ -0,0 +1,45 @@
+# 随记 - 寄往异国的信
+
+　　我一直认为，跨国邮件什么的，应该与我毫无关联。
+
+　　以前的自己大概也不曾想过，会有异国的朋友。
+
+　　“寄信人地址写在信封正面的左上角或信封反面的上半部。国名和地名……”
+
+　　我刚买到这封信封的时候，意外地在信封内折发现了这些提示。瞬间被感动。之前上网搜的国际信封书写格式总狐疑是否管用。看到这几行字，就跟拿到了玩具的小孩子似的。
+
+　　我盯着它们发呆。
+
+　　忽然觉得生活变幻莫测。在寄信这件事情上，我的体验约莫超越了我认识的所有人。
+
+　　5 封国际信封，花了我 1 块钱。
+
+　　“五封诶，还是国际信封，就花了我一块钱，我真觉得很不可思议。”我对室友这么说。
+
+　　“国际信封又怎么了，说到底不还是一张纸嘛。再说了，信封这种东西本来就很便宜，”室友对这种情况倒觉得挺无所谓，“要是它买贵了，我反倒觉得奇怪。”
+
+　　说得也是。
+
+　　《山茶文具店》里面对于信件颇为讲究。第一视角，是位代笔人，以为人写信为生。
+
+　　拜启、案下、御揭、亲展、前略、敬悉尊函。玻璃笔、牛皮纸、羽毛笔、虫瘿墨水、镜像文字。不同笔迹。这些都有讲究。
+
+　　他们是在这方面做到极致，而我只是传达思念。
+
+　　其实，应该没有优劣之分。
+
+　　我之前选信封都挺随便的，能被邮局接受的信封都行。不过邮局接受的不多，几乎也都是邮电局监制，所以想要选可爱的，大抵是不可能的了。
+
+　　所以我想在信封外，做一些礼物。
+
+　　我看着那封国际信封。窗外在下雨。
+
+　　上面的 By Air，似乎在隐隐告诉我它之后的命运。
+
+　　我毫不犹豫地印了下去。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 11 月 30 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-小店叙旧-md-1621646347"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-小店叙旧.md

<details>
<summary><code>+71 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\260\217\345\272\227\345\217\231\346\227\247.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\260\217\345\272\227\345\217\231\346\227\247.md"
new file mode 100644
index 000000000..ed2bc66e7
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\260\217\345\272\227\345\217\231\346\227\247.md"
@@ -0,0 +1,71 @@
+# 随记 - 小店叙旧
+
+　　开学报道前一天，核酸检测，顺便见了老朋友。
+
+　　说是老朋友，其实是比我大很多的成年人。初中，我们是第一届住校生，没有食堂，外面下馆子吃。一些杂七杂八的在他那里买。
+
+　　进店。他一看我，愣了一下。
+
+　　“多久去学校啊？”
+
+　　“明天啊，今天做核酸来的。”
+
+　　“来坐着玩儿会儿呗。”
+
+　　“行啊。我就是为了这个来的。”
+
+　　我笑了一声，他也笑了。我们絮絮地聊着。
+
+　　他们家的女儿已经上高一了。刚分科，读理。店长还十分骄傲地跟我说，她女儿现在是年级七八十名，曾经中考全县第一。
+
+　　我没曾想自己随意认识的人中，有这样的顶尖存在，虽说与我无关，但我想大约也有一种命中注定在里面吧。
+
+　　我笑笑说，还早，才高一，不过也只有两年了。店长说，是啊，我只希望她能保持下去，将来高考能考个 985 就可以了。
+
+　　错愕。是我惹不起的人（笑。
+
+　　若只有这种无聊的攀比，大可算作糟粕。后来他们便一直与我这小他们十多岁人的人，感慨世道艰难，时代下行。甚至聊起公考，研考。
+
+　　这点感受，共有。
+
+　　聊天途中，再没看过电视，目光一直在我身上。是时新生一种无谓感慨：倘若我也有这样大把只能看电视来消遣的时光就好了。
+
+　　店面不大，但是换新了，不像以前那样破旧。
+
+　　“我该走了。”
+
+　　“以后再来玩啊。”
+
+　　“好啊。”
+
+　　但我已经大三了，下次见面，会是什么时候了呢？
+
+<br />
+
+　　找到客运车，扔背包，占座，站在一旁，插上耳机，听歌，等待。
+
+　　不想那么早进车里，有股气味总是让人难以忍受。
+
+　　有些后遗症是站着，有强烈的鼓点时才能发作的。当兴奋地做完动作，才猛然发现是街上。
+
+　　旁边来了三个女孩子，我没敢看她们，脸上有些发烧，我只听到了一些碎碎的词句：
+
+　　别看了、没见过世面一样、上、你去……
+
+　　意识里男孩子的那部分觉醒了，让脸上有些更烫了，不过还好我知道别人看不出来。
+
+　　正好最后一位乘客到齐，司机向我招手。
+
+　　落荒而逃。
+
+　　上车，借着座位旋转身体，偷瞄一眼那个位置，那三个人笑罢，相互指了指，说了些话，约是调侃吧，旋即手挽手离开了。
+
+　　我还以为自己能有什么长进。
+
+　　看来是没有（笑。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 2 月 17 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-尾号是生日-md-1249434172"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-尾号是生日.md

<details>
<summary><code>+27 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\260\276\345\217\267\346\230\257\347\224\237\346\227\245.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\260\276\345\217\267\346\230\257\347\224\237\346\227\245.md"
new file mode 100644
index 000000000..c29774a6f
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\260\276\345\217\267\346\230\257\347\224\237\346\227\245.md"
@@ -0,0 +1,27 @@
+# 随记 - 尾号是生日
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">63 字 | 思念</p>
+
+## 正文
+
+　　到了一张可以自选号码的流量卡。
+
+　　选了很久，终于找到了满意的号码。
+
+　　尾号是她的生日。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 9 月 7 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-应酬是吃饭-md-3457922546"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-应酬是吃饭.md

<details>
<summary><code>+77 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\272\224\351\205\254\346\230\257\345\220\203\351\245\255.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\272\224\351\205\254\346\230\257\345\220\203\351\245\255.md"
new file mode 100644
index 000000000..38ba33bd6
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\272\224\351\205\254\346\230\257\345\220\203\351\245\255.md"
@@ -0,0 +1,77 @@
+# 随记 - 应酬是吃饭
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">546 字 | 感触 | 孩子 | 天真 | 生活</p>
+
+## 正文
+
+　　大轩轩是舞室里 Breaking 最厉害的小孩子。
+
+　　今晚，我和大轩轩顺道同一段路。他母亲接他。
+
+　　“你下周一还来吗？”他问。
+
+　　“来啊，怎么不来，”我顿了顿，继续说，“昨天没来是因为我被我们领导拉去应酬了。”
+
+　　“应酬是什么呀？”他眨着眼睛看向我。
+
+　　我看到他走在前面的母亲，背影微微一滞。
+
+　　我想了想，说：“应酬就是去吃饭！吃好的！”
+
+　　话音落罢，我嘿嘿一笑。
+
+　　“吃的什么啊？”他话音里有些激动。
+
+　　“吃的火锅，有毛肚、虾滑之类的。”
+
+　　大轩轩吸溜了一下嘴唇。
+
+　　“那是你自己去的还是你领导叫你去的呀？”
+
+　　我没想到他还会追问这个问题，我有点懵。反应了半秒左右。
+
+　　“这个不重要啦，关键是你想不想去嘛？”
+
+　　他大声说了一句想。
+
+　　我和他母亲都笑。
+
+　　“桌子上还有一盘大大的、红红的牛肉哦！”我笑。
+
+　　“别说了，别说了，再说我就要拉着妈妈一起去吃了。”他说。
+
+　　我和他母亲继续笑。
+
+<br />
+
+　　曾记得原来另一个晚上，我也和他同路。
+
+　　过小区停车场栏杆的时候，他向我诉苦，那个样子好可爱。
+
+　　“现在上了四年级了，作业好多啊……”
+
+　　“那就唰唰唰地把它们做完就好了！”我说。
+
+　　“要做完得花好多时间呢。”他说。
+
+<br />
+
+　　是啊，四年级作业好多啊，做完得花好多时间呢。
+
+　　嗯……社会上作业也好多啊，做完得花好几十年呢。我想。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2024 年 12 月 5 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师・画师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-开服-md-3154549928"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-开服.md

<details>
<summary><code>+113 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\274\200\346\234\215.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\274\200\346\234\215.md"
new file mode 100644
index 000000000..141bc666f
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\345\274\200\346\234\215.md"
@@ -0,0 +1,113 @@
+# 随记 - 开服
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/minecraft-669310_1280.jpg)
+
+> 摄影师 | Chickenonline
+>
+> 图源 | Pixabay
+
+## 正文
+
+　　说一下最近在做的事情。无关学习。
+
+　　我原来一直很焦虑，对自己的能力水平没有多少清楚的认知，时常觉得自己很强，又时常觉得自己很弱。于是便一直持续地学习，看书等等。可是这依然缓解不了我的焦虑。
+
+　　有个室友心态比我好很多。前两天与他聊天，说起一款游戏《Minecraft》（又名《我的世界》，以下简称 MC），这游戏算是挺知名了。
+
+　　他有时候看视频，但没有玩过。我当时很震撼，觉得很不可思议。要知道，MC 如今可是全球销量总排行第二的游戏。
+
+　　我说，要不要来试着玩一下？
+
+　　他说，行啊。
+
+　　然后问题来了。
+
+　　局域网联机现在强行要求正版验证，绕不开。然而这个游戏很贵，正版要接近两百块钱。再经过一个第三方游戏启动器联机失败之后，我们现在就只剩下一条路可以走。
+
+　　开服务器。服务器配置可以关闭正版验证。
+
+　　但是要知道开服务器算是一件很麻烦的事情，对于没有计算机相关专业知识的人来说，弯弯绕绕足以致命。
+
+　　我是计算机专业的，饶是如此也折腾了很久才开开。
+
+　　选定服务器（服务器是要租的，不便宜，所以是找别人借的），登录，配置环境，远程命令行文件传输，更改配置文件，尝试运行程序，启动失败，查看报错信息，寻找解决方案，尝试再次启动，启动失败，查看报错信息，寻找解决方案……
+
+　　折腾了很多次，还向服务器主人寻求援助（他比我厉害得多，经验人士）。
+
+　　最后游戏终于能进入生成的世界的时候，难免不了一声长叹：“终于搞好了”。
+
+　　把服务器地址给他们，然后我们的 MC 之旅就开始了。
+
+　　因为他没玩过，所以对几乎一切都很好奇，兴奋地问我这个是什么，那个是什么，东西又该怎么做，那个怪打人怎么这么疼。说实话有时候被问得有些烦，不过看他那个兴奋劲儿，有些想笑又有些怀念。
+
+　　想当初，我对 MC 一无所知的时候，也是这样的。
+
+　　所以这是好事情。
+
+　　当你承担起一个新人的向导角色，一步一步教他怎么在游戏里开荒，种田，挖矿，打怪，努力地生存下去的时候，你承担了他全部的希望。
+
+　　一个新人被丢在一个陌生的世界里，我想多数情况下是活不下去的。
+
+　　当初也是有人，这样一步一步带着我逐步揭开世界的全貌。
+
+　　我：“那个怪你别去碰，会被炸死的。”
+
+　　他：“我不信，我的求知欲上来了！我一定要去看看。”
+
+　　一分钟后。
+
+　　系统提示：SK 被苦力怕炸死了。
+
+　　然后我亲眼看着他灰头土脸地重生在家里，我当时还在家里烧东西吃。
+
+　　我：“怎么样？”
+
+　　他：……
+
+　　说实话，这一脸愣头青的样子挺好玩的（笑。
+
+　　服务器的人渐渐多了起来。我们交好的几个朋友都加了进来。
+
+　　他们开始一穷二白，眼巴巴地看着你，想要你给他丢装备丢东西，那个场景实在是好笑。
+
+　　不过最终你还是会丢给他们。
+
+　　你会从一开始做东西只做一份，逐渐开始意识到材料需要拿两份，再然后合成的成品需要点三四下才够你的朋友们人手一个。
+
+　　玩了这么多年 MC，我早已经形成了一套自己的玩法，比如熔炉充当地板，不占空间，还能起作用，比如种地的模式。所以当另一个朋友复现他自己的玩法时，我也只会静静地旁观，想着，原来这东西还能这么做。
+
+　　因为我知道，当我一个人修筑我们四个人所要住的房子时，他们也是放手让我去做的，没有抱怨任何事情。只是有时候会来一句：
+
+　　“你这房子修得真丑啊。”
+
+　　“来来来，你来修一个。”
+
+　　“不了不了，这种脏活累活我才不干呢。”
+
+　　然后两个人都开始笑。
+
+　　所以有时候我被问得烦了，或者觉得伙伴有些地方跟我做得不一致的时候，我总会在心里问自己：“我是否真正做到了宽容？”
+
+　　再回到之前的话题。
+
+　　他对游戏里的内容有着求知欲，我其实也这样。
+
+　　开服务器，我没能自己一个人完成，寻求了许多帮助，有些操作是我不知情的情况下搞的。我想，我只被授予了“鱼”而不是“渔”。
+
+　　所以，我自己私下又重新开了一遍。
+
+　　历尽千辛，成功了。
+
+　　和室友玩游戏的这些时间里，我的焦虑得到了极大的缓解。
+
+　　**当我对着黑漆漆的控制台，敲下命令，敲下回车，看到程序运行成功的那一刻，我忽然想起了我遗忘了很久的事情：**
+
+　　**“学习，是为了更好地生活。”**
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 3 月 28 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-成熟与依靠-md-1569364817"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-成熟与依靠.md

<details>
<summary><code>+45 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\210\220\347\206\237\344\270\216\344\276\235\351\235\240.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\210\220\347\206\237\344\270\216\344\276\235\351\235\240.md"
new file mode 100644
index 000000000..9ec4ac823
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\210\220\347\206\237\344\270\216\344\276\235\351\235\240.md"
@@ -0,0 +1,45 @@
+# 随记 - 成熟与依靠
+
+　　我发现很多时候，对我来讲，事情都是凑一堆的。
+
+　　前些天发生了一些事情，具体过程略过，两个不同的人，分别给了我差不多的评价。我相信他们没有事先交流过。
+
+　　一个说我现在表现得很成熟，一个说我好像比较靠谱。
+
+　　我其实挺意外。
+
+　　我记得我在许久之前曾经对一些人说过，我认为变成熟不是一件好事情，起码对我而言是如此。我希望自己仍然幼稚而天真，不至失去许多东西。
+
+　　但是如今得到了这种评价，我搞不清楚。
+
+　　成熟的评价体系，或者定义标准是什么？这个说起来可能又是一个哲学问题，和自由，道德，正义等等一样很难说清和量化。
+
+　　我一直在按着自己的行为准则去做。以前我认为这准则很幼稚，很适合我，大概不会让我失去我所珍贵的东西。
+
+　　比如承诺，比如温和，比如幽默，比如情绪，还有友谊等等。
+
+　　时过境迁，标准依旧，评价却完全不同。
+
+　　是我对标准本身内涵的理解发生了改变？还是说，我执行的方式更改了？
+
+　　我今天忽然想到这个问题。
+
+　　说实话，我先后收到这两个评价的时候，我不知道怎么去回答。
+
+　　一方面觉得有些开心，一方面又觉得有些心情复杂。
+
+　　心情复杂大抵已经说过了，而开心，则是确实自己有一天也成为了别人的信赖和依靠。
+
+　　从前，都是自己属于依赖和和渴求的那一方。
+
+　　所以，约莫是一件好事情吧。
+
+　　成熟似乎也不错。
+
+　　变得有些，像个男子汉了呢（笑。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 5 月 2 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-我想成为的人-md-1299313926"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-我想成为的人.md

<details>
<summary><code>+35 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\210\221\346\203\263\346\210\220\344\270\272\347\232\204\344\272\272.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\210\221\346\203\263\346\210\220\344\270\272\347\232\204\344\272\272.md"
new file mode 100644
index 000000000..a7fc76b67
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\210\221\346\203\263\346\210\220\344\270\272\347\232\204\344\272\272.md"
@@ -0,0 +1,35 @@
+# 随记 - 我想成为的人
+
+　　今天没有由来地，想写一点点什么东西。
+
+　　我仍旧不知道自己会成为一个什么样的人，我所明确知道的，只有我想成为一名创作者罢了。想用什么东西传达自己的心情和理念。想要收获更多认同的人。
+
+　　文字最简单，门槛很低。但天花板同样很高。于是我时常埋怨自己的灵魂为什么不够有趣，不够写出那种让人初见就甚为惊艳的字句。以至于似乎忘了自己的初衷。
+
+　　感觉直击人心灵的的排列组合都被人写尽了罢一般，只觉得自己的书读得不够。
+
+　　恍然一觉，自己，已经许久许久没有读过文艺类的涤荡心灵的书籍了。现在仅有的，只有教材一类的难啃的读物了。
+
+　　像是在被什么赶着走一般。
+
+　　原来我也变得这般浮躁了吗。
+
+　　我仍旧忘不了那天晚上哭过之后，那个女生陪我的长谈——在教室电影的背景音和人声的嘈杂之下。
+
+　　她每说的一句话都破开我的性格，震荡我护住心理的那层硬壳。一句话，砸一下，震一下。没有喘息，一下一下又一下。到了最后，感觉像是把自己的精神世界悬吊起来示众一般，完全招架不住任何攻击。
+
+　　那大概是我第一次单独对着同龄的女孩子哭得那样难堪吧。
+
+　　但她只是笑，微笑，用柔和的目光看着我。
+
+　　我想成为那样的人啊。
+
+　　什么时候，能够，实现呢？
+
+　　那片希望的蓝天。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2020 年 5 月 15 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-报复性熬夜-md-1624262406"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-报复性熬夜.md

<details>
<summary><code>+39 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\212\245\345\244\215\346\200\247\347\206\254\345\244\234.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\212\245\345\244\215\346\200\247\347\206\254\345\244\234.md"
new file mode 100644
index 000000000..f594cd297
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\212\245\345\244\215\346\200\247\347\206\254\345\244\234.md"
@@ -0,0 +1,39 @@
+# 随记 - 报复性熬夜
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">394 字 | 工作 | 感触 | 现状 | 习惯</p>
+
+## 正文
+
+　　每当工作蚕食了大部分自由，剩下的那小部分时间，你会做什么？
+
+　　如果我还有精力，我大概会报复性地做自己的事情。写作，跳舞，锻炼或者执行自己的年度计划。
+
+　　所以我常常熬夜。我觉得那些时间才是自己的。
+
+　　如果没有精力，大概只会发呆和睡觉。我自己也不清楚为什么，为什么有时宁愿枯坐也不去睡觉。一直盯着一个地方出神，不知道在想些什么。时间也就这样过去了。
+
+　　其实我很不愿意，把获得报酬的劳动叫做工作。在我心目中，工作应该是那些自己愿意做的、有价值的、并且很大程度上必须做的事情。
+
+　　社会上为了获得报酬而进行的劳动，我更愿意称为上班，或者坐牢。
+
+　　兴趣爱好在我这里的定义，几乎与工作相同，只是少了一个要素：很大程度上必须做。
+
+　　报复性熬夜肯定不对。颠倒作息、错失太阳、伤肝又折寿。但我控制不了。
+
+　　但愿世界上没有工作这种东西。传统定义上的那种。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 11 月 14 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-拐弯-md-1126463769"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-拐弯.md

<details>
<summary><code>+37 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\213\220\345\274\257.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\213\220\345\274\257.md"
new file mode 100644
index 000000000..231ec0629
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\213\220\345\274\257.md"
@@ -0,0 +1,37 @@
+# 随记 - 拐弯
+
+　　跟理发师对峙，总是让人心累。那个大叔我认识，一路走过来挺不容易。他背后就是生活。
+
+　　近来发生了很多事，有些事情还不小。但是风依旧吹，甚至还能听到从耳边溜过的呼呼声。
+
+　　记得曾读过一句话，大意是说，有时候重要的选择是在悄无声息中决定的，那时候你仍以为会有与以往一样的日常，仍是看见一成不变的风景，但未来已经默默然拐向了另一条道路。
+
+　　算是悄无声息吗？
+
+　　我想起我自己高考结束。之前以为自己会疯玩一场，撕书，唱 K，去嗨，吃饭聚餐，乱七八糟什么都来一遍。但是实际上什么都没有发生。只是还原教室的桌椅，叫上同好，在体育馆那面暗淡的镜子前跳舞。
+
+　　日常与非日常，可能并没有日漫中那样明显的界限。
+
+　　听到下课钟声响起，把人拉回现实。
+
+　　我想变得强大起来。
+
+　　然而生活与这之间的平衡，似乎总是一个不可调和的难题。
+
+　　我忽而想起，心理咨询师这个职业的悖论：这个职业是为了帮助别人而诞生的，然而来访者与咨询师之间是两个完全不同的个体，所以不得不承认，在某种意义上咨询师帮不了任何人。
+
+　　想着想着忽然觉得这个悖论有些邪教的意味（笑。
+
+　　最后总会把这些工作，全部推给时间。
+
+　　「不是不报，时候未到。」
+
+　　成长确乎是一个缓慢而坚定的过程。
+
+　　外面天很暗，似乎要下雨了呢。
+
+<br />
+
+　　南国微雪
+
+　　2021 年 9 月 15 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-拼图与落花-md-359347705"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-拼图与落花.md

<details>
<summary><code>+52 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\213\274\345\233\276\344\270\216\350\220\275\350\212\261.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\213\274\345\233\276\344\270\216\350\220\275\350\212\261.md"
new file mode 100644
index 000000000..3234c2d6d
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\213\274\345\233\276\344\270\216\350\220\275\350\212\261.md"
@@ -0,0 +1,52 @@
+# 随记 - 拼图与落花
+
+　　近来总会陷入一种纠结而又奇怪的思考，我不知道姑且能不能算作哲学思考，知道的只是这种思考常常会令我产生一些奇怪的想法。
+
+　　可能是最近怪书看太多了吧。
+
+　　上完课回来的路上，看见一个坐在电动车驾驶座上，百无聊赖等人的女孩子。如瀑般的长发逃脱几绺，绕过耳侧垂在身前。人来人往，很安静。
+
+　　忽然有一种电影般的视角，她是主人公，一颦一笑皆映人眼，周围是延时摄影后极速闪过的人群。
+
+　　就这样观察别人的生活，似乎也不错。
+
+　　擦肩而过一个熟悉的面孔。回头望了望，是那个在素描课上见过的女孩子。我还记得我曾经夸过那个女生漂亮，然后立即逃开了。最后一节课鼓起勇气，去要联系方式，失败了。神情似乎还挺警惕。
+
+　　我已经不止一次与她擦肩而过了。单论今天，就已经是第二次了。
+
+　　总觉得有些奇怪。
+
+　　可能是最近怪书看太多了吧。
+
+　　要做的事情很多。需要完成一些琐碎，一些练习，还有工程方面追加的需求。课程还堆起来了，时间完全不够用。但我还是想写写这些。
+
+　　虽说说这些可能有些晚了，但，我有真正地进入计算机、绘画和舞蹈的世界吗？
+
+　　我记得我以前曾给一个后辈说过：“你要做好心理准备，当你真正进入一个领域后，所学到的，都是被肢解到完全不成样子的知识，与你对这个领域的第一印象会有极大落差。”
+
+　　事到如今我才真切地体会到，我当初自己所说的话。
+
+　　当初可能带着一点傲慢吧。
+
+　　我手上拿的拼图碎片越来越多，拼出来的领域，跟我当初所见俨然泾渭分明。这是否算是一种背离？
+
+　　知识在扩大，无知也在膨胀，这种正反馈让人望天兴叹。
+
+　　心理学上说，人常在抑郁位和偏执位来回摆动，抑郁位常常是哲学家所在的位置。因为尝试去理解这个世界，所以痛苦。
+
+　　走在路上，戴上眼镜，不由得这么想道。
+
+　　于是我取下眼镜，一片朦胧，不那么清晰，却仍有别样的美感。
+
+　　正当我眯起眼睛的时候，一朵小花落在了我的肩头。
+
+　　周围是同龄人说说笑笑的声音。
+
+　　那一瞬间，我忽然觉得自己离他们很近，又离他们很远。
+
+
+<br />
+
+　　南国微雪
+
+　　2021 年 8 月 31 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-推免改方案-md-2376539140"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-推免改方案.md

<details>
<summary><code>+117 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\216\250\345\205\215\346\224\271\346\226\271\346\241\210.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\216\250\345\205\215\346\224\271\346\226\271\346\241\210.md"
new file mode 100644
index 000000000..8c5d80186
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\216\250\345\205\215\346\224\271\346\226\271\346\241\210.md"
@@ -0,0 +1,117 @@
+# 随记 - 推免改方案
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/josefa-ndiaz-IzmdWT2lW5Q-unsplash.jpg)
+
+> 摄影师 | Josefa nDiaz
+>
+> 图源 | Unsplash
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">1370 字</p>
+
+每则随记都蕴含一个特定的主题，而这次的核心是工作。这则随记权作是我近些时间，忧虑与安静作用下的涂涂画画吧。
+
+## 正文
+
+　　许久不记，总没有由来地想写些什么。
+
+　　步入大四，明显感觉许多不同。宿舍楼梯间，总能隔三差五听到同级生与家里人的对话：几乎总是牵扯到压力、焦虑、研考、缩招、简历和招聘。
+
+　　或许也是到了这个时间段了吧。
+
+<br />
+
+　　社团，大三组，三个人。同专业憨憨的一个 B-Boy，舞室里很少看到他人影了。大姐大，荣，频率也远不比以前。
+
+　　他们在群里说自己的近况。
+
+　　荣海投一百份，收到两个电话。而那个同专业生，每天缩减自己的睡眠时间。我时常在路上碰到他，他总是笑着打声招呼，我也总是问那个问题。
+
+　　“去哪儿啊？”
+
+　　吃饭，图书馆。我只听到过这两个答案。
+
+　　荣有时半夜发一条消息，说她睡不着。早晨起来看，时间戳是凌晨四点半。
+
+　　昨夜坐一学弟的电驴去舞室，我望着他的后背，听他说他听到的事情。
+
+　　“我不是加了个志愿者群吗？”
+
+　　“嗯，然后呢？”
+
+　　“最近看他们天天骂，学院和学校的推免方案天天改。说，四六级免修的成绩刚开始还算，后面就不算了。群里一天能有一千多条消息。”
+
+　　“是，学校这次做得确实不对。”
+
+　　今年推免，在公示期前一周改方案和标准，从白盒变成黑盒。
+
+　　“我在想至于吗……”
+
+　　“嗯……”
+
+　　我心里苦笑一下，可能真的挺至于的。虽然我不属于这批人，但能想象到那种感受。成功与否，关系到自己会不会陷入一个巨大的研考竞争漩涡。
+
+　　我不属于他们，但也不知道自己属于哪批人。
+
+<br />
+
+　　近些天一直在玩。知道现在这个时间对于毕业生来说，是极为宝贵的招聘时间，但是依旧在玩。
+
+　　或许是被时间追着跑太累了吧，现在想反抗一下，证明不这样做也能活下去。我不知道这个决定叫做勇敢还是脑袋抽疯，姑且这样决定了。
+
+　　室友在昨天聊到一个亲戚，说他父亲生病回来了，都没能出一分钱。而那人去年刚买了一套房子，临近成都中心城区。
+
+　　这事，室友从奶奶口中得知。奶奶觉得那人不孝顺，而室友想了想，觉得他可能是真的拿不出钱来，虽说事情做得也不对。而我，却是觉得被生活逼着走有些悲凉。
+
+　　室友说，他亲戚有个孩子，快中学了。成都的政策规定，如果要继续上学，必须在本地有一套房，并且居住一段时间。
+
+　　我想无论是谁，都能看出来经济危机即将来临。但是没有办法。
+
+　　彼时我和他正吃饭，双双叹息。
+
+<br />
+
+　　前段时间，荣的一个朋友手机坏了，让我帮忙。而我至今仍在惋惜没能完成这个任务。一个工程师不能解决问题，于己而言算作失职。
+
+　　若仅仅如此，可能不至于让我如此愧疚。耿耿于怀之处，在于那位朋友是一个画师。而未完成的作品，大部分都存在她的手机里。
+
+　　“我之前不是给你说我们宿舍有一个人画画很厉害吗，在接商插。”
+
+　　“嗯，好像是。怎么了？”
+
+　　“就她。”
+
+　　她朋友还没到的路上，荣对我这样说。
+
+　　曾经尝试过一些绘画，知道一张图背后需要极其多的努力。平涂还好，厚涂作画至少一周。起型，黑白分阶，高光，阴影，再分阶细化，辅以不时修正和突然冒出的灵感。一瞬间的入眼，背后蕴藏的是不停的昼夜。
+
+　　我觉得依靠画作生存的人，都很厉害。我后来曾想问她是否是一个 Concept Artist，但究竟作罢。
+
+　　我不敢问。
+
+　　同样想过因为一些事情向她道歉，然后说上一句：“你真的很厉害。”
+
+　　我不知道还有没有机会，遇见这样的人。
+
+<br />
+
+　　**工作只是生活的一部分。**
+
+　　**WORK and LIFE balance.**
+
+　　**仕事は生活の一部だけです。**
+
+　　**Le travail n'est qu'une partie de la vie.**
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 9 月 18 日
+
+## 写在后面
+
+　　望诸位工作顺利，生活胜意。Be live and not survive.
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-搭棚-md-3327051884"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-搭棚.md

<details>
<summary><code>+58 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\220\255\346\243\232.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\220\255\346\243\232.md"
new file mode 100644
index 000000000..9349e1816
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\220\255\346\243\232.md"
@@ -0,0 +1,58 @@
+# 随记 - 搭棚
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/daniel-schludi-mAGZNECMcUg-unsplash.jpg)
+
+> 摄影师 | Daniel Schludi
+>
+> 图源 | Unsplash
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">565 字 | 疫情三年，冷暖自知</p>
+
+## 正文
+
+　　早上打车。女司机，有个做教师的孩子。司机很健谈。
+
+　　她说，最近死了很多人。
+
+　　我心一沉。
+
+　　“怎么了？”
+
+　　“你在学校可能不知道，我前天接了两百单左右，但肯定不会只有两百人吧，”她笑了笑，然后继续说，“接了有一个人，他说，他昨天还在给家里老人买药，隔天早上就给老人搭棚[1]了。”
+
+　　“老人感染一下是受不了。”
+
+　　我沉默了一下，然后又听司机絮絮叨叨。
+
+　　“应该是昨天，接了一个医生，那个时候他回家。早上了他才回去。我问他怎么这个时候才回去，他说通宵了，医院不让回去，说人力紧张。然后就在后座上睡觉。”
+
+　　“还有一个人，家里两个老人同时感染，然后同一天走了；接了一个女人，手里抱了一个五个月的孩子，孩子也走了。”
+
+　　“我家孩子也感染了。我问他，要不要我陪？他说你不用管，继续上班就行。然后我就看他在家里改卷子，改一会儿趴一会儿。”
+
+　　我一直没怎么说话。
+
+　　“都苦啊。”我想了很久，只说出来这么一句话。
+
+　　“是啊，什么大灾大难的，受苦的都是老百姓，都是基层。”
+
+　　她笑了一下。
+
+　　“那些当官的，真不是个人呐。”
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 12 月 23 日
+
+## 引用及附注
+
+　　[1] 搭棚：搭建灵堂。在四川偏远地区，农村居多，有人去世需要将弄堂全部空出来，搭建一个棚户，中间放棺材和遗照，守灵三天。
+
+　　[2] 部分人称代词：因所提及对象均未指明性别，依据现代汉语语法规定，均使用“他”做指代。
+

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-摸黑找开关-md-398858591"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-摸黑找开关.md

<details>
<summary><code>+43 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\221\270\351\273\221\346\211\276\345\274\200\345\205\263.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\221\270\351\273\221\346\211\276\345\274\200\345\205\263.md"
new file mode 100644
index 000000000..5c3793773
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\221\270\351\273\221\346\211\276\345\274\200\345\205\263.md"
@@ -0,0 +1,43 @@
+# 随记 - 摸黑找开关
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">295 字 | 家人 | 亲密关系 | 感触 | 等待</p>
+
+## 正文
+
+　　参加工作之前，母亲让我拿了一张毛毯，说怕冷。
+
+　　毛毯很暖和，但一直没用到，这次拿回来了。
+
+　　母亲让我拿到兄长房间里放着。
+
+　　兄长国庆不放假。
+
+　　我没拿手电筒和手机。摸着黑，在兄长房间门口摸索灯的开关。
+
+　　摸了十几下，才终于摸到。
+
+　　开关的位置比我想象得要低很多。
+
+　　以前都不用摸开关，晚上直接走进去：兄长一定在里面，要么看着书，要么玩游戏。旁边放一盏书桌台灯，照亮桌子周围。
+
+　　我几乎是在一刹那，想到很久之前看过的一句话。
+
+　　**“没有人天生就该一直等着你，他们一直在你身后，只是因为他们愿意，也因为他们爱你。”**
+
+　　那一瞬间，无法言说的惆怅。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 9 月 28 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/beth-jnr-okUB5th8QtQ-unsplash.jpg)
+
+> 摄影师 | Beth Jnr
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-斜坡与轮椅-md-1515422815"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-斜坡与轮椅.md

<details>
<summary><code>+85 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\226\234\345\235\241\344\270\216\350\275\256\346\244\205.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\226\234\345\235\241\344\270\216\350\275\256\346\244\205.md"
new file mode 100644
index 000000000..63ecde65d
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\226\234\345\235\241\344\270\216\350\275\256\346\244\205.md"
@@ -0,0 +1,85 @@
+# 随记 - 斜坡与轮椅
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/michael-kucharski-fr-oF3S5SAI-unsplash.jpg)
+
+> 摄影师 | Michael Kucharski
+>
+> 图源 | Unsplash
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">1149 字 | 幼年记忆</p>
+
+## 正文
+
+　　跳海和我说，他决定好了，过个一年半载，最多四年，出国。我挺意外他还要这么久时间准备。
+
+　　他很早就跟我说，现在国内工作不好找，想签旅游签去澳大利亚打工。他也一直怂恿我去澳洲。我直接对他说，我家大概不行。他说，其实他也有一点牵挂的事情没解决。
+
+　　他准备去爱尔兰读书，但是又准备在澳洲打工。我着实有些迷糊。
+
+　　不过平心而论，他大约也算是找到了路吧。
+
+　　身边的朋友们，两个保研，一个研支团，四五个研考，两三个工作，一个公考，而这一个，出国。大约都已经寻到了方向。
+
+　　我时常说我找不到方向，今年也确实众生皆苦。不过，在这种环境中也才能看见成长吧。
+
+　　而成长，便是这次的主题。
+
+　　很多时候，成长要通过当前的核心事情才能看出来。以前是“学习”，而现在，是“工作”。
+
+　　**对于工作，我很多时候，内心是恐惧的。**
+
+　　早些年，尚懵懂，城里还有张贴布告栏，在一座门下。那门远不及凯旋门大，但似乎能看出些红军的遗迹。
+
+　　母亲拉着我的手，对着布告栏上的招聘，一个一个打电话。门附近人流量很大，母亲怕我走散。
+
+　　那时候鲜能进县城，于是幼年的我，不住地打量这个地方，目光满是好奇。
+
+　　<u>时至今日，我仍能记得，蓝天包裹下，门洞里板栗小贩的叫卖声，和母亲不时的叹息。</u>
+
+　　“妈妈，你在干什么呀？打电话打那么久……”
+
+　　“妈妈在和人聊天呀，还在认字，”母亲用手指着“招聘”的“聘”字问我，“知道这个字念什么吗？”
+
+　　我摇摇头。
+
+　　这大概是我对“工作”这一概念的第一印象。
+
+　　终于，成长到现在，那声叹息，跨越十多年，降临到了我身上。
+
+　　我不知道与那时候相比，母亲有没有成长，我只知道，**母亲确乎是变老了**；我也不知道与那时候相比，我有没有成长，我只知道，**我的确是长大而成年了**。
+
+　　工作能力的成长，我毫无感觉，而感情上，我却可以下个定论了。
+
+　　我再也不是以前的那个自己了。那个在车站看到前任同款书包和相似背影后，开始心脏狂跳的男生。
+
+　　昨天中午，餐桌对面坐了一个八分像她的女生，然而彼时内心已毫无波澜。
+
+　　大概，能算作是成长吧，如《再次仰望星空》里面的父亲一样。
+
+　　有些东西，或许需要猛然间的顿悟。
+
+　　最近常过的通道忽然将一部分楼梯抹平，用水泥砌成一个斜坡，呈半楼梯半斜坡的诡异样式。并且只有一栋宿舍楼这样做。
+
+　　学校多雨，水泥上方甚至还有架有塑料篷布挡雨。体积瞬间增大一倍。我们都很不能理解此举出于什么目的。
+
+　　直到我再次看见他。我终于明白，那个斜坡是为他专门做的。
+
+　　我不认识他，但他是那栋宿舍楼里唯一的残障人士，出去吃饭上课都要坐轮椅。虽说住一楼，但每次都要请求路人，将他抬下一楼和大道中间的两级台阶。
+
+　　他们仍然迷惑，但不久便不再过问。我最终还是没说出来这个可能的理由。
+
+　　平时走在路上不想让他受到压力，很多时候都不去看他。这次，我也不想说。
+
+　　学校在成长。我想。
+
+　　我肯定也在成长。我默念道。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 9 月 26 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-旗与故人-md-3929869569"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-旗与故人.md

<details>
<summary><code>+47 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\227\227\344\270\216\346\225\205\344\272\272.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\227\227\344\270\216\346\225\205\344\272\272.md"
new file mode 100644
index 000000000..3cd13d429
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\227\227\344\270\216\346\225\205\344\272\272.md"
@@ -0,0 +1,47 @@
+# 随记 - 旗与故人
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">288 字 | 思念 | 朋友</p>
+
+## 正文
+
+　　社团的后辈们。
+
+　　这个人，没有演出，但是带出来了参加表演的人。
+
+　　表演那天，跟我一起毕业的一个学姐，回去看了他们，顺便看了他们表演。
+
+　　演出之后，他说：“春去秋来旗依旧，唯念故人千里遥。”
+
+　　社团的旗帜从初代传下来，甚至旗杆都有五六年了。
+
+　　我们这届毕业的有五个人，只有一个人回去看他们。还是因为打九价。其他人都忙得没时间。
+
+　　我宽慰他，就算没在一起也无所谓。
+
+　　最后有人回了我。一个新生。我们相处过一年，然后我就毕业了。
+
+　　他们希望我回去。
+
+<br />
+
+　　本来上班烦躁透顶，看到他们的回复还是叹了口气。
+
+　　好想回学校啊。
+
+　　那群人真可爱啊。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 12 月 19 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-晒痕-md-1567780903"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-晒痕.md

<details>
<summary><code>+49 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\231\222\347\227\225.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\231\222\347\227\225.md"
new file mode 100644
index 000000000..71692a354
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\231\222\347\227\225.md"
@@ -0,0 +1,49 @@
+# 随记 - 晒痕
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/alyson-mcphee-yWG-ndhxvqY-unsplash.jpg)
+
+> 摄影师 | Alyson McPhee
+>
+> 图源 | Unsplash
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">381 字 | 家人</p>
+
+## 正文
+
+　　今晚和母亲做饭。
+
+　　犹记得，以前自己一无所知。烧了油，水滤过的菜直接对着身前放。菜还没下完，人就已经被油溅了一身。有几滴还溅到脸上手上，烫得人哇哇大叫。
+
+　　母亲也急，总是说我。后面教我，要么菜放到锅铲上往下倒，人侧到一边，要么用锅铲反扣抵住锅沿，把食材放到凹槽里。
+
+　　母亲还教我系围裙。那时总是全副武装的样子，但还是做不好。
+
+　　今晚还是母亲主厨。
+
+　　我看她侧身下菜的背影，竟一时间有些陌生。
+
+　　我凑近看，母亲又开始似笑非笑地说：“凑这么近，小心把人烫傻了。”
+
+　　“不会，不会，这都多大了……”
+
+　　“那里有围裙，你系上再过来吧。”母亲把葱放进锅里，侧身对着我。
+
+　　我看着母亲身上的短衣短裤，以及长时间户外作业留下的臂膊晒痕，想说些什么，但又说不出来。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 6 月 25 日
+
+## 写在后面
+
+　　回家以后拍了几张母亲的图。母亲看见了，说我是偷拍。
+
+　　“你怎么偷拍了这么多？”
+
+![](https://img.tinysnow.cn/blog/articles/essays/DSC03276-2023-06-20--1-60%20%E7%A7%92-100-SONY-ILCE-6000.jpg)
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-暴雨停电-md-3786261542"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-暴雨停电.md

<details>
<summary><code>+13 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\232\264\351\233\250\345\201\234\347\224\265.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\232\264\351\233\250\345\201\234\347\224\265.md"
new file mode 100644
index 000000000..9741ba50e
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\232\264\351\233\250\345\201\234\347\224\265.md"
@@ -0,0 +1,13 @@
+# 随记 - 暴雨停电
+
+　　乡下，暴雨，停电。说停就停，农村丝毫不含糊。
+
+　　那时候我在睡觉。我起床后，听父亲说，好险刚才那一批蒸得差不多了。
+
+　　现在，母亲望着案板上还没有蒸的包子，一筹莫展。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 7 月 3 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-未能牵手-md-2408345507"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-未能牵手.md

<details>
<summary><code>+85 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\234\252\350\203\275\347\211\265\346\211\213.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\234\252\350\203\275\347\211\265\346\211\213.md"
new file mode 100644
index 000000000..236445e1c
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\234\252\350\203\275\347\211\265\346\211\213.md"
@@ -0,0 +1,85 @@
+# 随记 - 未能牵手
+
+　　在路上。
+
+　　看见一对男生女生并排走。女生手里牵着一个小孩子。
+
+　　很小，牙牙学语，但能走路了。
+
+　　一切都跟那天很像，记忆瞬间被带往远方。
+
+　　她的小侄子，最终也还是没能让我牵手。不知道这算不算一个遗憾。
+
+　　那是冬天，与现在炎炎的夏日完全不同。能捉住太阳，就已经是很庆幸的事情了。
+
+　　那天，正好太阳露了脸。
+
+　　最初的我，并没想到会陪着她去公园。
+
+<br />
+
+　　我还记得那天，那个小家伙闪着光的眼睛。用一种很兴奋的语气问我和她。
+
+　　“那是什么呀？”
+
+　　那是玩具摊哦。还有人在遥控飞机。
+
+　　听，还在响呢。你应该会很喜欢吧。
+
+　　灵看了我一眼，笑了一下：“快跑吧，不能让他看见这些，不然我们就走不掉了。”
+
+　　就算到最后，小家伙的眼睛，仍在痴痴望着那里。
+
+<br />
+
+　　我也还记得那阵的手足无措。
+
+　　本来我都要走了，小家伙突然闹起矛盾。无奈之下，只能送她俩到家门口。
+
+　　“不进来坐坐吗？”
+
+　　推辞三番。进屋。
+
+　　被家长盯着看。
+
+　　“坐啊。想吃橘子随便拿。”
+
+　　“嗯。”
+
+　　大人们都笑。我并不敢轻举妄动。
+
+　　一边听着她在一旁收拾东西的声音，一边回她几句闲碎的话。
+
+　　那是我第一次一个人进女孩子的家里。
+
+　　也是最后一次。
+
+<br />
+
+　　我最终记得，自己的那几声呜咽。
+
+　　主动提出要合照，笑着同意了。
+
+　　抱了最后一下。
+
+　　“这个寒假，要好好玩哦。”
+
+　　“嗯，你也是。”
+
+　　一个人蹲在马路边。
+
+　　“天哪，我都干了些什么呀……”
+
+　　一边感受自己脸上的温度，一边反思。
+
+　　自言自语的声音都是抖的。真没出息。
+
+<br />
+
+　　想着这些。蓦地好奇，那对男孩子和女孩子之间，又会发生些什么呢？
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 7 月 21 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-枇杷树-md-3383266846"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-枇杷树.md

<details>
<summary><code>+39 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\236\207\346\235\267\346\240\221.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\236\207\346\235\267\346\240\221.md"
new file mode 100644
index 000000000..ec158a1d0
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\236\207\346\235\267\346\240\221.md"
@@ -0,0 +1,39 @@
+# 随记 - 枇杷树
+
+　　盛夏总容易勾起各种各样的回忆。
+
+　　中午，去别人家做客吃饭。回来的时候，哥哥看到了旧房子路边的一棵树，感慨说道：“现在都已经长得这么高了啊。”
+
+　　我后知后觉地看向那里。那是棵枇杷树。生长的条件极为艰苦。
+
+　　我种的。
+
+　　并且是当时我认为最可能长不出来的一株。
+
+　　时间拨回十几年前，忘了自己是小学几年级了。是一个盛夏，母亲端来一盆枇杷，钢盆那种（很有农村的风气w），为我们解凉。我吃了许多，看枇杷的种子煞是惹人爱，滑滑的，又大，挺好玩，就想起种。
+
+　　征得母亲应允后，便抄着自己的小锄头，揣着一大包种子上山了。因为离家不远，视线之内，也没人管我。蹦蹦跳跳的，还跳掉了几颗种子，后来一数才发现不对劲，不过也懒得管了。
+
+　　每种下一颗，就用土盖起来，踩得严严实实。那时候我哪里知道这么做，土壤会板结，植物透不过气。只是一个孩子的直觉——土没有盖严实，要么会被人偷走，要么会长不起来。
+
+　　长在路边的那棵树，当初还是种子的时候，周围几乎没什么土，全是沙砾和石头。我也没办法踩。可能这才逃过一劫吧。（笑
+
+　　此后，再没有管过那些种子。任由天地风吹日晒雨淋雷打。
+
+　　直到高中有一天回来，妈妈告诉我说，我种的枇杷树结果了，可惜的是，前两天有辆卡车，撞掉了它半边的树枝。
+
+　　但是结的果依旧很好吃。不过稍微有点酸呢。（笑
+
+<br />
+
+　　那是我幼时之后第一次认认真真地，再去看我亲手植下的生命。
+
+　　今已亭亭如盖也。
+
+　　一如生活。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 8 月 2 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-梦里的大姐姐-md-1303814127"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-梦里的大姐姐.md

<details>
<summary><code>+69 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\242\246\351\207\214\347\232\204\345\244\247\345\247\220\345\247\220.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\242\246\351\207\214\347\232\204\345\244\247\345\247\220\345\247\220.md"
new file mode 100644
index 000000000..9b3dfbd02
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\242\246\351\207\214\347\232\204\345\244\247\345\247\220\345\247\220.md"
@@ -0,0 +1,69 @@
+# 随记 - 梦里的大姐姐
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">605 字 | 梦境 | 温馨 | 哀伤 | 感情 | 爱</p>
+
+## 正文
+
+　　昨天做了一个温馨而哀伤的梦。
+
+　　具体的细节我已经忘记了。我只记得有一个姐姐，年龄比我大上一些。
+
+　　梦里，那个大姐姐对我很温柔。为我做了许多事情，像母亲一样。打伞、受欺负时为我撑腰、做好吃的、还教会了我怎么珍惜他人。
+
+　　但她不是我的亲人。萍水相逢，更类似于朋友。
+
+　　那个时候我很小，她从未向我坦露过她的脆弱。
+
+　　梦的最后，她受了很大的打击。崩溃了。
+
+　　因为她一直表现得很坚强，所以她周围的人觉得有些不可思议。
+
+　　“她不可能哭的。”
+
+　　那个时候我已经长大了一些，但仍然比她矮许多。
+
+　　“虽然长大了一些，但还要蹲下来呢。”她笑了笑说。
+
+　　她蹲下来，看着我，面容憔悴。
+
+　　“大姐姐，你怎么了？”我问。
+
+　　我没有看过这样的她。
+
+　　“大姐姐遇到了一些不好的事情，你能陪陪我吗？”她说。
+
+　　我和她目视良久。
+
+　　不知怎的，我鬼使神差地摸了摸她的头，就像以前她摸我的头那样。
+
+　　她愣了一秒，然后开始哭，哭得很凶。悲恸欲绝，天昏地暗。
+
+　　我没有看到过她哭，也从来没有处理过这种情况。手足无措。手忙脚乱找纸巾。我越擦，她哭得越凶。
+
+　　梦里最深刻的感触，是那个小小的我，感受到“原来大人也会哭啊”，以及——
+
+　　看见深深喜欢的人脆弱哭泣的样子，而自己却什么都不能做，那种深深的无力感。
+
+　　我只能摸摸她的头，表示支持。
+
+　　她原来说过，不许戏弄大人。我犹豫了很久，终于还是用小小的胸膛抱住大姐姐的头。
+
+　　她抽泣着回抱住我。
+
+　　梦醒了。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2025 年 3 月 23 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师・画师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-毅力与星星-md-961395403"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-毅力与星星.md

<details>
<summary><code>+51 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\257\205\345\212\233\344\270\216\346\230\237\346\230\237.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\257\205\345\212\233\344\270\216\346\230\237\346\230\237.md"
new file mode 100644
index 000000000..2b658fdc4
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\257\205\345\212\233\344\270\216\346\230\237\346\230\237.md"
@@ -0,0 +1,51 @@
+# 随记 - 毅力与星星
+
+　　今天跟一个闺蜜聊天。
+
+　　她之前就跟我说，她这个假期要学车。我说挺好的，充实。她问我在家干嘛，瘫着？我说，找了个教程，每天逼自己画两个小时画。她说很棒啊。
+
+　　一连说了几个类似的词。
+
+　　我补了两句，说，画画的反馈周期太长了，我不知道能不能坚持得下去。
+
+　　她随即回复。
+
+　　「感觉在我这里，我一直觉得你是一个很有毅力的人。」
+
+　　我看到之后懵了。
+
+　　就时间维度上看，她似乎并没有怎么思考。
+
+　　雪：
+
+　　是吗……是写日记给你带来的感觉吗……？
+
+　　珍：
+
+　　不知道，反正就是感觉，很有计划。
+
+　　我：……
+
+　　就很突然，也很迷惑。因为我并不觉得自己有毅力，我也有挺多事情没有坚持下来。
+
+<br />
+
+　　写着写着忽然想到，她前不久问我的那个问题。
+
+　　「到底应该追求那种很遥远的星星，还是应该现实一点抓住身边的呢？」
+
+　　我的回答是后者。
+
+　　当时并没想太多，只是忠诚地回答问题。现在来看，或许是将她越推越远。
+
+　　或许有哪一天，会在中间蓦地显出一条线，两个世界，泾渭分明。
+
+　　友谊的巨轮，那个图标，早已不知道消失在哪天了。
+
+　　有些人，大约永远只能做朋友。无论男性女性。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 7 月 27 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-母亲的蒸馍-md-3082523425"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-母亲的蒸馍.md

<details>
<summary><code>+17 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\257\215\344\272\262\347\232\204\350\222\270\351\246\215.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\257\215\344\272\262\347\232\204\350\222\270\351\246\215.md"
new file mode 100644
index 000000000..a1c8e2ed1
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\257\215\344\272\262\347\232\204\350\222\270\351\246\215.md"
@@ -0,0 +1,17 @@
+# 随记 - 母亲的蒸馍
+
+　　之前与母亲说，10 号全体毕业生离校。
+
+　　最近对学校托辞有事，延迟离校。
+
+　　今天母亲打来电话，我说了这个事。
+
+　　母亲笑了笑说：“我还说今天专门在家给你蒸个馍，等你明天回来吃，那这岂不是又搞不成了？”
+
+　　那一瞬间，罪恶感上涌。有些难过。
+
+<br />
+
+　　但就算这样，我还是不想回家。
+
+　　不想看到他们吵架。
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-没能忘记-md-3610829421"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-没能忘记.md

<details>
<summary><code>+25 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\262\241\350\203\275\345\277\230\350\256\260.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\262\241\350\203\275\345\277\230\350\256\260.md"
new file mode 100644
index 000000000..99ed551a4
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\262\241\350\203\275\345\277\230\350\256\260.md"
@@ -0,0 +1,25 @@
+# 随记 - 没能忘记
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">63 字 | 思念 | 回忆 | 重要之人 | 过去</p>
+
+## 正文
+
+　　我还是没能忘记她。
+
+　　我以为我做到了。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 8 月 23 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-海豚式俯卧撑-md-2585757694"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-海豚式俯卧撑.md

<details>
<summary><code>+99 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\265\267\350\261\232\345\274\217\344\277\257\345\215\247\346\222\221.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\265\267\350\261\232\345\274\217\344\277\257\345\215\247\346\222\221.md"
new file mode 100644
index 000000000..e5e10da10
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\265\267\350\261\232\345\274\217\344\277\257\345\215\247\346\222\221.md"
@@ -0,0 +1,99 @@
+# 随记 - 海豚式俯卧撑
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">1074 字 | 经历 | 感触 | 小孩子 | 童真 | 大人</p>
+
+## 正文
+
+　　今天回县里跳舞。朝哥结束我们的课程之后，给小班上课。朝哥让孩子们先来几个俯卧撑热身。
+
+　　我当时在喝水，看到他们的俯卧撑差点没笑得一口水喷出来。
+
+　　四个孩子没有一个做标准的。要么腰特别高，海豚式；要么腰特别低，海豹式；要么就直接趴在地上了。
+
+　　很明显全在偷懒。
+
+　　我和朝哥对视了一眼，都开始笑。但是我们都没说话。
+
+　　我是因为这里是他的主场，反客为主不好，但我不知道他是怎么想的。
+
+　　不过我想，这算是大人的仁慈了吧。
+
+　　现在想来，我曾经也是其中的一员。或许年少时偷偷藏在桌底的小说，老师都知道，睁一只眼闭一只眼；还有去网吧打游戏，谎称自己去查资料，父母也知道，现在想起来这个理由也挺好笑，学生时代需要查什么资料呢；还有没有做寒暑假作业，各种被火烧了，被狗咬了，被水泡了，被弟弟妹妹撕掉了。
+
+　　我曾听一位当老师的朋友说，她说现在这些孩子真可爱啊，找的借口和我们当年一样，一点都没变过。
+
+　　现在我认为，这些细节才是身为人的温暖。尤其是身为大人。在这方面不需要特别严格要求，抓大放小，该严格的自然会严厉起来。
+
+　　俯卧撑不标准而偷懒，也不是什么大事。
+
+　　小孩子们也不懂。等他们长大了自然会懂的吧，就像我现在一样。
+
+　　跳完去超市买东西。单位发的购物卡还没花完。
+
+　　恰好撞见了同一个班级的小孩子。买了一袋素描纸还有其他什么，正在结账。
+
+　　说实话他很调皮，上课也不好好听，做各种奇怪的动作，元神出窍，有时还会说一些怪话，还会喊叫或者大笑。
+
+　　不过他算是孩子们当中比较厉害的了。
+
+　　当然，就课上的表现来说，并不算大人眼中听话的乖乖孩子。
+
+　　他用电话手表亮出支付宝的二维码，收银员却说刷不上。连着试了好几次，还是不行。
+
+　　收银员说可能是限额了。
+
+　　他看起来有些焦急。我不知道他有没有其他的解决办法。
+
+　　我还没有等到那一刻。
+
+　　不知怎的，身体比脑子反应要快，我跟收银员说：“刷我的吧。”
+
+　　收银员扫了码。
+
+　　他从通道出来，头低着，声音也很低，说了一句：“谢谢。”
+
+　　我笑出了声。
+
+　　然后他抬头问我：“你来这里干什么呢？”
+
+　　我听完这句话更是笑出声。
+
+　　怎么说呢，这句话简直跟“师傅你是做什么工作的”有的一拼了。
+
+　　“买东西啊。不然你来超市跳舞吗？”
+
+　　他愣了一下，也开始笑。
+
+　　我指了指入口，跟他说我打算进去了。
+
+　　他朝我挥手。
+
+　　“拜拜。”
+
+　　“拜拜。”
+
+　　我对这件事情感触之所以那么深，或许就是因为他是个孩子。
+
+　　孩子的世界总是相当纯粹。
+
+　　他抬头问我那句话时，我真的没办法忘记那双清亮清亮的眼睛。
+
+　　成年之后，我长久以来都认为，自己不算一个成熟的大人，更像一个孩子。
+
+　　而今天，这或许是我有史以来，最像大人的一次了。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2025 年 11 月 2 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师・画师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-渺小如蜉蝣-md-2745373181"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-渺小如蜉蝣.md

<details>
<summary><code>+29 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\270\272\345\260\217\345\246\202\350\234\211\350\235\243.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\270\272\345\260\217\345\246\202\350\234\211\350\235\243.md"
new file mode 100644
index 000000000..f32f8c8bb
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\346\270\272\345\260\217\345\246\202\350\234\211\350\235\243.md"
@@ -0,0 +1,29 @@
+# 随记 - 渺小如蜉蝣
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">127 字</p>
+
+## 正文
+
+　　加班。疲惫之后越来越觉得，自己一直苟且着，为生活低头。
+
+　　这个世界甚是复杂，我尝试着去理解它。理解愈深，便愈觉有趣，世界亦愈迷人。
+
+　　同时也越发感受，自己渺小如蜉蝣。
+
+　　但就算这样，我还是想留下些什么。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 9 月 7 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-热爱与傲慢-md-1945549554"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-热爱与傲慢.md

<details>
<summary><code>+123 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\203\255\347\210\261\344\270\216\345\202\262\346\205\242.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\203\255\347\210\261\344\270\216\345\202\262\346\205\242.md"
new file mode 100644
index 000000000..38a576048
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\203\255\347\210\261\344\270\216\345\202\262\346\205\242.md"
@@ -0,0 +1,123 @@
+# 随记 - 热爱与傲慢
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/pexels-taryn-elliott-5737938.jpg)
+
+> 摄影师 | Taryn Elliott
+>
+> 图源 | Pexels
+
+## 正文
+
+　　前两天和一个朋友聊天，聊得深入了一些。
+
+　　我们以今天很忙这种散漫的话题开头。
+
+　　“你每天都是这种生活吗？我感觉今天我快要忙疯了。”我说。
+
+　　“还好吧。”她说。
+
+　　她日常说她成天都是课，有时候很累。我在前两天忙疯了之后有感而发，问她天天这样不辛苦吗，我觉得这样好折磨啊。
+
+　　她说：
+
+　　“我比较喜欢，当我接触了我就会想去学好。
+
+　　“比如跳远，就是享受跳跃过程。很速度，跳下来人废。接着就去打武术，马步都扎不稳。可帅了。我又喜欢，哈哈哈。
+
+　　“会辛苦，会上瘾。
+
+　　“其实我都能想到我之后身体器官或者某个部位会比同龄人差很多，但是就是享受。”
+
+　　她是体育生，几乎只有晚上的时候有理论课，能坐下来。
+
+　　我的眼睛看到弹出的这段话，心里有一种不知道怎么说的感觉。五味杂陈只能略微言表。那一瞬间各种情绪和想法上涌心头。
+
+　　怔了许久，才堪堪地回了一句：“喜欢你这样的态度，感觉在发光。”
+
+　　**我确乎是这样想的。雪利她也确实是在发着，于我而言，无比耀眼的光芒。**
+
+<br />
+
+　　上一次听到这种话还是心理咨询师。
+
+　　大一还是大二的雨夜。在空无一人的教学楼三楼空地。没有空调，没有窗户，只有围栏。能听到雨滴频频碎碎地打在雨棚上的声音，那时耳畔此声无限放大，还有各种树叶呼啸摇动的声音。我穿着一件单薄的衣服，寒意肆意侵扰周身。
+
+　　那是我第一次感受到如此程度的孤独和寂寥。
+
+　　那是我目前为止，大学生涯里最为压抑和痛苦的一段时光。我自己觉得没有丝毫异常。但，Tessa 一直觉得不对劲，然后给我强行预约了一个心理咨询师。
+
+　　我反抗了很久。最终败下阵来。
+
+　　我说，我觉得自己没有任何问题，撑过这段时间就好了，不需要你这样做。
+
+　　她说，嗯，嗯，我知道，那么你什么时候有空呢？
+
+　　那也是我第一次知道，有些人的意志能如此坚定，不会因为你的意见有一丝一毫的动摇，说实话，那个时候，我心里对这样的她有些害怕，乃至恐惧。
+
+　　我开始了一个人与咨询师的单独对话。
+
+　　最后我问她：“每次这种时候，都会接收到很多很多负能量的东西，你一定很辛苦吧？”
+
+　　咨询师用一种缓慢又温柔的声音说：
+
+　　“听到这个问题，说实话我有些生气，”略微思考了一下，她继续说，“我热爱我的这份工作。我一直觉得这份职业崇高又辉煌，能够对世界上的一个人起到实实在在的影响。而对于这些东西的承受能力，是我的骄傲，也是我继续行走下去的力量。 **可能你永远都不会明白这一点。**”
+
+　　“抱歉，我失礼了。”
+
+　　“没事的，谢谢你的关心。”
+
+<br />
+
+　　我用一句话不经意地攻击着别人视若珍宝的自尊与骄傲，用着我以为的关心和体贴。
+
+　　那时候脑海里反映出的第一个词，就是 **傲慢** 。
+
+　　这个环境，这个场景，我的那一句话，至今浓重地烙在我的记忆最深处。它们对我的自我教育起到了莫大的作用。自那以后我心里暗自发誓，绝对，绝对，绝对不要再做一个傲慢的人。
+
+　　那个雨夜，我头一次清晰地意识到“热爱”这个词的深刻与沉重，也是头一次清晰地意识到“温柔”和“沟通”的力量。
+
+　　**温柔与平静不是懦弱也不是随波逐流。沟通也没有人们想象中的简单。**
+
+　　**而，热爱的人们，更是从来都不被平庸如我的人们所理解。**
+
+<br />
+
+　　朋友补了一句话，打断了我的思绪：
+
+　　“就像你，你跳舞的时候也就像在发光一样。”
+
+　　我笑了笑。
+
+　　“欸……没有吧，我没什么感觉啊……”
+
+　　我想她应该很无语吧（笑。
+
+　　之后的对话，我记不太清楚了。不过这上面的对话，唤醒了我那些沉睡的记忆。场景无比熟悉。
+
+<br />
+
+　　我周围有很多人，他们都在各自的领域里发着光。我也见证着这一切。
+
+　　而许多正在发光的人，却丝毫没有这种自觉。
+
+　　我不知道我自己有没有正在发光，不过明确地知道一点，那是我很久之前感触颇深的一段对话：
+
+　　**\-「为什么我周围的人都在抱怨？」**
+
+　　**\-「因为你憧憬的人一直在追逐着梦中的星星，无暇坐下叹息。」**
+
+<br />
+
+　　我希望能将自己复燃的傲慢火苗压下去，仍然谦卑。
+
+　　中途本想将《随记》随意作一个好听的名字以文章形式发出去，想想便又作罢了。结构尚未过多关注，修辞更无考量，思想和内容表达又过多理不清楚。文章之名委实过誉，便仍作为《随记》。
+
+　　**若这闲碎之笔，能让某人颇有感触，传达到心里，目的便也达成了。**
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 4 月 1 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-父亲考驾照-md-2446396298"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-父亲考驾照.md

<details>
<summary><code>+39 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\210\266\344\272\262\350\200\203\351\251\276\347\205\247.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\210\266\344\272\262\350\200\203\351\251\276\347\205\247.md"
new file mode 100644
index 000000000..0af64239d
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\210\266\344\272\262\350\200\203\351\251\276\347\205\247.md"
@@ -0,0 +1,39 @@
+# 随记 - 父亲考驾照
+
+　　早上十点，被吵醒了。是父亲的电话。
+
+　　“科二我考过了！”
+
+　　听到父亲在电话那头的兴奋呐喊，还没转起来的脑袋懵了一下。
+
+　　诶？
+
+　　“啥时候考过的啊？”
+
+　　“就刚才，说签完字就可以走了。”
+
+　　“这样啊。不过听说科三好像挺难的样子诶。我好多同学都挂在科三上面了，比如没系安全带什么的。”
+
+　　“还要学嘛，科三细节考得多，应该不是很难。”
+
+　　听着父亲在那头的叨叨絮语，我还没回过神来。
+
+　　父亲问我在哪里，我说床上，他应了一声，然后就招呼挂了。
+
+　　直到挂电话，他都只说了这一件事。也没问其他什么。
+
+　　罕见。
+
+　　后知后觉。
+
+<br />
+
+　　父亲四十多岁，快五十了。仍在面向未来。
+
+　　而我，又在焦虑什么呢？
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 6 月 11 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-理发师的三年-md-1013657575"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-理发师的三年.md

<details>
<summary><code>+89 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\220\206\345\217\221\345\270\210\347\232\204\344\270\211\345\271\264.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\220\206\345\217\221\345\270\210\347\232\204\344\270\211\345\271\264.md"
new file mode 100644
index 000000000..a0f4a8756
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\220\206\345\217\221\345\270\210\347\232\204\344\270\211\345\271\264.md"
@@ -0,0 +1,89 @@
+# 随记 - 理发师的三年
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/barber-shop-5212059_1920.jpg)
+
+> 摄影师 | mostafa_meraji
+>
+> 图源 | Pixabay
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">855 字 | 心绪强烈</p>
+
+## 正文
+
+　　“那时候，我的梦想就是，到我 30 岁的时候，能够想躺平就躺平。”
+
+　　我从镜子里看着他的脸。没有表情，不知道在想些什么。
+
+<br />
+
+　　前两天理发。老板比较熟，恰巧店里也只有他和我两个人，于是闲聊起来。
+
+　　无非是些放假没有，回不回家之类的话题。顺藤摸瓜，聊到了工作。
+
+　　我说，技术更新迭代太快，搞得人很累，不如理发，一门手艺用一辈子，有些想躺平了。
+
+　　一边看着他用食指和中指并拢头发，一边听他说。
+
+　　“我也想躺平，可是这上有老下有小的，怎么躺啊，躺不得……老的 70 岁，小的 5 岁，都是花钱的时候。”
+
+　　“5 岁啊……那确实挺花钱的。”
+
+　　“原来我 27 岁的时候，开了 5 家分店。”
+
+　　我看向他的脸。他的手上正在并拢我的下一束头发。
+
+　　“那时候，我的梦想就是，到我 30 岁的时候，能够想躺平就躺平。”
+
+　　我从镜子里看着他的脸。没有表情，不知道在想些什么。
+
+　　“五家啊，那已经很厉害了啊……”
+
+　　“那时候确实，不过后来……”他顿了一下，有那么一两秒钟的沉默，接着说，“后来不是失败了吗。”
+
+　　**说完他轻轻地笑了一声。**
+
+　　一缕剪下来的发丝刚好飘到睫毛上，散了我的视线。没能看清他的表情。
+
+　　“也确实躺平了。那年之后，在家躺了三年。到 30 岁才把心态调整好，重新开业。”
+
+　　我沉默了许久，不知怎么接这话头。
+
+　　“调整过来了就是好事。心态炸了那就真的完了。”最后，我说。
+
+　　“不然你也就看不到我了啊。”
+
+　　**他又笑了。笑里语气与上次截然不同。**
+
+　　“来，再给你洗一下。”
+
+　　“行。不过这天真热啊，亏你还能在店里待这么久。”
+
+　　“这不是有空调吗。一个月电费都跑好几百。”
+
+<br />
+
+　　这是我认识的普通人。
+
+　　以前聊天就知道他故事很多。16 岁踏入社会工作。干过服务员，做过旅行社，也北漂过，最终才学了门理发的手艺。
+
+　　直到今天，他才无意向我透露他曾经的辉煌。
+
+　　我在手机里敲下这些字。也不知道自己在想些什么。
+
+　　三年。
+
+　　以我现在的节奏，三年能做很多事情了。躺三年，与这种节奏持续三年，差距大概会非常大。
+
+　　但我在想，在精神与心态上的差距，会不会比这更大？
+
+　　是时候，重新读一读[那首诗](https://mp.weixin.qq.com/s?__biz=Mzg5NTcwNjA4Nw==&mid=2247483830&idx=1&sn=02de41e69d4301717ba7784fa346b73f&chksm=c00d773ef77afe28c84b6e864e3b900f0cbccf0b0740813d3c4724d7ca2f1ea37b153f16428a&scene=21#wechat_redirect)了。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 7 月 7 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-生日与回礼-md-4121230354"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-生日与回礼.md

<details>
<summary><code>+37 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\224\237\346\227\245\344\270\216\345\233\236\347\244\274.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\224\237\346\227\245\344\270\216\345\233\236\347\244\274.md"
new file mode 100644
index 000000000..5f29cb08e
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\224\237\346\227\245\344\270\216\345\233\236\347\244\274.md"
@@ -0,0 +1,37 @@
+# 随记 - 生日与回礼
+
+　　读到轻小说里，互送生日礼物一段情节，忽然想起一件事情。
+
+　　那是在五一去玩不久之后的事情。
+
+<br />
+
+　　我和学妹的生日紧挨着，隔了没有几天。
+
+　　我原意打算为学妹庆生，毕竟陪了我也算有一段时间，然而她好像比较现充，那天的时间安排满满当当，全是她一些朋友为她庆祝。我根本安插不上。
+
+　　我提出了很多方案，都被她一一否决了，总感觉有点寂寞。后来她说不聊她的了，说为我庆生。
+
+　　我当时是不大愿意的，因为我觉得没有付出点什么，或者没有给别人带去什么，就收下别人的好，不大愿意接受，也颇不像自己的风格。然而她执意这样做，我也没什么办法，便叫她生日那天陪我打篮球就行。
+
+　　讨论结束后，我没有多顾虑，很坦言地对她说，我觉得我亏了。她问为什么，我的回答大概就如上面所说的那个样子。
+
+　　然后她说了一些，我从未这样考虑过的话。
+
+<br />
+
+　　「在别人送礼物的时候，不要急切的想着回礼。这种急切在别人眼里其实有点不礼貌的感觉。像是一个交易，会让别人觉得不舒服。其实自然一点就好。」
+
+<br />
+
+　　大概就上面那个样子。
+
+　　以前的我从未考虑过这些。
+
+　　在很坚定地执行自己的原则时，往往很容易忽略掉别人的感受。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 5 月 18 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-生活回来了-md-4294559662"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-生活回来了.md

<details>
<summary><code>+73 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\224\237\346\264\273\345\233\236\346\235\245\344\272\206.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\224\237\346\264\273\345\233\236\346\235\245\344\272\206.md"
new file mode 100644
index 000000000..c4ee469a9
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\224\237\346\264\273\345\233\236\346\235\245\344\272\206.md"
@@ -0,0 +1,73 @@
+# 随记 - 生活回来了
+
+　　今天开学第一天。人很多。
+
+　　看见忙忙碌碌的人群，忽然一种很有一种生活的感觉。
+
+　　中午去食堂吃饭的时候，看见了一个女孩子，正襟危坐，低着头。一张桌子四个座位，其他三个看起来是她的大人的样子。
+
+　　我想起来我也有过这样的不堪。
+
+　　算是不堪吗？说不太清呢。不过看那个女生一副泫然欲泣的样子，大概算是吧。
+
+　　不去看她应该算是尊重吧，于是扭头走掉了。
+
+　　换了被单，去洗了洗，然后去操场跑步。然而我发现，湛蓝的天空有什么不一样。
+
+　　有人在放风筝。
+
+　　原来也放过这个东西来着，当时不是很懂这个的窍门，许多次都没飞起来，就坐在地上气馁。第一次看它在天空消失成一个点的时候，心里很开心。各种各样的回忆便浮现了出来。
+
+　　明明上气不接下气，还是掏出手机拍了一张。或许以后就看不见了。
+
+　　很怀念。
+
+　　回宿舍的路上，有人用蛇皮袋在地上拖着什么，看起来应该是书，很重的样子，袋子都被拖裂开了。
+
+　　那个男孩子好像也一筹莫展的样子。
+
+　　“ 需要帮忙吗？”
+
+　　说起来可能有点不现实，但当我意识到自己在做什么的时候，手就兀自拿起了袋子的尾端了。
+
+　　很重。
+
+　　他好像回答了我，应该是不好意思所以拒绝了，但我当时戴着一只耳机，没听清。而且我已经上手了，他好像也默许了。
+
+　　这些是我后来回想才猜测到的。
+
+　　搬到目的地后说了句「没关系」之后就离开了。当时觉得没什么。
+
+　　耳朵里的音乐很适合跳舞。身体情不自禁动了起来。
+
+　　然而没想到，那个男生和他朋友追了上来，似乎也回宿舍的样子。他故意慢了半步，从朋友身边脱离开。
+
+　　“ 你是什么专业的呢？”
+
+　　“ 计算机的。”
+
+　　“ 这样啊。刚才谢谢你。”
+
+　　第二次道谢了。
+
+　　“ 没什么。”
+
+　　问的过程中，他似乎上下打量着我的样子，最后回到了我的眼睛上。
+
+　　天知道我当时多羞耻。被逮到了现行，还是这么一副不堪的样子。
+
+　　耿耿于怀回到宿舍，拉开门，碰上正要接水的昆，愣了一下。他也愣了一下。
+
+　　“ 废物回来了？”
+
+　　“ 嗯。废物你怎么这时候才来？……”
+
+　　一切都是日常的光景。
+
+　　那个生活。回来了。
+
+<br />
+
+　　南国微雪
+
+　　2021 年 3 月 5 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-白盒黑盒-md-3853871566"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-白盒黑盒.md

<details>
<summary><code>+173 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\231\275\347\233\222\351\273\221\347\233\222.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\231\275\347\233\222\351\273\221\347\233\222.md"
new file mode 100644
index 000000000..392bed7f0
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\231\275\347\233\222\351\273\221\347\233\222.md"
@@ -0,0 +1,173 @@
+# 随记 - 白盒黑盒
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/yande%20214880%20niwa%20wallpaper.jpg)
+
+> 画师 | 佚名
+>
+> 图源 | 未知
+
+# 写在前面
+
+　　这是日记。虽然不再发布日记，但里面有很多我想聊的话题，便以随记形式对外发布，而非日记这种私人形式。也好不再写些让人厌倦的重复文字。
+
+## 正文
+
+　　今天的日记可能会聊到很多东西。发生了许多，也因想了许多。
+
+　　今天下午无意中刷到了工作室里一个朋友的女朋友，发了如下说说：“爱你的时候你在猜测试探他怎么才会不爱你，他终于因为你为什么怀疑他的爱而生气时，你又觉得他对你没有了耐心不爱你了，不过还好，他每次都会告诉你，他还爱你。”然后 at 了那个朋友。
+
+　　我不清楚这个女孩子有没有将其当成一种人际夸耀的资本，不过在我看来，别说能炫耀，后面大概自身都难保，是一种十分危险的行为。
+
+　　为了爱情，是否应该舍弃友情？
+
+　　像是两个人之间对抗，我必须胜你一着，为此我必须扩大地盘，一步步进犯你的空间，猜忌你的想法。
+
+　　换言之，两个人之间的内耗。
+
+　　内耗终会蚕食至虚无。
+
+　　我虽很想提醒这两人，但依旧选择了默不作声。
+
+　　懿曾警告我不要对别人的恋情进行劝告，即使出于善心。
+
+　　有道理吗？肯定的，但我只能苦笑。
+
+　　笑人盲目，也笑自己傻，笑自己以为所有人都会倾听别人的建议。
+
+　　原来我也开玩笑说，自己现在挺自由，想做什么都可以，不必像运那样临时要去火车站接他女朋友。
+
+　　然后当时他就睨了我一眼：“说什么呢？你这单身狗，就可劲儿酸吧。”语气还挺认真。
+
+　　我当时感到了巨大的傲慢，像被看成下等人了似的。 **我不理解。**
+
+　　这个语气和态度很有他平时的作风。原来和工作室几个人聊起他，都认为他嚣张又傲慢。
+
+　　我一时语塞，敷衍过去。
+
+　　**这两件印象极深的事让我从此变得冷漠，只在一旁静静旁观。** 尤其对于他人的恋爱之事。
+
+　　自讨无趣我想谁都不愿意。
+
+　　不过如珂那样谦卑地前来商讨建议，我仍然乐意。只是，我再不会去主动修补别人的关系了。
+
+　　下午没吃够，多买了一个蓝莓面包。喜欢蓝莓，但这个面包不好吃。
+
+　　预科作业是遂了昨天的愿，开始继续了。总之，先降低期待一直做下去吧。
+
+　　考研自习室要开始打卡了，希望不是早八吧。
+
+　　晚上吃完饭去上面包的基础课（该说是基础课还是大师课呢，笑），上完去操场跑了两公里，差点岔气到要瘫在操场上。
+
+<br />
+
+　　提早到了地点。雪利说她也要来。因为看书看入神，忘了时间。我出去时她已经到了，正倚着栏杆玩手机。
+
+　　吓了一下。恶趣味地看她被吓得浑身一抖，还觉得挺可爱。
+
+　　她说才吃过饭不久，还吃得很撑，我就觉得不太妙。然后面包带着几个生面孔进来，这个前几天脖子扭了的社恐患者，直接就一直在一边玩手机了。似乎所有坏情况凑一堆了（笑。
+
+　　当用到脖子的时候，我看向了她，她拼命给我做着噤声的手势，差点没让我笑出声来。
+
+　　课程结束时，她走得很快，一个人，我不大放心，就追了出去。不过此举似乎让很多人误会了。我有些无奈，但这种事越描越黑我也不知道怎么说。
+
+　　追到一半，我突然想起她应该是骑车过来的，便摇头笑自己笨。
+
+　　追上她时她正好出楼，我的猜想是对的。
+
+　　或许是太热了，又没人，便半脱着衣服，露出里面的背心。
+
+　　那个时候的她很有女性魅力。
+
+　　但我没这么说。我不知道有没有人对她说过这种话，但涉及这种话题我总是很谨慎。以自己的情商，想必稍有不慎便会产生重大失误。遂选择沉默。
+
+　　自己夸人一般是想让人开心，不过这种类型的夸奖似乎忧虑的占比会更大一些。
+
+　　她骑车，我也打算骑共享单车的来着，路上也好聊上一些。然而，“快上来，别耽误我时间！”我：……
+
+　　**我不知道关心过多会不会给她造成压力，像是在背负着什么** ，若有我希望说出来才好。我想这其中可能更多的是自己的问题。
+
+　　许是因为自己常常难过，想要寻人倾诉，便相较于男性选择了女性，因普遍来讲其表达性更高。造成自己关注女性远多于男性。毕竟自己难过时，寻一个男性好友倾诉，常常会弄得对方也不知道怎么办。要对方陪自己逛操场便更显奇怪了。
+
+　　我时常觉得自己不太适合男性群体，虽说有些冒犯，但我觉得珍更加合适。喜欢穿白色，就是因为想要自己变得纯洁、干净、外向和阳光，不会想得太多。
+
+　　这些特质在她身上似乎都有。所以自己在向她明确表示好意时，说到了这一点。但仍模棱两可，因为自己也不知道。我至今不知道对她的好感出于什么。
+
+　　我也不知道自己能把每一个认识的女孩子处成闺蜜或是兄弟一样的东西，这个被动技能是从哪儿来的，又是从什么时候开始的（笑哭。
+
+　　路上我们曾有过这样一段对话：
+
+　　“我能冒昧问你个问题吗？”
+
+　　“彝族歌。”
+
+　　“你都会读心了吗？……”
+
+　　她放的歌语言听起来很陌生，我想问来着，不过这不是重点。
+
+　　“那不然呢？”
+
+　　“你怎么知道的？”
+
+　　“不就是因为你说的东西我不知道，我说的东西你不知道吗。”
+
+　　说完还笑了两声。
+
+　　我也笑，不过蓦地觉得有些悲凉与沧桑。
+
+　　她很在意这个，我想我只会比她更在意。
+
+　　这大概就是为什么，我和她都默契地停留在了朋友这一步，不约而同，毫不作声。不再向对方的领地踏出一步。
+
+　　我不清楚她的态度，但我有这样一种鲜明的感受。
+
+　　**我们穷其一生都在追求美好的，让人惬意的东西。** 我认为我和她之间的距离，像今天这样就已经足够美好。
+
+　　**为什么他们误会，我很困扰，原因大抵如此。**
+
+　　柚子原来说我，像我这样单纯的男生，要是遇上一个强势一点的女孩子，绝对会被吃得精光。被数落了好多次。
+
+　　单纯吗？ **我从不这样觉得。** 但从头到尾只一个人向对方表明心迹，透明如孩子一般，似乎确实没多少人干这种事。
+
+　　我对她而言就像白盒，尽所皆知，她对我来讲如同黑盒，一无所知。
+
+　　我不知道未来的你翻到这页日记会不会耻笑，或是自己对这种模式已经感到倦怠。但现在，姑且让我这样做下去吧，在我尚有余力且没有疲惫的时候。
+
+　　最后记一个细节。
+
+　　灵曾让我看一本漫画，名为《回答不了》，基本全忘掉了，但有两个地方记得很清楚。
+
+　　一是女主说，她每次洗澡出来时都注意到拖鞋被摆正了，鞋口朝向她，方便她穿；
+
+　　二是男主说，他有次洗澡，注意到沐浴露瓶里掺了水，是他夫人干的。他说他小时候，母亲在家里比较穷时才这么做，能多用几次。他注意到时就想着：自己，该努力了。
+
+　　晚上她骑车，偏过头问我。
+
+　　“今晚还去跑步吗？”
+
+　　“应该会去。”
+
+　　“行，那我待会儿去偶遇你。”
+
+　　我一边吐嘈说：“这也算偶遇啊……”，一边听她说她待会儿要换成黑衣服去跑，这样那样的琐事。
+
+　　“那我待会儿看到你的时候，岂不是只能看见一个头和一双鞋？”我开玩笑说。
+
+　　她听见也笑了几声，反问我。我也只笑了几下，不回答。
+
+　　**最后，当我在操场上“偶遇”她时——**
+
+　　**她确乎真真切切地，穿着白色衣服。**6
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 3 月 19 日
+
+## 写在后面
+
+>　　“‘不论我做什么都要爱我’。有些人生活一团糟，或者有意无意惹上麻烦，就是想看看别人能宽容他们到什么程度，什么时候会排斥他们。接着他们就会说：‘我早说过你会这样对我，证明我是真的很差劲很愚蠢。’ “在我看来这些游戏很危险，因为如果你尊重或你爱的人放弃你，你肯定会觉得痛苦，孤零零一个人。” …… “我们本可以有更多快乐的事情去做，而我偏偏要把时间消耗在那些无意义的‘确认’上。”
+>
+>　　——公众号：微雪寻觅，TinySnow，《为了爱情，是否应该放弃友情？》
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-碰拳之约-md-2002422807"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-碰拳之约.md

<details>
<summary><code>+105 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\242\260\346\213\263\344\271\213\347\272\246.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\242\260\346\213\263\344\271\213\347\272\246.md"
new file mode 100644
index 000000000..9afb72c99
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\242\260\346\213\263\344\271\213\347\272\246.md"
@@ -0,0 +1,105 @@
+# 随记 - 碰拳之约
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">881 字 | 舞蹈 | 孩子 | 感触 | 生活 | 城市化 | 热爱</p>
+
+## 正文
+
+　　今晚依旧去广场跳舞。招了一群孩子和大人围观。
+
+　　有个孩子很认真。跟着学的就三个人，他是最认真的一个。其他两个孩子，很容易走神，或者被同伴打扰。
+
+　　他似乎是一个人。
+
+　　那个孩子把握要点也很准，似乎知道怎样跳舞一样。我夸了夸他，他说，他学过。
+
+　　此话一出，另外一群孩子要求他表演。像是不服气一般。
+
+　　夜色深沉。
+
+　　“你们别欺负他呀！”我有些生气，赶跑了那些孩子。
+
+　　他大概八九岁的样子，上小学。
+
+　　我蹲下来，视线低于他，一边望着他，一边问：“喜欢吗？”
+
+　　“喜欢。”他说。
+
+　　“我觉得你真的很厉害，”我看着他的眼睛，“我到这里来这么久，没看到过一个跳街舞的，你是第一个。”
+
+　　他看着我，没说话。
+
+　　我继续教，他们继续学。
+
+<br />
+
+　　广场的灯，一盏接一盏地灭掉。
+
+　　“那我回去了啊，”我向所有的孩子们挥手，“拜拜！”
+
+　　我快走到转弯处时，听到后面一个稚嫩的声音。
+
+　　“等一下！”
+
+　　我回头看，是他。
+
+　　“叔叔你在哪儿住呀？”他望着我。
+
+　　我当时被他气笑了：“叫哥哥！”
+
+　　他挠了挠头。
+
+　　“我在前面的银行上班，”我想了想，继续说，“要想学的话，可以随时给我打电话。”
+
+　　我把唯一的一张传单给他看。
+
+　　“记得住电话吗？”这回该我挠头了。
+
+　　他摇摇头。
+
+　　我想了想，把这张单子给他了，回头我再打印就好了。同时叮嘱他，要是他父母不放心我，可以让他们陪着一起来看。
+
+<br />
+
+　　接着，他说了今晚最让我印象深刻的一句话。
+
+　　“我原来的老师不教我了。”他说。
+
+　　我愣住了。
+
+　　“为什么呢？”
+
+　　“他去成都了。”他说。
+
+　　我那一瞬间真的好难过。我没办法诉说那种难过。
+
+　　职业舞者，留在小城市里没有前途。抛下这些喜欢跳舞的孩子们，只给他们留下了一段学舞的记忆。
+
+　　我犹豫了一下：“我还是那句话，想学，随时来找我。我一定教。”
+
+　　这是我能做出的最大承诺了。“两年之后我就要回市里了”，对于他，这句话我说不出口。
+
+　　“你的成就一定比我高，你还小，还有很多时间可以跳舞。”我补充了一句。
+
+　　他就这样看着我。
+
+　　“不早了，回家吧。”我说。
+
+　　我伸出手，握成一个拳头。他下意识地跟着学了起来。
+
+　　然后，我们用拳头，轻轻地碰了一下——像《海贼王》里路飞和他的伙伴们那样。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 9 月 15 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/One%20Piece%20Gif.jpg)
+
+> 画师 | 佚名
+> 
+> 图源 | Google
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-祭桥-md-1438472202"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-祭桥.md

<details>
<summary><code>+29 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\245\255\346\241\245.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\245\255\346\241\245.md"
new file mode 100644
index 000000000..2c4e2500d
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\245\255\346\241\245.md"
@@ -0,0 +1,29 @@
+# 随记 - 祭桥
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/modestas-urbonas-vj_9l20fzj0-unsplash.jpg)
+
+> 摄影师 | Modestas Urbonas
+>
+> 图源 | Unsplash
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">369 字 | 生活 | 人间百态</p>
+
+## 正文
+
+　　听大人在席上聊天。
+
+　　说最近有头野猪，闯到人家里去，把两个老人咬了。最后没办法，林业局出钱把人送医院去治好。两个老人住了一个多月院。
+
+　　还有某个县，有一架大桥。竣工之后没有祭桥，每年都有人跳河。
+
+　　今年有两个。
+
+　　一个女孩儿，高考没考出理想成绩，家人想让她复读。但是她不肯，觉得压力太大。两方一直协调不下来，女孩儿跳了。
+
+　　一个男孩儿，女朋友谈了好几年了。丈人家里一直要十万彩礼，再怎么说不松口。男孩儿家里实在拿不出来。最后跑了，跑出去找了份工作。从部队回来，跟女朋友说，实在拿不出来，不行就分手。丈人家里松口了只要五万。翌日，男孩一家去接亲，然后丈人家里中途变卦，说一定要十万，不给不出门。
+
+　　男孩儿母亲后来说，当时男孩儿就说了一句话：“妈，我出去一下。”当时母亲还在头疼这事儿，就没管。男孩儿就跳了。
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-窗外的爵士舞-md-1253142257"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-窗外的爵士舞.md

<details>
<summary><code>+46 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\252\227\345\244\226\347\232\204\347\210\265\345\243\253\350\210\236.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\252\227\345\244\226\347\232\204\347\210\265\345\243\253\350\210\236.md"
new file mode 100644
index 000000000..2ada214c6
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\252\227\345\244\226\347\232\204\347\210\265\345\243\253\350\210\236.md"
@@ -0,0 +1,46 @@
+# 随记 - 窗外的爵士舞
+
+　　早上看哲学书，看得大受震撼。
+
+　　一本书，从昨天快午夜开始看，今早看完，除了睡觉基本没停过。感觉有毒。
+
+　　手机壳到了，装上之后感觉大不一样，就感觉不是自己的手机了一样。不管是手感还是外形，都有很大的变化，有种熟悉又陌生的感觉。
+
+　　洗个头匆匆往舞蹈室赶，路上看到远方山和天的交界处色调很阴翳，像是要下雨的样子。但是丝毫影响不了我在路上听着歌愉快跳舞的心情♪
+
+　　路上看到有一个妈妈，带着女儿在外面不大的地方打羽毛球，甚至围裙都没有来得及脱下来但脸上仍然还是笑着。就忽然感觉，这种生活应该很幸福吧，忙里偷闲的日子。
+
+　　到了舞蹈室，没想到里面正在上课。
+
+　　常去的那间里面在教 jazz，清一色的女孩子。
+
+　　另一间在教 breaking，清一色的男孩子。
+
+　　看得人有点想笑。不过这种现象也是正常的吧。
+
+　　在玻璃窗外，看基本不足自己半人高的小女孩们跳 jazz 真是一种神奇的体验。授课老师是一个大姐姐，拿着个白色衣架，站在高脚凳上，看起来很凶的样子。
+
+　　我不知道有多少孩子是被逼着来这里学舞的，希望越少越好，舞蹈这个东西本不应该是这个样子。
+
+　　现在的孩子们资源和营养都越来越好了，但是压力也越来越大了。希望这只是我的臆测才好。
+
+　　玻璃窗外是她们的爸爸妈妈们，有的在看着她们，更多的则是百无聊赖地看着手机。
+
+　　属于女孩子们的那间舞蹈室外面坐了一大批家长，而属于男孩子们的那间却基本无人问津。
+
+　　我想，从这上面大概可以看出一点缩影吧。
+
+　　我倚在不远的墙上，看小女孩们通排今天的课程内容，面向的不是镜子，而是玻璃屋外他们的家长。对于这个老师的这个行为我觉得很奇怪，不过或许是让她们不要依赖镜子吧。老师说，要她们表演给外边的家长们看，当时不远处就是我。有个小女孩疑惑地望了我一眼，笑了一下。我也笑了一下，拍拍手鼓掌，竖了个大拇指回去。她似乎不好意思地转过头去。
+
+　　我看完了。只能说，有自信的人，光芒最耀眼。
+
+　　我看向外边，天依旧阴着，但是好像没有要下雨的迹象。
+
+　　快要开始上课了。
+
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 10 月 24 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-第一次吃蛋挞-md-720831749"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-第一次吃蛋挞.md

<details>
<summary><code>+79 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\254\254\344\270\200\346\254\241\345\220\203\350\233\213\346\214\236.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\254\254\344\270\200\346\254\241\345\220\203\350\233\213\346\214\236.md"
new file mode 100644
index 000000000..b415c7081
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\254\254\344\270\200\346\254\241\345\220\203\350\233\213\346\214\236.md"
@@ -0,0 +1,79 @@
+# 随记 - 第一次吃蛋挞
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">444 字 | 生活 | 经历 | 感触</p>
+
+## 正文
+
+　　或许因为压力大，亦或者简单的糖分不足，今晚好想吃面包和蛋糕。
+
+　　蛋糕吃不完也买不起，面包还是可以。
+
+　　实在饿，出门了。
+
+　　导航两家西点店，关门。怏怏地找另一家。
+
+　　在十点前，找到了。怡朵。还在营业。
+
+　　登门，看到货架基本都空了，于是在余下的品种里挑。
+
+　　“请问您需要什么吗？”
+
+　　“今天想吃面包，好不容易找了两家店都关门了。”
+
+　　店员愣了一下。
+
+　　“请问您需要什么吗？”
+
+　　我看了店员一眼，便不再说话。安安静静挑。
+
+　　挑了一个肉松面包和一个蛋挞。
+
+　　结账，走人，十五块。
+
+　　虽然还想买香芋口味的泡芙，但是太贵了。依依不舍地走出店门。
+
+　　我前脚刚走，后一秒，店员便关了灯，闭上门。
+
+　　我回头看了一眼，正巧再次和她对上眼。
+
+　　店员迅速关了门。
+
+<br />
+
+　　回家，打开口袋，挽下锡碗，尝一口。
+
+　　有些冷，但好吃。
+
+　　今天还是我第一次吃蛋挞呢。
+
+　　吃着，想起那个店员。
+
+　　她的眼睛里写满了疲惫。
+
+　　两次看向她，两次都是。于是我不再出声叨扰。
+
+　　吃着，看向身上还没脱下的西装。
+
+　　苦笑一声。
+
+<br />
+
+　　生活大概就是这样吧。
+
+　　大家都一样。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2024 年 4 月 12 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-第一次拥抱-md-3820229581"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-第一次拥抱.md

<details>
<summary><code>+97 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\254\254\344\270\200\346\254\241\346\213\245\346\212\261.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\254\254\344\270\200\346\254\241\346\213\245\346\212\261.md"
new file mode 100644
index 000000000..64a45c83c
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\254\254\344\270\200\346\254\241\346\213\245\346\212\261.md"
@@ -0,0 +1,97 @@
+# 随记 - 第一次拥抱
+
+　　这是前天晚上发生的事情。
+
+　　那是我与那位小姐的第一次拥抱。
+
+　　我本以为同以往经历的所有拥抱一样，主动权都在我手上。毕竟一直都是这么过来的。
+
+　　我本以为。
+
+<br />
+
+　　我和她在国庆前一天晚上去操场散步，牵着手。回到宿舍区时终于又不可避免地聊起这个假期。她要回家。
+
+　　“那最后抱一个吧。”我说。然后张开手臂等待。
+
+　　“嗯。”她应着，也张开手臂。
+
+　　我们两人拥在一起。
+
+　　她的手轻放在我的背上，我的手也抚着她的背部。手心上还传来她发尾的触感，痒痒的。自诩为话唠的我此刻竟不知道说些什么。
+
+　　相顾无言，沉默片刻。我终于开口。
+
+　　“那，回家好好学习好好玩，明天还要赶车呢。”
+
+　　我打算到此为止，放开她。
+
+　　我本这样打算的。一直以来都是这样。
+
+<br />
+
+　　她似乎察觉到了什么，也或许只是做着自己的应答。
+
+　　“嗯。”
+
+　　她应着，只是小小的一声，还往右挪了挪身位，秀发随之晃动，手臂稍微松了一下但旋即又缠了上来。
+
+　　她将我抱得更紧了一些。
+
+　　我在她的肩颈上，感受到她那声回答的震动，以及——身体间更紧密的接触。
+
+　　我心里一瞬间完全崩掉了。大脑一片空白。
+
+　　自我记事起，是第一次有人对我这样做。
+
+　　似乎所有的心意都不证自明，全晕散在这个不到一秒钟的小动作里。
+
+　　我以为我有着所有的主动权。
+
+　　那位小姐却只一下，就将我这个想法击退到九霄云外。
+
+<br />
+
+　　宕机了片刻，我反应了过来。
+
+　　“那就这样了，回去吧。”我提议。
+
+　　“嗯。”她松开我。
+
+　　虽然很想马上逃开，但我还是目送着她去往宿舍楼深处。
+
+　　没关系，我不上脸。所以不会红。
+
+　　但是心里极度难为情。
+
+　　我逃命似的离开了那里，飞奔回往宿舍。然而状况逐渐不妙起来。
+
+　　越来越难为情。
+
+　　那位小姐都干了些什么啊……真的是……
+
+　　我终于受不了，在自己的宿舍楼一楼楼道转角处蹲了一分钟左右。
+
+　　蹲下来摸自己的脸，微微有些发烫。
+
+<br />
+
+　　我怎么害羞成这个鬼样子。在心里鄙视自己。
+
+　　慢慢踱回宿舍。降温。
+
+　　后来我问她，她却说自己对于害羞完全没有感觉。
+
+　　“那一瞬间真的不想你走……所以对害羞就没有感觉了，只剩下不想离开了。”她在那边送出这几行字。
+
+　　我看后，脸上差点又发起烧来。
+
+<br />
+
+　　这个死丫头。烦死了。
+
+<br />
+
+　　南国微雪
+
+　　写于 2021 年 10 月 2 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-米袋子-md-3991696132"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-米袋子.md

<details>
<summary><code>+51 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\261\263\350\242\213\345\255\220.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\261\263\350\242\213\345\255\220.md"
new file mode 100644
index 000000000..f7d41c125
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\261\263\350\242\213\345\255\220.md"
@@ -0,0 +1,51 @@
+# 随记 - 米袋子
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">486 字 | 生活 | 感触 | 童年 | 细节 | 长大</p>
+
+## 正文
+
+　　今天到了一个快递。衣架。蛇皮口袋装着，但封口很奇怪，像个米袋子。
+
+　　小时候家里买米，我特喜欢拉米袋子封口的绳子。而这一切，只是因为当初看见父亲变了个魔法。
+
+　　父亲剪开左边或右边的线头，然后一拉，整个米口袋便像拉链一样迅速拉开，速度极快，颇有崩塌之势。
+
+　　这令幼时的我大为震撼。
+
+　　自那之后，我每次都希望家里的米快快吃光，能有一个新的米袋子让我折磨。父亲和母亲也不抢，每次买回来都让我拉那个绳子，他们只是在一旁笑盈盈地看着我——看我跟米袋子斗气。
+
+　　因为父亲神神秘秘，也不教我，让我自己去摸索。我前面好几次都失败了。
+
+　　米袋子的封口设计，如果不能一下拉开的话，后续就会特别麻烦，要像穿鞋带一样穿过去穿过来，没有畅快的感觉。
+
+　　失败的滋味当然不好受，所以那时的我还向妈妈提出过一个好笑的请求。
+
+　　“能不能多买一袋米呀？”
+
+　　我想着这些，剪掉左边的线头。
+
+　　一拉，线孔崩裂的声音连续不断地传来，我听着这股声音，看着手里那根长长的线，忽然有些酸楚。
+
+　　我已经不再是当初的那个孩子了。不再为这种事情感到兴奋和好玩了。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 10 月 19 日
+
+## 写在后面
+
+　　米口袋。
+
+![](https://img.tinysnow.cn/blog/articles/essays/%E7%B1%B3%E5%8F%A3%E8%A2%8B.jpeg)
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-素描与集市-md-1069247063"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-素描与集市.md

<details>
<summary><code>+61 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\264\240\346\217\217\344\270\216\351\233\206\345\270\202.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\264\240\346\217\217\344\270\216\351\233\206\345\270\202.md"
new file mode 100644
index 000000000..2df560c52
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\264\240\346\217\217\344\270\216\351\233\206\345\270\202.md"
@@ -0,0 +1,61 @@
+# 随记 - 素描与集市
+
+　　中午，从校外回来。
+
+　　路过一个宣传点。有帐篷。蓝色的。里面坐着一个女孩子。我从她后面路过。
+
+　　她在画画。
+
+　　拿着一本书。我看不懂，但能看出来是个头骨。（或许是伯里曼？）她画得很潦草，但只几笔，型就出来了。
+
+　　我觉得很厉害，就在旁边站着看了大概五六秒的样子，然后觉得不太好，就往旁边靠了靠，希望她能注意到。
+
+　　「那个，同学……你是……有什么问题吗？」
+
+　　「啊，没有，我就是觉得你挺厉害的，就在旁边看了一下。」
+
+　　「啊、这个……我是在赶作业……」
+
+　　「这样啊，我原来一直想画画，但是一直都学不好……」
+
+　　「可以没事儿自己画着玩儿嘛。」
+
+　　娴熟地捏住架子，换上新的素描纸，把旧的放在一边，翻过另一页。
+
+<br />
+
+　　可能在画画上，我还是在找借口吧。不够努力。懒里懒散的。
+
+<br />
+
+　　下午跑步的时候，跑道上很长一段时间只有我和另一个人。一个女生。没戴耳机。
+
+　　我向她表示加油的时候，她脸上的表情似乎很是惊讶。
+
+　　看过很多次这样的表情了。在大学里。
+
+　　让我想起了高三。
+
+<br />
+
+　　晚上出来吃饭。毕业季的烧烤摊很有夜生活的感觉。期间穿梭着一个女孩子，大概是哪位食堂员工的孩子，很小，大概小学生的样子吧。
+
+　　穿着芭蕾舞一样的服装。看起来很漂亮。
+
+　　就觉得，有时候给女生做的衣服，在感官上都漂亮得不讲道理。完胜男性的服饰。
+
+　　面料看起来都很舒服。
+
+　　遇到了罗师兄，似乎是带着他女朋友出来吃饭的样子。他似乎也很新奇。
+
+<br />
+
+　　当自己从人堆里出来，拉远视角。
+
+　　觉得在学校里诞生这么一个夜生活集市，似乎也不错。就是只如昙花一现，芳美艳绝而短其瞬间。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 6 月 7 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-累而不讨好-md-3145549550"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-累而不讨好.md

<details>
<summary><code>+69 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\264\257\350\200\214\344\270\215\350\256\250\345\245\275.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\264\257\350\200\214\344\270\215\350\256\250\345\245\275.md"
new file mode 100644
index 000000000..fbc6eb30d
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\264\257\350\200\214\344\270\215\350\256\250\345\245\275.md"
@@ -0,0 +1,69 @@
+# 随记 - 累而不讨好
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/yang-yu-1LQYUE-ZwIo-unsplash.jpg)
+
+> 摄影师 | Yang Yu
+>
+> 图源 | Unsplash
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">1058 字 | 感触 | 过往</p>
+
+## 正文
+
+　　前些天晚上。
+
+　　我们依旧老地方练舞，但这次好像多了些人。并非我们的人，而是动漫社的人。应该是排练什么节目，最后一次合拍彩排。
+
+　　<u>清一色的女孩子，穿得漂漂亮亮。大部分洛丽塔，小部分汉服，零星几个 JK。服装齐全。</u> 看不清相貌如何，据最近的看，似乎化了妆。
+
+　　场面蔚为大观。
+
+　　我看不清那些人， <u>但不用看也知道，现在场上的这群女孩子，很容易勾人恻隐之心。</u>
+
+　　这恻隐之心，无关性别。而今天的话题，也无关男女。
+
+　　早些年，我也是浪迹于动漫之中的二次元爱好者。标志性特征，就是羡慕那 16:9 荧屏中的美好，觉得现实丑恶不堪，泥泞又肮脏。
+
+　　彼时我羡艳里面的友情、爱情、救赎和勇气等等，同时无比渴望——有一个人来拯救我于这水深火热之中。 <u>而且那人，最好是异性，容貌姣好，亭亭玉立且落落大方。</u>
+
+　　不要笑。我觉得这可能是很多人刚进入动漫世界里的常态。
+
+　　那时候，我是他们一群人中的一员——站在那群打扮艳丽的女孩子旁，远远地观望着她们的那群人。
+
+　　更遥远的时候，我也曾面目狰狞地憎恶过为什么我不是她们，只是看上去便让人心情愉悦。但此处无关主题，封笔不谈。
+
+　　我现在认为，那时候的我，受动漫拯救，也为它所荼毒。
+
+　　**可能荼毒多一点。**
+
+　　不知何时起，年少的我意识到，这样绝无可能等到梦中之人。或有意或无意，渐渐地疏远了这个领域。而最重要的一个变化，便是开始了舞蹈。这大概是影响一生的决定，却润物无声。
+
+　　年少的我，曾观望着形容绮丽的她们，无比钦慕；也观望着挥汗如雨，练习舞蹈的他们，理解不能。那时是真真正正地不能感悟到——他们，究竟是为了什么，累，并且不能讨好更多的人。 **那时我想，我大概绝不会成为这样的人。**
+
+　　而如今的我，正观望着同样姣容月貌的她们，只有欣赏；却坚定无比地，站在汗如雨下、累而不讨好的这一边。
+
+　　似乎一再成为了当初自己无法想象的样子。
+
+　　这便是这篇文章的来源。
+
+　　**<u>当我意识到这个想法的时候，我似乎隔着接近十年差距的时光隧道，远远地和那个年少的自己，对上了一眼。</u>**
+
+　　街舞和宅舞，没有高下之分，优劣各持。我只是感慨：我似乎，终究选择了走上现实这一条路。也品尝到了，它所带给我的累累硕果。
+
+　　而至于另一个平行世界线，一直坚守着梦中之人的那个我，有没有得到梦寐以求的结果，我不知道。或许吧，但这也无关紧要了。
+
+　　有可能的话，我只是想对这个世界线上、时光隧道那头的自己说一句：等是等不到的，早日拥抱现实，可能你会更开心一点。
+
+　　如今我依旧看那些美好，但也只能勉为其难称为伪宅；也依旧和他们在一起——去玩、去图书馆、去约饭、去表演。
+
+　　<u>我想我现在，更喜欢后面的生活。</u>
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 4 月 4 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-纸箱与痕迹-md-2237151105"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-纸箱与痕迹.md

<details>
<summary><code>+69 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\272\270\347\256\261\344\270\216\347\227\225\350\277\271.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\272\270\347\256\261\344\270\216\347\227\225\350\277\271.md"
new file mode 100644
index 000000000..02ad8cd3b
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\272\270\347\256\261\344\270\216\347\227\225\350\277\271.md"
@@ -0,0 +1,69 @@
+# 随记 - 纸箱与痕迹
+
+　　风扇，在身边吱悠悠地转着。驱散夏天的燥热。
+
+　　回到家已经过了几天了。变化很大。各种意义上。
+
+　　在厨房里习惯性地地洗完手，习惯性地抬起头，习惯性地朝一个地方伸出手准备拿毛巾擦手，然后愣了一下。
+
+　　一个超大的 AUX 奥克斯显示在我面前。机身是黑的，挺厚，上面亮着几个灯：热水，冷水，加热，缺水，检修……
+
+　　一台净水机。不知道什么时候安的。指示灯在上面一直安静亮着，如夜晚一样。
+
+　　家里的风扇，已经有两台了。依旧没有空调。
+
+　　讨人厌的蚊子还是那么多，仍然是那么热。
+
+　　一切都是熟悉的感觉。
+
+<br />
+
+　　问妈妈要了一个超大的纸箱子。我可以钻进去睡觉的那种，像小猫一样。
+
+　　我想在这个纸箱里，放我这20年来，能够具现化的所有记忆。
+
+　　我所有不想遗忘的东西。
+
+　　包括重要的书，淘来的衣服，为数不多的照片，画的画，值得珍藏的礼物。
+
+　　我想留下。
+
+　　听说人的灵魂只有 21 克。我想试试我的记忆能有多重。
+
+　　这个想法最初源于自己的迁挪数据。每次刷机、装系统都要备份一堆，但有时还是不可避免地清掉了所有。
+
+　　是有一个崭新的开始，但总觉得，缺了什么。我不知道已经丢过多少张照片了。后来就想着，干脆把自己不得不留念的所有打包成一个压缩文件。
+
+　　一个包，孑然一身轻。
+
+　　这个理念，到了现在这个纸箱上。能装进去的，价值等同于太阳。
+
+<br />
+
+　　在家已经几天了。没有学习。只聊了许多的天。跟许多人聊。
+
+　　会有那种怀疑自己的时候。到底有没有意义。
+
+　　谁知道呢，就这样下去了。
+
+　　忽然想起了，自己在家用来擦身体的那条毛巾。底色淡黄色，上面有许多灰色的污斑，洗不掉了。以前约莫是用来擦水泥块之类的。
+
+　　我曾凝视了它很久。
+
+　　我自己身上，有多少这样的灰色痕迹？自己，又在别人身上留下了多少？自己摆脱了多少？又无视了多少？
+
+　　越想越迷糊。
+
+<br />
+
+　　现在外面依旧还有蝉鸣。
+
+　　还是很热。热到人完全不想动弹。想把身体泡在冰块里。
+
+　　我不知道明天热不热，我只知道，我的暑假还要继续，我的生活还要继续。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 7 月 14 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-翻跟斗的孩子-md-3879746376"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-翻跟斗的孩子.md

<details>
<summary><code>+39 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\277\273\350\267\237\346\226\227\347\232\204\345\255\251\345\255\220.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\277\273\350\267\237\346\226\227\347\232\204\345\255\251\345\255\220.md"
new file mode 100644
index 000000000..e4458d7bf
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\347\277\273\350\267\237\346\226\227\347\232\204\345\255\251\345\255\220.md"
@@ -0,0 +1,39 @@
+# 随记 - 翻跟斗的孩子
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">290 字 | 消极内容</p>
+
+## 正文
+
+　　我开始有些怀疑我的决定是不是正确的了。
+
+　　今晚有一个大概小学四年级的小男孩，特皮。当时我在照看其他孩子，没注意。他想在一个大孩子面前炫耀翻跟斗。手一软，脑袋磕了。一个大包。哭了。
+
+　　这是我今晚，第一次意识到这个举动的风险。
+
+　　孩子们多多少少会不听话。
+
+　　受伤了家长一定会找到我头上来。尽管完全不是我的责任。
+
+　　加上最近离职的想法，我多少有些于心不忍。我曾经以为，他们是我在这个陌生城市的留恋。现在一想，似乎也没那么重要。
+
+　　大概他们也不缺我这个街舞老师吧。
+
+　　遇到了是惊喜。没遇到才是日常。
+
+　　我已经不知如何是好了。完全不知道该怎么办了。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 11 月 11 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-聊天背景-md-3684079162"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-聊天背景.md

<details>
<summary><code>+105 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\201\212\345\244\251\350\203\214\346\231\257.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\201\212\345\244\251\350\203\214\346\231\257.md"
new file mode 100644
index 000000000..740a77dc1
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\201\212\345\244\251\350\203\214\346\231\257.md"
@@ -0,0 +1,105 @@
+# 随记 - 聊天背景
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/editors-keys-h63fLedowK8-unsplash.jpg)
+
+> 摄影师 | Editors Keys
+>
+> 图源 | Unsplash
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">1167 字 | 心绪强烈</p>
+
+## 正文
+
+　　前阵子和珍聊天，她忽然中途打断我，说：“稍等一下，给你看个聊天背景。”
+
+　　然后她发来一张 QQ 截图，是与我的聊天界面。那背景是我二十一岁生日，被社团一群心狠手辣之人涂得一脸惨状的照片。本来是张合照，她专门截了我的位置，图上还能看到我的剪刀手。
+
+　　“你放过我吧……”
+
+　　“别啊，多好看啊。”
+
+　　“满脸奶油好看啥啊……”
+
+　　“不是啊，真的挺好看的。”
+
+　　“话说这个能给人单独定聊天背景吗？”
+
+　　“能啊，你不知道吗？”
+
+　　“我今天才知道……”
+
+　　“那还挺可惜的，我给熟一点的人设置了。”
+
+　　我忽然愣了一下。
+
+　　第一次从她口中听说这件事。 **冥冥之中忽然有种肯定和确认了的感觉。** 而那天之前，我们有很长一段时间都没有聊天。时间长达几个月。
+
+　　原来友谊，能做到这么长时间不交流，也依然不会消褪这种事情啊。有些庆幸。
+
+　　这种感觉很让人安心。不必担心会有什么保质期这种东西，像酒一样，放着就好了。只要在那里，就很安稳。
+
+　　我很喜欢这种感觉。或许是因为自幼缺乏吧。
+
+　　我最安稳的时光是我谈恋爱的时候。“可以不用回头，背后一定有人在”的感觉，真的，非常，非常让人安心。
+
+　　其次是另一段奇怪的经历。学校邀请我们表演，安排我们住进招待所。晚上集合，所以下午有大把的时间可以闲逛，浪费。
+
+　　那时候一同的朋友很疲惫，于是拉上窗帘，关上门，盖上被子，整个屋子里很黑暗，就像晚上一样，没有丝毫光亮。只能听到空调的嗡嗡声和朋友若有若无的呼吸声。
+
+　　我去给一些重要的网友寄信。正中午，很热，晒得人头晕眼花。<u>回来，踏进房间，一股透心的凉意，和一片全黑的环境，直挠人心。</u>
+
+　　这里是属于你的地方。
+
+　　离那个时间点还很远，就算睡一觉也来得及。不必着急，时间，我们有的是。
+
+　　于是你躺下，任由梦境将你带走。
+
+　　意识朦胧之间，依旧是朋友平缓的呼吸声，和空调的嗡嗡声。
+
+　　**感受到的，尽是安稳。**
+
+　　现在怎样才能产生这种珍贵的感受，我不知道。或许，只能等它自己降临。
+
+　　不过，有一个能无话不说的好朋友就已经是幸事了。有时，他也能让我感到安心。
+
+　　某一天晚上停电，碰巧他手机坏了，我便让他拿我平板玩。于是给他说了密码。
+
+　　“为什么你要设这个密码……”
+
+　　<u>“嗯……”我沉默了一下，“因为那是高中对我最重要的一个女生的九宫格数字缩写。”</u>
+
+　　<u>“哦，”他沉默了一下，开始大笑，“看来你小子情史还不少。”</u>
+
+　　**也不过问。** 我也懒得反驳。
+
+　　“你呢？为啥要取 38324？”
+
+　　“嗯？你忘啦？”
+
+　　“啥啊？”
+
+　　“铜和稀硝酸啊，我永远都记得这个数字。”
+
+　　我笑出了声：“可是这也才五位啊，剩下那一位呢？”
+
+　　“剩下那位随便加的，有时候我自己都忘了哪个是哪位，还要忘记密码手机验证。”
+
+　　“你这不跟没有稀硝酸差不多吗……反正都要手机验证。”
+
+　　“哎呀，再说再说。”
+
+　　我想，目前日渐焦虑的自己，或许，更应该珍惜这为数不多的源头，而不是永无止境地渴求更多。
+
+　　<u>每逢此题，自诩满腹经纶，却起笔撕页。</u>
+
+　　<u>掷笔三叹，再无他言。</u>
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 7 月 24 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-背向太阳-md-3299758511"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-背向太阳.md

<details>
<summary><code>+113 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\203\214\345\220\221\345\244\252\351\230\263.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\203\214\345\220\221\345\244\252\351\230\263.md"
new file mode 100644
index 000000000..052a522eb
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\203\214\345\220\221\345\244\252\351\230\263.md"
@@ -0,0 +1,113 @@
+# 随记 - 背向太阳
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/pexels-anna-romanova-11170073.jpg)
+
+> 摄影师 | Anna Romanova
+>
+> 图源 | Pexels
+
+## 正文
+
+　　这则随记前两天就应该出来的，过于忙碌而一直没有静心写下来。
+
+　　终于能坐在电脑面前，把前两天那些让人思绪万千的事情化为文字。
+
+<br />
+
+　　约莫三天以前，去食堂吃午饭，有一个乐手联盟的表演。约是正午，人挺多，围成一圈，看着里面各个乐手蓄势待发。
+
+　　我其实挺喜欢音乐，原曾也想学点乐器，究竟作罢。所以对于这些能在音乐之路上坚持下去的人，一直满怀敬意。
+
+　　我没有成为那些围成圈看着他们的人。我还有事情要去做。
+
+　　伴着那些乐手敲击拨弦的练习声，我背向他们，也背向太阳，朝着目的地进发。我以为这个情景会融进我的日常生活，最终随万千琐碎细枝末节消失在记忆长河中。
+
+　　直到我听见一声呐喊。
+
+　　“1，2，3！”
+
+　　不知是不是主唱喊出的预备声。
+
+　　我至今仍然不知道怎么形容那声呐喊。有力，却不过于铿锵，像是满怀着所有的信念往前走，指挥着所有的人，打一场背水之战。
+
+　　一个胸怀自信的指挥官，确实能非常振奋人心。
+
+　　呐喊之前，悠哉游哉，嬉笑怒骂。
+
+　　呐喊之后，势如破竹，万箭齐发。
+
+　　前后落差如此巨大，让人不禁心神一晃，空空地怔那么一瞬间。
+
+　　我忍不住回过头，只能看见外面水泄不通的人群，除此之外，还有头顶那明晃晃的、炽橙热烈的太阳。
+
+　　我忽然明白了什么。
+
+<br />
+
+　　下一幕，是因为一些事情去校外，路上所见。
+
+　　过马路，在斑马线一旁，看见一个中年男性，约莫三四十岁，手里抱着一捧花，笑得灿烂。捧花很大，湖绿色沙漏状上大下小的包装纸，约占了那个男人一整个胸腔，外加一个脖子。巨大如此，让我忍不住好奇这束花将要送抵的人。
+
+　　那个人，想必对这个男性而言，无比重要。
+
+　　我想起自己身后那些，支撑和注视着我一步步往前走的，重要的人们。
+
+　　我忽然笑了。
+
+　　我对花没有什么太大的执念与爱好，甚至连许多花儿都认不出来，但是却很喜欢花语这种东西。我觉得花语，一旦被用到，就代表送花之人最为纯洁与美好的愿景。花之于花语，我一直认为，就是现象之于本质。
+
+　　<u>当你一旦知道了，送花之人将他/她所有的思念都寄托在花语上，从万千之中挑选了这种最能代表心境的花。当你一旦领会了，他/她送花背后实际想表达的思绪，我想，没有人能无视。</u>
+
+　　而这一切，都发生在静默之中。只通过一束花，就将两人的心思连接起来。
+
+　　我很喜欢这种“心有灵犀一点通”的形式。
+
+　　**红玫瑰，真心而热烈的爱；**
+
+　　**黄玫瑰，为爱道歉，祈求重要之人的原谅；**
+
+　　**狗尾草，天真遇上单纯；**
+
+　　**蒲公英，开朗并随风而动，表述着那停不了的、永不止息的爱；**
+
+　　**雏菊，幸福而和平，因为黄色靠近暖极，又会给人以热烈和愉快的感觉，给人以希望；**
+
+　　……
+
+　　我曾记得高考完的头一两天，我发疯似的抄下了七八页的花语。因为我相信以后肯定能够用到，而且我也很喜欢。
+
+　　虽说直到最后我都只记下了一些，简单又常见的花儿们背后的含义（笑。
+
+　　所幸，我没有感觉错。
+
+　　在那形形色色的花语中，印象尤为深的花语，属于黑玫瑰。
+
+　　她背后的含义，让我初次看见时，心神为之一颤。
+
+　　**「你是恶魔，且为我所有。」**
+
+　　那时我忍不住在想：如果一个男孩子，怀着这种心意，送了他深念的女孩子这样一种花。女孩子觉得奇怪又好奇，查了它的花语，会不会脸上发烫，以至于需要扑到床上躲起来？
+
+　　想着这些乱七八糟的东西，目送着那个男性骑着车远去。
+
+　　当即脑海里出现了这样一种想法：今天，这个城市里，大约会多出两个开心的人吧。
+
+<br />
+
+　　当办完事情，回头看了一下街景，发现自己随着高德地图，绕了很远一截路。
+
+　　路痴之至，让自己都忍不住弹自己的脑门。
+
+<br />
+
+　　本想再写一些关于社团里那些笨蛋。但是行文之中思绪万千，俨然已经无法止住，就只能等以后再诉之笔墨了。
+
+　　稍作整理，只表达一句话： **我很羡慕你们，你们之中诞生多少故事与奇迹我也丝毫不会意外，我很庆幸能成为其中一员，我也从未后悔过。**
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 6 月 3 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-胭脂洪泛-md-1394795374"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-胭脂洪泛.md

<details>
<summary><code>+159 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\203\255\350\204\202\346\264\252\346\263\233.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\203\255\350\204\202\346\264\252\346\263\233.md"
new file mode 100644
index 000000000..147694320
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\203\255\350\204\202\346\264\252\346\263\233.md"
@@ -0,0 +1,159 @@
+# 随记 - 胭脂洪泛
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/lipstick-4743984_1920.jpg)
+
+> 摄影师 | lubovlisitsa
+>
+> 图源 | Pixabay
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">1806 字 | 心绪强烈 | 性别话题注意</p>
+
+## 正文
+
+　　每篇随记，我都会或多或少，或显或隐地聊到某一个特定的主题，而这次，是化妆品。
+
+　　更宏观一点来讲，可能是整个女性用品。
+
+　　七月十三日，我陪室友去修手机屏幕，辗转几家店，虽然一直在赶路，但我也权当是逛街了，看看周围的招牌，倒是别有一番趣味。
+
+　　回来路过一家店。外面，摆满一排箩筐，里面放着促销产品。箩筐上插着牌子，价格数字写得很大：牙刷一块一根；一打手帕纸一块九；垃圾袋三块一卷……
+
+　　开始看到垃圾袋，想着要不要添置，停下来。斯看我停了脚，便也开始注意。于是两人都被这价格所惊奇。
+
+　　惊奇又惊喜。
+
+　　天很热，店里散来空调的凉意，伴随来的，还有店员的确认声。
+
+　　“是的，真的只要一块九。”
+
+　　斯确认了一下，大概是不太敢相信吧。
+
+　　于是我们踏入店内。
+
+　　这店，实实在在的，是我一年之前，不会敢进的店。说实话，这次仍有些胆怯，但相对来讲没有那么唐突。
+
+　　化妆品店。
+
+　　里面摆满了各种瓶瓶罐罐。浅色系，各种大小不一，或英文或法文的产品抢占人的眼睛。
+
+　　还好，这家店气息没有那么浓。 **女性气息太过浓烈，可能我真的会忍不住逃跑。**
+
+<br />
+
+　　大二。2021 年 1 月 22 日。
+
+　　我被珂强行拉进一家化妆品店。万达里面，占地面积很大很大的一家化妆品店。
+
+　　人影稀疏，地板亮得能反出衣服上的拉链。星星点点的人们，全是女性。
+
+　　“不了不了，我真不进去……”
+
+　　“来嘛来嘛，这有什么，别跑啊……”
+
+　　她大笑着，拽着我的衣服拉我进去。笑得像个恶魔。
+
+　　![](https://img.tinysnow.cn/blog/articles/essays/makeup-store.jpg)
+
+　　我们在里面看了很多奇奇怪怪的产品。
+
+　　眼影盒，盖子透明，装有液体，还像沙盘一样散着许多蓝色星星和绿色的细小沙粒。很像小时候玩的那种水橡圈机。
+
+　　珂笑着对我说，这个眼影盒真好看，真的巨好看，但是她绝对不会买。
+
+　　很奇怪不是吗？
+
+　　粉底液，瓶身一反常态的，没有任何文字。信息全部堆在瓶底。
+
+　　她表示没看过这种瓶子，也很诧异。
+
+　　口红，很多品牌。还有一些其他的如乳液，定妆液一样的东西。
+
+　　她还指着两款红色，问我分辨得出来吗？
+
+　　我一脸茫然。她大笑，说她也认不出来。
+
+　　那个时候，我还没有做色感训练。
+
+　　我印象最为深刻的，是她指着一墙瀑布一样，色彩缤纷的小物体，说：
+
+　　“猜猜那个是什么？”
+
+　　![](https://img.tinysnow.cn/blog/articles/essays/colorful-makeup-eggs.jpg)
+
+　　那时候说这话时，她也仍然笑着，<u>两个眼睛眯起来，像看一无所知的小孩子似的看着我。</u>
+
+　　“不知道。”
+
+　　“那是美妆蛋啊，这个都不知道吗？”
+
+　　我有点欲哭无泪。
+
+　　对于中途这趟意外，我一无所知。
+
+　　也是那时候开始，我才意识到，我的女性知识，有多么匮乏。
+
+　　最大的收获，可能就是意识到这一点。而代价就是：身为一个男孩子，站在那种地方，真的很害羞，手足无措，非常想逃跑。
+
+　　逃跑的意图太过明显，以至于她险些采取措施。
+
+　　如果需要对这趟，永不能磨灭的化妆品店之旅，总结两个关键词，我想，只能是**觉醒**与**羞耻**。
+
+<br />
+
+　　而今天，还好，在能接受范围之内。
+
+　　结账，意欲出去，路过一个架子，忽然停下来。上面写着：防晒霜。
+
+　　<u>防晒霜可能是我最喜欢的一类化妆品了，大概因为它并不那样排斥男性在外吧，我们也可以使用。</u>
+
+　　我也只是稍作停留，随后便绝尘而去。
+
+　　“为什么你要看防晒霜？”斯问了我同样的问题。
+
+　　“没什么，只是有些感兴趣。”
+
+　　“你要买的话，也只能买男性专用的呀。”
+
+　　这个确实。归根到底还是分开的。不过终究，排斥还是要浅一点的。
+
+　　出门，往后看了看。很普通的一家化妆品店。店名甚至都被大脑扔进了非必要信息里。头顶是太阳。店外依旧摆着满满几大箩筐的促销商品，价格便宜得让人吃惊。
+
+　　我想我在那一瞬间发现了生活的美好。
+
+<br />
+
+　　时至今日，我仍然胆怯进入这些店里。
+
+　　并且，如果气息如果太过浓烈，我想我依旧会忍不住害羞逃跑。
+
+　　但<u>我在尝试着去理解那个遥远的女性世界</u>。
+
+　　一年之前，我是不会这样做的。面对满目琳琅，胭脂洪泛的化妆品，入口完全紧紧闭塞，<u>颇似惊慌的小孩子，跑进家门，用力抵住门口。</u>
+
+　　一年之后，我尝试打开门闩，放那些让自己害羞到害怕的气息进来，努力接受。
+
+　　<u>有人曾经问我，为什么要学化妆品相关的知识。我说，我想学会之后用在女朋友身上，免得她被骗，或者忙的时候，我也能帮上忙。</u>
+
+　　<u>如果我真能找到女朋友的话。</u>
+
+　　一年之内，心态为什么发生了这么大的变化。我想，可能仅仅只是因为，我想了解那个世界吧。
+
+　　**在两个人争吵的时候，知道对方可能会因为这方面的什么而生气，也知道在这方面，怎么才能让对方开心。拥有一种不桎梏于男孩子的全新视野。**
+
+　　虽然我知道，我可能永远不能完全理解那个世界。但我想，这应是我朝着一个合格的男朋友这条路上，迈出的，必要而坚实的一步。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 7 月 15 日
+
+## 写在后面
+
+　　文字为文学艺术加工，如果有与图片不符的地方，以图为准。
+
+　　![](https://img.tinysnow.cn/blog/articles/essays/makeup-products.jpg)
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-自我实验室-md-179623279"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-自我实验室.md

<details>
<summary><code>+51 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\207\252\346\210\221\345\256\236\351\252\214\345\256\244.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\207\252\346\210\221\345\256\236\351\252\214\345\256\244.md"
new file mode 100644
index 000000000..48518cb49
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\207\252\346\210\221\345\256\236\351\252\214\345\256\244.md"
@@ -0,0 +1,51 @@
+# 随记 - 自我实验室
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/georgia-de-lotz-JsQ6K5CfJ7s-unsplash.jpg)
+
+> 摄影师 | Georgia de Lotz
+>
+> 图源 | Unsplash
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">631 字 | 舞蹈相关</p>
+
+## 正文
+
+　　前两天将一个很崇拜的画师的方法论文章下了下来。那个号名字中，有“CG 艺术实验室”的字样。
+
+　　当时觉得没什么，后面觉得有些奇怪。
+
+　　如果说，有绘画类的艺术实验室，为什么没有舞蹈和音乐类的实验室呢？后两者听起来总有一丝怪味，但绘画艺术实验室听起来便合情合理。
+
+　　三大艺术领域在这件小事情上如此失衡，属实是不应该。不过大约也和人没有想过有关吧。
+
+　　音乐不甚了解，只了解舞蹈的一小部分。
+
+　　那之后，便开始畅想着，舞蹈实验室，应该是怎样一个样子：
+
+　　Google 有一个 20% 原则：人们可以在工作中花 20% 的时间，研究自己喜欢的事情。很多著名的产品都是这 20% 的产物。
+
+　　舞蹈实验室，大概也应该是这样一个场所。没有嘲笑，没有战斗，有的是交流，鼓励，研究和发现。
+
+　　实验室在我心目中一直有着探索未知的含义。而舞蹈的实验室，我想，最终的目的大约也只有两个：一是发现身体的未知，二来，与自己的灵魂沟通。
+
+　　如果我要建立一个舞蹈实验室，后者，是最重要的。
+
+　　眼睛是心灵的窗户，而肢体，是沟通和表达情绪最直接的方式。用肢体表达自我，带入所有情绪，这才是舞蹈存在的意义。
+
+　　所以，与其说是舞蹈实验室，大概更应该称为自我实验室，用着舞蹈的形式。
+
+　　舞者圈有一句很出名的话，说， <u>跳舞的人都是一群很纯粹的孩子 </u>。艺术领域都是这样的吧大概，通过人类所发现的艺术形式，与自己达成和解。
+
+　　舞蹈实验室，音乐实验室与绘画实验室，现在一看，或许都没有那么奇怪。
+
+　　愿艺术之光熠熠生辉。愿舞蹈之魂经久不息。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 10 月 11 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-舞社的水-md-2339455061"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-舞社的水.md

<details>
<summary><code>+37 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\210\236\347\244\276\347\232\204\346\260\264.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\210\236\347\244\276\347\232\204\346\260\264.md"
new file mode 100644
index 000000000..ae931ce6f
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\210\236\347\244\276\347\232\204\346\260\264.md"
@@ -0,0 +1,37 @@
+# 随记 - 舞社的水
+
+　　吃完饭，走在路上，遇见了舞社那一群人。很多。不乏有我的好友。
+
+　　或许是没有看见我，擦肩而过。那一瞬间，一种不知怎么形容的感觉。我感觉我从来没有融入过他们。不知道怎么就诞生了这样的感受。
+
+　　没有通知，没有聊天。
+
+　　被他们斥之门外，没有难过，只是奇怪。为什么同一种热爱，诞生了那么多种门派？莫名的疏离，无由的亲近，一种不可追寻的对待。
+
+　　我忽然想起了昨天。
+
+　　回去的路上，有两个男生，并排走。其中有一个人，似乎很熟悉，便多看了两眼，但是依旧在和身边的人聊天。那男生似乎这样觉得，就对视上了。
+
+　　是演出同一个节目的队友，不是很熟，只认识的那种程度。甚至叫不出名号。
+
+　　他朝我投过一个无法言喻的笑。
+
+　　是单纯的打招呼，还是有其他的含义，我不得而知。只是被有过交集的人撞见有些尴尬。
+
+　　但是这样，依旧会问候。
+
+　　我曾记得，我问过副会长，咱们舞社的水，深吗？副会长点了点头，说，这里面关系复杂得很，水很深，不要碰。
+
+　　我只是简单希望，小社会的性质，不要体现在我所热爱的事情上。
+
+　　我一直为，现代社会机关算尽，为利而食，为益而死的现象难过。在我眼里这就是猜疑链，属于内耗的一种。与天天批评自己，但实际并无他用的伤痕文学并无二异。若是有《Outer Wilds》里挪麦人的气派与格局该多好。
+
+　　或许我就应该生在理想，死在理想。
+
+　　起码自己，愿日后道路，只留甄朴。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 7 月 2 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-茉莉清茶-md-1785395687"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-茉莉清茶.md

<details>
<summary><code>+231 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\214\211\350\216\211\346\270\205\350\214\266.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\214\211\350\216\211\346\270\205\350\214\266.md"
new file mode 100644
index 000000000..6f05a4580
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\214\211\350\216\211\346\270\205\350\214\266.md"
@@ -0,0 +1,231 @@
+# 随记 - 茉莉清茶
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">2788 字</p>
+
+## 正文
+
+　　对于昨晚的聊天，我很震撼。
+
+　　一平跟我说，她今晚很浮躁，总静不下心来。我说，没事，也不是每一个人每天状态都好，慢慢来，不用急。我教她的时候，也没有看出来她有多浮躁。我想，大概只是她自己这两天事情有点多，有些倦怠吧。
+
+　　我们一直碎碎的聊着，围成丢手绢一样的圈，任由音乐在一边放着，想跳舞的自己出去练，不想练的插进圈里。在场的都是熟人，也没什么不自在的，反倒这样懒成一团，另有一番感觉。
+
+　　然后子阳来了。
+
+　　子阳和一平是前后辈的关系，同专业，子阳大二，一平大一。
+
+　　子阳来的时候，我们正做着俯卧撑呢，直接看傻眼了——这两天她们体测来着。
+
+　　一平因为不服跟胡在昨天比试的结果，要求今天再加赛，胡百般地不情愿，丢下一句：“大家一起做，我就做。”然后想借此脱身。然而我们想看他出丑，心甘情愿被拖下水，于是还真一起做了。
+
+　　“你们每天都这么刺激的吗？”
+
+　　“没……怎么可能嘛。”
+
+　　子阳插进圈里，和一平聊起来，聊的都是一些我不太懂的，她们专业的话题。子阳示意我过来，但因为她身边坐着小马，我只能蹲在一边。我刚想聊些什么，就被小马拉住。
+
+　　“完了，快帮帮我，还有十分钟，三十六道题，快快快。”
+
+　　“……”
+
+　　我看了一下，净是一些古董题目，什么线性、树形结构之类的。跟她一起做完还剩两分钟，速度简直快。做完发现只有不到四分之一的人交了作业，看来她这一届的学生比我们还要摆。
+
+　　“你不是说你法学院的吗？”
+
+　　子阳指向我。
+
+　　“对啊，我法学院的呀。”我稍微迷惑了一下，马上开始乐。
+
+　　“我信你才怪，他信工的，”一平白了我一眼，“我跟你讲，昨天我们练舞的时候，他一个人抱了那么大一台电脑，在旁边工作。”说完还比划了一下。
+
+　　我有些尴尬。
+
+　　“既然你说你是法学院的，你说下张老师是我们系主任还是学院团支书？”
+
+　　“哎呀，我平时课都不去上，我怎么可能知道这些嘛。”
+
+　　“那我们专业课呢？”
+
+　　“专业课啊，我想想，早忘了，八百年前的东西了。我都大四了欸。”
+
+　　两人齐齐翻我白眼。
+
+　　之后我有一搭没一搭地和她们聊着，大多时间只是蹲在一边听着。子阳不知什么想法，一边听着一平讲着琐事，一边跑过来解我鞋带。
+
+　　嗯，我还没反应过来，我鞋带就被拉开了。
+
+　　系上。
+
+　　再拉。
+
+　　系上。
+
+　　再拉。
+
+　　行，不系了，摆烂了。
+
+　　刚好小马被胡拉走了，子阳示意我坐过去。
+
+　　我坐过去，听她们聊着斓祯的印象，我不时说两句。突然，她们话锋一转：“还有，她化妆的技术真的好好！”
+
+　　“就万圣节那个妆吗？”
+
+　　“对对对，我问过她好多次呢，怎么化，这种……”
+
+　　我一听，完蛋，我插不进去话题了。于是往旁边挪了两步，坐远了一点。
+
+　　子阳看我这动作，笑出了声。
+
+　　“你过来呀，了解一下嘛，怕什么。你不是很想给女生化妆吗？”
+
+　　我震撼。
+
+　　不知道说什么。
+
+　　这句话意味着，她看了我写的那篇小说。
+
+　　我当初给她发了公众号的一篇文章，说，你想了解的故事都在这里面。作为见面会我搪塞她的赔礼吧，私下给她发了。不过我觉得也没写什么东西，就觉得还好。
+
+　　她后来跟我说，你这个人还挺反差。我笑笑。我写的东西小心思确实比较多。
+
+　　我也以为，她只会看一篇而已。
+
+　　就我自己而言，别人推荐的东西，有兴趣会看一下，如果太多的话，估计压根儿看都不会看。那个号里，文章少说也有二三十篇了。
+
+　　我也一直觉得别人会这么干。
+
+　　我靠身过去，仍默不作声地听着。不过她们似乎很快结束了这个话题。
+
+　　子阳左边有另一个女生，应该是她的朋友吧。那人也很漂亮，是我一眼看过去就会害怕的那种类型。
+
+　　我曾经跟子阳说，我比较害怕漂亮的女生。
+
+　　然后她生气了。
+
+　　“我不够漂亮吗！”
+
+　　我哑然失笑。
+
+　　“所以我刚开始挺害怕你的呀。”
+
+　　“你什么时候害怕我了？”
+
+　　“又不是所有害怕都会表现出来嘛。”
+
+　　这话术蹩脚到我都想笑，但这是我真实的感受。刚开始确实挺害怕她，总觉得漂亮的女孩子跟我从来不在一个世界。不过后来还好，渐渐习惯了。
+
+　　只是她只用微信，我没办法，只能硬着头皮常开微信了。
+
+　　她们继续聊其他话题，有时候觉得能聊上两句，就随便说点什么，一直到子阳她们离开。
+
+<br />
+
+　　“你要现在走吗？”一平问我。
+
+　　我愣了一下，“都行，你呢？”
+
+　　“我不是很急，走不走都行。”
+
+　　“那现在走吧，早点回去睡觉。”
+
+　　然而就结果来说，这个目的并没有达成。
+
+　　路上她还是跟我说，她今晚总觉得不痛快，感觉很浮躁静不下心来。
+
+　　我笑了笑，说：“真的没什么，状态不好很正常。今天富士康给我电话面试，还说我心理性格测试不合格呢。”
+
+　　“真的假的？”
+
+　　“骗你干嘛。”
+
+　　“那你接到这个电话感觉怎么样？”
+
+　　“我觉得还好啦，这都没什么的，所以你也不要想太多。”
+
+　　“我怎么看你前两天心情不太好的样子？”
+
+　　“有吗？”我迷惑。
+
+　　“有啊，”她看我懵，她也很懵，“反正有一点吧，给人那种感觉？”
+
+　　然后她补充了一点：
+
+　　“下次你心情不好的时候跟我说嘛，我随机送你一个小礼物。哼哼~”
+
+　　吃惊，同时又开始笑。
+
+　　“送什么，一个耳刮子是吧？”笑出声来。
+
+　　“没有啦，怎么可能。”
+
+　　“不过很奇怪欸，怎么还带送礼物的。”
+
+　　“哎呀，你别管那么多嘛，下次心情不好的时候跟我说就对了。”一平脚一跺，看起来有些急。
+
+　　“好好好，知道了，你别这样。”看来逗得有些过了。
+
+　　“不过当时也要取决于我有什么，说不定刚好东西吃完，送你一个垃圾。”
+
+　　“哎呦，垃圾我也收啊，这可是大小姐给的垃圾。”
+
+　　我话还没说完，然后就见她猛地转身：“你先走吧，不行，我要去操场跑两圈。”
+
+　　我看了看时间：“哥，现在都十点半了！”
+
+　　“哎呀，你别管！不跑两圈我心里不痛快！”我看她在我三尺之外，朝我这么喊。
+
+　　那是真的牛皮，我到现在都这么觉得。
+
+　　分开之后走了两步，我忽然想起了什么，掏出手机，点开刚加的微信。
+
+　　「你瓜娃子快回来，明天还要体测呢，八百不想跑了？」
+
+　　回到宿舍，手机震动。
+
+　　「没去跑步，跟朋友打篮球去了。总觉得自己今晚很浮躁，自己不够好。」
+
+　　「状态不好可以理解，觉得自己不够好没这必要吧……而且这么晚了还去打篮球啊……」
+
+　　「哼，就是不安逸。不宣泄一下，情绪郁结容易得病。」
+
+　　「行吧。我也不管你干啥了，十一点半之前回来，不然要被锁外边。」
+
+　　「晓得。」
+
+　　我坐在床上想了一下，做出了一个决定。看了看时间，还来得及，回来还能洗澡。于是跑下楼去。拿着手上的东西，四处逛了逛，最终选定一个地方，给她发消息。
+
+　　「我给你买了一瓶茉莉清茶，放在这个位置。待会儿回来自己拿。超市旁边，女生宿舍那道玻璃门右边的下面。给你买的常温的，冷的对胃不好。您慢慢发泄，我溜了。」
+
+　　发完还拍了两张图，指明了一下位置在哪。顺便还特意回复了一下她那句“不安逸”：给你送的小礼物。
+
+　　我觉得，算是平等吧。她这样善意地对待我，我也应该做出些举动才对。并非出于礼尚往来，真心这样觉得。
+
+　　木头了好一会儿才想出这个点子。
+
+　　「行，等会儿去拿，明天喝。」
+
+　　我的公众号，她也知道。因为不知道买什么饮料，就顺手拿了一瓶茉莉清茶。但愿她不会因茉莉清茶在文章中的含义而想多。
+
+　　该死的，《茉莉清茶》还在里面是两篇置顶的其中之一。
+
+　　正写日记的时候，手机震动。
+
+　　「拿到了。」
+
+　　「行，早点睡觉。」
+
+　　「你也是。」
+
+　　「晚安，好梦。」
+
+　　「晚安。」
+
+　　我看向窗外，繁星点点。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 11 月 6 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-茶叶沉底-md-2091404330"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-茶叶沉底.md

<details>
<summary><code>+38 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\214\266\345\217\266\346\262\211\345\272\225.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\214\266\345\217\266\346\262\211\345\272\225.md"
new file mode 100644
index 000000000..330a4cc2a
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\214\266\345\217\266\346\262\211\345\272\225.md"
@@ -0,0 +1,38 @@
+# 随记 - 茶叶沉底
+
+　　刚刚和室友吃饭，他忽然从座位上起身，神态自若地从我们没有买过饭的商家那里接了两杯水，给了我一杯。我当时笑骂说真够自觉啊。他笑了笑说，反正他们一天肯定也买不完，第二天都要倒掉重新装的。我想了想也是。
+
+　　看向那杯水，淡橙褐色，不是原原本本的水。旋即就猜到了是茶。
+
+　　杯子很烫，隔着厚厚的纸壁也能感觉到传递过来的暖意。
+
+　　双手捧起来，小口小口地嘬着喝，感觉心肺暖成一片。严冬里面瞬间有了一种幸福感。
+
+　　其他室友有的还在吃，我就无意中捧起这股暖意发起呆来，想象着这杯水的历史，想象着它的轨迹，想象着它是怎么来到我们面前的。
+
+　　——于是我想到了茶叶。
+
+　　想到那些开始蜷成一团的叶片，怎样浮在水面上，随着时间和氤氲的水汽起舞，舒开自己的身体，然后慢慢地沉入杯子底部。
+
+　　突然想到了自己。
+
+　　在那些什么都不懂的时候，感觉自己比天还大，叫嚣一切。说好听点叫青春，说难听点叫张狂。
+
+　　懂得多了，舒张开自己身体和灵魂，猛然发觉，自己身边匆匆而过的所有人，都有着相似的成长。或许经历不一样，记忆不一样，感情不一样，体验不一样，但成长几乎别无二致。
+
+　　用已有的知识体验与接触前途那一片未知和浩瀚，将自身变得越来越厚重，像同心圆一样扩张开。然而与无知的接触面也越来越广，自身也越来越沉郁。当厚重敲击到杯子底部，便无声无息了。
+
+　　唯一要做的，只是发散自己的魅力，浸润更多，变得更醇厚。
+
+　　想到这里，忽然就呆住了，直到室友叫醒我。
+
+　　回去的路上突然很想喝茶。到了宿舍翻出自己那一罐茶叶，把玩端详了一下，叹息一声。
+
+　　过期了。
+
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 10 月 22 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-蒜苔与旧嗓音-md-3400333868"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-蒜苔与旧嗓音.md

<details>
<summary><code>+83 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\222\234\350\213\224\344\270\216\346\227\247\345\227\223\351\237\263.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\222\234\350\213\224\344\270\216\346\227\247\345\227\223\351\237\263.md"
new file mode 100644
index 000000000..102d776d1
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\222\234\350\213\224\344\270\216\346\227\247\345\227\223\351\237\263.md"
@@ -0,0 +1,83 @@
+# 随记 - 蒜苔与旧嗓音
+
+　　犹豫了很久终于还是去县城里找同学玩了。
+
+　　很久了，崔终于又连上了我音响的蓝牙。一起跳了舞。
+
+　　很久都没有过这样的体验了，在高中的日常经历。感觉很幸福。
+
+　　他说我长高了。我觉得是他的错觉。然后他很振振有词地跟我说，以前跟我走一块儿，侧头看向我的时候，一般是看向我现在鼻梁这个位置。那个位置，那时候是我的眼睛。
+
+　　我有点不知道说什么好。
+
+　　习惯的力量，总能于这些些微的地方展现，给人以一种奇妙的感觉。
+
+　　去找另一些同学玩。路上迷了路。在这小县城里生活了这么久，竟然还不能完全认识路。真觉得自己路痴到一种境界了。
+
+　　可能因为自己以前，只是走学校到家的那条路吧。
+
+　　城市再大，对于我来讲，大概也只是能否看看宏美夜景的区别吧。
+
+　　记得回家的时候，在地铁上看到成都的地铁线路图，才真正有一种成都触不可及的感受。从南到北，从东到西，一步步坚实地迈过、走过，我又会看到多少风尘呢？
+
+　　路痴到走进了一家超市。看到了一个女孩子，衣服是附近小学的校服。在收银台前结账，手里是一把用塑料袋装起来的蒜苔。
+
+　　当时真的有一种不可言喻的觉知。
+
+　　怔了一会儿，才又开始往前走。
+
+　　可能是心疼吧，有一点。不过我觉得，她约莫也不会需要我这样陌生人的感动。
+
+　　路上看到了中医院。
+
+　　想起自己高中喜欢的女孩子，就在这家医院里过的前年的除夕。
+
+　　想起自己，大年初一义无反顾地要去城里看她。
+
+　　想起路上清冷的城。
+
+　　想起她在病床上虚弱的神情。
+
+　　想起自己笨拙的语言。
+
+　　想起她父母的表情。
+
+　　想起后来问她时，得知只有我和她一个好友去看望过她时，自己的欣喜。
+
+　　现在大概也都被风吹散了罢。
+
+　　大概也都仅滞留在我孑身的回忆里罢。
+
+　　不知道她怎么想过。
+
+　　猜过。
+
+　　罢过。
+
+　　睹物思人，说的大概也莫过于此吧。
+
+　　等人都到齐了，去吃串串，在一个我从不知道的地方。在桌上，我们只是碎着嘴，论着些无聊却又值得津津乐道的事情。
+
+　　可能说什么都并不重要。
+
+　　重要的只是，能听见他们的嗓音吧。
+
+　　那些曾经烦到溺耳，现在又难逅一闻的声音。那些曾经不知道的安心感，此刻才从他们的嗓音里探出头来。
+
+　　打电话的时候，那些熟悉的嗓音，配上自己那个时期专属的绰号。一瞬间仿佛时间穿溯，回到以前。
+
+　　那时候我们还没毕业。
+
+　　他们，依旧是喝高了差点走错路的少年。
+
+　　至于饭后的公园闲逛，烟火大会，可能就只是寻回和重现旧时的快乐了。愚钝也好，纯真也罢，都是小时候久逢的甘霖，记忆自然刻得深一些。
+
+　　现在在同学家里，听着他们吵吵闹闹的玩游戏的声音。
+
+　　可能这就是生活吧。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 1 月 28 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-蓝色衣服-md-3123043634"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-蓝色衣服.md

<details>
<summary><code>+50 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\223\235\350\211\262\350\241\243\346\234\215.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\223\235\350\211\262\350\241\243\346\234\215.md"
new file mode 100644
index 000000000..809e85838
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\223\235\350\211\262\350\241\243\346\234\215.md"
@@ -0,0 +1,50 @@
+# 随记 - 蓝色衣服
+
+　　晚上，送那位小姐回宿舍。
+
+　　“那……我走了？”她看了看我，向前迈出一步，没有再继续。
+
+　　“嗯。”我应了，同她道别。
+
+　　她继续向前迈着步子。没有回头。
+
+　　我就这样静静看着她回去，边看着边往后退。
+
+　　她穿过宿舍区的铁门。
+
+　　我仍旧看着她的背影。我不知道自己的心里在想着什么，不过可能这个举动，自从想做以后，就已经默默中习惯了。
+
+<br />
+
+　　恍惚之中，我看见那件蓝色的衣服驻足，转身，歪着头。
+
+　　手上拿着的手机还在发着荧荧的光，头发从肩头滑落，自然地摇摆着，挡住那不经意的光芒。
+
+　　一闪，一闪。
+
+　　我看不清那位小姐的脸。
+
+　　我只知道，在我能目及到的两根铁门柱子之间，有人在寻找着我的身影。
+
+<br />
+
+　　原来，我也是一直在被注视着的啊。我想。
+
+　　我看着她再次转身，迈步。
+
+　　我也转身，向目的地进发。
+
+　　我从没告诉过她，我会目送着她远去。
+
+　　那位小姐也从没跟我说过，她会中途转头，确认我的身影。
+
+<br />
+
+　　两个人，在某种程度上，都是笨蛋。
+
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 9 月 30 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-被喊叔叔-md-2848297441"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-被喊叔叔.md

<details>
<summary><code>+109 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\242\253\345\226\212\345\217\224\345\217\224.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\242\253\345\226\212\345\217\224\345\217\224.md"
new file mode 100644
index 000000000..af20bbde9
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\242\253\345\226\212\345\217\224\345\217\224.md"
@@ -0,0 +1,109 @@
+# 随记 - 被喊叔叔
+
+　　其实我今天不知道说什么好，因为我去县城里完全是出于意外。但也因此收获了一段不错的经历，还算是比较幸运吧。
+
+　　之前想要邀请灵出来，但是因为没有计划，所以不太愿意的样子。今天碰运气去试了一下，竟然同意了，还是挺意外的。毕竟她之前跟我说的不想逛街之类的，因为腿会比较疼。然后她自己给出的方案却是一起去爬山。
+
+　　搞得我有点想笑。嘛，不过也还好啦。
+
+　　见到她的时候已经是很久之后了。那时候我背对着她，因为对她家的位置不熟，所以就在外边等。
+
+　　“打他！打那个叔叔！”
+
+　　然后我就感受到腿部一阵微弱的冲击力。
+
+　　转过头去，看到一个小男孩，先是懵了一下，然后看到她才稍微懂了。然后马上又懵了——不是说爬山吗？
+
+　　小男孩是灵的侄子，舅舅出去办事去了，然后她暂时带一下，虽说听她的描述，大概也不算是暂时性了（笑。然后我就陪着这两人一路走，看着她和他之间打闹。不过三岁的小孩子，打闹也打闹不出个什么来吧。从我们三人转过第一个街角开始，我就知道两个人爬山，是不可能的了。
+
+　　就这样一直走，一直注视着这两人，不时说两句话。
+
+　　小孩子玩具背在背上的小背篓里，途中要牵手。他一手牵着灵，另一只手空着。于是我就想上去牵着，然后他十分警惕地看着我的手，开始往灵那边躲，边躲边摇头。我只能无奈地叹了口气。去往公园的路上，和归途，试了几次都没有成功。我开玩笑地说：“ 教得挺好啊，面对陌生人的时候。” 灵笑了笑。虽说是这么说，但是心里还是有点寂寞啊（笑。途中问起，为什么要叫我为叔叔，心存怨念。灵以一种很无奈的表情说：“ 他叫我都叫阿姨的。我总不能让他叫你哥哥吧？”
+
+　　在公园的一角，他一个人独自玩着的时候。我们两人在背后看着他。相隔不远。
+
+　　“ 能抱一下吗？我很早就想这么做了。他一直缠着你，没什么时间啊。”
+
+　　“ 可以啊。”
+
+　　“ 见到你好开心啊！”
+
+　　灵看着我笑了一下。
+
+　　然后这时候，很尴尬地，她侄子在我们拥抱的时候转过头来了。然后见到我们这样，脸上带着笑又把头转回去了。
+
+　　我觉得这个小男孩有点恐怖。不过 3 岁的孩子……应该不会的吧？
+
+　　我刹那间想起了那句话：猫猫有什么坏心眼呢？
+
+　　说的大概就是这样的情形。
+
+　　下公园楼梯的时候，总觉得有许多散步的在看我们三个人。可能是我意识过剩吧……这个坏毛病一直改不了。
+
+　　我本来打算，就陪着他们两人，回到她的公寓入口，我就在楼外等候。但是谁知道小男孩突然耍起性子来，怎么着也不肯回家去，然后没办法，我也跟着一起来，和着灵一起好说歹说把他劝进了家门。这时候他舅舅恰好也回来了，然后我站在她家门口迷茫了一下。跟着进去了。
+
+　　热情欢迎。为客之道也不好推辞。
+
+　　灵他们要回老家去，所以在收拾。我一边看护着这个小男孩，一边默默在意着她们收拾东西。为什么要看着这个捣蛋鬼？可能只是我为了缓解紧张吧。
+
+　　这是我头一次，一个人，去女孩子的家里。旁边还有她的家人们。
+
+　　很拘谨。
+
+　　这段时间熬完，终于听到了灵要送我出小区的招呼声。我整个人才松懈下来。路上我才后知后觉地知道她为什么要送我：小区门口是有人脸识别的，要不我出不去。
+
+　　然而我在出口旁边又看到了车道，车道有能容一人通过的间隙。所以又很懵。
+
+　　“ 能拍张照吗？”
+
+　　“ 啊！你又这样啊？” 她笑了笑，“ 可是我觉得我今天很邋遢欸。”
+
+　　“ 没有啊，我觉得挺好看的啊，” 我看着她笑了笑，然后粗略打量了一番，点了一下头，“ 嗯！”
+
+　　“ 别走了，再走脚疼了！”
+
+　　“ 哦哦……好。” 她听到愣了一下，笑了。
+
+　　前几天约她出来，她不想出来就是因为没有计划，和脚疼来的。
+
+　　没有快门声。
+
+　　“ 那……我走了？” 灵指了指小区。
+
+　　我现在都不知道为什么，那时候双臂张开了。
+
+　　她笑了，然后也张开了双手。
+
+　　“ 回去好好玩啊。” 我在她的头侧边，只说了这句话。
+
+　　“ 嗯。”
+
+　　“ 那我走啦。” 她说的话，此刻轮到我说了。
+
+　　“ 嗯，拜拜。”
+
+　　“ 拜拜。”
+
+　　背道而驰。
+
+　　人来人往的背后，我知道她正在向她家走去。也幸好，她看不见我的表情。
+
+　　我几乎是逃出去的。
+
+　　我在这种人多的地方都做了些什么……
+
+　　我蹲在马路边双手蒙着脸，反思了许久，却只得出了几声情不自禁的呜咽、还有一种——
+
+　　名为开心的心情。
+
+　　我大概不适合做男孩子。
+
+　　太容易满足了。
+
+　　笑。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 2 月 3 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-被当成测绘师-md-1822661961"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-被当成测绘师.md

<details>
<summary><code>+37 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\242\253\345\275\223\346\210\220\346\265\213\347\273\230\345\270\210.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\242\253\345\275\223\346\210\220\346\265\213\347\273\230\345\270\210.md"
new file mode 100644
index 000000000..cd01b484f
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\242\253\345\275\223\346\210\220\346\265\213\347\273\230\345\270\210.md"
@@ -0,0 +1,37 @@
+# 随记 - 被当成测绘师
+
+　　今天久违地出去了一次。本来是想跑步来着，但是素描本太碍事了，就改成散步了。
+
+　　很久没出去了，街上该熟悉的还是那个样子，但是小学变化甚大。这街上几近没落的小学是我的母校。上学去必须经过一个铁索桥，桥依旧，但另一头，公路拔地起，是我在半年之前不曾看到过，也不曾预料的景色。沿河也建了河堤。
+
+　　学校入口就是一条山路，能沿上去往高处。想着自己从没有走过，就这样去看看也不错。由此，就诞生了我的第一幅画。
+
+　　我无法言说那是一种怎样的感觉。站在山高处，耳朵里是象征宇宙的浩瀚幽暗的音乐，还能听到风刮过自己耳边和刮过竹林的细碎声。画纸需要努力按着才能安静下来。不远处是即将抵达山后的夕阳，夕阳将云边缘染得黄亮透明。
+
+　　下来的时候，有人问我，是不是又要建造和规划什么，看我站在上面那么久，还记着什么。
+
+　　我愣了一下，才反应过来是被当成测绘师了。笑了一笑，说没什么。心里想的却是，原来自己现在轻而易举就能被当成大人了啊。
+
+　　回去走在路上，才注意到，街上很多人家都挂起了四个一叠的红灯笼。还有几个小孩子在玩摔炮。
+
+　　虽说是如此，但年味还是渐渐淡去了。大概八九岁的小时候，困到不行却熬到了午夜，那时候看到外边黝黑的天空一起绽放四彩八色的烟火，那时候心里的震撼。大概一生都忘不了。
+
+　　慢慢地走回家，耳边仍是《Outer Wilds》的原声。
+
+　　那段路程。沿路的情绪。自己的渺小。无处可藏的感情。最终凝结成一个想法——
+
+　　我想好好地爱自己身边的人。
+
+　　这是我贫瘠的才华限制之下，唯一能做的，能让人感到安心的事情了。
+
+　　我不知道这个想法能坚持多久，或许睡一觉就忘了。但是，真的，很想好好地给别人温暖。
+
+　　想拥抱一个人。
+
+　　在家里看向夜空抑制住这股冲动。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 2 月 7 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-踩着石砖回家-md-3089621363"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-踩着石砖回家.md

<details>
<summary><code>+27 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\270\251\347\235\200\347\237\263\347\240\226\345\233\236\345\256\266.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\270\251\347\235\200\347\237\263\347\240\226\345\233\236\345\256\266.md"
new file mode 100644
index 000000000..e66bc105d
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\270\251\347\235\200\347\237\263\347\240\226\345\233\236\345\256\266.md"
@@ -0,0 +1,27 @@
+# 随记 - 踩着石砖回家
+
+　　从食堂到工作室的路上，有一段路，上坡，旁边是草地。草地的边界用一些很矮的石砖拦着。
+
+　　有一辆小轿车朝我缓慢地开过来，我感觉可能会蹭到，于是往旁边挪了一步，站在了石砖上。但是差点没站稳，用手平衡了一下。然后突然觉得这种样子，很熟悉，很怀念。
+
+　　想起了小学时候，那时候回家的路上，也喜欢踩着公路旁边矮矮的石砖，一步一步地，认认真真地平衡自己的身体，往家的方向进发。
+
+　　那个时候约莫纯粹是，很无聊吧，枯燥漫长的回家路上找的一点乐趣。
+
+　　现在却是觉得这样的举动很孩子气，很可爱。但是自己平时却不会去做这样孩子气的举动。
+
+　　认识改变了呢。或许这就是成长吧。
+
+　　想着这些，还是开始一步一步地，认真地平衡自己的身体，踩着矮矮的石砖，往工作室的方向进发。
+
+　　只有这样小小的一段路，还是晚上，不会有人在意的。
+
+　　任性一点，也没有什么问题，对吧？
+
+　　自己究竟是在向谁确认呢？
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2020 年 10 月 17 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-车站显示屏-md-3739074031"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-车站显示屏.md

<details>
<summary><code>+43 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\275\246\347\253\231\346\230\276\347\244\272\345\261\217.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\275\246\347\253\231\346\230\276\347\244\272\345\261\217.md"
new file mode 100644
index 000000000..2cd56ee59
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\350\275\246\347\253\231\346\230\276\347\244\272\345\261\217.md"
@@ -0,0 +1,43 @@
+# 随记 - 车站显示屏
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">285 字 | 时间</p>
+
+## 正文
+
+　　每每从成都东站的北进站口进站，都会看到这块超大的显示屏。
+
+　　曾有一次，我站在进站口，听着无数路人匆忙赶路的声音，凝视着这块显示屏。
+
+　　凝视良久。
+
+　　公告板给了一块最大的区域，显示现在的时间。
+
+![](https://img.tinysnow.cn/blog/articles/essays/20231126145456.png)
+
+　　除了下面的数字一分一秒地跳动，其他信息仿佛静止。
+
+　　看着下面只是默默走着的数字，我忽然对时间产生了一种莫名的恐惧。
+
+　　自那之后，都很害怕看到这块显示屏。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 11 月 25 日
+
+## 写在后面
+
+　　话说路过还看到了一个以 Z 开头的火车，当时觉得很奇怪。印象中，只有以 C（城际动车）、D（动车/普通动车）、G（高速动车）、K（快车）开头的火车。
+
+　　好奇搜了一下：Z 是 直达 的首字母。
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师 | Casey Horner
+> 
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-银行劝退-md-624583535"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-银行劝退.md

<details>
<summary><code>+49 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\223\266\350\241\214\345\212\235\351\200\200.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\223\266\350\241\214\345\212\235\351\200\200.md"
new file mode 100644
index 000000000..de5fbfea1
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\223\266\350\241\214\345\212\235\351\200\200.md"
@@ -0,0 +1,49 @@
+# 随记 - 银行劝退
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">498 字 | 职场 | 感受</p>
+
+## 正文
+
+　　开始准备找下一份工作了。
+
+　　行长为了完成全省十佳支行的指标，不择手段放贷款。
+
+　　副主管觉得为了这个指标理所当然，pua 我们加班，应酬，觉得占用个人时间理所当然。
+
+　　指标缺口恰好在带我的同事负责的条线上。
+
+　　今中午她没上来吃饭。我在吃饭的过程中，听到主管给她打电话，听到她不吃饭。然后挂电话，笑她。
+
+　　我下去给她拿了盒农科纯牛奶，一袋面包，两包沙琪玛。看到她在哭。
+
+　　晚上副主管和带我的同事，出去谈业务，非要把我拉上。谈完发现我啥都不会。我说你不给我任何资料，也不给我消息，现在又怪我不知道？副主管：你不知道主动问？我心里：那你他妈非要把我拉上干锤子？
+
+　　车上副主管依旧叫我们该加班加班，自我学习，提高酒量。中途他下车去另一个地方。带我的那个姐姐，坐在司机位，对着我直接开始发气。
+
+　　“我真的受够他的 pua 了。”
+
+　　一群领导把一个小姑娘逼到生理期失调。
+
+　　“为了十佳支行不管我们死活，达成指标他们几万十几万地来，我们啥都没有。这么不择手段不怕纪委查下来吗？省分行难道看不到吗？”
+
+　　副主管回来敲门，那一刹那，我们俩都闭嘴。
+
+　　开门的瞬间，社会气息达到了顶峰。
+
+　　劝君莫进来银行，一定别来农发行。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 10 月 31 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-长大的瞬间-md-2846214629"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-长大的瞬间.md

<details>
<summary><code>+63 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\225\277\345\244\247\347\232\204\347\236\254\351\227\264.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\225\277\345\244\247\347\232\204\347\236\254\351\227\264.md"
new file mode 100644
index 000000000..8c001b5a7
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\225\277\345\244\247\347\232\204\347\236\254\351\227\264.md"
@@ -0,0 +1,63 @@
+# 随记 - 长大的瞬间
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/maxx-miller-S1zym0s1QkY-unsplash.jpg)
+
+> 摄影师 | Maxx Miller
+>
+> 图源 | Unsplash
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">485 字 | 成长</p>
+
+## 正文
+
+　　看到一个话题，寥寥几字就极尽生活之无奈。
+
+　　「你什么时候发现自己长大了？」
+
+　　意识到过很多次。那些，都是一个个无比真实的下意识瞬间，鲜明的时间点。
+
+　　我曾看过学生和老师吵架，却共情老师；
+
+　　我曾突然发现，现在自己会主动解决见底的菜盘，以免下一顿不好热；
+
+　　我曾看着孩子们身上的统一校服，忽然有些难过；
+
+　　我曾在自己还有很多生活费时打电话要钱，直到现在父母打电话过来，骗他们自己仍然能过下去；
+
+　　我曾最关心的是谁与谁恋爱了、哪部番剧最好看，现在却完全无暇关心这些；
+
+　　我曾缠着父母说换手机，直到如今看见六块一斤的桃子摇头走开；
+
+　　我曾看见母亲踩空摔倒在地，却无能为力；
+
+　　我曾无意间翻出父母的 CT 照片和处方签；
+
+　　我曾觉得所有人都很善良；
+
+　　我曾冷酷地达成目的，差点怀疑成果并非我所为；
+
+　　我曾好意遮遮掩掩，现时却大方表明心迹。
+
+<br />
+
+　　那时的我，对口口声声的道理嗤之以鼻。
+
+　　“道理谁不懂？”
+
+　　**现在发现，很多真理抑或正道，很早之前便皎如日星，但是自己一直不懂装懂，视而不见。**
+
+　　**长大了吗？我觉得没有。或许意识到自己一直长不大，正是长大的开始。**
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 7 月 12 日
+
+## 写在后面
+
+　　我希望一直做一个小孩子。
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-雏菊的花语-md-4085380664"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-雏菊的花语.md

<details>
<summary><code>+33 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\233\217\350\217\212\347\232\204\350\212\261\350\257\255.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\233\217\350\217\212\347\232\204\350\212\261\350\257\255.md"
new file mode 100644
index 000000000..0f9482284
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\233\217\350\217\212\347\232\204\350\212\261\350\257\255.md"
@@ -0,0 +1,33 @@
+# 随记 - 雏菊的花语
+
+　　前阵子送一个好朋友生日礼物。冥思苦想了许久，最后还是送了两个看起来比较老套的礼物。随后写了点我送这两个东西的原因。
+
+　　以前随便做的无聊之事，在某一瞬间，似乎真的起到了作用。
+
+　　高考结束后，我花了很多时间，很多精力，在我的纸质笔记本上记录下了整页整页的花语。我个人对花没什么特别钟爱之处，然而我却觉得，花语很美好。
+
+　　花语，在英语中译作 The Language of Flowers。而 Language，只有宏观的语言语系才能有这种说法。但因花语自诞生以来，流传之小众，颇有被视为贵族趣味的危险。花语美好就在于，它和人们约定俗成的道德，规定一致，但又不绑架每一个人去执行，只是单纯地表达一个人的想法和意愿。
+
+　　有时候，我很想挽救它们，但是本人其实也不太精通。不过我想，只要能让更多的人知晓，大约也不失为一份贡献。
+
+　　我挑选的礼物上，有一朵小小的雏菊。
+
+　　曾经漫天盖地的花语，到最后我也没能记住多少。只记得了几个常见，并且觉得最匹配的。例如向日葵、雏菊、铃兰、风信子、蒲公英、狗尾草之类的。满天星这样的花，距离我太过遥远，记起来煞有记文科知识一般的枯燥无趣。
+
+　　这让我想起了那句经典的“你是否看到了一只鸡”。我的视野大概还需要再继续扩大一些吧。
+
+　　雏菊背后所代表的含义，确乎是很适合她。而其别名，也正好和我的希望吻合。
+
+　　我想一般是没有人会特意去探究一件礼物上的装饰的，所以我将我的想法，原封原样地写在了原因上。
+
+　　说实话我不知道她会有什么感受。事到如今，站在对方角度想了想自己的举动，自己都觉得小心思太多，有些好笑。
+
+　　不过得到了明确的回复，也确确实实地感受到了开心。
+
+　　对于送礼物的人，能得到这样的回复，就已经够了。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 4 月 3 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-雨中归途-md-483138504"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-雨中归途.md

<details>
<summary><code>+81 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\233\250\344\270\255\345\275\222\351\200\224.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\233\250\344\270\255\345\275\222\351\200\224.md"
new file mode 100644
index 000000000..13b9aa208
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\233\250\344\270\255\345\275\222\351\200\224.md"
@@ -0,0 +1,81 @@
+# 随记 - 雨中归途
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">781 字 | 职场 | 加班 | 生活 | 消极内容</p>
+
+## 正文
+
+　　我真的不清楚是我太脆弱，还是父亲他们太坚强，又或者兼而有之。不过现在真的好累。
+
+　　最近降温，起雾，下雨。慧慧发来一个视频，她那边已经开始下雪了。
+
+　　今天加完班是 18:30。外面在下雨。小雨。
+
+　　我狼吞虎咽地吃完，打算坐公交车回单位。已经停运。于是骑电单车回去。
+
+　　小雨，但是骑车时雨滴扑面而来，仍然打得人睁不开眼。加之长时间工作，中午还不能休息，眼睛更疼得想抠出来。
+
+　　我差点撞一小轿车尾巴上去。
+
+　　车身黑色，尾灯黯淡，雨点密集，看不清。
+
+　　我带着一身寒气回到行里，路上忽然想起父亲。
+
+　　高中，那时还没有四轮，只有两轮。冬天，父亲一个人风尘仆仆地从二十多公里外的家里，赶到学校，让我穿上加绒的护膝，扣好，再让我裹上像熊一样的军大衣。坐上后座，又赶回二十多公里外的家里。
+
+　　父亲也是这样，骑着车。身上没有军大衣，只有一件很旧的棉袄。父亲来接我的时候，总是穿得很厚，起码看起来是这样。
+
+　　但冬天里骑车，再厚都有风灌进后脖颈。
+
+　　那时候我不懂，就在后座上默默地背着高考必背古诗词，迷迷糊糊，近欲睡着。
+
+　　或许现在也不懂。
+
+　　父亲没说过冷，但我现在觉得冷。
+
+<br />
+
+　　父亲和母亲都有一种天生的乐观。我学不来。这种乐观似乎仅为工人和农民所有，但我似乎已经背叛了他们。
+
+　　他们让我再忍一忍。
+
+　　我说，我现在真的很难过，很不想工作，每天上班都像还债。
+
+　　他们说，都会过去的。
+
+　　今天加班。他们说，随大流就好，只要今晚不加到半晚就行。
+
+　　我做不到。
+
+　　我很清楚哪些是我应得的权利，从来不应该被侵蚀。
+
+　　父母似乎向来无所谓。
+
+　　这种状态在鲁迅时代有个别称叫阿 Q，而洋气或难听一点，叫做斯德哥尔摩综合征。
+
+　　我做不到被侵占权利后依旧乐观，并且为所剩下的那一点权利高兴。
+
+　　所以我痛苦。
+
+<br />
+
+　　我真的不清楚是我太脆弱，还是父亲他们太坚强，又或者兼而有之。
+
+　　我想找到这个答案。
+
+　　但是，或许找到了也并没有什么用处吧。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 11 月 12 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师 | Casey Horner
+>
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-雨中牵手-md-1301972727"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-雨中牵手.md

<details>
<summary><code>+21 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\233\250\344\270\255\347\211\265\346\211\213.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\233\250\344\270\255\347\211\265\346\211\213.md"
new file mode 100644
index 000000000..566078237
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\233\250\344\270\255\347\211\265\346\211\213.md"
@@ -0,0 +1,21 @@
+# 随记 - 雨中牵手
+
+　　每次来县城都会发生点意外。
+
+　　下雨，不是很大，但是地面已经湿掉了。
+
+　　一个小女孩，大概五六岁吧，一个人玩，突然在我面前摔倒了。
+
+　　哭着要找妈妈。
+
+　　犹豫了一下，蹲下来给她擦眼泪，擦衣服，问她妈妈在哪里，然后手牵手带过去。
+
+<br />
+
+　　我终究成了自己小说当中，那个笨拙地逗着小孩子开心的男生。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 1 月 20 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-青春与去爱-md-2853163937"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-青春与去爱.md

<details>
<summary><code>+91 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\235\222\346\230\245\344\270\216\345\216\273\347\210\261.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\235\222\346\230\245\344\270\216\345\216\273\347\210\261.md"
new file mode 100644
index 000000000..296fdd65c
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\235\222\346\230\245\344\270\216\345\216\273\347\210\261.md"
@@ -0,0 +1,91 @@
+# 随记 - 青春与去爱
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">1111 字 | 感触 | 朋友 | 经历 | 友谊 | 青春 | 爱与被爱</p>
+
+## 正文
+
+　　这则随记可能没有一个特定的主题，只是最近期的感想。
+
+　　昨天中午，我送别了远道而来的大学室友。跨越许多省份，从安徽到四川。而他这次来见我们的理由也很朴素。
+
+　　“只是很久没见过兄弟们了，来看一下。”
+
+　　不仅朴素，而且熟悉。
+
+　　怎么说呢，有些太熟悉了——这就是我大学毕业旅行的理由。而且，日后我可能还会继续用这个理由。
+
+　　那一瞬间，听到这句话，有些五味杂陈。
+
+　　我的理念，向来都是自己先主动，先去爱。毕竟把希望寄托于别人身上，指望别人主动，是一件极其不现实的事情。
+
+　　这个理由，当我自己是施事方时，自己并未有多大感觉。只是做规划、行动、完成。
+
+　　而这次，我是第一次成为受事方。当我听到他专程过来见我和其他朋友，再怎么感觉，都很难平静。
+
+　　每每和朋友一起跑步，看见那些刚刚放学的初高中生，都觉得相当青春。一身干净的校服，青春的脸庞，开怀的笑，以及仿佛世界不存在一样的肆意打闹。
+
+　　我每次都会说：“真是青春啊。”
+
+　　而她也总还是说：“你现在还正处在青春里呢。”
+
+　　青春吗？我总不这样认为。似乎只是我的身体还正青春，但也正渐渐衰老。比起那些孩子们，我还差得远呢。
+
+　　我总觉得，我已经离青春很远了。
+
+　　那些多姿多彩的生活，梦幻得如前世一般，像是浮在空中的五彩泡泡。而参加工作许久之后的现在，似乎只留下了一地的碎片。
+
+　　他的到来，我才又一次醒悟——这件事，似乎是只有青春里的人才能做出来的呢。
+
+　　而同一件事——施事与受事，居然可以有如此不同的心境呢。
+
+　　第二天，他没能早起。我带他出去玩的计划泡汤。
+
+　　起床已经是十点了。就和大学里一模一样。
+
+　　这么多年了，似乎从来没变过。
+
+　　我和他聊了很多，有似乎什么都没说。聊着各自的变化这件事，本身就很让人兴奋。
+
+　　这些对话，曾经是那样物美价廉，唾手可得，而今要花费上千公里的路途、让人肉疼的费用。
+
+　　我从来不觉得“被爱”是一件多么值得炫耀的事。
+
+　　我觉得“爱”才是。
+
+　　这次，我似乎有些懂了。
+
+　　但我依然觉得，世人所渴望的“强行拖人去玩、去变好”、“一场入室抢劫般的爱情”，本质上只是希望享受的懒惰。
+
+　　我挣扎在这种“享受的快乐”与“爱的理性”中，不知如何是好。
+
+　　主动去爱，总归是会累的。尤其是成年人，时间与金钱，无论对谁来说，都是不够用的。
+
+　　如今，我有些累了。
+
+　　我曾经无数次渴望，我重视的人伤心的时候，我能拍一拍他的背；又或者，在她烦闷或疼痛的时候，陪伴着聊天、倒一杯热水。
+
+　　我一直希望，而一直没有下文。
+
+　　这样的希冀与热情，我不知道还能持续多久。
+
+　　“人不能同时拥有青春和对青春的感受。”
+
+　　也许，“去爱”的这股热情，才叫青春，而不单单只是年龄。
+
+　　封闭自我与内心的那天，青春，大概就真的结束了吧。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2026 年 4 月 3 日
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/essays/casey-horner-dX9X0KTT42g-unsplash.jpg)
+
+> 摄影师・画师 | Casey Horner
+> 
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-高中的钢笔-md-627302685"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-高中的钢笔.md

<details>
<summary><code>+37 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\253\230\344\270\255\347\232\204\351\222\242\347\254\224.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\253\230\344\270\255\347\232\204\351\222\242\347\254\224.md"
new file mode 100644
index 000000000..43bdef41d
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\253\230\344\270\255\347\232\204\351\222\242\347\254\224.md"
@@ -0,0 +1,37 @@
+# 随记 - 高中的钢笔
+
+　　今天做作业，从笔袋里翻找了很久一只要用的笔，然后忽然怔住了。
+
+　　一只普通钢笔。黑色的。款型不好看。一直装在小袋子里。
+
+　　没舍得用。
+
+　　明明高一的时候就买下来了。
+
+　　不是我买的。
+
+　　一个日常的下午。跟高中那一千多天几乎没什么不同。
+
+　　拜托的懿，让她帮我买的钢笔。她出去逛街，玩儿，我则是因为懒不想去，待在教室写作业。
+
+　　傍晚的时候，她吓我一跳，从侧边伸出手问我要钱。大概19块，记不清了。
+
+　　旁边是岚。她的挚友兼闺蜜。也是我的好友。
+
+　　最终是岚挑选的，因为懿不懂钢笔。然后懿付的钱。
+
+<br />
+
+　　时至今日，我仍不敢用。
+
+　　胆小如鼠。
+
+　　也无所谓吧。
+
+　　十几块钱的钢笔本来就容易坏掉。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 6 月 6 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-高考前的干拌面-md-1520632437"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-高考前的干拌面.md

<details>
<summary><code>+39 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\253\230\350\200\203\345\211\215\347\232\204\345\271\262\346\213\214\351\235\242.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\253\230\350\200\203\345\211\215\347\232\204\345\271\262\346\213\214\351\235\242.md"
new file mode 100644
index 000000000..54023fb52
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\253\230\350\200\203\345\211\215\347\232\204\345\271\262\346\213\214\351\235\242.md"
@@ -0,0 +1,39 @@
+# 随记 - 高考前的干拌面
+
+　　去吃了一顿面条。没有多少汤。几乎是干拌面。
+
+　　吃着吃着，忽然有一瞬间觉得很熟悉。但又想不起来是什么。
+
+　　我看了看窗外，今天很冷，大雾弥漫。
+
+　　路灯光如墨水滴入水中一般，晕散在玻璃上，渗透出微微的黄。
+
+　　那时候可不是这样。我突然忆起来了。
+
+　　那是高考前夕，天蓝得通透，那是我唯一一次看到那般蓝到有些假的天。学校后面，校园广场，有一家面馆的老板我很熟悉。骆托我带份吃的。只有那个老板的店仍然开着。
+
+　　我从校园广场朝宿舍出发。炙热的光线将地面染成一片黄，我想买两根冰淇凌。
+
+　　现在想来那个时刻，如同梦中幻境一样美好。
+
+　　我去了他的宿舍。彼时他刚洗完澡，光着膀子，肩上搭一条毛巾出来吃东西。他要吃干拌面，建议我也试一下。那时我很讨厌这种面条做法，但还是同意了。
+
+　　手持式的那种风扇在长条桌上呼呼地转着。外面有着经典的夏天的温度和味道。
+
+　　他变魔法似的拿出两瓶怡宝。瓶子壁上面细密的水珠还没有聚成一起留下。
+
+　　那次面条什么味道我已经全然忘了，我只有一个印象：大概不如我想象中的那样坏。周围所有的一切，都像是在预示着有什么将会不一样。
+
+<br />
+
+　　我吃完，在食堂的座位上呆坐了很久。
+
+　　大学已经三年了。
+
+　　我得到了些什么，又失去了些什么？
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 12 月 26 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-黑白格子-md-2814159259"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-黑白格子.md

<details>
<summary><code>+51 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\273\221\347\231\275\346\240\274\345\255\220.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\273\221\347\231\275\346\240\274\345\255\220.md"
new file mode 100644
index 000000000..daed2b2f4
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\273\221\347\231\275\346\240\274\345\255\220.md"
@@ -0,0 +1,51 @@
+# 随记 - 黑白格子
+
+　　首先，要对那个跑在自己身后的女孩子说声抱歉。
+
+　　晚上跑步，室友两人一直聊游戏。没玩过，不参与，一人跑，跑外道。操场风景一如既往，在这里运动，总让人安心些。
+
+　　不知道几圈后，体力不支，匀速跑。这是最省力的办法。身后一直跟着一个女孩子，着一件黑白格长衬，运动长裤附腿，音乐约莫在耳朵里。
+
+　　她的步伐特征很明显，一听便知。跟了两三圈，不知什么时候，自己已经将她定为目标。
+
+　　这变化，是最重要的。
+
+　　**大莫是男孩子的那部分隐约闪烁**，便有了这样一个念头：想要一直领着她。这是傲慢，然而暗自思忖这想法并无坏处。释然。
+
+　　只是，当她累了，停下脚步开始走时， **心中便有什么线断开了**。觉知自己再跑下去没有意义。
+
+　　饶是如此，还是一直敦促着自己向前跑着。
+
+　　某一次落脚刹那，忽而想到了看过的东西。是然，一个宏大如科幻镜头的认知科学世界构筑起来。那些，都是自己看过的书，概览过的东西。
+
+　　忽然意识到，为何阿德勒强调“当下的你，与过去和环境没有任何关系，只是你想让他们产生关联”；
+
+　　意识到，为何许多心理学家视弗洛伊德和精神分析“决定论”为毒品；
+
+　　意识到，为何奖赏有时让人不思进取；
+
+　　意识到，相互依赖理论怎样给人以长足的动力。
+
+　　最终想到唯心论。我至今找不出唯心论哪里有致命的缺陷。
+
+　　乱七八糟地想着，看着这个陌生的女孩子再次超越自己。一瞬间笑了。
+
+　　“那就追上她吧。”我想。
+
+　　当自己超越她时，很注意自己不要乱想，只是静静地跑，看操场上的大灯，看明明灭灭的月亮。
+
+　　**然后，一步，一步地，离她远去。**
+
+　　停下奔跑的脚步，走了一圈，再没有找见那位黑白格子，只余下了操场上渐行渐稀的人群。
+
+　　这才是正常的自己。我想。
+
+　　里数最后定格在 5.57。
+
+　　已经很努力了。稍微放过自己吧。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2022 年 3 月 13 日
\ No newline at end of file

~~~~~

</details>

<a id="f-3737320117-src-生活碎笔-随笔随记-情感类随记-随记-鼎下的空气墙-md-4145229456"></a>
#### src/生活碎笔/随笔随记/情感类随记/随记-鼎下的空气墙.md

<details>
<summary><code>+93 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\274\216\344\270\213\347\232\204\347\251\272\346\260\224\345\242\231.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\274\216\344\270\213\347\232\204\347\251\272\346\260\224\345\242\231.md"
new file mode 100644
index 000000000..b0bdd5f13
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\346\203\205\346\204\237\347\261\273\351\232\217\350\256\260/\351\232\217\350\256\260-\351\274\216\344\270\213\347\232\204\347\251\272\346\260\224\345\242\231.md"
@@ -0,0 +1,93 @@
+# 随记 - 鼎下的空气墙
+
+　　因为昨天一直想把《当你像鸟飞往你的山》看完，所以就熬了很久的夜。最后看完睡下的时候已经是凌晨三点钟了。我记得曾经有谁说过一句话，叫做：“最接近成功的时候是最容易失去理智的时候”。
+
+　　我想它是正确的。
+
+　　今早睡眼朦胧地起床，收拾好，把昨天没有洗完的衣服继续洗了。
+
+　　还有杯子，也忘了洗了。不过就是这个原因，我才发现了一个有趣的事情。
+
+　　当我拿起洗洁精的时候，我发现它那翻起式的瓶盖外延上，有一层类似于东北大冬天里的象征性冰柱一样的东西。小小的，也没有那么坚硬，不过确实是很像。满满的一圈都是。大概是之前谁不小心在瓶盖上留下了一点液体吧。然后就成了如今的这副样子。
+
+　　当时我觉得挺好笑，因为我觉得那瓶洗洁精，它也是怕冷的，要不怎么会起这种冰柱呢。
+
+　　饶有兴致地盯着看了两眼，便丢在一边了。
+
+　　在洗衣服的时候，一边用手搓着衣服，一边百无聊赖地盯着阳台外边的风景看。
+
+　　忽然看到一只鸟。它以极快的速度冲了下来，然后快到池塘面附近时又骤然减速，然后滑翔而过，稳稳地停在池塘边沿的瓷砖上。
+
+　　只有那一只鸟，也说不定是鹅，我看不清。
+
+　　我觉得在学校里面看到这种情景很稀奇。
+
+　　视角拉近一点，我看见有一个男孩子骑着自行车，双手离开把手，揣在兜里取暖。但他依旧能控制方向。
+
+　　我觉得这个技能很帅。一直没学会过。
+
+　　虽说我觉得很危险。
+
+　　晚上兴冲冲跑去跳舞，那时候经常跳舞的地点已经关门了，我便跑去鼎那里。
+
+　　那里有灯光，虽说很昏暗，但是姑且能照亮着自己，给夜里孤独的舞者一点心理安慰。还有很大一块场地。
+
+　　但到了那个地方我才发现，那是一块分裂割据的地方。
+
+　　鼎下面有一个比较高的平台，齐人胸高，有一个女孩子把书和电脑放在那里，在朗读着什么。模模糊糊听见似乎是历史，而且是备考的那种死板规定好了的格式化历史。
+
+　　然后猛然惊觉现在是十一月中旬。
+
+　　已经这个时间了啊。
+
+　　不远处是一对情侣，坐在长石凳上，玩着手机，时不时传来快活的笑声。
+
+　　离读书的女孩大概两三步远，也是一对情侣，女孩子一直蹲着，长长的头发垂在地上，不知道发生了什么。男朋友似乎对她说了什么，她便泼浪鼓一样摇起头来。
+
+　　我这个时候竟然在想：这样扫来扫去，头发不会弄脏吗？
+
+　　旋即被自己这个想法逗笑。
+
+　　我音响当时开着，声音调得很小，只要再减下一格便完全静音。
+
+　　我寻觅着这块我视之为秘密基地的空地上，还有哪里能安顿下来释放自我。
+
+　　走了四个角落，发现无论怎样都会打扰到那个备考的女生，便放弃了。
+
+　　我驻足在右上角，怔了一下。
+
+　　因为我听到了两种声音，一种是风吹过不远处竹林的沙沙声，还有一种是，蹲在地上的那个女孩子哭泣的声音。
+
+　　坚定了我离开的决心。
+
+　　我临走前听到那个站着的男孩子焦急地喊：“快起来啦！”只有四个音调，但我听出了他的不知所措。
+
+　　鼎周围只有一个路灯，灯光黯淡，希望不会伤到读书女孩的眼睛。
+
+　　倦怠而愁苦的白色灯光，我觉得看起来很像那个男孩子的心情。
+
+　　我猜的。
+
+　　我想象了一下，如果我真在那么一块不大的空地上与他们共处，像是隔着一道空气墙那样，那个场景会是多么荒诞滑稽。
+
+　　中心的女孩正在借着灯光紧张备考背诵；右上角一个小心翼翼不敢开大声音的男孩子在跳舞，音乐动感却小声如耳语；左边一对情侣快活地笑着，把自己手机上有趣的东西拿给心上人看，不时做一些亲密举动；而贴近右下角的那对情侣，女孩子蹲在地上哭泣，长长的头发挡住了所有人的视线，男朋友站在一旁拉着她的手焦急地呼喊而又不知所措。
+
+　　我想起一句话。
+
+　　“人类的悲欢并不相通，我只觉得他们吵闹。”
+
+　　大概会是这样的感觉。
+
+<br />
+
+　　在冬天的夜里哈出一口气，摇摇头笑笑。
+
+　　我出发了。
+
+　　回去吧。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2021 年 11 月 19 日
\ No newline at end of file

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-13 12:28:12 CMT (UTC+8) | 2eef0b4eb）

### Summary

- Generated at: `2026-10-13 12:28:12 CMT (UTC+8)`
- Base commit: `2eef0b4eb`
- Diff source: `9c942e6f255e6aec88f857aaf69b4e1becadc427..2eef0b4eb6174e7d8b6ca349b059c06857ff2f2f`
- Changed files: `1`
- Total lines: `+1 / -1`

### Commit Messages

- `2eef0b4e` 随笔校对目录：2026-10-13

### Index

1. [src/SUMMARY.md](#f-987945327-src-summary-md-3501257646) `+1 / -1`

### Diffs

<a id="f-987945327-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+1 / -1</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index 5a0e5d194..2ab1f7b7a 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -269,7 +269,7 @@
     - [随记 - 2020 年 10 月 17 日](生活碎笔/随笔随记/情感类随记/随记-2020年10月17日.md)
     - [随记 - 2020 年 5 月 15 日](生活碎笔/随笔随记/情感类随记/随记-2020年5月15日.md)
   - [实用类随记](生活碎笔/随笔随记/实用类随记/实用类随记.md)
-    - [【AIGC待校对】别拿状态最好的一天，给以后的每一天定任务](生活碎笔/随笔随记/实用类随记/【AIGC待校对】别拿状态最好的一天，给以后的每一天定任务.md)
+    - [【AIGC人工校对】别拿状态最好的一天，给以后的每一天定任务](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】别拿状态最好的一天，给以后的每一天定任务.md)
     - [【AIGC人工校对】接受一次帮助，不必立刻还成等价交换](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】接受一次帮助，不必立刻还成等价交换.md)
     - [【AIGC人工校对】爱好接了单，连不想做的部分也要交付](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】爱好接了单，连不想做的部分也要交付.md)
     - [【AIGC人工校对】复盘的时候，别假装自己当时就知道结局](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】复盘的时候，别假装自己当时就知道结局.md)

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-13 12:24:07 CMT (UTC+8) | 9c942e6f2）

### Summary

- Generated at: `2026-10-13 12:24:07 CMT (UTC+8)`
- Base commit: `9c942e6f2`
- Diff source: `95b3d389bd943b936eb3c2fb908e09b617d42e1e..9c942e6f255e6aec88f857aaf69b4e1becadc427`
- Changed files: `1`
- Total lines: `+69 / -0`

### Commit Messages

- `9c942e6f` 每日实用类随记校对：2026.10.13

### Index

1. [src/生活碎笔/随笔随记/实用类随记/【AIGC人工校对】别拿状态最好的一天，给以后的每一天定任务.md](#f-1416328560-src-生活碎笔-随笔随记-实用类随记-aigc人工校对-别拿状态最好的一天-给以后的每一天定任务-md-1689770614) `+69 / -0`

### Diffs

<a id="f-1416328560-src-生活碎笔-随笔随记-实用类随记-aigc人工校对-别拿状态最好的一天-给以后的每一天定任务-md-1689770614"></a>
#### src/生活碎笔/随笔随记/实用类随记/【AIGC人工校对】别拿状态最好的一天，给以后的每一天定任务.md

<details>
<summary><code>+69 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\345\210\253\346\213\277\347\212\266\346\200\201\346\234\200\345\245\275\347\232\204\344\270\200\345\244\251\357\274\214\347\273\231\344\273\245\345\220\216\347\232\204\346\257\217\344\270\200\345\244\251\345\256\232\344\273\273\345\212\241.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\345\210\253\346\213\277\347\212\266\346\200\201\346\234\200\345\245\275\347\232\204\344\270\200\345\244\251\357\274\214\347\273\231\344\273\245\345\220\216\347\232\204\346\257\217\344\270\200\345\244\251\345\256\232\344\273\273\345\212\241.md"
new file mode 100644
index 000000000..eb07acabc
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\345\210\253\346\213\277\347\212\266\346\200\201\346\234\200\345\245\275\347\232\204\344\270\200\345\244\251\357\274\214\347\273\231\344\273\245\345\220\216\347\232\204\346\257\217\344\270\200\345\244\251\345\256\232\344\273\273\345\212\241.md"
@@ -0,0 +1,69 @@
+# 别拿状态最好的一天，给以后的每一天定任务
+
+<!-- daily-essay-id: 2026-10-13 -->
+
+<!-- wechat-digest: 持续要做的事，应当按普通日子里能反复完成的量来安排，并把进度要求与实际余力一起核对，避免将偶尔的超常发挥变成日后的固定欠账。 -->
+
+　　有一种计划，从制定的那一刻起，就已经高估了自己。依据还特别充分：我明明做到过。
+
+　　周末睡足了，下午没有别的安排，读了一百页书。于是决定，以后每天都读一百页，一个月能读多少本，一年能读多少本，算得清清楚楚。
+
+　　星期一晚上，吃完饭，洗好衣服，终于坐下来翻书。读到三十页，眼睛已经开始往时钟上瞟。
+
+　　今天怎么连一半都不行？
+
+　　可是，周末的那次成绩，还带着一个完整的下午、一觉睡醒的精神，以及没人催你去做别的事。这些条件也参与了那一百页。
+
+　　留下来的，只有一个看起来属于个人能力的数字。
+
+　　能做到一次，当然说明有这个能力。但是让你做到这件事的条件，明天还在不在？
+
+　　我觉得，很多自我要求之所以越执行越累，就在于把偶尔出现的好状态，当成了此后不许跌破的标准。最好的一天刚结束，就被拿去追责所有普通的日子。
+
+　　照这个办法生活，你进步一次，反而给自己涨一次任务。
+
+　　读书如此，整理房间、练乐器、写东西也一样。某天兴致好，一口气做了很多，本来可以高兴一下，结果第二天得先证明，自己没有比昨天退步。
+
+　　**一次做得多，可以是一件好事，不必自动变成明天的最低要求。**
+
+　　当然，想把事情持续做下去，总要有个安排。完全看心情，可能一连几天都想不起来。这时候，与其翻出自己最厉害的那次，不如回头看看几个平常的晚上。
+
+　　吃饭、通勤、家务都照常发生，没有额外挤掉睡觉的时间，最后还能做多少？这个量不在多少，在于它更接近你真正能拿出来用的时间。
+
+　　比如一百页读不完，三十页能不能读进去？如果三十页也只是眼睛扫过去，第二天说不出看了什么，那就再看看，是书太难，时段不合适，还是今天确实没力气。
+
+　　数字只是用来帮你安排事情，没必要为了让数字好看，把事情本身做空了。
+
+　　麻烦在于，承认平常能做的量不多，就得顺便承认，完成可能比想象中慢。原本打算这个月读完的几本书，也许要往后放。
+
+　　有期限的事情，慢下来以后甚至可能来不及。但计划上写得多，并不会因此多出一个下午。如果实际余力和目标差得很远，就需要重新腾时间、减少其他安排，或者调整要完成的范围。总有一处要真的变动。
+
+　　只提高对自己的要求，却保留原来的全部日程，最后多半只能到晚上临时找时间。今天晚睡一点，明天再补一点，原本想每天做的事，渐渐变成每天都欠着的事。
+
+　　而且越欠，越难重新坐下来。
+
+　　今天本来只要读三十页，一想到昨天还差七十页，眼前突然就变成了一百页。再想想前天，干脆连书都不翻了。
+
+　　**账本倒是非常认真，学习却停了。**
+
+　　如果只是自己安排的日常阅读，漏掉的量可以不逐日追补。下一次按正常的量继续，隔一段时间再看整体进度。想读完的书仍然在那里，不会因为你取消了惩罚性的补课就消失。
+
+　　如果有考试或者已经答应了别人交付，那就把剩下的工作重新分配，必要时提前商量变动。这里需要处理的，是接下来怎么办，而不是证明自己应该为昨天付出多少额外辛苦。
+
+　　也有人会担心，任务定得低，会不会一直停在那里？
+
+　　**可以加，但不妨等普通日子里也连续做得从容一点，再加一点试试。** 看看增加之后，其他事情有没有被挤掉，自己是不是又开始靠临时硬撑。能维持，再把它留下来。
+
+　　这样得到的提高，至少经过了几天真实生活的检验，不只是周末某一次兴奋时的自我评价。
+
+　　状态特别好的时候，当然仍然可以多做。读得投入，多读几十页；写得顺，多写一段。享受那次顺利就行，不必当场宣布今后都要如此。
+
+　　下次安排一个需要长期做的事情，先找一个普通的星期一晚上，看看它放不放得进去。
+
+　　**周末那个精神充足的自己，可以来帮忙。只是别把此后每一天的任务，全指望他来完成。**
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2026 年 10 月 13 日

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-13 06:31:18 CMT (UTC+8) | 95b3d389b）

### Summary

- Generated at: `2026-10-13 06:31:18 CMT (UTC+8)`
- Base commit: `95b3d389b`
- Diff source: `f82ce2aa43fed0382fc286060c0e0bb7a621d14e..95b3d389bd943b936eb3c2fb908e09b617d42e1e`
- Changed files: `2`
- Total lines: `+68 / -0`

### Commit Messages

- `95b3d389` 随笔初稿：别拿状态最好的一天，给以后的每一天定任务

### Index

1. [src/SUMMARY.md](#f-406773431-src-summary-md-3501257646) `+1 / -0`
2. [src/生活碎笔/随笔随记/实用类随记/【AIGC待校对】别拿状态最好的一天，给以后的每一天定任务.md](#f-406773431-src-生活碎笔-随笔随记-实用类随记-aigc待校对-别拿状态最好的一天-给以后的每一天定任务-md-714042844) `+67 / -0`

### Diffs

<a id="f-406773431-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+1 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index be0fa03a5..5a0e5d194 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -269,6 +269,7 @@
     - [随记 - 2020 年 10 月 17 日](生活碎笔/随笔随记/情感类随记/随记-2020年10月17日.md)
     - [随记 - 2020 年 5 月 15 日](生活碎笔/随笔随记/情感类随记/随记-2020年5月15日.md)
   - [实用类随记](生活碎笔/随笔随记/实用类随记/实用类随记.md)
+    - [【AIGC待校对】别拿状态最好的一天，给以后的每一天定任务](生活碎笔/随笔随记/实用类随记/【AIGC待校对】别拿状态最好的一天，给以后的每一天定任务.md)
     - [【AIGC人工校对】接受一次帮助，不必立刻还成等价交换](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】接受一次帮助，不必立刻还成等价交换.md)
     - [【AIGC人工校对】爱好接了单，连不想做的部分也要交付](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】爱好接了单，连不想做的部分也要交付.md)
     - [【AIGC人工校对】复盘的时候，别假装自己当时就知道结局](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】复盘的时候，别假装自己当时就知道结局.md)

~~~~~

</details>

<a id="f-406773431-src-生活碎笔-随笔随记-实用类随记-aigc待校对-别拿状态最好的一天-给以后的每一天定任务-md-714042844"></a>
#### src/生活碎笔/随笔随记/实用类随记/【AIGC待校对】别拿状态最好的一天，给以后的每一天定任务.md

<details>
<summary><code>+67 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\345\276\205\346\240\241\345\257\271\343\200\221\345\210\253\346\213\277\347\212\266\346\200\201\346\234\200\345\245\275\347\232\204\344\270\200\345\244\251\357\274\214\347\273\231\344\273\245\345\220\216\347\232\204\346\257\217\344\270\200\345\244\251\345\256\232\344\273\273\345\212\241.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\345\276\205\346\240\241\345\257\271\343\200\221\345\210\253\346\213\277\347\212\266\346\200\201\346\234\200\345\245\275\347\232\204\344\270\200\345\244\251\357\274\214\347\273\231\344\273\245\345\220\216\347\232\204\346\257\217\344\270\200\345\244\251\345\256\232\344\273\273\345\212\241.md"
new file mode 100644
index 000000000..d9f301fee
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\345\276\205\346\240\241\345\257\271\343\200\221\345\210\253\346\213\277\347\212\266\346\200\201\346\234\200\345\245\275\347\232\204\344\270\200\345\244\251\357\274\214\347\273\231\344\273\245\345\220\216\347\232\204\346\257\217\344\270\200\345\244\251\345\256\232\344\273\273\345\212\241.md"
@@ -0,0 +1,67 @@
+# 别拿状态最好的一天，给以后的每一天定任务
+
+<!-- daily-essay-id: 2026-10-13 -->
+
+<!-- wechat-digest: 持续要做的事，应当按普通日子里能反复完成的量来安排，并把进度要求与实际余力一起核对，避免将偶尔的超常发挥变成日后的固定欠账。 -->
+
+　　有一种计划，从制定的那一刻起，就已经高估了自己。依据还特别充分：我明明做到过。
+
+　　周末睡足了，下午没有别的安排，读了一百页书。于是决定，以后每天都读一百页，一个月能读多少本，一年能读多少本，算得清清楚楚。
+
+　　星期一晚上，吃完饭，洗好衣服，终于坐下来翻书。读到三十页，眼睛已经开始往时钟上瞟。
+
+　　这时你想到的可能是：周末一百页都不费劲，今天怎么连一半都不行？
+
+　　可是，周末的那次成绩，还带着一个完整的下午、一觉睡醒的精神，以及没人催你去做别的事。这些条件也参与了那一百页，只是在制定计划的时候，被一起省略掉了。
+
+　　留下来的，只有一个看起来属于个人能力的数字。
+
+　　能做到一次，当然说明你有这个能力。但要把它变成每天的安排，还得回答另一个问题：让你做到这件事的条件，明天还在不在？
+
+　　我觉得，很多自我要求之所以越执行越累，就在于把偶尔出现的好状态，当成了此后不许跌破的标准。最好的一天刚结束，就被拿去追责所有普通的日子。
+
+　　照这个办法生活，你进步一次，反而给自己涨一次任务。
+
+　　读书如此，整理房间、练乐器、写东西也一样。某天兴致好，一口气做了很多，本来可以高兴一下，结果第二天得先证明，自己没有比昨天退步。
+
+　　**一次做得多，可以是一件好事，不必自动变成明天的最低要求。**
+
+　　当然，想把事情持续做下去，总要有个安排。完全看心情，可能一连几天都想不起来。这时候，与其翻出自己最厉害的那次，不如回头看看几个平常的晚上。
+
+　　吃饭、通勤、家务都照常发生，没有额外挤掉睡觉的时间，最后还能做多少？这个量不一定漂亮，但它更接近你真正能拿出来用的时间。
+
+　　比如一百页读不完，三十页能不能读进去？如果三十页也只是眼睛扫过去，第二天说不出看了什么，那就再看看，是书太难，时段不合适，还是今天确实没力气。
+
+　　数字只是用来帮你安排事情，没必要为了让数字好看，把事情本身做空了。
+
+　　麻烦在于，承认平常能做的量不多，就得顺便承认，完成可能比想象中慢。原本打算这个月读完的几本书，也许要往后放。
+
+　　这个代价确实存在，不能用一句“慢慢来就好”糊弄过去。有期限的事情，慢下来以后甚至可能来不及。
+
+　　可计划上写得多，并不会因此多出一个下午。如果实际余力和目标差得很远，就需要重新腾时间、减少其他安排，或者调整要完成的范围。总有一处要真的变动。
+
+　　只提高对自己的要求，却保留原来的全部日程，最后多半只能到晚上临时找时间。今天晚睡一点，明天再补一点，原本想每天做的事，渐渐变成每天都欠着的事。
+
+　　而且越欠，越难重新坐下来。
+
+　　今天本来只要读三十页，一想到昨天还差七十页，眼前突然就变成了一百页。再想想前天，干脆连书都不翻了。账本倒是非常认真，学习却停了。
+
+　　如果只是自己安排的日常阅读，漏掉的量可以不逐日追补。下一次按正常的量继续，隔一段时间再看整体进度。想读完的书仍然在那里，不会因为你取消了惩罚性的补课就消失。
+
+　　如果有考试或者已经答应了别人交付，那就把剩下的工作重新分配，必要时提前商量变动。这里需要处理的，是接下来怎么办，而不是证明自己应该为昨天付出多少额外辛苦。
+
+　　也有人会担心，任务定得低，会不会一直停在那里？
+
+　　可以加，但不妨等普通日子里也连续做得从容一点，再加一点试试。看看增加之后，其他事情有没有被挤掉，自己是不是又开始靠临时硬撑。能维持，再把它留下来。
+
+　　这样得到的提高，至少经过了几天真实生活的检验，不只是周末某一次兴奋时的自我评价。
+
+　　状态特别好的时候，当然仍然可以多做。读得投入，多读几十页；写得顺，多写一段。享受那次顺利就行，不必当场宣布今后都要如此。
+
+　　下次安排一个需要长期做的事情，先找一个普通的星期一晚上，看看它放不放得进去。
+
+　　周末那个精神充足的自己，可以来帮忙。只是别把此后每一天的任务，全指望他来完成。
+
+南国微雪 Miyuki
+
+2026 年 10 月 13 日

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-12 12:50:50 CMT (UTC+8) | f82ce2aa4）

### Summary

- Generated at: `2026-10-12 12:50:50 CMT (UTC+8)`
- Base commit: `f82ce2aa4`
- Diff source: `78fea4fb09b00f5e03ad0543d2f94c84bd8b4600..f82ce2aa43fed0382fc286060c0e0bb7a621d14e`
- Changed files: `1`
- Total lines: `+1 / -1`

### Commit Messages

- `f82ce2aa` 随笔校对目录：2026-10-12

### Index

1. [src/SUMMARY.md](#f-3055637888-src-summary-md-3501257646) `+1 / -1`

### Diffs

<a id="f-3055637888-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+1 / -1</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index 3c609d5b4..be0fa03a5 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -269,7 +269,7 @@
     - [随记 - 2020 年 10 月 17 日](生活碎笔/随笔随记/情感类随记/随记-2020年10月17日.md)
     - [随记 - 2020 年 5 月 15 日](生活碎笔/随笔随记/情感类随记/随记-2020年5月15日.md)
   - [实用类随记](生活碎笔/随笔随记/实用类随记/实用类随记.md)
-    - [【AIGC待校对】接受一次帮助，不必立刻还成等价交换](生活碎笔/随笔随记/实用类随记/【AIGC待校对】接受一次帮助，不必立刻还成等价交换.md)
+    - [【AIGC人工校对】接受一次帮助，不必立刻还成等价交换](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】接受一次帮助，不必立刻还成等价交换.md)
     - [【AIGC人工校对】爱好接了单，连不想做的部分也要交付](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】爱好接了单，连不想做的部分也要交付.md)
     - [【AIGC人工校对】复盘的时候，别假装自己当时就知道结局](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】复盘的时候，别假装自己当时就知道结局.md)
     - [【AIGC人工校对】留着备用的东西，也在占用你现在的生活](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】留着备用的东西，也在占用你现在的生活.md)

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-12 12:46:30 CMT (UTC+8) | 78fea4fb0）

### Summary

- Generated at: `2026-10-12 12:46:30 CMT (UTC+8)`
- Base commit: `78fea4fb0`
- Diff source: `8186e6b404010f34dde4eba343eecc3bd95b060b..78fea4fb09b00f5e03ad0543d2f94c84bd8b4600`
- Changed files: `1`
- Total lines: `+63 / -0`

### Commit Messages

- `78fea4fb` 每日实用类随记校对：2026.10.12

### Index

1. [src/生活碎笔/随笔随记/实用类随记/【AIGC人工校对】接受一次帮助，不必立刻还成等价交换.md](#f-3581593091-src-生活碎笔-随笔随记-实用类随记-aigc人工校对-接受一次帮助-不必立刻还成等价交换-md-3540879356) `+63 / -0`

### Diffs

<a id="f-3581593091-src-生活碎笔-随笔随记-实用类随记-aigc人工校对-接受一次帮助-不必立刻还成等价交换-md-3540879356"></a>
#### src/生活碎笔/随笔随记/实用类随记/【AIGC人工校对】接受一次帮助，不必立刻还成等价交换.md

<details>
<summary><code>+63 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\346\216\245\345\217\227\344\270\200\346\254\241\345\270\256\345\212\251\357\274\214\344\270\215\345\277\205\347\253\213\345\210\273\350\277\230\346\210\220\347\255\211\344\273\267\344\272\244\346\215\242.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\346\216\245\345\217\227\344\270\200\346\254\241\345\270\256\345\212\251\357\274\214\344\270\215\345\277\205\347\253\213\345\210\273\350\277\230\346\210\220\347\255\211\344\273\267\344\272\244\346\215\242.md"
new file mode 100644
index 000000000..bb1e8d413
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\346\216\245\345\217\227\344\270\200\346\254\241\345\270\256\345\212\251\357\274\214\344\270\215\345\277\205\347\253\213\345\210\273\350\277\230\346\210\220\347\255\211\344\273\267\344\272\244\346\215\242.md"
@@ -0,0 +1,63 @@
+# 接受一次帮助，不必立刻还成等价交换
+
+<!-- daily-essay-id: 2026-10-12 -->
+
+<!-- wechat-digest: 朋友之间的照应可以认真感谢、慢慢回应，不必每次都立刻折算回报；分清明确的费用与自愿的帮助，才能既尊重对方，也保留自己的边界。 -->
+
+　　别人帮了一点忙，马上想办法还回去，未必总能让双方更轻松。
+
+　　比如朋友顺路把你送到车站。下车后，你想买杯咖啡谢谢他，他说不用，刚喝过。你又问晚饭吃了没有，非要请一顿。他说晚上约了人，你只好打开聊天软件，转一笔钱过去。
+
+　　对方还得点退回，再解释一遍，真的是顺路。
+
+　　车已经开出去，人情还在车站门口拉扯。
+
+　　想感谢没有问题。但到了这一步，可以停下来想想：对方现在需要这杯咖啡、这顿饭，还是自己急着让心里那笔账归零？
+
+　　我觉得，朋友之间有一种辛苦，是连接受好意都必须当场证明自己不会占便宜。谢意还没说完，已经开始寻找等价的回报，好像暂时没有东西还回去，就没有资格被照顾。
+
+　　可对方也许只是看见你拖着箱子不方便，愿意多开一小段路。你认真说一句谢谢，告诉他这次确实省了不少事，就已经可以了，总不能吝啬到谢谢和夸奖都不愿意说吧。谢谢和夸奖都不愿意说，但是愿意对等还回去做事情的人，反正我是没怎么看到。
+
+　　非要再添上一个他并不需要的安排，反倒多了一件需要双方协商的事情。
+
+　　**这里最容易混淆的，是感谢和结算。**
+
+　　说好分摊的车费、托人垫付的钱，及时处理就好。朋友明确花了一下午帮忙搬家，你也该看见那份辛苦，提前商量餐食、交通和怎么安排才方便。别拿“咱俩什么关系”把别人的付出一笔带过。
+
+　　但自愿的照应，并不总有一个需要马上结清的数额。别人替你扶了一下门，你不必追着他再扶一次；朋友在你手忙脚乱时替你拿了东西，也不用立刻制造一个机会，把这次帮助原样奉还。
+
+　　**认真对待别人的付出，和立刻还上同样多的东西，是两回事。**
+
+　　关系里可做的事情，本来就不对称。今天你有车，他没有；下次他熟悉某个地方，你正好要去。再往后，也许谁都没什么事要帮，只是坐下来聊聊天。
+
+　　**如果每一次都必须在当天找到同等分量的回报，许多很自然的来往就会变得局促。尤其当一个人暂时没什么余力时，他可能连小忙都不敢开口，因为已经预支了之后该怎么还的焦虑。**
+
+　　当然，这种谨慎不一定凭空而来。有的人确实遇到过：当时说举手之劳，后来提起却像一张随时可以拿出来的账单。受过这种教训，不愿欠人情，很能理解。
+
+　　所以也不用逼自己对所有好意都敞开。重要的是看看眼前这个人怎样回应你的界限。
+
+　　你说这周没空，对方能不能接受？你拒绝一个不合适的请求，他会不会拿上次的帮忙来压你？如果每次接受一点照顾，都要附带交出以后说不的权利，那就有理由少接受一点，把来往说得更清楚。
+
+　　同样，回了一顿饭，也不能保证从此没有任何拉扯。遇到喜欢翻账的人，你很难靠不断补足回报，让对方宣布两清。该讲清楚的边界，还是得讲。
+
+　　反过来，对方已经说了不需要，你可以尊重这句话。记得他的好意，等到他确实需要、自己也方便的时候再做一点什么，比执意塞给他一份回礼更贴心。
+
+　　说是这么说，不过也不一定必须要别人先开口的。知道朋友最近忙，约见时挑离他近一点的地方；他帮你找到了合适的资料，事情办完后告诉他结果。回应可以很具体，不一定都要变成一次消费。
+
+　　尤其别为了还一个小忙，顺口许下很大的承诺：“以后有事尽管找我，什么都行。”当时想表达的是感谢，后来真有做不到的事，还得解释自己为什么食言。
+
+　　能做多少，就说多少。感谢不必把未来的自己全押出去。而且有保留的感谢，才显得有分量（因为知道分寸，无论对方和自己都是）。
+
+　　轮到自己帮别人，也可以把话说清楚。如果确实顺路，接受一句谢谢就好；如果需要对方分摊费用，就提前讲。别一边拒绝所有回报，一边悄悄考核别人够不够懂事。
+
+　　**人情一旦全靠猜，就很难轻松。**
+
+　　下次朋友送你到车站，先把箱子拿好，认真道谢。想请咖啡，可以问一句；他说刚喝过，那就让这句话算数。
+
+　　这次收下他的照应，下次见面照常聊天。你不必为了证明自己是个值得来往的人，把刚刚得到的那点方便，立刻还成另一场忙碌。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2026 年 10 月 12 日

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

