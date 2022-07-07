# imagescan

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

> ./configure: line 25005: syntax error near unexpected token \`newline'
>
> ./configure: line 25005: \`             ' ' '

### 解决

- vim 跳转到 25005 行，代码如下：

```bash
case $as_dir in #(((
    ''
fi as_dir=./ ;;
    */) ;;
    *) as_dir=$as_dir/ ;;
esac
```

- vim 搜索 as_dir，顺着 configure 往上爬，发现一个类似结构：

```bash
case $as_dir in #(((
    '') as_dir=./ ;;
    */) ;;
    *) as_dir=$as_dir/ ;;
esac
```

- 定位原因：autotools 将 ) 替换为 fi。
- 比对原始 configure，复制一份 configure.bak，然后生成 patch：

```bash
cp ./configure ./configure.bak
# vim 修改 configure
git diff --no-index ./configure ./configure.bak > tmp.patch
```

2. 将 patch 引入 PKGBUILD 中的 source，然后添加 sha256sum 校验。

```bash
# 将 patch 添加进 source
# 将 patch 的 sha256 添加进 sha256sums，sha256 校验值的获得通过如下命令：
sha256sum tmp.patch
# 将 prepare() 函数中，打入 patch，注意 -NpX 中的 X 根据 patch 层级改变而改变
prepare() {
  # before... 
  autoupdate
  autoreconf -fiv
  patch -Np0 -i ../tmp.patch
  # after...
}
```

- 编译构建，解决。

## 第三次

### 报错信息

> ./configure: line 25166: syntax error near unexpected token \`)'
>
> ./configure: line 25166: `esac)'

### 解决

3. 问题同上，很明显需要将 esac 后的 ) 删除，解决方式相同。patch 文件需要重新 sha256sum，文件里面会有两处修改，一处第二次，一处第三次。

- 编译构建，解决。

## 第四次

### 报错信息

> ./configure: line 29008: syntax error: unexpected end of file

### 未解决

- 不期望的文件结束，猜测可能有两种结果：
  - 代码没有写完；
  - bash 的 if .. fi 或者 for .. done 没有凑齐，如第一次，多出来 fi。
- vim 跳转 29008 行，发现是文件结尾，检查末尾附近，bash 格式没有问题。
- 临近末尾有版权信息，vim 搜索 Copyright，发现许多处版权信息没有使用注释的格式。
- 仔细观察发现许多地方有 _ACEOF 和 _LT_EOF 标识，临近结尾许多地方在 vim 中颜色标识不一样，可能 EOF 中间没有正常中止，但是没有经过检验。
- 汇报上游。

## 思考

1. 经过第二次和第三次，怀疑是 autoreconf 的问题。

   - risc-v 架构：
     - 未添加 reconf 报不能猜测类型；
     - 添加 reconf 报各种 bash 语法错误。
   - x86_64 架构：
     - 未添加 reconf 未检验；
     - 添加 reconf 报相同的 bash 语法问题（架构加不加入 risc-v 结果相同）。
       ```bash
       # 效果相同
       arch=('x86_64')
       arch=('x86_64' 'riscv64')
       ```

2. 经过询问，发现之前有人报过 [issue](https://savannah.gnu.org/support/?110480#comment0)。

## 综合解决方案

向 `imagescan` 上游汇报一下 `config.guess` 过老的问题。然而此方案 `autotools` 本身的问题还是没有解决。

