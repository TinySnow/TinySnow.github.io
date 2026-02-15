# Cargo无法连接网络

- cargo 换成国内源之后执行 `cargo update` 或者需要编译的 `cargo run` `cargo build` 之类的命令仍然会出现下列错误：

```bash
    Updating `mirror` index
warning: spurious network error (3 tries remaining): [35] SSL connect error (Recv failure: Connection was aborted); class=Net (12)
warning: spurious network error (2 tries remaining): [35] SSL connect error (Recv failure: Connection was aborted); class=Net (12)
warning: spurious network error (1 try remaining): [35] SSL connect error (Recv failure: Connection was reset); class=Net (12)
error: failed to get `anyhow` as a dependency of package `beancount-importer-rust v0.1.0 (C:\Users\Snow\Desktop\beancount-importer-rust)`

Caused by:
  failed to load source for dependency `anyhow`

Caused by:
  Unable to update registry `crates-io`

Caused by:
  failed to update replaced source registry `crates-io`

Caused by:
  failed to fetch `https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git`

Caused by:
  network failure seems to have happened
  if a proxy or similar is necessary `net.git-fetch-with-cli` may help here
  https://doc.rust-lang.org/cargo/reference/config.html#netgit-fetch-with-cli

Caused by:
  [35] SSL connect error (Recv failure: Connection was aborted); class=Net (12)
```

- 解决方法：代理出了问题，不清除 git 的代理，清除 cargo 的代理即可，在 .cargo 主目录的 cargo.toml 设置里面取消 proxy。设置末尾加上：

```toml
[http]
proxy = "" # 留空字符串将代理重置为默认值
```

