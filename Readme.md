# Hee Skills

A collection of custom [Claude Code](https://code.anthropic.com) skills that extend Claude's capabilities with specialized knowledge, workflows, and tool integrations.

## What are Claude Code Skills?

Claude Code Skills are reusable, specialized prompts that you can invoke with a simple slash command (e.g., `/revealjs-presentation`). Each skill encapsulates domain expertise and best practices for specific tasks, helping you work more efficiently and consistently.

## Available Skills

| Skill | Description | Usage |
|-------|-------------|-------|
| 📊 **revealjs-presentation** | Create professional Reveal.js presentations with proper structure, color themes, and rich visual components. Supports 6 built-in themes, SVG icons, stat-grids, feature-grids, and self-contained HTML output. | `/revealjs-presentation` |
| 🔍 **english-sentence-analyzer** | Deep syntactic analysis of English sentences for Chinese learners — sense group division, clause identification, POS tagging, syntactic function labeling, core word extraction, and Chinese translation. | `/english-sentence-analyzer` |
| 🗣️ **english-pronunciation-coach** | English pronunciation analysis with DJ phonetic transcription. Identifies connected speech (linking, elision, assimilation), weak forms, word/sentence stress, and intonation patterns. | `/english-pronunciation-coach` |

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
