# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## autopush.sh

```diff

@@ -16,11 +16,17 @@
 set -Eeuo pipefail
 
 
+# 警告： 存在 BUG：当标题中出现空格和 -(dash) 的时候，部分逻辑会失效
+
 if [[ $1 ]]; then
 
 	file="./src/last-updated.md"
 
-	notice_content="Warning: The content is presented as \`git diff\`."
+	title="最近更新 | Last Updated"
+
+	prenote_style="font-size: larger; font-weight: bold; color: red; text-align: center;"
+
+	notice_content="NOTICE: This content is presented as \`git diff\`."
 
 
 	# 生成 sitemap.xml 和 sitemap.txt 文件，借助 static-sitemap-cli

@@ -37,7 +43,7 @@ if [[ $1 ]]; then
 	fi
 
 
-	echo -e "# 最近更新 | Last Updated\n\n<p style=\"font-weight: bold; color: red; text-align: center;\">${notice_content}</p>\n" > ${file}
+	echo -e "# ${title}\n\n## Prenote\n\n<p style=\"${prenote_style}\">${notice_content}</p>\n" > ${file}
 
 	git add .
 

@@ -77,24 +83,24 @@ if [[ $1 ]]; then
 	done
 
 	# 第一个 diff 和 +++ 内容替换后，上面的 ``` 是多余的，所以要删除
-	sed -i -e '5,6d' ${file}
+	sed -i -e '7,8d' ${file}
 
 	# 最后需要加上最后一个 diff 代码块的结尾
 	echo -e "\`\`\`" >> ${file}
 
 	# 因为后续的 last-updated.md 会越拖越长，所以每次在 last-updated.md diff 完成的时候
 	# 在本次的 last-updated.md 文件中删去上一次 last-updated.md 的更改
-	# 原理是记录 last-updated.md 和 sitemap.xml 中间的行数，用 sed 删除
+	# 原理是记录 last-updated.md 和 sitemap.xml 文件最后一定会出现的 </urlset> 标志的中间的行数，用 sed 删除
 
 	# 记录 last-updated.md 出现的行数
 	last_updated_line_number=`sed -n -e '/^##\ last\-updated\.md/=' $file | head -1`
 
-	# 记录 sitmap.xml 出现的行数
-	sitemapxml_line_number=`sed -n -e '/^##\ sitemap\.xml/=' $file | head -1`
+	# 记录 sitmap.xml 最后 </urlset> 标志出现的行数
+	sitemapxml_line_number=`sed -n -e '/^\ <\/urlset>/=' $file | head -1`
 
-	# 减去偏移值，因为用 sed 直接删除上面之间的行，会连带 `## sitemap.xml` 这一行也删除掉
-	# 偏移值为 1，删到到前一行即可
-	offset=`expr ${sitemapxml_line_number} - 1`
+	# 加上偏移值，因为用 sed 直接删除上面之间的行，还剩一个 ``` 没有删掉
+	# 偏移值为 1，加上这一行即可
+	offset=`expr ${sitemapxml_line_number} + 1`
 
 	# sed 删除
 	sed -i -e "${last_updated_line_number},${offset}d" $file
```


## 观影记录.md

```diff

@@ -29,9 +29,8 @@
 25. 爱丽丝梦游仙境 - 镜中奇遇记
 26. 海上钢琴师
 27. 舞出我人生之舞所不能【烂片】
-- 舞出我人生（Step Up 1）
-- 舞出我人生 2：街舞（Step Up 2: The Streets）
-
+28. 舞出我人生（Step Up 1）
+29. 舞出我人生 2：街舞（Step Up 2: The Streets）
 ## 未完成
 
 1. 大话西游 1、2

@@ -49,4 +48,4 @@
 13. 这个杀手不太冷
 14. 星际拓荒
 15. 觉醒年代（电视剧）
-- 太空漫游 2001
\ No newline at end of file
+16. 太空漫游 2001
\ No newline at end of file
```
