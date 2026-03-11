# 彻底搞懂：十万级动态高度虚拟滚动 (Virtual Scrolling) 核心原理

## 💡 面试官的夺命连环问
“如果你的虚拟列表里的每一行高度都是动态的（文字换行、图片懒加载），你如何在不渲染所有 DOM 的情况下，计算出当前的 `scrollTop` 应该对应数组的第几个元素（`startIndex`）？又是如何解决滚动条剧烈抖动和快速滑动白屏的？”

## 🚀 核心破解思路（架构师级回答）

这道题的终极解法分为四步：**预估高度 (Estimated Height) -> 累加缓存 (Accumulated Cache) -> 二分查找 (Binary Search) -> 真实高度回写 (ResizeObserver Update)。**

### 1. 预估高度与缓存初始化
既然不知道真实高度，我们就必须给所有未渲染的元素设置一个**预估高度**（比如根据单行文字计算出一个基础值 `estimatedHeight = 50px`）。
我们需要维护一个缓存数组 `positions`，里面记录了每一项的：
- `index` (索引)
- `height` (当前高度，初始为 `estimatedHeight`)
- `top` (当前项距离列表顶部的距离)
- `bottom` (当前项底部距离列表顶部的距离，也是下一项的 `top`)

列表的总高度就是 `positions` 最后一项的 `bottom`。

### 2. 通过二分查找极速计算 `startIndex`
当发生 `scroll` 事件时，我们拿到了当前的 `scrollTop`。
因为 `positions` 数组里的 `bottom` 值是**严格递增**的，所以我们绝对不能用 `for` 循环去挨个找（10万条数据会卡死），而是必须使用**二分查找法 (Binary Search) O(log n)**，快速找到第一个 `bottom > scrollTop` 的项，它的索引就是我们的 `startIndex`！

### 3. 真实高度回写与滚动条防抖 (The Magic)
最关键的一步来了：元素渲染到页面上之后，我们终于知道了它的**真实高度**。
我们需要通过 `ResizeObserver` 或者 `componentDidUpdate / useEffect`，获取当前渲染出去的 DOM 元素的实际 `offsetHeight`。
- 如果真实 `offsetHeight` 和 `positions` 缓存里的预估 `height` 不一致：
  1. 更新该项的 `height` 和 `bottom`。
  2. **连锁反应：** 修正该项**之后**所有元素的 `top` 和 `bottom` 缓存（可以利用 MobX 或 Vue 响应式精准更新局部数据结构，避免全局重算）。
  3. 如果是向上滚动导致之前渲染的元素高度变大，会导致列表总高度剧烈变化，引起**滚动条跳动（Scroll Jumps）**。这时候需要配合 CSS `transform` 的 `translateY` 做出极小的补偿（Scroll Anchoring），或者在数据结构里做微调，保证当前视口顶部的元素位置死死咬住。

### 4. 为什么简历里写结合 MobX 极其惊艳？
普通的 React 虚拟滚动，每次 `startIndex` 变化都会触发整个大 List 的 Rerender。
而结合 MobX，你可以做到**极细粒度的状态订阅**。
List 组件只负责根据计算出的 `[startIndex, endIndex]` 下发数据 ID；具体的 `RowItem` 组件自己订阅 MobX 里对应的单行复杂数据状态。
滑动时，List 组件仅仅是在替换 DOM 节点，而不会因为复杂数据的变化引发整个大列表的 Diff 灾难，完美扛住十万级数据渲染！

## 总结
“面试官您好，针对动态高度的虚拟滚动，我的核心架构是维护一份基于预估高度的 `positions` 累加缓存。在滚动时利用**二分查找**达到 (\log n)$ 的索引定位；同时监听列表项的真实 DOM 渲染，利用 `ResizeObserver` 将真实高度**异步回写**修正缓存数组，并配合微小的位移补偿解决滚动跳动。最后，利用 MobX 的细粒度订阅机制，将滚动计算与复杂的业务数据渲染完全剥离，达到了十万级不掉帧的性能。”
