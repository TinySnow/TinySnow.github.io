# 最近更新 | Last Updated

<p style="font-weight: bold; color: red; text-align: center;">Warning: The content is presented as `git diff`.</p>

## autopush.sh

```diff

@@ -8,6 +8,9 @@
 # 如果 node 已经进行了此包的安装，则不需要再次进行安装。
 # 安装命令：
 # npm install static-sitemap-cli
+#
+# 如果需要解除 git diff 对于中文的编码，请确保 git 的配置：
+# git config --global core.quotepath false
 
 # bash 脚本安全性保障
 set -Eeuo pipefail
```

## SUMMARY.md

```diff

@@ -240,7 +240,53 @@
     - [胡言乱语之一](断章/胡言/胡言乱语之一.md)
     - [心情](断章/胡言/心情.md)
 - [读书](读书/读书.md)
+  - [没事，一切都会好起来的](读书/没事，一切都会好起来的/没事，一切都会好起来的.md)
+    - [封底](读书/没事，一切都会好起来的/封底.md)
+    - [灿烂的尽头](读书/没事，一切都会好起来的/灿烂的尽头.md)
+    - [朝着尽头](读书/没事，一切都会好起来的/朝着尽头.md)
+    - [对话](读书/没事，一切都会好起来的/对话.md)
+    - [飞吧](读书/没事，一切都会好起来的/飞吧.md)
+    - [分享日常](读书/没事，一切都会好起来的/分享日常.md)
+    - [给你](读书/没事，一切都会好起来的/给你.md)
+    - [海浪](读书/没事，一切都会好起来的/海浪.md)
+    - [呼唤的声音](读书/没事，一切都会好起来的/呼唤的声音.md)
+    - [花](读书/没事，一切都会好起来的/花.md)
+    - [紧急降落](读书/没事，一切都会好起来的/紧急降落.md)
+    - [精灵之舞](读书/没事，一切都会好起来的/精灵之舞.md)
+    - [井](读书/没事，一切都会好起来的/井.md)
+    - [来自宇宙的信](读书/没事，一切都会好起来的/来自宇宙的信.md)
+    - [来自月亮的回信](读书/没事，一切都会好起来的/来自月亮的回信.md)
+    - [离别](读书/没事，一切都会好起来的/离别.md)
+    - [门](读书/没事，一切都会好起来的/门.md)
+    - [梦的距离](读书/没事，一切都会好起来的/梦的距离.md)
+    - [梦尽头的你](读书/没事，一切都会好起来的/梦尽头的你.md)
+    - [哪怕没有理由](读书/没事，一切都会好起来的/哪怕没有理由.md)
+    - [你的花园](读书/没事，一切都会好起来的/你的花园.md)
+    - [你的季节](读书/没事，一切都会好起来的/你的季节.md)
+    - [你的星星](读书/没事，一切都会好起来的/你的星星.md)
+    - [散步](读书/没事，一切都会好起来的/散步.md)
+    - [沙漠里的玫瑰](读书/没事，一切都会好起来的/沙漠里的玫瑰.md)
+    - [守灯人](读书/没事，一切都会好起来的/守灯人.md)
+    - [特别的时刻](读书/没事，一切都会好起来的/特别的时刻.md)
+    - [温暖的约定](读书/没事，一切都会好起来的/温暖的约定.md)
+    - [我的宇宙](读书/没事，一切都会好起来的/我的宇宙.md)
+    - [献给身在某处的你](读书/没事，一切都会好起来的/献给身在某处的你.md)
+    - [相信](读书/没事，一切都会好起来的/相信.md)
+    - [小蜡烛](读书/没事，一切都会好起来的/小蜡烛.md)
+    - [小小的对白](读书/没事，一切都会好起来的/小小的对白.md)
+    - [心](读书/没事，一切都会好起来的/心.md)
+    - [幸福](读书/没事，一切都会好起来的/幸福.md)
+    - [阳光](读书/没事，一切都会好起来的/阳光.md)
+    - [一些安慰](读书/没事，一切都会好起来的/一些安慰.md)
+    - [音乐](读书/没事，一切都会好起来的/音乐.md)
+    - [永远](读书/没事，一切都会好起来的/永远.md)
+    - [枕边的故事](读书/没事，一切都会好起来的/枕边的故事.md)
+    - [终点站](读书/没事，一切都会好起来的/终点站.md)
+    - [最美的东西](读书/没事，一切都会好起来的/最美的东西.md)
   - [零零散散](读书/零零散散/零零散散.md)
+    - [非暴力沟通](读书/零零散散/非暴力沟通.md)
+    - [漫画经济学：生活常识](读书/零零散散/漫画经济学：生活常识.md)
+    - [漫画经济学：金融危机](读书/零零散散/漫画经济学：金融危机.md)
     - [我想要两颗西柚](读书/零零散散/我想要两颗西柚.md)
     - [我离开之后](读书/零零散散/我离开之后.md)
     - [人间告白](读书/零零散散/人间告白.md)

@@ -254,6 +300,7 @@
     - [麻省理工深度思考法](读书/零零散散/麻省理工深度思考法.md)
     - [快速抓重点，过目不忘的阅读术](读书/零零散散/快速抓重点，过目不忘的阅读术.md)
     - [追风筝的人](读书/零零散散/追风筝的人.md)
+    - [霍乱时期的爱情](读书/零零散散/霍乱时期的爱情.md)
 - [笔记](笔记/笔记.md)
   - [记录](笔记/记录/记录.md)
     - [观影记录](笔记/记录/观影记录.md)
```

## last-updated.md

```diff

@@ -2,6651 +2,3 @@
 
 <p style="font-weight: bold; color: red; text-align: center;">Warning: The content is presented as `git diff`.</p>
 
-## last-updated.md
-
-```diff
-
-@@ -2,4911 +2,3 @@
- 
- <p style="font-weight: bold; color: red; text-align: center;">Warning: The content is presented as `git diff`.</p>
- 
--## SUMMARY.md
--
--```diff
--
--@@ -240,6 +240,20 @@
--     - [胡言乱语之一](断章/胡言/胡言乱语之一.md)
--     - [心情](断章/胡言/心情.md)
-- - [读书](读书/读书.md)
--+  - [零零散散](读书/零零散散/零零散散.md)
--+    - [我想要两颗西柚](读书/零零散散/我想要两颗西柚.md)
--+    - [我离开之后](读书/零零散散/我离开之后.md)
--+    - [人间告白](读书/零零散散/人间告白.md)
--+    - [山茶文具店](读书/零零散散/山茶文具店.md)
--+    - [狮子之家的点心日](读书/零零散散/狮子之家的点心日.md)
--+    - [二十首情诗和一首绝望的歌](读书/零零散散/二十首情诗和一首绝望的歌.md)
--+    - [明天，我要和昨天的你约会](读书/零零散散/明天，我要和昨天的你约会.md)
--+    - [数学之美](读书/零零散散/数学之美.md)
--+    - [你当像鸟飞往你的山](读书/零零散散/你当像鸟飞往你的山.md)
--+    - [如何阅读一本书](读书/零零散散/如何阅读一本书.md)
--+    - [麻省理工深度思考法](读书/零零散散/麻省理工深度思考法.md)
--+    - [快速抓重点，过目不忘的阅读术](读书/零零散散/快速抓重点，过目不忘的阅读术.md)
--+    - [追风筝的人](读书/零零散散/追风筝的人.md)
-- - [笔记](笔记/笔记.md)
--   - [记录](笔记/记录/记录.md)
--     - [观影记录](笔记/记录/观影记录.md)
--```
--
--## last-updated.md
--
--```diff
--
--@@ -2,3148 +2,3 @@
-- 
-- <p style="font-weight: bold; color: red; text-align: center;">Warning: The content is presented as `git diff`.</p>
-- 
---## autopush.sh
---
---```diff
---
---@@ -17,9 +17,9 @@ if [[ $1 ]]; then
--- 
--- 	file="./src/last-updated.md"
--- 
----	echo -e "# 最近更新 | Last Updated\n\n\
----	<p style='font-weight: bold; color: red; text-align: center;'>\
----	Warning: The content is presented as \`git diff\`.</p>\n" > ${file}
---+	notice_content="Warning: The content is presented as \`git diff\`."
---+
---+	echo -e "# 最近更新 | Last Updated\n\n<p style=\"font-weight: bold; color: red; text-align: center;\">${notice_content}</p>\n" > ${file}
--- 
--- 	git add .
--- 
---```
---
---## last-updated.md
---
---```diff
---
---@@ -1,1690 +1,4 @@
--- # 最近更新 | Last Updated
--- 
----	<p style='font-weight: bold; color: red; text-align: center;'>	Warning: The content is presented as `git diff`.</p>
---+<p style="font-weight: bold; color: red; text-align: center;">Warning: The content is presented as `git diff`.</p>
--- 
----## autopush.sh
----
----```diff
----
----@@ -15,27 +15,56 @@ set -Eeuo pipefail
---- 
---- if [[ $1 ]]; then
---- 
-----	# 更新 `最近更新.md`
----+	file="./src/last-updated.md"
----+
---- 	echo -e "# 最近更新 | Last Updated\n\n\
-----<p style='font-weight: bold; color: red; text-align: center;'>Warning: The content is presented as \`git diff\`.</p>\n\n\
-----\`\`\`bash" > ./src/last-updated.md
----+	<p style='font-weight: bold; color: red; text-align: center;'>\
----+	Warning: The content is presented as \`git diff\`.</p>\n" > ${file}
---- 
-----	# 进行 git 提交
---- 	git add .
---- 
---- 	# 将所有更改追加到 `最近更新.md`
-----	git diff --cached >> ./src/last-updated.md
----+	git diff --cached >> ${file}
---- 
---- 	# 该 sed 进行 diff 的换行格式化，否则挤在一起太难看了
---- 	# 以 diff 开头，每个更改的文件之间，会空出三行
---- 	# 以 @@ 开头，每个文件所更改的地方，相互之间会空出一行
-----	sed -i -e 's/^@@/\n@@/g; 7,$s/^diff/\n\n\ndiff/;' ./src/last-updated.md
----+	sed -i -e 's/^@@/\n@@/g' ${file}
----+
----+	# 计数经过修改的文件数量，用于下面的循环
----+	count=`sed -n -e '/^diff/p' ${file} | wc -l`
----+
----+	for (( i = 0; i < count; i++ )); do
----+
----+		# 提取 diff 开头一行的文件名
----+		file_name=`sed -n -e '/^diff/p' $file | awk '{print $4}' | awk -F "/" '{print $NF}' | head -1`
----+
----+		# 提取 diff 开头一行的行号
----+		diff_line_number=`sed -n -e '/^diff/=' $file | head -1`
----+
----+		# 提取 +++ 开头一行的行号
----+		triple_plus_line_number=`sed -n -e '/^+++/=' $file | head -1`
----+
----+		# 将 diff 和 +++ 中间的内容，替换为：
----+		# ----------------------------------------
----+		# ```
----+		#
----+		# ## changed-filename
----+		#
----+		# ```diff
----+		# -----------------------------------------
----+		# 上面多一个 ``` 作为上一个 diff 代码块的结尾
----+		sed -i "${diff_line_number},${triple_plus_line_number}c \`\`\`\n\n##\ ${file_name}\n\n\`\`\`diff" ${file}
----+
----+	done
----+
----+	# 第一个 diff 和 +++ 内容替换后，上面的 ``` 是多余的，所以要删除
----+	sed -i -e '5,6d' ${file}
---- 
-----	# 最后加上 bash 的代码块结尾
-----	echo -e "\`\`\`" >> ./src/last-updated.md
----+	# 最后需要加上最后一个 diff 代码块的结尾
----+	echo -e "\`\`\`" >> ${file}
---- 
-----	# 追加 add `最近更新.md`
-----	git add ./src/last-updated.md
----+	git add ${file}
---- 
---- 	# 编译文章
---- 	mdbook build
----```
----
----## last-updated.md
----
----```diff
----
----@@ -1,1606 +1,4 @@
---- # 最近更新 | Last Updated
---- 
-----<p style='font-weight: bold; color: red; text-align: center;'>Warning: The content is presented as `git diff`.</p>
----+	<p style='font-weight: bold; color: red; text-align: center;'>	Warning: The content is presented as `git diff`.</p>
---- 
-----```bash
-----diff --git a/autopush.sh b/autopush.sh
-----index 408d218..945d0a1 100644
-------- a/autopush.sh
-----+++ b/autopush.sh
-----
-----@@ -17,9 +17,8 @@ if [[ $1 ]]; then
----- 
----- 	# 更新 `最近更新.md`
----- 	echo -e "# 最近更新 | Last Updated\n\n\
------	<p style='font-weight: bold; color: red; text-align: center;'>\
------	Warning: The content is presented as \`git diff\`.</p>\n\n\
------	\`\`\`bash" > ./src/last-updated.md
-----+<p style='font-weight: bold; color: red; text-align: center;'>Warning: The content is presented as \`git diff\`.</p>\n\n\
-----+\`\`\`bash" > ./src/last-updated.md
----- 
----- 	# 进行 git 提交
----- 	git add .
-----
-----
-----
-----diff --git a/src/last-updated.md b/src/last-updated.md
-----index 10b980b..c490cc3 100644
-------- a/src/last-updated.md
-----+++ b/src/last-updated.md
-----
-----@@ -1,128 +1,5 @@
----- # 最近更新 | Last Updated
----- 
------	<p style='font-weight: bold; color: red; text-align: center;'>	Warning: The content is presented as `git diff`.</p>
-----+<p style='font-weight: bold; color: red; text-align: center;'>Warning: The content is presented as `git diff`.</p>
----- 
------	```bash
------diff --git a/autopush.sh b/autopush.sh
------index 9768908..408d218 100644
--------- a/autopush.sh
------+++ b/autopush.sh
------
------@@ -12,44 +12,56 @@
------ # bash 脚本安全性保障
------ set -Eeuo pipefail
------ 
-------if [[ $1 == '-h' || $1 == '--help' ]]; then
-------	echo "用法："
-------	echo -e "\t-h                        \t查看脚本用法。\
-------			\n\t--help"
-------	echo -e "\t-e        <commit_message>\t执行脚本。commit_message 是必选项，且需要带双引号，\
-------			\n\t--execute <commit_message>\t用于绑定 git 的提交消息，无此项会引发错误。"	
-------	echo "注意："
-------	echo -e "\t此脚本必须在 Blog 根目录下执行，未进行路径判断。\
-------			\n\t-h 和 -e 命令不能同时出现。\
-------			\n\t无其他用法。"	
-------	exit 0
-------elif [[ $1 == '-e' || $1 == '--execute' ]]; then
------+
------+if [[ $1 ]]; then
------+
------+	# 更新 `最近更新.md`
------+	echo -e "# 最近更新 | Last Updated\n\n\
------+	<p style='font-weight: bold; color: red; text-align: center;'>\
------+	Warning: The content is presented as \`git diff\`.</p>\n\n\
------+	\`\`\`bash" > ./src/last-updated.md
------+
------+	# 进行 git 提交
------+	git add .
------+
------+	# 将所有更改追加到 `最近更新.md`
------+	git diff --cached >> ./src/last-updated.md
------+
------+	# 该 sed 进行 diff 的换行格式化，否则挤在一起太难看了
------+	# 以 diff 开头，每个更改的文件之间，会空出三行
------+	# 以 @@ 开头，每个文件所更改的地方，相互之间会空出一行
------+	sed -i -e 's/^@@/\n@@/g; 7,$s/^diff/\n\n\ndiff/;' ./src/last-updated.md
------+
------+	# 最后加上 bash 的代码块结尾
------+	echo -e "\`\`\`" >> ./src/last-updated.md
------+
------+	# 追加 add `最近更新.md`
------+	git add ./src/last-updated.md
------+
------ 	# 编译文章
------ 	mdbook build
------+
------ 	# 生成 sitemap.xml 和 sitemap.txt 文件，借助 static-sitemap-cli
-------	# 安装 static-sitemap-cli 命令：npm i -g static-sitemap-cli
------+	# 安装 static-sitemap-cli 命令： npm i -g static-sitemap-cli
------ 	npx sscli -b https://tinysnow.github.io -r ./book
------+
------ 	# 检查 book 文件夹下是否有这两个文件
------ 	if [[ -a ./book/sitemap.xml && -a ./book/sitemap.txt ]]; then
------ 		cp -f ./book/sitemap.xml ./src
------ 		cp -f ./book/sitemap.txt ./src
------ 	else
-------		echo "sitemap.xml 和 sitemap.txt 不存在，请检查你的 static-sitemap-cli 安装情况。"
-------		exit 1
-------	fi
-------	if [[ $2 ]]; then
-------		# 进行 git 提交
-------		git add .
-------		# 提交 message 取第二个参数，需要打引号
-------		git commit -m "$2"
-------		# 推送至远程仓库
-------		git push origin master
-------		# echo "\"$2\""
-------	else
-------		echo "请提供 -e 选项的后续参数。"
------+		echo "sitemap.xml 和 sitemap.txt 不存在，请检查 static-sitemap-cli 安装情况。"
------ 		exit 1
------ 	fi
------+
------+	# 提交 message 取第二个参数，需要打引号
------+	git commit -m "$1"
------+
------+	# 推送至远程仓库
------+	git push origin master
------+
------+	# echo "\"$1\""
------ else
-------	echo "未知参数。"
-------	echo "请使用 ./autopush.sh -h 或 ./autopush.sh --help 查看用法"
------+	echo "请提供参数。"
------+	exit 1
------ fi
------\ No newline at end of file
------
------
------
------diff --git a/src/SUMMARY.md b/src/SUMMARY.md
------index 7526249..e232adc 100644
--------- a/src/SUMMARY.md
------+++ b/src/SUMMARY.md
------
------@@ -1,6 +1,7 @@
------ # Summary
------ 
------ - [个人简介 | Intro | 自己紹介](个人简介.md)
------+- [最近更新 | Last Updated](last-updated.md)
------ - [问题总表](问题总表.md)
------ - [技术](技术/技术.md)
------   - [Knowledge](技术/Knowledge.md)
------
------
------
------diff --git a/src/last-updated.md b/src/last-updated.md
------new file mode 100644
------index 0000000..82fef53
--------- /dev/null
------+++ b/src/last-updated.md
------
------@@ -0,0 +1,5 @@
------+# 最近更新 | Last Updated
------+
------+	<p style='font-weight: bold; color: red; text-align: center;'>	Warning: The content is presented as `git diff`.</p>
------+
------+	```bash
------```
-----+```bash
-----
-----
-----
-----diff --git a/src/sitemap.txt b/src/sitemap.txt
-----index 7e2b8a6..283f19b 100644
-------- a/src/sitemap.txt
-----+++ b/src/sitemap.txt
-----
-----@@ -1,4 +1,5 @@
----- https://tinysnow.github.io/
-----+https://tinysnow.github.io/last-updated
----- https://tinysnow.github.io/个人简介
----- https://tinysnow.github.io/问题总表
----- https://tinysnow.github.io/学习/学习
-----
-----
-----
-----diff --git a/src/sitemap.xml b/src/sitemap.xml
-----index e874bbb..146f103 100644
-------- a/src/sitemap.xml
-----+++ b/src/sitemap.xml
-----
-----@@ -2,1134 +2,1138 @@
----- <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
-----     <url>
-----         <loc>https://tinysnow.github.io/</loc>
------        <lastmod>2022-12-24T09:50:12.195Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.621Z</lastmod>
-----+    </url>
-----+    <url>
-----+        <loc>https://tinysnow.github.io/last-updated</loc>
-----+        <lastmod>2022-12-27T07:51:23.626Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/个人简介</loc>
------        <lastmod>2022-12-24T09:50:12.192Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.618Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/问题总表</loc>
------        <lastmod>2022-12-24T09:50:12.198Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.629Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/学习</loc>
------        <lastmod>2022-12-24T09:50:12.447Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.882Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/小说</loc>
------        <lastmod>2022-12-24T09:50:13.104Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.622Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Errors</loc>
------        <lastmod>2022-12-24T09:50:12.212Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.641Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Knowledge</loc>
------        <lastmod>2022-12-24T09:50:12.207Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.637Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/技术</loc>
------        <lastmod>2022-12-24T09:50:12.201Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.631Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/断章</loc>
------        <lastmod>2022-12-24T09:50:12.544Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.983Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/笔记/笔记</loc>
------        <lastmod>2022-12-24T09:50:13.061Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.578Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/读书/读书</loc>
------        <lastmod>2022-12-24T09:50:13.058Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.574Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/公共基础知识/中国近现代史</loc>
------        <lastmod>2022-12-24T09:50:12.513Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.949Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/公共基础知识/公共基础知识</loc>
------        <lastmod>2022-12-24T09:50:12.487Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.923Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/公共基础知识/公文</loc>
------        <lastmod>2022-12-24T09:50:12.520Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.957Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/公共基础知识/刑法</loc>
------        <lastmod>2022-12-24T09:50:12.499Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.935Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/公共基础知识/宪法</loc>
------        <lastmod>2022-12-24T09:50:12.491Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.927Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/公共基础知识/民法</loc>
------        <lastmod>2022-12-24T09:50:12.495Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.931Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/公共基础知识/经济学</loc>
------        <lastmod>2022-12-24T09:50:12.516Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.953Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/公共基础知识/经济法</loc>
------        <lastmod>2022-12-24T09:50:12.506Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.942Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/公共基础知识/行政法</loc>
------        <lastmod>2022-12-24T09:50:12.503Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.938Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/公共基础知识/马克思主义哲学</loc>
------        <lastmod>2022-12-24T09:50:12.510Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.946Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/日语/句型整理</loc>
------        <lastmod>2022-12-24T09:50:12.462Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.896Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/日语/日语</loc>
------        <lastmod>2022-12-24T09:50:12.458Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.893Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/日语/日语易错词</loc>
------        <lastmod>2022-12-24T09:50:12.465Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.900Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/日语/日语语法整理</loc>
------        <lastmod>2022-12-24T09:50:12.470Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.905Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/法语/法语</loc>
------        <lastmod>2022-12-24T09:50:12.451Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.885Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/法语/简明法语教程笔记</loc>
------        <lastmod>2022-12-24T09:50:12.455Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.890Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/管理学/概论</loc>
------        <lastmod>2022-12-24T09:50:12.477Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.912Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/管理学/管理学</loc>
------        <lastmod>2022-12-24T09:50:12.473Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.908Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/管理学/组织</loc>
------        <lastmod>2022-12-24T09:50:12.483Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.919Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/管理学/规章制度</loc>
------        <lastmod>2022-12-24T09:50:12.480Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.916Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/零碎知识整理/中文书面语</loc>
------        <lastmod>2022-12-24T09:50:12.534Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.972Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/零碎知识整理/俄语译码表</loc>
------        <lastmod>2022-12-24T09:50:12.531Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.968Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/零碎知识整理/分享想法</loc>
------        <lastmod>2022-12-24T09:50:12.541Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.979Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/零碎知识整理/毕业设计</loc>
------        <lastmod>2022-12-24T09:50:12.537Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.975Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/零碎知识整理/经济和金融产品理解</loc>
------        <lastmod>2022-12-24T09:50:12.527Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.964Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/学习/零碎知识整理/零碎知识整理</loc>
------        <lastmod>2022-12-24T09:50:12.523Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.960Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/其他小说/Chapter 1</loc>
------        <lastmod>2022-12-24T09:50:13.244Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.744Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/其他小说/其他小说</loc>
------        <lastmod>2022-12-24T09:50:13.207Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.719Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/其他小说/夜天盛世夜天梦</loc>
------        <lastmod>2022-12-24T09:50:13.220Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.730Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/其他小说/小说设定</loc>
------        <lastmod>2022-12-24T09:50:13.236Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.740Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/其他小说/恋人之间的秘密</loc>
------        <lastmod>2022-12-24T09:50:13.223Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.736Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/其他小说/第一章 冲击</loc>
------        <lastmod>2022-12-24T09:50:13.212Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.723Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/其他小说/第二章 巨变</loc>
------        <lastmod>2022-12-24T09:50:13.216Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.726Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练</loc>
------        <lastmod>2022-12-24T09:50:13.107Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.625Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 公主与夫人（《欢恋》番外）</loc>
------        <lastmod>2022-12-24T09:50:13.118Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.638Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 少女的夏天</loc>
------        <lastmod>2022-12-24T09:50:13.199Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.712Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 就算是厨师也能照亮他人</loc>
------        <lastmod>2022-12-24T09:50:13.153Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.672Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 散打很温柔</loc>
------        <lastmod>2022-12-24T09:50:13.149Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.668Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 昂贵的教师</loc>
------        <lastmod>2022-12-24T09:50:13.195Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.708Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 普通</loc>
------        <lastmod>2022-12-24T09:50:13.166Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.684Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 欺负人</loc>
------        <lastmod>2022-12-24T09:50:13.190Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.704Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 满足</loc>
------        <lastmod>2022-12-24T09:50:13.183Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.700Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 美术生的夜晚</loc>
------        <lastmod>2022-12-24T09:50:13.145Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.664Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 芭蕾舞者欺负人</loc>
------        <lastmod>2022-12-24T09:50:13.157Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.676Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 认真地发光</loc>
------        <lastmod>2022-12-24T09:50:13.179Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.696Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 设计师想要恋爱</loc>
------        <lastmod>2022-12-24T09:50:13.170Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.687Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 证明你喜欢</loc>
------        <lastmod>2022-12-24T09:50:13.141Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.660Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 遗留</loc>
------        <lastmod>2022-12-24T09:50:13.203Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.715Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 酒保与冷静</loc>
------        <lastmod>2022-12-24T09:50:13.175Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.692Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之一</loc>
------        <lastmod>2022-12-24T09:50:13.162Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.680Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之三</loc>
------        <lastmod>2022-12-24T09:50:13.133Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.652Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之二</loc>
------        <lastmod>2022-12-24T09:50:13.137Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.656Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之五</loc>
------        <lastmod>2022-12-24T09:50:13.126Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.645Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之六</loc>
------        <lastmod>2022-12-24T09:50:13.122Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.642Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之四</loc>
------        <lastmod>2022-12-24T09:50:13.129Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.649Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/有些事情，不应转瞬即逝</loc>
------        <lastmod>2022-12-24T09:50:13.111Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.629Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/小说/想象力训练/深入骨髓</loc>
------        <lastmod>2022-12-24T09:50:13.114Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.634Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/ArchRISC-V</loc>
------        <lastmod>2022-12-24T09:50:12.216Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.645Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/FrequentlyUsed</loc>
------        <lastmod>2022-12-24T09:50:12.279Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.709Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/IssueTemplate</loc>
------        <lastmod>2022-12-24T09:50:12.284Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.714Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Workflow</loc>
------        <lastmod>2022-12-24T09:50:12.288Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.718Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/工作</loc>
------        <lastmod>2022-12-24T09:50:12.291Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.722Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Java/AnnotationsAndReflection</loc>
------        <lastmod>2022-12-24T09:50:12.321Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.753Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Java/HighConcurrencyKnowledge</loc>
------        <lastmod>2022-12-24T09:50:12.324Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.756Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Java/Java</loc>
------        <lastmod>2022-12-24T09:50:12.308Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.739Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Java/JavaThreads</loc>
------        <lastmod>2022-12-24T09:50:12.316Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.747Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Java/KotlinNote</loc>
------        <lastmod>2022-12-24T09:50:12.327Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.760Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Java/文件模板</loc>
------        <lastmod>2022-12-24T09:50:12.330Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.763Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Java/集合</loc>
------        <lastmod>2022-12-24T09:50:12.312Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.743Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/Android 常用闭包</loc>
------        <lastmod>2022-12-24T09:50:12.422Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.856Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/Android 笔记截图</loc>
------        <lastmod>2022-12-24T09:50:12.419Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.852Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/Bash 代表命令</loc>
------        <lastmod>2022-12-24T09:50:12.355Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.789Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/CCleaner 清理项</loc>
------        <lastmod>2022-12-24T09:50:12.425Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.859Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/Git 学习笔记</loc>
------        <lastmod>2022-12-24T09:50:12.351Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.785Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/MATLAB 复习</loc>
------        <lastmod>2022-12-24T09:50:12.370Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.804Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/PWN College Solutions</loc>
------        <lastmod>2022-12-24T09:50:12.385Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.821Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/Recovery + Root 掉落重新刷入方法</loc>
------        <lastmod>2022-12-24T09:50:12.429Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.863Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/SolutionsAndSteps</loc>
------        <lastmod>2022-12-24T09:50:12.441Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.875Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/Tic-tac-toe Game Note of React</loc>
------        <lastmod>2022-12-24T09:50:12.436Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.870Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/Uniapp 从 HX 迁移到 WebStorm</loc>
------        <lastmod>2022-12-24T09:50:12.389Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.824Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/临时</loc>
------        <lastmod>2022-12-24T09:50:12.444Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.879Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/其他资料</loc>
------        <lastmod>2022-12-24T09:50:12.348Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.781Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/发送软件清单及其作用解释</loc>
------        <lastmod>2022-12-24T09:50:12.433Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.867Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/汇编复习笔记</loc>
------        <lastmod>2022-12-24T09:50:12.367Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.801Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/第一个 Bash 脚本</loc>
------        <lastmod>2022-12-24T09:50:12.359Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.793Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/给计算机 202102 班的选修课建议</loc>
------        <lastmod>2022-12-24T09:50:12.392Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.828Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/设计模式极简笔记</loc>
------        <lastmod>2022-12-24T09:50:12.362Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.796Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/软件知识补充</loc>
------        <lastmod>2022-12-24T09:50:12.373Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.808Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/重装系统 8-7</loc>
------        <lastmod>2022-12-24T09:50:12.380Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.815Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/重装系统知识</loc>
------        <lastmod>2022-12-24T09:50:12.377Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.812Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/第一章：计算机的历史</loc>
------        <lastmod>2022-12-24T09:50:12.298Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.728Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/第三章：简单逻辑门</loc>
------        <lastmod>2022-12-24T09:50:12.305Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.736Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/第二章：计算机的构成</loc>
------        <lastmod>2022-12-24T09:50:12.302Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.732Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/计算机科学极简入门指南</loc>
------        <lastmod>2022-12-24T09:50:12.295Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.725Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/句子/句子</loc>
------        <lastmod>2022-12-24T09:50:13.026Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.535Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/句子/日记扉页</loc>
------        <lastmod>2022-12-24T09:50:13.030Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.540Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/句子/随记断句</loc>
------        <lastmod>2022-12-24T09:50:13.033Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.543Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/感触/感触</loc>
------        <lastmod>2022-12-24T09:50:12.990Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.497Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/感触/感触之一</loc>
------        <lastmod>2022-12-24T09:50:13.011Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.520Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/感触/感触之三</loc>
------        <lastmod>2022-12-24T09:50:13.004Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.513Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/感触/感触之二</loc>
------        <lastmod>2022-12-24T09:50:13.008Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.517Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/感触/感触之五</loc>
------        <lastmod>2022-12-24T09:50:12.997Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.505Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/感触/感触之六</loc>
------        <lastmod>2022-12-24T09:50:12.993Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.501Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/感触/感触之四</loc>
------        <lastmod>2022-12-24T09:50:13.000Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.509Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/感触/无题</loc>
------        <lastmod>2022-12-24T09:50:13.018Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.528Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/感触/遇见 今天</loc>
------        <lastmod>2022-12-24T09:50:13.015Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.524Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/感触/零言碎语</loc>
------        <lastmod>2022-12-24T09:50:13.022Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.532Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/一点看法</loc>
------        <lastmod>2022-12-24T09:50:12.634Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.081Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/为了爱情，是否应该舍弃友情？</loc>
------        <lastmod>2022-12-24T09:50:12.577Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.019Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/你一定走了很远的路吧 - 姬霄</loc>
------        <lastmod>2022-12-24T09:50:12.581Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.023Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/冰面少年</loc>
------        <lastmod>2022-12-24T09:50:12.570Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.012Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/前行</loc>
------        <lastmod>2022-12-24T09:50:12.614Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.059Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/反抗</loc>
------        <lastmod>2022-12-24T09:50:12.604Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.048Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/哥，咱家要散了</loc>
------        <lastmod>2022-12-24T09:50:12.618Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.063Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/回望大二</loc>
------        <lastmod>2022-12-24T09:50:12.591Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.034Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/境遇</loc>
------        <lastmod>2022-12-24T09:50:12.611Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.056Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/奴化圣经</loc>
------        <lastmod>2022-12-24T09:50:12.608Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.052Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/所想所见即真实</loc>
------        <lastmod>2022-12-24T09:50:12.587Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.030Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/文章</loc>
------        <lastmod>2022-12-24T09:50:12.547Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.987Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/暑期总结与瑰想</loc>
------        <lastmod>2022-12-24T09:50:12.621Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.067Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/月圆夜</loc>
------        <lastmod>2022-12-24T09:50:12.601Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.045Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/烟火自述</loc>
------        <lastmod>2022-12-24T09:50:12.557Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.998Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/番茄</loc>
------        <lastmod>2022-12-24T09:50:12.594Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.037Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/篮球女孩</loc>
------        <lastmod>2022-12-24T09:50:12.567Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.008Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/给女性</loc>
------        <lastmod>2022-12-24T09:50:12.560Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.001Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/给男性</loc>
------        <lastmod>2022-12-24T09:50:12.554Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.994Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/色气之下，清纯最大</loc>
------        <lastmod>2022-12-24T09:50:12.628Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.074Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/茉莉清茶</loc>
------        <lastmod>2022-12-24T09:50:12.584Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.026Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/蕴愈彼此，共渡红尘</loc>
------        <lastmod>2022-12-24T09:50:12.638Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.085Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/语言漫谈</loc>
------        <lastmod>2022-12-24T09:50:12.564Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.005Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/追随</loc>
------        <lastmod>2022-12-24T09:50:12.631Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.078Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/通往优秀的路上，痛苦是一种试炼</loc>
------        <lastmod>2022-12-24T09:50:12.641Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.089Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/阑珊，散落人间</loc>
------        <lastmod>2022-12-24T09:50:12.550Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.990Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/随便聊聊</loc>
------        <lastmod>2022-12-24T09:50:12.624Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.070Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/随想录</loc>
------        <lastmod>2022-12-24T09:50:12.597Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.041Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/文章/韧尽万花春绽美，待到寒冬自释香 - 2021年度总结</loc>
------        <lastmod>2022-12-24T09:50:12.574Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.016Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/胡言/心情</loc>
------        <lastmod>2022-12-24T09:50:13.054Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.569Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/胡言/胡言</loc>
------        <lastmod>2022-12-24T09:50:13.037Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.547Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之一</loc>
------        <lastmod>2022-12-24T09:50:13.050Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.566Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之三</loc>
------        <lastmod>2022-12-24T09:50:13.042Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.555Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之二</loc>
------        <lastmod>2022-12-24T09:50:13.046Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.559Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之四</loc>
------        <lastmod>2022-12-24T09:50:13.039Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.551Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/Hide and Seek</loc>
------        <lastmod>2022-12-24T09:50:12.976Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.483Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/一如既往</loc>
------        <lastmod>2022-12-24T09:50:12.835Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.329Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/一瞬间</loc>
------        <lastmod>2022-12-24T09:50:12.886Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.386Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/不屈</loc>
------        <lastmod>2022-12-24T09:50:12.938Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.440Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/减字木兰花 · 伊愿</loc>
------        <lastmod>2022-12-24T09:50:12.848Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.344Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/变</loc>
------        <lastmod>2022-12-24T09:50:12.951Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.456Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/复活</loc>
------        <lastmod>2022-12-24T09:50:12.859Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.355Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/夏影</loc>
------        <lastmod>2022-12-24T09:50:12.890Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.390Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/天仙子 • 忆灵</loc>
------        <lastmod>2022-12-24T09:50:12.945Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.447Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/如梦令 • 愿</loc>
------        <lastmod>2022-12-24T09:50:12.894Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.394Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/小诗</loc>
------        <lastmod>2022-12-24T09:50:12.921Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.421Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/巨人</loc>
------        <lastmod>2022-12-24T09:50:12.879Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.377Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/影</loc>
------        <lastmod>2022-12-24T09:50:12.903Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.401Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/徨</loc>
------        <lastmod>2022-12-24T09:50:12.979Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.486Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/忆忆思</loc>
------        <lastmod>2022-12-24T09:50:12.972Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.479Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/愿望</loc>
------        <lastmod>2022-12-24T09:50:12.948Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.453Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/我不会想见你</loc>
------        <lastmod>2022-12-24T09:50:12.845Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.340Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/摊破浣溪沙</loc>
------        <lastmod>2022-12-24T09:50:12.955Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.460Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/故事</loc>
------        <lastmod>2022-12-24T09:50:12.917Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.416Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/新光</loc>
------        <lastmod>2022-12-24T09:50:12.983Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.490Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/无题之一</loc>
------        <lastmod>2022-12-24T09:50:12.924Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.425Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/无题之二</loc>
------        <lastmod>2022-12-24T09:50:12.852Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.348Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/时光与你</loc>
------        <lastmod>2022-12-24T09:50:12.986Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.494Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/春秋三载</loc>
------        <lastmod>2022-12-24T09:50:12.934Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.436Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/期冀</loc>
------        <lastmod>2022-12-24T09:50:12.959Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.464Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/期待</loc>
------        <lastmod>2022-12-24T09:50:12.910Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.409Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/极端</loc>
------        <lastmod>2022-12-24T09:50:12.869Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.366Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/沉睡在天空之上</loc>
------        <lastmod>2022-12-24T09:50:12.838Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.332Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/清平乐 • 琴韵</loc>
------        <lastmod>2022-12-24T09:50:12.913Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.412Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/点绛唇 • 祈珍</loc>
------        <lastmod>2022-12-24T09:50:12.941Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.444Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/纸鸢</loc>
------        <lastmod>2022-12-24T09:50:12.866Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.362Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/给你</loc>
------        <lastmod>2022-12-24T09:50:12.897Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.398Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/继续</loc>
------        <lastmod>2022-12-24T09:50:12.969Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.475Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/至美</loc>
------        <lastmod>2022-12-24T09:50:12.876Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.374Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/蜕变</loc>
------        <lastmod>2022-12-24T09:50:12.965Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.472Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/行走</loc>
------        <lastmod>2022-12-24T09:50:12.931Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.432Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/行走在命运之上</loc>
------        <lastmod>2022-12-24T09:50:12.873Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.370Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/记 11 月 23 日 飘摇动荡</loc>
------        <lastmod>2022-12-24T09:50:12.883Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.383Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/诗词总录</loc>
------        <lastmod>2022-12-24T09:50:12.831Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.325Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/赠君</loc>
------        <lastmod>2022-12-24T09:50:12.906Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.405Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/迷途</loc>
------        <lastmod>2022-12-24T09:50:12.962Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.468Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/酒</loc>
------        <lastmod>2022-12-24T09:50:12.842Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.337Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/释放一只蝴蝶</loc>
------        <lastmod>2022-12-24T09:50:12.862Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.359Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/顽柔</loc>
------        <lastmod>2022-12-24T09:50:12.928Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.428Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/诗词/鸡尾酒</loc>
------        <lastmod>2022-12-24T09:50:12.855Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.351Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/赠与/千人感谢祭名单</loc>
------        <lastmod>2022-12-24T09:50:12.648Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.096Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/赠与/给三年后自己的一封信</loc>
------        <lastmod>2022-12-24T09:50:12.655Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.105Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/赠与/致两年前自己的回信</loc>
------        <lastmod>2022-12-24T09:50:12.658Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.108Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/赠与/致两年后自己的一封信</loc>
------        <lastmod>2022-12-24T09:50:12.665Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.115Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/赠与/致南国微雪频道每一位订阅者的一封信</loc>
------        <lastmod>2022-12-24T09:50:12.662Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.112Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/赠与/赠与</loc>
------        <lastmod>2022-12-24T09:50:12.645Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.092Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/赠与/频道千人感谢祭</loc>
------        <lastmod>2022-12-24T09:50:12.651Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.100Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记</loc>
------        <lastmod>2022-12-24T09:50:12.669Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.119Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2020 年 10 月 17 日</loc>
------        <lastmod>2022-12-24T09:50:12.824Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.318Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2020 年 5 月 15 日</loc>
------        <lastmod>2022-12-24T09:50:12.828Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.322Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 1 月 28 日</loc>
------        <lastmod>2022-12-24T09:50:12.818Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.314Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 2 日</loc>
------        <lastmod>2022-12-24T09:50:12.739Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.217Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 22 日</loc>
------        <lastmod>2022-12-24T09:50:12.732Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.207Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 24 日</loc>
------        <lastmod>2022-12-24T09:50:12.729Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.203Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 6 日</loc>
------        <lastmod>2022-12-24T09:50:12.736Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.211Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 11 月 19 日</loc>
------        <lastmod>2022-12-24T09:50:12.726Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.199Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 11 月 30 日</loc>
------        <lastmod>2022-12-24T09:50:12.722Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.193Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 12 月 26 日</loc>
------        <lastmod>2022-12-24T09:50:12.719Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.188Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 2 月 3 日</loc>
------        <lastmod>2022-12-24T09:50:12.815Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.310Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 2 月 7 日</loc>
------        <lastmod>2022-12-24T09:50:12.811Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.306Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 3 月 26 日</loc>
------        <lastmod>2022-12-24T09:50:12.804Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.299Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 3 月 31 日</loc>
------        <lastmod>2022-12-24T09:50:12.801Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.295Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 3 月 5 日</loc>
------        <lastmod>2022-12-24T09:50:12.808Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.303Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 5 月 10 日</loc>
------        <lastmod>2022-12-24T09:50:12.797Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.291Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 5 月 18 日</loc>
------        <lastmod>2022-12-24T09:50:12.794Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.288Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 5 月 21 日</loc>
------        <lastmod>2022-12-24T09:50:12.790Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.284Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 6 月 11 日</loc>
------        <lastmod>2022-12-24T09:50:12.780Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.272Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 6 月 6 日</loc>
------        <lastmod>2022-12-24T09:50:12.787Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.280Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 6 月 7 日</loc>
------        <lastmod>2022-12-24T09:50:12.783Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.276Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 14 日</loc>
------        <lastmod>2022-12-24T09:50:12.766Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.256Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 2 日</loc>
------        <lastmod>2022-12-24T09:50:12.770Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.260Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 21 日</loc>
------        <lastmod>2022-12-24T09:50:12.763Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.252Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 27 日</loc>
------        <lastmod>2022-12-24T09:50:12.760Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.248Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 8 月 2 日</loc>
------        <lastmod>2022-12-24T09:50:12.756Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.244Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 8 月 31 日</loc>
------        <lastmod>2022-12-24T09:50:12.753Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.240Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 9 月 15 日</loc>
------        <lastmod>2022-12-24T09:50:12.749Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.236Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 9 月 16 日</loc>
------        <lastmod>2022-12-24T09:50:12.746Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.229Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 9 月 30 日</loc>
------        <lastmod>2022-12-24T09:50:12.742Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.222Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 1 月 20 日</loc>
------        <lastmod>2022-12-24T09:50:12.715Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.185Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 2 月 10 日</loc>
------        <lastmod>2022-12-24T09:50:12.709Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.175Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 2 月 17 日</loc>
------        <lastmod>2022-12-24T09:50:12.705Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.171Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 2 月 7 日</loc>
------        <lastmod>2022-12-24T09:50:12.712Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.180Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 3 月 13 日</loc>
------        <lastmod>2022-12-24T09:50:12.702Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.167Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 3 月 28 日</loc>
------        <lastmod>2022-12-24T09:50:12.698Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.160Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 4 月 1 日</loc>
------        <lastmod>2022-12-24T09:50:12.695Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.154Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 4 月 3 日</loc>
------        <lastmod>2022-12-24T09:50:12.691Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.150Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 5 月 2 日</loc>
------        <lastmod>2022-12-24T09:50:12.688Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.146Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 5 月 25 日</loc>
------        <lastmod>2022-12-24T09:50:12.685Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.141Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 6 月 3 日</loc>
------        <lastmod>2022-12-24T09:50:12.681Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.137Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 7 月 13 日</loc>
------        <lastmod>2022-12-24T09:50:12.674Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.128Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 7 月 21 日</loc>
------        <lastmod>2022-12-24T09:50:12.672Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.124Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 7 月 7 日</loc>
------        <lastmod>2022-12-24T09:50:12.678Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.132Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记之一 - 2021 年 6 月 13 日</loc>
------        <lastmod>2022-12-24T09:50:12.777Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.269Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/断章/随记/随记之二 - 2021 年 6 月 13 日</loc>
------        <lastmod>2022-12-24T09:50:12.773Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.265Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/笔记/教程/Basic Elements</loc>
------        <lastmod>2022-12-24T09:50:13.096Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.613Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/笔记/教程/Git 笔记</loc>
------        <lastmod>2022-12-24T09:50:13.092Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.609Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/笔记/教程/Street Dance Basics</loc>
------        <lastmod>2022-12-24T09:50:13.100Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.618Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/笔记/教程/教程</loc>
------        <lastmod>2022-12-24T09:50:13.083Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.601Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/笔记/教程/重装系统</loc>
------        <lastmod>2022-12-24T09:50:13.087Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.605Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/笔记/记录/已读书目记录</loc>
------        <lastmod>2022-12-24T09:50:13.076Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.593Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/笔记/记录/游玩游戏记录</loc>
------        <lastmod>2022-12-24T09:50:13.080Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.597Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/笔记/记录/观影记录</loc>
------        <lastmod>2022-12-24T09:50:13.068Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.585Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/笔记/记录/记录</loc>
------        <lastmod>2022-12-24T09:50:13.064Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.581Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/笔记/记录/软件订阅记录</loc>
------        <lastmod>2022-12-24T09:50:13.072Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:24.589Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/Packages</loc>
------        <lastmod>2022-12-24T09:50:12.219Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.649Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/SVT-HEVC</loc>
------        <lastmod>2022-12-24T09:50:12.257Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.687Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/SVT-VP9</loc>
------        <lastmod>2022-12-24T09:50:12.243Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.674Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/distrobuilder</loc>
------        <lastmod>2022-12-24T09:50:12.275Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.705Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/fluidd</loc>
------        <lastmod>2022-12-24T09:50:12.223Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.653Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/fulcio(Learning)</loc>
------        <lastmod>2022-12-24T09:50:12.267Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.698Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/gnuchess</loc>
------        <lastmod>2022-12-24T09:50:12.234Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.665Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/grafana-agent</loc>
------        <lastmod>2022-12-24T09:50:12.260Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.691Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/imagescan</loc>
------        <lastmod>2022-12-24T09:50:12.227Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.657Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/libgovirt(Learning)</loc>
------        <lastmod>2022-12-24T09:50:12.271Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.701Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/libopenraw</loc>
------        <lastmod>2022-12-24T09:50:12.230Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.661Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/system-config-printer</loc>
------        <lastmod>2022-12-24T09:50:12.264Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.695Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Java/文件模板/JDBC 连接数据库驱动常用写法</loc>
------        <lastmod>2022-12-24T09:50:12.334Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.766Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Java/文件模板/MyBatis 配置文件基本框架</loc>
------        <lastmod>2022-12-24T09:50:12.337Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.770Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Java/文件模板/Spring 配置文件基本框架</loc>
------        <lastmod>2022-12-24T09:50:12.341Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.773Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/Java/文件模板/SpringBoot 项目搭建基本流程</loc>
------        <lastmod>2022-12-24T09:50:12.344Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.778Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/Wing 第三轮接口设计</loc>
------        <lastmod>2022-12-24T09:50:12.405Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.839Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio</loc>
------        <lastmod>2022-12-24T09:50:12.397Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.831Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第三轮考核说明文档</loc>
------        <lastmod>2022-12-24T09:50:12.408Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.842Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第三轮项目途中报错及解决方案</loc>
------        <lastmod>2022-12-24T09:50:12.414Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.849Z</lastmod>
-----     </url>
-----     <url>
-----         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第二轮考核 工程实现记录</loc>
------        <lastmod>2022-12-24T09:50:12.401Z</lastmod>
-----+        <lastmod>2022-12-27T07:51:23.835Z</lastmod>
-----     </url>
----- </urlset>
-----```
----```
---```
---
---## sitemap.xml
---
---```diff
---
---@@ -2,1138 +2,1138 @@
--- <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
---     <url>
---         <loc>https://tinysnow.github.io/</loc>
----        <lastmod>2022-12-27T07:51:23.621Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.639Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/last-updated</loc>
----        <lastmod>2022-12-27T07:51:23.626Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.654Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/个人简介</loc>
----        <lastmod>2022-12-27T07:51:23.618Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.637Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/问题总表</loc>
----        <lastmod>2022-12-27T07:51:23.629Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.658Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/学习</loc>
----        <lastmod>2022-12-27T07:51:23.882Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.948Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/小说</loc>
----        <lastmod>2022-12-27T07:51:24.622Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.642Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Errors</loc>
----        <lastmod>2022-12-27T07:51:23.641Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.672Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Knowledge</loc>
----        <lastmod>2022-12-27T07:51:23.637Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.666Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/技术</loc>
----        <lastmod>2022-12-27T07:51:23.631Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.661Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/断章</loc>
----        <lastmod>2022-12-27T07:51:23.983Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.049Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/笔记/笔记</loc>
----        <lastmod>2022-12-27T07:51:24.578Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.599Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/读书/读书</loc>
----        <lastmod>2022-12-27T07:51:24.574Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.595Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/公共基础知识/中国近现代史</loc>
----        <lastmod>2022-12-27T07:51:23.949Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.016Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/公共基础知识/公共基础知识</loc>
----        <lastmod>2022-12-27T07:51:23.923Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.989Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/公共基础知识/公文</loc>
----        <lastmod>2022-12-27T07:51:23.957Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.024Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/公共基础知识/刑法</loc>
----        <lastmod>2022-12-27T07:51:23.935Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.001Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/公共基础知识/宪法</loc>
----        <lastmod>2022-12-27T07:51:23.927Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.993Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/公共基础知识/民法</loc>
----        <lastmod>2022-12-27T07:51:23.931Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.997Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/公共基础知识/经济学</loc>
----        <lastmod>2022-12-27T07:51:23.953Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.020Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/公共基础知识/经济法</loc>
----        <lastmod>2022-12-27T07:51:23.942Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.008Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/公共基础知识/行政法</loc>
----        <lastmod>2022-12-27T07:51:23.938Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.005Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/公共基础知识/马克思主义哲学</loc>
----        <lastmod>2022-12-27T07:51:23.946Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.012Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/日语/句型整理</loc>
----        <lastmod>2022-12-27T07:51:23.896Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.962Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/日语/日语</loc>
----        <lastmod>2022-12-27T07:51:23.893Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.958Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/日语/日语易错词</loc>
----        <lastmod>2022-12-27T07:51:23.900Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.965Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/日语/日语语法整理</loc>
----        <lastmod>2022-12-27T07:51:23.905Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.970Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/法语/法语</loc>
----        <lastmod>2022-12-27T07:51:23.885Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.951Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/法语/简明法语教程笔记</loc>
----        <lastmod>2022-12-27T07:51:23.890Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.955Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/管理学/概论</loc>
----        <lastmod>2022-12-27T07:51:23.912Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.977Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/管理学/管理学</loc>
----        <lastmod>2022-12-27T07:51:23.908Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.974Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/管理学/组织</loc>
----        <lastmod>2022-12-27T07:51:23.919Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.985Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/管理学/规章制度</loc>
----        <lastmod>2022-12-27T07:51:23.916Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.981Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/零碎知识整理/中文书面语</loc>
----        <lastmod>2022-12-27T07:51:23.972Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.038Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/零碎知识整理/俄语译码表</loc>
----        <lastmod>2022-12-27T07:51:23.968Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.035Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/零碎知识整理/分享想法</loc>
----        <lastmod>2022-12-27T07:51:23.979Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.046Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/零碎知识整理/毕业设计</loc>
----        <lastmod>2022-12-27T07:51:23.975Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.042Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/零碎知识整理/经济和金融产品理解</loc>
----        <lastmod>2022-12-27T07:51:23.964Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.031Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/学习/零碎知识整理/零碎知识整理</loc>
----        <lastmod>2022-12-27T07:51:23.960Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.027Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/其他小说/Chapter 1</loc>
----        <lastmod>2022-12-27T07:51:24.744Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.763Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/其他小说/其他小说</loc>
----        <lastmod>2022-12-27T07:51:24.719Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.741Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/其他小说/夜天盛世夜天梦</loc>
----        <lastmod>2022-12-27T07:51:24.730Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.752Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/其他小说/小说设定</loc>
----        <lastmod>2022-12-27T07:51:24.740Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.760Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/其他小说/恋人之间的秘密</loc>
----        <lastmod>2022-12-27T07:51:24.736Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.756Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/其他小说/第一章 冲击</loc>
----        <lastmod>2022-12-27T07:51:24.723Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.744Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/其他小说/第二章 巨变</loc>
----        <lastmod>2022-12-27T07:51:24.726Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.748Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练</loc>
----        <lastmod>2022-12-27T07:51:24.625Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.646Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 公主与夫人（《欢恋》番外）</loc>
----        <lastmod>2022-12-27T07:51:24.638Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.658Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 少女的夏天</loc>
----        <lastmod>2022-12-27T07:51:24.712Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.732Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 就算是厨师也能照亮他人</loc>
----        <lastmod>2022-12-27T07:51:24.672Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.693Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 散打很温柔</loc>
----        <lastmod>2022-12-27T07:51:24.668Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.689Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 昂贵的教师</loc>
----        <lastmod>2022-12-27T07:51:24.708Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.728Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 普通</loc>
----        <lastmod>2022-12-27T07:51:24.684Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.705Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 欺负人</loc>
----        <lastmod>2022-12-27T07:51:24.704Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.724Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 满足</loc>
----        <lastmod>2022-12-27T07:51:24.700Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.720Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 美术生的夜晚</loc>
----        <lastmod>2022-12-27T07:51:24.664Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.685Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 芭蕾舞者欺负人</loc>
----        <lastmod>2022-12-27T07:51:24.676Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.697Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 认真地发光</loc>
----        <lastmod>2022-12-27T07:51:24.696Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.717Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 设计师想要恋爱</loc>
----        <lastmod>2022-12-27T07:51:24.687Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.709Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 证明你喜欢</loc>
----        <lastmod>2022-12-27T07:51:24.660Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.681Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 遗留</loc>
----        <lastmod>2022-12-27T07:51:24.715Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.735Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 酒保与冷静</loc>
----        <lastmod>2022-12-27T07:51:24.692Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.713Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之一</loc>
----        <lastmod>2022-12-27T07:51:24.680Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.701Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之三</loc>
----        <lastmod>2022-12-27T07:51:24.652Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.673Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之二</loc>
----        <lastmod>2022-12-27T07:51:24.656Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.677Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之五</loc>
----        <lastmod>2022-12-27T07:51:24.645Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.666Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之六</loc>
----        <lastmod>2022-12-27T07:51:24.642Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.662Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之四</loc>
----        <lastmod>2022-12-27T07:51:24.649Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.669Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/有些事情，不应转瞬即逝</loc>
----        <lastmod>2022-12-27T07:51:24.629Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.650Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/小说/想象力训练/深入骨髓</loc>
----        <lastmod>2022-12-27T07:51:24.634Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.654Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/ArchRISC-V</loc>
----        <lastmod>2022-12-27T07:51:23.645Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.676Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/FrequentlyUsed</loc>
----        <lastmod>2022-12-27T07:51:23.709Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.762Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/IssueTemplate</loc>
----        <lastmod>2022-12-27T07:51:23.714Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.767Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Workflow</loc>
----        <lastmod>2022-12-27T07:51:23.718Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.773Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/工作</loc>
----        <lastmod>2022-12-27T07:51:23.722Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.779Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Java/AnnotationsAndReflection</loc>
----        <lastmod>2022-12-27T07:51:23.753Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.817Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Java/HighConcurrencyKnowledge</loc>
----        <lastmod>2022-12-27T07:51:23.756Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.820Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Java/Java</loc>
----        <lastmod>2022-12-27T07:51:23.739Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.804Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Java/JavaThreads</loc>
----        <lastmod>2022-12-27T07:51:23.747Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.813Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Java/KotlinNote</loc>
----        <lastmod>2022-12-27T07:51:23.760Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.824Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Java/文件模板</loc>
----        <lastmod>2022-12-27T07:51:23.763Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.827Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Java/集合</loc>
----        <lastmod>2022-12-27T07:51:23.743Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.808Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/Android 常用闭包</loc>
----        <lastmod>2022-12-27T07:51:23.856Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.922Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/Android 笔记截图</loc>
----        <lastmod>2022-12-27T07:51:23.852Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.918Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/Bash 代表命令</loc>
----        <lastmod>2022-12-27T07:51:23.789Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.854Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/CCleaner 清理项</loc>
----        <lastmod>2022-12-27T07:51:23.859Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.925Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/Git 学习笔记</loc>
----        <lastmod>2022-12-27T07:51:23.785Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.850Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/MATLAB 复习</loc>
----        <lastmod>2022-12-27T07:51:23.804Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.870Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/PWN College Solutions</loc>
----        <lastmod>2022-12-27T07:51:23.821Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.886Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/Recovery + Root 掉落重新刷入方法</loc>
----        <lastmod>2022-12-27T07:51:23.863Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.929Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/SolutionsAndSteps</loc>
----        <lastmod>2022-12-27T07:51:23.875Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.941Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/Tic-tac-toe Game Note of React</loc>
----        <lastmod>2022-12-27T07:51:23.870Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.936Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/Uniapp 从 HX 迁移到 WebStorm</loc>
----        <lastmod>2022-12-27T07:51:23.824Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.890Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/临时</loc>
----        <lastmod>2022-12-27T07:51:23.879Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.944Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/其他资料</loc>
----        <lastmod>2022-12-27T07:51:23.781Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.845Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/发送软件清单及其作用解释</loc>
----        <lastmod>2022-12-27T07:51:23.867Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.932Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/汇编复习笔记</loc>
----        <lastmod>2022-12-27T07:51:23.801Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.867Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/第一个 Bash 脚本</loc>
----        <lastmod>2022-12-27T07:51:23.793Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.858Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/给计算机 202102 班的选修课建议</loc>
----        <lastmod>2022-12-27T07:51:23.828Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.893Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/设计模式极简笔记</loc>
----        <lastmod>2022-12-27T07:51:23.796Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.862Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/软件知识补充</loc>
----        <lastmod>2022-12-27T07:51:23.808Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.874Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/重装系统 8-7</loc>
----        <lastmod>2022-12-27T07:51:23.815Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.881Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/重装系统知识</loc>
----        <lastmod>2022-12-27T07:51:23.812Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.877Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/第一章：计算机的历史</loc>
----        <lastmod>2022-12-27T07:51:23.728Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.790Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/第三章：简单逻辑门</loc>
----        <lastmod>2022-12-27T07:51:23.736Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.800Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/第二章：计算机的构成</loc>
----        <lastmod>2022-12-27T07:51:23.732Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.795Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/计算机科学极简入门指南</loc>
----        <lastmod>2022-12-27T07:51:23.725Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.784Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/句子/句子</loc>
----        <lastmod>2022-12-27T07:51:24.535Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.561Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/句子/日记扉页</loc>
----        <lastmod>2022-12-27T07:51:24.540Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.565Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/句子/随记断句</loc>
----        <lastmod>2022-12-27T07:51:24.543Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.569Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/感触/感触</loc>
----        <lastmod>2022-12-27T07:51:24.497Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.522Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/感触/感触之一</loc>
----        <lastmod>2022-12-27T07:51:24.520Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.546Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/感触/感触之三</loc>
----        <lastmod>2022-12-27T07:51:24.513Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.538Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/感触/感触之二</loc>
----        <lastmod>2022-12-27T07:51:24.517Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.542Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/感触/感触之五</loc>
----        <lastmod>2022-12-27T07:51:24.505Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.529Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/感触/感触之六</loc>
----        <lastmod>2022-12-27T07:51:24.501Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.525Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/感触/感触之四</loc>
----        <lastmod>2022-12-27T07:51:24.509Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.535Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/感触/无题</loc>
----        <lastmod>2022-12-27T07:51:24.528Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.553Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/感触/遇见 今天</loc>
----        <lastmod>2022-12-27T07:51:24.524Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.550Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/感触/零言碎语</loc>
----        <lastmod>2022-12-27T07:51:24.532Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.557Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/一点看法</loc>
----        <lastmod>2022-12-27T07:51:24.081Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.143Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/为了爱情，是否应该舍弃友情？</loc>
----        <lastmod>2022-12-27T07:51:24.019Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.083Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/你一定走了很远的路吧 - 姬霄</loc>
----        <lastmod>2022-12-27T07:51:24.023Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.087Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/冰面少年</loc>
----        <lastmod>2022-12-27T07:51:24.012Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.076Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/前行</loc>
----        <lastmod>2022-12-27T07:51:24.059Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.123Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/反抗</loc>
----        <lastmod>2022-12-27T07:51:24.048Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.111Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/哥，咱家要散了</loc>
----        <lastmod>2022-12-27T07:51:24.063Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.126Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/回望大二</loc>
----        <lastmod>2022-12-27T07:51:24.034Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.097Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/境遇</loc>
----        <lastmod>2022-12-27T07:51:24.056Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.119Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/奴化圣经</loc>
----        <lastmod>2022-12-27T07:51:24.052Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.115Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/所想所见即真实</loc>
----        <lastmod>2022-12-27T07:51:24.030Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.094Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/文章</loc>
----        <lastmod>2022-12-27T07:51:23.987Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.052Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/暑期总结与瑰想</loc>
----        <lastmod>2022-12-27T07:51:24.067Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.129Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/月圆夜</loc>
----        <lastmod>2022-12-27T07:51:24.045Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.108Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/烟火自述</loc>
----        <lastmod>2022-12-27T07:51:23.998Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.062Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/番茄</loc>
----        <lastmod>2022-12-27T07:51:24.037Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.101Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/篮球女孩</loc>
----        <lastmod>2022-12-27T07:51:24.008Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.072Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/给女性</loc>
----        <lastmod>2022-12-27T07:51:24.001Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.066Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/给男性</loc>
----        <lastmod>2022-12-27T07:51:23.994Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.059Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/色气之下，清纯最大</loc>
----        <lastmod>2022-12-27T07:51:24.074Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.136Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/茉莉清茶</loc>
----        <lastmod>2022-12-27T07:51:24.026Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.090Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/蕴愈彼此，共渡红尘</loc>
----        <lastmod>2022-12-27T07:51:24.085Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.147Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/语言漫谈</loc>
----        <lastmod>2022-12-27T07:51:24.005Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.069Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/追随</loc>
----        <lastmod>2022-12-27T07:51:24.078Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.140Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/通往优秀的路上，痛苦是一种试炼</loc>
----        <lastmod>2022-12-27T07:51:24.089Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.151Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/阑珊，散落人间</loc>
----        <lastmod>2022-12-27T07:51:23.990Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.055Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/随便聊聊</loc>
----        <lastmod>2022-12-27T07:51:24.070Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.133Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/随想录</loc>
----        <lastmod>2022-12-27T07:51:24.041Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.104Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/文章/韧尽万花春绽美，待到寒冬自释香 - 2021年度总结</loc>
----        <lastmod>2022-12-27T07:51:24.016Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.080Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/胡言/心情</loc>
----        <lastmod>2022-12-27T07:51:24.569Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.592Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/胡言/胡言</loc>
----        <lastmod>2022-12-27T07:51:24.547Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.573Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之一</loc>
----        <lastmod>2022-12-27T07:51:24.566Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.588Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之三</loc>
----        <lastmod>2022-12-27T07:51:24.555Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.580Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之二</loc>
----        <lastmod>2022-12-27T07:51:24.559Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.584Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之四</loc>
----        <lastmod>2022-12-27T07:51:24.551Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.577Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/Hide and Seek</loc>
----        <lastmod>2022-12-27T07:51:24.483Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.507Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/一如既往</loc>
----        <lastmod>2022-12-27T07:51:24.329Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.359Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/一瞬间</loc>
----        <lastmod>2022-12-27T07:51:24.386Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.414Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/不屈</loc>
----        <lastmod>2022-12-27T07:51:24.440Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.465Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/减字木兰花 · 伊愿</loc>
----        <lastmod>2022-12-27T07:51:24.344Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.374Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/变</loc>
----        <lastmod>2022-12-27T07:51:24.456Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.480Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/复活</loc>
----        <lastmod>2022-12-27T07:51:24.355Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.385Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/夏影</loc>
----        <lastmod>2022-12-27T07:51:24.390Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.418Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/天仙子 • 忆灵</loc>
----        <lastmod>2022-12-27T07:51:24.447Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.473Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/如梦令 • 愿</loc>
----        <lastmod>2022-12-27T07:51:24.394Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.421Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/小诗</loc>
----        <lastmod>2022-12-27T07:51:24.421Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.447Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/巨人</loc>
----        <lastmod>2022-12-27T07:51:24.377Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.407Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/影</loc>
----        <lastmod>2022-12-27T07:51:24.401Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.429Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/徨</loc>
----        <lastmod>2022-12-27T07:51:24.486Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.511Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/忆忆思</loc>
----        <lastmod>2022-12-27T07:51:24.479Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.503Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/愿望</loc>
----        <lastmod>2022-12-27T07:51:24.453Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.476Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/我不会想见你</loc>
----        <lastmod>2022-12-27T07:51:24.340Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.370Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/摊破浣溪沙</loc>
----        <lastmod>2022-12-27T07:51:24.460Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.485Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/故事</loc>
----        <lastmod>2022-12-27T07:51:24.416Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.443Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/新光</loc>
----        <lastmod>2022-12-27T07:51:24.490Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.515Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/无题之一</loc>
----        <lastmod>2022-12-27T07:51:24.425Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.451Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/无题之二</loc>
----        <lastmod>2022-12-27T07:51:24.348Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.378Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/时光与你</loc>
----        <lastmod>2022-12-27T07:51:24.494Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.518Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/春秋三载</loc>
----        <lastmod>2022-12-27T07:51:24.436Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.462Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/期冀</loc>
----        <lastmod>2022-12-27T07:51:24.464Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.489Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/期待</loc>
----        <lastmod>2022-12-27T07:51:24.409Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.436Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/极端</loc>
----        <lastmod>2022-12-27T07:51:24.366Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.396Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/沉睡在天空之上</loc>
----        <lastmod>2022-12-27T07:51:24.332Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.363Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/清平乐 • 琴韵</loc>
----        <lastmod>2022-12-27T07:51:24.412Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.440Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/点绛唇 • 祈珍</loc>
----        <lastmod>2022-12-27T07:51:24.444Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.469Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/纸鸢</loc>
----        <lastmod>2022-12-27T07:51:24.362Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.392Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/给你</loc>
----        <lastmod>2022-12-27T07:51:24.398Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.425Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/继续</loc>
----        <lastmod>2022-12-27T07:51:24.475Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.499Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/至美</loc>
----        <lastmod>2022-12-27T07:51:24.374Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.403Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/蜕变</loc>
----        <lastmod>2022-12-27T07:51:24.472Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.496Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/行走</loc>
----        <lastmod>2022-12-27T07:51:24.432Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.458Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/行走在命运之上</loc>
----        <lastmod>2022-12-27T07:51:24.370Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.399Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/记 11 月 23 日 飘摇动荡</loc>
----        <lastmod>2022-12-27T07:51:24.383Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.410Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/诗词总录</loc>
----        <lastmod>2022-12-27T07:51:24.325Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.356Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/赠君</loc>
----        <lastmod>2022-12-27T07:51:24.405Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.433Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/迷途</loc>
----        <lastmod>2022-12-27T07:51:24.468Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.493Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/酒</loc>
----        <lastmod>2022-12-27T07:51:24.337Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.367Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/释放一只蝴蝶</loc>
----        <lastmod>2022-12-27T07:51:24.359Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.389Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/顽柔</loc>
----        <lastmod>2022-12-27T07:51:24.428Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.455Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/诗词/鸡尾酒</loc>
----        <lastmod>2022-12-27T07:51:24.351Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.381Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/赠与/千人感谢祭名单</loc>
----        <lastmod>2022-12-27T07:51:24.096Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.159Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/赠与/给三年后自己的一封信</loc>
----        <lastmod>2022-12-27T07:51:24.105Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.166Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/赠与/致两年前自己的回信</loc>
----        <lastmod>2022-12-27T07:51:24.108Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.170Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/赠与/致两年后自己的一封信</loc>
----        <lastmod>2022-12-27T07:51:24.115Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.177Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/赠与/致南国微雪频道每一位订阅者的一封信</loc>
----        <lastmod>2022-12-27T07:51:24.112Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.174Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/赠与/赠与</loc>
----        <lastmod>2022-12-27T07:51:24.092Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.155Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/赠与/频道千人感谢祭</loc>
----        <lastmod>2022-12-27T07:51:24.100Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.162Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记</loc>
----        <lastmod>2022-12-27T07:51:24.119Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.181Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2020 年 10 月 17 日</loc>
----        <lastmod>2022-12-27T07:51:24.318Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.348Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2020 年 5 月 15 日</loc>
----        <lastmod>2022-12-27T07:51:24.322Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.352Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 1 月 28 日</loc>
----        <lastmod>2022-12-27T07:51:24.314Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.345Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 2 日</loc>
----        <lastmod>2022-12-27T07:51:24.217Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.260Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 22 日</loc>
----        <lastmod>2022-12-27T07:51:24.207Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.251Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 24 日</loc>
----        <lastmod>2022-12-27T07:51:24.203Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.248Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 6 日</loc>
----        <lastmod>2022-12-27T07:51:24.211Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.257Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 11 月 19 日</loc>
----        <lastmod>2022-12-27T07:51:24.199Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.242Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 11 月 30 日</loc>
----        <lastmod>2022-12-27T07:51:24.193Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.238Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 12 月 26 日</loc>
----        <lastmod>2022-12-27T07:51:24.188Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.235Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 2 月 3 日</loc>
----        <lastmod>2022-12-27T07:51:24.310Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.341Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 2 月 7 日</loc>
----        <lastmod>2022-12-27T07:51:24.306Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.337Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 3 月 26 日</loc>
----        <lastmod>2022-12-27T07:51:24.299Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.330Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 3 月 31 日</loc>
----        <lastmod>2022-12-27T07:51:24.295Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.326Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 3 月 5 日</loc>
----        <lastmod>2022-12-27T07:51:24.303Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.334Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 5 月 10 日</loc>
----        <lastmod>2022-12-27T07:51:24.291Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.322Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 5 月 18 日</loc>
----        <lastmod>2022-12-27T07:51:24.288Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.318Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 5 月 21 日</loc>
----        <lastmod>2022-12-27T07:51:24.284Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.315Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 6 月 11 日</loc>
----        <lastmod>2022-12-27T07:51:24.272Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.304Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 6 月 6 日</loc>
----        <lastmod>2022-12-27T07:51:24.280Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.311Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 6 月 7 日</loc>
----        <lastmod>2022-12-27T07:51:24.276Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.308Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 14 日</loc>
----        <lastmod>2022-12-27T07:51:24.256Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.290Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 2 日</loc>
----        <lastmod>2022-12-27T07:51:24.260Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.293Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 21 日</loc>
----        <lastmod>2022-12-27T07:51:24.252Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.286Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 27 日</loc>
----        <lastmod>2022-12-27T07:51:24.248Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.283Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 8 月 2 日</loc>
----        <lastmod>2022-12-27T07:51:24.244Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.279Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 8 月 31 日</loc>
----        <lastmod>2022-12-27T07:51:24.240Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.276Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 9 月 15 日</loc>
----        <lastmod>2022-12-27T07:51:24.236Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.272Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 9 月 16 日</loc>
----        <lastmod>2022-12-27T07:51:24.229Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.268Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 9 月 30 日</loc>
----        <lastmod>2022-12-27T07:51:24.222Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.264Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 1 月 20 日</loc>
----        <lastmod>2022-12-27T07:51:24.185Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.231Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 2 月 10 日</loc>
----        <lastmod>2022-12-27T07:51:24.175Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.224Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 2 月 17 日</loc>
----        <lastmod>2022-12-27T07:51:24.171Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.220Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 2 月 7 日</loc>
----        <lastmod>2022-12-27T07:51:24.180Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.228Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 3 月 13 日</loc>
----        <lastmod>2022-12-27T07:51:24.167Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.217Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 3 月 28 日</loc>
----        <lastmod>2022-12-27T07:51:24.160Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.214Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 4 月 1 日</loc>
----        <lastmod>2022-12-27T07:51:24.154Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.210Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 4 月 3 日</loc>
----        <lastmod>2022-12-27T07:51:24.150Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.206Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 5 月 2 日</loc>
----        <lastmod>2022-12-27T07:51:24.146Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.203Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 5 月 25 日</loc>
----        <lastmod>2022-12-27T07:51:24.141Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.199Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 6 月 3 日</loc>
----        <lastmod>2022-12-27T07:51:24.137Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.196Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 7 月 13 日</loc>
----        <lastmod>2022-12-27T07:51:24.128Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.188Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 7 月 21 日</loc>
----        <lastmod>2022-12-27T07:51:24.124Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.184Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 7 月 7 日</loc>
----        <lastmod>2022-12-27T07:51:24.132Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.192Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记之一 - 2021 年 6 月 13 日</loc>
----        <lastmod>2022-12-27T07:51:24.269Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.301Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/断章/随记/随记之二 - 2021 年 6 月 13 日</loc>
----        <lastmod>2022-12-27T07:51:24.265Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.297Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/笔记/教程/Basic Elements</loc>
----        <lastmod>2022-12-27T07:51:24.613Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.634Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/笔记/教程/Git 笔记</loc>
----        <lastmod>2022-12-27T07:51:24.609Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.629Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/笔记/教程/Street Dance Basics</loc>
----        <lastmod>2022-12-27T07:51:24.618Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.638Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/笔记/教程/教程</loc>
----        <lastmod>2022-12-27T07:51:24.601Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.622Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/笔记/教程/重装系统</loc>
----        <lastmod>2022-12-27T07:51:24.605Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.626Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/笔记/记录/已读书目记录</loc>
----        <lastmod>2022-12-27T07:51:24.593Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.614Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/笔记/记录/游玩游戏记录</loc>
----        <lastmod>2022-12-27T07:51:24.597Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.618Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/笔记/记录/观影记录</loc>
----        <lastmod>2022-12-27T07:51:24.585Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.606Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/笔记/记录/记录</loc>
----        <lastmod>2022-12-27T07:51:24.581Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.603Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/笔记/记录/软件订阅记录</loc>
----        <lastmod>2022-12-27T07:51:24.589Z</lastmod>
---+        <lastmod>2022-12-27T12:03:58.610Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/Packages</loc>
----        <lastmod>2022-12-27T07:51:23.649Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.681Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/SVT-HEVC</loc>
----        <lastmod>2022-12-27T07:51:23.687Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.734Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/SVT-VP9</loc>
----        <lastmod>2022-12-27T07:51:23.674Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.715Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/distrobuilder</loc>
----        <lastmod>2022-12-27T07:51:23.705Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.757Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/fluidd</loc>
----        <lastmod>2022-12-27T07:51:23.653Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.687Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/fulcio(Learning)</loc>
----        <lastmod>2022-12-27T07:51:23.698Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.749Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/gnuchess</loc>
----        <lastmod>2022-12-27T07:51:23.665Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.701Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/grafana-agent</loc>
----        <lastmod>2022-12-27T07:51:23.691Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.741Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/imagescan</loc>
----        <lastmod>2022-12-27T07:51:23.657Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.693Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/libgovirt(Learning)</loc>
----        <lastmod>2022-12-27T07:51:23.701Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.753Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/libopenraw</loc>
----        <lastmod>2022-12-27T07:51:23.661Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.697Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/system-config-printer</loc>
----        <lastmod>2022-12-27T07:51:23.695Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.745Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Java/文件模板/JDBC 连接数据库驱动常用写法</loc>
----        <lastmod>2022-12-27T07:51:23.766Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.830Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Java/文件模板/MyBatis 配置文件基本框架</loc>
----        <lastmod>2022-12-27T07:51:23.770Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.834Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Java/文件模板/Spring 配置文件基本框架</loc>
----        <lastmod>2022-12-27T07:51:23.773Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.837Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/Java/文件模板/SpringBoot 项目搭建基本流程</loc>
----        <lastmod>2022-12-27T07:51:23.778Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.842Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/Wing 第三轮接口设计</loc>
----        <lastmod>2022-12-27T07:51:23.839Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.904Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio</loc>
----        <lastmod>2022-12-27T07:51:23.831Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.897Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第三轮考核说明文档</loc>
----        <lastmod>2022-12-27T07:51:23.842Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.908Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第三轮项目途中报错及解决方案</loc>
----        <lastmod>2022-12-27T07:51:23.849Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.915Z</lastmod>
---     </url>
---     <url>
---         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第二轮考核 工程实现记录</loc>
----        <lastmod>2022-12-27T07:51:23.835Z</lastmod>
---+        <lastmod>2022-12-27T12:03:57.901Z</lastmod>
---     </url>
--- </urlset>
---```
--```
--
--## 344272214345215201351246226346203205350257227345222214344270200351246226347273235346234233347232204346255214.md"
--
--```diff
--
--@@ -0,0 +1,517 @@
--+## 倚身在暮色里（Leaning Into The Afternoons）
--+
--+### 英文
--+
--+> Leaning into the afternoons I cast my sad nets
--+>
--+> towards your oceanic eyes.
--+>
--+> There in the highest blaze my solitude lengthens and flames,
--+>
--+> its arms turning like a drowning man's.
--+>
--+> I send out red signals across your absent eyes
--+>
--+> that move like the sea near a lighthouse.
--+>
--+> You keep only darkness, my distant female,
--+>
--+> from your regard sometimes the coast of dread emerges.
--+>
--+> Leaning into the afternoons I fling my sad nets
--+>
--+> to that sea that beats on your marine eyes.
--+>
--+> The birds of night peck at the first stars
--+>
--+> that flash like my soul when I love you.
--+>
--+> The night gallops on its shadowy mare
--+>
--+> shedding blue tassels over the land.
--+>
--+
--+### 译文其一
--+
--+> 倚身在暮色里，我朝你海洋般的双眼
--+>
--+> 投掷我哀伤的网。
--+>
--+> 我的孤独，在极度的光亮中绵延不绝，化为火焰，
--+>
--+> 双臂漫天飞舞仿佛将遭海难淹没。
--+>
--+> 越过你失神的双眼，我送出红色的信号，
--+>
--+> 你的双眼泛起涟漪，如靠近灯塔的海洋。
--+>
--+> 你保有黑暗，我远方的女子，
--+>
--+> 在你的注视之下有时恐惧的海岸浮现。
--+>
--+> 倚身在暮色，在拍打你海洋般双眼的海上
--+>
--+> 我掷出我哀伤的网。
--+>
--+> 夜晚的鸟群啄食第一阵群星，
--+>
--+> 像爱著你的我的灵魂，闪烁著。
--+>
--+> 夜在年阴郁的马上奔驰，
--+>
--+> 在大地上撒下蓝色的穗须。
--+>
--+
--+### 译文其二
--+
--+> 倚身于午后，我撒下忧伤的网
--+>
--+> 朝着你海洋般的眼眸。
--+>
--+> 在那烈火中，我的孤独延绵而灼烧，
--+>
--+> 如溺水者一般挥舞着手臂。
--+>
--+> 越过你失神的眼睛，我发出红色的讯号，
--+>
--+> 它汹涌如灯塔附近的海洋。
--+>
--+> 你空余幽暗，我那远方的女人，
--+>
--+> 在你的视线中时而浮现出可怕的礁岸。
--+>
--+> 倚身于午后，我撒下悲伤的网
--+>
--+> 向着拍击你海洋般眼眸的洋面。
--+>
--+> 夜晚的鸟群啄食初升的繁星，
--+>
--+> 闪烁如我恋你之时的魂灵。
--+>
--+> 夜色在晦暗的马背上驰骋，
--+>
--+> 在大地上撒下蓝色的缨穗。
--+>
--+
--+## 我们失去了黄昏（We Have Lost Even）
--+
--+### 英文
--+
--+> We have lost even this twilight..
--+>
--+> No one saw us this evening hand in hand.
--+>
--+> while the blue night dropped on the world.
--+>
--+> I have seen from my window
--+>
--+> the fiesta of sunset in the distant mountain tops.
--+>
--+> Sometimes a piece of sun
--+>
--+> burned like a coin between my hands.
--+>
--+> I remembered you with my soul clenched
--+>
--+> in that sadness of mine that you know.
--+>
--+> Where were you then?
--+>
--+> Who else was there?
--+>
--+> Saying what?
--+>
--+> Why will the whole of love come on me suddenly
--+>
--+> When I am sad and feel you are far away?
--+>
--+> The book fell that is always turned to at twilight
--+>
--+> and my cape rolled like a hurt dog at my feet.
--+>
--+> Always,always you recede through the evenings
--+>
--+> towards where the twilight goes erasing statues.
--+>
--+
--+### 译文其一
--+
--+> 我们失去了黄昏的颜色。
--+>
--+> 蓝色的夜坠落在世界上，
--+>
--+> 夜里没人看见我们手牵著手。
--+>
--+> 从我的窗户中我已经看见
--+>
--+> 在遥远的山顶上落日的祭典。
--+>
--+> 有时候一片太阳
--+>
--+> 在我的双掌间如硬币燃烧。
--+>
--+> 当我的灵魂与你所明了的哀伤紧紧相系时
--+>
--+> 我忆及了你。
--+>
--+> 彼时，你在哪里呢？
--+>
--+> 那里还有些什么人？
--+>
--+> 说些什么？
--+>
--+> 为什么当我哀伤且感觉到你远离时，
--+>
--+> 全部的爱会突如其然的来临呢？
--+>
--+> 暮色中如常发生的，书本掉落了下来，
--+>
--+> 我的披肩像受伤的小狗蜷躺在脚边。
--+>
--+> 总是如此，朝暮色抹去雕像的方向
--+>
--+> 你总是藉黄昏隐没。
--+>
--+
--+### 译文其二
--+
--+> 我们甚至遗失了这个黄昏。
--+>
--+> 今晚无人看到我俩手挽着手，
--+>
--+> 当蓝色之夜降临世间。
--+>
--+> 我透过我的窗户看见
--+>
--+> 远山之巅落日的祭典。
--+>
--+> 有时，一枚夕阳
--+>
--+> 如同硬币在我双手间焚烧
--+>
--+> 我忆及了你，我的灵魂紧攥于
--+>
--+> 你所熟悉的我的哀伤中。
--+>
--+> 彼时，你在哪里？
--+>
--+> 与谁同在？
--+>
--+> 私语些什么？
--+>
--+> 为何当我悲伤而感到你遥不可及，
--+>
--+> 全部的爱情会突然降临?
--+>
--+> 惯于在暮色中打开的书简掉在地上，
--+>
--+> 我的披肩蜷缩在脚下，像只受伤的小狗。
--+>
--+> 向来，你向来借助夜色隐没
--+>
--+> 向着暮色抹去雕像的方向。
--+>
--+
--+## 我喜欢你是寂静的（I Like For You To Be Still）
--+
--+### 英文
--+
--+> I like for you to be still: it is as though you were absent,
--+>
--+> and you hear me from far away and my voice does not touch you.
--+>
--+> It seems as though your eyes had flown away
--+>
--+> and it seems that a kiss had sealed your mouth.
--+>
--+> As all things are filled with my soul
--+>
--+> you emerge from the things, filled with my soul.
--+>
--+> You are like my soul, a butterfly of dream,
--+>
--+> and you are like the word Melancholy.
--+>
--+> I like for you to be still, and you seem far away.
--+>
--+> It sounds as though you were lamenting, a butterfly cooing like a dove.
--+>
--+> And you hear me from far away, and my voice does not reach you:
--+>
--+> Let me come to be still in your silence.
--+>
--+> And let me talk to you with your silence
--+>
--+> that is bright as a lamp, simple as a ring.
--+>
--+> You are like the night, with its stillness and constellations.
--+>
--+> Your silence is that of a star, as remote and candid.
--+>
--+> I like for you to be still: it is as though you were absent,
--+>
--+> distant and full of sorrow as though you had died.
--+>
--+> One word then, one smile, is enough.
--+>
--+> And I am happy, happy that it's not true.
--+>
--+
--+### 译文其一
--+
--+> 我喜欢你是寂静的，彷佛你消失了一样，
--+>
--+> 你从远处聆听我，我的声音却无法触及你。
--+>
--+> 好像你的双眼已经飞离远去，
--+>
--+> 如同一个吻，封缄了你的嘴。
--+>
--+> 如同所有的事物充满了我的灵魂，
--+>
--+> 你从所有的事物中浮现，充满了我的灵魂。
--+>
--+> 你像我的灵魂，一只梦的蝴蝶，
--+>
--+> 你如同忧郁这个字。
--+>
--+> 我喜欢你是寂静的，好像你已远去。
--+>
--+> 你听起来像在悲叹，一只如鸽悲鸣的蝴蝶。
--+>
--+> 你从远处听见我，我的声音无法企及你：
--+>
--+> 让我在你的沈默中安静无声。
--+>
--+> 并且让我藉你的沈默与你说话，
--+>
--+> 你的沈默明亮如灯，简单如指环。
--+>
--+> 如黑夜，拥有寂静与群星。
--+>
--+> 你的沈默就是星星的沈默，遥远而明亮。
--+>
--+> 我喜欢你是寂静的：彷佛你消失了一样，
--+>
--+> 遥远而且哀伤，彷佛你已经死了。
--+>
--+> 彼时，一个字，一个微笑，已经足够。
--+>
--+> 而我会觉得幸福，因那不是真的而觉得幸福。
--+>
--+
--+### 译文其二
--+
--+> 我喜欢你沉默不语，就像你消失了一般，
--+>
--+> 你远远倾听着我，而我的声音却捉摸不到你。
--+>
--+> 似乎你的眼神已经游离，
--+>
--+> 如同一个亲吻封缄了你的嘴。
--+>
--+> 如同万物充实了我的灵魂，
--+>
--+> 你从万物中浮现，充实了我的灵魂。
--+>
--+> 梦中的蝴蝶，你宛如我的灵魂，
--+>
--+> 你谐同“忧郁”这个词汇。
--+>
--+> 我喜欢你沉默不语，就像你已走远。
--+>
--+> 听起来你似乎在咏叹，一如鸽哨般喁喁蜜語的蝴蝶。
--+>
--+> 你远远倾听着我，而我的声音却无法企及你：
--+>
--+> 让我在你的沉默中陷入寂静。
--+>
--+> 且让我藉着你的沉默向你表白，
--+>
--+> 你的沉默明亮如灯盏，简洁如指环。
--+>
--+> 你宛如夜晚，寂静无声且群星密布。
--+>
--+> 你的沉默有如星星，遥远而纯洁。
--+>
--+> 我喜欢你沉默不语，就像你消失了一般，
--+>
--+> 遥远且满怀忧伤，仿佛你已逝去。
--+>
--+> 此时一句话，一丝微笑，就已足够。
--+>
--+> 而我很欣慰，庆幸那并非事实。
--+>
--+
--+## 我在这里爱你（Here I Love You）
--+
--+### 英文
--+
--+> Here I love you.
--+>
--+> In the dark pines the wind disentangles itself.
--+>
--+> The moon glows like phosphorous on the vagrant waters.
--+>
--+> Days, all one kind, go chasing each other.
--+>
--+> The snow unfurls in dancing figures.
--+>
--+> A silver gull slips down from the west.
--+>
--+> Sometimes a sail. High, high stars.
--+>
--+> Oh the black cross of a ship.
--+>
--+> Alone.
--+>
--+> Sometimes I get up early and even my soul is wet.
--+>
--+> Far away the sea sounds and resounds.
--+>
--+> This is a port.
--+>
--+> Here I love you.
--+>
--+> Here I love you and the horizon hides you in vain.
--+>
--+> I love you still among these cold things.
--+>
--+> Sometimes my kisses go on those heavy vessels
--+>
--+> that cross the sea towards no arrival.
--+>
--+> I see myself forgotten like those old anchors.
--+>
--+> The piers sadden when the afternoon moors there.
--+>
--+> My life grows tired, hungry to no purpose.
--+>
--+> I love what I do not have. You are so far.
--+>
--+> My loathing wrestles with the slow twilights.
--+>
--+> But night comes and starts to sing to me.
--+>
--+> The moon turns its clockwork dream.
--+>
--+> The biggest stars look at me with your eyes.
--+>
--+> And as I love you, the pines in the wind
--+>
--+> want to sing your name with their leaves of wire.
--+>
--+
--+### 译文其一
--+
--+> 我在这里爱你。
--+>
--+> 在黑暗的松林里，风解缚了自己。
--+>
--+> 月亮像磷光在漂浮的水面上发光。
--+>
--+> 白日，日复一日，彼此追逐。
--+>
--+> 雪以舞动的身姿迎风飘扬。
--+>
--+> 一只银色的海鸥从西边滑落。
--+>
--+> 有时是一艘船。高高的群星。
--+>
--+> 哦，船的黑色的十字架。
--+>
--+> 孤单的。
--+>
--+> 有时我在清晨苏醒，我的灵魂甚至还是湿的。
--+>
--+> 远远的，海洋鸣响并发出回声。
--+>
--+> 这是一个港口。
--+>
--+> 我在这里爱你。
--+>
--+> 我在这里爱你，而且地平线徒然的隐藏你。
--+>
--+> 在这些冰冷的事物中我仍然爱你。
--+>
--+> 有时我的吻藉这些阴郁的船只而行，
--+>
--+> 穿越海洋永无停息。
--+>
--+> 我看见我自己如这些古老的船锚一样遭人遗忘。
--+>
--+> 当暮色停泊在那里，码头变得哀伤。
--+>
--+> 而我的生命变得疲惫，无由的渴求。
--+>
--+> 我爱我所没有的。你如此的遥远。
--+>
--+> 我的憎恶与缓慢的暮色搏斗。
--+>
--+> 但夜来临并开始对我歌唱。
--+>
--+> 月亮转动他齿轮般的梦。
--+>
--+> 最大的星星藉著你的双眼凝视著我。
--+>
--+> 当我爱你时，风中的松树
--+>
--+> 要以他们丝线般的叶子唱你的名字。
--+>
--+
--+### 译文其二
--+
--+> 我在这儿爱你。
--+>
--+> 在幽暗的松林里，风解缚了自己。
--+>
--+> 月亮在荡漾的水面上像磷火一样闪光。
--+>
--+> 白昼，日复一日，彼此追逐。
--+>
--+> 雪花舞姿招展。
--+>
--+> 银白的水鸥在西边滑翔。
--+>
--+> 间或有一片帆，高高的星宿。
--+>
--+> 哦，船的黑色十字架。
--+>
--+> 孑然。
--+>
--+> 有时我从清晨醒来，甚至我的灵魂也是湿的。
--+>
--+> 远处海在呜鸣，伴着回响。
--+>
--+> 这是一个港湾。
--+>
--+> 我在这儿爱你。
--+>
--+> 我在这儿爱你，地平线徒然将你隐藏。
--+>
--+> 在这些冰冷事物中，我依然爱你。
--+>
--+> 有时我的亲吻乘上沉重的船舶。
--+>
--+> 漂洋过海，无从停靠。
--+>
--+> 我目睹自己如那些旧锚一般遭到遗忘。
--+>
--+> 当午后停泊在那里，码头变得凄凉。
--+>
--+> 我的生命变得疲倦，了无旨意的渴求。
--+>
--+> 我爱着我无从拥有的，你是如此遥远。
--+>
--+> 我的憎恨与迟缓的暮色争斗。
--+>
--+> 而夜幕降临，并开始为我歌唱。
--+>
--+> 月亮上紧了它梦的发条。
--+>
--+> 最大的星星藉着你的眼睛凝望着我。
--+>
--+> 当我爱你时，风中的松树
--+>
--+> 便用它们丝丝针叶吟唱你的名字。
--+
--```
--
--## 344272272351227264345221212347231275.md"
--
--```diff
--
--@@ -0,0 +1,118 @@
--+## 句子
--+
--+- > 　　我对爱的理解是：遇见那个对的人，然后爱他就像爱生命。
--+  >
--+
--+- 
--+  > 　　爱不是逃避地去赴死，爱应该是一种赴汤蹈火后的理智觉醒。
--+  >
--+
--+- 
--+  > 　　我悄悄抬起头看了他一眼，只见他挪了几个座位后，坐到了我的旁边，撩起我耳边的头发，慢慢地凑近我的耳朵，很小声地说了一句：“我喜欢你。”
--+  >
--+
--+- 
--+  > 　　去追求一份不属于自己的爱，难免会遍体鳞伤。但这奇妙的人世间总会安排很多的意想不到，有些人领悟得早，就抓住了幸福，有些人自怨自艾，也就只能和幸福擦肩而过。
--+  >
--+
--+- 
--+  > 　　有些人出现后，明明知道他爱你比爱他自己还要多，可自己就是没办法全身心地接受。
--+  >
--+
--+- 
--+  > 　　彩虹一定会有的，但不是上苍的赏赐，而是我们自己争取回来的。
--+  >
--+
--+- 
--+  > 　　长大了，就意味着已经不能在爱自己的人面前无所顾忌地哭了。
--+  >
--+
--+- 
--+  > 　　无论你做不做得到在黑暗面前勇敢，但起码你得学会珍惜现有的时间，不留遗憾地过好每一天。
--+  >
--+
--+- 
--+  > 　　愿你化作春风、细雨、暖阳，我们永远爱你，想你，怀念你。
--+  >
--+
--+- 
--+  > 　　托马斯·默顿曾写道：“命中注定我们相爱，我们不该独自找寻生命的意义，而应陪伴彼此一起找寻。”
--+  >
--+
--+- 
--+  > 　　当人生没有了A选择时，你就不得不去好好地适应并勇敢地选择B。逃避现实是解决不了任何问题的，只会让自己的悲伤和痛苦加重，只有勇敢面对才能重获新生。
--+  >
--+
--+- 
--+  > 　　我记得小忽走的那天，有个护工阿姨告诉我：别把眼泪流到爱人的身上，让他了无牵挂地离开吧，他真的受苦了。
--+  >
--+
--+- 
--+  > 　　爱情并不是全部，但也是我们人生中不可缺少的一部分，选择让自己感到舒适的爱情才会走得更长久一些。
--+  >
--+
--+- 
--+  > 　　第二天，我们就约着一起去了游泳池，一想到要穿那么少在小忽面前出现，我真的挺羞涩的。
--+  >
--+
--+- 
--+  > 　　那次我计划的旅行线路是：武汉—新加坡—泰国。制定这段线路的初衷是：先去新加坡吃好玩好，再在泰国的苏梅岛上住一个浪漫的海边酒店享受大海，自然受孕。真是一个完美的计划！
--+  >
--+
--+- 
--+  > 　　比起小忽我显得很紧张，每次只要排卵期一到，我就开始各种撩他，起初小忽是热血沸腾、激动无比。
--+  >
--+
--+## 段落
--+
--+- > 　　听不懂中文的老外们，估计也能猜得到这个中国男孩一定是在对身边的女孩表白或者求婚，大家纷纷投来了有爱的笑容。
--+  >
--+  > 　　那一刻，我感受到了实实在在的幸福。
--+
--+- > 　　我认为一个人一旦亲自经历过苦难，他必然会从中得到一种成长。等到苦难再来时，自己能更好地面对和化解，或许这个时候才会领悟到，其实并不是世界为自己改变了什么，而是自己的经历和遭遇改变了我们的内心，让它变得更坚强、更勇敢，让它在面对新逆境和困苦时，能更勇敢地去与之抗衡了。 <font color=red>**彩虹一定会有的，但不是上苍的赏赐，而是我们自己争取回来的。**</font>
--+
--+- > 　　每个有创伤后遗症的人，其实也都应该找到属于自己的调节方式和情感宣泄途径。我属于那种再痛再苦，都不愿跟别人说太多的人，因为不愿给别人增加负担，更不愿把悲伤和负能量不停地倾诉给别人。我会选择看书、写信和画画。但是真正做到理智，在这么短的时间里是不可能的。所以，实在很难受我也会跟最好的朋友说，说过以后再自我调节。其实，我们最终应该明白能让自己好起来的那个人不是别人，正是我们自己。
--+  >
--+  > 　　<font color=red>**以前的我从未真正体会过失去是什么滋味，现在，我一夜间明白所谓失去就是那个你习以为常又很熟悉的人，从此不会出现在你触手可及的那个地方了，并且是永远不会再出现了。**</font>
--+  >
--+  > 　　如果你能意识到这份失去是什么滋味，或许你还会感悟到并不是每个人、每段感情都有重新开始的机会。很多人、很多事一旦失去就意味着永远，所以不留遗憾才不枉此生。遗憾多了眼泪也就多了，眼前这最年轻的今天不是用来哭泣的，该好好地珍惜生命、珍惜感情，也该深刻地反省，学会仰望生命，学会敬畏死亡。
--+  >
--+  > 　　失去的滋味并不会只是那一瞬间的疼痛，它会像毒液一样慢慢渗透进我们的每寸肌肤、每根神经。一段伤口还没愈合却又要不断叠加更多新的伤口。那种滋味真的会让人绝望和窒息，甚至你根本就没办法去躲避失去后呈现出的各种创伤。
--+
--+- > 　　“奶奶，我好羡慕你们能这样陪着对方到这个年纪，我一辈子都不可能有这个机会了。”
--+  >
--+  > 　　奶奶牵了我的手，她一直对我说：
--+  >
--+  > 　　“小姑娘别怕，为了孩子你也要勇敢些。”
--+  >
--+  > 　　在餐厅里一直没哭的我，离开餐厅后看着那个奶奶远去的背影，我就忍不住哭了。
--+  >
--+  > 　　在这个异乡的医院里，我对着一个白发苍苍的老奶奶说了我的心里话，我从不敢告诉别人小忽的病情，可是对着这样一个陌生的奶奶我什么都说了出来。她在这漫长的岁月里一定见了很多这样的事情，她也一定知道人生那么长，还要遇到更多我想象不到的事情，她听到我说了晚期以后只是用眼角的泪告诉我，别怕。
--+  >
--+  > 　　可不知为什么，“别怕”这两个字比“加油”对我来说有更大的触动。她知道我害怕，她看出了我坚毅又恐惧的那种眼神。所以她只是告诉我别怕，往后可能还有很多事情要自己去面对，为了孩子真的只能别怕。
--+  >
--+  > 　　我至今都记得那天的场景，记得那个奶奶跟我说的那句“别怕”。
--+  >
--+  > 　　我总相信，这世上所有人的相遇都是命中注定的一种安排，有时候陌生人能给予的力量更是自己想象不到的一种安慰。
--+
--+- > 　　有时候想想，真的是自己坚强地走了很久的路吗？我能坚强是因为有人给了我爱的力量，因为有身边的亲人，远方的朋友和那么多陌生人的温暖鼓励，我才能勇敢前行。我不知疲倦地往前走正是因为有大家在身后的陪伴，我知道大家最想要看到的是我能振作起来，而我努力坚强地去面对生活也是对大家最好的感恩。
--+  >
--+  > 　　其实这个世上没有任何一份无缘无故的爱，所以当别人对我付出爱和温暖时，我从不觉得这是应该和必须的。学会感恩是一件像播种一样的事情，播下爱的种子定会在将来的某一天开出温暖的花。
--+
--+- > 　　我是那种即使心里流泪但也笑得很甜的人，因为是对着我的爱人，我不想他有一丝一毫的自责或者内疚。
--+  >
--+  > 　　我在用我的方式给他快乐，告诉他我没事的，我才不会认输。你也不要认输，你有我，我可以保护你。
--+
--+- > 　　我也一直觉得老天爷是公平的，他不会拿走一个人的全部，他关上了我们的一扇门，让我们失去的同时也是希望我们成长。至于是不是会再开一扇窗，我认为，窗户就在那儿，推开它的不是上天，而是我们自己。
--+
--+- > 　　也或许有了新的人生，我不愿意接纳新的爱人，但我却愿意开始新的更精彩的生活。一个人如果真能活出两个人的人生，我觉得这本身就是一件很厉害、很骄傲的事情。
--+
--+- > 　　<font color=red>**如果我的画、我的文字能给迷茫中的你们带去力量和光亮，请相信这就是我对你们的爱和感恩。也希望这份爱能带你们走出逆境，给你前行的路上点亮一束光。我可能没办法告诉你，逆境中该怎么去做选择，因为我想让你明白谁都没法帮你做选择，你得靠自己。别人的帮助和鼓励都只是陪伴的力量，而真正去勇敢面对问题的那个人只有自己。**</font>
--+
--+- > 　　龙应台在《目送》里这样说过：“我慢慢地、慢慢地了解到，所谓父女母子一场，只不过意味着，你和他的缘分就是今生今世不断地在目送他的背影渐行渐远。你站在小路的这一端，看着他逐渐消失在小路转弯的地方，而且，他用背影告诉你：不必追。”
--+
--+- > 　　以前有个人跟我说过，人这一辈子如果能跟随自己的心而活，是件很不容易的事情。仔细想想你会发现，真的能随心所欲地去选择一种生活，并不是想象中那么简单的。身旁的声音越多，你就越迷茫，所以我们在迷茫和无助时，需要的并不是一群人的开导和指点，你需要的是静下心来，把自己放入一个真空的隧道。黑暗更利于安静地思考，当你想明白自己真正想要的生活是什么时，那个黑暗的隧道里便会为你亮起一盏明灯。
--+
--+- > 　　无论是文字还是图画，其实都是一种诉说，把那些问句变成感叹句，不去问为什么你要离我而去，而是说你会在终点好好地等我来，问句是需要答案的。这世上很多事情本身就是没有答案的，感叹句不需要答案，它要的是你的抒发、你的宣泄和你的真情流露。
--+
--+- > 　　如果你能看到这本书，我希望你明白，从泥泞里站起来的时候不一定有人拉你一把，可只要你愿意，就算爬你也能爬出去。与其求助于人，为何不勇敢一点自己站起来呢？
--\ No newline at end of file
--```
--
--## 344275240345275223345203217351270237351243236345276200344275240347232204345261261.md"
--
--```diff
--
--@@ -0,0 +1,83 @@
--+## 句子
--+
--+- > 　　我的哥哥们就像一群狼。他们频繁地试探对方，一旦有哪个小点儿的突然长大，梦想着往上爬，便会爆发混战。
--+  >
--+
--+- > 　　爸爸活在对时间的恐惧中。他感觉时间在他身后紧追不舍。从他不时忧心忡忡地瞥一眼划过天空的太阳，从他焦急地掂量每支管子或每根钢条，我能看出这一点。
--+  >
--+
--+- > 　　我这一生中，这些直觉一直在教导我一个道理——只有依靠自己，胜算才更大。它们比我清楚，从高处摔下来也比指望爸爸插手强。
--+  >
--+
--+- > 　　现在我仍然不清楚他那么说是什么意思，但我当时的理解是，我可以相信自己：我身上有某种东西，某种先知们具有的东西，它不论男女，也不分老少，是一种内在的、不可动摇的价值。
--+  >
--+
--+- > 　　“我不知道怎么解，”他边说边把那张纸递给我，“我只知道，这就是答案。”
--+  >
--+
--+- > 　　我被这张奇特的纸所震撼：爸爸可以掌握这门科学，可以破译其语言和逻辑，可以从中弯转、扭曲、挤压出真相，但他的解答过程却呈现出一片混乱。
--+  >
--+
--+- > 　　对我来说重要的不是爱情或友情，而是我自欺欺人的能力：相信自己很坚强。
--+  >
--+
--+- > 　　承认不确定性，就是被迫承认自己的软弱和无能，但也意味着你相信你自己。这是一个弱点，但这个弱点中透出一股力量：坚信活在自己的思想中，而不是别人的思想中。
--+  >
--+
--+- > 　　我常常在想，那天晚上我写下的最有力的话，是否并非源自愤怒，而是出于怀疑：我不知道。我只是不知道。
--+  >
--+
--+- > 　　他的声音很温柔，那种温柔很残酷。我宁愿他大喊大叫。如果他大喊大叫，我就会生气，一生气，我就感觉自己很强大。
--+  >
--+
--+- > 　　我说着，他听着，将我身上的耻辱感一点点消除，就像医生把感染的伤口一点点治好。
--+  >
--+
--+- > 　　自从学期开始我第一次去上国际事务课起，我就一直在想，我是不是出了什么问题。我一直在想，为什么身为女人，我却对女性化的东西不感兴趣。
--+  >
--+
--+- > 　　父亲的那个形象我将永远铭记：他脸上的表情充满爱意、恐惧和失落。
--+  >
--+
--+- > 　　我站在尼克家的阳台上，看着闪电划破长空，听着隆隆雷声。那一刻我恍若回到了巴克峰，感受到天地间如此巨大的威力。
--+  >
--+
--+- > 　　我看着她，就在我这么做的时候，她将我拉到身边，抱住了我。她身上的湿气渗进我的衣服，我感觉到水珠从她的头发上滴落至我的肩膀。
--+  >
--+
--+## 段落
--+
--+- > 　　母亲陷入沉默。她开车的时候，我仔细打量着她。仪表盘上的灯光照亮了她的脸，在一片漆黑的乡间道路上，她的脸色苍白得有如鬼魂。恐惧蚀刻进她的面容，在她紧锁的眉头和紧闭的双唇里。单独和我在一起，她放下了人前的伪装。她又是那副老样子，脆弱，呼吸急促。
--+
--+- > 　　据奶奶说，一百年前，一支阿帕奇部落曾在那些褪色的岩石上与美国骑兵交战。部落人数不占优势，战斗以他们的失利而告终。剩下能做的便是等死。战斗开始后不久，勇士们就被困在了一块岩脊上。他们不愿遭受战败的耻辱，在奋力突破骑兵队时被一个个砍死，于是骑上马背冲下了山崖。当阿帕奇的女人们在下面的岩石上找到丈夫们的碎尸时，她们放声痛哭，绝望的眼泪一落到地面，便化作了石头。
--+  >
--+  > 　　奶奶从未告诉我们那些女人的结局。阿帕奇部落身陷战事却了战士，所以也许是她觉得结局太残酷，没有说出口。我的脑海闪现“屠宰”一词，因为这个词就是为此，为一方毫无抵抗的战斗而设。这是我们在农场用的词。我们屠宰鸡鸭，并不需要与它们战斗一番。勇士们的英勇很可能换来一场屠杀。他们是英雄，死了，而他们的妻子成了奴隶，也死了。
--+
--+- > 　　“我叫查尔斯。”他说。他停顿了一下，等着我说我的名字，但我没吭声。“我在上一出剧里见过你。”过了一小会儿，他又说：“我想告诉你一件事。“我做好准备，不知道他要说什么，然后他说：“我想告诉你，你的歌声是我听过的最好听的。“　
--+
--+- > 　　这一刻定义了我对那一晚的记忆，以及之后长达十年之久很多类似的夜晚的记忆。在这样的记忆中，我看到的是一个坚不可摧、像石头一样难以对付的自己。起初我仅仅是让自己相信这一点，直到有一天它变成了现实。然后我才能坦诚地告诉自己，这对我没有影响，他没有影响到我，因为没有什么可以影响我。我不明白我的这种正确是多么病态，不明白自己是如何掏空了自己。尽管我一直被那晚的后果所困扰，但我误解了最重要的事实：它没有影响我，这本身就是它的影响。
--+
--+- > 　　父亲坐在我对面，看着他憔悴的脸，我突然悟出一个强大的事实，不知道为何我以前从未意识到这点。事实是：我不是一个好女儿。我是一个叛徒，羊群中的一匹狼。我有一些地方与众不同，这种不同很不好。我想咆哮，想扑倒在父亲的膝头哭泣，发誓自己再也不这么做了。但我是狼，我还在撒谎，无论如何他会嗅出谎言。我们都心知肚明，如果再看到肖恩躺在公路上，浸泡在血色之中，我还是会做出同样的选择。
--+  >
--+  > 　　我并不后悔，只是感到惭愧。
--+
--+- > 　　我们在公路外的田野里见了最后一面。我们身后是高耸的巴克峰。他说他爱我，但这超出了他的能力范围。他不能拯救我。能拯救我的只有我自己。
--+
--+- > 　　我从未允许自己拥有这样的特权：不确定，但拒绝让位于那些声称确定的人。我的一生都活在别人的讲述中。他们的声音铿锵有力，专制而绝对。之前我从未意识到，我的声音也可以与他们的一样有力。
--+
--+- > 　　我坐在床上，双膝贴在胸前，听着他们的喊叫。我怀孕了吗？我不确定。我仔细回忆和男孩的每一次互动，每一个眼神，每一次触碰。我走到镜子前，撩起衬衫，然后用手指抚摸腹部，一寸一寸地检查，心想，也许吧。
--+  >
--+  > 　　我从没吻过一个男孩。
--+
--+- > 　　我明白了疾病不是一种选择。这些知识也许会让我对父亲产生同情，但并没有。我只感到愤怒。我想，我们才是付出代价的人。母亲。卢克。肖恩。我们伤痕累累，瘀青、擦伤、脑震荡、腿着火、脑袋开花。我们一直生活在一种警觉的状态和持续的恐惧之中，我们的大脑充斥着皮质醇，因为我们知道那些事情随时可能发生。因为爸爸总是把信念置于安全之前。因为他相信自己是正确的，在经历了第一次车祸、第二次车祸、垃圾箱疗伤、着火、托盘坠落这些事件后，他仍坚持相信自己是对的。付出代价的是我们。
--+
--+- > 　　“但从我认识你以来，你口口声声只谈论法学院，”我说，“学法律是你的梦想，难道不是吗？”
--+  >
--+  > 　　“没错，”他承认道，“但假如我是女人，情况就不一样了。女人天生不同。她们没有这个野心。她们的野心在孩子身上。”他朝我笑了笑，好像我知道他在说什么似的。我的确知道。我笑了，有几秒钟我们达成了一致。
--+  >
--+  > 　　接着我又问：“但假如你是女人，你的感觉和现在一模一样呢？”
--+  >
--+  > 　　乔希出神地盯着墙壁看了一会儿，认真思考这个问题。过了片刻，他说：“那我就知道是我自己出了问题。”
--+
--+- > 　　怎样遣词造句才算合理？一个人为了你，与父亲和家人疏远，你该如何道歉？也许没有合适的词句来表达。你该如何感谢一个不肯弃你而去的哥哥？就在你决定不再挣扎，任凭自己下沉时，正是他抓住你的手，将你拽上了岸。这一切，没有语言能够形容。
--+
--```
--
--## 345246202344275225351230205350257273344270200346234254344271246.md"
--
--```diff
--
--@@ -0,0 +1,72 @@
--+- 书的分类
--+  - 一类书：现实问题及解决之道
--+  - 二类书：思想需求
--+  - 三类书：工具书
--+  - 四类书：休闲娱乐消遣
--+
--+- 阅读的四个层次
--+  - 基础阅读(Elementary Reading)：认字并理解意思
--+  - 检视阅读(Inspection- Reading)：概括大意，抓住思想和要点
--+  - 分析阅读(Analyti- Reading)：精准把握，可以复述大意和细节，理解消化
--+  - 主题阅读(Syntopi- Reading)：比较阅读，某一主题的认识
--+  - 泛读、略读、精读
--+
--+- 提升阅读速度的步骤
--+  - 拓宽视野
--+  - 视线跳跃
--+  - 视野垂直扩展
--+    - 顺逆时针波浪线
--+    - 折线型移动
--+  - 快速翻页阅读
--+  - 永远不要回读
--+
--+- 读取信息
--+  - 最简单的方式：按存储的方式逆向而行
--+  - 或者：情景再现
--+
--+- 重复阅读
--+  - 不做无目的重复
--+  - 不做无新意重复
--+  - 不做无效用重复
--+
--+- 理解书籍
--+  - 明白作者怎么写
--+  - 清楚什么才是自己的
--+  - 不迷信权威也不迷信自己
--+  - 不钻牛角尖换角度思考
--+  - 不要忘记对自己提问
--+
--+- 写故事
--+  - 不同的叙事手法
--+  - 阅读故事的方法
--+
--+- 书的谋篇布局
--+  - 开篇结尾
--+  - 章节、层次、过渡、照应
--+  - 主次详略
--+
--+- 选书还是选人？选自己需要的
--+
--+- 学以致用
--+  - 写有定式，读无套路
--+  - 书中之言，皆为人言
--+  - 学以致用，方为正道
--+
--+- 杠杆阅读术
--+  - 读书，然后理解后用在事务上
--+
--+- RIA 拆书法
--+  - 阅读 Reading
--+  - 解释 Interpretation
--+  - 挪用 Appropriation
--+
--+- 读书四问
--+  - 书讲了什么
--+  - 解决了什么问题
--+  - 说得有道理吗
--+  - 和自己有什么关系
--+
--+- 评论一本书的禁忌
--+  - 在完成全书大纲或能诠释之前评论
--+  - 争强好胜
--+  - 知识的正误与个人观点的差异混为一谈
--\ No newline at end of file
--```
--
--## 345261261350214266346226207345205267345272227.md"
--
--```diff
--
--@@ -0,0 +1,58 @@
--+## 句子
--+
--+- > 
--+  > 　　我再度看向大海的方向，发现星星出现在天空中。出现在大海上方的星座感觉比平时更壮观，也更加悠闲自在。
--+  > 
--+  >
--+  > 　　我无声地和夜空中的星星交谈着。
--+  > 
--+
--+- > 
--+  > 　　我在沿着阶梯走向沙滩的途中，脱下了高跟鞋，难得光着脚走路。脚背立刻觉得被冰凉的沙子紧紧拥抱。
--+  > 
--+
--+- > 
--+  > 　　如果过去曾有过亲密往来，应该不至于失礼；相反地，也许这样更显亲切。
--+  > 
--+
--+- > 
--+  > 　　偶然一望，看到庭院角落红色与白色的彼岸花竞相绽放。
--+  > 
--+
--+- > 
--+  > 　　春多食苦、夏多食酸、秋多食辣、冬多食油。
--+  > 
--+
--+- > 
--+  > 　　数千、数万、数亿句话被火包围，升上了天空。我怔怔地看着这一幕。
--+  > 
--+
--+## 段落
--+
--+- > 　　也有客人委托我写一封平淡无奇的信。
--+  >
--+  > 　　“你可以为我写很普通的信吗？”
--+  >
--+  > 　　园田先生很委婉地说。
--+  >
--+  > 　　“我只想告诉她，我还活着。”
--+  >
--+  > 　　他平静而稳重的说话声，就像美丽山丘上吹过的一丝微风。
--+
--+- > 　　我不由得想喝点酒，把寿司子姨婆留下的梅酒倒进杯里。上代的父母期望她们一辈子不愁吃，为上代取名“点心子”，为她的双胞胎妹妹取了“寿司子”的名字。至于她们的人生是否真的如了此愿，似乎一言难尽。这对名字和点心、寿司有关的姐妹，如今相亲相爱地长眠在同一座墓中。
--+
--+- > 　　我相信她现在一定很幸福，所以，我绝对不希望破坏她的幸福生活。如果她的先生看到用男性笔迹写给她的私人信件，一定会很在意。尤其是自己不认识的人写信给太太，心情必定会很复杂，如果因为这件事影响了他们的夫妻关系，不是很令人难过吗？
--+
--+- > 　　“我原本以为，这辈子再也不会和任何女人一起去某个地方了。”
--+  >
--+  > 　　他说话的声音很平静，好像身旁没人在听似的。我竖起耳朵，细听他的声音。
--+  >
--+  > 　　“这孩子的妈突然离开了我们，当时我完全乱了方寸，每天都想着带孩子一起去死；什么都不想做，整天都待在昏暗的房间内发呆。 现在回想起来，还觉得浑身发毛，那完全就是放弃了养育孩子。
--+  >
--+  > 　　“结果有一次，我看到她在用力吸美乃滋。她整张嘴、整张脸上都是美乃滋。那一刻，我被她的样子惊醒，意识到自己不能再继续这样下去。
--+  >
--+  > 　　“她妈妈离开时，她还不到两岁，所以好像并没有对妈妈的记忆，但现在每天睡觉时，仍然会抱着美乃滋瓶子。她可能把美乃滋当成母亲了吧。连这么小的孩子都努力设法撑过去，我这个父亲，怎么，可以一蹶不振？于是，我决定实现我和我老婆生前的共同梦想。”
--+  >
--+  > 　　“梦想？”
--+  >
--+  > 　　“对，我老婆以前曾说过，想开一家咖啡店。”
--\ No newline at end of file
--```
--
--## 345277253351200237346212223351207215347202271357274214350277207347233256344270215345277230347232204351230205350257273346234257.md"
--
--```diff
--
--@@ -0,0 +1,34 @@
--+- 三类书：
--+  - 不看也行
--+  - 无需快速阅读
--+  - 可快速阅读
--+- 九一法则
--+  - 九成可快速，一成无需快速
--+- 为写而读可吸收
--+- 去除多于阅读可多加“摘引”
--+  - “摘引”要浓缩
--+- **阅读更像寻宝，而非收藏**
--+- 一句话感想很有用
--+- **三类段落可以不看**
--+  - 为了商品差异化而插入的“作者自述”
--+    - 要是想看故事看看也行 
--+  - 证明观点的论据
--+  - 夸张表达
--+    - 诸如“读完此书，你 的人生会有变化”
--+- **快速化阅读四大步骤**
--+  - 仔细阅读“前言”“目录”
--+  - 阅读开头和末尾五句
--+  - 确定关键重点再阅读
--+  - 以两种以上阅读节奏阅读
--+- 明确阅读目的
--+- 关键字搜寻阅读法
--+- **一边划线一边阅读会给人营造一种积极上进的假象**
--+- 决定阅读顺序和阅读时间
--+- 务必挑一两本“没啥兴趣读的书”
--+  - 克制“只挑所好”
--+  - 凡他人推荐，可以一律全收
--+- 整理书架时，书脊朝外，时间排列为基本
--+- 以前留下的书现在未必依然应该保留
--+- **以阅读为手段，会变成修行，收获并不会太多**
--+
--+> 附注：美国人气作家 丁 · 雷 · 昆士（De- R- Koontz）曾在《畅销小说撰写技巧》（How to Write Best Selling Fiction）一书中写道：“务必把主角逼到走投无路，然后以皆大欢喜的结尾收场，否则无法满足读者。”
--\ No newline at end of file
--```
--
--## 346210221346203263350246201344270244351242227350245277346237232.md"
--
--```diff
--
--@@ -0,0 +1,188 @@
--+
--+## 句子
--+
--+- > 　　爱情本来就是有起承转合在里面的，这才是它更真实的样子。甜蜜是真实的，悲伤也是真实的，在最后结局到来之前，所有的一切都值得期待。
--+  >
--+
--+- > 　　人在当下的表达总是真诚的，只是在长远的时间线上，前后的真诚总是相悖的。
--+  >
--+
--+- > 　　在没有真正遇到你的时候，我总会赋予你很多想象。我希望你和 我是相似的，但我又期待我们很不相同。树和土壤完全不同，彼此补 给才能够更好地共生。我好像不再需要另一棵树了。
--+  >
--+
--+- > 　　如果我要把任性的权利交付给时间
--+  >
--+  > 　　那我还能剩下什么呢
--+  >
--+
--+- > 　　别人总说“下一个会更好”，但其实我不太相信这个说法。在爱情面前，没有什么好与更好，遇到的每个人都不一样，需要磨合的地方也都不一样，根本不存在比较级。
--+  >
--+
--+- > 　　没有人在爱情中会不辛苦，获得幸福的人大概是因为双方都舍不 得先放弃吧。
--+  >
--+
--+- > 　　我提着袋子回家的路上，突然觉得夏天好像要来了。我闻到了槐花的香味，淡淡的，像是有什么好事要发生。
--+  >
--+
--+- > 　　有些人你很确信停留在什么关系中是最好的，出于对自我的保护，也出于对对方的负责，你就会选择让关系定格在那里，不会再向前挪动半步。人这一生可能会有很多很多次心动的瞬间，但现实就摆在那里，冲动从来不能解决任何问题。
--+
--+## 段落
--+
--+- > 　　我希望所有在爱里受过伤的人，都能重新站起来，不要去放大自己的缺点或是漠视自己的优点。你是很好的人，你值得被爱，不要怀疑这件事。你想要拥有的生活总会到来。当然，也不要记恨那些没能跟你走下去的人。过了很久之后，你会感激他们，是他们的离开让你找到了更正确的可能性。你正在期待的，或者未来期待的那个人，才有可能是真正对的那个人。
--+
--+- > 　　几年前我和一个不太熟悉的朋友通话，我们从很琐碎的近况聊起，最后他跟我讲了一段话，让我印象很深。
--+  >
--+  > 　　“你很好，你不要总觉得自己不好。我希望有一天你能和内心的自己真正和解，不要让表象和内心互相打架了，放轻松一点。”
--+  >
--+  > 　　我很认真地思考过什么是与自己和解，直到昨晚那个梦做完，我突然懂了。原来就是那么一瞬间的事情，不再去计较过往的得失，能够抬起头看前面的路。“和解”原来就是意识上抬的那一下头。
--+
--+- > 　　两个底层逻辑不同的人在一起会有两种结果。一种是非常快乐，因为可以在最缺失的部分彼此补充。你的快乐带给他激情，他的悲观使你平静，各取所需。另外一种就是彼此排斥，你无法理解一件事发生之后他的悲观，他也不能理解你每天在快乐些什么，两个人会因为最初的不同而吸引，但之后只会越走越远。
--+
--+- > 　　想起之前和前任的一次争吵，他很不解地说： “为什么你这么没有安全感？你能不能成熟一点？”我那一刻特别委屈。我真的也不想这样，谁不希望自己坦然一点，轻松一点呢。 <font color=red>可我从心底里总是认为自己不值得被爱，所以不断地获取关注，得到确认，我才能够稍微踏实一点。但这对于他来说，压力太大了。 **我们本可以有更多快乐的事情去做，而我偏偏要把时间消耗在那些无意义的“确认”上。**</font>
--+  >
--+  > 　　人的安全感来自很多方面，比如父母的认可，朋友的信任，金钱的满足，以及被喜欢的人坚定地选择等等。我本以为我在其他层面上努力，就可以让安全感这个东西得到平衡。但事实上，我在其他事情上做了越多，我对于爱情带来的安全感渴望反而越大。
--+  >
--+  > 　　说起这些事，我好像又陷入了自我否定的死循环。人在跟自己较劲的过程中，还真是乐此不疲。
--+
--+- > 　　关于我的过去，每一次爱情发生的时候，我都站在下风口。对方无意识的一阵风吹过来，我就会激动不已。但是关于我的风，从来没有吹到过那一边。他们只会在某一个片刻看到我，然后走到我身边一下，很快就又离开。
--+  >
--+  > 　　而我在你的眼神里面，看到了平等的喜欢，这是太难得的事。我很喜欢观察别人，尤其是亲近的人。你在面对我的时候，会流露出羞涩，甚至一些举动也开始变得小心翼翼。我知道那是关于喜欢的显性表现，不需要太浓烈，一点点就够。我知道我点到为止也就可以了，所以我不敢让你知道我过多的想法。
--+  >
--+  > 　　所有人都渴求爱，但对过高浓度的爱又会产生恐惧。人终归还是会为适量的爱，甚至是求而不得的东西着迷。
--+
--+- > 　　想起我一个朋友指责过我“不够尊重爱情”。我当时非常生气，我觉得我无比尊重，怎么可能是他口中的那种人。
--+  >
--+  > 　　他反驳我，你真的不尊重爱情。
--+  >
--+  > 　　我说，你凭什么这样讲。
--+  >
--+  > 　　他说，如果你尊重爱情，当它来临的时候，发生在你身上的时候，你敢于直面它吗？你会拼了命去争取它吗？你会在乎“面子”这件事吗？
--+  >
--+  > 　　我想了想，我好像不会，我没那么激进，但我相信它总会发生。
--+  >
--+  > 　　他说，你想要的顺其自然，是给了对方太多幻想，如果一切不按照你想象的发生，你会采取行动吗？如果不会，那你就是不够尊重它。你连争取它的念头都不敢去做，何谈尊重。
--+
--+## 小诗
--+
--+- > 第三十一天的诗
--+  >
--+  > 
--+  >
--+  > 我以为我会介意的
--+  >
--+  > 后来都释怀了
--+  >
--+  > 
--+  >
--+  > 我以为我会放弃的
--+  >
--+  > 后来都延续了
--+  >
--+  > 
--+  >
--+  > 我以为我会疼痛的
--+  >
--+  > 后来都融化了
--+  >
--+  > 
--+  >
--+  > 我以为我会的
--+  >
--+  > 后来都不会了
--+  >
--+  > 
--+  >
--+  > 我以为我以为的
--+  >
--+  > 后来都无关于后来了
--+
--+- > 第三十五天的诗
--+  >
--+  > 
--+  >
--+  > 一觉醒来的时候
--+  >
--+  > 我总是非常想你
--+  >
--+  > 还好我可以转过身去抱抱你
--+  >
--+  > 
--+  >
--+  > 不再担心你迷路于梦中
--+  >
--+  > 或是掉进过往的回忆里
--+
--+- > 第十三天的诗
--+  >
--+  > 
--+  >
--+  > 他们的肢体在扭曲
--+  >
--+  > 楼宇以方正的形状支离破碎
--+  >
--+  > 
--+  >
--+  > 一只飞蚊到我耳边说
--+  >
--+  > 宇宙烧着了
--+  >
--+  > 你快离开这里
--+  >
--+  > 
--+  >
--+  > 我闭上眼睛
--+  >
--+  > 双颊灼热
--+  >
--+  > 
--+  >
--+  > 好事之人举着杯子
--+  >
--+  > 摇晃着身躯
--+  >
--+  > 指指点点
--+  >
--+  > 
--+  >
--+  > 我好像醉了
--+  >
--+  > 只能把自己蜷起来
--+  >
--+  > 三个小时之后才偷偷回到生活
--+
--+- > 第二十八天的诗
--+  >
--+  > 
--+  >
--+  > 我像一棵疯长的树
--+  >
--+  > 有极其茂盛的部分
--+  >
--+  > 也有残败的枝叶
--+  >
--+  > 
--+  >
--+  > 过路客们抬头看我
--+  >
--+  > 只会停在一个角度指点
--+  >
--+  > 没有人会去关心另一个侧面
--+  >
--+  > 
--+  >
--+  > 直到一天他路过了我
--+  >
--+  > 围着我一圈一圈地转
--+  >
--+  > 
--+  >
--+  > 他对着枯枝讲话
--+  >
--+  > 他对着过分茂盛的树叶斥责
--+  >
--+  > 
--+  >
--+  > 他开始住在树下
--+  >
--+  > 他在用心修剪我
--+
--```
--
--## 346210221347246273345274200344271213345220216.md"
--
--```diff
--
--@@ -0,0 +1,6 @@
--+## 句子
--+
--+- > 　　你想斩断现在这段恋情，因为⿇烦多于快乐。你⼼想：“这也太⿇烦了。如果我⾃⼰有个⼩公寓，可以在凌晨两点做爆⽶花，再喝上⼀杯葡萄酒，没有任何情绪⼲扰，不是更好吗？”
--+- > 　　掐⼀下⾃⼰。你感觉到疼了吗？还是仅仅感觉到⾃⼰还活着？
--+- > 　　将性和其他期待统统抛开！恋爱的核⼼是友谊。
--+- > 　　寻找伴侣就像⼀场旅⾏，你不知道中途会停多少次，会绕多少弯路，也不知道这场旅⾏会持续多久，甚⾄不知道⽬的地在哪⾥。
--\ No newline at end of file
--```
--
--## 346225260345255246344271213347276216.md"
--
--```diff
--
--@@ -0,0 +1,87 @@
--+- 2012 是那个时候太阳纪的最后一年，所以被谣传成世界末日
--+
--+- 西方拼音文字统称罗马式的语言（Roman Language）
--+
--+- 上下文无关文法，算法复杂度基本上是语句长度的二次方
--+  而对于上下文有关文法，复杂度基本上是语句长度的六次方
--+  
--+- 统计语言模型
--+
--+- 马尔科夫假设
--+
--+- 罗塞塔石碑
--+
--+- 不同语言的冗余度差别很大，汉语在所有语言中冗余度是相对小的
--+
--+- 小学生和中学生其实没必要花那么多时间读书
--+  中学阶段花很多时间比同伴多读的课程，上大学以后用很短时间就能读完
--+  学习和教育是持续一辈子的过程
--+  少年班的做法不足取
--+
--+- 布尔代数对于数学的意义等同于量子力学对于物理学的意义，它们将我们对世界的认识从连续状态扩展到离散状态
--+
--+- 爬虫
--+  -  定义
--+    - 从任意一个网页出发，用图的遍历算法，自动访问到每一个网页并把它们存起来
--+  -  其他
--+    -  一个商业的网络爬虫需要有成千上万个服务器，并且通过高速网络连接起来
--+    -  搜索引擎的网络爬虫问题更应该定义成“如何在有限时间里最多地爬下最重要的网页”
--+    -  在搜索引擎的爬虫里，BFS 要明显优于 DFS，但此处的 BFS 是相对复杂的下载优先级排序方法，一般称为调度系统
--+
--+- TF-IDF（Term Frequency / Inverse Document Frequency，关键词频率 / 逆文本频率指数）
--+
--+- 向量的方向具有很大意义
--+
--+- 虚词的权重是一种噪音
--+
--+- 两个事物之间的相似度可以提取特征值，用余弦定理求
--+
--+- 奇异值分解
--+
--+- 信息指纹的用途
--+
--+- 密码学相关
--+  - 好的密码必须做到根据已知的明文和密文的对应推断不出新的密文内容
--+  - 同文密电在密码学上是大忌
--+  - RSA 密码原理
--+  - 公开密钥在原理上非常可靠，但很多加密系统在工程实现上留下了不少漏洞
--+
--+- 部分降噪实现原理：加上频率相同、振幅相反的信号
--+
--+- 搜索引擎反作弊的一个工具是图论，另外还需要一定时间
--+
--+- 格里高利日历，今天的日历历法
--+
--+- 关于数学模型
--+  - 一个正确的数学模型在形式上应当是简单的
--+  - 一个正确的模型一开始可能不如一个精雕细琢过的错误模型来得准确，但是如果我们认定大方向是对的，就应该坚持下去
--+  - 大量准确的数据对研发很重要
--+  - 正确的模型也可能受噪音干扰，而显得不准确；这时不应该用一种凑合的修正方法加以弥补，而是要找到噪音的根源，这也许能通往重大的发现
--+
--+- 最大熵原理指出，对一个随机事件的概率分布进行预测时，我们的预测应当满足全部已知的条件，而对未知的情况不要做任何主观假设
--+
--+- 认知科学的研究表明，在脱稿输入时，拆字的过程会使思维变慢，并且一心不能二用
--+
--+- 维特比算法是针对一个特殊的图——篱笆网络的有向图最短路径问题而提出的，整个维特比算法的复杂度是 O(N * D^2)
--+
--+- 码分多址：接收者在接收到不同信号时，通过密码过滤掉自己无法解码的信号，留下和自己密码对应的信号即可，由于这种方法是根据不同的密码区分发送的，因此称为码分多址
--+
--+- 期望最大化算法：
--+  首先，根据现有的模型，计算各个观测数据输入到模型中的计算结果，这个过程称为期望值计算过程(Expectation)，或者 E 过程；接下来，重新计算模型参数，以最大化期望值，此过程称为 M 过程。这一类算法都称为 EM 算法。
--+  
--+- EM 算法如果优化的目标函数是一个凸函数，那么一定能保证得到全局最优解，而如果不是，则不保证
--+
--+- 人工神经网络和贝叶斯网络
--+  - 共同点
--+    - 都是有向图，遵从马尔科夫假设
--+    - 训练方法类似
--+    - 处理效果相似，但效率可能会不同
--+    - 计算量都特别大
--+  - 不同点
--+    - 人工神经网络在结构上完全标准化，而贝叶斯网络更灵活
--+    - 贝叶斯网络更容易考虑上下文前后的相关性，因此可以解码一个输入的序列
--+    - 人工神经网络的训练算法相对简单，容易并行实现，而贝叶斯网络不一定能够并行化
--+
--+- L-BFGS(Limited-memory Broyden Fletcher Goldfarb Shanno Method0) 比一般梯度下降法收敛更快
--+
--+- NP 问题
--\ No newline at end of file
--```
--
--## 346230216345244251357274214346210221350246201345222214346230250345244251347232204344275240347272246344274232.md"
--
--```diff
--
--@@ -0,0 +1,64 @@
--+## 词语
--+
--+- 筅xian3
--+
--+## 句子
--+
--+- > 　　我发现最近自己无论遇到任何事，都会想到她。
--+  >
--+  > 　　看到有趣的地方，就想带她一起来看；吃到好吃的食物，希望她也可以品尝。
--+  >
--+
--+- > 　　夕阳已经西沉，空气渐渐染成冰冷的蓝色。
--+  >
--+
--+- > 　　“什么事？”
--+  >
--+  > 　　“我一直都看着你。”
--+  >
--+  > 　　我一时说不出话。
--+  >
--+
--+- > 　　“你一定可以成为从事创作的人。”
--+  >
--+  > 　　她的声音中有一种高寿以前不曾感受过的质感。虽然他不了解是什么，却深深打动了他。
--+  >
--+
--+- > 　　当阿姨松开他时，有那么一刹那，他觉得有点冷。
--+  >
--+
--+- > 　　“我这个人，”
--+  >
--+  > 　　“嗯？”
--+  >
--+  > 　　她微微带着歉意地垂着眼睛说：
--+  >
--+  > 　　“我不是疗愈系，虽说别人经常这么以为。”
--+  >
--+  > 　　“没关系。”
--+  >
--+  > 　　“我很任性，有时候会强烈地表达自我。”
--+  >
--+  > 　　“没关系。”
--+  >
--+  > 　　“而且很容易被食物影响情绪。”
--+  >
--+  > 　　“没关系。”
--+  >
--+  > 　　“没关系吗？”
--+  >
--+  > 　　“没关系。”
--+  >
--+  > 　　“是喔……”
--+  >
--+  > 　　她好像吃了什么美味的食物般小声呢喃着。
--+  > 　　“那就请你继续好好关照。”
--+  >
--+  > 　　她有点害羞地开玩笑说道，我也开玩笑地恭敬回答：
--+  > 　　“彼此彼此。”
--+
--+- > 　　用钥匙打开门，很有自己的家、独立的感觉。我很喜欢这个瞬间。
--+  >
--+
--+- > 　　曲终人散
--+  >
--\ No newline at end of file
--```
--
--## 347213256345255220344271213345256266347232204347202271345277203346227245.md"
--
--```diff
--
--@@ -0,0 +1,60 @@
--+## 词语
--+
--+- 赧(nan3)然
--+- 眼眵(chi1)
--+- 皲(jun1)裂
--+
--+## 句子
--+
--+- > 　　我不愿在意他人的看法，只盼独自消磨，而后永远离开。这是因为我尚且保留着某种傲慢的尊严，不愿意让任何人看见自己孱弱得不堪一击的模样。
--+
--+- > 　　房间里没有华丽的装饰，只在每一个重要位置静静摆放着方便使用的好物。
--+
--+- > 　　不过我还带来了唯一的漂亮连衣裙。除了试穿，我一次也没在别的场合正式穿过它。裙子是我特别喜欢的品牌，仅靠我的月薪实在舍不得买，毕竟至今光是买袜子、手提包之类的就已经花掉很多钱了。
--+
--+- > 　　可我的确为此牺牲了自己的情感。主治医师告诉我，罹患癌症的根本原因是身体不堪重负，我曾坚持认为这是医生误诊，自己根本没有任何精神压力。
--+
--+- > 　　曾经，也是这个姑娘告诉我，当你感到恐惧或厌恶的时候，不妨通过洗手转换心情。或许，这个姑娘也背负着不为人知的人生重担，却总是微笑以待，对所有苦痛缄口不言。
--+
--+- > 　　我明明还活着，却一味思考着死。我曾以为，这表示自己接纳了死。然而，正是小百教会我，接纳死亡的真正含义即愿意活下去，并且坦率承认自己想要长长久久地活下去。对我而言，这个认知带来了一场巨大的醒觉。
--+
--+- > 　　我从雫小姐身上还体会到一种宛如葡萄幼苗般安静蔓延的敬畏之感。
--+
--+- > 　　我重新将围巾紧紧绕在脖子上，此时从围巾上传来的，确确实实是雫小姐的气息。
--+
--+- > 　　二〇二〇年对所有人来说都十分不易，生命本身变得空前脆弱而无常。原这本小书予你勇气，以及温柔时刻。
--+  >
--+  > 　　感谢我的编辑为译稿的出版工作付出大量心血。感谢大家的择取与阅读。
--+
--+## 段落
--+
--+- > 　　玛丹娜曾说，在这世上，痛苦分为两种。
--+  >
--+  > 　　一种是身体的痛苦，一种是心灵的痛苦。
--+  >
--+  > 　　倘若不同时克服这两种痛苦，就不会迎来幸福的终局。而临终安养院，便是帮助患者缓和身体与心灵双重痛苦的场所。
--+
--+- > 　　“您听过这样的说法吗？由乳牛得到牛乳，由牛乳得到奶酪，由奶酪得到生酥，由生酥得到熟酥，由熟酥提取醍醐，而醍醐正是最佳之物。奶酪可以理解为如今大家所说的酸奶，生酥是生奶油，熟酥是黄油，而醍醐是第五道也是最后一道提取物，是从牛乳中获取的最高等级的美味。在佛教教义里，它通常代指最高的佛法，‘醍醐味’这个词就是从这里来的。”
--+
--+- > 　　“雫小姐，”玛丹娜轻轻用手抚着我的脊梁，唤了我的名字，背脊处似乎沐浴着温暖的阳光，“您知道狮子在动物界被称作什么吗？”
--+  >
--+  > 　　突如其来的问题，令我愣在原地，看向玛丹娜。
--+  >
--+  > 　　“是……百兽之王吗？”
--+  >
--+  > 　　“没错，就是百兽之王。也就是说，您不用担心狮子会被敌人袭击，每日只要安心地吃饭、睡觉就好。”
--+  >
--+  > 　　“原来是这样，难怪这里叫做狮子之家。”我说，心中的阴霾顷刻消散。一直觉得“狮子之家”的名字非常古怪，刻意没有询问玛丹娜，此刻终于明白，这里的客人，包括我在内，大家都是狮子，是百兽之王。
--+
--+- > 　　我越发觉得，人之一生，犹如一根蜡烛。
--+  >
--+  > 　　蜡烛无法点亮它自己，也无法主动熄灭。一旦燃起烛火，只能静待蜡炬成灰的时刻。当然，它偶尔也会像您的亲生父母一般，在巨大的外力作用下倏然熄灭。
--+  >
--+  > 　　生，即意味着成为某人的光。
--+  >
--+  > 　　消耗自己的生命，化作他人的光。只有这样，人与人才能彼此照亮。想必您和养育您长大的父亲也是这样，多年来始终相互支撑，努力生活。
--+  >
--+  > 　　狮子之家的正门入口处，蜡烛燃烧了整整一夜，都是为祭拜雫小姐而点的。奇怪的是，昨晚的风也劲，烛火却未熄，直至燃烧殆尽。而且，最后的最后，它们安安静静地屏住呼吸，化作青烟升上天空。
--+  >
--+  > 　　我悄悄想着，那道消失于天际的青烟，大约便是人的灵魂吧。您觉得呢？
--+
--```
--
--## 350277275351243216347255235347232204344272272.md"
--
--```diff
--
--@@ -0,0 +1,199 @@
--+## 词语
--+
--+- 阴鸷(zhi4)：阴险凶狠
--+
--+- 怙(hu4)持：凭借，仗恃，通常含贬义
--+
--+- 修葺(qi4)：修缮（建筑物）
--+
--+- 狡狯(kuai4)：狡猾
--+
--+## 句子
--+
--+- > 　　**为你，千千万万遍。**
--+
--+- > 　　阿里转过身，看到我正学着他。他什么也没说。当时没说，以后也一直没说，他只是继续走。
--+  >
--+
--+- > 　　接着他坐在皮沙发上，把酒杯放下，把我抱在他的膝盖上。我觉得自己好像坐在一对树干上。
--+  >
--+
--+- > 　　我合上双眼，耳朵更加紧贴着门版，又想听，又不想听。
--+  >
--+
--+- > 　　不过爸爸说起这些故事的时候，从来没有提到阿里是他的朋友。
--+  >
--+
--+- > 　　有个男人发现了一个魔法杯，得知如果他对着杯子哭泣，掉进杯里的眼泪会变成珍珠。可尽管一贫如洗，他却是个快乐的家伙，罕得流泪。于是他想方设法，让自己悲伤，以便那些眼泪会变成他的财富。珍珠越积越多，他越来越贪婪。小说的结尾是，那男人坐在一座珠宝山上，手里提着刀，怀中抱着他深爱着的妻子死于非命的尸体，无助地将眼泪滴进魔法杯。
--+  >
--+
--+- > 　　一阵突如其来的罪恶感将我淹没，我跑进卫生间，在水槽里吐了。
--+  >
--+
--+- > 　　就在同一个夜晚，我学到了写作的目标之一：讽刺；我还学到了写作的陷阱之一：情节破绽。芸芸众生中，惟独哈桑教给我。这个目不识丁、不会写字的哈桑。
--+  >
--+
--+- > 　　后来我告诉自己，我没有嫉妒哈桑，一点都没有。
--+  >
--+
--+- > 　　说来讽刺，正是从那个冬天之后，哈桑便不再微笑了。
--+  >
--+
--+- > 　　我喜欢喀布尔的冬天。我喜欢夜里满天飞雪轻轻敲打我的窗户，我喜欢新霁的积雪在我的黑色胶靴下吱嘎作响，我喜欢感受铁炉的温暖，听寒风呼啸着吹过街道、吹过院子。
--+  >
--+
--+- > 　　规则很简单：放起你的风筝，割断对手的线，祝你好运。
--+  >
--+
--+- > 　　如果追风筝的人手里拿着风筝，没有人能将它拿走。这不是规则，而是风俗。
--+  >
--+
--+- > 　　让他看看，他的儿子终究非同凡响，那么也许我在家里孤魂野鬼般的日子就可以结束。
--+  >
--+
--+- > 　　也许，只是也许，他最终会原谅我杀了他的妻子。
--+  >
--+
--+- > 　　“记住，阿米尔少爷，没有鬼怪，只是个好日子。”我对他脑海盘桓的念头常常一无所知，可是我在他面前怎么就像一本打开的书？到学校上学的人是我，会读书写字的人是我，聪明伶俐的也是我。哈桑虽然看不懂一年级的课本，却能看穿我。这让人不安，可是有人永远对你的需求了如指掌，毕竟也叫人宽心。
--+  >
--+
--+- > 　　突然间我腾空而起，从空中望着自己。黑色的皮衣，红色的围巾，褪色的牛仔裤。一个瘦弱的男孩，肤色微黄，身材对于十二岁的孩子来说显得有些矮小。他肩膀窄小，黑色的眼圈围着淡褐色的眼珠，微风吹起他淡棕色的头发。他抬头望着我，我们相视微笑。
--+  >
--+
--+- > 　　时至今日，我无法扯谎说自己当时没有查看风筝是否有什么裂痕。
--+  >
--+
--+- > 　　只有拉辛汗，坐在副驾驶的位子上，紧邻着爸爸，一言不发。他的眼神奇怪地看着我。
--+  >
--+
--+- > 　　我想起哈桑的梦，那个我们在湖里游泳的梦。那儿没有鬼怪。他说，只有湖水。但是他错了。湖里有鬼怪，它抓住哈桑的脚踝，将他拉进暗无天日的湖底。我就是那个鬼怪。
--+  >
--+
--+- > 　　自从那夜起，我得了失眠症。
--+  >
--+
--+- > 　　我扯开阿塞夫的礼物外面那层包装纸，借着月光端详书的封面。那是一本希特勒自传。我将它扔在杂草中。
--+  >
--+
--+- > 　　在一次短暂的闪光中，我看到永世不会忘记的情景：哈桑端着银盘，服侍阿塞夫和瓦里喝酒。那阵光芒消失了，又是一声嘶嘶，一声爆裂，接着是一道橙色的火光：阿塞夫狞笑着，用一根指节敲打着哈桑的胸膛。
--+  >
--+
--+- > 　　他明知我背叛了他，然而还是再次救了我，也许是最后一次。那一刻我爱上了他，爱他胜过爱任何人，我只想告诉他们，我就是草丛里面的毒蛇，湖底的鬼怪。我不配他作出的牺牲，我是撒谎蛋，我是骗子，我是小偷。
--+  >
--+
--+- > 　　对我来说，美国是个埋葬往事的地方。
--+  >
--+  > 　　对爸爸来说，这是个哀悼过去的地方。
--+  >
--+
--+- > 　　早在地雷像死亡的种子那样遍布、儿童被草草掩埋之前，对我来说，喀布尔就已成了一座鬼魂之城，一座兔唇的鬼魂萦绕之城。
--+  >
--+
--+- > 　　我对自己所处的有利地位感到畏怯，而这全都因为，我赢得了那场决定我性别的基因博彩。
--+  >
--+
--+- > 　　我驱车离开。透过观后镜，爸爸正走上塔赫里家的车道，尽最后一次为人父的责任。
--+  >
--+
--+- > 　　我怀疑，在很多方面，索拉雅·塔赫里都比我好得多。勇气只是其中之一。
--+  >
--+
--+- > 　　晚餐桌上，索拉雅坐在我对面。我想像着她把头放在我胸膛上，闻着她的秀发，那该是什么感觉呢？我想像着亲吻她，跟她做爱。
--+  >
--+
--+- > 　　曲终人散，索拉雅和我第一次并排躺着。终我一生，周围环绕的都是男人。那晚，我发现了女性的温柔。
--+  >
--+
--+- > 　　爸爸毕生都在和熊搏斗。痛失正值芳年的妻子；独自把儿子抚养成人；离开他深爱的家园，他的祖国；遭受贫穷、屈辱。而到了最后，终于来了一只他无法打败的熊。但即便这样，他也绝不妥协。
--+  >
--+
--+- > 　　听到这些，我才明白自己的生活、身上的秉性有多少是来自爸爸，才知道他在人们的生命中留下的烙印。终我一生，我是“爸爸的儿子”。如今他走了。爸爸再也不会替我引路了，我得自己走。
--+  >
--+
--+- > 　　“索拉雅？”
--+  >
--+  > 　　“怎么了？”
--+  >
--+  > 　　“我开始想他了。”
--+  >
--+
--+- > 　　索拉雅将我拉近，泪水终于掉下来。
--+  >
--+
--+- > 　　凡是女人都需要丈夫，即使他扼杀了她唱歌的天赋。
--+
--+  - **暴论**
--+
--+- > 　　但我认为，我不在乎别人的过去，很大一部分原因，是由于我自己也有过去。我全都知道，但悔恨莫及。
--+  >
--+
--+- > 　　有时，我发现墓碑上摆着一束新鲜的小苍兰，就知道索拉雅刚刚来过。
--+  >
--+
--+- > 　　我想起拉辛汗，还有那鼓励我写作的字条，那是他读了我写的第一个故事之后写下的。我想起哈桑。总有一天，奉安拉之名，你会成为了不起的作家。他曾经说。全世界的人都会读你的故事。
--+  >
--+
--+- > 　　索拉雅一路上哭着回家。
--+  >
--+
--+- > 　　我们都有不收养的理由。索拉雅有她的理由，将军有他的理由，而我的理由是：也许在某个地方，有某个人，因为某件事，决定剥夺我为人父的权利，以报复我曾经的所作所为。也许这是我的报应，也许这样是罪有应得。也许事情不是这样的。雅米拉阿姨说。或者，也许事情注定是这样的。
--+  >
--+
--+- > 　　有时候，索拉雅睡在我身旁，我躺在床上，听着纱门在和风吹拂下开开关关，听着蟋蟀在院子里鸣叫。我几乎能感知到索拉雅子官里的虚空，它好像是个活着的、会呼吸的东西。它渗进我们的婚姻，那虚空，渗进我们的笑声，还有我们的交欢。每当夜阑人静，我会察觉到它从索拉雅身上升起，横亘在我们之间。像新生儿那样，睡在我们中间。
--+
--+  - **暴论**
--+
--+- > 　　“来吧。这儿有再次成为好人的路。”拉辛汗在挂电话之前说了这句话。不经意间提起，却宛如经过深思熟虑。
--+  >
--+
--+- > 　　十五年的琴瑟和鸣让我们变得心有灵犀。
--+  >
--+
--+- > 　　那年深秋，法莎娜生了个死产的女婴。哈桑亲吻那个婴儿毫无生气的脸，我们将她葬在后院，就在蔷薇花丛旁边，我们用白杨树叶盖住那个小坟堆。我替她祷告。法莎娜整天躲在小屋里面，凄厉地哭喊。母亲的哀嚎。我求安拉，保佑你永远不会听到。
--+  >
--+
--+- > 　　得到了再失去，总是比从来就没有得到更伤人。
--+  >
--+
--+- > 　　至于索拉雅，我没有告诉她我回阿富汗并非明智之举。如果我那么做，她会给自己订票，坐上下一班飞往阿富汗的客机。
--+  >
--+
--+- > 　　我顺着枪管向上的弧形，看见枪口冒着袅袅烟雾，看见它后面那张脸。我就是那个穿着人字型背心的人。
--+  >
--+
--+- > 　　“……没有什么留给孩子吃的了。”
--+  >
--+  > 　　“我们是很饿，但我们不是野蛮人！他是客人！你说我该怎么办？”他的声音很疲累。
--+  >
--+  > 　　“……明天去找些东西，”她哭泣着说，“我拿什么来养……”
--+  >
--+  > 　　我蹑手蹑脚走开。现在我明白为什么那些男孩对手表亳无兴趣了。他们根本就不是在看着手表，他们看着的是我的食物。
--+  >
--+
--+- > 　　还有别的，某种我一开始没有注意到的事情：几乎见不到有任何成年男子在他们身边——战争把父亲变成阿富汗的稀缺物品。
--+  >
--+
--+- > 　　我睡不着，双手交叉放在胸前，透过那扇破窗，望着星光闪闪的夜空，想起人们对阿富汗的评论，也许那是对的。也许它是一个没有希望的地方。
--+  >
--+
--+- > 　　他抬头望向我。他是我。我在和黑熊搏斗。
--+  >
--+
--+- > 　　你父亲是一个被拉扯成两半的男人。
--+  >
--+
--+- > 　　而我想让你明白的是，你父亲的深切自责带来了善行，真正的善行。我想起他所做的一切，施舍街头上的穷人，建了那座恤孤院，把钱给有需要的朋友，这些统统是他自我救赎的方式。而我认为，亲爱的阿米尔，当罪行导致善行，那就是真正的获救。
--+  >
--+
--+- > 　　“这张该死的电话卡还剩下四十七分钟，我有很多话要对你说。找个地方坐下。”
--+  >
--+
--+- > 　　“索拉雅？”
--+  >
--+  > 　　“嗯。”
--+  >
--+  > 　　“我爱你。”
--+  >
--+
--+- > 　　我看着那张照片。你爸爸是被拉扯成两半的男人。拉辛汗在信里这么说。我是有名分的那一半，社会承认的、合法的一半，不知不觉间充当了父亲疚恨的化身。我看着哈桑，阳光打在他露出缺了两个门牙的笑脸上。爸爸的另一半，没有名分、没有特权的一半，那继承了爸爸身上纯洁高贵品质的一半，也许，在爸爸内心某处秘密的地方，这是他当成自己的真正儿子的一半。
--+  >
--\ No newline at end of file
--```
--
--## 351233266351233266346225243346225243.md"
--
--```diff
--
--@@ -0,0 +1,3 @@
--+# 零零散散
--+
--+一些简短的知识点或词句摘录，依据共鸣或重要程度排序。
--\ No newline at end of file
--```
--
--## 351272273347234201347220206345267245346267261345272246346200235350200203346263225.md"
--
--```diff
--
--@@ -0,0 +1,130 @@
--+
--+- > **本质 = 模型 × 动力机制**
--+- MIT 明星课程《系统动力学》
--+  - 抛去细枝末节，发掘事物背后的模型和动力机制
--+  - 捕捉本质
--+
--+- 九大思维定势
--+  - 初级定势
--+    - 因果倒置
--+    - 满足于普通解
--+  - 可能陷入两难窘境的严峻定势
--+    - 依赖框架
--+    - 范围适应
--+    - 思考止于关键词
--+    - 执着于初步假设
--+  - 不能迈入思考大门
--+    - 忘记思考初衷
--+    - 偏重过程（法律程序正义除外）
--+    - 失去独立思维
--+
--+- 人的意志其实很薄弱，比起通过改变意志去改变行动，改变行动更容易改变意志
--+- 现象是模型和动力机制的结果
--+- 系统动力学从全局出发和捕捉，不还原要素，不分治也不分解
--+- 系统动力学中模型又称“因果循环图”“因果连锁图”
--+- **动力机制**
--+  - **是模型随时间流逝产生的运动及结果**
--+  - 模型的改变与问题的真正解决紧密相连
--+  
--+- 深度思考法四个步骤
--+  - 建立模型
--+  - 解读动力机制
--+  - 寻找改变模型的对策
--+  - 行动，从实践中获取反馈
--+
--+- 建立模型的条件
--+  - 必须包含应考虑的要素和因果关系
--+    - 否则无法研究现象与动力机制的产生机理
--+  - 简洁
--+    - 不能横跨多张纸，否则还是不够浓缩
--+
--+- 思考模型
--+    - 首先要分辨是哪种循环（正循环或者负循环）
--+    - 五个要素
--+      - 输入源
--+      - 输出点
--+      - 竞争关系
--+      - 合作关系
--+      - 影响者
--+  - 增加厚度
--+    - 考虑层次结构
--+    - 持有分层意识
--+  - 注重因果，无视相关
--+
--+- 检验模型
--+    - 改变主语/视角再次思考，看是否妥当
--+    - 向他人展示
--+    - 是否有趣
--+
--+- 静态图不存在动力机制
--+- 动力机制六种代表性模式
--+    - 逐渐增长
--+    - 成长和衰减
--+    - 上下波动
--+    - S 型曲线
--+    - 生命周期
--+    - 趋近目标
--+
--+- 动力机制探究要点
--+    - 流量存量分开
--+    - 进行非线性解读
--+    - 探究作用与反作用
--+    - 从各视角思考
--+      - 每视角每一步都要预测多步
--+
--+- 动力机制解读方法
--+    - 探究拐点
--+    - 研究相变
--+      - 相变是动力机制不再连续
--+      - 相变的两个契机
--+        - 大量积累直到超过阈值
--+        - 影响模型的要素发生剧变
--+  - 锁定本源动力
--+    - 引发根本性相变的驱动力
--+    - 建立函数
--+
--+- 动力机制的验证
--+    - 探索因果尽头
--+    - 是否可以编成故事
--+
--+- 改变模型才是解决问题的真正方法，不要改变现象
--+- 能改变模型的支点是以最小努力获取最大效果的关键
--+    - 支点往往与本源动力相关
--+    - 或者作为模型中存量性的要素
--+
--+- 寻找改变模型的对策
--+    - 正确理解前提条件
--+    - 寻根究底
--+      - So what?
--+      - Why so?
--+      - True?
--+  - 原因不一定接近结果
--+  - 将思考范围扩展到受影响的方方面面
--+  - 提升视角
--+    - 尝试偶尔放下眼前的问题
--+  - 想一想“该如何思考”
--+    - 思考顺序
--+    - 判断标准
--+
--+- 要输出首先要输入，即思考
--+- 提高深度思考能力的 6 个日常训练方法（ **可以当成扯皮** ）
--+  - 从报纸杂志的报道标题开始联想
--+    - 不看标题推测内容
--+  - 增加“思考的雏形”
--+    - 增加模型的雏形，锻炼类比能力
--+       - 因急速增长而破裂的模型
--+       - 基于良性循环的增长模型
--+       - 专注本质性能的模型
--+       - 脱离零和游戏
--+    - 增加有趣素材
--+  - 让思维可视化
--+    - “可视化”可以从不完整模型开始
--+    - 批判性看待所建模型
--+    - 白板是深度思考的强力武器
--+  - 用自己的观点与他人的观点碰撞
--+  - 磨练历史观
--+    - 本源动力下运动的历史
--+  - 解决无解的问题
--+    - 向经典学习
--+
--+> 附注：金融工程学的进步源于对股价波动背后的模型及动力机制的解读。这个理论发现，金融市场中股价的变化与浮于水面的微粒不停做无规则运动（也称为布朗运动）的现象有相同的模型及动力机制。
--\ No newline at end of file
--```
-```
-
-## sitemap.txt
-
-```diff
-
-@@ -261,6 +261,20 @@ https://tinysnow.github.io/笔记/记录/游玩游戏记录
- https://tinysnow.github.io/笔记/记录/观影记录
- https://tinysnow.github.io/笔记/记录/记录
- https://tinysnow.github.io/笔记/记录/软件订阅记录
-+https://tinysnow.github.io/读书/零零散散/二十首情诗和一首绝望的歌
-+https://tinysnow.github.io/读书/零零散散/人间告白
-+https://tinysnow.github.io/读书/零零散散/你当像鸟飞往你的山
-+https://tinysnow.github.io/读书/零零散散/如何阅读一本书
-+https://tinysnow.github.io/读书/零零散散/山茶文具店
-+https://tinysnow.github.io/读书/零零散散/快速抓重点，过目不忘的阅读术
-+https://tinysnow.github.io/读书/零零散散/我想要两颗西柚
-+https://tinysnow.github.io/读书/零零散散/我离开之后
-+https://tinysnow.github.io/读书/零零散散/数学之美
-+https://tinysnow.github.io/读书/零零散散/明天，我要和昨天的你约会
-+https://tinysnow.github.io/读书/零零散散/狮子之家的点心日
-+https://tinysnow.github.io/读书/零零散散/追风筝的人
-+https://tinysnow.github.io/读书/零零散散/零零散散
-+https://tinysnow.github.io/读书/零零散散/麻省理工深度思考法
- https://tinysnow.github.io/技术/ArchRISC-V/Packages/Packages
- https://tinysnow.github.io/技术/ArchRISC-V/Packages/SVT-HEVC
- https://tinysnow.github.io/技术/ArchRISC-V/Packages/SVT-VP9
-```
-
-## sitemap.xml
-
-```diff
-
-@@ -2,1138 +2,1194 @@
- <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
-     <url>
-         <loc>https://tinysnow.github.io/</loc>
--        <lastmod>2022-12-27T12:03:57.639Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.678Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/last-updated</loc>
--        <lastmod>2022-12-27T12:03:57.654Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.708Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/个人简介</loc>
--        <lastmod>2022-12-27T12:03:57.637Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.674Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/问题总表</loc>
--        <lastmod>2022-12-27T12:03:57.658Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.711Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/学习</loc>
--        <lastmod>2022-12-27T12:03:57.948Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.974Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/小说</loc>
--        <lastmod>2022-12-27T12:03:58.642Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.712Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Errors</loc>
--        <lastmod>2022-12-27T12:03:57.672Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.723Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Knowledge</loc>
--        <lastmod>2022-12-27T12:03:57.666Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.719Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/技术</loc>
--        <lastmod>2022-12-27T12:03:57.661Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.715Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/断章</loc>
--        <lastmod>2022-12-27T12:03:58.049Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.072Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/笔记/笔记</loc>
--        <lastmod>2022-12-27T12:03:58.599Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.668Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/读书/读书</loc>
--        <lastmod>2022-12-27T12:03:58.595Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.608Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/公共基础知识/中国近现代史</loc>
--        <lastmod>2022-12-27T12:03:58.016Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.040Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/公共基础知识/公共基础知识</loc>
--        <lastmod>2022-12-27T12:03:57.989Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.013Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/公共基础知识/公文</loc>
--        <lastmod>2022-12-27T12:03:58.024Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.047Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/公共基础知识/刑法</loc>
--        <lastmod>2022-12-27T12:03:58.001Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.025Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/公共基础知识/宪法</loc>
--        <lastmod>2022-12-27T12:03:57.993Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.017Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/公共基础知识/民法</loc>
--        <lastmod>2022-12-27T12:03:57.997Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.021Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/公共基础知识/经济学</loc>
--        <lastmod>2022-12-27T12:03:58.020Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.044Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/公共基础知识/经济法</loc>
--        <lastmod>2022-12-27T12:03:58.008Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.033Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/公共基础知识/行政法</loc>
--        <lastmod>2022-12-27T12:03:58.005Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.029Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/公共基础知识/马克思主义哲学</loc>
--        <lastmod>2022-12-27T12:03:58.012Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.036Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/日语/句型整理</loc>
--        <lastmod>2022-12-27T12:03:57.962Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.987Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/日语/日语</loc>
--        <lastmod>2022-12-27T12:03:57.958Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.984Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/日语/日语易错词</loc>
--        <lastmod>2022-12-27T12:03:57.965Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.990Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/日语/日语语法整理</loc>
--        <lastmod>2022-12-27T12:03:57.970Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.995Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/法语/法语</loc>
--        <lastmod>2022-12-27T12:03:57.951Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.977Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/法语/简明法语教程笔记</loc>
--        <lastmod>2022-12-27T12:03:57.955Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.980Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/管理学/概论</loc>
--        <lastmod>2022-12-27T12:03:57.977Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.003Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/管理学/管理学</loc>
--        <lastmod>2022-12-27T12:03:57.974Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.999Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/管理学/组织</loc>
--        <lastmod>2022-12-27T12:03:57.985Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.010Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/管理学/规章制度</loc>
--        <lastmod>2022-12-27T12:03:57.981Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.006Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/零碎知识整理/中文书面语</loc>
--        <lastmod>2022-12-27T12:03:58.038Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.062Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/零碎知识整理/俄语译码表</loc>
--        <lastmod>2022-12-27T12:03:58.035Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.059Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/零碎知识整理/分享想法</loc>
--        <lastmod>2022-12-27T12:03:58.046Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.069Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/零碎知识整理/毕业设计</loc>
--        <lastmod>2022-12-27T12:03:58.042Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.066Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/零碎知识整理/经济和金融产品理解</loc>
--        <lastmod>2022-12-27T12:03:58.031Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.055Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/学习/零碎知识整理/零碎知识整理</loc>
--        <lastmod>2022-12-27T12:03:58.027Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.051Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/其他小说/Chapter 1</loc>
--        <lastmod>2022-12-27T12:03:58.763Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.830Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/其他小说/其他小说</loc>
--        <lastmod>2022-12-27T12:03:58.741Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.807Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/其他小说/夜天盛世夜天梦</loc>
--        <lastmod>2022-12-27T12:03:58.752Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.819Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/其他小说/小说设定</loc>
--        <lastmod>2022-12-27T12:03:58.760Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.826Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/其他小说/恋人之间的秘密</loc>
--        <lastmod>2022-12-27T12:03:58.756Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.822Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/其他小说/第一章 冲击</loc>
--        <lastmod>2022-12-27T12:03:58.744Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.811Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/其他小说/第二章 巨变</loc>
--        <lastmod>2022-12-27T12:03:58.748Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.815Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练</loc>
--        <lastmod>2022-12-27T12:03:58.646Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.715Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 公主与夫人（《欢恋》番外）</loc>
--        <lastmod>2022-12-27T12:03:58.658Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.727Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 少女的夏天</loc>
--        <lastmod>2022-12-27T12:03:58.732Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.799Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 就算是厨师也能照亮他人</loc>
--        <lastmod>2022-12-27T12:03:58.693Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.762Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 散打很温柔</loc>
--        <lastmod>2022-12-27T12:03:58.689Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.758Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 昂贵的教师</loc>
--        <lastmod>2022-12-27T12:03:58.728Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.795Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 普通</loc>
--        <lastmod>2022-12-27T12:03:58.705Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.773Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 欺负人</loc>
--        <lastmod>2022-12-27T12:03:58.724Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.792Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 满足</loc>
--        <lastmod>2022-12-27T12:03:58.720Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.788Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 美术生的夜晚</loc>
--        <lastmod>2022-12-27T12:03:58.685Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.754Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 芭蕾舞者欺负人</loc>
--        <lastmod>2022-12-27T12:03:58.697Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.766Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 认真地发光</loc>
--        <lastmod>2022-12-27T12:03:58.717Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.784Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 设计师想要恋爱</loc>
--        <lastmod>2022-12-27T12:03:58.709Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.777Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 证明你喜欢</loc>
--        <lastmod>2022-12-27T12:03:58.681Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.750Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 遗留</loc>
--        <lastmod>2022-12-27T12:03:58.735Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.803Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 酒保与冷静</loc>
--        <lastmod>2022-12-27T12:03:58.713Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.780Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之一</loc>
--        <lastmod>2022-12-27T12:03:58.701Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.769Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之三</loc>
--        <lastmod>2022-12-27T12:03:58.673Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.742Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之二</loc>
--        <lastmod>2022-12-27T12:03:58.677Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.746Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之五</loc>
--        <lastmod>2022-12-27T12:03:58.666Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.735Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之六</loc>
--        <lastmod>2022-12-27T12:03:58.662Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.731Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之四</loc>
--        <lastmod>2022-12-27T12:03:58.669Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.739Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/有些事情，不应转瞬即逝</loc>
--        <lastmod>2022-12-27T12:03:58.650Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.719Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/小说/想象力训练/深入骨髓</loc>
--        <lastmod>2022-12-27T12:03:58.654Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.723Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/ArchRISC-V</loc>
--        <lastmod>2022-12-27T12:03:57.676Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.727Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/FrequentlyUsed</loc>
--        <lastmod>2022-12-27T12:03:57.762Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.795Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/IssueTemplate</loc>
--        <lastmod>2022-12-27T12:03:57.767Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.803Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Workflow</loc>
--        <lastmod>2022-12-27T12:03:57.773Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.807Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/工作</loc>
--        <lastmod>2022-12-27T12:03:57.779Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.810Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Java/AnnotationsAndReflection</loc>
--        <lastmod>2022-12-27T12:03:57.817Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.842Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Java/HighConcurrencyKnowledge</loc>
--        <lastmod>2022-12-27T12:03:57.820Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.846Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Java/Java</loc>
--        <lastmod>2022-12-27T12:03:57.804Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.829Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Java/JavaThreads</loc>
--        <lastmod>2022-12-27T12:03:57.813Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.837Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Java/KotlinNote</loc>
--        <lastmod>2022-12-27T12:03:57.824Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.849Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Java/文件模板</loc>
--        <lastmod>2022-12-27T12:03:57.827Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.853Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Java/集合</loc>
--        <lastmod>2022-12-27T12:03:57.808Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.832Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/Android 常用闭包</loc>
--        <lastmod>2022-12-27T12:03:57.922Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.948Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/Android 笔记截图</loc>
--        <lastmod>2022-12-27T12:03:57.918Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.945Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/Bash 代表命令</loc>
--        <lastmod>2022-12-27T12:03:57.854Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.880Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/CCleaner 清理项</loc>
--        <lastmod>2022-12-27T12:03:57.925Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.951Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/Git 学习笔记</loc>
--        <lastmod>2022-12-27T12:03:57.850Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.876Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/MATLAB 复习</loc>
--        <lastmod>2022-12-27T12:03:57.870Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.896Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/PWN College Solutions</loc>
--        <lastmod>2022-12-27T12:03:57.886Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.913Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/Recovery + Root 掉落重新刷入方法</loc>
--        <lastmod>2022-12-27T12:03:57.929Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.955Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/SolutionsAndSteps</loc>
--        <lastmod>2022-12-27T12:03:57.941Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.967Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/Tic-tac-toe Game Note of React</loc>
--        <lastmod>2022-12-27T12:03:57.936Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.962Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/Uniapp 从 HX 迁移到 WebStorm</loc>
--        <lastmod>2022-12-27T12:03:57.890Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.917Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/临时</loc>
--        <lastmod>2022-12-27T12:03:57.944Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.970Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/其他资料</loc>
--        <lastmod>2022-12-27T12:03:57.845Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.872Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/发送软件清单及其作用解释</loc>
--        <lastmod>2022-12-27T12:03:57.932Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.959Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/汇编复习笔记</loc>
--        <lastmod>2022-12-27T12:03:57.867Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.893Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/第一个 Bash 脚本</loc>
--        <lastmod>2022-12-27T12:03:57.858Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.884Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/给计算机 202102 班的选修课建议</loc>
--        <lastmod>2022-12-27T12:03:57.893Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.921Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/设计模式极简笔记</loc>
--        <lastmod>2022-12-27T12:03:57.862Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.888Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/软件知识补充</loc>
--        <lastmod>2022-12-27T12:03:57.874Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.900Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/重装系统 8-7</loc>
--        <lastmod>2022-12-27T12:03:57.881Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.907Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/重装系统知识</loc>
--        <lastmod>2022-12-27T12:03:57.877Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.904Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/第一章：计算机的历史</loc>
--        <lastmod>2022-12-27T12:03:57.790Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.817Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/第三章：简单逻辑门</loc>
--        <lastmod>2022-12-27T12:03:57.800Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.825Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/第二章：计算机的构成</loc>
--        <lastmod>2022-12-27T12:03:57.795Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.822Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/计算机科学极简入门指南</loc>
--        <lastmod>2022-12-27T12:03:57.784Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.814Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/句子/句子</loc>
--        <lastmod>2022-12-27T12:03:58.561Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.574Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/句子/日记扉页</loc>
--        <lastmod>2022-12-27T12:03:58.565Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.578Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/句子/随记断句</loc>
--        <lastmod>2022-12-27T12:03:58.569Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.582Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/感触/感触</loc>
--        <lastmod>2022-12-27T12:03:58.522Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.538Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/感触/感触之一</loc>
--        <lastmod>2022-12-27T12:03:58.546Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.560Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/感触/感触之三</loc>
--        <lastmod>2022-12-27T12:03:58.538Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.553Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/感触/感触之二</loc>
--        <lastmod>2022-12-27T12:03:58.542Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.556Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/感触/感触之五</loc>
--        <lastmod>2022-12-27T12:03:58.529Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.545Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/感触/感触之六</loc>
--        <lastmod>2022-12-27T12:03:58.525Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.542Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/感触/感触之四</loc>
--        <lastmod>2022-12-27T12:03:58.535Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.549Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/感触/无题</loc>
--        <lastmod>2022-12-27T12:03:58.553Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.567Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/感触/遇见 今天</loc>
--        <lastmod>2022-12-27T12:03:58.550Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.564Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/感触/零言碎语</loc>
--        <lastmod>2022-12-27T12:03:58.557Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.571Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/一点看法</loc>
--        <lastmod>2022-12-27T12:03:58.143Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.166Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/为了爱情，是否应该舍弃友情？</loc>
--        <lastmod>2022-12-27T12:03:58.083Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.108Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/你一定走了很远的路吧 - 姬霄</loc>
--        <lastmod>2022-12-27T12:03:58.087Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.111Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/冰面少年</loc>
--        <lastmod>2022-12-27T12:03:58.076Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.100Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/前行</loc>
--        <lastmod>2022-12-27T12:03:58.123Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.146Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/反抗</loc>
--        <lastmod>2022-12-27T12:03:58.111Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.136Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/哥，咱家要散了</loc>
--        <lastmod>2022-12-27T12:03:58.126Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.150Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/回望大二</loc>
--        <lastmod>2022-12-27T12:03:58.097Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.122Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/境遇</loc>
--        <lastmod>2022-12-27T12:03:58.119Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.143Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/奴化圣经</loc>
--        <lastmod>2022-12-27T12:03:58.115Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.139Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/所想所见即真实</loc>
--        <lastmod>2022-12-27T12:03:58.094Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.118Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/文章</loc>
--        <lastmod>2022-12-27T12:03:58.052Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.076Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/暑期总结与瑰想</loc>
--        <lastmod>2022-12-27T12:03:58.129Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.153Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/月圆夜</loc>
--        <lastmod>2022-12-27T12:03:58.108Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.132Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/烟火自述</loc>
--        <lastmod>2022-12-27T12:03:58.062Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.086Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/番茄</loc>
--        <lastmod>2022-12-27T12:03:58.101Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.125Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/篮球女孩</loc>
--        <lastmod>2022-12-27T12:03:58.072Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.097Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/给女性</loc>
--        <lastmod>2022-12-27T12:03:58.066Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.090Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/给男性</loc>
--        <lastmod>2022-12-27T12:03:58.059Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.083Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/色气之下，清纯最大</loc>
--        <lastmod>2022-12-27T12:03:58.136Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.160Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/茉莉清茶</loc>
--        <lastmod>2022-12-27T12:03:58.090Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.115Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/蕴愈彼此，共渡红尘</loc>
--        <lastmod>2022-12-27T12:03:58.147Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.170Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/语言漫谈</loc>
--        <lastmod>2022-12-27T12:03:58.069Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.093Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/追随</loc>
--        <lastmod>2022-12-27T12:03:58.140Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.163Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/通往优秀的路上，痛苦是一种试炼</loc>
--        <lastmod>2022-12-27T12:03:58.151Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.173Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/阑珊，散落人间</loc>
--        <lastmod>2022-12-27T12:03:58.055Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.079Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/随便聊聊</loc>
--        <lastmod>2022-12-27T12:03:58.133Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.156Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/随想录</loc>
--        <lastmod>2022-12-27T12:03:58.104Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.129Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/文章/韧尽万花春绽美，待到寒冬自释香 - 2021年度总结</loc>
--        <lastmod>2022-12-27T12:03:58.080Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.104Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/胡言/心情</loc>
--        <lastmod>2022-12-27T12:03:58.592Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.604Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/胡言/胡言</loc>
--        <lastmod>2022-12-27T12:03:58.573Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.585Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之一</loc>
--        <lastmod>2022-12-27T12:03:58.588Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.600Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之三</loc>
--        <lastmod>2022-12-27T12:03:58.580Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.593Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之二</loc>
--        <lastmod>2022-12-27T12:03:58.584Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.597Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之四</loc>
--        <lastmod>2022-12-27T12:03:58.577Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.589Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/Hide and Seek</loc>
--        <lastmod>2022-12-27T12:03:58.507Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.523Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/一如既往</loc>
--        <lastmod>2022-12-27T12:03:58.359Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.378Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/一瞬间</loc>
--        <lastmod>2022-12-27T12:03:58.414Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.434Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/不屈</loc>
--        <lastmod>2022-12-27T12:03:58.465Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.484Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/减字木兰花 · 伊愿</loc>
--        <lastmod>2022-12-27T12:03:58.374Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.394Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/变</loc>
--        <lastmod>2022-12-27T12:03:58.480Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.498Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/复活</loc>
--        <lastmod>2022-12-27T12:03:58.385Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.405Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/夏影</loc>
--        <lastmod>2022-12-27T12:03:58.418Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.438Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/天仙子 • 忆灵</loc>
--        <lastmod>2022-12-27T12:03:58.473Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.490Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/如梦令 • 愿</loc>
--        <lastmod>2022-12-27T12:03:58.421Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.441Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/小诗</loc>
--        <lastmod>2022-12-27T12:03:58.447Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.466Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/巨人</loc>
--        <lastmod>2022-12-27T12:03:58.407Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.427Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/影</loc>
--        <lastmod>2022-12-27T12:03:58.429Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.448Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/徨</loc>
--        <lastmod>2022-12-27T12:03:58.511Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.527Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/忆忆思</loc>
--        <lastmod>2022-12-27T12:03:58.503Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.519Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/愿望</loc>
--        <lastmod>2022-12-27T12:03:58.476Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.494Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/我不会想见你</loc>
--        <lastmod>2022-12-27T12:03:58.370Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.389Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/摊破浣溪沙</loc>
--        <lastmod>2022-12-27T12:03:58.485Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.501Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/故事</loc>
--        <lastmod>2022-12-27T12:03:58.443Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.462Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/新光</loc>
--        <lastmod>2022-12-27T12:03:58.515Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.531Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/无题之一</loc>
--        <lastmod>2022-12-27T12:03:58.451Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.469Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/无题之二</loc>
--        <lastmod>2022-12-27T12:03:58.378Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.398Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/时光与你</loc>
--        <lastmod>2022-12-27T12:03:58.518Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.534Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/春秋三载</loc>
--        <lastmod>2022-12-27T12:03:58.462Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.480Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/期冀</loc>
--        <lastmod>2022-12-27T12:03:58.489Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.505Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/期待</loc>
--        <lastmod>2022-12-27T12:03:58.436Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.455Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/极端</loc>
--        <lastmod>2022-12-27T12:03:58.396Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.416Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/沉睡在天空之上</loc>
--        <lastmod>2022-12-27T12:03:58.363Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.381Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/清平乐 • 琴韵</loc>
--        <lastmod>2022-12-27T12:03:58.440Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.459Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/点绛唇 • 祈珍</loc>
--        <lastmod>2022-12-27T12:03:58.469Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.487Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/纸鸢</loc>
--        <lastmod>2022-12-27T12:03:58.392Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.412Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/给你</loc>
--        <lastmod>2022-12-27T12:03:58.425Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.445Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/继续</loc>
--        <lastmod>2022-12-27T12:03:58.499Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.516Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/至美</loc>
--        <lastmod>2022-12-27T12:03:58.403Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.423Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/蜕变</loc>
--        <lastmod>2022-12-27T12:03:58.496Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.512Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/行走</loc>
--        <lastmod>2022-12-27T12:03:58.458Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.476Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/行走在命运之上</loc>
--        <lastmod>2022-12-27T12:03:58.399Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.420Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/记 11 月 23 日 飘摇动荡</loc>
--        <lastmod>2022-12-27T12:03:58.410Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.430Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/诗词总录</loc>
--        <lastmod>2022-12-27T12:03:58.356Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.374Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/赠君</loc>
--        <lastmod>2022-12-27T12:03:58.433Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.451Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/迷途</loc>
--        <lastmod>2022-12-27T12:03:58.493Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.508Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/酒</loc>
--        <lastmod>2022-12-27T12:03:58.367Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.385Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/释放一只蝴蝶</loc>
--        <lastmod>2022-12-27T12:03:58.389Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.409Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/顽柔</loc>
--        <lastmod>2022-12-27T12:03:58.455Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.473Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/诗词/鸡尾酒</loc>
--        <lastmod>2022-12-27T12:03:58.381Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.402Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/赠与/千人感谢祭名单</loc>
--        <lastmod>2022-12-27T12:03:58.159Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.180Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/赠与/给三年后自己的一封信</loc>
--        <lastmod>2022-12-27T12:03:58.166Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.188Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/赠与/致两年前自己的回信</loc>
--        <lastmod>2022-12-27T12:03:58.170Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.192Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/赠与/致两年后自己的一封信</loc>
--        <lastmod>2022-12-27T12:03:58.177Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.199Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/赠与/致南国微雪频道每一位订阅者的一封信</loc>
--        <lastmod>2022-12-27T12:03:58.174Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.195Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/赠与/赠与</loc>
--        <lastmod>2022-12-27T12:03:58.155Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.177Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/赠与/频道千人感谢祭</loc>
--        <lastmod>2022-12-27T12:03:58.162Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.183Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记</loc>
--        <lastmod>2022-12-27T12:03:58.181Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.202Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2020 年 10 月 17 日</loc>
--        <lastmod>2022-12-27T12:03:58.348Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.367Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2020 年 5 月 15 日</loc>
--        <lastmod>2022-12-27T12:03:58.352Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.370Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 1 月 28 日</loc>
--        <lastmod>2022-12-27T12:03:58.345Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.363Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 2 日</loc>
--        <lastmod>2022-12-27T12:03:58.260Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.278Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 22 日</loc>
--        <lastmod>2022-12-27T12:03:58.251Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.271Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 24 日</loc>
--        <lastmod>2022-12-27T12:03:58.248Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.268Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 6 日</loc>
--        <lastmod>2022-12-27T12:03:58.257Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.275Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 11 月 19 日</loc>
--        <lastmod>2022-12-27T12:03:58.242Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.264Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 11 月 30 日</loc>
--        <lastmod>2022-12-27T12:03:58.238Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.261Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 12 月 26 日</loc>
--        <lastmod>2022-12-27T12:03:58.235Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.257Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 2 月 3 日</loc>
--        <lastmod>2022-12-27T12:03:58.341Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.360Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 2 月 7 日</loc>
--        <lastmod>2022-12-27T12:03:58.337Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.356Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 3 月 26 日</loc>
--        <lastmod>2022-12-27T12:03:58.330Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.348Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 3 月 31 日</loc>
--        <lastmod>2022-12-27T12:03:58.326Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.345Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 3 月 5 日</loc>
--        <lastmod>2022-12-27T12:03:58.334Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.352Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 5 月 10 日</loc>
--        <lastmod>2022-12-27T12:03:58.322Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.341Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 5 月 18 日</loc>
--        <lastmod>2022-12-27T12:03:58.318Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.337Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 5 月 21 日</loc>
--        <lastmod>2022-12-27T12:03:58.315Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.334Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 6 月 11 日</loc>
--        <lastmod>2022-12-27T12:03:58.304Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.323Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 6 月 6 日</loc>
--        <lastmod>2022-12-27T12:03:58.311Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.330Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 6 月 7 日</loc>
--        <lastmod>2022-12-27T12:03:58.308Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.326Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 14 日</loc>
--        <lastmod>2022-12-27T12:03:58.290Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.308Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 2 日</loc>
--        <lastmod>2022-12-27T12:03:58.293Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.312Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 21 日</loc>
--        <lastmod>2022-12-27T12:03:58.286Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.304Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 27 日</loc>
--        <lastmod>2022-12-27T12:03:58.283Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.301Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 8 月 2 日</loc>
--        <lastmod>2022-12-27T12:03:58.279Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.296Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 8 月 31 日</loc>
--        <lastmod>2022-12-27T12:03:58.276Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.292Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 9 月 15 日</loc>
--        <lastmod>2022-12-27T12:03:58.272Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.289Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 9 月 16 日</loc>
--        <lastmod>2022-12-27T12:03:58.268Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.285Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 9 月 30 日</loc>
--        <lastmod>2022-12-27T12:03:58.264Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.282Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 1 月 20 日</loc>
--        <lastmod>2022-12-27T12:03:58.231Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.253Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 2 月 10 日</loc>
--        <lastmod>2022-12-27T12:03:58.224Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.246Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 2 月 17 日</loc>
--        <lastmod>2022-12-27T12:03:58.220Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.243Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 2 月 7 日</loc>
--        <lastmod>2022-12-27T12:03:58.228Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.250Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 3 月 13 日</loc>
--        <lastmod>2022-12-27T12:03:58.217Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.239Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 3 月 28 日</loc>
--        <lastmod>2022-12-27T12:03:58.214Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.236Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 4 月 1 日</loc>
--        <lastmod>2022-12-27T12:03:58.210Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.232Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 4 月 3 日</loc>
--        <lastmod>2022-12-27T12:03:58.206Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.227Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 5 月 2 日</loc>
--        <lastmod>2022-12-27T12:03:58.203Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.224Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 5 月 25 日</loc>
--        <lastmod>2022-12-27T12:03:58.199Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.220Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 6 月 3 日</loc>
--        <lastmod>2022-12-27T12:03:58.196Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.217Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 7 月 13 日</loc>
--        <lastmod>2022-12-27T12:03:58.188Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.210Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 7 月 21 日</loc>
--        <lastmod>2022-12-27T12:03:58.184Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.206Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 7 月 7 日</loc>
--        <lastmod>2022-12-27T12:03:58.192Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.213Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记之一 - 2021 年 6 月 13 日</loc>
--        <lastmod>2022-12-27T12:03:58.301Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.319Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/断章/随记/随记之二 - 2021 年 6 月 13 日</loc>
--        <lastmod>2022-12-27T12:03:58.297Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.316Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/笔记/教程/Basic Elements</loc>
--        <lastmod>2022-12-27T12:03:58.634Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.704Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/笔记/教程/Git 笔记</loc>
--        <lastmod>2022-12-27T12:03:58.629Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.699Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/笔记/教程/Street Dance Basics</loc>
--        <lastmod>2022-12-27T12:03:58.638Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.708Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/笔记/教程/教程</loc>
--        <lastmod>2022-12-27T12:03:58.622Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.691Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/笔记/教程/重装系统</loc>
--        <lastmod>2022-12-27T12:03:58.626Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.695Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/笔记/记录/已读书目记录</loc>
--        <lastmod>2022-12-27T12:03:58.614Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.684Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/笔记/记录/游玩游戏记录</loc>
--        <lastmod>2022-12-27T12:03:58.618Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.687Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/笔记/记录/观影记录</loc>
--        <lastmod>2022-12-27T12:03:58.606Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.676Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/笔记/记录/记录</loc>
--        <lastmod>2022-12-27T12:03:58.603Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.672Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/笔记/记录/软件订阅记录</loc>
--        <lastmod>2022-12-27T12:03:58.610Z</lastmod>
-+        <lastmod>2022-12-28T11:46:15.680Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/二十首情诗和一首绝望的歌</loc>
-+        <lastmod>2022-12-28T11:46:15.637Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/人间告白</loc>
-+        <lastmod>2022-12-28T11:46:15.623Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/你当像鸟飞往你的山</loc>
-+        <lastmod>2022-12-28T11:46:15.649Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/如何阅读一本书</loc>
-+        <lastmod>2022-12-28T11:46:15.653Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/山茶文具店</loc>
-+        <lastmod>2022-12-28T11:46:15.627Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/快速抓重点，过目不忘的阅读术</loc>
-+        <lastmod>2022-12-28T11:46:15.661Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/我想要两颗西柚</loc>
-+        <lastmod>2022-12-28T11:46:15.615Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/我离开之后</loc>
-+        <lastmod>2022-12-28T11:46:15.619Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/数学之美</loc>
-+        <lastmod>2022-12-28T11:46:15.645Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/明天，我要和昨天的你约会</loc>
-+        <lastmod>2022-12-28T11:46:15.641Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/狮子之家的点心日</loc>
-+        <lastmod>2022-12-28T11:46:15.630Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/追风筝的人</loc>
-+        <lastmod>2022-12-28T11:46:15.665Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/零零散散</loc>
-+        <lastmod>2022-12-28T11:46:15.612Z</lastmod>
-+    </url>
-+    <url>
-+        <loc>https://tinysnow.github.io/读书/零零散散/麻省理工深度思考法</loc>
-+        <lastmod>2022-12-28T11:46:15.657Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/Packages</loc>
--        <lastmod>2022-12-27T12:03:57.681Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.731Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/SVT-HEVC</loc>
--        <lastmod>2022-12-27T12:03:57.734Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.771Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/SVT-VP9</loc>
--        <lastmod>2022-12-27T12:03:57.715Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.757Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/distrobuilder</loc>
--        <lastmod>2022-12-27T12:03:57.757Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.790Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/fluidd</loc>
--        <lastmod>2022-12-27T12:03:57.687Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.735Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/fulcio(Learning)</loc>
--        <lastmod>2022-12-27T12:03:57.749Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.782Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/gnuchess</loc>
--        <lastmod>2022-12-27T12:03:57.701Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.747Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/grafana-agent</loc>
--        <lastmod>2022-12-27T12:03:57.741Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.775Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/imagescan</loc>
--        <lastmod>2022-12-27T12:03:57.693Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.739Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/libgovirt(Learning)</loc>
--        <lastmod>2022-12-27T12:03:57.753Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.787Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/libopenraw</loc>
--        <lastmod>2022-12-27T12:03:57.697Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.743Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/system-config-printer</loc>
--        <lastmod>2022-12-27T12:03:57.745Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.779Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Java/文件模板/JDBC 连接数据库驱动常用写法</loc>
--        <lastmod>2022-12-27T12:03:57.830Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.857Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Java/文件模板/MyBatis 配置文件基本框架</loc>
--        <lastmod>2022-12-27T12:03:57.834Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.860Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Java/文件模板/Spring 配置文件基本框架</loc>
--        <lastmod>2022-12-27T12:03:57.837Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.864Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/Java/文件模板/SpringBoot 项目搭建基本流程</loc>
--        <lastmod>2022-12-27T12:03:57.842Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.869Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/Wing 第三轮接口设计</loc>
--        <lastmod>2022-12-27T12:03:57.904Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.932Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio</loc>
--        <lastmod>2022-12-27T12:03:57.897Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.924Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第三轮考核说明文档</loc>
--        <lastmod>2022-12-27T12:03:57.908Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.935Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第三轮项目途中报错及解决方案</loc>
--        <lastmod>2022-12-27T12:03:57.915Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.941Z</lastmod>
-     </url>
-     <url>
-         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第二轮考核 工程实现记录</loc>
--        <lastmod>2022-12-27T12:03:57.901Z</lastmod>
-+        <lastmod>2022-12-28T11:46:14.928Z</lastmod>
-     </url>
- </urlset>
-```
-
-## head.sh"
-
-```diff
-
-@@ -0,0 +1,55 @@
-+#!/bin/bash
-+
-+# 确保 bash 脚本安全性
-+set -Eeuxo pipefail
-+
-+# 将分隔符暂时保存
-+split=$IFS
-+
-+# 定义分隔符为回车
-+IFS=$'\n'
-+
-+function recursion {
-+
-+    cd $1
-+
-+    # 列出当前目录下所有文件和文件夹
-+    local list=$(ls)
-+
-+    # 循环处理 list 中的项
-+    for one in $list; do
-+
-+        # 如果是一个目录，则进入目录下
-+        if [[ -d $one ]]; then
-+
-+            # 递归处理
-+            recursion $one
-+
-+        else
-+
-+            # 打印当前正在处理的文件
-+            filename=${one%.*}
-+
-+            # 如果后缀名是 .md 则执行添加语句
-+            if [[ "${one##*.}"x = "md"x ]]; then
-+
-+                # 就地修改文件
-+                sed -i "1 i \#\ $filename\n" $filename.md
-+
-+            fi
-+
-+        fi
-+
-+    done
-+
-+    cd ../
-+}
-+
-+# 顶级文件夹处理
-+recursion $1
-+
-+# 将分隔符定义回去
-+IFS=$split
-+
-+# 输出完成
-+echo "done."
-\ No newline at end of file
-```
-
-## 344272214345215201351246226346203205350257227345222214344270200351246226347273235346234233347232204346255214.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 二十首情诗和一首绝望的歌
-+
- ## 倚身在暮色里（Leaning Into The Afternoons）
- 
- ### 英文
-```
-
-## 344272272351227264345221212347231275.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 人间告白
-+
- ## 句子
- 
- - > 　　我对爱的理解是：遇见那个对的人，然后爱他就像爱生命。
-```
-
-## 344275240345275223345203217351270237351243236345276200344275240347232204345261261.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 你当像鸟飞往你的山
-+
- ## 句子
- 
- - > 　　我的哥哥们就像一群狼。他们频繁地试探对方，一旦有哪个小点儿的突然长大，梦想着往上爬，便会爆发混战。
-```
-
-## 345246202344275225351230205350257273344270200346234254344271246.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 如何阅读一本书
-+
- - 书的分类
-   - 一类书：现实问题及解决之道
-   - 二类书：思想需求
-```
-
-## 345261261350214266346226207345205267345272227.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 山茶文具店
-+
- ## 句子
- 
- - > 
-```
-
-## 345277253351200237346212223351207215347202271357274214350277207347233256344270215345277230347232204351230205350257273346234257.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 快速抓重点，过目不忘的阅读术
-+
- - 三类书：
-   - 不看也行
-   - 无需快速阅读
-```
-
-## 346210221346203263350246201344270244351242227350245277346237232.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 我想要两颗西柚
-+
- 
- ## 句子
- 
-```
-
-## 346210221347246273345274200344271213345220216.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 我离开之后
-+
- ## 句子
- 
- - > 　　你想斩断现在这段恋情，因为⿇烦多于快乐。你⼼想：“这也太⿇烦了。如果我⾃⼰有个⼩公寓，可以在凌晨两点做爆⽶花，再喝上⼀杯葡萄酒，没有任何情绪⼲扰，不是更好吗？”
-```
-
-## 346225260345255246344271213347276216.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 数学之美
-+
- - 2012 是那个时候太阳纪的最后一年，所以被谣传成世界末日
- 
- - 西方拼音文字统称罗马式的语言（Roman Language）
-```
-
-## 346230216345244251357274214346210221350246201345222214346230250345244251347232204344275240347272246344274232.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 明天，我要和昨天的你约会
-+
- ## 词语
- 
- - 筅xian3
-```
-
-## 347213256345255220344271213345256266347232204347202271345277203346227245.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 狮子之家的点心日
-+
- ## 词语
- 
- - 赧(nan3)然
-```
-
-## 350277275351243216347255235347232204344272272.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 追风筝的人
-+
- ## 词语
- 
- - 阴鸷(zhi4)：阴险凶狠
-```
-
-## 351272273347234201347220206345267245346267261345272246346200235350200203346263225.md"
-
-```diff
-
-@@ -1,3 +1,5 @@
-+# 麻省理工深度思考法
-+
- 
- - > **本质 = 模型 × 动力机制**
- - MIT 明星课程《系统动力学》
-```
```

## sitemap.xml

```diff

@@ -2,1194 +2,1194 @@
 <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
         <loc>https://tinysnow.github.io/</loc>
-        <lastmod>2022-12-28T11:46:14.678Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.030Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/last-updated</loc>
-        <lastmod>2022-12-28T11:46:14.708Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.068Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/个人简介</loc>
-        <lastmod>2022-12-28T11:46:14.674Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.027Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/问题总表</loc>
-        <lastmod>2022-12-28T11:46:14.711Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.072Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/学习</loc>
-        <lastmod>2022-12-28T11:46:14.974Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.333Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/小说</loc>
-        <lastmod>2022-12-28T11:46:15.712Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.105Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Errors</loc>
-        <lastmod>2022-12-28T11:46:14.723Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.084Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Knowledge</loc>
-        <lastmod>2022-12-28T11:46:14.719Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.080Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/技术</loc>
-        <lastmod>2022-12-28T11:46:14.715Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.075Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/断章</loc>
-        <lastmod>2022-12-28T11:46:15.072Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.438Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/笔记/笔记</loc>
-        <lastmod>2022-12-28T11:46:15.668Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.062Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/读书</loc>
-        <lastmod>2022-12-28T11:46:15.608Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.004Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/公共基础知识/中国近现代史</loc>
-        <lastmod>2022-12-28T11:46:15.040Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.403Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/公共基础知识/公共基础知识</loc>
-        <lastmod>2022-12-28T11:46:15.013Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.374Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/公共基础知识/公文</loc>
-        <lastmod>2022-12-28T11:46:15.047Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.411Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/公共基础知识/刑法</loc>
-        <lastmod>2022-12-28T11:46:15.025Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.388Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/公共基础知识/宪法</loc>
-        <lastmod>2022-12-28T11:46:15.017Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.379Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/公共基础知识/民法</loc>
-        <lastmod>2022-12-28T11:46:15.021Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.384Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/公共基础知识/经济学</loc>
-        <lastmod>2022-12-28T11:46:15.044Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.407Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/公共基础知识/经济法</loc>
-        <lastmod>2022-12-28T11:46:15.033Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.396Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/公共基础知识/行政法</loc>
-        <lastmod>2022-12-28T11:46:15.029Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.392Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/公共基础知识/马克思主义哲学</loc>
-        <lastmod>2022-12-28T11:46:15.036Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.400Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/日语/句型整理</loc>
-        <lastmod>2022-12-28T11:46:14.987Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.348Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/日语/日语</loc>
-        <lastmod>2022-12-28T11:46:14.984Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.344Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/日语/日语易错词</loc>
-        <lastmod>2022-12-28T11:46:14.990Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.351Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/日语/日语语法整理</loc>
-        <lastmod>2022-12-28T11:46:14.995Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.356Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/法语/法语</loc>
-        <lastmod>2022-12-28T11:46:14.977Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.336Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/法语/简明法语教程笔记</loc>
-        <lastmod>2022-12-28T11:46:14.980Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.340Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/管理学/概论</loc>
-        <lastmod>2022-12-28T11:46:15.003Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.364Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/管理学/管理学</loc>
-        <lastmod>2022-12-28T11:46:14.999Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.360Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/管理学/组织</loc>
-        <lastmod>2022-12-28T11:46:15.010Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.371Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/管理学/规章制度</loc>
-        <lastmod>2022-12-28T11:46:15.006Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.367Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/零碎知识整理/中文书面语</loc>
-        <lastmod>2022-12-28T11:46:15.062Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.426Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/零碎知识整理/俄语译码表</loc>
-        <lastmod>2022-12-28T11:46:15.059Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.423Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/零碎知识整理/分享想法</loc>
-        <lastmod>2022-12-28T11:46:15.069Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.434Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/零碎知识整理/毕业设计</loc>
-        <lastmod>2022-12-28T11:46:15.066Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.430Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/零碎知识整理/经济和金融产品理解</loc>
-        <lastmod>2022-12-28T11:46:15.055Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.419Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/学习/零碎知识整理/零碎知识整理</loc>
-        <lastmod>2022-12-28T11:46:15.051Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.415Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/其他小说/Chapter 1</loc>
-        <lastmod>2022-12-28T11:46:15.830Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.221Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/其他小说/其他小说</loc>
-        <lastmod>2022-12-28T11:46:15.807Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.198Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/其他小说/夜天盛世夜天梦</loc>
-        <lastmod>2022-12-28T11:46:15.819Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.209Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/其他小说/小说设定</loc>
-        <lastmod>2022-12-28T11:46:15.826Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.217Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/其他小说/恋人之间的秘密</loc>
-        <lastmod>2022-12-28T11:46:15.822Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.213Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/其他小说/第一章 冲击</loc>
-        <lastmod>2022-12-28T11:46:15.811Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.202Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/其他小说/第二章 巨变</loc>
-        <lastmod>2022-12-28T11:46:15.815Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.206Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练</loc>
-        <lastmod>2022-12-28T11:46:15.715Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.108Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 公主与夫人（《欢恋》番外）</loc>
-        <lastmod>2022-12-28T11:46:15.727Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.120Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 少女的夏天</loc>
-        <lastmod>2022-12-28T11:46:15.799Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.191Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 就算是厨师也能照亮他人</loc>
-        <lastmod>2022-12-28T11:46:15.762Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.154Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 散打很温柔</loc>
-        <lastmod>2022-12-28T11:46:15.758Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.150Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 昂贵的教师</loc>
-        <lastmod>2022-12-28T11:46:15.795Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.187Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 普通</loc>
-        <lastmod>2022-12-28T11:46:15.773Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.165Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 欺负人</loc>
-        <lastmod>2022-12-28T11:46:15.792Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.183Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 满足</loc>
-        <lastmod>2022-12-28T11:46:15.788Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.179Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 美术生的夜晚</loc>
-        <lastmod>2022-12-28T11:46:15.754Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.146Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 芭蕾舞者欺负人</loc>
-        <lastmod>2022-12-28T11:46:15.766Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.158Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 认真地发光</loc>
-        <lastmod>2022-12-28T11:46:15.784Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.176Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 设计师想要恋爱</loc>
-        <lastmod>2022-12-28T11:46:15.777Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.169Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 证明你喜欢</loc>
-        <lastmod>2022-12-28T11:46:15.750Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.142Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 遗留</loc>
-        <lastmod>2022-12-28T11:46:15.803Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.194Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练 - 酒保与冷静</loc>
-        <lastmod>2022-12-28T11:46:15.780Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.171Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之一</loc>
-        <lastmod>2022-12-28T11:46:15.769Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.161Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之三</loc>
-        <lastmod>2022-12-28T11:46:15.742Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.135Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之二</loc>
-        <lastmod>2022-12-28T11:46:15.746Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.139Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之五</loc>
-        <lastmod>2022-12-28T11:46:15.735Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.128Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之六</loc>
-        <lastmod>2022-12-28T11:46:15.731Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.124Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/想象力训练之四</loc>
-        <lastmod>2022-12-28T11:46:15.739Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.131Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/有些事情，不应转瞬即逝</loc>
-        <lastmod>2022-12-28T11:46:15.719Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.112Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/小说/想象力训练/深入骨髓</loc>
-        <lastmod>2022-12-28T11:46:15.723Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.116Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/ArchRISC-V</loc>
-        <lastmod>2022-12-28T11:46:14.727Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.088Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/FrequentlyUsed</loc>
-        <lastmod>2022-12-28T11:46:14.795Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.155Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/IssueTemplate</loc>
-        <lastmod>2022-12-28T11:46:14.803Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.160Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Workflow</loc>
-        <lastmod>2022-12-28T11:46:14.807Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.164Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/工作</loc>
-        <lastmod>2022-12-28T11:46:14.810Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.168Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Java/AnnotationsAndReflection</loc>
-        <lastmod>2022-12-28T11:46:14.842Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.200Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Java/HighConcurrencyKnowledge</loc>
-        <lastmod>2022-12-28T11:46:14.846Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.203Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Java/Java</loc>
-        <lastmod>2022-12-28T11:46:14.829Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.187Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Java/JavaThreads</loc>
-        <lastmod>2022-12-28T11:46:14.837Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.195Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Java/KotlinNote</loc>
-        <lastmod>2022-12-28T11:46:14.849Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.207Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Java/文件模板</loc>
-        <lastmod>2022-12-28T11:46:14.853Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.210Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Java/集合</loc>
-        <lastmod>2022-12-28T11:46:14.832Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.191Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/Android 常用闭包</loc>
-        <lastmod>2022-12-28T11:46:14.948Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.306Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/Android 笔记截图</loc>
-        <lastmod>2022-12-28T11:46:14.945Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.303Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/Bash 代表命令</loc>
-        <lastmod>2022-12-28T11:46:14.880Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.237Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/CCleaner 清理项</loc>
-        <lastmod>2022-12-28T11:46:14.951Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.310Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/Git 学习笔记</loc>
-        <lastmod>2022-12-28T11:46:14.876Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.233Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/MATLAB 复习</loc>
-        <lastmod>2022-12-28T11:46:14.896Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.254Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/PWN College Solutions</loc>
-        <lastmod>2022-12-28T11:46:14.913Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.270Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/Recovery + Root 掉落重新刷入方法</loc>
-        <lastmod>2022-12-28T11:46:14.955Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.314Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/SolutionsAndSteps</loc>
-        <lastmod>2022-12-28T11:46:14.967Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.326Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/Tic-tac-toe Game Note of React</loc>
-        <lastmod>2022-12-28T11:46:14.962Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.321Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/Uniapp 从 HX 迁移到 WebStorm</loc>
-        <lastmod>2022-12-28T11:46:14.917Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.274Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/临时</loc>
-        <lastmod>2022-12-28T11:46:14.970Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.329Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/其他资料</loc>
-        <lastmod>2022-12-28T11:46:14.872Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.229Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/发送软件清单及其作用解释</loc>
-        <lastmod>2022-12-28T11:46:14.959Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.317Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/汇编复习笔记</loc>
-        <lastmod>2022-12-28T11:46:14.893Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.250Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/第一个 Bash 脚本</loc>
-        <lastmod>2022-12-28T11:46:14.884Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.241Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/给计算机 202102 班的选修课建议</loc>
-        <lastmod>2022-12-28T11:46:14.921Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.278Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/设计模式极简笔记</loc>
-        <lastmod>2022-12-28T11:46:14.888Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.245Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/软件知识补充</loc>
-        <lastmod>2022-12-28T11:46:14.900Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.258Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/重装系统 8-7</loc>
-        <lastmod>2022-12-28T11:46:14.907Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.265Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/重装系统知识</loc>
-        <lastmod>2022-12-28T11:46:14.904Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.261Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/第一章：计算机的历史</loc>
-        <lastmod>2022-12-28T11:46:14.817Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.175Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/第三章：简单逻辑门</loc>
-        <lastmod>2022-12-28T11:46:14.825Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.183Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/第二章：计算机的构成</loc>
-        <lastmod>2022-12-28T11:46:14.822Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.179Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/计算机科学极简入门指南/计算机科学极简入门指南</loc>
-        <lastmod>2022-12-28T11:46:14.814Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.171Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/句子/句子</loc>
-        <lastmod>2022-12-28T11:46:15.574Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.971Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/句子/日记扉页</loc>
-        <lastmod>2022-12-28T11:46:15.578Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.975Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/句子/随记断句</loc>
-        <lastmod>2022-12-28T11:46:15.582Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.979Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/感触/感触</loc>
-        <lastmod>2022-12-28T11:46:15.538Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.934Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/感触/感触之一</loc>
-        <lastmod>2022-12-28T11:46:15.560Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.955Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/感触/感触之三</loc>
-        <lastmod>2022-12-28T11:46:15.553Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.948Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/感触/感触之二</loc>
-        <lastmod>2022-12-28T11:46:15.556Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.952Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/感触/感触之五</loc>
-        <lastmod>2022-12-28T11:46:15.545Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.941Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/感触/感触之六</loc>
-        <lastmod>2022-12-28T11:46:15.542Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.937Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/感触/感触之四</loc>
-        <lastmod>2022-12-28T11:46:15.549Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.944Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/感触/无题</loc>
-        <lastmod>2022-12-28T11:46:15.567Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.963Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/感触/遇见 今天</loc>
-        <lastmod>2022-12-28T11:46:15.564Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.959Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/感触/零言碎语</loc>
-        <lastmod>2022-12-28T11:46:15.571Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.967Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/一点看法</loc>
-        <lastmod>2022-12-28T11:46:15.166Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.542Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/为了爱情，是否应该舍弃友情？</loc>
-        <lastmod>2022-12-28T11:46:15.108Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.476Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/你一定走了很远的路吧 - 姬霄</loc>
-        <lastmod>2022-12-28T11:46:15.111Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.479Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/冰面少年</loc>
-        <lastmod>2022-12-28T11:46:15.100Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.468Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/前行</loc>
-        <lastmod>2022-12-28T11:46:15.146Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.517Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/反抗</loc>
-        <lastmod>2022-12-28T11:46:15.136Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.505Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/哥，咱家要散了</loc>
-        <lastmod>2022-12-28T11:46:15.150Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.521Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/回望大二</loc>
-        <lastmod>2022-12-28T11:46:15.122Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.491Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/境遇</loc>
-        <lastmod>2022-12-28T11:46:15.143Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.513Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/奴化圣经</loc>
-        <lastmod>2022-12-28T11:46:15.139Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.509Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/所想所见即真实</loc>
-        <lastmod>2022-12-28T11:46:15.118Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.487Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/文章</loc>
-        <lastmod>2022-12-28T11:46:15.076Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.441Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/暑期总结与瑰想</loc>
-        <lastmod>2022-12-28T11:46:15.153Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.524Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/月圆夜</loc>
-        <lastmod>2022-12-28T11:46:15.132Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.501Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/烟火自述</loc>
-        <lastmod>2022-12-28T11:46:15.086Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.453Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/番茄</loc>
-        <lastmod>2022-12-28T11:46:15.125Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.494Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/篮球女孩</loc>
-        <lastmod>2022-12-28T11:46:15.097Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.465Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/给女性</loc>
-        <lastmod>2022-12-28T11:46:15.090Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.457Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/给男性</loc>
-        <lastmod>2022-12-28T11:46:15.083Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.449Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/色气之下，清纯最大</loc>
-        <lastmod>2022-12-28T11:46:15.160Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.531Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/茉莉清茶</loc>
-        <lastmod>2022-12-28T11:46:15.115Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.483Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/蕴愈彼此，共渡红尘</loc>
-        <lastmod>2022-12-28T11:46:15.170Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.547Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/语言漫谈</loc>
-        <lastmod>2022-12-28T11:46:15.093Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.461Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/追随</loc>
-        <lastmod>2022-12-28T11:46:15.163Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.536Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/通往优秀的路上，痛苦是一种试炼</loc>
-        <lastmod>2022-12-28T11:46:15.173Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.552Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/阑珊，散落人间</loc>
-        <lastmod>2022-12-28T11:46:15.079Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.445Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/随便聊聊</loc>
-        <lastmod>2022-12-28T11:46:15.156Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.528Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/随想录</loc>
-        <lastmod>2022-12-28T11:46:15.129Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.498Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/文章/韧尽万花春绽美，待到寒冬自释香 - 2021年度总结</loc>
-        <lastmod>2022-12-28T11:46:15.104Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.472Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/胡言/心情</loc>
-        <lastmod>2022-12-28T11:46:15.604Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.001Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/胡言/胡言</loc>
-        <lastmod>2022-12-28T11:46:15.585Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.983Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之一</loc>
-        <lastmod>2022-12-28T11:46:15.600Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.997Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之三</loc>
-        <lastmod>2022-12-28T11:46:15.593Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.990Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之二</loc>
-        <lastmod>2022-12-28T11:46:15.597Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.994Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/胡言/胡言乱语之四</loc>
-        <lastmod>2022-12-28T11:46:15.589Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.986Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/Hide and Seek</loc>
-        <lastmod>2022-12-28T11:46:15.523Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.919Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/一如既往</loc>
-        <lastmod>2022-12-28T11:46:15.378Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.772Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/一瞬间</loc>
-        <lastmod>2022-12-28T11:46:15.434Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.829Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/不屈</loc>
-        <lastmod>2022-12-28T11:46:15.484Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.880Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/减字木兰花 · 伊愿</loc>
-        <lastmod>2022-12-28T11:46:15.394Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.787Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/变</loc>
-        <lastmod>2022-12-28T11:46:15.498Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.894Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/复活</loc>
-        <lastmod>2022-12-28T11:46:15.405Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.800Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/夏影</loc>
-        <lastmod>2022-12-28T11:46:15.438Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.833Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/天仙子 • 忆灵</loc>
-        <lastmod>2022-12-28T11:46:15.490Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.887Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/如梦令 • 愿</loc>
-        <lastmod>2022-12-28T11:46:15.441Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.837Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/小诗</loc>
-        <lastmod>2022-12-28T11:46:15.466Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.862Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/巨人</loc>
-        <lastmod>2022-12-28T11:46:15.427Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.822Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/影</loc>
-        <lastmod>2022-12-28T11:46:15.448Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.844Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/徨</loc>
-        <lastmod>2022-12-28T11:46:15.527Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.923Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/忆忆思</loc>
-        <lastmod>2022-12-28T11:46:15.519Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.915Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/愿望</loc>
-        <lastmod>2022-12-28T11:46:15.494Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.890Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/我不会想见你</loc>
-        <lastmod>2022-12-28T11:46:15.389Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.783Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/摊破浣溪沙</loc>
-        <lastmod>2022-12-28T11:46:15.501Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.898Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/故事</loc>
-        <lastmod>2022-12-28T11:46:15.462Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.859Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/新光</loc>
-        <lastmod>2022-12-28T11:46:15.531Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.926Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/无题之一</loc>
-        <lastmod>2022-12-28T11:46:15.469Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.865Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/无题之二</loc>
-        <lastmod>2022-12-28T11:46:15.398Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.791Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/时光与你</loc>
-        <lastmod>2022-12-28T11:46:15.534Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.930Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/春秋三载</loc>
-        <lastmod>2022-12-28T11:46:15.480Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.877Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/期冀</loc>
-        <lastmod>2022-12-28T11:46:15.505Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.902Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/期待</loc>
-        <lastmod>2022-12-28T11:46:15.455Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.852Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/极端</loc>
-        <lastmod>2022-12-28T11:46:15.416Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.810Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/沉睡在天空之上</loc>
-        <lastmod>2022-12-28T11:46:15.381Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.776Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/清平乐 • 琴韵</loc>
-        <lastmod>2022-12-28T11:46:15.459Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.855Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/点绛唇 • 祈珍</loc>
-        <lastmod>2022-12-28T11:46:15.487Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.883Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/纸鸢</loc>
-        <lastmod>2022-12-28T11:46:15.412Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.807Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/给你</loc>
-        <lastmod>2022-12-28T11:46:15.445Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.841Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/继续</loc>
-        <lastmod>2022-12-28T11:46:15.516Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.912Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/至美</loc>
-        <lastmod>2022-12-28T11:46:15.423Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.818Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/蜕变</loc>
-        <lastmod>2022-12-28T11:46:15.512Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.909Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/行走</loc>
-        <lastmod>2022-12-28T11:46:15.476Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.873Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/行走在命运之上</loc>
-        <lastmod>2022-12-28T11:46:15.420Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.814Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/记 11 月 23 日 飘摇动荡</loc>
-        <lastmod>2022-12-28T11:46:15.430Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.826Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/诗词总录</loc>
-        <lastmod>2022-12-28T11:46:15.374Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.768Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/赠君</loc>
-        <lastmod>2022-12-28T11:46:15.451Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.848Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/迷途</loc>
-        <lastmod>2022-12-28T11:46:15.508Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.905Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/酒</loc>
-        <lastmod>2022-12-28T11:46:15.385Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.780Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/释放一只蝴蝶</loc>
-        <lastmod>2022-12-28T11:46:15.409Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.803Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/顽柔</loc>
-        <lastmod>2022-12-28T11:46:15.473Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.869Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/诗词/鸡尾酒</loc>
-        <lastmod>2022-12-28T11:46:15.402Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.796Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/赠与/千人感谢祭名单</loc>
-        <lastmod>2022-12-28T11:46:15.180Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.560Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/赠与/给三年后自己的一封信</loc>
-        <lastmod>2022-12-28T11:46:15.188Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.567Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/赠与/致两年前自己的回信</loc>
-        <lastmod>2022-12-28T11:46:15.192Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.571Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/赠与/致两年后自己的一封信</loc>
-        <lastmod>2022-12-28T11:46:15.199Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.578Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/赠与/致南国微雪频道每一位订阅者的一封信</loc>
-        <lastmod>2022-12-28T11:46:15.195Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.575Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/赠与/赠与</loc>
-        <lastmod>2022-12-28T11:46:15.177Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.556Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/赠与/频道千人感谢祭</loc>
-        <lastmod>2022-12-28T11:46:15.183Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.563Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记</loc>
-        <lastmod>2022-12-28T11:46:15.202Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.582Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2020 年 10 月 17 日</loc>
-        <lastmod>2022-12-28T11:46:15.367Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.761Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2020 年 5 月 15 日</loc>
-        <lastmod>2022-12-28T11:46:15.370Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.765Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 1 月 28 日</loc>
-        <lastmod>2022-12-28T11:46:15.363Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.757Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 2 日</loc>
-        <lastmod>2022-12-28T11:46:15.278Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.667Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 22 日</loc>
-        <lastmod>2022-12-28T11:46:15.271Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.659Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 24 日</loc>
-        <lastmod>2022-12-28T11:46:15.268Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.656Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 10 月 6 日</loc>
-        <lastmod>2022-12-28T11:46:15.275Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.663Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 11 月 19 日</loc>
-        <lastmod>2022-12-28T11:46:15.264Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.652Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 11 月 30 日</loc>
-        <lastmod>2022-12-28T11:46:15.261Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.648Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 12 月 26 日</loc>
-        <lastmod>2022-12-28T11:46:15.257Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.644Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 2 月 3 日</loc>
-        <lastmod>2022-12-28T11:46:15.360Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.753Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 2 月 7 日</loc>
-        <lastmod>2022-12-28T11:46:15.356Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.749Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 3 月 26 日</loc>
-        <lastmod>2022-12-28T11:46:15.348Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.741Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 3 月 31 日</loc>
-        <lastmod>2022-12-28T11:46:15.345Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.737Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 3 月 5 日</loc>
-        <lastmod>2022-12-28T11:46:15.352Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.745Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 5 月 10 日</loc>
-        <lastmod>2022-12-28T11:46:15.341Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.733Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 5 月 18 日</loc>
-        <lastmod>2022-12-28T11:46:15.337Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.729Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 5 月 21 日</loc>
-        <lastmod>2022-12-28T11:46:15.334Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.726Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 6 月 11 日</loc>
-        <lastmod>2022-12-28T11:46:15.323Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.714Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 6 月 6 日</loc>
-        <lastmod>2022-12-28T11:46:15.330Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.721Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 6 月 7 日</loc>
-        <lastmod>2022-12-28T11:46:15.326Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.718Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 14 日</loc>
-        <lastmod>2022-12-28T11:46:15.308Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.700Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 2 日</loc>
-        <lastmod>2022-12-28T11:46:15.312Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.703Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 21 日</loc>
-        <lastmod>2022-12-28T11:46:15.304Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.694Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 7 月 27 日</loc>
-        <lastmod>2022-12-28T11:46:15.301Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.691Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 8 月 2 日</loc>
-        <lastmod>2022-12-28T11:46:15.296Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.687Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 8 月 31 日</loc>
-        <lastmod>2022-12-28T11:46:15.292Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.683Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 9 月 15 日</loc>
-        <lastmod>2022-12-28T11:46:15.289Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.679Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 9 月 16 日</loc>
-        <lastmod>2022-12-28T11:46:15.285Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.675Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2021 年 9 月 30 日</loc>
-        <lastmod>2022-12-28T11:46:15.282Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.671Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 1 月 20 日</loc>
-        <lastmod>2022-12-28T11:46:15.253Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.641Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 2 月 10 日</loc>
-        <lastmod>2022-12-28T11:46:15.246Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.633Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 2 月 17 日</loc>
-        <lastmod>2022-12-28T11:46:15.243Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.629Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 2 月 7 日</loc>
-        <lastmod>2022-12-28T11:46:15.250Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.637Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 3 月 13 日</loc>
-        <lastmod>2022-12-28T11:46:15.239Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.626Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 3 月 28 日</loc>
-        <lastmod>2022-12-28T11:46:15.236Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.622Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 4 月 1 日</loc>
-        <lastmod>2022-12-28T11:46:15.232Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.618Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 4 月 3 日</loc>
-        <lastmod>2022-12-28T11:46:15.227Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.614Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 5 月 2 日</loc>
-        <lastmod>2022-12-28T11:46:15.224Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.610Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 5 月 25 日</loc>
-        <lastmod>2022-12-28T11:46:15.220Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.606Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 6 月 3 日</loc>
-        <lastmod>2022-12-28T11:46:15.217Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.602Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 7 月 13 日</loc>
-        <lastmod>2022-12-28T11:46:15.210Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.592Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 7 月 21 日</loc>
-        <lastmod>2022-12-28T11:46:15.206Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.586Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记 - 2022 年 7 月 7 日</loc>
-        <lastmod>2022-12-28T11:46:15.213Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.598Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记之一 - 2021 年 6 月 13 日</loc>
-        <lastmod>2022-12-28T11:46:15.319Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.710Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/断章/随记/随记之二 - 2021 年 6 月 13 日</loc>
-        <lastmod>2022-12-28T11:46:15.316Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.706Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/笔记/教程/Basic Elements</loc>
-        <lastmod>2022-12-28T11:46:15.704Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.097Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/笔记/教程/Git 笔记</loc>
-        <lastmod>2022-12-28T11:46:15.699Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.092Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/笔记/教程/Street Dance Basics</loc>
-        <lastmod>2022-12-28T11:46:15.708Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.101Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/笔记/教程/教程</loc>
-        <lastmod>2022-12-28T11:46:15.691Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.085Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/笔记/教程/重装系统</loc>
-        <lastmod>2022-12-28T11:46:15.695Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.088Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/笔记/记录/已读书目记录</loc>
-        <lastmod>2022-12-28T11:46:15.684Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.077Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/笔记/记录/游玩游戏记录</loc>
-        <lastmod>2022-12-28T11:46:15.687Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.081Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/笔记/记录/观影记录</loc>
-        <lastmod>2022-12-28T11:46:15.676Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.069Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/笔记/记录/记录</loc>
-        <lastmod>2022-12-28T11:46:15.672Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.066Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/笔记/记录/软件订阅记录</loc>
-        <lastmod>2022-12-28T11:46:15.680Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.073Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/二十首情诗和一首绝望的歌</loc>
-        <lastmod>2022-12-28T11:46:15.637Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.032Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/人间告白</loc>
-        <lastmod>2022-12-28T11:46:15.623Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.020Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/你当像鸟飞往你的山</loc>
-        <lastmod>2022-12-28T11:46:15.649Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.042Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/如何阅读一本书</loc>
-        <lastmod>2022-12-28T11:46:15.653Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.046Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/山茶文具店</loc>
-        <lastmod>2022-12-28T11:46:15.627Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.024Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/快速抓重点，过目不忘的阅读术</loc>
-        <lastmod>2022-12-28T11:46:15.661Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.055Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/我想要两颗西柚</loc>
-        <lastmod>2022-12-28T11:46:15.615Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.012Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/我离开之后</loc>
-        <lastmod>2022-12-28T11:46:15.619Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.016Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/数学之美</loc>
-        <lastmod>2022-12-28T11:46:15.645Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.039Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/明天，我要和昨天的你约会</loc>
-        <lastmod>2022-12-28T11:46:15.641Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.035Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/狮子之家的点心日</loc>
-        <lastmod>2022-12-28T11:46:15.630Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.027Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/追风筝的人</loc>
-        <lastmod>2022-12-28T11:46:15.665Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.058Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/零零散散</loc>
-        <lastmod>2022-12-28T11:46:15.612Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.008Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/读书/零零散散/麻省理工深度思考法</loc>
-        <lastmod>2022-12-28T11:46:15.657Z</lastmod>
+        <lastmod>2022-12-28T11:50:33.050Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/Packages</loc>
-        <lastmod>2022-12-28T11:46:14.731Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.091Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/SVT-HEVC</loc>
-        <lastmod>2022-12-28T11:46:14.771Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.130Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/SVT-VP9</loc>
-        <lastmod>2022-12-28T11:46:14.757Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.117Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/distrobuilder</loc>
-        <lastmod>2022-12-28T11:46:14.790Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.151Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/fluidd</loc>
-        <lastmod>2022-12-28T11:46:14.735Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.095Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/fulcio(Learning)</loc>
-        <lastmod>2022-12-28T11:46:14.782Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.142Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/gnuchess</loc>
-        <lastmod>2022-12-28T11:46:14.747Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.107Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/grafana-agent</loc>
-        <lastmod>2022-12-28T11:46:14.775Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.135Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/imagescan</loc>
-        <lastmod>2022-12-28T11:46:14.739Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.099Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/libgovirt(Learning)</loc>
-        <lastmod>2022-12-28T11:46:14.787Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.146Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/libopenraw</loc>
-        <lastmod>2022-12-28T11:46:14.743Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.103Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/ArchRISC-V/Packages/system-config-printer</loc>
-        <lastmod>2022-12-28T11:46:14.779Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.138Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Java/文件模板/JDBC 连接数据库驱动常用写法</loc>
-        <lastmod>2022-12-28T11:46:14.857Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.214Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Java/文件模板/MyBatis 配置文件基本框架</loc>
-        <lastmod>2022-12-28T11:46:14.860Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.218Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Java/文件模板/Spring 配置文件基本框架</loc>
-        <lastmod>2022-12-28T11:46:14.864Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.222Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/Java/文件模板/SpringBoot 项目搭建基本流程</loc>
-        <lastmod>2022-12-28T11:46:14.869Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.226Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/Wing 第三轮接口设计</loc>
-        <lastmod>2022-12-28T11:46:14.932Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.289Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio</loc>
-        <lastmod>2022-12-28T11:46:14.924Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.281Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第三轮考核说明文档</loc>
-        <lastmod>2022-12-28T11:46:14.935Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.293Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第三轮项目途中报错及解决方案</loc>
-        <lastmod>2022-12-28T11:46:14.941Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.299Z</lastmod>
     </url>
     <url>
         <loc>https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第二轮考核 工程实现记录</loc>
-        <lastmod>2022-12-28T11:46:14.928Z</lastmod>
+        <lastmod>2022-12-28T11:50:32.285Z</lastmod>
     </url>
 </urlset>
```

## 一些安慰.md

```diff

@@ -0,0 +1,8 @@
+# 一些安慰
+
+就算有时候，我们觉得一切都糟透了，
+
+美好的瞬间也一定会不期而遇的。
+
+憧憬吧。
+
```

## 井.md

```diff

@@ -0,0 +1,10 @@
+# 井
+
+旅行者坐在井边沉思着。
+
+想想打造了这口井的人，
+
+想想他的孤单，
+
+想想他那散落一地的梦想。
+
```

## 你的季节.md

```diff

@@ -0,0 +1,8 @@
+# 你的季节
+
+这是你的季节。
+
+漾起的微风、飘舞的花瓣和耀眼的阳光。
+
+这些，都是你的呀。
+
```

## 你的星星.md

```diff

@@ -0,0 +1,10 @@
+# 你的星星
+
+天空和大地茫茫地连成了一片光，
+
+让人有点晕乎乎。
+
+但你的那颗星星是最亮的，
+
+所以，我才没有迷路呀。
+
```

## 你的花园.md

```diff

@@ -0,0 +1,8 @@
+# 你的花园
+
+每当想念你的时候，
+
+我就种下一株花，
+
+不知不觉，便成就了这样娇艳的花园。
+
```

## 分享日常.md

```diff

@@ -0,0 +1,12 @@
+# 分享日常
+
+听听你的声音，
+
+捡起一些回忆，
+
+分享着彼此的日常、露出笑容的时候，
+
+感觉世界就好像被施了魔法一样，
+
+更加可爱了。
+
```

## 呼唤的声音.md

```diff

@@ -0,0 +1,8 @@
+# 呼唤的声音
+
+往无尽的深渊沉沉坠下时，
+
+我听到了你的声音。
+
+终于，我拼尽全力重新抬起了头。
+
```

## 哪怕没有理由.md

```diff

@@ -0,0 +1,12 @@
+# 哪怕没有理由
+
+为你写一些文字，
+
+并不需要太多理由。
+
+因为阳光很好，
+
+因为花儿很香，
+
+因为想念你。
+
```

## 守灯人.md

```diff

@@ -0,0 +1,8 @@
+# 守灯人
+
+重新为城市里那些熄灭的路灯漆上灯光，
+
+是他的工作。
+
+他由衷地热爱着他的工作。
+
```

## 对话.md

```diff

@@ -0,0 +1,10 @@
+# 对话
+
+夜晚既冷且长，
+
+却因有那么多想要分享的话题而格外充实。
+
+我们就这样在深夜里
+
+走了又走。
+
```

## 封底.md

```diff

@@ -0,0 +1,17 @@
+# 封底
+
+我想画的并非居住在幸福童话中的人们，
+
+而是和你我相同的一般人，
+
+在怀抱着不安与恐惧的同时，也期待着希望的到来，
+
+渴望在反复的日常中，窥见幸福的瞬间。
+
+在上床睡觉之前，想要求得安慰或感到沮丧时，
+
+或者心里感到疲惫、不安的时候，
+
+无论何时何地，翻开书中的任何一页，
+
+希望你能在画中找到只属于自己的故事。
```

## 小小的对白.md

```diff

@@ -0,0 +1,8 @@
+# 小小的对白
+
+“我呀，在公交车站看到鲸鱼飞过去啦。”
+
+你静静地听着，
+
+“一定很漂亮啰。”你答道。
+
```

## 小蜡烛.md

```diff

@@ -0,0 +1,8 @@
+# 小蜡烛
+
+你真是闪闪发光呀！
+
+直到现在，
+
+小蜡烛还没有见过比自己更明亮的东西呢。
+
```

## 幸福.md

```diff

@@ -0,0 +1,6 @@
+# 幸福
+
+平和的午后时光，
+
+像画一样的那些瞬间。
+
```

## 心.md

```diff

@@ -0,0 +1,16 @@
+# 心
+
+给心浇浇水，
+
+它冒出了嫩芽，绽放了花朵。
+
+这就是我的心啊，
+
+总是想展露给你看的心啊。
+
+是不是既温暖又柔软呢？
+
+每当我想你的时候，心就变成了这样。
+
+心啊，是不会说谎的。
+
```

## 我的宇宙.md

```diff

@@ -0,0 +1,8 @@
+# 我的宇宙
+
+“快看这个。”
+
+昏暗的阁楼上，孩子打开了箱子。
+
+“欢迎来到我的宇宙！”
+
```

## 散步.md

```diff

@@ -0,0 +1,8 @@
+# 散步
+
+突然想起某一天的散步。
+
+那暖融融的阳光、风
+
+和没有来由的心跳和音乐。
+
```

## 最美的东西.md

```diff

@@ -0,0 +1,8 @@
+# 最美的东西
+
+花语有什么重要的呢？
+
+为某人准备一束花二，
+
+那颗心啊，就比花本身更加美丽了。
+
```

## 朝着尽头.md

```diff

@@ -0,0 +1,10 @@
+# 朝着尽头
+
+就算旅途漫漫，
+
+也终究有它的终点。
+
+所有美好的故事，
+
+也必将会有一个美好的结局。
+
```

## 来自宇宙的信.md

```diff

@@ -0,0 +1,10 @@
+# 来自宇宙的信
+
+亲爱的，你好呀，
+
+我现在要出发去宇宙的那一边啦。
+
+你寄来的信，总是沾着月亮的星尘，
+
+让我的心如此砰砰乱跳。
+
```

## 来自月亮的回信.md

```diff

@@ -0,0 +1,12 @@
+# 来自月亮的回信
+
+每天晚上，我都写信给月亮。
+
+当朦胧的清晨再次到来，
+
+世间万物逐渐恢复了原本的颜色。
+
+我突然明白——
+
+这，就是月亮的回信啊。
+
```

## 枕边的故事.md

```diff

@@ -0,0 +1,20 @@
+# 枕边的故事
+
+每当巨大的月亮升起，
+
+胆怯的狼
+
+便坐在月光之下，
+
+聆听那些冒险故事。
+
+不识字的少年啊，
+
+煞有介事地朗读着无字的书页，
+
+只想窥探彼此更深的眼眸。
+
+这大概也是为何
+
+夜空中的月光如此清冽吧。
+
```

## 梦尽头的你.md

```diff

@@ -0,0 +1,6 @@
+# 梦尽头的你
+
+总是站在温暖梦乡尽头的你啊，
+
+我来见你啦。
+
```

## 梦的距离.md

```diff

@@ -0,0 +1,8 @@
+# 梦的距离
+
+梦啊，比想象的更近一些。
+
+我们需要做的
+
+只是把手电筒打开而已。
+
```

## 永远.md

```diff

@@ -0,0 +1,8 @@
+# 永远
+
+如果，停止的一瞬，
+
+就叫做永远的话，
+
+我们之间，经历了那么多的永远啊。
+
```

## 沙漠里的玫瑰.md

```diff

@@ -0,0 +1,10 @@
+# 沙漠里的玫瑰
+
+“每个人，
+
+都很想找到沙漠里盛放的玫瑰。”
+
+“没关系的，
+
+我早已习惯了等待。”
+
```

## 海浪.md

```diff

@@ -0,0 +1,8 @@
+# 海浪
+
+你和我呀，真的很像呢。
+
+孩子将星星拥入怀中，以海浪当作被褥。
+
+奇怪，这样就再也不孤独了呢。
+
```

## 温暖的约定.md

```diff

@@ -0,0 +1,8 @@
+# 温暖的约定
+
+两个人注视着彼此的眼眸，互相约定：
+
+我们一定会再次相见的，
+
+我在最温暖的季节等待着你。
+
```

## 灿烂的尽头.md

```diff

@@ -0,0 +1,6 @@
+# 灿烂的尽头
+
+只有穿越了黑暗才明白，
+
+光，原来是如此的灿烂。
+
```

## 特别的时刻.md

```diff

@@ -0,0 +1,6 @@
+# 特别的时刻
+
+约好了哦，
+
+最平凡的时刻也会成为最特别的时刻。
+
```

## 献给身在某处的你.md

```diff

@@ -0,0 +1,10 @@
+# 献给身在某处的你
+
+我啊，一直都在那个地方哦。
+
+掀开书本，
+
+抖落灰尘，
+
+我就在那里呢，来找我吧。
+
```

## 相信.md

```diff

@@ -0,0 +1,10 @@
+# 相信
+
+她仰望着天空。
+
+一切都会像魔法一样，
+
+越来越好的，
+
+她坚信着。
+
```

## 离别.md

```diff

@@ -0,0 +1,10 @@
+# 离别
+
+如果把每一天都算作是一场离别，
+
+我会将这离别变成最唯美的过程。
+
+待到下一个清晨来临，
+
+再带着全新的怦然心动向它问好。
+
```

## 精灵之舞.md

```diff

@@ -0,0 +1,12 @@
+# 精灵之舞
+
+当你进入了梦乡，
+
+月光下的精灵便翩翩起舞。
+
+当你清晨再次醒来，
+
+这个世界这般耀眼，
+
+大概也正是因为如此吧。
+
```

## 紧急降落.md

```diff

@@ -0,0 +1,10 @@
+# 紧急降落
+
+偶尔我也会想，
+
+这所有的一切，
+
+会不会是因为我紧急降落在了
+
+一颗陌生的小行星上？
+
```

## 终点站.md

```diff

@@ -0,0 +1,8 @@
+# 终点站
+
+孩子递出了手中的车票。
+
+“现在，轮到你讲故事啦。”
+
+就这样，这里已经不再是终点站了。
+
```

## 给你.md

```diff

@@ -0,0 +1,10 @@
+# 给你
+
+如果要抱着你前行，我会有些吃力。
+
+如果硬要你自己勇往直前，你也会厌倦不堪的吧。
+
+所以，我会等着你的，
+
+我们一起走下去。
+
```

## 花.md

```diff

@@ -0,0 +1,8 @@
+# 花
+
+一定会绽放得娇艳动人，
+
+哪怕花开的节奏各有不同。
+
+因为，你就是花啊。
+
```

## 门.md

```diff

@@ -0,0 +1,8 @@
+# 门
+
+孩子小心翼翼而又坚定地
+
+画了一扇门。
+
+这是一扇，只有孩子自己能打开的门。
+
```

## 阳光.md

```diff

@@ -0,0 +1,10 @@
+# 阳光
+
+我带了这么多，
+
+这么多的阳光来给你哦！
+
+这些阳光会让你露出微笑吧。
+
+这不难吧。
+
```

## 音乐.md

```diff

@@ -0,0 +1,6 @@
+# 音乐
+
+“演奏一首什么样的曲子呢？”
+
+“只要是你演奏的，什么都是最好的。”
+
```

## 飞吧.md

```diff

@@ -0,0 +1,8 @@
+# 飞吧
+
+终于，
+
+他松开了豢在心中的小鸟。
+
+这是多么漫长的旅程啊。
+
```

## head.sh

```diff

@@ -1,55 +0,0 @@
-#!/bin/bash
-
-# 确保 bash 脚本安全性
-set -Eeuxo pipefail
-
-# 将分隔符暂时保存
-split=$IFS
-
-# 定义分隔符为回车
-IFS=$'\n'
-
-function recursion {
-
-    cd $1
-
-    # 列出当前目录下所有文件和文件夹
-    local list=$(ls)
-
-    # 循环处理 list 中的项
-    for one in $list; do
-
-        # 如果是一个目录，则进入目录下
-        if [[ -d $one ]]; then
-
-            # 递归处理
-            recursion $one
-
-        else
-
-            # 打印当前正在处理的文件
-            filename=${one%.*}
-
-            # 如果后缀名是 .md 则执行添加语句
-            if [[ "${one##*.}"x = "md"x ]]; then
-
-                # 就地修改文件
-                sed -i "1 i \#\ $filename\n" $filename.md
-
-            fi
-
-        fi
-
-    done
-
-    cd ../
-}
-
-# 顶级文件夹处理
-recursion $1
-
-# 将分隔符定义回去
-IFS=$split
-
-# 输出完成
-echo "done."
\ No newline at end of file
```

## 漫画经济学：生活常识.md

```diff

@@ -0,0 +1,234 @@
+# 漫画经济学：生活常识
+
+## 五险一金
+
+### 内容
+
+#### 养老保险
+
+- 退休前至少缴够 15 年
+- 退休金额与工作多年的平均工资和缴纳年数呈正相关
+- 种类
+  - 基本养老金：大多数人唯一拥有的养老金
+  - 职业养老金
+  - 个人养老金
+
+#### 工伤保险
+
+- 至少缴满一年才能使用
+- 办理手续很麻烦
+
+#### 医疗保险
+
+- 门诊一般走个人账户
+- 报销范围
+  - 不包括进口药
+  - 不包括特殊医疗设备
+  - 不包括特殊医疗服务
+  - 甲类药品全能报：价格低的常见药
+  - 乙类药品部分能报：类型相似，比甲类贵
+  - 丙类药品不给报：高价格，多为保健品、新药
+- 报销金额
+  - 在指定医院或指定药品上才能报销，且各地报销比例不同
+  
+  - 报销药费按总消费比例算
+  
+  - 报销费用占比：
+   
+   > 总医药费 => 起付线封顶线以内 => 去除自费项目 => 按剩下金额乘以报销比例 => 报销费用
+  
+- 其他
+  
+  - 医保必须有，不放心可以增加商业医疗保险
+
+#### 失业保险
+
+#### 生育保险
+
+#### 住房公积金
+
+### 缴费比例
+
+- 缴费基数 × 缴费比例 = 应缴金额
+- 工资 > 上限 => 缴费基数 = 上限
+- 工资 < 下限 => 缴费基数 = 下限
+- 不高不低 => 缴费基数 = 工资
+
+### 其他
+
+- 自己只用缴三险一金
+  - 养老
+  - 失业
+  - 医疗
+  - 公积金
+- 公司缴额外的金额，不算在工资里，但缴纳比例按工资的缴费基数算
+- 五险一金账户
+  - 统筹基金：国家管理
+    - 公司交的医疗保险大部分在这里
+  - 个人账户：自己使用
+
+### 社保基金告急问题
+
+- 原因：老龄化越来越严重
+- 解决方案
+  - 社保基金投资
+  - 划转国有资本（国有企业股票分红划入社保基金）
+
+## 纳税相关
+
+### 种类
+
+#### 所得税
+
+- 工资
+- 个体经营
+- 劳务报酬
+- 稿酬
+- 房租收入
+- 中彩票
+- 其他
+- 注意：免征额
+
+#### 流转税
+
+- 商品流通过程中缴纳的税收
+
+- 主要种类
+  - 增值税
+  - 消费税
+     - 特殊商品
+     - 奢侈品
+     - 高能耗商品
+     - 不可再生商品
+    - 关税
+
+#### 财产和资源税
+
+- 先天资源
+- 人造财产
+- 种类
+  - 土地使用税
+  - 房产税
+
+#### 行为税
+
+- 为限制这类行为征收的税，如对环境不好等
+
+- 车辆购置税
+- 契税或印花税
+  - 注：合同印花缴税才能拥有，可以证明合同合法有效
+
+### 例子
+
+- 水果
+  - 增值税
+- 抽烟
+  - 消费税
+  - 增值税
+- 股票
+  - 印花税
+- 买车
+  - 行为税 => 车辆购置税
+  - 财产税 => 车船使用税
+  - 流转税 => 消费税、增值税
+  - （关税）
+- 买房
+  - 行为税 => 契税、印花税
+  - 财产税 => 土地增值税
+  - 流转税 => 增值税
+  - （房产税）
+
+## 住房相关
+
+### 农村
+
+#### 自留地
+
+- 所有权归集体
+- 收成归农民
+
+#### 宅基地
+
+- 所有权归集体
+- 使用权归农民
+
+#### 小产权房
+
+- 宅基地盖的房子没房产证、没产权、没土地使用权
+- 不能交易
+
+### 城市
+
+#### 福利房
+
+- 没产权，只能自己住
+- 可以补交土地出让金，买下房子产权，进行自由买卖
+
+#### 商品房
+
+- 有产权，可以自由买卖
+
+#### 保障性住房
+
+- 经济适用房
+- 集资房
+- 限价房
+- 共同点
+  - 国家建设，要缴的土地出让金比较少，价格便宜
+  - 政府和个人共同拥有产权
+  - 住满一定年限，补交土地出让金，允许自由买卖
+
+### 产权问题
+
+#### 居住用地
+
+- 土地使用年限：70 年
+- 能上户口，办居住证
+- 能申请公积金贷款
+- 首次购房缴税有优惠
+
+#### 商业用地
+
+- 土地使用年限：40 年
+- 水电气费按商用价格来算，价格不菲
+
+#### 综合用地
+
+- 土地使用年限：50 年
+- 能上户口，办居住证
+- 水电气费按商用价格来算，价格不菲
+
+#### 产权到期
+
+- 续合同，缴纳土地出让金，房屋主人不变
+- 国家回收土地，拆迁
+
+### 面积
+
+- 建筑面积 => 公摊面积 => 套内建筑面积 => 套内使用面积
+
+## 生育相关
+
+- 规律：经济落后和发达，人都少；经济发展适中，人最多
+
+## 借贷相关
+
+- 事件
+  - 次贷危机（放给没有偿还能力的人的贷款，叫次贷，与之相反的叫优贷）
+  - 欧债危机
+- 理性贷款金额：最高不超过工资的 50%-70%
+- 高利贷：法律规定，民间借贷利率超过 36% 属于高利贷，违法
+
+## 消费心理学
+
+- 心理账户：消费目的不同，消费意愿不同
+- 商家常用伎俩：低价品标折扣，高价品标降价
+- 价格锚点
+  - 不用来卖的商品，品质不一定高，用作让顾客比较产生落差和消费意愿
+  - 顾客一般不选高价和低价，而是选中间价
+- 损失规避：比起得到，更害怕失去
+
+## 传销相关
+
+- 基本概念：变相庞氏骗局，不做产品，只要人，没有新人入场，体系崩溃
+
```

## 漫画经济学：金融危机.md

```diff

@@ -0,0 +1,363 @@
+# 漫画经济学：金融危机
+
+## 金融危机概述
+
+### 危险和机遇
+
+### 起因
+
+- 资源配置
+- 经济周期
+
+### 几大事件
+
+- 美国大萧条
+- 郁金香泡沫
+- 南海泡沫
+- 密西西比泡沫
+- 亚洲金融风暴
+- 美国次贷危机
+
+### 学习理由：了解和规避
+
+## 明斯基时刻
+
+### 经济危机通常由金融危机导致
+
+### 金融不稳定假说
+
+- 提出人
+   - 海曼·明斯基
+- 明斯基时刻
+   - 经济从好到坏的时间点
+   - 大周期的转折点
+- 原因
+   - 对冲性融资
+      - 基础：信贷
+      - 典型表现：借的多赚的多，经济表现为增长
+      - 特点：能还上本金和利息
+      - 处在经济增长的初期
+   - 投机性融资
+      - 基础：信贷扩张
+      - 典型表现：回报更大，但风险也更高
+      - 特点：只还得起利息
+      - 处在经济增长的中期
+   - 庞氏融资
+      - 基础：供过于求，通货膨胀
+      - 典型表现：借钱还钱，类似庞氏骗局
+      - 特点：本金利息都还不起，只能借钱还钱
+      - 处在经济增长的后期
+
+### 经济下行
+
+- 供过于求
+- 信贷紧缩
+- 公司倒闭
+- 员工失业
+- 股市大跌
+
+### 缓解经济危机
+
+- 核心：去杠杆化（借的钱）
+- 债务违约重组
+- 财富再分配
+- 货币调节
+
+## 郁金香泡沫
+
+### 发源地
+
+- 荷兰，荷兰重商文化
+
+### 尼德兰革命
+
+- 第一次资产阶级革命
+- 荷兰式第一个资本主义国家
+
+### 资本主义
+
+- 自然经济
+- 资本主义萌芽
+- 私有制
+
+### 开启股份
+
+- 荷兰东印度公司\->阿姆斯特丹证券交易所
+
+### 开启银行
+
+- 阿姆斯特丹银行
+
+### 爆发原因
+
+- 太过富有，为炫耀资本，将郁金香价值推高到虚高地步，因为郁金香很难种，物以稀为贵
+
+### 泡沫破裂
+
+- 英国一水手吃了郁金香球茎
+
+## 南海泡沫
+
+### 背景
+
+- 西班牙王位继承战争
+- 法国因亲缘关系派遣嫡系继承西班牙王位
+- 奥地利国王与西班牙国王同宗，不乐意法国举动
+- 打架，元气重伤
+- 英国怕法国获胜，帮奥地利打架，打出经济亏损
+
+### 形成
+
+- 英国战后经济下滑，诞生国债，欺骗国内贵族下南美挖金矿，产生南海公司
+
+### 发展
+
+- 南海公司下南美失败，回国发行股票，以国家担保的公司信用，用自家股票换取平民手里的国债，股票价格疯涨，实体业发展惨淡
+
+### 泡沫破裂
+
+- 政府出台《泡沫法案》
+
+### 影响
+
+- 股份阴影
+- 英国政局
+
+## 密西西比泡沫
+
+### 背景
+
+- 法国国王路易十四，喜欢发动战争，而且挥霍无度
+
+### 形成
+
+- 法国发行国债，路易十四无力偿还，加上国内政治原因，爆发法国大革命，被推上断头台
+
+### 发展
+
+- 约翰·劳摄政，建立通用银行，以金本位担保，发行纸币，成立密西西比公司伪装去北美挖金矿，欺骗民众信用
+
+### 高潮
+
+- 密西西比公司发行股票，收取民众手中的国债
+
+### 泡沫破裂
+
+- 有人想要拿钱换黄金
+
+### 其他
+
+- 约翰·劳墓志铭
+
+> 这里长眠着那个著名的苏格兰人，
+> 他的计算技巧无人能敌：
+> 他用简单的代数规则，
+> 把法国变得一贫如洗。
+
+## 美国大恐慌（1837）
+
+### 本质
+
+- 一个美国人瞎炒房
+
+### 背景
+
+- 美国独立战争和美国第二次独立战争，中央银行信贷紧缩
+
+### 形成
+
+- 杰克逊关闭银行，分发黄金到各州银行，州银行印钞过多
+
+### 发展
+
+- 西进运动，刷新房地产上限，但是没人买
+
+### 泡沫破裂
+
+- 杰克逊宣布限制投机，房地产只能用黄金，银行被挤兑直至破产，此时英国加息，并且英国投资者撤资，造成经济一落千丈
+
+## 美国银行危机（1907）
+
+### 背景
+
+- 淘金热，南北战争（北工南农，北胜南败）
+
+### 形成
+
+- 信托公司形成，部分民众从银行贷款给信托投资，此时欧洲战后元气大伤，集体加息，投资美国股市的欧洲投资者撤资，适逢旧金山大地震，股市的钱流入灾区
+
+### 发展
+
+- 银行 -> 股民 -> 信托 -> 股市，越来越多的银行储民怀疑自家资产安全，蜂拥而至挤兑银行
+
+### 泡沫破裂
+
+- 银行拿不出资金，资金全在信托，信托倒闭破产
+
+### 解决
+
+- 摩根救市
+
+### 影响
+
+- 影响世界
+- 成立了美联储（美国联邦储备局）
+
+## 美国大萧条（1929-1933）
+
+### 过程
+
+- 柯立芝繁荣 -> 大萧条 -> 关税战 -> 罗斯福新政
+
+### 背景
+
+- 一战，美国倒卖军火，参战成为战胜国捞钱，升级设备提高生产力
+
+### 形成
+
+- 欧洲一战战后一片狼藉，急需恢复经济，美趁虚而入占领市场，生产大量产品并提高关税，此为柯立芝繁荣
+
+### 发展
+
+- 政府不干涉市场，采取自由放任主义，并且此时垄断形成，贫富差距过大。银行为刺激消费，降低贷款门槛，穷人过度消费导致企业过度生产，产能过剩。
+
+### 泡沫破裂
+
+- 有人率先抛售股票，引起恐慌，股市大跌，股票贬值，穷人股民还不起贷款，银行收不了钱，一半银行被挤兑破产。企业产能过剩，产品卖不出，银行又不给贷款，大批中小企业破产。大量人失业。
+
+### 主要原因
+
+- 企业产能过剩
+
+### 影响
+
+- 范围广，从美国波及全世界
+- 时间长，爆发四年影响十年
+- 破坏大
+
+### 解决
+
+- 胡佛救市失败
+   - 干预银行
+   - 不准降工资 -> 企业只能裁员 -> 失业率飙升
+   - 提高关税 -> 引起欧洲关税大战
+- 罗斯福新政
+   - 干预银行（废除金本位）
+   - 调整工业，《全国工业复兴法》
+   - 调整农业，《农业调整法》减产
+   - 加强民生，以工代赈
+- 二战开始，产能过剩问题解决，并且赚了军火费用
+
+### 其他
+
+- 泰罗制（弗雷德里克·泰罗，科学管理之父）
+- 福特制
+- 诞生分期付款
+- 凯恩斯主义
+
+## 第一次石油经济危机（1973-1975）
+
+### 背景
+
+- 《红线协定》，石油输出国组织（OPEC），以色列阿拉伯战争
+
+### 形成
+
+- 阿拉伯人打不过美国撑腰的以色列，宣布石油涨价甚至禁运，美国宣布支持沙特，从此美元与石油挂钩，形成石油美元回流
+
+## 第二次石油经济危机（1979-1981）
+
+### 背景
+
+- 两伊战争，互炸对方油田
+
+### 重大意义
+
+- 是历史上第一次因为能源问题而产生的全球性经济危机
+
+## 日本与《广场协议》
+
+### 背景
+
+- 美苏冷战，美安插眼线，找上日本，把日本从战败国经济恢复起来，日本大搞生产，适逢朝鲜战争爆发，美军驻扎，消费也在日本 -> 神武景气、岩户景气、伊奘诺景气
+
+### 形成
+
+- 第一次石油危机，美国跌倒，日本石油进口受影响，于是产业结构高度化，在第二次石油危机中影响不大，带领亚洲四小龙和四小虎，美国产品受石油危机影响没有竞争力，于是美国与其他各国签订《广场协议》，协议内容：贬低美元，促进出口
+
+### 发展
+
+- 日本出口红利消失，于是自产自销，央行降低利息，施行宽松货币政策，银行大量外贷，经济增长，吸引外国投资者投资
+
+### 高潮
+
+- 第三次石油危机，各行业成本上涨，各行纷纷找银行借贷，银行没钱，更严重的是房地产市场乱象
+
+### 泡沫破裂
+
+- 三重野康上台加息，收回市面货币，股市楼市没有投资者价格开始下跌，一落千丈，外国投资者撤资，经济下行
+
+### 影响
+
+- 消失的十年
+- 平成废物
+
+## 黑色星期一（1987）
+
+### 背景
+
+- 美股和纽交所，梧桐树协议，程式交易
+
+### 形成
+
+- 美联储加息，并购不优惠税费，大量人抛售股票，程式交易开始运作，爆发“羊群效应”，波及全世界
+
+### 解决
+
+- 美国政府重整股市
+
+## 索罗斯与亚洲金融风暴
+
+### 背景
+
+- 亚洲金融崛起，华盛顿共识，固定汇率与浮动汇率
+
+### 形成
+
+- 索罗斯侵入亚洲金融圈，做空泰铢（做空靠差价），泰国用外汇储备抵抗，败退，泰铢严重贬值，索罗斯携款跑路
+
+### 发展
+
+- 索罗斯打算按这一套方式做空亚洲所有货币，遇上香港，爆发中国香港保卫战，香港加中国在外汇储备上世界第一，索罗斯败退
+
+### 其他
+
+> 在金融上，说不上有没有道德，都只是一种操作。——乔治·索罗斯（许多人对他恨之入骨）
+
+## 美国次贷危机
+
+### 背景
+
+- 联邦住宅贷款抵押公司、联邦国民抵押贷款协会、房屋贷款合同资产证券化（贷款合同 -> 债券）、投资银行包装（债务抵押证券，其实就是债券的债券）
+
+### 形成
+
+- 投行买通评级机构忽悠投资者，一条链最终绑定到房价上，房价涨跌决定盈亏
+
+### 发展
+
+- 美联储加息，浮动利率提高，银行收回房屋，房屋供过于求，开始跳水式下跌
+
+### 泡沫破裂
+
+- 贷款者因为加息还不起 -> 银行卖不了房 -> 二房 -> 保险合同倒卖，不赔偿 -> 投行赔钱 -> 投资者赔钱
+
+### 解决
+
+- 国有化金融机构
+- 发钱
+- 降息
+
+## 一切根源
+
+- 源于信任
\ No newline at end of file
```

## 霍乱时期的爱情.md

```diff

@@ -0,0 +1,12 @@
+# 霍乱时期的爱情
+
+## 句子
+
+> 　　他用心打量了女人一番，注意到她一身素孝，以及她悲痛中的不卑不亢。
+>
+> 　　她比他知道得更多。的确如此。她一直陪伴着他，直到他死前几个小时，一如她半生都怀着仰慕和谦卑的温柔陪伴着他一样。这种情感几乎与爱情无异，但在这座连国家机密都处于众人掌控之中的昏睡省城，竟然无人知晓。
+>
+> 　　于是，她知道赫雷米亚·德圣阿莫尔已经走到了解脱的边缘，他的生命所剩下的不过是写一封信的时间。医生对此简直无法相信。
+>
+> 　　她证实说，她不仅早就知道，而且还曾怀着爱意帮他分担过这种垂死的痛苦，就像她也曾怀着同样的爱帮他发现幸福。
+>
```

## 非暴力沟通.md

```diff

@@ -0,0 +1,419 @@
+# 非暴力沟通
+
+## 诗歌
+
+**面具**
+
+<br>
+
+总是一副面具
+
+由纤细白皙的手举着
+
+挡在脸前，
+
+<br>
+
+那轻轻举着面具
+
+的手腕
+
+十分灵巧：
+
+虽然有时
+
+有点颤抖，
+
+指尖抖动，
+
+但总是
+
+能把面具举好。
+
+<br>
+
+年复一年我不禁好奇
+
+但不敢问
+
+终于
+
+无意中
+
+看到了面具背后
+
+却
+
+什么也没有。
+
+她没有脸。
+
+<br>
+
+她已成了
+
+优雅地
+
+举着面具的手。
+
+<br>
+
+——佚名
+
+## 非暴力沟通模式
+
+### 诚实地表达自己，而不批评、指责
+
+#### 观察
+
+> 我所观察（看、听、回忆、想）到的有助于（或无助于）我的福祉的具体行为：
+>
+> “当我（看、听、想到我看到的/听到的） ……”
+
+#### 感受
+
+> 对于这些行为，我有什么样的感受（情感而非思想）：
+>
+> “我感到……”
+
+#### 需要
+
+> 什么样的需要或价值（而非偏好或某种具体的行为）导致我那样的感受：
+>
+> “因为我需要／看重……”
+
+#### 请求
+
+> 清楚地请求（而非命令）那些能丰富我生命的具体行为，
+>
+> “你是否愿意……？”
+
+### 关切地倾听他人，而不解读为批评或指责
+
+#### 观察
+
+> 你所观察（看、听、回忆、想）到的有助于（或无助于）你的福祉的具体行为：
+> 
+> “当你（看、听、想到你看到的/听到的） ……”
+
+#### 感受
+
+> 对于这些行为，你有什么样的感受（是情感而非思想）：
+>
+> “你感到……吗？”
+
+#### 需要
+
+> 什么样的需要或价值（而非偏好或某种具体的行为）导致你那样的感受：
+>
+> “因为你需要／看重……”
+
+#### 请求
+
+> 关切地倾听那些能丰富你生命的具体请求，而不解读为命令：
+>
+> “所以，你想……”
+
+## 书眉法则
+
+- 非暴力沟通的四个要素
+  - 观察
+  - 感受
+  - 需要
+  - 请求
+- 非暴力沟通过程
+  - 什么是我的观察
+  - 我的感受如何
+  - 哪些需要（或价值、愿望等）导致那样的感受
+  - 为了改善生活，我的请求是什么
+- 有些沟通方式使我们难以体会到心中的爱
+- 对他人的评价实际上反映了我们的需要和价值观
+- 分类和评判提倡的是暴力
+- 比较也是一种评判
+- 不带评论的观察是人类智力的最高形式
+- 示弱有助于解决冲突（？）
+- 区分感受和自我评价
+- 区分感受和评判
+- 别人的行为可能会刺激我们，但并不是我们感受的根源
+- “生活的主人”——我们对自己的意志、感受和行动负完全的责任
+- 当对方给予反馈，表达我们的感激。如果对方不愿反馈，倾听他的感受和需要。
+- 分析妨碍了倾听
+- 询问前，先表达我们的感受和需要
+- 当我们痛苦得无法倾听他人时，我们需要
+  - 体会自己的感受和需要
+  - 大声地提出请求
+  - 换一个环境
+- 非暴力沟通最重要的应用也许是培养对自己的爱
+- 非暴力沟通的忧伤：当我们的行为无法满足自身的需要，我们体会着人生的悲哀和内心的渴望
+- 非暴力沟通自我宽恕：感到遗憾时，我们试图了解过去的行为所要满足的需要
+- 让我们的行动基于对生命的爱，而非恐惧、内疚、羞愧或义务
+- 希望他人因为内疚发生改变，就是将刺激和原因混为一谈
+- 表达愤怒的步骤
+  - 停下来，呼吸
+  - 留意我们的指责
+  - 体会我们的需要
+  - 表达感受和尚未满足的需要
+  - 有时，在第3步和第4步之间，我们需要先倾听他人
+- 越是能够倾听他人，也越是有机会被倾听
+- 体会自己的感受和需要可以释放压力
+- 体会他人的感受和需要也可以释放压力
+
+## 摘录
+
+- > 　　非暴力沟通指导我们转变谈话和聆听的方式。我们不再条件反射式地反应，而是去明了自己的观察、感受和愿望，有意识地使用语言。
+
+- > 　　暴力的根源在于人们忽视彼此的感受与需要，而将冲突归咎于对方——至少大部分暴力的根源都是如此，不论是语言、精神或身体的暴力，还是家庭、部落以及国家的暴力。
+
+- > 　　<font color=red>**异化的沟通方式**</font>
+  >
+  > 　　<font color=red>**批评、指责、辱骂、归类、比较以及评论等都是在评判人。**</font>
+
+- > 　　“一件值得做的事情即使做得不怎么样也是值得的！”
+
+- > 　　在《让自己过上悲惨生活》一书中，作者丹·格林伯格（Dan Greenberg）诙谐地揭示了比较对我们的影响。他建议读者，如果真的想过上悲惨生活，就去与他人做比较。
+
+- > 　　“我常常想，如果有一天，技术的进步最终被用来摧毁人类，那么，并非是暴行导致人类的灭亡，当然，更不能说是复仇行为使人类灭亡……
+  >
+  > 　　我们所看到的悲剧和马上就要看到的更大悲剧，并非是世界上反抗的人、不服从的人增多了，而是唯命是从的人、听话的人越来越多。”
+
+- > 　　一旦意识不到我们是自己的主人，我们就成了危险人物。
+
+- > 　　我们大多数的人使用的语言倾向于评判、比较、命令和指责，而不是鼓励我们倾听彼此的感受和需要。
+
+- > 　　印度哲学家克里希那穆提（J.Krishnamurti）曾经说，“不带评论的观察是人类智力的最高形式。”
+
+- > 　　我知道，一旦我想为自己辩护或开脱，我就默认了自己有问题。另一种反应是把对方的话视为攻击而给予反击。
+
+- > 　　还有的词表达的是想法，而非感受。为了清晰地表达感受，我们编制了以下的词汇表：
+  >
+  > - 下列词语可用来表达我们的需要得到满足时的感受
+  >   - 兴奋
+  >   - 喜悦
+  >   - 欣喜
+  >   - 甜蜜
+  >   - 精力充沛
+  >   - 兴高采烈
+  >   - 感激
+  >   - 感动
+  >   - 乐观
+  >   - 自信
+  >   - 振作
+  >   - 振奋
+  >   - 开心
+  >   - 高兴
+  >   - 快乐
+  >   - 愉快
+  >   - 幸福
+  >   - 陶醉
+  >   - 满足
+  >   - 欣慰
+  >   - 心旷神怡
+  >   - 喜出望外
+  >   - 平静
+  >   - 自在
+  >   - 舒适
+  >   - 放松
+  >   - 踏实
+  >   - 安全
+  >   - 温暖
+  >   - 放心
+  >   - 无忧无虑
+  > - 下列词语可用来表达我们的需要没有得到满足时的感受
+  >   - 害怕
+  >   - 担心
+  >   - 焦虑
+  >   - 忧虑
+  >   - 着急
+  >   - 紧张
+  >   - 心神不宁
+  >   - 心烦意乱
+  >   - 忧伤
+  >   - 沮丧
+  >   - 灰心
+  >   - 气馁
+  >   - 泄气
+  >   - 绝望
+  >   - 伤感
+  >   - 凄凉
+  >   - 悲伤
+  >   - 恼怒
+  >   - 愤怒
+  >   - 烦恼
+  >   - 苦恼
+  >   - 生气
+  >   - 厌烦
+  >   - 不满
+  >   - 不快
+  >   - 不耐烦
+  >   - 不高兴
+  >   - 震惊
+  >   - 失望
+  >   - 困惑
+  >   - 茫然
+  >   - 寂寞
+  >   - 孤独
+  >   - 郁闷
+  >   - 难过
+  >   - 悲观
+  >   - 沉重
+  >   - 麻木
+  >   - 精疲力尽
+  >   - 委靡不振
+  >   - 疲惫不堪
+  >   - 昏昏欲睡
+  >   - 无精打采
+  >   - 尴尬
+  >   - 惭愧
+  >   - 内疚
+  >   - 妒忌
+  >   - 遗憾
+  >   - 不舒服
+  
+- > 　　<font color=red>**听到不中听的话时，我们有四种选择。**</font>
+  >
+  > 　　<font color=red>**第一种是认为自己犯了错。**</font>
+  >
+  > 　　<font color=red>**第二种是指责对方。**</font>
+  >
+  > 　　<font color=red>**第三种是了解我们的感受和需要。**</font>
+  >
+  > 　　<font color=red>**第四种是用心体会他人的感受和需要。**</font>
+
+- > 　　家长也许会和孩子说：“你成绩不好让爸爸妈妈伤透了心！”言下之意是，他们快乐或不快乐是孩子的行为造成的。看到父母的痛苦，孩子可能会感到内疚，并因此调整行为来迎合他们。遗憾的是，这种调整只是为了避免内疚，而非出自对学习的热爱。
+
+- > 　　如果我们通过批评来提出主张，人们的反应常常是申辩或反击。反之，如果我们直接说出需要，其他人就较有可能作出积极的回应。
+
+- > 　　如果别人感到不安，我们可以认真地倾听，但无需责备自己。
+
+- > 　　虽然我们对自己的意愿、感受和行动负有完全的责任，但无法为他人负责。我们还发现，人与人相互依存，损人无法真正利己。非暴力沟通正是想帮助我们既表达自己，又关心他人。
+
+- > 　　**个人成长一般会经历三个阶段：**
+  >
+  > 1. **“情感的奴隶”——我们认为自己有义务使他人快乐；**
+  > 2. **“面目可憎”时期——此时，我们拒绝考虑他人的感受和需要；**
+  > 3. **“生活的主人”——我们意识到，虽然我们对自己的意愿、感受和行动负有完全的责任，但无法为他人负责。与此同时，我们还认识到，我们无法牺牲他人来满足自己的需要。**
+
+- > 　　我们提出的请求越具体越好。如果我们的意思含糊不清，别人就难以了解我们到底想要什么。
+
+- > 　　抽象的语言无助于深化自我认识。
+
+- > 　　如果管理者想让他的请求更具建设性，他可以说：“你们是否可以告诉我，我怎样做，你们在和我谈话时才能放得开？”
+
+- > 　　如果一个人提出了明确的请求，却没有提及感受和需要，也有可能导致交流的困难。
+
+- > 　　明确谈话的目的。
+
+- > 　　在确认对方已经明白后，我们常常会急于了解对方的反应。
+
+- > 　　在人们无法满足我们的愿望时，我们是否尊重他们的感受和需要最能体现我们提出的是请求还是命令。
+
+- > 　　在刚开始运用非暴力沟通时，我们也许会发现，有时我们只是在运用非暴力沟通的表达形式，而忘记了它所服务的目的。
+
+- > 　　我们避免使用抽象的语言，而借助具体的描述，来提出请求。
+
+- > 　　如果我们清楚地表达我们无意强人所难，人们一般会相信，我们提出的是请求而非命令。非暴力沟通的目的不是为了改变他人来迎合我们。
+
+- > 　　法国作家西蒙娜·薇依（Simone Weil）写道：“倾听一个处于痛苦中的人，不仅十分罕见，而且非常困难。那简直是奇迹，那就是奇迹。有些人认为他们可以做到，实际上，绝大部分的人还不具备这种能力。”
+
+- > 　　如果一个人想要别人了解他的处境，听到的却是安慰和建议，那么，他就有可能觉得不太舒服。
+
+- > 　　非暴力沟通建议我们使用疑问句来给予他人反馈。
+
+- > 　　我把注意力放在了他现在需要什么，而不是自己做错了什么。
+
+- > 　　什么时候需要给别人反馈呢？首先，在对自己的理解没有把握时，我们需要对方的确认。
+
+- > 　　一般来说，如果一个人在说话时有明显的情绪，他一般会期待得到他人的反馈。
+
+- > 　　然而，在一些文化环境中，我们也许很难用语言给他人反馈。
+
+- > 　　在给他人反馈时，我们的语气十分重要。一个人在听别人谈自己的感受和需要时，将会留意其中是否暗含着批评或嘲讽。如果我们的语气很肯定，仿佛是在宣布他们的内心世界，那么，通常不会有好的反应。
+
+- > 　　有时，我们认为自己受到了指责，实际上，那些话是他人表达需要和请求的方式。
+
+- > 　　作家约瑟夫·坎伯（Joseph Campbell）说道：“为了幸福，必须把‘别人怎么看我’这个问题放在一边。”
+
+- > 　　如果人们常常怀疑我们的诚意，那么，我们就需要好好审视自己的动机。
+
+- > 　　在解决问题或询问他人的请求前，为他人的充分表达创造条件。如果过早地提及他人的请求，我们也许就无法传达我们的关心；甚至还会被看作是应付。
+
+- > 　　怎样判断对方的感受是否已经充分表达呢？首先，如果一个人觉得别人已经完全明白他的意思，他就会变得轻松。这时，我们也会感到放松。另一个更为明显的标志是，他停止了谈话。如果无法确定对方是否还有话要说，就不妨问一句：“你还有什么话要告诉我吗？”
+
+- > 　　联合国前秘书长汉马斯克德（Dag Hammarskjold）曾经说道：“你越是留意自己内心的声音，就越能够听到别人的声音。”
+
+- > 　　如果对方正处于激烈的情绪中，他也可能无法留意我们的感受和需要。这时，我们的另一种选择是，换一个环境。我们需要时间和空间来调整状态，等平静下来了，再回来。
+
+- > 　　我们越是倾听他人语言背后的感受和需要，就越不怕与他们坦诚地沟通。我们最不愿意示弱的时候往往是因为担心失去控制想显得强硬的时候。
+
+- > 　　你和我们说，在一个生气的人面前，永远不要用“不过”“可是”“但是”之类的词语。
+
+- > 　　有的时候，谈话的气氛很沉闷。我们体会不到说话的人有怎样的感受和需要，也不知道他对我们有什么期待。
+
+- > 　　如果听的人很烦，说的人一般也会觉得很无聊。
+
+- > 　　打断别人比假装在听，更符合对方的愿望。所有的人都希望自己的话对人有益，而不想被人当作负担。
+
+- > 　　羞愧是自我憎恨的一种形式，出于羞愧的行为不是自由而快乐的行为。
+
+- > 　　在我们的语言中，有一个词极易引起羞愧和内疚。我们经常使用它来打击自己。它在我们的意识中是如此根深蒂固，以致许多人无法想象，没有它生活将如何继续。这个词就是“应该”，也就是“我应该早点知道”或“我不应该做那件事情”中的“应该”。
+
+- > 　　如果我们专注于需要是否得到满足以及得到怎样的满足，我们就更有可能从自我评价中获益。
+
+- > 　　非暴力沟通鼓励我们直面人生的苦难：在遇到挫折时，充分体会人生的悲哀和内心的渴望。是的，感到遗憾是难免的。但它能帮助我们从经历中学习，而无须责备自己。
+
+- > 　　爱惜自己的关键之一是同时包容那两个不同的“我”：一方面包容对过去的某种行为感到后悔的“我”，另一方面包容采取那种行为的“我”。
+
+- > 　　**深入理解我们行为的动机**
+  >
+  > 　　一些行为是出于下列的一种或多种动机：
+  >
+  > 　　**1）为了钱**
+  >
+  > 　　**2）为了得到赞同**
+  >
+  > 　　**3）为了逃避惩罚**
+  >
+  > 　　**4）不想感到羞愧**
+  >
+  > 　　**5）为了避免内疚**
+  >
+  > 　　**6）为了履行职责**
+
+- > 　　当我们的表现不完美时，我们可以通过体会忧伤和自我宽恕，来看清个人成长的方向，以及避免自我惩罚。
+
+- > 　　如果在一个社会中，内疚被运用来控制人；那么，指责他人就容易成为一种习惯。
+
+- > 　　专注于我们的需要，比评判他人是什么人，更有益于生活。
+
+- > 　　我们需要有足够的耐心来学习和运用非暴力沟通。在与人交往的过程中，我们的第一反应常常是习惯性的反应，因此，运用非暴力沟通有时是很别扭的事。
+
+- > 　　需要注意的是，在非暴力沟通中，我们运用强制力是出于防卫的目的而不是为了惩罚对方。
+
+- > 　　有两个问题可以帮助我们认识惩罚的局限性。第一个问题是，如果我不喜欢他现在的行为，那我希望他怎么做？我希望他基于怎样的原因去做我想要他做的事情？
+
+- > 　　在生活中，有时我们会感到沮丧，觉得前途一片黑暗。欧内斯特·贝克（Ernest Becker）在他的《精神病学的革命》一书中提出，沮丧是因为一个人处于激烈的内心冲突之中，无所适从。
+
+- > 　　如果以苛刻的态度对人对己，我们的心情也好不到哪里去。
+
+- > 　　他们的对话回答了我长期以来对分离疗法（Clinical Detachment）的困惑。在我所接受的教育中，分离疗法被认为是心理分析疗法的金科玉律。
+
+- > 　　在非暴力沟通中，你感到不耐烦不是因为我做了什么，而是因为你期待我有不同的行为方式。
+
+- > 　　用非暴力沟通的方式表达感激时，我们只是为了庆祝他人的行为提升了我们的生活品质，而不是想得到任何回报。
+
+- > 　　非暴力沟通表达感激的方式包含三个部分：
+  >
+  > 　　**1.对方做了什么事情使我们的生活得到了改善；**
+  >
+  > 　　**2.我们有哪些需要得到了满足；**
+  >
+  > 　　**3.我们的心情怎么样？**
+
+- > 　　在听到别人表达对我们的感激时，我们也许会觉得别扭。我们不知道自己是否真的那么好。我们甚至会担心别人对我们有所期待——特别是老师或经理试图通过赞扬来提高我们的学习和工作效率。此外，我们还可能担心在将来失去别人的赏识。
+
+- > 　　以色列前总理哥达·梅厄（Golda Meir）曾经责备她的一位内阁部长：“不要那么谦虚，因为你没有那么伟大。”
+
+- > 　　我发现我总是想做得更好，却很少肯定已有的成绩。
+
+- > 　　在赞扬他人时，我们很少揭示内心活动，而把自己放在了裁判的位置。在表达感激时，我们说出：（1）对我们有益的行为；（2）我们的哪些需要得到了满足；（3）我们的需要得到满足后，我们是什么样的心情。
+
```
