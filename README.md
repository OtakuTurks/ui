# OtakuTurks UI

[![License: GPL v3](https://img.shields.io/badge/License-GPL_v3-blue?style=flat-square&labelColor=343b41)](https://www.gnu.org/licenses/gpl-3.0)
[![Package Version](https://img.shields.io/github/package-json/v/otakuturks/ui?style=flat-square&labelColor=343b41&color=orange)](https://github.com/otakuturks/ui)
![Vue](https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vue.js&logoColor=white&labelColor=343b41)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black&labelColor=343b41)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white&labelColor=343b41)

A Vue 3 UI component library.

## Installation

```bash
yarn add @otakuturks/ui
```

## Usage

### Global Registration

```javascript
import { createApp } from 'vue'
import OtakuturksUI from '@otakuturks/ui'
import '@otakuturks/ui/style.css'

const app = createApp(App)
app.use(OtakuturksUI)
app.mount('#app')
```

### Individual Components

```javascript
import { OtButton, OtInput, OtCard } from '@otakuturks/ui'
import '@otakuturks/ui/style.css'
```

## Components

### Form Components

- **OtButton** - Button with multiple variants and sizes
- **OtInput** - Input field with password toggle and adornment support
- **OtDropdown** - Select dropdown with keyboard navigation
- **OtCheckbox** - Checkbox with indeterminate state
- **OtSwitch** - Toggle switch
- **OtIconButton** - Icon-only button

### Layout Components

- **OtGrid** - Responsive grid system
- **OtCard** - Card container with variants

### Navigation Components

- **OtTabs** - Tabs navigation (line and pills variants)
- **OtTab** - Tab content wrapper

### Overlay Components

- **OtModal** - Modal dialog
- **OtTooltip** - Tooltip on hover/focus
- **OtSearchModal** - Search modal with keyboard shortcuts (Ctrl+K)

### Feedback Components

- **OtAlert** - Alert messages
- **OtProgress** - Progress bar
- **OtSkeleton** - Loading skeleton

### Data Display Components

- **OtAvatar** - User avatar with initials fallback
- **OtBadge** - Badge/indicator
- **OtTag** - Tag/label

### Icons

- IconSearch, IconHome, IconUser, IconBookmark, IconPlay
- IconChevronLeft, IconChevronRight, IconClose
- IconEye, IconEyeOff, IconTrash, IconDirectory
- IconCheck, IconPlus, IconMinus, IconEdit, IconSettings
- IconMenu, IconStar, IconStarOutline

## Design System

### Colors

```css
--ot-primary: #377dff --ot-danger: #ff715b --ot-warning: #ffbe3d --ot-success: #2dca8c
  --ot-gray-100: #aab0b7 --ot-gray-200: #858a8f --ot-gray-300: #2a2c34 --ot-gray-400: #1e2029
  --ot-gray-500: #12141d;
```

### Typography

```css
--ot-font-family:
  'Rubik',
  sans-serif --ot-font-xs: 0.75rem --ot-font-sm: 0.875rem --ot-font-base: 1rem --ot-font-lg: 1.25rem
    --ot-font-xl: 1.5rem;
```

### Border Radius

```css
--ot-radius-sm: 4px --ot-radius-base: 8.7px --ot-radius-lg: 12px --ot-radius-full: 999px;
```

## Development

### Run Storybook

```bash
yarn storybook
```

### Build Library

```bash
yarn build:lib
```
