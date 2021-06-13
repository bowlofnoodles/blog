

module.exports = {
  title: 'bowlofnoodles',
  description: 'bowlofnoodles的博客散记',
  base: '/blog/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  plugins: ['@vuepress/back-to-top'],
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
    sidebar: {
      '/algorithm/': [
        ['/algorithm/', 'Overview'],
        {
          title: '每日一题',
          children: [
            '/algorithm/每日一题/21-05-20',
            '/algorithm/每日一题/21-05-21', // TODO 待补
            '/algorithm/每日一题/21-05-21-2',
            '/algorithm/每日一题/21-05-22',
            '/algorithm/每日一题/21-05-23',
            '/algorithm/每日一题/21-05-24',
            '/algorithm/每日一题/21-05-25',
            '/algorithm/每日一题/21-05-26',
            '/algorithm/每日一题/21-05-26-2',
            '/algorithm/每日一题/21-05-27',
            '/algorithm/每日一题/21-05-28',
            '/algorithm/每日一题/21-05-29', // TODO 待补
            '/algorithm/每日一题/21-05-30',
            '/algorithm/每日一题/21-05-31',
            '/algorithm/每日一题/21-06-03',
            '/algorithm/每日一题/21-06-04',
            '/algorithm/每日一题/21-06-05',
            '/algorithm/每日一题/21-06-06', // TODO 待补
            '/algorithm/每日一题/21-06-07',
            '/algorithm/每日一题/21-06-08',
            '/algorithm/每日一题/21-06-13',
          ]
        },
        {
          title: '算法记录',
          children: [
            '/algorithm/算法记录/二叉树的遍历',
            '/algorithm/算法记录/排序算法', // TODO 待补
            '/algorithm/算法记录/二分查找',
            '/algorithm/算法记录/堆' // TODO 待补
          ]
        }
      ],
      '/javascript/': [
        ['/javascript/', 'Overview'],
        {
          title: 'javascript',
          children: [
            '/javascript/数据类型', // TODO 待补
            '/javascript/js的数字存储', // TODO 待补
            '/javascript/隐式类型转换',
            '/javascript/声明关键字'
            // '/javascript/执行上下文和作用域',
            // '/javascript/this指向',
            // '/javascript/垃圾回收和内存泄漏',
            // '/javascript/内置复杂类型与一些api',
            // '/javascript/js中的数组',
            // '/javascript/原型链和继承',
            // '/javascript/代理和反射',
            // '/javascript/模块化区别',
            // '/javascript/迭代器和生成器',
            // '/javascript/异步编程',
            // '/javascript/函数系列1-不同函数',
            // '/javascript/函数系列2-闭包',
            // '/javascript/函数系列3-柯理化',
            // '/javascript/函数系列4-函数组合compose',
            // '/javascript/事件循环',
          ]
        },
        {
          title: '手写系列',
          children: [
            '/javascript/手写系列/深浅拷贝', // TODO 待补
            '/javascript/手写系列/instanceof',
            '/javascript/手写系列/数组打乱',
            '/javascript/手写系列/节流防抖',
            '/javascript/手写系列/手写promise'
            // '/javascript/手写系列/EventEmitter发布订阅',
            // '/javascript/手写系列/new运算符',
            // '/javascript/手写系列/继承',
            // '/javascript/手写系列/单例模式',
            // '/javascript/手写系列/模拟私有变量',
          ]
        }
      ],
      '/network/': [
        ['/network/', 'Overview'],
        ['/network/缓存', '缓存'] // TODO 待补
      ],
      '/frontend/': [
        ['/frontend/', 'Overview'],
        {
          title: '浏览器相关',
          children: [
            '/frontend/浏览器相关/浏览器的架构演变' // TODO 待补
          ]
        },
        {
          title: '前端工程化',
          children: [
            '/frontend/前端工程化/npm包版本管理' // TODO 待补
          ]
        }
      ]
    }
  }
};

