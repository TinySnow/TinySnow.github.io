# Recovery + Root 掉落重新刷入方法

- 选择 F:\Download 下的一个 recovery.img；
  - 通常是 SHRP_vX.X_stable-Official_violet-XXXXXXXXXX.zip 解压之后得到的 recovery.img
- 右键 Open in Windows Terminal；
  - 或者 PowerShell 或者 cmd 也行
- 输入命令：

```shell
fastboot flash recovery .\recovery.img
```

- 等待刷好，进入 Recovery；
- 选中 Magisk-vXX-X.zip 文件刷入；
- 开机；
- 开启 黑域，存储空间隔离，App Ops，Shizuku 等应用；
- 若有需要，可上 Magisk 查看是否需要更新核心（Core）；
- 使用。

