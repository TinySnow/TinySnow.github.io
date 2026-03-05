# Windows 相关

## 自定义脚本开机运行

- Win + R：`shell:startup`
- 编写 .bat 脚本放置在弹出的目录下即可

## CMD 后台运行

- 在 .bat 文件开头加入下面几行：

```powershell
@echo off
if "%1"=="h" goto begin
start mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
```

## 查看电脑型号

- `wmic csproduct get name`

## Win11 重装系统跳过登陆账号阶段

1. Shift + F10，调出 cmd 窗口
2. `oobe\bypassnro`

## KMS 激活系统

1. 调出 cmd 窗口
2. `slmgr /skms kms.03k.org` 将系统密钥管理器换成命令里的 kms 服务器
3. `slmgr /ato` 激活系统

## HWID 激活系统（未试验）

1. Open PowerShell (Not CMD). To do that, right-click on the Windows start menu and select PowerShell or Terminal.
2. Type `irm https://get.activated.win | iex` , then Enter.
3. You will see the activation options. 
   1. Choose [1] HWID for Windows activation.
   2. Choose [2] Ohook for Office activation.
4. That's all.
