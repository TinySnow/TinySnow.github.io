# MySQL 相关

## MySQL 8.0 Windows `My.ini` 文件位置

- 打开命令行，输入 `echo %PROGRAMDATA%`
- MySQL 会首先查找 `%PROGRAMDATA%\MySQL\MySQL Server 5.6\my.ini` 文件
- 一般 `%PROGRAMDATA%` 为 `C:\ProgramData`，而此文件夹是隐藏的，需要打开查看隐藏文件选项
- 编辑即可

## 开启 binlog

1. 找到 `my.ini` 文件
2. 添加如下配置

```bash
# binlog 名称，随便取名
log-bin="MYSQL-bin"
# binlog 格式，可选 STATEMENT，ROW 或者 MIXED
# 对于 canal 只能选择 ROW
binlog-format=ROW
# 有关 replication，需要定义
# 不能与从机的 slaveId 相同
server_id=1
```

3. 重启 MySQL

