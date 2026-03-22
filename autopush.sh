#!/usr/bin/env bash

# ==============================================================================
# TinySnowBlog 本地发布入口脚本（仅负责 Git 提交与推送）
#
# 设计目标
# - 统一本地“提交流程”入口，减少手工命令遗漏。
# - 本地不再生成 last-updated / sitemap / rss，这三类产物已迁移到 GitHub
#   Actions 自动生成与校验，避免不同环境下的脚本行为漂移。
#
# 当前脚本职责（本地）
# 1. 暂存改动：git add .
# 2. 创建提交：git commit -m "<message>"
# 3. 推送到 GitHub origin 当前分支
# 4. 推送到 gitee 当前分支（备份）
#
# CI 职责（远程）
# - preflight：快速失败检查（敏感文件/临时文件/大文件等）
# - generate_metadata：生成 src/last-updated.md 与 rss.xml
# - build_site：构建 mdBook 并生成 sitemap
# - deploy：发布到 GitHub Pages
#
# ------------------------------------------------------------------------------
# 使用方法
#
# 基本用法
#   ./autopush.sh "你的提交说明"
#
# 示例
#   ./autopush.sh "docs: 更新计算机备忘录并修正文案"
#
# ------------------------------------------------------------------------------
# 运行前依赖（本地）
# - 必需：
#   - git（可用）
#   - 已配置并可访问两个远程：origin 与 gitee
#   - 如果需要解除 git diff 对于中文的编码，请确保 git 的配置：
#     git config --global core.quotepath false
# - 不必安装（由 CI 负责）：
#   - Python/invoke/feedgen/markdown
#   - mdbook
#   - static-sitemap-cli / Node.js
#
# ------------------------------------------------------------------------------
# 本地验证建议（推送前可选）
# 1) 查看将提交的文件
#   git status --short
#
# 2) 本地验证 last-updated 脚本（可选）
#   - 按暂存区生成：
#       ./generate-last-updated-md.sh --staged
#   - 按提交范围生成（模拟 CI）：
#       ./generate-last-updated-md.sh --range "HEAD^..HEAD"
#
# 3) 检查最近一次提交信息
#   git log -1 --stat
#
# ------------------------------------------------------------------------------
# 常见注意事项
# - 本脚本使用 git add .，会暂存所有当前目录下改动。
#   若你需要精确控制提交文件，请改用手动 git add <file>。
# - 提交失败若提示用户信息缺失，请先配置：
#   git config user.name "your-name"
#   git config user.email "your-email@example.com"
# - 推送后若站点未更新，请优先查看 GitHub Actions 运行日志，而不是本地脚本。
# ==============================================================================

set -Eeuo pipefail

if [[ $# -lt 1 ]]; then
  echo "请提供提交信息。用法: ./autopush.sh \"commit message\"" >&2
  exit 1
fi

commit_msg="$1"

git add .
git commit -m "${commit_msg}"
git push

current_branch="$(git rev-parse --abbrev-ref HEAD)"
git push gitee "${current_branch}"

echo "Done. last-updated / sitemap / rss are generated in GitHub Actions."
