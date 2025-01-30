# SpringBoot 项目搭建基本流程

## 模块

  - 一般有 Lombok,   Spring Security,   Spring Web,   MySQL Driver；
  - 可选有 Spring Data Reactive Redis,   Thymeleaf 等；
- 删除 .mvn,   HELP.md,   .gitignore,   mvnw,   mvnw.cmd；
- 删除 application.properties ，换成 application.yml ；
  - 根据自己实际情况添加 application 包，在里面添加 application-XXXXX.yml 文件；
  - 一般会有开发 (dev), 测试 (test), 上线 (prod)；
  - 其他根据自己另行添加，如 mybatis, druid, security；

- 在 pom.xml 文件里添加上如下常用依赖，并同步 Maven ；

```xml
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.23</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.23</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.62</version>
        </dependency>
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.5</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.3</version>
        </dependency>
```

## IDEA 侧栏连接数据库

- 在 application-dev.yml 里面加上数据库连接的代码，以 mysql 为例：

```yaml
spring:
  datasource:
    username: root
    password: tinysnow;
    url: jdbc:mysql://localhost:3306/?useUnicode=true
      &characterEncoding=utf-8&allowPublicKeyRetrieval=true&useSSL=false
    driver-class-name: com.mysql.cj.jdbc.Driver
```

- 在项目目录下 (com.tinysnow.xxxxxx) 下建包 bean , service , controller , dao , config , utils , mapper 等，在 resources 路径下建立 mappers 包，准备整合 mybatis ；
- 启动和测试；

## Druid 数据库连接池相关

- 开始使用

```yaml
# 注意空格 也可以将这个另开一个配置文件编写，例如 application-druid.yml
# 另外编写则需要在主配置文件中激活，激活方式如下：
#spring: 
#  profiles:
#    active: druid,mybatis
spring: 
  datasuorce: 
    type: com.alibaba.druid.pool.DruidDataSource
```

- 在 Test 类里面加上以下内容看是否输出 ` class com.alibaba.druid.pool.DruidDataSource `

```java
@Autowired
DataSource dataSource;

@Test
void contextLoads() {
    System.out.println(dataSource.getClass());
}
```

## Druid 额外参考配置

```yaml
# 注意，以下所有配置均需要在 druid: 下一级编写，即
#spring: 
#  datasuorce:
#    druid: 
initialSize: 5
minIdle: 5
maxActive: 20
maxWait: 60000
timeBetweenEvictionRunsMillis: 60000
minEvictableIdleTimeMillis: 300000
testWhileIdle: true
testOnBorrow: false
testOnReturn: false
poolPreparedStatements: true
maxOpenPreparedStatements: 20
asyncInit: true

# 配置监控统计拦截的 filters ： stat:监控统计、log4j:日志记录、wall:防御sql注入
# 如果允许时报错 java.lang.ClassNotFoundException: org.apache.log4j.Priority
# 则导入 log4j 依赖即可， Maven 地址: https://mvnrepository.com/artifact/log4j/log4j

filters: stat,wall,log4j
MaxPoolPreparedStatementPerConnectionSize: 20
useGlobalDataSourceStat: true
connectionProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=500
```

## Mybatis 相关

- 建立 application-mybatis.yml 配置文件，内容如下，可拓展：

```yaml
mybatis:
  # 此路径为编写的 xml 文件的路径
  mapper-locations: classpath:mybatis/mappers/*.xml
  # 实体类的别名包设置
  type-aliases-package: com.tinysnow.bean
```

- 在 resources 目录下建立 mybatis/mappers 包
- 在该包下编写实际操作数据库的 xml 代码
- 在主启动类上面加上注解 `@MapperScan("com.tinysnow.mapper")` 括号里为 mybatis 的操作接口的路径
- 在该路径下建立操作接口，并在每个接口上面添加 `@Repository` 注解，使其被 Spring 托管

