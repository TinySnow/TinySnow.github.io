# Bash 代表命令

## 前注

此笔记只用于回忆，不是教程。

原教程：[阮一峰 Bash 脚本教程](https://wangdoc.com/bash/index.html)

## 代表命令

```bash
#!/bin/sh
# 或者
#! /bin/bash

echo -n hello world

echo -e "Hello\nWorld"

mkdir foo || mkdir bar

mkdir foo && mkdir bar

type echo

set

unset

?

~

*

ls ?[!a]?

mkdir {2007..2009}-{01..12}

echo {0..8..2}

echo $(date)

# 请注意，此命令默认关闭
ls **/*.txt

echo "$(cal)"

<< token
text
token

cat <<< 'hi there'
# 等同于
echo 'hi there' | cat

$?

$$

$_

$!

$0

$-

$#

$#

${#varname}

${varname:offset:length}

# 如果 pattern 匹配变量 variable 的开头，
# 删除最短匹配（非贪婪匹配）的部分，返回剩余部分
${variable#pattern}

# 如果 pattern 匹配变量 variable 的开头，
# 删除最长匹配（贪婪匹配）的部分，返回剩余部分
${variable##pattern}

# 如果 pattern 匹配变量 variable 的结尾，
# 删除最短匹配（非贪婪匹配）的部分，返回剩余部分
${variable%pattern}

# 如果 pattern 匹配变量 variable 的结尾，
# 删除最长匹配（贪婪匹配）的部分，返回剩余部分
${variable%%pattern}

# 如果 pattern 匹配变量 variable 的一部分，
# 最长匹配（贪婪匹配）的那部分被 string 替换，但仅替换第一个匹配
${variable/pattern/string}

# 如果 pattern 匹配变量 variable 的一部分，
# 最长匹配（贪婪匹配）的那部分被 string 替换，所有匹配都替换
${variable//pattern/string}

# 转为大写
${varname^^}

# 转为小写
${varname,,}

(( 2 + 2 ))

expr 3 + 2

!echo

export HISTTIMEFORMAT='%F %T  '

export HISTIGNORE='pwd:ls:exit'

cd -

pushd dirname

popd [-n]

dirs
    -c：清空目录栈。
    -l：用户主目录不显示波浪号前缀，而打印完整的目录。
    -p：每行一个条目打印目录栈，默认是打印在一行。
    -v：每行一个条目，每个条目之前显示位置编号（从0开始）。
    +N：N为整数，表示显示堆顶算起的第 N 个目录，从零开始。
    -N：N为整数，表示显示堆底算起的第 N 个目录，从零开始。

grep -- "--hello" example.txt

# 写法一
if test -e /tmp/foo.txt ; then
  echo "Found foo.txt"
fi
# 写法二
if [ -e /tmp/foo.txt ] ; then
  echo "Found foo.txt"
fi
# 写法三
if [[ -e /tmp/foo.txt ]] ; then
  echo "Found foo.txt"
fi

case expression in
  pattern )
    commands ;;
  pattern )
    commands ;;
esac

while condition; do
  commands
done

for variable in list; do
  commands
done

for (( i=0; i<5; i=i+1 )); do
  echo $i
done

select name
[in list]
do
  commands
done

# 函数总是在当前 Shell 执行，这是跟脚本的一个重大区别，Bash 会新建一个子 Shell 执行脚本。如果函数与脚本同名，函数会优先执行。但是，函数的优先级不如别名，即如果函数与别名同名，那么别名优先执行。
fn () {
  foo=1
  echo "fn: foo = $foo"
}
fn () {
  local foo
  foo=1
  echo "fn: foo = $foo"
}

echo ${foo[@]}

# @和*放不放在双引号之中，是有差别的。
for i in "${names[@]}"; do
  echo $i
done

echo ${#a[100]}

echo ${#a[@]}
# 或者
echo ${#a[*]}

# ${!array[@]}或${!array[*]}，可以返回数组的成员序号，即哪些位置是有值的。

echo ${food[@]:0}

foo+=(d e f)

unset foo[2]

# unset ArrayName可以清空整个数组。

# 写法一
command || { echo "command failed"; exit 1; }

# 使用command || true，使得该命令即使执行失败，脚本也不会终止执行。
command || true

shopt

# 为了保证脚本退出时临时文件被删除，可以使用trap命令指定退出时的清除操作。
trap 'rm -f "$TMPFILE"' EXIT
TMPFILE=$(mktemp) || exit 1
echo "Our temp file is $TMPFILE"



```

## 快捷键

- `Ctrl + L`：清除屏幕并将当前行移到页面顶部。
- `Ctrl + C`：中止当前正在执行的命令。
- `Shift + PageUp`：向上滚动。
- `Shift + PageDown`：向下滚动。
- `Ctrl + U`：从光标位置删除到行首。
- `Ctrl + K`：从光标位置删除到行尾。
- `Ctrl + W`：删除光标位置前一个单词。
- `Ctrl + D`：关闭 Shell 会话。
- `↑`，`↓`：浏览已执行命令的历史记录。
- `Ctrl + o`：执行历史文件里面的当前条目，并自动显示下一条命令。这对重复执行某个序列的命令很有帮助。
- `!!`：执行上一个命令。
- `!n`：`n`为数字，执行历史文件里面行号为`n`的命令。
- `!-n`：执行当前命令之前`n`条的命令。
- `!string`：执行最近一个以指定字符串`string`开头的命令。
- `!?string`：执行最近一条包含字符串`string`的命令。
- `!$`：代表上一个命令的最后一个参数。
- `!*`：代表上一个命令的所有参数，即除了命令以外的所有部分。
- `^string1^string2`：执行最近一条包含`string1`的命令，将其替换成`string2`。
- `Alt + .`：插入上一个命令的最后一个词。
  - 上面的`Alt + .`快捷键，对于很长的文件路径，有时会非常方便。因为 Unix 命令的最后一个参数通常是文件路径。

## 其他

### 字符类

- `[[:alnum:]]`：匹配任意英文字母与数字
- `[[:alpha:]]`：匹配任意英文字母
- `[[:blank:]]`：空格和 Tab 键。
- `[[:cntrl:]]`：ASCII 码 0-31 的不可打印字符。
- `[[:digit:]]`：匹配任意数字 0-9。
- `[[:graph:]]`：A-Z、a-z、0-9 和标点符号。
- `[[:lower:]]`：匹配任意小写字母 a-z。
- `[[:print:]]`：ASCII 码 32-127 的可打印字符。
- `[[:punct:]]`：标点符号（除了 A-Z、a-z、0-9 的可打印字符）。
- `[[:space:]]`：空格、Tab、LF（10）、VT（11）、FF（12）、CR（13）。
- `[[:upper:]]`：匹配任意大写字母 A-Z。
- `[[:xdigit:]]`：16进制字符（A-F、a-f、0-9）。

### 量词语法

- `?(pattern-list)`：模式匹配零次或一次。
- `*(pattern-list)`：模式匹配零次或多次。
- `+(pattern-list)`：模式匹配一次或多次。
- `@(pattern-list)`：只匹配一次模式。
- `!(pattern-list)`：匹配给定模式以外的任何内容。

### 常见环境变量

- `BASHPID`：Bash 进程的进程 ID。
- `BASHOPTS`：当前 Shell 的参数，可以用`shopt`命令修改。
- `DISPLAY`：图形环境的显示器名字，通常是`:0`，表示 X Server 的第一个显示器。
- `EDITOR`：默认的文本编辑器。
- `HOME`：用户的主目录。
- `HOST`：当前主机的名称。
- `IFS`：词与词之间的分隔符，默认为空格。
- `LANG`：字符集以及语言编码，比如`zh_CN.UTF-8`。
- `PATH`：由冒号分开的目录列表，当输入可执行程序名后，会搜索这个目录列表。
- `PS1`：Shell 提示符。
- `PS2`： 输入多行命令时，次要的 Shell 提示符。
- `PWD`：当前工作目录。
- `RANDOM`：返回一个0到32767之间的随机数。
- `SHELL`：Shell 的名字。
- `SHELLOPTS`：启动当前 Shell 的`set`命令的参数，参见《set 命令》一章。
- `TERM`：终端类型名，即终端仿真器所用的协议。
- `UID`：当前用户的 ID 编号。
- `USER`：当前用户的用户名。

### 进制

- `number`：没有任何特殊表示法的数字是十进制数（以10为底）。
- `0number`：八进制数。
- `0xnumber`：十六进制数。
- `base#number`：`base`进制的数。

### 文件判断

- `[ -a file ]`：如果 file 存在，则为`true`。
- `[ -b file ]`：如果 file 存在并且是一个块（设备）文件，则为`true`。
- `[ -c file ]`：如果 file 存在并且是一个字符（设备）文件，则为`true`。
- `[ -d file ]`：如果 file 存在并且是一个目录，则为`true`。
- `[ -e file ]`：如果 file 存在，则为`true`。
- `[ -f file ]`：如果 file 存在并且是一个普通文件，则为`true`。
- `[ -g file ]`：如果 file 存在并且设置了组 ID，则为`true`。
- `[ -G file ]`：如果 file 存在并且属于有效的组 ID，则为`true`。
- `[ -h file ]`：如果 file 存在并且是符号链接，则为`true`。
- `[ -k file ]`：如果 file 存在并且设置了它的“sticky bit”，则为`true`。
- `[ -L file ]`：如果 file 存在并且是一个符号链接，则为`true`。
- `[ -N file ]`：如果 file 存在并且自上次读取后已被修改，则为`true`。
- `[ -O file ]`：如果 file 存在并且属于有效的用户 ID，则为`true`。
- `[ -p file ]`：如果 file 存在并且是一个命名管道，则为`true`。
- `[ -r file ]`：如果 file 存在并且可读（当前用户有可读权限），则为`true`。
- `[ -s file ]`：如果 file 存在且其长度大于零，则为`true`。
- `[ -S file ]`：如果 file 存在且是一个网络 socket，则为`true`。
- `[ -t fd ]`：如果 fd 是一个文件描述符，并且重定向到终端，则为`true`。 这可以用来判断是否重定向了标准输入／输出／错误。
- `[ -u file ]`：如果 file 存在并且设置了 setuid 位，则为`true`。
- `[ -w file ]`：如果 file 存在并且可写（当前用户拥有可写权限），则为`true`。
- `[ -x file ]`：如果 file 存在并且可执行（有效用户有执行／搜索权限），则为`true`。
- `[ file1 -nt file2 ]`：如果 FILE1 比 FILE2 的更新时间最近，或者 FILE1 存在而 FILE2 不存在，则为`true`。
- `[ file1 -ot file2 ]`：如果 FILE1 比 FILE2 的更新时间更旧，或者 FILE2 存在而 FILE1 不存在，则为`true`。
- `[ FILE1 -ef FILE2 ]`：如果 FILE1 和 FILE2 引用相同的设备和 inode 编号，则为`true`。

### 字符串判断

- `[ string ]`：如果`string`不为空（长度大于0），则判断为真。
- `[ -n string ]`：如果字符串`string`的长度大于零，则判断为真。
- `[ -z string ]`：如果字符串`string`的长度为零，则判断为真。
- `[ string1 = string2 ]`：如果`string1`和`string2`相同，则判断为真。
- `[ string1 == string2 ]` 等同于`[ string1 = string2 ]`。
- `[ string1 != string2 ]`：如果`string1`和`string2`不相同，则判断为真。
- `[ string1 '>' string2 ]`：如果按照字典顺序`string1`排列在`string2`之后，则判断为真。
- `[ string1 '<' string2 ]`：如果按照字典顺序`string1`排列在`string2`之前，则判断为真。

### 整数判断

- `[ integer1 -eq integer2 ]`：如果`integer1`等于`integer2`，则为`true`。
- `[ integer1 -ne integer2 ]`：如果`integer1`不等于`integer2`，则为`true`。
- `[ integer1 -le integer2 ]`：如果`integer1`小于或等于`integer2`，则为`true`。
- `[ integer1 -lt integer2 ]`：如果`integer1`小于`integer2`，则为`true`。
- `[ integer1 -ge integer2 ]`：如果`integer1`大于或等于`integer2`，则为`true`。
- `[ integer1 -gt integer2 ]`：如果`integer1`大于`integer2`，则为`true`。

### 参数变量

- `$1`~`$9`：函数的第一个到第9个的参数。
- `$0`：函数所在的脚本名。
- `$#`：函数的参数总数。
- `$@`：函数的全部参数，参数之间使用空格分隔。
- `$*`：函数的全部参数，参数之间使用变量`$IFS`值的第一个字符分隔，默认为空格，但是可以自定义。

### set 命令

- `set -u` 遇到不存在的变量就会报错，并停止执行。
- `set -x` 用来在运行结果之前，先输出执行的那一行命令。
- `set -e` 使得脚本只要发生错误，就终止执行。
- `set -o pipefail` 只要一个子命令失败，整个管道命令就失败，脚本就会终止执行。
- `set -n`：等同于`set -o noexec`，不运行命令，只检查语法是否正确。
- `set -f`：等同于`set -o noglob`，表示不对通配符进行文件名扩展。
- `set -v`：等同于`set -o verbose`，表示打印 Shell 接收到的每一行输入。
- `set -o noclobber`：防止使用重定向运算符`>`覆盖已经存在的文件。
- `set -E` 参数可以纠正这个行为，使得函数也能继承`trap`命令。
- `set -Eeuxo pipefail` 建议放在所有 Bash 脚本的头部。

### 环境变量

- 变量`LINENO`返回它在脚本里面的行号。

### 登录 session

登录 Session 是用户登录系统以后，系统为用户开启的原始 Session，通常需要用户输入用户名和密码进行登录。

登录 Session 一般进行整个系统环境的初始化，启动的初始化脚本依次如下。

- `/etc/profile`：所有用户的全局配置脚本。
- `/etc/profile.d`目录里面所有`.sh`文件
- `~/.bash_profile`：用户的个人配置脚本。如果该脚本存在，则执行完就不再往下执行。
- `~/.bash_login`：如果`~/.bash_profile`没找到，则尝试执行这个脚本（C shell 的初始化脚本）。如果该脚本存在，则执行完就不再往下执行。
- `~/.profile`：如果`~/.bash_profile`和`~/.bash_login`都没找到，则尝试读取这个脚本（Bourne shell 和 Korn shell 的初始化脚本）。

Linux 发行版更新的时候，会更新`/etc`里面的文件，比如`/etc/profile`，因此不要直接修改这个文件。如果想修改所有用户的登陆环境，就在`/etc/profile.d`目录里面新建`.sh`脚本。

### 非登录 session

非登录 Session 是用户进入系统以后，手动新建的 Session，这时不会进行环境初始化。比如，在命令行执行`bash`命令，就会新建一个非登录 Session。

非登录 Session 的初始化脚本依次如下。

- `/etc/bash.bashrc`：对全体用户有效。
- `~/.bashrc`：仅对当前用户有效。

对用户来说，`~/.bashrc`通常是最重要的脚本。非登录 Session 默认会执行它，而登录 Session 一般也会通过调用执行它。每次新建一个 Bash 窗口，就相当于新建一个非登录 Session，所以`~/.bashrc`每次都会执行。注意，执行脚本相当于新建一个非互动的 Bash 环境，但是这种情况不会调用`~/.bashrc`。

### 转义字符

- `\a`：响铃，计算机发出一记声音。
- `\d`：以星期、月、日格式表示当前日期，例如“Mon May 26”。
- `\h`：本机的主机名。
- `\H`：完整的主机名。
- `\j`：运行在当前 Shell 会话的工作数。
- `\l`：当前终端设备名。
- `\n`：一个换行符。
- `\r`：一个回车符。
- `\s`：Shell 的名称。
- `\t`：24小时制的`hours:minutes:seconds`格式表示当前时间。
- `\T`：12小时制的当前时间。
- `\@`：12小时制的`AM/PM`格式表示当前时间。
- `\A`：24小时制的`hours:minutes`表示当前时间。
- `\u`：当前用户名。
- `\v`：Shell 的版本号。
- `\V`：Shell 的版本号和发布号。
- `\w`：当前的工作路径。
- `\W`：当前目录名。
- `\!`：当前命令在命令历史中的编号。
- `\#`：当前 shell 会话中的命令数。
- `\$`：普通用户显示为`$`字符，根用户显示为`#`字符。
- `\[`：非打印字符序列的开始标志。
- `\]`：非打印字符序列的结束标志。