# RustDesk 搭建踩坑记录

## 前提条件

- 使用 Macmini（Apple Silicon） 作为服务器（也就是 ARM64 架构）
- 有科学上网工具（常年开 TUN 模式加速终端工具下载）
- 有洁癖，所以使用 Docker 作为容器起 RustDesk 服务
- 没有公网 IPv4，所以只在 dynv6 随便申请了一个 v6 域名，用 ddns-go 绑定了 ddns，以后都用域名访问

## 过程

- Windows，Android，Macmini，Macbook Air，iPad 在官网各自下载对应架构的 Release 包
- Macmini 建文件夹，编写 Docker Compose 起 Docker
  - 注意，这个 Docker Compose 很关键，后面出大量的问题都是因为这个 Compose
  - 我也不知道为什么在 Mac 上面，`network_mode: host` 不管用，必须要 `bridge`
    - 听说是因为 Mac 上面的 Docker 中间套了一层 Linux 虚拟机
    - 所以 host 网络其实不是 Mac 本身的网络，而是 Linux 虚拟机的网络
    - 感觉非常搞人
  - 下面的三行 `networks` 及其子模块都可以不加，这是我自己定义的一个 docker 网络，是个性化配置，挂载的 `volumes` 看自己喜好加在哪儿，`../../data/rustdesk:/root` 中的前面是宿主机外部目录，可以随便改，后面这个是容器内部目录，一般就不要改了，详细参见 RustDesk 官方文档
  - `environment` 标签是带入 `始终使用中继服务器` 的环境变量，据说这样可以避免 ID 服务器识别复杂 NAT 环境失败的情况

```yaml
# ======================================
# RustDesk 远程桌面服务器
# ======================================
# 包含两个容器:
#   hbbs - RustDesk ID/Rendezvous 服务器 (客户端发现 + NAT 类型检测)
#   hbbr - RustDesk Relay 服务器 (P2P 失败时的中继转发)
#
# 架构:
#   客户端 → hbbs (ID 注册,获取对方地址,NAT 穿透)
#   客户端 ↔️ hbbr (P2P 失败时走中继转发流量)
#
# 访问: 客户端 ID 服务器/中继服务器均填写 <domain>
#
# 端口说明:
#   21115/tcp - hbbs NAT 类型测试
#   21116/tcp - hbbs TCP 打洞 + 连接
#   21116/udp - hbbs ID 注册 + 心跳
#   21117/tcp - hbbr 中继转发
#   21118/tcp - hbbs WebSocket (Web 客户端支持)
#   21119/tcp - hbbr WebSocket (Web 客户端支持)
#
# 数据: 持久化密钥和配置到 data/rustdesk/
# =====================================
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs -r <domain>:<port>
    environment:
      - ALWAYS_USE_RELAY=Y
    volumes:
      - ../../data/rustdesk:/root
    ports:
      - "21115:21115/tcp"
      - "21116:21116/tcp"
      - "21116:21116/udp"
      - "21118:21118/tcp"
    # network_mode: host
    restart: unless-stopped
    networks:
      - homelab

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ../../data/rustdesk:/root
    ports:
      - "21117:21117/tcp"
      - "21119:21119/tcp"
    # network_mode: host
    restart: unless-stopped
    networks:
      - homelab

networks:
  homelab:
    external: true
```

- 然后起 Docker 服务器，编辑其他客户端的配置

```bash
docker compose down
docker compose up -d --build
```

- 网络 -> ID/中继服务器，Key 中填写起完 Docker 挂载的数据卷中的 `id_ed25519.pub` 中的公钥值

```console
ID 服务器：<domain>:<port>      # 一般来说端口是 21116
中继服务器：<domain>:<port>      # 一般来说端口是 21117
API 服务器：留空
Key：<Key>
```

- 一般来讲，流程就到这里就结束了
- 然而接下来是几个非常巨大的坑

## 注意事项

- 中继服务器（此处是 Macmini）本身
  1. 不作为被控端的话
     - 中继服务器本身不用下载客户端，也不用改客户端网络模块里面的配置
     - 按理来说应该是这样，但未经测试
  2. 也要作为被控端的话
     - 需要下载客户端，并且修改客户端里网络模块的配置
     - 并且，**网络模块的配置必须跟其他客户端一致**，不能把 `<domain>` 写成 `localhost` 或者 `127.0.0.1` 的环回地址，不然另外一个客户端连接进来，用的外网地址，中继服务器本身的客户端一比对、发包，用的是内网地址，两个客户端永远都连接不上
     - 但是家庭宽带（专线和企业不知道，知道的人也不会看这篇文章），遇到“自身访问一个域名，域名又指向自身”、“绕了一圈回来又敲自家门”的情况，光猫或者路由器会直接丢包（不知道为啥，也许是会引起类似广播风暴这种东西？）
     - 所以如果要作为被控的话，必须在中继服务器本身的 hosts 中加入 `localhost <domain>`(IPv4) 和 `::1 <domain>`(IPv6) 这两项，让这个机器误以为访问了域名，但实际上从系统层面就又指回来了，根本没有过光猫或者路由器
     - 只有这样才能完成：1. 两个客户端配置比对一致；2. 同时能够收到数据包，这两个目标
- 关于科学上网工具
  - 如果梯子本身不支持转发 IPv6 流量的话，那就必须把梯子关了
  - TUN 模式下虚拟网卡会承接所有数据包，为了避免远程桌面数据包，因为配置不当而被转发到梯子的服务器，所以建议关闭 TUN
  - 所以在连接两个客户端的时候，建议直接把梯子关了，什么都不要开