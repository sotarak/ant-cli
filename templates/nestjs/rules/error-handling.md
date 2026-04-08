---
trigger: glob
globs: *.ts
---

You are a senior NestJS developer. Follow these strict guidelines for error handling using the project's custom exception system.

## 1. Use ErrorException with ErrorCodes

The system uses a custom `ErrorException` class with predefined `ErrorCodes` enum.

```typescript
import { ErrorException } from "@libs/core/exceptions";
import { ErrorCodes } from "@libs/core/constants";

// ❌ Bad - Don't use NestJS exceptions directly
throw new BadRequestException("Invalid input");
throw new NotFoundException("User not found");

// ✅ Good - Use ErrorException with error code
throw new ErrorException(ErrorCodes.HttpBadRequest);
throw new ErrorException(ErrorCodes.HttpNotFound);

// ✅ Best - Include message and errors context
throw new ErrorException({
  errorCode: ErrorCodes.InvestorEmailExists,
  message: "Email is already used by another investor",
  errors: [{ field: "email", value: dto.email }],
});
```

## 2. Error Codes Structure

The system defines error codes in `ErrorCodes` enum with categorized ranges:

| Range       | Category    | Examples                                             |
| ----------- | ----------- | ---------------------------------------------------- |
| `0`         | Success     | `HttpSuccess`                                        |
| `1000-1099` | HTTP errors | `HttpBadRequest`, `HttpNotFound`, `HttpUnauthorized` |

### Adding New Error Codes

When you need to add a new error code:

1. Search for `ErrorCodes` enum in the codebase to find its location
2. Add the new error code following the established range conventions
3. Search for `ErrorMessages` constant and add the corresponding message
4. Keep error codes grouped by domain/category

## 3. ErrorResponse Interface

Standard error response structure:

```typescript
interface ErrorResponse {
  errorCode: ErrorCodes; // Numeric error code
  message?: string; // Error message
  errors?: Record<string, unknown>[]; // Field-level error details
  timestamp?: string; // Auto-generated timestamp
}
```

## 4. Global Exception Filter

The system uses `GlobalExceptionFilter` to handle all exceptions:

- Auto-maps HTTP status → ErrorCodes
- Auto-generates timestamp in response
- Integrates OpenTelemetry tracing (x-trace-id header)
- **Always returns HTTP 200** with errorCode in body

```typescript
// Response format
{
  "errorCode": 1005,
  "message": "Not found",
  "timestamp": "2024-02-02T08:00:00.000Z"
}
```

## 5. Best Practices

### Don't use try/catch for business errors

Let errors bubble up to GlobalExceptionFilter:

```typescript
// ❌ Bad - Catch and re-throw
try {
  await this.mxvApi.createInvestor(dto);
} catch (error) {
  throw new ErrorException(ErrorCodes.MxvApiError);
}

// ✅ Good - Let error bubble up
await this.mxvApi.createInvestor(dto);
```

### Use try/catch only for recovery or special logging

```typescript
// ✅ OK - When you need to log context before throwing
try {
  await this.externalApi.charge(orderId);
} catch (error) {
  Logger.error(`Payment failed for order: ${orderId}`, error.stack);
  throw new ErrorException({
    errorCode: ErrorCodes.HttpServiceUnavailable,
    message: "Payment gateway unavailable",
    errors: [{ orderId }],
  });
}
```

### Validation errors with field-level details

```typescript
throw new ErrorException({
  errorCode: ErrorCodes.HttpBadRequest,
  message: "Validation failed",
  errors: [
    { field: "email", message: "Invalid email format" },
    { field: "phone", message: "Phone number required" },
  ],
});
```

## 6. Async Error Handling

- Always `await` all Promises
- Never fire-and-forget without error handling

```typescript
// ❌ Dangerous - Unhandled rejection
this.service.doHeavyWork();

// ✅ Safe
await this.service.doHeavyWork();
// OR
this.service.doHeavyWork().catch((err) => Logger.error(err));
```
