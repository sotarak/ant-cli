---
trigger: always_on
---

# Logging Standards

## Golden Rule

Always use the static `Logger` class from `@nestjs/common`. **NEVER** instantiate `new Logger()` or inject it.

The system uses a custom `Winston` + `OpenTelemetry` implementation that automatically handles:

- **Tracing**: Attaches `traceId` and `spanId` to every log.
- **Context**: Tracks execution flow across microservices.
- **Formatting**: JSON for production, colorized pretty-print for local.

## Quick Reference

```typescript
import { Logger } from '@nestjs/common';

// ✅ CORRECT: Static usage with Simple Context
Logger.log('[PaymentService] Processing payment...');

// ✅ CORRECT: Static usage with Rich Context / Metadata
Logger.log('[OrderService] Order created', { orderId: '123', amount: 500 });

// ❌ WRONG: Instantiation
const logger = new Logger('PaymentService');
logger.log('Processing payment...');

// ❌ WRONG: Injection
constructor(private readonly logger: Logger) {}
```

## 1. Context & Metadata

Every class or module MUST communicate "Who am I?" via the context parameter.
Our logger supports passing complex objects as the second argument, which will be formatted as metadata.

### Option A: String Context (Simple)

Use this for simple status messages where you just need to identify the component.

```typescript
Logger.log("[SyncAccountService] Starting sync...");
```

### Option B: Object Context (Rich Metadata)

Use this when you want to attach structured data to the log.
**Crucial:** If passing an object, you can include a `context` property to set the logger context.

```typescript
// The 'context' property is special - it sets the [Context] label in logs
Logger.log("[UserService] User updated", {
  userId: "u123",
  changes: ["email", "status"],
});
```

### Option C: Legacy/Standard NestJS Style

You can still use the standard NestJS signature: `(message, ...optionalParams, context)`.

```typescript
// Message, Metadata Object, Context String
Logger.log("[PaymentService] Payment failed", { errorId: "err_999" });
```

## 2. Smart Tracing (Structured Logs)

Don't just log messages. Log **Events** and **Data**.

### ❌ Bad: String Concatenation

Hard to parse in ELK/Datadog.

```typescript
Logger.log("User " + userId + " bought item " + itemId);
```

### ✅ Good: Structured Metadata

Clear, readable, and queryable.

```typescript
Logger.log("[OrderService] User bought item", {
  userId,
  itemId,
  price: 99.99,
});
```

## 3. Log Levels

| Level   | When to use                                                                |
| ------- | -------------------------------------------------------------------------- |
| `error` | System failure, data loss, exception caught. **Must include stack trace.** |
| `warn`  | Recoverable issue, deprecation, suspicious activity (wrong password).      |
| `log`   | High-level business events (Order placed, User signup, Job started).       |
| `debug` | Developer details (Payloads, query results). Disabled in Prod by default.  |

## 4. Error Logging

Always pass the stack trace. The custom logger knows how to format Error objects.

```typescript
try {
  await charge();
} catch (error) {
  // ✅ Preserves stack trace and adds metadata
  Logger.error("[PaymentService] Charge failed", {
    reason: error.message,
    stack: error.stack,
    orderId: "123",
  });
}
```

## Summary Checklist

- [ ] Import `Logger` from `@nestjs/common`
- [ ] Use `Logger.log('Msg', 'Context')` OR `Logger.log('Msg', { context: 'Ctx', ...meta })`
- [ ] Never `new Logger()`
- [ ] `Logger.error` must include `error.stack`
- [ ] No `console.log` (ESLint should catch this)
