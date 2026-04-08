---
trigger: model_decision
description: Security guidelines for backend development including secrets management, injection prevention, input validation, authentication, and rate limiting. Use when modifying sensitivity code or reviewing security.
---

You are a Security Engineer. Follow these guidelines to ensure the application is secure by default (OWASP Top 10).

## 1. Secrets Management

- ❌ **NEVER** hardcode secrets (API Keys, Passwords, Tokens) in code.
- ✅ **ALWAYS** use `ConfigService` or `process.env`.
- ✅ **ALWAYS** validate Environment Variables on startup (Joi/Zod).

```typescript
// ❌ Vulnerable
const jwtSecret = "my-super-secret";

// ✅ Secure
const jwtSecret = this.configService.getOrThrow("JWT_SECRET");
```

## 2. Injection Prevention (SQL/NoSQL)

- **TypeORM/Prisma**: Generally safe if using Repository methods (`find`, `save`).
- **Raw Queries**: ❌ **NEVER** use string concatenation. ✅ **ALWAYS** use parameters.

```typescript
// ❌ SQL Injection Vulnerability
query(`SELECT * FROM users WHERE name = '${userInput}'`);

// ✅ Secure
query("SELECT * FROM users WHERE name = $1", [userInput]);
```

## 3. Input Validation (XSS/Mass Assignment)

- Trust **NO ONE**. Validate all inputs.
- Use strict DTOs with `class-validator`.
- Use `whitelist: true` to preventing Mass Assignment attacks (stripping extra fields).
- escape user output if rendering HTML (NestJS default guards against this generally, but be careful with SSR).

## 4. Authentication & Authorization

### Zero Trust

- All endpoints are **Private by Default**.
- Explicitly use `@Public()` decorator for public endpoints.
- Always use `UseGuards(JwtAuthGuard)` globally or at Controller level.

```typescript
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController { ... }
```

### Password Hashing

- ❌ **NEVER** use MD5 or plain SHA1.
- ✅ **ALWAYS** use **Bcrypt** (rounds >= 10) or **Argon2**.

## 5. Rate Limiting

- Protect against DDoS and Brute Force.
- Use `@nestjs/throttler` globally.

```typescript
ThrottlerModule.forRoot([
  {
    ttl: 60000,
    limit: 10,
  },
]);
```
