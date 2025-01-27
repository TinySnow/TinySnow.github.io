# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## SUMMARY.md

```diff

@@ -766,6 +766,7 @@
   - [献给阿尔吉侬的花束](阅读/零零散散/献给阿尔吉侬的花束.md)
   - [诗歌手册：诗歌阅读与创作指南](阅读/零零散散/诗歌手册：诗歌阅读与创作指南.md)
 - [每日一文 | Daily Article](阅读/每日一文/每日一文.md)
+  - [铭于心 - 林清玄](阅读/每日一文/铭于心%20-%20林清玄.md)
   - [我们都是突然长大 - 马良](阅读/每日一文/我们都是突然长大%20-%20马良.md)
   - [七个铜板 - 莫里斯](阅读/每日一文/七个铜板%20-%20莫里斯.md)
   - [活了一百万次的猫 - 佐野洋子](阅读/每日一文/活了一百万次的猫%20-%20佐野洋子.md)
```

## 第七章：加法器.md

```diff

@@ -34,6 +34,8 @@
 
 　　我们需要一个能处理三个输入的加法器。
 
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/content/full-adder-sign.png)
+
 ### 加法器的真值表
 
 　　加法器有三个输入：两个加数（A 和 B）和一个进位输入（Cin，Carry in），两个输出：和（Sum）和进位输出（Cout，Carry out）。为了方便观察，将几个中间值也纳入真值表里：

@@ -42,7 +44,7 @@
 - S1 + Cin 的第二个进位 C2
 - S1 + Cin 的和直接作为最终和（Sum）输出了，所以不是中间值。
 
-　　真值表如下：
+　　带中间值的真值表如下：
 
 | A | B | S1 | C1 | Cin | C2 | Sum | Cout |
 | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |

@@ -55,6 +57,18 @@
 | 1 | 0 | 1 | 0 | 1 | 1 | 0 | 1 |
 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | 1 |
 
+　　不带中间值的真值表如下：
+
+| A | B | Cin | Sum | Cout |
+| :-: | :-: | :-: | :-: | :-: |
+| 0 | 0 | 0 | 0 | 0 |
+| 0 | 0 | 1 | 1 | 0 |
+| 0 | 1 | 0 | 1 | 0 |
+| 0 | 1 | 1 | 0 | 1 |
+| 1 | 0 | 0 | 1 | 0 |
+| 1 | 0 | 1 | 0 | 1 |
+| 1 | 1 | 0 | 0 | 1 |
+| 1 | 1 | 1 | 1 | 1 |
 
 ### 加法器的构成
 

@@ -81,12 +95,43 @@
    - 输入：两个半加器的进位（C1 和 C2）
    - 输出：最终进位（Cout）
 
-
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/content/full-adder.png)
 
 　　或者我们也可以直接用《第三章：复杂逻辑门基础》所描述的方法，根据真值表书写表达式，再化简，再拼接基础逻辑门，效果等同。
 
+1. 找出所有输出为真（即输出为 1）的输入组合
+
+　　去除中间值，输出为 1 的真值表（Sum）：
+
+| A | B | Cin | Sum |
+| :-: | :-: | :-: | :-: |
+| 0 | 0 | 1 | 1 |
+| 0 | 1 | 0 | 1 |
+| 1 | 0 | 0 | 1 |
+| 1 | 1 | 1 | 1 |
+
+　　去除中间值，输出为 1 的真值表（Cout）：
+
+| A | B | Cin | Cout |
+| :-: | :-: | :-: | :-: |
+| 0 | 1 | 1 | 1 |
+| 1 | 0 | 1 | 1 |
+| 1 | 1 | 0 | 1 |
+| 1 | 1 | 1 | 1 |
 
 
+2. 将这些输入组合用 “或” 连接（也即 + 号），输入组合的个数取决于输出为真的组合个数
+
+　　Sum = ABCin + ABCin + ABCin + ABCin
+
+　　Cout = ABCin + ABCin + ABCin + ABCin
+
+3. 针对每一个输入组合，如果有输入项为 0，就将该输入项取反
+
+　　Sum = <span style="text-decoration: overline">AB</span>Cin + <span style="text-decoration: overline">A</span>B<span style="text-decoration: overline">Cin</span> + A<span style="text-decoration: overline">BCin</span> + ABCin
+
+　　Cout = <span style="text-decoration: overline">A</sapn>BCin + A<span style="text-decoration: overline">B</span>Cin + AB<span style="text-decoration: overline">Cin</span> + ABCin
+
 ### 多位加法器
 
 　　有了加法器，我们就可以构建多位加法器了。

@@ -95,6 +140,8 @@
 
 　　比如 4 位加法器。从右往左，每一位都用一个加法器，前一个加法器的进位输出连接到下一个加法器的进位输入。
 
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/content/RCA.png)
+
 　　这种加法器叫做串行进位加法器（Ripple Carry Adder，简称 RCA，也称行波进位加法器）。
 
 　　如果需要计算 8 位，将加法器扩展成 8 位的样子即可，16、32、64 位同理。如果最高位（即二进制最左边的那一位）产生进位，代表超出了此计算机的数据范围。这里简单丢弃，后续再处理。
```

## 第九章：减法器.md

```diff

@@ -26,7 +26,7 @@ A - B = A + (-B)
 
 　　而负数在计算机中用补码表示。所以减法的步骤是：
 
-1. 将参加运算的数字转换为补码
+1. 将参加运算的数字转换为补码（负数需要求补，而因为正数补码为自身，维持原样即可）
 2. 用加法器进行加法运算
 
 ### 具体实现

@@ -67,6 +67,12 @@ A - B = A + (-B)
 
 　　这些部件组合在一起，就构成了完整的减法器。
 
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/content/subtraction-module.png)
+
+**思考题 1**
+
+> 　　可能有细心的读者发现了：A - B，只有 B 经过了求补模块，如果 A 也是负数，需要经过求补模块吗？
+
 ### 更复杂的例子
 
 　　来看一个更复杂的例子，计算 7 - 12：

@@ -89,7 +95,7 @@ A - B = A + (-B)
    - 除符号位按位取反：1000 0101（原码）
    - 符号位为 1，所以是负数：-5
 
-**思考题**
+**思考题 2**
 
 > 　　如果计算 -128 - 1 会发生什么？
 

@@ -140,8 +146,29 @@ A - B = A + (-B)
 - 补码在减法中的应用
 - 减法器的优化方法
 
+### 参考资料
+
+1. [Wikipedia(zh)：算术溢出](https://zh.wikipedia.org/wiki/%E7%AE%97%E8%A1%93%E6%BA%A2%E5%87%BA)：溢出的详细介绍
+2. [Wikipedia(zh)：补码](https://zh.wikipedia.org/wiki/%E4%BA%8C%E8%A3%9C%E6%95%B8)：补码的详细介绍
+
 ### 思考题答案（仅供参考）
 
+#### 思考题 1
+
+　　我们在谈论补码的时候，有两种性质一样的说法：
+
+1. 减法在二进制计算机里的定义是：加上 减数取反后的数值，再加一。
+2. 减去一个数，等于加上这个数的相反数。
+
+　　所以为什么 A - B 中被减数 A 不需要经过求补模块，也可以用这两种说法对应解答：
+
+1. 因为 A 和 B 本身就是补码，而只有减数 B 前面有减号，所以只需要让 B 求补，同理，如果形式变成 - A - B，则需要让 A 和 B 同时求补（虽说变成 -(A + B) 会更简单一些）。
+2. 减去 B 也等于加上 B 的相反数。而之前说过，补码是从相反数相加等于零推导出来的，所以，减去 B 也等于让 B 直接求补。而因为 A 和 B 本身都是补码，对补码再求补，相当于对一个数再取反。
+
+　　
+
+#### 思考题 2
+
 　　计算 -128 - 1：
 1. -128 的补码：1000 0000
 2. -1 的补码：1111 1111

@@ -151,11 +178,6 @@ A - B = A + (-B)
    - 这就是溢出（Overflow）
    - 在 8 位补码系统中，-128 是最小值，再减就会溢出到最大值 +127
 
-### 参考资料
-
-1. [Wikipedia(zh)：算术溢出](https://zh.wikipedia.org/wiki/%E7%AE%97%E8%A1%93%E6%BA%A2%E5%87%BA)：溢出的详细介绍
-2. [Wikipedia(zh)：补码](https://zh.wikipedia.org/wiki/%E4%BA%8C%E8%A3%9C%E6%95%B8)：补码的详细介绍
-
 ### 推荐
 
 - [Bilibili：计算机怎样计算减法](https://www.bilibili.com/video/BV1fr4y1S7gG/)
```

## 第五章：复杂逻辑门基础.md

```diff

@@ -17,7 +17,7 @@
 
 ### 引言
 
-　　如果只用基本逻辑门来构建电路，就像只用最基本的积木搭建房子一样，繁琐。使用一些预制的复杂部件会让搭建更加方便。设计中为了方便，可以一层一层地抽象（ **在计算机科学里，没有什么问题是加一层解决不了的。** ）和展开，在实际流片和生产电子设备的时候，因为全部都用晶体管，所以所有抽象势必都必须要具象到晶体管上。
+　　如果只用基本逻辑门来构建电路，就像只用最基本的积木搭建房子一样，繁琐。使用一些预制的复杂部件会让搭建更加方便。设计中为了方便，可以一层一层地抽象和展开（ **在计算机科学里，没有什么问题是加一层解决不了的** ）。实际流片和生产电子设备的时候，因为全部都用晶体管，所以所有抽象势必都必须要具象到晶体管上。
 
 ### 常见的复杂逻辑门
 

@@ -74,13 +74,20 @@
 
 #### 前提
 
-- 真值表达式整体和初高中学的多项式相同，如：x² + 3x + 2
+- 真值表达式大体和初高中学的多项式相同，如：x² + 3x + 2，但符号体系采用离散数学和布尔逻辑的符号体系
+
 - 如果有 Y = AB + CD 的表达式（Y 是输出，A、B、C、D 是输入），则说明：
-  - Y = 1 时，可以是 AB 为 1，也可以是 CD 为 1（相当于 AB 和 CD 关系为“或”，加号必须写）
-  - 但只有 A = 1 且 B = 1 时 AB 整体才能为 1（相当于 A 和 B 关系为“与”，乘号可以不写）
+  - Y = 1 时，可以是 AB 为 1，也可以是 CD 为 1
+    - AB 和 CD 关系为“或”，加号必须写
+  - 但只有 A = 1 且 B = 1 时 AB 整体才能为 1
+    - A 和 B 关系为“与”，乘号可以不写
+
 - 如果有 Y = AB̅ + C̅D 的表达式（Y 是输出，A、B、C、D 是输入），则说明：
   - Y = 1 时，可以是 AB̅ 为 1，也可以是 C̅D 为 1
-  - 但只有 A = 1 且 **B = 0** 时 AB̅ 整体才能为 1（B̅ 意为 B 取反，读作“B 反”，当 B = 0 时，B 反 = 1；也可以写作 ~B，意义等同）
+  - 但只有 A = 1 且 **B = 0** 时 AB̅ 整体才能为 1
+    - B̅ 意为 B 取反，读作“<span style="text-decoration: overline">B</span> 反”
+    - 当 B = 0 时，<span style="text-decoration: overline">B</span> = 1
+    - 也可以写作 ~B，意义等同
   - 同时只有 **C = 0** 且 D = 1 时 C̅D 整体才能为 1
 
 #### 方法

@@ -107,7 +114,7 @@
 
 3. 针对每一个输入组合，如果有输入项为 0，就将该输入项取反
 
-　　Y = A̅B + AB̅
+　　Y = <span style="text-decoration: overline">A</span>B + A<span style="text-decoration: overline">B</span>
 
 ##### 多路选择器
 

@@ -126,7 +133,7 @@
 
 3. 针对每一个输入组合，如果有输入项为 0，就将该输入项取反
 
-　　Y = S̅AB̅ + S̅AB + SA̅B + SAB
+　　Y = <span style="text-decoration: overline">S</span>A<span style="text-decoration: overline">B</span> + <span style="text-decoration: overline">S</span>AB + S<span style="text-decoration: overline">A</span>B + SAB
 
 ### 根据表达式拼接组合逻辑
 

@@ -142,34 +149,38 @@
 
 1. 如果学习了离散数学，可以先对求出的表达式进行化简
 
-　　因知识所限，暂时无法化简，采用原表达式 Y = A̅B + AB̅（其实已经是最简形式了）。
+　　因知识所限，暂时无法化简，采用原表达式 Y = <span style="text-decoration: overline">A</span>B + A<span style="text-decoration: overline">B</span>（其实已经是最简形式了）。
 
 2. 对每个输入组合，选择与门连接每个输入项，如果有输入项为 0，就提前将该输入项取反
 
-
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/content/xor-step1.png)
 
 3. 对所有 + 号连接的输入组合，选择或门，统一将输入组合的 与门输出 连接到 或门的输入
 
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/content/xor-step2.png)
+
 ##### 多路选择器
 
 1. 如果学习了离散数学，可以先对求出的表达式进行化简
 
-　　使用离散数学化简到最简形式为 Y = S̅A + SB。
+　　使用离散数学化简到最简形式为 Y = <span style="text-decoration: overline">S</span>A + SB。
 
 　　化简过程如下（如果不希望了解，跳过即可，不影响）：
 
-　　1). 分组化简：将 S̅AB̅ 和 S̅AB 合并为 S̅A，将 SA̅B + SAB 合并为 SB。
+　　1). 分组化简：将 <span style="text-decoration: overline">S</span>A<span style="text-decoration: overline">B</span> 和 <span style="text-decoration: overline">S</span>AB 合并为 <span style="text-decoration: overline">S</span>A，将 S<span style="text-decoration: overline">A</span>B + SAB 合并为 SB。
 
-　　（相当于提取公因式：S̅AB̅ + S̅AB = S̅A(B̅ + B)，而 B̅ + B 相当于一个信号和它的相反值相或，其结果恒为 1，所以消去即可。后者同理。）
+　　（相当于提取公因式：<span style="text-decoration: overline">S</span>A<span style="text-decoration: overline">B</span> + <span style="text-decoration: overline">S</span>AB = <span style="text-decoration: overline">S</span>A(<span style="text-decoration: overline">B</span> + B)，而 <span style="text-decoration: overline">B</span> + B 相当于一个信号和它的相反值相或，其结果恒为 1，所以消去即可。后者同理。）
 
-　　2). 观察，已经无法再化简，最简表达式 Y = S̅A + SB。
+　　2). 观察，已经无法再化简，最简表达式 Y = <span style="text-decoration: overline">S</span>A + SB。
 
 2. 对每个输入组合，选择与门连接每个输入项，如果有输入项为 0，就提前将该输入项取反
 
-
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/content/mux-1-bit-step1.png)
 
 3. 对所有 + 号连接的输入组合，选择或门，统一将输入组合的 与门输出 连接到 或门的输入
 
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/content/mux-1-bit-step2.png)
+
 ### 复杂逻辑门的应用
 
 　　复杂逻辑门是由基本逻辑门组合而成的更高级的电路单元，可以大大简化电路设计，提高设计效率，同时可以完成更复杂的功能。我们下一章将设计半加器，到时候我们将会看到：半加器是一个复杂逻辑门的组合。

@@ -186,6 +197,10 @@
 
 　　总体来讲，用的逻辑门越少，开销越少，效率越高。如果看过《第四章：简单逻辑门》的晶体管补充部分，就可以很明显的看出，下面两种设计方案中，第一种方案在晶体管层面要好很多。（如果遗忘了，稍做提醒： and 在晶体管层面其实由 nand + not 搭建而来。）
 
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/content/xor-plan1.png)
+
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/content/xor-plan2.png)
+
 ## 小结
 
 ### 知识点
```

## 第八章：原反补码.md

```diff

@@ -88,7 +88,7 @@
 
 　　<u>也即，从 `0111` 的中间 `1000` 为边界线，两边的数互补，相加结果为 `1111`。</u> 用图表示，大概是这种感觉：
 
-![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-4/2s-complement-axispng.png)
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/content/2s-complement-axispng.png)
 
 - 因为这个编码本身就是从算式（`2 + (-2) = 0`）中推导出来的， **可以直接参与计算** ，叫做 **补码**。
   - 正数的补码是自身——补码本身就是从相反数的编码中推导出来的。
```

## 第六章：半加器.md

```diff

@@ -44,6 +44,8 @@
 
 　　画成组合逻辑电路图，大概长这样：
 
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/content/half-adder.png)
+
 　　对，这就是半加器。就这么简单。
 
 **思考题**
```

## 第四章：简单逻辑门.md

```diff

@@ -16,9 +16,9 @@
 
 ### 引言
 
-　　在前面我们知道了计算机使用二进制，即 0 和 1 来表示数据。那么计算机如何处理这些二进制数据？这就需要今天所学的逻辑门了。
+　　在前面我们知道了计算机使用二进制，即 0 和 1 来表示数据。只有表示还不够，数据还需要处理。而处理的最基础单位，就是今天所要学习的逻辑门。
 
-　　逻辑门就像是电路中的“决策者”，它们根据输入的 0 和 1，按照特定的规则输出 0 或 1。
+　　逻辑门就像是电路中的“决策者”，它们根据输入的 0 和 1，按照特定的规则输出 0 或 1。看起来很抽象，觉得这没什么用，但我们将在后面看到，逻辑门怎样通过特定的连接方式，一步步变成半加器、加法器、算术逻辑单元直至 CPU。
 
 　　最基本的三个逻辑门是：与门（and）、或门（or）和非门（not）。
 
```

## 年度计划.md

```diff

@@ -7,6 +7,7 @@
 ### 注意
 
 - 因并无生理学基础，内科学计划随时可能调整终止，或转向生理学
+- 计算机科学极简入门指南，因大纲频繁调整变动，连带该项年度计划将随时调整更新
 
 ### 计划
 

@@ -108,7 +109,7 @@
   - [x] 两个（2024.1.7）
   - [x] 三个（2024.1.8）
 - [x] 《黑神话：悟空》通关（2024.11.1）
-- [ ] ~~【延续自 2023】Rust 的 Spring Boot 代码生成器 基础功能~~
+- [ ] ~~【经过调整已废弃终止】【延续自 2023】Rust 的 Spring Boot 代码生成器 基础功能~~
   - [ ] ~~读取 JSON 配置文件~~
   - [ ] ~~根据 Test.hbs 文件生成 Test.java 文件~~
   - [ ] ~~连接 MySQL 数据库~~

@@ -205,21 +206,7 @@
   - [x] Mary J
   - [x] Brooklyn
   - [x] Bedrock
-- [ ] 【延续自 2023】计算机科学极简入门指南（至少）计算机组成原理部分
-  - [x] 第一章：计算机的历史
-  - [x] 第二章：计算机的构成
-  - [x] 第三章：简单逻辑门
-  - [x] 第四章：负数与减法
-  - [x] 第五章：乘法与除法
-  - [ ] 第六章：算术逻辑单元
-  - [ ] 第七章：存储器
-  - [ ] 第八章：控制器
-  - [ ] 第九章：指令系统
-  - [ ] 第十章：中央处理器
-  - [ ] 第十一章：总线
-  - [ ] 第十二章：指令流水线
-  - [ ] 第十三章：输入输出系统
-  - [ ] 第十四章：计算机组成原理
+- [ ] 【延续自 2023】【因大纲调整，暂无法列出详情】计算机科学极简入门指南（至少）计算机组成原理部分
 - [x] 《药理学》
   - [x] 第一章 药理学总论一绪言（2024.1.14）
   - [x] 第二章 药物代谢动力学（2024.2.1）
```

## 铭于心 - 林清玄.md

```diff

@@ -0,0 +1,17 @@
+# 铭于心
+
+*林清玄*
+
+　　我妈妈是典型的农家妇女，从前的农家妇女几乎是从不休息的，她们除了带养孩子，还要耕田种作。为了增加收入，她们要养猪种菜做副业；为了减少开支，她们夜里还要亲自为孩子缝制衣裳。
+
+　　记忆中，我的妈妈总是忙碌不堪，有几个画面深印在我的脑海。
+
+　　有一幕是：她叫我和大弟安静地坐在猪舍前面，她背着我最小的弟弟在洗刷猪粪的情景，妈妈的个子矮小，我们坐在猪舍外看进去，只有她的头高过猪圈，于是，她和小弟的头在那里一起一伏，就好像在大海浪里搏斗一样。
+
+　　有一幕是：农忙时节，田里工作的爸爸和叔伯午前总要吃一顿点心止饿。点心通常是咸粥，是昨夜的剩菜和糙米熬煮的，妈妈挑着咸粥走在仅只一尺宽的田埂，卖力地走向田间，她挑的两个桶子，体积比她的身体大得多，感觉好像桶子抬着她，而不是她挑桶子，然后会听见一声高昂的声音：“来哦！来吃咸粥哦！”几里地外都听得见。
+
+　　还有一幕是：只要家里有孩子生病，她就会到庙里烧香拜佛，我每看到她长跪在菩萨面前，双目紧闭，口中喃喃祈求，就觉得妈妈的脸真是美，美到不可方物，与神案上的菩萨一样美，不，比菩萨还要美，因为妈妈有着真实的血肉。每个人的妈妈就是菩萨，母亲心就是佛心呀！
+
+　　由于我深记着那几幕母亲的影像，使我不管遭遇多大的逆境都还能奋发向上，有感恩的心。
+
+　　也使我从幼年到如今，从来没有开口说过一句忤逆母亲的话。
\ No newline at end of file
```
