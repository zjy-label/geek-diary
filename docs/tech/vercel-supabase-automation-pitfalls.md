# Vercel 与 Supabase 自动化全栈部署的生死卡点与破解

在 2026 年打造“Micro-SaaS 全自动建站工厂”时，从代码生成到生产环境发版的最后一步往往是最致命的。本篇复盘我们在构建高频自动化流水线时踩过的核心巨坑，并提供终极解法。

## 💥 致命卡点 1：Next.js Prerender 导致云端构建雪崩
**现象：**
本地 `npm run dev` 和 `npm run build` 完美运行，但执行 `npx vercel --prod` 后，云端服务器直接以 Exit Code 1 崩溃，报错信息通常为 `@supabase/ssr: Your project's URL and API key are required`。

**深层原因：**
Next.js 14+ 默认会在构建（Build）阶段执行静态页面预渲染（Prerender）。如果你的 `layout.tsx` 或 `page.tsx` 中在顶层或者渲染逻辑里调用了 Supabase Client，它会去读 `process.env.NEXT_PUBLIC_SUPABASE_URL`。但由于云端刚建立的项目还**没有环境变量**，此时就会当场崩溃。

**终极破解 (SOP 修正)：**
绝不能在打通环境变量前直接发版。必须改变流水线顺序：
1. 先利用 Vercel Token 强制把关键 Env 注入云端。
2. 再执行部署构建。
```bash
# 错误顺序：部署 -> 去网页填变量
# 正确顺序：
npx vercel@latest env add NEXT_PUBLIC_SUPABASE_URL production --token $TOKEN
npx vercel@latest env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --token $TOKEN
npx vercel@latest --prod --yes --token $TOKEN
```

## 💥 致命卡点 2：Vercel CLI 的多项目幽灵缓存 (Project Not Found)
**现象：**
在同一个目录下或者高频创建新项目时，Vercel CLI 报错 `Project not found`。

**深层原因：**
Vercel CLI 会在系统的全局配置目录（如 `~/.local/share/com.vercel.cli`）或项目根目录的 `.vercel/` 文件夹中缓存 `ORG_ID` 和 `PROJECT_ID`。当你在一台机器上用自动化脚本连续创建多个 SaaS 矩阵时，CLI 的上下文经常发生漂移（Drift），拿着 A 项目的身份去操作 B 项目。

**终极破解：**
放弃依赖 CLI 的默认隐式推断，采用**强制显式环境变量绑定**的方式执行所有命令，把组织和项目 ID 钉死：
```bash
VERCEL_ORG_ID=your_org_id VERCEL_PROJECT_ID=your_new_project npx vercel@latest --prod --yes --token $TOKEN
```

## 导师的架构总结
做自动化引擎，“Happy Path”永远是骗人的。真正的壁垒在于你如何**用代码逻辑预判并绞杀所有的环境依赖边界问题**。经过这两次卡点的洗礼，我们的 `micro-saas-factory` 已经完成从“玩具”到“工业级兵工厂”的蜕变。
