# 最近更新 | Last Updated

## Prenote

<p style="font-size: larger; font-weight: bold; color: red; text-align: center;">NOTICE: This content is presented as `git diff`.</p>

## SUMMARY.md

```diff

@@ -703,6 +703,10 @@
     - [给计算机 202102 班的选修课建议](学习与进步/计算机/文章/给计算机202102班的选修课建议.md)
   - [备忘录 | Memo](学习与进步/计算机/备忘录/备忘录.md)
     - [常用命令 | Commands](学习与进步/计算机/备忘录/Commands.md)
+    - [解决 MacOS 破解软件无法安装或者提示已损坏的问题](学习与进步/计算机/备忘录/解决MacOS破解软件无法安装或者提示已损坏的问题.md)
+    - [MacOS 破解软件常用网站](学习与进步/计算机/备忘录/MacOS破解软件常用网站.md)
+    - [新 MacOS 配置流程](学习与进步/计算机/备忘录/新MacOS配置流程.md)
+    - [解决 MacOS 下 tmux 无法复制到系统剪切板的问题](学习与进步/计算机/备忘录/解决MacOS下tmux无法复制到系统剪切板的问题.md)
     - [Github 学生认证过程及注意事项](学习与进步/计算机/备忘录/Github学生认证过程及注意事项.md)
     - [Windows 相关](学习与进步/计算机/备忘录/Windows相关.md)
     - [Windows 自定义自启动任务](学习与进步/计算机/备忘录/Windows自定义自启动任务.md)
```

## sitemap.txt

```diff

@@ -771,6 +771,7 @@ https://tinysnow.github.io/阅读/每日一文/小事-吉尔贝·塞斯勃隆
 https://tinysnow.github.io/阅读/每日一文/小偷-苏童
 https://tinysnow.github.io/阅读/每日一文/小偷-雷蒙德·卡佛
 https://tinysnow.github.io/阅读/每日一文/小公务员之死-契诃夫
+https://tinysnow.github.io/阅读/每日一文/小基督-马丁·麦克多纳
 https://tinysnow.github.io/阅读/每日一文/小女孩与厌倦-于尔克·舒比格曼
 https://tinysnow.github.io/阅读/每日一文/小女孩和死神-于尔克·舒比格
 https://tinysnow.github.io/阅读/每日一文/小桔灯-冰心
```

## MacOS破解软件常用网站.md

```diff

@@ -0,0 +1,14 @@
+# MacOS 破解软件常用网站
+
+- 推荐程度依次降低
+- https://xmac.app/
+- https://appstorrent.ru/
+- https://www.digit77.com/macapps/
+- https://www.imacso.com/
+- https://macked.app/
+- https://xclient.info/
+- https://www.52pojie.cn/forum.php?mod=forumdisplay&fid=16&filter=typeid&typeid=234
+- https://macwk.cn/
+- https://macapp.org.cn/
+- https://zh.altapps.net/platform/mac
+- https://www.seemac.cn
\ No newline at end of file
```

## 新MacOS配置流程.md

```diff

@@ -0,0 +1,52 @@
+# 新 MacOS 配置流程
+
+## 流程
+
+1. 进系统，登账号，系统账号登国区的，App Store 账号最好登美区的
+2. 改输入法为双拼
+3. 下载各种自己需要安装的软件，最好从官网下，不一定要从 App Store 下，有的 App Store 下载的软件版本可能比官网上做了阉割
+4. 安装科学上网软件，开启 tun 模式
+5. 安装环境
+   1. 首先必安 homebrew
+      - 打开终端：`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
+      - 或者自己去官网找命令
+   2. rust：`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
+   3. python：`brew install python`
+      - 之后所有的命令都要用 python3 或者 pip3，不能直接敲 python 或者 pip，不然认不到
+   4. tmux：`brew install tmux`
+      - tmux 装完之后可能会有无法复制到系统剪切板的问题，详情见另一篇博客
+   5. git
+
+## 终端配置
+
+- 各种软件配置的 dotfiles，我是直接用的 anishathalye 的 dotfiles，好用，就是这个仓库会有 git submodule，需要找一个好点的梯子，不然速度很慢
+
+```bash
+# 克隆仓库之后运行
+cd ~ && git@github.com:anishathalye/dotfiles.git && cd dotfiles && ./install
+```
+
+- 如果运行半天都没反应，换一个节点，删了所有文件重来吧
+
+```bash
+# 删除之前的软链接
+rm -rf dotfiles .agignore .aria2 .bash .bash_profile .bashrc .editrc .emacs .emacs.d .gitconfig .gitignore_global .haskeline .hgrc .inputrc .irssi .pythonrc .rtorrent.rc .screenrc .shell .tmux.conf .vim .vimrc .zsh .zshrc .dotfiles
+# 换一个节点之后运行
+cd .. && rm -rf dotfiles && git clone git@github.com:anishathalye/dotfiles.git && cd dotfiles && ./install
+```
+
+## 常用软件
+
+- Telegram
+- Microsoft TODO
+- Strongbox（Keepass 的 MacOS 版本）
+- Visual Studio Code
+- 纯纯写作桌面版
+- 捧读
+- Xmind（可能要去找破解版）
+- Firefox
+- Chrome
+- FLClash
+- LocalSend
+- Typora（可能要去找破解版）
+- ShadowRocket
\ No newline at end of file
```

## 解决MacOS下tmux无法复制到系统剪切板的问题.md

```diff

@@ -0,0 +1,40 @@
+# 解决 MacOS 下 tmux 无法复制到系统剪切板的问题
+
+## 安装 reattach-to-user-namespace
+
+```bash
+brew install reattach-to-user-namespace
+```
+
+## tmux.conf 配置
+
+```conf
+# 基础配置
+# buffer缓存复制到Mac系统粘贴板
+bind C-c run "tmux save-buffer - | reattach-to-user-namespace pbcopy"
+# Mac系统粘贴板内容复制到会话
+bind C-v run "reattach-to-user-namespace pbpaste | tmux load-buffer - \; paste-buffer -d"
+
+# 复制模式下
+# 绑定y键为复制选中文本到Mac系统粘贴板
+bind-key -T copy-mode-vi 'y' send-keys -X copy-pipe-and-cancel 'reattach-to-user-namespace pbcopy'
+# 鼠标拖动选中文本，并复制到Mac系统粘贴板
+bind-key -T copy-mode-vi MouseDragEnd1Pane send -X copy-pipe-and-cancel "pbcopy"
+```
+
+## 刷新 tmux
+
+```bash
+tmux source ~/.tmux.conf
+```
+
+或者
+
+按下 \<prefix\> 键位，然后输入
+
+```
+:source-file ~/.tmux.conf
+```
+
+
+
```

## 解决MacOS破解软件无法安装或者提示已损坏的问题.md

```diff

@@ -0,0 +1,5 @@
+# 解决 MacOS 破解软件无法安装或者提示已损坏的问题
+
+- 开启任何来源（最简便）：打开终端输入 `sudo spctl --master-disable` 并回车，输入密码后在系统设置的“隐私与安全性”中勾选“任何来源”。 **安装完了之后记得改回去，不要选任何来源。**
+- 修复软件签名（推荐）：打开终端，输入 `sudo xattr -rd com.apple.quarantine `（注意结尾有空格），然后将出现该提示的应用程序图标从应用程序文件夹拖入终端窗口，最后按下回车键并输入电脑密码即可。
+- 重新信任应用（替代方法）：如果系统安全设置提示，在“系统设置”>“隐私与安全性”中，点击“仍然打开”。
\ No newline at end of file
```
