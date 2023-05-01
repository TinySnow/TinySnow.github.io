# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## SUMMARY.md

```diff

@@ -5,6 +5,7 @@
 - [问题总表 | Problems](问题总表.md)
 -----
 - [每日一文 | Daily Article](每日一文/每日一文.md)
+  - [御旨 - 卡夫卡](每日一文/御旨%20-%20卡夫卡.md)
   - [忘却 - 亦舒](每日一文/忘却%20-%20亦舒.md)
   - [银行抢案 - 史蒂文 · 舒曼](每日一文/银行抢案%20-%20史蒂文%20·%20舒曼.md)
   - [白肉 - 梁实秋](每日一文/白肉%20-%20梁实秋.md)

@@ -108,6 +109,7 @@
 - [技术 | Technology](技术/技术.md)
   - [知识 | Knowledge](技术/Knowledge.md)
   - [报错处理 | Errors and Solutions](技术/Errors.md)
+  - [常用命令 | Commands](技术/Commands.md)
   - [ArchLinux RISC-V](技术/ArchRISC-V/ArchRISC-V.md)
     - [Packages](技术/ArchRISC-V/Packages/Packages.md)
       - [fluidd](技术/ArchRISC-V/Packages/fluidd.md)
```

## sitemap.txt

```diff

@@ -45,6 +45,7 @@ https://tinysnow.github.io/每日一文/展示品 - 于尔克 · 舒比格
 https://tinysnow.github.io/每日一文/幸福的生日 - 黑井千次
 https://tinysnow.github.io/每日一文/当三毛还是在二毛的时候 - 三毛
 https://tinysnow.github.io/每日一文/律师太太 - 希区柯克
+https://tinysnow.github.io/每日一文/忘却 - 亦舒
 https://tinysnow.github.io/每日一文/恶之平庸 - 刘瑜
 https://tinysnow.github.io/每日一文/我们为什么要过节 - 冯骥才
 https://tinysnow.github.io/每日一文/我们的老式婚姻 - 杨修峰
```

## Errors.md

```diff

@@ -76,10 +76,6 @@ Class.forName("com.mysql.cj.jdbc.Driver");
 
 - 注意：此处的 `origin` 是指当前所在的远程仓库，默认为此名字 。
 
-### 删除远程分支
-
-`git push origin --delete [remote_branch_name]`
-
 ## Maven
 
 ###  程序包不存在
```

## Knowledge.md

```diff

@@ -230,20 +230,6 @@
 - `xorg` 接受多输出，然后将其转化为命令行的参数
 - `writegood` 英语语法和单词静态分析器
 
-## Rust 相关
-
-### Rust 和 Cargo 升级
-
-```bash
-rustup update
-```
-
-### Mdbook 修改端口号
-
-```bash
-mdbook serve --open --port <port>
-```
-
 ## 编译相关
 
 ### riscv64 和 riscv64gc

@@ -286,67 +272,10 @@ riscv64gc=riscv64imacfdZicsrZifencei
 
 - 如果有 soname difference，所有依赖这个包的包就都需要重新 rebuild，否则在运行的时候就会出现 `找不到 xxx.so.y` 提示。于是需要一个机制来告诉 packager：有这种变动发生了，你需要去规划一下如何 rebuild。
 
-## Git 相关
-
-### git clone 加速
-
-```bash
-git clone -c http.proxy="http://127.0.0.1:7890" <repo_https_address>
-cd <repo>
-git remote set-url origin <repo_git_address>
-```
-
 ## C++ 相关
 
 - If ‘const’ key word is ahead, then the content can’t be changed. If is between type and variable name, then the address in the ROM/RAM can be changed.
 
-## Linux 相关
-
-### Commands
-
-```bash
-# sync           // Synchronize all the changes you made into your hard disk(硬盘).
-# shutdown       // Shutdown the sever.
-# shutdown –h 10      // Shutdown the server in 10 minutes.
-# shutdown –h now    // Shutdown the server right now.
-# shutdown –h 20:25   // Shutdown the server at 20:25.
-# shutdown –h +10    // Shutdown the server in 10 minutes.
-# shutdown –r now    // Reboot the system right now.
-# shutdown –r +10    // Reboot the system in 10 minutes.
-# reboot        // Reboot, equal to                                shutdown –r now
-# halt         // Shutdown the system, equal to             shutdown –h now || poweroff
-# ls /                   // List all the files at / directory.
-```
-
-- Attention:
-  1. If you run a command, the screen doesn't appear the output messages(e.g. error messages), that is the command running successfully, otherwise unsuccessfully, for instance, some warning messages, error messages.
-  2. If you wanna shutdown you server, please sync your date at first.
-
-### Explanation to the directories at root directory
-
-- /bin
-  - It's the short of Binary, and there exits some common commands.
-- /boot
-  - Here are some
-
-### Shotcuts
-
-- Ctrl + A : Move the flag to the head;
-- Ctrl + E : Move the flag to the last;
-
-### Others
-
-1. In Linux operating system, all the things are file;
-2. `/` is the root node of file system.
-
-### Ubuntu
-
-- 显示已安装的软件包
-
-```bash
-sudo apt list --installed
-```
-
 ## MySQL 相关
 
 ### MySQL 8.0 Windows `My.ini` 文件位置

@@ -370,7 +299,7 @@ binlog-format=ROW
 # 有关 replication，需要定义
 # 不能与从机的 slaveId 相同
 server_id=1
-
 ```
 
 3. 重启 MySQL
+
```

## Docker 命令.md

```diff

@@ -1,6 +0,0 @@
-# Docker 命令
-
-- 删除所有容器
-  - `sudo docker stop $(sudo docker ps -a -q) && sudo docker rm $(sudo docker ps -a -q)`
-- 安装 node
-  - `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`
```

## 御旨 - 卡夫卡.md

```diff

@@ -0,0 +1,13 @@
+# 御旨
+
+*卡夫卡*
+
+　　据说，皇上临驾崩前曾在御床上向你传下了一条御旨。而你不过是皇上的光辉在极其遥远的地方投下的一丝飘忽的影子，但皇上却恰恰只对你一个人——可怜的属臣传下了这条御旨。皇上命传旨人跪在榻前，贴着他的耳，悄声传下了御旨。由于皇上对这条御旨很重视，因而讲完以后，还让传旨者在他的耳边复述了一遍，并点点头表示领旨人没有弄错。
+
+　　临终前，群臣聚集，四周的护墙都拆除了，在高高的摇晃的拱形门前的台阶上，帝国的巨头们排成圆圈，当着群臣面，皇上遣出了这位传旨者。传旨者得令后随即就上路了。他十分强壮，精力充沛。他一会儿用左手一会儿用右手分开拥挤的人群，辟出一条道来。遇到阻拦，他就指一指胸脯上的太阳标记；他畅通无阻，一直前往，没有别人像他这样顺当。但人群聚集得太多了，他们的房屋简直望不到尽头。
+
+　　如果传旨人能来到空旷的田野的话，他马上就会像飞一样地行走起来，这样不一会儿，你大概就会听到传旨人的拳头打你房门时发出的巨响。
+
+　　但代替这情景的却是，他的努力完全无用；他得不断地一再地穿过内宫里的屋子；可是他一直没有成功；即使他穿过了这些内宫，也没有什么用；他还得费力下那些台阶；可是下台阶后，也是徒劳；他还得走过那些院子，但是，在走完第二个深宫四周的院落后，前面却又是台阶和院落；在它们后面又是一座宫殿，如此排列下去有好几千；假使他最终冲出最后一道宫门的话——这是从来没有过的事，从来没有发生过——于是，在他面前出现了一座都邑，它是世界的中心，那里堆积着很高的渣滓。
+
+　　这里还从来没有人能走得过去，更不用说一位带着死者的使命的人了——当夜色来临时，你却坐在窗前，梦想着得到这道御旨。
\ No newline at end of file
```
