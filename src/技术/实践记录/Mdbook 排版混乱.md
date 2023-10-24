# Mdbook 排版混乱

## 表现

- 左侧菜单栏收不回去
- 占用大面积显示左侧菜单栏

## 原因

- Mdbook 旧版本升级为 Latest 时，修改了 index.hbs 文件模板
- 可以通过新版 Mdbook 新建工程时，建立的新 index.hbs 文件看出
  - 对比文件推荐使用 WinMerge，很好用

## 解决

- 比对旧版 index.hbs 和新版 index.hbs 文件

- 将旧版文件的相应部分内容，替换为新版（大部分内容应该是一致的）

  - 尤其是下面这部分

  - ```diff
             <!-- Hide / unhide sidebar before it is displayed -->
    -        <script type="text/javascript">
    -            var html = document.querySelector('html');
    -            var sidebar = 'hidden';
    +        <script>
    +            var body = document.querySelector('body');
    +            var sidebar = null;
    +            var sidebar_toggle = document.getElementById("sidebar-toggle-anchor");
                if (document.body.clientWidth >= 1080) {
                    try { sidebar = localStorage.getItem('mdbook-sidebar'); } catch(e) { }
                    sidebar = sidebar || 'visible';
    +            } else {
    +                sidebar = 'hidden';
    +            }
    -            html.classList.remove('sidebar-visible');
    -            html.classList.add("sidebar-" + sidebar);
    +            sidebar_toggle.checked = sidebar === 'visible';
    +            body.classList.remove('sidebar-visible');
    +            body.classList.add("sidebar-" + sidebar);
            </script>
    ```

  - **但不仅限于这部分**