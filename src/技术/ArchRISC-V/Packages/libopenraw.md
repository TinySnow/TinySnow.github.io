# libopenraw

## 第一次

### 报错信息

> configure: error: cannot guess build type; you must specify one

### 解决

1. 在 `prepare()` 中添加：

   ```bash
   cd ${pkgname}-${pkgver}
   autoupdate
   autoreconf -fiv
   cd -
   ```
- 编译构建，解决。

## 第二次

### 报错信息

> ./configure: line 17110: syntax error near unexpected token \`noext,mandatory'
>
> ./configure: line 17110: \`AX_CXX_COMPILE_STDCXX_14(noext,mandatory)'

### 解决

- 查看 `configure` 文件相应位置，发现大概是 `m4` 宏未展开，遂尝试修复。

- 未发现 `AX_CXX_COMPILE_STDCXX_14` 宏定义：
  - `m4` 文件夹下每一个 `.m4` 文件；
  - 源码文件夹下 `aclocal.m4` 文件。

- 发现是 `autoreconf` 之后删除了宏定义：
  - 删除 `autoreconf` 之后，宏定义位于源码文件下 `aclocal.m4` 文件中。

  - 阅读注释，需要下载 `ax_cxx_compile_stdcxx.m4` 。
    同时可能需要将此文件 `patch` 到 `autoreconf` 之后的 `aclocal.m4` 中。

    > If you want to use this macro, you also need to download the ax_cxx_compile_stdcxx.m4 file.

  - 搜索上述文件，加入 `source` 和 `b2sums`，发现仍然不行。

  - 然后翻源码文件夹下 `aclocal.m4` 发现未添加进 m4 列表，尝试引入。

2. 将各部分应修改的位置 patch 进源码。

- 编译构建，解决。

## 第三次

### 报错信息

> ./configure: line 19399: syntax error near unexpected token \`-fvisibility=hidden'
>
> ./configure: line 19399: `AX_APPEND_COMPILE_FLAGS(-fvisibility=hidden)'

### 未解决

3. 大概是同样的错误，于是寻找 `AX_APPEND_COMPILE_FLAGS`，后放弃。

- 汇报上游。

## 第四次（上游回复）

> If you have `autoconf-archive` it should work, that's where the `AX_*` macro are (and that what Google will send you to)
>
> However, when C++14 became required, the local files where not upgraded. This will be in the next release.

详见 [#11](https://gitlab.freedesktop.org/libopenraw/libopenraw/-/issues/11)。

根据上游指示，尝试使用 `autoconf-archive` 进行修复。

### 解决

4. 在 `PKGBUILD` 里加入 `autoconf-archive`：

```bash
makedepends=('autoconf-archive')
```

- 编译构建，解决。

## 第五次

### 报错信息

> error: process didn't exit successfully: `rustc -vV` (exit status: 127)
>
> --- stderr
> rustc: error while loading shared libraries: libLLVM-13.so: cannot open shared object file: No such file or directory

### 解决

5. 在 `PKGBUILD` 里加入 `llvm13`：

```bash
makedepends=('llvm13')
```

- 编译构建，解决。
- 随后了解到，此报错信息属于 `LLVM` 自身问题，虽然能通过编译，但是改动不合法，需要静待 `LLVM13` 维护者更新解决。

## 思考

- 是否可以使用 `wget` 等工具在线直接下载 `AX_CXX_COMPILE_STDCXX` 和 `AX_CXX_COMPILE_STDCXX_14`，然后直接加入 `source` 或者 `dependencies`？

## 综合解决方案

从上游回复处，遵循给出的解决方案，解决问题。随后静待 `LLVM13` 维护者更新。

### 2022 年 9 月 13 日 更新

`LLVM13` 更新之后，综合第一次和第四次的方案，成功出包。