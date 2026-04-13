# 解决 PicGo 无法上传图片到 Github 的问题

## 报错

```
Client network socket disconnected before secure TLS connection was established
```

- 或者

```
unable to verify the first certificate
```

## 解决

- 关闭所有在连接 github 的过程中，对证书有修改的软件（那种自签证书进行加速的软件），比如
  - steam community 302
  - steam++
  - fast github
  - 火绒安全相关的证书