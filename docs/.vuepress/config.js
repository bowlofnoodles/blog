const sidebar = require('./sidebar');

module.exports = {
  title: 'bowlofnoodles',
  description: 'bowlofnoodles的博客散记',
  base: '/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  plugins: ['@vuepress/back-to-top', ['vuepress-plugin-code-copy', {align: 'top'}]],
  themeConfig: {
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'javascript', link: '/javascript/' },
      { text: '网络', link: '/network/' },
      { text: '算法', link: '/algorithm/' },
      { text: '前端', link: '/frontend/' },
      { text: 'github', link: 'https://github.com/bowlofnoodles' }
    ],
    sidebar: sidebar
  }
};

