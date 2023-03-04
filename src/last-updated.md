# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## SUMMARY.md

```diff

@@ -4,6 +4,7 @@
 - [最近更新 | Last Updated](last-updated.md)
 - [问题总表 | Problems](问题总表.md)
 - [每日一文 | Daily Article](每日一文/每日一文.md)
+  - [花未眠 - 川端康成](每日一文/花未眠%20-%20川端康成.md)
   - [还记得十六岁时的梦想吗 - 艾明雅](每日一文/还记得十六岁时的梦想吗%20-%20艾明雅.md)
   - [夜空中的木拐 - 从维熙](每日一文/夜空中的木拐%20-%20从维熙.md)
   - [大坝垮的那天 - 詹姆斯 · 瑟伯](每日一文/大坝垮的那天%20-%20詹姆斯%20·%20瑟伯.md)

@@ -82,6 +83,8 @@
       - [MyBatis 配置文件基本框架](技术/Java/文件模板/MyBatis%20配置文件基本框架.md)
       - [Spring 配置文件基本框架](技术/Java/文件模板/Spring%20配置文件基本框架.md)
       - [SpringBoot 项目搭建基本流程](技术/Java/文件模板/SpringBoot%20项目搭建基本流程.md)
+  - [实践记录 | Practice Record](技术/实践记录/实践记录.md)
+    - [MySQL 与 Elastic Search 的数据同步尝试](技术/实践记录/MySQL与ElasticSearch的数据同步尝试.md)
   - [其他资料 | Other Docs](技术/其他资料/其他资料.md)
     - [Git 学习笔记](技术/其他资料/Git%20学习笔记.md)
     - [Bash 代表命令](技术/其他资料/Bash%20代表命令.md)

@@ -153,6 +156,7 @@
     - [分享想法](学习/零碎知识整理/分享想法.md)
 - [断章 | Articles](断章/断章.md)
   - [文章 | Literature](断章/文章/文章.md)
+    - [内侧衣兜](断章/文章/内侧衣兜.md)
     - [母亲的理发推](断章/文章/母亲的理发推.md)
     - [小孩子的勇气](断章/文章/小孩子的勇气.md)
     - [在一起，本身就是一种幸福](断章/文章/在一起，本身就是一种幸福.md)
```

## sitemap.txt

```diff

@@ -18,6 +18,7 @@ https://tinysnow.github.io/每日一文/从痴迷到依恋 - 周国平
 https://tinysnow.github.io/每日一文/写在五线谱上的信 - 王小波
 https://tinysnow.github.io/每日一文/双鱼 - 三毛
 https://tinysnow.github.io/每日一文/吃饭是一件需要认真对待的事 - 梁文道
+https://tinysnow.github.io/每日一文/夜空中的木拐 - 从维熙
 https://tinysnow.github.io/每日一文/大坝垮的那天 - 詹姆斯 · 瑟伯
 https://tinysnow.github.io/每日一文/女人的星球 - 高铭
 https://tinysnow.github.io/每日一文/女朋友 - 亦舒

@@ -48,6 +49,7 @@ https://tinysnow.github.io/每日一文/等我一年半 - 松本清张
 https://tinysnow.github.io/每日一文/老来多健忘 - 叶倾城
 https://tinysnow.github.io/每日一文/致陈独秀 - 胡适
 https://tinysnow.github.io/每日一文/花脸雀 - 李娟
+https://tinysnow.github.io/每日一文/还记得十六岁时的梦想吗 - 艾明雅
 https://tinysnow.github.io/每日一文/那些你所不知道的大事 - 李月亮
 https://tinysnow.github.io/每日一文/雨伞 - 川端康成
 https://tinysnow.github.io/每日一文/青春 - 亦舒
```


## Knowledge.md

```diff

@@ -1,10 +1,8 @@
 # Tech Knowledge
 
-## Knowledge
+## Missing Semester 笔记
 
-### Missing Semester 笔记
-
-#### 原视频链接
+### 原视频链接
 
 [哔哩哔哩 完整版](https://www.bilibili.com/video/BV1rU4y1h7Qr)
 

@@ -14,7 +12,7 @@
 
 [笔记](https://missing-semester-cn.github.io)
 
-#### Shell
+### Shell
 
 - `$_` 为上一命令最后参数
 - `!!` 为上一命令

@@ -27,7 +25,7 @@
 - `updatedb` 更新系统建立的索引
 - `Ctrl+R` 倒序搜索命令
 
-#### vim
+### vim
 
 - `:sp` 打开新 window
 - `:qa` 退出所有 window

@@ -44,7 +42,7 @@
 - `.` 会重复之前的编辑命令
 - `.vimrc` 配置文件
 
-#### 数据整理
+### 数据整理
 
 - `less` 查看
 - `sed` 基于行修改， `awk` 基于列修改

@@ -55,7 +53,7 @@
 - `gnuplot` 画图工具
 - `feh` 图片查看工具
 
-#### 命令行环境
+### 命令行环境
 
 - 信号机制
   - `man singal`

@@ -76,7 +74,7 @@
 - `ssh` 及其 config 文件
 - `rsync -avP` 推荐使用在复制多文件的情境下
 
-#### 版本控制
+### 版本控制
 
 - `git clone --shallow` 浅克隆，不包括完整的历史版本记录
 - `git add -p <file>` 交互式设置和暂存修改（可以交互式舍弃部分不希望暂存的修改）

@@ -84,7 +82,7 @@
 - `git stash` 隐藏修改，`git stash pop` 显示修改
 - `git bisect`  通过二分查找搜索历史记录
 
-#### 调试及性能分析
+### 调试及性能分析
 
 - `printf` 调试法，大型系统则使用 `log` 分析
 - 控制台输出着色

@@ -101,7 +99,7 @@
 - 资源监控
 - 基准测试等专用工具
 
-#### 元编程
+### 元编程
 
 - `make`
 - 语义版本号

@@ -112,7 +110,7 @@
 - 持续集成
 - 测试
 
-#### 安全和密码学
+### 安全和密码学
 
 - 熵（Entropy）
 - 散列函数（hash）

@@ -132,7 +130,7 @@
   - 聊天加密
   - SSH
 
-#### 大杂烩
+### 大杂烩
 
 - 修改键位映射
   - 尤其是 Caps Lock

@@ -165,7 +163,7 @@
 - 交互式笔记本编程
   - Jupyter：Julia，Python，R
 
-#### 提问&回答
+### 提问&回答
 
 - 优先工具
   - 多键盘少鼠标

@@ -213,7 +211,7 @@
 - 两步验证 2FA
 - Web 浏览器评价
 
-#### 推荐软件
+### 推荐软件
 
 - `convert`：格式转换
 - `shellcheck`：调试 bash

@@ -232,9 +230,23 @@
 - `xorg` 接受多输出，然后将其转化为命令行的参数
 - `writegood` 英语语法和单词静态分析器
 
-### 杂项
+## Rust 相关
 
-#### riscv64 和 riscv64gc
+### Rust 和 Cargo 升级
+
+```bash
+rustup update
+```
+
+### Mdbook 修改端口号
+
+```bash
+mdbook serve --open --port <port>
+```
+
+## 编译相关
+
+### riscv64 和 riscv64gc
 
 riscv64gc=riscv64imacfdZicsrZifencei
 

@@ -249,39 +261,17 @@ riscv64gc=riscv64imacfdZicsrZifencei
 - 最后这俩2.2的时候是i的一部分
 - 上面的去掉c简称g，general
 
-#### 编译相关
+### 格式说明
 
 - build：现在编译编译器的平台
 - host：编译器跑的平台
 - target：编译器编译出来的二进制跑的平台
 
-
-
-#### Rust 和 Cargo 升级
-
-```bash
-rustup update
-```
-
-#### Mdbook 修改端口号
-
-```bash
-mdbook serve --open --port <port>
-```
-
-#### git clone 加速
-
-```bash
-git clone -c http.proxy="http://127.0.0.1:7890" <repo_https_address>
-cd <repo>
-git remote set-url origin <repo_git_address>
-```
-
-#### soname
+### soname
 
 - 指 .so name。
 
-#### namcap
+### namcap
 
 - pacman 的反写， 是 pkgbuild 以及 arch 包的检查工具
 

@@ -296,13 +286,23 @@ git remote set-url origin <repo_git_address>
 
 - 如果有 soname difference，所有依赖这个包的包就都需要重新 rebuild，否则在运行的时候就会出现 `找不到 xxx.so.y` 提示。于是需要一个机制来告诉 packager：有这种变动发生了，你需要去规划一下如何 rebuild。
 
-#### C++ Notes
+## Git 相关
+
+### git clone 加速
+
+```bash
+git clone -c http.proxy="http://127.0.0.1:7890" <repo_https_address>
+cd <repo>
+git remote set-url origin <repo_git_address>
+```
+
+## C++ 相关
 
 - If ‘const’ key word is ahead, then the content can’t be changed. If is between type and variable name, then the address in the ROM/RAM can be changed.
 
-#### 必要的 Linux 知识
+## Linux 相关
 
-##### Commands
+### Commands
 
 ```bash
 # sync           // Synchronize all the changes you made into your hard disk(硬盘).

@@ -322,19 +322,47 @@ git remote set-url origin <repo_git_address>
   1. If you run a command, the screen doesn't appear the output messages(e.g. error messages), that is the command running successfully, otherwise unsuccessfully, for instance, some warning messages, error messages.
   2. If you wanna shutdown you server, please sync your date at first.
 
-##### Explanation to the directories at root directory
+### Explanation to the directories at root directory
 
 - /bin
   - It's the short of Binary, and there exits some common commands.
 - /boot
   - Here are some
 
-##### 快捷键
+### Shotcuts
 
 - Ctrl + A : Move the flag to the head;
 - Ctrl + E : Move the flag to the last;
 
-##### Others
+### Others
 
 1. In Linux operating system, all the things are file;
 2. `/` is the root node of file system.
+
+## MySQL 相关
+
+### MySQL 8.0 Windows `My.ini` 文件位置
+
+- 打开命令行，输入 `echo %PROGRAMDATA%`
+- MySQL 会首先查找 `%PROGRAMDATA%\MySQL\MySQL Server 5.6\my.ini` 文件
+- 一般 `%PROGRAMDATA%` 为 `C:\ProgramData`，而此文件夹是隐藏的，需要打开查看隐藏文件选项
+- 编辑即可
+
+### 开启 binlog
+
+1. 找到 `my.ini` 文件
+2. 添加如下配置
+
+```bash
+# binlog 名称，随便取名
+log-bin="MYSQL-bin"
+# binlog 格式，可选 STATEMENT，ROW 或者 MIXED
+# 对于 canal 只能选择 ROW
+binlog-format=ROW
+# 有关 replication，需要定义
+# 不能与从机的 slaveId 相同
+server_id=1
+
+```
+
+3. 重启 MySQL
\ No newline at end of file
```

## MySQL与ElasticSearch的数据同步尝试.md

```diff

@@ -0,0 +1,34 @@
+# MySQL 与 Elastic Search 的数据同步尝试
+
+## 起因
+
+1. 毕业设计想要集成一个搜索引擎
+2. MySQL 语句为正向搜索，效率低，不精准
+3. 考虑技术选型，决定使用 Elastic Search 倒排搜索
+4. 然后出现问题：Elastic Search 和 MySQL 之间的数据同步
+5. MySQL 为上游源（生产者），Elastic Search 为下游（消费者）
+6. 考虑两种方案：全量同步和增量同步
+7. 决定使用增量同步
+8. 增量同步目前流行方案为 Canal
+
+## 原理
+
+- Canal 伪装成 MySQL slave 从机，订阅 master MySQL 的 binlog，然后重放到 Elastic Search 数据库中
+
+## 步骤
+
+1. 开启 MySQL binlog，此处使用 MySQL 8.0 (Windows)
+
+   - 找到 `my.ini`
+   
+   - 添加内容
+   
+  ```ini
+     
+     ```
+   
+   - 后续会迁移到 Docker 上
+
+
+
+## 注意事项
\ No newline at end of file
```

## 内侧衣兜.md

```diff

@@ -0,0 +1,47 @@
+# 克莱因蓝
+
+## 封面图
+
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/articles/literature/nathan-dumlao-khIRaIkp1w4-unsplash.jpg)
+
+> 摄影师 | Nathan Dumlao
+>
+> 图源 | Unsplash
+
+## 写在前面
+
+<p style="color:red; text-align:center; font-weight:bold; font-size:larger;">617 字 | 幼年记忆 | 设计感</p>
+
+## 正文
+
+　　对我来说，内侧衣兜是大人的象征。
+
+　　以前小学印象尤为深刻，父亲给我交学费，每次都是从内侧衣兜里拿钱包。而因为交学费，钱包总是鼓鼓的。
+
+　　我也曾问过父亲：“为什么要放在里面？拿出来不是很不方便吗？”
+
+　　父亲说：“安全。”
+
+　　那个时候移动支付一点影子都没有。
+
+　　稍微大一些，看了一些电视剧或者电影。每次那种黑道人物掏枪也总是把手放在衣兜里，这更为这种普通的衣兜蒙上了神秘的色彩。
+
+　　我也来也幻想哪一天我也能帅气地从内侧衣兜掏出来什么。因为这样看起来很有大人的样子。小时候的我很崇拜父亲。虽然据母亲说，那段时间恰恰是父亲最黑暗的时候：什么都不会，买卖又失败了，只能跑跑车拉人做营生。但父亲从来没跟我说过这些。
+
+　　我的父亲就是一个很传统的父亲。我虽如今很不赞成这种传统的父亲形象，但我也无法否认：传统的父亲形象对于教育一个人的责任和担当，确实很有效。
+
+　　于是我渐渐明白了，我并不是羡慕内侧衣兜，而是羡慕父亲身上的表现出来的抽象气质。细化一点，也可以看作是责任、勇气、坚韧和耐心的集合体。
+
+　　黑道人物身上也有这种气质。不然是成为不了黑道人物的。
+
+　　前阵子换衣服，才发现脱下的衣服有个内侧衣兜。这么久了都没看见。可能我也确实用不到它吧。毕竟，移动支付已经普及了。
+
+　　我也不知道我身上有没有这种气质，如果有，我想也需要换一种表现形式了。
+
+　　但是每次看见这种衣兜，我还是会很兴奋。不论有没有用，我还是挺喜欢这个设计。
+
+
+
+　　南国微雪 Miyuki
+
+　　2023 年 2 月 26 日
\ No newline at end of file
```

## 花未眠 - 川端康成.md

```diff

@@ -0,0 +1,25 @@
+# 花未眠
+
+*川端康成*
+
+　　我常常不可思议地思考一些微不足道的问题。昨日一来到热海的旅馆，旅馆的人拿来了与壁龛里的花不同的海棠花。我太劳顿，早早就人睡了。凌晨四点醒来，发现海棠花未眠。
+
+　　发现花未眠，我大吃一惊。有葫芦花和夜来香，也有牵牛花和合欢花，这些花差不多都是昼夜绽放的。花在夜间是不眠的。这是众所周知的事。可我仿佛才明白过来。凌晨四点凝视海棠花，更觉得它美极了。它盛放，含有一种哀伤的美。
+
+　　花未眠这众所周知的事，忽然成了新发现花的机缘。自然的美是无限的。人感受到的美却是有限的，正因为人感受美的能力是有限的，所以说人感受到的美是有限的，自然的美是无限的。至少人的一生中感受到的美是有限的，是很有限的，这是我的实际感受，也是我的感叹。人感受美的能力，既不是与时代同步前进，也不是伴随年龄而增长。凌晨四点的海棠花，应该说也是难能可贵的。如果说，一朵花很美，那么我有时就会不由地自语道：要活下去！
+
+　　画家雷诺阿说：只要有点进步，那就是进一步接近死亡，这是多么凄惨啊。他又说：我相信我还在进步。这是他临终的话。米开朗基罗临终的话也是：事物好不容易如愿表现出来的时候，也就是死亡。米开朗基罗享年八十九岁。我喜欢他的用石膏套制的脸型。
+
+　　毋宁说，感受美的能力，发展到一定程度是比较容易的。光凭头脑想像是困难的。美是邂逅所得，是亲近所得。这是需要反复陶冶的。比如惟—一件的古美术作品，成了美的启迪，成了美的开光，这种情况确是很多。所以说，一朵花也是好的。
+
+　　凝视着壁龛里摆着的一朵插花，我心里想道：与这同样的花自然开放的时候，我会这样仔细凝视它吗？只搞了一朵花插入花瓶，摆在壁龛里，我才凝神注视它。不仅限于花。就说文学吧，今天的小说家如同今天的歌人一样，一般都不怎么认真观察自然。大概认真观察的机会很少吧。壁龛里插上一朵花，要再挂上一幅花的画。这画的美，不亚于真花的当然不多。在这种情况下，要是画作拙劣，那么真花就更加显得美。就算画中花很美，可真花的美仍然是很显眼的。然而，我们仔细观赏画中花，却不怎么留心欣赏真的花。
+
+　　李迪、钱舜举也好，宗达、光琳、御舟以及古径也好，许多时候我们是从他们描绘的花画中领略到真花的美。不仅限于花。最近我在书桌上摆上两件小青铜像，一件是罗丹创作的《女人的手》，一件是玛伊约尔创作的《勒达像》。光这两件作品也能看出罗丹和玛伊约尔的风格是迎然不同的。从罗丹的作品中可以体味到各种的手势，从玛伊约尔的作品中则可以领略到女人的肌肤。他们观察之仔细，不禁让人惊讶。
+
+　　我家的狗产且小狗东倒西歪地迈步的时候，看见一只小狗的小形象，我吓了一跳。因为它的形象和某种东西一模一样。我发觉原来它和宗达所画的小狗很相似。那是宗达水墨画中的一只在春草上的小狗的形象。我家喂养的是杂种狗，算不上什么好狗， 但我深深理解宗达高尚的写实精神。
+
+　　去年岁暮，我在京都观察晚霞，就觉得它同长次郎使用的红色一模一样。我以前曾看见过长次郎制造的称之为夕暮的名茶碗。这只茶碗的黄色带红釉子，的确是日本黄昏的天色，它渗透到我的心中。我是在京都仰望真正的天空才想起茶碗来的。观赏这只茶碗的时候，我不由地浮现出场本繁二郎的画来。那是一幅小画。画的是在荒原寂寞村庄的黄昏天空上，泛起破碎而蓬乱的十字型云彩。这的确是日本黄昏的天色，它渗入我的心。场本繁二郎画的霞彩，同长次郎制造的茶碗的颜色，都是日本色彩。在日暮时分的京都，我也想起了这幅画。于是，繁二郎的画、长次郎的茶碗和真正黄昏的天空，三者在我心中相互呼应，显得更美了。
+
+　　那时候，我去本能寺拜谒浦卜玉堂的墓，归途正是黄昏。翌日，我去岚山观赏赖山阳刻的玉堂碑。由于是冬天，没有人到岚山来参观。可我却第一次发现了岚山的美。以前我也曾来过几次， 作为一般的名胜，我没有很好地欣赏它的美。岚山总是美的。自然总是美的。不过，有时候，这种美只是某些人看到罢了。
+
+　　我之发现花未眠，大概也是我独自住在旅馆里，凌晨四时就醒来的缘故吧。
\ No newline at end of file
```
