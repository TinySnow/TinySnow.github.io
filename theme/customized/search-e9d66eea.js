/* ===========================================================================
 * 微雪博客 · DocSearch 初始化
 * ---------------------------------------------------------------------------
 * UI 用 @docsearch/js 的**默认外观**（菜单栏搜索按钮 + 弹窗），
 * 搜索质量的两项改进挂在 DocSearch 官方的 transformSearchClient 上：
 *
 *   1. 清洗中文虚词。这个引擎对中文是「按单字」处理的（实测把
 *      indexLanguages/queryLanguages 设成 ["zh","en"] 并重建索引后，查
 *      「重装系统」的 _rankingInfo.words 仍是 4），所以「怎么重装系统」会变成
 *      6 个单字的 AND，正确页面因为没有「怎么」反而不满足；
 *      清洗成「重装系统」后前三名正好是三篇重装系统文章。
 *   2. 优先只搜「按词」属性（hierarchy_words.* / content_words.*）。
 *      实测 52 条精确短语：只搜按词属性 top1=33、只搜按字属性 top1=15（=基线）；
 *      若一条都没命中，自动退回「原查询 + 全部属性」。
 *
 * 依赖（见 theme/index.hbs，都在 additional-js 之前同步加载）：
 *   @docsearch/css@3.9.0 + @docsearch/js@3.9.0
 * =========================================================================== */
(function () {
    'use strict';

    var CONFIG = {
        appId: 'GX9RTL51BH',
        apiKey: 'c4caea4202132489213a6c5366c9952d',
        indexName: 'tinysnowio',
        container: '#docsearch',

        /* 一次抓多少条（DocSearch 默认 20，弹窗内可滚动） */
        hitsPerPage: 100,
        /* 每个分组最多渲染多少条。
         * ⚠️ 这个值才是真正的「可见条数」上限：DocSearch 3.9 的分组键是
         * hierarchy.lvl0（见 docsearch-react 的 groupBy/removeHighlightTags），
         * 而本站每条记录的 lvl0 都是「博客」，所有命中都落在同一个分组里，
         * 所以能把结果全部截断的只有 maxResultsPerGroup。
         * 原配置没设它 → 用默认 5，这就是「明明很多命中却只看到几条」的根因。*/
        maxResultsPerGroup: 100,

        cleanQuery: true,
        preferWordAttributes: true,
        wordAttributes: [
            'hierarchy_words.lvl0', 'hierarchy_words.lvl1', 'hierarchy_words.lvl2',
            'hierarchy_words.lvl3', 'hierarchy_words.lvl4', 'hierarchy_words.lvl5',
            'hierarchy_words.lvl6', 'content_words'
        ]
    };

    /* ===================== 中文查询清洗 ===================== */
    var segmenter = (function () {
        try {
            if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
                return new Intl.Segmenter('zh-Hans', { granularity: 'word' });
            }
        } catch (e) { /* 环境不支持就不清洗 */ }
        return null;
    })();
    var HAS_CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;

    /* 单字虚词：作为独立词出现时丢掉（不用正则替换字符，避免误伤「上海」的「上」） */
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

    /* 返回清洗后的查询；不需要清洗时返回 null（表示按原样发送） */
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
            return null;                     // 全是虚词，别清洗
        }
        var out = words.join(' ');
        return out === text ? null : out;
    }

    /* ===================== 请求包装 ===================== */
    /* DocSearch 3.9 的请求是 v5 风格：{ indexName, query, hitsPerPage, ... } 参数在顶层，
     * searchParameters 在最后展开（所以我们的 searchParameters 能覆盖它的默认值）。 */
    function prepare(requests) {
        var list = (requests && requests.requests) ? requests.requests : [];
        var cleaned = [];
        var original = [];
        var changed = false;

        for (var i = 0; i < list.length; i++) {
            var req = list[i];
            var rawQuery = String(req.query == null ? '' : req.query);
            var sent = analyzeQuery(rawQuery) || rawQuery;

            var next = {};
            for (var key in req) {
                if (Object.prototype.hasOwnProperty.call(req, key)) {
                    next[key] = req[key];
                }
            }
            next.query = sent;
            if (CONFIG.preferWordAttributes) {
                next.restrictSearchableAttributes = CONFIG.wordAttributes;
            }
            cleaned.push(next);
            original.push(req);
            if (sent !== rawQuery) {
                changed = true;
            }
        }

        return {
            requests: { requests: cleaned },
            original: { requests: original },
            /* 只有清洗过、或限定了属性时才值得回退重试 */
            canFallback: changed || CONFIG.preferWordAttributes
        };
    }

    function firstResult(response) {
        if (!response) {
            return null;
        }
        if (Array.isArray(response)) {
            return response[0] || null;
        }
        if (response.results && response.results.length) {
            return response.results[0];
        }
        return null;
    }

    function wrapSearchClient(searchClient) {
        var wrapped = {};
        for (var key in searchClient) {
            if (Object.prototype.hasOwnProperty.call(searchClient, key)) {
                wrapped[key] = searchClient[key];
            }
        }
        wrapped.search = function (requests) {
            var prepared = prepare(requests);
            return searchClient.search(prepared.requests).then(function (response) {
                var first = firstResult(response);
                if (prepared.canFallback && first && first.nbHits === 0) {
                    /* 一条都没命中 → 退回「原查询 + 全部属性」，不牺牲召回 */
                    return searchClient.search(prepared.original);
                }
                return response;
            });
        };
        return wrapped;
    }

    /* ===================== 启动 ===================== */
    function init() {
        if (typeof window.docsearch !== 'function') {
            if (window.console && console.error) {
                console.error('[search] @docsearch/js 没加载成功，搜索按钮不会出现');
            }
            return;
        }
        window.docsearch({
            appId: CONFIG.appId,
            apiKey: CONFIG.apiKey,
            indexName: CONFIG.indexName,
            container: CONFIG.container,
            maxResultsPerGroup: CONFIG.maxResultsPerGroup,
            searchParameters: { hitsPerPage: CONFIG.hitsPerPage },
            transformSearchClient: wrapSearchClient
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
