# 除法器

## 复习

1. 第五章：由基础逻辑门（与或非三门）搭建了更复杂的逻辑门：异或门，同或门，多路选择器
2. 第六章：设计完成了半加器，可以完成两个一位二进制数的加法，但不能处理来自低位的进位
3. 第七章：设计完成了加法器，可以处理三个输入（两个加数和一个进位），并可以串联构成多位加法器
4. 第八章：掌握了原码、反码和补码的概念，理解了补码可以统一加减法运算
5. 第九章：设计完成了减法器，本质是加上一个负数（补码）
6. 第十章：设计完成了乘法器，本质是移位和加法的组合，也可以用 Booth 算法等进行优化

## TL;DR

- 除法可以转换为多次减法
- 通过移位和减法可以实现除法
- 除法器的核心是减法器和移位器
- 除法需要处理除数为零和溢出的特殊情况

## 正文

### 本质

　　加减乘都有了，除法也该来了。除法是乘法的逆运算，但实现起来比乘法要复杂得多。

　　回忆小学怎样算除法。列竖式，试商，减，移位，再试商，再减，再移位……除法本质是反复减法和移位。

```
      4
    _____
 5 / 23
     20
    —————
      3
```

　　而除法本质是反复减法。所以这实际上是：

1. 试商：23 能减几个 5？能减 4 个
2. 减法：23 - 4×5 = 3
3. 结果：商 4，余数 3

### 二进制除法

　　十进制可以这样算，二进制呢？

　　不妨来试试：`15 ÷ 3 = 5`。简单起见，使用无符号数。

```
   1111 | 0011
  -1100 | 0101
   ----
    0011
   -0011
   ----
    0000
```

　　分析一下过程：

1. 第一步（判断 1111 能否减去 1100）：
   ```
   1111 - 1100 = 0011（可以减，商 1）
   ```

2. 第二步（判断 0011 能否减去 0011）：
   ```
   0011 - 0011 = 0000（可以减，商 1）
   ```

3. 最终结果：
   - 商：0101（5）
   - 余数：0000

　　二进制除法的一个好处是：试商时只需要判断能不能减，因为商只可能是 0 或 1。这比十进制除法要简单，因为十进制需要判断能减几次。

### 除法器的构成

　　根据上面的分析，除法器需要以下部件：

1. **减法器**：
   - 用于判断是否可以减去除数
   - 如果可以减，商为 1
   - 如果不可以减，商为 0
   - 可以复用之前设计的减法器

2. **移位器**：
   - 对被除数（余数）进行移位
   - 对商进行移位
   - 与乘法器类似，但移位方向不同

3. **控制电路**：
   - 控制整个除法过程
   - 判断是否结束
   - 处理特殊情况（除数为 0 等）

#### 具体实现

　　以 15 ÷ 3 为例，看看除法器是如何工作的：

1. 初始状态：
   ```
   被除数：1111 (15)
   除数：  0011 (3)
   ```

2. 第一步（判断是否可以减去除数）：
   ```
   1111 - 0011 = 1100
   可以减，商位设为 1
   余数：0011
   ```

3. 第二步（继续用余数判断）：
   ```
   0011 - 0011 = 0000
   可以减，商位设为 1
   余数：0000
   ```

4. 最终结果：
   ```
   商：  0101 (5)
   余数：0000 (0)
   ```

#### 优化思路

　　上述除法过程有一个问题：每次试商都需要实际进行减法，如果不能减，还要恢复原来的值。这在位数较多时会很耗时。目前有两种主要的优化思路：

1. **恢复余数法**：
   - 每次试商后，如果不能减就恢复原来的余数
   - 实现简单，但效率较低
   - 需要额外的存储空间保存原余数

2. **不恢复余数法**：
   - 如果某次减法结果为负（不能减），下一步通过加法来修正
   - 避免了恢复原余数的步骤
   - 需要更复杂的控制电路
   - 但整体效率更高

### 特殊情况处理

　　除法比乘法多了一些特殊情况需要处理：

1. **除数为 0**：
   - 需要在开始除法前检测
   - 如果除数为 0，触发异常
   - 在实际硬件中通常会产生中断

2. **溢出检测**：
   - 当商太大时会发生
   - 例如：8 位除法，被除数 255 除以 1
   - 需要在过程中持续检测

3. **符号处理**：
   - 对于带符号数，需要：
     1. 先确定结果的符号（同号为正，异号为负）
     2. 取操作数的绝对值进行除法
     3. 最后根据符号规则确定最终结果

**思考题 1**

> 　　除法器中的移位操作是左移还是右移？为什么？

**思考题 2**

> 　　不恢复余数法为什么比恢复余数法效率高？试着用一个简单的例子说明。

## 小结

### 知识点

- 除法的本质是反复减法
- 二进制除法的基本步骤
- 除法器的基本构成
  - 减法器
  - 移位器
  - 控制电路
- 除法器的优化方法
  - 恢复余数法
  - 不恢复余数法
- 特殊情况处理
  - 除数为 0
  - 溢出检测
  - 符号处理

### 参考资料

- [Wikipedia(zh)：除法](https://zh.wikipedia.org/wiki/%E9%99%A4%E6%B3%95)：除法的基本概念
- [Wikipedia(zh)：不恢复余数除法](https://zh.wikipedia.org/wiki/%E4%B8%8D%E6%81%A2%E5%A4%8D%E4%BD%99%E6%95%B0%E9%99%A4%E6%B3%95)：一种优化的除法算法
- [Wikipedia(zh)：长除法](https://zh.wikipedia.org/wiki/長除法)：详细的除法算法介绍
- [Wikipedia(zh)：位操作#移位](https://zh.wikipedia.org/wiki/位操作#移位)：关于二进制移位操作
- [BiliBili：计算机如何计算除法](https://www.bilibili.com/video/BV1Jb4y1x7Dw/)：图文并茂的除法器讲解

### 推荐

- [计算机算术运算的硬件实现](https://zhuanlan.zhihu.com/p/339802171)：深入讲解计算机中的算术运算实现
- [除法器的设计与实现](https://www.cnblogs.com/physics-zhu/p/15590359.html)：详细的除法器设计过程

### 思考题答案（仅供参考）

#### 思考题 1

　　除法器中通常使用左移操作：
1. 被除数（余数）左移一位，相当于乘 2
2. 这样可以逐步处理每一位商
3. 最后得到的商不需要移位

#### 思考题 2

　　以 7 ÷ 2 为例说明：

1. 恢复余数法：
   ```
   0111 - 0010 = 0101（可以减，商 1）
   0101 - 0010 = 0011（可以减，商 1）
   0011 - 0010 = 0001（可以减，商 1）
   0001 - 0010 = 1111（不能减，需要恢复到 0001，商 0）
   ```

2. 不恢复余数法：
   ```
   0111 - 0010 = 0101（可以减，商 1）
   0101 - 0010 = 0011（可以减，商 1）
   0011 - 0010 = 0001（可以减，商 1）
   0001 - 0010 = 1111（不能减，但不恢复，直接进入下一步）
   ```

　　可以看到，不恢复余数法省去了恢复的步骤，虽然可能需要后续的修正，但总体上减少了操作次数。

## 协议

　　本作品采用[知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh)进行许可。

## 封面图

![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/computer-science-guide/cover/除法器.png)

> 设计师 | 南国微雪