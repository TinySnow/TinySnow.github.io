# 使用 Macmini 当作家庭服务器的一系列问题

## 需求

见 [Q1](#Q1).

## 解决方案

1. 光猫路由改桥接，ARP 绑定 DHCP 分配的 IP 和机器的 MAC 地址。
2. 用 ipv6（因为 ipv4 申请不到），绑一个免费域名，然后跑 ddns 服务。
3. Tailscale 内网隧穿打洞。
4. 用 tailscale 打洞连上 ssh 之后，一切就好办了。
5. 远程启动主力机，直接用 brew install 下来的 wakeonlan，命令行起主力机的有线网卡即可，验证测试通过了。
6. 唤醒主力机之后，用 tailscale + rdp 远程桌面。
7. 至于其他挂载的服务，用 ipv6 域名或者 openfrp。

- 以上方案暂时均未经过大面积验证（2026.4.26）。

## 最后附上与 Claude Sonnet 4.6 的对话记录

### Q1

我买了一台 Macmini，想放在家里当服务器。需求如下：

1. 远程启动我的主力台式电脑，使用 ToDesk 远程唤醒，这个软件要求在路由器或光猫上进行 mac 绑定；
2. 提供一些比如 n2n 的游戏联机服务；
3. 挂载 Telegram Bot；
4. 挂载 UsbEAM Lan Party 服务器；
5. 有可能会开 Minecraft 或者 Terraria(Tmodloader) 服务器。 现在已知如下条件：
6. 一根中国电信家用宽带，终端为光纤进网口出的光猫，天翼网关中未动过任何设置；
7. 两根网线，用来连接 Macmini 和主力台式电脑；
8. 一台闲置路由器，暂时还在家里，放假之后拿过来。 考虑一个最简单的方案实现以上目标。 

我想过 ipv6，但是不方便；申请 ipv4 公网 ip + ddns 绑定，但是运营商不一定给而且 ddns 的服务可能有点贵（openfrp除外，但我不知道怎么用）。 现在不知道怎么操作。

### A1

#### 整体方案思路

你的需求分两类：**对外提供服务**（游戏服务器、Telegram Bot 等）和**内网管理**（ToDesk 唤醒台式机）。最简方案如下：

------

#### 第一步：当前网络拓扑（路由器到手前）

```
电信光猫（天翼网关）
    ├── LAN口1 → Mac mini（固定 IP，比如 192.168.1.10）
    └── LAN口2 → 台式电脑（固定 IP，比如 192.168.1.20）
```

光猫自带 DHCP 和路由功能，两台设备直接插进去即可。进光猫后台（通常是 `192.168.1.1`，超级管理员密码在机身贴纸上）给两台设备绑定静态 IP（按 MAC 地址绑定）。

**路由器到手后**，拓扑变为：

```
电信光猫 → 路由器（做主路由） → 交换/无线
                ├── Mac mini
                └── 台式电脑
```

届时端口转发在路由器上做，灵活性更高。

------

#### 第二步：ToDesk 远程唤醒

ToDesk 唤醒需要在**同局域网内有一台在线的设备**（即 Mac mini）转发 WOL 魔术包。光猫后台绑定 MAC 的操作：

1. 登录光猫后台 → **DHCP 静态地址分配** → 添加台式机 MAC + 固定 IP
2. ToDesk 客户端配置里填入台式机 MAC 地址即可，Mac mini 作为唤醒代理全程在线

------

#### 第三步：公网访问（最关键问题）

**推荐方案：IPv6 + 免费 DDNS**

电信宽带几乎必然有 IPv6 原生公网地址，不需要申请、不需要运营商配合。步骤：

1. 确认 Mac mini 已获得 IPv6 地址（`ifconfig` 看 `en0`，有 `2409:` 开头的就是）
2. 光猫开启 IPv6 防火墙放行（或设置 DMZ）
3. 注册 [dynv6.com](https://dynv6.com) 或 [afraid.org](https://freedns.afraid.org)，免费绑定一个域名
4. Mac mini 上跑一个 DDNS 客户端（推荐 `ddns-go`，一个 Go 程序，Docker 一键起）自动更新 IPv6 地址到域名

这样你的域名就始终指向家里，**免费、稳定、带宽就是你的宽带带宽**。

**备用方案：OpenFRP（内网穿透）**

适合 IPv6 不好用、或者对端不支持 IPv6 的场景（比如某些老游戏客户端）。

OpenFRP 免费，用法：

1. 注册 [openfrp.net](https://openfrp.net)
2. 下载 `frpc`，在后台新建隧道（TCP 类型，填本地端口）
3. 生成配置文件，Mac mini 上后台运行 `frpc -c frpc.toml` 即可
4. 对外暴露的是 `xxx.openfrp.top:端口号` 这样的地址

免费版有速率限制（通常 10Mbps），游戏联机够用，大文件传输稍慢。

------

#### 各服务对号入座

| 需求                 | 方案                                                     |
| -------------------- | -------------------------------------------------------- |
| ToDesk 唤醒台式机    | 光猫绑定 MAC + Mac mini 常驻                             |
| Telegram Bot         | 只需出站网络，无需公网 IP，直接跑                        |
| n2n 联机             | Mac mini 跑 supernode，IPv6 或 OpenFRP 对外暴露 UDP 端口 |
| UsbEAM Lan Party     | 同上，暴露对应端口                                       |
| Minecraft / Terraria | IPv6 + DDNS 是最优方案，带宽最大                         |

------

#### 建议执行顺序

1. 先把两根网线插进光猫，登录光猫后台绑静态 IP
2. 检查 Mac mini 的 IPv6 地址是否是公网段（`2409:` 开头）
3. 装 `ddns-go` 绑域名
4. 按需用 OpenFRP 补充不支持 IPv6 的场景
5. 路由器到手后迁移到路由器下，光猫改桥接或保持现状均可

如果检查 IPv6 后发现光猫没放行，告诉我光猫的型号，可以给你具体的开放步骤。

### Q2

需要光猫改桥接模式吗？

### A2

#### 不一定需要，取决于你的目标

#### 光猫保持路由模式（现状）✅ 推荐先这样

**优点：**

- 零配置风险，光猫出问题断网很麻烦
- 天翼网关自带 IPv6 支持，通常开箱即用
- ToDesk、Bot、OpenFRP 这些**主动出站**的服务完全不受影响

**缺点：**

- 端口转发要在光猫上配，界面比较难用
- 路由器到手后会形成**双层 NAT**（光猫 NAT 一次，路由器再 NAT 一次），对需要公网入站的服务（游戏服务器）有一定影响，但可以用光猫 DMZ 指向路由器解决

------

#### 光猫改桥接模式

**优点：**

- 路由器直接拨号，只有一层 NAT，网络结构更干净
- 所有端口转发、防火墙规则都在路由器上管，方便

**缺点：**

- **需要超级管理员密码**（电信不一定告诉你，可以打 10000 号要求技术上门或自行找默认密码）
- 改错了会断网，需要现场恢复

------

#### 建议

```
现阶段（路由器未到）：
  光猫路由模式，够用

路由器到手后：
  先试双层NAT + 光猫DMZ，能用就不折腾
  如果遇到问题（比如NAT类型不对影响联机），再考虑改桥接
```

**最实用的中间方案**：路由器到手后，光猫后台把 **DMZ 指向路由器的 WAN 口 IP**，相当于让路由器完全暴露在光猫外侧，然后所有规则在路由器上管，既不用改桥接，也没有双层 NAT 的烦恼。

### Q3

光猫 DMZ 是什么，电信拉宽带送的光猫有这个功能吗？

### A3

#### DMZ 是什么

DMZ（Demilitarized Zone，非军事区）是路由器/光猫上的一个功能，**把某一台内网设备完全暴露到公网**，所有从外部进来的流量都直接转发给它，相当于"万能端口转发"。

正常端口转发是这样的：

```
外部请求 :25565 → 光猫 → 转发给 Mac mini:25565（只转这一个端口）
```

DMZ 是这样的：

```
外部所有请求 → 光猫 → 全部转给指定设备（不管什么端口）
```

------

#### 电信天翼网关有没有这个功能

**有，但入口藏得比较深。**

天翼网关（比如 HG6、GS3101、AN5506 等型号）的后台通常在：

1. 浏览器打开 `192.168.1.1`

2. 用

   超级管理员账号

   登录（普通用户账号看不到这些设置）

   - 用户名通常是 `telecomadmin`
   - 密码在光猫机身**贴纸**上，或者打 10000 号要

3. 找 **高级设置 → 安全配置 → DMZ 主机** 或类似路径

> 不同型号界面不一样，但基本都有这个功能，电信光猫是带完整路由功能的。

------

#### 你现在需要用 DMZ 吗

**暂时不需要。** 按你现在的情况：

- 路由器还没到 → 设备直接插光猫，不存在双层 NAT
- Telegram Bot、n2n 是主动出站，根本不需要 DMZ
- 游戏服务器需要入站 → 到时候在光猫上**单独做端口转发**就够了，比 DMZ 更安全

等路由器到手、发现双层 NAT 有问题的时候，再来开 DMZ 把流量全部转给路由器。

### Q4

我家里有个小米除湿器，米家里面有 mesh 组网，这又是什么？

### A4

#### Mesh 组网是什么

Mesh 组网是一种 **多个路由器互相协作** 的无线网络方案，让家里每个角落都有强信号。

##### 传统路由器 vs Mesh

```
传统方案：
主路由 → 信号弱的地方放个副路由
问题：两个 WiFi 名字不同，走动时不会自动切换

Mesh 方案：
主节点
  ├── 子节点A（客厅）
  └── 子节点B（卧室）
所有节点共用同一个 WiFi 名字，手机走动时自动切换到最近的节点
```

本质上就是**多个路由器组成一张网，对用户透明**，你只看到一个 WiFi。

------

#### 米家里的 Mesh 组网

米家 App 里看到的"Mesh 组网"，是小米路由器的组网功能，**和你的小米除湿器没有关系**。

除湿器只是接入了这个 WiFi 网络，米家 App 把它们显示在同一个界面里，看起来像是"在一起"，实际上：

- **Mesh 组网** = 你家的路由器拓扑
- **除湿器** = 只是连上 WiFi 的一个普通智能家居设备

------

#### 和你的 Mac mini 服务器有关系吗

**基本没有直接关系。** 但有一点要注意：

如果你之后把那台闲置路由器接进来，要确认它**不是小米 Mesh 的子节点**，否则网络结构会比较乱。闲置路由器建议单独作为主路由使用，和米家 Mesh 的设备分开管理。

### Q5

那如果我想手机 ssh 到我这台 mini 上，又可以怎么办呢

### A5

#### 分两种情况

##### 在家里（同一局域网）

最简单，直接用内网 IP：

1. Mac mini 开启 SSH：**系统设置 → 通用 → 共享 → 远程登录** 打开
2. 手机装一个 SSH 客户端，iOS 推荐 **Termius** 或 **SSH Files**，Android 推荐 **JuiceSSH**
3. 连接地址填 `192.168.1.10`（你之前绑定的固定 IP），端口 22，用户名密码就是 Mac 的账户

------

##### 在外面（公网访问）

这就和之前说的公网问题一样了，有几个选项：

**选项一：IPv6 + DDNS（推荐）**

- 前提是你的 IPv6 能通，域名绑好了
- 直接 SSH 到你的域名就行，和在家一样用

**选项二：OpenFRP 穿透 SSH 端口**

- 在 OpenFRP 后台新建一个 TCP 隧道，本地端口填 22
- 会给你一个 `xxx.openfrp.top:xxxxx` 的地址
- 手机填这个地址和端口就能连

**选项三：Tailscale（最省心）✅ 特别推荐**

- 本质是一个基于 WireGuard 的异地组网工具
- Mac mini 和手机都装 Tailscale，登同一个账号
- 之后不管在哪，手机都能用一个固定的虚拟 IP 访问 Mac mini
- **完全免费，不需要公网 IP，不需要配任何端口转发**，开箱即用

Tailscale 是你这个场景最推荐的方案，SSH、文件传输、甚至访问家里其他设备都走它，一劳永逸。

### Q6

tailscale 能在 mac 和 Windows 上运行吗？能远程桌面吗？

### A6

#### Tailscale 平台支持

**全平台支持**，包括：

- macOS ✅
- Windows ✅
- Linux ✅
- iOS ✅
- Android ✅

所有设备加入同一个 Tailscale 账号后，组成一个虚拟局域网，互相之间用固定虚拟 IP 访问，跟在同一个内网里一样。

------

#### 能远程桌面吗

**可以，但 Tailscale 本身不提供远程桌面功能**，它只是打通了网络。远程桌面你还需要额外的软件：

| 场景              | 推荐方案                                                     |
| ----------------- | ------------------------------------------------------------ |
| Windows → Windows | Windows 自带的 RDP（远程桌面），走 Tailscale 的 IP 直连，流畅稳定 |
| 任意设备 → Mac    | Mac 开启"屏幕共享"，用 VNC 客户端连，或者直接用 RDP 客户端（Mac 支持） |
| 手机 → 电脑       | RD Client（微软官方 App）连 RDP                              |

------

#### 对你的具体场景

你的需求是远程操控**主力台式 Windows 电脑**，最佳组合是：

```
手机 / 外网设备
    → Tailscale 虚拟网络
        → Mac mini（常驻在线）
        → 台式 Windows（唤醒后）
            → RDP 连接，直接远程桌面
```

台式机唤醒之后，直接用 RDP 连接它的 Tailscale 虚拟 IP，比 ToDesk 更流畅，而且完全免费，带宽也是你家宽带的带宽。

唯一的问题是**唤醒**这一步，Tailscale 本身不能唤醒关机的电脑，所以还是需要 ToDesk 或者让 Mac mini 发 WOL 包来唤醒台式机。

### Q7

我的 todesk 没办法使用 mini 作为中转设备转发 wol 包，但是远程控制 mini 之后用 mini 上下载的 wake on lan 应用是可以唤醒 Windows 的。我之前有一台 Redmi note 12 Turbo，它作为中转可以唤醒。但隔一段时间又不行了。ipad 也不行。我觉得相当之怪。

### A7

#### 原因分析

这个现象其实很好解释，核心问题是**移动设备的后台限制**：

**Redmi 手机隔一段时间不行**

- Android 的电池优化会在一段时间后杀掉后台的 ToDesk 进程
- ToDesk 没有在后台运行 → 自然无法转发 WOL 包
- 重新打开 ToDesk 之后可能又短暂恢复，就产生了"玄学"的感觉

**iPad 不行**

- iOS 对后台 App 限制比 Android 更严格，几乎不允许 App 长期保活

**Mac mini 上的 WOL App 可以唤醒**

- Mac mini 作为桌面设备没有后台限制，进程一直在跑，所以稳定

------

#### 真正的解决方案

既然 Mac mini 上手动发 WOL 包是有效的，**直接让 Mac mini 负责唤醒**就行了，完全绕开 ToDesk 的中转功能：

配合之前说的 Tailscale，流程变成：

```
你在外面
  → Tailscale SSH 连进 Mac mini
    → 执行一条命令发 WOL 包
      → 台式机唤醒
        → RDP 直连台式机
```

Mac mini 上安装 `wakeonlan`：

```bash
brew install wakeonlan
```

唤醒台式机：

```bash
wakeonlan AA:BB:CC:DD:EE:FF   # 填台式机的 MAC 地址
```

甚至可以在 Mac mini 上写一个脚本，SSH 进去一条命令搞定，比 ToDesk 中转稳定得多，而且完全免费。

### Q8

现在卡就卡在怎么连上 mini，tailscale 能够长久运营吗？还是说它是个开源软件？

### A8

#### Tailscale 的背景

**Tailscale 是一家商业公司**，2019 年成立，背后有正经的风险投资，目前运营稳健。

它的关系是这样的：

```
Tailscale（商业公司）
  └── 基于 WireGuard（完全开源的 VPN 协议）构建

Tailscale 客户端代码 → 开源（GitHub 上可以找到）
Tailscale 的协调服务器 → 不开源，是他们的商业核心
```

所以你依赖的是 Tailscale 的**协调服务器**来分发虚拟 IP、打通设备之间的连接。如果他们倒闭或者停服，就会受影响。

------

#### 风险有多大

**相对较低**，原因：

- 用户量很大，GitHub 上 star 数极高，开发者社区广泛使用
- 免费套餐非常慷慨（100 台设备，够个人用一辈子），商业模式靠企业版盈利
- 即便真的跑路，**底层 WireGuard 是开源的**，可以自己搭 Headscale（Tailscale 协调服务器的开源替代品）无缝迁移

------

#### 如果实在不放心，有自建替代方案

**Headscale** = 自建版 Tailscale 控制服务器，跑在你的 Mac mini 上，客户端还是用 Tailscale，只是把"听谁指挥"改成听你自己的服务器。

不过目前来说，**直接用 Tailscale 官方服务完全够用**，等真遇到问题再迁移也来得及。

------

#### 回到你的核心问题

> 怎么连上 Mini

步骤非常简单：

1. Mac mini 上装 Tailscale，登录账号
2. 手机 / 外网设备上装 Tailscale，登**同一个账号**
3. 完成，两台设备自动出现在同一个虚拟网络里，直接用虚拟 IP 互访

整个过程不需要配端口转发、不需要公网 IP、不需要动光猫，**Tailscale 自动打洞**，几分钟搞定。

### Q9

结合之前我想挂载的一些对外服务，又应该怎么做呢？

### A9

#### 把所有服务分类

先区分两种性质完全不同的服务：

```
只有你自己访问          → Tailscale 解决
别人也要连进来          → 需要公网入口
```

| 服务                 | 性质         | 方案                 |
| -------------------- | ------------ | -------------------- |
| SSH 管理 Mac mini    | 只有你       | Tailscale            |
| 唤醒台式机 + RDP     | 只有你       | Tailscale            |
| Telegram Bot         | 只需出站     | 直接跑，什么都不用配 |
| n2n supernode        | 朋友要连进来 | 需要公网入口         |
| UsbEAM Lan Party     | 朋友要连进来 | 需要公网入口         |
| Minecraft / Terraria | 朋友要连进来 | 需要公网入口         |

------

#### 公网入口的方案

##### 优先：IPv6 + 免费 DDNS

先在 Mac mini 上查一下：

```bash
ifconfig en0 | grep inet6
```

如果看到 `2409:` 开头的地址，说明你有 IPv6 公网地址，这是最优方案：

- 注册 [dynv6.com](https://dynv6.com)，绑定一个免费域名
- Mac mini 上跑 `ddns-go`（Docker 一键启动），自动更新域名到最新 IPv6 地址
- 朋友用域名连接，免费、带宽就是你家宽带

##### 备用：OpenFRP

朋友的设备不支持 IPv6 时用（比如某些老游戏客户端）：

- 在 OpenFRP 后台给每个服务建一个 TCP/UDP 隧道
- 得到一个 `xxx.openfrp.top:端口` 的地址给朋友
- 免费版限速 10Mbps，游戏联机够用

------

#### 整体架构

```
外网朋友
  → IPv6 域名 / OpenFRP
    → Mac mini
      ├── n2n supernode
      ├── UsbEAM Lan Party
      └── Minecraft / Terraria

你自己在外面
  → Tailscale
    → Mac mini
      └── SSH / 发 WOL 包 / 管理服务

台式机
  → 被 Mac mini 唤醒后
  → 你通过 Tailscale + RDP 远程桌面

Telegram Bot
  → Mac mini 主动连 Telegram 服务器
  → 不需要任何入站配置
```

------

#### 建议执行顺序

1. **先装 Tailscale**，把个人管理这条线打通，SSH 进 Mac mini 没问题
2. **查 IPv6**，能用就配 ddns-go，一个域名搞定所有对外服务
3. **按需开 OpenFRP**，哪个服务的朋友 IPv6 不通，就给那个服务加一条穿透隧道
4. 游戏服务器等用到的时候再起，不用提前全部配好

### Q10

```shell
ifconfig en0 | grep inet6          snow at SnowMini.local
	inet6 fe80::183a:ad03:eb9c:ef4c%en0 prefixlen 64 secured scopeid 0x7 
	inet6 240e:398:a88b:24f0:c4b:5f40:f57a:9e14 prefixlen 64 autoconf secured 
	inet6 240e:398:a88b:24f0:94e5:2787:f949:db37 prefixlen 64 autoconf temporary 
	inet6 240e:398:a88b:24f0:831:8beb:3c09:b prefixlen 64 dynamic
```

### A10

#### 好消息：你有 IPv6 公网地址

`240e:` 开头就是中国电信的 IPv6 公网段，**直接可用**，不需要申请任何东西。

------

#### 分析你的三个公网地址

| 地址                | 类型                                | 稳定性                 |
| ------------------- | ----------------------------------- | ---------------------- |
| `240e:...f57a:9e14` | autoconf secured（由 MAC 地址派生） | **相对稳定**，重启不变 |
| `240e:...f949:db37` | autoconf temporary（隐私扩展）      | 会定期自动更换，不能用 |
| `240e:...3c09:b`    | dynamic                             | 可能变化               |

**给服务器用的应该是第一个**（secured 那个），但它断线重拨后前缀 `240e:398:a88b:24f0` 可能变，所以还是需要 DDNS。

------

#### 下一步：配 ddns-go

Mac mini 上安装 ddns-go，它会自动检测 IPv6 变化并更新域名。

先装 Homebrew（如果没有）：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

然后安装 ddns-go：

```bash
brew install ddns-go
brew services start ddns-go
```

启动后浏览器打开 `http://localhost:9876` 进入管理界面：

1. 选择 DNS 服务商（推荐注册 **Cloudflare**，免费，API 支持好）
2. 填入 API Token
3. IPv6 地址来源选 **网卡**，选 `en0`，类型选 `secured`
4. 填入你的域名，保存

------

#### 验证是否通

配好之后在另一台有 IPv6 的设备上 ping 你的域名：

```bash
ping6 你的域名
```

通了之后，n2n、Minecraft、UsbEAM 全部直接监听端口，朋友用域名加端口就能连，**不需要任何端口转发**，IPv6 点对点直连。

### Q11

```shell
Error: Invalid usage: Formula `ddns-go` has not implemented #plist, #service or provided a locatable service file.
```

### A11

#### 原因

`ddns-go` 的 Homebrew 包没有实现 macOS 的 launchd 服务集成，所以 `brew services start` 不支持。但软件本身装好了，换个方式启动就行。

------

#### 解决方案：手动注册为 launchd 服务

先确认 ddns-go 装好了：

```bash
which ddns-go
```

应该输出类似 `/opt/homebrew/bin/ddns-go`，记住这个路径。

然后创建 launchd 配置文件：

```bash
cat > ~/Library/LaunchAgents/com.ddns-go.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.ddns-go</string>
  <key>ProgramArguments</key>
  <array>
    <string>/opt/homebrew/bin/ddns-go</string>
    <string>-l</string>
    <string>:9876</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
</dict>
</plist>
EOF
```

加载并启动：

```bash
launchctl load ~/Library/LaunchAgents/com.ddns-go.plist
launchctl start com.ddns-go
```

然后浏览器打开 `http://localhost:9876` 就能进管理界面了。

------

#### 如果路径不是 `/opt/homebrew/bin`

Intel Mac 的路径是 `/usr/local/bin/ddns-go`，用这个命令确认：

```bash
which ddns-go
```

把 plist 文件里的路径替换成实际路径即可。

### Q12

访问需要用户名和密码。

### A12

#### ddns-go 首次启动默认需要设置账号

第一次访问会让你设置用户名和密码，但如果直接弹出登录框而不是设置页面，说明它用了默认凭据。

试试默认账号：

- 用户名：`admin`
- 密码：`admin`

------

如果不对，重置一下，先停掉服务：

```bash
launchctl stop com.ddns-go
```

然后加 `-resetPassword` 参数重置密码，重新启动：

```bash
launchctl unload ~/Library/LaunchAgents/com.ddns-go.plist
```

修改 plist 文件，在 `ProgramArguments` 里加一行参数：

```bash
/opt/homebrew/bin/ddns-go -resetPassword
```

或者最简单的方式，直接命令行临时跑一次带重置参数的：

```bash
ddns-go -l :9876 -resetPassword
```

然后浏览器访问 `http://localhost:9876`，这次应该会让你重新设置用户名和密码。设好之后 Ctrl+C 停掉，再重新用 launchctl 启动正式服务就行。