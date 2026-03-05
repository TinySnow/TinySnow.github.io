《# MySQL 与 Elastic Search 的数据同步尝试

## 起因

1. 毕业设计想要集成一个搜索引擎
2. MySQL 语句为正向搜索，效率低，不精准
3. 考虑技术选型，决定使用 Elastic Search 倒排搜索
4. 然后出现问题：Elastic Search 和 MySQL 之间的数据同步
5. MySQL 为上游源（生产者），Elastic Search 为下游（消费者）
6. 考虑两种方案：全量同步和增量同步
7. 决定使用增量同步
8. 增量同步目前流行方案为 Canal

## 原理

- Canal 伪装成 MySQL slave 从机，订阅 master MySQL 的 binlog，然后重放到 Elastic Search 数据库中

## 前置准备

- 参照 Canal [官方文档](https://github.com/alibaba/canal/wiki/QuickStart)

1. 下载 canal-example, canal-adapter, canal-deployer, canal-admin 四个压缩包并到对应文件夹解压

   - 建议专门建立一个编程环境的文件夹 environment

2. 开启 MySQL binlog，此处使用 MySQL 8.0

   - 找到 `my.ini`
   - 添加内容

     ```ini
     
       [mysqld]
       log-bin=mysql-bin # 开启 binlog
       binlog-format=ROW # 选择 ROW 模式
       server_id=1 # 配置 MySQL replaction 需要定义，不要和 canal 的 slaveId 重复
     
     ```
   
   - 注意，如果下载的 MySQL 8.0 以上可以不用配置，因为默认开启
   - 可以通过 `show variables like '%log%'` 查看
   - 配置文件位置
   
     - Windows：一般为 `C:\ProgramData\MySQL\MySQL Server 5.6\my.ini`
     - Ubuntu：一般为 `/etc/mysql/mysql.conf.d/mysqld.cnf`

   - 后续会迁移到 Docker 上

3. 配置数据库用户并授权

   - 按官方文档创建一个 `canal` 的用户，密码也为 `canal`
   
     ```sql
     
       CREATE USER canal IDENTIFIED BY 'canal';  
       GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'canal'@'%';
       -- GRANT ALL PRIVILEGES ON *.* TO 'canal'@'%' ;
       FLUSH PRIVILEGES;
     
     ```

4. 配置 canal-deployer

   - 打开 `conf/example` 文件夹，修改 `instance.properties`
   
     ```properties
     
       # position info
       canal.instance.master.address=127.0.0.1:3306
     
       # username/password
       canal.instance.dbUsername=root
       canal.instance.dbPassword=
     
     ```

   - 修改主机数据库地址和数据库用户名密码
   
      - 此处的密码是需要连接到主机数据库的用户名和密码
      - 不是 `canal` 此数据库用户的用户名和密码
      
   - 其他配置项暂时不用管

5. 开启 canal-deployer

   - 进入 `bin` 目录开启 `startup.bat`(Windows) 或 `startup.sh`(Linux) 即可
   - 查看日志是否启动成功
   - 日志一般在 `logs` 文件夹
   
      - `canal` 文件夹存放 canal 主服务器启动和停止的日志
      - 其他文件夹记录该 instance 的 binlog 变动
   
   - 注意，如果没有日志，或者日志报错不能启动，修改对应出错代码即可
   
      - 因此处使用 JDK17 所以有些 java options 不支持
      - 报错信息：`canal Unrecognized VM option 'AggressiveOpts'`
      - 在 `startup.bat`(Windows) 或 `startup.sh`(Linux) 删除 ` -XX:+AggressiveOpts` 即可
      
          - 需要能看懂 bash 脚本，或者直接 \<C-h\> 搜索也可以

## 使用 canal-example 

### 原因

- 首先使用 example 观察是否能够成功运行和消费 binlog
- 小步前进，成功后再使用更复杂的 adapter

### 步骤

1. canal-example 的配置文件不用改，可以直接运行 `startup.bat`(Windows) 或 `startup.sh`(Linux)

   - conf 文件夹不要动
   
2. 如果开启之后 logs 文件夹没有文件，说明 example 没有运行

3. 错误日志就在 `bin` 文件夹下面的 `nohup.out` 文件里面

   - 如果是 JDK17，也需要对应修改 `startup.bat`(Windows) 或 `startup.sh`(Linux)，详情参照[前置准备](#前置准备)第五步


4. 修改完成之后再启动，即可在 logs 文件夹里观察到 example 的消费记录

## 使用 canal-adapter

1. 前置准备，参照 [Elastic Search 启用](https://tinysnow.github.io/技术/实践记录/ElasticSearch启用.html)

2. 配置 application.yml

   - srcDataSources 取消注释，改为自己的数据库信息
   
      - url 也要改
      - 如果有兴趣，也可以把 defaultDS 这个名字替换成任意名字，然后同步更改相应 es 文件夹里每一个 dataSourceKey 即可
      
   - 注释 `- name: logger`
   - 取消注释 es，并把 name 改为 es6 或者 es7，一定要改

3. 配置对应 es 文件夹的每个 yml 文件

## 注意事项



























