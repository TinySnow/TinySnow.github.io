# Frequently Used

## 机器连接

详见 [Important](https://github.com/TinySnow/Important).

## 常用命令

```bash
extra-riscv64-build -- -d "$CACHE_DIR:/var/cache/pacman/pkg" -l tinysnow_2

arch-nspawn /var/lib/archbuild/extra-riscv64/tinysnow

git diff --no-index ${before_modified} ${after_modified} > ${patch_name}.patch

cp /var/lib/archbuild/extra-riscv64/tinysnow/build/${pkgname}/src/${some_path}/${patch_name}.patch
```

## .bashrc

```bash
# append
export CACHE_DIR="/home/tinysnow/cache"
# 这里按环境配置可以替换成任意空文件夹
alias rv64build="updpkgsums && extra-riscv64-build -- -d $CACHE_DIR:/var/cache/pacman/pkg"
alias nohuprv64build="updpkgsums && nohup extra-riscv64-build -- -d $CACHE_DIR:/var/cache/pacman/pkg &"
# alias 可以随便改
alias prep=". ~/.bin/prepare.sh"
alias gib=". ~/.bin/gib.sh"
```

## Gib.sh

```bash
#!/usr/bin/bash -e

[ $# -eq 0 ] && echo "You need to provide a package name." && exit 1 

cd ~/archpkgs

asp update
asp checkout "$1" || true

cd ./"$1"/repos/*-x86_64

# 将第一个 x86_64（`arch=(x86_64)`）换成 riscv64 并保留格式，如果 arch 是 any 则不改
setconf PKGBUILD arch "('x86_64' 'riscv64')"

. /usr/share/makepkg/util.sh
. ./PKGBUILD
for key in "${validpgpkeys[@]}"; do
    echo "Receiving key ${key}..."
    # try both servers as some keys exist one place and others another
    # we also want to always try to receive keys to pick up any update
    gpg --keyserver hkps://keyserver.ubuntu.com --recv-keys "$key" || true
    gpg --keyserver hkps://keys.openpgp.org --recv-keys "$key" || true
done

colorize

is_array source && \
    printf "${RED}source = ${ALL_OFF}%s\n" "${source[@]}" # 方便检查源码是 .tar.*z 还是 git+，可以删掉
is_array _commit && \
    printf "${RED}_commit = ${ALL_OFF}%s\n" "${_commit[@]}"

asp untrack "$1"
```

## Prepare.sh

```bash
#!/usr/bin/bash

if [ $# -eq 0 ]
  then
    echo "You need to provide a PKGBUILD file, or a directory that contains a PKGBUILD file."
  else

cd "$(dirname "$1")"

PREPARE_SRC_DIR=$(pwd)

updpkgsums

if [ $? -eq 0 ]
 then

setconf PKGBUILD arch "('x86_64')"  # 把 arch 换回去

git diff --no-prefix --relative ./PKGBUILD | tail -n +3 > ./riscv64.patch  # 去掉 git diff 生成的 header，确保 patch 干净
cat ./riscv64.patch  # 给你看看 diff 长啥样

cd ../..
fname=$(basename "$PWD")  # 拿到包名
cd ./repos/*-x86_64

mkdir ~/prepare_tmp_dir
cp ./riscv64.patch ~/prepare_tmp_dir/
cd ~/archriscv-packages

echo "Pulling from upstream (Fast-Forwarding)..."

git checkout master
git pull --ff-only upstream master:master
# make sure origin is up-to-date
git push
git checkout -b "$fname" || git checkout "$fname"
mkdir "$fname"
cd "$fname"

TARGET_DIR=$(pwd)

mv ~/prepare_tmp_dir/riscv64.patch .
rmdir ~/prepare_tmp_dir

echo "Done. Now you can do:"
echo ""
echo "# first, copy necessary patches to this dir:"

cd $PREPARE_SRC_DIR
# Yes, I'm a shell magician
find ~+ -type f -name "*.patch" | sed -e "s|$HOME|~|g" | awk -F " " '{print "  cp " $1 " ."}'
cd $TARGET_DIR

echo ""
echo "# then:"
echo "  git add ."
echo "  git commit -m \"addpkg: $fname\""
echo "  git push -u origin $fname"
echo ""

  fi  # if [ $? -eq 0 ] ends here
fi  # if [ $# -eq 0 ] ends here
```

## 新机器 Flow

1. 换源（不是国内机器则跳过）

   - 更新源
   - 更新软件包或滚包（Arch 系列）

2. 下载 `proxychains` 代理（如果没有网络业障则跳过）

   - 配置 `proxychains`

3. 更新 dotfiles

```bash
# 推荐 MIT 老师 Anish 的 dotfiles 一键配置
cd ~
# 如果是 WSL2，先要打开代理软件的 Allow LAN
proxychains git clone https://github.com/anishathalye/dotfiles
cd dotfiles && proxychains ./install
```

4. 半自动 bash script

```bash
git config --global user.name "TinySnow"
git config --global user.email "lo.tinysnow.ol@outlook.com"

# 消除 `-bash: hostname: command not found` 提示
sudo pacman -S inetutils

cd ~
rm -rf .bashrc .bash_profile
git clone https://github.com/anishathalye/dotfiles.git && cd dotfiles
./install

cd ~
echo -e '\n# append
export CACHE_DIR="/home/tinysnow/cache"
# 这里按环境配置可以替换成任意空文件夹
alias rv64build="updpkgsums && extra-riscv64-build -- -d $CACHE_DIR:/var/cache/pacman/pkg"
alias nohuprv64build="updpkgsums && nohup extra-riscv64-build -- -d $CACHE_DIR:/var/cache/pacman/pkg &"
# alias 可以随便改
alias prep=". ~/.bin/prepare.sh"
alias gib=". ~/.bin/gib.sh"' >> ~/.bashrc

cd ~
mkdir ~/.bin
touch ~/.bin/prepare.sh
touch ~/.bin/gib.sh
chmod +x ~/.bin/*.sh
mkdir ~/archpkgs
mkdir ~/cache

# 以下手动操作
vim ~/.bin/gib.sh
vim ~/.bin/prepare.sh
# 添加 ssh 私钥
vim ~/.ssh/id_rsa
# 更改私钥的权限
chmod 700 ~/.ssh/id_rsa

cd ~
git clone git@github.com:TinySnow/archriscv-packages.git
cd archriscv-packages
git remote add upstream https://github.com/felixonmars/archriscv-packages.git
cd -
```