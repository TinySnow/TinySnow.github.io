# Tech Knowledge

## Knowledge

### Missing Semester 笔记

#### 原视频链接

[哔哩哔哩 完整版](https://www.bilibili.com/video/BV1rU4y1h7Qr)

[哔哩哔哩 中译版 不完整](https://space.bilibili.com/1010983811)

[Youtube](https://www.youtube.com/c/MissingSemester)

[笔记](https://missing-semester-cn.github.io)

#### Shell

- `$_` 为上一命令最后参数
- `!!` 为上一命令
- 双引号展开，单引号维持原样
- 过程替换 `<(`，例子：`cat <(ls) <(ls ..)`
- `$@` 展开成所有参数
- `dev/null` 为 Unix 特殊设备，任何输出重定向到它都会被直接丢弃，故适合用来丢弃输出，只查看执行结果 `$?`
- `2>` 重定向 `2`，即重定向标准错误流

- `updatedb` 更新系统建立的索引
- `Ctrl+R` 倒序搜索命令

#### vim

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

#### 数据整理

- `less` 查看
- `sed` 基于行修改， `awk` 基于列修改
- `head` 查看头几行， `tail` 查看尾几行
- 正则表达式的捕获组
- regex101.com
- R 语言
- `gnuplot` 画图工具
- `feh` 图片查看工具

#### 命令行环境

- 信号机制
  - `man singal`
  - `SIGINT` = `Ctrl+C`
  - `SIGQUIT` = `Ctrl+\`
  - `SIGSTOP` = `Ctrl+Z` 挂起进程 etc.
  - 可以用于编写保存用户强制退出时的中间信息
- `SIGKILL` 不建议使用，因为可能留下孤儿进程

- 命令末尾加 `&` 意为后台运行
- `jobs` 命令，`bg` 命令
- `tmux`
  - `Ctrl+B C` 打开一个新 Window
  - `Ctrl+B P N` P（Previous）切回上一个 Window，N（Next）切向下一个 Window
  - `Ctrl+B Z` 缩放（Zoom）当前 Pane
- 命令别名（alias）不能带参数
- 符号链接可以转发，所以可以将 dotfile 列入版本控制之下
- `ssh` 及其 config 文件
- `rsync -avP` 推荐使用在复制多文件的情境下

#### 版本控制

- `git clone --shallow` 浅克隆，不包括完整的历史版本记录
- `git add -p <file>` 交互式设置和暂存修改（可以交互式舍弃部分不希望暂存的修改）
- `git blame` 查看文件的元数据，可以找出由谁在何时修改
- `git stash` 隐藏修改，`git stash pop` 显示修改
- `git bisect`  通过二分查找搜索历史记录

#### 调试及性能分析

- `printf` 调试法，大型系统则使用 `log` 分析
- 控制台输出着色
- `system log`
- `gdb` 及其增强版 `pwndbg`，`lldb`
- 系统调用追踪 `strace`
- 网络数据包分析 `tcpdump`
- 静态分析
- vim 插件 `ale` 或 `syntastic` 进行代码风格提示
- 实时时间（现实真实的时间），用户时间（也称 CPU 用户时间，CPU 执行用户代码所花的时间）和系统时间（也称 CPU 内核时间，CPU 执行内核代码所花费的时间）
- 追踪分析器（tracing）及采样分析器（sampling）
- 函数调用分析，行分析，内存分析，事件分析（不良缓存局部性，缺页错误，活锁）
- 可视化：火焰山，调用图和控制流图
- 资源监控
- 基准测试等专用工具

#### 元编程

- `make`
- 语义版本号
- lockfile
  - 避免不必要的重新编译
  - 创建可复现的软件版本
  - 禁止自动升级到最新版本
- 持续集成
- 测试

#### 安全和密码学

- 熵（Entropy）
- 散列函数（hash）
  - Git 中的内容寻址储存
  - 文件信息摘要
  - 承诺机制
- 对称加密
- 非对称加密
- 密钥分发
- 案例
  - 密码管理器
  - 两步验证
  - 全盘加密
    - Linux：Cryptsetup+LUKS
    - Windows：BitLocker
    - MacOS：FileVault
  - 聊天加密
  - SSH

#### 大杂烩

- 修改键位映射
  - 尤其是 Caps Lock
- 守护进程（systemd）
- FUSE（用户空间文件系统）
- 备份
  - 复制存储在同一个磁盘上的数据不是备份
  - 同步方案也不是备份
  - 有效备份方案的几个核心特性
    - 版本控制
    - 删除重复数据
    - 安全性
- API
  - IFTTT（If This Then That）
- 常见命令行标志参数及模式
- 窗口管理器
  - screen
  - tmux
- VPN
- Markdown
- Hammerspoon（macOS 桌面自动化）
- 开机引导以及 Live USB
  - Live USB 是包含了完整操作系统的闪存盘
    - 启动盘
    - 运行操作系统
    - 对硬盘上的相同操作系统进行修复
    - 恢复硬盘数据
  - 引导
- Docker，Vagrant（构建和配置虚拟开发环境的工具），VMs，Cloud，OpenStack
- 交互式笔记本编程
  - Jupyter：Julia，Python，R

#### 提问&回答

- 优先工具
  - 多键盘少鼠标
  - 学好编辑器
  - 自动化流程
  - 软件协同工作
- Python VS Bash
  - 大型或者复杂脚本用 Python
  - Bash 对简短的一次性脚本有效
- `source script.sh` 和 `./script.sh` 的区别
- 软件包和工具的位置
- `/bin` 和 `/lib`
- 性能分析
- 浏览器插件
  - uBlock Origin
  - Stylus
  - 全页屏幕捕捉
  - 多账户容器
  - 密码集成管理器
- 数据整理工具
  - jq 用于解析 JSON
  - pup 用于解析 HTML
  - Perl 语言
  - `column -t`
- Docker 和虚拟机的区别
- 不同的操作系统优缺点
  - 除了部分需求外，不建议使用 Windows
- Linux 发行版
  - 差别不大
- Vim VS Emacs
- 机器学习应用的提示或技巧
- Vim 小窍门
  - 插件
    - VimAwesome
    - dotfiles
  - 标记
    - `m<X>` 为 X 做标记
    - `'<X>` 回到标记位置
    - 导航
    - 撤销树
    - 时间撤销
    - 持续撤销
    - 热键
    - 高级文本对象
- 两步验证 2FA
- Web 浏览器评价

#### 推荐软件

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
- `writegood` 英语语法和单词静态分析器

### 杂项

#### riscv64 和 riscv64gc

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

#### 编译相关

- build：现在编译编译器的平台
- host：编译器跑的平台
- target：编译器编译出来的二进制跑的平台



#### Rust 和 Cargo 升级

```bash
rustup update
```

#### Mdbook 修改端口号

```bash
mdbook serve --open --port <port>
```

#### git clone 加速

```bash
git clone -c http.proxy="http://127.0.0.1:7890" <repo_https_address>
cd <repo>
git remote set-url origin <repo_git_address>
```

#### soname

- 指 .so name。

#### namcap

- pacman 的反写， 是 pkgbuild 以及 arch 包的检查工具

- 官方定义如下：

  > Namcap is a tool to check binary packages and source PKGBUILDs for 
  > common packaging mistakes, which can also be automatically enabled.

- 一般会出现在 archbuild 的最后： `No soname differences for <package>. `

- 可以视为是 soname capture 的扩展，但不止检查 soname，也会检查其他的，如对齐，relocation，PIC 之类

- 如果有 soname difference，所有依赖这个包的包就都需要重新 rebuild，否则在运行的时候就会出现 `找不到 xxx.so.y` 提示。于是需要一个机制来告诉 packager：有这种变动发生了，你需要去规划一下如何 rebuild。

#### C++ Notes

- If ‘const’ key word is ahead, then the content can’t be changed. If is between type and variable name, then the address in the ROM/RAM can be changed.

#### 必要的 Linux 知识

##### Commands

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

##### Explanation to the directories at root directory

- /bin
  - It's the short of Binary, and there exits some common commands.
- /boot
  - Here are some

##### 快捷键

- Ctrl + A : Move the flag to the head;
- Ctrl + E : Move the flag to the last;

##### Others

1. In Linux operating system, all the things are file;
2. `/` is the root node of file system.
