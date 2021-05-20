

module.exports = {
  title: 'bowlofnoodles',
  description: 'bowlofnoodles的博客散记',
  base: '/blog',
  themeConfig: {
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'javascript', link: '/javascript/' },
      { text: '网络', link: '/network/' },
      { text: '算法', link: '/algorithm/' },
      { text: 'github', link: 'https://github.com/bowlofnoodles' },
    ],
    sidebar: {
      '/algorithm/': [
        ['/algorithm/', 'Overview'],
        {
          title: '每日一题',
          children: [
            '/algorithm/每日一题/21-05-20'
          ]
        }
      ],
      '/javascript/': [
        ['/javascript/', 'Overview'],
        {
          title: '数据类型',
          children: [
            '/javascript/数据类型/数据类型',
            '/javascript/数据类型/大数问题'
          ]
        }
      ],
      '/network/': [
        ['/network/', 'Overview'],
        ['/network/缓存', '缓存']
      ]
    }
  }
};

