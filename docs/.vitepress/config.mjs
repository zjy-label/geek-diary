import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/geek-diary/', 
  title: "95后架构师的极客日记",
  description: "前端架构深度解析 + AI时代独立开发者的实战思考",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '技术与架构', link: '/tech/frontend-news-2026-03-10' },
      { text: '商业与宏观', link: '/news/iran-us-conflict-2026-timeline' },
      { text: '全球十大新闻追踪', link: '/news/top-news-2026-03-10' },
      { text: '装备与生活', link: '/life/remote-workspace-hardware-2026' },
      { text: '创业与前沿', link: '/startup/one-person-company-policy-2026' }
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
          { text: '前端动态与高频考点追踪', link: '/tech/frontend-news-2026-03-10' },
          { text: '十万级动态虚拟滚动核心原理', link: '/tech/virtual-scroll-dynamic-height' }
        ]
      },
      {
        text: '宏观视野与AI商业洞察',
        items: [
          { text: '2026中东战局始末与商业推演', link: '/news/iran-us-conflict-2026-timeline' },
          { text: '全球十大核心新闻追踪 (2026-03-10)', link: '/news/top-news-2026-03-10' },
          { text: '全球核心商业与科技追踪 (2026-03-11)', link: '/news/top-news-2026-03-11' },
          { text: '全球局势与科技商业速递 (2026-03-12)', link: '/news/2026-03-12-daily' }
        ]
      },
      {
        text: '数字游民与 Remote 基建',
        items: [
          { text: '2026 桌面硬件升维指南 (3080+4K)', link: '/life/remote-workspace-hardware-2026' }
        ]
      },
      {
        text: '独立开发与 AI 创业',
        items: [
          { text: '2026 一人公司政策与创业方向推演', link: '/startup/one-person-company-policy-2026' },
          { text: '情绪价值 AI：虚拟伴侣 MVP', link: '/startup/ai-companion-mvp-2026-03-11' }
        ]
      }
    ]
  }
})
