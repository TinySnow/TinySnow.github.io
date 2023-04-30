# Docker 命令

- 删除所有容器
  - `sudo docker stop $(sudo docker ps -a -q) && sudo docker rm $(sudo docker ps -a -q)`
- 安装 node
  - `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`
