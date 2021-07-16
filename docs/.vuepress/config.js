const technology = {
    text: '技术',
    children: [
        '/technology/Git.md',
        '/technology/MATLAB 复习.md',
        '/technology/汇编复习笔记.md',
        // '/technology/重装系统.md'
    ],
};

const novel = {
    text: '小说',
    children: [
        {
            text: '短篇',
            children: [
                '/novel/证明你喜欢.md',
                '/novel/芭蕾舞者欺负人.md',
                '/novel/散打很温柔.md',
                '/novel/就算是厨师也能照亮他人.md'
            ],
        },
    ],
};

const navbar = [
    {
        text: '首页',
        link: '/'
    },
    technology,
    novel,
    '/about.md',
];

const sidebar = {
    '/technology/': [
        technology
    ],
    '/novel/': [
        novel
    ]
};


module.exports = {
    /*
      部署站点的基础路径。
      如果你想让你的网站部署到一个子路径下，你将需要设置它。
      它的值应当总是以斜杠开始，并以斜杠结束。
      举例来说，如果你想将你的网站部署到 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/"。
      base 将会作为前缀自动地插入到所有以 / 开始的其他选项的链接中，所以你只需要指定一次。
    */
    base: "/",
    /*
      站点的语言。
      它将会在最终渲染出的 HTML 中作为 <html> 标签的 lang 属性。
      它可以设置在不同语言的 locales 中。
    */
    lang: 'zh-CN',
    /*
      站点的标题。
      它将会作为所有页面标题的后缀，并且在默认主题的导航栏中显示。
      它可以设置在不同语言的 locales 中。
    */
    title: '南国微雪 | 憩息地',
    /*
      站点的描述。
      它将会在最终渲染出的 HTML 中作为 <meta name="description" /> 标签的 content 属性。
      它会被每个页面的 Frontmatter 中的 description 字段覆盖。
      它可以设置在不同语言的 locales 中。
    */
    description: '微雪的博客',
    /*
      在最终渲染出的 HTML 的 <head> 标签内加入的额外标签。
      你可以通过 [tagName, { attrName: attrValue }, innerHTML?] 的格式来添加标签。
      它可以设置在不同语言的 locales 中。
      详见参考文档：https://v2.vuepress.vuejs.org/zh/reference/config.html#head
    */
    head: [],
    // debug: true,
    themeConfig: {
        logo: '/images/logo.png',
        search: true,
        navbar: navbar,
        sidebar: sidebar,
        repo: 'https://github.com/TinySnow/TinySnow.github.io',
        repoLabel: 'GitHub',
        selectLanguageText: '语言',
        editLink: false,
        lastUpdatedText: '最近更新于 ',
        contributors: false,
        notFound: [
            '似乎找不到呢……',
            '好像出了点问题……',
            '可能被删掉了哦？',
            '要不要看看别的呢？',
            '联系博主吧！w'
        ],
        backToHome: '返回首页',
        openInNewWindow: '新窗口打开',
    },
}