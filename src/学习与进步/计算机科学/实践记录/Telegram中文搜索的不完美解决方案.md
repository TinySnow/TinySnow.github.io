# Telegram 中文搜索的不完美解决方案

## TL;DR

　　方法：在 Telegram 的 BotFather 处申请一个 Bot，新建一个自己的 Discord 频道，引入[免费的 Telegram 和 Discord 桥接机器人](https://top.gg/bot/1123949801613049866)，在 Discord 通过 Telegram Bot Token 链接双方 Bot。将 Telegram Bot 设为管理员，引入需要 Forward 消息的频道和群组，即可实时转发到 Discord，然后进入 Discord 频道进行搜索。

　　缺点：无法搜索历史消息，这个问题至今未能解决。

## 正文

　　研究出这个方法很顺利，然后研究怎样搜索历史消息研究了半天。

　　抛去那些需要搭服务器，每月会产生固定收入的方法（在经济环境不好的当下，还是开源节流比较优先），唯一的方法就是很蠢地转发所有历史消息到桥接机器人。

　　通过 DeepSeek 联网搜索找出了一些解决方案：

　　1. 借助毛子现有的 Bot 服务；

　　2. 自己暂时搭一个服务器，日常主力机就可以做。

　　因为所有历史消息一旦转发完毕，就不再需要搭服务器了，桥接 Bot 会自动转发所有新消息，所以临时搭一个服务器进行操作也可以接受。

　　以上两个方法中：

　　第一种方法的结果：

　　我尝试了几乎所有的可以拷贝历史消息的 Bot 服务，最好用的 Junction Bot，TeleFeed: Auto Forward Bot，Auto Forward Messages，Redirect Bot 无一例外都要付费。还不便宜。有个 1200 卢布，有个 7.99 刀。

　　我最终就薅了 Auto Forward Messages 的前一百条消息。因为免费计划只有这么多额度可供转发，同时转发消息 ID 的 Offset 不能超过 2，相当于小步接续转发的方法不能用。而且这个 Bot 风险还特别大。需要明文输入预留电话号码，2 FA 密码才能 Connect 到这个 Bot。最终登录上的时候，看了一下设备好像是在挪威还是芬兰的某个机房。

　　薅完之后我就退了。不过没改 2FA 密码。

　　Junction Bot 比较有意思，居然还是个 TG 小程序。

　　计划一宣告失败。

　　第二种方法的结果：

　　最终锁定了 TGCF 这个项目，开始搭建。

　　在手机上用 Termux 编译了一天。用手机是因为要上班……而且没有服务器可以 SSH。Wiki 里也说可以用 Termux 在 Android 环境搭建。

　　不过实际编译起来还是会遇到各种各样神奇的错误。比如内存不够，比如 CMAKE 说缺哪个库，比如 Python 的 venv（根据缩略名目测是 Virtual Environment，没学过 Python 相关的东西不太清楚）环境乱套，比如 Termux 并不是正宗的 Linux 环境，缺了很多组件。

　　README 写的步骤十分模糊，翻来翻去只在一个非常深的 Closed Issue 里面翻到了解决方案。不知道为什么开发人员不把它更新到 README 里。

　　编译完 tgcf 本来就已经十分艰难了，Quick Start 里面使用的是 tgcf-web，因为 Termux 缺少 Web 环境并且没有相关的库可供查找和下载，就想着用提过的 Cli。翻了一下 Wiki 里的 Cli，结果显示 Deprecated，改为了 Web，翻 Wiki version history 还 404，逼上绝路了，只能靠蒙。

　　本来已经逼到打算下班之后上 Windows 了，结果看到不支持 Windows，必须下 WSL2，那算了。找了一台 VM，正打算编译，想到 VM 只有 TTY，没有 X 环境，好像也不行……

　　这一步步路全堵死了。

　　最后还是 Issue 里面用 Termux 下了整个 Minimal Debian，用 proot-distro 才编译成功。

　　好了，登上网页，现在才注意到想真正启动这个 Bot，还需要 APP_ID，APP_HASH 和 Session_String。前二者因为 Telegram 官方收紧以及我代理不干净一直生成不出来，而 Session_String 的生成又需要前二者，而且还需要下环境跑 Python 脚本。

　　折腾到这，已经心灰意冷了，本来我就是条懒狗哈哈哈哈哈。

　　计划二宣告失败。

　　原来还有想法用 Elastic Search 导入群组聊天记录倒排索引，想了想就跟上班一样，工作量不低，况且实时性还是个问题，就算了。

　　所以目前整个 Telegram 个人频道群组中文搜索项目一直停滞在 2025 年 1 月 8 日。自该日起，往后的历史记录可以查询（Discord 搜索自带分词），往前不能查询。

　　此方法目前还有几个弊端：

　　1. 因为 Discord 方面主力桥接的 Bot，写死了一项规则，即超过 24h 没有人回复的话，再有人聊天就会在文字频道里再单开一个名字相同的子区，所以如果长时间没人说话或这么有更新的话，可能会跳出来 N 多个名字相同的子区。这个 Bot 是用子区实现的，并非把所有消息都扔到统一的文字频道里。

　　2. 贴纸只能 Forward 对应的 Emoji，不是对应的图，所以单看 Discord 消息记录的话，会很奇怪，会感觉群友在乱发 Emoji。

　　3. 对消息的 Reaction 未测试。

　　不过也有几个优点：

　　1. 图片是可以 Forward 的，不像有些 Bot 列为了付费 Feature，整个 Bot 都是免费的。文件未测试。

　　2. 实时性有保障，不过 Forward 到 Discord 之后，Discord 官方加入搜索记录可能需要一两分钟的时间。

　　3. 如果有群友在转发的消息对应的子区，用 Discord 账号回复信息的话，Bot 会将 Discord 的回复反向 Forward 到 Telegram 对应的频道/群组/User 对话中。即转发过程是双边的，不是只有 Telegram to Discord 单边。利用这个特性可以作为一个匿名发言 Bot（Telegram 端，且不会占用 Admin 位置个数），当然 Discord 端是不匿名的……

　　目前就写到这里了。我创建的 [Telegram Bridge Bot 在这里](https://t.me/TinyTelegramDiscordBridgeBot)~~（不要随便乱玩儿哦，所有消息都在 dc 里面看得一清二楚）。~~

　　懒狗一时兴起想出的方法哈哈哈哈哈哈哈。

　　Discord 相关的信息一直在置顶里，匿名 Bot 相关的特性，也许可以考虑放在置顶里？

　　转发效果欢迎加入 dc 频道检验！只是 dc 基本没人说话，也就不欢迎来玩儿了，还是欢迎加附属讨论群组玩儿吧哈哈哈哈哈哈哈哈。

<br />

　　南国微雪 Miyuki

　　2025 年 1 月 9 日
