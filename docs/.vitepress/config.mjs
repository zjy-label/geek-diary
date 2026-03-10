import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/geek-diary/', 
  title: "95后架构师的极客日记",
  description: "前端架构深度解析 + AI时代独立开发者的实战思考",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '技术与架构', link: '/tech/frontend-news-2026-03-10' },
      { text: '商业与宏观', link: '/news/iran-us-conflict-2026-timeline' }
    ],
    sidebar: [
      {
        text: '微前端实战系列',
        items: [
          { text: 'qiankun多activeRule路由灾难解决指南', link: '/posts/qiankun-activeRule-trap' }
        ]
      },
      {
        text: '技术前沿与面试兵器库',
        items: [
          { text: '前端动态与高频考点追踪', link: '/tech/frontend-news-2026-03-10' }
        ]
      },
      {
        text: '宏观视野与AI商业洞察',
        items: [
          { text: '2026中东战局始末与商业推演', link: '/news/iran-us-conflict-2026-timeline' }
        ]
      }
    ]
  }
})
