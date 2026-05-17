# Contributing to OtakuTurks UI

First off, thank you for considering contributing to OtakuTurks UI! It's people like you that make this library better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

- Make sure you have a [GitHub account](https://github.com/signup)
- Fork the repository on GitHub
- Check the [issues](https://github.com/otakuturks/ui/issues) for open tasks

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- yarn (recommended) or npm

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ui.git
cd ui

# Install dependencies
yarn install

# Start storybook for development
yarn storybook
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

- Write your code following our [coding standards](#coding-standards)
- Add or update tests if necessary
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run storybook to visually test components
yarn storybook

# Build to verify no errors
yarn build:lib
```

### 4. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Examples:
git commit -m "feat: add new OtCalendar component"
git commit -m "fix: resolve OtModal focus trap issue"
git commit -m "docs: update OtButton documentation"
git commit -m "refactor: improve OtInput accessibility"
```

**Commit Types:**

| Type       | Description                        |
| ---------- | ---------------------------------- |
| `feat`     | New feature                        |
| `fix`      | Bug fix                            |
| `docs`     | Documentation only                 |
| `style`    | Code style (formatting, etc)       |
| `refactor` | Code change without fix or feature |
| `perf`     | Performance improvement            |
| `test`     | Adding or updating tests           |
| `chore`    | Build, CI, or tool changes         |

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Pull Request Process

1. **Update Documentation** - Ensure your changes are documented
2. **Follow Conventional Commits** - All commits must follow the convention
3. **Keep PRs Focused** - One feature/fix per PR
4. **Write Clear Descriptions** - Explain what and why, not just how
5. **Link Issues** - Reference any related issues

### PR Title Format

PR titles should follow the same convention as commits:

```
feat: add OtCalendar component
fix: resolve OtModal focus trap
docs: update installation guide
```

## Coding Standards

### Vue Components

- Use `<script setup>` syntax
- Use TypeScript-style JSDoc comments for props
- Follow the existing component structure

```vue
<script setup>
/**
 * Button component for user interactions
 * @property {string} variant - Button variant (primary, secondary, danger, warning, success)
 * @property {string} size - Button size (sm, md, lg)
 */
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'warning', 'success'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})
</script>
```

### CSS

- Use CSS custom properties from the design system
- Use scoped styles
- Follow BEM naming convention for classes

```css
.ot-component {
  /* base styles */
}
.ot-component--variant {
  /* variant modifier */
}
.ot-component__element {
  /* element */
}
.ot-component__element--modifier {
  /* element modifier */
}
```

### File Naming

- Components: `OtComponentName.vue` (PascalCase with Ot prefix)
- Use kebab-case for CSS class names with `ot-` prefix

### Accessibility

- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Include ARIA attributes where necessary
- Test with keyboard navigation

## Questions?

Feel free to open an issue for any questions or discussions.

Thank you for contributing!
