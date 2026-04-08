---
trigger: glob
globs: *.tsx
---

You are a professional React Native developer. Follow these concise commenting guidelines.

## Core Principles

1. **Language**: Use **English** for code, naming, and logs. Use **User's Input Language** (Vietnamese) for explanations and JSDoc.
2. **"WHY" over "WHAT"**: Explain the reasoning behind logic, not what the code is doing.
3. **No Redundancy**: If code is self-explanatory, do not comment.

## Guidelines

### 1. JSDoc for Reusables

Use JSDoc (`/** ... */`) for shared Components, Hooks, and Types.

```typescript
/**
 * Animated card component with press feedback
 * @param onPress - Callback khi user tap vào card
 * @param hapticFeedback - Bật haptic feedback khi press (default: true)
 */
export const AnimatedCard = ({ onPress, hapticFeedback = true }: AnimatedCardProps) => { ... }
```

### 2. Complex Logic & Side Effects

Briefly explain complex `useEffect`, platform-specific logic, or native module interactions.

```typescript
useEffect(() => {
  // Defer heavy data processing until after navigation animation completes
  InteractionManager.runAfterInteractions(() => {
    processLargeDataset(rawData);
  });
}, [rawData]);
```

### 3. Platform-Specific Comments

Document platform differences clearly when using conditional logic.

```typescript
// iOS: Uses native blur effect via UIVisualEffectView
// Android: Falls back to semi-transparent overlay (BlurView not supported on Android < 12)
const BackdropComponent = Platform.select({
  ios: BlurredBackdrop,
  android: OverlayBackdrop,
});
```

### 4. Standard Markers

- `TODO`: Future improvements.
- `FIXME`: Broken code.
- `NOTE`: Important caveats.
- `PLATFORM`: Platform-specific workarounds.

### 5. Anti-Patterns (Avoid)

- ❌ **Redundant**: `// Return View` -> `return <View />`
- ❌ **Outdated**: Comments that don't match code.
- ❌ **Dead Code**: Delete commented-out code; don't leave it.
- ❌ **Over-commenting hooks**: Don't comment obvious `useState` or `useCallback`.

## Key Reminder

**Logs and Errors must be in English.** Update comments when changing code.

---

## Related Skills

| Task          | Skill                       | When to Use                                         |
| ------------- | --------------------------- | --------------------------------------------------- |
| Code quality  | `react-patterns`            | Principles cho naming, function size, anti-patterns |
| Code review   | `code-review-checklist`     | Checklist khi review PR                             |
| Architecture  | `react-native-architecture` | Architecture patterns, navigation, native modules   |
| Mobile UX     | `mobile-design`             | Touch-first doctrine, platform conventions          |
| Security docs | `mobile-security-coder`     | Document security decisions, OWASP compliance notes |

> **Note:** Commenting guidelines này là subset của clean code practices. Kết hợp với `react-patterns` skill để có đầy đủ conventions.
