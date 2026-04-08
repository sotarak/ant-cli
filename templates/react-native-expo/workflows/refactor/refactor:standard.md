---
description: Refactor React code to be cleaner, optimized and easier to extend using Kaizen principles
---

# Refactor React Code

Follow this process when refactoring React code. This workflow is grounded in **Kaizen** (Continuous Improvement) and **Clean Code** principles.

## 0. Prerequisites (Skill Injection)

Read these skills to load the necessary patterns into your context.

```bash
# Mindset & Principles
view_file skills/kaizen/SKILL.md
view_file skills/clean-code/SKILL.md

# React Specifics
view_file skills/react-patterns/SKILL.md
view_file skills/frontend-dev-guidelines/SKILL.md
```

## 1. Gather Information

- Identify files/components to refactor.
- Understand the entire code logic and data flow (Props, State, Context).
- Check related files: Hooks, Utils, Constants, Types.

## 2. Analyze Current Code (The "Smell" Test)

Using `clean-code` and `frontend-dev-guidelines`, check for:

- **Large Component**: > 200 lines or mixed responsibilities?
- **Props Drilling**: > 2 levels deep?
- **Duplicate Logic**: Copied code? -> Extract to Custom Hook (`react-patterns`).
- **useEffect Abuse**: Syncing state with effects? -> Derive state instead.
- **Any Types**: `any` usage? -> Strict typing required.
- **Hardcoded Styles**: Inline styles or hex codes? -> Move to Tailwind.

## 3. Plan Refactoring

List needed changes, prioritized by:

1. **Critical**: Logic errors, Hooks violations, Type safety.
2. **Important**: Decomposing components, Extracting Custom Hooks.
3. **Optimizations**: `web-performance-optimization` (memoization, lazy loading).

## 4. Execute Refactoring

Apply the patterns from `react-patterns`:

- **Decompose Components**: Atomic design (Atoms, Molecules, Organisms).
- **Extract Hooks**: Logic goes to `useHookName`. UI stays in Component.
- **Standardize Style**: Use Tailwind utility classes strictly.
- **Clean Types**: Define interfaces/types explicitly.

**Kaizen Principle**: "Improvement without deterioration." Ensure tests pass at every step.

## 5. Verify

```bash
# Verify no regressions
npm test
npm run lint
npm run type-check
```

Check UI responsiveness and interactions manually.

## 6. Report

```markdown
## Refactor Report

### Changes Made

1. [ComponentName] - Decomposed into sub-components.
2. [useHookName] - Encapsulated logic.

### Skill Application

- Applied `react-patterns`: Composition over Inheritance.
- Applied `clean-code`: Meaningful variable naming.
- Applied `frontend-dev-guidelines`: Removed `any` types.

### Notes

- [Any trade-offs made]
```
