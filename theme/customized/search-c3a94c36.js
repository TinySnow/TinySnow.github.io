/* ===========================================================================
 * 微雪博客 · 自建 Algolia 搜索下拉面板
 * ---------------------------------------------------------------------------
 * 为什么不用 @docsearch/js：
 *   DocSearch v3 每次查询只请求 hitsPerPage: 20 条，再在客户端按
 *   maxResultsPerGroup（默认 5）切片，且没有任何分页；命中再多也看不到后面。
 *   这里用 @algolia/autocomplete-js 自建下拉，支持「加载更多」逐页追加，
 *   可以一直翻到最后一页。
 *
 * 依赖（见 theme/index.hbs，必须在 additional-js 之前引入）：
 *   https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js@1.19.12/dist/umd/index.production.js
 *   → window['@algolia/autocomplete-js']
 * 查询直接走 Algolia 的 POST /1/indexes/{index}/query，所以不需要再引入
 * algoliasearch 客户端，也就没有 v4（返回 {results}）与 v5（返回数组）的歧义。
 * =========================================================================== */
(function () {
    'use strict';

    var CONFIG = {
        appId: 'GX9RTL51BH',
        apiKey: 'c4caea4202132489213a6c5366c9952d',
        indexName: 'tinysnowio',
        container: '#docsearch',
        placeholder: '搜索 / Search',

        /* 每次「加载更多」追加多少条 */
        perPage: 20,

        /* ---- 查询处理（都在客户端做）----
         * 引擎对中文是「按单字」切分的：实测把 indexLanguages/queryLanguages 设成
         * ["zh","en"] 并重建索引后依旧如此——查「重装系统」的 _rankingInfo.words
         * 恒为 4（重/装/系/统），查询中间加空格也一样。于是：
         *   1. cleanQuery：先把中文虚词去掉，否则「怎么重装系统」会变成 6 个单字的
         *      AND，正确页面因为没有「怎么」反而不满足，前几条全是无关文章；
         *      清洗成「重装系统」后前三名正好是三篇重装系统文章（实测）。
         *   2. preferWordAttributes：优先只搜爬虫写的「按词」属性
         *      （content_words / hierarchy_words）。实测 52 条精确短语：top1 从 15
         *      涨到 33、进不了前 20 的从 14 降到 5；而只搜按字原文属性的成绩与基线
         *      完全相同（拖后腿的是它）。若一条都没命中，会自动退回「原查询 + 全部属性」。 */
        cleanQuery: true,
        preferWordAttributes: true,
        wordAttributes: [
            'hierarchy_words.lvl0', 'hierarchy_words.lvl1', 'hierarchy_words.lvl2',
            'hierarchy_words.lvl3', 'hierarchy_words.lvl4', 'hierarchy_words.lvl5',
            'hierarchy_words.lvl6', 'content_words'
        ],

        /* 自建面板初始化失败时，退回 DocSearch 弹窗（每页条数已提高） */
        fallbackToDocSearch: true
    };

    /* ===================== 中文查询分词 ===================== */
    /* 与爬虫端 assets/algolia-crawler-config.js 使用同一套 ICU 规则，
     * 保证查询和索引切出来的词一致。 */
    var segmenter = (function () {
        try {
            if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
                return new Intl.Segmenter('zh-Hans', { granularity: 'word' });
            }
        } catch (e) { /* 环境不支持就不分词 */ }
        return null;
    })();
    var HAS_CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;

    /* 单字虚词：作为独立词出现时丢掉（不用正则，避免误伤「上海」里的「上」） */
    var STOP_CHARS = '的了是在和与及也就都很更最又还只把被给对从到向着并而或但如果因为所以之其此该等';
    /* 多字虚词：ICU 会把它们切成一个词，按词整体丢掉 */
    var STOP_WORDS = {
        '怎么': 1, '怎样': 1, '如何': 1, '什么': 1, '为什么': 1, '哪个': 1, '哪些': 1,
        '可以': 1, '能否': 1, '是否': 1, '这个': 1, '那个': 1, '这些': 1, '那些': 1,
        '我们': 1, '你们': 1, '他们': 1, '就是': 1, '还是': 1, '只是': 1, '不是': 1,
        '因为': 1, '所以': 1, '但是': 1, '不过': 1, '如果': 1, '需要': 1, '应该': 1,
        '一个': 1, '一种': 1, '一下': 1, '一些': 1, '一直': 1, '已经': 1, '正在': 1,
        '以及': 1, '并且': 1, '或者': 1, '然后': 1, '这样': 1, '那样': 1, '多少': 1,
        '时候': 1, '现在': 1, '开始': 1, '进行': 1, '关于': 1, '对于': 1, '由于': 1
    };

    /* 把用户输入变成更容易命中的查询；不需要清洗时返回 null（表示按原样发送） */
    function analyzeQuery(text) {
        if (!CONFIG.cleanQuery || !segmenter || !HAS_CJK.test(text)) {
            return null;
        }
        var parts = Array.from(segmenter.segment(text));
        var words = [];
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (!part.isWordLike) {
                continue;
            }
            var word = part.segment;
            if (STOP_WORDS[word]) {
                continue;
            }
            if (word.length === 1 && STOP_CHARS.indexOf(word) !== -1) {
                continue;
            }
            words.push(word);
        }
        if (!words.length) {
            return null;      // 全是虚词，别清洗，直接按原样查
        }
        var out = words.join(' ');
        return out === text ? null : out;
    }

    /* ===================== Algolia 查询 ===================== */
    function searchUrl() {
        return 'https://' + CONFIG.appId + '-dsn.algolia.net/1/indexes/'
            + encodeURIComponent(CONFIG.indexName) + '/query';
    }

    function fetchPage(query, page, useWordAttributes) {
        var payload = {
            query: query,
            hitsPerPage: CONFIG.perPage,
            page: page,
            attributesToRetrieve: ['hierarchy', 'content', 'url', 'url_without_anchor', 'anchor', 'type'],
            attributesToHighlight: ['hierarchy'],
            attributesToSnippet: ['content:24'],
            highlightPreTag: '<mark>',
            highlightPostTag: '</mark>',
            snippetEllipsisText: '…'
        };
        if (useWordAttributes && CONFIG.preferWordAttributes) {
            payload.restrictSearchableAttributes = CONFIG.wordAttributes;
        }
        var init = {
            method: 'POST',
            headers: {
                'X-Algolia-Application-Id': CONFIG.appId,
                'X-Algolia-API-Key': CONFIG.apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
            init.signal = AbortSignal.timeout(15000);
        }
        return fetch(searchUrl(), init).then(function (res) {
            if (!res.ok) {
                throw new Error('Algolia 返回 HTTP ' + res.status);
            }
            return res.json();
        });
    }

    /* ===================== 分页状态 ===================== */
    /* sent：实际发给 Algolia 的查询（可能是清洗过的）
     * mode：'words' = 只搜按词属性；'all' = 搜全部属性 */
    var store = { query: '', sent: '', mode: '', page: 0, hits: [], nbHits: 0 };

    function resetStore(query) {
        store = { query: query, sent: '', mode: '', page: 0, hits: [], nbHits: 0 };
    }

    function mergeHits(list) {
        var seen = Object.create(null);
        var merged = [];
        list.forEach(function (hit) {
            if (!hit || !hit.objectID || seen[hit.objectID]) {
                return;
            }
            seen[hit.objectID] = true;
            merged.push(hit);
        });
        return merged;
    }

    /* ===================== 渲染 ===================== */
    /* 优先用 Algolia 的高亮结果：它已经做过 HTML 转义，只额外插入 <mark>；
     * 爬虫存进索引的层级文本本身也是实体转义过的，所以可以安全地当 HTML 用。 */
    function levelHtml(item, level) {
        var hl = item._highlightResult && item._highlightResult.hierarchy;
        if (hl && hl[level] && hl[level].value) {
            return hl[level].value;
        }
        var raw = item.hierarchy && item.hierarchy[level];
        return raw ? String(raw) : '';
    }

    function renderLoadMore(item, html) {
        return html`<div class="aa-ItemContent md-search-more">
            <div class="aa-ItemContentBody">
                <div class="aa-ItemContentTitle">加载更多（已显示 ${String(item.shown)} / 共 ${String(item.total)} 条）</div>
            </div>
        </div>`;
    }

    function renderNotice(text, html) {
        return html`<div class="aa-ItemContent md-search-notice">
            <div class="aa-ItemContentBody">
                <div class="aa-ItemContentTitle">${text}</div>
            </div>
        </div>`;
    }

    function renderHit(item, html) {
        var title = levelHtml(item, 'lvl1') || levelHtml(item, 'lvl0') || '(无标题)';
        var path = [];
        ['lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'].forEach(function (level) {
            var value = levelHtml(item, level);
            if (value) {
                path.push(value);
            }
        });
        var snippet = item._snippetResult && item._snippetResult.content
            && item._snippetResult.content.value;
        var pathText = path.join(' › ');

        return html`<a class="aa-ItemLink" href="${item.url}">
            <div class="aa-ItemContent">
                <div class="aa-ItemIcon aa-ItemIcon--noBorder md-search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                </div>
                <div class="aa-ItemContentBody">
                    <div class="aa-ItemContentTitle" dangerouslySetInnerHTML=${ { __html: title } }></div>
                    ${pathText ? html`<div class="aa-ItemContentDescription md-search-path" dangerouslySetInnerHTML=${ { __html: pathText } }></div>` : null}
                    ${snippet ? html`<div class="aa-ItemContentDescription md-search-snippet" dangerouslySetInnerHTML=${ { __html: snippet } }></div>` : null}
                </div>
            </div>
        </a>`;
    }

    /* ===================== 数据源 ===================== */
    function buildSources(params) {
        var query = (params.query || '').trim();
        if (!query) {
            return [];
        }
        return [{
            sourceId: 'tinysnowio',
            getItems: function () {
                if (store.query !== query) {
                    resetStore(query);
                }
                if (!store.sent) {
                    store.sent = analyzeQuery(query) || query;   // 清洗虚词，返回 null 就用原查询
                    store.mode = 'words';
                }
                var page = store.page;

                function collect(data) {
                    store.hits = mergeHits(store.hits.concat((data && data.hits) || []));
                    if (data && typeof data.nbHits === 'number') {
                        store.nbHits = data.nbHits;
                    }
                    var items = store.hits.slice();
                    if (items.length > 0 && items.length < store.nbHits) {
                        items.push({
                            __loadMore: true,
                            objectID: '__load_more__',
                            shown: items.length,
                            total: store.nbHits
                        });
                    }
                    return items;
                }

                return fetchPage(store.sent, page, store.mode === 'words').then(function (data) {
                    /* 查询已经变了，丢掉过期结果 */
                    if (store.query !== query) {
                        return [];
                    }
                    /* 只搜「按词」属性一条都没命中 → 退回「原查询 + 全部属性」再试一次 */
                    if (page === 0 && store.mode === 'words' && data && data.nbHits === 0) {
                        store.mode = 'all';
                        store.sent = query;
                        return fetchPage(query, 0, false).then(function (fallback) {
                            if (store.query !== query) {
                                return [];
                            }
                            return collect(fallback);
                        });
                    }
                    return collect(data);
                }).catch(function (err) {
                    if (window.console && console.warn) {
                        console.warn('[search] 查询失败：', err);
                    }
                    return [{ __notice: true, objectID: '__search_error__', text: '搜索服务暂时不可用，请稍后再试' }];
                });
            },
            templates: {
                header: function (props) {
                    if (!store.nbHits) {
                        return null;
                    }
                    return props.html`<div class="md-search-count">共 ${String(store.nbHits)} 条命中</div>`;
                },
                item: function (props) {
                    var item = props.item;
                    if (!item) {
                        return null;
                    }
                    if (item.__loadMore) {
                        return renderLoadMore(item, props.html);
                    }
                    if (item.__notice) {
                        return renderNotice(item.text, props.html);
                    }
                    return renderHit(item, props.html);
                },
                noResults: function () {
                    return '没有找到结果';
                }
            },
            onSelect: function (p) {
                var item = p.item || {};
                if (p.event && typeof p.event.preventDefault === 'function') {
                    p.event.preventDefault();
                }
                if (item.__loadMore) {
                    store.page = store.page + 1;
                    if (typeof p.refresh === 'function') {
                        p.refresh();
                    }
                    return;
                }
                if (item.__notice) {
                    return;
                }
                if (item.url) {
                    window.location.href = item.url;
                }
            }
        }];
    }

    /* ===================== 启动 ===================== */
    function mountDocSearchFallback() {
        if (!CONFIG.fallbackToDocSearch || typeof window.docsearch !== 'function') {
            return;
        }
        try {
            window.docsearch({
                appId: CONFIG.appId,
                apiKey: CONFIG.apiKey,
                indexName: CONFIG.indexName,
                container: CONFIG.container,
                debug: false,
                /* DocSearch 的默认值：抓 20 条、每组只渲染 5 条。这里都提高。 */
                searchParameters: { hitsPerPage: 40 },
                maxResultsPerGroup: 20
            });
        } catch (e) {
            if (window.console && console.error) {
                console.error('[search] DocSearch 兜底也失败了：', e);
            }
        }
    }

    function boot() {
        var container = document.querySelector(CONFIG.container);
        if (!container) {
            return;
        }
        var AC = window['@algolia/autocomplete-js'];
        if (!AC || typeof AC.autocomplete !== 'function' || typeof window.fetch !== 'function') {
            mountDocSearchFallback();
            return;
        }
        try {
            AC.autocomplete({
                container: container,
                placeholder: CONFIG.placeholder,
                openOnFocus: false,
                getSources: buildSources
            });
        } catch (e) {
            if (window.console && console.error) {
                console.error('[search] 自建面板初始化失败，退回 DocSearch：', e);
            }
            mountDocSearchFallback();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
