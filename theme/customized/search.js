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

        /* 中文查询分词：
         * 索引里的 content_words / hierarchy_words 生效后再改成 true
         * （判断方法见 assets/algolia-crawler.md 的「怎么验证分词真的生效了」）。
         * 现在是 false，查询按原样发送，与改造前的检索行为一致。 */
        segmentQuery: false,

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

    function segmentQueryZh(text) {
        if (!CONFIG.segmentQuery || !segmenter || !HAS_CJK.test(text)) {
            return text;
        }
        var words = [];
        Array.prototype.forEach.call(Array.from(segmenter.segment(text)), function (part) {
            if (part.isWordLike) {
                words.push(part.segment);
            }
        });
        return words.length ? words.join(' ') : text;
    }

    /* ===================== Algolia 查询 ===================== */
    function searchUrl() {
        return 'https://' + CONFIG.appId + '-dsn.algolia.net/1/indexes/'
            + encodeURIComponent(CONFIG.indexName) + '/query';
    }

    function fetchPage(query, page) {
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
    var store = { query: '', page: 0, hits: [], nbHits: 0 };

    function resetStore(query) {
        store = { query: query, page: 0, hits: [], nbHits: 0 };
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
                var page = store.page;
                var sent = segmentQueryZh(query);
                return fetchPage(sent, page).then(function (data) {
                    /* 查询已经变了，丢掉过期结果 */
                    if (store.query !== query) {
                        return [];
                    }
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
