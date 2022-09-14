# Packages

## Description

修复软件包过程中，所使用的的方法和结果文档。

使用软件包名作为文件名，分文件进行记录。过于简单的软件包不做文档记录。

## TODOList

下列是打算攻克的软件包名：

- molecule-docker(已被他人修复，缺少依赖)
- lapce
- fluidd
- ltrace
- libretro-pcsx2
- memcached
- libffado(已被他人修复，硬编码 `config.guess`)

## FixedList

- dump_syms (`ring` trivial)
- perl-file-rsyncp (`config.guess` trivial)
- ninja (`noqemu`)
- openipmi (`config.guess` trivial)
- taplo-cli (Rust `--target "$CARCH-unknown-linux-gnu"` trivial)
- cargo-edit (rotten)
- bupstash (Rust `--target "$CARCH-unknown-linux-gnu"` trivial)
- gnuchess (`config.guess` trivial)
- git-grab (Rust `--target "$CARCH-unknown-linux-gnu"` trivial)
- libicns (`config.guess` trivial)
- wxsqlite3 (`config.guess` trivial)
- cargo-tauri (Rust `--target "$CARCH-unknown-linux-gnu"` trivial)
- grafana-agent (update go 1.19)
- system-config-printer (`config.guess` trivial)
- auth-tarball-from-git (Rust `--target "$CARCH-unknown-linux-gnu"` trivial)
- dante (`config.guess` trivial)
- iftop (`config.guess` trivial)
- link-grammar (`config.guess` trivial)
- arti (Rust `--target "$CARCH-unknown-linux-gnu"` trivial)
- distrobuilder (`fix-static-declaration-of-lxd` patch)
- gsoap (`config.guess` trivial)
- libopenraw (`config.guess` trivial)