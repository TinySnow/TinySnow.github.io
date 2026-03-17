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

  1. 比如之前是这样的：

    ```
    drwxr-xr-x+ 1 tinysnow tinysnow   74 2024年11月18日 .
    drwx------+ 1 tinysnow tinysnow  866 2025年 1月 8日 ..
    -rw-r--r--+ 1 tinysnow tinysnow  234 2023年11月13日 docker-compose.yml
    drwxr-xr-x+ 1   165533   165532  144 2023年11月13日 lan-party
    -rw-r--r--+ 1 tinysnow tinysnow 7022 2023年11月13日 server.zip
    ```

  2. 这个时候需要 `sudo chown -R tinysnow:tinysnow lan-party/` 改成这样：

    ```
    drwxr-xr-x+ 1 tinysnow tinysnow   74 2024年11月18日 .
    drwx------+ 1 tinysnow tinysnow  866 2025年 1月 8日 ..
    -rw-r--r--+ 1 tinysnow tinysnow  234 2023年11月13日 docker-compose.yml
    drwxr-xr-x+ 1 tinysnow tinysnow  144 2023年11月13日 lan-party
    -rw-r--r--+ 1 tinysnow tinysnow 7022 2023年11月13日 server.zip
    ```

  3. 然后再 `podman ps -all` 看看起不起得来（一般来说不用上面这种复杂操作，用官方给的命令就能起来），如果还是 up 一段时间之后退了，或者压根儿 up 不起来，那就可能需要另找原因了

  4. **如果是 ArchLinux 的话，说不定滚一下包就好了**
  
  5. 如果实在还不行的话，就只有上 `lan-party.container` 了
  
  6. ```
     [Unit]
     Description=UsbEAm LAN Party Server
     
     # Specify the dependencies
     Wants=network-online.target
     After=network-online.target nss-lookup.target
     
     [Container]
     ContainerName=lan-party
     Image=nouko61/usbeam-lan-party:latest
     
     # Enable auto-update container
     # AutoUpdate=registry
     
     Volume=/home/test/lan-party:/lan-party/data
     
     PublishPort=3075:3075/tcp
     PublishPort=3074:3074/udp
     
     AddCapability=NET_ADMIN
     AddDevice=/dev/net/tun
     
     [Service]
     Restart=on-failure
     
     # Extend Timeout to allow time to pull the image
     TimeoutStartSec=300
     
     # The [Install] section allows enabling the generated service.
     [Install]
     WantedBy=default.target
     ```
  
  7. 记得改一下里面 Volume 的映射目录，只改前面的，后面的是容器内的。
  
  8. 改完之后把整个 `lan-party.container` 放在 `~/.config/containers/systemd/` 下，然后用 `systemctl --user start lan-party.container` 启动，停止的话把 start 改成 stop 就行了，删除改成 rm 就行。
  
  

