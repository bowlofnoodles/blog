

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
            '/algorithm/每日一题/21-05-26-2',
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
          title: 'javascript',
          children: [
            '/javascript/数据类型',
            '/javascript/大数问题',
            '/javascript/浮点数计算问题',
            '/javascript/隐式类型转换',
            '/javascript/声明关键字',
            '/javascript/执行上下文和作用域',
            '/javascript/this指向',
            '/javascript/垃圾回收和内存泄漏',
            '/javascript/内置复杂类型与一些api',
            '/javascript/js中的数组',
            '/javascript/原型链和继承',
            '/javascript/代理和反射',
            '/javascript/模块化区别',
            '/javascript/迭代器和生成器',
            '/javascript/异步编程',
            '/javascript/函数系列1-不同函数',
            '/javascript/函数系列2-闭包',
            '/javascript/函数系列3-柯理化',
            '/javascript/函数系列4-函数组合compose',
            '/javascript/事件循环',
          ]
        },
        {
          title: '手写系列',
          children: [
            '/javascript/手写系列/EventEmitter',
            '/javascript/手写系列/深浅拷贝',
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

