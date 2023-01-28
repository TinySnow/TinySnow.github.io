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
set -Eeuxo pipefail

# 注意：
# 生成 last-updated.md 的逻辑已和此脚本分离
# 详细内容在 generate-last-updated-md.sh
# 此脚本将专注于自动推送的逻辑
# 另外
###################################################################
# 因为硬编码，generate-last-updated-md.sh 和 本脚本 必须位于同一目录下
###################################################################

if [[ $1 ]]; then

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

	git add .

	./generate-last-updated-md.sh

	git add ./src/last-updated.md

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