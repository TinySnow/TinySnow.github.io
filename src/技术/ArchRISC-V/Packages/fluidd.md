# fluidd

## 第一次

### 报错信息

> node: error while loading shared libraries: libicui18n.so.70: cannot open shared object file: No such file or directory

### 尝试

1. `prepare()` 加上 `sudo pacman -S <name>`，`<name>` 替换成 `icu`，`libicu`，` libicui18n`。失败。
2. 查询信息，可能是系统和 `icu` 库版本问题，`prepare()` 加上 `pacman -Syu` 或 `pacman -Syyu`。失败。
3. 同1.，位置在 `makedepends`。失败。



## 附注

- 查询资料，`m4` 宏定义位于 `configure.ac`。
`Stack Overflow` [原文](https://stackoverflow.com/questions/5298830/how-to-include-m4-files-in-autoconf)：
  
  > You may want to add AC_CONFIG_MACRO_DIR to `configure.ac` to the directory where the macro is:
  >
  > `AC_CONFIG_MACRO_DIR([path/to/macros])`
  >
  > You'll need to invoke the macro somewhere in this file also.






