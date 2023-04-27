# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## generate-last-updated-md.sh

```diff

@@ -3,7 +3,7 @@
 # bash 脚本安全性保障
 set -Eeuxo pipefail
 
-###################################变量声明区 START################################
+################################## 变量声明区 START ###############################
 
 
 file="./src/last-updated.md"

@@ -14,7 +14,7 @@ prenote_style="font-size: larger; font-weight: bold; color: red; text-align: cen
 
 notice_content="NOTICE: This content is presented as \`git diff\`."
 
-##################################变量声明区 END###################################
+################################# 变量声明区 END ##################################
 
 echo -e "# ${title}\n\n## Prenote\n\n<p style=\"${prenote_style}\">${notice_content}</p>\n" > ${file}
 

@@ -29,7 +29,7 @@ git add ${file}
 sed -i -e 's/^@@/\n@@/g' ${file}
 
 # 计数经过修改的文件数量，用于下面的循环
-count=`sed -n -e '/^diff/p' ${file} | wc -l`
+count=$(sed -n -e '/^diff/p' ${file} | wc -l)
 
 for (( i = 0; i < count; i++ )); do
 

@@ -39,13 +39,13 @@ for (( i = 0; i < count; i++ )); do
 	#       不使用匹配后直接删除是因为下面还有 diff 提取行号的逻辑
 	#       此逻辑可能有 bug：即当文件名中出现 slash(/) 的时候此逻辑会失效
 	#       但是此概率几乎为零，因为 Windows 和 Linux 中都不允许出现半角 slash，MacOS 不知道，没测试
-	file_name=`sed -n -e '/^diff/p' $file | sed -n -e 's/diff.*\///p'| head -1`
+	file_name=$(sed -n -e '/^diff/p' $file | sed -n -e 's/diff.*\///p'| head -1)
 
 	# 提取 diff 开头一行的行号
-	diff_line_number=`sed -n -e '/^diff/=' $file | head -1`
+	diff_line_number=$(sed -n -e '/^diff/=' $file | head -1)
 
 	# 提取 +++ 开头一行的行号
-	triple_plus_line_number=`sed -n -e '/^+++/=' $file | head -1`
+	triple_plus_line_number=$(sed -n -e '/^+++/=' $file | head -1)
 
 	# 将 diff 和 +++ 中间的内容，替换为：
 	# ----------------------------------------

@@ -68,36 +68,35 @@ echo -e "\`\`\`" >> ${file}
 
 # 因为后续的 last-updated.md 会越拖越长，所以每次在 last-updated.md diff 完成的时候
 # 在本次的 last-updated.md 文件中删去上一次 last-updated.md 的更改
+# 原理是记录首行和尾行，中间用 sed 删除
 
 # 而且每次 sitemap.xml 每次推送都会更新时间，导致每次 sitemap.xml 都会在 lat-updated.md 里面
-# 实际上属于无效信息，所以此处也设置一部分逻辑将其删除
+# 实际上属于无效信息，所以此处也设置一部分逻辑将其删除，原理与上相同
 
 # 但是 sitemap.txt 只记录文章，如果文章没有新增，则 sitemap.txt 不会变，并且 sitemap.txt 不会占用多大空间，可以保留
 
-# 原理是记录首行和尾行，中间用 sed 删除
-
 # 记录 【## last-updated.md】 出现的行数
-last_updated_line_number=`sed -n -e '/^##\ last\-updated\.md/=' $file | head -1`
+last_updated_start=$(sed -n -e '/^##\ last\-updated\.md/=' ${file} | head -1)
 
-# 记录 【## sitmap.xml】 出现的行数
-sitemap_xml_line_number=`sed -n -e '/^##\ sitemap\.xml/=' $file | head -1`
+if [[ ${last_updated_start} ]]; then
+	
+	# 记录从 【## last-updated.md】 一行开始，第二个出现的 ```，也即整个代码块的结尾
+	last_updated_end=$(expr ${last_updated_start} + $(sed -n "${last_updated_start},\$p" ${file} | grep -n '^```$' | head -2 | tail -1 | cut -d ':' -f 1))
 
-# 记录 sitmap.xml 最后 【 </urlset>】 标志出现的行数
-sitemap_xml_urlset_line_number=`sed -n -e '/^\ <\/urlset>/=' $file | head -1`
+	# 删除 【## last-updated.md】 到 其代码块结尾
+	sed -i -e "${last_updated_start},${last_updated_end}d" ${file}
 
-# 加上偏移值，因为用 sed 直接删除最后 【 </urlset>】 标志出现的行数，最后会剩一个 ``` 代码块结尾符
-# 需要加上这一行，而这一行就在下面，故偏移值为 1
-sitemap_xml_last_line=`expr ${sitemap_xml_urlset_line_number} + 1`
+fi
 
-if [[ ${last_updated_line_number} &&  ${last_updated_line_number} -lt ${sitemap_xml_line_number} ]]; then
+# 记录 【## sitmap.xml】 出现的行数
+sitemap_xml_start=$(sed -n -e '/^##\ sitemap\.xml/=' ${file} | head -1)
 
-	# 删除 【## last-updated.md】 到 【 </urlset>】 下面那一行
-	sed -i -e "${last_updated_line_number},${sitemap_xml_last_line}d" $file
+if [[ ${sitemap_xml_start} ]]; then
 
-else
+	# 记录从 【## sitmap.xml】 一行开始，第二个出现的 ```，也即整个代码块的结尾
+	sitemap_xml_end=$(expr ${sitemap_xml_start} + $(sed -n "${sitemap_xml_start},\$p" ${file} | grep -n '^```$' | head -2 | tail -1 | cut -d ':' -f 1))
 
-	# 删除 【## sitmap.xml】 到 【 </urlset>】 下面那一行
-	sed -i -e "${sitemap_xml_line_number},${sitemap_xml_last_line}d" $file
-	# echo "TODO"
+	# 删除 【## sitmap.xml】 到 其代码块结尾
+	sed -i -e "${sitemap_xml_start},${sitemap_xml_end}d" ${file}
 
-fi
+fi
\ No newline at end of file
```
