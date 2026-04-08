---
trigger: glob
globs: *.tsx
---

# ReactJS & React Native Rules & Skills Index

Quick reference for rules and skills within the ReactJS and React Native (Expo) frameworks.

## Rules

| Rule                                                | Purpose                                    |
| --------------------------------------------------- | ------------------------------------------ |
| [code-style-guide](./code-style-guide.md)           | React coding standards, hooks, performance |
| [design-style-guide](./design-style-guide.md)       | Tailwind CSS, minimalist design principles |
| [commenting-guidelines](./commenting-guidelines.md) | Comments, JSDoc, documentation             |

---

## Skill Integration Matrix

Choose the appropriate skill based on the task type:

| Task Type            | Primary Skill           | Secondary Skills                                |
| -------------------- | ----------------------- | ----------------------------------------------- |
| **Create component** | `react-patterns`        | `typescript-expert`, `clean-code`               |
| **UI/Design work**   | `ui-ux-pro-max`         | `tailwind-patterns`, `frontend-design`          |
| **Native UI/Apps**   | `building-native-ui`    | `use-dom`, `react-ui-patterns`                  |
| **Native Data/API**  | `native-data-fetching`  | `expo-api-routes`                               |
| **Expo Client**      | `expo-dev-client`       | -                                               |
| **Performance**      | `react-best-practices`  | `web-performance-optimization`, `clean-code`    |
| **Form handling**    | `form-cro`              | `react-patterns`                                |
| **Code review**      | `code-review-checklist` | `lint-and-validate`, `frontend-dev-guidelines`  |
| **Refactoring**      | `kaizen`                | `clean-code`                                    |
| **Logic Review**     | `senior-architect`      | `production-code-audit`, `systematic-debugging` |
| **SEO optimization** | `seo-audit`             | -                                               |
| **Git Workflow**     | `git-pushing`           | `clean-code`                                    |

---

## Available Skills

```
skills/
├── building-native-ui/   # Expo Router, native UI, styling, navigation
├── clean-code/           # SOLID, naming, anti-patterns
├── code-review-checklist/ # PR review checklist
├── concise-planning/     # Task planning and breakdown
├── expo-api-routes/      # EAS Hosting & Expo API Routes
├── expo-dev-client/      # Expo local builds & TestFlight
├── form-cro/             # Form conversion optimization
├── frontend-design/      # Web components & UI aesthetics
├── frontend-dev-guidelines/ # React/TS best practices
├── git-pushing/          # Git operations & conventional commits
├── kaizen/               # Continuous improvement
├── lint-and-validate/    # Linting & type checking
├── native-data-fetching/ # React Query, fetches & Expo loaders
├── production-code-audit/ # Deep code quality scan
├── react-best-practices/ # Vercel's performance rules
├── react-patterns/       # Hooks, composition, state
├── react-ui-patterns/    # UI component patterns
├── senior-architect/     # Architecture & design patterns
├── seo-audit/            # SEO optimization
├── systematic-debugging/ # Debugging methodology
├── tailwind-patterns/    # Tailwind & styling patterns
├── typescript-expert/    # Type system, migrations
├── ui-ux-pro-max/        # Design system & UI/UX principles
├── use-dom/              # Expo DOM components
└── web-performance-optimization/ # Core Web Vitals & speed
```

---

## Quick Start

```bash
# 1. Design work - Generate design system first
python3 skills/ui-ux-pro-max/scripts/search.py "saas dashboard" --design-system

# 2. After code changes - Always validate
npm run lint && npx tsc --noEmit

# 3. Performance review - Check react-best-practices
view_file skills/react-best-practices/SKILL.md
```

> **Rule:** Every React task should start by reading the corresponding skill and end with `lint-and-validate`.
