# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## gh-pages.yml

```diff

@@ -0,0 +1,31 @@
+name: github pages for blog
+
+on:
+  push:
+    branches:
+      - master
+  pull_request:
+
+jobs:
+  deploy:
+    runs-on: ubuntu-20.04
+    permissions:
+      contents: write
+    concurrency:
+      group: ${{ github.workflow }}-${{ github.ref }}
+    steps:
+      - uses: actions/checkout@v2
+
+      - name: mdBook Action
+        uses: peaceiris/actions-mdbook@v1.2.0
+        with:
+          mdbook-version: 'latest'
+
+      - run: mdbook build
+
+      - name: Deploy
+        uses: peaceiris/actions-gh-pages@v3
+        if: ${{ github.ref == 'refs/heads/master' }}
+        with:
+          github_token: ${{ secrets.ACTIONS_DEPLOY_KEY }}
+          publish_dir: ./book
\ No newline at end of file
```

## sitemap.txt

```diff

@@ -12,6 +12,7 @@ https://tinysnow.github.io/断章/断章
 https://tinysnow.github.io/每日一文/一条路 - 亦舒
 https://tinysnow.github.io/每日一文/小生命 - 亦舒
 https://tinysnow.github.io/每日一文/断爱近涅盘 - 林清玄
+https://tinysnow.github.io/每日一文/时间旅行者的妻子 - 奥德丽 · 尼芬格
 https://tinysnow.github.io/每日一文/每日一文
 https://tinysnow.github.io/每日一文/油月亮 - 贾平凹
 https://tinysnow.github.io/每日一文/狗这一生不容易 - 王宏哲
```

