# grafana-agent

## 错误排查

### 报错消息

```console
panic: Something in this program imports go4.org/unsafe/assume-no-moving-gc to declare that it assumes a non-moving garbage collector, but your version of go4.org/unsafe/assume-no-moving-gc hasn't been updated to assert that it's safe against the go1.19 runtime. If you want to risk it, run with environment variable ASSUME_NO_MOVING_GC_UNSAFE_RISK_IT_WITH=go1.19 set. Notably, if go1.19 adds a moving garbage collector, this program is unsafe to use.
```

### 过程记录

1. Google 一部分报错消息中的关键词（`assume-no-moving-gc` 等） ，但是没有什么作用。
2. 在上游 Github Repository 中搜索相关报错信息，一个 Issue 进入视线，与报错信息一致。
3. 阅读 Issue，发现上游已经通过一个 PR 进行修复，遂查看 PR。
4. 将 PR 的链接加上 `.patch` 后缀，用 `wget` 进行下载保存，删去多余部分，打入 `PKGBUILD`。
5. 编译构建，发现有一个 option（`export GOPROXY=off`）会导致编译失败，于是改成 on。
6. 仍然失败，GOPROXY 开启时后面需要填入的不是 on，而是一个 scheme，因机器环境不一致，不一定能让代理生效，所以直接删去。
7. 编译构建成功。

### 相关资料

- [PR](https://github.com/grafana/agent/pull/1985)
- [Issue](https://github.com/grafana/agent/issues/1983)

## 思考

- 从该包的修复中总结出了一个流程，详见工作。