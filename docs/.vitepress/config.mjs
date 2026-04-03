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
          { text: '大模型时代的流式响应与智能拦截', link: '/tech/llm-streaming-interception' },
          { text: '生成式 UI 与 React2Shell 沙箱防御', link: '/tech/generative-ui-rsc-security' },
          { text: '生成式 UI 核心拷问：前端失业论与 Vue/React 选型', link: '/tech/generative-ui-qa' },
          { text: '实战拆解：SaaS 架构下前端的真实指责', link: '/tech/saas-frontend-responsibilities' },
          { text: '实战场景推演：Generative UI 架构实现“智能财务管家” SaaS', link: '/tech/generative-ui-use-case' },
          { text: '生成式 UI 的边界：能直接靠 BFF 生成新页面和模块吗？', link: '/tech/rsc-routing-vs-generative-ui' },
          { text: '万物皆插槽？Server-Driven UI 的终极形态与死穴', link: '/tech/sdui-slot-architecture-tradeoffs' },
          { text: '极简 AI SaaS 架构白皮书：基于 RSC 与 Generative UI 的实战指南', link: '/tech/ai-saas-architecture-whitepaper' },
          { text: '破除迷思：Generative UI 只能做聊天机器人？', link: '/tech/saas-beyond-chatbots' },
          { text: 'Vercel 全栈自动化部署卡点破解', link: '/tech/vercel-supabase-automation-pitfalls' },
          { text: '全球视野与科技前沿 (2026-03-19)', link: '/news/2026-03-19-latest-news' },

          { text: '行动简报 (2026-04-03)', link: '/news/2026-04-03-morning-briefing' },
          { text: '行动简报 (2026-04-02)', link: '/news/2026-04-02-morning-briefing' },

          { text: '行动简报 (2026-03-30)', link: '/news/2026-03-30-morning-briefing' },
          { text: '行动简报 (2026-03-28)', link: '/news/2026-03-28-morning-briefing' },
          { text: '行动简报 (2026-03-27)', link: '/news/2026-03-27-morning-briefing' },
          { text: '行动简报 (2026-03-26)', link: '/news/2026-03-26-morning-briefing' },
          { text: '行动简报 (2026-03-25)', link: '/news/2026-03-25-morning-briefing' },
          { text: '行动简报 (2026-03-24)', link: '/news/2026-03-24-morning-briefing' },
          { text: '行动简报 (2026-03-23)', link: '/news/2026-03-23-morning-briefing' },
          { text: '行动简报 (2026-03-22)', link: '/news/2026-03-22-morning-briefing' },
          { text: '行动简报 (2026-03-21)', link: '/news/2026-03-21-morning-briefing' },
          { text: '行动简报 (2026-03-20)', link: '/news/2026-03-20-morning-briefing' },
          { text: '行动简报 (2026-03-19)', link: '/news/2026-03-19-morning-briefing' },
          { text: '行动简报 (2026-03-17)', link: '/news/2026-03-17-morning-briefing' },
          { text: '行动简报 (2026-03-16)', link: '/news/2026-03-16-morning-briefing' },
          { text: '行动简报 (2026-03-15)', link: '/news/2026-03-15-morning-briefing' },
          { text: '行动简报 (2026-03-13)', link: '/news/2026-03-13-morning-briefing' },
          { text: '十万级动态虚拟滚动核心原理', link: '/tech/virtual-scroll-dynamic-height' },
          { text: '前端架构与生态核心趋势追踪 (03-26)', link: '/tech/frontend-trends-2026-03-26' }
        ]
      },
      {
        text: '宏观视野与AI商业洞察',
        items: [
          { text: '2026中东战局始末与商业推演', link: '/news/iran-us-conflict-2026-timeline' },
          { text: '全球十大核心新闻追踪 (2026-03-10)', link: '/news/top-news-2026-03-10' },
          { text: '全球核心商业与科技追踪 (2026-03-11)', link: '/news/top-news-2026-03-11' },
          { text: '全球局势与科技商业速递 (2026-03-12)', link: '/news/2026-03-12-daily' },
          { text: '全球商业与科技风向标 (2026-03-13)', link: '/news/2026-03-13-global-summary' }
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
          { text: '情绪价值 AI：虚拟伴侣 MVP', link: '/startup/ai-companion-mvp-2026-03-11' },
          { text: '2026 抖音商业思维与赚钱趋势洞察', link: '/startup/douyin-business-trends-2026' },
          { text: 'Reddit 独立开发者血泪复盘 (2026)', link: '/startup/reddit-indie-hackers-lessons-2026' },
          { text: 'Reddit 微型 SaaS 与赚钱逻辑深度拆解', link: '/startup/reddit-micro-saas-analysis-2026' },
          { text: '全球微型 SaaS 商业情报日报 (2026-03-17)', link: '/startup/reddit-daily/2026-03-17' },
          { text: '独立游戏与游戏化创业情报 (2026-03-17)', link: '/startup/game-daily/2026-03-17' },
          { text: '2026 最新 Micro-SaaS 创业点子 (双人组)', link: '/startup/ai-ideas-2026-v2' }
          , { text: 'AI 与独立开发动态 (2026-03-23)', link: '/news/2026-03-23-ai-startup-news' }
        ]
      }
    ]
  }
})
