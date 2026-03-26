# 生成式 UI 的边界：能直接靠 BFF 生成新页面和新模块吗？

当我们在谈论 React Server Components (RSC) 和 Generative UI 时，很容易产生一种错觉：“既然服务端能直接下发组件流，那我以后加页面、加模块，是不是只改 BFF 层就行了，完全不用碰前端代码了？”

答案是：**“一半对，一半错”。核心在于你要区分【路由框架（Routing）】和【内容填充（Content/Generative UI）】的边界。**

## 1. 什么时候不能只改 BFF？（新增物理页面 / 核心布局）
如果你的系统有自己固定的左侧菜单（Layout）、顶部导航，现在你想加一个全新的独立页面模块，比如 `/dashboard/financial-audit`（财务审计页面）。
- **真相**：你**不能**只靠修改 BFF 来凭空变出这个页面。
- **原因**：Next.js 的 App Router 是基于**文件系统路由**的。你必须在前端工程里老老实实建一个文件夹 `app/dashboard/financial-audit/page.tsx`。哪怕这个页面里只有一行代码 `<AuditBFFStream />`，这个“壳子”和 URL 路由注册也必须存在于前端代码库中。并且，左侧菜单栏如果写死了路由列表，你也得去前端改菜单配置（除非你的菜单本身就是服务端下发的组件）。

## 2. 什么时候可以“只改 BFF 就生成新模块”？（Server-Driven UI / 动态插槽）
如果你说的“增加模块”，是指在**现有的某个页面（如工作台大盘 Dashboard）**或者**AI 对话流（Chat Window）**中增加一个新的功能块，那答案是：**YES！完全可以只改 BFF！**

### 场景 A：AI 聊天窗里的新功能模块
用户在聊天框说：“帮我算下税务”。
- **以前**：前端要发版新增 `<TaxCalculator />` 组件，并在聊天框加上 `switch-case`。
- **现在（Generative UI）**：BFF 层直接 `yield <TaxCalculator RSC />`。客户端代码**零修改**，聊天框里直接原地长出一个完整的税务计算器交互界面。

### 场景 B：服务端驱动的动态工作台 (Server-Driven Dashboard)
假设你有一个 `/dashboard` 页面，它的代码极简：
```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  // 直接向 BFF 请求整个大盘的组件流
  const DashboardComponents = await fetchDashboardStreamFromBFF();
  return <>{DashboardComponents}</>; 
}
```
在这个架构下：
- 今天 BFF 下发的是 `[<UserGrowthWidget />, <RevenueWidget />]`。
- 明天你想加一个“活跃度模块”，你只需要在 BFF 层修改流的下发逻辑，加上 `<ActivityWidget />`。
- **前端代码零修改，连重新部署都不需要**，用户刷新页面，工作台上就直接多出了这个新模块！

## 3. 架构师的总结
- **“壳子”归前端**：URL 路由、全局的固定骨架（Layout）、CSS 根变量，依然需要前端工程来承载。
- **“血肉”归 BFF**：页面内部的卡片、图表、AI 交互结果、动态表单，完全可以剥离给 BFF 层，通过 RSC 流式下发。
- **终极形态**：这就是传说中的 **Server-Driven UI (服务端驱动 UI)**。Generative UI 是它在 AI 对话场景下的一种极端、高级的应用分支。掌握了这个边界，你的 SaaS 平台就能实现极端的动态化配置。
