#!/usr/bin/env bash

# autopush.sh

# 此脚本用于简化 git 提交和自动更新 sitemap。
#
# 需要进行前置依赖安装： static-sitemap-cli。
# 如果 node 已经进行了此包的安装，则不需要再次进行安装。
# 安装命令：
# npm install static-sitemap-cli

# bash 脚本安全性保障
set -Eeuo pipefail


if [[ $1 ]]; then

	# 更新 `最近更新.md`
	echo -e "# 最近更新 | Last Updated\n\n\
<p style='font-weight: bold; color: red; text-align: center;'>Warning: The content is presented as \`git diff\`.</p>\n\n\
\`\`\`bash" > ./src/last-updated.md

	# 进行 git 提交
	git add .

	# 将所有更改追加到 `最近更新.md`
	git diff --cached >> ./src/last-updated.md

	# 该 sed 进行 diff 的换行格式化，否则挤在一起太难看了
	# 以 diff 开头，每个更改的文件之间，会空出三行
	# 以 @@ 开头，每个文件所更改的地方，相互之间会空出一行
	sed -i -e 's/^@@/\n@@/g; 7,$s/^diff/\n\n\ndiff/;' ./src/last-updated.md

	# 最后加上 bash 的代码块结尾
	echo -e "\`\`\`" >> ./src/last-updated.md

	# 追加 add `最近更新.md`
	git add ./src/last-updated.md

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