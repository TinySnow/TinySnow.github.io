# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## SUMMARY.md

```diff

@@ -8,6 +8,7 @@
 - [杂记 | Sundry](杂记.md)
 -----
 - [每日一文 | Daily Article](每日一文/每日一文.md)
+  - [香蕉的尸斑 - 李碧华](每日一文/香蕉的尸斑%20-%20李碧华.md)
   - [可以换吗？- 亦舒](每日一文/可以换吗？-%20亦舒.md)
   - [女人为什么不宜搞哲学 - 周国平](每日一文/女人为什么不宜搞哲学%20-%20周国平.md)
   - [猫婆 - 冯骥才](每日一文/猫婆%20-%20冯骥才.md)

@@ -649,6 +650,7 @@
     - [Windows自定义自启动任务](技术/实践记录/Windows自定义自启动任务.md)
     - [Git仓库瘦身](技术/实践记录/Git仓库瘦身.md)
     - [博客历史演进](技术/实践记录/博客历史演进.md)
+    - [Telegram机器人的手机部署](技术/实践记录/Telegram机器人的手机部署.md)
   - [其他资料 | Other Docs](技术/其他资料/其他资料.md)
     - [Git 学习笔记](技术/其他资料/Git%20学习笔记.md)
     - [Bash 代表命令](技术/其他资料/Bash%20代表命令.md)
```

## sitemap.txt

```diff

@@ -137,6 +137,7 @@ https://tinysnow.github.io/每日一文/发出声音永远是有用的 - 席慕
 https://tinysnow.github.io/每日一文/发明 - 于尔克 · 舒比格
 https://tinysnow.github.io/每日一文/发民主财 - 韩少功
 https://tinysnow.github.io/每日一文/变成虫子的人 - 黄惊涛
+https://tinysnow.github.io/每日一文/可以换吗？- 亦舒
 https://tinysnow.github.io/每日一文/台阶 - 李森祥
 https://tinysnow.github.io/每日一文/吃相 - 梁实秋
 https://tinysnow.github.io/每日一文/吃酒 - 丰子恺
```

## Telegram机器人的手机部署.md

```diff

@@ -0,0 +1,193 @@
+# Telegram机器人的手机部署
+
+## 目的
+
+- 一直有读 epub 电子书的习惯，摘录段落复制下来段落很难看，把自己写的排版器的逻辑复制下来，写成了一个排版机器人
+- 所有发给机器人的文字，都会经过排版，后转发到读书频道
+
+## 前提
+
+- 本来最好方法是直接把机器人架在服务器上
+  - 没钱，之前就折中放在自己笔记本电脑上开机运行
+  - 开机运行还不起作用，所以都是自己手动启动
+    - 此电脑 -> 管理 -> 计算机管理 -> 系统工具 -> 任务计划程序
+    - 放置脚本在 `C:\Users\<You>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup` 目录下
+    - 放置脚本在 `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp` 目录下
+    - 都不起作用……
+- 随身 Wifi 限速，连接 Telegram 需要科学上网，导致直接连不上
+  - 行里不准拉宽带，说是被黑客黑过，于是总行禁止了全国的 WLAN 设备
+- 想到了部署在手机上
+
+## 需求
+
+- 机器人手机部署，能随时开启和关闭
+
+## 工具
+
+- 一台 Root 过的手机（Root 很重要，否则读取不了文件）
+- Termux 应用程序（代理软件需要放行 Termux，否则下不了软件包）
+- 写好的 Telegram Bot 程序代码（编译后版本，否则还要自己编译一遍）
+- 科学上网软件（黑名单模式）
+
+## 步骤
+
+1. 拷贝 Telegram Bot 程序代码到 Termux 用户主目录任意文件夹下
+
+2. 准备运行环境
+
+   - 本 Bot 使用 Grammy 框架，一个使用 JavaScript 写成的框架，所以需要下载 Node
+
+   - ```shell
+     # termux 也使用 apt
+     apt install node
+     npm install grammy
+     ```
+
+   - npm 下载有些慢，需要 Termux 也通过代理
+
+3. 开启调试环境（可选）
+
+   - Grammy 设置一个环境变量即可看到 bot 的运行情况
+
+   - ```shell
+     export DEBUG="grammy*"
+     ```
+
+4. 设置终端通过代理，否则 bot 发送的请求无法到达 Telegram 服务器
+
+   - ```shell
+     export http_proxy=<proxy-address>:<port>
+     export https_proxy=<proxy-address>:<port>
+     ```
+
+5. 运行即可
+
+   - ```shell
+     sudo -E node main.js
+     ```
+
+   - 一定要使用 `sudo`，否则 Android 系统禁止 Termux 自带的用户读取 `/data/data/com.termux/files/home` 下的文件
+
+   - `-E` 携带当前的环境变量直接进入 sudo 的 root 环境，否则 node 使用 root 权限运行还是没有调试的环境变量，也就看不到调试信息，而且也不能通过代理
+
+## 备注
+
+1. **代理软件一定要是黑名单模式**
+   - 黑名单模式默认其他程序为白名单，通过
+   - 通过 Termux 程序启动的进程，是从 Android 系统 fork 出来的子进程，而该子进程因为不是手机里的 apk，没有包名，所以使用系统的代理
+   - 如果代理软件使用白名单模式，相当于同时禁止了系统的代理权限，所以 Bot 一定连不上 Telegram 的 API
+2. 一定要设置终端的代理，并让程序启动时携带当前的环境变量：`sudo -E`
+   - 最主要还是让终端启动的进程能够通过代理
+3. 如果还需要运行其他程序，可以在 tmux 或者 screen 等终端复用软件上运行
+
+## 附录
+
+### 简易启动脚本
+
+```shell
+# 设置 shell 脚本安全性
+set -Eexuo pipefail
+# 开启调试环境
+export DEBUG="grammy*"
+# 设置终端代理，需要更改为自己的代理地址和端口
+export http_proxy=<proxy-address>:<port>
+export https_proxy=<proxy-address>:<port>
+# 运行程序，需要更改为自己的路径
+sudo -E node main.js
+```
+
+### 启动 Log
+
+```shell
+~ $ ./run-bot.sh
+allexport       off
+braceexpand     on
+emacs           off
+errexit         on
+errtrace        on
+functrace       off
+hashall         on
+histexpand      off
+history         off
+ignoreeof       off
+interactive-comments    on
+keyword         off
+monitor         off
+noclobber       off
+noexec          off
+noglob          off
+nolog           off
+notify          off
+nounset         on
+onecmd          off
+physical        off
+pipefail        off
+posix           off
+privileged      off
+verbose         off
+vi              off
+xtrace          on
+++ export 'DEBUG=grammy*'
+++ DEBUG='grammy*'
+++ export http_proxy=<proxy-address>:<port>
+++ http_proxy=<proxy-address>:<port>
+++ export https_proxy=<proxy-address>:<port>
+++ https_proxy=<proxy-address>:<port>
+++ sudo -E node /data/data/com.termux/files/home/ChinesePassagesTypesetBotForTelegram/main.js
+  grammy:bot Initializing bot +0ms
+  grammy:core Calling getMe +0ms
+  grammy:core Calling deleteWebhook +33ms
+(node:30291) [DEP0040] DeprecationWarning: The punycode module is deprecated. Please use a userland alternative instead.
+(Use node --trace-deprecation ... to show where the warning was created)
+  grammy:bot I am TinySnowRebornBot! +3s
+  grammy:bot Starting simple long polling +0ms
+  grammy:core Calling getUpdates +3s
+  grammy:core Calling getUpdates +31s
+  grammy:core Calling getUpdates +30s
+  grammy:bot Processing update 124801012 +15m
+  grammy:core Calling sendMessage +24s
+  grammy:core Calling getUpdates +1ms
+  grammy:core Calling getUpdates +30s
+  grammy:bot Processing update 124801013 +2m
+  grammy:core Calling sendMessage +7s
+  grammy:core Calling getUpdates +0ms
+  grammy:core Calling getUpdates +32s
+  grammy:core Calling getUpdates +30s
+  grammy:bot Processing update 124801014 +1m
+  grammy:core Calling sendMessage +27s
+  grammy:core Calling getUpdates +3ms
+  grammy:bot Processing update 124801015 +28s
+  grammy:core Calling sendMessage +28s
+  grammy:core Calling getUpdates +2ms
+  grammy:core Calling getUpdates +31s
+  grammy:core Calling getUpdates +31s
+  grammy:error HttpError: Network request for 'getUpdates' failed!
+  grammy:error     at /data/data/com.termux/files/home/ChinesePassagesTypesetBotForTelegram/node_modules/grammy/out/core/error.js:85:15
+  grammy:error     at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
+  grammy:error     at async ApiClient.call (/data/data/com.termux/files/home/ChinesePassagesTypesetBotForTelegram/node_modules/grammy/out/core/client.js:54:29)
+  grammy:error     at async ApiClient.callApi (/data/data/com.termux/files/home/ChinesePassagesTypesetBotForTelegram/node_modules/grammy/out/core/client.js:86:22)
+grammy:error     at async Bot.fetchUpdates (/data/data/com.termux/files/home/ChinesePassagesTypesetBotForTelegram/node_modules/grammy/out/bot.js:400:27)
+  grammy:error     at async Bot.loop (/data/data/com.termux/files/home/ChinesePassagesTypesetBotForTelegram/node_modules/grammy/out/bot.js:375:29)
+  grammy:error     at async Bot.start (/data/data/com.termux/files/home/ChinesePassagesTypesetBotForTelegram/node_modules/grammy/out/bot.js:314:9) +0ms
+  grammy:error Call to getUpdates failed, retrying in 3 seconds ... +2ms
+  grammy:core Calling getUpdates +16s
+  grammy:core Calling getUpdates +31s
+  grammy:core Calling getUpdates +30s
+  grammy:core Calling getUpdates +30s
+  grammy:core Calling getUpdates +30s
+  grammy:bot Processing update 124801016 +6m
+  grammy:core Calling sendMessage +22s
+  grammy:core Calling getUpdates +3ms
+  grammy:core Calling getUpdates +32s
+  grammy:core Calling getUpdates +30s
+  grammy:core Calling getUpdates +30s
+  grammy:core Calling getUpdates +31s
+  grammy:core Calling getUpdates +30s
+  grammy:core Calling getUpdates +30s
+  grammy:core Calling getUpdates +31s
+  grammy:core Calling getUpdates +31s
+  grammy:bot Processing update 124801017 +5m
+```
+
+- 只要没有 Error 就可以，Log 中的 Error 是因为当时网络断了
+- 如果在 `grammy:core Calling deleteWebhook` 这一步停留了太长时间，说明没有连接上 API 服务器
\ No newline at end of file
```

## 香蕉的尸斑 - 李碧华.md

```diff
new file mode 100644
index 0000000..35208e5
--- /dev/null
+++ b/src/每日一文/香蕉的尸斑 - 李碧华.md	

@@ -0,0 +1,19 @@
+# 香蕉的尸斑
+
+*李碧华*
+
+　　新鲜运到的香蕉，像只巨梳，颜色亮黄，肉体坚实，其实最不好吃，因为不够香，而且有点涩。
+
+　　“有'雀斑'的香蕉才好吃呢！”这是会家子选择。
+
+　　这样说有点俏皮，但较正确，或较恐怖的说法： ——那些出现在香蕉身上的，应该是“尸斑”。
+
+　　专家告诉我们，人死后，身体机能停止运作，血管会渐爆裂，血水渗出皮肤，形成褐色斑点。死去时间越长，尸斑出得越多。但肌肉受压的部份，不会呈现尸斑，如仰卧而死，斑点便在身前；俯伏，则在背后。验尸官据此可以推断尸体的死因，死亡时间，和曾否被人移动过，协助破案。
+
+　　说回水果吧。
+
+　　每一个水果，脱离了枝干，初期仍是顽强支撑着，如搭架子，但它们已经一天一天步向腐烂了。人们买下水果，嫌生，搁在一旁暂且不吃，为了等待它们“成熟”。在变坏之前一刻，水果迸发生命的余晖，那个时候最熟，最甜，最香，肉有点软，斑点微现，又未走下坡。我们吃水果，实在是吃它们最后的灿烂，也是一不归路。
+
+　　香蕉，木瓜，蜜瓜，菠萝，西柚，李子，啤梨，桃子……，都适合购买后一两天吃，不要太急。牛油果也是，不过它不比香蕉，雀斑会光明正大地显示，它脸色比较深沉，看不出端倪。
+
+　　各位，希望不影响你们吃香蕉的心情。 ——但现实是这样的悲哀。
\ No newline at end of file
```
