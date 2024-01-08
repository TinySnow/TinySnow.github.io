# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## SUMMARY.md

```diff

@@ -7,6 +7,7 @@
 - [年度计划 | Year Plan](年度计划.md)
 -----
 - [每日一文 | Daily Article](每日一文/每日一文.md)
+  - [弗洛伊德和受虐狂 - 王小波](每日一文/弗洛伊德和受虐狂%20-%20王小波.md)
   - [猫 - 汪曾祺](每日一文/猫%20-%20汪曾祺.md)
   - [思念那不在者 - 梁文道](每日一文/思念那不在者%20-%20梁文道.md)
   - [魔术师与跛足驴 - 迟子建](每日一文/魔术师与跛足驴%20-%20迟子建.md)
```

## sitemap.txt

```diff

@@ -226,6 +226,7 @@ https://tinysnow.github.io/每日一文/狗这一生不容易 - 王宏哲
 https://tinysnow.github.io/每日一文/狗难 - 柯灵
 https://tinysnow.github.io/每日一文/独处是一种能力 - 周国平
 https://tinysnow.github.io/每日一文/狼叔叔 - 伊塔洛 · 卡尔维诺
+https://tinysnow.github.io/每日一文/猫 - 汪曾祺
 https://tinysnow.github.io/每日一文/猫城的故事 - 村上春树
 https://tinysnow.github.io/每日一文/猴子 - 芥川龙之介
 https://tinysnow.github.io/每日一文/王府大街 64 号 - 雷达

@@ -926,8 +927,6 @@ https://tinysnow.github.io/读书/零零散散/零零散散
 https://tinysnow.github.io/读书/零零散散/霍乱时期的爱情
 https://tinysnow.github.io/读书/零零散散/非暴力沟通
 https://tinysnow.github.io/读书/零零散散/麻省理工深度思考法
-https://tinysnow.github.io/学习/医学/药理学/第一节：药物分子的跨膜转运
-https://tinysnow.github.io/学习/医学/药理学/第二节：药物的体内过程
 https://tinysnow.github.io/学习/医学/药理学/药物代谢动力学
 https://tinysnow.github.io/学习/医学/药理学/药理学
 https://tinysnow.github.io/学习/医学/药理学/药理学总论——绪言

@@ -1007,3 +1006,5 @@ https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio
 https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第三轮考核说明文档
 https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第三轮项目途中报错及解决方案
 https://tinysnow.github.io/技术/其他资料/WingStudio/WingStudio 第二轮考核 工程实现记录
+https://tinysnow.github.io/学习/医学/药理学/药物代谢动力学/第一节：药物分子的跨膜转运
+https://tinysnow.github.io/学习/医学/药理学/药物代谢动力学/第二节：药物的体内过程
```

## 年度计划.md

```diff

@@ -15,8 +15,8 @@
   - [ ] 心拍数♯0822
 - [ ] 日语语法指南 看完
 - [ ] 《Baba is You》三个大关卡
-  - [ ] 一个
-  - [ ] 两个
+  - [x] 一个（2024.1.6）
+  - [x] 两个（2024.1.7）
   - [ ] 三个
 - [ ] 《黑神话：悟空》通关
 - [ ] 【延续自 2023】Rust 的 Spring Boot 代码生成器 基础功能

@@ -31,30 +31,30 @@
   - [ ] 半马一次
 - [ ] 存到能买起 99 新 E 18-135mm f3.5-5.6 OSS 镜头的钱（买不买另说）
 - [ ] 87 个 Hiphop 元素基础动作（非进阶叠加）
-  - [ ] Running Man
-  - [ ] BK Bounce
-  - [ ] Crab
-  - [ ] Happy Feet
-  - [ ] Patty Duke
-  - [ ] Yeek
-  - [ ] Kick
-  - [ ] Party Machine
+  - [x] Running Man
+  - [x] BK Bounce
+  - [x] Crab
+  - [x] Happy Feet
+  - [x] Patty Duke
+  - [x] Yeek
+  - [x] Kick
+  - [x] Party Machine
   - [ ] Walk it Out
   - [ ] Walk Out
-  - [ ] Prep
+  - [x] Prep
   - [ ] Wu-Tang
   - [ ] The Wop
   - [ ] The Box Step
   - [ ] The Camel Walk
   - [ ] Sponge Bob
-  - [ ] Typewriter
-  - [ ] ATL Stomp
+  - [x] Typewriter
+  - [x] ATL Stomp
   - [ ] Reject
   - [ ] Jerk
-  - [ ] Charleston
+  - [x] Charleston
   - [ ] Kid 'N Play
   - [ ] TLC
-  - [ ] Biz Markie
+  - [x] Biz Markie
   - [ ] Janet Jackson
   - [ ] James Brown
   - [ ] LL Cool J

@@ -66,12 +66,12 @@
   - [ ] Chicken Noodle Soup
   - [ ] Get Lite
   - [ ] Steve Martin
-  - [ ] Reebok
+  - [x] Reebok
   - [ ] Cabbage Patch
-  - [ ] Gucci
+  - [x] Gucci
   - [ ] Skate
   - [ ] The Hummpty Dance
-  - [ ] Stomp
+  - [x] Stomp
   - [ ] Popcorn
   - [ ] Rock Off
   - [ ] Shamrock

@@ -119,11 +119,11 @@
   - [ ] Brooklyn
   - [ ] Bedrock
 - [ ] 【延续自 2023】计算机科学极简入门指南（至少）计算机组成原理部分
-  - [ ] 第一章：计算机的历史
-  - [ ] 第二章：计算机的构成
-  - [ ] 第三章：简单逻辑门
-  - [ ] 第四章：负数与减法
-  - [ ] 第五章：乘法与除法
+  - [x] 第一章：计算机的历史
+  - [x] 第二章：计算机的构成
+  - [x] 第三章：简单逻辑门
+  - [x] 第四章：负数与减法
+  - [x] 第五章：乘法与除法
   - [ ] 第六章：算术逻辑单元
   - [ ] 第七章：存储器
   - [ ] 第八章：控制器
```

## 弗洛伊德和受虐狂 - 王小波.md

```diff

@@ -0,0 +1,11 @@
+# 弗洛伊德和受虐狂
+
+*王小波*
+
+　　我说过，以后写杂文要斯文一些，引经据典。今天要引的经典是弗洛依德。他老人家说过：从某种意义上说，我们每个人都有点歇斯底里——这真是至理名言！所谓歇斯底里，就是按不下心头一股无明火，行为失范。谁都有这种时候，但自打十年前我把弗洛依德全集通读了一遍之后，自觉脾气好多了。古人有首咏雪的打油诗曰：夜来北风寒，老天大吐痰。一轮红日出，便是止痰丸——有些人的痰气简直比雪天的老天爷还大。谁能当这枚止痰丸呢？只有弗洛依德。
+
+　　年轻时，我在街道工厂当工人。有位师傅常跑到班长那里去说病了，要请假。班长问他有何症状，他说他看天是蓝色，看地是土色，蹲在厕所里任什么都不想吃。当然，他是在装骚鞑子。看天土色看地蓝色，蹲在臭烘烘茅坑上食欲大开，那才叫作有病——在这些小问题上，很容易取得共识，但大问题就很难说了。举例来说，法国人在马赛曲里唱道：不自由毋宁死；这话有人是不同意的。不信你就找本辜鸿铭的书来看看，里面大谈所谓良民宗教，简直就是在高唱：若自由毋宁死。《独立宣言》里说：我们认为，人人生而平等。这话是讲给英国皇上听的，表明了平民的尊严。这话孟夫子一定反对，他说过：无君无父，是禽兽也——这又简直是宣布说，平民不该有自己的尊严。总而言之，个人的体面与尊严，平等、自由等等概念，中国的传统文化里是没有的，有的全是些相反的东西。我是很爱国的，这体现在：我希望伏尔泰、杰弗逊的文章能归到辜鸿铭的名下；而把辜鸿铭的文章栽给洋鬼子。假如这是事实的话，我会感到幸福得多。
+
+　　有时候我想：假如“大跃进”、“文化革命”这些事，不是发生在中国，而是发生在外国，该有多好。这些想法很不体面，但还不能说是有痰。有些坏事发生在了中国，我们就说它好，有些鬼话是中国人说的，我们就说它有理，这种作法就叫作有痰气。有些年轻人把这些有痰气的想法写成书，他本人倒不见得是真有痰，不过是哗众取宠罢了。一种普遍存在的事态比这要命得多。举例来说，很多中年人因为文革中上山下乡虚耗了青春，这本是种巨大的痛苦；但他们却觉得很幸福，还说：青春无悔！再比方说，古往今来的中国人总在权势面前屈膝，毁掉了自己的尊严，也毁掉了自己的聪明才智。这本是种痛苦，但又有人说：这很幸福！久而久之，搞到了是非难辨，香臭不知的地步……这就是我们嗓子里噎着的痰。扯完了这些，就可以来谈谈我的典故。
+
+　　众所周知，有一种人，起码是在表面上，不喜欢快乐，而喜欢痛苦；不喜欢体面和尊严，喜欢奴役与屈辱，这就是受虐狂。弗洛依德对受虐狂的成因有这样一种解释：人若落入一种无法摆脱的痛苦之中，到了难以承受的地步，就会把这种痛苦看作是幸福，用这种方式来寻求解脱——这样一来，他的价值观就被逆转过来了。当然，这种过程因人而异。有些人是不会被逆转的。比方说我吧，在痛苦的重压下，会有些不体面的想法，但还不会被逆转。另有一些人不仅被逆转，而且还有了痰气，一听到别人说自由、体面、尊严等等是好的，马上就怒火万丈——这就有点不对头了，世界上哪有这样气焰万丈的受虐狂？——你就是真有这种毛病，也不要这个样子嘛。
\ No newline at end of file
```
