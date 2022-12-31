# SolutionsAndSteps

## Solutions

1. - 报错信息：
     `fatal error: ld terminated with signal 11 [Segmentation fault], core dumped`

     ![image2](https://cdn.jsdelivr.net/gh/TinySnow/GithubImageHosting@main/Error/image2.5vyacexzff28.webp)

   - 解决方案：
  进 `Makefile` 给 `CFLAGS` 加上 `-fPIC` 参数，然后重新 `Make clean && make && make install`。
   
2. - 报错信息：

   ```bash
   ==> Verifying source file signatures with gpg...
       mumble-1.4.230.tar.gz ... FAILED (unknown public key 25F63C66245DFC60)
   ==> ERROR: One or more PGP signatures could not be verified!
   ==> ERROR: Could not download sources.
   ```

   - 解决方案：

     直接导入公钥即可。

     ```bash
     pgp –recv-keys 25F63C66245DFC60
     ```
3. - 报错信息：
     ![image5](https://cdn.jsdelivr.net/gh/TinySnow/GithubImageHosting@main/Error/image5.5o2plhldfmyo.webp)

   - 解决方案：

     直接改权限。

4. 





## Steps

1. ```bash
   cat /etc/os-release
   
   cp /etc/apt/sources.list /etc/apt/sources.list.bak
   
   vim /etc/apt/sources.list
   ```

2. 18.04 阿里云镜像

   ```bash
   deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
   
   deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
   
   deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
   
   deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
   
   deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
   ```

   

   20.04 阿里云镜像

   ```bash
   deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
   
   deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
   
   deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
   
   deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
   
   deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
   ```

3. ```bash
   apt update
   
   apt install tmux
   
   tmux new -s work
   
   apt install proxychains4
   
   vim /etc/proxychains4.conf
   ```

4. 修改

   ```bash
   socks5 10.11.73.125 7890
   http 10.11.73.125 7890
   ```

5. ```bash
   cp /mnt/e/Download/riscv32-glibc-ubuntu-18.04-nightly-2022.05.15-nightly.tar.gz ./
   
   tar -xzvf riscv32-glibc-ubuntu-18.04-nightly-2022.05.15-nightly.tar.gz
   
   apt install autoconf automake autotools-dev curl libmpc-dev libmpfr-dev libgmp-dev gawk build-essential bison flex texinfo gperf libtool patchutils bc zlib1g-dev libexpat-dev git libglib2.0-dev libfdt-dev libpixman-1-dev libncurses5-dev libncursesw5-dev ninja-build python3 autopoint pkg-config zip unzip screen make libxext-dev libxrender-dev libxtst-dev libxt-dev libcups2-dev libfreetype6-dev mercurial libasound2-dev cmake libfontconfig1-dev python3-pip gettext
   
   proxychains4 pip3 install docwriter
   
   proxychains4 wget https://download.qemu.org/qemu-5.2.0.tar.xz
   
   tar xvJf qemu-5.2.0.tar.xz
   
   cd qemu-5.2.0/
   
   ./configure --target-list=riscv32-softmmu,riscv32-linux-user --prefix=/root/qemu
   
   make -j && make install
   
   /root/qemu/bin/qemu-system-riscv32 --version
   
   mkdir build_ext_libs_riscv32 && cd build_ext_libs_riscv32
   
   proxychains4 git clone --depth=1 https://github.com/libffi/libffi
   
   proxychains4 git clone --depth=1 https://github.com/apple/cups
   
   proxychains4 git clone --depth=1 https://github.com/libexpat/libexpat
   
   proxychains4 git clone --depth=1 https://github.com/madler/zlib
   
   proxychains4 git clone --depth=1 https://github.com/glennrp/libpng
   
   proxychains4 wget https://download.savannah.gnu.org/releases/freetype/freetype-2.10.4.tar.gz && tar -xzvf freetype-2.10.4.tar.gz && mv freetype-2.10.4 freetype2 && rm -f freetype-2.10.4.tar.gz
   
   proxychains4 git clone -b json-c-0.13 --depth=1 https://github.com/json-c/json-c
   
   proxychains4 git clone --depth=1 https://gitlab.freedesktop.org/fontconfig/fontconfig
   
   proxychains4 git clone --depth=1 https://github.com/alsa-project/alsa-lib
   
   proxychains4 git clone --depth=1 https://github.com/karelzak/util-linux
   
   mkdir xorg && cd xorg && proxychains4 wget https://raw.githubusercontent.com/openjdk-riscv/xorg-util-modular/riscv32/xorg_modules && proxychains4 git clone --depth=1 -b riscv32 https://github.com/openjdk-riscv/xorg-util-modular util/modular
   
   cd ..
   
   vim build_ext_libs_32.sh
   
   
   
   
   
   
   vim zlib/Makefile
   
   
   
   
   
   
   proxychains4 git clone https://github.com/openjdk-riscv/jdk11u.git
   
   cd jdk11u
   
   git checkout 96943a
   
   proxychains4 wget https://download.java.net/openjdk/jdk10/ri/jdk-10_linux-x64_bin_ri.tar.gz
   
   tar -xzvf jdk-10_linux-x64_bin_ri.tar.gz
   
   cd ~/jdk11u
   
   bash configure --openjdk-target=riscv32-unknown-linux-gnu --disable-warnings-as-errors --with-sysroot=/root/riscv/sysroot --with-boot-jdk=/root/jdk-10 --with-native-debug-symbols=none --with-jvm-variants=zero --with-jvm-interpreter=cpp --prefix=$PWD/nodebug_32 --with-toolchain-path=/root/riscv/bin
   
   make JOBS=$(nproc) && make install
   
   cd nodebug_32/jvm/openjdk-11.0.9-internal/bin
   
   /root/qemu/bin/qemu-riscv32 -L /root/riscv/sysroot ./java -version
   ```
   
6. build_ext_libs_32.sh
   请注意，从 zlib 开始，需要单独编译，因为 zlib 需要 configure 之后加一个 CFLAGS：-fPIC，接上述第 54 行的命令，然后加上 -fPIC 参数，然后，此脚本的内容也需要进行相应更改，更改后的脚本在后面。执行最后的编译 xrog 时，注意多加了一个 --autoresume ./resume.txt 参数，而且可能会爆非常多错误，一个一个解决。

   ```bash
   #!/bin/bash
   
   # exit on error
   set -e
   
   if [ ! -n "$1" ];then
       echo "Please designate riscv toolchain path"
       exit 1
   else
       riscvpath=$1
       echo "riscv toolchian path was set as: $riscvpath"
   fi
   
   export PATH=$riscvpath/bin:$PATH
   export sysroot=$riscvpath/sysroot
   export prefix=$sysroot/usr
   
   # libffi
   cd libffi && ./autogen.sh && ./configure --host=riscv32-unknown-linux-gnu --prefix=$prefix 
   
   make && make install
   
   cd -
   
   # cups
   cd cups && ./configure --host=riscv32-unknown-linux-gnu --disable-ssl --disable-gssapi --disable-avahi --disable-libusb --disable-dbus --disable-systemd
   
   make CFLAGS="-Wno-error=sign-conversion -Wno-error=format-truncation" CXXFLAGS="-Wno-error=sign-conversion -Wno-error=format-truncation" && make install DSTROOT=$sysroot
   
   cd -
   
   # libexpat
   cd libexpat/expat && ./buildconf.sh &&./configure --host=riscv32-unknown-linux-gnu --prefix=$prefix
   
   make && make install
   
   cd -
   
   # zlib
   cd zlib && CHOST=riscv32 CC=riscv32-unknown-linux-gnu-gcc AR=riscv32-unknown-linux-gnu-ar RANLIB=riscv32-unknown-linux-gnu-ranlib ./configure  --prefix=$prefix
   
   make && make install
   
   echo "Success. exit"
   ```

   修改后的脚本：

   ```bash
   #!/bin/bash
   
   # exit on error
   set -e
   
   if [ ! -n "$1" ];then
       echo "Please designate riscv toolchain path"
       exit 1
   else
       riscvpath=$1
       echo "riscv toolchian path was set as: $riscvpath"
   fi
   
   export PATH=$riscvpath/bin:$PATH
   export sysroot=$riscvpath/sysroot
   export prefix=$sysroot/usr
   
   # zlib
   cd zlib 
   
   make clean && make && make install
   
   cd -
   
   # libpng
   cd libpng && ./configure --host=riscv32-unknown-linux-gnu --prefix=$prefix
   
   make && make install
   
   cd -
   
   # freetype2
   cd freetype2 && ./autogen.sh && ./configure --host=riscv32-unknown-linux-gnu --prefix=$prefix --with-brotli=no --with-harfbuzz=no --with-bzip2=no
   
   make && make install
   
   cd -
   
   # json-c
   cd json-c && ./autogen.sh &&  ./configure --host=riscv32-unknown-linux-gnu --prefix=$prefix
   
   make && make install
   
   cd -
   
   # fontconfig
   cd fontconfig && PKG_CONFIG_PATH=$prefix/lib/pkgconfig ./autogen.sh --host=riscv32-unknown-linux-gnu --prefix=$prefix
   
   make && make install
   
   cd -
   
   # alsa-lib
   cd alsa-lib && libtoolize --force --copy --automake && aclocal && autoheader && automake --foreign --copy --add-missing && autoconf && ./configure --host=riscv32-unknown-linux-gnu --prefix=$prefix
   
   make && make install
   
   cd -
   
   # util-linux
   cd util-linux && ./autogen.sh && ./configure --host=riscv32-unknown-linux-gnu --prefix=$prefix --disable-all-programs --enable-libuuid
   
   make && make install || true
   
   cd -
   
   # xorg
   cd xorg && CONFFLAGS="--host=riscv32-unknown-linux-gnu --disable-malloc0returnsnull" ./util/modular/build.sh  --autoresume ./resume.txt --modfile ./xorg_modules --clone $prefix
   
   echo "Success. exit"
   ```

   