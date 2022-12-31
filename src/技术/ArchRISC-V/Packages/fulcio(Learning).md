# fulcio(Learning)

## 前注

此包由其他人（芝麻/飞鸟）修复。因能力不足，向其解决方法学习。

## 原始报错信息

```console
==> Starting check()...
go test ./...
fatal: not a git repository (or any of the parent directories): .git
fatal: not a git repository (or any of the parent directories): .git
?   	github.com/sigstore/fulcio	[no test files]
2022-08-12T19:36:25.288Z	INFO	app/grpc.go:103	listening on grpc at :::45993
2022-08-12T19:36:25.302Z	FATAL	app/http.go:56	parse "passthrough:///:0\x00\x00\x00\x00\x00\x00": net/url: invalid control character in URL
github.com/sigstore/fulcio/cmd/app.createHTTPServer
	github.com/sigstore/fulcio/cmd/app/http.go:56
github.com/sigstore/fulcio/cmd/app.setupHTTPServer
	github.com/sigstore/fulcio/cmd/app/http_test.go:61
github.com/sigstore/fulcio/cmd/app.TestHTTPCORSSupport
	github.com/sigstore/fulcio/cmd/app/http_test.go:71
testing.tRunner
	testing/testing.go:1446
FAIL	github.com/sigstore/fulcio/cmd/app	0.692s
?   	github.com/sigstore/fulcio/cmd/create_tink_keyset	[no test files]
?   	github.com/sigstore/fulcio/cmd/fetch_ca_cert	[no test files]
?   	github.com/sigstore/fulcio/examples/request-certificate	[no test files]
?   	github.com/sigstore/fulcio/federation	[no test files]
ok  	github.com/sigstore/fulcio/pkg/api	1.250s
ok  	github.com/sigstore/fulcio/pkg/ca	0.388s
ok  	github.com/sigstore/fulcio/pkg/ca/baseca	0.388s
ok  	github.com/sigstore/fulcio/pkg/ca/ephemeralca	0.351s
ok  	github.com/sigstore/fulcio/pkg/ca/fileca	5.856s
ok  	github.com/sigstore/fulcio/pkg/ca/googleca/v1	16.198s
ok  	github.com/sigstore/fulcio/pkg/ca/kmsca	0.541s
?   	github.com/sigstore/fulcio/pkg/ca/pkcs11ca	[no test files]
ok  	github.com/sigstore/fulcio/pkg/ca/tinkca	2.500s
ok  	github.com/sigstore/fulcio/pkg/challenges	2.999s
ok  	github.com/sigstore/fulcio/pkg/config	5.211s
ok  	github.com/sigstore/fulcio/pkg/ctl	0.205s
?   	github.com/sigstore/fulcio/pkg/generated/protobuf	[no test files]
?   	github.com/sigstore/fulcio/pkg/generated/protobuf/legacy	[no test files]
ok  	github.com/sigstore/fulcio/pkg/identity	0.206s
ok  	github.com/sigstore/fulcio/pkg/identity/email	0.359s
ok  	github.com/sigstore/fulcio/pkg/identity/github	0.264s
ok  	github.com/sigstore/fulcio/pkg/identity/kubernetes	0.256s
ok  	github.com/sigstore/fulcio/pkg/identity/spiffe	0.293s
ok  	github.com/sigstore/fulcio/pkg/identity/uri	0.269s
ok  	github.com/sigstore/fulcio/pkg/identity/username	0.267s
?   	github.com/sigstore/fulcio/pkg/log	[no test files]
ok  	github.com/sigstore/fulcio/pkg/oauthflow	0.210s
ok  	github.com/sigstore/fulcio/pkg/server	66.183s
?   	github.com/sigstore/fulcio/pkg/test	[no test files]
?   	github.com/sigstore/fulcio/test/prometheus	[no test files]
FAIL
make: *** [Makefile:91: test] Error 1
```

## 过程

1. Log 定位 URL 规范问题
2. 反推变量名，以及 listen host 有问题
   - 期间讨论，我说有个类似的报错，其另一个 repo 说是 Windows 行尾符 `\r` 残留，芝麻否定此可能
3. 猜测 qemu-user 对此可能有处理问题，于是开发板编译
4. 编译成功
5. `bash -i` debug 找出最终原因： qemu-user 对 go 的 `strings.Replace` 方法处理有问题
6. 加 blacklist 和 noqemu，找最小复现
7. 目前最小复现没有给出
   - 但是找出了一个解决方案：flush stdout 可以解决问题，原因不明