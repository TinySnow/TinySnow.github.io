# Elastic Search 启用

## 下载

## 解压

## 启动

- 先启动一次，会自动生成一些配置文件
- 如果启动报错

```bash
ERROR: Elasticsearch exited unexpectedly
```

- 多半就是 jvm 内存问题
  - 去 config 文件夹下面修改 jvm.options 文件
  - 找到 `IMPORTANT: JVM heap size`
  - 将下面的内容取消注释，4g 修改为 1g 即可
  
  ```bash
    ## -Xms4g
    ## -Xmx4g
  ```

- 重新启动

## 配置

- 本地测试使用密码可能会比较麻烦
- 生成配置文件之后，去 `elasticsearch.yml` 里面把最下方的所有 true 更改为 false 即可

## 可视化

### Kibana

- 流程与上面一致
- 启动后访问 [本地浏览器](http://localhost:5601)
- 如果遇到报错 `This Elastic installation has strict security requirements enabled that your current browser does not meet.` 需要将 `csp.strict: false` 配置项添加至配置文件 `kibana.yml` 里
  - 该配置项是使用了内容安全策略（CSP）防止浏览器受到攻击


### ElasticSearch-Head

- 此工具用起来比较简单

## 注意

- 中文默认分词器惨不忍睹，需要自己安装额外分词器
- 查询比较特殊，要求 GET 请求携带数据体
- 查询也可以用 POST，不是必须用 GET
- 允许跨域需要在 `elasticsearch.yml` 中添加配置

```yaml

#开启跨域
http.cors.enabled: true
#允许所有
http.cors.allow-origin: "*"

```

