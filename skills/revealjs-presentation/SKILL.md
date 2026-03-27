---
name: revealjs-presentation
description: "Create professional Reveal.js presentations with proper structure (h1/h2/h3), color themes, base components (img-box, tag, card), page templates, and rich visual components (SVG icons, stat-grids, feature-grids). Use when creating technical presentations from scratch or modifying existing ones. All presentations use rich visual style by default with professional SVG icons."
---

# Reveal.js Presentation

Create professional technical presentations using Reveal.js framework with consistent design patterns, proper structure, and polished styling.

---

## CRITICAL RULES

### Page Structure
1. **Cover Page**: ONLY h1 + p + version (NO agenda/roadmap)
2. **Roadmap**: SEPARATE h2 chapter with card-grid
3. **Nested Sections**: ⭐ **MUST wrap each chapter's pages in nested `<section>`**
   - Outer `<section>`: Contains entire chapter
   - Inner `<section>`: Individual pages (cover + content pages)
   - Enables Up/Down navigation within chapters
4. **Chapters**: MUST have h2 cover before h3 content pages
5. **Titles**: h1 (once) → h2 (chapters) → h3 (pages)

### CSS
- Use predefined components (`.tag`, `.card`, `.img-box`, etc.)
- NO hardcoded colors (use `var(--accent-color)`)
- Use CSS below directly in `<style>` tags

### Lists
- ONLY 1-level lists (NO nested `<ul><ul>` or `<ul><ol>`)
- Each list item MUST be descriptive phrases (NOT single words)
- Keep list items under 5 per page
- Use proper structure: `<li>Point with explanation</li>`

### Common Violations
- ❌ **Not using nested sections** → Wrap each chapter's pages in `<section><section>...</section></section>`
- ❌ Adding agenda to cover page → Use separate roadmap chapter
- ❌ Skipping h2 chapter cover → Add h2 before h3 pages
- ❌ Using multiple h1 titles → Only one h1 on cover page
- ❌ Hardcoding colors → Use CSS variables
- ❌ Creating custom CSS → Use predefined components
- ❌ **Missing `!important` in list CSS** → List styles MUST use `!important` to override Reveal.js defaults and prevent left spacing issues

---

## VISUAL COMPONENTS

**All presentations use rich visual style by default**, which includes:

- **SVG Icons**: ⭐ Professional inline SVG icons with semantic meaning (auto-generated per title/feature)
- **Feature Grids**: 5-6 features with icons and 2-line descriptions
- **Stat Grids**: Data visualization for metrics and deployment stats
- **Comparison Grids**: Color-coded comparisons (left/right sides must use different colors)
- **Arrow Flows**: Multi-step process visualization
- **Image Captions**: All images include descriptive captions ("Figure X: Description")

**📖 Complete specifications**: See [core.md](references/core.md) for component constraints, usage rules, and SVG icon generation guidelines.

---

## STYLES & CSS

See [styles.md](references/styles.md) for complete CSS reference including:
- CSS variables and color system
- Theme classes (6 color themes)
- Component styles (cards, tags, lists, etc.)
- Complete CSS template ready to copy

---

## WORKFLOW

### Single Workflow (All Use Cases)

1. **Plan Structure**
   - Cover page (h1 title only)
   - Roadmap chapter (h2 with card-grid)
   - Content chapters (h2 covers + h3 pages)
   - Q&A page (h2)

2. **Read Core Reference**
   - [core.md](references/core.md) - Core constraints (structure, typography, visual components, page types, SVG icon generation rules)
   - [styles.md](references/styles.md) - CSS style reference (consult when custom styles are needed)

3. **Create Pages**
   - Follow constraints from core.md (structure, components, page types)
   - Apply CSS variables (no hardcoded colors)
   - Follow CRITICAL RULES above
   - **⭐ CRITICAL: Use nested sections for each chapter**
     ```html
     <!-- Outer section for chapter -->
     <section>
         <!-- Page 1: Chapter cover -->
         <section><h2>01. Title</h2>...</section>
         <!-- Page 2: Content -->
         <section><h3>Title</h3>...</section>
         <!-- Page 3: Content -->
         <section><h3>Title</h3>...</section>
     </section>
     ```
   - Use rich visual components:
     * feature-grid with SVG icons (5-6 items, 2-line descriptions)
     * stat-grid for data/metrics
     * comparison-grid with color differentiation
     * arrow-flow for multi-step processes
     * Card subtitles with descriptions
     * Image captions ("Figure X: Description")
   - **Use local image paths** (relative paths like `./images/arch.png`)
   - Do NOT embed images yet - user needs to preview first

4. **Validate & Preview**
   ```bash
   node ./scripts/validate.js presentation.html
   ```
   - Checks: section nesting, hardcoded colors, nested lists
   - Exit codes: 0=pass, 1=fail
   - **Open presentation.html in browser for user preview**
   - Let user review the presentation with local images

5. **Get User Confirmation**
   - Ask user: "Does the presentation look good? Should I embed the images?"
   - If user approves → proceed to step 6
   - If user wants changes → go back to step 3 and modify

6. **Embed Images** (ONLY after user approval)
   ```bash
   node ./scripts/embed-images.js presentation.html
   ```
   - Converts all local images to base64
   - Creates a backup automatically (presentation.html.backup)
   - Makes HTML file self-contained and portable
   - **Only run this step after user confirms the layout and content**

7. **Final Delivery**
   - Presentation is now ready to share
   - Single HTML file with all assets embedded
   - Can be opened in any browser without dependencies

---

## QUICK REFERENCE

### Title Hierarchy
- **h1**: Cover title (unique)
- **h2**: Chapter covers
- **h3**: Content page titles

### Theme Classes
Add to `<body>` tag: `theme-ocean`, `theme-forest`, `theme-sunset`, `theme-night`, `theme-cyber`, `theme-rose`

### Navigation
- **Left/Right**: Between chapters
- **Up/Down**: Within chapter
- **ESC**: 2D overview
- **Space**: Next slide
- **F**: Fullscreen
