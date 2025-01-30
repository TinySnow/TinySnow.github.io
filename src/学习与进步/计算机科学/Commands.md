# Commands

## Docker

- 删除所有容器

```bash
sudo docker stop $(sudo docker ps -a -q) && sudo docker rm $(sudo docker ps -a -q)
```

## Node

- 安装 

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```

## Git

- clone 加速

```bash
git clone -c http.proxy="http://127.0.0.1:7890" <repo_https_address>
cd <repo>
git remote set-url origin <repo_git_address>
```

- 删除远程分支

```bash
git push origin --delete [remote_branch_name]
```

## Rust

- Rust 和 Cargo 升级

```bash
rustup update
```

- mdbook 修改端口号

```bash
mdbook serve --open --port <port>
```

## Linux

### General

- 修改用户密码

```bash
sudo passwd <user>
```

### Distribution

#### Ubuntu

- 显示已安装的软件包

```bash
sudo apt list --installed
```

- 切换 JDK 版本

```bash
update-alternatives --config java
```

#### Arch Linux

