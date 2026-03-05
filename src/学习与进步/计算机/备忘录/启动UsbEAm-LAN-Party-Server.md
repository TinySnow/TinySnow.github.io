# 启动 UsbEAm-LAN-Party-Server

## 项目地址

- https://github.com/Nouko61/UsbEAm-LAN-Party-Server

## 启动

- 根据里面的方法一步一步来即可，建议使用 docker 或者 docker-compose
- 注意如果是 Arch Linux，docker 可能需要换成 podman，命令也就会变成下面这样，命令除了最前面，其他都不变

```
podman run -d --restart=always --device=/dev/net/tun --cap-add=NET_ADMIN -v ./lan-party:/lan-party/data -p 3075:3075/tcp -p 3074:3074/udp --name=lan-party nouko61/usbeam-lan-party
```

- 如果一直 up 不起来，检查一下文件所有者是不是自己，有可能不是，需要改回来

  - 比如之前是这样的：

    ```
    drwxr-xr-x+ 1 tinysnow tinysnow   74 2024年11月18日 .
    drwx------+ 1 tinysnow tinysnow  866 2025年 1月 8日 ..
    -rw-r--r--+ 1 tinysnow tinysnow  234 2023年11月13日 docker-compose.yml
    drwxr-xr-x+ 1   165533   165532  144 2023年11月13日 lan-party
    -rw-r--r--+ 1 tinysnow tinysnow 7022 2023年11月13日 server.zip
    ```

  - 这个时候需要 `sudo chown -R tinysnow:tinysnow lan-party/` 改成这样：

    ```
    drwxr-xr-x+ 1 tinysnow tinysnow   74 2024年11月18日 .
    drwx------+ 1 tinysnow tinysnow  866 2025年 1月 8日 ..
    -rw-r--r--+ 1 tinysnow tinysnow  234 2023年11月13日 docker-compose.yml
    drwxr-xr-x+ 1 tinysnow tinysnow  144 2023年11月13日 lan-party
    -rw-r--r--+ 1 tinysnow tinysnow 7022 2023年11月13日 server.zip
    ```

  - 然后再 `podman ps -all` 看看起不起得来，如果还是 up 一段时间之后退了，或者压根儿 up 不起来，那就可能需要另找原因了

  

