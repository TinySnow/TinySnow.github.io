#!/bin/bash

# bash 脚本安全性保障
set -Eeuxo pipefail

###################################变量声明区 START################################


file="./src/last-updated.md"

title="最近更新 | Last Updated"

prenote_style="font-size: larger; font-weight: bold; color: red; text-align: center;"

notice_content="NOTICE: This content is presented as \`git diff\`."

##################################变量声明区 END###################################

echo -e "# ${title}\n\n## Prenote\n\n<p style=\"${prenote_style}\">${notice_content}</p>\n" > ${file}

# 将所有更改追加到 `最近更新.md`
git diff --cached >> ${file}

git add ${file}

# 该 sed 进行 diff 的换行格式化，否则挤在一起太难看了
# 以 diff 开头，每个更改的文件之间，会空出三行
# 以 @@ 开头，每个文件所更改的地方，相互之间会空出一行
sed -i -e 's/^@@/\n@@/g' ${file}

# 计数经过修改的文件数量，用于下面的循环
count=`sed -n -e '/^diff/p' ${file} | wc -l`

for (( i = 0; i < count; i++ )); do

	# 提取 diff 开头一行的文件名
	# 原理：第一个 sed 找出那些以 diff 开头的行，第二个 sed 删去 diff 到最后一个 / 中间的字符，剩下的就是文件名
	# 注意：第二个 sed 没有 $file 参数，因为是用的管道左边第一个 sed 传下来的字符串
	#       不使用匹配后直接删除是因为下面还有 diff 提取行号的逻辑
	#       此逻辑可能有 bug：即当文件名中出现 slash(/) 的时候此逻辑会失效
	#       但是此概率几乎为零，因为 Windows 和 Linux 中都不允许出现半角 slash，MacOS 不知道，没测试
	file_name=`sed -n -e '/^diff/p' $file | sed -n -e 's/diff.*\///p'| head -1`

	# 提取 diff 开头一行的行号
	diff_line_number=`sed -n -e '/^diff/=' $file | head -1`

	# 提取 +++ 开头一行的行号
	triple_plus_line_number=`sed -n -e '/^+++/=' $file | head -1`

	# 将 diff 和 +++ 中间的内容，替换为：
	# ----------------------------------------
	# ```
	#
	# ## changed-filename
	#
	# ```diff
	# -----------------------------------------
	# 上面多一个 ``` 作为上一个 diff 代码块的结尾
	sed -i "${diff_line_number},${triple_plus_line_number}c \`\`\`\n\n##\ ${file_name}\n\n\`\`\`diff" ${file}

done

# 第一个 diff 和 +++ 内容替换后，上面的 ``` 是多余的，所以要删除
sed -i -e '7,8d' ${file}

# 最后需要加上最后一个 diff 代码块的结尾
echo -e "\`\`\`" >> ${file}

# 因为后续的 last-updated.md 会越拖越长，所以每次在 last-updated.md diff 完成的时候
# 在本次的 last-updated.md 文件中删去上一次 last-updated.md 的更改
# 原理是记录 last-updated.md 和 sitemap.xml 文件最后一定会出现的 </urlset> 标志的中间的行数，用 sed 删除

# 记录 last-updated.md 出现的行数
last_updated_line_number=`sed -n -e '/^##\ last\-updated\.md/=' $file | head -1`

# 记录 sitmap.xml 最后 </urlset> 标志出现的行数
sitemapxml_line_number=`sed -n -e '/^\ <\/urlset>/=' $file | head -1`

# 加上偏移值，因为用 sed 直接删除上面之间的行，还剩一个 ``` 没有删掉
# 偏移值为 1，加上这一行即可
offset=`expr ${sitemapxml_line_number} + 1`

# sed 删除
sed -i -e "${last_updated_line_number},${offset}d" $file