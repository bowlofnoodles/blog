

module.exports = {
  title: 'bowlofnoodles',
  description: 'bowlofnoodles的博客散记',
  base: '/blog/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'javascript', link: '/javascript/' },
      { text: '网络', link: '/network/' },
      { text: '算法', link: '/algorithm/' },
      { text: '前端', link: '/frontend/' },
      { text: 'github', link: 'https://github.com/bowlofnoodles' },
    ],
    sidebar: {
      '/algorithm/': [
        ['/algorithm/', 'Overview'],
        {
          title: '每日一题',
          children: [
            '/algorithm/每日一题/21-05-20',
            '/algorithm/每日一题/21-05-21',
            '/algorithm/每日一题/21-05-21-2',
            '/algorithm/每日一题/21-05-22',
            '/algorithm/每日一题/21-05-23',
            '/algorithm/每日一题/21-05-24',
            '/algorithm/每日一题/21-05-25',
            '/algorithm/每日一题/21-05-26',
          ]
        },
        {
          title: '算法记录',
          children: [
            '/algorithm/算法记录/二叉树的遍历',
          ]
        }
      ],
      '/javascript/': [
        ['/javascript/', 'Overview'],
        {
          title: '数据类型',
          children: [
            '/javascript/数据类型',
            '/javascript/大数问题',
            '/javascript/声明关键字'
          ]
        },
        {
          title: '手写系列',
          children: [
            '/javascript/手写系列/EventEmitter',
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

