# Linux 初步

## 学习 Linux 命令

## 应用程序完成

- 不关乎语言，只要打包完成一个可执行文件(bin)
  - bin = binary，二进制
- 在服务器上运行，就能收到请求

## 配置端口

- 因为一般 http 80 端口，https 443 端口
- 一个服务器上有多个 Web 服务，容易造成混乱
- 一般使用 Nginx 反代配置端口
  - 反代指，反向代理，指代理服务器那一方
  - 正代指，正向代理，指代理客户端那一方

## 运行应用程序

# Markdown 语法

## 前注

- Markdown 是由 HTML 简化而来的，一种格式性语法
  - 可以内嵌 HTML
  - 也可以注明 CSS 样式

<div style="color:red; text-align:center;">这是一个测试</div>
## 标题

一级标题：#

二级标题：##

……

六级标题：######

## 常用样式

加粗：\*\*加粗\*\*

删除线：\~\~删除\~\~

斜体：\*斜体\*

下划线：<u>下划线</u>

高亮：\=\=高亮\=\=

引用：>

> 这里是引用

## 表格

| 表头 | 表头 | 备注 |
| ---- | ---- | ---- |
| 表项 | 表项 | 备注 |

## 代码块

```c
void main(){
    // 注释
    printf("Hello World");
}
```

```Java
public static void main(String[] args){
    System.out.println("Hello World");
}
```

## 超链接

[Google](www.google.com)

## 图像

![img_name](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/Guide/paper_cut_off.61143jhbhvg.webp)

## 列表

无序列表：- / +

缩进：

- 一级无序列表
  - 二级无序列表
    - 三级无序列表

有序列表：1. 

- [x] 任务一
- [ ] 任务二

## 分割线

---

## 注意

- Markdown 里默认取消换行
- 分割标志是前后都是空行
- 默认取消段首缩进