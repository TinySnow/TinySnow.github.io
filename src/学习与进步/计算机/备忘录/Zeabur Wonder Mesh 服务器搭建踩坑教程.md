# Zeabur Wonder Mesh 服务器搭建踩坑教程

## Lima 虚拟机

- 用他们的命令在 Macmini 上起一个 Lima 虚拟机，模拟 Linux。如果下载太慢的话可能需要加代理。

```bash
http_proxy=http://127.0.0.1:7890 https_proxy=http://127.0.0.1:7890 ALL_PROXY=http://127.0.0.1:7890 bash <(curl -fsSL -x http://127.0.0.1:7890 'https://api.zeabur.com/mesh-server/install.sh?token=<token>')
```

## 部署服务

- 建项目，建服务，此处以博客为例
- Zeabur 的构建和部署分别在两台机器上运行
 - 构建在他们的机器上，是 amd64 架构
 - 部署是在自己的 Macmini 上，是 arm64 架构
- 使用默认配置，构建能够成功，但部署一定出现 bin format 错误
- 必须修改其默认的 dockerfile，强行指定其 platform

```dockerfile
FROM --platform=linux/arm64 caddy:alpine
COPY . /usr/share/caddy
```

- 重新部署，运行

## 绑定域名的问题

- 目前 Wonder Mesh 服务器搞域名还是要一台公网服务器，而且也没办法使内网的这些服务暴露到公网，所以上面基本上都是做的无用功……