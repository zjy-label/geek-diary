# 极简 AI SaaS 架构白皮书：基于 RSC 与 Generative UI 的实战指南

这份文档是面向 AI SaaS 创业团队的《架构宪法》。它融合了 Feature-Sliced Design (FSD) 的边界思想、Next.js 的 React Server Components (RSC)，以及 Vercel AI SDK 的 Generative UI（生成式 UI）。

## 1. 核心技术栈选型

- **核心框架**：Next.js (App Router) - 强依赖其服务端组件和流式渲染能力。
- **AI 编排引擎**：Vercel AI SDK (`ai/rsc`, `streamUI`) - 负责大模型调度与组件流直出。
- **BFF/服务端节点**：Next.js Route Handlers (Edge Runtime 优先) - 负责鉴权、AI 调度、调用底层 Java/Go 接口。
- **安全与校验**：Zod - 强制清洗所有大模型生成的 Props 数据。
- **样式与组件库**：Tailwind CSS + Shadcn UI - 快速构建，极易定制。
- **客户端微观状态**：Zustand - 处理图表联动、弹窗等纯本地的跨组件交互。

## 2. 核心架构设计原则

1. **宏观做插槽，微观做闭环**：BFF 负责下发大颗粒度的业务组件（如完整的“财务图表卡片”），卡片内部的图表 hover、Tab 切换等细粒度状态闭环在 `"use client"` 组件内部。
2. **零前端信任 (Zero Trust Frontend)**：所有大模型吐出的数据必须在 BFF 层通过 Zod 校验，再以安全的 React 组件流推给前端，严防 React2Shell 漏洞。
3. **隔离底层数据基建**：底层的 Java/Go 系统作为绝对的纯净数据源（Data Provider），不写任何与 UI、大模型打字机相关的逻辑。

## 3. 标准目录结构 (FSD 变体)

在 Next.js App Router 规范下，我们采用简化的 FSD 结构来约束边界：

```text
├── app/                      # 【壳子层】路由、Layout、全局入口
│   ├── (auth)/               # 鉴权路由组
│   ├── dashboard/            # 工作台路由页面
│   ├── api/chat/route.ts     # BFF 层的 AI 调度中枢 (流式接口)
├── src/
│   ├── features/             # 【业务切片层】高内聚的业务模块 (RSC)
│   │   ├── billing/          # 财务模块
│   │   │   ├── ui/           # 包含 server component 与 client component
│   │   │   ├── api/          # BFF 调用底层 Java 接口的逻辑
│   │   │   └── index.ts      # 绝对严格的 Public API (隔离结界)
│   ├── entities/             # 【实体层】核心业务数据模型与通用逻辑
│   ├── shared/               # 【共享层】
│   │   ├── ui/               # 按钮、弹窗等基础无状态组件 (Shadcn)
│   │   ├── lib/              # 工具函数、Zod Schemas
│   ├── ai/                   # 【AI 枢纽】
│   │   ├── tools.ts          # 定义 AI 可用的工具箱 (关联 features)
│   │   └── registry.ts       # 安全组件白名单注册表
```

## 4. 实施与数据流转路径

### 步骤 1：前端容器挂载 (Client)
用户进入 `/dashboard`。前端页面只保留一个极简的 AI 对话窗口容器，使用 `useUIState` 和 `useActions` 接收服务器推过来的流。

### 步骤 2：BFF 层定义 AI 工具 (Server)
在 `app/api/chat/route.ts` 中，接收用户的输入，并使用 `streamUI` 调用大模型：

```typescript
// app/api/chat/route.ts
import { streamUI } from 'ai/rsc';
import { z } from 'zod';
import { getBillingData } from '@/features/billing/api';
import { BillingChartServer } from '@/features/billing/ui';

export async function POST(req: Request) {
  const result = await streamUI({
    model: openai('gpt-4o'),
    messages: [/* 用户历史 */],
    tools: {
      showBilling: {
        description: '查询并展示财务对比图表',
        parameters: z.object({ month: z.string() }),
        generate: async function* ({ month }) {
          // 1. Loading 状态流式推给前端
          yield <BillingSkeleton />;
          
          // 2. 调用底层 Java 接口查数据
          const data = await getBillingData(month);
          
          // 3. 安全沙箱：Zod 强校验数据 (防御注入)
          const safeData = BillingSchema.parse(data);
          
          // 4. 组装组件流，推给前端原地挂载
          return <BillingChartServer data={safeData} />;
        },
      },
    },
  });

  return result.value;
}
```

### 步骤 3：编写 Server/Client 组件隔离层
在 `features/billing/ui` 目录下：
- **`BillingChartServer.tsx`**：服务端组件，负责直接读取数据源或接收 `safeData`，不包含任何状态，最终渲染一个包含 Client Component 的外壳。
- **`BillingChartClient.tsx`**：顶部带有 `"use client"`，负责挂载 ECharts 图表，处理用户的 Hover 和点击事件。这也就是所谓的**“微观闭环”**。

## 5. 架构师的最后警告

1. **绝对不要**让 AI 返回 JSON 然后在前端用 `if-else` 去渲染！必须在 `route.ts` (BFF) 层 `yield <Component />`。
2. **绝对不要**让插槽细碎到按钮级别！流式下发的最小颗粒度应该是一个**完整的卡片/图表（Widget）**。
3. **绝对不能**跨层引用（比如 `features/billing` 严禁直接引用 `features/user` 内部的文件，必须通过 `index.ts` 暴露的方法）。

严格遵守这套宪法，你们的 SaaS 平台将拥有无坚不摧的性能和极高的迭代效率。
