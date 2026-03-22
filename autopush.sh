#!/usr/bin/env bash

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
