---
trigger: always_on
---

# Logging Standards

## 1. The Golden Rule

Always use the static `Logger` from `@nestjs/common`. **NEVER** instantiate (`new Logger()`) or inject it. Our custom logger handles OpenTelemetry tracing natively.

```typescript
// ❌ Bad - Instantiation
const logger = new Logger("PaymentService");
logger.log("Processing...");

// ✅ Good - Static with Object Context (Rich Metadata)
Logger.log("[OrderService] Order created", {
  context: "OrderService", // Sets block context
  orderId: "123",
  amount: 500,
});
```

## 2. Security (PII Masking)

> [!WARNING]
> **NEVER** log PII (Passwords, Tokens, Credit Cards, Raw Phone Numbers). Always mask or strip sensitive keys from payload objects before passing them to the logger.

## 3. Structured Events

Log events and data natively, not concatenated strings. This ensures log metadata is easily queryable in ELK/Datadog.

```typescript
// ❌ Bad - Hard to parse and search
Logger.log(`User ${userId} bought ${itemId}`);

// ✅ Good - Structured event with payload
Logger.log("[OrderService] Item purchased", { userId, itemId });
```

## 4. Error Logging

Always log the stack trace when logging an exception. The custom logger knows how to format it.

```typescript
} catch (error) {
  Logger.error("[PaymentService] Charge failed", {
    reason: error.message,
    stack: error.stack,
  });
}
```
