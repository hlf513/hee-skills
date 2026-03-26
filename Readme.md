# Hee Skills

A collection of custom [Claude Code](https://code.anthropic.com) skills that extend Claude's capabilities with specialized knowledge, workflows, and tool integrations.

## What are Claude Code Skills?

Claude Code Skills are reusable, specialized prompts that you can invoke with a simple slash command (e.g., `/revealjs-presentation`). Each skill encapsulates domain expertise and best practices for specific tasks, helping you work more efficiently and consistently.

## Available Skills

### 📊 revealjs-presentation

Create professional Reveal.js presentations with proper structure, color themes, and rich visual components.

**Use when**: Creating technical presentations from scratch or modifying existing ones

**Features**:
- Proper h1/h2/h3 structure with nested sections
- 6 built-in color themes (ocean, forest, sunset, night, cyber, rose)
- Rich visual components (SVG icons, stat-grids, feature-grids, comparison-grids)
- Base components (img-box, tag, card)
- Image embedding validation
- Self-contained HTML output

**Usage**: `/revealjs-presentation`

**Documentation**: See [skills/revealjs-presentation/SKILL.md](skills/revealjs-presentation/SKILL.md)

---

## How to Use Skills

1. **Invoke a skill** by typing its name with a slash prefix:
   ```
   /revealjs-presentation
   ```

2. **Provide context** about what you want to accomplish:
   ```
   /revealjs-presentation
   Create a presentation about microservices architecture with 5 chapters
   ```

3. **Claude will load** the skill's specialized instructions and guide you through the workflow

## Adding New Skills

To add a new skill to this collection:

1. Create a new directory in `skills/`:
   ```
   skills/your-skill-name/
   ```

2. Create a `SKILL.md` file with the skill definition:
   ```yaml
   ---
   name: your-skill-name
   description: "Brief description of when to use this skill"
   ---

   # Your Skill Name

   Detailed instructions and workflows...
   ```

3. (Optional) Add supporting files:
   - `references/` - Documentation and reference materials
   - `scripts/` - Helper scripts
   - `templates/` - Code or document templates

4. Test your skill and update this README



## Contributing

Contributions are welcome! Feel free to:

- Report bugs or issues
- Suggest new skill ideas
- Submit pull requests for improvements
- Share your own custom skills

## License

MIT License - Feel free to use these skills in your own projects!

## Resources

- [Claude Code Documentation](https://code.anthropic.com)
- [Skill Creation Guide](https://code.anthropic.com/docs/skills)
- [Reveal.js Documentation](https://revealjs.com/)
