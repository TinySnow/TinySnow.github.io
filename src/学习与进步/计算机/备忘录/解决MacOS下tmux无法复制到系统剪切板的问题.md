# 解决 MacOS 下 tmux 无法复制到系统剪切板的问题

## 安装 reattach-to-user-namespace

```bash
brew install reattach-to-user-namespace
```

## tmux.conf 配置

```conf
# 基础配置
# buffer缓存复制到Mac系统粘贴板
bind C-c run "tmux save-buffer - | reattach-to-user-namespace pbcopy"
# Mac系统粘贴板内容复制到会话
bind C-v run "reattach-to-user-namespace pbpaste | tmux load-buffer - \; paste-buffer -d"

# 复制模式下
# 绑定y键为复制选中文本到Mac系统粘贴板
bind-key -T copy-mode-vi 'y' send-keys -X copy-pipe-and-cancel 'reattach-to-user-namespace pbcopy'
# 鼠标拖动选中文本，并复制到Mac系统粘贴板
bind-key -T copy-mode-vi MouseDragEnd1Pane send -X copy-pipe-and-cancel "pbcopy"
```

## 刷新 tmux

```bash
tmux source ~/.tmux.conf
```

或者

按下 \<prefix\> 键位，然后输入

```
:source-file ~/.tmux.conf
```



