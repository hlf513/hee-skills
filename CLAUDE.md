# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hee Skills is a collection of custom Claude Code skills. Each skill is a self-contained directory under `skills/` with a `SKILL.md` definition file and optional supporting files in `references/`, `scripts/`, and `templates/`.

## Repository Structure

Each skill follows this convention:
- `skills/<name>/SKILL.md` — Skill definition with YAML frontmatter (name, description) and workflow instructions
- `skills/<name>/references/` — Reference docs and specs
- `skills/<name>/scripts/` — Helper scripts (Node.js, no external dependencies)

## Scripts

All scripts are vanilla Node.js (no npm install needed):

```bash
# Validate a Reveal.js presentation HTML file
node skills/revealjs-presentation/scripts/validate.js <presentation.html>

# Embed local images as base64 (makes HTML self-contained, creates .backup automatically)
node skills/revealjs-presentation/scripts/embed-images.js <presentation.html>
```

The `embed-images.js` script can also auto-detect an HTML file if run without arguments from the directory containing the file.

## Adding a New Skill

1. Create `skills/<name>/SKILL.md` with YAML frontmatter (`name`, `description`) followed by instructions
2. Add reference files under `references/` if needed
3. Add helper scripts under `scripts/` if needed (vanilla Node.js preferred)
4. Update `Readme.md` to document the new skill
