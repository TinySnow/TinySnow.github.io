# WingStudio 第二轮考核 工程实现记录

# tomcat 相关

### 1.关于控制台输出乱码问题

找到 tomcat 安装目录 `C:\Program Files\Apache Software Foundation\Tomcat 8.5\conf ` 其下面有一个 logging.properties 文件，使用 notepad++ 打开，找到 `java.util.logging.ConsoleHandler.encoding = UTF-8`  将 UTF-8 改为 GBK 即可。

### 2.启动

` C:\Program Files\Apache Software Foundation\Tomcat 8.5\bin ` 其下有一个 startup.bat 文件，点击即可，另关闭请务必点击右上角，不要点 startdown.bat 。没啥用。

### 3.运行项目

tomcat 运行的 web 项目会统一放在 ` C:\Program Files\Apache Software Foundation\Tomcat 8.5\webapps` 目录下面，故只需要新建一个项目文件夹放入项目文件即可。

### 4.关于启动不了的问题

检查端口是否被占用。

## IDEA 部署及创建工程

### 1.创建 Java EE 工程

1. new 一个 Java EE 工程，勾选 Web Application 模块，注意看 tomcat 服务器是否有选上，然后找好工程文件夹储存位置，一路next;
2. 在右上角运行长条选择 tomcat 服务器，点击 Edit Configurations... 修改配置。
  - 修改 name 以免以后多个项目分不清 tomcat 实例，建议与包名一致；
  - 修改 Deployment 下，选中的工程的 Application context ，此为浏览器的访问路径，多个工程的 Application context 不能一致，另外，选中的工程本身也可以进行修改，例如名字，依赖等等；
  - 修改 Sever 下的 URL ，此为每次运行 tomcat 浏览器默认打开的路径，需要与上一点中的某一个路径一致，或者与其工程文件当中的某个路径一致，例如 +login.html ，否则找不到文件；
  - 修改 Sever 下的 On frame deactivation ，此为网页每次刷新时的动作，建议勾选为 update classes and resouces ；

- 注意:
  - 在新建的 login.html 文件下面的 form 表单中的 action 行为，如果其冒号中的文字为路径，在浏览器中会重新表示为 ip:port 后面的路径，并不会接在当前访问路径下面 ，所以请务必从包名开始重新打路径。
    - 例如，假如表单所在的路径为 `http://ip:port/login` ，则此表单提交后跳转的页面并不是 `http://ip:port/login/test` 而是 `http://ip:port/test` 。请务必注意。
  - 但是在 Servlet 的处理类中，注解和 Web.xml 中的文字如果是路径的话，会加在当前路径名之后，请务必注意。故，善用跳回上一级目录 "/../" 。


#### 2.数据库相关

1. 编写数据库获取连接的工具类方法时，编写的URL需要额外添加语句，详情见下。

> ```bash
> "jdbc:mysql://localhost:3306/user?useUnicode=true&characterEncoding=UTF-8" +
> "&serverTimezone=Asia/Shanghai&useSSL=false&allowPublicKeyRetrieval=true"
> ```


后面需要加上 `allowPublicKeyRetrieval=true` 以防止抛出 `SQLNonTransientConnectionException: Public Key Retrieval is not allowed` 异常。具体原理暂时不知晓。

2. 关于连接数据库的使用表问题
  1. 需要使用的数据库写在获取连接的URL里面(如: jdbc:mysql://localhost:3306/user )
  2. 需要使用的该数据库的表，写在持久层的有关CRUD方法里面(如: update user set password = ? where user_name = ? )
  3. 1中的 user 是一个名字叫 user 的数据库，而2中的 user 是该数据库下的一张表。


## 其他

1. 关于 post 请求乱码问题
  - 需要在服务器的 doPost 方法里先进行设置编码，方法为 `setCharacterEncoding("UTF-8")`
  - get 请求的中文不会乱码， get 和 post 请求的英文均不会乱码

- 关于请求转发
  - 请求转发可以访问 WEB-INF 目录下的资源，但是浏览器直接访问不行，相当于对外加密
  - 请求转发只能够在当前工程下的所有资源内跳转，不允许放出 URL 访问其他页面，例如在源码中放出百度首页的地址时，会出错
  - 共享Request域中的数据


