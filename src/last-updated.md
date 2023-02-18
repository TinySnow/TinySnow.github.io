# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## SUMMARY.md

```diff

@@ -112,6 +112,7 @@
     - [管理思想](学习/管理学/管理思想.md)
     - [目标](学习/管理学/目标.md)
     - [计划](学习/管理学/计划.md)
+    - [决策](学习/管理学/决策.md)
   - [公共基础知识 | Basics](学习/公共基础知识/公共基础知识.md)
     - [宪法](学习/公共基础知识/宪法.md)
     - [民法](学习/公共基础知识/民法.md)
```

## sitemap.txt

```diff

@@ -31,6 +31,7 @@ https://tinysnow.github.io/每日一文/每日一文
 https://tinysnow.github.io/每日一文/油月亮 - 贾平凹
 https://tinysnow.github.io/每日一文/熟人厌烦症 - 迈克尔 · 金
 https://tinysnow.github.io/每日一文/狗这一生不容易 - 王宏哲
+https://tinysnow.github.io/每日一文/狗难 - 柯灵
 https://tinysnow.github.io/每日一文/王府大街 64 号 - 雷达
 https://tinysnow.github.io/每日一文/第三大道的这间酒馆 - 约翰·麦克纳尔蒂
 https://tinysnow.github.io/每日一文/等我一年半 - 松本清张
```


## 决策.md

```diff

@@ -0,0 +1,25 @@
+# 决策
+
+## 定义
+
+- 为了 **实现某一目的** 而从 **若干可行方案** 中选择一个 **满意方案** 的 **分析判断过程**
+  - （若干一般为两到三个，最多不超过五个）
+  - 最优方案既不经济又不现实，所以选择满意方案
+  - 满意方案：主要目标能够实现，次要目标足够好的方案
+
+## 实质
+
+- 一个 **主观** 判断的过程
+
+## 重要性
+
+- 管理者从事管理工作的基础
+
+## 区别
+
+- 决策是一个 **过程**
+- 选择和决定是一个 **时间点**
+
+## 推荐书目
+
+- 《条理化思维》
\ No newline at end of file
```

## 计划.md

```diff

@@ -17,6 +17,64 @@
 
 ## 要素
 
+- 宗旨
+  - 预测
+  - 安排
+  - 应变处理
+- 详细
+  - 前提
+  - 目标（What）
+  - 目的（Why）
+  - 战略（How）
+  - 责任（Who）
+  - 时间表（When）
+  - 范围（Where）
+  - 预算
+  - 应变措施
+
+## 制定过程
+
+- 将要素一条一条予以明确
+
+## 制定方法
+
+### 四种方法
+
+1. 网络计划技术
+   - 任务目标
+   - 工作内容
+   - 相互关系和先后次序
+   - 连线形成网络图
+   - 取最长的路径为关键路径
+2. 甘特图
+3. 滚动计划法
+   - 时间点最近粒度最细
+   - 时间点越远粒度越粗
+4. 情景计划法
+   - 最好情况
+   - 最坏情况
+
+### 理念
+
+- 长计划短安排
+- 短期的计划要围绕着长期的计划展开
+- 长期的计划要分解落实到短期安排中
+
+## 时间管理
+
+- 响应时间：用于响应其他人的要求、请求和问题的时间
+  - 管理重点
+- 自由时间：可以自行控制的时间
+
+- | 重要性和紧急性 |       紧急       |    不紧急    |
+  | :------------: | :--------------: | :----------: |
+  |      重要      |      马上做      | 有时间优先做 |
+  |     不重要     | 授权他人做或不做 | 有空做或不做 |
+
+- 要事优先，难事分解
+- 学会说“不”
+  - 明确自己的价值观以做出选择
+
 ## 其他
 
 - **善于计划和善于总结是快速晋升的秘诀**
\ No newline at end of file
```

## 第一章：计算机的历史.md

```diff

@@ -24,7 +24,7 @@
 
 ### 参考资料
 
-- [第一代电子计算机](https://baike.baidu.com/item/%E7%AC%AC%E4%B8%80%E4%BB%A3%E7%94%B5%E5%AD%90%E8%AE%A1%E7%AE%97%E6%9C%BA/1430548)：美国国防部用它来进行弹道计算。
+1. [第一代电子计算机](https://baike.baidu.com/item/%E7%AC%AC%E4%B8%80%E4%BB%A3%E7%94%B5%E5%AD%90%E8%AE%A1%E7%AE%97%E6%9C%BA/1430548)：美国国防部用它来进行弹道计算。
 
 ### 思考题答案（仅供参考）
 
```

## 第三章：简单逻辑门.md

```diff

@@ -44,7 +44,18 @@
 
 　　为简化说明，本指南 **认为与或非三门可以直接获得。**
 
-　　由基础三门还可构成稍复杂一点的逻辑门：nand，nor，分别是与非门，或非门。其结果就是与门、非门的结果取反。注意，nand 和 nor 两门因自身特性，均可构成基础三门。所以一台计算机可以只由 nand 门或 nor 门构成。
+　　由基础三门还可构成稍复杂一点的逻辑门：nand（not and 之缩写），nor（not or 之缩写），分别是与非门，或非门。其结果就是与门、非门的结果取反。
+
+- 与非和或非
+
+| 输入 A | 输入 B | and 输出 | nand 输出 | or 输出 | nor 输出 |
+| :----: | :----: | :------: | :-------: | :-----: | :------: |
+|   0    |   0    |    0     |     1     |    0    |    1     |
+|   0    |   1    |    0     |     1     |    1    |    0     |
+|   1    |   0    |    0     |     1     |    1    |    0     |
+|   1    |   1    |    1     |     0     |    1    |    0     |
+
+　　注意，nand 和 nor 两门因自身函数完备性，均可构成基础三门。所以一台计算机可以只由 nand 门或 nor 门构成。
 
 ### 半加器
 

@@ -57,11 +68,17 @@
 | 1      | 0      | (0)1   |
 | 1      | 1      | (1)0   |
 
-　　暂时不管进位，可以观察到：输入相同，结果为 0；输入不同，结果为 1。这种逻辑在以后也很常见，专门有个名字：异或门。
+　　暂时不管进位，可以观察到：输入相同，结果为 0；输入不同，结果为 1。这种逻辑在以后也很常见，专门有个名字：异或门（xor）。
 
 　　异或门电路可以使用基础三门搭建，方案也很多。总体来讲，用的逻辑门越少，开销越少，效率越高。下面两种设计方案中，很明显，第一种方案要好。
 
-<br>
+- 第一种方案，四个与非门（4 nand）：
+
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-3/nand-xor.png)
+
+- 第二种方案，五个基础逻辑门（2 not + 2 and + 1 or）：
+
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-3/overzicht-xor.jpg)
 
 　　接下来处理棘手的进位问题：
 

@@ -69,7 +86,9 @@
 
 　　**综上所述，二进制的一位加法器（带进位）可以用一个异或门加上一个与门表示。** 将输入输出引脚分列两边，中间加上逻辑门，可以获得一个一位加法器。
 
-<br>
+- 上为异或门，下为与门，输出 S（Sum）为和，输出 C（Carry）为进位
+
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-3/half-adder.png)
 
 　　上述一位加法器也称**半加器**。
 

@@ -124,7 +143,8 @@
 
 ### 参考资料
 
-
+1. 晶体管
+2. 函数完备性
 
 ### 思考题答案（仅供参考）
 
```

## 第二章：计算机的构成.md

```diff

@@ -20,7 +20,7 @@
 - 输入数据（已知条件）
 - 输出结果（结果结论）
 
-![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/flow-calculatable.webp)
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-2/flow-calculatable.webp)
 
 ### 内部表示
 

@@ -42,7 +42,7 @@
 
 　　最初的计算机科学家们，想到用纸带打孔。有孔洞，类似开关，电路接通，通电。没有孔洞，电路受阻，不通电。如下图：
 
-![paper_cut_off](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/paper-cut-off.webp)
+![paper_cut_off](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-2/paper-cut-off.webp)
 
 　　这就是最原始的方法，需要程序员做大量的打孔操作，让机器识别。
 

@@ -103,7 +103,7 @@
 
 　　上述体系结构，被称为冯·诺依曼体系结构，至今仍在沿用（**人类所有知识都来源于好奇心和解决问题**）。如图所示：
 
-![Von_Neumann_Architecture](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/von_neumann-architecture.webp)
+![Von_Neumann_Architecture](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-2/von_neumann-architecture.webp)
 
 **思考题 2**
 

@@ -132,15 +132,16 @@
 
 ### 参考资料
 
-[计算理论](https://zh.m.wikipedia.org/zh-cn/%E8%AE%A1%E7%AE%97%E7%90%86%E8%AE%BA)：一个问题是否可以计算。偏数学领域，不在讨论范围之内。
+1. [计算理论](https://zh.m.wikipedia.org/zh-cn/%E8%AE%A1%E7%AE%97%E7%90%86%E8%AE%BA)：一个问题是否可以计算。偏数学领域，不在讨论范围之内。
 
-[ASCII 码](https://zh.m.wikipedia.org/zh-cn/ASCII)：American Standard Code for Information Interchange，美国信息交换标准代码。
+2. [ASCII 码](https://zh.m.wikipedia.org/zh-cn/ASCII)：American Standard Code for Information Interchange，美国信息交换标准代码。
 
-[二进制](https://zh.m.wikipedia.org/zh-cn/%E4%BA%8C%E8%BF%9B%E5%88%B6)：数据的表示方法。
+3. [二进制](https://zh.m.wikipedia.org/zh-cn/%E4%BA%8C%E8%BF%9B%E5%88%B6)：数据的表示方法。
 
-[冯·诺依曼体系结构](https://zh.wikipedia.org/zh-cn/%E5%86%AF%C2%B7%E8%AF%BA%E4%BC%8A%E6%9B%BC%E7%BB%93%E6%9E%84)：现代电子计算机的基本体系结构。
+4. [冯·诺依曼体系结构](https://zh.wikipedia.org/zh-cn/%E5%86%AF%C2%B7%E8%AF%BA%E4%BC%8A%E6%9B%BC%E7%BB%93%E6%9E%84)：现代电子计算机的基本体系结构。
+
+5. [Сетунь](https://zh.m.wikipedia.org/zh-cn/%D0%A1%D0%B5%D1%82%D1%83%D0%BD%D1%8C)：苏联诞生的三进制计算机。
 
-[Сетунь](https://zh.m.wikipedia.org/zh-cn/%D0%A1%D0%B5%D1%82%D1%83%D0%BD%D1%8C)：苏联诞生的三进制计算机。
 
 ### 思考题答案（仅供参考）
 
```
