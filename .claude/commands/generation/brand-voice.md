---
description: Generate brand identity and voice guidelines for consistent project communication
model: claude-sonnet-4-5
---

# Brand & Voice Generator

Create brand identity and voice guidelines for: **$ARGUMENTS**

## Discovery Phase

First, gather information about the project/product:

1. **Product Type**: What is being built? (SaaS, CLI tool, library, API, etc.)
2. **Target Audience**: Who are the primary users?
3. **Value Proposition**: What problem does it solve?
4. **Competitive Position**: How does it differentiate?
5. **Tone Aspirations**: How should the brand feel? (Professional, friendly, technical, approachable)

## Generate Brand Identity File

Create a `BRAND.md` file with this structure:

```markdown
# [Project Name] Brand Guidelines

## Brand Identity

### Mission Statement
[One sentence describing what the project does and why it exists]

### Vision
[Aspirational statement about the project's future impact]

### Core Values
1. **[Value 1]**: [Brief explanation]
2. **[Value 2]**: [Brief explanation]
3. **[Value 3]**: [Brief explanation]

## Voice & Tone

### Voice Attributes
| Attribute | We Are | We Are Not |
|-----------|--------|------------|
| Tone | [e.g., Professional] | [e.g., Stuffy] |
| Language | [e.g., Clear] | [e.g., Jargon-heavy] |
| Approach | [e.g., Helpful] | [e.g., Condescending] |

### Writing Principles
1. **Clarity First**: [Principle explanation]
2. **[Principle 2]**: [Explanation]
3. **[Principle 3]**: [Explanation]

### Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| Documentation | Instructive, clear | "To install, run `npm install`" |
| Error Messages | Helpful, actionable | "Connection failed. Check your network settings." |
| Marketing | Confident, inspiring | "Build faster with [Product]" |
| Support | Empathetic, solution-focused | "I understand that's frustrating. Let's fix this." |

## Writing Style Guide

### Do's
- Use active voice
- Be concise
- Use inclusive language
- Provide examples
- [Project-specific do]

### Don'ts
- Don't use passive voice
- Don't use jargon without explanation
- Don't be condescending
- Don't assume expertise
- [Project-specific don't]

### Terminology

| Use | Instead Of |
|-----|------------|
| [Preferred term] | [Avoided term] |
| [Preferred term] | [Avoided term] |

### Code Comments Style
```
// Good: Explains the "why"
// Validates input before expensive API call

// Avoid: Explains the "what" (obvious from code)
// Check if input is valid
```

## Visual Identity (if applicable)

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary | #XXXXXX | Main actions, links |
| Secondary | #XXXXXX | Accents |
| Background | #XXXXXX | Page backgrounds |
| Text | #XXXXXX | Body text |

### Typography
- **Headings**: [Font family]
- **Body**: [Font family]
- **Code**: [Monospace font]

## Application Examples

### README Opening
```markdown
# [Project Name]

[One-line description matching brand voice]

[Longer description that embodies the tone]
```

### Error Message Template
```
[What happened] + [Why it matters] + [How to fix it]

Example: "Authentication failed. Your session may have expired. Please log in again."
```

### Commit Message Style
```
[type]: [description in brand voice]

feat: Add dark mode support
fix: Resolve login timeout issue
docs: Clarify installation steps
```

## Brand Checklist

Use this checklist when creating content:

- [ ] Does this match our voice attributes?
- [ ] Is the tone appropriate for the context?
- [ ] Did we use preferred terminology?
- [ ] Is it clear and actionable?
- [ ] Would our target audience understand this?
```

## Output Location

Save the generated file as:
- `BRAND.md` in the project root, or
- `.claude/BRAND.md` for Claude-specific voice guidelines, or
- `docs/BRAND.md` in the documentation folder

## Usage

This brand guide should be referenced when:
- Writing documentation
- Creating error messages
- Composing commit messages
- Writing marketing copy
- Responding to issues/PRs
- Creating UI copy

Now generate the brand and voice guidelines based on the project context.
