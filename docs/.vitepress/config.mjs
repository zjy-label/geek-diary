import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/geek-diary/', 
  title: "95后架构师的极客日记",
  description: "前端架构深度解析 + AI时代独立开发者的实战思考",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '架构深度解析', link: '/posts/qiankun-activeRule-trap' }
    ],
    sidebar: [
      {
        text: '微前端实战系列',
        items: [
          { text: 'qiankun多activeRule路由灾难解决指南', link: '/posts/qiankun-activeRule-trap' }
        ]
      }
    ]
  }
})
