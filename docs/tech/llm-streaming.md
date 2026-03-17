# 前端大模型时代的流式交互 (Streaming)

在 AI 时代，流式输出是前端交互的基石。

## 核心技术选型
1. **Server-Sent Events (SSE)**: 单向通信，轻量，OpenAI 默认方案。
2. **Fetch API + ReadableStream**: 更底层的控制，现代前端最常用。
3. **WebSocket**: 双向通信，适合复杂交互（如语音流、实时画布），但对于纯文本问答来说太重。

## 痛点与面试核心考点
1. **打字机效应与解析冲突**: Markdown 边流式传输边渲染（如表格、代码块未闭合时的渲染闪烁）。
2. **React 渲染性能**: 高频的 chunk 会导致组件疯狂 re-render，如何优化？
3. **中断机制**: 如何优雅地使用 `AbortController` 停止生成。
