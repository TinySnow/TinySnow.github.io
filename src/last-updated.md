# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## SUMMARY.md

```diff

@@ -93,6 +93,7 @@
     - [毕业设计环境准备](技术/实践记录/毕业设计环境准备.md)
     - [Elastic Search 启用](技术/实践记录/ElasticSearch启用.md)
     - [MySQL 与 Elastic Search 的数据同步尝试](技术/实践记录/MySQL与ElasticSearch的数据同步尝试.md)
+    - [毕业设计解决方案](技术/实践记录/毕业设计解决方案.md)
   - [其他资料 | Other Docs](技术/其他资料/其他资料.md)
     - [Git 学习笔记](技术/其他资料/Git%20学习笔记.md)
     - [Bash 代表命令](技术/其他资料/Bash%20代表命令.md)
```

## sitemap.txt

```diff

@@ -16,6 +16,7 @@ https://tinysnow.github.io/每日一文/一种错觉 - 毛姆
 https://tinysnow.github.io/每日一文/亲爱的小孩 - 陈晓霞
 https://tinysnow.github.io/每日一文/从痴迷到依恋 - 周国平
 https://tinysnow.github.io/每日一文/你有没有钱 - 李敖
+https://tinysnow.github.io/每日一文/你要是在麦田里遇到了我 - 罗伯特 · 彭斯
 https://tinysnow.github.io/每日一文/写在五线谱上的信 - 王小波
 https://tinysnow.github.io/每日一文/刘正风灭门 - 金庸
 https://tinysnow.github.io/每日一文/双鱼 - 三毛
```


## ElasticSearch启用.md

```diff

@@ -52,11 +52,9 @@ ERROR: Elasticsearch exited unexpectedly
 - 允许跨域需要在 `elasticsearch.yml` 中添加配置
 
 ```yaml
-
 #开启跨域
 http.cors.enabled: true
 #允许所有
 http.cors.allow-origin: "*"
-
 ```
 
```

## 实践记录.md

```diff

@@ -1,3 +1,3 @@
-# 实践记录 | Practice Record
+# 实践记录
 
 所有计算机工程途中遇到的问题，解决方案，想法等，收录于此。
```

## 毕业设计环境准备.md

```diff

@@ -24,7 +24,6 @@ sudo n stable
 # 然后刷新，否则容易出现 node -v 还是旧本版的情况
 hash -r
 # 特别提醒：node 旧版本不支持 await 等语法，运行不了代码，必须更新版本
-
 ```
 
 ## 设置 Maven

@@ -123,3 +122,4 @@ npm install --registry=registry.npmmirror.com
 ```
 
 - 然后运行项目即可
+
```

## 毕业设计解决方案.md

```diff

@@ -0,0 +1,28 @@
+# 毕业设计解决方案
+
+## Spring Doc
+
+- 访问 /swagger-ui.html 重定向的页面，没有 api 显示
+
+- 因为用到 Spring Security，所以很有可能请求被拦截了，需要配置 Spring Security 访问 Spring Doc 资源
+
+  - 注意，Spring Doc 配置和以前 Spring Fox 的 Swagger 放行路径不太一样
+
+  - 这个导致困惑了好几天，最后根据 Doc 的 Default swagger 页面的 Explore 默认项试出来了
+
+  - ```java
+        @Bean
+        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
+            http
+                	// 其他配置项可以随便加
+                	// Spring Fox 的 Swagger 需要放行 "/swagger-resources/**", "/swagger-ui/**"
+                	// Spring Doc 的 Swagger 需要放行 "/v2/**"
+                	// 这里放行 v2/v3 依据自己的 Spring Doc 版本决定
+                    .antMatchers("/v3/**").permitAll()
+                    .anyRequest().authenticated();
+            return http.build();
+        }
+    ```
+
+---
+
```
