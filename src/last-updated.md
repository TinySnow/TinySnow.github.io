# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## gh-pages.yml

```diff

@@ -1,32 +1,39 @@
-name: github pages for blog
-
+name: Deploy
 on:
   push:
     branches:
-      - master
+      - main
 
 jobs:
   deploy:
     runs-on: ubuntu-latest
     permissions:
-      contents: write
+      contents: write  # To push a branch 
       pull-requests: write  # To create a PR from that branch
-    concurrency:
-      group: ${{ github.workflow }}-${{ github.ref }}
     steps:
-      - uses: actions/checkout@v3
-        with:
-          fetch-depth: 0
-      - name: mdBook Action
-        uses: peaceiris/actions-mdbook@v1.2.0
-        with:
-          mdbook-version: 'latest'
-
-      - run: mdbook build
-
-      - name: Deploy
-        uses: peaceiris/actions-gh-pages@v3
-        if: ${{ github.ref == 'refs/heads/master' }}
-        with:
-          github_token: ${{ secrets.GITHUB_TOKEN }}
-          publish_dir: ./book
\ No newline at end of file
+    - uses: actions/checkout@v4
+      with:
+        fetch-depth: 0
+    - name: Install latest mdbook
+      run: |
+        tag=$(curl 'https://api.github.com/repos/rust-lang/mdbook/releases/latest' | jq -r '.tag_name')
+        url="https://github.com/rust-lang/mdbook/releases/download/${tag}/mdbook-${tag}-x86_64-unknown-linux-gnu.tar.gz"
+        mkdir mdbook
+        curl -sSL $url | tar -xz --directory=./mdbook
+        echo `pwd`/mdbook >> $GITHUB_PATH
+    - name: Deploy GitHub Pages
+      run: |
+        # This assumes your book is in the root of your repository.
+        # Just add a `cd` here if you need to change to another directory.
+        mdbook build
+        git worktree add gh-pages
+        git config user.name "Deploy from CI"
+        git config user.email ""
+        cd gh-pages
+        # Delete the ref to avoid keeping history.
+        git update-ref -d refs/heads/gh-pages
+        rm -rf *
+        mv ../book/* .
+        git add .
+        git commit -m "Deploy $GITHUB_SHA to gh-pages"
+        git push --force --set-upstream origin gh-pages
\ No newline at end of file
```

## .gitignore

```diff

@@ -1,4 +1,5 @@
 book
 node_modules
 package.json
-package-lock.json
\ No newline at end of file
+package-lock.json
+.git.bfg-report
\ No newline at end of file
```

## sitemap.txt

```diff

@@ -241,6 +241,7 @@ https://tinysnow.github.io/每日一文/无酱不欢 - 蔡澜
 https://tinysnow.github.io/每日一文/旧书去哪里了 - 梁文道
 https://tinysnow.github.io/每日一文/早起看人间 - 罗兰
 https://tinysnow.github.io/每日一文/时间旅行者的妻子 - 奥德丽 · 尼芬格
+https://tinysnow.github.io/每日一文/明白 - 龙应台
 https://tinysnow.github.io/每日一文/最伟大的科幻小说 - 埃里克 · 斯通恩特
 https://tinysnow.github.io/每日一文/最好的时光 - 刘瑜
 https://tinysnow.github.io/每日一文/月亮不见了 - 叶倾城
```

