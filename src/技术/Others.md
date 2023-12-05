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

## 打印机

### 惠普打印机驱动

#### 安装操作耗时过长，无法执行

##### 症状

安装操作耗时过长，无法执行。这是一种会造成产品不能使用的严重错误。

请重新启动计算机，然后再次运行此安装程序。如果问题仍然存在，请查看相应产品的产品支持网站。

##### 解决方案

1.确保打印机 hp smart install 处于关闭状态；

2.usb 连接无误；

3.驱动与打印机型号对应；

4.如果用 usb 连接方式还是死活安装不上，提示安装时间过长的话，用无线方式安装，选择手动输入，让驱动程序自己检测，检测出来不支持或者找不到之后直接返回上一步，然后惠普的破烂驱动就能自己安装和配置驱动了。