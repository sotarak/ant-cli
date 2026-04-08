---
trigger: glob
globs: *.ts
---

You are a senior TypeScript expert. Follow these strict coding standards to ensure type safety, readability, and maintainability.

## 1. Strict Type Safety

### Zero `any` Policy

- ❌ **NEVER** use `any`. It disables type checking.
- ✅ **USE** `unknown` if the type is truly not known yet, and narrow it.
- ✅ **USE** specific types or Interfaces for everything.

### Branded Types (Strong IDs)

Prevent accidental swapping of parameters (e.g., passing `userId` to a `orderId` function).

```typescript
// ✅ Correct
type Brand<K, T> = K & { __brand: T };
export type UserId = Brand<string, 'UserId'>;
export type OrderId = Brand<string, 'OrderId'>;

function getOrder(userId: UserId, orderId: OrderId) { ... }
```

### Discriminated Unions (Poka-Yoke / Error Proofing)

Make invalid states unrepresentable.

```typescript
// ❌ Avoid optional flags that create impossible states
interface State {
  status: "loading" | "success" | "error";
  data?: User; // Could be missing on success?
  error?: Error; // Could be missing on error?
}

// ✅ Correct: Discriminated Union
type State =
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error"; error: Error };
```

## 2. Naming Conventions

- **Variables/Properties**: `camelCase` (e.g., `userProfile`, `isValid`).
- **Classes/Interfaces/Types**: `PascalCase` (e.g., `UserService`, `UserInterface`).
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`).
- **Files**: `kebab-case` (e.g., `user-service.ts`, `create-user.dto.ts`).
- **Booleans**: Prefix with `is`, `has`, `can`, `should` (e.g., `isActive`, `hasPermission`).

## 3. Function Rules (Clean Code)

### Small & Focused

- Functions should do **one thing**.
- Target **< 20 lines** of logic.

### Parameter Limits

- Max **3 arguments**.
- If more are needed, use a configuration object (RO-RO pattern: Receive Object, Return Object).

### Guard Clauses

Avoid deep nesting. Return early.

```typescript
// ❌ Wrong: Nested
function process(user) {
  if (user) {
    if (user.isActive) {
      save(user);
    }
  }
}

// ✅ Correct: Guard Clause
function process(user) {
  if (!user) return;
  if (!user.isActive) return;
  save(user);
}
```

## 4. Immutability & Const

- ✅ **Prefer** `const` over `let`.
- ✅ **Prefer** `readonly` properties in interfaces/classes.
- ✅ **Use** `as const` for literals that shouldn't change.

```typescript
const CONFIG = {
  TIMEOUT: 5000,
  RETRIES: 3,
} as const;
```

## 5. NestJS Specifics

### Dependency Injection

- Always use `private readonly` for injected services in constructors.

### Async/Await

- Always use `async/await` over raw Promises/callbacks.
- Always `.catch()` or use `try/catch` block or let Global Filter handle errors (see Error Handling).

## 6. Meaningful Comments (Kaizen)

- **Do NOT** comment _what_ the code does (the code speaks for itself).
- **DO** comment _why_ complex logic exists.
- **DO** use JSDoc for public APIs (Classes, Methods, DTOs).

```typescript
/**
 * Calculates exponential backoff delay.
 * @param attempt - Current retry attempt (1-based)
 * @returns Delay in milliseconds
 */
```
