# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## custom.js

```diff

@@ -116,16 +116,9 @@ var initAll = function () {
         pagePath = "index"
     }
 
-    // add visitors count
-    var ele = document.createElement("div");
-    ele.setAttribute("align","center");
-    var count = document.createElement("img")
-    count.setAttribute("src", "https://visitor-badge.glitch.me/badge?page_id=" + path);
-    ele.appendChild(count);
-    var divider =document.createElement("hr")
+    var divider = document.createElement("hr")
 
     document.getElementById("giscus-container").appendChild(divider);
-    document.getElementById("giscus-container").appendChild(ele);
 
     // 选取浏览器默认使用的语言
     const lang = navigator.language || navigator.userLanguage

@@ -137,25 +130,25 @@ var initAll = function () {
         theme = "light"
     }
 
-    var script = document.createElement("script")
-    script.type = "text/javascript";
-    script.src = "https://giscus.app/client.js";
-    script.async = true;
-    script.crossOrigin = "anonymous";
-    script.setAttribute("data-repo", "TinySnow/TinySnow.github.io");
-    script.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnkzNTAxOTA3Mjc=");
-    script.setAttribute("data-category", "Discussions");
-    script.setAttribute("data-category-id", "DIC_kwDOFN98h84CTDFJ");
-    script.setAttribute("data-mapping", "specific");
-    script.setAttribute("data-term", pagePath);
-    script.setAttribute("data-reactions-enabled", "1");
-    script.setAttribute("data-emit-metadata", "0");
-    script.setAttribute("data-input-position", "top");
-    script.setAttribute("data-theme", theme);
-    script.setAttribute("data-lang", lang);
+    var giscusContainer = document.createElement("script")
+    giscusContainer.type = "text/javascript";
+    giscusContainer.src = "https://giscus.app/client.js";
+    giscusContainer.async = true;
+    giscusContainer.setAttribute("crossOrigin", "anonymous");
+    giscusContainer.setAttribute("data-repo", "TinySnow/TinySnow.github.io");
+    giscusContainer.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnkzNTAxOTA3Mjc=");
+    giscusContainer.setAttribute("data-category", "Announcements");
+    giscusContainer.setAttribute("data-category-id", "DIC_kwDOFN98h84CTDFJ");
+    giscusContainer.setAttribute("data-mapping", "specific");
+    // giscusContainer.setAttribute("data-term", pagePath);
+    giscusContainer.setAttribute("data-reactions-enabled", "1");
+    giscusContainer.setAttribute("data-emit-metadata", "0");
+    giscusContainer.setAttribute("data-input-position", "top");
+    giscusContainer.setAttribute("data-theme", theme);
+    giscusContainer.setAttribute("data-lang", lang);
     // 预先加载评论会更好，这样用户读到那边时，评论就加载好了
-    script.setAttribute("data-loading", "lazy");
-    document.getElementById("giscus-container").appendChild(script);
+    giscusContainer.setAttribute("data-loading", "lazy");
+    document.getElementById("giscus-container").appendChild(giscusContainer);
 
 };
 
```

## book.toml

```diff

@@ -31,4 +31,7 @@ level = 0
 # renderer = ["html"]
 
 # [build]
-# use-default-preprocessors = false
\ No newline at end of file
+# use-default-preprocessors = false
+
+[output.html.search]
+enable = false
\ No newline at end of file
```

## sitemap.txt

```diff

@@ -1,250 +1,32 @@
-https://tinysnow.github.io/
-https://tinysnow.github.io/last-updated
-https://tinysnow.github.io/个人简介
-https://tinysnow.github.io/各领域入门
 https://tinysnow.github.io/问题总表
 https://tinysnow.github.io/学习/学习
 https://tinysnow.github.io/学习/耶鲁大学：心理学导论
-https://tinysnow.github.io/小说/小说
 https://tinysnow.github.io/技术/Commands
 https://tinysnow.github.io/技术/Errors
 https://tinysnow.github.io/技术/Knowledge
 https://tinysnow.github.io/技术/技术
 https://tinysnow.github.io/断章/断章
-https://tinysnow.github.io/每日一文/18 本画册的爱恋 - 汤小小
-https://tinysnow.github.io/每日一文/2.05 米的绳子 - 周海亮
-https://tinysnow.github.io/每日一文/一个人要像一支队伍 - 刘瑜
-https://tinysnow.github.io/每日一文/一个国家，两个世界 - 余华
-https://tinysnow.github.io/每日一文/一个好人 - 詹姆斯 · 瑟伯
-https://tinysnow.github.io/每日一文/一个特立独行的人 - 乔治 · 奥威尔
-https://tinysnow.github.io/每日一文/一只背袋 - 米洛斯拉夫 · 茹拉夫斯
-https://tinysnow.github.io/每日一文/一座城市的记忆 - 奥罕 · 帕慕克
 https://tinysnow.github.io/每日一文/一条狗的两次死亡 - 照日格图
 https://tinysnow.github.io/每日一文/一条路 - 亦舒
-https://tinysnow.github.io/每日一文/一种错觉 - 毛姆
-https://tinysnow.github.io/每日一文/丈夫留下的备忘录 - 梅洁
-https://tinysnow.github.io/每日一文/三只野猫 - 简平
-https://tinysnow.github.io/每日一文/三种人生态度 - 梁漱溟
-https://tinysnow.github.io/每日一文/不一样的自由 - 龙应台
-https://tinysnow.github.io/每日一文/不要累死你的爱 - 刘墉
-https://tinysnow.github.io/每日一文/与人为友 - 亦舒
-https://tinysnow.github.io/每日一文/世界上最荒凉的动物园 - 苏童
-https://tinysnow.github.io/每日一文/世界上最酷的爸爸 - 安吉 · K · K · 沃德
-https://tinysnow.github.io/每日一文/为乐趣而读书 - 毛姆
-https://tinysnow.github.io/每日一文/为什么我们对平凡的人生深怀恐惧？- 梁晓声
-https://tinysnow.github.io/每日一文/为什么要读经典 - 伊塔洛 · 卡尔维诺
-https://tinysnow.github.io/每日一文/买牛肉须知 - 姬中宪
-https://tinysnow.github.io/每日一文/二手衣 - 亦舒
-https://tinysnow.github.io/每日一文/京片子与民族自信心 - 王小波
-https://tinysnow.github.io/每日一文/亲爱的小孩 - 陈晓霞
-https://tinysnow.github.io/每日一文/人类的群星闪耀时 - 茨威格
-https://tinysnow.github.io/每日一文/人间椅子 - 江户川乱步
 https://tinysnow.github.io/每日一文/从痴迷到依恋 - 周国平
-https://tinysnow.github.io/每日一文/何处不相逢 - 罗兰
-https://tinysnow.github.io/每日一文/你到底喜不喜欢我 - 王丫米
-https://tinysnow.github.io/每日一文/你嘴上所说的人生就是你的人生 - 佐藤富雄
-https://tinysnow.github.io/每日一文/你在那里 - 王梅
-https://tinysnow.github.io/每日一文/你是医生吗？- 雷蒙德 · 卡佛
-https://tinysnow.github.io/每日一文/你有没有钱 - 李敖
-https://tinysnow.github.io/每日一文/你的那双眼睛 - 三毛
-https://tinysnow.github.io/每日一文/你要是在麦田里遇到了我 - 罗伯特 · 彭斯
-https://tinysnow.github.io/每日一文/侏儒的祈祷 - 芥川龙之介
-https://tinysnow.github.io/每日一文/信使 - 刘慈欣
-https://tinysnow.github.io/每日一文/修软垫椅的女人 - 莫泊桑
-https://tinysnow.github.io/每日一文/借刀杀人 - 希区柯克
-https://tinysnow.github.io/每日一文/关于朋友 - 叔本华
-https://tinysnow.github.io/每日一文/关于父子 - 贾平凹
 https://tinysnow.github.io/每日一文/写在五线谱上的信 - 王小波
-https://tinysnow.github.io/每日一文/写给新的一年 - 王小波
-https://tinysnow.github.io/每日一文/刀疤 - 博尔赫斯
-https://tinysnow.github.io/每日一文/刘正风灭门 - 金庸
-https://tinysnow.github.io/每日一文/千古伤心是结婚 - 柏杨
-https://tinysnow.github.io/每日一文/卖猪 - 路遥
-https://tinysnow.github.io/每日一文/卖猪肠粉的女人 - 蔡澜
-https://tinysnow.github.io/每日一文/双文化时代 - 周有光
 https://tinysnow.github.io/每日一文/双鱼 - 三毛
-https://tinysnow.github.io/每日一文/发民主财 - 韩少功
-https://tinysnow.github.io/每日一文/台阶 - 李森祥
-https://tinysnow.github.io/每日一文/吃酒 - 丰子恺
-https://tinysnow.github.io/每日一文/吃饭是一件需要认真对待的事 - 梁文道
-https://tinysnow.github.io/每日一文/名字花哨的时代 - 肖复兴
-https://tinysnow.github.io/每日一文/向自己说再见 - 希区柯克
-https://tinysnow.github.io/每日一文/吹兵 - 三毛
-https://tinysnow.github.io/每日一文/吾先生 - 杨绛
-https://tinysnow.github.io/每日一文/在一个时代里缓慢行走 - 朱德庸
-https://tinysnow.github.io/每日一文/在什么地方活着 - 小川未明
-https://tinysnow.github.io/每日一文/垃圾工 - 雷 · 布拉德伯里
-https://tinysnow.github.io/每日一文/夜空中的木拐 - 从维熙
-https://tinysnow.github.io/每日一文/大坝垮的那天 - 詹姆斯 · 瑟伯
-https://tinysnow.github.io/每日一文/大胡子与我 - 三毛
-https://tinysnow.github.io/每日一文/天上落下来的一片叶子 - 安徒生
-https://tinysnow.github.io/每日一文/天堂之门 - 马克
 https://tinysnow.github.io/每日一文/女人的星球 - 高铭
 https://tinysnow.github.io/每日一文/女朋友 - 亦舒
-https://tinysnow.github.io/每日一文/如果你没有了我 - 刘墉
-https://tinysnow.github.io/每日一文/婚姻是一种修养 - 胡杨
-https://tinysnow.github.io/每日一文/婴儿的观念 - 唐纳德 · 巴塞尔姆
-https://tinysnow.github.io/每日一文/婴儿蛋糕 - 尼尔 · 盖曼
-https://tinysnow.github.io/每日一文/孤独地走向未来 - 贾平凹
-https://tinysnow.github.io/每日一文/害羞的爱先生 - 法比安 · 塞比亚
-https://tinysnow.github.io/每日一文/家有名妻 - 刘海北
-https://tinysnow.github.io/每日一文/小偷 - 苏童
-https://tinysnow.github.io/每日一文/小偷 - 雷蒙德 · 卡佛
-https://tinysnow.github.io/每日一文/小公务员之死 - 契诃夫
-https://tinysnow.github.io/每日一文/小女孩与厌倦 - 于尔克 · 舒比格曼
 https://tinysnow.github.io/每日一文/小生命 - 亦舒
-https://tinysnow.github.io/每日一文/小达子 - 冯骥才
-https://tinysnow.github.io/每日一文/尾生 - 芥川龙之介
-https://tinysnow.github.io/每日一文/展示品 - 于尔克 · 舒比格
-https://tinysnow.github.io/每日一文/巫婆 - 雪莉 · 杰克逊
-https://tinysnow.github.io/每日一文/平凡最难 - 林清玄
-https://tinysnow.github.io/每日一文/幸福就在此刻 - 铁凝
-https://tinysnow.github.io/每日一文/幸福的生日 - 黑井千次
-https://tinysnow.github.io/每日一文/弥补 - 大卫 · 伊格曼
-https://tinysnow.github.io/每日一文/当三毛还是在二毛的时候 - 三毛
-https://tinysnow.github.io/每日一文/当东方遭遇西方 - 毛姆
-https://tinysnow.github.io/每日一文/往日夕阳下的公园里 - 乙一
-https://tinysnow.github.io/每日一文/律师太太 - 希区柯克
-https://tinysnow.github.io/每日一文/御旨 - 卡夫卡
-https://tinysnow.github.io/每日一文/忆周作人先生 - 梁实秋
-https://tinysnow.github.io/每日一文/忘却 - 亦舒
-https://tinysnow.github.io/每日一文/快乐人的衬衫 - 伊塔洛 · 卡尔维诺
-https://tinysnow.github.io/每日一文/恶之平庸 - 刘瑜
-https://tinysnow.github.io/每日一文/想起草药 - 许冬林
-https://tinysnow.github.io/每日一文/我不喜欢人类，我想住进森林 - 阿澜 · 卢
-https://tinysnow.github.io/每日一文/我们为什么要过节 - 冯骥才
 https://tinysnow.github.io/每日一文/我们的老式婚姻 - 杨修峰
 https://tinysnow.github.io/每日一文/我们都有病 - 朱德庸
 https://tinysnow.github.io/每日一文/我来讲一个故事 - 加西亚 · 马尔克斯
-https://tinysnow.github.io/每日一文/我的呈奶酪蛋糕形状的贫穷 - 村上春树
-https://tinysnow.github.io/每日一文/打工经历 - 王小波
-https://tinysnow.github.io/每日一文/抽象的爱国 - 梁文道
-https://tinysnow.github.io/每日一文/捉弄 - 契诃夫
-https://tinysnow.github.io/每日一文/捣乱者的作用 - 保罗 · 科埃略
-https://tinysnow.github.io/每日一文/掉到井里的人 - 卡夫卡
-https://tinysnow.github.io/每日一文/排队 - 梁实秋
-https://tinysnow.github.io/每日一文/排骨萝卜汤 - 梁实秋
-https://tinysnow.github.io/每日一文/摆脱童稚状态 - 王小波
-https://tinysnow.github.io/每日一文/救世情结与白日梦 - 王小波
-https://tinysnow.github.io/每日一文/敬酒要喝 - 梁文道
-https://tinysnow.github.io/每日一文/文人与粥 - 张远桃
-https://tinysnow.github.io/每日一文/文学青年 - 许知远
-https://tinysnow.github.io/每日一文/文艺与木匠 - 老舍
-https://tinysnow.github.io/每日一文/斗车 - 芥川龙之介
 https://tinysnow.github.io/每日一文/断爱近涅盘 - 林清玄
-https://tinysnow.github.io/每日一文/无人看管的面包圈 - 张抒
-https://tinysnow.github.io/每日一文/早起看人间 - 罗兰
 https://tinysnow.github.io/每日一文/时间旅行者的妻子 - 奥德丽 · 尼芬格
-https://tinysnow.github.io/每日一文/朋友 - 贾平凹
-https://tinysnow.github.io/每日一文/未婚夫和爸爸 - 契诃夫
-https://tinysnow.github.io/每日一文/未婚妻 - 玛 · 奥克罗克斯
-https://tinysnow.github.io/每日一文/枕头人 - 马丁 · 麦克多纳
-https://tinysnow.github.io/每日一文/林中猫的故事 - 彭蒂 · 哈恩帕
-https://tinysnow.github.io/每日一文/棋王 - 阿城
-https://tinysnow.github.io/每日一文/槐花 - 汪曾祺
-https://tinysnow.github.io/每日一文/欢迎你到荷兰来 - 金斯利
-https://tinysnow.github.io/每日一文/每一个女人都漂亮 - 佚名
-https://tinysnow.github.io/每日一文/每日一文
-https://tinysnow.github.io/每日一文/永生 - 高铭
-https://tinysnow.github.io/每日一文/永远欠一顿饭 - 刘亮程
-https://tinysnow.github.io/每日一文/求婚 - 刘瑜
-https://tinysnow.github.io/每日一文/汤包 - 梁实秋
-https://tinysnow.github.io/每日一文/没时间 - 安贝托 · 艾柯
-https://tinysnow.github.io/每日一文/没有一本一劳永逸的书 - 毛姆
 https://tinysnow.github.io/每日一文/油月亮 - 贾平凹
-https://tinysnow.github.io/每日一文/泥沙俱下地生活 - 毕淑敏
-https://tinysnow.github.io/每日一文/活出爱 - 史铁生
-https://tinysnow.github.io/每日一文/活着真好 - 维克多 · 科克留什金
-https://tinysnow.github.io/每日一文/清晨的变故 - 黑井千次
-https://tinysnow.github.io/每日一文/溜索 - 阿城
-https://tinysnow.github.io/每日一文/炊烟 - 阿城
-https://tinysnow.github.io/每日一文/煤桶骑士 - 卡夫卡
-https://tinysnow.github.io/每日一文/熟人厌烦症 - 迈克尔 · 金
-https://tinysnow.github.io/每日一文/爱因斯坦的梦 - 阿兰 · 莱特曼
-https://tinysnow.github.io/每日一文/爱情与投资 - 希区柯克
-https://tinysnow.github.io/每日一文/爱情故事 - 余华
-https://tinysnow.github.io/每日一文/爱是将心比心 - 刘小昭
-https://tinysnow.github.io/每日一文/爸爸的味道 - 张小娴
 https://tinysnow.github.io/每日一文/狗这一生不容易 - 王宏哲
-https://tinysnow.github.io/每日一文/狗难 - 柯灵
-https://tinysnow.github.io/每日一文/独处是一种能力 - 周国平
-https://tinysnow.github.io/每日一文/猫城的故事 - 村上春树
-https://tinysnow.github.io/每日一文/猴子 - 芥川龙之介
 https://tinysnow.github.io/每日一文/王府大街 64 号 - 雷达
-https://tinysnow.github.io/每日一文/玩具 - 泰戈尔
-https://tinysnow.github.io/每日一文/理发师 - 汪曾祺
-https://tinysnow.github.io/每日一文/生日女郎 - 村上春树
-https://tinysnow.github.io/每日一文/电影音乐给谁听 - 梁文道
-https://tinysnow.github.io/每日一文/病人 - 纪伯伦
-https://tinysnow.github.io/每日一文/白痴的故事 - 倪匡
-https://tinysnow.github.io/每日一文/白肉 - 梁实秋
-https://tinysnow.github.io/每日一文/皱起眉头的男人 - 张小娴
-https://tinysnow.github.io/每日一文/目送 - 龙应台
-https://tinysnow.github.io/每日一文/看谁的文章写得好 - 李敖
-https://tinysnow.github.io/每日一文/社区建筑 - 梁文道
-https://tinysnow.github.io/每日一文/祖父 - 威廉 · 萨默塞特 · 毛姆
-https://tinysnow.github.io/每日一文/神迹下的健康心态 - 吴澧
-https://tinysnow.github.io/每日一文/穿过大半个中国去睡你 - 余秀华
-https://tinysnow.github.io/每日一文/笛鸣香港 - 韩少功
 https://tinysnow.github.io/每日一文/第三大道的这间酒馆 - 约翰·麦克纳尔蒂
-https://tinysnow.github.io/每日一文/等待 - 太宰治
 https://tinysnow.github.io/每日一文/等我一年半 - 松本清张
-https://tinysnow.github.io/每日一文/签名 - 斯蒂芬 · 狄克逊
-https://tinysnow.github.io/每日一文/简单 - 三毛
-https://tinysnow.github.io/每日一文/简单的调查 - 海明威
-https://tinysnow.github.io/每日一文/紫色人形 - 毕淑敏
-https://tinysnow.github.io/每日一文/经济学的旁听生 - 张晓风
-https://tinysnow.github.io/每日一文/给失败者 - 罗兰
-https://tinysnow.github.io/每日一文/给我未来的孩子 - 张梅
-https://tinysnow.github.io/每日一文/老人鱼 - 严歌苓
-https://tinysnow.github.io/每日一文/老来多健忘 - 叶倾城
-https://tinysnow.github.io/每日一文/老水车旁的风景 - 梁晓声
-https://tinysnow.github.io/每日一文/老猴赫尼 - 沈石溪
-https://tinysnow.github.io/每日一文/肯肯舞 - 阿图洛 · 维万特
-https://tinysnow.github.io/每日一文/背带短裤 - 村上春树
-https://tinysnow.github.io/每日一文/胖子和瘦子 - 契诃夫
-https://tinysnow.github.io/每日一文/自我机会高估 - 韩少功
 https://tinysnow.github.io/每日一文/致陈独秀 - 胡适
-https://tinysnow.github.io/每日一文/花未眠 - 川端康成
-https://tinysnow.github.io/每日一文/花脸雀 - 李娟
-https://tinysnow.github.io/每日一文/荒唐少年时 - 陈升
-https://tinysnow.github.io/每日一文/荒唐的工作 - 黑井千次
-https://tinysnow.github.io/每日一文/荣辱 - 丰子恺
-https://tinysnow.github.io/每日一文/行刑 - 乔治 · 奥威尔
-https://tinysnow.github.io/每日一文/见义勇为 - 维克多 · 科克留什金
-https://tinysnow.github.io/每日一文/解谜 - 梁文道
-https://tinysnow.github.io/每日一文/认识自我 - 纪伯伦
-https://tinysnow.github.io/每日一文/记住回家的路 - 周国平
-https://tinysnow.github.io/每日一文/讲价 - 梁实秋
-https://tinysnow.github.io/每日一文/论读书 - 培根
-https://tinysnow.github.io/每日一文/谁的生命可以不受时间限制 - 沈从文
-https://tinysnow.github.io/每日一文/象的失踪 - 村上春树
-https://tinysnow.github.io/每日一文/赌徒的遗书 - 希区柯克
-https://tinysnow.github.io/每日一文/赞美骨髓 - 蔡澜
-https://tinysnow.github.io/每日一文/足底按摩 - 恰克 · 帕拉尼克
-https://tinysnow.github.io/每日一文/路上的情书 - 林清玄
-https://tinysnow.github.io/每日一文/轻蔑的一瞥 - 库森别格尔
-https://tinysnow.github.io/每日一文/迈锡尼的小行星旅馆 - 村上春树
-https://tinysnow.github.io/每日一文/还记得十六岁时的梦想吗 - 艾明雅
-https://tinysnow.github.io/每日一文/这两个流浪汉要不是穷，就会花钱大方 - 约翰 · 麦克纳尔蒂
-https://tinysnow.github.io/每日一文/进个圈子锻造自己 - 沈青黎
-https://tinysnow.github.io/每日一文/远处的一双眼睛 - 张小娴
 https://tinysnow.github.io/每日一文/那些你所不知道的大事 - 李月亮
-https://tinysnow.github.io/每日一文/邻家的拖鞋 - 姬中宪
-https://tinysnow.github.io/每日一文/郁金香 - 玛丽娅 · 恩里凯达
-https://tinysnow.github.io/每日一文/重圆 - 亦舒
-https://tinysnow.github.io/每日一文/银行抢案 - 史蒂文 · 舒曼
-https://tinysnow.github.io/每日一文/阿内西阿美女皇后 - 马里奥 · 贝内德蒂
-https://tinysnow.github.io/每日一文/隐藏的美 - 卢尔斯
-https://tinysnow.github.io/每日一文/难忘的八个字 - 玛丽 · 安 · 伯德
-https://tinysnow.github.io/每日一文/雄辩症 - 王蒙
 https://tinysnow.github.io/每日一文/雨伞 - 川端康成
-https://tinysnow.github.io/每日一文/青春 - 亦舒
-https://tinysnow.github.io/每日一文/青梅竹马 - 佚名
-https://tinysnow.github.io/每日一文/鬼剃头 - 冯骥才
-https://tinysnow.github.io/每日一文/麦田里 - 余华
-https://tinysnow.github.io/每日一文/黑夜与黎明之间 - 纪伯伦
-https://tinysnow.github.io/笔记/笔记
 https://tinysnow.github.io/读书/电影台词
 https://tinysnow.github.io/读书/读书
 https://tinysnow.github.io/学习/公共基础知识/中国近现代史

@@ -332,53 +114,6 @@ https://tinysnow.github.io/学习/音乐/其他资料
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
-https://tinysnow.github.io/小说/想象力训练/公交车
-https://tinysnow.github.io/小说/想象力训练/冥界的混乱
-https://tinysnow.github.io/小说/想象力训练/努力的样子
-https://tinysnow.github.io/小说/想象力训练/想象力训练
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 公主与夫人（《欢恋》番外）
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 分享
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 可能会知道
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 女性知识
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 少女的夏天
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 就算是厨师也能照亮他人
-https://tinysnow.github.io/小说/想象力训练/想象力训练 - 心脏博物馆
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
-https://tinysnow.github.io/小说/想象力训练/理想雪 - 冬季是最温暖的季节
-https://tinysnow.github.io/小说/想象力训练/理想雪 - 应不应该
-https://tinysnow.github.io/小说/想象力训练/理想雪 - 那些不重要
-https://tinysnow.github.io/小说/想象力训练/靛青之秋之一
-https://tinysnow.github.io/小说/想象力训练/靛青之秋之二
 https://tinysnow.github.io/技术/ArchRISC-V/ArchRISC-V
 https://tinysnow.github.io/技术/ArchRISC-V/FrequentlyUsed
 https://tinysnow.github.io/技术/ArchRISC-V/IssueTemplate

@@ -647,27 +382,6 @@ https://tinysnow.github.io/断章/随记/随记 - 2023 年 9 月 4 日
 https://tinysnow.github.io/断章/随记/随记 - 2023 年 9 月 7 日
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
-https://tinysnow.github.io/笔记/记录/毕业旅行
-https://tinysnow.github.io/笔记/记录/游玩游戏记录
-https://tinysnow.github.io/笔记/记录/番剧记录
-https://tinysnow.github.io/笔记/记录/衣服风格记录
-https://tinysnow.github.io/笔记/记录/观影记录
-https://tinysnow.github.io/笔记/记录/记录
-https://tinysnow.github.io/笔记/记录/软件订阅记录
 https://tinysnow.github.io/读书/亲密关系/亲密关系
 https://tinysnow.github.io/读书/亲密关系/第一章：人际关系的构成
 https://tinysnow.github.io/读书/亲密关系/第七章：友谊

@@ -680,81 +394,8 @@ https://tinysnow.github.io/读书/亲密关系/第六章：相互依赖
 https://tinysnow.github.io/读书/亲密关系/第十一章：冲突
 https://tinysnow.github.io/读书/亲密关系/第十三章：亲密关系的解体与消亡
 https://tinysnow.github.io/读书/亲密关系/第十二章：权力和暴力
-https://tinysnow.github.io/读书/亲密关系/第十四章：亲密关系的维持和修复
 https://tinysnow.github.io/读书/亲密关系/第十章：压力与紧张
 https://tinysnow.github.io/读书/亲密关系/第四章：社会认知
-https://tinysnow.github.io/读书/没事，一切都会好起来的/一些安慰
-https://tinysnow.github.io/读书/没事，一切都会好起来的/井
-https://tinysnow.github.io/读书/没事，一切都会好起来的/你的季节
-https://tinysnow.github.io/读书/没事，一切都会好起来的/你的星星
-https://tinysnow.github.io/读书/没事，一切都会好起来的/你的花园
-https://tinysnow.github.io/读书/没事，一切都会好起来的/分享日常
-https://tinysnow.github.io/读书/没事，一切都会好起来的/呼唤的声音
-https://tinysnow.github.io/读书/没事，一切都会好起来的/哪怕没有理由
-https://tinysnow.github.io/读书/没事，一切都会好起来的/守灯人
-https://tinysnow.github.io/读书/没事，一切都会好起来的/对话
-https://tinysnow.github.io/读书/没事，一切都会好起来的/封底
-https://tinysnow.github.io/读书/没事，一切都会好起来的/小小的对白
-https://tinysnow.github.io/读书/没事，一切都会好起来的/小蜡烛
-https://tinysnow.github.io/读书/没事，一切都会好起来的/幸福
-https://tinysnow.github.io/读书/没事，一切都会好起来的/心
-https://tinysnow.github.io/读书/没事，一切都会好起来的/我的宇宙
-https://tinysnow.github.io/读书/没事，一切都会好起来的/散步
-https://tinysnow.github.io/读书/没事，一切都会好起来的/最美的东西
-https://tinysnow.github.io/读书/没事，一切都会好起来的/朝着尽头
-https://tinysnow.github.io/读书/没事，一切都会好起来的/来自宇宙的信
-https://tinysnow.github.io/读书/没事，一切都会好起来的/来自月亮的回信
-https://tinysnow.github.io/读书/没事，一切都会好起来的/枕边的故事
-https://tinysnow.github.io/读书/没事，一切都会好起来的/梦尽头的你
-https://tinysnow.github.io/读书/没事，一切都会好起来的/梦的距离
-https://tinysnow.github.io/读书/没事，一切都会好起来的/永远
-https://tinysnow.github.io/读书/没事，一切都会好起来的/沙漠里的玫瑰
-https://tinysnow.github.io/读书/没事，一切都会好起来的/没事，一切都会好起来的
-https://tinysnow.github.io/读书/没事，一切都会好起来的/海浪
-https://tinysnow.github.io/读书/没事，一切都会好起来的/温暖的约定
-https://tinysnow.github.io/读书/没事，一切都会好起来的/灿烂的尽头
-https://tinysnow.github.io/读书/没事，一切都会好起来的/特别的时刻
-https://tinysnow.github.io/读书/没事，一切都会好起来的/献给身在某处的你
-https://tinysnow.github.io/读书/没事，一切都会好起来的/相信
-https://tinysnow.github.io/读书/没事，一切都会好起来的/离别
-https://tinysnow.github.io/读书/没事，一切都会好起来的/精灵之舞
-https://tinysnow.github.io/读书/没事，一切都会好起来的/紧急降落
-https://tinysnow.github.io/读书/没事，一切都会好起来的/终点站
-https://tinysnow.github.io/读书/没事，一切都会好起来的/给你
-https://tinysnow.github.io/读书/没事，一切都会好起来的/花
-https://tinysnow.github.io/读书/没事，一切都会好起来的/门
-https://tinysnow.github.io/读书/没事，一切都会好起来的/阳光
-https://tinysnow.github.io/读书/没事，一切都会好起来的/音乐
-https://tinysnow.github.io/读书/没事，一切都会好起来的/飞吧
-https://tinysnow.github.io/读书/零零散散/乌合之众
-https://tinysnow.github.io/读书/零零散散/二十首情诗和一首绝望的歌
-https://tinysnow.github.io/读书/零零散散/人间告白
-https://tinysnow.github.io/读书/零零散散/众病之王：癌症传
-https://tinysnow.github.io/读书/零零散散/你当像鸟飞往你的山
-https://tinysnow.github.io/读书/零零散散/大型网站技术架构：核心原理与案例分析
-https://tinysnow.github.io/读书/零零散散/如何阅读一本书
-https://tinysnow.github.io/读书/零零散散/小狗钱钱
-https://tinysnow.github.io/读书/零零散散/山茶文具店
-https://tinysnow.github.io/读书/零零散散/强风吹拂
-https://tinysnow.github.io/读书/零零散散/快速抓重点，过目不忘的阅读术
-https://tinysnow.github.io/读书/零零散散/我与地坛
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
-https://tinysnow.github.io/读书/零零散散/薄世宁医学通识讲义
-https://tinysnow.github.io/读书/零零散散/追风筝的人
-https://tinysnow.github.io/读书/零零散散/零零散散
-https://tinysnow.github.io/读书/零零散散/霍乱时期的爱情
-https://tinysnow.github.io/读书/零零散散/非暴力沟通
-https://tinysnow.github.io/读书/零零散散/麻省理工深度思考法
 https://tinysnow.github.io/学习/医学/药理学/第一节：药物分子的跨膜转运
 https://tinysnow.github.io/学习/医学/药理学/第二节：药物的体内过程
 https://tinysnow.github.io/学习/医学/药理学/药物代谢动力学
```

## chrome.css

```diff

@@ -0,0 +1,587 @@
+/* CSS for UI elements (a.k.a. chrome) */
+
+@import 'variables.css';
+
+html {
+    scrollbar-color: var(--scrollbar) var(--bg);
+}
+#searchresults a,
+.content a:link,
+a:visited,
+a > .hljs {
+    color: var(--links);
+}
+
+/*
+    body-container is necessary because mobile browsers don't seem to like
+    overflow-x on the body tag when there is a <meta name="viewport"> tag.
+*/
+#body-container {
+    /*
+        This is used when the sidebar pushes the body content off the side of
+        the screen on small screens. Without it, dragging on mobile Safari
+        will want to reposition the viewport in a weird way.
+    */
+    overflow-x: clip;
+}
+
+/* Menu Bar */
+
+#menu-bar,
+#menu-bar-hover-placeholder {
+    z-index: 101;
+    margin: auto calc(0px - var(--page-padding));
+}
+#menu-bar {
+    position: relative;
+    display: flex;
+    flex-wrap: wrap;
+    background-color: var(--bg);
+    border-block-end-color: var(--bg);
+    border-block-end-width: 1px;
+    border-block-end-style: solid;
+}
+#menu-bar.sticky,
+.js #menu-bar-hover-placeholder:hover + #menu-bar,
+.js #menu-bar:hover,
+.js.sidebar-visible #menu-bar {
+    position: -webkit-sticky;
+    position: sticky;
+    top: 0 !important;
+}
+#menu-bar-hover-placeholder {
+    position: sticky;
+    position: -webkit-sticky;
+    top: 0;
+    height: var(--menu-bar-height);
+}
+#menu-bar.bordered {
+    border-block-end-color: var(--table-border-color);
+}
+#menu-bar i, #menu-bar .icon-button {
+    position: relative;
+    padding: 0 8px;
+    z-index: 10;
+    line-height: var(--menu-bar-height);
+    cursor: pointer;
+    transition: color 0.5s;
+}
+@media only screen and (max-width: 420px) {
+    #menu-bar i, #menu-bar .icon-button {
+        padding: 0 5px;
+    }
+}
+
+.icon-button {
+    border: none;
+    background: none;
+    padding: 0;
+    color: inherit;
+}
+.icon-button i {
+    margin: 0;
+}
+
+.right-buttons {
+    margin: 0 15px;
+}
+.right-buttons a {
+    text-decoration: none;
+}
+
+.left-buttons {
+    display: flex;
+    margin: 0 5px;
+}
+.no-js .left-buttons button {
+    display: none;
+}
+
+.menu-title {
+    display: inline-block;
+    font-weight: 200;
+    font-size: 2.4rem;
+    line-height: var(--menu-bar-height);
+    text-align: center;
+    margin: 0;
+    flex: 1;
+    white-space: nowrap;
+    overflow: hidden;
+    text-overflow: ellipsis;
+}
+.js .menu-title {
+    cursor: pointer;
+}
+
+.menu-bar,
+.menu-bar:visited,
+.nav-chapters,
+.nav-chapters:visited,
+.mobile-nav-chapters,
+.mobile-nav-chapters:visited,
+.menu-bar .icon-button,
+.menu-bar a i {
+    color: var(--icons);
+}
+
+.menu-bar i:hover,
+.menu-bar .icon-button:hover,
+.nav-chapters:hover,
+.mobile-nav-chapters i:hover {
+    color: var(--icons-hover);
+}
+
+/* Nav Icons */
+
+.nav-chapters {
+    font-size: 2.5em;
+    text-align: center;
+    text-decoration: none;
+
+    position: fixed;
+    top: 0;
+    bottom: 0;
+    margin: 0;
+    max-width: 150px;
+    min-width: 90px;
+
+    display: flex;
+    justify-content: center;
+    align-content: center;
+    flex-direction: column;
+
+    transition: color 0.5s, background-color 0.5s;
+}
+
+.nav-chapters:hover {
+    text-decoration: none;
+    background-color: var(--theme-hover);
+    transition: background-color 0.15s, color 0.15s;
+}
+
+.nav-wrapper {
+    margin-block-start: 50px;
+    display: none;
+}
+
+.mobile-nav-chapters {
+    font-size: 2.5em;
+    text-align: center;
+    text-decoration: none;
+    width: 90px;
+    border-radius: 5px;
+    background-color: var(--sidebar-bg);
+}
+
+/* Only Firefox supports flow-relative values */
+.previous { float: left; }
+[dir=rtl] .previous { float: right; }
+
+/* Only Firefox supports flow-relative values */
+.next {
+    float: right;
+    right: var(--page-padding);
+}
+[dir=rtl] .next {
+    float: left;
+    right: unset;
+    left: var(--page-padding);
+}
+
+/* Use the correct buttons for RTL layouts*/
+[dir=rtl] .previous i.fa-angle-left:before {content:"\f105";}
+[dir=rtl] .next i.fa-angle-right:before { content:"\f104"; }
+
+@media only screen and (max-width: 1080px) {
+    .nav-wide-wrapper { display: none; }
+    .nav-wrapper { display: block; }
+}
+
+/* sidebar-visible */
+@media only screen and (max-width: 1380px) {
+    #sidebar-toggle-anchor:checked ~ .page-wrapper .nav-wide-wrapper { display: none; }
+    #sidebar-toggle-anchor:checked ~ .page-wrapper .nav-wrapper { display: block; }
+}
+
+/* Inline code */
+
+:not(pre) > .hljs {
+    display: inline;
+    padding: 0.1em 0.3em;
+    border-radius: 3px;
+}
+
+:not(pre):not(a) > .hljs {
+    color: var(--inline-code-color);
+    overflow-x: initial;
+}
+
+a:hover > .hljs {
+    text-decoration: underline;
+}
+
+pre {
+    position: relative;
+}
+pre > .buttons {
+    position: absolute;
+    z-index: 100;
+    right: 0px;
+    top: 2px;
+    margin: 0px;
+    padding: 2px 0px;
+
+    color: var(--sidebar-fg);
+    cursor: pointer;
+    visibility: hidden;
+    opacity: 0;
+    transition: visibility 0.1s linear, opacity 0.1s linear;
+}
+pre:hover > .buttons {
+    visibility: visible;
+    opacity: 1
+}
+pre > .buttons :hover {
+    color: var(--sidebar-active);
+    border-color: var(--icons-hover);
+    background-color: var(--theme-hover);
+}
+pre > .buttons i {
+    margin-inline-start: 8px;
+}
+pre > .buttons button {
+    cursor: inherit;
+    margin: 0px 5px;
+    padding: 3px 5px;
+    font-size: 14px;
+
+    border-style: solid;
+    border-width: 1px;
+    border-radius: 4px;
+    border-color: var(--icons);
+    background-color: var(--theme-popup-bg);
+    transition: 100ms;
+    transition-property: color,border-color,background-color;
+    color: var(--icons);
+}
+@media (pointer: coarse) {
+    pre > .buttons button {
+        /* On mobile, make it easier to tap buttons. */
+        padding: 0.3rem 1rem;
+    }
+}
+pre > code {
+    padding: 1rem;
+}
+
+/* FIXME: ACE editors overlap their buttons because ACE does absolute
+   positioning within the code block which breaks padding. The only solution I
+   can think of is to move the padding to the outer pre tag (or insert a div
+   wrapper), but that would require fixing a whole bunch of CSS rules.
+*/
+.hljs.ace_editor {
+  padding: 0rem 0rem;
+}
+
+pre > .result {
+    margin-block-start: 10px;
+}
+
+/* Search */
+
+#searchresults a {
+    text-decoration: none;
+}
+
+mark {
+    border-radius: 2px;
+    padding-block-start: 0;
+    padding-block-end: 1px;
+    padding-inline-start: 3px;
+    padding-inline-end: 3px;
+    margin-block-start: 0;
+    margin-block-end: -1px;
+    margin-inline-start: -3px;
+    margin-inline-end: -3px;
+    background-color: var(--search-mark-bg);
+    transition: background-color 300ms linear;
+    cursor: pointer;
+}
+
+mark.fade-out {
+    background-color: rgba(0,0,0,0) !important;
+    cursor: auto;
+}
+
+.searchbar-outer {
+    margin-inline-start: auto;
+    margin-inline-end: auto;
+    max-width: var(--content-max-width);
+}
+
+#searchbar {
+    width: 100%;
+    margin-block-start: 5px;
+    margin-block-end: 0;
+    margin-inline-start: auto;
+    margin-inline-end: auto;
+    padding: 10px 16px;
+    transition: box-shadow 300ms ease-in-out;
+    border: 1px solid var(--searchbar-border-color);
+    border-radius: 3px;
+    background-color: var(--searchbar-bg);
+    color: var(--searchbar-fg);
+}
+#searchbar:focus,
+#searchbar.active {
+    box-shadow: 0 0 3px var(--searchbar-shadow-color);
+}
+
+.searchresults-header {
+    font-weight: bold;
+    font-size: 1em;
+    padding-block-start: 18px;
+    padding-block-end: 0;
+    padding-inline-start: 5px;
+    padding-inline-end: 0;
+    color: var(--searchresults-header-fg);
+}
+
+.searchresults-outer {
+    margin-inline-start: auto;
+    margin-inline-end: auto;
+    max-width: var(--content-max-width);
+    border-block-end: 1px dashed var(--searchresults-border-color);
+}
+
+ul#searchresults {
+    list-style: none;
+    padding-inline-start: 20px;
+}
+ul#searchresults li {
+    margin: 10px 0px;
+    padding: 2px;
+    border-radius: 2px;
+}
+ul#searchresults li.focus {
+    background-color: var(--searchresults-li-bg);
+}
+ul#searchresults span.teaser {
+    display: block;
+    clear: both;
+    margin-block-start: 5px;
+    margin-block-end: 0;
+    margin-inline-start: 20px;
+    margin-inline-end: 0;
+    font-size: 0.8em;
+}
+ul#searchresults span.teaser em {
+    font-weight: bold;
+    font-style: normal;
+}
+
+/* Sidebar */
+
+.sidebar {
+    position: fixed;
+    left: 0;
+    top: 0;
+    bottom: 0;
+    width: var(--sidebar-width);
+    font-size: 0.875em;
+    box-sizing: border-box;
+    -webkit-overflow-scrolling: touch;
+    overscroll-behavior-y: contain;
+    background-color: var(--sidebar-bg);
+    color: var(--sidebar-fg);
+}
+[dir=rtl] .sidebar { left: unset; right: 0; }
+.sidebar-resizing {
+    -moz-user-select: none;
+    -webkit-user-select: none;
+    -ms-user-select: none;
+    user-select: none;
+}
+.no-js .sidebar,
+.js:not(.sidebar-resizing) .sidebar {
+    transition: transform 0.3s; /* Animation: slide away */
+}
+.sidebar code {
+    line-height: 2em;
+}
+.sidebar .sidebar-scrollbox {
+    overflow-y: auto;
+    position: absolute;
+    top: 0;
+    bottom: 0;
+    left: 0;
+    right: 0;
+    padding: 10px 10px;
+}
+.sidebar .sidebar-resize-handle {
+    position: absolute;
+    cursor: col-resize;
+    width: 0;
+    right: 0;
+    top: 0;
+    bottom: 0;
+}
+[dir=rtl] .sidebar .sidebar-resize-handle { right:  unset; left: 0; }
+.js .sidebar .sidebar-resize-handle {
+    cursor: col-resize;
+    width: 5px;
+}
+/* sidebar-hidden */
+#sidebar-toggle-anchor:not(:checked) ~ .sidebar {
+    transform: translateX(calc(0px - var(--sidebar-width)));
+    z-index: -1;
+}
+[dir=rtl] #sidebar-toggle-anchor:not(:checked) ~ .sidebar {
+    transform: translateX(var(--sidebar-width));
+}
+.sidebar::-webkit-scrollbar {
+    background: var(--sidebar-bg);
+}
+.sidebar::-webkit-scrollbar-thumb {
+    background: var(--scrollbar);
+}
+
+/* sidebar-visible */
+#sidebar-toggle-anchor:checked ~ .page-wrapper {
+    transform: translateX(var(--sidebar-width));
+}
+[dir=rtl] #sidebar-toggle-anchor:checked ~ .page-wrapper {
+    transform: translateX(calc(0px - var(--sidebar-width)));
+}
+@media only screen and (min-width: 620px) {
+    #sidebar-toggle-anchor:checked ~ .page-wrapper {
+        transform: none;
+        margin-inline-start: var(--sidebar-width);
+    }
+    [dir=rtl] #sidebar-toggle-anchor:checked ~ .page-wrapper {
+        transform: none;
+    }
+}
+
+.chapter {
+    list-style: none outside none;
+    padding-inline-start: 0;
+    line-height: 2.2em;
+}
+
+.chapter ol {
+    width: 100%;
+}
+
+.chapter li {
+    display: flex;
+    color: var(--sidebar-non-existant);
+}
+.chapter li a {
+    display: block;
+    padding: 0;
+    text-decoration: none;
+    color: var(--sidebar-fg);
+}
+
+.chapter li a:hover {
+    color: var(--sidebar-active);
+}
+
+.chapter li a.active {
+    color: var(--sidebar-active);
+}
+
+.chapter li > a.toggle {
+    cursor: pointer;
+    display: block;
+    margin-inline-start: auto;
+    padding: 0 10px;
+    user-select: none;
+    opacity: 0.68;
+}
+
+.chapter li > a.toggle div {
+    transition: transform 0.5s;
+}
+
+/* collapse the section */
+.chapter li:not(.expanded) + li > ol {
+    display: none;
+}
+
+.chapter li.chapter-item {
+    line-height: 1.5em;
+    margin-block-start: 0.6em;
+}
+
+.chapter li.expanded > a.toggle div {
+    transform: rotate(90deg);
+}
+
+.spacer {
+    width: 100%;
+    height: 3px;
+    margin: 5px 0px;
+}
+.chapter .spacer {
+    background-color: var(--sidebar-spacer);
+}
+
+@media (-moz-touch-enabled: 1), (pointer: coarse) {
+    .chapter li a { padding: 5px 0; }
+    .spacer { margin: 10px 0; }
+}
+
+.section {
+    list-style: none outside none;
+    padding-inline-start: 20px;
+    line-height: 1.9em;
+}
+
+/* Theme Menu Popup */
+
+.theme-popup {
+    position: absolute;
+    left: 10px;
+    top: var(--menu-bar-height);
+    z-index: 1000;
+    border-radius: 4px;
+    font-size: 0.7em;
+    color: var(--fg);
+    background: var(--theme-popup-bg);
+    border: 1px solid var(--theme-popup-border);
+    margin: 0;
+    padding: 0;
+    list-style: none;
+    display: none;
+    /* Don't let the children's background extend past the rounded corners. */
+    overflow: hidden;
+}
+[dir=rtl] .theme-popup { left: unset;  right: 10px; }
+.theme-popup .default {
+    color: var(--icons);
+}
+.theme-popup .theme {
+    width: 100%;
+    border: 0;
+    margin: 0;
+    padding: 2px 20px;
+    line-height: 25px;
+    white-space: nowrap;
+    text-align: start;
+    cursor: pointer;
+    color: inherit;
+    background: inherit;
+    font-size: inherit;
+}
+.theme-popup .theme:hover {
+    background-color: var(--theme-hover);
+}
+
+.theme-selected::before {
+    display: inline-block;
+    content: "✓";
+    margin-inline-start: -14px;
+    width: 14px;
+}
```

## general.css

```diff

@@ -0,0 +1,234 @@
+/* Base styles and content styles */
+
+@import 'variables.css';
+
+:root {
+    /* Browser default font-size is 16px, this way 1 rem = 10px */
+    font-size: 62.5%;
+    color-scheme: var(--color-scheme);
+}
+
+html {
+    font-family: "Open Sans", sans-serif;
+    color: var(--fg);
+    background-color: var(--bg);
+    text-size-adjust: none;
+    -webkit-text-size-adjust: none;
+}
+
+body {
+    margin: 0;
+    font-size: 1.6rem;
+    overflow-x: hidden;
+}
+
+code {
+    font-family: var(--mono-font) !important;
+    font-size: var(--code-font-size);
+    direction: ltr !important;
+}
+
+/* make long words/inline code not x overflow */
+main {
+    overflow-wrap: break-word;
+}
+
+/* make wide tables scroll if they overflow */
+.table-wrapper {
+    overflow-x: auto;
+}
+
+/* Don't change font size in headers. */
+h1 code, h2 code, h3 code, h4 code, h5 code, h6 code {
+    font-size: unset;
+}
+
+.left { float: left; }
+.right { float: right; }
+.boring { opacity: 0.6; }
+.hide-boring .boring { display: none; }
+.hidden { display: none !important; }
+
+h2, h3 { margin-block-start: 2em; }
+h4, h5 { margin-block-start: 1.5em; }
+
+.header + .header h3,
+.header + .header h4,
+.header + .header h5 {
+    margin-block-start: 1em;
+}
+
+h1:target::before,
+h2:target::before,
+h3:target::before,
+h4:target::before,
+h5:target::before,
+h6:target::before {
+    display: inline-block;
+    content: "»";
+    margin-inline-start: -30px;
+    width: 30px;
+}
+
+/* This is broken on Safari as of version 14, but is fixed
+   in Safari Technology Preview 117 which I think will be Safari 14.2.
+   https://bugs.webkit.org/show_bug.cgi?id=218076
+*/
+:target {
+    /* Safari does not support logical properties */
+    scroll-margin-top: calc(var(--menu-bar-height) + 0.5em);
+}
+
+.page {
+    outline: 0;
+    padding: 0 var(--page-padding);
+    margin-block-start: calc(0px - var(--menu-bar-height)); /* Compensate for the #menu-bar-hover-placeholder */
+}
+.page-wrapper {
+    box-sizing: border-box;
+    background-color: var(--bg);
+}
+.no-js .page-wrapper,
+.js:not(.sidebar-resizing) .page-wrapper {
+    transition: margin-left 0.3s ease, transform 0.3s ease; /* Animation: slide away */
+}
+[dir=rtl] .js:not(.sidebar-resizing) .page-wrapper {
+    transition: margin-right 0.3s ease, transform 0.3s ease; /* Animation: slide away */
+}
+
+.content {
+    overflow-y: auto;
+    padding: 0 5px 50px 5px;
+}
+.content main {
+    margin-inline-start: auto;
+    margin-inline-end: auto;
+    max-width: var(--content-max-width);
+}
+.content p { line-height: 1.45em; }
+.content ol { line-height: 1.45em; }
+.content ul { line-height: 1.45em; }
+.content a { text-decoration: none; }
+.content a:hover { text-decoration: underline; }
+.content img, .content video { max-width: 100%; }
+.content .header:link,
+.content .header:visited {
+    color: var(--fg);
+}
+.content .header:link,
+.content .header:visited:hover {
+    text-decoration: none;
+}
+
+table {
+    margin: 0 auto;
+    border-collapse: collapse;
+}
+table td {
+    padding: 3px 20px;
+    border: 1px var(--table-border-color) solid;
+}
+table thead {
+    background: var(--table-header-bg);
+}
+table thead td {
+    font-weight: 700;
+    border: none;
+}
+table thead th {
+    padding: 3px 20px;
+}
+table thead tr {
+    border: 1px var(--table-header-bg) solid;
+}
+/* Alternate background colors for rows */
+table tbody tr:nth-child(2n) {
+    background: var(--table-alternate-bg);
+}
+
+
+blockquote {
+    margin: 20px 0;
+    padding: 0 20px;
+    color: var(--fg);
+    background-color: var(--quote-bg);
+    border-block-start: .1em solid var(--quote-border);
+    border-block-end: .1em solid var(--quote-border);
+}
+
+.warning {
+    margin: 20px;
+    padding: 0 20px;
+    border-inline-start: 2px solid var(--warning-border);
+}
+
+.warning:before {
+    position: absolute;
+    width: 3rem;
+    height: 3rem;
+    margin-inline-start: calc(-1.5rem - 21px);
+    content: "ⓘ";
+    text-align: center;
+    background-color: var(--bg);
+    color: var(--warning-border);
+    font-weight: bold;
+    font-size: 2rem;
+}
+
+blockquote .warning:before {
+    background-color: var(--quote-bg);
+}
+
+kbd {
+    background-color: var(--table-border-color);
+    border-radius: 4px;
+    border: solid 1px var(--theme-popup-border);
+    box-shadow: inset 0 -1px 0 var(--theme-hover);
+    display: inline-block;
+    font-size: var(--code-font-size);
+    font-family: var(--mono-font);
+    line-height: 10px;
+    padding: 4px 5px;
+    vertical-align: middle;
+}
+
+:not(.footnote-definition) + .footnote-definition,
+.footnote-definition + :not(.footnote-definition) {
+    margin-block-start: 2em;
+}
+.footnote-definition {
+    font-size: 0.9em;
+    margin: 0.5em 0;
+}
+.footnote-definition p {
+    display: inline;
+}
+
+.tooltiptext {
+    position: absolute;
+    visibility: hidden;
+    color: #fff;
+    background-color: #333;
+    transform: translateX(-50%); /* Center by moving tooltip 50% of its width left */
+    left: -8px; /* Half of the width of the icon */
+    top: -35px;
+    font-size: 0.8em;
+    text-align: center;
+    border-radius: 6px;
+    padding: 5px 8px;
+    margin: 5px;
+    z-index: 1000;
+}
+.tooltipped .tooltiptext {
+    visibility: visible;
+}
+
+.chapter li.part-title {
+    color: var(--sidebar-fg);
+    margin: 5px 0px;
+    font-weight: bold;
+}
+
+.result-no-output {
+    font-style: italic;
+}
```

## print.css

```diff

@@ -0,0 +1,50 @@
+
+#sidebar,
+#menu-bar,
+.nav-chapters,
+.mobile-nav-chapters {
+    display: none;
+}
+
+#page-wrapper.page-wrapper {
+    transform: none;
+    margin-inline-start: 0px;
+    overflow-y: initial;
+}
+
+#content {
+    max-width: none;
+    margin: 0;
+    padding: 0;
+}
+
+.page {
+    overflow-y: initial;
+}
+
+code {
+    direction: ltr !important;
+}
+
+pre > .buttons {
+    z-index: 2;
+}
+
+a, a:visited, a:active, a:hover {
+    color: #4183c4;
+    text-decoration: none;
+}
+
+h1, h2, h3, h4, h5, h6 {
+    page-break-inside: avoid;
+    page-break-after: avoid;
+}
+
+pre, code {
+    page-break-inside: avoid;
+    white-space: pre-wrap;
+}
+
+.fa {
+    display: none !important;
+}
```

## variables.css

```diff

@@ -0,0 +1,277 @@
+
+/* Globals */
+
+:root {
+    --sidebar-width: 300px;
+    --page-padding: 15px;
+    --content-max-width: 750px;
+    --menu-bar-height: 50px;
+    --mono-font: "Source Code Pro", Consolas, "Ubuntu Mono", Menlo, "DejaVu Sans Mono", monospace, monospace;
+    --code-font-size: 0.875em /* please adjust the ace font size accordingly in editor.js */
+}
+
+/* Themes */
+
+.ayu {
+    --bg: hsl(210, 25%, 8%);
+    --fg: #c5c5c5;
+
+    --sidebar-bg: #14191f;
+    --sidebar-fg: #c8c9db;
+    --sidebar-non-existant: #5c6773;
+    --sidebar-active: #ffb454;
+    --sidebar-spacer: #2d334f;
+
+    --scrollbar: var(--sidebar-fg);
+
+    --icons: #737480;
+    --icons-hover: #b7b9cc;
+
+    --links: #0096cf;
+
+    --inline-code-color: #ffb454;
+
+    --theme-popup-bg: #14191f;
+    --theme-popup-border: #5c6773;
+    --theme-hover: #191f26;
+
+    --quote-bg: hsl(226, 15%, 17%);
+    --quote-border: hsl(226, 15%, 22%);
+
+    --warning-border: #ff8e00;
+
+    --table-border-color: hsl(210, 25%, 13%);
+    --table-header-bg: hsl(210, 25%, 28%);
+    --table-alternate-bg: hsl(210, 25%, 11%);
+
+    --searchbar-border-color: #848484;
+    --searchbar-bg: #424242;
+    --searchbar-fg: #fff;
+    --searchbar-shadow-color: #d4c89f;
+    --searchresults-header-fg: #666;
+    --searchresults-border-color: #888;
+    --searchresults-li-bg: #252932;
+    --search-mark-bg: #e3b171;
+
+    --color-scheme: dark;
+}
+
+.coal {
+    --bg: hsl(200, 7%, 8%);
+    --fg: #98a3ad;
+
+    --sidebar-bg: #292c2f;
+    --sidebar-fg: #a1adb8;
+    --sidebar-non-existant: #505254;
+    --sidebar-active: #3473ad;
+    --sidebar-spacer: #393939;
+
+    --scrollbar: var(--sidebar-fg);
+
+    --icons: #43484d;
+    --icons-hover: #b3c0cc;
+
+    --links: #2b79a2;
+
+    --inline-code-color: #c5c8c6;
+
+    --theme-popup-bg: #141617;
+    --theme-popup-border: #43484d;
+    --theme-hover: #1f2124;
+
+    --quote-bg: hsl(234, 21%, 18%);
+    --quote-border: hsl(234, 21%, 23%);
+
+    --warning-border: #ff8e00;
+
+    --table-border-color: hsl(200, 7%, 13%);
+    --table-header-bg: hsl(200, 7%, 28%);
+    --table-alternate-bg: hsl(200, 7%, 11%);
+
+    --searchbar-border-color: #aaa;
+    --searchbar-bg: #b7b7b7;
+    --searchbar-fg: #000;
+    --searchbar-shadow-color: #aaa;
+    --searchresults-header-fg: #666;
+    --searchresults-border-color: #98a3ad;
+    --searchresults-li-bg: #2b2b2f;
+    --search-mark-bg: #355c7d;
+
+    --color-scheme: dark;
+}
+
+.light {
+    --bg: hsl(0, 0%, 100%);
+    --fg: hsl(0, 0%, 0%);
+
+    --sidebar-bg: #fafafa;
+    --sidebar-fg: hsl(0, 0%, 0%);
+    --sidebar-non-existant: #aaaaaa;
+    --sidebar-active: #1f1fff;
+    --sidebar-spacer: #f4f4f4;
+
+    --scrollbar: #8F8F8F;
+
+    --icons: #747474;
+    --icons-hover: #000000;
+
+    --links: #20609f;
+
+    --inline-code-color: #301900;
+
+    --theme-popup-bg: #fafafa;
+    --theme-popup-border: #cccccc;
+    --theme-hover: #e6e6e6;
+
+    --quote-bg: hsl(197, 37%, 96%);
+    --quote-border: hsl(197, 37%, 91%);
+
+    --warning-border: #ff8e00;
+
+    --table-border-color: hsl(0, 0%, 95%);
+    --table-header-bg: hsl(0, 0%, 80%);
+    --table-alternate-bg: hsl(0, 0%, 97%);
+
+    --searchbar-border-color: #aaa;
+    --searchbar-bg: #fafafa;
+    --searchbar-fg: #000;
+    --searchbar-shadow-color: #aaa;
+    --searchresults-header-fg: #666;
+    --searchresults-border-color: #888;
+    --searchresults-li-bg: #e4f2fe;
+    --search-mark-bg: #a2cff5;
+
+    --color-scheme: light;
+}
+
+.navy {
+    --bg: hsl(226, 23%, 11%);
+    --fg: #bcbdd0;
+
+    --sidebar-bg: #282d3f;
+    --sidebar-fg: #c8c9db;
+    --sidebar-non-existant: #505274;
+    --sidebar-active: #2b79a2;
+    --sidebar-spacer: #2d334f;
+
+    --scrollbar: var(--sidebar-fg);
+
+    --icons: #737480;
+    --icons-hover: #b7b9cc;
+
+    --links: #2b79a2;
+
+    --inline-code-color: #c5c8c6;
+
+    --theme-popup-bg: #161923;
+    --theme-popup-border: #737480;
+    --theme-hover: #282e40;
+
+    --quote-bg: hsl(226, 15%, 17%);
+    --quote-border: hsl(226, 15%, 22%);
+
+    --warning-border: #ff8e00;
+
+    --table-border-color: hsl(226, 23%, 16%);
+    --table-header-bg: hsl(226, 23%, 31%);
+    --table-alternate-bg: hsl(226, 23%, 14%);
+
+    --searchbar-border-color: #aaa;
+    --searchbar-bg: #aeaec6;
+    --searchbar-fg: #000;
+    --searchbar-shadow-color: #aaa;
+    --searchresults-header-fg: #5f5f71;
+    --searchresults-border-color: #5c5c68;
+    --searchresults-li-bg: #242430;
+    --search-mark-bg: #a2cff5;
+
+    --color-scheme: dark;
+}
+
+.rust {
+    --bg: hsl(60, 9%, 87%);
+    --fg: #262625;
+
+    --sidebar-bg: #3b2e2a;
+    --sidebar-fg: #c8c9db;
+    --sidebar-non-existant: #505254;
+    --sidebar-active: #e69f67;
+    --sidebar-spacer: #45373a;
+
+    --scrollbar: var(--sidebar-fg);
+
+    --icons: #737480;
+    --icons-hover: #262625;
+
+    --links: #2b79a2;
+
+    --inline-code-color: #6e6b5e;
+
+    --theme-popup-bg: #e1e1db;
+    --theme-popup-border: #b38f6b;
+    --theme-hover: #99908a;
+
+    --quote-bg: hsl(60, 5%, 75%);
+    --quote-border: hsl(60, 5%, 70%);
+
+    --warning-border: #ff8e00;
+
+    --table-border-color: hsl(60, 9%, 82%);
+    --table-header-bg: #b3a497;
+    --table-alternate-bg: hsl(60, 9%, 84%);
+
+    --searchbar-border-color: #aaa;
+    --searchbar-bg: #fafafa;
+    --searchbar-fg: #000;
+    --searchbar-shadow-color: #aaa;
+    --searchresults-header-fg: #666;
+    --searchresults-border-color: #888;
+    --searchresults-li-bg: #dec2a2;
+    --search-mark-bg: #e69f67;
+
+    --color-scheme: light;
+}
+
+@media (prefers-color-scheme: dark) {
+    .light.no-js {
+        --bg: hsl(200, 7%, 8%);
+        --fg: #98a3ad;
+
+        --sidebar-bg: #292c2f;
+        --sidebar-fg: #a1adb8;
+        --sidebar-non-existant: #505254;
+        --sidebar-active: #3473ad;
+        --sidebar-spacer: #393939;
+
+        --scrollbar: var(--sidebar-fg);
+
+        --icons: #43484d;
+        --icons-hover: #b3c0cc;
+
+        --links: #2b79a2;
+
+        --inline-code-color: #c5c8c6;
+
+        --theme-popup-bg: #141617;
+        --theme-popup-border: #43484d;
+        --theme-hover: #1f2124;
+
+        --quote-bg: hsl(234, 21%, 18%);
+        --quote-border: hsl(234, 21%, 23%);
+
+        --warning-border: #ff8e00;
+
+        --table-border-color: hsl(200, 7%, 13%);
+        --table-header-bg: hsl(200, 7%, 28%);
+        --table-alternate-bg: hsl(200, 7%, 11%);
+
+        --searchbar-border-color: #aaa;
+        --searchbar-bg: #b7b7b7;
+        --searchbar-fg: #000;
+        --searchbar-shadow-color: #aaa;
+        --searchresults-header-fg: #666;
+        --searchresults-border-color: #98a3ad;
+        --searchresults-li-bg: #2b2b2f;
+        --search-mark-bg: #355c7d;
+    }
+}
```

## index.hbs

```diff

@@ -71,7 +71,9 @@
             rel="stylesheet"
             href="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-theme-classic"
         />
-
+        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
+        <link rel="preconnect" href="https://YOUR_APP_ID-dsn.algolia.net" crossorigin />
+        
     </head>
     <body class="sidebar-visible no-js">
     <div id="body-container">

@@ -181,6 +183,7 @@
                             <i class="fa fa-search"></i>
                         </button>
                         {{/if}}
+                        <div id="docsearch" style="align-self: center;"></div>
                     </div>
 
                     <h1 class="menu-title">{{ book_title }}</h1>

@@ -201,7 +204,6 @@
                             <i id="git-edit-button" class="fa fa-edit"></i>
                         </a>
                         {{/if}}
-
                     </div>
                 </div>
 

@@ -252,7 +254,6 @@
                     <main>
                         {{{ content }}}
                         <div id="giscus-container"></div>
-                        <div id="docsearch"></div>
                     </main>
 
                     <nav class="nav-wrapper" aria-label="Page navigation">

@@ -356,7 +357,9 @@
         <script src="{{ path_to_root }}book.js"></script>
 
 
-
+        <script type="text/javascript" charset="utf-8">
+        var pagePath = "{{ path }}"
+        </script>
 
 
         <!-- Custom JS scripts -->

@@ -381,29 +384,31 @@
         </script>
         {{/if}}
         {{/if}}
+            
 
-    </div>            
-
-        <script src="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js"></script>
+<!--         <script src="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js"></script>
         <script>
             const { autocomplete } = window['@algolia/autocomplete-js'];
-        </script>
+        </script> -->
+
+        <script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3"></script>
 
         <script type="text/javascript">
             docsearch({
                 appId: 'GX9RTL51BH',
-                apiKey: '364d7154cf1fa31bad0b8fd9c6018351',
+                apiKey: 'c4caea4202132489213a6c5366c9952d',
                 indexName: 'tinysnowio',
-                container: '#docsearch'
+                container: '#docsearch',
                 debug: false // Set debug to true if you want to inspect the modal
-                });
-            autocomplete({
-              container: '#docsearch',
-              placeholder: '搜索 / Search',
-              getSources() {
-                return [];
-              },
             });
+            // autocomplete({
+            //   container: '#docsearch',
+            //   placeholder: '搜索 / Search',
+            //   getSources() {
+            //     return [];
+            //   },
+            // });
         </script>
+    </div>
     </body>
 </html>
```

## index.hbs.bak

```diff

@@ -1,407 +0,0 @@
-<!DOCTYPE HTML>
-<html lang="{{ language }}" class="{{ default_theme }}" dir="{{ text_direction }}">
-    <head>
-        <!-- Book generated using mdBook -->
-        <meta charset="UTF-8">
-        <title>{{ title }}</title>
-        {{#if is_print }}
-        <meta name="robots" content="noindex">
-        {{/if}}
-        {{#if base_url}}
-        <base href="{{ base_url }}">
-        {{/if}}
-        
-        <!-- Custom HTML head -->
-        {{> head}}
-
-
-        <meta name="description" content="{{ description }}">
-        <meta name="viewport" content="width=device-width, initial-scale=1">
-        <meta name="theme-color" content="#ffffff">
-
-        {{#if favicon_svg}}
-        <link rel="icon" href="{{ path_to_root }}favicon.svg">
-        {{/if}}
-        {{#if favicon_png}}
-        <link rel="shortcut icon" href="{{ path_to_root }}favicon.png">
-        {{/if}}
-        <link rel="stylesheet" href="{{ path_to_root }}css/variables.css">
-        <link rel="stylesheet" href="{{ path_to_root }}css/general.css">
-        <link rel="stylesheet" href="{{ path_to_root }}css/chrome.css">
-        {{#if print_enable}}
-        <link rel="stylesheet" href="{{ path_to_root }}css/print.css" media="print">
-        {{/if}}
-
-        <!-- Fonts -->
-        <link rel="stylesheet" href="{{ path_to_root }}FontAwesome/css/font-awesome.css">
-        {{#if copy_fonts}}
-        <link rel="stylesheet" href="{{ path_to_root }}fonts/fonts.css">
-        {{/if}}
-
-        <!-- Highlight.js Stylesheets -->
-        <link rel="stylesheet" href="{{ path_to_root }}highlight.css">
-        <link rel="stylesheet" href="{{ path_to_root }}tomorrow-night.css">
-        <link rel="stylesheet" href="{{ path_to_root }}ayu-highlight.css">
-
-        <!-- Custom theme stylesheets -->
-        {{#each additional_css}}
-        <link rel="stylesheet" href="{{ ../path_to_root }}{{ this }}">
-        {{/each}}
-
-        {{#if mathjax_support}}
-        <!-- MathJax -->
-        <script async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
-        {{/if}}
-
-        <!-- Baidu Site Analytics -->
-        <meta name="baidu-site-verification" content="code-he9gAvXT8G" />
-
-        <!-- Global site tag (gtag.js) - Google Analytics -->
-        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P9324YLFBW"></script>
-        <script>
-          window.dataLayer = window.dataLayer || [];
-          function gtag(){dataLayer.push(arguments);}
-          gtag('js', new Date());
-
-          gtag('config', 'G-P9324YLFBW');
-        </script>
-
-        <!-- Doc Search -->
-        <link
-            rel="stylesheet"
-            href="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-theme-classic"
-        />
-
-    </head>
-    <body class="sidebar-visible no-js">
-    <div id="body-container">
-        <!-- Provide site root to javascript -->
-        <script>
-            var path_to_root = "{{ path_to_root }}";
-            var default_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "{{ preferred_dark_theme }}" : "{{ default_theme }}";
-        </script>
-
-        <!-- Work around some values being stored in localStorage wrapped in quotes -->
-        <script>
-            try {
-                var theme = localStorage.getItem('mdbook-theme');
-                var sidebar = localStorage.getItem('mdbook-sidebar');
-                if (theme.startsWith('"') && theme.endsWith('"')) {
-                    localStorage.setItem('mdbook-theme', theme.slice(1, theme.length - 1));
-                }
-                if (sidebar.startsWith('"') && sidebar.endsWith('"')) {
-                    localStorage.setItem('mdbook-sidebar', sidebar.slice(1, sidebar.length - 1));
-                }
-            } catch (e) { }
-        </script>
-
-        <!-- Set the theme before any content is loaded, prevents flash -->
-        <script>
-            var theme;
-            try { theme = localStorage.getItem('mdbook-theme'); } catch(e) { }
-            if (theme === null || theme === undefined) { theme = default_theme; }
-            var html = document.querySelector('html');
-
-            html.classList.remove('{{ default_theme }}')
-            html.classList.add(theme);
-            var body = document.querySelector('body');
-            body.classList.remove('no-js')
-            body.classList.add('js');
-        </script>
-
-        <!-- Hide / unhide sidebar before it is displayed -->
-        <script>
-            var body = document.querySelector('body');
-            var sidebar = null;
-            var sidebar_toggle = document.getElementById("sidebar-toggle-anchor");
-            if (document.body.clientWidth >= 1080) {
-                try { sidebar = localStorage.getItem('mdbook-sidebar'); } catch(e) { }
-                sidebar = sidebar || 'visible';
-            } else {
-                sidebar = 'hidden';
-            }
-            sidebar_toggle.checked = sidebar === 'visible';
-            body.classList.remove('sidebar-visible');
-            body.classList.add("sidebar-" + sidebar);
-        </script>
-
-        <nav id="sidebar" class="sidebar" aria-label="Table of contents">
-            <div class="sidebar-scrollbox">
-                {{#toc}}{{/toc}}
-            </div>
-            <div id="sidebar-resize-handle" class="sidebar-resize-handle"></div>
-        </nav>
-
-        <!-- Track and set sidebar scroll position -->
-        <script>
-            var sidebarScrollbox = document.querySelector('#sidebar .sidebar-scrollbox');
-            sidebarScrollbox.addEventListener('click', function(e) {
-                if (e.target.tagName === 'A') {
-                    sessionStorage.setItem('sidebar-scroll', sidebarScrollbox.scrollTop);
-                }
-            }, { passive: true });
-            var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
-            sessionStorage.removeItem('sidebar-scroll');
-            if (sidebarScrollTop) {
-                // preserve sidebar scroll position when navigating via links within sidebar
-                sidebarScrollbox.scrollTop = sidebarScrollTop;
-            } else {
-                // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
-                var activeSection = document.querySelector('#sidebar .active');
-                if (activeSection) {
-                    activeSection.scrollIntoView({ block: 'center' });
-                }
-            }
-        </script>
-
-        <div id="page-wrapper" class="page-wrapper">
-
-            <div class="page">
-                {{> header}}
-                <div id="menu-bar-hover-placeholder"></div>
-                <div id="menu-bar" class="menu-bar sticky bordered">
-                    <div class="left-buttons">
-                        <label id="sidebar-toggle" class="icon-button" type="button" title="Toggle Table of Contents" aria-label="Toggle Table of Contents" aria-controls="sidebar">
-                            <i class="fa fa-bars"></i>
-                        </label>
-                        <button id="theme-toggle" class="icon-button" type="button" title="Change theme" aria-label="Change theme" aria-haspopup="true" aria-expanded="false" aria-controls="theme-list">
-                            <i class="fa fa-paint-brush"></i>
-                        </button>
-                        <ul id="theme-list" class="theme-popup" aria-label="Themes" role="menu">
-                            <li role="none"><button role="menuitem" class="theme" id="light">Light</button></li>
-                            <li role="none"><button role="menuitem" class="theme" id="rust">Rust</button></li>
-                            <li role="none"><button role="menuitem" class="theme" id="coal">Coal</button></li>
-                            <li role="none"><button role="menuitem" class="theme" id="navy">Navy</button></li>
-                            <li role="none"><button role="menuitem" class="theme" id="ayu">Ayu</button></li>
-                        </ul>
-                        {{#if search_enabled}}
-                        <button id="search-toggle" class="icon-button" type="button" title="Search. (Shortkey: s)" aria-label="Toggle Searchbar" aria-expanded="false" aria-keyshortcuts="S" aria-controls="searchbar">
-                            <i class="fa fa-search"></i>
-                        </button>
-                        {{/if}}
-                    </div>
-
-                    <h1 class="menu-title">{{ book_title }}</h1>
-
-                    <div class="right-buttons">
-                        {{#if print_enable}}
-                        <a href="{{ path_to_root }}print.html" title="Print this book" aria-label="Print this book">
-                            <i id="print-button" class="fa fa-print"></i>
-                        </a>
-                        {{/if}}
-                        {{#if git_repository_url}}
-                        <a href="{{git_repository_url}}" title="Git repository" aria-label="Git repository">
-                            <i id="git-repository-button" class="fa {{git_repository_icon}}"></i>
-                        </a>
-                        {{/if}}
-                        {{#if git_repository_edit_url}}
-                        <a href="{{git_repository_edit_url}}" title="Suggest an edit" aria-label="Suggest an edit">
-                            <i id="git-edit-button" class="fa fa-edit"></i>
-                        </a>
-                        {{/if}}
-
-                    </div>
-                </div>
-
-                {{#if search_enabled}}
-                <div id="search-wrapper" class="hidden">
-                    <form id="searchbar-outer" class="searchbar-outer">
-                        <input type="search" id="searchbar" name="searchbar" placeholder="Search this book ..." aria-controls="searchresults-outer" aria-describedby="searchresults-header">
-                    </form>
-                    <div id="searchresults-outer" class="searchresults-outer hidden">
-                        <div id="searchresults-header" class="searchresults-header"></div>
-                        <ul id="searchresults">
-                        </ul>
-                    </div>
-                </div>
-                {{/if}}
-
-                <!-- Apply ARIA attributes after the sidebar and the sidebar toggle button are added to the DOM -->
-                <script>
-                    document.getElementById('sidebar-toggle').setAttribute('aria-expanded', sidebar === 'visible');
-                    document.getElementById('sidebar').setAttribute('aria-hidden', sidebar !== 'visible');
-                    // Get viewed page store
-                    var viewed_key = 'mdbook-viewed';
-                    var viewed_map = {};
-                    try {
-                        var viewed_storage = localStorage.getItem(viewed_key);
-                        if (viewed_storage) {
-                            viewed_map = JSON.parse(viewed_storage)
-                        }
-                    } catch (e) { }
-                    Array.from(document.querySelectorAll('#sidebar a')).forEach(function(link) {
-                        link.setAttribute('tabIndex', sidebar === 'visible' ? 0 : -1);
-                        
-                        // Apply viewed style
-                        if (viewed_map[link.pathname]) {
-                            link.classList.add('md-viewed')
-                        }
-                    }); 
-                    // Mark viewed after 30s
-                    setTimeout(function() {
-                        viewed_map[location.pathname] = 1;
-                        localStorage.setItem(viewed_key, JSON.stringify(viewed_map));
-                    }, 30000)
-                </script>
-
-                <div id="content" class="content">
-                    <!-- Page table of contents -->
-                    <div class="sidetoc"><nav class="pagetoc"></nav></div>
-                    <main>
-                        {{{ content }}}
-                        <div id="giscus-container"></div>
-                        <div id="docsearch"></div>
-                    </main>
-
-                    <nav class="nav-wrapper" aria-label="Page navigation">
-                        <!-- Mobile navigation buttons -->
-                        {{#previous}}
-                            <a rel="prev" href="{{ path_to_root }}{{link}}" class="mobile-nav-chapters previous" title="Previous chapter" aria-label="Previous chapter" aria-keyshortcuts="Left">
-                                <i class="fa fa-angle-left"></i>
-                            </a>
-                        {{/previous}}
-
-                        {{#next}}
-                            <a rel="next prefetch" href="{{ path_to_root }}{{link}}" class="mobile-nav-chapters next" title="Next chapter" aria-label="Next chapter" aria-keyshortcuts="Right">
-                                <i class="fa fa-angle-right"></i>
-                            </a>
-                        {{/next}}
-
-                        <div style="clear: both"></div>
-                    </nav>
-                </div>
-            </div>
-
-            <nav class="nav-wide-wrapper" aria-label="Page navigation">
-                {{#previous}}
-                    <a rel="prev" href="{{ path_to_root }}{{link}}" class="nav-chapters previous" title="Previous chapter" aria-label="Previous chapter" aria-keyshortcuts="Left">
-                        <i class="fa fa-angle-left"></i>
-                    </a>
-                {{/previous}}
-
-                {{#next}}
-                    <a rel="next prefetch" href="{{ path_to_root }}{{link}}" class="nav-chapters next" title="Next chapter" aria-label="Next chapter" aria-keyshortcuts="Right">
-                        <i class="fa fa-angle-right"></i>
-                    </a>
-                {{/next}}
-            </nav>
-
-        </div>
-
-        {{#if live_reload_endpoint}}
-        <!-- Livereload script (if served using the cli tool) -->
-        <script>
-            const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
-            const wsAddress = wsProtocol + "//" + location.host + "/" + "{{{live_reload_endpoint}}}";
-            const socket = new WebSocket(wsAddress);
-            socket.onmessage = function (event) {
-                if (event.data === "reload") {
-                    socket.close();
-                    location.reload();
-                }
-            };
-            window.onbeforeunload = function() {
-                socket.close();
-            }
-        </script>
-        {{/if}}
-
-        {{#if google_analytics}}
-        <!-- Google Analytics Tag -->
-        <script>
-            var localAddrs = ["localhost", "127.0.0.1", ""];
-            // make sure we don't activate google analytics if the developer is
-            // inspecting the book locally...
-            if (localAddrs.indexOf(document.location.hostname) === -1) {
-                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
-                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
-                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
-                })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
-                ga('create', '{{google_analytics}}', 'auto');
-                ga('send', 'pageview');
-            }
-        </script>
-        {{/if}}
-
-        {{#if playground_line_numbers}}
-        <script>
-            window.playground_line_numbers = true;
-        </script>
-        {{/if}}
-
-        {{#if playground_copyable}}
-        <script>
-            window.playground_copyable = true;
-        </script>
-        {{/if}}
-
-        {{#if playground_js}}
-        <script src="{{ path_to_root }}ace.js"></script>
-        <script src="{{ path_to_root }}editor.js"></script>
-        <script src="{{ path_to_root }}mode-rust.js"></script>
-        <script src="{{ path_to_root }}theme-dawn.js"></script>
-        <script src="{{ path_to_root }}theme-tomorrow_night.js"></script>
-        {{/if}}
-
-        {{#if search_js}}
-        <script src="{{ path_to_root }}elasticlunr.min.js"></script>
-        <script src="{{ path_to_root }}mark.min.js"></script>
-        <script src="{{ path_to_root }}searcher.js"></script>
-        {{/if}}
-
-        <script src="{{ path_to_root }}clipboard.min.js"></script>
-        <script src="{{ path_to_root }}highlight.js"></script>
-        <script src="{{ path_to_root }}book.js"></script>
-
-
-
-
-
-        <!-- Custom JS scripts -->
-        {{#each additional_js}}
-        <script src="{{ ../path_to_root }}{{this}}"></script>
-        {{/each}}
-
-        {{#if is_print}}
-        {{#if mathjax_support}}
-        <script>
-        window.addEventListener('load', function() {
-            MathJax.Hub.Register.StartupHook('End', function() {
-                window.setTimeout(window.print, 100);
-            });
-        });
-        </script>
-        {{else}}
-        <script>
-        window.addEventListener('load', function() {
-            window.setTimeout(window.print, 100);
-        });
-        </script>
-        {{/if}}
-        {{/if}}
-
-    </div>            
-
-        <script src="https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js"></script>
-        <script>
-            const { autocomplete } = window['@algolia/autocomplete-js'];
-        </script>
-
-        <script type="text/javascript">
-            docsearch({
-                appId: 'GX9RTL51BH',
-                apiKey: '364d7154cf1fa31bad0b8fd9c6018351',
-                indexName: 'tinysnowio',
-                container: '#docsearch'
-                debug: false // Set debug to true if you want to inspect the modal
-                });
-            autocomplete({
-              container: '#docsearch',
-              placeholder: '搜索 / Search',
-              getSources() {
-                return [];
-              },
-            });
-        </script>
-    </body>
-</html>
```
