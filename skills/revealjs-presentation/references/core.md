# Reveal.js Core Constraints

Core constraints document: Defines all structure, typography, visual components, and page rules for Reveal.js presentations.

**Table of Contents:**
- [Structure](#structure) - Page hierarchy, nested structure, navigation
- [Typography](#typography) - Title hierarchy, font specifications
- [Visual Components](#visual-components) - Visual component constraints
- [Page Types](#page-types) - Generation rules for each page type
- [Lists](#lists) - List usage rules
- [SVG Icons](#svg-icons) - SVG icon generation rules

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

**⚠️ CRITICAL**: MUST use nested section structure for up/down navigation

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

**Navigation**:
- **Left/Right**: Navigate between chapters
- **Up/Down**: Navigate between pages within a chapter
- **ESC**: View 2D overview

**Common mistakes**:
- ❌ Each page as an independent top-level section
- ❌ Forgetting to wrap chapters in outer sections
- ✅ **Always** wrap each chapter's pages in nested structure

---

## Typography

### Title Hierarchy

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| h1 | 4rem | 900 | Cover title (unique) |
| h2 | 2.8rem | 600 | Chapter cover (numbered) |
| h3 | 2rem | 600 | Content page title |
| p/li | 1.5rem | 400 | Body text |

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

**Purpose**: Display multiple features, capabilities, challenges, or solutions

**Constraints**:
- 3-6 features, 3 per row
- Each feature MUST have an SVG icon
- Each feature MUST have a name and 2-line description

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

**Generation rules**:
1. Generate a semantic SVG icon for each feature (see SVG Icons section)
2. Feature names are highlighted with `var(--accent-color)`
3. Descriptions use `<br>` to split into two lines, keep concise

### Stat Grid

**Purpose**: Display data metrics, deployment statistics, system status

**Constraints**:
- Supports any number of stat items (1-6)
- Each stat item MUST include: large number, label
- Optional description for context (when explanation is needed)
- **Auto-fit layout**: Automatically adjusts columns based on count (1 item = 1 col, 2 items = 2 cols, 3+ items = 3 cols)

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

**Generation rules**:
1. Numbers are highlighted with `var(--accent-color)`
2. Add descriptions for context (when numbers need explanation)
3. Used for data metrics, deployment statistics, system status display
4. Uses auto-fit layout, no need to worry about gaps from item count

### Comparison Grid

**Purpose**: Compare two options, approaches, or patterns

**Constraints**:
- 2-column layout
- **MUST use different colors to distinguish left/right sides**
- **NO hardcoded color values**, use `var(--accent-color)` or CSS variables
- Left side uses theme color, right side uses a secondary color (set background and border via style attribute)

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

**Color usage rules**:
- Left side: Use `var(--accent-bg)` and `var(--accent-transparent)`
- Right side: Use a different secondary color (e.g., purple `rgba(139, 92, 246, *)`)
- Title colors: Use corresponding color variables or direct color values
- **Key constraint**: Both sides MUST have a clear visual difference

### Arrow Flow

**Purpose**: Display request flows, call chains, process steps

**Constraints**:
- Steps arranged horizontally
- Connected with `→` arrows
- Displays request flows, call chains, process steps
- Can be used standalone or embedded in info-box

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

**Combined with info-box**:
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

**Purpose**: Component descriptions, technical details, feature explanations

**Constraints**:
- Top accent border
- Title uses `var(--accent-color)`

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

**Purpose**: Display document link lists (design docs, API docs, references, etc.)

**Constraints**:
- Each link MUST include an SVG document icon
- Use card style for better click experience
- Supports hover effects (background color change + right shift)

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
    <a href="https://example.com/doc2" target="_blank" class="link-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 0.5rem;">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        Another Document
    </a>
</div>
```

**Generation rules**:
1. Use document icons for visual identification
2. Links use `target="_blank"` to open in new tab
3. Card style is more recognizable and clickable than plain links
4. Hover effects provide clear interaction feedback

### Card Grid

**Purpose**: Roadmaps, chapter navigation, option display

**Constraints**:
- Layout: 2x2 (4 items) or 3-column (6 items)
- Each card includes number, title, description
- Subtitle: Add subtitle for additional information (when needed)

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

**Constraints**:
- **Only includes**: h1 title + subtitle + version info
- **Forbidden**: Adding agenda, roadmap, chapter list
- h1 MUST use `gradient-text` class

```html
<section>
    <h1 class="gradient-text">Presentation Title</h1>
    <p>Subtitle or description</p>
    <div class="cover-version">VERSION 1.0 // MARCH 2026</div>
</section>
```

### 2. Roadmap Page

**Constraints**:
- **MUST**: Standalone h2 chapter page
- **MUST**: Use grid component for agenda (card-grid or feature-grid)
- Title choice: Use "Agenda" for technical presentations, "Overview" for business presentations

**Layout options**:

| Agenda items | Recommended layout | Reason |
|-------------|-------------------|--------|
| 4 | card-grid (2 cols) | Standard layout, symmetrical and clean |
| 5-6 | feature-grid (3 cols) | Avoids lonely row, supports icons and descriptions |
| 7+ | Consider splitting chapters | Avoids information overload |

**Option 1: card-grid (standard layout, for 4 agenda items)**
```html
<section>
    <h2>Agenda</h2>
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

**Option 2: feature-grid (enhanced layout, for 5-6 agenda items)**
```html
<section>
    <h2>Overview</h2>
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

**Layout comparison**:

| Feature | card-grid | feature-grid |
|---------|-----------|--------------|
| Columns | 2 cols | 3 cols |
| Icons | None | SVG icons |
| Descriptions | None | 2-line descriptions |
| Best count | 4 items | 5-6 items |
| Visual style | Clean | Rich |

### 3. Chapter Cover

**Constraints**:
- Use h2 title
- Must be numbered (01, 02, 03...)
- Include a brief description

```html
<section>
    <h2>01. Chapter Title</h2>
    <p>Brief description of this chapter</p>
</section>
```

### 4. Content Page

**Constraints**:
- Use h3 title
- Choose appropriate component based on content type:
  - Multiple features → feature-grid
  - Data metrics → stat-grid
  - Comparison content → comparison-grid
  - Process steps → arrow-flow
  - Single description → info-box
  - Simple list → ul/li

```html
<section>
    <h3>Page Title</h3>
    <!-- Choose appropriate component based on content type -->
    <div class="feature-grid">...</div>
</section>
```

### 5. Content Page with List

**Constraints**:
- Use h3 title
- List maximum 5 items
- Each item must be a descriptive phrase (not a single word)
- 1-level lists only (no nesting)

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

**Constraints**:
- Use h3 title
- Image must be wrapped in `.img-box`
- Must add image caption ("Figure X: Description")
- Use relative paths during development, convert to base64 before delivery

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

**Constraints**:
- Use h2 title
- Brief welcome message

```html
<section>
    <h2>Q&A</h2>
    <p style="font-size: 1.8rem; margin-top: 2rem; color: var(--text-muted);">
        Questions and discussion welcome
    </p>
</section>
```

---

## Lists

### List Rules

**Constraints**:
- ✅ **1-level lists only** (no nested `<ul><ul>` or `<ul><ol>`)
- ✅ Each item must be a descriptive phrase (not a single word)
- ✅ Maximum 5 items per page
- ✅ Use `<span class="highlight">` to emphasize keywords

```html
<ul>
    <li><span class="highlight">Key Point</span>: Detailed explanation</li>
    <li><span class="highlight">Another Point</span>: Detailed explanation</li>
    <li>Third point with full description</li>
</ul>
```

**⚠️ CRITICAL**: CSS MUST use `!important` to override Reveal.js default styles and prevent left spacing issues (see styles.md)

---

## SVG Icons

### Icon Generation Rule

**⚠️ CRITICAL**: All features, cards, and emphasis elements MUST use corresponding SVG icons

**Rules**:
1. **Each title/feature must have a semantic SVG icon**
2. **SVG icon color must match `currentColor`** (auto-inherits theme color)
3. **Use standard Feather Icons style** (stroke-based, not filled)
4. **Consistent size**: `width="32" height="32" viewBox="0 0 24 24"`
5. **Consistent attributes**: `fill="none" stroke="currentColor" stroke-width="2"`

### Icon Template

```html
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <!-- Icon paths here -->
</svg>
```

### Semantic Icon Selection

Choose appropriate icons based on content semantics:

| Semantic | Icon Type | Example Scenarios |
|----------|-----------|-------------------|
| **Security/Auth** | Lock/Shield | Authentication, Security, Authorization |
| **Performance/Speed** | Lightning/Rocket | Performance, Speed, Optimization |
| **Data/Analytics** | Bar/Line chart | Analytics, Monitoring, Metrics |
| **Network/Connection** | Globe/Link | Network, API, Integration |
| **Config/Settings** | Gear | Configuration, Settings, Options |
| **Database** | Cylinder | Database, Storage, Cache |
| **Code/Dev** | Code tag | Development, Programming, SDK |
| **Protection/Defense** | Shield | Protection, Firewall, Security |
| **Refresh/Retry** | Circular arrow | Retry, Refresh, Sync |
| **Warning** | Triangle exclamation | Warning, Alert, Caution |
| **Success** | Checkmark | Success, Complete, Done |
| **Info** | Circle i | Info, Note, Tip |
| **Error** | X | Error, Failed, Wrong |
| **User** | Person | User, Account, Profile |
| **Flow** | Arrow | Flow, Process, Pipeline |

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

**In Feature Grid**:
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

**Embedded in Info Box**:
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

1. **Use component-based layouts** instead of plain text
2. **Add visual hierarchy** using cards, grids, boxes
3. **Use semantic SVG icons** for each feature/title
4. **Keep list items descriptive** (not single words)
5. **Limit list items to 5 per page**

### Color Usage

1. **Use CSS variables** to define all colors (no hardcoding)
2. **Comparison pages use different colors** (left/right sides must have clear visual difference)
3. **Use accent colors sparingly** only for emphasis
4. **Maintain consistency** across all slides

### Visual Contrast

1. **Contrast**: Use different colors to distinguish comparison content (left/right colors must differ)
2. **Emphasis**: Use accent-color to highlight keywords
3. **Content**: Use minimal border styles
4. **Hierarchy**: Use card shadows and hover effects

### Layout Principles

1. **Grid-based layouts** are more professional than free-form
2. **Center alignment** for max-width containers
3. **Consistent spacing** (sections use margin: 2rem auto)
4. **Responsive text sizing** (base 1.5rem, adjust as needed)

---

## Summary

**Core principles**:
1. ⭐ Use nested section structure (chapter navigation)
2. ⭐ Generate semantic SVG icons for each feature/title
3. ⭐ Use CSS variables, no hardcoded colors
4. ⭐ Lists are 1-level only, maximum 5 items per page
5. ⭐ Choose appropriate visual components based on content type

**File references**:
- CSS styles: [styles.md](styles.md)
- Workflow: [SKILL.md](../SKILL.md)
