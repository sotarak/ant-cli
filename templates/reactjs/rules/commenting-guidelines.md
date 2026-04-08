---
trigger: glob
globs: *.tsx
---

You are a professional React developer. Follow these concise commenting guidelines.

## Core Principles

1. **Language**: Use **English** for code, naming, and logs. Use **User's Input Language** (Vietnamese) for explanations and JSDoc.
2. **"WHY" over "WHAT"**: Explain the reasoning behind logic, not what the code is doing.
3. **No Redundancy**: If code is self-explanatory, do not comment.

## Guidelines

### 1. JSDoc for Reusables

Use JSDoc (`/** ... */`) for shared Components, Hooks, and Types.

```typescript
/**
 * Primary button component
 * @param isLoading - Disables button and shows spinner
 */
export const Button = ({ onClick, isLoading }: ButtonProps) => { ... }
```

### 2. Complex Logic & Side Effects

Briefly explain complex `useEffect`, `useMemo`, or business logic.

```typescript
useEffect(() => {
  // Connect only if not active to prevent duplicates
  if (!isConnected) connect();
}, [isConnected]);
```

### 3. Standard Markers

- `TODO`: Future improvements.
- `FIXME`: Broken code.
- `NOTE`: Important caveats.

### 4. Anti-Patterns (Avoid)

- ❌ **Redundant**: `// Return div` -> `return <div />`
- ❌ **Outdated**: Comments that don't match code.
- ❌ **Dead Code**: Delete commented-out code; don't leave it.

## Key Reminder

**Logs and Errors must be in English.** Update comments when changing code.

---

## Related Skills

| Task         | Skill                   | When to Use                                         |
| ------------ | ----------------------- | --------------------------------------------------- |
| Code quality | `clean-code`            | Principles cho naming, function size, anti-patterns |
| Code review  | `code-review-checklist` | Checklist khi review PR                             |

> **Note:** Commenting guidelines này là subset của `clean-code` skill. Xem skill đầy đủ: `view_file skills/clean-code/SKILL.md`
