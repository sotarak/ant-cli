---
description: Review React code changes before commit using skills for validation
---

# Review React Code (Uncommitted)

Follow this process when reviewing React code before committing to ensure quality, performance, and logic correctness.

## 0. Load Review Skills (CRITICAL)

You **MUST** read these skills to perform a proper review. Do not guess the rules.

```bash
# Core Review Skills
view_file skills/code-review-checklist/SKILL.md
view_file skills/lint-and-validate/SKILL.md

# React Specific Standards
view_file skills/frontend-dev-guidelines/SKILL.md
view_file skills/web-performance-optimization/SKILL.md
```

## 1. Collect Changes

Get list of changed files and view diff:

```bash
git status --short
git diff
```

## 2. Read And Understand Context

Read new code and related code:

- **Component Tree**: Understand the component's position in the application tree.
- **Props & State**: Input data and internal state.
- **Hooks**: Side-effect logic or re-computations.
- **Tailwind**: Check UI consistency.

## 3. Evaluate Code (React Checklist)

Apply the knowledge from the loaded skills.

### A. General Quality (from `code-review-checklist`)

- [ ] Logic is clear and correct?
- [ ] No formatting issues?
- [ ] Checks for null/undefined?

### B. React Best Practices (from `frontend-dev-guidelines`)

- [ ] **Functional Only**: No Class Components.
- [ ] **Hooks Rules**: Correct dependency arrays, no conditional hooks.
- [ ] **Suspense/Lazy**: Are new heavy components lazy loaded?
- [ ] **TanStack Router**: Are routes typed correctly (if applicable)?
- [ ] **Strict Typing**: No `any`.

### C. Performance (from `web-performance-optimization`)

- [ ] **Re-renders**: specific check for unnecessary re-renders.
- [ ] **Bundle Size**: No heavy imports (e.g., full lodash).
- [ ] **Memoization**: `useMemo` / `useCallback` used effectively for expensive operations, NOT everywhere.
- [ ] **Images**: Are images optimized (next/image or appropriate formats)?

### D. UI/UX & Tailwind

- [ ] **No Hardcoding**: No arbitrary pixels/hex colors.
- [ ] **Tokens**: Uses standard spacing/color tokens (e.g. `p-4`, `text-slate-900`).
- [ ] **Responsive**: Verified on mobile/tablet?

## 4. Run Automated Validation

Before finalizing the review, run the `lint-and-validate` skill actions.

```bash
# Run validation per skill instructions
npm run lint
npm run type-check # or tsc --noEmit
```

## 5. Report

```markdown
## Code Review Report

### Feature Changes

1. **[Feature Name]**: Short description.

### Issues Found

1. `UserProfile.tsx:42` - Missing cleanup function in useEffect (🔴 Critical) - See `frontend-dev-guidelines`.
2. `Button.tsx:15` - Hardcoded color `#333` (🟡 Warning) - Violation of Design System.
3. `LargeComponent.tsx` - Not lazy loaded (⚪ Info) - See `web-performance-optimization`.

> If no issues: "No issues found"

### Summary

Brief summary of code quality. Ready to commit or needs fixes.
```
