# Reveal.js Styles Reference

Complete CSS style definitions, including variable system, theme classes, component styles, and SVG icon base styles.

**Table of Contents:**
- [CSS Variables](#css-variables) - Color system, semantic colors, borders, shadows, container widths
- [Theme Classes](#theme-classes) - 6 theme color schemes
- [Base Styles](#base-styles) - Typography, background gradient
- [Gradient Text](#gradient-text) - Gradient text effect
- [Cover Version](#cover-version) - Cover version number
- [Image Container](#image-container) - Image container
- [Tag Component](#tag-component) - Tag component
- [Card Component](#card-component) - Card component
- [Link Styling](#link-styling) - Inline link styles
- [Link List](#link-list) - Document link list
- [Fragment Animation](#fragment-animation) - Progressive animation
- [Feature Icon](#feature-icon) - Feature icon container
- [SVG Icon Base Styles](#svg-icon-base-styles) - SVG icon base styles
- [Info Box](#info-box) - Info box component
- [Comparison Grid](#comparison-grid) - Comparison grid
- [Feature Grid](#feature-grid) - Feature grid
- [Tech Category](#tech-category) - Tech category
- [Arrow Flow](#arrow-flow) - Arrow flow
- [Stat Grid](#stat-grid) - Stat grid
- [List Styles](#list-styles) - Unordered list styles (with !important)
- [Container Width System](#container-width-system) - Unified container width specification

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

    /* Container widths - unified container width system */
    --container-narrow: 800px;   /* Lists, narrow content */
    --container-medium: 1000px;  /* Card grids, default container */
    --container-wide: 1100px;    /* Feature grids, comparison grids, stat grids */
    --container-full: 1400px;    /* Full-width layout (special cases) */
}
```

---

## Theme Classes

Apply to `<body>` tag to switch themes:

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

**Usage**:
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

**⚠️ CRITICAL**: Use a unified container width system to ensure consistent widths across all components on a page, avoiding visual jumps.

### Container Width Definitions

| Container Type | CSS Variable | Width | Use Cases |
|---------------|-------------|-------|-----------|
| **Narrow** | `--container-narrow` | 800px | Lists (ul/ol), simple text content |
| **Medium** | `--container-medium` | 1000px | Card grids (card-grid), default container |
| **Wide** | `--container-wide` | 1100px | Feature grids, comparison grids, stat grids |
| **Full** | `--container-full` | 1400px | Special full-width layouts (rarely used) |

### Container Centering Template

```css
/* Standard container centering */
.component-class {
    max-width: var(--container-*);
    margin-left: auto;
    margin-right: auto;
}
```

### Usage Rules

**Constraints**:
- **MUST** use CSS variables for container widths (no hardcoded values)
- **Same-type components within a page must use the same container width**
- **Multi-component pages should use unified container width** (prefer `--container-wide`)

### Component Width Mapping

| Component | Container Type | CSS Variable |
|-----------|---------------|-------------|
| `.reveal ul` | Narrow | `var(--container-narrow)` |
| `.reveal ol` | Narrow | `var(--container-narrow)` |
| `.info-box` | Narrow | `var(--container-narrow)` |
| `.tag-container` | Narrow | `var(--container-narrow)` |
| `.card-grid` | Medium | `var(--container-medium)` |
| `.feature-grid` | Wide | `var(--container-wide)` |
| `.comparison-grid` | Wide | `var(--container-wide)` |
| `.stat-grid` | Wide | `var(--container-wide)` |

### Width Unification for Multi-Component Pages

**⚠️ CRITICAL**: Visual consistency takes priority over component defaults. Multiple primary components on the same page should use unified widths to avoid visual jumps.

When a page contains multiple different components, use the following rules to ensure width consistency:

**Base rules**:
1. **Page has 2+ grid components** → All components use `var(--container-wide)`
2. **Page has grid + list** → Grid uses `var(--container-wide)`, list uses `var(--container-narrow)`
3. **Page has only lists/text** → Use `var(--container-narrow)`

**Visual consistency priority principle**:
- **Primary components on the same page should have unified widths**, even if component types differ
- **Avoid width jumps**: info-box, arrow-flow, etc. should match grid component widths on multi-component pages
- **Secondary content can downgrade**: Lists/text can stay narrow only when used as supplementary descriptions

### Component Combination Quick Reference

| Component Combination | Recommended Width | Reason |
|----------------------|-------------------|--------|
| feature-grid + stat-grid | wide + wide | Rule 1: Two grid components |
| comparison-grid + info-box | wide + wide | ⭐ Visual consistency priority |
| feature-grid + arrow-flow | wide + wide | ⭐ Visual consistency priority |
| feature-grid + ul (secondary) | wide + narrow | Rule 2: Grid is primary, list is secondary |
| info-box + tag-container | narrow + narrow | Rule 3: No grid components |
| Single component | Default width | No unification needed for single component |

### Recommended Examples

**✅ Scenario 1: Grid + info-box (unified width)**
```html
<section>
    <h3>Gateway Service</h3>

    <!-- Info Box uses wide container to match comparison-grid -->
    <div class="info-box" style="max-width: var(--container-wide);">
        <div class="info-box-title">Gateway Role</div>
        <p>Expose internal RPC methods externally</p>
    </div>

    <!-- Comparison Grid wide container -->
    <div class="comparison-grid">
        <div class="comparison-item">HTTP Gateway</div>
        <div class="comparison-item">RPC Gateway</div>
    </div>
</section>
```

**✅ Scenario 2: Grid + secondary list (layered widths)**
```html
<section>
    <h3>Core Features</h3>

    <!-- Feature Grid wide container (primary content) -->
    <div class="feature-grid">...</div>

    <!-- Supplementary list narrow container (secondary content) -->
    <ul style="max-width: var(--container-narrow);">
        <li>Note: The above features require permission configuration</li>
    </ul>
</section>
```

**✅ Scenario 3: Multiple grid components (unified width)**
```html
<section>
    <h3>System Architecture</h3>

    <!-- Feature Grid wide container -->
    <div class="feature-grid">...</div>

    <!-- Stat Grid wide container (matches feature-grid width) -->
    <div class="stat-grid">...</div>
</section>
```

### ❌ Layouts to Avoid

**❌ Error: Inconsistent widths causing visual jumps**
```html
<section>
    <h3>Gateway Service</h3>

    <!-- Info Box default narrow container 800px -->
    <div class="info-box">
        Gateway description
    </div>

    <!-- Comparison Grid wide container 1100px -->
    <div class="comparison-grid">
        Two gateway modes
    </div>
</section>
```
**Problem**: Two primary components have different widths (800px vs 1100px), causing visual jumps.

**❌ Error: Multiple primary narrow-container components not unified**
```html
<section>
    <h3>Configuration</h3>

    <!-- Info Box narrow container 800px -->
    <div class="info-box">Basic configuration</div>

    <!-- Tag Container default narrow container 800px, but not explicitly declared -->
    <div class="tag-container">Tag list</div>
</section>
```
**Problem**: Although widths are the same, `var(--container-narrow)` should be explicitly used to ensure consistency.

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

**Usage**: Only for cover page h1 title

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

**Applicable scenarios**: Links in inline text

---

## Link List

**Purpose**: Display document link lists (design docs, API docs, etc.)

**Constraints**:
- Each link MUST include an SVG document icon
- Use card style for better click experience
- Supports hover effects (background color change + right shift)

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

**Usage example**:
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
        Document Title
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

All SVG icons must use the following standard attributes:

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

**Key attribute notes**:
- `currentColor`: Auto-inherits parent element color (usually `var(--accent-color)`)
- `stroke-width="2"`: Consistent line thickness
- `fill="none"`: Stroke-based style (not filled)
- `viewBox="0 0 24 24"`: Uniform 24x24 grid

**Usage example**:
```html
<div class="feature-icon">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
</div>
```

**Color inheritance**:
- `.feature-icon` uses `color: var(--accent-color)`
- SVG `stroke="currentColor"` auto-inherits parent element color
- When switching themes, SVG icon colors update automatically

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

/* Info box internal text font size constraints */
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

**Font size hierarchy**:
- `info-box-title`: 1.3rem (title)
- `info-box` internal text: 1.15rem (content)
- Maintain title > content visual hierarchy

**Spacing specification**:
- Title to content spacing: `margin-bottom: 1rem`
- Provides clear visual separation

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

**Purpose**: Display data metrics, deployment statistics, system status

**Constraints**:
- Supports any number of stat items (1-6)
- Each stat item MUST include: large number, label
- Optional description for context (when explanation is needed)
- **Auto-fit layout**: Automatically adjusts columns based on count (1 item = 1 col, 2 items = 2 cols, 3+ items = 3 cols)

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

**⚠️ CRITICAL**: Use `!important` to override Reveal.js default styles and prevent left spacing issues

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

**Key points**:
- **Always** use `!important` to override Reveal.js theme defaults
- Set `padding-left: 0` and `margin-left: 0` to prevent spacing
- Keep `ol`'s `padding-left: 2rem` for correct number display

---

## CSS Integration Guide

### Quick Assembly

Build a complete CSS file by combining the following sections in order:

1. **[CSS Variables](#css-variables)**
   - Includes: Color system, semantic colors, borders, shadows, container widths

2. **[Theme Classes](#theme-classes)**
   - Choose a theme as needed: ocean / forest / sunset / night / cyber / rose
   - Usage: `<body class="theme-ocean">`

3. **[Base Styles](#base-styles)**
   - Background gradient, typography (h1/h2/h3/p/li)

4. **Base Components** - Select as needed:
   - [Gradient Text](#gradient-text) - Cover title
   - [Cover Version](#cover-version) - Version number
   - [Image Container](#image-container) - Image container
   - [Tag Component](#tag-component) - Tags
   - [Card Component](#card-component) - Cards
   - [Link Styling](#link-styling) - Inline links
   - [Link List](#link-list) - Document link list
   - [Fragment Animation](#fragment-animation) - Animation effects

5. **SVG Icons** - Select as needed:
   - [Feature Icon](#feature-icon) - Feature icon container
   - [SVG Icon Base Styles](#svg-icon-base-styles) - SVG icon base styles

6. **Advanced Components** - Select as needed:
   - [Info Box](#info-box) - Info box
   - [Comparison Grid](#comparison-grid) - Comparison grid
   - [Feature Grid](#feature-grid) - Feature grid
   - [Tech Category](#tech-category) - Tech category
   - [Arrow Flow](#arrow-flow) - Arrow flow
   - [Stat Grid](#stat-grid) - Stat grid

7. **[List Styles](#list-styles)**
   - Unordered list styles (with !important)

### Example: Minimal CSS Template

```html
<style>
/* Step 1: CSS Variables - see [CSS Variables](#css-variables) */
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

/* Step 2: Theme Class - choose a theme (see [Theme Classes](#theme-classes)) */
body.theme-ocean {
    --accent-color: #0ea5e9;
}

/* Step 3-7: Add other component styles as needed (see Quick Assembly list above) */
</style>
```

---

## Quick Start

1. **Choose a theme**: Add a theme class to the `<body>` tag (e.g., `class="theme-ocean"`)
2. **Assemble CSS**: Copy the needed CSS code from each section in the order above
3. **Use components**: Select components based on the constraints in [core.md](core.md)
4. **SVG icons**: Generate a corresponding SVG icon for each feature, use `currentColor` to auto-inherit theme color

**File references**:
- Core constraints: [core.md](core.md)
- Workflow: [SKILL.md](../SKILL.md)
