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

if [[ $1 == '-h' || $1 == '--help' ]]; then
	echo "用法："
	echo -e "\t-h                        \t查看脚本用法。\
			\n\t--help"
	echo -e "\t-e        <commit_message>\t执行脚本。commit_message 是必选项，且需要带双引号，\
			\n\t--execute <commit_message>\t用于绑定 git 的提交消息，无此项会引发错误。"	
	echo "注意："
	echo -e "\t此脚本必须在 Blog 根目录下执行，未进行路径判断。\
			\n\t-h 和 -e 命令不能同时出现。\
			\n\t无其他用法。"	
	exit 0
elif [[ $1 == '-e' || $1 == '--execute' ]]; then
	# 编译文章
	mdbook build
	# 生成 sitemap.xml 和 sitemap.txt 文件，借助 static-sitemap-cli
	# 安装 static-sitemap-cli 命令：npm i -g static-sitemap-cli
	npx sscli -b https://tinysnow.github.io -r ./book
	# 检查 book 文件夹下是否有这两个文件
	if [[ -a ./book/sitemap.xml && -a ./book/sitemap.txt ]]; then
		cp -f ./book/sitemap.xml ./src
		cp -f ./book/sitemap.txt ./src
	else
		echo "sitemap.xml 和 sitemap.txt 不存在，请检查你的 static-sitemap-cli 安装情况。"
		exit 1
	fi
	if [[ $2 ]]; then
		# 进行 git 提交
		git add .
		# 提交 message 取第二个参数，需要打引号
		git commit -m "$2"
		# 推送至远程仓库
		git push origin master
		# echo "\"$2\""
	else
		echo "请提供 -e 选项的后续参数。"
		exit 1
	fi
else
	echo "未知参数。"
	echo "请使用 ./autopush.sh -h 或 ./autopush.sh --help 查看用法"
fi