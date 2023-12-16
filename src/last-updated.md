# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## sitemap.txt

```diff

@@ -277,6 +277,7 @@ https://tinysnow.github.io/每日一文/记住回家的路 - 周国平
 https://tinysnow.github.io/每日一文/讲价 - 梁实秋
 https://tinysnow.github.io/每日一文/论读书 - 培根
 https://tinysnow.github.io/每日一文/谁的生命可以不受时间限制 - 沈从文
+https://tinysnow.github.io/每日一文/谈抽烟 - 朱自清
 https://tinysnow.github.io/每日一文/象的失踪 - 村上春树
 https://tinysnow.github.io/每日一文/赌徒的遗书 - 希区柯克
 https://tinysnow.github.io/每日一文/赞美骨髓 - 蔡澜
```

## 第七章：存储器.md

```diff

@@ -24,7 +24,7 @@
 
 　　正如上面的图所示，非门不仅不会短路，而且输出会一直在 0 和 1 之间跳动。这是一个非常有意思的事情。 <u>利用这个性质可以做一个简单的时钟。</u>
 
-　　<u>时钟</u> 就是字面意思，就像一个钟表一刻一刻地走， <u>用来标记时序</u> ，但现实时钟有 12 个单位，而二进制时钟只有 2 个单位，所以 **时钟会一直在 0 和 1 中间跳变，永不停息** 。
+　　<u>时钟</u> 就是字面意思，就像一个钟表一刻一刻地走， <u>用来标记时序</u> ，但现实时钟有 12 个单位，会从 1 走到 12 然后归位，而二进制时钟只有 2 个单位，所以 **时钟会一直在 0 和 1 中间跳变，永不停息** 。
 
 　　**之所以是简单的时钟，是因为当逻辑门叠加越多，其延迟越高。** 而非门首尾相连构成的时钟跳变速度极快，其他逻辑部件（如加法器、乘法器、锁存器、触发器和选择器等）变化跟不上。简单起见，我们假设所有部件跳变速度一致，不存在这个问题。
 

@@ -42,9 +42,27 @@
 
 　　接下来我们把三大逻辑门按照下面的顺序，连接起来，形成一个奇怪的结构，研究它的真值表。
 
+- 结构
+
 ![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-7/and-or-latch.gif)
 
-　　这个结构，具有记忆和存储的功能。取名为：AND-OR 锁存器。
+- 真值表
+
+| 设置端 S(et) | 重置端 R(eset) |     输出 Y     |
+| :----------: | :------------: | :------------: |
+|      0       |       0        | 上一次的输出 Y |
+|      0       |       1        |       0        |
+|      1       |       0        |       1        |
+|      1       |       1        |       0        |
+
+　　当 S = 0 并且 R = 0 时，下一次的输出 Y 取决于图中或门的另一个引脚，而该引脚连接到了上一次的输出 Y。所以，下一次的输出 Y 等于上一次的输出 Y。 **换句话说，当 S = 0 并且 R = 0 时，这个结构锁住了输入的值。**
+
+- 如果觉得不好理解，把三种情况列出来就明白了：
+- 当 S = **1** , R = 0 变为 S = 0, R = 0 时，之前的输出 Y 为 1，变化后为 1，之后也一直为 1
+- 当 S = 0, R = **1** 变为 S = 0, R = 0 时，之前的输出 Y 为 0，变化后为 0，之后也一直为 0
+- 当 S = **1** , R = **1** 变为 S = 0, R = 0 时，之前的输出 Y 为 0，变化后为 0，之后也一直为 0
+
+　　所以，这个结构，具有记忆和存储的功能。取名为：AND-OR 锁存器。
 
 #### D 锁存器
 

@@ -52,17 +70,51 @@
 
 ![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-7/gated-latch.gif)
 
+　　功能为： **当 WE 为 1 时，输出 Y 的值等于输入端 D 的值；当 WE 为 0 时，不允许写入，输出 Y 的值为上一次输出的值。**
+
 ### 触发器
 
-#### RS 触发器
+#### SR 触发器
 
 　　上述 AND-OR 锁存器可以采取另一种逻辑门实现方案，如下所示：
 
-
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-7/rs-trigger.gif)
 
 　　注意，图中是 nand，也即与非门，从晶体管的角度来说，nand 门要更划算（详见第三章：简单逻辑门的补充部分）。
 
-　　这个东西有另一个名字：RS 触发器。RS 触发器有两个输入端：S(Set) 为设置端，R(Reset) 为重置端。
+　　这个东西有另一个名字：SR 触发器。SR 触发器有两个输入端：S(Set) 为设置端，R(Reset) 为重置端。
+
+- 特征方程（输出公式）：Q<sub>next</sub> = S + <span style="text-decoration:overline">R</span> · Q，且 R · S = 0
+  - <span style="text-decoration:overline">R</span>
+    - 意为 R 的反相，即 R 取反后的值，读作：R 反
+    - 部分教程写作 `R'`，写法不同，效果相同
+  - R · S
+    - 意为 R **与** S，也意为 R 和 S 取 **交集** 
+    - 离散数学和集合论术语，等同于 R ∧ S
+    - 在二进制运算上可以 **一定程度上** 等同于 **乘法** 运算
+  - R + S
+    - 同理， 意为 R **或** S，也意为 R 和 S 取 **并集**
+    - 离散数学和集合论术语，等同于 R ∨ S
+    - 在二进制运算上可以 **一定程度上** 等同于 **加法** 运算
+  - 运算优先级，同十进制加法和乘法运算法则：先乘后加，括号先算
+  - **后文真值表中 X 为 无意义 或者 任意值均可**
+- 状态转移表
+
+|  S   |  R   | Q<sub>next</sub> |     动作     |
+| :--: | :--: | :--------------: | :----------: |
+|  0   |  0   |        Q         |     保持     |
+|  0   |  1   |        0         |     重置     |
+|  1   |  0   |        1         |     设置     |
+|  1   |  1   |        X         | 不允许的输入 |
+
+- 激励表（专业术语，意为上一个输出怎样 影响或激励 下一个输出，所以 Q 在前）
+
+|  Q   | Q<sub>next</sub> |  S   |  R   |
+| :--: | :--------------: | :--: | :--: |
+|  0   |        0         |  X   |  0   |
+|  0   |        1         |  1   |  0   |
+|  1   |        0         |  0   |  1   |
+|  1   |        1         |  X   |  0   |
 
 #### 电平触发和边沿触发
 

@@ -70,34 +122,54 @@
 
 　　**为此，计算机科学家们设计了根据时钟跳变变化的的边沿触发。边沿是指 `1 跳变为 0` 或 `0 跳变为 1` 的一瞬间。根据跳变的方向不同，可以分为上升沿和下降沿，因此触发器也分为上升沿触发和下降沿触发。**
 
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-7/clock-wave.png)
+
 　　边沿触发可以有效解决传输错误的问题。电平只有在单方向跳变时才发生改变，所以电平被干扰和电平反方向跳变均不会引起改变。
 
 #### D 触发器
 
-　　改造上述的 D 锁存器，改为边沿触发。同样，两个输入端：D(Data) 为数据端，但 WE(Write Enable，允许写入) 改为 CP(Clock Pulse，时钟脉冲) 作为信号端，接受一个上升沿或下降沿作为有效输入，其他时间无论高电平和低电平，均视为不允许写入。
-
-　　D 触发器本质是，当每一个上升沿或下降沿触发 CP 端时，将 D 端目前的值输出并锁存。
+　　改造上述的 D 锁存器，改为边沿触发。同样，两个输入端：D(Data) 为数据端，但 WE(Write Enable，允许写入) 改为 Clk(Clock，时钟脉冲) 作为信号端，接受一个上升沿或下降沿作为有效输入，其他时间无论高电平和低电平，均视为不允许写入。
 
+　　D 触发器的功能是： **当每一个上升沿或下降沿触发 Clk 端时，将 D 端目前的值输出并锁存。**
 
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-7/d-trigger.png)
 
-　　D 触发器的真值表如下：
-
-
+- 特征方程（输出公式）：Q<sub>next</sub> = D
+- 真值表
 
-　　从真值表可以很显然地推导出 D 触发器的输出公式：Q<sub>next</sub> = D。
+|  D   |     Clk     |  Q   | Q<sub>next</sub> |
+| :--: | :---------: | :--: | :--------------: |
+|  0   | ↑（上升沿） |  X   |        0         |
+|  1   | ↑（上升沿） |  X   |        1         |
+|  X   |   0 或 1    |  0   |        0         |
+|  X   |   0 或 1    |  1   |        1         |
 
 #### JK 触发器
 
 　　JK 触发器过于复杂，此处不展开。只贴出其原理图、真值表和输出公式，感兴趣的读者可以自行推导。
 
-- 输出公式：Q<sub>next</sub> =
-- 真值表
-
+- 原理图
 
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-7/jk-trigger.png)
 
-- 原理图
+- 特征方程（输出公式）：Q<sub>next</sub> = <span style="text-decoration:overline">K</span> · Q + J · <span style="text-decoration:overline">Q</span>
+- 状态转移表
 
+| J | K | Clk | 动作   | Q<sub>next</sub> |
+|:-:|:-:|:---:|:-----:|:-----:|
+| 0 | 0 | ↑   | 保持 | Q     |
+| 0 | 1 | ↑   | 重置 | 0     |
+| 1 | 0 | ↑   | 设置 | 1     |
+| 1 | 1 | ↑   | 反转   | <span style="text-decoration:overline">Q</span> |
+| X | X | 0 或 1 | 保持 | Q |
+- 激励表
 
+|  Q   | Q<sub>next</sub> | 动作 |  J   |  K   |
+| :--: | :--------------: | :--: | :--: | :--: |
+|  0   |        0         | 不变 |  0   |  X   |
+|  0   |        1         | 设置 |  1   |  X   |
+|  1   |        0         | 重置 |  X   |  1   |
+|  1   |        1         | 不变 |  X   |  0   |
 
 ### 存储器
 

@@ -107,7 +179,7 @@
 
 　　简单堆叠 8 个、16 个、32 个、64 个锁存器或触发器，可形成 8 位、16 位、32 位、64 位的存储器。
 
-
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-7/8-bit-memory.gif)
 
 　　然而，这种方式，位宽越大，成本越高。因为需要的引脚翻倍增长。
 

@@ -122,7 +194,9 @@
 
 #### 矩阵排列
 
-　　将锁存器或触发器呈矩阵排列可以解决上述问题，
+　　将锁存器或触发器呈矩阵排列可以解决上述问题。
+
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-7/matrix-gate-latches.gif)
 
 ## 小结
 

@@ -134,7 +208,7 @@
   - D 锁存器
 - 边沿触发
 - 触发器
-  - RS 触发器
+  - SR 触发器
   - D 触发器
   - JK 触发器
 - 存储器
```
