# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## autopush.sh

```diff

@@ -54,6 +54,9 @@ if [[ $1 ]]; then
 	# 推送至远程仓库
 	git push
 
+	# 推送到 gitee 备份
+	git push gitee master
+
 	# echo "\"$1\""
 else
 	echo "请提供参数。"
```

## sitemap.txt

```diff

@@ -9,6 +9,7 @@ https://tinysnow.github.io/技术/Errors
 https://tinysnow.github.io/技术/Knowledge
 https://tinysnow.github.io/技术/技术
 https://tinysnow.github.io/断章/断章
+https://tinysnow.github.io/每日一文/一条狗的两次死亡 - 照日格图
 https://tinysnow.github.io/每日一文/一条路 - 亦舒
 https://tinysnow.github.io/每日一文/双鱼 - 三毛
 https://tinysnow.github.io/每日一文/女人的星球 - 高铭
```

