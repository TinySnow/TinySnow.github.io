# 使用 Macmini 当作家庭服务器的一系列问题

## 需求

- 我买了一台 Macmini，想放在家里当服务器。需求如下：

1. 远程启动我的主力台式电脑，使用 ToDesk 远程唤醒，这个软件要求在路由器或光猫上进行 mac 绑定；
2. 提供一些比如 n2n 的游戏联机服务；
3. 挂载 Telegram Bot；
4. 挂载 UsbEAM Lan Party 服务器；
5. 有可能会开 Minecraft 或者 Terraria(Tmodloader) 服务器；
6. 部署博客。

- 现在已知如下条件：

1. 一根中国电信家用宽带，终端为光纤进网口出的光猫，天翼网关中未动过任何设置；
2. 两根网线，用来连接 Macmini 和主力台式电脑；
3. 光猫已经改为桥接，路由器已经拨号上网配置好。 

## 参考解决方案

1. 光猫路由改桥接，ARP 绑定 DHCP 分配的 IP 和机器的 MAC 地址。
2. 用 ipv6（因为 ipv4 申请不到），绑一个免费域名，然后跑 ddns 服务。
3. Tailscale 内网隧穿打洞。
4. 用 tailscale 打洞连上 ssh 之后，一切就好办了。
5. 远程启动主力机，直接用 brew install 下来的 wakeonlan，命令行起主力机的有线网卡即可，验证测试通过了。
6. 唤醒主力机之后，用 tailscale + rdp 远程桌面。
7. 至于其他挂载的服务，用 ipv6 域名或者 openfrp。

- 以上方案暂时均未经过大面积验证（2026.4.26）。

## 实际方案（废弃）

1. 光猫路由改桥接，进行 arp 静态路由绑定。
2. Tailscale SSO 注册，各设备下载其客户端，disable 其 key expiry，加入同一个账号地 tailnet，打洞成功，手机、Mac 和 Windows 均能访问 Macmini；
3. 上 dynv6 注册账号，绑一个域名 tinysnow.dynv6.net（不能自定义后缀，只能用他的），复制 mini 最稳定的 ipv6 地址（autoconf secured 那个，由网卡 MAC 地址派生，一般来说只要网络前缀不变就不会变）填入 ipv6 prefix；
4. 下载 ddns-go；
5. 注册好域名后，将 dynv6 里面 zone 下 instructions 里 ddclient 的 password 值，填入 ddns-go 里面的 token，保存；
6. 上路由器后台管理页面，关闭防火墙（为了放行 ipv6 流量），ping6 测试公网访问 mini；
7. 启动各类服务。

## 改版方案（2026.5.10）

1. 光猫路由改桥接，进行 arp 静态路由绑定。
2. Tailscale SSO 注册，各设备下载其客户端，disable 其 key expiry，加入同一个账号地 tailnet，打洞成功，手机、Mac 和 Windows 均能访问 Macmini；
3. 部署博客：使用 Cloudflare Tunnel，需要一个自己的域名。
4. 所有其他服务用 Docker 起（Mac 上使用轻量替代品客户端 OrbStack，使用 Portainer 管理容器）。需要公网展示的，除博客外均用 OpenFRP。
5. 泰拉瑞亚和 tmodloader 服务器使用 ipv6 直连。

## 启动服务

### Telegram Bot

1. 需要修改源代码，在代码层面加入代理直连。以下代码均改自 https://github.com/TinySnow/telegram-typeseter-bot 的 self-use 分支。改动文件为 main.ts，找准首尾直接粘贴即可。注意代理需要改成自己的。

```typescript
import { SocksProxyAgent } from "socks-proxy-agent";

const token = process.env.BOT_TOKEN;

if (!token) {
      throw new Error("BOT_TOKEN is not set");
}


const targetChatId = -1001782968835;
const chunkLimit = normalizeChunkLen(3820);

const bot = new Bot(token, {
  client: {
    baseFetchConfig: {
      agent: new SocksProxyAgent("socks5h://127.0.0.1:7890"),
    },
  },
});
```

2. 将 package.json 文件中添加 socks-proxy-agent 依赖。

```json
"socks-proxy-agent": "^10.0.0",
```

3. 新建 .env 文件，填入 BOT_TOKEN。

```
BOT_TOKEN=000000000:XXXXXXXXXXXXXXXXXXXXXXXX
```

4. 新建 Dockerfile，用 Orbstack（Mac）或者 Docker Desktop（其他）起 Docker。

```dockerfile
FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache git vim curl

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
```

5. 注意，装 git 是必须的，要拉 typeseter 的核心逻辑，未发布到 npm，直接拉 github。vim 和 curl 是可选的，用于修改文件和测试 url。alpine 的包管理器不是 apt，是 apk 请注意。最后的 CMD 命令其实可以改一下，减少资源占用。
6. 接下来编写 docker-compose.yml 编排容器。

```yaml
services:
  telegram-typeseter-bot:
    build: .
    container_name: telegram-typeseter-bot

    env_file:
      - .env

    restart: unless-stopped
    network_mode: host
```

7. 网络模式要简单的话就像上面这样，直接使用宿主机的网络模式，不通过 docker 的 network 绕。问题会比较少一点。

### n2n 服务端

### UsbEAM Lan Party 服务端

### Minecraft 服务端

### Terraria(Tmodloader)服务端

#### 泰拉瑞亚服务器

1. 直接拉别人制作好的 docker 镜像，写 docker-compose.yml 即可。

```yaml
version: '3'
services:
  terraria-server:
    image: hexlo/terraria-server-docker-arm64:latest
    container_name: terraria
    restart: unless-stopped
    stdin_open: true
    tty: true
    ports:
      - 7777:7777
    volumes:
      - ../../data/terraria/worlds:/root/.local/share/Terraria/Worlds/
    environment:
      - world=/root/.local/share/Terraria/Worlds/tmp.wld
      - autocreate=2
      - worldname=world1
      - difficulty=1
      - maxplayers=8
      - port=7777
      - password=
      - motd="欢迎来到微雪的服务器:)"
```

2. 注意一下挂载的数据卷 volumes 路径，我不确定是否可以往上爬路径，也没有测试是否可以连进服务器。还有下面的 environment 环境变量，这些玩意儿都是可以改的，改成自己需要的即可。
3. 但是听说 terraria 不支持原生的 ipv6，所以也许开了服务器也连不进去。我不知道。
4. **注意这儿拉的镜像是 arm64 的镜像。**

#### tmodloader 服务器

1. 这个玩意儿开起来非常之麻烦，我整了一天。大体上遵循 https://github.com/cubebuc/tmodloader-docker 的结构（找这个东西也找了很久，如果拉官方的 Dockerfile 和 Docker Compose，会遇到各种各样的 amd64 架构和 arm64 架构的问题，还要下什么虚拟机之类的，这是 tmodloader 官方 issue 里面说的，非常、非常麻烦），这个仓库里的 dockerfile 和 compose 文件都是 multi 架构的。
2. 按照里面的 README 说的，要拉他的仓库，但是我看了一下也没有什么别的东西，主要是 Dockerfile 和 Docker Compose 比较重要，就直接抄了。参考了一下这个仓库，下面给出我自己编的两个文件。

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0

ARG TML_VERSION

WORKDIR /app

RUN apt-get update && apt-get install -y unzip && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/tModLoader/tModLoader/releases/download/${TML_VERSION}/tModLoader.zip \
    && unzip tModLoader.zip \
    && rm tModLoader.zip \
    && chmod +x *.sh

RUN chown -R 1001:1001 /app

COPY ./mod /app/mod

EXPOSE 7777

# CMD ["./start-tModLoaderServer.sh", "-savedirectory", "/app/data"]
```

- 大体上按照 cubebuc 的来，我自己加了一点。从微软官方给的 .NET docker 镜像拉，拉完之后用 TML_VERSION 控制版本，不然服务端和客户端版本对不上就进不去。然后就是更新包、拉 tmodloader 官方的 release、解压、建文件夹。我自己最后加了一个把当前路径下的 mod 文件夹拷贝到 /app/mod 文件夹下，先搬到这个文件夹，最后才往 /root/.local/share/Terraria/tModLoader/Mods 文件夹下搬。

```yaml
services:
  tml:
    image: tmodloader
    container_name: tml
    build:
      context: .
      args:
        TML_VERSION: ${TML_VERSION:-v2026.03.3.0}
    restart: unless-stopped
    #user: "1001:1001"
    ports:
      - "7779:7777"
    volumes:
      - ./data:/root/.local/share/Terraria/tModLoader/
    # command: ["./start-tModLoaderServer.sh", "-savedirectory", "/app/data", "-config", "/app/data/serverconfig.txt"]
    stdin_open: true
    tty: true
    networks:
      - homelab        # 加入现有的 homelab 网络
    command: >
      /app/start-tModLoaderServer.sh
      -config /root/.local/share/Terraria/tModLoader/serverconfig.txt

networks:
  homelab:             # 这个是原来的 homelab 网络，保持不动
    external: true
```

- TML_VERSION 参数在 compose 文件里面传入，注意端口映射是宿主机的 7779 端口对应容器的 7777 端口。因为宿主机的 7777 端口已经给 terraria 服务端用了。注意一下挂载的数据卷 volumes 路径。我自己是建立了一个 homelab 网络，如果不需要加入 docker 的这个网络，最外层的 networks 和 services.tml.networks 标签都可以删了不要。最后就是容器起来之后执行 command 里面的开服命令。但是好像没啥用？每次我都是手动进容器执行的。

3. 执行 `docker compose up -d` 起 tml 容器。刚开始起镜像要一段时间拉文件。
4. 起来之后执行 `docker exec -it tml bash` 进容器。

```bash
mv /app/mod/* /root/.local/share/Terraria/tModLoader/Mods/ # 复制 mod 文件到 tml 的真实运行目录
./start-tModLoaderServer.sh # 开启服务器
```

5. 开服过程中会检查有没有 .NET 环境，没有就要从微软那拉，确保网络良好，不然失败就有些头疼了，要拉一段时间。拉完了之后就会问进入哪个世界，启用哪个 mod，到时候按照提示一步步操作就好了。
6. 然后就是客户端开始连接。
7. **确保服务器机器的 Docker Desktop 或者 OrbStack 开启了 ipv6 支持！确保客户端机器开启了 ipv6 支持！**
8. 我爆哭，在这查了一天为啥不通，结果发现是没开 ipv6 这种极其低级的错误。
9. 然后服务器机器 ipconfig 或者 ifconfig 查看 ipv6 公网地址，对于 Mac 来说，一般 en0 里面的 autoconf secured 的地址比较稳定一点。但其实掉电或者强关之后这个地址也会变，所以最好的还是起一个 ddns。推荐 dynv6+ddns-go，都是免费。
10. 找到公网 ipv6 地址，客户端 ip 连接，输入 ip 和端口号（对于上面的 compose 文件是 7779 端口），连进去就可以。
11. 注意
    - tmodloader 配的 mod 最好有 ipv6 支持模组，我个人是配了 IPv6Remapper 模组（Steam mod ID：3604655108），搜 ipv6 就能搜到。我不知道不配 ipv6 支持模组能不能进服务器，反正配了是能进服务器的。
    - 如果半天拉不下来文件的话，可以给 docker desktop 或者 orbstack 配镜像和代理。
    - **需要客户端机器的路由器也启用 ipv6，不然有可能被路由器防火墙拦在外面**


### 部署博客

1. 采用 Cloudflare Tunnel 方案
   - 还有备选方案
   - Cloudflare Pages，已有： https://tinysnow.pages.dev, https://telegram-tinysnow.pages.dev
   - AtomGit，现在好像没有 Pages 了
   - Coding Pages，不允许新增，现在不让用了
   - Netlify，已有：https://tinysnow.netlify.app/
   - EdgeOne Pages，要备案，好像有时间限制，部署后 3 小时，可以试试 https://tiny-snow-blog.zh-cn.edgeone.cool
   - Vercel，已有：https://tinysnow.vercel.app 或者 https://tinysnowblog.vercel.app
2. 暂未开始，也不知道到底需不需要，毕竟用这个方案还要买域名花钱呢，目前来看延迟最低的是 netlify，可以将就着用

### DDNS

1. brew install ddns-go，安装 ddns-go，然后去 dynv6.com 申请一个免费的 v6 域名
2. sudo ddns-go -s install，安装为系统服务，然后访问 http://localhost:9876，DNS 供应商选择 dynv6，注册好域名后，将 dynv6 里面 zone 下 instructions 里 ddclient 的 password 值，填入 ddns-go 里面的 token。
3. 启用 ipv6，然后选择网卡获取 ip，其他全部默认，保存即可。

## 感谢

- 感谢三幻神 Chatgpt Claude Gemini 出主意，Deepseek 也帮了很大忙，就不贴对话记录了。