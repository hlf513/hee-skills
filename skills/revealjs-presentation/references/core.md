# Reveal.js Core Constraints

核心约束文档：定义 Reveal.js 演示文稿的所有结构、排版、视觉组件和页面规则。

**Table of Contents:**
- [Structure](#structure) - 页面层级、嵌套结构、导航
- [Typography](#typography) - 标题层级、字体规范
- [Visual Components](#visual-components) - 视觉组件约束规范
- [Page Types](#page-types) - 各类页面的生成规则
- [Lists](#lists) - 列表使用规范
- [SVG Icons](#svg-icons) - SVG 图标生成规则

---

## Structure

### Page Hierarchy

```
Presentation
├── h1: Presentation Title (cover page, unique)
│
├── h2: Chapter Cover (one per chapter)
│   └── h3: Content Page Title (individual pages)
│       ├── Lists
│       ├── Images
│       └── Components
```

### Nested Section Structure

**⚠️ CRITICAL**: 必须使用嵌套 section 结构实现上下导航

```html
<!-- Outer section: horizontal navigation (between chapters) -->
<section>
    <!-- Inner section 1: chapter cover (h2) -->
    <section>
        <h2>01. Chapter Title</h2>
        <p>Chapter description</p>
    </section>

    <!-- Inner section 2-N: content pages (h3) -->
    <section>
        <h3>Page Title</h3>
        <ul>...</ul>
    </section>

    <section>
        <h3>Another Page</h3>
        <div class="feature-grid">...</div>
    </section>
</section>
```

**导航方式**:
- **Left/Right**: 在章节之间导航
- **Up/Down**: 在章节内页面间导航
- **ESC**: 查看 2D 全局预览

**常见错误**:
- ❌ 每个页面作为独立的顶层 section
- ❌ 忘记用外层 section 包裹章节
- ✅ **始终**用嵌套结构包裹每个章节的页面

---

## Typography

### Title Hierarchy

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| h1 | 4rem | 900 | 封面标题（唯一） |
| h2 | 2.8rem | 600 | 章节封面（编号） |
| h3 | 2rem | 600 | 内容页标题 |
| p/li | 1.5rem | 400 | 正文内容 |

### Title Decision Tree

```
Need to add a title?
│
├─ Is it the cover page?
│  └─ Use h1 (unique, gradient-text class)
│
├─ Is it a chapter cover?
│  └─ Use h2 (numbered: 01, 02, 03...)
│
└─ Is it a normal content page?
   └─ Use h3 (descriptive, not numbered)
```

### Examples

```html
<!-- Cover page -->
<h1 class="gradient-text">System Architecture Overview</h1>

<!-- Chapter cover -->
<h2>01. System Background</h2>
<p>Challenges and solutions</p>

<!-- Content page -->
<h3>Core Components</h3>
<ul>
    <li>Component one with description</li>
</ul>
```

---

## Visual Components

### Component Selection Guide

```
Need to present content?
│
├─ Multiple features/capabilities?
│  └─ Use feature-grid (3-6 items with SVG icons)
│
├─ Data/metrics/deployment stats?
│  └─ Use stat-grid (1-6 items, auto-fit layout)
│
├─ Comparing two options?
│  └─ Use comparison-grid (2 columns with different colors)
│
├─ Multi-step process/flow?
│  └─ Use arrow-flow (horizontal steps with → arrows)
│
├─ Document links/reference list?
│  └─ Use link-list (document cards with icons)
│
└─ Single component/feature description?
   └─ Use info-box (with title and content)
```

### Feature Grid

**用途**: 展示多个功能、特性、挑战、解决方案

**约束**:
- 3-6 个特性，每行 3 个
- 每个特性必须有 SVG 图标
- 每个特性必须有名称和 2 行描述

```html
<div class="feature-grid">
    <div class="feature-item">
        <div class="feature-icon">
            <!-- SVG ICON HERE -->
        </div>
        <div class="feature-name">Feature Name</div>
        <div class="feature-desc">Brief line one<br>Brief line two</div>
    </div>
    <!-- Repeat for 3-6 items -->
</div>
```

**生成规则**:
1. 为每个特性生成语义化的 SVG 图标（见 SVG Icons 章节）
2. 特性名称使用 `var(--accent-color)` 高亮
3. 描述使用 `<br>` 分为两行，保持简洁

### Stat Grid

**用途**: 展示数据指标、部署统计、系统状态

**约束**:
- 支持任意数量统计项（1-6 个）
- 每个统计项必须包含：大号数字、标签
- 可添加描述以提供上下文（当需要说明时）
- **自适应布局**：自动根据数量调整列数（1 项 1 列，2 项 2 列，3+ 项 3 列）

```html
<div class="stat-grid">
    <div class="stat-item">
        <div class="stat-number">99.9%</div>
        <div class="stat-label">Uptime</div>
        <p style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.7;">
            Last 12 months availability
        </p>
    </div>
    <!-- Repeat for 1-6 items -->
</div>
```

**生成规则**:
1. 数字使用 `var(--accent-color)` 突出显示
2. 添加描述以提供上下文（当数字需要说明时）
3. 用于数据指标、部署统计、系统状态展示
4. 使用自适应布局，无需担心数量导致的空白区域

### Comparison Grid

**用途**: 对比两个方案、选项、模式

**约束**:
- 2 列布局
- **必须使用不同颜色区分左右两侧**
- **禁止硬编码颜色值**，使用 `var(--accent-color)` 或 CSS 变量
- 左侧使用主题色，右侧使用辅助色（通过 style 属性设置背景和边框）

```html
<div class="comparison-grid">
    <div class="comparison-item" style="background: var(--accent-bg); border: 2px solid var(--accent-transparent);">
        <div class="comparison-title" style="color: var(--accent-color);">Option A</div>
        <p>Description</p>
        <ul><li>Point 1</li><li>Point 2</li></ul>
    </div>
    <div class="comparison-item" style="background: rgba(139, 92, 246, 0.08); border: 2px solid rgba(139, 92, 246, 0.3);">
        <div class="comparison-title" style="color: #a78bfa;">Option B</div>
        <p>Description</p>
        <ul><li>Point 1</li><li>Point 2</li></ul>
    </div>
</div>
```

**颜色使用规则**:
- 左侧：使用 `var(--accent-bg)` 和 `var(--accent-transparent)`
- 右侧：使用不同的辅助色（如紫色 `rgba(139, 92, 246, *)`）
- 标题颜色：使用对应的颜色变量或直接颜色值
- **关键约束**：两侧颜色必须有明显视觉差异

### Arrow Flow

**用途**: 展示请求流程、调用链路、过程步骤

**约束**:
- 步骤水平排列
- 使用 `→` 箭头连接
- 展示请求流程、调用链路、过程步骤
- 可单独使用或嵌入 info-box 中

```html
<div class="arrow-flow">
    <span class="arrow-step">User</span>
    <span class="arrow-arrow">→</span>
    <span class="arrow-step">Gateway</span>
    <span class="arrow-arrow">→</span>
    <span class="arrow-step">Service</span>
    <span class="arrow-arrow">→</span>
    <span class="arrow-step">Database</span>
</div>
```

**配合 info-box**:
```html
<div class="info-box">
    <div class="info-box-title">HTTP Gateway Flow</div>
    <div class="arrow-flow">
        <span class="arrow-step">Client</span>
        <span class="arrow-arrow">→</span>
        <span class="arrow-step">Gateway</span>
        <span class="arrow-arrow">→</span>
        <span class="arrow-step">Service</span>
    </div>
</div>
```

### Info Box

**用途**: 组件描述、技术细节、功能说明

**约束**:
- 带顶部强调边框
- 标题使用 `var(--accent-color)`

```html
<div class="info-box">
    <div class="info-box-title">Component Name</div>
    <ul>
        <li>Feature 1: Description</li>
        <li>Feature 2: Description</li>
    </ul>
</div>
```

### Document Link List

**用途**: 展示文档链接列表（设计文档、API 文档、参考资料等）

**约束**:
- 每个链接必须包含 SVG 文档图标
- 使用卡片样式，提供更好的点击体验
- 支持悬停效果（背景变色 + 右移）

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
    <a href="https://example.com/doc2" target="_blank" class="link-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 0.5rem;">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        另一个文档
    </a>
</div>
```

**生成规则**:
1. 使用文档图标增强视觉识别
2. 链接使用 `target="_blank"` 在新标签页打开
3. 卡片样式比普通链接更易识别和点击
4. 悬停效果提供清晰的交互反馈

### Card Grid

**用途**: 路线图、章节导航、选项展示

**约束**:
- 布局：2x2（4 项）或 3 列（6 项）
- 每个卡片包含编号、标题、描述
- 副标题：添加副标题以提供额外信息（当需要时）

```html
<div class="card-grid">
    <div class="card">
        <div class="card-title">01</div>
        <p>Chapter Title</p>
        <p style="font-size: 1rem; margin-top: 0.5rem; opacity: 0.8;">
            Optional subtitle description
        </p>
    </div>
    <!-- Repeat for 4-6 items -->
</div>
```

---

## Page Types

### 1. Cover Page

**约束**:
- **仅包含**: h1 标题 + 副标题 + 版本信息
- **禁止**: 添加议程、路线图、章节列表
- h1 必须使用 `gradient-text` 类

```html
<section>
    <h1 class="gradient-text">Presentation Title</h1>
    <p>Subtitle or description</p>
    <div class="cover-version">VERSION 1.0 // MARCH 2026</div>
</section>
```

### 2. Roadmap Page

**约束**:
- **必须**: 独立的 h2 章节页面
- **必须**: 使用网格组件展示议程（card-grid 或 feature-grid）
- 标题选择：技术演示使用"议程"，业务演示使用"内容概览"

**布局选择**:

| 议程项数量 | 推荐布局 | 原因 |
|----------|---------|------|
| 4 个 | card-grid（2列） | 标准布局，对称美观 |
| 5-6 个 | feature-grid（3列） | 避免单独一行，支持图标和描述 |
| 7+ 个 | 考虑拆分章节 | 避免信息过载 |

**方案 1: card-grid（标准布局，适合 4 个议程项）**
```html
<section>
    <h2>议程</h2>
    <div class="card-grid">
        <div class="card">
            <div class="card-title">01</div>
            <p>Chapter One</p>
        </div>
        <div class="card">
            <div class="card-title">02</div>
            <p>Chapter Two</p>
        </div>
        <div class="card">
            <div class="card-title">03</div>
            <p>Chapter Three</p>
        </div>
        <div class="card">
            <div class="card-title">04</div>
            <p>Chapter Four</p>
        </div>
    </div>
</section>
```

**方案 2: feature-grid（增强布局，适合 5-6 个议程项）**
```html
<section>
    <h2>内容概览</h2>
    <div class="feature-grid" style="margin-top: 3rem;">
        <div class="feature-item">
            <div class="feature-icon">
                <!-- SVG icon here -->
            </div>
            <div class="feature-name">01. Chapter Title</div>
            <div class="feature-desc">Brief description<br>Line two</div>
        </div>
        <!-- Repeat for 5-6 items -->
    </div>
</section>
```

**布局对比**:

| 特性 | card-grid | feature-grid |
|------|-----------|--------------|
| 列数 | 2 列 | 3 列 |
| 图标 | ❌ 无 | ✅ SVG 图标 |
| 描述 | ❌ 无 | ✅ 2 行描述 |
| 最佳数量 | 4 个 | 5-6 个 |
| 视觉风格 | 简洁 | 丰富 |

### 3. Chapter Cover

**约束**:
- 使用 h2 标题
- 必须编号（01, 02, 03...）
- 包含简短描述

```html
<section>
    <h2>01. Chapter Title</h2>
    <p>Brief description of this chapter</p>
</section>
```

### 4. Content Page

**约束**:
- 使用 h3 标题
- 根据内容类型选择合适的组件：
  - 多个特性 → feature-grid
  - 数据指标 → stat-grid
  - 对比内容 → comparison-grid
  - 流程步骤 → arrow-flow
  - 单一描述 → info-box
  - 简单列表 → ul/li

```html
<section>
    <h3>Page Title</h3>
    <!-- Choose appropriate component based on content type -->
    <div class="feature-grid">...</div>
</section>
```

### 5. Content Page with List

**约束**:
- 使用 h3 标题
- 列表最多 5 项
- 每项必须是描述性短语（非单词）
- 仅 1 级列表（禁止嵌套）

```html
<section>
    <h3>Page Title</h3>
    <ul>
        <li>Descriptive point one with detailed explanation</li>
        <li>Descriptive point two with detailed explanation</li>
        <li>Descriptive point three with detailed explanation</li>
    </ul>
</section>
```

### 6. Content Page with Image

**约束**:
- 使用 h3 标题
- 图片必须包裹在 `.img-box` 中
- 必须添加图片说明（"Figure X: Description"）
- 开发时使用相对路径，交付前转换为 base64

```html
<section>
    <h3>Architecture</h3>
    <div class="img-box">
        <img src="architecture.png" alt="System Architecture">
        <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-muted);">
            Figure 1: Complete system architecture showing service topology
        </p>
    </div>
</section>
```

### 7. Q&A Page

**约束**:
- 使用 h2 标题
- 简洁的欢迎信息

```html
<section>
    <h2>Q&A</h2>
    <p style="font-size: 1.8rem; margin-top: 2rem; color: var(--text-muted);">
        欢迎提问与交流
    </p>
</section>
```

---

## Lists

### List Rules

**约束**:
- ✅ **仅 1 级列表**（禁止嵌套 `<ul><ul>` 或 `<ul><ol>`）
- ✅ 每项必须是描述性短语（非单个词）
- ✅ 每页最多 5 项
- ✅ 使用 `<span class="highlight">` 强调关键词

```html
<ul>
    <li><span class="highlight">Key Point</span>: Detailed explanation</li>
    <li><span class="highlight">Another Point</span>: Detailed explanation</li>
    <li>Third point with full description</li>
</ul>
```

**⚠️ CRITICAL**: CSS 必须使用 `!important` 覆盖 Reveal.js 默认样式，防止左侧间距问题（见 styles.md）

---

## SVG Icons

### Icon Generation Rule

**⚠️ CRITICAL**: 所有特性、卡片、强调元素都必须使用对应的 SVG 图标

**规则**:
1. **每个标题/特性必须生成一个语义化的 SVG icon**
2. **SVG icon 颜色必须与 `currentColor` 一致**（自动继承主题色）
3. **使用标准 Feather Icons 风格**（stroke-based，非 filled）
4. **统一尺寸**: `width="32" height="32" viewBox="0 0 24 24"`
5. **统一属性**: `fill="none" stroke="currentColor" stroke-width="2"`

### Icon Template

```html
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <!-- Icon paths here -->
</svg>
```

### Semantic Icon Selection

根据内容语义选择合适的图标：

| 语义 | 图标类型 | 示例场景 |
|------|---------|----------|
| **安全/认证** | 锁/盾牌 | Authentication, Security, Authorization |
| **性能/速度** | 闪电/火箭 | Performance, Speed, Optimization |
| **数据/分析** | 柱状图/折线图 | Analytics, Monitoring, Metrics |
| **网络/连接** | 地球/链接 | Network, API, Integration |
| **配置/设置** | 齿轮 | Configuration, Settings, Options |
| **数据库** | 圆柱体 | Database, Storage, Cache |
| **代码/开发** | 代码标签 | Development, Programming, SDK |
| **保护/防御** | 盾牌 | Protection, Firewall, Security |
| **刷新/重试** | 循环箭头 | Retry, Refresh, Sync |
| **警告** | 三角感叹号 | Warning, Alert, Caution |
| **成功** | 对勾 | Success, Complete, Done |
| **信息** | 圆圈 i | Info, Note, Tip |
| **错误** | X | Error, Failed, Wrong |
| **用户** | 人形 | User, Account, Profile |
| **流程** | 箭头 | Flow, Process, Pipeline |

### Common Icon Patterns

```html
<!-- Security (Lock) -->
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
</svg>

<!-- Performance (Zap) -->
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
</svg>

<!-- Database -->
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
</svg>

<!-- Network (Globe) -->
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
</svg>

<!-- Settings (Gear) -->
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
</svg>
```

### Icon Usage Examples

**在 Feature Grid 中**:
```html
<div class="feature-grid">
    <div class="feature-item">
        <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
        </div>
        <div class="feature-name">Authentication</div>
        <div class="feature-desc">Unified authentication<br>with RBAC</div>
    </div>
</div>
```

**在 Info Box 中嵌入图标**:
```html
<div class="info-box">
    <div class="info-box-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 0.5rem;">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        Security Features
    </div>
    <ul>...</ul>
</div>
```

---

## Design Rules

### Content Organization

1. **使用基于组件的布局** 而非纯文本
2. **添加视觉层次** 使用 cards, grids, boxes
3. **使用语义化 SVG 图标** 为每个特性/标题
4. **保持列表项描述性**（非单词）
5. **限制每页列表项为 5 个**

### Color Usage

1. **使用 CSS 变量** 定义所有颜色（禁止硬编码）
2. **对比页面使用不同颜色**（左右两侧必须有明显视觉差异）
3. **节制冷色** 仅用于强调
4. **保持一致性** 跨所有幻灯片

### Visual Contrast

1. **对比**: 使用不同颜色区分对比内容（左右两侧颜色必须不同）
2. **强调**: 使用 accent-color 高亮关键词
3. **内容**: 使用最小边框样式
4. **层次**: 使用 card 阴影和 hover 效果

### Layout Principles

1. **基于网格的布局** 比自由形式更专业
2. **居中对齐** 用于最大宽度容器
3. **一致间距**（sections 使用 margin: 2rem auto）
4. **响应式文本大小**（基础 1.5rem，按需调整）

---

## Summary

**核心原则**:
1. ⭐ 使用嵌套 section 结构（章节导航）
2. ⭐ 每个特性/标题生成语义化 SVG 图标
3. ⭐ 使用 CSS 变量，禁止硬编码颜色
4. ⭐ 列表仅 1 级，每页最多 5 项
5. ⭐ 根据内容类型选择合适的视觉组件

**文件引用**:
- CSS 样式见 [styles.md](styles.md)
- 工作流见 [SKILL.md](../SKILL.md)
