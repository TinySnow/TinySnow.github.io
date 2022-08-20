# Frequently Used

## 机器连接

```bash
ssh tinysnow@tx.seiuneko.moe -p 57632
ssh tinysnow@timicasto.sukazyo.cc -p 52525
ssh tinysnow@nidorino.felixc.at
ssh tinysnow@shellder.felixc.at
# 跳板机
ssh tinysnow@magmortar.felixc.at -J tinysnow@chimchar.felixc.at
ssh tinysnow@darmanitan.felixc.at -J tinysnow@chimchar.felixc.at

scp tinysnow@nidorino.felixc.at:/home/tinysnow/archpkgs/_/trunk/riscv64.patch F:\Projects\Others\Tmp

```



## 工作流

```bash
gpg --recv-keys

export CACHE_DIR="/home/tinysnow/cache"

setconf PKGBUILD arch "('x86_64' 'riscv64')"

extra-riscv64-build -- -d "$CACHE_DIR:/var/cache/pacman/pkg" -l tinysnow_2

git diff --no-prefix | sed 's/trunk\///' > riscv64.patch

arch-nspawn /var/lib/archbuild/extra-riscv64/tinysnow
```
