# Git 笔记

## 学习笔记

1. Git 是分布式的版本控制系统

2. Git 是由 Linux 开发者不服 BitMover 公司回收使用权限，一个人在两周之内写出来的

3. **Git 无法追踪二进制文件的变化**

　　说明：可以利用 Git 进行版本管理，但是只能追踪到文件发生了变化，但是不知道哪里发生了变化。

　　原文：

> 　　首先这里再明确一下，所有的版本控制系统，其实只能跟踪文本文件的改动，比如 TXT 文件，网页，所有的程序代码等等，Git 也不例外。版本控制系统可以告诉你每次的改动，比如在第 5 行加了一个单词“Linux”，在第 8 行删了一个单词“Windows”。而图片、视频这些二进制文件，虽然也能由版本控制系统管理，但没法跟踪文件的变化，只能把二进制文件每次改动串起来，也就是只知道图片从 100KB 改成了 120KB，但到底改了啥，版本控制系统不知道，也没法知道。

> 　　不幸的是，Microsoft 的 Word 格式是二进制格式，因此，版本控制系统是没法跟踪 Word 文件的改动的，前面我们举的例子只是为了演示，如果要真正使用版本控制系统，就要以纯文本方式编写文件。


4. commit id（版本号）为一串乱码，原因是因为 Git 是分布式的，无法像 svn 一样使用递增有序数字作为版本号，否则容易冲突。因此 Git 选择了使用 SHA1 计算出来的一个非常大的数字，用十六进制表示

5. Git 中，HEAD 表示当前版本，HEAD^ 为上一个版本，HEAD^^ 则为上上个。如果回退版本过多，可以使用 HEAD~X，表示第前 X 个版本

6. `git add` 实际上就是把文件修改添加到暂存区

7. `git commit` 提交更改，实际上就是把暂存区的所有内容提交到当前分支

8. **暂存区(stage)是 Git 非常重要的概念**

9. Git 比其他版本控制系统设计得优秀是因为因为 Git 跟踪并管理的是修改，而非文件

10. 如果一个文件已经被提交到版本库，则不用担心误删，但只能恢复文件到最新版本，也即**会丢失最近一次提交后修改的内容**

11. 从来没被添加到版本库就被删除的文件是无法恢复的。

12. 搭一个自己的 Git 服务器，则上面的文件对其他人来说是不可读，也不可写的(看不见)。

13. Git 支持多种协议，包括`https`，但`ssh`协议速度最快。

14. 合并有几种模式：`Fast-forward`(快进模式)，普通模式

15. 关于合并模式

> 　　合并分支时，如果可能，Git 会用`Fast forward`模式。

　　但这种模式下，删除分支后，会丢掉分支信息。

　　如果要强制禁用`Fast forward`模式，Git 会在时生成一个新的 commit，这样，从分支历史上就可以看出分支信息。


16. 分支管理策略

> 　　master 分支应该是稳定的，仅用来发布新版本。开发都应在 dev 分支上，到某个时候，再把 dev 分支合并到 master 上，在 master 分支发布发行版。

　　每位开发者都应有自己的分支，开发过程中，往 dev 分支上合并。


17. 开发一个新 feature，最好新建一个分支

18. 从远程仓库克隆时，会将本地的 master 分支与远程的 master 分支对应起来，并且远程仓库默认名称是 origin

19. 多人协作的工作模式：

> 　　首先，可以试图用 `git push origin <branch-name>` 推送自己的修改；

　　如果推送失败，则因为远程分支比你的本地更新，需要先用 `git pull` 试图合并；

　　如果合并有冲突，则解决冲突，并在本地提交；

　　没有冲突或者解决掉冲突后，再用 `git push origin <branch-name>` 推送就能成功！

　　如果 `git pull` 提示 no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`

　　这就是多人协作的工作模式，一旦熟悉了，就非常简单。


20. rebase 操作可以把本地未 push 的分叉提交历史整理成直线

21. rebase 的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比

22. **标签不按时间列出，按字母顺序列出**

23. 标签总是和某个 commit 挂钩。如果这个 commit 既出现在 master 分支，又出现在 dev 分支，那么在这两个分支上都可以看到这个标签





## 命令

1. `git status` 查看仓库当前的状态
2. `git diff` (git difference), 查看两文件不同之处，显示格式为 Unix 通用的 diff 格式
3. `git log` 显示从最近到最远的提交日志，可选参数 `-pretty=oneline` 用于简化 log 信息。该命令查看提交历史，以便确定要回退到哪个版本。
4. `git reset --hard HEAD^` 回退到上个版本
5. 上述命令也可以写成 `git reset --hard ` + `commit_id`，一般用在回退未来版本比较多
6. `git reflog` 用来查看命令历史，以便确定要回到未来的哪个版本
7. `git checkout --<file>`可以丢弃工作区的修改，即让该文件回到最近一次 `git commit` 或 `git add` 时的状态。
8. `git reset` 既可以回退版本，也可以把暂存区的修改回退到工作区
9. `git reset HEAD <file>` 可以把暂存区的的 file 文件的修改撤销掉（unstage），重新放回工作区
10. `git rm` 用于删除一个文件
11. `git remote add origin <remote repository>` 添加远程仓库
12. `git push <remote repository name> <remote branch name>`将代码推送到远程仓库对应分支上。`-u` 参数还会把本地分支与对应的远程分支关联起来
13. `git remote -v`查看远程库信息
14. `git remote rm <branch name>`删除远程分支
15. `git clone <remote repository url>`克隆远程库
16. `git branch <branch name>`创建分支
17. `git checkout <branch name>`或者`git switch <branch name>`切换分支。`-b`参数表示创建并切换该分支，`-d`参数表示删除该分支
18. `git branch`查看所有分支，当前分支会标注`*`号
19. `git merge <branch name>`合并指定分支到当前分支
20. `git log --graph`查看分支合并图
21. `git merge --no-ff -m "merge with no-ff" <branch name>`附加参数`--no-ff`表示禁用`Fast forward`，`-m`其后的引号内容表示合并时的 commit 描述
22. `git stash`将当前工作现场储藏起来，以便修复 bug 或者满足其他需求
23. `git stash list`查看隐藏起来的工作文件
24. `git stash apply`恢复工作文件，但 stash 内容不删除，若要删除请用`git stash drop`，也可以使用`git stash pop`同时完成上述两种操作
25. `git cherry-pick <commit id>`用于将另一分支上修复的 bug 合并到当前分支，方式是复制以前某次特定的提交(修复 bug 的提交)
26. 丢弃一个没有被合并过的分支，通过`git branch -D <branch name>`强行删除
27. 在本地创建和远程分支对应的分支，使用`git checkout -b <branch-name> origin/<branch-name>`，本地和远程分支的名称最好一致
28. 建立本地分支和远程分支的关联，使用`git branch --set-upstream <branch-name> origin/<branch-name>`
29. `git tag <tag name> <commit id>`将特定的 commit id 打上名为 tag name 的标签，缺省 commit id 则使用最新 commit，若 tag name 和 commit id 都缺省，则是查看所有标签
30. `git tag -a v0.1 -m "Version 0.1 released" 1a2b3c`创建带有说明的标签，参数`-a`指定标签名，`-m`指定说明文字
31. `git show <tag name>`看到说明文字
32. `git push origin <tag name>`推送一个本地标签
33. `git push origin --tags`推送全部未推送过的本地标签
34. `git tag -d <tag name>`删除一个本地标签
35. `git push origin :refs/tags/<tagname>`删除一个远程标签


## 常见错误

1. `fatal: not a git repository (or any of the parent directories)`

　　解决方案：Git 命令必须在 Git 仓库目录内执行（git init 除外），在仓库目录外执行是没有意义的。


2. `fatal: pathspec 'readme.txt' did not match any files`

　　解决方案：添加某个文件时，该文件必须在当前目录下存在，用 ls 或者 dir 命令查看当前目录的文件，看看文件是否存在，或者是否写错了文件名。

