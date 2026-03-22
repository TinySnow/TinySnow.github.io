# 新 MacOS 配置流程

## 流程

1. 进系统，登账号，系统账号登国区的，App Store 账号最好登美区的
2. 改输入法为双拼
3. 下载各种自己需要安装的软件，最好从官网下，不一定要从 App Store 下，有的 App Store 下载的软件版本可能比官网上做了阉割
4. 安装科学上网软件，开启 tun 模式
5. 安装环境
   1. 首先必安 homebrew
      - 打开终端：`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
      - 或者自己去官网找命令
   2. rust：`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
   3. python：`brew install python`
      - 之后所有的命令都要用 python3 或者 pip3，不能直接敲 python 或者 pip，不然认不到
   4. tmux：`brew install tmux`
      - tmux 装完之后可能会有无法复制到系统剪切板的问题，详情见另一篇博客
   5. git

## 终端配置

- 各种软件配置的 dotfiles，我是直接用的 anishathalye 的 dotfiles，好用，就是这个仓库会有 git submodule，需要找一个好点的梯子，不然速度很慢

```bash
# 克隆仓库之后运行
cd ~ && git@github.com:anishathalye/dotfiles.git && cd dotfiles && ./install
```

- 如果运行半天都没反应，换一个节点，删了所有文件重来吧

```bash
# 删除之前的软链接
rm -rf dotfiles .agignore .aria2 .bash .bash_profile .bashrc .editrc .emacs .emacs.d .gitconfig .gitignore_global .haskeline .hgrc .inputrc .irssi .pythonrc .rtorrent.rc .screenrc .shell .tmux.conf .vim .vimrc .zsh .zshrc .dotfiles
# 换一个节点之后运行
cd .. && rm -rf dotfiles && git clone git@github.com:anishathalye/dotfiles.git && cd dotfiles && ./install
```

## 常用软件

- Telegram
- Microsoft TODO
- Strongbox（Keepass 的 MacOS 版本）
- Visual Studio Code
- 纯纯写作桌面版
- 捧读
- Xmind（可能要去找破解版）
- Firefox
- Chrome
- FLClash
- LocalSend
- Typora（可能要去找破解版）
- ShadowRocket