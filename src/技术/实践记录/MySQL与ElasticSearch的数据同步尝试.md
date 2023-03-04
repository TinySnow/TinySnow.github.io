# MySQL 与 Elastic Search 的数据同步尝试

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

## 步骤

1. 开启 MySQL binlog，此处使用 MySQL 8.0 (Windows)

   - 找到 `my.ini`
   
   - 添加内容
   
  ```ini
     
     ```
   
   - 后续会迁移到 Docker 上



## 注意事项