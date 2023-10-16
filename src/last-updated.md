# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## SUMMARY.md

```diff

@@ -287,6 +287,7 @@
       - [Spring 配置文件基本框架](技术/Java/文件模板/Spring%20配置文件基本框架.md)
       - [SpringBoot 项目搭建基本流程](技术/Java/文件模板/SpringBoot%20项目搭建基本流程.md)
   - [实践记录 | Practice Record](技术/实践记录/实践记录.md)
+    - [Mdbook 排版混乱](技术/实践记录/Mdbook%20排版混乱.md)
     - [毕业设计环境准备](技术/实践记录/毕业设计环境准备.md)
     - [Elastic Search 启用](技术/实践记录/ElasticSearch启用.md)
     - [Logstash 同步 MySQL 数据到 Elastic Search](技术/实践记录/Logstash同步MySQL数据到ElasticSearch.md)

@@ -353,6 +354,7 @@
       - [第十二章：贷款风险分类](学习/金融/公司信贷/第十二章：贷款风险分类.md)
       - [第十三章：不良贷款管理](学习/金融/公司信贷/第十三章：不良贷款管理.md)
     - [经济和金融产品理解](学习/金融/经济和金融产品理解.md)
+    - [投资经历与成长](学习/金融/投资经历与成长.md)
   - [音乐 | Music](学习/音乐/音乐.md)
     - [其他资料 | Others](学习/音乐/其他资料.md)
       - [基础乐理](学习/音乐/基础乐理.md)
```

## sitemap.txt

```diff

@@ -533,6 +533,7 @@ https://tinysnow.github.io/断章/诗词/减字木兰花 · 伊愿
 https://tinysnow.github.io/断章/诗词/卿语
 https://tinysnow.github.io/断章/诗词/变
 https://tinysnow.github.io/断章/诗词/在你的瞳孔里
+https://tinysnow.github.io/断章/诗词/在无人的城市，放一束烟花
 https://tinysnow.github.io/断章/诗词/在星空下坠落
 https://tinysnow.github.io/断章/诗词/在深夜里出逃
 https://tinysnow.github.io/断章/诗词/复活
```

## 投资经历与成长.md

```diff

@@ -0,0 +1,2 @@
+# 投资经历与成长
+
```

## 金融.md

```diff

@@ -1 +1,3 @@
 # 金融 | Finance
+
+所有金融学习内容，收录于此。
\ No newline at end of file
```

## Algolia 搜索.md

```diff

@@ -0,0 +1,2 @@
+# Algolia 搜索
+
```

## Mdbook 排版混乱.md

```diff

@@ -0,0 +1,44 @@
+# Mdbook 排版混乱
+
+## 表现
+
+- 左侧菜单栏收不回去
+- 占用大面积显示左侧菜单栏
+
+## 原因
+
+- Mdbook 旧版本升级为 Latest 时，修改了 index.hbs 文件模板
+- 可以通过新版 Mdbook 新建工程时，建立的新 index.hbs 文件看出
+
+## 解决
+
+- 比对旧版 index.hbs 和新版 index.hbs 文件
+
+- 将旧版文件的相应部分内容，替换为新版（大部分内容应该是一致的）
+
+  - 尤其是下面这部分
+
+  - ```diff
+             <!-- Hide / unhide sidebar before it is displayed -->
+    -        <script type="text/javascript">
+    -            var html = document.querySelector('html');
+    -            var sidebar = 'hidden';
+    +        <script>
+    +            var body = document.querySelector('body');
+    +            var sidebar = null;
+    +            var sidebar_toggle = document.getElementById("sidebar-toggle-anchor");
+                if (document.body.clientWidth >= 1080) {
+                    try { sidebar = localStorage.getItem('mdbook-sidebar'); } catch(e) { }
+                    sidebar = sidebar || 'visible';
+    +            } else {
+    +                sidebar = 'hidden';
+    +            }
+    -            html.classList.remove('sidebar-visible');
+    -            html.classList.add("sidebar-" + sidebar);
+    +            sidebar_toggle.checked = sidebar === 'visible';
+    +            body.classList.remove('sidebar-visible');
+    +            body.classList.add("sidebar-" + sidebar);
+            </script>
+    ```
+
+  - **但不仅限于这部分**
\ No newline at end of file
```
