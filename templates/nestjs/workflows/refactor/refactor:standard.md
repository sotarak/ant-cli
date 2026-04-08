---
description: Refactor code to be cleaner, optimized and easier to extend
---

# Refactor Code

Follow this **Kaizen Protocol** (`skills/kaizen`).

**Concept**: Leave the code better than you found it, safely.

## 1. Safety First

**Do not start refactoring without a safety net.**

- [ ] **Tests Existence**: Does the code being refactored have tests?
  - IF NO: Create a "Characterization Test" (locks in current behavior) first.
- [ ] **Baseline**: Ensure all tests PASS before touching code.

## 2. Plan (Incremental)

- [ ] **Goal**: Define _why_ (Performance? Readability? Extensibility?).
- [ ] **Strategy**: Break big refactors into small, distinct steps.
  - Step 1: Rename variable
  - Step 2: Extract function
  - Step 3: Move file

## 3. Execute Loop

Repeat this loop for each step:

1. **Refactor**: Make **small** structural change.
2. **Compile**: Ensure no syntax errors.
3. **Test**: Run tests immediately.
4. **Commit**: Save progress if green.

**Red Flag**: If tests fail and you can't fix in 5 mins -> **Revert**. Don't dig a hole.

## 4. Quality Rules

Apply `rules/code-style-guide.md`:

- Functions < 20 lines.
- No `any`.
- Meaningful names.

## 5. Report

```
## Refactor Report

### Summary
[Brief description of improvement]

### Changes
- [File]: [What changed]

### Verification
- Regressions: [None/Fixed]
- Performance: [Metric if applicable]
```
