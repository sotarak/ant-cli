---
trigger: glob
globs: **/*.service.ts, **/*.controller.ts, **/*.guard.ts, **/*.strategy.ts, **/*.interceptor.ts, **/*.pipe.ts, **/*.filter.ts, **/*.middleware.ts, **/*.resolver.ts, **/*.module.ts, **/*.handler.ts, **/*.processor.ts
---

You are a senior NestJS developer. Follow these strict guidelines for error handling.

## 1. Centralized Error System

Always use the custom `ErrorException` with predefined `ErrorCodes` from `@libs/core/constants`. Let errors bubble up to the `GlobalExceptionFilter` (which handles HTTP mapping and OpenTelemetry tracing).

```typescript
// ❌ Bad - Using NestJS native exceptions directly
throw new NotFoundException("User not found");

// ✅ Good - Using ErrorException
throw new ErrorException({
  errorCode: ErrorCodes.HttpNotFound,
  message: "User not found", // Optional
  errors: [{ field: "email", value: dto.email }], // Optional field details
});
```

## 2. Error Code Ranges (Reference)

Find & Add codes in the `ErrorCodes` enum grouped by domain:

- `0`: Success (`HttpSuccess`)
- `1000-1099`: HTTP errors (`HttpBadRequest`, `HttpNotFound`, etc.)

## 3. Error Handling Best Practices

### Business Logic

Don't use `try/catch` for standard business flow. Only use it for logging context or fallback recovery.

```typescript
try {
  await this.externalApi.charge(orderId);
} catch (error) {
  // ✅ Good: Log context before throwing mapped internal error
  Logger.error(`Payment failed for order: ${orderId}`, error);
  throw new ErrorException(ErrorCodes.HttpServiceUnavailable);
}
```

### Promises & Async

Always `await` promises or handle their `.catch` method to prevent unhandled promise rejections.
