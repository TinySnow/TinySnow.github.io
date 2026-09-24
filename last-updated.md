# 最近更新 | Last Updated

## Prenote

> NOTICE: This content is presented as `git diff`.

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-09-24 09:36:59 CMT (UTC+8) | 572ccd3c）

### Summary

- Generated at: `2026-09-24 09:36:59 CMT (UTC+8)`
- Base commit: `572ccd3c`
- Diff source: `f1b578da48b5ad160b691fdf3a19b2d849a6a233..572ccd3c03f20bcaf94e5383100d9d2200143892`
- Changed files: `1`
- Total lines: `+19 / -4`

### Index

1. [.github/workflows/mdbook.yml](#f-430391340-github-workflows-mdbook-yml-863419811) `+19 / -4`

### Diffs

<a id="f-430391340-github-workflows-mdbook-yml-863419811"></a>
#### .github/workflows/mdbook.yml

<details>
<summary><code>+19 / -4</code> Click to expand diff</summary>

~~~~~diff
diff --git a/.github/workflows/mdbook.yml b/.github/workflows/mdbook.yml
index 094b1cb4..2cf1504a 100644
--- a/.github/workflows/mdbook.yml
+++ b/.github/workflows/mdbook.yml
@@ -116,9 +116,20 @@ jobs:
         with:
           fetch-depth: 0
 
-      # 关键：last-updated 的“历史保留”依赖上一轮生成结果。
-      # 若每次都从仓库原始文件起步（不恢复上一轮 artifact），就只能看到 1 条最新记录。
+      # 优先从发布镜像恢复上一轮生成结果。该分支随站点内容持久化，
+      # 不受 GitHub Actions artifact 下载失败或过期的影响。
+      - name: Restore last-updated baseline from gh-pages mirror
+        id: restore_mirror
+        continue-on-error: true
+        shell: bash
+        run: |
+          set -Eeuo pipefail
+          git fetch origin gh-pages-mirror
+          git show origin/gh-pages-mirror:last-updated.md > src/last-updated.md
+
+      # 首次迁移到镜像基线前，artifact 仍作为兼容性回退。
       - name: Resolve previous successful workflow run
+        if: steps.restore_mirror.outcome != 'success'
         id: prev_run
         uses: actions/github-script@v7
         with:
@@ -144,7 +155,7 @@ jobs:
       # 从上一轮成功运行下载 metadata，作为本轮生成输入基线。
       # continue-on-error 保证首次运行或历史 artifact 过期时仍可继续构建。
       - name: Download previous metadata artifact
-        if: steps.prev_run.outputs.run_id != ''
+        if: steps.restore_mirror.outcome != 'success' && steps.prev_run.outputs.run_id != ''
         continue-on-error: true
         uses: actions/download-artifact@v4
         with:
@@ -155,7 +166,7 @@ jobs:
 
       # 若成功拿到上一轮 last-updated，则先恢复它，再追加本轮变更记录。
       - name: Restore previous last-updated baseline
-        if: hashFiles('ci-prev-artifact/src/last-updated.md') != ''
+        if: steps.restore_mirror.outcome != 'success' && hashFiles('ci-prev-artifact/src/last-updated.md') != ''
         shell: bash
         run: |
           set -Eeuo pipefail
@@ -249,6 +260,10 @@ jobs:
       - name: Build with mdBook
         run: mdbook build
 
+      # 将原始 Markdown 一并写入镜像分支，供下一轮生成稳定恢复历史。
+      - name: Preserve last-updated baseline in mirror
+        run: cp -v src/last-updated.md book/last-updated.md
+
       # sitemap 直接从构建后的 book 目录生成，不再本地提交 src/sitemap*.*
       - name: Generate sitemap
         run: sscli -b https://tinysnow.github.io -r ./book

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->


<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-09-24 06:00:52 CMT (UTC+8) | f1b578da）

### Summary

- Generated at: `2026-09-24 06:00:52 CMT (UTC+8)`
- Base commit: `f1b578da`
- Diff source: `75470a6ee43da8c46d8b453b72edb5d938cca3f5..f1b578da48b5ad160b691fdf3a19b2d849a6a233`
- Changed files: `2`
- Total lines: `+42 / -0`

### Index

1. [src/SUMMARY.md](#f-3390406930-src-summary-md-3501257646) `+1 / -0`
2. [src/阅读/每日一文/母难月-吴念真.md](#f-3390406930-src-阅读-每日一文-母难月-吴念真-md-3450361211) `+41 / -0`

### Diffs

<a id="f-3390406930-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+1 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index 3da2197d..64666317 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -1437,6 +1437,7 @@
     - [所有女生要知道](阅读/其他/书籍/所有女生要知道.md)
     - [意象的帝国：诗的写作课](阅读/其他/书籍/意象的帝国：诗的写作课.md)
 - [每日一文 | Daily Article](阅读/每日一文/每日一文.md)
+  - [母难月 - 吴念真](阅读/每日一文/母难月-吴念真.md)
   - [不完美的完美 - 刘墉](阅读/每日一文/不完美的完美-刘墉.md)
   - [人性的光华 - 许知远](阅读/每日一文/人性的光华-许知远.md)
   - [不买房，买梦想 - 高晓松](阅读/每日一文/不买房，买梦想-高晓松.md)

~~~~~

</details>

<a id="f-3390406930-src-阅读-每日一文-母难月-吴念真-md-3450361211"></a>
#### src/阅读/每日一文/母难月-吴念真.md

<details>
<summary><code>+41 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\346\257\215\351\232\276\346\234\210-\345\220\264\345\277\265\347\234\237.md" "b/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\346\257\215\351\232\276\346\234\210-\345\220\264\345\277\265\347\234\237.md"
new file mode 100644
index 00000000..a84f97fb
--- /dev/null
+++ "b/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\346\257\215\351\232\276\346\234\210-\345\220\264\345\277\265\347\234\237.md"
@@ -0,0 +1,41 @@
+# 母难月
+
+*吴念真*
+
+　　爸爸十六岁那年从嘉义跑到九份附近的矿区工作。十六岁还不能进矿坑，所以他在炼金工厂当小工。
+
+　　他发现工厂里有一个年长的女工几乎每天以泪洗面，于是善意地问人家出了什么事，那妇人说她儿子在山上工作时中暑死了，十六岁，跟他一样大。
+
+　　爸爸说：“你不要伤心了，不然……我给你当儿子。”
+
+　　从此爸爸进了人家家门，当了别人的儿子。
+
+　　爸爸二十一岁那年成了正式的矿工，人家从贡寮山上找来一个孤女当养女，再以招赘的方式让她和爸爸结婚以延续这一家的香火。
+
+　　这个孤女，也就是后来的我妈，当时才十五岁。她十六岁生下第一个小孩，四个月不到就夭折了。
+
+　　多年之后，姑妈跟我说，那时候我妈经常会有一些怪异的举止，比如半夜跑到外面哭，或者走着走着忽然像被什么召唤一般，停下脚步跪拜四方。
+
+　　十七岁她生下我，同样不好带。我四个月大的时候，有一天忽然开始不吃奶，肚子一天比一天大，到最后“随时眼睛翻白，四肢抽搐”，妈妈曾经说那时候她唯一的想法是：万一连这个也养不活，她也会跟着走。
+
+　　接下来就有点像乡野传奇了。据说就在我气若游丝的当下，村子里来了一个应邀出诊的中医，看完该看的病人准备回去时在山路上被邻居拦了下来，要他做做好事来看我。
+
+　　据说他在望闻问切之后还问了我的生辰八字，然后开了一帖包括三种青草外加长在黄泥巴里的蚯蚓七条的奇怪药方，说如果在当天酉时之前药材可以备妥，并且让我服下，就会有救，否则这孩子“人家会收回去”。
+
+　　采药的过程是另一个说来话长的传奇，总之酉时之前这帖药真的就灌进了我的喉咙。
+
+　　根据我妈的描述是：“就在午夜时分，你忽然放了一个响屁，然后拉出一大摊又黑又臭的大便……我跟你爸抱着你洗澡的时候，发现你的手竟然会拉着我的手指，然后睁开了眼睛。你爸爸跟我说，孩子，人家要还给我们了！洗完澡，发现你好像在找奶吃，当我把奶头塞进你的嘴巴，感觉你很饿、很有力地吸起来的时候，我就忍不住大哭起来了！”
+
+　　三十年后，我还活着，而且要结婚了。妈妈说有两件事必须跟婚礼一起完成，第一件事是婚礼的前一天，她要杀猪公，并且行跪拜一百次的大礼。她说当年在最绝望的时候，她曾经抱着我跪在床头哭着跟众神许愿，说如果这孩子可以平安长大，结婚那天她要跪拜天地以谢神恩，而当天果真就出现了那个“神医”。
+
+　　第二件事，是婚礼那天我们得替她搭个台子并且请来乐队，因为她要上台唱歌。她说这是她的另一个心愿。我初中毕业离家到台北工作的时候，有一天她在路上碰到我的小学老师，老师问起我的事，然后跟她说我很聪明、爱读书，无论怎么波折，总有一天我都会念到大学。
+
+　　妈妈说，那天回家的路上，她忽然觉得“像我这样的妈妈，如果也可以养出一个大学毕业的孩子……我跪在路边跟四方神佛许愿说，他结婚那天，我一定要快乐地唱歌给大家听！”
+
+　　写这篇文章时正是我出生的月份，或许是这样的缘故吧，二十七年前妈妈穿着一辈子没穿过几次的旗袍和高跟鞋，坚持跪拜一百下以至最后几乎连站都站不起来的样子，以及在简单的舞台上，以颤抖的声音唱着《旧皮箱的流浪儿》的神情，再度鲜明地浮现眼前。
+
+　　妈妈五年前骨癌过世。
+
+　　生养我们五个（如果连夭折的那个也算的话，就是六个）小孩的过程，其忧烦与苦难远远多于欣喜与安慰。
+
+　　我曾想过，妈妈会得骨癌，到了末期全身的骨头甚至一碰即碎，是不是就因为这辈子的身、心都一直承担着过量的负荷？

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-09-23 06:00:43 CMT (UTC+8) | 75470a6e）

### Summary

- Generated at: `2026-09-23 06:00:43 CMT (UTC+8)`
- Base commit: `75470a6e`
- Diff source: `c9707cb553fac44589a919e1cf66c4236b94e8b9..75470a6ee43da8c46d8b453b72edb5d938cca3f5`
- Changed files: `2`
- Total lines: `+18 / -0`

### Index

1. [src/SUMMARY.md](#f-1502915588-src-summary-md-3501257646) `+1 / -0`
2. [src/阅读/每日一文/不完美的完美-刘墉.md](#f-1502915588-src-阅读-每日一文-不完美的完美-刘墉-md-298491175) `+17 / -0`

### Diffs

<a id="f-1502915588-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+1 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index b2b5ab78..3da2197d 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -1437,6 +1437,7 @@
     - [所有女生要知道](阅读/其他/书籍/所有女生要知道.md)
     - [意象的帝国：诗的写作课](阅读/其他/书籍/意象的帝国：诗的写作课.md)
 - [每日一文 | Daily Article](阅读/每日一文/每日一文.md)
+  - [不完美的完美 - 刘墉](阅读/每日一文/不完美的完美-刘墉.md)
   - [人性的光华 - 许知远](阅读/每日一文/人性的光华-许知远.md)
   - [不买房，买梦想 - 高晓松](阅读/每日一文/不买房，买梦想-高晓松.md)
   - [陪他一段 - 苏伟贞](阅读/每日一文/陪他一段-苏伟贞.md)

~~~~~

</details>

<a id="f-1502915588-src-阅读-每日一文-不完美的完美-刘墉-md-298491175"></a>
#### src/阅读/每日一文/不完美的完美-刘墉.md

<details>
<summary><code>+17 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\344\270\215\345\256\214\347\276\216\347\232\204\345\256\214\347\276\216-\345\210\230\345\242\211.md" "b/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\344\270\215\345\256\214\347\276\216\347\232\204\345\256\214\347\276\216-\345\210\230\345\242\211.md"
new file mode 100644
index 00000000..c5f3e8c1
--- /dev/null
+++ "b/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\344\270\215\345\256\214\347\276\216\347\232\204\345\256\214\347\276\216-\345\210\230\345\242\211.md"
@@ -0,0 +1,17 @@
+# 不完美的完美
+
+*刘墉*
+
+　　我有一个朋友，单身半辈子，快五十岁时突然结了婚。新娘跟他的年龄差不多，徐娘半老，风韵犹存，只是知道的朋友都窃窃私语：“那女人以前是个演员，嫁了两任丈夫，都离了，现在不红了，由他捡了个剩货。”
+
+　　不知道是不是话传到了他耳里。有一天，他跟我出去，一边开车，一边笑道：“我这个人，年轻的时候就盼开奔驰车，没钱，买不起。现在呀，还是买不起，买了辆三手车。”
+
+　　他开的确实是辆老奔驰。我左右看看说：“三手？看来很好哇！马力也足。”
+
+　　“是啊！”他大笑了起来，“旧车有什么不好？就好像我太太，前面嫁个四川人，又嫁个上海人，还在演艺圈二十多年，大大小小的场面见多了，现在老了，收了心，没了以前的娇气、浮华气，却做得一手四川菜、上海菜，又懂得布置家。讲句实在话，她真正最完美的时候反而被我遇上了。”
+
+　　我说：“别人不说，我真看不出她竟然是当年的那位艳星。”
+
+　　“是啊！”他拍着方向盘，“其实想想我自己，我又完美吗？我还不是千疮百孔，有过许多往事，许多荒唐。正因为我们都经历了这些，所以都成熟，都知道让，都知道忍。这不完美？这正是一种完美啊！”
+
+　　不完美正是一种完美！我们老了，锈了，千疮百孔，隔一阵子就需要去看医生，来修补我们残破的身躯，我们又何必要求自己拥有的人、事、物都完美无瑕，没有缺点呢？看得惯残破，也是历练，是豁达，是成熟，是一种人生的境界啊！

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

