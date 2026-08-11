# DocSearch 搜索集成

## 步骤与流程

1. 申请 DocSearch，网上教程很多，不再赘述
   
   - 详情可以参考这篇 [博客](https://keenwon.com/use-docsearch/) 或者这篇 [博客](https://github.com/QC-L/blog/issues/10)
   
   - 如果成功，官方会发邮件，里面会有 DocSearch 和 Algolia，你的 Web 站点的 API Key（其实 DocSearch 是 Algolia 的子项目，用的 Algolia 的服务，所以本质上这个 API Key 在这两个网站间通用）
   
   - 邮件让人添加的代码大概长这样：
   
   - ```javascript
     <!-- at the end of the HEAD -->
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />
         
     <!-- at the end of the BODY -->
     <script type="text/javascript" 
     src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"></script>
     
     <script type="text/javascript">
     docsearch({
         appId: 'XXXXX',
         apiKey: 'XXXXX',
         indexName: 'Your Website',
         container: '#docsearch',
         debug: false // Set debug to true if you want to inspect the modal
     });
     </script>
     ```
   
2. 按照指示添加到站点相应的框架里就可以

   - 一般来说是静态站点生成器，那就需要注意有没有相应的模板可以添加（如 index.hbs）

   - 注意：因为邮件里需要在模板中添加一个 Container，不管是 div 也好，p 也好，都需要在想展示的位置上添加这个 Container，否则不起作用，例子如下：

   - ```html
     <div id="docsearch" />
     ```

3. 看效果，一般情况下，编译之后就会出现一个搜索框
   - 如果没有，就需要看看代码哪里出了错，或者是没找到模板文件
   - 笔者就犯过 docsearch 方法里少了一个逗号，然后搜索框出不来的低级错误
4. 试试搜索效果，一般来说会有结果，如果没有则说明 Algolia 的后台 Index 里没有记录，没有记录肯定没有搜索结果（就像数据库里没有数据一样）
5. 登录 Algolia 的 Dashboard，查看相应站点的 Index，看看有没有 Records
   - 没有记录：
   - ![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/practice-record/Snipaste_2023-10-22_17-24-18.png)
   - 有记录：
   - ![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/blog/technology/practice-record/Snipaste_2023-10-22_17-26-02.png)
6. 没有的话需要重新爬取网页，定制爬虫