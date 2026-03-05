# JDBC 连接数据库驱动常用写法

```properties
jdbc.driver = com.mysql.cj.jdbc.Driver
jdbc.url = jdbc:mysql://localhost:3306/\
  ?useUnicode=true&characterEncoding=UTF-8\
  &serverTimezone=Asia/Shanghai&useSSL=false\
  &allowPublicKeyRetrieval=true
jdbc.username = root
jdbc.password = 
```