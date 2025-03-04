# Java

## 基本知识

### 8种基本数据类型

| 数据类型 | 占位 | 表示范围 | 其他 |
| -------- | ---- | -------- | ---- |
|          |      |          |      |
| byte | 1B | -128~+127 | |
| short | 2B | -65536~+65535 | |
| int | 4B | -2^31~+2^31-1 | 默认 |
| long | 8B | -2^63~+2^63-1 | 需要在数据最后加L或l |
| float | 4B | | 需要在数据最后加F或f |
| double | 8B | | 默认 |
| boolean | 1B | true或false | |
| char | 2B | 所有unicode字符 | 可以表示所有汉字+emoji |

> 为什么表示范围负数会比正数多1位：
>
> > 正数用0表示，负数用1表示
>
> 原码：9 -> 01001，-9 -> 11001
>
> > 原码有+0和-0之分
>
> 反码：正数同原码，负数是原码除符号位之外其余位数取反(1变0，0变1)。反码也有+0和-0之分
>
> 补码：正数同原码，负数是原码除符号位之外其余位数取反+1，补码没有+0和-0之分
>
> > 补码：
> >
> > +0: 0 00000
> >
> > -0: 1 00000 -> 10 00000 -> 0 000000
> >
> > -0：在补码中表示数轴上最小的那一位
> 十进制转换为二进制：
>
> 1. 整数部分: 除基取余，余数逆置
> 2. 小数部分: 乘基取整，整数顺置
>
> 二进制转换为十进制：
>
> - 当成科学计数法直接相加
>
> 二进制转换为八进制：
>
> - 3个二进制位联合起来转换成8进制
>
> 二进制转换为十六进制：
>
> - 4个二进制位联合起来转换成16进制
>
> 八进制转换为十六进制：
>
> - 通过二进制转换

### 对象和数组

Java中数组里存放的如果是基本数据类型，那么数值就是基本类型的数值；如果是引用对象，那么<font color = red>数值就是这个引用对象在内存当中的地址</font>

### 数据运算

+, -, *, /, %同C语言

+=, -=, *=, /=, %=不讲

### 逻辑运算

&&, ||, !, ==同C语言

&, | 这两个运算符不短路

### 位运算

&：按位与                                同1为1，有0为0

|：按位或                                有1为1，同0为0

!：按位取反                         变0为1，变1为0

^：异或                                        不同为1，相同为0

> 任何数与0异或不变，与1异或取反，与自身异或为0

## 控制流程

if - else

for

while

do - while

switch - case：case穿越，即匹配到第一个case之后，如果没有遇到break会一直执行其他的case，直到遇到break或者执行完为止；

标签：大写字符+冒号

break和continue：默认只控制一层循环，如果有标签可以控制跳出标签

## 面向对象

### 面向对象三大特性

- 封装

- 由来：通过封装可以使得代码耦合度降低，减少代码改动

- 关键字：public, protected, private, 默认(什么都不写)

- public：公共访问，所有人都可以访问

- protected：只有自己内部和同包的其他类以及不同包的子类可以访问

- 默认：只有自己内部和同包的其他类可以访问

- private：只有自己内部可以访问

> 包：其实就是文件夹

- 其他：

- static：声明一个方法或者一个变量属于这个类，而不是属于这个类的对象；

- 继承

- 由来：通过一个类制造另一个类，使得父类中的方法和变量可以被子类覆盖。

- 关键字：extends

- 其他：final：对于基本数据类型变量来说，其值不可更改，对于引用数据类型变量来说，其引用的对象不能变成另一个对象，但是对象里面的值可以更改。对于方法来说，这个方法不能被重写

> 重写：发生在父类和子类之间，方法名称要相同，方法返回值要相同，方法的参数类型和个数要相同
>
> 重载：发生在一个类的内部，方法名称要相同，方法返回值不能作为重载的标准，方法的参数类型和个数要不同

- 多态

- 由来：通过父类的引用对象指向子类的变量。引用对象调用非静态方法的时候是调用子类的方法，除此之外，引用对象调用普通变量，静态变量，静态方法都是调用父类的。

- 好处：如果需要替换实现类的时候只用替换变量，不需要作其他改动；

### 构造器和方法的定义

#### 构造器

构造器和类名要相同，构造器可以接受多个参数，构造器可以重载。构造器是制造对象的唯一途径；

如果没有自己写构造器，那么系统过自己分配一个无参构造器，如果自己写了构造器，那么系统不会自动分配。

#### 方法的定义

访问控制符+(static)+(final)+返回值+方法名称+(形参类型 形参变量1,形参类型 形参变量2...)