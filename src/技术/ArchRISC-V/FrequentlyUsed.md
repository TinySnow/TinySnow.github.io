# Frequently Used

## 机器连接

详见 [Important Docs Save](https://t.me/c/1517524545/2).

## 常用命令

```bash
extra-riscv64-build -- -d "$CACHE_DIR:/var/cache/pacman/pkg" -l tinysnow_2

arch-nspawn /var/lib/archbuild/extra-riscv64/tinysnow
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

