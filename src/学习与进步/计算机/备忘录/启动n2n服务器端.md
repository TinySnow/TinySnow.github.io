# 启动 n2n 服务器端

## 安装

### 项目地址

- https://github.com/ntop/n2n/

### 方式一：拉源码自己编译

```
git clone https://github.com/ntop/n2n.git
cd n2n 
./autogen.sh
./configure
make

# optionally install
make install
```

### 方式二：直接下 release

- 命令为 debian 系

```
wget https://github.com/ntop/n2n/releases/download/3.0/n2n_3.0.0-1038_amd64.deb
sudo dpkg -i n2n_3.0.0-1038_amd64.deb
```

## 启动

- 进入 n2n 目录，启动即可，有兴趣可以看看命令参数

```
sudo ./supernode -p 9527 -f
```

