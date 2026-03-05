# Workflow

## 一、前注

- **本教程是对 Arch 小队现有文档的整合。面向新人。** 
- **如果教程中命令有输出展示，会有 `#--output--#` 相关字眼提醒。** 
- 虽涉及 RISCV 虚拟， **但如无特殊说明，均在 `x86_64` 环境下执行。** 
  如果需要进入虚拟环境执行，会在教程中显式标注。
- 教程编号从上到下如下所示，不会越级，每一级都是上一级的直接下属。
  所以如有遗漏，自行查看大纲概览。
  - 一、二、三、……
  - 一）二）三）……
  - 1. 2. 3. ……
  - 1）2）3）……
  - A. B. C. ……
  - A）B）C）……
  - i. ii. iii. ……
  - i）ii）iii）……
- **由其他教程中复制来的内容，均按上述进行了格式修改。** 

## 二、环境搭建

直接跳转 [Wiki](https://github.com/felixonmars/archriscv-packages/wiki/%E4%BD%BF%E7%94%A8Qemu%E5%92%8Csystemd-nspawn%E6%90%AD%E5%BB%BARISC-V%E8%BD%BB%E9%87%8F%E7%BA%A7%E7%94%A8%E6%88%B7%E6%A8%A1%E5%BC%8F%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83) 查看。

## 三、准备工具

### 一）参照教程

直接跳转 [教程](https://riscv-notes.sh1mar.in/docs/guide/start-guide/) 查看。

### 二）其他必要工具

- 克隆 `PKGBUILD` 的 `asp` 工具：

  ```bash
  sudo pacman -S asp
  ```

- `conf` 文件内容替换工具：

  ```bash
  sudo pacman -S setconf
  ```

## 四、开始修包

### 一）前注

以下内容根据 [Cloudflare 教程](https://riscv-notes.sh1mar.in/docs/guide/build-guide) 复制，然后修改而来，加入部分内容。在第 5. 点之前，修改和添加内容均已添加<u>下划线</u>，第 5. 点之后均为添加内容。

### 二）工作流介绍

肥猫（项目主负责人）会不断的将 x86-64 源里的软件包脚本在 RISC-V 上进行编译。 成功的将会直接加入 RISC-V 的源里，失败的会把日志文件放在 https://archriscv.felixc.at/.status/status.htm 里并对这个包标记上 FTBFS 标志。 FTBFS 是 "Fail To Build From Source" 的缩写。我们的任务就是尝试修复这些包。

日常你不需要在上面那个网页搜，我们还有一个工会页记录了包的状态：

https://plct-archrv.ax64.workers.dev/

其中，左边是包的名字，点击包的名字可以直接跳转到上一次包构建的日志。 你需要注意看右边的 mark 标记，上面会记录着每一个包当前的状态。 你可以把鼠标移动到标记上来查看详细信息。

### 三）领取软件包（可选，推荐）

找到一个想修的包，查看第三列的状态，看看是不是已经有人正在修，或者已经修好了。 

如果是一个没人处理的包，你可以到群里用 `/add` 命令来获取这个包的锁，让同事知道你已经在处理这个包了。比如你现在想修 rust，那么发送 `/add rust` 即可。

如果你是普通路人，那么只需要去仓库看看有没有冲突 pr 即可。

 **<u>推荐加锁，以免重复工作。入群方式请 PM 肥猫负责人（Telegram：@felixonmars）。</u>** 

### 四）修包

#### 1. 下载构建脚本文件

```bash
asp checkout rust
```

#### 2. 修改架构

上一步的命令会将上游的构建脚本 clone 到当前文件夹。 

你需要进入包目录下的 trunk 目录，修改 PKGBUILD 的构建架构。

```bash
cd rust/trunk
setconf PKGBUILD arch "('x86_64' 'riscv64')"
```

这一步可以允许我们在 riscv64 架构下运行这个编译脚本。

#### 3. 创建缓存文件夹

我们还需要构建一个文件夹作为包的缓存。

在编译过程中，pacman 会下载脚本 需要的依赖包，如果缓存文件夹复用，不干净就会导致构建时依赖安装失败等问题。

```bash
# 你可以直接创建一个固定的文件夹
mkdir ~/.cache/pkgcache
# 也可以随便创建一个临时文件夹
mktemp -d -t "pkgcache_XXX"
```

<u>推荐直接建立固定文件夹 `cache`，修下一个软件包时，进入 `cache` 文件夹清空即可。如：</u>

```bash
mkdir cache
# 修好包之后
cd cache
rm -rf *
```

#### 4. 开始构建

安装好 archlinuxcn 源里的 devtools 之后，我们会有 RISC-V 专用的 `extra-riscv64-build` 工具来帮助我们构建。

```bash
export CACHE_DIR="YOUR CACHE DIRECTORY"
extra-riscv64-build -- -d "$CACHE_DIR:/var/cache/pacman/pkg"
```

这里的 `-d` 函数会把 `$CACHE_DIR` 到 `/var/cache/pacman/pkg` 的路径映射参数传到下一层的 `makechrootpkg` 程序。在 `chroot` 里下载的软件包可以在 `$CACHE_DIR` 里找到。

- 注意：

<u> **`export` 命令只对当前窗口有效，包括对 `screen` 和 `tmux`。如果进行多窗口操作，则需要每一个窗口执行该命令。如果觉得该操作过于繁琐，可以写进 `.bashrc` 文件中。** </u>

#### 5. 查找原因

上述构建之后不出意外会失败，此时需要根据报错信息查找对应原因。

常见错误大约会有以下几种：

##### 1）`extra-riscv64-build` 启动报错

- 报错信息：
  `/var/lib/archbuild/extra-riscv64-build/<user> does not appear to be an Arch chroot`
- 解决方案：
  删除 `/var/lib/archbuild/extra-riscv64-build/`。
- 详见：https://github.com/felixonmars/archriscv-packages/wiki/FAQ

##### 2）PGP 签名未认证

- 报错信息：

  ```shell
  ==> Verifying source file signatures with gpg...
  	<package>...FAILED (unknown public key <key>)
  ==> ERROR: One or more PGP signatures could not be verified!
  ==> ERROR: Could not download sources.
  ```

- 解决方案：
  手动导入 PGP 公钥。

  ```bash
  gpg --recv-keys <key_in_the_error_info>
  ```

##### 3）其他已知错误

详见 [Wiki FAQ](https://github.com/felixonmars/archriscv-packages/wiki/FAQ) 和 [Record](https://riscv-notes.sh1mar.in/docs/record/collection)。

##### 4）其他乱七八糟的错误

此处仅提供思路分析。

###### A. 定位问题

查看报错信息，是在 `PKGBUILD` 哪个函数。如：

```bash
==> ERROR: A failure occurred in build().
    Aborting...
==> ERROR: Build failed, check /var/lib/archbuild/extra-riscv64/felix19/build
```

进入 `PKGBUILD`，找到相关函数，定位更细节的错误。如上例中 `build()` 函数。

可以使用输出调试法，给函数加上 `echo` 语句，然后再次执行，观察哪里出了问题。

也可以使用断点调试法，起 GDB 打断点调试。下例中使用输出调试。

```bash
check(){
  cd ninja-$pkgver
  
  python ./configure.py
+ echo "python ./configure.py step is DONE."
  ./ninja ninja_test
+ echo "./ninja ninja_test step is DONE."
  ./ninja_test
+ echo "./ninja_test is DONE."
}
```

以 `+` 号开头的语句是我们自己加上的，`+` 号在实际编写时不用写，仅在此处用作标识。

重新执行 `PKGBUILD`，然后观察 log，第一句应显示而未显示的 echo 语句的前一命令，便是具体的错误发生处。

###### B. 找出原因

如上述 `ninja` 包，是 `./ninja_test` 执行出错，我们可以到 `RISC-V` 虚拟环境中，具体寻找原因。

- 启动 `riscv` 的 `arch` 虚拟环境，传入 `chroot` 路径。如：

  ```bash
  arch-nspawn /var/lib/archbuild/extra-riscv64/tinysnow
  ```

- 进入编译失败的 `ninja` 包路径。
  此命令在 riscv 虚拟环境中执行：

  ```bash
  cd /build/ninja/src/ninja
  ./ninja_test
  ```

- 然后查看具体输出，查找原因。

注意，有可能是 qemu 虚拟的问题，此情况包可能有错也有可能没有错，需要到开发板上进行验证。

相关事宜在  七、其他   中说明。

## 五、抽出 patch 文件

### 一）前注

- 修复的包必须能抽出 patch 文件的包。
  如，该包仅是依赖错误，或者 qemu 的神奇 bug，则不需抽出 patch 文件，等待依赖更新，或者打上相应标签即可。
- 直接阅读原[教程](https://riscv-notes.sh1mar.in/docs/guide/PR-guide#%E5%A6%82%E4%BD%95%E5%88%9B%E5%BB%BA-patch)。

### 二）将 `riscv64.patch` 中的架构修改删除

确认无误后，将架构修改回去，也即 `patch` 文件不要修改 arch 架构那一行，机器人自动会处理好。

详见[代码规范](https://riscv-notes.sh1mar.in/docs/guide/PR-guide#%E4%B8%8D%E8%A6%81%E6%8F%90%E4%BA%A4%E5%AF%B9-arch-%E7%9A%84%E4%BF%AE%E6%94%B9)。

使用各种工具删除类似下面的内容即可。

```diff
16,5 16,5 @@ build(){
--- arch=('x86_64')
+++ arch=('x84_64', 'riscv64')
}
```

### 三）将 patch 文件从服务器拉到本地（可选）

如果是 Windows 主用，可以将服务器上抽出来的 `riscv64.patch` 文件传输到本地，然后进行本地提交。

```bash
scp -P <server_port> <username>@<server_address>:<path_to_riscv64.patch> <local_path_wanna_save>
```

### 四）提交到 git

#### 1. fork arch 小队主仓库到自己账号

#### 2. git clone 自己账号里 fork 下来的仓库

#### 3. 添加到 git

```bash
mkdir <package_name_you_fixed>
```

将 `riscv64.patch` 文件移动到新建立的文件夹内。

```bash
git add *

git commit -m "<commit_message>"

git push origin <branch_name>
```

## 六、提交 Pull Request

如何提交 PR 自行搜索，提交完后等待合并。

如果提交过程中有其他 Contributor 提交了 Commit，可能需要自行 rebase 修改。

## 七、其他

#### 一）其他重要参考资料

- [Github Repo Wiki](https://github.com/felixonmars/archriscv-packages/wiki)
- [Cloudflare Tutorial](https://riscv-notes.sh1mar.in/docs/intro)
- [BiliBili Video Update](https://www.bilibili.com/video/BV19a41177fN)

#### 二）关于入组考核方式变更

根据 Arch 小组在 BiliBili 上更新的视频，入组方式已经由：

- 为 Arch RISCV 修复一个包，提交一个 PR

变更为：

- 打出一个可用的包

详见参考资料中的 BiliBili Video Update。

### 三）关于修包

有些可能不是包本身的问题，而是 qemu 虚拟出问题。此时需要到 RISCV 开发板上跑一遍。

开发板申请是需要条件的，如果是路人请放弃这个包吧。











