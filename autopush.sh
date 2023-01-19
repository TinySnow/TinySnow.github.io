#!/bin/bash

# autopush.sh

# 此脚本用于简化 git 提交和自动更新 sitemap。
#
# 需要进行前置依赖安装： static-sitemap-cli。
# 如果 node 已经进行了此包的安装，则不需要再次进行安装。
# 安装命令：
# npm install static-sitemap-cli
#
# 如果需要解除 git diff 对于中文的编码，请确保 git 的配置：
# git config --global core.quotepath false

# bash 脚本安全性保障
set -Eeuo pipefail


# 警告： 存在 BUG：当标题中出现空格和 -(dash) 的时候，部分逻辑会失效

if [[ $1 ]]; then

	file="./src/last-updated.md"

	title="最近更新 | Last Updated"

	prenote_style="font-size: larger; font-weight: bold; color: red; text-align: center;"

	notice_content="NOTICE: This content is presented as \`git diff\`."


	# 生成 sitemap.xml 和 sitemap.txt 文件，借助 static-sitemap-cli
	# 安装 static-sitemap-cli 命令： npm i -g static-sitemap-cli
	npx sscli -b https://tinysnow.github.io -r ./book

	# 检查 book 文件夹下是否有这两个文件
	if [[ -a ./book/sitemap.xml && -a ./book/sitemap.txt ]]; then
		cp -f ./book/sitemap.xml ./src
		cp -f ./book/sitemap.txt ./src
	else
		echo "sitemap.xml 和 sitemap.txt 不存在，请检查 static-sitemap-cli 安装情况。"
		exit 1
	fi


	echo -e "# ${title}\n\n## Prenote\n\n<p style=\"${prenote_style}\">${notice_content}</p>\n" > ${file}

	git add .

	# 将所有更改追加到 `最近更新.md`
	git diff --cached >> ${file}

	# 该 sed 进行 diff 的换行格式化，否则挤在一起太难看了
	# 以 diff 开头，每个更改的文件之间，会空出三行
	# 以 @@ 开头，每个文件所更改的地方，相互之间会空出一行
	sed -i -e 's/^@@/\n@@/g' ${file}

	# 计数经过修改的文件数量，用于下面的循环
	count=`sed -n -e '/^diff/p' ${file} | wc -l`

	for (( i = 0; i < count; i++ )); do

		# 提取 diff 开头一行的文件名
		file_name=`sed -n -e '/^diff/p' $file | awk '{print $4}' | awk -F "/" '{print $NF}' | head -1`

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

	git add ${file}

	# 编译文章
	mdbook build

	# 提交 message 取第二个参数，需要打引号
	git commit -m "$1"

	# 推送至远程仓库
	git push origin master

	# echo "\"$1\""
else
	echo "请提供参数。"
	exit 1
fi