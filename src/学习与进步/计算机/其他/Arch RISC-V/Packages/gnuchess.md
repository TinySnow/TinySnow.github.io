# gnuchess

## 第一次

### 报错信息

```bash
uname -m = riscv64
uname -r = 5.18.7-arch1-1
uname -s = Linux
uname -v = #1 SMP PREEMPT_DYNAMIC Sat, 25 Jun 2022 20:22:01 +0000

/usr/bin/uname -p = unknown
/bin/uname -X     = 

hostinfo               = 
/bin/universe          = 
/usr/bin/arch -k       = 
/bin/arch              = 
/usr/bin/oslevel       = 
/usr/convex/getsysinfo = 

UNAME_MACHINE = riscv64
UNAME_RELEASE = 5.18.7-arch1-1
UNAME_SYSTEM  = Linux
UNAME_VERSION = #1 SMP PREEMPT_DYNAMIC Sat, 25 Jun 2022 20:22:01 +0000
configure: error: cannot guess build type; you must specify one
```

### 解决

1. 在 `PKGBUILD` 的 `prepare()` 中添加：

   ```bash
   autoupdate
   autoreconf -fiv
   ```
- 编译构建，解决。

## 第二次

### 报错信息

```bash
make[1]: Entering directory '/build/gnuchess/src/gnuchess-6.2.9/man'
/bin/sh '/build/gnuchess/src/gnuchess-6.2.9/missing' help2man --name='GNU Chess' --info-page='gnuchess' ../src/gnuchess -o gnuchess.1
/build/gnuchess/src/gnuchess-6.2.9/missing: line 81: help2man: command not found
WARNING: 'help2man' is missing on your system.
         You should only need it if you modified a dependency of a man page.
         You may want to install the GNU Help2man package:
         <https://www.gnu.org/software/help2man/>
make[1]: * ** [Makefile:560: gnuchess.1] Error 127
make[1]: Leaving directory '/build/gnuchess/src/gnuchess-6.2.9/man'
make: ** * [Makefile:518: all-recursive] Error 1
```

### 解决

- 阅读报错消息是 `help2man: command not found`，没有找到命令，下文 `WARNING: 'help2man' is missing on your system` 也提示可能本机缺少 `help2man` 这个包。

2. 将 `help2man` 加入 `PKGBUILD` 的 `makedepends` 中，参与构建 `gnuchess` 的编译。

   ```bash
   makedepends=('help2man')
   ```

- 编译构建，解决。

## 思考

1. 在打包成功的日志后发现如下输出：

   ```bash
   Checking PKGBUILD
   Checking gnuchess-6.2.9-2-riscv64.pkg.tar.zst
   gnuchess W: Dependency included and not needed ('help2man')
   ==> Running checkpkg
     -> Checking packages
   ==> No soname differences for gnuchess.
   ```

   `gnuchess W: Dependency included and not needed ('help2man')`：包含，但不需要 `help2man` 依赖。
   
   是否可以将 `depends` 替换成 `makedepends`，将 help2man 降级为编译时依赖，仅仅参与编译？

- 解决：后续测试通过，并且没有上述那句话。

    ```bash
    Checking PKGBUILD
    Checking gnuchess-6.2.9-2-riscv64.pkg.tar.zst
    ==> Running checkpkg
      -> Checking packages
    ==> No soname differences for gnuchess.
    ```



## 综合解决方案

向 `gnuchess` 上游汇报 `config.guess` 过老的问题，然后遵循上述报错解决的步骤。