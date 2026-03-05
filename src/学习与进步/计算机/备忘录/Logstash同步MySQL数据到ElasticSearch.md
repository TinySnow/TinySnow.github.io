# Logstash 同步 MySQL 数据到 Elastic Search

## 环境准备

1. 下载 Logstash 并解压
2. 下载 Elastic Search 并启动，参见 [Elastic Search 启用](https://tinysnow.github.io/技术/实践记录/ElasticSearch启用.html)
3. 需要下载 MySQL Java Connector 到一个特定目录，路径后续会用到

## 启动

- 需要提前启动 Elastic Search 和 MySQL

  - 因为 MySQL 服务一直挂在后台，所以其实可以不用管
  - 但 Elastic Search 需要提前启动

- 其实可以直接启动，但是会报 `pipelines.yml` 找不到工作流的错误

  ```bash
  # 省略一些 INFO 日志，来到报错行
  ERROR: Pipelines YAML file is empty. Location: <path>/pipelines.yml
  ```

- 所以下一步配置工作流

## 配置 pipelines.yml

```yaml
- pipeline.id: test
  path.config: "config/mysql.conf"
```

- 将给出的例子取消注释
  - id 随便取名，只适用于区分工作流的名字
  - 指明该 config 的位置
- 注意，此处的 config 的相对路径以 `logstash-<version>` 为根目录，所以需要加上 config 路径
  - 即直接在 `pipelines.yml` 所在目录下新建 `mysql.conf`

## 配置 mysql.conf

- 观察到同级目录下还有一个 `logstash-sample.conf`
  - 此为配置的模板文件，复制粘贴其格式即可
- 配置自己所需要的 `mysql.conf`

```ruby
# Sample Logstash configuration for creating a simple
# Beats -> Logstash -> Elasticsearch pipeline.

input {
  stdin {}
  jdbc {
    # 区别 jdbc 的类型，在下面 output 的时候做判断
    type => "user"
    # 数据库连接地址，数据库需要修改
    jdbc_connection_string => "jdbc:mysql://127.0.0.1:3306/<database>?characterEncoding=UTF-8"
    # 数据库账号密码
    jdbc_user => "root"
    jdbc_password => "password"
    # MySQL Connector 依赖包路径，相对路径没成功，所以这里笔者用的绝对路径
    jdbc_driver_library => "<path_to_connector>"
    # Driver Class 名字，跟普通 JDBC 相同
    jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
    # 跟 statement_filepath 二选一配置，说明在下方
    statement => "SELECT * FROM user"
    ###################### 以下配置选择性添加 #############################
    # 数据库重连尝试次数
    connection_retry_attempts => "3"
    # 判断数据库连接是否可用，默认 false
    jdbc_validate_connection => "true"
    # 数据库连接可用校验超时时间
    jdbc_validation_timeout => "3600"
    # 开启分页查询，默认 false
    jdbc_paging_enabled => "true"
    # 单次分页查询条数，默认 100000，若字段较多且更新频率较高，建议调低
    jdbc_page_size => "500"
    # 是否将字段名转换为小写，默认 true（如果有数据序列化、反序列化需求，建议改为 false）
    lowercase_column_names => false
    # SQL 日志级别，默认 info
    sql_log_level => warn
  }
}

output {
  if [type] == "user" {
    elasticsearch {
      hosts => ["http://localhost:9200"]
      index => "user"
      # 数据唯一索引，建议使用数据库的主键
      # 此处 id 更改为该数据库表的主键名
      document_id => "%{id}"
    }
  }
}

```

- 说明
  - 现根据 jdbc 配置连接数据库，所以 username, password, driver class, driver library 需要正确
  - 然后执行设置的 statement，或者 statement_filepath 里面的 SQL 语句
  - 将执行结果输出到 logstash 进行下一步 filter 清洗（此处没有设置 filter）
  - 最后根据 jdbc 设置的 type 选择性输出到某一数据库

## 再启动

- 再启动即可看到数据导入的日志：

```bash
[2023-03-10T22:17:18,147][WARN ][logstash.inputs.jdbc     ][test][36d9eb008791f9c7d7369939a04c776115306dd4587ac6b11cef2da0d3147fda] (0.018373s) SELECT * FROM (SELECT * FROM user) AS `t1` LIMIT 500 OFFSET 0
```

- 根据这些日志也可以反推出流程（特别是里面的子查询，很显眼）

## 检查数据

- 如果不放心可以进 kibana 或者 发送一个请求 查看结果

- ```bash
  # 建议 MySQL 的每一张表都独立成一个 index，所以需要替换
  # 对于上面的例子，替换成 user 即可
  curl GET http://localhost:9200/<index>/_search
  ```

- 如果 total 里的条数和 MySQL 当中数据条数一致，就已经成功了