# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## sitemap.txt

```diff

@@ -38,6 +38,7 @@ https://tinysnow.github.io/每日一文/王府大街 64 号 - 雷达
 https://tinysnow.github.io/每日一文/第三大道的这间酒馆 - 约翰·麦克纳尔蒂
 https://tinysnow.github.io/每日一文/等我一年半 - 松本清张
 https://tinysnow.github.io/每日一文/致陈独秀 - 胡适
+https://tinysnow.github.io/每日一文/花脸雀 - 李娟
 https://tinysnow.github.io/每日一文/那些你所不知道的大事 - 李月亮
 https://tinysnow.github.io/每日一文/雨伞 - 川端康成
 https://tinysnow.github.io/每日一文/青春 - 亦舒

@@ -200,6 +201,7 @@ https://tinysnow.github.io/断章/文章/所想所见即真实
 https://tinysnow.github.io/断章/文章/文章
 https://tinysnow.github.io/断章/文章/暑期总结与瑰想
 https://tinysnow.github.io/断章/文章/月圆夜
+https://tinysnow.github.io/断章/文章/母亲的理发推
 https://tinysnow.github.io/断章/文章/烟火自述
 https://tinysnow.github.io/断章/文章/猫猫戒指
 https://tinysnow.github.io/断章/文章/番茄
```


## 第三章：简单逻辑门.md

```diff

@@ -33,7 +33,7 @@
 | 1      | 0      | 1      |
 | 1      | 1      | 1      |
 
-- 非门（输入为 1 时输出为 0，输入为 0 时输出为 1，“真假对调”）
+- 非门（也称反相器，输入为 1 时输出为 0，输入为 0 时输出为 1，“真假对调”）
 
 | 输入 | 输出 |
 | :--: | :--: |

@@ -72,12 +72,8 @@
 
 　　异或门电路可以使用基础三门搭建，方案也很多。总体来讲，用的逻辑门越少，开销越少，效率越高。下面两种设计方案中，很明显，第一种方案要好。
 
-- 第一种方案，四个与非门（4 nand）：
-
 ![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-3/nand-xor.png)
 
-- 第二种方案，五个基础逻辑门（2 not + 2 and + 1 or）：
-
 ![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-3/overzicht-xor.jpg)
 
 　　接下来处理棘手的进位问题：

@@ -86,27 +82,25 @@
 
 　　**综上所述，二进制的一位加法器（带进位）可以用一个异或门加上一个与门表示。** 将输入输出引脚分列两边，中间加上逻辑门，可以获得一个一位加法器。
 
-- 上为异或门，下为与门，输出 S（Sum）为和，输出 C（Carry）为进位
-
 ![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-3/half-adder.png)
 
 　　上述一位加法器也称**半加器**。
 
-### 全加器
+### 加法器（全加器）
 
 　　来看一个例子，为简化问题，此处数据设为 4 位：计算 0011 + 1001。拆解为 4 个子问题，逐位相加，从左开始：0 + 1，0 + 0，1 + 0，1 + 1。可以观察到这四个问题可以用 4 个半加器解决。但是同时观察到，最后的子问题 1 + 1 产生了进位，所以还需要加上进位。
 
 　　加上进位是个麻烦事。为了之后方便，可以将进位也直接纳入半加器电路，成为 3 输入 2 输出的一个全加器芯片。如图：
 
-
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-3/adder.png)
 
 　　针对此例子可以画出如下电路图：
 
-
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-3/0011+1001.png)
 
 　　将问题泛化：计算 abcd + efgh（一个字母代表一个比特位）。产生 4 个子问题：a + e，b + f，c + g，d + h。因为不知道哪个问题会产生进位，所以均需要加上进位，如图：
 
-
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/chapter-3/abcd+efgh.png)
 
 　　如果需要计算 8 位，将半加器扩展成 8 位的样子即可，16、32、64 位同理。
 

@@ -114,9 +108,9 @@
 
 ### 效率？
 
-　　需要说明的是，将全加器直接串联起来构成加法器，**尤其懒惰和低效**。现代电子所用的加法器，经过优化，速度更快。**但无论如何，我们已经拥有加法器了。**
+　　需要说明的是，将全加器直接串联起来构成的串行进位加法器（也称行波进位加法器），**尤其懒惰和低效**。现代电子所用的加法器，经过优化，速度更快。**但无论如何，我们已经拥有加法器了。**
 
-　　**本指南侧重如何构成加法器**，不涉及加法器的优化，所以之后提到加法器时，默认已经过优化，效率比此章设计的全加器要高。
+　　**本指南侧重如何构成加法器**，不涉及加法器的优化，所以之后提到加法器时，默认已经过优化，效率比此章设计的加法器要高。
 
 **思考题**
 

@@ -128,8 +122,32 @@
 
 ## 补充
 
+　　符号说明：
+
+- <u>NMOS **高于** 阈值电压导通，**低于** 阈值电压不导通</u>
+- <u>PMOS 则相反</u>
+- <u>V<sub>dd</sub> 为供电电压，恒为 1</u>
+- <u>GND/V<sub>ss</sub> 为接地电压，恒为 0</u>
+- <u>接入端 A 和 B 为接入电压，可高可低，高于阈值电压为 1，低于阈值电压为 0</u>
+
 　　CMOS（互补式金属氧化物半导体）晶体管搭建三基础门的电路图：
 
+- 非门（反相器）
+
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/cmos-inverter.png)
+
+- 与非门
+
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/cmos-nand.png)
+
+- 与门（可以看出实际上就是 nand + not 两模块构成）
+
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/cmos-add.png)
+
+- 或门（与上同理，由 nor + not 构成）
+
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/cs-teaching/cmos-or.png)
+
 ## 小结
 
 ### 知识点

@@ -148,7 +166,7 @@
 
 ### 思考题答案（仅供参考）
 
-　　可以使用[超前进位加法器](https://zh.wikipedia.org/wiki/%E5%8A%A0%E6%B3%95%E5%99%A8#%E8%B6%85%E5%89%8D%E8%BF%9B%E4%BD%8D%E5%8A%A0%E6%B3%95%E5%99%A8)。分析依赖关系之后，可以将进位从串联改为并联，能一定程度上提高效率。但当规模特别大时，此加法器也有局限性。需要数字电路知识。
+　　可以使用[超前进位加法器](https://zh.wikipedia.org/wiki/%E5%8A%A0%E6%B3%95%E5%99%A8#%E8%B6%85%E5%89%8D%E8%BF%9B%E4%BD%8D%E5%8A%A0%E6%B3%95%E5%99%A8)（也称并行进位加法器）。分析依赖关系之后，可以将进位从串联改为并联，能一定程度上提高效率。但当规模特别大时，此加法器会导致晶体管或逻辑门的数量指数级上升。需要数字电路知识。
 
 ## 协议
 
```
