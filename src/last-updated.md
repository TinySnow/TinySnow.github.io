# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## SUMMARY.md

```diff

@@ -5,6 +5,7 @@
 - [问题总表 | Problems](问题总表.md)
 -----
 - [每日一文 | Daily Article](每日一文/每日一文.md)
+  - [轻蔑的一瞥 - 库森别格尔](每日一文/轻蔑的一瞥%20-%20库森别格尔.md)
   - [清晨的变故 - 黑井千次](每日一文/清晨的变故%20-%20黑井千次.md)
   - [不一样的自由 - 龙应台](每日一文/不一样的自由%20-%20龙应台.md)
   - [谁的生命可以不受时间限制 - 沈从文](每日一文/谁的生命可以不受时间限制%20-%20沈从文.md)
```

## sitemap.txt

```diff

@@ -73,6 +73,7 @@ https://tinysnow.github.io/每日一文/没有一本一劳永逸的书 - 毛姆
 https://tinysnow.github.io/每日一文/油月亮 - 贾平凹
 https://tinysnow.github.io/每日一文/活出爱 - 史铁生
 https://tinysnow.github.io/每日一文/活着真好 - 维克多 · 科克留什金
+https://tinysnow.github.io/每日一文/清晨的变故 - 黑井千次
 https://tinysnow.github.io/每日一文/熟人厌烦症 - 迈克尔 · 金
 https://tinysnow.github.io/每日一文/爱情故事 - 余华
 https://tinysnow.github.io/每日一文/爸爸的味道 - 张小娴
```

## index.hbs

```diff

@@ -53,10 +53,9 @@
         <script async type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
         {{/if}}
 
-
-
-
+        <!-- Baidu Site Analytics -->
         <meta name="baidu-site-verification" content="code-he9gAvXT8G" />
+
         <!-- Global site tag (gtag.js) - Google Analytics -->
         <script async src="https://www.googletagmanager.com/gtag/js?id=G-P9324YLFBW"></script>
         <script>

@@ -66,6 +65,8 @@
 
           gtag('config', 'G-P9324YLFBW');
         </script>
+
+        <!-- Doc Search -->
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"/></pre></li>
     </head>
 <body>

@@ -216,6 +217,7 @@
                     <main>
                         {{{ content }}}
                         <div id="giscus-container"></div>
+                        <div id="docsearch"></div>
                     </main>
 
                     <nav class="nav-wrapper" aria-label="Page navigation">

@@ -342,13 +344,14 @@
         </script>
         {{/if}}
         {{/if}}
+
         <script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3"></script>
         <script type="text/javascript">
             docsearch({
-                appId: GX9RTL51BH,
-                apiKey: 364d7154cf1fa31bad0b8fd9c6018351,
-                indexName: tinysnowio,
-                container: 'div'
+                appId: 'GX9RTL51BH',
+                apiKey: '364d7154cf1fa31bad0b8fd9c6018351',
+                indexName: 'tinysnowio',
+                container: '#docsearch'
                 debug: false // Set debug to true if you want to inspect the modal
                 });
         </script>
```
