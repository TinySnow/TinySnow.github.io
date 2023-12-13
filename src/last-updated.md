# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## sitemap.txt

```diff

@@ -151,6 +151,7 @@ https://tinysnow.github.io/每日一文/我来讲一个故事 - 加西亚 · 马
 https://tinysnow.github.io/每日一文/我的呈奶酪蛋糕形状的贫穷 - 村上春树
 https://tinysnow.github.io/每日一文/我看国学 - 王小波
 https://tinysnow.github.io/每日一文/打工经历 - 王小波
+https://tinysnow.github.io/每日一文/打赌 - 契诃夫
 https://tinysnow.github.io/每日一文/抽象的爱国 - 梁文道
 https://tinysnow.github.io/每日一文/捉弄 - 契诃夫
 https://tinysnow.github.io/每日一文/捕快张三 - 汪曾祺
```

## 第七章：存储器.md

```diff

@@ -30,7 +30,9 @@
 
 　　那与门和或门各自首尾相连，会有什么效果呢？
 
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-7/and-head-tail-connect.gif)
 
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-7/or-head-tail-connect.gif)
 
 　　与门和或门在某次输入一个信号之后，无论怎样改变输入值，都不会再改变输出值了。也就是说，有个信号“触发”了变化。
 

@@ -40,7 +42,7 @@
 
 　　接下来我们把三大逻辑门按照下面的顺序，连接起来，形成一个奇怪的结构，研究它的真值表。
 
-
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-7/and-or-latch.gif)
 
 　　这个结构，具有记忆和存储的功能。取名为：AND-OR 锁存器。
 

@@ -48,7 +50,7 @@
 
 　　上面的设计虽然达到了目的，但还是有些复杂，所以，我们打算只用两个输入端：D(Data) 为数据端，WE(Write Enable，允许写入) 为控制端。
 
-
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-7/gated-latch.gif)
 
 ### 触发器
 
```
