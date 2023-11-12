# 其他知识

## Windows

### 自定义脚本开机运行

- Win + R：`shell:startup`
- 编写 .bat 脚本放置在弹出的目录下即可

### CMD 后台运行

- 在 .bat 文件开头加入下面几行：

```powershell
@echo off
if "%1"=="h" goto begin
start mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
```

### 查看电脑型号

- `wmic csproduct get name`

