# Tech Knowledge

## riscv64 和 riscv64gc

riscv64gc=riscv64imacfdZicsrZifencei

- i是base int inst，integer
- m是乘除拓展
- a是原子操作拓展，atomic
- c是压缩指令，compress
- f是单精度硬浮点，float
- d是双精度硬浮点，double
- Zicsr是CSR寄存器及其操作
- Zifencei是 inst-fetch fence
- 最后这俩2.2的时候是i的一部分
- 上面的去掉c简称g，general

## 编译相关

- build：现在编译编译器的平台
- host：编译器跑的平台
- target：编译器编译出来的二进制跑的平台



## Rust 和 Cargo 升级

```bash
rustup update
```

## Mdbook 修改端口号

```bash
mdbook serve --open --port <port>
```

## git clone 加速

```bash
git clone -c http.proxy="http://127.0.0.1:7890" <repo_https_address>
cd <repo>
git remote set-url origin <repo_git_address>
```

## soname

- 指 .so name。

## namcap

- pacman 的反写， 是 pkgbuild 以及 arch 包的检查工具

- 官方定义如下：

  > Namcap is a tool to check binary packages and source PKGBUILDs for 
  > common packaging mistakes, which can also be automatically enabled.

- 一般会出现在 archbuild 的最后： `No soname differences for <package>. `

- 可以视为是 soname capture 的扩展，但不止检查 soname，也会检查其他的，如对齐，relocation，PIC 之类

- 如果有 soname difference，所有依赖这个包的包就都需要重新 rebuild，否则在运行的时候就会出现 `找不到 xxx.so.y` 提示。于是需要一个机制来告诉 packager：有这种变动发生了，你需要去规划一下如何 rebuild。



## Missing Semester 笔记

### 原视频链接

[哔哩哔哩 完整版](https://www.bilibili.com/video/BV1rU4y1h7Qr)

[哔哩哔哩 中译版 不完整](https://space.bilibili.com/1010983811)

[Youtube](https://www.youtube.com/c/MissingSemester)

### Shell

- `$_` 为上一命令最后参数
- `!!` 为上一命令
- 双引号展开，单引号维持原样
- 过程替换 `<(`，例子：`cat <(ls) <(ls ..)`
- `$@` 展开成所有参数
- `dev/null` 为 Unix 特殊设备，任何输出重定向到它都会被直接丢弃，故适合用来丢弃输出，只查看执行结果 `$?`
- `2>` 重定向 `2`，即重定向标准错误流

- `updatedb` 更新系统建立的索引
- `Ctrl+R` 倒序搜索命令

### vim

- `:sp` 打开新 window
- `:qa` 退出所有 window
- `Ctrl+U` 上翻页，`Ctrl+D` 下翻页
- `H, M, L` 移动到当前页的 上部，中部，下部
- `fo, Fw, te, Tn` 移动到光标后第一个 o，光标前第一个 w，光标后第一个 e 前一个字符，光标前第一个 n 前一个后一个字符
- `c` change，自动进入 insert 模式，少按一个键
- `Ctrl+R`，Redo
- V，进入 Visual Line 模式
- `Ctrl+V`，进入 Visual Block 模式
- `ci[`, change inside [
- `da(`, delete around (
- `%` 在括号键来回跳
- `.` 会重复之前的编辑命令
- `.vimrc` 配置文件

### 数据整理

- `less` 查看
- `sed` 基于行修改， `awk` 基于列修改
- `head` 查看头几行， `tail` 查看尾几行
- 正则表达式的捕获组
- regex101.com
- R 语言
- `gnuplot` 画图工具
- `feh` 图片查看工具

### 推荐软件

- `convert`：格式转换
- `shellcheck`：调试 bash
- `tldr`：给出命令的用法例子，而不是像 man 一样给出详细说明
- `fd`：find 的高阶版，默认使用正则表达式，支持彩色代码和 Unicode
- `ripgrep`：grep 的高阶版，默认使用正则表达式，支持彩色代码和 Unicode，简写为 rp
-  `fzf`：搜索历史命令的高阶版，交互式，可以开启默认绑定到 `Ctrl+R`
- `fish`：历史记录子串查找
- `tree` 或 `broot` 或 `nnn`?：树状打印目录和文件

- `vim golf` —— 一个游戏，以最少按键次数完成任务
- `wc`，word count，文本计数
- `sort`，排序
- `uniq`，去重
- `paste`，粘贴
- `bc`，berkeley calculator，简易命令行计算器
- `xorg` 接受多输出，然后将其转化为命令行的参数

## C++ Notes

- If ‘const’ key word is ahead, then the content can’t be changed. If is between type and variable name, then the address in the ROM/RAM can be changed.

## 必要的 Linux 知识

### Commands

```bash
# sync           // Synchronize all the changes you made into your hard disk(硬盘).
# shutdown       // Shutdown the sever.
# shutdown –h 10      // Shutdown the server in 10 minutes.
# shutdown –h now    // Shutdown the server right now.
# shutdown –h 20:25   // Shutdown the server at 20:25.
# shutdown –h +10    // Shutdown the server in 10 minutes.
# shutdown –r now    // Reboot the system right now.
# shutdown –r +10    // Reboot the system in 10 minutes.
# reboot        // Reboot, equal to                                shutdown –r now
# halt         // Shutdown the system, equal to             shutdown –h now || poweroff
# ls /                   // List all the files at / directory.
```

- Attention:
  1. If you run a command, the screen doesn't appear the output messages(e.g. error messages), that is the command running successfully, otherwise unsuccessfully, for instance, some warning messages, error messages.
  2. If you wanna shutdown you server, please sync your date at first.

### Explanation to the directories at root directory

- /bin
  - It's the short of Binary, and there exits some common commands.
- /boot
  - Here are some

### 快捷键

- Ctrl + A : Move the flag to the head;
- Ctrl + E : Move the flag to the last;

### Others

1. In Linux operating system, all the things are file;
2. `/` is the root node of file system.



# ErrorRelated

## 连接 Github 出问题

端口被拒，仔细查看 ssh 连接过程，发现 DNS 解析错误

```bash
ssh -vT git@github.com
```

在 HOST 里面加上 github 就好了

## 缺少 javaee 依赖

问题描述：

```shell
Cannot resolve symbol 'annotation' / Add Java EE 6 Jars to Module Dependencies
```

解决方案：在 `pom.xml` 中添加 javax 的 javaee-api 即可

## 没有合适的驱动

问题描述：

```shell
No suitable driver found for jdbc:mysql://localhost:3306/train?autoReconnect=true&useUnicode=true&characterEncoding=utf8&useSSL=true&serverTimezone=UTC
```

没有合适的驱动。

解决方案：

- 在自己的取得连接的方法中 (`getConnection`) 加上以下代码：

```java
Class.forName("com.mysql.cj.jdbc.Driver");
```

- 或者给自己的工程添加依赖 `Project Structure->Libraries->添加解析 jar 包`

## 前端调用后端接口 404

解决方案：

降低 tomcat 版本，从 10 降到 7。

## Git

### 无法添加文件

- 报错描述：

> error: '<filename>' does not have a commit checked out fatal: adding files failed when inputting "git add ." in command prompt

- 解决方案：

删去子文件夹中的 `.git` 仓库。

- 原因：

> If you have a subdirectory with a `.git` directory and try to `git add .` you will see this message.
>
> This can happen if you have a git repo and then create/clone another repo in a subdirectory under that repo.

- 参考链接：

> [https://stackoverflow.com/questions/56873278/how-to-fix-error-filename-does-not-have-a-commit-checked-out-fatal-adding](https://stackoverflow.com/questions/56873278/how-to-fix-error-filename-does-not-have-a-commit-checked-out-fatal-adding)

### 无法远程提交文件

- 报错描述：

> Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.

- 解决方案：

  在 `IntelliJ` 系列 `IDE` 中进行代码提交时，使用 `Github` 生成的 `Personal Access Token` 作为密码提交。`Github` 从 2021 年 8 月 13 日开始不再支持密码验证。

- 参考链接：

> [https://github.blog/changelog/2021-08-12-git-password-authentication-is-shutting-down/](https://github.blog/changelog/2021-08-12-git-password-authentication-is-shutting-down/)

### 本地分支远程分支关联错误

- 解决方案：

`git branch --set-upstream-to=origin/<correct_remote_branch_name> ` 建立正确的关联。

> 注意：此处的 `origin` 是指当前所在的远程仓库，默认为此名字 。

- 例证：

![建立关联](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/Others/建立关联.435h7rpl00zk.webp?raw=true)

### 删除远程分支

- 解决方案：

`git push origin --delete [remote_branch_name]`

- 例证：

![删除远程分支](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/Others/删除远程分支.76p1c9bcmuww.webp?raw=true)