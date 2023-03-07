# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## autopush.sh

```diff

@@ -29,7 +29,7 @@ if [[ $1 ]]; then
 	# 生成 sitemap.xml 和 sitemap.txt 文件，借助 static-sitemap-cli
 	# 安装 static-sitemap-cli 命令： npm i -g static-sitemap-cli
 	
-	if ![[ "$OSTYPE" =~ ^linux ]]; then
+	if ! [[ "$OSTYPE" =~ linux ]]; then
 	
 		sscli -b https://tinysnow.github.io -r ./book
 
```

## sitemap.txt

```diff

@@ -4,7 +4,6 @@ https://tinysnow.github.io/个人简介
 https://tinysnow.github.io/问题总表
 https://tinysnow.github.io/学习/学习
 https://tinysnow.github.io/学习/耶鲁大学：心理学导论
-https://tinysnow.github.io/小说/小说
 https://tinysnow.github.io/技术/Errors
 https://tinysnow.github.io/技术/Knowledge
 https://tinysnow.github.io/技术/技术

@@ -32,6 +31,7 @@ https://tinysnow.github.io/每日一文/我来讲一个故事 - 加西亚 · 马
 https://tinysnow.github.io/每日一文/敬酒要喝 - 梁文道
 https://tinysnow.github.io/每日一文/断爱近涅盘 - 林清玄
 https://tinysnow.github.io/每日一文/时间旅行者的妻子 - 奥德丽 · 尼芬格
+https://tinysnow.github.io/每日一文/未婚妻 - 玛 · 奥克罗克斯
 https://tinysnow.github.io/每日一文/槐花 - 汪曾祺
 https://tinysnow.github.io/每日一文/每日一文
 https://tinysnow.github.io/每日一文/没有一本一劳永逸的书 - 毛姆

@@ -53,9 +53,9 @@ https://tinysnow.github.io/每日一文/花未眠 - 川端康成
 https://tinysnow.github.io/每日一文/花脸雀 - 李娟
 https://tinysnow.github.io/每日一文/还记得十六岁时的梦想吗 - 艾明雅
 https://tinysnow.github.io/每日一文/那些你所不知道的大事 - 李月亮
+https://tinysnow.github.io/每日一文/郁金香 - 玛丽娅 · 恩里凯达
 https://tinysnow.github.io/每日一文/雨伞 - 川端康成
 https://tinysnow.github.io/每日一文/青春 - 亦舒
-https://tinysnow.github.io/笔记/笔记
 https://tinysnow.github.io/读书/电影台词
 https://tinysnow.github.io/读书/读书
 https://tinysnow.github.io/学习/公共基础知识/中国近现代史

@@ -107,48 +107,6 @@ https://tinysnow.github.io/学习/零碎知识整理/零碎知识整理
 https://tinysnow.github.io/学习/音乐/基础乐理
 https://tinysnow.github.io/学习/音乐/常用三和弦
 https://tinysnow.github.io/学习/音乐/音乐
-https://tinysnow.github.io/小说/其他小说/Chapter 1
-https://tinysnow.github.io/小说/其他小说/其他小说
-https://tinysnow.github.io/小说/其他小说/夜天盛世夜天梦
-https://tinysnow.github.io/小说/其他小说/小说设定
-https://tinysnow.github.io/小说/其他小说/恋人之间的秘密
-https://tinysnow.github.io/小说/其他小说/第一章 冲击
-https://tinysnow.github.io/小说/其他小说/第二章 巨变
-https://tinysnow.github.io/小说/想象力训练/想象力训练
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 公主与夫人（《欢恋》番外）
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 分享
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 可能会知道
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 女性知识
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 少女的夏天
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 就算是厨师也能照亮他人
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 散打很温柔
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 昂贵的教师
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 普通
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 欺负人
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 满足
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 美术生的夜晚
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 芭蕾舞者欺负人
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 认真地发光
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 设计师想要恋爱
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 证明你喜欢
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 遗留
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 酒保与冷静
-https://tinysnow.github.io/小说/想象力训练/想象力训练之一
-https://tinysnow.github.io/小说/想象力训练/想象力训练之三
-https://tinysnow.github.io/小说/想象力训练/想象力训练之二
-https://tinysnow.github.io/小说/想象力训练/想象力训练之五
-https://tinysnow.github.io/小说/想象力训练/想象力训练之六
-https://tinysnow.github.io/小说/想象力训练/想象力训练之四
-https://tinysnow.github.io/小说/想象力训练/承 K 之名
-https://tinysnow.github.io/小说/想象力训练/无题之一
-https://tinysnow.github.io/小说/想象力训练/有些事情，不应转瞬即逝
-https://tinysnow.github.io/小说/想象力训练/欢恋
-https://tinysnow.github.io/小说/想象力训练/深入骨髓
-https://tinysnow.github.io/小说/想象力训练/理想雪 - 为你化妆
-https://tinysnow.github.io/小说/想象力训练/理想雪 - 应不应该
-https://tinysnow.github.io/小说/想象力训练/理想雪 - 那些不重要
-https://tinysnow.github.io/小说/想象力训练/靛青之秋之一
-https://tinysnow.github.io/小说/想象力训练/靛青之秋之二
 https://tinysnow.github.io/技术/ArchRISC-V/ArchRISC-V
 https://tinysnow.github.io/技术/ArchRISC-V/FrequentlyUsed
 https://tinysnow.github.io/技术/ArchRISC-V/IssueTemplate

@@ -181,8 +139,10 @@ https://tinysnow.github.io/技术/其他资料/设计模式极简笔记
 https://tinysnow.github.io/技术/其他资料/软件知识补充
 https://tinysnow.github.io/技术/其他资料/重装系统 8-7
 https://tinysnow.github.io/技术/其他资料/重装系统知识
+https://tinysnow.github.io/技术/实践记录/ElasticSearch启用
 https://tinysnow.github.io/技术/实践记录/MySQL与ElasticSearch的数据同步尝试
 https://tinysnow.github.io/技术/实践记录/实践记录
+https://tinysnow.github.io/技术/实践记录/毕业设计环境准备
 https://tinysnow.github.io/技术/计算机科学极简入门指南/第一章：计算机的历史
 https://tinysnow.github.io/技术/计算机科学极简入门指南/第三章：简单逻辑门
 https://tinysnow.github.io/技术/计算机科学极简入门指南/第二章：计算机的构成

@@ -363,26 +323,6 @@ https://tinysnow.github.io/断章/随记/随记 - 2022 年 9 月 26 日
 https://tinysnow.github.io/断章/随记/随记 - 2023 年 1 月 18 日
 https://tinysnow.github.io/断章/随记/随记之一 - 2021 年 6 月 13 日
 https://tinysnow.github.io/断章/随记/随记之二 - 2021 年 6 月 13 日
-https://tinysnow.github.io/笔记/教程/Basic Elements
-https://tinysnow.github.io/笔记/教程/Duilib安装教程
-https://tinysnow.github.io/笔记/教程/Git 笔记
-https://tinysnow.github.io/笔记/教程/Street Dance Basics
-https://tinysnow.github.io/笔记/教程/刷机教程
-https://tinysnow.github.io/笔记/教程/手机系统更新意外处理
-https://tinysnow.github.io/笔记/教程/教程
-https://tinysnow.github.io/笔记/教程/重装系统
-https://tinysnow.github.io/笔记/记录/GalGame 记录
-https://tinysnow.github.io/笔记/记录/优秀作品记录
-https://tinysnow.github.io/笔记/记录/喜爱的舞者
-https://tinysnow.github.io/笔记/记录/喜爱角色记录
-https://tinysnow.github.io/笔记/记录/已投递的简历
-https://tinysnow.github.io/笔记/记录/已读书目记录
-https://tinysnow.github.io/笔记/记录/游玩游戏记录
-https://tinysnow.github.io/笔记/记录/番剧记录
-https://tinysnow.github.io/笔记/记录/衣服风格记录
-https://tinysnow.github.io/笔记/记录/观影记录
-https://tinysnow.github.io/笔记/记录/记录
-https://tinysnow.github.io/笔记/记录/软件订阅记录
 https://tinysnow.github.io/读书/亲密关系/亲密关系
 https://tinysnow.github.io/读书/亲密关系/第一章：人际关系的构成
 https://tinysnow.github.io/读书/亲密关系/第七章：友谊

@@ -415,14 +355,11 @@ https://tinysnow.github.io/读书/没事，一切都会好起来的/幸福
 https://tinysnow.github.io/读书/没事，一切都会好起来的/心
 https://tinysnow.github.io/读书/没事，一切都会好起来的/我的宇宙
 https://tinysnow.github.io/读书/没事，一切都会好起来的/散步
-https://tinysnow.github.io/读书/没事，一切都会好起来的/最美的东西
 https://tinysnow.github.io/读书/没事，一切都会好起来的/朝着尽头
 https://tinysnow.github.io/读书/没事，一切都会好起来的/来自宇宙的信
 https://tinysnow.github.io/读书/没事，一切都会好起来的/来自月亮的回信
-https://tinysnow.github.io/读书/没事，一切都会好起来的/枕边的故事
 https://tinysnow.github.io/读书/没事，一切都会好起来的/梦尽头的你
 https://tinysnow.github.io/读书/没事，一切都会好起来的/梦的距离
-https://tinysnow.github.io/读书/没事，一切都会好起来的/永远
 https://tinysnow.github.io/读书/没事，一切都会好起来的/沙漠里的玫瑰
 https://tinysnow.github.io/读书/没事，一切都会好起来的/没事，一切都会好起来的
 https://tinysnow.github.io/读书/没事，一切都会好起来的/海浪

@@ -434,37 +371,12 @@ https://tinysnow.github.io/读书/没事，一切都会好起来的/相信
 https://tinysnow.github.io/读书/没事，一切都会好起来的/离别
 https://tinysnow.github.io/读书/没事，一切都会好起来的/精灵之舞
 https://tinysnow.github.io/读书/没事，一切都会好起来的/紧急降落
-https://tinysnow.github.io/读书/没事，一切都会好起来的/终点站
 https://tinysnow.github.io/读书/没事，一切都会好起来的/给你
 https://tinysnow.github.io/读书/没事，一切都会好起来的/花
 https://tinysnow.github.io/读书/没事，一切都会好起来的/门
 https://tinysnow.github.io/读书/没事，一切都会好起来的/阳光
 https://tinysnow.github.io/读书/没事，一切都会好起来的/音乐
 https://tinysnow.github.io/读书/没事，一切都会好起来的/飞吧
-https://tinysnow.github.io/读书/零零散散/二十首情诗和一首绝望的歌
-https://tinysnow.github.io/读书/零零散散/人间告白
-https://tinysnow.github.io/读书/零零散散/你当像鸟飞往你的山
-https://tinysnow.github.io/读书/零零散散/大型网站技术架构：核心原理与案例分析
-https://tinysnow.github.io/读书/零零散散/如何阅读一本书
-https://tinysnow.github.io/读书/零零散散/山茶文具店
-https://tinysnow.github.io/读书/零零散散/强风吹拂
-https://tinysnow.github.io/读书/零零散散/快速抓重点，过目不忘的阅读术
-https://tinysnow.github.io/读书/零零散散/我想要两颗西柚
-https://tinysnow.github.io/读书/零零散散/我离开之后
-https://tinysnow.github.io/读书/零零散散/数学之美
-https://tinysnow.github.io/读书/零零散散/时间简史
-https://tinysnow.github.io/读书/零零散散/明天，我要和昨天的你约会
-https://tinysnow.github.io/读书/零零散散/智齿
-https://tinysnow.github.io/读书/零零散散/漫画经济学：生活常识
-https://tinysnow.github.io/读书/零零散散/漫画经济学：金融危机
-https://tinysnow.github.io/读书/零零散散/焦虑的人
-https://tinysnow.github.io/读书/零零散散/狮子之家的点心日
-https://tinysnow.github.io/读书/零零散散/美元真相
-https://tinysnow.github.io/读书/零零散散/追风筝的人
-https://tinysnow.github.io/读书/零零散散/零零散散
-https://tinysnow.github.io/读书/零零散散/霍乱时期的爱情
-https://tinysnow.github.io/读书/零零散散/非暴力沟通
-https://tinysnow.github.io/读书/零零散散/麻省理工深度思考法
 https://tinysnow.github.io/技术/ArchRISC-V/Packages/Packages
 https://tinysnow.github.io/技术/ArchRISC-V/Packages/SVT-HEVC
 https://tinysnow.github.io/技术/ArchRISC-V/Packages/SVT-VP9
```

