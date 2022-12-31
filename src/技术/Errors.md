# Errors

## 连接 Github 出问题

端口被拒，仔细查看 ssh 连接过程：

```bash
ssh -vT git@github.com
```

若 DNS 解析错误，在 HOST 里面加上 github。

## 缺少 javaee 依赖

```shell
Cannot resolve symbol 'annotation' / Add Java EE 6 Jars to Module Dependencies
```

在 `pom.xml` 中添加 javax 的 javaee-api 即可

## 没有合适的驱动

```shell
No suitable driver found for jdbc:mysql://localhost:3306/train?autoReconnect=true&useUnicode=true&characterEncoding=utf8&useSSL=true&serverTimezone=UTC
```

- 没有合适的驱动。

- 在自己的取得连接的方法中 (`getConnection`) 加上以下代码：
```java
Class.forName("com.mysql.cj.jdbc.Driver");
```

- 或者给自己的工程添加依赖 `Project Structure->Libraries->添加解析 jar 包`

## 前端调用后端接口 404

降低 tomcat 版本，从 10 降到 7。

## VMware

- VMware 与 Device/Credential Guard 不兼容。**注意：无法与 WSL 共存。**

- ```powershell
  # 解决方案：
  bcdedit /set hypervisorlaunchtype off
  # 重新开启：
  bcdedit /set hypervisorlaunchtype auto
  ```

## Git

### 无法添加文件

> error: '<filename>' does not have a commit checked out fatal: adding files failed when inputting "git add ." in command prompt

- 删去子文件夹中的 `.git` 仓库。

> If you have a subdirectory with a `.git` directory and try to `git add .` you will see this message.
>
> This can happen if you have a git repo and then create/clone another repo in a subdirectory under that repo.
>
> [https://stackoverflow.com/questions/56873278/how-to-fix-error-filename-does-not-have-a-commit-checked-out-fatal-adding](https://stackoverflow.com/questions/56873278/how-to-fix-error-filename-does-not-have-a-commit-checked-out-fatal-adding)

### 无法远程提交文件

> Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.

  在 `IntelliJ` 系列 `IDE` 中进行代码提交时，使用 `Github` 生成的 `Personal Access Token` 作为密码提交。`Github` 从 2021 年 8 月 13 日开始不再支持密码验证。

> [https://github.blog/changelog/2021-08-12-git-password-authentication-is-shutting-down/](https://github.blog/changelog/2021-08-12-git-password-authentication-is-shutting-down/)

### 本地分支远程分支关联错误

`git branch --set-upstream-to=origin/<correct_remote_branch_name> ` 建立正确的关联。

- 注意：此处的 `origin` 是指当前所在的远程仓库，默认为此名字 。

### 删除远程分支

`git push origin --delete [remote_branch_name]`

## Maven

###  程序包不存在

-  `java: 程序包 org.springframework.boot 不存在`

- 删除 Maven 的 Repository 文件夹里的所有文件，重新下载（**请确保 Maven 一定配置正确了，并且 Maven 的 `settings.xml` 和 Repository 都存在**）。

### 依赖丢失

- `Dependency 'org.springframework.boot:spring-boot-starter-web:' not found`（pom.xml 报错）
- 请正确配置 Maven（**确保 Maven 的 `settings.xml` 和 Repository 都存在**），然后 `mvn clean && mvn compile`。

### 无法启动 SpringBoot 项目

- 表现为没有绿色三角运行符号（IDEA 环境下）
- 正确配置 Java（**一定要有环境变量**）和 Maven，然后 Project Structure，修改对应 SDKs，Language Level，和 Module Language Level。若还是无法启动，修改 pom.xml 里面的 java.version 或者升降 JDK 版本，然后重新 `mvn compile`。

### 无法编译

- pom.xml 所有配置项均正确，但就是运行不起来
- 正确配置 Java（**一定要有环境变量**）和 Maven，确保 JDK 各个版本对应相同（如环境变量和 Project，Project 和 Module 等），最后确保 IDEA 能够处理当前 JDK 版本（如 IDEA2020 无法处理 JDK17，需要升级），然后重新 `mvn compile`。

