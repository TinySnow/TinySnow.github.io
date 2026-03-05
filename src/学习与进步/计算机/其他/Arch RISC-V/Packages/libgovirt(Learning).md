# libgovirt(Learning)

## 前注

此包由其他人（Asuna）修复。因能力不足，向其解决方法学习。

## 原始报错信息

```console
FAILED: govirt/libgovirt.so.2.3.1.p/ovirt-utils.c.o 
cc -Igovirt/libgovirt.so.2.3.1.p -Igovirt -I../libgovirt/govirt -I. -I../libgovirt -I/usr/include/glib-2.0 -I/usr/lib/glib-2.0/include -I/usr/include/sysprof-4 -I/usr/include/libmount -I/usr/include/blkid -I/usr/include/rest-1.0 -I/usr/include/libsoup-3.0 -I/usr/include/libxml2 -I/usr/include/json-glib-1.0 -fdiagnostics-color=always -D_FILE_OFFSET_BITS=64 -Wall -Winvalid-pch -O0 -g -std=c99 '-DG_LOG_DOMAIN="libgovirt"' -DGLIB_VERSION_MIN_REQUIRED=GLIB_VERSION_2_66 -DGLIB_VERSION_MAX_ALLOWED=GLIB_VERSION_2_66 -Wall -Wextra -Werror -Wcast-align -Wmissing-declarations -Wpointer-arith -Wcast-align -Wwrite-strings -Winit-self -Wreturn-type -Wformat-nonliteral -Wformat-security -Wmissing-include-dirs -Wmissing-format-attribute -Wclobbered -Wempty-body -Wignored-qualifiers -Wsign-compare -Wtype-limits -Wuninitialized -Waggregate-return -Wdeclaration-after-statement -Wshadow -Wno-strict-aliasing -Winline -Wmissing-parameter-type -Woverride-init -Wno-unused-parameter -march=rv64gc -mabi=lp64d -O2 -pipe -fexceptions -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security -fstack-clash-protection -flto=auto -fPIC -pthread -MD -MQ govirt/libgovirt.so.2.3.1.p/ovirt-utils.c.o -MF govirt/libgovirt.so.2.3.1.p/ovirt-utils.c.o.d -o govirt/libgovirt.so.2.3.1.p/ovirt-utils.c.o -c ../libgovirt/govirt/ovirt-utils.c
../libgovirt/govirt/ovirt-utils.c: In function ‘ovirt_rest_xml_node_get_str_array_from_path’:
../libgovirt/govirt/ovirt-utils.c:137:12: error: cast increases required alignment of target type [-Werror=cast-align]
  137 |     return (GStrv) g_array_free(array, FALSE);
      |            ^
cc1: all warnings being treated as errors
```

## 过程

1. 自己找了很久有关 `error: cast increases required alignment of target type [-Werror=cast-align]` 错误的解决方案，似乎都没有切中要点，毫无头绪，遂放弃
2. 知道此错误有关强制类型转换的对齐，注意到了最后的 flag，但觉得没什么用
3. 软件包被修复后，查看 Files Changed，修复者打了一个 patch
4. patch 有关 gcc 的 flag，可以将 `[-Werror=cast-align]` 这种严苛标准，更换为 `'-Wno-error=cast-align'` 宽松标准
   - 可能需要查看 gcc 相关的 flags 文档
5. 至此明白，但是不清楚此改动是否合理