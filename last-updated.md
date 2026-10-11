# 最近更新 | Last Updated

## Prenote

> NOTICE: This content is presented as `git diff`.

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-11 15:28:38 CMT (UTC+8) | 2ad238315）

### Summary

- Generated at: `2026-10-11 15:28:38 CMT (UTC+8)`
- Base commit: `2ad238315`
- Diff source: `6f52924ec7737b915026cc8431be51222bfc5992..2ad238315613b9c60c4263db9c28446e290e16e7`
- Changed files: `1`
- Total lines: `+1 / -1`

### Commit Messages

- `2ad23831` 随笔校对目录：2026-10-11

### Index

1. [src/SUMMARY.md](#f-3620673164-src-summary-md-3501257646) `+1 / -1`

### Diffs

<a id="f-3620673164-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+1 / -1</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index 2b946b99c..1154d855b 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -269,7 +269,7 @@
     - [随记 - 2020 年 10 月 17 日](生活碎笔/随笔随记/情感类随记/随记-2020年10月17日.md)
     - [随记 - 2020 年 5 月 15 日](生活碎笔/随笔随记/情感类随记/随记-2020年5月15日.md)
   - [实用类随记](生活碎笔/随笔随记/实用类随记/实用类随记.md)
-    - [【AIGC待校对】爱好接了单，连不想做的部分也要交付](生活碎笔/随笔随记/实用类随记/【AIGC待校对】爱好接了单，连不想做的部分也要交付.md)
+    - [【AIGC人工校对】爱好接了单，连不想做的部分也要交付](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】爱好接了单，连不想做的部分也要交付.md)
     - [【AIGC人工校对】复盘的时候，别假装自己当时就知道结局](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】复盘的时候，别假装自己当时就知道结局.md)
     - [【AIGC人工校对】留着备用的东西，也在占用你现在的生活](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】留着备用的东西，也在占用你现在的生活.md)
     - [【AIGC人工校对】道歉之后，先把给别人添的麻烦处理掉](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】道歉之后，先把给别人添的麻烦处理掉.md)

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->


<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-11 15:23:56 CMT (UTC+8) | ec1fa4465）

### Summary

- Generated at: `2026-10-11 15:23:56 CMT (UTC+8)`
- Base commit: `ec1fa4465`
- Diff source: `3131cd7aacff176be1f85ce5c5c484291563c533..ec1fa446514d271252dbd58ee3ff181129371d8b`
- Changed files: `10`
- Total lines: `+602 / -208`

### Commit Messages

- `ec1fa446` feat(转换工具): 新增 .cmd 双击入口并加固标题获取；改写「触发器」一章；改名两篇随笔并收录《猪草》

  > 一、微信公众号转换工具（assets/）
  >
  > 新增 assets/convert-wechat-article.cmd：纯 ASCII 的批处理启动器，以进程级
  > -ExecutionPolicy Bypass 调用 Windows PowerShell 5.1，原样透传参数与退出码。原因是本机
  > 没有注册 Microsoft.PowerShellScript.1，资源管理器右键没有「使用 PowerShell 运行」，
  > .ps1 又可能被关联到记事本，直接 & 调用还会被执行策略拒绝。
  >
  > convert-wechat-article.ps1 的改动：
  >
  > - 暂停判断重写。原来只看父进程是不是 explorer；现在沿进程树上溯最多 6 层识别
  >   explorer、dllhost 等外壳宿主，并新增 Test-InteractiveConsole 判断 stdin/stdout 是否被
  >   重定向。规则按明确程度排序：-NoPause 优先，其次是环境变量 CONVERT_WECHAT_PAUSE
  >   （0 从不暂停／1 总是暂停），再是重定向输入一律不暂停（保证管道、CI、自动化不会卡在
  >   Read-Host），最后才在双击或交互式终端里停留。成功与失败路径都会停留。
  > - 标题获取抽成 Resolve-ArticleTitle，顺序定为 -Title 参数、输入末尾的独立标题行、剪贴板
  >   单行文本、真实控制台手动输入（最多 5 次，直接回车取消），四条都拿不到才报错退出。
  > - 新增 Test-UsableTitle：候选标题含换行或 Windows 文件名非法字符时跳过并说明原因，
  >   不再像以前那样直接中断转换。剪贴板里是路径或整段文字时也不再让整次运行失败。
  > - 错误信息改为中文，去掉原来把英文异常直接抛给双击用户的写法。
  >
  > assets/AGENTS.md 同步重写「当前转换工具」一节：双击 .cmd 的推荐流程、终端用法、窗口是否
  > 停留的三条规则、.ps1 必须保留 UTF-8 BOM 与 .cmd 必须纯 ASCII 的编码要求、四步标题来源、
  > 非法字符跳过规则。
  >
  > 二、计算机科学极简入门指南
  >
  > 重写「第二十章：触发器」全文：收紧口语化表述与破折号堆叠，把锁存器的「电平敏感」与
  > 触发器的「边沿敏感」对比讲透，主从结构「一级开门时另一级必定关门」的推导补全；思考题
  > 由 3 题并为 2 题，原第 1 题并入正文，参考答案同步调整，正文与答案不再重复设问。
  >
  > 三、随笔
  >
  > 《复盘的时候，别假装自己当时就知道结局》《爱好接了单，连不想做的部分也要交付》两篇由
  > 「【AIGC待校对】」改名为「【AIGC人工校对】」，表示已完成人工校对。文件名之外还做了两处
  > 人工润色：署名统一为「<br /> + 两个全角空格缩进」的博客格式（此前是顶格裸行）；《复盘》
  > 一篇改掉「这当然都对」这类绝对化表述，给两处关键结论补上 mdBook 加粗。
  >
  > 新增文章《猪草》：写回乡时母亲用猪草（红薯叶、红薯藤）炒菜一事，由农村与城市的落差谈到
  > 童年经历如何变成生命韧性的一部分，含封面图与图源署名。已按惯例在 src/SUMMARY.md 的
  > 「文章与写作」列表顶部补上条目。
  >
  > 四、其他
  >
  > assets/wechat-origin.md 换成《猪草》的微信原始粘贴稿，供转换工具作为当前输入样本。

- `22d12728` Merge branch 'master' of github.com:TinySnow/TinySnow.github.io
- `a7e6e2a4` Merge branch 'master' of github.com:TinySnow/TinySnow.github.io
- `0023285b` docs(计算机科学极简入门指南): AGENTS 新增「去 AIGC 味」规范

  > - 新增第六节「去 AIGC 味（硬性，写完必查）」，与《学海计划》规范同源，已按本系列文体改写。
  > - 收录五条：推进方式「一条线走到底」、AI 腔硬性禁表、结构清晰、多样性与节奏、收尾不升华。
  > - 「底层逻辑」按本系列语境放宽：底层的门电路、底层实现照写，禁的是修辞化用法。
  > - 禁表作用范围含正文、小标题、TL;DR 与小结；禁表之外的套话登记在提交信息里。
  > - 原第六至第八节顺延为第七至第九节，文末自检清单同步补入去 AIGC 三项检查。


### Index

1. [assets/AGENTS.md](#f-520419096-assets-agents-md-3942825076) `+54 / -21`
2. [assets/convert-wechat-article.cmd](#f-520419096-assets-convert-wechat-article-cmd-1876348669) `+38 / -0`
3. [assets/convert-wechat-article.ps1](#f-520419096-assets-convert-wechat-article-ps1-688062784) `+135 / -36`
4. [assets/wechat-origin.md](#f-520419096-assets-wechat-origin-md-2464248456) `+37 / -113`
5. [src/SUMMARY.md](#f-520419096-src-summary-md-3501257646) `+1 / -0`
6. [src/学习与进步/计算机科学极简入门指南/AGENTS.md](#f-520419096-src-学习与进步-计算机科学极简入门指南-agents-md-3318719775) `+88 / -4`
7. [src/学习与进步/计算机科学极简入门指南/计算机组成原理/第二十章：触发器.md](#f-520419096-src-学习与进步-计算机科学极简入门指南-计算机组成原理-第二十章-触发器-md-145588725) `+26 / -34`
8. [src/生活碎笔/文章与写作/猪草.md](#f-520419096-src-生活碎笔-文章与写作-猪草-md-1693121996) `+91 / -0`
9. [src/生活碎笔/随笔随记/实用类随记/【AIGC人工校对】复盘的时候，别假装自己当时就知道结局.md](#f-520419096-src-生活碎笔-随笔随记-实用类随记-aigc人工校对-复盘的时候-别假装自己当时就知道结局-md-2990626526) `+67 / -0`
10. [src/生活碎笔/随笔随记/实用类随记/【AIGC人工校对】爱好接了单，连不想做的部分也要交付.md](#f-520419096-src-生活碎笔-随笔随记-实用类随记-aigc人工校对-爱好接了单-连不想做的部分也要交付-md-2448431962) `+65 / -0`

### Diffs

<a id="f-520419096-assets-agents-md-3942825076"></a>
#### assets/AGENTS.md

<details>
<summary><code>+54 / -21</code> Click to expand diff</summary>

~~~~~diff
diff --git a/assets/AGENTS.md b/assets/AGENTS.md
index 017add88f..4826e6ad8 100644
--- a/assets/AGENTS.md
+++ b/assets/AGENTS.md
@@ -161,39 +161,76 @@
 
 ## 当前转换工具
 
-当前实现为 `assets/convert-wechat-article.ps1`，默认把 `assets/wechat-origin.md` 转换到 `src/生活碎笔/文章与写作/`，并从一级标题、文章末尾标题、显式参数或剪贴板取得标题。
+当前实现为 `assets/convert-wechat-article.ps1`，双击入口为 `assets/convert-wechat-article.cmd`。默认把 `assets/wechat-origin.md` 转换到 `src/生活碎笔/文章与写作/`，并从一级标题、显式参数、文章末尾标题、剪贴板或手动输入取得标题。
 
-在仓库根目录运行：
+### 推荐方式：双击 `.cmd`
 
-```powershell
-.\assets\convert-wechat-article.ps1
-```
+1. 在微信公众号里复制文章标题（`Ctrl+C` 即可，不必粘进任何文件）。
+2. 把正文粘贴到 `assets/wechat-origin.md`，**不需要**给标题留位置，也**不需要**写 `# 一级标题`。
+3. 双击 `assets/convert-wechat-article.cmd`。标题直接取自剪贴板，窗口输出目标路径，并停留到按 Enter。
+
+只有剪贴板里没有可用的单行标题时（空剪贴板、复制的是路径或整段文字），才会提示手动输入标题；此时直接回车可取消。
 
-也可在资源管理器中右键 `convert-wechat-article.ps1` 并选择“使用 PowerShell 运行”。脚本的默认输入、输出路径始终相对于仓库根目录解析；从资源管理器启动时，成功或失败信息会保留在窗口中，按 Enter 才会关闭。
+之所以不直接双击 `.ps1`：
 
-该 `.ps1` 文件必须保存为 **UTF-8 with BOM**。资源管理器右键运行使用 Windows PowerShell 5.1，它不能可靠解析带中文的 UTF-8 无 BOM 脚本；修改脚本编码时不得移除 BOM。
+- 本机没有注册 `Microsoft.PowerShellScript.1` 类，资源管理器右键菜单里没有“使用 PowerShell 运行”（`HKLM\SOFTWARE\Classes\.ps1` 也不存在）。
+- `.ps1` 的默认打开方式可能被关联到记事本，双击只会打开源码而不执行。
+- 直接 `& .\assets\convert-wechat-article.ps1` 调用未签名脚本时，可能被执行策略拒绝（`RemoteSigned` 下提示“未对文件进行数字签名”）。
+- `.cmd` 以进程级 `-ExecutionPolicy Bypass` 调用 Windows PowerShell 5.1，并原样透传参数与退出码；是否停留由 `.ps1` 判断，因此不会再“闪退”。
 
-输入文件可以没有一级标题。无标题时，先在微信公众号中复制文章标题，再运行上述命令；工具会读取剪贴板中的单行文本，将其补为一级标题，并用它生成文件名。标题不需要粘贴进 `assets/wechat-origin.md`。
+### 在终端运行
+
+```powershell
+.\assets\convert-wechat-article.cmd
+.\assets\convert-wechat-article.cmd -Title "文章标题"
+.\assets\convert-wechat-article.cmd -InputPath .\其他输入.md -OutputDirectory .\converted
+```
 
-如果不希望读取剪贴板，也可以显式传入标题：
+不经过 `.cmd` 调用时，必须显式绕过执行策略：
 
 ```powershell
-.\assets\convert-wechat-article.ps1 -Title "文章标题"
+powershell -NoProfile -ExecutionPolicy Bypass -File .\assets\convert-wechat-article.ps1
 ```
 
-也可以把未经 Markdown 格式化的标题粘贴为整篇输入的最后一个独立文本行。工具会把该行从末尾移走，自动补成开头的一级标题。不要把标题无分隔地直接拼在图源行之后，例如 `> 图源 | Unsplash文章标题`；这种文本没有可靠的标题边界，无法安全自动拆分。总体上，推荐使用剪贴板方案，因为复制标题后无需再次粘贴。
+脚本的默认输入、输出路径始终相对于仓库根目录（`assets` 的上一级）解析，因此在任何工作目录下运行结果一致。
+
+### 窗口是否停留
+
+- 输入被重定向时（管道、CI、自动化）从不停留，避免 `Read-Host` 阻塞；这一条优先于下面两条。
+- 双击 `.cmd`、用“打开方式”运行 `.ps1`，或在交互式终端里运行时停留，成功和失败都要按 Enter。
+- 显式控制：传 `-NoPause`，或设置环境变量 `CONVERT_WECHAT_PAUSE=0`（从不暂停）／`CONVERT_WECHAT_PAUSE=1`（总是暂停）。
+
+### 编码要求
+
+- `.ps1` 必须保存为 **UTF-8 with BOM**。Windows PowerShell 5.1 不能可靠解析带中文的 UTF-8 无 BOM 脚本，会报 `缺少“)”` 一类语法错误；用编辑器或脚本改写后务必确认 BOM 仍在。
+- `.cmd` 必须保持 **纯 ASCII**。cmd.exe 按 OEM 代码页读取批处理文件，中文会变成乱码；中文输出由 `.ps1` 负责。
 
-也可以指定其他输入文件或输出目录：
+### 标题来源
+
+常规流程是**剪贴板**：复制文章标题，双击 `.cmd`，工具读取剪贴板里的单行文本作为标题，并自动补成开头的 `# 一级标题`。不需要把标题粘进 `assets/wechat-origin.md`，也不需要手动写 `#`。
+
+无一级标题时按以下顺序取标题，取到即用（`-Title` 用于终端批量转换；末尾标题行与手动输入都只是可选兜底）：
+
+1. `-Title "文章标题"` 参数；
+2. 输入末尾的独立标题行（可选做法：会自动从末尾移到开头，标题不必带 `#`）；
+3. 剪贴板中的单行文本（双击流程的常规来源）；
+4. 兜底：在真实控制台里运行时提示手动输入（最多 5 次，直接回车取消）；四条都没有则报错退出。
+
+候选标题含换行或 `\ / : * ? " < > |` 等 Windows 文件名非法字符时会被跳过并说明原因，不会直接中断。
+
+可选做法：把未经 Markdown 格式化的标题粘贴为整篇输入的最后一个独立文本行，工具会把该行从末尾移走并用它做标题。不要把标题无分隔地直接拼在图源行之后，例如 `> 图源 | Unsplash文章标题`；这种文本没有可靠的标题边界，无法安全自动拆分。
+
+指定其他输入文件或输出目录：
 
 ```powershell
-.\assets\convert-wechat-article.ps1 -InputPath .\其他输入.md
-.\assets\convert-wechat-article.ps1 -InputPath .\其他输入.md -OutputDirectory .\converted
+.\assets\convert-wechat-article.cmd -InputPath .\其他输入.md
+.\assets\convert-wechat-article.cmd -InputPath .\其他输入.md -OutputDirectory .\converted
 ```
 
 工具执行以下规范化操作：
 
 - 从首个一级标题读取文章标题，并用完整标题作为 Markdown 文件名。
-- 输入没有一级标题时，依次尝试 `-Title`、文章末尾的独立标题行、剪贴板中的单行标题，并自动补齐一级标题。
+- 输入没有一级标题时，依次尝试 `-Title`、文章末尾的独立标题行、剪贴板中的单行标题、控制台手动输入，并自动补齐一级标题；含换行或 Windows 文件名非法字符的候选会被跳过并说明原因。
 - 如果封面图源信息之后还有一个独立的普通文本行，则把该行视为末尾标题；标题不需要带 `#`。
 - 把 `> 字数 字 | 标签` 转换为博客所用的居中蓝色加粗 HTML。
 - 把正文中两个以上连续空白行表示的场景分隔转换为 `<br />`。
@@ -205,13 +242,9 @@
 
 ## 微信公众号文章转换
 
-将微信公众号文本编辑器中的文章粘贴到 `assets/wechat-origin.md`，复制文章标题后，在仓库根目录运行：
-
-```powershell
-.\assets\convert-wechat-article.ps1
-```
+将微信公众号文本编辑器中的文章粘贴到 `assets/wechat-origin.md`，然后双击 `assets/convert-wechat-article.cmd`（或在仓库根目录运行 `.\assets\convert-wechat-article.cmd`）。复制过标题时脚本直接使用剪贴板标题，否则会提示输入标题。
 
-脚本会读取剪贴板标题，按博客格式转换文章，并输出到 `src/生活碎笔/文章与写作/`。详细格式与其他标题输入方式见 `assets/AGENTS.md`。
+脚本按博客格式转换文章，并输出到 `src/生活碎笔/文章与写作/`。详细格式与其他标题输入方式见 `assets/AGENTS.md`。
 
 CI 使用 `assets/generate-last-updated-md.sh` 生成最近更新页面，并使用无需第三方依赖的 `assets/generate-rss.py` 生成 RSS。
 

~~~~~

</details>

<a id="f-520419096-assets-convert-wechat-article-cmd-1876348669"></a>
#### assets/convert-wechat-article.cmd

<details>
<summary><code>+38 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/assets/convert-wechat-article.cmd b/assets/convert-wechat-article.cmd
new file mode 100644
index 000000000..159f7848f
--- /dev/null
+++ b/assets/convert-wechat-article.cmd
@@ -0,0 +1,38 @@
+@echo off
+rem ===========================================================================
+rem  Double-click launcher for convert-wechat-article.ps1
+rem
+rem  Why this file exists:
+rem    * This machine has no "Microsoft.PowerShellScript.1" registration, so
+rem      Explorer offers no "Run with PowerShell" entry for .ps1 files
+rem      (HKLM\SOFTWARE\Classes\.ps1 does not exist either).
+rem    * The .ps1 extension may be associated with Notepad, in which case a
+rem      double-click only opens the source instead of running it.
+rem    * A bare "& .\convert-wechat-article.ps1" call can be rejected by the
+rem      machine execution policy ("... is not digitally signed").
+rem
+rem  This launcher starts Windows PowerShell 5.1 with a process-scope Bypass
+rem  and forwards every argument. Whether the window stays open is decided by
+rem  the .ps1 itself (see Wait-BeforeExit there): a double-click keeps the
+rem  result readable, while a piped or automated run never blocks.
+rem
+rem  Keep this file ASCII-only: cmd.exe reads batch files with the OEM code
+rem  page, so non-ASCII text here turns into mojibake. The .ps1 owns all
+rem  Chinese output and stays UTF-8 with BOM.
+rem ===========================================================================
+setlocal
+
+set "SCRIPT=%~dp0convert-wechat-article.ps1"
+if not exist "%SCRIPT%" (
+    echo [ERROR] Missing: "%SCRIPT%"
+    pause
+    exit /b 1
+)
+
+set "PSEXE=%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe"
+if not exist "%PSEXE%" set "PSEXE=powershell.exe"
+
+"%PSEXE%" -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT%" %*
+set "RC=%ERRORLEVEL%"
+
+endlocal & exit /b %RC%

~~~~~

</details>

<a id="f-520419096-assets-convert-wechat-article-ps1-688062784"></a>
#### assets/convert-wechat-article.ps1

<details>
<summary><code>+135 / -36</code> Click to expand diff</summary>

~~~~~diff
diff --git a/assets/convert-wechat-article.ps1 b/assets/convert-wechat-article.ps1
index 6c4580ecf..201132dc7 100644
--- a/assets/convert-wechat-article.ps1
+++ b/assets/convert-wechat-article.ps1
@@ -7,32 +7,94 @@ param(
 
     [string]$Title,
 
-    [switch]$Force
+    [switch]$Force,
+
+    [switch]$NoPause
 )
 
 $ErrorActionPreference = "Stop"
 
-# "Run with PowerShell" starts the script from the assets directory (and closes
-# the transient console immediately). Keep all default paths rooted at the
-# repository, and leave Explorer-launched windows open so errors are visible.
+# A shell-launched script gets a console window of its own, and that window
+# closes the moment the script ends. Keep all default paths rooted at the
+# repository, and keep such a window open so the result stays readable.
 $projectRoot = Split-Path -Parent $PSScriptRoot
-$launchedFromExplorer = $false
-try {
-    $parentProcessId = (Get-CimInstance Win32_Process -Filter "ProcessId=$PID").ParentProcessId
-    $launchedFromExplorer = (Get-Process -Id $parentProcessId).ProcessName -eq 'explorer'
+
+function Test-ShellLaunched {
+    # Walk up the process tree: a double-click, "Open with" or "Run with
+    # PowerShell" launch ends at a shell host, an ordinary console run does not.
+    $shellHosts = @(
+        'explorer.exe'
+        'dllhost.exe'
+        'shellexperiencehost.exe'
+        'startmenuexperiencehost.exe'
+        'runtimebroker.exe'
+        'applicationframehost.exe'
+    )
+
+    $currentProcessId = $PID
+    for ($depth = 0; $depth -lt 6; $depth++) {
+        $process = Get-CimInstance Win32_Process -Filter "ProcessId=$currentProcessId" -ErrorAction SilentlyContinue
+        if (-not $process) { return $false }
+
+        $parentProcessId = [int]$process.ParentProcessId
+        if ($parentProcessId -le 0 -or $parentProcessId -eq $currentProcessId) { return $false }
+
+        $parent = Get-CimInstance Win32_Process -Filter "ProcessId=$parentProcessId" -ErrorAction SilentlyContinue
+        if (-not $parent) { return $false }
+
+        if ($shellHosts -contains $parent.Name.ToLowerInvariant()) { return $true }
+
+        $currentProcessId = $parentProcessId
+    }
+
+    return $false
 }
-catch {
+
+function Test-InteractiveConsole {
+    # A windowed console (double-click, "Run with PowerShell", a terminal tab)
+    # redirects neither stdin nor stdout; a piped run does.
+    if ($Host.Name -ne 'ConsoleHost') { return $false }
+    if ([Console]::IsInputRedirected) { return $false }
+    if ([Console]::IsOutputRedirected) { return $false }
+
+    return $true
 }
 
-function Wait-ForDirectLaunch {
-    if ($launchedFromExplorer) {
-        Read-Host '按 Enter 关闭此窗口' | Out-Null
+$shellLaunched = $false
+try { $shellLaunched = Test-ShellLaunched } catch { }
+
+# Pause rules, most explicit first:
+#   1. -NoPause              never pause;
+#   2. CONVERT_WECHAT_PAUSE  0 = never, 1 = always;
+#   3. redirected stdin      never pause, so a piped or agent-driven run cannot
+#      block on Read-Host even if the process tree ends at a shell host;
+#   4. shell launch, or an interactive console  pause, because a human is
+#      looking at this window (double-click, "Open with", terminal tab).
+$pauseBeforeExit = $false
+if (-not $NoPause) {
+    if ($env:CONVERT_WECHAT_PAUSE -eq '0') {
+        $pauseBeforeExit = $false
+    }
+    elseif ($env:CONVERT_WECHAT_PAUSE -eq '1') {
+        $pauseBeforeExit = $true
+    }
+    elseif ([Console]::IsInputRedirected) {
+        $pauseBeforeExit = $false
+    }
+    elseif ($shellLaunched -or (Test-InteractiveConsole)) {
+        $pauseBeforeExit = $true
     }
 }
 
+function Wait-BeforeExit {
+    if (-not $pauseBeforeExit) { return }
+
+    Read-Host '按 Enter 关闭此窗口' | Out-Null
+}
+
 trap {
     Write-Host "转换失败：$($_.Exception.Message)" -ForegroundColor Red
-    Wait-ForDirectLaunch
+    Wait-BeforeExit
     exit 1
 }
 
@@ -75,6 +137,64 @@ function Normalize-Body {
     return $normalized.Trim("`n")
 }
 
+function Test-UsableTitle {
+    param([Parameter(Mandatory = $true)][string]$Candidate)
+
+    if ([string]::IsNullOrWhiteSpace($Candidate)) { return $false }
+    if ($Candidate -match "`r|`n") { return $false }
+
+    foreach ($invalidCharacter in [System.IO.Path]::GetInvalidFileNameChars()) {
+        if ($Candidate.Contains([string]$invalidCharacter)) { return $false }
+    }
+
+    return $true
+}
+
+function Resolve-ArticleTitle {
+    param([string]$ExplicitTitle, [string]$TrailingTitle)
+
+    $candidates = @()
+    if (-not [string]::IsNullOrWhiteSpace($ExplicitTitle)) {
+        $candidates += [pscustomobject]@{ Source = '-Title 参数'; Value = $ExplicitTitle.Trim() }
+    }
+    if (-not [string]::IsNullOrWhiteSpace($TrailingTitle)) {
+        $candidates += [pscustomobject]@{ Source = '输入末尾的标题行'; Value = $TrailingTitle.Trim() }
+    }
+
+    try {
+        $clipboardText = ([string](Get-Clipboard -Raw -ErrorAction Stop)).Trim()
+        if (-not [string]::IsNullOrWhiteSpace($clipboardText)) {
+            $candidates += [pscustomobject]@{ Source = '剪贴板'; Value = $clipboardText }
+        }
+    }
+    catch {
+    }
+
+    # A stale clipboard (a copied path, a whole paragraph) must not abort the
+    # run: report why the candidate was skipped and keep looking.
+    foreach ($candidate in $candidates) {
+        if (Test-UsableTitle -Candidate $candidate.Value) { return $candidate.Value }
+
+        $preview = $candidate.Value -replace "`r?`n", ' / '
+        Write-Host "已忽略$($candidate.Source)中的标题（含换行或 Windows 文件名非法字符）：$preview" -ForegroundColor Yellow
+    }
+
+    if (Test-InteractiveConsole) {
+        Write-Host '输入里没有一级标题，剪贴板里也没有可用的单行标题。' -ForegroundColor Yellow
+        for ($attempt = 0; $attempt -lt 5; $attempt++) {
+            $answer = [string](Read-Host '请输入文章标题（直接回车取消）')
+            if ([string]::IsNullOrWhiteSpace($answer)) { break }
+
+            $answer = $answer.Trim()
+            if (Test-UsableTitle -Candidate $answer) { return $answer }
+
+            Write-Host '标题不能含换行，也不能含 \ / : * ? " < > | 等字符，请重试。' -ForegroundColor Yellow
+        }
+    }
+
+    throw '输入没有一级标题，且未能从 -Title、末尾标题行、剪贴板或手动输入得到可用标题。请复制标题后重试，或把标题粘成输入的最后一行，或使用 -Title "文章标题"。'
+}
+
 $inputFullPath = Resolve-ProjectPath -Path $InputPath
 if (-not (Test-Path -LiteralPath $inputFullPath -PathType Leaf)) {
     throw "Input file does not exist: $inputFullPath"
@@ -101,28 +221,7 @@ else {
         $content = $content.Substring(0, $trailingTitleMatch.Groups[2].Index).TrimEnd() + "`n"
     }
 
-    $title = ([string]$Title).Trim()
-
-    if ([string]::IsNullOrWhiteSpace($title) -and -not [string]::IsNullOrWhiteSpace($trailingTitle)) {
-        $title = $trailingTitle
-    }
-
-    if ([string]::IsNullOrWhiteSpace($title)) {
-        try {
-            $title = ([string](Get-Clipboard -Raw -ErrorAction Stop)).Trim()
-        }
-        catch {
-        throw "The input has no level-one title and the clipboard could not be read. Copy the title before running, paste it as the final standalone line, or pass -Title '文章标题'."
-        }
-    }
-
-    if ([string]::IsNullOrWhiteSpace($title)) {
-        throw "The input has no level-one title and the clipboard is empty. Copy the title before running, paste it as the final standalone line, or pass -Title '文章标题'."
-    }
-
-    if ($title -match "`r|`n") {
-        throw "The input has no level-one title, but the clipboard contains multiple lines. Copy only the article title, or pass -Title '文章标题'."
-    }
+    $title = Resolve-ArticleTitle -ExplicitTitle ([string]$Title) -TrailingTitle $trailingTitle
 
     # The rest of the converter can now use one canonical input shape.
     $content = "# $title`n`n" + $content.TrimStart("`n")
@@ -181,4 +280,4 @@ if ((Test-Path -LiteralPath $outputPath) -and -not $Force) {
 
 [System.IO.File]::WriteAllText($outputPath, $content, $utf8NoBom)
 Write-Output $outputPath
-Wait-ForDirectLaunch
+Wait-BeforeExit

~~~~~

</details>

<a id="f-520419096-assets-wechat-origin-md-2464248456"></a>
#### assets/wechat-origin.md

<details>
<summary><code>+37 / -113</code> Click to expand diff</summary>

~~~~~diff
diff --git a/assets/wechat-origin.md b/assets/wechat-origin.md
index 5d54d4d06..4fc005516 100644
--- a/assets/wechat-origin.md
+++ b/assets/wechat-origin.md
@@ -1,165 +1,89 @@
 ## 写在前面
 
-> 1632 字 | 思念 | 爱恋 | 经历 | 过往 | 认知 | 思考 | 喜欢 | 成长
+> 1174 字 | 农村 | 城市 | 思考 | 乡村 | 食物 | 生活 | 经历
 
 ## 正文
 
-　　时至今日，我仍然很难说出那位小姐的名字。
+　　不知为什么，现在每次回家，都让我想起之前的那一幕。
 
-　　然而，相比之前的畏缩与胆怯，我想，现在只是有些不太习惯。
+　　之前某一次，来家里所在地出差，晚上不住酒店，住家里。给父母也是临时说的，他们只回了一句：“好。”
 
-　　害怕的心情已经不太存在了。
+　　下班了。父亲来接。依旧是开了很久的小货车，上货架框一般得踩轮胎上去。
 
-　　我曾写过很多关于她的文章。或明，或暗。明的，直接将她的名字浸在一众人中。暗的更不必多说，也许随意的一篇文章，就处处透露她的气息。
+　　回到家时，母亲正在煮饭。
 
+　　她说了一句我到现在都还记得的话。
 
+　　“不知道你今天回来，白天都还在坡上种地呢，没买菜，”母亲一边淘米，用手把米拦住，把水倒掉，“回来也不知道吃啥，逼急了，才出去扯了一把猪草回来，打算炒了吃。”
 
-　　2026 年 8 月，飞往宁波。
+　　倒完淘米水，母亲转向我，眼角掩饰不住的笑意。
 
-　　出发之前，她的闺蜜星岚，已经提前打了预防针。她非常忙，极大概率见不到。我说，那就和你聊聊天也挺好。
+　　“从小到大没吃过猪草吧？应该还是第一次？”说完开始笑。
 
-　　事实证明，降低预期真的有效。
+　　“忘了，”我听完了哭笑不得，“猪草一般不是给猪吃的吗？”
 
-　　坐上车，星岚拿着手机聊天，得到回复后转过头跟我说，说她在陪弟弟玩，可能晚一点，有机会可以一起吃饭。
+　　“人也可以吃的，只是一般没人吃。”
 
-　　那一瞬间，我的大脑一片空白。
+　　这我还是第一次知道。
 
-　　前所未有的焦虑。
 
-　　少年的心绪那一刻达到了顶峰。
 
-　　那是我日夜思念的人。
+　　猪草。一般都用来煮猪食用。在我们这个川渝边陲，一般都是指红薯叶、红薯藤。也指一些乱七八糟的、我不认识的大叶子菜。产量大、又不好吃，所以喂猪。
 
-　　我曾无数次梦见过她，每次梦醒之后都很难过。我不清楚原因，但我大概能猜到。
+　　我原来曾写过一篇文章，说，虽然参加工作不久，但我似乎也被城市化裹挟了，变成一座城市里的幽灵，不再能在大自然面前抬起头来。
 
-　　我从来没有放过我自己，也没有放过她。
+　　那一瞬间，我想起了我亲手写下的这篇文章。
 
-　　我无数次地提醒自己：你喜欢的那个人，已经死在了时间里，现在的她不是你梦想中的她，只是时间残留下来的幻影。
+　　我本以为会很抗拒，毕竟原来是猪食原料。
 
-　　没有用。
+　　没有。意外地心平气和。
 
-　　听不进去。
+　　挑了一筷子，尝了一下，跟其他菜其实没什么两样。
 
-　　执拗。
 
-　　死撞南墙不回头。
 
-　　她几乎是我唯一一个心结。
+　　现在每次回家，我都会想起这一幕。
 
-　　我对自己承诺过，她的故事，将只有最重要的几个人知道。其余的人，我将保持缄默。
+　　想起母亲做饭，想起像是“不速之客”一般的我，想起不知道用什么炒菜的母亲，然后想起那盘猪草。
 
-　　而见到她之后，我却意外地平静。
+　　父母亲用了一辈子，想让我们脱离农村环境。
 
-　　这种感觉我有过——每次表演、大考、面试之前，我都会紧张得无以复加，但真正到了那个时刻，每每都是，内心无比平静。
+　　最终，父母也得偿所愿。至少现在是，我和兄长都有一份看起来还算体面的工作。
 
-　　事后回想，竟会哑然失笑：莫不成，她对我来说，已经成了一场大考了吗？
+　　但我总觉得，我没办法纯粹地做一个城市人。
 
+　　我在城市里还是想念农村。
 
+　　我在父亲的车上闻过难闻的家禽味，在祖母的红砖灶前闻过猪食特有的杂食味，也闻过母亲做生意时酥麻的生花椒香；吃过正宗的柴火里随手埋进去的烤红薯，那和城里卖的烤红薯有天壤之别；也独自放过牛；在回风炉上写作业，本子还差点被烧掉；土豆堆在堂屋里一年四季放到发芽也吃不完；夏天掰玉米、脱粒，总要和多到难以计数的蚊子，大战到天昏地暗。
 
-　　我曾因为她，跟我最好的朋友之一吵过架。
+　　当然不是想念农村的这种环境，那种东西谁也不会想再体验一次。
 
-　　灵见证过我的过往。那个时候，幼稚的少年一错再错，如同指尖的流沙，越用力紧握，流失得越多。但争吵，却不在那个时候，在前段时间。
+　　小时候我总以为，这样的环境对我来说是顶级折磨。
 
-　　灵的初心，是帮我“脱敏”——然而，我究竟还是太过敏感。
+　　我在想，如果让幼时的我体验过一次城市，大概就再难回到农村了吧。
 
-　　她们高中一个宿舍，于是灵在过年时带给我消息，说那位小姐今年打算讲男朋友带回家见家长。
+　　现在能心平气和地吃红薯叶，里面大概也多少藏了小时候的影子。农村里，家禽家畜，除了物种不同，并未比人低级多少，不少农村人就靠着这些过活，相依为命。
 
-　　那个时候，我竟会生气。
+　　我总以为，生命的韧性，只有同时看过阴沟与太阳才能得到体现。小时候的我，替我完成了前半部分。
 
-　　灵不仅带给我了关于她的最新消息，而且还说了一些话，让我觉得很受刺激。
+　　只是那个时候，他还不懂，顶级折磨的背后，是城市里难以拥有的珍贵。
 
-　　那应该是我第一次跟她严肃地发消息，说：“我生气了。”
 
-　　“那我不说了。”她回。
 
-　　此后，我们之间便再也没有说过任何关于那位小姐的事。
+　　无论见过多么肮脏与丑陋的环境，洗去浮尘，都有着难以想象的生命力和精神气。
 
-　　**像是伊甸园的苹果。**
-
-
-
-　　“感觉这次去宁波还是很有意义，”我发消息给灵，“有一种‘我知道了你很好，现在我也终于能往前走了’的感觉。”
-
-　　“不是我打击你，”她回了条消息，带了个狗头，“人家一直都很好。”
-
-　　末尾，还补了一句：“只是你一直沉浸在里面。”
-
-　　“是啊，”我想了想，“打击得挺好。”
-
-　　“别别别，心里别偷偷骂我就好了。”
-
-　　“以前有可能，现在真觉得你骂得对。”
-
-　　“你咋了？觉醒了？”
-
-　　我哭笑不得。
-
-
-
-　　在许久之前，我曾在日记里定义，说如果这次的宁波日本之旅，见不到那位小姐，那么整场旅行，无论怎样都是失败的。
-
-　　而在见到她之后，我却对宁波之旅下了一个核心的定义：失落。
-
-　　失落，是我见到她之后最深的感受。
-
-　　并非源于我们已经渐行渐远，这点我早有心理准备，而是，她似乎不再是我认为的那样了。
-
-　　她依然很好，就像灵所说，只是好像不再是我印象中的那种好了。
-
-　　我终于感受到了时间的威力。
-
-
-
-　　如果说，在异性感情上要选出两个最重要的人，那么，一个是佳芯小姐，另一个便是她了。
-
-　　佳芯小姐教会我“被喜欢”是什么样的感觉，而那位小姐则是教会我“喜欢”的感觉。
-
-　　世人疯狂痴迷于前者，而我在这股洪流中，却隐隐觉得后者更重要。
-
-　　撞没撞南墙，我不知道。
-
-　　我只知道，或许，我现在已经在开始回头了。
-
-
-
-　　**谢谢你，懿。**
-
-　　**谢谢你出现在我的生命里。**
-
-　　**你曾问我，我是不是喜欢你。**
-
-　　**大学期间，我曾胆怯地在文章里承认了，同时觉得被看穿心意是一件害羞且尴尬的事情。**
-
-　　**那么今天，我现在终于敢大大方方地承认了。**
-
-　　**我喜欢你。**
-
-　　**只是现在，我可能会做回自己，不再时常凝望着那个闪闪发光、高悬天空的你了。**
+　　城市很繁华，而我在城市里日益萧条。
 
 
 
 　　南国微雪 Miyuki
 
-　　2026 年 9 月 24 日
-
-## 引用及附注
-
-　　1.[《八字手链人物传记计划——懿》](https://mp.weixin.qq.com/s?__biz=Mzg5NTcwNjA4Nw==&mid=2247489052&idx=1&sn=0dba5269d357be86f275b6ea53cf69f4&scene=21#wechat_redirect)
-
-　　2.[《我的恋爱只能在梦里》](https://mp.weixin.qq.com/s?__biz=Mzg5NTcwNjA4Nw==&mid=2247489587&idx=1&sn=bda97aec1b5b103ee9b4a5db34217dd0&scene=21#wechat_redirect)
-
-　　3.[《篮球女孩》](https://mp.weixin.qq.com/s?__biz=Mzg5NTcwNjA4Nw==&mid=2247484221&idx=1&sn=7675abe83222b200b5308bb4e98223f6&scene=21#wechat_redirect)
-
-　　4.[《只是随手写下了想你》](https://mp.weixin.qq.com/s?__biz=Mzg5NTcwNjA4Nw==&mid=2247495054&idx=1&sn=cc196d7a85ee51ee5da39fdbe4dd1b76&scene=21#wechat_redirect)
+　　2026 年 10 月 6 日 回乡有感
 
 ## 封面图
 
-![img](https://mmbiz.qpic.cn/mmbiz_png/hcnZjo7bq6PSxgJHbkEq3KUE7XxgbZxKhU5GJBDsDud8DbVIqLfDcibSZrawzItMDrZmmhVicdedBNCcGSUia9eSaz4g1zQcAgLmOibKKcbwkLM/640?wx_fmt=png&from=appmsg)
-
-　　图为宁波鄞州区环球银泰城会见懿及星岚时所摄。
-
-　　从左至右依次为：星岚的表弟，星岚，懿的弟弟，懿，懿的男友。
+![img](https://mmbiz.qpic.cn/sz_mmbiz_jpg/hcnZjo7bq6NablyJ8BJWUWOGXfliahfSTdNg2OxW3X2eAQCQP9ACR6icPFT2RoT5cWrOqrAsHm9bAYBdKt6iaicSVrYVRYfUicng0O6ZfjWTWXTs/640?wx_fmt=jpeg&from=appmsg)
 
-> 摄影师・画师 | 南国微雪
+> 摄影师・画师 | peng wang
 >
-> 图源 | 生活
\ No newline at end of file
+> 图源 | Unsplash
\ No newline at end of file

~~~~~

</details>

<a id="f-520419096-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+1 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index aa0d3d055..8bb8c201d 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -12,6 +12,7 @@
 -----
 
 - [⭐️文章与写作 | Literature](生活碎笔/文章与写作/文章.md)
+  - [猪草](生活碎笔/文章与写作/猪草.md)
   - [那位小姐](生活碎笔/文章与写作/那位小姐.md)
   - [进步空间](生活碎笔/文章与写作/进步空间.md)
   - [不是所有的事情，都必须做到最好](生活碎笔/文章与写作/不是所有的事情，都必须做到最好.md)

~~~~~

</details>

<a id="f-520419096-src-学习与进步-计算机科学极简入门指南-agents-md-3318719775"></a>
#### src/学习与进步/计算机科学极简入门指南/AGENTS.md

<details>
<summary><code>+88 / -4</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\350\256\241\347\256\227\346\234\272\347\247\221\345\255\246\346\236\201\347\256\200\345\205\245\351\227\250\346\214\207\345\215\227/AGENTS.md" "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\350\256\241\347\256\227\346\234\272\347\247\221\345\255\246\346\236\201\347\256\200\345\205\245\351\227\250\346\214\207\345\215\227/AGENTS.md"
index e820ea56b..463630396 100644
--- "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\350\256\241\347\256\227\346\234\272\347\247\221\345\255\246\346\236\201\347\256\200\345\205\245\351\227\250\346\214\207\345\215\227/AGENTS.md"
+++ "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\350\256\241\347\256\227\346\234\272\347\247\221\345\255\246\346\236\201\347\256\200\345\205\245\351\227\250\346\214\207\345\215\227/AGENTS.md"
@@ -71,7 +71,91 @@
 - 不引入超出当前进度的知识；若必须提前提及，注明“后面会讲”。
 - 思考题要能运用本章知识，并尽量把前面几章串起来，不要考死记硬背。
 
-## 六、文件与构建
+## 六、去 AIGC 味（硬性，写完必查）
+
+早期章节由 AI 起草，最常见的毛病不是术语写错，而是三样：一句话里并排放两条线、用套话充当推进、读完记不住这一章在讲什么。以下五条针对这三样。它们与《学海计划》的规范同源，已按本系列的文体改写：本系列允许代码块、图示与小节标题，其余照旧。
+
+### 1. 推进方式：一条线走到底（硬性）
+
+人读东西时，脑子里只跑得动一条线。技术讲解更该如此——造零件本来就是一步接一步的过程，中途岔开，读者就接不回原来的线了。
+
+1. **一段话只走一条线。** 先把一个点讲透，再转下一个，不要在同一段里来回横跳。
+2. **要对比，也顺着走。** 先讲 A，A 讲完再讲 B。不要写“既是 A 又是 B”“不仅……而且……”这种两头都够、两头都不到的句子；顺序推进（先……再……）和因果推进（所以……因为……）更像人说话。
+3. **中途别插不重要的话。** 真要插（补一个数据、补一个反例），插完**在原处接回去**。本章允许的中断只有两种：括号旁注，和新开的小节。
+4. **同时给两条路，要有明确理由。** 确认读者确实站在岔路口（两种实现各有取舍、需要他自己选），才并排给出；否则一次只讲一条。
+
+**自检**：把正文画成一条箭头链（A→B→C→D），而不是一棵树。某段同时抛出两个以上并列说法，或连续几段各抛几个，就是广度搜索，得改成一条线走到底。
+
+**例**（同一条信息，两种走法）：
+
+- 广度：“进程看到的地址并不是物理地址，而是一张操作系统发下来的映射表。”读者一次要接两件事：不是物理地址、是映射表。
+- 深度：“进程看到的地址，是操作系统发下来的一张映射表。表后面才对应真正的物理内存。”先把“映射表”这条走完，再转到它对应什么。
+
+### 2. AI 腔硬性禁表（绝对不得出现）
+
+以下表达任何情况下都不许写进正文、小标题、`## TL;DR` 与 `## 小结`；写完先搜一遍，命中就改。
+
+**一、特定短语**
+
+- “不是 X，是 Y”“不是 X，而是 Y”
+- 堆砌形容词，如“用最直白、最不绕弯子的方式讲清楚”
+- 对话式讨好话术：“你太懂了”“稳稳接住你”
+
+**二、承诺式与宣言式套话**
+
+- “我不是要……而是要……”“不是为了……而是基于……”“不是简单的……而是深刻的……”
+- “我这就用最 XX 的方式给你解释／说明／拆解”
+- “保证你一听就懂”“一听就懂”“最直白”“最不绕弯子”“掰开了揉碎了”
+- “深度拆解”“底层逻辑”（本系列里“底层”是技术词，“底层的门电路”“底层实现”照写；禁的是拿它当修辞，如“搞懂底层逻辑，就掌握了整个计算机”）
+- “通往……的黄金钥匙”
+- “这不仅仅……更……”
+
+**三、悬空修辞与通货膨胀的比喻**
+
+- “达摩克利斯之剑”“历史的十字路口”“人性贪婪的深渊凝视”
+- “一场……的博弈”“一次对……的凝视”
+- 用“危言耸听”这类贩卖焦虑的大词给段落开场
+
+**四、强迫式干货感连词堆叠**
+
+- “今天我必须要把这个事情给大家说清楚”
+- “我们把这个概念……”
+- “知道了……就拥有了……”
+
+**“不是 X，而是 Y”怎么改**：它被硬禁，但句子里承载的信息不能丢（可能是在纠正一个真实误解，也可能两半都有实义）。改法是把话说直：
+
+- 说“错误发生在保存阶段”，不要写“不在读取阶段，而在保存阶段”。
+- 说“虚拟地址要先经 MMU 翻译”，不要写“不是直接访问物理内存，而是先翻译虚拟地址”。
+- 确实需要对比时，把否定半句挪到后面、单独成句：“重点在保存阶段。读取阶段没有出错。”
+
+**登记**：正文里出现禁表之外的 AI 腔（例如“值得注意的是”“不难发现”“这意味着”在同一篇里反复出现），在提交信息里记一行，不要写进正文；这类句式同一篇里出现一次就够。
+
+### 3. 结构清晰（硬性）
+
+`## TL;DR` 和 `## 小结` 是结论清单，不等于正文结构清晰——读者在**读正文的过程中**就要能看出这一章分几步、每步在做什么。三条要求：
+
+1. **开篇让读者知道这一章要造什么、往下分几步。** 可以是路线图（“往下分三步：先……再……最后……”），也可以由上一章留下的问题直接带出。别让读者读到中段才知道在干什么。
+2. **每一步的开始要能看出来。** 用 `###` 小标题、加粗领起句、序号都可以；一层讲完再开下一层，同一层的意思不要散在章里反复出现（前面说过、中间又说、小结再说一遍，就是串场）。
+3. **章末要能一句话说清结论。** 读者读完能回答“所以呢”。
+
+**要避免的两件事**：一是每章套同一个骨架（这章用路线图，下一章就换序号或提问切入，别一个模子刻到底）；二是用手段掩盖空结构——加了小标题却没有对应的内容层次，路线图承诺三步、正文只有两步，比不加更糟。
+
+**自检**：通读一遍，回答——这章分几步？每步在讲什么？结论是什么？答得出来才算过。
+
+### 4. 多样性与节奏（软性）
+
+- **长短句交错。** 连续三句都超过四十字就要拆；反过来，连着五六个短句也会读得发飘。
+- **句式换着来。** “不是……而是……”“值得注意的是”“不难发现”“这意味着”这类句式，同一篇里出现一次就够；同一段里连着两句用同一句式，改掉一句。
+- **用词别回环。** 同一个意思别反复用同一个词，同一个连接词别承包全章。
+- **推进方式也要多样。** 例子、数字、反例、边界、换个角度复述，轮着来；不要每段都是“提出判断—补一个限定”。
+
+**一句话判据**：出声念一遍，念到一半要停下来回一口气，或者得回头重排一遍句子，这句就太长了。默读会自动替你把句子补顺，问题就漏掉了。
+
+### 5. 收尾不升华、不喊口号
+
+章末可以预告下一章，但不要打鸡血、不要替读者激动、不要做道德审判。工程上的取舍就把取舍摆出来；结论留边界（“视具体实现而定”“这一层还有代价”），不要写成口号。
+
+## 七、文件与构建
 
 - 章节文件名格式：`第X章：标题.md`（冒号为全角）。
 - **文件名不得包含 ASCII 空格**（会导致 mdBook 解析 `src/SUMMARY.md` 失败）。确需空格时，在 `src/SUMMARY.md` 中把空格写成 `%20`。
@@ -79,11 +163,11 @@
 - 提交前在仓库根目录执行 `mdbook build`，确认构建通过。
 - 改动范围限定在《计算机科学极简入门指南》目录内，不要修改其它分册与无关文章。
 
-## 七、提交
+## 八、提交
 
 - 提交信息用中文：首行简短概括，正文分点说明“改了什么、为什么”。
 
-## 八、风格示例
+## 九、风格示例
 
 以下段落的语气、句式与标点，即为本系列应当追求的效果（摘自早期章节）：
 
@@ -91,4 +175,4 @@
 >
 > 　　现在问题来到：**负数在计算机中该怎么表示**？
 
-写完后，请对照本文件逐项检查：结构是否齐全、**复习每条是否为 `主题：要点` 形式（主题后有全角冒号）且恰好对应紧邻的前三章（滑动窗口，顺序为 N-3、N-2、N-1）**、引号是否成对、是否出现章号或 HTML 标签、术语是否先解释后命名。
+写完后，请对照本文件逐项检查：结构是否齐全、**复习每条是否为 `主题：要点` 形式（主题后有全角冒号）且恰好对应紧邻的前三章（滑动窗口，顺序为 N-3、N-2、N-1）**、引号是否成对、是否出现章号或 HTML 标签、术语是否先解释后命名；再按第六节过一遍：正文是不是一条箭头链、有没有命中 AI 腔禁表、能不能说出这一章分几步。

~~~~~

</details>

<a id="f-520419096-src-学习与进步-计算机科学极简入门指南-计算机组成原理-第二十章-触发器-md-145588725"></a>
#### src/学习与进步/计算机科学极简入门指南/计算机组成原理/第二十章：触发器.md

<details>
<summary><code>+26 / -34</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\350\256\241\347\256\227\346\234\272\347\247\221\345\255\246\346\236\201\347\256\200\345\205\245\351\227\250\346\214\207\345\215\227/\350\256\241\347\256\227\346\234\272\347\273\204\346\210\220\345\216\237\347\220\206/\347\254\254\344\272\214\345\215\201\347\253\240\357\274\232\350\247\246\345\217\221\345\231\250.md" "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\350\256\241\347\256\227\346\234\272\347\247\221\345\255\246\346\236\201\347\256\200\345\205\245\351\227\250\346\214\207\345\215\227/\350\256\241\347\256\227\346\234\272\347\273\204\346\210\220\345\216\237\347\220\206/\347\254\254\344\272\214\345\215\201\347\253\240\357\274\232\350\247\246\345\217\221\345\231\250.md"
index e3d487999..c21abf7a7 100644
--- "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\350\256\241\347\256\227\346\234\272\347\247\221\345\255\246\346\236\201\347\256\200\345\205\245\351\227\250\346\214\207\345\215\227/\350\256\241\347\256\227\346\234\272\347\273\204\346\210\220\345\216\237\347\220\206/\347\254\254\344\272\214\345\215\201\347\253\240\357\274\232\350\247\246\345\217\221\345\231\250.md"
+++ "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\350\256\241\347\256\227\346\234\272\347\247\221\345\255\246\346\236\201\347\256\200\345\205\245\351\227\250\346\214\207\345\215\227/\350\256\241\347\256\227\346\234\272\347\273\204\346\210\220\345\216\237\347\220\206/\347\254\254\344\272\214\345\215\201\347\253\240\357\274\232\350\247\246\345\217\221\345\231\250.md"
@@ -11,36 +11,32 @@
 - 触发器是一种“只在时钟边沿更新”的一位记忆单元
 - 它由两级锁存器（主从结构）串联而成，两级用相反相位的时钟控制
 - 边沿之间，D 怎么变，Q 都不动；只有边沿那一刻才把 D 搬进 Q
-- 触发器让同步电路“一拍一个动作”成为可能，是寄存器与 CPU 的基础
+- 触发器让同步电路“一拍一个动作”成为可能，也是后面寄存器的基本积木
 
 ## 正文
 
-　　上一章我们拿到了时钟，更早已经造出了锁存器。可真把两者配到一起，会发现一个尴尬：**锁存器“开门”的是一整段时间，而时钟的边沿只是一个瞬间。** 两者根本对不上。
+　　我们之前造出了锁存器，上一章拿到了时钟。可真把两者配到一起，会发现一个尴尬： **锁存器“开门”的是一整段时间，而时钟的边沿只是一个瞬间。** 两者根本对不上。
 
-　　锁存器在使能为 1 的整段时间里都是透明的——D 一变，Q 就跟着变。时钟明明给了我们“大家统一交接”的时刻，锁存器却根本不听“时刻”，它只听“电平”。所以我们缺的，是一个全新的记忆单元：**平时关着门，只在时钟边沿那一瞬间开门，把门口的 D 拉进来，然后立刻关上。**
+　　锁存器在使能为 1（也就是开关为开）的整段时间里都是透明的——D 一变，Q 就跟着变。时钟明明给了“大家统一交接”的时刻，锁存器却根本不听“时刻”，它只听“电平”。所以我们缺的，是一个全新的记忆单元： **平时关着门，只在时钟边沿那一瞬间开门，把门口的 D 拉进来，然后立刻关上。**
 
-　　这个部件，就是**触发器**（flip-flop）。
+　　这个部件，就是 **触发器**（flip-flop）。
 
 ### 为什么不能直接拿锁存器顶替
 
-　　先看一把锁存器的脾气：
+　　先看锁存器的行为：
 
 - `E = 1`：透明，Q 跟随 D
 - `E = 0`：保持，Q 不动
 
-　　那么，直接把时钟接到 `E` 上会怎样？`CLK = 1` 的半个周期里，锁存器一直透明，D 在这段时间里的任何变化都会一路传到 Q。**我们想躲开的“整段时间都开放”，原封不动地又回来了。**
+　　那么，直接把时钟接到 `E` 上会怎样？`CLK = 1` 的半个周期里，锁存器一直透明，D 在这段时间里的任何变化都会一路传到 Q。我们想躲开的“整段时间都开放”，原封不动地又回来了。
 
-　　问题的根子在于：锁存器是**电平敏感**的——它看的是“使能是高还是低”；而我们想要的是**边沿敏感**——只看“时钟有没有跳变”这一瞬间。电平敏感和边沿敏感，是两种截然不同的脾气，**单靠一个锁存器，改不出来。**
-
- **思考题 1** 
-
-> 　　如果只是把时钟接到 D 锁存器的使能端，能得到“只在边沿更新”的效果吗？为什么？
+　　问题在于：锁存器是 **电平敏感** 的——它看的是“使能是高还是低”；而我们想要的是 **边沿敏感**：只看“时钟有没有跳变”这一瞬间。电平敏感和边沿敏感，截然不同。单靠一个锁存器，改不出来。
 
 ### 一个锁存器做不到，那就用两个
 
-　　回头想想：锁存器之所以“透明”，是因为在使能期间，它一直把输入放行到输出。那么换一个思路——**在它放行的时候，把后面死死挡住；等它挡住的时候，再把后面放开。** 从外面看，是不是就只剩下“交接的那一瞬间”了？
+　　回头想想：锁存器之所以“透明”，是因为在使能期间，它一直把输入放行到输出。那么换一个思路—— **在它放行的时候，把后面死死挡住；等它挡住的时候，再把后面放开。** 从外面看，是不是就只剩下“交接的那一瞬间”了？
 
-　　为了做到“轮流开合”，我们把**两个锁存器一前一后串起来**，并用**相反相位的时钟**分别控制它们：
+　　为了做到“轮流开合”，我们把两个锁存器一前一后串起来，并用 **相反相位的时钟** 分别控制它们：
 
 ```text
 D ──> [ 主锁存器 ] ──> [ 从锁存器 ] ──> Q
@@ -50,7 +46,7 @@ D ──> [ 主锁存器 ] ──> [ 从锁存器 ] ──> Q
 - **主锁存器**：时钟为 0 时透明（跟随 D），为 1 时保持
 - **从锁存器**：时钟为 1 时透明，为 0 时保持
 
-　　注意两者的使能正好相反：**一个开门时，另一个必定关门。** 这样串起来的两级，整体上就不再是“电平敏感”的了。
+　　注意两者的使能正好相反： **一个开门时，另一个必定关门。** 这样串起来的两级，整体上就不再是“电平敏感”的了。
 
 ### 跟着时钟走一遍
 
@@ -59,17 +55,17 @@ D ──> [ 主锁存器 ] ──> [ 从锁存器 ] ──> Q
 | 阶段 | 主锁存器 | 从锁存器 | 结果 |
 | :--- | :--- | :--- | :--- |
 | `CLK = 0` | 透明（悄悄跟随 D） | 保持 | Q 不动 |
-| `CLK` 上升沿 | 转为保持 | 转为透明 | 主把边沿前的 D 冻结下来交给从，**Q 更新** |
+| `CLK` 上升沿 | 转为保持 | 转为透明 | 主把边沿前的 D 冻结下来交给从， **Q 更新** |
 | `CLK = 1` | 保持 | 透明 | Q 保持，主不再看 D |
 | `CLK` 下降沿 | 转为透明 | 转为保持 | Q 冻结，主重新开始跟随 D |
 
-　　看第一行：`CLK = 0` 时，从锁存器关着门，所以 Q 不动；与此同时，主锁存器正偷偷跟着 D。到了**上升沿**，主锁存器“啪”地一下闭上——它把刚刚（边沿前一刻）D 的值锁住，而从锁存器这时打开，把这个值送到 Q。**于是 Q 只在上升沿更新，且更新的正是边沿前站稳的那个 D。**
+　　看第一行：`CLK = 0` 时，从锁存器关着门，所以 Q 不动；与此同时，主锁存器正偷偷跟着 D。到了 **上升沿**，主锁存器“啪”地一下闭上——它把刚刚（边沿前一刻）D 的值锁住，而从锁存器这时打开，把这个值送到 Q。 **于是 Q 只在上升沿更新，且更新的正是边沿前站稳的那个 D。**
 
-　　这正好接上上一章的结论：**D 必须在边沿前稳定一小段时间（建立时间），再在边沿后稳定一小段时间（保持时间）。** 主锁存器锁住的，就是这个早已站稳的 D；如果 D 恰好在边沿附近跳变，主锁存器锁到的就是“没站稳”的值，结果便不可靠。
+　　这正好应证上一章的结论： **D 必须在边沿前稳定一小段时间（建立时间），再在边沿后稳定一小段时间（保持时间）。** 主锁存器锁住的，就是这个早已站稳的 D；如果 D 恰好在边沿附近跳变，主锁存器锁到的就是“没站稳”的值，结果便不可靠。
 
-　　一句话概括：**主锁存器负责在边沿“拍照”，从锁存器负责把这张照片一直举在 Q 上。** 这里并没有发明新的记忆原理，反馈依旧负责“记住”；两级反相开合，只是把“开门的时间”从一整段，收窄成了一个点。
+　　**主锁存器负责在边沿“拍照”，从锁存器负责把这张照片一直举在 Q 上。** 两级反相开合，把“开门的时间”从一整段，收窄成了一个点。
 
- **思考题 2** 
+ **思考题 1** 
 
 > 　　主从结构里，两级锁存器为什么要用相反相位的时钟？如果两级用同一个时钟，会怎样？
 
@@ -92,34 +88,32 @@ D ──> [ 主锁存器 ] ──> [ 从锁存器 ] ──> Q
 | 第 2 次 | 1 | 1 |
 | 第 3 次 | 0 | 0 |
 
-　　第 1 次与第 2 次之间，D 即使来回变化，Q 也一直稳稳停在 1。**这正是触发器与锁存器最本质的差别。**
+　　第 1 次与第 2 次之间，D 即使来回变化，Q 也一直稳稳停在 1。这就是触发器与锁存器的差别所在。
 
 ### 为什么非要边沿敏感
 
-　　到这一步，值得停下来想一想：多花一级锁存器，换来“不透明”，到底值不值？
+　　多花一级锁存器，只为换来“不透明”，到底值不值？
 
-　　设想我们要做多步计算。如果用的是锁存器：在一个周期内，信号可能从第一级穿透到第二级、第三级……**半拍之间，一个结果还没定，后面已经被它带着变了**，我们根本说不清“这一拍算出来的到底是什么”。这叫穿透（race-through），是同步电路的大忌。
+　　设想我们要做多步计算。如果用的是锁存器：在它敞着门的那半拍里，信号可能从第一级穿透到第二级、第三级…… **一个结果还没定，后面已经被它带着变了**，我们根本说不清“这一拍算出来的到底是什么”。这叫穿透（race-through），同步电路的噩梦。
 
 　　换成触发器，一切就清楚了：
 
 - **周期内**：组合逻辑慢慢算，触发器一律关着门，谁也不许动
 - **边沿一到**：所有触发器同时开门，把各自算好的结果一起收下，然后立刻关门
 
-　　**“算”发生在周期里，“交”发生在边沿上。** 时间被整齐地切成一拍一拍，每一步都踩在点子上，这正是时钟想要的效果。而触发器，就是把时钟的意图真正落实下去的那个部件。**没有触发器，时钟只是一个滴答作响的节拍器，指挥不动任何人。**
+　　**“算”发生在周期里，“交”发生在边沿上。** 时间被整齐地切成一拍一拍，每一步都踩在点子上，这正是时钟想要的效果；把它落到电路上的，就是触发器。
 
-　　换个角度看，触发器其实做了一件很了不起的事：**它把“连续流逝的时间”，变成了“离散的步骤”。** 有了它，机器才能说“第一拍做这个、第二拍做那个”。
-
- **思考题 3** 
+ **思考题 2** 
 
-> 　　为什么边沿触发比“整段时间都开放”的锁存方式更容易组织多步计算？
+> 　　把时钟直接接到 D 锁存器的使能端，能得到“只在边沿更新”的效果吗？这样的锁存器拿去做多步计算，又会出什么问题？
 
 ### 触发器不止一种
 
-　　按功能分，触发器还有 JK、T、SR 等多种；但它们的共同点，都是“在边沿更新”。其中 **D 触发器**只需要一根数据线，用起来最省事，也最常用。本指南之后提到的触发器，一律默认为 D 触发器。
+　　按功能分，触发器还有 JK、T、SR 等几种类型，区别只在输入端的信号各不相同。它们的共同点都是“在边沿更新”。其中 **D 触发器** 只需要一根数据线，用起来最省事，也最常用。本指南之后提到的触发器，一律默认为 D 触发器。
 
 ### 一只触发器，一个比特
 
-　　触发器只记一个比特。这听起来很少，但已经足够当积木了：**要保存一个 8 位数，把 8 只触发器并排放好、共用一个时钟就行。** 这，正是下一章要做的事。
+　　触发器只记一个比特。这听起来很少，但已经足够当积木了： **要保存一个 8 位数，把 8 只触发器并排放好、共用一个时钟就行。**
 
 ## 小结
 
@@ -139,15 +133,13 @@ D ──> [ 主锁存器 ] ──> [ 从锁存器 ] ──> Q
 
 #### 思考题 1
 
-　　不能。锁存器是电平敏感的：把时钟接到使能端后，`CLK = 1` 的整个半周期它都透明，D 的变化照样传到 Q，“边沿那一刻”对它没有意义。要得到边沿敏感，必须在结构上改变（例如下一节的主从两级）。
+　　如果两级用同一个时钟，它们会同时透明或同时保持：同时透明时，D 直接穿透两级到达 Q，等于一个“加长的锁存器”，边沿敏感无从谈起；同时保持时，值又传不下去。只有让两级反相，才能做到“一级开门时另一级关门”，把交接压缩到边沿那么短。
 
 #### 思考题 2
 
-　　如果两级用同一个时钟，它们会同时透明或同时保持：同时透明时，D 直接穿透两级到达 Q，等于一个“加长的锁存器”，边沿敏感无从谈起；同时保持时，值又传不下去。只有让两级反相，才能做到“一级开门时另一级关门”，把交接压缩到边沿那么短。
-
-#### 思考题 3
+　　不能。锁存器是电平敏感的：把时钟接到使能端后，`CLK = 1` 的整个半周期它都透明，D 的变化照样传到 Q，“边沿那一刻”对它没有意义。要得到边沿敏感，必须在结构上改变，这就是前面用两级锁存器拼出主从结构的理由。
 
-　　因为多步计算要求“这一步的结果定下来之后，才进行下一步”。边沿触发把每一拍的交接固定在同一个时刻，级与级之间不会在同一拍里互相穿透，先后关系明确；锁存器则可能在半拍内把变化一级级传下去，几步计算搅在一起，无法可靠地分步。
+　　多步计算的前提是“这一步的结果定下来之后，才进行下一步”。锁存器满足不了这个前提：它可能在半拍内把变化一级级传下去，几步计算搅在一起，说不清这一拍的结果到底是什么。触发器把每一拍的交接固定在同一个时刻，级与级之间不会在同一拍里互相穿透，先后关系才明确。
 
 ## 协议
 

~~~~~

</details>

<a id="f-520419096-src-生活碎笔-文章与写作-猪草-md-1693121996"></a>
#### src/生活碎笔/文章与写作/猪草.md

<details>
<summary><code>+91 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\346\226\207\347\253\240\344\270\216\345\206\231\344\275\234/\347\214\252\350\215\211.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\346\226\207\347\253\240\344\270\216\345\206\231\344\275\234/\347\214\252\350\215\211.md"
new file mode 100644
index 000000000..6b797c19f
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\346\226\207\347\253\240\344\270\216\345\206\231\344\275\234/\347\214\252\350\215\211.md"
@@ -0,0 +1,91 @@
+# 猪草
+
+## 写在前面
+
+<p style="color:#0f4c81; text-align:center; font-weight:bold; font-size:larger;">1174 字 | 农村 | 城市 | 思考 | 乡村 | 食物 | 生活 | 经历</p>
+
+## 正文
+
+　　不知为什么，现在每次回家，都让我想起之前的那一幕。
+
+　　之前某一次，来家里所在地出差，晚上不住酒店，住家里。给父母也是临时说的，他们只回了一句：“好。”
+
+　　下班了。父亲来接。依旧是开了很久的小货车，上货架框一般得踩轮胎上去。
+
+　　回到家时，母亲正在煮饭。
+
+　　她说了一句我到现在都还记得的话。
+
+　　“不知道你今天回来，白天都还在坡上种地呢，没买菜，”母亲一边淘米，用手把米拦住，把水倒掉，“回来也不知道吃啥，逼急了，才出去扯了一把猪草回来，打算炒了吃。”
+
+　　倒完淘米水，母亲转向我，眼角掩饰不住的笑意。
+
+　　“从小到大没吃过猪草吧？应该还是第一次？”说完开始笑。
+
+　　“忘了，”我听完了哭笑不得，“猪草一般不是给猪吃的吗？”
+
+　　“人也可以吃的，只是一般没人吃。”
+
+　　这我还是第一次知道。
+
+<br />
+
+　　猪草。一般都用来煮猪食用。在我们这个川渝边陲，一般都是指红薯叶、红薯藤。也指一些乱七八糟的、我不认识的大叶子菜。产量大、又不好吃，所以喂猪。
+
+　　我原来曾写过一篇文章，说，虽然参加工作不久，但我似乎也被城市化裹挟了，变成一座城市里的幽灵，不再能在大自然面前抬起头来。
+
+　　那一瞬间，我想起了我亲手写下的这篇文章。
+
+　　我本以为会很抗拒，毕竟原来是猪食原料。
+
+　　没有。意外地心平气和。
+
+　　挑了一筷子，尝了一下，跟其他菜其实没什么两样。
+
+<br />
+
+　　现在每次回家，我都会想起这一幕。
+
+　　想起母亲做饭，想起像是“不速之客”一般的我，想起不知道用什么炒菜的母亲，然后想起那盘猪草。
+
+　　父母亲用了一辈子，想让我们脱离农村环境。
+
+　　最终，父母也得偿所愿。至少现在是，我和兄长都有一份看起来还算体面的工作。
+
+　　但我总觉得，我没办法纯粹地做一个城市人。
+
+　　我在城市里还是想念农村。
+
+　　我在父亲的车上闻过难闻的家禽味，在祖母的红砖灶前闻过猪食特有的杂食味，也闻过母亲做生意时酥麻的生花椒香；吃过正宗的柴火里随手埋进去的烤红薯，那和城里卖的烤红薯有天壤之别；也独自放过牛；在回风炉上写作业，本子还差点被烧掉；土豆堆在堂屋里一年四季放到发芽也吃不完；夏天掰玉米、脱粒，总要和多到难以计数的蚊子，大战到天昏地暗。
+
+　　当然不是想念农村的这种环境，那种东西谁也不会想再体验一次。
+
+　　小时候我总以为，这样的环境对我来说是顶级折磨。
+
+　　我在想，如果让幼时的我体验过一次城市，大概就再难回到农村了吧。
+
+　　现在能心平气和地吃红薯叶，里面大概也多少藏了小时候的影子。农村里，家禽家畜，除了物种不同，并未比人低级多少，不少农村人就靠着这些过活，相依为命。
+
+　　我总以为，生命的韧性，只有同时看过阴沟与太阳才能得到体现。小时候的我，替我完成了前半部分。
+
+　　只是那个时候，他还不懂，顶级折磨的背后，是城市里难以拥有的珍贵。
+
+<br />
+
+　　无论见过多么肮脏与丑陋的环境，洗去浮尘，都有着难以想象的生命力和精神气。
+
+　　城市很繁华，而我在城市里日益萧条。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2026 年 10 月 6 日 回乡有感
+
+## 封面图
+
+![](https://img.tinysnow.cn/blog/articles/literature/peng-wang-Zl3DeWyrkmU-unsplash.jpg)
+
+> 摄影师・画师 | peng wang
+>
+> 图源 | Unsplash

~~~~~

</details>

<a id="f-520419096-src-生活碎笔-随笔随记-实用类随记-aigc人工校对-复盘的时候-别假装自己当时就知道结局-md-2990626526"></a>
#### src/生活碎笔/随笔随记/实用类随记/【AIGC人工校对】复盘的时候，别假装自己当时就知道结局.md

<details>
<summary><code>+67 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\345\244\215\347\233\230\347\232\204\346\227\266\345\200\231\357\274\214\345\210\253\345\201\207\350\243\205\350\207\252\345\267\261\345\275\223\346\227\266\345\260\261\347\237\245\351\201\223\347\273\223\345\261\200.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\345\244\215\347\233\230\347\232\204\346\227\266\345\200\231\357\274\214\345\210\253\345\201\207\350\243\205\350\207\252\345\267\261\345\275\223\346\227\266\345\260\261\347\237\245\351\201\223\347\273\223\345\261\200.md"
new file mode 100644
index 000000000..81ea20d54
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\345\244\215\347\233\230\347\232\204\346\227\266\345\200\231\357\274\214\345\210\253\345\201\207\350\243\205\350\207\252\345\267\261\345\275\223\346\227\266\345\260\261\347\237\245\351\201\223\347\273\223\345\261\200.md"
@@ -0,0 +1,67 @@
+# 复盘的时候，别假装自己当时就知道结局
+
+<!-- daily-essay-id: 2026-10-10 -->
+
+<!-- wechat-digest: 复盘要回到做决定时掌握的信息，分清能改进的疏漏和无法提前知道的结果，才能留下下次用得上的办法，而不只是多一个责怪自己的理由。 -->
+
+　　事情搞砸之后，最没用的一句话，可能就是“早知道就不这样了”。
+
+　　知道下雨就不出门，知道对方会爽约就不等，知道最后用不上就不买。听起来没任何问题。可要是把结局提前告诉你，那还用得着做决定吗？照着答案抄就行了。
+
+　　复盘真正难的地方， **是结果已经摆在眼前，你还能不能记得，当时并不知道这么多** 。
+
+　　假设几个朋友约好周末去郊外走走。出发前看过天气，问过大家的时间，也查过路况，得到的信息都没有显示当天不适合出行。结果走到半路，天气突然变了，一行人淋了雨，原定的行程也没走完。
+
+　　回来之后，有人说：“就不该出去，待在家里什么事都没有。”
+
+　　这句话能解释当天怎样不淋雨，却很难指导下一次出游。因为下一次，你依然没办法提前知道所有变化。如果只有保证不出岔子才能出发，那以后都不用约了。
+
+　　但也不能反过来一摊手：天气的事情谁说得准，没什么好想的。
+
+　　雨为什么来，未必能控制。出发前有没有查看最新消息，途中有没有注意变化，有没有准备可以中止行程的办法，这些却能一件件核对。
+
+　　同样是淋雨，如果出发前已经有明确的恶劣天气提醒，只是嫌改计划麻烦而没理会，那就有具体的判断需要改。下次该改的，是对提醒的处理方式。
+
+　　如果当时并没有这样的信息，回来之后再要求自己“应该预见到”，就很容易变成一道永远做不对的题。
+
+　　**该问的是：当时有哪条值得注意的信息，被我漏掉或者轻看了？**
+
+　　这和“后来发生了什么”是两个问题。
+
+　　我觉得不少所谓的复盘，最容易在这里偷懒。拿到结果之后，把所有线索重新排列，事情看上去就从头到尾都很明显，连路上随口说的一句话都像预兆。
+
+　　可回到出发前，那句话旁边还有许多别的信息。有的支持出行，有的让人犹豫。你需要做的是在它们之间判断，并没有一条线索会提前亮起来，告诉你“注意，我才是这次真正重要的那个”。
+
+　　事后把它挑出来不难。难的是说清楚，下次遇到类似情况，凭什么能在当时把它挑出来。
+
+　　如果说不清，所谓教训就可能只是一句“以后小心点”。小心到什么程度？看什么、问什么、什么情况下停下来？都没有。最后留下的只有紧张，办法一个没多。
+
+　　**所以不妨在做稍微重要一点的决定时，给自己留几句简单的记录：现在知道什么，为什么这样选，哪些变化出现之后要重新考虑。**
+
+　　不需要给每顿晚饭写报告。花时间记这些，是为了以后有东西可以核对，免得把“当时觉得很有可能”和“当时明明知道一定会发生”混成一回事。
+
+　　比如几个人共同筹备一场活动，你预计周五能拿到场地确认，就答应周六发通知。后来场地迟迟没定，通知也跟着耽误了。
+
+　　回头看，是对方已经提醒过时间不确定，你却把估计当成了承诺？还是对方明确确认后，又临时改变了安排？又或者，你明知道这个环节没定，却没有告诉等通知的人？
+
+　　这几种情况，下一次要改的东西并不一样。都用一句“我不该答应周六”收尾，反而把最有用的区别抹掉了。
+
+　　**还有一件容易忘的事：顺利做成的事情，也值得这么问。**
+
+　　没查路线、没留时间，碰巧赶上了最后一班车，不足以说明这个安排很周到。下次照着来，未必还有同样的运气。只在失败时挑毛病，在成功时把所有做法都留下，学到的经验可能越来越奇怪。
+
+　　当然，分清判断和结果，不是在给自己免除责任。你组织的活动出了问题，该处理的后续仍然要处理；别人因为你的安排受了影响，也不能用“我当时有理由”就让人闭嘴。
+
+　　解释当时为什么这样选，是为了找到能改的地方。该承担多少后果，还得看自己的职责和具体做过什么。这两件事可以一起做。
+
+　　同样，一次不顺也许不足以推翻整个办法，但相似的问题接连出现，就该重新检查原来的依据。不能每次都说自己倒霉，始终不肯改。
+
+　　下一次想起一件做砸的事，先别急着骂自己怎么那么蠢。把时间拨回做决定的那一刻，列出当时确实能知道、能做到的事情。
+
+　　漏看的提醒，下次补上；说得太满的承诺，下次留出余地。至于那个只有事情发生后才揭晓的答案，就别再要求过去的自己提前交卷了。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2026 年 10 月 10 日

~~~~~

</details>

<a id="f-520419096-src-生活碎笔-随笔随记-实用类随记-aigc人工校对-爱好接了单-连不想做的部分也要交付-md-2448431962"></a>
#### src/生活碎笔/随笔随记/实用类随记/【AIGC人工校对】爱好接了单，连不想做的部分也要交付.md

<details>
<summary><code>+65 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\347\210\261\345\245\275\346\216\245\344\272\206\345\215\225\357\274\214\350\277\236\344\270\215\346\203\263\345\201\232\347\232\204\351\203\250\345\210\206\344\271\237\350\246\201\344\272\244\344\273\230.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\347\210\261\345\245\275\346\216\245\344\272\206\345\215\225\357\274\214\350\277\236\344\270\215\346\203\263\345\201\232\347\232\204\351\203\250\345\210\206\344\271\237\350\246\201\344\272\244\344\273\230.md"
new file mode 100644
index 000000000..b3ede0810
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\347\210\261\345\245\275\346\216\245\344\272\206\345\215\225\357\274\214\350\277\236\344\270\215\346\203\263\345\201\232\347\232\204\351\203\250\345\210\206\344\271\237\350\246\201\344\272\244\344\273\230.md"
@@ -0,0 +1,65 @@
+# 爱好接了单，连不想做的部分也要交付
+
+<!-- daily-essay-id: 2026-10-11 -->
+
+<!-- wechat-digest: 把爱好变成收入之前，需要试过从确认要求到修改交付的完整过程，看看自己能否接受其中重复而琐碎的工作，再决定愿意接下多少承诺。 -->
+
+　　把爱好做成生意，最容易漏算的，是自己平时可以不做的那些事情。
+
+　　假设你喜欢做手工。周末挑一块喜欢的布，缝一个小包，颜色自己选，大小自己定。缝到一半觉得没意思，放着，下周再说。做出来有点歪，反而觉得挺可爱。
+
+　　朋友看见照片，说这个好看，应该拿去卖。
+
+　　听起来很顺理成章。本来就在做，顺便赚点钱，多好。
+
+　　于是有人来订同款，要求换一种颜色，背带加长，里面再加个小口袋。你算了算，多费一点工夫，也能做，就答应了。
+
+　　接下来，对方要看布料在自然光下的颜色，问背带具体有多长，确认下周出门前能不能收到。你得找尺子、拍照、回消息，还要说明照片和实物可能有色差。
+
+　　这些事情都很合理。人家是在买一个准备拿来用的包，当然会问清楚。
+
+　　可你原本喜欢的是坐在桌前慢慢缝东西。现在布还没裁，已经聊了半个晚上。
+
+　　等到真正开始做，你又发现，这次不能随便放着了。对方等着出门用，你答应的时间在那里。哪怕今天突然更想试另一种布，也得先把手上这个做完。
+
+　　**订单一旦接下，确认、重复、修改和交付，就都成了这件事的一部分。**
+
+　　只算坐在缝纫机前的时间，很容易高估自己有多喜欢这份工作。
+
+　　我觉得“做喜欢的事就不会累”这句话，最容易让人误会的地方也在这里。你喜欢的究竟是某个动作，还是围绕它发生的整套工作？这得分开看。
+
+　　做一个自己想要的包，和连续做几个别人已经选好的包，手上的技术差不多，时间却由不同的人和事情来安排。前者可以跟着兴致走，后者要回应已经给出去的承诺。
+
+　　原本让你放松的，可能恰好就是那种随时能改、随时能停的自由。收费之后，这部分自由就需要重新商量了。
+
+　　当然，也有人正好喜欢订单带来的明确要求。自己做时不知道从哪开始，有人告诉他用途、尺寸和期限，他反而更容易投入。把一件东西做好交到别人手里，也能带来满足。
+
+　　所以没必要替所有爱好下结论，说一收钱就变味，或者不赚钱就是浪费天赋。先看看完整做过一遍之后，自己还愿不愿意再来一次。
+
+　　想试，可以从要求简单、自己确实做得到的小件开始。样式、完成时间、能改哪些地方，提前讲清楚。做完之后，把沟通、采购、制作、整理和交付花的工夫放在一起看。
+
+　　哪一段最让人抗拒？是还不熟练，所以费劲，还是即使熟练了，也不想反复做？这两种情况，需要的处理办法不一样。
+
+　　比如拍照太麻烦，可以把已有的布料集中拍好；反复解释尺寸，可以把尺寸写清楚。做过几次之后，有些琐事确实能省下来。
+
+　　但如果你最不愿意的是重复同一个款式，偏偏来问的人都想要同款，那就得认真想想自己准备卖什么。不能一边答应照着做，一边埋怨买家没有欣赏新设计的眼光。
+
+　　你也可以只做现货，让别人从已经完成的作品里选；或者只接受自己愿意做的几种定制。这样做会放弃一些订单，不过留下来的工作，也许更接近你愿意过的日子。
+
+　　这仍然需要沟通、打包和处理问题。只是范围由你先划出来，对方觉得合适再买。接到自己不想做的要求，也不用为了证明能力把它硬接下来。
+
+　　反过来，刚做一次觉得累，也不用马上断定自己不适合。第一次可能花了很多时间找材料、定尺寸，下次未必还要从头来。多看几次实际做完的感受，比在兴头上或者疲惫时给自己定终身，都有用一点。
+
+　　还有个小区别：朋友因为喜欢你，愿意宽容你的拖延，和一个普通买家接受同样的安排，是两回事。试做时得到的赞美可以收下，但别把对方的体谅也算成自己已经能稳定提供的东西。
+
+　　最后，就算完整试过，发现自己只愿意偶尔做一个送人，那也挺明确了。以后再有人说“你应该拿去卖”，你知道这个建议会给自己的周末添上什么。
+
+　　愿意接单，就把不那么有趣的部分也安排进去。不愿意，也可以把那块布留到下次有兴致的时候再裁。
+
+　　做包是你的爱好。至于回消息、核尺寸、赶交付的这一整份工作，要不要接下来，可以另外决定。
+
+<br />
+
+　　南国微雪 Miyuki
+
+　　2026 年 10 月 11 日

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-11 06:30:25 CMT (UTC+8) | 3131cd7aa）

### Summary

- Generated at: `2026-10-11 06:30:25 CMT (UTC+8)`
- Base commit: `3131cd7aa`
- Diff source: `6b5878cba8136f3cb6c04b7e4755e674df95c0f3..3131cd7aacff176be1f85ce5c5c484291563c533`
- Changed files: `2`
- Total lines: `+64 / -0`

### Commit Messages

- `3131cd7a` 随笔初稿：爱好接了单，连不想做的部分也要交付

### Index

1. [src/SUMMARY.md](#f-354721673-src-summary-md-3501257646) `+1 / -0`
2. [src/生活碎笔/随笔随记/实用类随记/【AIGC待校对】爱好接了单，连不想做的部分也要交付.md](#f-354721673-src-生活碎笔-随笔随记-实用类随记-aigc待校对-爱好接了单-连不想做的部分也要交付-md-827728837) `+63 / -0`

### Diffs

<a id="f-354721673-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+1 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index 3cc47b9aa..aa0d3d055 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -268,6 +268,7 @@
     - [随记 - 2020 年 10 月 17 日](生活碎笔/随笔随记/情感类随记/随记-2020年10月17日.md)
     - [随记 - 2020 年 5 月 15 日](生活碎笔/随笔随记/情感类随记/随记-2020年5月15日.md)
   - [实用类随记](生活碎笔/随笔随记/实用类随记/实用类随记.md)
+    - [【AIGC待校对】爱好接了单，连不想做的部分也要交付](生活碎笔/随笔随记/实用类随记/【AIGC待校对】爱好接了单，连不想做的部分也要交付.md)
     - [【AIGC待校对】复盘的时候，别假装自己当时就知道结局](生活碎笔/随笔随记/实用类随记/【AIGC待校对】复盘的时候，别假装自己当时就知道结局.md)
     - [【AIGC人工校对】留着备用的东西，也在占用你现在的生活](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】留着备用的东西，也在占用你现在的生活.md)
     - [【AIGC人工校对】道歉之后，先把给别人添的麻烦处理掉](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】道歉之后，先把给别人添的麻烦处理掉.md)

~~~~~

</details>

<a id="f-354721673-src-生活碎笔-随笔随记-实用类随记-aigc待校对-爱好接了单-连不想做的部分也要交付-md-827728837"></a>
#### src/生活碎笔/随笔随记/实用类随记/【AIGC待校对】爱好接了单，连不想做的部分也要交付.md

<details>
<summary><code>+63 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\345\276\205\346\240\241\345\257\271\343\200\221\347\210\261\345\245\275\346\216\245\344\272\206\345\215\225\357\274\214\350\277\236\344\270\215\346\203\263\345\201\232\347\232\204\351\203\250\345\210\206\344\271\237\350\246\201\344\272\244\344\273\230.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\345\276\205\346\240\241\345\257\271\343\200\221\347\210\261\345\245\275\346\216\245\344\272\206\345\215\225\357\274\214\350\277\236\344\270\215\346\203\263\345\201\232\347\232\204\351\203\250\345\210\206\344\271\237\350\246\201\344\272\244\344\273\230.md"
new file mode 100644
index 000000000..bab031101
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\345\276\205\346\240\241\345\257\271\343\200\221\347\210\261\345\245\275\346\216\245\344\272\206\345\215\225\357\274\214\350\277\236\344\270\215\346\203\263\345\201\232\347\232\204\351\203\250\345\210\206\344\271\237\350\246\201\344\272\244\344\273\230.md"
@@ -0,0 +1,63 @@
+# 爱好接了单，连不想做的部分也要交付
+
+<!-- daily-essay-id: 2026-10-11 -->
+
+<!-- wechat-digest: 把爱好变成收入之前，需要试过从确认要求到修改交付的完整过程，看看自己能否接受其中重复而琐碎的工作，再决定愿意接下多少承诺。 -->
+
+　　把爱好做成生意，最容易漏算的，是自己平时可以不做的那些事情。
+
+　　假设你喜欢做手工。周末挑一块喜欢的布，缝一个小包，颜色自己选，大小自己定。缝到一半觉得没意思，放着，下周再说。做出来有点歪，反而觉得挺可爱。
+
+　　朋友看见照片，说这个好看，应该拿去卖。
+
+　　听起来很顺理成章。本来就在做，顺便赚点钱，多好。
+
+　　于是有人来订同款，要求换一种颜色，背带加长，里面再加个小口袋。你算了算，多费一点工夫，也能做，就答应了。
+
+　　接下来，对方要看布料在自然光下的颜色，问背带具体有多长，确认下周出门前能不能收到。你得找尺子、拍照、回消息，还要说明照片和实物可能有色差。
+
+　　这些事情都很合理。人家是在买一个准备拿来用的包，当然会问清楚。
+
+　　可你原本喜欢的是坐在桌前慢慢缝东西。现在布还没裁，已经聊了半个晚上。
+
+　　等到真正开始做，你又发现，这次不能随便放着了。对方等着出门用，你答应的时间在那里。哪怕今天突然更想试另一种布，也得先把手上这个做完。
+
+　　**订单一旦接下，确认、重复、修改和交付，就都成了这件事的一部分。**
+
+　　只算坐在缝纫机前的时间，很容易高估自己有多喜欢这份工作。
+
+　　我觉得“做喜欢的事就不会累”这句话，最容易让人误会的地方也在这里。你喜欢的究竟是某个动作，还是围绕它发生的整套工作？这得分开看。
+
+　　做一个自己想要的包，和连续做几个别人已经选好的包，手上的技术差不多，时间却由不同的人和事情来安排。前者可以跟着兴致走，后者要回应已经给出去的承诺。
+
+　　原本让你放松的，可能恰好就是那种随时能改、随时能停的自由。收费之后，这部分自由就需要重新商量了。
+
+　　当然，也有人正好喜欢订单带来的明确要求。自己做时不知道从哪开始，有人告诉他用途、尺寸和期限，他反而更容易投入。把一件东西做好交到别人手里，也能带来满足。
+
+　　所以没必要替所有爱好下结论，说一收钱就变味，或者不赚钱就是浪费天赋。先看看完整做过一遍之后，自己还愿不愿意再来一次。
+
+　　想试，可以从要求简单、自己确实做得到的小件开始。样式、完成时间、能改哪些地方，提前讲清楚。做完之后，把沟通、采购、制作、整理和交付花的工夫放在一起看。
+
+　　哪一段最让人抗拒？是还不熟练，所以费劲，还是即使熟练了，也不想反复做？这两种情况，需要的处理办法不一样。
+
+　　比如拍照太麻烦，可以把已有的布料集中拍好；反复解释尺寸，可以把尺寸写清楚。做过几次之后，有些琐事确实能省下来。
+
+　　但如果你最不愿意的是重复同一个款式，偏偏来问的人都想要同款，那就得认真想想自己准备卖什么。不能一边答应照着做，一边埋怨买家没有欣赏新设计的眼光。
+
+　　你也可以只做现货，让别人从已经完成的作品里选；或者只接受自己愿意做的几种定制。这样做会放弃一些订单，不过留下来的工作，也许更接近你愿意过的日子。
+
+　　这仍然需要沟通、打包和处理问题。只是范围由你先划出来，对方觉得合适再买。接到自己不想做的要求，也不用为了证明能力把它硬接下来。
+
+　　反过来，刚做一次觉得累，也不用马上断定自己不适合。第一次可能花了很多时间找材料、定尺寸，下次未必还要从头来。多看几次实际做完的感受，比在兴头上或者疲惫时给自己定终身，都有用一点。
+
+　　还有个小区别：朋友因为喜欢你，愿意宽容你的拖延，和一个普通买家接受同样的安排，是两回事。试做时得到的赞美可以收下，但别把对方的体谅也算成自己已经能稳定提供的东西。
+
+　　最后，就算完整试过，发现自己只愿意偶尔做一个送人，那也挺明确了。以后再有人说“你应该拿去卖”，你知道这个建议会给自己的周末添上什么。
+
+　　愿意接单，就把不那么有趣的部分也安排进去。不愿意，也可以把那块布留到下次有兴致的时候再裁。
+
+　　做包是你的爱好。至于回消息、核尺寸、赶交付的这一整份工作，要不要接下来，可以另外决定。
+
+南国微雪 Miyuki
+
+2026 年 10 月 11 日

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-11 06:00:59 CMT (UTC+8) | 6b5878cba）

### Summary

- Generated at: `2026-10-11 06:00:59 CMT (UTC+8)`
- Base commit: `6b5878cba`
- Diff source: `8598095393d0557f21b76f7682dab7739010bb45..6b5878cba8136f3cb6c04b7e4755e674df95c0f3`
- Changed files: `2`
- Total lines: `+40 / -0`

### Commit Messages

- `6b5878cb` 每日一文：分手唯一的真相 - 陆琪

### Index

1. [src/SUMMARY.md](#f-1318581126-src-summary-md-3501257646) `+1 / -0`
2. [src/阅读/每日一文/分手唯一的真相-陆琪.md](#f-1318581126-src-阅读-每日一文-分手唯一的真相-陆琪-md-2678828918) `+39 / -0`

### Diffs

<a id="f-1318581126-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+1 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index b4fb89176..3cc47b9aa 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -1450,6 +1450,7 @@
     - [所有女生要知道](阅读/其他/书籍/所有女生要知道.md)
     - [意象的帝国：诗的写作课](阅读/其他/书籍/意象的帝国：诗的写作课.md)
 - [每日一文 | Daily Article](阅读/每日一文/每日一文.md)
+  - [分手唯一的真相 - 陆琪](阅读/每日一文/分手唯一的真相-陆琪.md)
   - [可以吃的纸 - 梁文道](阅读/每日一文/可以吃的纸-梁文道.md)
   - [比邻而居 - 王安忆](阅读/每日一文/比邻而居-王安忆.md)
   - [爱的牺牲 - 欧·亨利](阅读/每日一文/爱的牺牲-欧·亨利.md)

~~~~~

</details>

<a id="f-1318581126-src-阅读-每日一文-分手唯一的真相-陆琪-md-2678828918"></a>
#### src/阅读/每日一文/分手唯一的真相-陆琪.md

<details>
<summary><code>+39 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\345\210\206\346\211\213\345\224\257\344\270\200\347\232\204\347\234\237\347\233\270-\351\231\206\347\220\252.md" "b/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\345\210\206\346\211\213\345\224\257\344\270\200\347\232\204\347\234\237\347\233\270-\351\231\206\347\220\252.md"
new file mode 100644
index 000000000..9c0c1d21e
--- /dev/null
+++ "b/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\345\210\206\346\211\213\345\224\257\344\270\200\347\232\204\347\234\237\347\233\270-\351\231\206\347\220\252.md"
@@ -0,0 +1,39 @@
+# 分手唯一的真相
+
+*陆琪*
+
+　　当一个人要离开你的时候，他说的任何理由都是谎言。
+
+　　前几天去做电视节目，有个男人一直向女孩逼婚，而女孩因为年纪小而不愿意答应，两人几乎要闹到分手。最后在我和主持人的劝说下，女孩终于答应结婚，喜笑颜开地等着男人求婚。
+
+　　可意外却发生了，那男人居然当场反口，从逼婚转而要分手。为什么逼婚成功了反而要分手呢？我一再逼问他，终于问出缘由。
+
+　　原来这男人已经有了其他女朋友，本来就想和这女孩分手，但又不想承担劈腿的罪责，所以干脆用逼婚这一招来迫使女孩分手。在他看来，女友是一定不会愿意结婚的，那他自然可以把责任都推到女孩身上，自己一身轻松地和新女友双宿双飞去了。
+
+　　这种事情鲜见吗？一点也不。仅仅是那一天里，就又遇到了另外一对。
+
+　　那个女孩曾经为前男友堕过胎，于是很自卑，在新恋情之初就告诉了男人这件事情，但男人却拍胸脯保证不介意。
+
+　　一年没介意，两年没介意，到第三年，这男人开始疯狂地介意起来，以女孩曾堕胎为由，坚定地要分手，并不惜把这件事情公布得街知巷闻。
+
+　　为什么才短短几年时间，一个男人就从毫不在乎，而变成疯狂在意呢？
+
+　　如果把这两个案例放在一起看，如果把几乎所有男人要分手的例子也放在一起看，你会发觉，每次男人想要分手时，他都会找出一些理由一些借口。
+
+　　这些理由和借口，总是会把男人自己的责任推卸得干干净净，仿佛他是全世界最好的人，而分手完全是女人的错，完全是他被逼之下的无奈之举。
+
+　　真的如此吗？当然不是，你必须要知道，男人几乎不愿意主动承担分手的责任。每当他要分手的时候，一定会找好借口，如果实在找不到借口，就会玩失踪，完全不联系你，用冷处理的方式来让你明白。
+
+　　但无论是恋爱还是分手，女人最爱问的就是为什么，似乎找到原因才能接受结果。许多时候，女人分手了几年后，还会去找前男友问为什么，找不到答案似乎死不瞑目。
+
+　　但这不过是给了别人撒谎的机会。爱情是一件只重结果不重理由的事。就算找出天大的借口，分手就是分手，没差别。
+
+　　我经常说，看男人，要看他做什么，而不要听他说什么。理由是什么不重要，有没有理由也不重要，重要的是动作。
+
+　　天天陪着你的，就是爱你的。连续一周都毫无联系的，必然是不爱你的。这是最简单的判断方式。
+
+　　分手的痛苦，会让你苦苦追寻答案，但你所有能听到的答案，都只是假象。
+
+　　要记住，当一个人要离开你的时候，他说的任何理由都是谎言。
+
+　　唯一的真相就是，他不爱你了。

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-10 06:34:15 CMT (UTC+8) | 859809539）

### Summary

- Generated at: `2026-10-10 06:34:15 CMT (UTC+8)`
- Base commit: `859809539`
- Diff source: `95c8baeb86ca6aa4490392dc160ca988dcc339cf..8598095393d0557f21b76f7682dab7739010bb45`
- Changed files: `2`
- Total lines: `+66 / -0`

### Commit Messages

- `85980953` 随笔初稿：复盘的时候，别假装自己当时就知道结局

### Index

1. [src/SUMMARY.md](#f-3216720447-src-summary-md-3501257646) `+1 / -0`
2. [src/生活碎笔/随笔随记/实用类随记/【AIGC待校对】复盘的时候，别假装自己当时就知道结局.md](#f-3216720447-src-生活碎笔-随笔随记-实用类随记-aigc待校对-复盘的时候-别假装自己当时就知道结局-md-150227507) `+65 / -0`

### Diffs

<a id="f-3216720447-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+1 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index 73131ad62..b4fb89176 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -268,6 +268,7 @@
     - [随记 - 2020 年 10 月 17 日](生活碎笔/随笔随记/情感类随记/随记-2020年10月17日.md)
     - [随记 - 2020 年 5 月 15 日](生活碎笔/随笔随记/情感类随记/随记-2020年5月15日.md)
   - [实用类随记](生活碎笔/随笔随记/实用类随记/实用类随记.md)
+    - [【AIGC待校对】复盘的时候，别假装自己当时就知道结局](生活碎笔/随笔随记/实用类随记/【AIGC待校对】复盘的时候，别假装自己当时就知道结局.md)
     - [【AIGC人工校对】留着备用的东西，也在占用你现在的生活](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】留着备用的东西，也在占用你现在的生活.md)
     - [【AIGC人工校对】道歉之后，先把给别人添的麻烦处理掉](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】道歉之后，先把给别人添的麻烦处理掉.md)
     - [【AIGC人工校对】听得进意见，不等于每条意见都要照着改](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】听得进意见，不等于每条意见都要照着改.md)

~~~~~

</details>

<a id="f-3216720447-src-生活碎笔-随笔随记-实用类随记-aigc待校对-复盘的时候-别假装自己当时就知道结局-md-150227507"></a>
#### src/生活碎笔/随笔随记/实用类随记/【AIGC待校对】复盘的时候，别假装自己当时就知道结局.md

<details>
<summary><code>+65 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\345\276\205\346\240\241\345\257\271\343\200\221\345\244\215\347\233\230\347\232\204\346\227\266\345\200\231\357\274\214\345\210\253\345\201\207\350\243\205\350\207\252\345\267\261\345\275\223\346\227\266\345\260\261\347\237\245\351\201\223\347\273\223\345\261\200.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\345\276\205\346\240\241\345\257\271\343\200\221\345\244\215\347\233\230\347\232\204\346\227\266\345\200\231\357\274\214\345\210\253\345\201\207\350\243\205\350\207\252\345\267\261\345\275\223\346\227\266\345\260\261\347\237\245\351\201\223\347\273\223\345\261\200.md"
new file mode 100644
index 000000000..5f4335609
--- /dev/null
+++ "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\345\276\205\346\240\241\345\257\271\343\200\221\345\244\215\347\233\230\347\232\204\346\227\266\345\200\231\357\274\214\345\210\253\345\201\207\350\243\205\350\207\252\345\267\261\345\275\223\346\227\266\345\260\261\347\237\245\351\201\223\347\273\223\345\261\200.md"
@@ -0,0 +1,65 @@
+# 复盘的时候，别假装自己当时就知道结局
+
+<!-- daily-essay-id: 2026-10-10 -->
+
+<!-- wechat-digest: 复盘要回到做决定时掌握的信息，分清能改进的疏漏和无法提前知道的结果，才能留下下次用得上的办法，而不只是多一个责怪自己的理由。 -->
+
+　　事情搞砸之后，最没用的一句话，可能就是“早知道就不这样了”。
+
+　　知道下雨就不出门，知道对方会爽约就不等，知道最后用不上就不买。这当然都对。可要是把结局提前告诉你，那还用得着做决定吗？照着答案抄就行了。
+
+　　复盘真正难的地方，是结果已经摆在眼前，你还能不能记得，当时并不知道这么多。
+
+　　假设几个朋友约好周末去郊外走走。出发前看过天气，问过大家的时间，也查过路况，得到的信息都没有显示当天不适合出行。结果走到半路，天气突然变了，一行人淋了雨，原定的行程也没走完。
+
+　　回来之后，有人说：“就不该出去，待在家里什么事都没有。”
+
+　　这句话能解释当天怎样不淋雨，却很难指导下一次出游。因为下一次，你依然没办法提前知道所有变化。如果只有保证不出岔子才能出发，那以后都不用约了。
+
+　　但也不能反过来一摊手：天气的事情谁说得准，没什么好想的。
+
+　　雨为什么来，未必能控制。出发前有没有查看最新消息，途中有没有注意变化，有没有准备可以中止行程的办法，这些却能一件件核对。
+
+　　同样是淋雨，如果出发前已经有明确的恶劣天气提醒，只是嫌改计划麻烦而没理会，那就有具体的判断需要改。下次该改的，是对提醒的处理方式。
+
+　　如果当时并没有这样的信息，回来之后再要求自己“应该预见到”，就很容易变成一道永远做不对的题。
+
+　　**该问的是：当时有哪条值得注意的信息，被我漏掉或者轻看了？**
+
+　　这和“后来发生了什么”是两个问题。
+
+　　我觉得不少所谓的复盘，最容易在这里偷懒。拿到结果之后，把所有线索重新排列，事情看上去就从头到尾都很明显，连路上随口说的一句话都像预兆。
+
+　　可回到出发前，那句话旁边还有许多别的信息。有的支持出行，有的让人犹豫。你需要做的是在它们之间判断，并没有一条线索会提前亮起来，告诉你“注意，我才是这次真正重要的那个”。
+
+　　事后把它挑出来不难。难的是说清楚，下次遇到类似情况，凭什么能在当时把它挑出来。
+
+　　如果说不清，所谓教训就可能只是一句“以后小心点”。小心到什么程度？看什么、问什么、什么情况下停下来？都没有。最后留下的只有紧张，办法一个没多。
+
+　　所以不妨在做稍微重要一点的决定时，给自己留几句简单的记录：现在知道什么，为什么这样选，哪些变化出现之后要重新考虑。
+
+　　不需要给每顿晚饭写报告。花时间记这些，是为了以后有东西可以核对，免得把“当时觉得很有可能”和“当时明明知道一定会发生”混成一回事。
+
+　　比如几个人共同筹备一场活动，你预计周五能拿到场地确认，就答应周六发通知。后来场地迟迟没定，通知也跟着耽误了。
+
+　　回头看，是对方已经提醒过时间不确定，你却把估计当成了承诺？还是对方明确确认后，又临时改变了安排？又或者，你明知道这个环节没定，却没有告诉等通知的人？
+
+　　这几种情况，下一次要改的东西并不一样。都用一句“我不该答应周六”收尾，反而把最有用的区别抹掉了。
+
+　　还有一件容易忘的事：顺利做成的事情，也值得这么问。
+
+　　没查路线、没留时间，碰巧赶上了最后一班车，不足以说明这个安排很周到。下次照着来，未必还有同样的运气。只在失败时挑毛病，在成功时把所有做法都留下，学到的经验可能越来越奇怪。
+
+　　当然，分清判断和结果，不是在给自己免除责任。你组织的活动出了问题，该处理的后续仍然要处理；别人因为你的安排受了影响，也不能用“我当时有理由”就让人闭嘴。
+
+　　解释当时为什么这样选，是为了找到能改的地方。该承担多少后果，还得看自己的职责和具体做过什么。这两件事可以一起做。
+
+　　同样，一次不顺也许不足以推翻整个办法，但相似的问题接连出现，就该重新检查原来的依据。不能每次都说自己倒霉，始终不肯改。
+
+　　下一次想起一件做砸的事，先别急着骂自己怎么那么蠢。把时间拨回做决定的那一刻，列出当时确实能知道、能做到的事情。
+
+　　漏看的提醒，下次补上；说得太满的承诺，下次留出余地。至于那个只有事情发生后才揭晓的答案，就别再要求过去的自己提前交卷了。
+
+南国微雪 Miyuki
+
+2026 年 10 月 10 日

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-10 06:00:59 CMT (UTC+8) | 95c8baeb8）

### Summary

- Generated at: `2026-10-10 06:00:59 CMT (UTC+8)`
- Base commit: `95c8baeb8`
- Diff source: `e2f5f7ae9a1b6657ea1d01eab9f247e6d8204592..95c8baeb86ca6aa4490392dc160ca988dcc339cf`
- Changed files: `2`
- Total lines: `+18 / -0`

### Commit Messages

- `95c8baeb` 每日一文：可以吃的纸 - 梁文道

### Index

1. [src/SUMMARY.md](#f-919354870-src-summary-md-3501257646) `+1 / -0`
2. [src/阅读/每日一文/可以吃的纸-梁文道.md](#f-919354870-src-阅读-每日一文-可以吃的纸-梁文道-md-2940034942) `+17 / -0`

### Diffs

<a id="f-919354870-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+1 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index 4bab201b7..73131ad62 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -1449,6 +1449,7 @@
     - [所有女生要知道](阅读/其他/书籍/所有女生要知道.md)
     - [意象的帝国：诗的写作课](阅读/其他/书籍/意象的帝国：诗的写作课.md)
 - [每日一文 | Daily Article](阅读/每日一文/每日一文.md)
+  - [可以吃的纸 - 梁文道](阅读/每日一文/可以吃的纸-梁文道.md)
   - [比邻而居 - 王安忆](阅读/每日一文/比邻而居-王安忆.md)
   - [爱的牺牲 - 欧·亨利](阅读/每日一文/爱的牺牲-欧·亨利.md)
   - [寂寞 - 吴念真](阅读/每日一文/寂寞-吴念真.md)

~~~~~

</details>

<a id="f-919354870-src-阅读-每日一文-可以吃的纸-梁文道-md-2940034942"></a>
#### src/阅读/每日一文/可以吃的纸-梁文道.md

<details>
<summary><code>+17 / -0</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\345\217\257\344\273\245\345\220\203\347\232\204\347\272\270-\346\242\201\346\226\207\351\201\223.md" "b/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\345\217\257\344\273\245\345\220\203\347\232\204\347\272\270-\346\242\201\346\226\207\351\201\223.md"
new file mode 100644
index 000000000..468498b79
--- /dev/null
+++ "b/src/\351\230\205\350\257\273/\346\257\217\346\227\245\344\270\200\346\226\207/\345\217\257\344\273\245\345\220\203\347\232\204\347\272\270-\346\242\201\346\226\207\351\201\223.md"
@@ -0,0 +1,17 @@
+# 可以吃的纸
+
+*梁文道*
+
+　　芝加哥有家很前卫的餐厅叫做“Moto”，它的大厨 Homaro Cantu 是美国最大胆最有创意的厨师之一。他的其中一道作品是一张纸，纸上画了个粉红色的棉花糖，而这张纸是可以吃的，吃起来无论质感还是味道就真像团粉红色的棉花糖。然而最怪异的还不是这张棉花糖纸，而是这张纸上的一行字：“H.Cantu 的机密产权。专利申请中，在事先得到 H.Cantu 的许可之前，不得揭露或者进一步使用。”
+
+　　请想象一下以后上餐馆吃饭，碟子上印着“版权所有，禁止拍照及盗用”，会是什么情况？这就是 Homaro Cantu 打算干的事了。他正和律师合作，替十二道独门创作申请专利。如果成事，肯定会有更多的厨师仿效。到了那时候我们吃饭就和买书买唱片一样了，你拥有的只是一个对象一个副本而非作品本身；你吃了一碟菜进肚子里，并不表示你就可以任意处理它。
+
+　　曾几何时，厨艺是种自由流动的东西，就和人类的一切知识与创造一样。杨贯一用瓦罉烹鲍鱼的效果不错，于是个个跟着如法炮制，也没谁抄袭谁的问题。正如第一个用火枪稍为炙烤 Toro 的人没有宣称任何专利，所以每家日本料理也能为客人奉上这款美味的寿司了。假如当年发明红酒烩鸡的法国乡民登记了知识产权，今天就不会有那么多种版本流传民间了。
+
+　　在那个时代，谁都可以说自己的东西正宗，所以北方城市满街都是“正宗狗不理包子”和“正宗兰州拉面”，客人难分真假，只有凭口味决高下。妙的是有些东西不是原始老店就一定味做得最好，其后人要是懒惰了，又或者从它那里出身的师傅自觉创业精益求精，结果如何不问可知。
+
+　　菜谱往往没有机密可言，谁都能学谁都能卖。尽管有些独门配方是店主或大厨保有一生的秘学，非我族人一概不传；可是大家依然相信好厨师靠的不只是锁在保险箱里的神奇配方，更是临灶的经验与存乎一心的直觉“手势”。因此有自信的厨师向来不怕徒弟满师之后起飞脚，四处挂着老师的名号卖艺，说不定他还会因为自己的作品遍地开花而感到自豪呢。
+
+　　可是 Homaro Cantu 自有他的打算。他也想像 Nobu 和 Alain Ducasse 一样享大名发大财，但又不愿到处开分店，因为他认为一个厨师不可能兼顾得了那么多的店面；与其像个高级行政人员一样坐商务舱飞来飞去巡视业务，不如好好呆在自己的厨房修炼。
+
+　　从这个角度看来，Homaro Cantu 应该是个很传统的老派人，可偏偏是他掀起了一种新潮流，将厨艺推向了知识产权保护下的新时代。果然，他的做法既能为他带来声名也能为他制造财富。就拿那张棉花糖纸来说吧，目前虽还未取得专利，就已有很多人找上门来了。其中一个大客是美国太空总署，他们觉得这个技术可以用在宇宙飞船上，日后航天员不用再带那么多复杂的东西离开地球，一叠加了维生素的有味纸就能让他们餐餐都有新口味了。

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-09 21:04:07 CMT (UTC+8) | e2f5f7ae9）

### Summary

- Generated at: `2026-10-09 21:04:07 CMT (UTC+8)`
- Base commit: `e2f5f7ae9`
- Diff source: `5102d3854f004cfdf59c4651fe1c208efb266a2c..e2f5f7ae9a1b6657ea1d01eab9f247e6d8204592`
- Changed files: `1`
- Total lines: `+24 / -30`

### Commit Messages

- `e2f5f7ae` refactor(学海计划/哲学): 重写哲学的方法 1 篇, 去除 AIGC 模板并压缩重复

  > - 按新版规范重写为四个编号单元，沿具体例子逐步解释方法。
  > - 删除重复限定和无关计算，压缩为 1217 字正文。
  > - 保留正文以外的内容，检查段落衔接、禁用表达及格式。


### Index

1. [src/学习与进步/学海计划/哲学/总论/哲学的方法/【新增】哲学的方法.md](#f-3068027653-src-学习与进步-学海计划-哲学-总论-哲学的方法-新增-哲学的方法-md-1715354674) `+24 / -30`

### Diffs

<a id="f-3068027653-src-学习与进步-学海计划-哲学-总论-哲学的方法-新增-哲学的方法-md-1715354674"></a>
#### src/学习与进步/学海计划/哲学/总论/哲学的方法/【新增】哲学的方法.md

<details>
<summary><code>+24 / -30</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\345\223\262\345\255\246\347\232\204\346\226\271\346\263\225/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\232\204\346\226\271\346\263\225.md" "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\345\223\262\345\255\246\347\232\204\346\226\271\346\263\225/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\232\204\346\226\271\346\263\225.md"
index 503d947f8..22ecb5ba6 100644
--- "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\345\223\262\345\255\246\347\232\204\346\226\271\346\263\225/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\232\204\346\226\271\346\263\225.md"
+++ "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\345\223\262\345\255\246\347\232\204\346\226\271\346\263\225/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\232\204\346\226\271\346\263\225.md"
@@ -12,59 +12,53 @@
 
 　　本文讨论：哲学-总论-哲学的方法。
 
-　　 **哲学有多种研究方法，采用哪一种，取决于具体问题和研究传统。** 本目录会介绍概念分析、论证与反驳、思想实验、现象学方法。这是本栏目的选题安排，哲学研究还有其他方法。
+　　 **哲学讨论，要把思考的过程交代清楚，别人才有办法检查。** 这篇从一次报名争论开始：先弄清词义，再检查理由，接着换个条件检验原来的说法。末段转到等车，介绍怎样研究人的亲身体验。
 
-　　这些名称容易背，具体怎么用，需要放进问题里看。
+　　1. 先说清“自愿”是什么意思。
 
-　　假设一个社团组织周末出游，10 名成员中有 8 人提交了报名表。组织者说，报名率为 80%，而且报名表都是本人提交，所以大家都是自愿参加。
+　　假设一个社团组织出游，8 人亲手填写了报名表。组织者认为，既然表是本人填的，这 8 人自然都是自愿参加。
 
-　　这里有两项判断。8 ÷ 10 = 80%，计算没有问题；但从“本人提交”走到“自愿参加”，还需要说明“自愿”的含义，以及报名过程中的实际条件。
+　　有人对行程没什么兴趣，但朋友邀请，他也乐意作陪。这样的报名，可以出于自愿。**自愿参加，不要求一个人特别喜欢这项活动。** 陪朋友本身就可以成为理由。
 
-　　假如有人很想去，有人虽然兴趣不大，但愿意陪朋友去，还有人是受到“不报名就退社”的威胁才提交表格，这几种情况是否都符合“自愿”，就值得区分。
+　　再看另一种情况。有人明确说了不想去，却被告知“不报名就退社”。他担心失去社团的资格，才填下名字。若把这种情形也算作自愿，组织者就得解释，为什么这项威胁可以忽略。
 
-　　检查一个概念的含义、适用条件，以及它与相近概念的区别，便是在做 **概念分析**。在这个例子里，需要辨清“本人操作”“内心愿意”“没有受到胁迫”分别说明什么，它们是否总是一起出现。
+　　像这样，检查一个词指什么、适用于哪些情况，就是 **概念分析**。在这个例子里，“自愿”需要考察作决定时受到的限制。本人填表，只交代了动作是谁做的。
 
-　　这一步也不能只靠查词典结束。词典可以提供常见用法，但面对边界情况，还要说明采用某种理解的理由。人受到朋友的影响，不一定就失去自愿性；受到威胁时，仅凭他亲手填写表格，也不足以认定自愿。
+　　词典能帮助了解常见用法，遇到具体争议，还得说明划分的理由。朋友的劝说和退社的威胁，影响人的方式不同；**影响到了什么程度**，可能正是双方接下来要讨论的地方。
 
-　　所以，概念分析会使分歧更具体，却未必让分歧消失。双方可能都理解了彼此的用法，仍然不同意应把边界划在哪里。
+　　2. 词义清楚了，再把理由展开。
 
-　　再把组织者的理由完整写出来：所有本人提交报名表的人，都是自愿参加；这 8 人本人提交了报名表；所以，这 8 人都是自愿参加。
+　　组织者的话省略了一步。补全以后是：凡本人填表，都是自愿参加；这 8 人本人填了表；所以，这 8 人都是自愿参加。
 
-　　前两句是用来支持结论的 **前提**。把前提与结论的关系交代出来，是在构造 **论证**。这里如果接受前两句，结论就能跟着推出；接下来需要检查的，是第一句是否成立，以及第二句是否属实。
+　　前两句拿来支持结论，叫作 **前提**。用前提说明结论为什么成立，就是在 **论证**。这里的推理接得上：如果前两句都真，结论也就成立。
 
-　　如果有人在胁迫下亲手提交了表格，就会对第一句构成挑战。这种指出前提、推理或结论存在问题的工作，属于 **反驳**。它需要针对对方实际提出的理由，不能仅仅说一句“你这个人不可信”。
+　　现在回头检查第一句。只要找到一个受胁迫填表的人，“凡本人填表，都是自愿参加”就站不住了。这个例子推翻了原来的概括，构成了 **反驳**。
 
-　　不过，第一句有问题，也不能直接推出“这 8 人都不是自愿的”。**一个理由不足以支持结论，不等于相反的结论已经成立。** 这 8 人的实际情况，仍需分别了解。
+　　<u> **反驳要说清，问题出在哪一步。** </u> 这里有问题的是第一句。至于报名的 8 人究竟怎么想，得去了解各人的情况；前提被推翻，并不能证明所有人都不愿意去。
 
-　　<u> **检查论证时，把前提是否可信、结论是否由前提推出，分开来看。** </u> 否则，既可能接受推不出来的结论，也可能因为不喜欢结论，就忽略一段本来成立的推理。
+　　3. 再换一个条件，检查有没有漏掉的情况。
 
-<br />
-
-　　假如没有现成的胁迫案例，也可以设想两个情境：两人都亲手提交同样的表格，其他相关条件相同，一人没有收到威胁，另一人被告知“不报名就退社”。比较这种变化是否影响“自愿”的判断，可以检查原先那个概括是否过宽。
-
-　　用设定的情境来考察概念、原则或理论，会用到 **思想实验**。设想的作用是把某些条件单独拿出来考察，使人看清它们对判断有什么影响。（可参考[斯坦福哲学百科的思想实验条目](https://plato.stanford.edu/entries/thought-experiment/)。）
+　　组织者于是修改说法：只要本人填表，又没有受到威胁，就算自愿参加。这次似乎周全了，可以继续试。
 
-　　但设想中的情况，要交代得足够清楚。如果把一方写得处处可怜、另一方写得处处可恶，读者可能只是受故事措辞影响。原本想检查的条件，反而被其他差别盖住了。
+　　设想组织者明知徒步路程是 30 公里，却在报名表上写了 3 公里。有人相信表上的说明，毫无压力地报了名。欺骗促成的报名，足不足以说明他愿意参加真正的行程？修改后的规则排除了威胁，却还没处理隐瞒。
 
-　　 **思想实验能检验一种说法在设定情境下是否站得住，不能证明现实中发生过这件事。** 判断那 8 人有没有受到威胁，需要了解真实的报名过程。脑中构造出的反例，不能直接当成指控某个人的证据。
+　　 **用设定的情境检验一个主张**，是思想实验的一种用法。这个设想帮助人发现，讨论自愿，还需要考虑当事人知道些什么。（参见[斯坦福哲学百科的思想实验条目](https://plato.stanford.edu/entries/thought-experiment/)。）
 
-　　方法之间因此可以衔接：概念分析指出“本人操作”与“自愿”可能有别，论证分析找到两者之间的推理，思想实验再帮助检查这一推理依赖的条件。过程中若发现新问题，也可以回头修改概念或前提。
+　　设定要围绕待检验的那句话。这里交代路程被隐瞒就够了，若再添上一大段组织者如何讨厌，读者的判断可能被人物好恶带走。至于现实中的出游有没有隐瞒行程，需要另外查证，设想本身不能充当证据。
 
-　　还有一些研究，关注事情怎样被人经验到。比如等车时，人会留意驶来的车辆，期待目标线路出现，并把刚过去的等待与接下来的行程联系起来。单独记录等了 10 分钟，还没有描述这些经验之间的联系。
-
-　　从亲身经历的角度，描述、分析事物如何呈现，以及感知、期待、时间意识等怎样组织起来，是 **现象学方法** 所关注的方向。这里的“经验结构”，可以先理解为这些经验要素如何相互联系。（可参考[斯坦福哲学百科的现象学条目](https://plato.stanford.edu/entries/phenomenology/)。）
+<br />
 
-　　一些现象学路径会暂缓对外部事物的惯常判断，以便集中考察经验如何发生、对象如何显现。这种暂缓并不等于宣布外部世界不存在，也不等于只要记录一句“觉得等车很烦”，研究就完成了。
+　　4. 回到体验本身，看事情怎样被人经历。
 
-　　因此，它与前面的论证检查有不同的侧重。前面主要检查理由怎样支持判断，这里还要仔细描述判断和行动所处的经验。不同现象学传统对具体做法也有分歧，后文会另作介绍。
+　　前面的讨论一直围绕一句话检查理由。现在换个问题：一个人等车时，究竟在经历什么？
 
-　　这几种方法都需要材料和练习。**方法的名称，不能替代实际的分析过程。** 提出一个反例，需要说明它反驳了哪一句；描述一种经验，需要让读者看清描述的对象和联系，而不只是表达个人感想。
+　　比如，他听见发动机声便抬头，看到驶来的车不是目标线路，又转回头继续等。声音在这里成了“车可能来了”的信号，因为他正盼着那班车。期待影响了他的注意，也带出了抬头张望的动作。
 
-　　结论与方法也都值得检查。同一个结论可以由不同理由支持，不同理由未必同样可靠；同一种分析方法，也可能因为前提错误、材料不足而得到错误判断。过程写得清楚，是为了便于检验和修正。
+　　只记录“等了 10 分钟”，还看不到这段经历。仔细描述人怎样感知、期待和行动，进而分析这些体验如何联系，是 **现象学方法** 关注的工作。（参见[斯坦福哲学百科的现象学条目](https://plato.stanford.edu/entries/phenomenology/)。）
 
-　　本文只是对本目录几种方法的入门介绍，具体用法与限度会在后续篇章展开，仅供参考。
+　　读者也可以据此检查描述：抬头是在辨认车辆，还是在看路边的熟人？同一个动作放进不同经历，含义会变。交代当事人正在做什么，才有可能理解他眼中的场景。
 
-　　<u> **阅读哲学文章时，可以挑出一项具体主张，标明它的含义、理由和可能的反例，再看作者怎样回应。** </u> 遇到经验描述，则留意作者描述了什么、解释了哪些联系。这样才看得到方法在文章里做了什么。
+　　这四种方法会在后文分别展开，此处仅作入门介绍。<u> **判断一种方法有没有用，看它是否把原先含糊的问题说清，是否让理由变得可以检查。** </u>
 
 <br />
 

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-09 20:56:34 CMT (UTC+8) | 5102d3854）

### Summary

- Generated at: `2026-10-09 20:56:34 CMT (UTC+8)`
- Base commit: `5102d3854`
- Diff source: `15b0bd73ddfe6569b1c13c6b8950adee94f83456..5102d3854f004cfdf59c4651fe1c208efb266a2c`
- Changed files: `1`
- Total lines: `+22 / -1`

### Commit Messages

- `5102d385` docs(学海计划): 新增「推进方式：一条线走到底」硬性规范

  > - 说明为什么：人脑只跑得动一条线，「不是…而是」这类对仗句一次抛出两个立场，
  >   读者要先建模型再回头接线，接不回来就走神；句式一多注意力涣散
  > - 补充可预测性问题：模式一旦可预测，人脑切进低能耗模式，文章张力消失
  > - 四条要求：一段一条线；对比也顺着走；中途少插话（只允许括号与 <br /> 两种中断）；并排给选项要挑对场合
  > - 自检：全文应是箭头链而非树；附广度／深度两种写法的对照例子
  > - 同步：§九 自检清单补一条；「多样性与节奏」中原有推进条目改为指路本节点


### Index

1. [src/学习与进步/学海计划/AGENTS.md](#f-3286787407-src-学习与进步-学海计划-agents-md-2114406525) `+22 / -1`

### Diffs

<a id="f-3286787407-src-学习与进步-学海计划-agents-md-2114406525"></a>
#### src/学习与进步/学海计划/AGENTS.md

<details>
<summary><code>+22 / -1</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/AGENTS.md" "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/AGENTS.md"
index b1cd11201..98c201df9 100644
--- "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/AGENTS.md"
+++ "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/AGENTS.md"
@@ -238,12 +238,32 @@ Astra 那一轮初稿最普遍的毛病不是句子，是**结构**：信息一
 - **长短句交错。** 手写稿的句长中位是 25 个汉字，平均 29，短句为主，长句是少数——但**它的长短是错落的**。连续三句都超过四十字就要拆；反过来，连着五六个短句也会读得发飘。
 - **句式换着来。** 「不是……而是……」「值得注意的是」「不难发现」「这意味着」这类句式，同一篇里出现一次就够。同一段里连着两句用同一句式，改掉一句。
 - **用词别回环。** 同一个意思不要反复用同一个词；同一个连接词不要承包全文（手写稿的「所以」84 次是分散在 37 篇里的，不是一篇里的密度）。
-- **推进方式也要多样。** 例子、数字、反例、边界、让步，轮着来；不要每段都用「提出判断—补一个限定」这同一种走法。
+- **推进方式也要多样。** 例子、数字、反例、边界、让步，轮着来；不要每段都用「提出判断—补一个限定」这同一种走法（细节见下一节「推进方式」）。
 
 **自检**：写完自己念一遍。发现连续几句长度一样、或者每个转折都靠同一个词起头，就是节奏平了，改到念得顺为止。
 
 **一句话判据**：**念到一半要停下来回一口气、或者得回头重排一遍句子，这句就太长了。** 长不是问题，「一口气读不完」才是。反过来，连着五六个短句也会读得发飘——那时候缺的不是停顿，是内容。念的时候要真出声，默读会自动替你把句子补顺，问题就漏掉了。
 
+### 推进方式：一条线走到底（硬性）
+
+人读东西时，脑子里只跑得动一条线。所以**不要同时抛出两个立场，让别人自己去比对**——尤其那个立场对方本来想不到的时候。他的注意力要先分配过去建一个新模型，再回头接上原来的线，接不回来就走神了。
+
+「不是 X，而是 Y」这类对仗句式是典型：它一句话里并排放了两条线。这类句式一多，抛出来的东西越来越多，眼睛还在读，人已经跟丢了。更要紧的是，**模式一旦可预测，人脑就切进低能耗模式**——就像每个笑点都落在预期之内，笑话就再也不好笑了。读者一放松，文章就白写。
+
+**要求：**
+
+1. **一段话只走一条线。** 先把一个点讲透，再转下一个；不要在同一段里来回横跳。
+2. **要对比，也顺着走。** 先讲 A，A 讲完了再讲 B；不要写「既是 A 又是 B」这种两头都够、两头都不到的句子。顺序推进（先……再……）和因果推进（所以……因为……），比并列堆叠更像人说话。
+3. **中途别插不重要的话。** 打岔是有代价的，回头那条线很难接。真要插（补一句数据、补一个反例），插完**在原处接回去**。文中只有两种中断是合理的：**括号**（补充、举例、自嘲，一眼看得出是旁注，读完自动回到原线）和 **`<br />` 分节**（换到新的一条线，读者知道前一条已经收尾）。除此之外，少用插入语。
+4. **同时给两个选项，要有明确理由。** 确认读者是站在岔路口（比如两条路都有人走、需要他选），才并排给出；否则一次只讲一条。
+
+**自检**：把全文画成一条箭头链（A→B→C→D），而不是一棵树（一段里分出三四根枝）。若某段同时抛出两个以上并列说法，或连续几段各抛几个，就是广度搜索，得改成一条线走到底。
+
+**例**（同一条信息，两种走法）：
+
+- 广度：「逻辑学要做的，其实是把一段话拆开，看它有没有在论证——判断对错反倒是之后的事。」读者一次接收两件事：不判断对错、要拆话。
+- 深度：「逻辑学先拆话：哪句是前提，哪句是结论，中间接不接得上。拆完才轮到判断对错。」先走完「拆话」，走到底了，才转到「判断对错」。
+
 ### AI 腔硬性禁表（绝对不得出现）
 
 以下表达**任何情况下都不许写进正文**，包括小标题、引语。写完先搜一遍，命中就改。
@@ -374,6 +394,7 @@ Astra 那一轮初稿最普遍的毛病不是句子，是**结构**：信息一
 - [ ] 通读一遍，没有「综上所述」「总而言之」「首先/其次/最后」「在当今社会」「随着……的发展」这类 AIGC 腔？
 - [ ] 搜过一遍「AI 腔硬性禁表」（第五节），一条都没命中？
 - [ ] 长短句交错，句式和连接词没有反复用同一套？
+- [ ] 全文是一条箭头链而不是一棵树——没有哪一段同时抛出两个以上并列说法？
 - [ ] 有具体例子、数字或算式，而不是空泛论断？
 - [ ] 结论留了边界，没有替读者站队、没有喊口号？
 - [ ] 没有编造任何数据、文献、引文与个人经历？

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-09 20:40:32 CMT (UTC+8) | 15b0bd73d）

### Summary

- Generated at: `2026-10-09 20:40:32 CMT (UTC+8)`
- Base commit: `15b0bd73d`
- Diff source: `8361c83fdef8239cb66ff09b5e14a9db50bdd07a..15b0bd73ddfe6569b1c13c6b8950adee94f83456`
- Changed files: `2`
- Total lines: `+0 / -42`

### Commit Messages

- `15b0bd73` chore: 移除流程测试文章及其目录条目

  > - 删除 生活碎笔/随笔随记/实用类随记/【AIGC人工校对】【流程测试】临时起意，不该变成别人的紧急任务.md
  > - 同步移除 src/SUMMARY.md 中对应的目录条目
  > - 该文为流程测试用途，不再保留


### Index

1. [src/SUMMARY.md](#f-152645477-src-summary-md-3501257646) `+0 / -1`
2. [src/生活碎笔/随笔随记/实用类随记/【AIGC人工校对】【流程测试】临时起意，不该变成别人的紧急任务.md](#f-152645477-src-生活碎笔-随笔随记-实用类随记-aigc人工校对-流程测试-临时起意-不该变成别人的紧急任务-md-1457062298) `+0 / -41`

### Diffs

<a id="f-152645477-src-summary-md-3501257646"></a>
#### src/SUMMARY.md

<details>
<summary><code>+0 / -1</code> Click to expand diff</summary>

~~~~~diff
diff --git a/src/SUMMARY.md b/src/SUMMARY.md
index cd7411c37..4bab201b7 100644
--- a/src/SUMMARY.md
+++ b/src/SUMMARY.md
@@ -277,7 +277,6 @@
     - [【AIGC人工校对】把问题说清楚，是求助者该做的那一半](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】把问题说清楚，是求助者该做的那一半.md)
     - [【AIGC人工校对】熟悉一个人，也要允许他改变](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】熟悉一个人，也要允许他改变.md)
     - [【AIGC人工校对】喜欢一件事，也可以只喜欢其中一小部分](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】喜欢一件事，也可以只喜欢其中一小部分.md)
-    - [【AIGC人工校对】【流程测试】临时起意，不该变成别人的紧急任务](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】【流程测试】临时起意，不该变成别人的紧急任务.md)
     - [【AIGC人工校对】选择伴侣，某种意义上是选择冲突处理方式](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】选择伴侣，某种意义上是选择冲突处理方式.md)
     - [【AIGC人工校对】选择困难在某些情况下，是不肯承担版本损失](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】选择困难在某些情况下，是不肯承担版本损失.md)
     - [【AIGC人工校对】签字从来都不是为了欣赏你的书法，而是为了锁定你的“代价”](生活碎笔/随笔随记/实用类随记/【AIGC人工校对】签字从来都不是为了欣赏你的书法，而是为了锁定你的“代价”.md)

~~~~~

</details>

<a id="f-152645477-src-生活碎笔-随笔随记-实用类随记-aigc人工校对-流程测试-临时起意-不该变成别人的紧急任务-md-1457062298"></a>
#### src/生活碎笔/随笔随记/实用类随记/【AIGC人工校对】【流程测试】临时起意，不该变成别人的紧急任务.md

<details>
<summary><code>+0 / -41</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\343\200\220\346\265\201\347\250\213\346\265\213\350\257\225\343\200\221\344\270\264\346\227\266\350\265\267\346\204\217\357\274\214\344\270\215\350\257\245\345\217\230\346\210\220\345\210\253\344\272\272\347\232\204\347\264\247\346\200\245\344\273\273\345\212\241.md" "b/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\343\200\220\346\265\201\347\250\213\346\265\213\350\257\225\343\200\221\344\270\264\346\227\266\350\265\267\346\204\217\357\274\214\344\270\215\350\257\245\345\217\230\346\210\220\345\210\253\344\272\272\347\232\204\347\264\247\346\200\245\344\273\273\345\212\241.md"
deleted file mode 100644
index fbcfd617e..000000000
--- "a/src/\347\224\237\346\264\273\347\242\216\347\254\224/\351\232\217\347\254\224\351\232\217\350\256\260/\345\256\236\347\224\250\347\261\273\351\232\217\350\256\260/\343\200\220AIGC\344\272\272\345\267\245\346\240\241\345\257\271\343\200\221\343\200\220\346\265\201\347\250\213\346\265\213\350\257\225\343\200\221\344\270\264\346\227\266\350\265\267\346\204\217\357\274\214\344\270\215\350\257\245\345\217\230\346\210\220\345\210\253\344\272\272\347\232\204\347\264\247\346\200\245\344\273\273\345\212\241.md"
+++ /dev/null
@@ -1,41 +0,0 @@
-# 【流程测试】临时起意，不该变成别人的紧急任务
-
-<!-- daily-essay-id: 2026-09-29 -->
-
-假设此处已经审阅。
-
-周六中午，有人忽然发来消息：“下午一起出去吧，开车两个小时就到。你今天应该没事？”这句话听起来很热情，甚至有点可爱。可收到消息的人也许刚洗好衣服，准备把一周没看完的书读完；也许什么都没安排，只想在沙发上坐着。这些事情没有写进日历，不代表它们可以被别人随手划掉。
-
-临时邀请当然可以发。让人难受的通常不是“临时”，而是邀请后面那句若隐若现的“你反正没事”。它把对方的空白时间当成了一块还没被认领的地，谁先开口谁就能占上去。
-
-## 没有安排，也是安排
-
-我们很容易承认别人有工作、有考试、有约会，却不太愿意承认别人只是想休息。前面几件事能说出具体名字，听上去像理由；休息说出口，似乎就成了“不愿意陪我”。
-
-但一个人决定下午不出门，可能正是因为这一周已经被各种事情切得太碎。他为自己留下几个小时，不一定要拿它完成什么了不起的目标。允许时间暂时没有用途，本身就是一种用途。
-
-“你又没事，来一下怎么了？”这句话的问题在于，它替别人判断了什么事才算事。对方若想拒绝，还得先证明自己的计划足够重要。明明是发出邀请的人想改变计划，最后却让被邀请的人承担解释和内疚的成本。
-
-一旦这种判断变成习惯，关系里就会出现一种奇怪的排序：看得见的忙总能优先，看不见的累永远可以往后挪。被挪动的人或许不会每次都争辩，但他会慢慢学会不告诉你自己什么时候有空。因为“有空”在这里不再是状态，而像一个随时会被征用的承诺。
-
-## 谁临时改变计划，谁先承担协调成本
-
-这种情况不只发生在朋友之间。周五快下班时，同事才说有个“很小的需求”，希望周一早上看到结果；项目开始前没说明要求，到最后一天突然说“我以为你知道”。需求或许真的很小，但它占用的是别人已经分配好的时间。
-
-临时起意的人通常只看见自己脑子里刚出现的任务。对方要挪开什么、向谁解释、是否得在路上处理，都不在他的视野里。于是一个人的随意，变成了另一个人的紧急。
-
-**着急可以坦白，着急不能自动变成命令。**如果时间由自己耽误了，至少应该把原因说清楚，给出真正的截止时间，也说明可以接受哪些替代方案。对方有余力帮忙，那是好意；没有余力，也不是欠了谁。
-
-## 让“可以拒绝”真的可以发生
-
-有时一句“没空也没关系”，说完之后却开始追问：“你到底忙什么？”或者沉默半天，让对方猜自己是不是生气了。这种邀请表面上留了出口，实际把出口堵得更窄。
-
-如果真想给对方选择，可以把话说得具体些：“我今天突然想去走走，下午三点出发；你要是想休息，我们下次提前约。”对方说不去，就停在这里。不要把一次拒绝解释成感情不够，也不要要求他交一份休息计划来证明自己有资格待在家里。
-
-当然，生活不能排成一张永不改动的表。有人遇到急事，朋友临时伸手帮一把；有人就在某个普通下午，喜欢一场说走就走的散步。临时相约的轻松感值得保留。关键是双方都能轻松地答应，也能轻松地拒绝。
-
-下次想临时找人做点什么，不妨先把“反正你没事”从嘴边拿掉。告诉对方你想做什么、什么时候、为什么现在提；然后把选择交还给他。尊重别人的时间，不需要把每一分钟都看成重大工程，只需要承认：那段时间属于他。
-
-南国微雪 Miyuki
-
-2026 年 9 月 29 日

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

<!-- LAST_UPDATED_ENTRY_START -->
## 更新记录（2026-10-09 20:35:40 CMT (UTC+8) | 8361c83fd）

### Summary

- Generated at: `2026-10-09 20:35:40 CMT (UTC+8)`
- Base commit: `8361c83fd`
- Diff source: `827f822069e3c3046842d35acc3b2f1020a4c422..8361c83fdef8239cb66ff09b5e14a9db50bdd07a`
- Changed files: `6`
- Total lines: `+245 / -138`

### Commit Messages

- `8361c83f` docs(学海计划): 补 AGENTS 篇幅/结构/禁表/节奏规范; 审校哲学总论 5 篇

  > 规范
  > - 篇幅：取消目标字数区间，改为只设下限；明确「罗嗦」是重复问题，不是字数问题
  > - 结构：新增「结构清晰」硬性要求（开篇交代分几块、每块领起、收尾给结论），手段不限并鼓励换用；并列例子建议用序号
  > - 禁表：新增 AI 腔硬性禁表（特定短语、承诺式套话、悬空修辞、干货感堆叠），并给出「不是…而是」的改写方式
  > - 节奏：新增多样性与节奏要求（长短句交错、句式换用、用词不回环），并补一句可操作判据
  > - 语料分级：明确【新增】稿只借结构不借语言；§八提交模板改为「压缩重复」
  >
  > 文稿（哲学/总论）
  > - 哲学的定义：修正酒吧例子与「三个关键词」数目不符；补回「一句话框死哲学」的判断句；压掉冗长句
  > - 总论：加 1./2./3. 序号与分节，与开头「三件事」对应
  > - 哲学第一性问题：把「在第一层里」改成能覆盖整块的领起，并加收束句
  > - 哲学的意义：补 1./2./3./4. 四点序号，删掉空头分层承诺
  > - 哲学的问题：三个例子加 1./2./3. 序号
  > - 五篇统一：拆长句、去论文腔连接与名词堆叠、修正旧写法加粗、补回被吃掉的段落空行


### Index

1. [src/学习与进步/学海计划/AGENTS.md](#f-3235963705-src-学习与进步-学海计划-agents-md-2114406525) `+119 / -22`
2. [src/学习与进步/学海计划/哲学/总论/【新增】哲学的意义.md](#f-3235963705-src-学习与进步-学海计划-哲学-总论-新增-哲学的意义-md-2483414172) `+23 / -19`
3. [src/学习与进步/学海计划/哲学/总论/【新增】哲学的问题.md](#f-3235963705-src-学习与进步-学海计划-哲学-总论-新增-哲学的问题-md-2385826117) `+25 / -23`
4. [src/学习与进步/学海计划/哲学/总论/【新增】哲学第一性问题.md](#f-3235963705-src-学习与进步-学海计划-哲学-总论-新增-哲学第一性问题-md-152759845) `+34 / -26`
5. [src/学习与进步/学海计划/哲学/总论/【新增】总论.md](#f-3235963705-src-学习与进步-学海计划-哲学-总论-新增-总论-md-1083514546) `+21 / -23`
6. [src/学习与进步/学海计划/哲学/总论/哲学的定义.md](#f-3235963705-src-学习与进步-学海计划-哲学-总论-哲学的定义-md-3456421386) `+23 / -25`

### Diffs

<a id="f-3235963705-src-学习与进步-学海计划-agents-md-2114406525"></a>
#### src/学习与进步/学海计划/AGENTS.md

<details>
<summary><code>+119 / -22</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/AGENTS.md" "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/AGENTS.md"
index 285f660e4..b1cd11201 100644
--- "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/AGENTS.md"
+++ "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/AGENTS.md"
@@ -38,10 +38,12 @@
 | 类别 | 特征 | 数量 | 用途 |
 | --- | --- | --- | --- |
 | **站主手写稿** | 文件名不带 `【新增】`，落款为 **2024 / 2025 年** | 37 篇 | **唯一风格基准**。文风、语气、语调、结构、思路一律以此为准 |
-| 站主已审阅的重写稿 | 不带 `【新增】`，落款为 2026 年 | 21 篇 | 目标形态参考 |
-| 已重写、待审阅草稿 | 带 `【新增】`，落款为 2026 年 | 741 篇 | 已完成一轮重写，可参考其成稿结构 |
+| 站主已审阅的重写稿 | 不带 `【新增】`，落款为 2026 年 | 21 篇 | 目标形态参考；**文风仍以手写稿为准**，它本身可能留有 AIGC 痕迹 |
+| 已重写、待审阅草稿 | 带 `【新增】`，落款为 2026 年 | 741 篇 | 只参考成稿结构，**不参考语言**，不得当作风格样本 |
 | 空壳草稿 | 带 `【新增】`，**无落款**，正文只有 `## 写在前面` 的几张图 | 约 2150 篇 | 待重写对象 |
 
+**语料分级只认两条线**：手写稿是唯一的语言基准；2024/2025 之外的稿件，无论看起来多顺，都只能借结构、不能借腔调——它们本身就是待清理的 AIGC 稿。若同分支已无手写稿可读，就读全库手写稿找语感，不要在 AIGC 稿之间互相校准。
+
 ### 硬性要求
 
 - **2024 / 2025 落款的 37 篇手写稿是唯一权威语料**（站主自述：这些是纯人工撰写，没有任何 AI 辅助）。写之前挑同领域 2–3 篇读一遍找语感，不要凭印象动笔。
@@ -54,12 +56,12 @@
 - 「综上所述」**0 次**，「总而言之」**0 次**，「值得一提」**0 次**，「首先……其次……最后……」结构仅 **1 次**（「最后」17 次多用于举例收尾，不是套路分段）。
 - 每篇问句数量中位数为 **0**，最多 4 处。也就是说，**站主手写稿极少用反问开场**，不靠「你有没有想过……？」这种钩子。
 - 每篇出现「我」（含「我们」）的中位数是 **1 次**；若只数第一人称单数「我」，中位数是 **0 次**，最多 7 次。也就是说：第一人称是点睛，不是主体，主语更多是「我们」「读者」「一个人」「普通人」。
-- 没有表格（0 处）、没有代码块（0 处）、没有 `###` 级小标题、没有 emoji。
+- 没有表格（0 处）、没有代码块（0 处）、没有 emoji。（**没有 `###` 小标题**——手写稿全靠段落推进。为求结构清晰，重写稿允许用 `###` 作分层标记，但那是新加的手段，别把它当成「手写稿也这么写」的依据。）
 
 ### 手写基准篇目（分领域）
 
 - **总纲**：`学海计划.md`
-- **哲学**：`哲学/总论/概述.md`、`哲学/总论/哲学的定义.md`、`哲学/总论/哲学的分支体系/` 下 7 篇
+- **哲学**：`哲学/总论/概述.md`
 - **心理学**：`心理学/普通心理学/…/精神分析学派（弗洛伊德）/精神分析学派（弗洛伊德）.md`
 - **经济学**：`经济学/概述及重要话题/` 下 4 篇、`经济学/宏观经济学/概述.md`
 - **金融学**：`金融学/个人实战与财富管理/` 下 16 篇（保险、理财基础、常见资产大类、基金投资全指南等）
@@ -128,6 +130,7 @@
    - **不得凭空编造贡献者、引文、书目、数据。**
 7. **正文内部的过渡**：可用顶格的 `<br />` 分节（手写稿每篇中位 1 处，最多 10 处），但不要拿它替代正常的段落推进。
 8. **不要使用 `###` 及更深的小标题**，也不要用表格、代码块、emoji、外链图片。
+   - **例外**：篇幅较长、内容确实分层时，可用 `###` 只作**分层标记**（每层一个，见第五节「结构清晰」）；不要逐段加标题，也不要在一篇里既用小标题又用加粗领起句，两种混着来反而更乱。
 
 ---
 
@@ -193,22 +196,110 @@
 4. **跨学科引用是加分项**：用经济学讲保险杠杆，用心理学讲人际，用生物学讲药理，用文学讲写作。但引完要回到主题，不能停在炫技。
 5. **不制造焦虑、不喊口号、不做道德审判**；不用「必须」「一定要」这类强命令，除非是安全提示。
 
----
+### 结构清晰（硬性）
+
+Astra 那一轮初稿最普遍的毛病不是句子，是**结构**：信息一条条都对，读完却不知道看了些什么。这一节只管一件事——**让读者一眼看出文章分几块、每块在讲什么**。用什么手段不管，看效果。（道理和数学证明一样：过程排得清楚，读者才跟得上；乱糟糟一团，再对也没人愿意读。）
+
+**三条要求：**
+
+1. **开篇让读者知道这篇要讲哪几块。** 可以是路线图（「往下分三层：……」），也可以第一段就把主张说清、由主张带出下文。别让读者读到中段才知道你在讲什么。
+2. **每块的领起要能看出来。** 一层讲完、新的一层开始，读者要能察觉；同一层的意思不要散在文章各处反复出现（前边说、中间说、结尾又说，就是串场）。
+3. **收尾要能一句话说清结论。** 读者读完能回答「所以呢」。
+
+**手段不限，以下都可以，也鼓励换着用：**
+
+- 一句**路线图**（「往下分三层：……」）
+- 给每层加**小标题**（`###`；短篇也可用加粗领起句代替）
+- 用**问句**领起（像《哲学的定义》那样：「什么叫『系统追问』？」）
+- 用**序号**（「一，……二，……」，站主手写稿里本就有这种用法）
+- **篇幅长、或正文里有几个并列的例子时，用序号把它们分开**。格式照《基金种类》：`　　1. 先看时间。`（两个全角空格 ＋ 阿拉伯数字 ＋ 半角句点 ＋ 一个半角空格），子级写 `1.1.`。并列项一多，读者不数一遍就找不到自己在第几块——别让他自己重排。
+- 用**对比或例子**直接切入（先给一个场景，再展开）
+- 用 `<br />` **分节**，把大块隔开
+- 每层以**一句陈述句**开头，直接点明这一层讲什么
+- 沿**一条时间线或因果链**推进，让顺序本身就是结构
+- 用**比喻**搭骨架（如「像三层楼」）
+
+**要避免的只有两件事：**
+
+- **不要循规蹈矩。** 文章很多，这篇用路线图，下篇就换问句或序号。每篇都套同一个骨架，就算清晰，也看得出是同一个模子刻的——**换着用，才有活人感**。
+- **不要用手段掩盖空结构。** 加了小标题却没有对应的内容层次，路线图承诺了三块、正文只有两块，比不加更糟。
+
+**自检**：通读一遍，然后回答——这篇分几块？每块在讲什么？结论是什么？答得出来就是结构清晰；答不出来，加什么手段都没用。
+
+### 多样性与节奏（软性）
+
+衡量文本活不活，看两个指标。
+
+- **多样性**：用词和句式有多丰富、有多难预测。词汇越单一、句式越重复，越容易被一眼认出是模板。
+- **节奏感**：句子长度和句式的波动幅度。全是长句、或者每句都差不多长，读起来像念稿。
+
+**要求：**
+
+- **长短句交错。** 手写稿的句长中位是 25 个汉字，平均 29，短句为主，长句是少数——但**它的长短是错落的**。连续三句都超过四十字就要拆；反过来，连着五六个短句也会读得发飘。
+- **句式换着来。** 「不是……而是……」「值得注意的是」「不难发现」「这意味着」这类句式，同一篇里出现一次就够。同一段里连着两句用同一句式，改掉一句。
+- **用词别回环。** 同一个意思不要反复用同一个词；同一个连接词不要承包全文（手写稿的「所以」84 次是分散在 37 篇里的，不是一篇里的密度）。
+- **推进方式也要多样。** 例子、数字、反例、边界、让步，轮着来；不要每段都用「提出判断—补一个限定」这同一种走法。
+
+**自检**：写完自己念一遍。发现连续几句长度一样、或者每个转折都靠同一个词起头，就是节奏平了，改到念得顺为止。
 
-## 六、字数分档（重写稿的硬性下限）
+**一句话判据**：**念到一半要停下来回一口气、或者得回头重排一遍句子，这句就太长了。** 长不是问题，「一口气读不完」才是。反过来，连着五六个短句也会读得发飘——那时候缺的不是停顿，是内容。念的时候要真出声，默读会自动替你把句子补顺，问题就漏掉了。
+
+### AI 腔硬性禁表（绝对不得出现）
+
+以下表达**任何情况下都不许写进正文**，包括小标题、引语。写完先搜一遍，命中就改。
+
+**一、特定短语**
+
+- 「不是 X，是 Y」「不是 X，而是 Y」（本节下方的说明优先于别处的一切建议）
+- 「你太懂了」
+- 「稳稳接住你」
+- 堆砌形容词，如「我这就用最直白、最不绕弯子、最有逻辑性的方式说清楚」
+
+**二、承诺式与宣言式套话**
+
+- 开场白式的「我不是要……而是要……」「不是为了……而是基于……」「不是简单的……而是深刻的……」
+- 「我这就用最 XX 的方式给你解释／说明／拆解」
+- 「保证你一听就懂」「一听就懂」
+- 「最直白」「最不绕弯子」「掰开了揉碎了」
+- 「深度拆解」「底层逻辑」
+- 「通往……的黄金钥匙」
+- 「这不仅仅……更……」
+
+**三、悬空修辞与通货膨胀的比喻**
+
+- 「达摩克利斯之剑」「历史的十字路口」「人性贪婪的深渊凝视」
+- 「一场……的博弈」「一次对……的凝视」
+- 用「危言耸听」这类贩卖焦虑的大词给段落开场
+
+**四、强迫式干货感连词堆叠**
+
+- 「今天我必须要把这个事情给大家说清楚」
+- 「我们把这个概念……」
+- 「知道了……就拥有了……」
+
+**关于「不是 X，而是 Y」怎么改**：它被硬禁，但句子里承载的信息不能丢（可能是纠正一个真实误解，也可能两半都有实义）。改法是把话说直：
+
+- 说「先做什么，判断对错是之后的事」，而不要写「不是判断对错，而是先拆话」。
+- 说「错误发生在保存阶段」，而不要写「不在上传阶段，而在保存阶段」。
+- 实在需要保留对比时，把否定半句放到后面、单独成句：「重点在保存阶段。上传阶段没有出错。」
+
+**登记**：正文里出现禁表之外的 AI 腔（上方反面教材里的其它写法，或新见到的套话），在 `## 贡献者` 之前用一行注明，不写进正文。
+
+---
 
-栏目最早声明「字数约三百以上一千以下」，实际执行中，经站主审阅的重写稿明显加长。沿用上一轮重写（哲学板块）确立的分档：
+## 六、字数与篇幅（只设下限）
 
-| 稿件层级 | 例子 | 目标汉字数 |
+| 稿件层级 | 例子 | 建议下限 |
 | --- | --- | --- |
-| 学科总览 / 总论级 | `哲学/哲学/哲学.md`、`哲学/总论/哲学的定义.md` | 1500–2200 |
-| 分支 / 篇级（学科下第一层） | `认识论`、`法哲学`、`自由意志` | 1200–1600 |
-| 话题 / 子领域级 | `道德哲学`、`义务论`、`保险概述` | 1000–1400 |
-| 具体条目（人物、理论、概念） | `亚里士多德`、`周期性失业`、`家财险` | 800–1100 |
+| 学科总览 / 总论级 | `哲学/哲学/哲学.md`、`哲学/总论/哲学的定义.md` | 1200 |
+| 分支 / 篇级（学科下第一层） | `认识论`、`法哲学`、`自由意志` | 1000 |
+| 话题 / 子领域级 | `道德哲学`、`义务论`、`保险概述` | 900 |
+| 具体条目（人物、理论、概念） | `亚里士多德`、`周期性失业`、`家财险` | 800 |
 
 - **所有稿件的硬性下限：800 个汉字**（不含 Markdown 标记与图片链接）。低于 800 字的稿件视为未完成，必须补足。
-- 上限不是硬约束，但**不要为了凑字数注水**：信息密度优先，宁可 900 字句句有用，也不要 2000 字车轱辘话。
-- 「补足」指的是补内容（多一个例子、多一层拆解、多一个反例），不是加一段空泛总结。
+- 上表只是下限，**没有上限，也不设目标字数**。写多长取决于内容：把该讲的讲清楚就收，多出来的字数只有两种来源——新的例子或新的机制，否则一律删掉。
+- **「罗嗦」不是字数问题，而是重复问题。** 同一层意思在一篇里说两遍，或每提出一个限定再解释一遍这个限定本身，都算不合格——删到只剩一遍。
+- 「补足」指的是补内容（多一个例子、多一层拆解、多一个反例），不是加一段空泛总结，也不是把一句话拆成两句。
 
 ---
 
@@ -221,10 +312,11 @@
    - `## 写在前面` 的全部图片链接；
    - `## 封面图` 的图片链接。
 3. **补全骨架**：空壳草稿通常只有 `## 写在前面`。按第三节的骨架补齐标题（若缺）、`## 正文`、`本文讨论：……`、正文、落款、封面图。
-4. **写正文**：按第四、五、六节的要求写。内容要对得起标题，例子、数字、机制、边界一个都不少。
-5. **`【新增】` 前缀保留，不要重命名、不要移动文件。** 该前缀的含义是「AIGC 供稿、尚未经站主人工审阅」；去前缀是站主审阅之后的动作，agent 不要代劳。
-6. **一次只改一篇文件**；不要顺手改动同目录的其它文章，也不要格式化无关文件。
-7. **不要动 `src/SUMMARY.md`**：学海计划整块目录目前处于注释状态（见下节），新增或重写文章都不需要（也不应该）改它。
+4. **写正文**：按第四、五、六节的要求写。内容要对得起标题，例子、数字、机制、边界一个都不少；篇幅由内容决定，把该讲的讲清楚就收，不设字数目标。
+5. **写完后先验结构再交稿**：给文章列一个骨架（分几层、每层一句中心句），逐条确认每层的例子和边界都在它自己那一层里，没有串到别层去。结构不过关就不要交。
+6. **`【新增】` 前缀保留，不要重命名、不要移动文件。** 该前缀的含义是「AIGC 供稿、尚未经站主人工审阅」；去前缀是站主审阅之后的动作，agent 不要代劳。
+7. **一次只改一篇文件**；不要顺手改动同目录的其它文章，也不要格式化无关文件。
+8. **不要动 `src/SUMMARY.md`**：学海计划整块目录目前处于注释状态（见下节），新增或重写文章都不需要（也不应该）改它。
 
 ---
 
@@ -241,8 +333,8 @@
 1. 在博客仓库根目录（`/Users/snow/homelab/projects/TinySnowBlog`）操作，**先用 `git status` 确认改动只落在 `src/学习与进步/学海计划/` 内**。
 2. **先拉取**：`git pull`（等价于 `./autopush.sh` 的第一步）。
 3. **暂存与提交**：只 `git add` 本次实际改动的文件（不要用 `git add .` 把无关改动一起带上）。提交信息用中文，禁止使用转义字符转义。
-   - 首行格式：`refactor(学海计划/<学科>): 重写<子领域> N 篇, 去除 AIGC 模板并补足篇幅`
-   - 正文分点说明：改了哪些文件、改了什么、为什么（例如「补足 800 字下限」「去掉摘要腔开场」「统一加粗空格」）。
+   - 首行格式：`refactor(学海计划/<学科>): 重写<子领域> N 篇, 去除 AIGC 模板并压缩重复`（若确为补足低于下限的稿件，写「补足篇幅」）
+   - 正文分点说明：改了哪些文件、改了什么、为什么（例如「删去重复的限定说明」「去掉摘要腔开场」「统一加粗空格」）。
    - 参考历史提交：`refactor(学海计划/哲学): 重写真实与实在/哲学的应用 37 篇; 微调形而上学`
 4. **推送**：
    - 标准入口：`./autopush.sh "<提交信息>"`（内部依次执行 `git pull` → `git add .` → `git commit` → `git push origin` → `git push gitlink master`）。
@@ -272,11 +364,16 @@
 - [ ] 每个自然段都以两个全角空格 `　　` 开头？
 - [ ] 加粗是 ` **……** `（两侧留空格），没有 `　　**……**` 这种被勘误过的写法？
 - [ ] 划线强调写成 `<u> **……** </u>`？
-- [ ] 没有 `###`、表格、代码块、emoji、额外 HTML 标签？
+- [ ] 没有表格、代码块、emoji、额外 HTML 标签（`###` 只作分层标记可用，见第三、五节）？
 - [ ] 引号成对、全角标点、中英文之间留空格、日期格式为 `YYYY 年 M 月 D 日`？
 - [ ] 落款为 `　　南国微雪 Miyuki` + 空行 + 当天日期，`<br />` 顶格？
-- [ ] 汉字数达到分档下限（最少 800）？
+- [ ] 汉字数达到该层级下限（任何稿件都不低于 800）？
+- [ ] 同一层意思没有在一篇里说两遍（每个限定不需要再解释一遍）？
+- [ ] 通读后能用一句话说出「这篇讲的是什么、结论是什么」？
+- [ ] 通读后能说出这篇分几块、每块在讲什么，且各层不互相串场（本篇用的分层手段与同分支其它篇不必相同）？
 - [ ] 通读一遍，没有「综上所述」「总而言之」「首先/其次/最后」「在当今社会」「随着……的发展」这类 AIGC 腔？
+- [ ] 搜过一遍「AI 腔硬性禁表」（第五节），一条都没命中？
+- [ ] 长短句交错，句式和连接词没有反复用同一套？
 - [ ] 有具体例子、数字或算式，而不是空泛论断？
 - [ ] 结论留了边界，没有替读者站队、没有喊口号？
 - [ ] 没有编造任何数据、文献、引文与个人经历？

~~~~~

</details>

<a id="f-3235963705-src-学习与进步-学海计划-哲学-总论-新增-哲学的意义-md-2483414172"></a>
#### src/学习与进步/学海计划/哲学/总论/【新增】哲学的意义.md

<details>
<summary><code>+23 / -19</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\232\204\346\204\217\344\271\211.md" "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\232\204\346\204\217\344\271\211.md"
index 1bf5fbf0a..850007e7e 100644
--- "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\232\204\346\204\217\344\271\211.md"
+++ "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\232\204\346\204\217\344\271\211.md"
@@ -10,9 +10,11 @@
 
 　　本文讨论：哲学-总论-哲学的意义。
 
-　　 **哲学的一项实际价值，是把判断背后的标准和理由讲清楚。** 当几种选择各有得失，仅仅知道更多事实，还不足以决定哪一种更值得选。
+　　 **哲学的一项实际价值，是把判断背后的标准和理由讲清楚。** 当几种选择各有得失，仅仅知道更多事实，还不足以决定哪一种更值得选。这种价值不止一项，下面分四点说。
 
-　　来看一个假设的例子。两份工作的内容、工时等条件相同，税后月收入分别为 6000 元和 8000 元。但收入较高的那份，每天往返通勤多花 2 小时。有人说，收入高的当然更好。
+　　1. 先看它怎么把标准讲清楚。
+
+　　两份工作的内容、工时等条件相同，税后月收入分别为 6000 元和 8000 元。但收入较高的那份，每天往返通勤多花 2 小时。有人说，收入高的当然更好。
 
 　　按每月工作 22 天算，多出的通勤时间为 2 × 22 = 44 小时。每月多得 2000 元，同时多占用 44 小时。至于交通费、通勤疲劳等，暂时还没有算进去。
 
@@ -20,19 +22,11 @@
 
 　　原来那句“收入高的当然更好”，其实把收入当成了决定性的标准。如果双方对“好工作”的理解不同，继续比较工资，也未必能使意见一致。
 
-　　哲学能从这里继续追问：收入为何重要，闲暇为何重要，一个人的生活是否只用一种标准衡量。把所看重的东西及其理由说出来，才有可能发现，有些目标彼此冲突，有些目标只是实现其他目标的手段。
+　　哲学能从这里继续追问：收入为什么重要，闲暇为什么重要，一个人的生活是否只用一把尺子量。把看重的东西和理由说出来，才可能发现：有些目标互相冲突，有些目标只是实现别的手段。
 
 　　比如，努力挣钱是为了让家人生活得更好，但长时间通勤又可能减少陪伴。两者都出自对家人的关心，仍然需要取舍。**有取舍，不等于其中一个目标毫无价值。** 选择了收入较高的一份，也可以承认失去的时间确实可惜。
 
-　　当然，这种讨论不能凭空增加工作机会。只有一份工作可选时，处境与两份都能选的人不同。评价一个选择，需要了解当事人的条件，不能看到结果不理想，就认定他“没有想明白”。
-
-　　<u> **弄清选择的理由，能帮助人看见得失；它不能保证所有值得追求的东西都能同时得到。** </u>
-
-　　所以，哲学与具体知识有相互补充的地方。收入和工时需要核实，家庭安排需要沟通；哲学讨论则可以帮助检查，采用的标准是否合理，理由是否足以支持结论。只谈价值而不了解实际条件，也容易作出不切实际的判断。
-
-<br />
-
-　　哲学还有一项作用，是让人有机会重新理解与自己不同的主张。
+　　2. 再看它怎么帮你理解不同的主张。
 
 　　比如，一个读书小组在选书。多数人希望一直读容易理解的作品，少数人想偶尔读较难的书。前者关心参与门槛，后者关心接触陌生观点，两种考虑都有可以说明的理由。
 
@@ -40,27 +34,37 @@
 
 　　哲学中的论证练习，可以要求一个人先把反对意见讲准确，再说明自己为什么不接受。**理解对方的理由，不要求赞同对方的结论。** 双方可能仍然选不出同一本书，但至少知道了意见不同的原因，也有机会讨论轮流选书等安排。
 
-　　注意，这些本领也可以从工作、科学研究和日常交往中学到。哲学的特点，是把概念、理由和评价标准本身拿出来反复考察。它提供了一种系统练习的机会，至于练习能否用在生活中，还要看具体做法。
+　　3. 这一层还要用回自己身上。
 
-　　而且，要求别人给理由，也意味着自己的主张要接受同样的检查。如果别人选容易的书就是懒惰，自己选容易的书却叫放松，那么两次判断之间就缺少解释。情况确有不同，可以说明不同之处；仅仅更换了当事人，还不足以支持两套标准。
+　　要求别人给理由，也意味着自己的主张要接受同样的检查。如果别人选容易的书就是懒惰，自己选容易的书却叫放松，简而言之双标嘛，这种情况是不合理的：情况确有不同，可以说明不同之处；仅仅更换了当事人，并不构成坚持两套标准的理由。
 
 　　 **哲学讨论中的批评，也包括修正自己的判断。** 找到对方的一处错误，并不自动证明自己的主张正确。反驳一个理由，只说明这个理由有问题，对方还可能有其他理由。
 
-　　这也是为什么，不能把学习哲学的意义说成“以后就不会受骗”。熟悉概念和论证，不代表掌握了所有领域的知识；一个人也可能很擅长替自己的偏好寻找说辞。讨论涉及的事实，仍需要查证。
+　　4. 最后，理解本身也可以是目的。
 
-　　再往前一步，**理解本身，也可以是读哲学的目的。** 就像有人愿意花一个下午欣赏音乐，有人也愿意花时间理解自由、知识或美，未必需要先证明这件事能增加收入。
+　　就像有人愿意花一个下午欣赏音乐，有人也愿意花时间理解自由、知识或美，未必需要先证明这件事能增加收入。
 
 　　例如，看到两个人对同一幅画评价相反，有人会继续追问：审美只是各自喜欢，还是存在可以共同讨论的理由。这个问题即使暂时没有结论，也可能使人开始留意构图、表现方式、观看经验等差别，重新看见原先忽略的内容。
 
 　　哲学中的一些问题还会改变人对日常经验的理解。一个人可以很确定自己记得某件事，后来发现记忆有误。由此追问“确信”与“知道”的差别，便是在检查自己过去使用的判断标准。理解加深，不一定表现为立刻解决一项工作任务。
 
-　　这种求知的满足，可以成为一部分人学习哲学的理由。但不能据此要求所有人都喜欢哲学，更不能把是否读过哲学书，当成衡量一个人生活是否有价值的标准。有人把有限的时间用于照顾家人、钻研手艺，同样有可以说明的理由。
+<br />
+
+　　上面的作用都有边界，也不是每个人都需要它。哲学讨论不能凭空增加工作机会。只有一份工作可选时，处境与两份都能选的人不同。评价一个选择，需要了解当事人的条件，不能看到结果不理想，就认定他“没有想明白”。
+
+　　哲学和具体知识互相补充。收入和工时靠核实，家庭安排靠沟通；哲学能帮着检查：采用的标准合不合理，理由够不够支持结论。只听价值、不问实际条件，也容易下不切实际的判断。
+
+　　而且，这些本领也可以从工作、科学研究和日常交往中学到。哲学的特点，是把概念、理由和评价标准本身拿出来反复考察。它提供了一种系统练习的机会，至于练习能否用在生活中，还要看具体做法。
+
+　　不过，不能把学习哲学的意义说成“以后就不会受骗”。熟悉概念和论证，不代表掌握了所有领域的知识；一个人也可能很擅长替自己的偏好寻找说辞。讨论涉及的事实，仍需要查证。
+
+　　这种求知的满足，本来就是一部分人读哲学的理由。但不能据此要求所有人都喜欢哲学，更不能把读没读过哲学书，当成衡量生活价值的标准。有人把有限的时间花在照顾家人、钻研手艺上，理由一样说得通。
 
 　　思考也有成本。有些问题需要长期讨论，有些决定却不能无限推迟。遇到后者，可以依据当前掌握的事实和理由作出暂时判断，同时说明还不确定的地方。承认可能出错，仍然允许行动。
 
-　　学海计划在这里给出的，只是理解哲学意义的几个角度，仅供参考。它可以帮助厘清标准、检查理由、理解不同主张，也可以满足求知的兴趣；是否值得投入时间，取决于读者关心的问题和实际收获。
+　　<u> **弄清选择的理由，能帮助人看见得失；它不能保证所有值得追求的东西都能同时得到。** </u>
 
-　　<u> **读完一篇哲学文章，可以检查自己是否看清了一个原先含糊的概念，或能为原来的判断补充、修正一条理由。** </u> 如果只是多记住几个流派名称，尚不能说明这些内容已经帮助自己理解了问题。
+　　<u> **读完一篇哲学文章，可以回头看看：有没有哪个原先含糊的概念被看清了，或者哪条判断能补上、改掉一个理由。** </u> 如果只是多记住几个流派名称，还不算真读懂了。
 
 <br />
 

~~~~~

</details>

<a id="f-3235963705-src-学习与进步-学海计划-哲学-总论-新增-哲学的问题-md-2385826117"></a>
#### src/学习与进步/学海计划/哲学/总论/【新增】哲学的问题.md

<details>
<summary><code>+25 / -23</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\232\204\351\227\256\351\242\230.md" "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\232\204\351\227\256\351\242\230.md"
index d85949511..ea95b706e 100644
--- "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\232\204\351\227\256\351\242\230.md"
+++ "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\232\204\351\227\256\351\242\230.md"
@@ -10,55 +10,57 @@
 
 　　本文讨论：哲学-总论-哲学的问题。
 
-　　 **哲学问题的一个常见特点，是连回答问题时所用的概念、依据和标准，也一起接受检查。** 有些日常问题往下追问，就会进入哲学的讨论范围。
+　　<u> **哲学问题的一个常见特点，是连回答问题时所用的概念、依据和标准，也一起接受检查。** </u> 下面三个例子都会走到这一步。
 
-　　比如，问现在几点，看钟通常就够了。假设一只钟昨天早上 8 点停了，一个人不知道它已停走，恰好在今天早上 8 点看钟，判断“现在是 8 点”。他的判断碰巧正确。
+　　1. 先看时间。问“现在几点”，看钟通常就够了；但如果钟停了，情况就不同。假设一只钟昨天早上 8 点停了，一个人不知道它已经停了，但是恰好在今天早上 8 点看钟，判断“现在是 8 点”。他的判断碰巧正确。
 
-　　问题在于，仅凭这只停钟得到正确答案，能不能算他“知道”时间？如果早看或晚看 10 分钟，同样的方法就会给出错误答案。他这次说对了，依靠的是巧合。
+　　问题在于，靠这只停钟得到正确答案，能不能算他“知道”时间？如果早看或晚看 10 分钟，同样的方法就会给出错误答案——他这次说对了，靠的是巧合。
 
-　　这个例子要检查的，是 **“相信的事情恰好为真”与“知道”之间的差别**。对答案是否正确的检查，还不足以说明一个人怎样获得知识。（停钟例子可参见[斯坦福哲学百科对知识的讨论](https://plato.stanford.edu/archives/Win2023/Entries/apriori/)。）
+　　这个例子要检查的，是 **“相信的事情恰好为真”与“知道”之间的差别**。答案碰巧对了，不等于知道。（停钟例子可参见[斯坦福哲学百科对知识的讨论](https://plato.stanford.edu/archives/Win2023/Entries/apriori/)。）
 
-　　把钟修好，可以解决读时的问题。但要解释为什么可靠的钟与停钟有区别，还需要讨论判断的依据、形成过程与事实之间的关系。这就进入了研究知识及其根据的 **认识论**。
+　　把钟修好，可以解决读时的问题；但要解释为什么可靠的钟与停钟有区别，还需要讨论判断的依据、形成过程与事实之间的关系。这就进入了研究知识及其根据的 **认识论**。
 
-　　再来看另一个假设。有人骑一辆自行车，坏了轮胎就换轮胎，坏了链条就换链条。几年之后，所有零件都换过了。车主仍把它称为原来那辆车。
+　　2. 再换到事物。有人骑一辆自行车，坏了轮胎就换轮胎，坏了链条就换链条。几年之后，所有零件都换过了，车主仍把它称为原来那辆车。
 
-　　如果维修工把留下来的旧零件修复后，重新装出一辆车，两辆车便分别具有不同的联系：一辆延续了使用和维修的过程，另一辆保留了原来的材料。
+　　如果维修工把旧零件修复后重新装出一辆车，两辆车就有了不同的联系：一辆延续了使用和维修的过程，另一辆保留了原来的材料。
 
-　　零件清单能够说明材料去了哪里，维修记录能够说明更换过程。但“怎样才算同一辆车”，还需要交代判断标准。仅仅说两辆车很像，也不够；两辆同时出厂的新车可以很像，却显然是两辆。
+　　零件清单能说明材料去了哪里，维修记录能说明更换过程。但“怎样才算同一辆车”，还需要交代判断标准。仅仅说两辆车很像，也不够——两辆同时出厂的新车可以很像，却显然是两辆。
 
-　　哲学里，把一个事物是否仍是原来那个事物的问题，称为 **同一性问题**。研究事物的存在方式及世界基本结构的分支，叫作形而上学，这类问题属于它的一部分。事物如何在变化中延续，具体有哪些解释，会在相应分支里展开。
+　　哲学里，把一个事物还是不是原来那个事物的问题，称为 **同一性问题**；研究事物怎么存在、世界的基本结构是什么，属于形而上学，这类问题也算它的一部分。事物在变化中怎么延续、有哪些解释，会在相应分支里展开。
 
-　　再换到行动上。假设一个人答应周末帮朋友搬家，后来有人邀请他参加聚会。他很想去聚会，但也知道朋友已经按约定安排好了搬运。
+　　3. 最后换到行动。假设一个人答应周末帮朋友搬家，后来有人邀请他参加聚会。他很想去聚会，但也知道朋友已经按约定安排好了搬运。
 
 　　“他想做什么”可以通过询问得知；“他应当怎么做”，则需要讨论承诺、朋友的期待、改变安排的后果等。说明聚会更有趣，只交代了吸引他的原因，还没有充分回应守约的理由。
 
 　　进一步追问承诺为什么能使人承担义务，以及出现哪些情况时可以调整约定，就进入了 **伦理学**。不同主张可能看重承诺本身，也可能看重信任和行为后果；具体解释需要分别论证。
 
-　　这几个例子分别涉及知识、事物的延续和行动的标准。哲学还讨论因果、自由、美、语言和意义等问题。它们的共同之处，是一些平时直接使用的概念和判断依据，此时成了需要解释的对象。
-
-　　<u> **哲学提问会把“凭什么这样判断”也放进讨论里。即使双方同意事情经过，对概念和标准仍然可能有分歧。** </u>
+　　这三个例子分别涉及知识、事物的延续和行动的标准，共同点是：**一些平时直接使用的概念和判断依据，此时成了需要解释的对象。即使双方同意事情经过，对概念和标准仍然可能有分歧。** 哲学还讨论因果、自由、美、语言和意义等问题，走的是同一条路。
 
 <br />
 
-　　不过，不能因此说哲学高于其他学科，也不能说其他学科只收集事实、从不检查前提。科学研究同样需要界定概念、修正模型，日常讨论也可以认真检验理由。它们与哲学之间有交叉。
+　　科学研究同样需要界定概念、修正模型，日常讨论也可以认真检验理由。它们与哲学之间有交叉，只是分工不同。
+
+　　哲学也会借助经验研究。有些研究通过问卷或实验，检查人们对责任、知识等问题究竟怎样判断，再用结果检验哲学论证中的经验假设。这类做法属于[实验哲学](https://plato.stanford.edu/entries/experimental-philosophy/)的研究范围。
 
-　　哲学也会使用经验研究。例如，有些研究通过问卷或实验，检查人们对责任、知识等问题究竟怎样判断，再用结果检验哲学论证中的经验假设。这类做法属于[实验哲学](https://plato.stanford.edu/entries/experimental-philosophy/)的研究范围。
+　　但经验研究能走多远，也要看清楚。 **一个实验能说明什么，取决于它检验了什么。** 调查若发现 100 人中有 80 人认可某种做法，只能说明这批受访者里有 80% 点了头；这些人能不能代表更大的人群，要看取样；多数人认可等不等于正当，更得另说。
 
-　　 **实验能支持什么结论，要看实验检验了什么。** 调查若发现 100 人中有 80 人认可某种做法，只能直接说明这批受访者的回答比例为 80%。这些人是否代表更大的人群，需要检查取样；这种做法是否正当，还需要说明赞同人数为何能支持正当性判断。
+　　反过来，难回答的问题也未必是哲学问题。一把钥匙丢了，一时找不到，可能只是没线索。问题算不算哲学，不取决于它眼下有没有答案。
 
-　　哲学问题的困难，常常就在这些连接处。资料本身可能不足，也可能是双方对资料意味着什么有不同理解。靠想象补出事实不可靠，把统计结果直接当成价值结论，也可能漏掉关键的理由。
+　　还有一种情况：问法本身就藏着没检查过的前提。比如“你为什么从不守约”这一问，已经认定对方从不守约；要讨论原因，先核实一下是不是这样。否则，任何回答都可能顺带认下这个并不成立的说法（其实这都不涉及讨论了，直接上升到人身攻击了，在这种情况下讨论什么都是没有用的）。
+
+<br />
 
-　　另一方面，**难回答的问题，未必就是哲学问题**。一把钥匙丢在什么地方，暂时找不到，可能只是缺少线索。问题是否属于哲学，不能仅凭它有没有现成答案判断。
+　　哲学问题真正的困难，往往就在这些连接处：资料本身可能不足，双方也可能对资料意味着什么有不同理解。靠想象补出事实不可靠，把统计结果直接当成价值结论，也可能漏掉关键的理由。
 
-　　有些问法还藏着未经检查的前提。比如“你为什么从不守约”，已经假定了对方从不守约。讨论原因之前，可以先核实是否如此。否则，任何回答都可能顺带接受一个并不成立的判断。
+　　那么，遇到一个哲学问题，可以怎么推进？先缩小它。
 
-　　但发现前提有问题，也不意味着所有难题都能靠改写句子解决。停钟例子里的情境完全可以讲清楚，“碰巧正确”与“知道”如何区分，仍然需要继续讨论。**澄清问题，是推进讨论的一步。** 后面还要提出理由，检查反例。
+　　明确所讨论的情境，说明关键词的含义，再找出真正有分歧的那一步。不同情境可能需要不同分析，本文的几个例子只供入门参考。
 
-　　哲学中的一些问题长期存在争议，原因也不只有一种。有时是证据不足，有时是前提不同，有时是几种解释各自解决了一部分问题，又遇到了新的困难。不能因为没有统一答案，就认定所有答案同样可靠。
+　　别指望靠改写句子解决所有难题。停钟例子的情境完全可以讲清楚，但“碰巧正确”与“知道”如何区分，仍然需要继续讨论。**澄清问题，是推进讨论的一步。** 后面还要提出理由，检查反例。
 
-　　例如，若有人主张“只要相信的事情是真的，就是知识”，停钟便提供了一个需要回应的案例。即使暂时给不出完整的知识定义，也可以看见这个说法遗漏了判断与事实相符的方式。 **提出一个有力的反例**，同样能使讨论取得进展。
+　　反例未必能给出完整答案，却常能推动讨论。若有人主张“只要相信的事情是真的，就是知识”，停钟就是一个需要回应的案例；即使暂时给不出完整的知识定义，也能看出这个说法遗漏了判断与事实相符的方式。 **提出一个有力的反例**，同样能使讨论取得进展。
 
-　　所以，读到哲学问题时，可以把原来的大问题缩小一些：明确所讨论的情境，说明关键词的含义，再找出真正有分歧的那一步。不同情境可能需要不同分析，本文的几个例子只供入门参考。
+　　这也是哲学问题长期存在争议的原因之一。有时是证据不足，有时是前提不同，有时是几种解释各自解决了一部分问题，又碰上新的困难。没有统一答案，不等于所有答案一样可靠。
 
 　　<u> **开始争论之前，先说清要回答什么，以及什么样的理由能够支持答案。** </u> 缺资料，就查资料；概念含混，就补充说明；原则有分歧，就把各自的理由展开。问题说得越具体，越容易判断讨论究竟推进到了哪里。
 

~~~~~

</details>

<a id="f-3235963705-src-学习与进步-学海计划-哲学-总论-新增-哲学第一性问题-md-152759845"></a>
#### src/学习与进步/学海计划/哲学/总论/【新增】哲学第一性问题.md

<details>
<summary><code>+34 / -26</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\254\254\344\270\200\346\200\247\351\227\256\351\242\230.md" "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\254\254\344\270\200\346\200\247\351\227\256\351\242\230.md"
index 2bc425aa9..1a3bc9009 100644
--- "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\254\254\344\270\200\346\200\247\351\227\256\351\242\230.md"
+++ "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\345\223\262\345\255\246\347\254\254\344\270\200\346\200\247\351\227\256\351\242\230.md"
@@ -10,57 +10,65 @@
 
 　　本文讨论：哲学-总论-哲学第一性问题。
 
-　　 **本篇所说的“哲学第一性问题”，沿用马克思主义哲学中关于思维与存在关系的讨论框架，通常称为“哲学基本问题”。** 理解这一表述，需要先知道它所处的语境。各哲学传统并没有共同约定一个唯一的“第一问题”。
+　　 **本篇所说的“哲学第一性问题”，借用马克思主义哲学中关于思维与存在关系的讨论框架，通常称为“哲学基本问题”。** 各家哲学传统也没有一起约定一个唯一的“第一问题”，先说清这里讲的是哪一套。
 
-　　弗里德里希·恩格斯（Friedrich Engels）在[相关论述](https://www.marxists.org/archive/marx/works/1886/ludwig-feuerbach/ch02.htm)中，把这个问题展开为两个方面：精神与自然何者更根本，以及人的思维能否认识现实世界。前者讨论世界的根本性质，后者讨论认识的可能性。
+　　弗里德里希·恩格斯（Friedrich Engels）在[相关论述](https://www.marxists.org/archive/marx/works/1886/ludwig-feuerbach/ch02.htm)里把它拆成两层：
 
-　　这两层容易混在一起。先看一个简单的例子：桌上有一个杯子，人在看它。这里既可以问，杯子的存在是否依赖人的意识；也可以问，眼前关于杯子的认识是否可靠。两个问题都谈到杯子，但需要回答的内容不同。
+　　- 精神与自然哪个更根本，以及人的思维能否认识现实世界
+　　- 前者问世界的根本性质，后者问认识的可能性。
 
-　　“思维”在这个话题中涉及认识、意识等精神活动；“存在”涉及所讨论的实在。不能简单把它们分成脑内与脑外两个位置，毕竟大脑本身也是世界的一部分。
+　　听起来有点抽象，来看个例子：桌上放着一个杯子，人在看它。
 
-　　在前一层问题上，认为自然、物质具有根本地位，意识需要从物质世界中得到解释，是 **唯物主义** 的基本方向。拿杯子来说，这种解释会把杯子及其物理作用作为产生感知的条件，杯子不因某个人停止观看就消失。
+　　- 精神与自然哪个更根本：杯子的存在是否依赖人的意识？要是人不在了，或者没有意识了，杯子是否存在？
+　　- 人的思维能否认识现实世界：关于杯子的认识是否可靠。我依据了什么知道眼前这个是杯子？
 
-　　这也不等于否认思想和愿望有作用。一个人想喝水，可以据此伸手拿杯子；想法通过身体活动参与改变环境。承认这个过程，与认为意识有物质基础，并不矛盾。
+　　两问都谈杯子，要答的东西不同。
 
-　　相应地，在这一分类框架中，把精神、观念等置于根本地位的立场，归入 **唯心主义**。但是，这个名称包括不同学说：有的从感知经验出发，有的强调超出个人意识的精神或理念。具体含义需要结合各自的体系理解，不能统统解释成个人想象。（可参考[斯坦福哲学百科的唯心主义条目](https://plato.stanford.edu/entries/idealism/)。）
+　　“思维”在这里指认识、意识一类精神活动，“存在”指所讨论的实在。两者不能简单分成脑内与脑外，毕竟大脑本身也是世界的一部分。
 
-　　比如，围绕杯子可以提出这样一个质疑：人谈到杯子的颜色、形状和触感，始终是在谈自己能够经验到的内容。若再主张这些经验背后有一个独立的物质对象，就需要说明这个判断的根据。
+　　 **先看第一层：世界是什么。** 
 
-　　这种质疑指出了认识的条件，但若要继续得出“杯子的存在完全依赖意识”，还需要补充论证。人通过眼睛看到山，并不能仅凭这一点就说山的存在依赖这双眼睛。
+　　认为自然、物质具有根本地位、意识要从物质世界得到解释，是 **唯物主义** 的基本方向。按这种解释，杯子及其物理作用是产生感知的条件，杯子不因某个人停止观看就消失。
 
-　　<u> **认识一个对象需要哪些条件，与这个对象存在需要哪些条件，是两件需要分别论证的事。** </u>
+　　这并不否认思想的作用。一个人想喝水，可以据此伸手去拿；想法通过身体活动参与改变环境，这与意识有物质基础并不矛盾。
 
-　　同样，意识有物质基础的主张，也需要说明这种依赖究竟是什么。只重复“物质第一性”，并没有解释感知、记忆和思想怎样形成。不同唯物主义理论在具体解释上，也可能存在分歧。
+　　把精神、观念置于根本地位的立场，在这一框架中归入 **唯心主义**。这个名称包括不同学说：有的从感知经验出发，有的强调超出个人意识的精神或理念。具体含义要结合各自的体系理解，不能统统当成个人想象。（可参考[斯坦福哲学百科的唯心主义条目](https://plato.stanford.edu/entries/idealism/)。）
 
-　　这里的“第一性”，着重讨论根本地位和依赖关系，不能仅按某件事发生的先后排序。木匠先构思桌子，再把桌子做出来，并不足以证明整个物质世界由精神产生；构思时，木匠、材料和所处环境已经在场。
+　　围绕杯子还有一类质疑：人谈到的颜色、形状、触感，始终是自己经验到的内容；若再主张这些经验背后有一个独立的物质对象，就要说明这个判断的根据。
 
-　　术语也不能按日常褒贬理解。重视金钱，不足以说明一个人支持哲学上的唯物主义；怀有理想，也不足以说明他支持唯心主义。**生活偏好与世界根本性质的主张，不能只靠一个相似的词联系起来。** 具体立场仍要看理由和论证。
+　　这类质疑指出的是认识的条件。要由此得出“杯子的存在完全依赖意识”，还得补充论证。人用眼睛看到山，不能只凭这一点就说山的存在依赖这双眼睛。
 
-　　此外，哲学史上还有把心灵与物质视为两种根本不同的实体的思路，称为[实体二元论](https://plato.stanford.edu/entries/dualism/)。它需要进一步处理两者怎样关联等问题。阅读具体学说时，可以先辨认它承认哪些基本东西，再判断某种分类能否充分说明它。
+　　<u> **认识一个对象需要哪些条件，与这个对象存在需要哪些条件，是两件要分别论证的事。** </u>
 
-<br />
+　　反过来，意识有物质基础的主张也要说明这种依赖究竟是什么。只重复“物质第一性”，并没有解释感知、记忆和思想怎样形成；不同唯物主义理论在具体解释上也可能有分歧。
+
+　　“第一性”讲的是根本地位和依赖关系，不是发生顺序。木匠先构思桌子再做出来，并不足以证明整个物质世界由精神产生，因为构思时，木匠、材料和所处环境已经在场。
+
+　　术语也不能照日常褒贬理解。重视金钱，说明不了他支持哲学上的唯物主义；怀有理想，也说明不了他支持唯心主义。**生活偏好与世界根本性质的主张，不能只靠一个相似的词连起来。** 具体立场要看理由和论证。
 
-　　再看第二层：**人的思维能否认识现实世界。** 即使同意世界独立于个人意识存在，也还需要说明，人的观察、推理和检验怎样帮助认识它。
+　　这些立场都在回答同一个问题：物质和意识，哪个更根本。不过，哲学史上还有把心灵与物质视为两种根本不同实体的思路，称为[实体二元论](https://plato.stanford.edu/entries/dualism/)。它要另外处理两者怎样关联。读具体学说时，可以先看它承认哪些基本东西，再判断某种分类能否说明它。
+
+<br />
 
-　　假设测量一根木条，3 次读数分别是 20.0 厘米、20.1 厘米、20.0 厘米。读数不完全相同，可以促使人检查刻度、操作方法和测量条件。仅凭这点差异，不能推出木条的长度根本无法认识。
+　　 **第二层是：人的思维能否认识现实世界。** 就算承认世界独立于个人意识存在，也还要说明人的观察、推理和检验怎样帮我们认识它。
 
-　　不过，也不能随意挑一次读数，就宣称得到了毫无误差的最终答案。**承认认识可能出错，与承认能够获得知识，可以同时成立。** 测量的精度和适用条件，应随结果一起说明。
+　　测量一根木条，3 次读数是 20.0 厘米、20.1 厘米、20.0 厘米。读数不完全相同，可以促使人去检查刻度、操作方法和测量条件；但仅凭这点差异，推不出木条的长度根本无法认识。反过来，也不能随便挑一次读数，就宣称得到了毫无误差的最终答案。
 
-　　在这一框架中，肯定人能够认识世界，通常归入 **可知论** 的方向。这里的“能够认识”并不保证每个人的每次判断都正确，也不意味着一个人能够知道所有事情。
+　　 **承认认识可能出错，与承认能够获得知识，可以同时成立。** 测量的精度和适用条件，要随结果一起说明。
 
-　　在这一框架中，认为世界或其中某些根本对象无法被认识的立场，常被归入 **不可知论**。这个名称仍需结合具体学说理解，涉及的限制可能不同。它与怀疑论的关系也需要分别讨论，不能把“目前还不知道”直接当成“原则上不可能知道”。
+　　在这一框架中，肯定人能够认识世界，通常归入 **可知论**。这里的“能够认识”不保证每个人的每次判断都对，也不意味着一个人能知道所有事情。
 
-　　两个层面的答案，也不是简单配对的。把精神或理念看作根本的思想家，同样可以主张人能认识世界。反过来，承认物质世界存在，也没有自动解决每一项认识所需的证据问题。
+　　认为世界或其中某些根本对象无法被认识的立场，常被归入 **不可知论**。这个名称同样要结合具体学说理解，涉及的限制可能不同；它和怀疑论的关系也需要分别讨论，不能把“目前还不知道”直接当成“原则上不可能知道”。
 
-　　所以，听到一个人的流派名称，还不足以知道他怎样回答另一个问题。**世界是什么，与人凭什么认识世界，需要把中间的理由接起来。** 否则只是把两个结论放在了一起。
+　　两个层面的答案也不简单配对。把精神或理念看作根本的思想家，同样可以主张人能认识世界；反过来，承认物质世界存在，也没有自动解决每一项认识所需的证据问题。
 
-　　科学研究会为这些讨论提供材料，也会限制某些解释。例如，一种理论若对意识产生的条件作出了具体预测，就应接受相关观察和实验的检验。但是，从某项研究结果走到对整个世界的哲学判断，还要说明推理所用的前提，不能省略这一步。
+　　所以，听到一个人的流派名称，还不足以知道他怎样回答另一个问题。**世界是什么，与人凭什么认识世界，要把中间的理由接起来。** 否则只是把两个结论放在了一起。
 
-　　同样，某项机制尚未解释清楚，也不能直接用来证明某种相反学说。要比较两种解释，需要分别检查它们的证据、解释范围和困难；一方遇到问题，只说明它有问题需要解决。
+　　科学研究会为这些讨论提供材料，也会限制某些解释。一种理论若对意识产生的条件作出了具体预测，就应接受相关观察和实验的检验；但从某项研究结果走到对整个世界的哲学判断，仍要说明推理所用的前提，不能省略这一步。
 
-　　本文只提供理解这个话题的入门框架，具体学说会在后文分别讨论，仅供参考。学海计划会尽量说明各方的理由，读者可以据此形成自己的判断。
+　　同样，某项机制尚未解释清楚，也不能直接用来证明某种相反学说。比较两种解释，要分别检查它们的证据、解释范围和困难；一方遇到问题，并不说明相反的学说已经成立。
 
-　　<u> **阅读“思维与存在”的争论时，先辨清它在回答何者更根本，还是在回答能否认识；再检查结论究竟由哪些理由支持。** </u> 把这两层分开，才不容易用一个问题的答案，代替另一个问题的论证。
+　　<u> **阅读“思维与存在”的争论时，先辨清它在回答何者更根本，还是在回答能否认识；再检查结论究竟由哪些理由支持。** </u> 分清这两层，才不容易用一个问题的答案，代替另一个问题的论证。
 
 <br />
 

~~~~~

</details>

<a id="f-3235963705-src-学习与进步-学海计划-哲学-总论-新增-总论-md-1083514546"></a>
#### src/学习与进步/学海计划/哲学/总论/【新增】总论.md

<details>
<summary><code>+21 / -23</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\346\200\273\350\256\272.md" "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\346\200\273\350\256\272.md"
index f9084cfdc..a3a1717e4 100644
--- "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\346\200\273\350\256\272.md"
+++ "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\343\200\220\346\226\260\345\242\236\343\200\221\346\200\273\350\256\272.md"
@@ -10,59 +10,57 @@
 
 　　本文讨论：哲学-总论-总论。
 
-　　 **学习哲学，先分清一篇文章在讨论什么问题，再看它给出的理由。** 只记住某位哲学家属于哪个流派，很容易背下结论，却不知道结论是怎样得来的。
+　　 **学习哲学，先分清一篇文章在讨论什么问题，再看它给出的理由。** 这一节就讲三件事：哲学问题长什么样、怎么检查理由、各种说法该怎么看。分得清这三点，读别的篇目会轻松很多。
 
-　　总论就从这里开始。哲学研究的范围很广，涉及世界怎样存在、知识怎样成立、人应当怎样行动等问题。各分支的对象不同，方法也有差别，但讨论通常需要把概念解释清楚，把理由交代出来，让别人能够检查。
+　　1. 先看第一件：哲学问题长什么样。假设 3 人共同完成一项工作，得到 300 元奖励。有人提议，每人分 100 元，因为“这样最公平”。300 ÷ 3 = 100，计算没有问题。
 
-　　来看一个例子。假设 3 人共同完成一项工作，得到 300 元奖励。有人提议，每人分 100 元，因为“这样最公平”。
-
-　　300 ÷ 3 = 100，计算没有问题。但是，计算只能说明怎样平均分，**还不能说明为什么应当平均分。** 如果其中一人承担了一半的工作，平均分配是否仍然合适，就需要另作说明。
+　　但是，计算只能说明怎样平均分，**还不能说明为什么应当平均分。** 如果其中一人承担了一半的工作，平均分还合适吗？
 
 　　有人主张按贡献分，有人主张照顾更困难的人，也有人认为应按开工前的约定分。这里至少出现了平等、贡献、需要、承诺几种考虑。它们可能指向不同的分法，而且各自都有需要解释的地方。
 
-　　比如，按贡献分，贡献是按工作时长算，还是按成果算？负责协调的人没有直接制作产品，他的付出又怎样计算？如果只记录了操作时间，所谓“按贡献分”，可能漏掉一部分工作。
+　　比如，按贡献分，贡献是按工作时长算，还是按成果算？负责协调的人没有直接制作产品，他的付出又怎样计算？归根到底，这个“贡献”到底是依据什么计算的？
 
-　　这时，把“贡献”一词包含的内容拆开，检查它适用于哪些情况，就是一种 **概念分析**。它能帮助双方发现，争执究竟出在词义、事实，还是分配原则上。
+　　把“贡献”一词包含的内容拆开，检查它适用于哪些情况，就是一种 **概念分析**。它能帮助双方发现，争执究竟出在词义、事实，还是分配原则上。
 
 　　事实也需要核实。一人声称自己做了一半的工作，要有记录、成果或其他依据支持。研究我们凭什么相信一件事、什么条件下能说自己知道，便进入了 **认识论** 的范围。
 
-　　若双方已经同意工作量的记录，却仍对分法有异议，补充记录未必能解决争论。因为他们争的是应当怎样对待参与者，涉及 **伦理学**；进一步讨论社会制度中的资源分配，还会涉及政治哲学。
+　　如果双方已经同意工作量的记录，却仍对分法有异议，补充记录未必能解决争论——他们争的是应当怎样对待参与者，涉及 **伦理学**；进一步讨论社会制度中的资源分配，还会涉及政治哲学。
 
 　　<u> **同一件事情，可以同时包含事实问题和价值问题。辨清分歧发生在哪一层，才知道接下来该查证据，还是该讨论原则。** </u>
 
-<br />
-
-　　哲学的分支正是按这类问题逐渐区分的。除上面提到的认识论、伦理学等，研究事物如何存在、因果关系是什么等根本问题的分支，叫作 **形而上学**。这个名称在此指一个研究领域，不能简单理解为脱离实际的空谈。
+　　哲学的分支大体按问题的类型区分。除上面提到的认识论、伦理学等，研究事物如何存在、因果关系是什么等根本问题的分支，叫作 **形而上学**；讨论欣赏一幅画的理由、艺术作品的性质等问题，会进入美学；检查理由能否支持结论，则会用到逻辑学。
 
-　　讨论欣赏一幅画的理由、艺术作品的性质等问题，会进入美学。检查理由能否支持结论，则会用到逻辑学。各分支也会交叉，例如讨论艺术评价时，仍然要说明评价的依据。（分支介绍可参考[佛罗里达州立大学哲学系的说明](https://philosophy.fsu.edu/undergraduate)。）
+　　各分支也会交叉：讨论艺术评价，仍然要说明评价的依据。分支介绍可参考[佛罗里达州立大学哲学系的说明](https://philosophy.fsu.edu/undergraduate)。目录中的分支只是阅读时的分类，帮读者找到问题的位置，不表示每个问题只能放在一个抽屉里。
 
-　　所以，目录中的分支只是阅读时的分类。它们帮助读者找到问题的位置，却不表示每个问题只能放在一个抽屉里。
+<br />
 
-　　再看论证。“参与者都应获得相同金额；这 3 人都是参与者；所以，他们应获得相同金额。”只要接受前面的条件，后面的结论就能推出。但是，第一个条件本身是否合理，仍然可以讨论。
+　　2. 再看论证：“参与者都应获得相同金额；这 3 人都是参与者；所以，他们应获得相同金额。”只要接受前面的条件，后面的结论就能推出。但是，第一个条件本身是否合理，仍然可以讨论。
 
-　　 **推理成立，不等于前提已经得到证明。** 有人反对平均分配，可能接受这段推理，却不接受“参与者都应获得相同金额”这个起点。仅仅指责对方“不讲逻辑”，没有回应他的异议。
+　　 **推理成立，不等于前提已经得到证明。** 有人反对平均分配，可能接受这段推理，却不接受“参与者都应获得相同金额”这个起点。
 
-　　怎样检查这个起点？可以改变例子的条件：假设一人报名后完全没有参与，仍然算不算应当获得奖励的参与者？如果原来的原则连这种情况也包括，就需要解释理由，或者补上适用条件。
+　　怎样检查这个起点？可以改变例子的条件：假设一人报名后完全没有参与，仍然算不算应当获得奖励的参与者？如果原来的原则连这种情况也包括，就要解释这个原则为什么要把这种“看起来完全没参与”的情况也包括进去。
 
-　　这种暂时设定一个情境、观察原有判断在其中是否还能成立的做法，是 **思想实验**。它有助于找出原则的边界，但设想本身不能证明现实中确实发生了什么。例子若偷偷预设了结论，也没有检验作用。
+　　这种暂时设一个情境、看原有判断在里面还成不成立的做法，是 **思想实验**。它能找出原则的边界，但设想本身证明不了现实里发生过什么。例子若偷偷预设了结论，也起不到检验作用。
 
 　　哲学的方法还不止这些。对亲身经验作细致描述、考察概念在历史中的变化，也可以推进问题。具体方法会在后文分别介绍，此处只需知道：面对不同问题，检验理由的方式未必相同。
 
 <br />
 
-　　总论里还有“哲学第一性问题”这一话题。在马克思主义哲学的框架中，[思维与存在的关系](https://www.marxists.org/archive/marx/works/1886/ludwig-feuerbach/ch02.htm)被置于基本问题的位置：世界与意识何者更根本，以及我们的思维能否认识世界。理解这个框架，有助于理解相关学说怎样区分立场。
+　　3. 最后一件是各种说法该怎么看。总论里还有“哲学第一性问题”这一话题。在马克思主义哲学的框架里，[思维与存在的关系](https://www.marxists.org/archive/marx/works/1886/ludwig-feuerbach/ch02.htm)被置于基本问题的位置：世界与意识何者更根本，以及我们的思维能否认识世界。
+
+　　不过，哲学传统并没有共同约定一个唯一的起点。有人从知识的可靠性出发，有人从人的生活、语言或经验出发。
 
-　　不过，哲学传统并没有共同约定一个唯一的起点。有人从知识的可靠性出发，有人从人的生活、语言或经验出发。**读到“根本问题”时，要留意这是在哪一种讨论框架中提出的。** 换了框架，问题的顺序和重点也可能变化。
+　　 **读到“根本问题”时，要留意这是在哪一种讨论框架中提出的。** 
 
-　　这也是哲学争论难以迅速结束的一个原因。双方可能接受不同的前提，也可能对同一个概念有不同理解。某个答案内部没有矛盾，只说明它通过了一项检查，尚不足以证明它比其他答案更可信。
+　　这也是哲学争论难以迅速结束的一个原因：双方可能接受不同的前提，也可能对同一个概念有不同理解。
 
-　　仍以奖励为例。“全部归负责人”也能写成一套前后不矛盾的规则。但这套规则为何合理，其他参与者是否有理由接受，需要另外论证。 **能够自洽** 和 **得到充分支持**，是两回事。
+　　 **能够自洽** 和 **得到充分支持**，是两回事。某个答案内部没有矛盾，只说明它通过了一项检查，尚不足以证明它比其他答案更可信。
 
 　　当然，哲学讨论也离不开其他学科。判断工作量需要具体资料，研究人的认识能力可以参考心理学和神经科学。资料可能修正哲学讨论的前提；而采用什么评价标准、结论究竟能推出多远，仍需要继续说明。
 
-　　所以，学习哲学的一个实际用途，是看清自己的判断还缺哪一部分理由。它不能保证一个人永远判断正确，也不能代替具体行业的知识。会指出别人的漏洞，同样不代表自己的主张已经成立。
+　　所以，学习哲学的一个实际用途，是看清自己的判断还缺哪一部分理由。它不能保证一个人永远判断正确，也代替不了具体行业的知识——会指出别人的漏洞，不等于自己的主张就成立。
 
-　　本栏目的总论会陆续说明哲学的定义、问题、意义、分支和方法。学海计划只尝试把不同主张及其理由讲清楚，内容仅供参考；赞同哪一种解释，读者可以自行判断。
+　　本栏目的总论会陆续说明哲学的定义、问题、意义、分支和方法。**学海计划只尝试把不同主张及其理由讲清楚，内容仅供参考；赞同哪一种解释，读者可以自行判断。**
 
 　　<u> **阅读一种学说时，试着用自己的话说清：它要解决什么问题，依据是什么，又在哪些条件下可能不成立。** </u> 暂时没有把握的地方，可以保留判断，等理由充分一些再作选择。
 

~~~~~

</details>

<a id="f-3235963705-src-学习与进步-学海计划-哲学-总论-哲学的定义-md-3456421386"></a>
#### src/学习与进步/学海计划/哲学/总论/哲学的定义.md

<details>
<summary><code>+23 / -25</code> Click to expand diff</summary>

~~~~~diff
diff --git "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\345\223\262\345\255\246\347\232\204\345\256\232\344\271\211.md" "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\345\223\262\345\255\246\347\232\204\345\256\232\344\271\211.md"
index d2d404faf..eff195b22 100644
--- "a/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\345\223\262\345\255\246\347\232\204\345\256\232\344\271\211.md"
+++ "b/src/\345\255\246\344\271\240\344\270\216\350\277\233\346\255\245/\345\255\246\346\265\267\350\256\241\345\210\222/\345\223\262\345\255\246/\346\200\273\350\256\272/\345\223\262\345\255\246\347\232\204\345\256\232\344\271\211.md"
@@ -10,11 +10,11 @@
 
 　　本文讨论：哲学-总论-哲学的定义。
 
-　　一提“哲学”，大多数人脑子里会跳出两种印象。一种是“爱智慧”，听着很正式，像百科词条的口气；另一种是“说些很深奥、其实没啥用的话”，听着很世俗，也未必公道。这两种都构不成哲学的定义。
+　　一提“哲学”，大多数人脑子里会跳出两种印象。一种是“爱智慧”，听着很正式，像百科词条；另一种是“说些很深奥、其实没啥用的话”，听着很世俗，也未必公道。这两种都构不成哲学的定义。
 
-　　**哲学最麻烦的地方恰恰在于：它连自己的定义，都长期吵不出结果。** 哲学家们在一堆问题上达不成一致，连“哲学到底是什么”也没个所有人都认的答案。
+　　 **哲学最麻烦的地方恰恰在于：它连自己的定义，都长期吵不出结果。** 哲学家们在一堆问题上达不成一致，连“哲学到底是什么”也没个所有人都认的答案。
 
-　　所以学海计划能做的，只是给出一个目前比较服众、又尽量说人话的说法。
+　　所以学海计划只能给出一个目前接受度较高、又尽量说人话的说法。
 
 　　<u> **哲学，是对最一般、最根本问题的系统追问，以及对各种答案之所以成立的前提、概念和论证的反思。** </u>
 
@@ -28,19 +28,19 @@
 
 　　很多人以为到这儿就是哲学了。其实还差一层。哲学不会停在“都是存在的东西”，它会继续追问：这个世界到底是什么？是我们感觉到的那个样子，还是不依赖我们感觉而存在？还有，“东西”又是什么？
 
-　　哲学还常常反过来审问问题本身。因为有些问题本身就带着陷阱——比如你昨晚根本没去酒吧，却有人劈头问你“昨晚酒吧的酒好喝吗”。面对这种问法，哲学不会急着回答，而是先问：什么叫动物？“动物”这个定义准确吗？会不会有偏差？动物是本来就存在，还是我们人为划出来的？
+　　哲学还常常反过来审问问题本身。有些问题本身就带着陷阱——比如你昨晚根本没去酒吧，却有人劈头问你“昨晚酒吧的酒好喝吗”。一般人都会顺着他的话回答。那就完了。但如果受过哲学训练（或者思辨、诡辩训练）的人，往往会注意到这个陷阱。
 
 　　哲学会一直追问，直到实在问不下去。在这个例子里，“这个世界”大概就是人能触及的底了。
 
-　　很多人觉得哲学难懂、没用，是因为它问的问题太顶层、太抽象，离日常太远。可它不是不重要。就像一棵大树，没有根，没有那些最基础的部分，它根本长不起来。
+　　很多人觉得哲学难懂、没用，是因为它问的问题太抽象，离日常太远。可它不是不重要。就像一棵大树，没有根，没有那些最基础的部分，它根本长不起来。
 
-　　上面那个定义里，其实压着四个关键词：**最一般、最根本、系统追问、反思前提。** 下面一个个说。
+　　上面那个定义里，其实压着三个关键词：**最一般、最根本的问题**、**系统追问**、**反思前提**。 逐个说。
 
 <br />
 
-　　**什么叫“最一般、最根本的问题”？**
+　　 **什么叫“最一般、最根本的问题”？** 
 
-　　就是那些几乎所有学科、所有人、所有时代都会碰上，又没法轻易绕开的问题。比如：
+　　就是那些几乎所有学科、所有人、所有时代都会碰上，又没法轻易绕过的问题。比如：
 
 　　世界的本质是什么？——这是真实与实在的问题。
 
@@ -54,27 +54,25 @@
 
 　　美是什么？意义是什么？——这是美学与人生哲学的问题。
 
-　　它们的共同点是：**都不是某个局部的技术问题，而是许多局部问题背后的那个“总问题”。**
+　　它们的共同点是：**都是许多局部问题背后的那个“总问题”。**
 
 　　物理学研究某种具体现象怎么发生，法学研究规则怎么制定和适用，心理学研究行为和认知怎么形成。哲学更常问的是：这些学科成立时，默认了什么？概念清楚吗？论证可靠吗？结论到底意味着什么？
 
 <br />
 
-　　**什么叫“系统追问”？**
+　　 **什么叫“系统追问”？** 
 
-　　随口一句感慨，不叫哲学。深夜发朋友圈说“人生好虚无”，也不自动构成哲学。
+　　随口一句感慨，不叫哲学。深夜发朋友圈说“人生好虚无”，也不构成哲学。
 
-　　**哲学不是单纯的感受，而是把感受整理成问题，把问题推进成概念，再把概念放进论证里接受检验。**
+　　哲学要把感受整理成问题，把问题推进成概念，再把概念放进论证里接受检验。
 
-　　换言之，哲学不是“我觉得”，而是“我为什么这样觉得”；不是“我信”，而是“我凭什么信”；不是“这是对的”，而是“它为什么对、在什么条件下对、有没有反例”。
+　　换言之，哲学问的总是“我为什么这样觉得”“我凭什么信”“它为什么对、在什么条件下对、有没有反例”。
 
-　　这就是它和闲聊、鸡汤、立场宣言的区别。后三者可以有情绪、有态度、有感染力，但哲学至少还多要一样东西：**论证。**
-
-　　没有论证的深刻，很多时候只是措辞华丽的偏见。
+　　这就是它和闲聊、鸡汤、立场宣言的区别：后三者可以有情绪，但哲学还多要一样东西——**论证。** 没有论证的深刻，很多时候只是措辞华丽的偏见。
 
 <br />
 
-　　**什么叫“反思前提”？**
+　　 **什么叫“反思前提”？** 
 
 　　这是哲学最特别的地方。别的学科大多在回答问题，哲学经常连问题本身也一起审。
 
@@ -84,7 +82,7 @@
 
 　　宗教回答“人生的意义是什么”，哲学则问：意义一定得来自上帝吗？没有终极目的，意义还能不能成立？
 
-　　**哲学的本事，不只是回答问题，而是拆开问题，检查里面藏着的前提。**
+　　 **哲学不只回答问题，还要拆开问题，检查里面藏着的前提。** 
 
 　　所以它有时像一门“扫雷学”。别人把某个词说得理所当然，哲学偏要先看一眼：这个词，到底说清楚了没有。
 
@@ -92,13 +90,13 @@
 
 　　还有必要划几条界线。
 
-　　**哲学不是科学。** 这不是说它比科学低一等，而是分工不同。科学偏重经验、实验和可检验的模型；哲学偏重概念、逻辑、前提和解释框架。两者的边界不是铁板一块，但确实不一样。
+　　 **哲学不是科学。** 这不是说它比科学低一等，只是分工不同。科学偏重经验、实验和可检验的模型；哲学偏重概念、逻辑、前提和解释框架。两者的边界不是铁板一块，但确实不一样。
 
-　　**哲学也不是宗教。** 宗教往往以启示、经典和信仰共同体为核心；哲学原则上允许怀疑一切前提，连神、灵魂、道德和真理本身，都能摆上桌审。
+　　 **哲学也不是宗教。** 宗教往往以启示、经典和信仰共同体为核心；哲学原则上允许怀疑一切前提，连神、灵魂、道德和真理本身，都能摆上桌审。
 
-　　**哲学更不是故作高深。** 把简单的话说复杂，不是哲学；把没意义的话说得像有意义，也不是哲学。很多人厌恶哲学，恰恰是见多了伪哲学式的表达。
+　　 **哲学更不是故作高深。** 把简单的话说复杂，不是哲学；把没意义的话说得像有意义，也不是哲学。很多人厌恶哲学，恰恰是见多了伪哲学式的表达。
 
-　　<u> **哲学不是“说玄话”，而是“把自以为懂的东西，重新问到不能含糊为止”。** </u>
+　　<u> **哲学要做的，是把自以为懂的东西，重新问到不能含糊为止。** </u>
 
 <br />
 
@@ -110,13 +108,13 @@
 
 　　所以**哲学不像化学那样能用单一对象来定义，也不像数学那样能用单一方法来定义。** 它更像一个问题家族，一种思维传统，或者说，一种不断追问根本问题、拒绝草率收场的习惯。
 
-　　这也正是为什么现代大学介绍哲学时，往往只敢给宽泛的定义，比如“对一般而根本问题的探究”，而不敢说“哲学就是某某主义”。凡是试图一句话把哲学彻底框死的人，多半已经先把它砍掉一半了。
+　　现代大学介绍哲学时，往往也只敢给宽泛的定义，比如“对一般而根本问题的探究”，不敢说“哲学就是某某主义”。真想把哲学一句话框死的人，多半已经先砍掉它一半了。
 
 <br />
 
-　　最后压成一句话：**哲学，就是对最一般、最根本问题的系统反思。** 它不满足于接受现成答案，而要追问概念清不清楚、论证成不成立、前提可不可靠。它的价值也不在于马上给出统一答案，而在于训练人识别混乱、拆解问题、怀疑含糊，并在众说纷纭里尽量把话说清楚一点。
+　　最后压成一句话：**哲学，就是对最一般、最根本问题的系统反思。** 它不满足于接受现成答案，而要追问概念清不清楚、论证成不成立、前提可不可靠。它的价值不在于马上给出统一答案，而在于训练人识别混乱、拆解问题、怀疑含糊，在众说纷纭里把话说清楚一点。
 
-　　如果还要再短，那就是：**哲学，是对“理所当然”发起的长期审问。**
+　　再短就是：**哲学，是对“理所当然”发起的长期审问。**
 
 <br />
 

~~~~~

</details>

<!-- LAST_UPDATED_ENTRY_END -->

