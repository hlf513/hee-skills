# Reveal.js Styles Reference

完整的 CSS 样式定义，包含变量系统、主题类、组件样式和 SVG 图标基础样式。

**Table of Contents:**
- [CSS Variables](#css-variables) - 颜色系统、语义颜色、边框、阴影、容器宽度
- [Theme Classes](#theme-classes) - 6 种主题配色
- [Base Styles](#base-styles) - 排版、背景渐变
- [Gradient Text](#gradient-text) - 渐变文本效果
- [Cover Version](#cover-version) - 封面版本号
- [Image Container](#image-container) - 图片容器
- [Tag Component](#tag-component) - 标签组件
- [Card Component](#card-component) - 卡片组件
- [Link Styling](#link-styling) - 内联链接样式
- [Link List](#link-list) - 文档链接列表
- [Fragment Animation](#fragment-animation) - 渐进式动画
- [Feature Icon](#feature-icon) - 特性图标容器
- [SVG Icon Base Styles](#svg-icon-base-styles) - SVG 图标基础样式
- [Info Box](#info-box) - 信息框组件
- [Comparison Grid](#comparison-grid) - 对比网格
- [Feature Grid](#feature-grid) - 特性网格
- [Tech Category](#tech-category) - 技术分类
- [Arrow Flow](#arrow-flow) - 箭头流程
- [Stat Grid](#stat-grid) - 统计网格
- [List Styles](#list-styles) - 无符号列表样式（带 !important）
- [Container Width System](#container-width-system) - 统一容器宽度规范

---

## CSS Variables

```css
:root {
    /* Primary accent color */
    --accent-color: #38bdf8;
    --accent-transparent: rgba(56, 189, 248, 0.3);
    --accent-bg: rgba(56, 189, 248, 0.08);

    /* Text hierarchy */
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --text-dim: #334155;

    /* Backgrounds */
    --bg-primary: #0b0f19;
    --bg-secondary: #1e293b;

    /* Semantic colors */
    --color-info: #3b82f6;
    --color-success: #10b981;
    --color-warning: #f59e0b;
    --color-error: #ef4444;

    /* Borders */
    --border-light: rgba(255, 255, 255, 0.05);
    --border-medium: rgba(255, 255, 255, 0.08);
    --border-strong: rgba(255, 255, 255, 0.12);

    /* Shadows */
    --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 10px 20px rgba(0, 0, 0, 0.35);
    --shadow-lg: 0 30px 60px rgba(0, 0, 0, 0.4);

    /* Container widths - 统一容器宽度系统 */
    --container-narrow: 800px;   /* 列表、窄内容 */
    --container-medium: 1000px;  /* 卡片网格、默认容器 */
    --container-wide: 1100px;    /* 特性网格、对比网格、统计网格 */
    --container-full: 1400px;    /* 全宽布局（特殊情况） */
}
```

---

## Theme Classes

应用到 `<body>` 标签实现主题切换：

```css
.theme-ocean {
  --accent-color: #0ea5e9;
  --accent-transparent: rgba(14, 165, 233, 0.3);
  --accent-bg: rgba(14, 165, 233, 0.08);
}

.theme-forest {
  --accent-color: #22c55e;
  --accent-transparent: rgba(34, 197, 94, 0.3);
  --accent-bg: rgba(34, 197, 94, 0.08);
}

.theme-sunset {
  --accent-color: #f97316;
  --accent-transparent: rgba(249, 115, 22, 0.3);
  --accent-bg: rgba(249, 115, 22, 0.08);
}

.theme-night {
  --accent-color: #8b5cf6;
  --accent-transparent: rgba(139, 92, 246, 0.3);
  --accent-bg: rgba(139, 92, 246, 0.08);
}

.theme-cyber {
  --accent-color: #06b6d4;
  --accent-transparent: rgba(6, 182, 212, 0.3);
  --accent-bg: rgba(6, 182, 212, 0.08);
}

.theme-rose {
  --accent-color: #f43f5e;
  --accent-transparent: rgba(244, 63, 94, 0.3);
  --accent-bg: rgba(244, 63, 94, 0.08);
}
```

**使用方法**:
```html
<body class="theme-ocean">
```

---

## Base Styles

```css
/* Background gradient */
.reveal {
    background: radial-gradient(circle at 50% 50%, var(--bg-secondary) 0%, var(--bg-primary) 100%);
}

/* Typography */
.reveal h1, .reveal h2, .reveal h3 {
    font-family: 'Inter', 'PingFang SC', sans-serif;
    color: var(--text-main);
    text-transform: none;
    margin: 0 auto 1.5rem auto;
}

.reveal h1 {
    font-size: 4rem;
    font-weight: 900;
}

.reveal h2 {
    font-size: 2.8rem;
    font-weight: 600;
}

.reveal h3 {
    font-size: 2rem;
    font-weight: 600;
}

.reveal p, .reveal li {
    font-size: 1.5rem;
    color: var(--text-muted);
}
```

---

## Container Width System

**⚠️ CRITICAL**: 使用统一的容器宽度系统确保页面内所有组件宽度一致，避免视觉跳跃。

### 容器宽度定义

| 容器类型 | CSS 变量 | 宽度 | 使用场景 |
|---------|---------|------|---------|
| **窄容器** | `--container-narrow` | 800px | 列表（ul/ol）、简单文本内容 |
| **中容器** | `--container-medium` | 1000px | 卡片网格（card-grid）、默认容器 |
| **宽容器** | `--container-wide` | 1100px | 特性网格、对比网格、统计网格 |
| **全容器** | `--container-full` | 1400px | 特殊全宽布局（极少使用） |

### 容器居中模板

```css
/* 标准容器居中 */
.component-class {
    max-width: var(--container-*);
    margin-left: auto;
    margin-right: auto;
}
```

### 使用规则

**约束**:
- **必须**使用 CSS 变量定义容器宽度（禁止硬编码数值）
- **同一页面内相同类型组件使用相同容器宽度**
- **多组件组合页面使用统一容器宽度**（优先选择 `--container-wide`）

### 组件宽度映射

| 组件 | 容器类型 | CSS 变量 |
|------|---------|---------|
| `.reveal ul` | 窄容器 | `var(--container-narrow)` |
| `.reveal ol` | 窄容器 | `var(--container-narrow)` |
| `.info-box` | 窄容器 | `var(--container-narrow)` |
| `.tag-container` | 窄容器 | `var(--container-narrow)` |
| `.card-grid` | 中容器 | `var(--container-medium)` |
| `.feature-grid` | 宽容器 | `var(--container-wide)` |
| `.comparison-grid` | 宽容器 | `var(--container-wide)` |
| `.stat-grid` | 宽容器 | `var(--container-wide)` |

### 多组件组合页面的宽度统一

**⚠️ CRITICAL**: 视觉一致性优先于组件默认规范。同一页面内多个主要组件应尽量统一宽度，避免视觉跳跃。

当同一页面包含多个不同组件时，使用以下规则确保宽度统一：

**基础规则**:
1. **页面包含 2+ 个网格组件** → 所有组件使用 `var(--container-wide)`
2. **页面包含网格 + 列表** → 网格使用 `var(--container-wide)`，列表使用 `var(--container-narrow)`
3. **页面仅包含列表/文本** → 使用 `var(--container-narrow)`

**视觉一致性优先原则**:
- **同一页面内主要组件应统一宽度**，即使组件类型不同
- **避免宽度跳跃**：info-box、arrow-flow 等组件在多组件页面应与网格组件同宽
- **次要内容可降级**：仅当列表/文本为辅助说明时，可保持窄容器

### 组件组合场景速查表

| 组件组合 | 推荐宽度 | 原因 |
|---------|---------|------|
| feature-grid + stat-grid | wide + wide | 规则1：两个网格组件 |
| comparison-grid + info-box | wide + wide | ⭐ 视觉一致性优先 |
| feature-grid + arrow-flow | wide + wide | ⭐ 视觉一致性优先 |
| feature-grid + ul(次要) | wide + narrow | 规则2：网格为主，列表为辅 |
| info-box + tag-container | narrow + narrow | 规则3：无非网格组件 |
| 单一任意组件 | 按默认宽度 | 单组件无需统一 |

### 推荐示例

**✅ 场景 1: 网格 + info-box（统一宽度）**
```html
<section>
    <h3>网关服务</h3>

    <!-- Info Box 使用宽容器以与 comparison-grid 保持一致 -->
    <div class="info-box" style="max-width: var(--container-wide);">
        <div class="info-box-title">网关作用</div>
        <p>将内部 RPC 方法对外暴露</p>
    </div>

    <!-- Comparison Grid 宽容器 -->
    <div class="comparison-grid">
        <div class="comparison-item">HTTP 网关</div>
        <div class="comparison-item">RPC 网关</div>
    </div>
</section>
```

**✅ 场景 2: 网格 + 次要列表（宽度分层）**
```html
<section>
    <h3>核心功能</h3>

    <!-- Feature Grid 宽容器（主要内容） -->
    <div class="feature-grid">...</div>

    <!-- 辅助说明列表窄容器（次要内容） -->
    <ul style="max-width: var(--container-narrow);">
        <li>注意：以上功能需配置权限</li>
    </ul>
</section>
```

**✅ 场景 3: 多网格组件（统一宽度）**
```html
<section>
    <h3>系统架构</h3>

    <!-- Feature Grid 宽容器 -->
    <div class="feature-grid">...</div>

    <!-- Stat Grid 宽容器（与 feature-grid 宽度一致） -->
    <div class="stat-grid">...</div>
</section>
```

### ❌ 避免的布局

**❌ 错误: 宽度不一致导致视觉跳跃**
```html
<section>
    <h3>网关服务</h3>

    <!-- Info Box 默认窄容器 800px -->
    <div class="info-box">
        网关作用说明
    </div>

    <!-- Comparison Grid 宽容器 1100px -->
    <div class="comparison-grid">
        两种网关模式
    </div>
</section>
```
**问题**: 两个主要组件宽度不同（800px vs 1100px），造成视觉跳跃。

**❌ 错误: 多个主要窄容器组件未统一**
```html
<section>
    <h3>配置说明</h3>

    <!-- Info Box 窄容器 800px -->
    <div class="info-box">基础配置</div>

    <!-- Tag Container 默认窄容器 800px，但未显式声明 -->
    <div class="tag-container">标签列表</div>
</section>
```
**问题**: 虽然宽度相同，但应显式使用 `var(--container-narrow)` 确保一致性。

---

## Gradient Text

```css
.gradient-text {
    background: linear-gradient(135deg, #fff 0%, var(--accent-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

**使用**: 仅用于封面页 h1 标题

## Cover Version

```css
.cover-version {
    margin-top: 3rem;
    font-size: 1rem;
    color: var(--text-muted);
    letter-spacing: 2px;
}
```

## Image Container

```css
.img-box {
    margin-top: 2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-medium);
    padding: 1rem;
    border-radius: 16px;
    box-shadow: var(--shadow-lg);
    text-align: center;
}

.img-box img {
    max-width: 100%;
    max-height: 55vh;
    border-radius: 8px;
}
```

## Tag Component

```css
.tag {
    display: inline-block;
    padding: 6px 14px;
    background: var(--accent-bg);
    border: 1px solid var(--accent-transparent);
    border-radius: 6px;
    color: var(--accent-color);
    font-size: 1rem;
    margin: 10px 5px;
}

.tag-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: var(--container-narrow);
    margin: 0 auto;
}
```

## Card Component

```css
.card {
    padding: 2rem;
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border-light);
    border-radius: 20px;
    margin: 1rem 0;
    text-align: center;
}

.card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-main);
    margin: 0 0 1rem 0;
}

.card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    max-width: var(--container-medium);
    margin: 0 auto;
}
```

## Link Styling

```css
.reveal a {
    color: var(--accent-color);
    text-decoration: underline;
    text-decoration-color: var(--accent-transparent);
    transition: all 0.3s ease;
}

.reveal a:hover {
    color: #fff;
    text-decoration-color: var(--accent-color);
}
```

**适用场景**: 内联文本中的链接

---

## Link List

**用途**: 展示文档链接列表（设计文档、API 文档等）

**约束**:
- 每个链接必须包含 SVG 文档图标
- 使用卡片样式，提供更好的点击体验
- 支持悬停效果（背景变色 + 右移）

```css
.link-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: var(--container-narrow);
    margin: 0 auto;
}

.link-item {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-medium);
    border-radius: 12px;
    color: var(--text-main);
    text-decoration: none !important;
    font-size: 1.15rem;
    transition: all 0.3s ease;
}

.link-item:hover {
    background: var(--accent-bg);
    border-color: var(--accent-transparent);
    transform: translateX(0.5rem);
    color: var(--accent-color);
}

.link-item svg {
    flex-shrink: 0;
    color: var(--accent-color);
    transition: all 0.3s ease;
}

.link-item:hover svg {
    color: var(--accent-color);
}
```

**使用示例**:
```html
<div class="link-list">
    <a href="https://example.com/doc1" target="_blank" class="link-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 0.5rem;">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        文档标题
    </a>
</div>
```

## Fragment Animation

```css
.reveal .fragment.visible {
    color: var(--accent-color);
}
```

---

## Feature Icon

```css
.feature-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--accent-color);
}
```

## SVG Icon Base Styles

所有 SVG 图标必须使用以下标准属性：

```css
/* SVG Icon Template */
svg {
    width: 32px;
    height: 32px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}
```

**关键属性说明**:
- `currentColor`: 自动继承父元素的颜色（通常是 `var(--accent-color)`）
- `stroke-width="2"`: 保持线条粗细一致
- `fill="none"`: 使用描边风格（非填充）
- `viewBox="0 0 24 24"`: 统一使用 24x24 网格

**使用示例**:
```html
<div class="feature-icon">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
</div>
```

**颜色继承**:
- `.feature-icon` 使用 `color: var(--accent-color)`
- SVG 的 `stroke="currentColor"` 自动继承父元素颜色
- 切换主题时，SVG 图标颜色自动更新

---

## Info Box

```css
.info-box {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-medium);
    border-top: 2px solid var(--accent-color);
    padding: 1.5rem 2rem;
    margin: 1rem 0;
    border-radius: 12px;
    text-align: left;
    max-width: var(--container-narrow);
    margin-left: auto;
    margin-right: auto;
    transition: all 0.3s ease;
}

.info-box:hover {
    background: rgba(255, 255, 255, 0.05);
    border-top-color: var(--accent-transparent);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.info-box-title {
    color: var(--accent-color);
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

/* Info box 内部文本字号约束 */
.info-box p {
    font-size: 1.15rem !important;
}

.info-box ul {
    font-size: 1.15rem !important;
}

.info-box li {
    font-size: 1.15rem !important;
}
```

**字号层级**:
- `info-box-title`: 1.3rem（标题）
- `info-box` 内部文本: 1.15rem（内容）
- 保持标题 > 内容的视觉层级

**间距规范**:
- 标题与内容间距: `margin-bottom: 1rem`
- 提供清晰的视觉分离

## Comparison Grid

```css
.comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: var(--container-wide);
    margin: 2rem auto;
}

.comparison-item {
    padding: 2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-medium);
    border-radius: 16px;
    text-align: center;
    transition: all 0.3s ease;
}

.comparison-item:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--accent-transparent);
}

.comparison-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
}
```

## Feature Grid

```css
.feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: var(--container-wide);
    margin: 2rem auto;
}

.feature-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-medium);
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
}

.feature-name {
    color: var(--accent-color);
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

.feature-desc {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.4;
}
```

## Tech Category

```css
.tech-category {
    margin: 2rem 0;
}

.tech-category-title {
    color: var(--accent-color);
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
}
```

## Arrow Flow

```css
.arrow-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
    flex-wrap: wrap;
}

.arrow-step {
    background: var(--accent-bg);
    border: 1px solid var(--accent-transparent);
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    color: var(--text-main);
    font-size: 1.1rem;
}

.arrow-arrow {
    color: var(--accent-color);
    font-size: 1.5rem;
}
```

## Stat Grid

**用途**: 展示数据指标、部署统计、系统状态

**约束**:
- 支持任意数量统计项（1-6 个）
- 每个统计项必须包含：大号数字、标签
- 可添加描述以提供上下文（当需要说明时）
- **自适应布局**：自动根据数量调整列数（1 项 1 列，2 项 2 列，3+ 项 3 列）

```css
.stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: var(--container-wide);
    margin: 2rem auto;
}

.stat-item {
    text-align: center;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid var(--border-medium);
}

.stat-number {
    font-size: 3rem;
    font-weight: 900;
    color: var(--accent-color);
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 1rem;
    color: var(--text-muted);
}
```

---

## List Styles

**⚠️ CRITICAL**: 使用 `!important` 覆盖 Reveal.js 默认样式，防止左侧间距问题

```css
.reveal ul {
    list-style: none !important;
    display: inline-block;
    text-align: left;
    max-width: var(--container-narrow);
    padding-left: 0 !important;
    margin-left: 0 !important;
}

.reveal ul > li {
    padding-left: 0 !important;
    margin-left: 0 !important;
    margin-bottom: 1.5rem;
    text-align: left;
}

.reveal ul > li::before {
    content: none !important;
}

.reveal ol {
    display: inline-block;
    text-align: left;
    max-width: var(--container-narrow);
    padding-left: 2rem !important;
}

.reveal ol > li {
    margin-bottom: 1rem;
    text-align: left;
}
```

**关键点**:
- **始终**使用 `!important` 覆盖 Reveal.js 主题默认值
- 设置 `padding-left: 0` 和 `margin-left: 0` 防止间距
- 保持 `ol` 的 `padding-left: 2rem` 以正确显示编号

---

## CSS Integration Guide

### Quick Assembly

构建完整的 CSS 文件，按顺序组合以下章节：

1. **[CSS Variables](#css-variables)**
   - 包含：颜色系统、语义颜色、边框、阴影、容器宽度

2. **[Theme Classes](#theme-classes)**
   - 根据需要选择主题：ocean / forest / sunset / night / cyber / rose
   - 使用方法：`<body class="theme-ocean">`

3. **[Base Styles](#base-styles)**
   - 背景渐变、排版（h1/h2/h3/p/li）

4. **基础组件** - 按需选择：
   - [Gradient Text](#gradient-text) - 封面标题
   - [Cover Version](#cover-version) - 版本号
   - [Image Container](#image-container) - 图片容器
   - [Tag Component](#tag-component) - 标签
   - [Card Component](#card-component) - 卡片
   - [Link Styling](#link-styling) - 内联链接
   - [Link List](#link-list) - 文档链接列表
   - [Fragment Animation](#fragment-animation) - 动画效果

5. **SVG 图标** - 按需选择：
   - [Feature Icon](#feature-icon) - 特性图标容器
   - [SVG Icon Base Styles](#svg-icon-base-styles) - SVG 图标基础样式

6. **高级组件** - 按需选择：
   - [Info Box](#info-box) - 信息框
   - [Comparison Grid](#comparison-grid) - 对比网格
   - [Feature Grid](#feature-grid) - 特性网格
   - [Tech Category](#tech-category) - 技术分类
   - [Arrow Flow](#arrow-flow) - 箭头流程
   - [Stat Grid](#stat-grid) - 统计网格

7. **[List Styles](#list-styles)**
   - 无符号列表样式（带 !important）

### Example: Minimal CSS Template

```html
<style>
/* Step 1: CSS Variables - 见 [CSS Variables](#css-variables) */
:root {
    --accent-color: #38bdf8;
    --accent-transparent: rgba(56, 189, 248, 0.3);
    --accent-bg: rgba(56, 189, 248, 0.08);
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --bg-primary: #0b0f19;
    --bg-secondary: #1e293b;
    --border-medium: rgba(255, 255, 255, 0.08);
    --shadow-lg: 0 30px 60px rgba(0, 0, 0, 0.4);
    --container-narrow: 800px;
    --container-wide: 1100px;
}

/* Step 2: Theme Class - 选择一个主题（见 [Theme Classes](#theme-classes)） */
body.theme-ocean {
    --accent-color: #0ea5e9;
}

/* Step 3-7: 按需添加其他组件样式（见上述 Quick Assembly 列表） */
</style>
```

---

## Quick Start

1. **选择主题**: 在 `<body>` 标签添加主题类（如 `class="theme-ocean"`）
2. **组合 CSS**: 按上述顺序从各个章节复制所需的 CSS 代码
3. **使用组件**: 根据 [core.md](core.md) 的约束规范选择组件
4. **SVG 图标**: 每个特性生成对应的 SVG icon，使用 `currentColor` 自动继承主题色

**文件引用**:
- 核心约束见 [core.md](core.md)
- 工作流见 [SKILL.md](../SKILL.md)
