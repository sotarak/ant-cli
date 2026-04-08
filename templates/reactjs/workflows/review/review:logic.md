---
description: Deep dive review of feature logic and architecture
---

# Logic & Architecture Review

This workflow is for doing a deep, logical review of a feature or module. It goes beyond code style (linting) and focuses on **correctness**, **data flow**, and **architecture**.

## 0. Load Expert Skills (CRITICAL)

You **MUST** adopt the persona of a Senior Architect and Debugger.

```bash
# Architecture & Deep Analysis
view_file skills/senior-architect/SKILL.md
view_file skills/production-code-audit/SKILL.md

# meaningful Logic Verification
view_file skills/systematic-debugging/SKILL.md
```

## 1. Understand the Goal (The "Why")

Before looking at code, answer:

- What is the business requirement?
- What is the expected user flow?
- What are the edge cases?

## 2. Trace the Data Flow (The "How")

Follow the data from source to UI (and back).

### State Management

- **Source of Truth**: Where does the data live? (URL, Server, Client State).
- **Syncing**: Is there redundant state? (e.g., `useState` mirroring partial props).
- **Updates**: How is state updated? Are race conditions possible?

### Component Logic

- **Conditionals**: Are excessive `if/else` nested? -> Flatten logic.
- **Side Effects**: Are `useEffect` chains creating hard-to-follow logic?
- **Event Handlers**: Do handlers contain too much business logic? -> Move to hooks.

## 3. Verify Edge Cases (Systematic Debugging)

Use the `systematic-debugging` mindset:

- **Network Failures**: What happens if the API fails?
- **Loading States**: Is the UI blocked or janky?
- **Empty States**: What if the list is empty?
- **Large Data**: What if the list has 10,000 items?
- **User Inputs**: malicious input, extremely long strings, emojis?

## 4. Architecture Check (Senior Architect)

- **Scalability**: Will this code survive x10 features added?
- **Coupling**: Is the UI tightly coupled to the Business Logic?
- **Reusability**: Can this logic be reused elsewhere?
- **Security**: Are permissions checked on the client (and server)?

## 5. Report

```markdown
## Logic Review Report

### Feature Analysis

- **Architecture**: [Clean/Coupled/Complex]
- **Data Flow**: [Unidirectional/Circular/Redundant]

### Logical Flaws Found

1. **Race Condition**: `userProfile` might be overwritten if 2 requests fly out.
   - _Fix_: Use `AbortController` or React Query cancellation.
2. **Redundant State**: `isLoading` is manually managed but could be derived.
3. **Edge Case**: App crashes if `data.items` is null (API contract violation).

### Architecture Recommendations

1. Extract the "booking logic" into a pure TypeScript class/hook, separating it from the UI.
2. Use a State Machine (XState or reducer) for the complex payment flow.

### Overall Verdict

- [ ] **Approve**: Logic is sound.
- [ ] **Request Changes**: Architectural flaws present.
```
