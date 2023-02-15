# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## SUMMARY.md

```diff

@@ -387,7 +387,7 @@
     - [已读书目记录](笔记/记录/已读书目记录.md)
     - [观影记录](笔记/记录/观影记录.md)
     - [番剧记录](笔记/记录/番剧记录.md)
-    - [Galgame 记录](笔记/记录/Galgame%20记录.md)
+    - [Galgame 记录](笔记/记录/GalGame%20记录.md)
     - [游玩游戏记录](笔记/记录/游玩游戏记录.md)
     - [软件订阅记录](笔记/记录/软件订阅记录.md)
     - [喜爱的舞者](笔记/记录/喜爱的舞者.md)
```

## sitemap.txt

```diff

@@ -17,6 +17,7 @@ https://tinysnow.github.io/每日一文/写在五线谱上的信 - 王小波
 https://tinysnow.github.io/每日一文/双鱼 - 三毛
 https://tinysnow.github.io/每日一文/女人的星球 - 高铭
 https://tinysnow.github.io/每日一文/女朋友 - 亦舒
+https://tinysnow.github.io/每日一文/婚姻是一种修养 - 胡杨
 https://tinysnow.github.io/每日一文/小生命 - 亦舒
 https://tinysnow.github.io/每日一文/我们的老式婚姻 - 杨修峰
 https://tinysnow.github.io/每日一文/我们都有病 - 朱德庸
```


## 刷机教程.md

```diff

@@ -32,9 +32,23 @@
 ## 注意
 
 - **刷机之前请一定要确保手机电量充足**
-- **如果刷入的 Android 版本与刷入之前的 Android 版本不同，一定要备份数据**
-  - Google 每次升级 Android 版本都会换一种加密方式，各版本不互通
-  - 如果不备份数据，意味着数据无法解密，会全部丢失，包括相册，联系人，应用数据等
+
+- **每次刷机之前最好都备份一下数据，<u>部分情况下必须备份数据：</u>**
+  
+  1. 如果刷入的 Android 版本与刷入之前的 Android 版本不同：
+  
+    - Google 每次升级 Android 版本都会换一种加密方式，各版本不互通
+    - 如果不备份数据，意味着数据无法解密，会全部丢失，包括相册，联系人，应用数据等
+  
+  2. 厂商推送版本不同时：
+  
+  - 小米的 <u>稳定版</u> 和 <u>开发版</u> ，两者不可以混刷
+  
+  3. 更换第三方 Rom
+  
+  - 如 PixelExperienceRom 和 LineageOSRom
+  - 相当于两个系统，当然不能混刷
+  
 - **Rom 包一定要与自己手机型号对应**
   - 需要精确到
     - 品牌（OnePlus, Redmi, etc.）

@@ -42,6 +56,7 @@
     - 是否为专业版（Note 7, Note 7 Pro, etc.）
   - 否则会因为固件冲突导致硬件不可逆地损坏，成为 Brick（砖头手机）
   - 不要抱有侥幸心理，到时候只能买新手机（因为不保修）
+  
 - **一般手机都会有个独一无二的代号，直接找代号最精确**，下面是一些例子
 
 |     手机型号     |        代号        |

@@ -53,6 +68,7 @@
 
 - 如今市场上，对于刷机比较包容的品牌基本只有 **小米（MI）和 一加（OnePlus）** 了
 - 成功刷入 Rom 后请一定设置一个系统密码，然后重启到 Recovery 观察是否能解密
+  - Android Version >= 9，详细说明见[刷入 Rom](#刷入Rom)
   - 能解密，则可以开始恢复数据了
   - **不能解密，最好另找 Rom 或者 Recovery**
   - Recovery 是能救命的，请不要抱有不能解密也没关系的幻想

@@ -145,6 +161,8 @@ adb reboot recovery
   - 一般来讲刷入 Magisk.apk 之后就有 ROOT 权限了
   - Magisk 更新之后安装包和线刷包合二为一了，都为 Magisk
 - 设置系统密码后，重启到 Recovery 观察是否能解密
+  - Android 9 以上，厂商会自动锁定 system 来防止用户进行危险操作
+  - 低版本不会出现提示解密的窗口，[Data 分区](#分区说明)不加密
 
 ### 恢复数据
 

@@ -158,7 +176,7 @@ adb reboot recovery
     - 将刷机包拷入到手机内存，使用 Recovey 直接刷入
     - 一般为相同系统更新，清除类型为双清
       - 要不然系统和用户数据都没了
-    - 有限制，必须要把想要更新的ROM（Android系统）拷贝到 SD卡 或者通过 fastboot拷贝到内部存储中
+    - 有限制，必须要把想要更新的 ROM（Android系统）拷贝到 SD 卡 或者通过 fastboot 拷贝到内部存储中
   - 线刷
     - 利用电脑使用 fastboot 刷入
     - 一般为升级 Android 版本和更换一个完全不同类型的系统

@@ -167,6 +185,7 @@ adb reboot recovery
       - 或者兼而有之
     - 清除类型一般为四清，毕竟都换系统了，也备份数据了
 - 手机文件存储结构
+  - 此处显示的为 Google 推出 A/B 分区之前的结构示意图
 
 ```bash
              手机                                           电脑

@@ -271,6 +290,10 @@ adb reboot recovery
 - 技术支持：逐雪
 - 文案：南国微雪
 - 排版：南国微雪
+- 校对：
+  - [1 1](https://t.me/nekopala)
+  - [Linus L](https://t.me/linusl0080)
+  - [咖啡是Java](https://t.me/Cafe2077)
 - 引用：少数派社区
 
 ## 协议
```

## 教程.md

```diff

@@ -2,4 +2,13 @@
 
 一些简短的教程，可能会有错误。仅仅用于自己备忘。
 
-其中 Basic Elements 和 Street Dance Basics 属于街舞专业内容，可以信任。其它教程请持怀疑态度。
\ No newline at end of file
+以下教程可以信任：
+
+-  Basic Elements 和 Street Dance Basics
+  - 属于街舞专业内容
+- 重装系统
+  - 试验修正过多次
+- 刷机教程
+  - 试验修正过多次，技术人员校对
+
+其它教程请持怀疑态度。
\ No newline at end of file
```

## 重装系统.md

```diff

@@ -11,6 +11,8 @@
 - Windows Terminal Themes settings.json
 - 种子下载记录
 - Windows 下载商业版（ itellyou 例：Windows 10, version XXXX (released \<month> \<year>) 64-bit Chinese Simplified）不要下 LTSC 和 LTSB
+- PicGo 设置
+- Proxifer Profile
 
 ## 流程
 
```

## GalGame 记录.md

```diff

@@ -3,7 +3,7 @@
 1. Making Lovers
 2. Making Lovers Vol.1
 3. Making Lovers Vol.2
-4. 爱之钥 ~AfterDays~
+4. 爱之钥 \~AfterDays\~
 5. 春音 Alice\*Gram
 6. 忘却管家与恋爱大小姐的回忆录¹
 7. 星光咖啡馆与死神之蝶
```

## 已读书目记录.md

```diff

@@ -88,4 +88,8 @@
 ## 2023 年
 
 1. 强风吹拂 - [日]三浦紫苑（三浦しをん）- <2022.12.7-2023.1.3>
-2. 时间简史 - [英]史蒂芬·霍金（Stephen Hawking）- <2023.1.5-2023.1.26>
\ No newline at end of file
+2. 时间简史 - [英]史蒂芬·霍金（Stephen Hawking）- <2023.1.5-2023.1.26>
+3. (漫画) 半小时漫画预防常见病 - 陈磊·半小时漫画团队 - <2023.1.27-2023.2.3>
+4. (漫画) 半小时漫画宇宙大爆炸 - 陈磊·半小时漫画团队 - <2023.2.3>
+5. (漫画) 半小时漫画经济学 4：理财篇 - 陈磊·半小时漫画团队 - <2023.2.3>
+6. ⭐️焦虑的人 - [瑞典]弗雷德里克·贝克曼（Fredrik Backman）(注：翻译腔但剧情好) - <2023.1.27-2023.2.11>
\ No newline at end of file
```

## 游玩游戏记录.md

```diff

@@ -45,6 +45,7 @@
 41. Mirror
 42. 赛博朋克 2077（Cyberpunk 2077）
 43. 植物大战僵尸（Plants vs Zombies）
+44. Broforce
 
 ## 受人推荐
 
```

## 观影记录.md

```diff

@@ -17,6 +17,7 @@
 14. 星际拓荒
 15. 觉醒年代（电视剧）
 16. 太空漫游 2001
+16. 流浪地球 2
 
 ## 已完成
 

@@ -63,4 +64,5 @@
 
 ### 2023 年（Unknown 部）
 
-27. 闻香识女人（Scent of a Woman）
\ No newline at end of file
+27. 闻香识女人（Scent of a Woman）
+28. 指环王 1：护戒使者（The Lord of the Rings: The Fellowship of the Ring）
\ No newline at end of file
```
