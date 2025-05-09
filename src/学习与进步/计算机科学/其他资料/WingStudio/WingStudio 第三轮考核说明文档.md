# WingStudio 第三轮考核说明文档

# 技术栈

==此次考核项目采用前后端分离架构开发。==

### 前端技术栈

- 采用     Vue-Cli （ Vue 脚手架）     进行基本项目搭建
- 采用        Vue + ElementUI              进行页面和视图绘制
- 采用             VueRouter                   进行页面间跳转控制
- 采用                 VueX                       进行全局变量共享和状态跟踪
- 采用                 Axios                       进行网络请求
- 采用              Webpack                    进行打包
- 开发工具：WebStorm

### 后端技术栈

- 采用              SpringBoot                 进行基本项目搭建
- 采用           SpringSecurity              进行权限管理和分配
- 采用                  Mysql                     进行数据保存
- 采用                Mybatis                    进行数据库操作
- 采用                  Druid                      进行数据库连接池管理
- 采用                 Maven                     进行依赖管理
- 采用          Alibaba-fastjson             进行对象序列化和传输
- 开发工具：IntelliJ IDEA

### 前后端通信

- 采用                 JSON                      格式进行传输
- 采用               Postman                    进行通信传输测试

### 其它

- 采用        git + github + gitee           进行版本控制

## 项目功能完成情况

### 前注

高亮即表示在需求文档中为加分项。

### 已完成

- 用户登录
- 用户注册
- 评委登录
- 创建项目
  - 批量录入候选人信息
  - ==批量录入评委信息==
  - ==创建者可以进行现场展示==

- 管理项目
  - 删除评委
  - 更新评委信息
    - ==更改投票权==
  - 查询评委列表

- 进行投票
  - 查询候选人信息
  - 投票
  - 可弃权（即不投票
  - 再次投票时拒绝请求（即单次投票
  - ==结果实时展示==


### 未完成

- 登录
  - ==邮箱重置密码==

- 管理项目
  - 添加单个评委
  - ==删除项目（后端接口已经写好，但前端页面未写==
  - ==多轮次投票==

- 展示页面
  - 最终赢家展示


## 关于启动项目

### 前端代码：

解压源码后，进入相应解压后的目录的任意一个终端（ Terminal ）输入：

```bash
npm run serve
```

等待编译启动即可，端口号默认为 8080 ，如果 8080 已经占用，则顺延，项目打开地址：

```bash
http://localhost:8080
# 或者
http://127.0.0.1:8080
```

### 后端代码：

解压源码后，使用 IDEA 打开运行即可。端口号固定为 8088 ，项目打开地址：

```bash
http://localhost:8088
# 或者
http://127.0.0.1:8088
```

==请注意：后台没有任何默认页面，所以直接打开上述地址，会直接爆出 Whitelabel Error Page 的错误，这是正常现象。==

## 其它说明

1. 该项目代码存在很多可以优化的地方，但由于时间关系，未能及时优化；（如网络请求比较频繁）
2. 因为自己的问题，技术栈选定更迭很多次，导致这个项目重写了很多次；
3. 有记录和价值的报错记录，以及需要注意的点，在附带的《 WingStudio 第三轮项目途中报错及解决方案》文件中；
4. 项目中带有大量注释，以帮助阅读代码；
5. 附带录有项目演示视频；
6. 目前没有考虑到评委重名的情况；
7. 目前暂时没有发现 bug ；
8. 在编码过程中的控制台打印和调试信息已经删除。

