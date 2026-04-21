---
trigger: glob
globs: **/*.ts
---

You are a professional NestJS developer. When writing code, follow these concise commenting guidelines.

## 1. Language Rules

- **English Only**: Variables, functions, logs, errors, configurations.
- **User's Input Language**: Explanations, JSDoc descriptions, TODOs.

## 2. Explain "WHY", not "WHAT"

Keep comments short. Focus on business reasons, not obvious logic.

```typescript
// ❌ Bad (Stating the obvious)
// Check if user exists
if (!user) throw new NotFoundException();

// ✅ Good (Business reason)
// Return 404 to avoid exposing system info if user doesn't exist
if (!user) throw new NotFoundException();
```

## 3. Structural Comments (JSDoc)

Use JSDoc for public methods, classes, and DTOs. For interfaces/types, use inline comments at the end of the line.

```typescript
/**
 * @param dto - Order data from client
 * @returns Newly created order with tracking code
 */
async createOrder(dto: CreateOrderDto): Promise<Order> { }

export interface User {
  id: string; // Unique user identifier
  email: string; // Login email, must be unique
}
```

## 4. Work Markers

Use standard markers for pending items: `// TODO:`, `// FIXME:`, `// NOTE:`

## 5. What NOT to do

- No redundant comments for obvious code.
- No outdated comments (Update comments when changing code).
- No commented-out block (Delete dead code).
