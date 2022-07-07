# WingStudio第三轮项目途中报错及解决方案

# 请遵循一步一测试的原则，否则后续定位错误极其麻烦！！！

## 一、sql驱动连接不上，抛出 ClassNotFoundException

解决方案：

检查sql驱动版本与所装sql版本是否一致。

## 二、 MyBatis 加载全局配置文件时出错

解决方案：

全局配置文件的路径应使用 `com/tinysnow/easyvote/conf/xml/mybatis-config.xml` 这种斜杠方式而非 . 的方式。

## 三、 MyBatis 不能加载 properties 配置文件

报错如下： ` Cause: org.apache.ibatis.builder.BuilderException: Error parsing SQL Mapper Configuration. Cause: java.io.IOException: Could not find resource mysql-connection.properties `

解决方案：

应使用全局的路径 `com/tinysnow/easyvote/conf/mysql-connection.properties` 结果正确。

## 四、 MyBatis 不能加载 Mappers 中的 spl 映射配置文件

解决方案：

路径错了，以及没有使用 / 表示法，而使用 . 的表示法。

## 五、 绑定数据库两个异常的解决办法

第一个：`Type interface **************************** is not known to the MapperRegistry.`

译文：MapperRegistry不知道类型接口com.tinysnow.easyvote.dao.intrfc.JdbcMethods。

第二个：`Invalid bound statement (not found): ***********************.`

译文：无效的绑定语句（未找到）：com.tinysnow.easyvote.dao.intrfc.JdbcMethods.insertUser。

解决方案：

映射文件里面的 namespace 路径应该用 . 号，而非 / 或 \ ，路径的最后也不要带上文件后缀名，否则将认为文件后缀名所带的 . 号认为是下一个目标路径。并且在配置诸如   等的标签的时候，里面不要配置 databaseId 。 虽说不清楚啥原理，但这么改就好了。

## 六、关于使用 Maven 管理依赖中 Mybatis 报错问题

引入 properties 文件后在测试方法中测试最基础的 Mybatis 启动报错，两个异常如下：

```bash
Cause: java.lang.NullPointerException
 at MyBatisStartTest.main(MyBatisStartTest.java:14)
```

```bash
java.io.IOException: Could not find resource /mybatis-config.xml
 at MyBatisStartTest.main(MyBatisStartTest.java:14)
```

解决方案：

1. 资源文件统一扔在 resources 目录下面；
2. 测试方法中的路径字符串 ` String resource = "mybatis-config.xml";` 路径一定要正确，最保险的方法是使用 IDEA 的 copy -> path from source root ；
3. 最重要的，报 NullPointerException 的原因是 mybatis-config.xml 文件中没有配置 environment 标签，一定要加上如下的代码，否则找死找不到，连接不到数据库。里面的数据库驱动标签什么的按实际情况配置。

```xml
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
```

另，数据库驱动是使用 properties 标签引进来的。

```xml
<properties resource="database.properties">
</properties>
```


## 七、关于在 try 块中定义资源导致无法编译的问题

解决方案：

1. 进入 idea -> File -> Settings -> Build, Execution, Deployment -> Compiler -> Java Compiler -> 选择项目旁边的 Target bytecode version -> 改成8
2. 进入  idea -> File -> Project Structure -> Modules -> Language Level -> 改成 Project default

## 八、注意：数据库连接问题，有坑

连接上数据库是没有指定数据库名的，所以在写 sql 语句的时候需要先指定数据库名，然后是表名，用句点连接。比如： select * from user.userinfo where id = #{id}

## 九、关于 MyBatis 中 Mapper 文件中 sql 语句执行正确不报异常，但是数据表中看不见执行结果的现象

解决方案：

在编写的测试方法里面 `SqlSession session = build.openSession()` session 更新完 sql 是不自动提交的，一定要切记。需要加上如下语句：

```java
session.commit();
```

## 十、关于 SpringBoot 启动时的报错

报错如下：

```bash
Description:

Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configured.
Reason: Failed to determine a suitable driver class


Action:

Consider the following:
 If you want an embedded database (H2, HSQL or Derby), please put it on the classpath.
 If you have database settings to be loaded from a particular profile you may need to activate it (no profiles are currently active).
```

解决方案：

在 application.yml / application.properties 中添加数据库的相关设置：

```yaml
spring:
  datasource:
    username: root
    password: tinysnow;
    url: jdbc:mysql://localhost:3306/?useUnicode=true
      &characterEncoding=utf-8&allowPublicKeyRetrieval=true&useSSL=false
    driver-class-name: com.mysql.cj.jdbc.Driver
```

特别注意： url 下面第二行前面的空格一定不能省略。

## 十一、关于 MyBatis 在 SpringBoot 中找不到绑定文件的错误

新建了一个 application-mybatis.yml 配置文件如下：（配置文件的文件名一定要是 application- .yml的形式）

```yaml
mybatis:
  mapper-locations: classpath:mybatis/mappers/*.xml
  type-aliases-package: com.tinysnow.bean
```

然后一定不要忘记去主 application.yml 配置文件中激活！

```yaml
spring: 
  profiles:
    active: druid,mybatis
# 激活时只用写 application- 后面的单词
```

## 十二、 SpringBoot 启动时报错

异常如下：

```java
java.lang.IllegalStateException: dbType not support : null, url null
```

解决方案，在 druid 配置文件中的 prefix 后缀中去掉 druid ，只保留 spring.datasource 。启动正常。

- druid 配置文件与 spring 配置文件的双向绑定：

```java
@Configuration
public class DruidConfig {

    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DataSource druidDataSource(){
        return new DruidDataSource();
    }

    @Bean
    public ServletRegistrationBean servletRegistrationBean(){
        final ServletRegistrationBean bean =
                new ServletRegistrationBean(new StatViewServlet(), "/druid/*");
        // 后台需要有人登录，配置账号和密码
        final HashMap hashMap = new HashMap();
        // 增加配置
        hashMap.put("loginUsername","admin");
        hashMap.put("loginPassword","123456");
        // 允许谁可以访问, Value 不写就默认所有主机都可以访问
        hashMap.put("allow","");
        // 还可以禁止谁能访问，此时的 Key 就是自定义的， Value 指定 ip 地址
        // 例如 hashMap.put("tinysnow","192.168.3.7");

        // 设置初始化参数
        bean.setInitParameters(hashMap);
        return bean;
    }
}
```

注意：这些注解一个都不能少


## 十三、关于每次启动项目总是跳出登陆页面的问题

如下图所示：


解决方案：这是 SpringSecurity 的特性，登录的用户名默认是 user ，密码默认是控制台输出的一大串字符，也可以自己设置，凡是具体设置流程暂未关心。

## 十四、关于 MyBatis 查询返回结果过多的问题

异常：

```java
TooManyResultsException: Expected one result (or null) to be returned by selectOne(), but found: *
```

解决方案：

将接口中的返回值类型改为 List 即可。

## 十五、关于 MyBatis 查询结果为 null 的问题

解决方案：

实体类(pojo, bean, modal...)中的字段名一定要与数据库中的一一对应，否则查询不出结果。现有松耦合的方法可以使数据库中的名字不与实体类中的一一对应。通过以下方式开启：

```yaml
mybatis:
  configuration:
    # 自动开启数据库下划线命名 与 实体类中驼峰命名法的匹配
    # 以达到双方命名均规范的目的
    map-underscore-to-camel-case: true
```

## 十六、关于 git 各种命令都无效的问题

解决方案：

看看自己是在哪个目录下进行操作的，千万不要 cd 错了目录。

## 十七、关于修改 IDEA 中数据表的各项属性不能成功的问题

解决方案：

在右侧栏 Database 中选中数据表右键 Modify Table 或者按下 Ctrl+F6 在该栏里面修改数据表才算成功。选中数据表点击最上面的笔，修改代码的结果是不能提交的，也就自然不能成功了。

## 十八、关于新建项目 Maven 导入慢的问题

解决方案：

在 C: \ Users \ [user] \ .m2 下建立一个文件 settings.xml 将下述代码拷贝进去。或者在 IDEA 的 Project 空白栏右键选择 Maven 然后创建 settings 。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <mirrors>
        <!-- mirror
         | Specifies a repository mirror site to use instead of a given repository. The repository that
         | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used
         | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.
         |
        <mirror>
          <id>mirrorId</id>
          <mirrorOf>repositoryId</mirrorOf>
          <name>Human Readable Name for this Mirror.</name>
          <url>http://my.repository.com/repo/path</url>
        </mirror>
         -->

        <mirror>
            <id>alimaven</id>
            <name>aliyun maven</name>
            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>

        <mirror>
            <id>uk</id>
            <mirrorOf>central</mirrorOf>
            <name>Human Readable Name for this Mirror.</name>
            <url>http://uk.maven.org/maven2/</url>
        </mirror>

        <mirror>
            <id>CN</id>
            <name>OSChina Central</name>
            <url>http://maven.oschina.net/content/groups/public/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>

        <mirror>
            <id>nexus</id>
            <name>internal nexus repository</name>
            <!-- <url>http://192.168.1.100:8081/nexus/content/groups/public/</url>-->
            <url>http://repo.maven.apache.org/maven2</url>
            <mirrorOf>central</mirrorOf>
        </mirror>

    </mirrors>
</settings>
```

## 十九、 关于工程文件夹默认路径的修改

Settings > Appearance & Behavior > System Settings > Project > Default project directory .

## 二十、关于新建项目启动后报错 404 的问题

解决方案：

其实是没有设置默认页面的问题，可以加一个 Controller 和页面，后面发现其实是正常的。可以加如下代码，记得加上 @ResponseBody ，否则还是报错。

```java
package com.tinysnow.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author TinySnow
 */
@Controller
public class TestController {
    
    @RequestMapping("/")
    @ResponseBody
    public String test(){
        return "HelloWorld";
    }
}
```

然后在 templates 目录下新建一个 HelloWorld.html  后，重新启动项目，发现是正常的。

## 二十一、关于建立单元测试爆空指针异常的问题

解决方案：

是因为此时的 candidateMapper 并没有被 Spring 托管，左侧都没有出现叶子的图标。在类上加上 @SpringBootTest。

## 二十二、 关于对 Mybatis 中 Mapper 进行单元测试的报错问题

```bash
***************************
APPLICATION FAILED TO START
***************************

Description:

Parameter 0 of method setCandidateMapper in com.tinysnow.dao.impl.CandidateDaoImpl required a bean of type 'com.tinysnow.mappers.CandidateMapper' that could not be found.


Action:

Consider defining a bean of type 'com.tinysnow.mappers.CandidateMapper' in your configuration.

```

解决方案：

是因为这个 com.tinysnow.mappers.CandidateMapper 压根儿就没找到。

在主启动类上添加 @MapperScan("com.tinysnow.mappers") 注解，或者在每一个 Mapper 接口上定义 @Mapper 注解。这样才能被 MyBatis 找到。

## 二十三、关于没有找到文件的问题

报错信息：

```java
F:\Projects\Java\Wing\src\test\java\com\tinysnow\mappers\JudgeMapperTest.java:11:5
java: 找不到符号
  符号: 类 JudgeMapper
  位置: 类 com.tinysnow.mappers.JudgeMapperTest
```

解决方案：

这个可能是由于 IDEA 抽疯，没有自动编译，直接复制文件就有可能出现这个问题。点击模块，右键，rebuild 一下就可以了。

## 二十四、关于 git 拉不下来代码的问题

拒绝拉代码的提示性语句： `refusing to merge unrelated histories`

翻译：拒绝合并无关的历史

解决方案：

如果合并了两个不同的开始提交的仓库，在新的 git 会发现这两个仓库可能不是同一个，为了防止开发者上传错误，于是就给下面的提示

```bash
fatal: refusing to merge unrelated histories
```

如我在Github新建一个仓库，写了License，然后把本地一个写了很久仓库上传。这时会发现 github 的仓库和本地的没有一个共同的 commit 所以 git 不让提交，认为是写错了 `origin` ，如果开发者确定是这个 `origin` 就可以使用 `--allow-unrelated-histories`  告诉 git 自己确定

遇到无法提交的问题，一般先pull 也就是使用 `git pull origin master` 这里的 `origin` 就是仓库，而 `master` 就是需要上传的分支，因为两个仓库不同，发现 git 输出 `refusing to merge unrelated histories` 无法 pull 内容

因为他们是两个不同的项目，要把两个不同的项目合并，git需要添加一句代码，在 `git pull` 之后，这句代码是在git 2.9.2版本发生的，最新的版本需要添加  `--allow-unrelated-histories`  告诉 git 允许不相关历史合并

假如我们的源是origin，分支是master，那么我们需要这样写`git pull origin master --allow-unrelated-histories` 如果有设置了默认上传分支就可以用下面代码

```bash
git pull --allow-unrelated-histories
```

参考链接：

https://blog.csdn.net/lindexi_gd/article/details/52554159

## 二十五、关于 git 更改提交代码的邮箱

查看本机用户下.gitconfig这个文件，打开之后查看对应的 name 和 email 是否和自己想要设置的一致，如果不一致，打开git bash ：

```bash
git config --global user.name "设置自己的名字"
git config --global user.email "设置自己的邮箱"
```

这两条指令设置。idea 也中 git commit时有这一框可以选择。

参考链接：

https://blog.csdn.net/weixin_42257062/article/details/80509641

## 二十六、git 合并分支

切换回主分支，然后

```bash
git merge [想要合并的分支名字]
```

注意：此命令只会合并分支上的文件到 master 分支，但不会删除分支。

## 二十七、Vue 主页进不去

解决方案：

```javascript
  const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', components: LoginAndRegister },
    { path: '/create', component: CreateProject },
    { path: '/manage', component: ManageProject },
    { path: '/result', component: ShowResult}
  ]
```

components 改为 component

## 二十八、关于通过 Vuex 的 mutations 提交修改不起作用的问题

解决方案：

在自己的 mutations 业务代码里修改 state 里的属性时，引用是 `this.state.[property]` 而不是 `this.[property]`

在全局调用 mutation 的函数时不需要传入 state 相关的参数，因为这是一个内部的引用，只需要传入 username 就可以，如：

```javascript
this.$store.commit("changeUserLoginState", "114514")
```

## 二十九、MyBatis数组参数传入报错

报错信息：

```bash
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error updating database.  Cause: java.lang.UnsupportedOperationException
### The error may exist in file [F:\Projects\Java\Wing\target\classes\mybatis\mappers\CandidateMapper.xml]
### The error may involve defaultParameterMap
### The error occurred while setting parameters
### SQL: insert into candidates (project_id, candidate_name, describe_msg, vote_number)         values (?,?,?,0);
### Cause: java.lang.UnsupportedOperationException
```

报错代码：

```xml
<insert id="insertCandidate" useGeneratedKeys="true">
    insert into candidates (project_id, candidate_name, describe_msg, vote_number)
    values (#{list.projectId},#{list.candidateName},#{list.describeMsg},0);
</insert>
```

解决方案：

因为是数组形式插入的，所以这种写法是不对的，还要在 xml 文件中进行循环遍历取值才能够批量插入。代码如下：

```xml
    <insert id="insertCandidate" useGeneratedKeys="true">
        insert into candidates (project_id, candidate_name, describe_msg, vote_number) values
        <foreach item="list" collection="list" separator=",">
            (#{list.projectId},#{list.candidateName},#{list.describeMsg},0)
        </foreach>;
    </insert>
        /* item 里面填入 Mapper 文件传过来的 list 参数， collection 则为集合的类型， set，list 之类的*/
        /* separator 填入分隔符，需要符合 mysql 的语法规范，最后循环出来结果如下： */
        /* insert into candidates (project_id, candidate_name, describe_msg, vote_number)
           values (XXX,XXX,XXX,0),(XXX,XXX,XXX,0),(XXX,XXX,XXX,0),(XXX,XXX,XXX,0) */
```

## 三十、关于发出的请求总是404的问题

解决方案：

一定要检查自己发出请求的时候，是不是完整的后台代码路径。后台代码里类上的路径很容易被忽略！

## 三十一、关于在页面上进行增删改查后刷新数据表的方法

参考链接：https://juejin.im/entry/6844903798620553224

采用的方法3

```javascript
<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => this.isRouterAlive = true)
    }
  }
}
</script>

<style>
</style>
```

依据代码解析，大概应该是如果当前路由被激活（事实上是一定激活的，不然不可能看得到页面，也就是说，看到页面的时候 isRouterAlive 是一定为 true 的），然后将其赋值为 false 使页面短暂不可见，然后随即又赋值为 true ，期间 Vue 的组件被创建和销毁，以达到刷新的目的。但是 this.$nextTick 这个方法是个什么东西暂时不知道。

## 三十二、关于前端页面数据表格中点击编辑，数据传不到对话框中内嵌表单的输入框默认值的问题

解决方案：

有一个非常邪道的方法，点击编辑的时候会绑定一个事件，将所有的数据传入到此事件中，然后赋给表单的数据项中，再在对话框里采用表单的数据项就可以了。

不能在 data 中直接赋值 table 里面的数据，因为 table 里面的每一项是不一样的，动态的，会变的，其中 Element-UI 更是有一个叫 index 和 row 的东西，直接限制了这种做法。代码如下：

```javascript
export default {
  inject: ['reload'],
  name: "ShowJudges",
  data() {
    return {
      tableData: [{
        judgeId: '',
        judgeName: '',
        judgePwd: '',
        projectId: '',
        hasVoted: ''
      }],
      dialogFormVisible: false,
      form: {
        judgeName: '',
        judgePwd: '',
        hasVoted: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleEdit(index, row, boolean) {
      this.dialogFormVisible = boolean
      this.form.judgeName = row.judgeName
      this.form.judgePwd = row.judgePwd
      this.form.hasVoted = row.hasVoted
      console.log(this.form.hasVoted);
    }
```

## 三十三、关于 Radio 中不能根据数据项自动默认选中选项的问题

```javascript
<el-form-item label="投票权" :label-width="formLabelWidth">
  <el-radio v-model="form.hasVoted" label="false">有</el-radio>
  <el-radio v-model="form.hasVoted" label="true">无</el-radio>
</el-form-item>

<!--这里仅展示有关的代码段-->

form: {
    judgeName: '',
    judgePwd: '',
    hasVoted: ''
}
        
handleEdit(index, row, boolean) {
      this.dialogFormVisible = boolean
      this.form.judgeName = row.judgeName
      this.form.judgePwd = row.judgePwd
      this.form.hasVoted = row.hasVoted
},
```

解决方案：

记住，= 后面如果没有使用 v-bind 绑定属性，那么系统默认就是使用字符串！哪怕是 false 或者 true 这种东西，也只会当成字符串处理。所以一定要记得加上 v-bind ！

在两个 label 前面加上 : 即可。

## 三十四、关于使用 fastjson 时，其自动过滤掉值为 null 的字段名的问题

如题，如果想要其转成 JSON 时仍然保留值为 null 的字段，需要在 toJSONString(param1, param2) 的 param2 中添加一个配置： SerializerFeature.WriteMapNullValue 。示例如下：

`return JSON.toJSONString(judge, SerializerFeature.WriteMapNullValue)`

这样既可保留值为 null 的字段。

参考链接：

https://blog.csdn.net/SongSir001/article/details/84656579?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param

## 三十五、 关于 POST 请求爆 403 Forbidden 的问题

这个问题困扰了我很久，最后请求哥哥帮助才解决。

是 Spring Security 的问题， Security 在有客户端发起请求的时候会将这些请求先过滤一遍，如果遇到有不合理的请求（可能是没有经过授权或者其他什么原因，目前尚不清楚），会直接进行拦截，如发一个 403 打回去，后台根本拿不到这个请求进行处理。

解决方案：

注释 Spring Security 。当然这是最为极端的方法，可以在 Security 中添加白名单从而使 Security 通过这些请求。但是目前没有时间去了解怎样进行操作，暂时先注释掉了。以上情况只针对于前端和后端已经进行了跨域处理的情况，如果未进行跨域处理，则还会爆出其他异常情况。

## 三十六、关于 @RequestBody ， JSON 数组转为 Java 对象 List ，以及连带的 Converter 和泛型擦除问题

@RequestBody 是 SpringBoot 中自带的一个将 JSON 转化为 Java 对象的一个注解，也就是说，当在 Controller 层的接收参数前加上 @RequestBody 时，这个参数在 SpringBoot 内部就已经由 JSON 转化为了 Java 对象，因此这个注解修饰的对象应该是，包含与 JSON 传过来的字段名相对应的后台实体类对象，所以不需要再进行 JSON 转对象处理。

而这个注解有些对象是不能进行自动转化的，比较特殊。不能进行自动转化的条件：

- 包含泛型
- 实体类中含有 Date 诸如此类的必须使用的字段

因为 JSON 数组转为 Java 对象 List 这个调用中，本身 List 是含有泛型的，所以需要实现一个接口，即 Converter ，以自己手动进行 JSON 转对象的正确处理，代码如下：

```java
import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.fasterxml.jackson.databind.util.Converter;
import com.tinysnow.bean.Candidate;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author TinySnow
 */
@Component
public class String2CandidateListConverter implements Converter {
    @Override
    public List convert(String s) {
        return JSON.parseArray(s, Candidate.class);
    }

    @Override
    public JavaType getInputType(TypeFactory typeFactory) {
        return null;
    }

    @Override
    public JavaType getOutputType(TypeFactory typeFactory) {
        return null;
    }
}
```

后两个方法可以不要。这是 JSON 数组转为 Java 对象 List 最为正规和规范的写法。

之所以不能包含泛型，是因为 Java 在设计之初的泛型擦除机制，即在源码阶段指定的泛型，在编译出来的字节码中被擦除了，不知道这个泛型到底是什么。而不能包含 Date 类型，是因为 Date 在转化时需要经过计算和格式确定。

注意： Converter 转化成对象时，这个对象的实体类里不能有基础类型，即 int, boolean 等，需要用其对应的包装对象 Integer, Boolean 等。

## 三十七、关于发起请求时参数传递的形式

搞清楚： x-www-form-urlencoded 的参数传递形式是 Key=Value&Key=Value...

所以在传递到后台时会报错，错误码是 415 ：不支持的媒体类型 (Unsupported media type) 。

而传递到后台的参数形式应该为 JSON 形式，所以需要在请求时修改请求头 Content-Type 为 application/json 。

示例：

```javascript
axios.post("http://localhost:8088/judge/update", data1, {
  headers: { 'Content-Type': 'application/json'}
}).then(resp => {}).catch(err => {})
```

## 其他知识

1. 将两行合并为一行并移除多余空格，可以使用 Ctrl + Shift + J ；
