# Git仓库瘦身

## TL;DR

- 搞清楚 git 仓库为什么变大了，变大的地方在哪儿
- 如果是不小心跟踪了编译后的 binary，直接删除 git history 中的 binary 即可
- 本文方法是直接清除 gh-pages 分支的所有历史提交记录，比较极端，慎用

## 前提

- 博客仓库变大，主要是本地的 .git 文件夹变大
- 部署会到 gh-pages 分支，主要是该分支空间占用高

## 注意

- 因为部署只需要当前编译后产物，不需要 git 跟踪历史
- 所以 gh-pages 分支的所有历史提交记录都会被删除

## 方法

```bash
# 先切换到 gh-pages 分支
git checkout gh-pages
# 清理所有历史提交记录，建立 tmp 分支，当前分支保留为 gh-pages 分支的最新快照
git checkout --orphan tmp
# 提交当前的所有文件
git add -A
git commit -am "Clean Up"
# 删除原来分支
git branch -D gh-pages
# 重命名分支
git branch -m gh-pages
# 强行推送该分支，因为本地实际上是新建的分支，所以推上去后，remote 会把所有提交历史都删除
git push -f origin gh-pages
```

## 补充

- github 不会为每次 push 都触发 git gc
  - StackOverflow 上[有人说](https://stackoverflow.com/questions/56020314/how-frequently-do-github-run-git-gc-on-repositories)每天最多一次 git gc
  - 也[有人说](https://stackoverflow.com/questions/9135095/git-gc-aggressive-push-to-server)是定期运行 git gc
  - 这两个都是很久远的回答了（2012 年和 2013 年）
- github 官方并没有给出明确答复，所以指望 git gc 是不可靠的
- 要么重写 git 历史提交记录，要么直接删一些东西
- 如果是大文件可以参考其他利用 bfg 和 fliter-branch 的方法

## 成效

- 843MB -> 26.8MB（仅源代码，未编译）

## 后记

- 本文方法不是最终的方法
- 后面发现 github pages 的“通过 github actions 部署”已经成熟了，不用“通过分支部署”
- 最终方法是重写了一个 github actions，直接把 gh-pages 删除了
- 分支都没了，也就不存在占用空间大的问题了