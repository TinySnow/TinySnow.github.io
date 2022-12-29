#!/usr/bin/env bash

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


if [[ $1 ]]; then

	file="./src/last-updated.md"

	notice_content="Warning: The content is presented as \`git diff\`."

	echo -e "# 最近更新 | Last Updated\n\n<p style=\"font-weight: bold; color: red; text-align: center;\">${notice_content}</p>\n" > ${file}

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
	sed -i -e '5,6d' ${file}

	# 最后需要加上最后一个 diff 代码块的结尾
	echo -e "\`\`\`" >> ${file}

	git add ${file}

	# 编译文章
	mdbook build

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

	# 提交 message 取第二个参数，需要打引号
	git commit -m "$1"

	# 推送至远程仓库
	git push origin master

	# echo "\"$1\""
else
	echo "请提供参数。"
	exit 1
fi