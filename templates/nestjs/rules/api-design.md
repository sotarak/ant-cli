---
trigger: glob
globs: **/*.controller.ts, **/*.dto.ts, **/*.module.ts
---

You are a senior NestJS developer and Architect. Follow these strict guidelines when designing modules, API endpoints, and DTOs.

## 1. Module Architecture

Organize your application into clear module types.

### Feature Modules

Encapsulate specific business domains (e.g., `UserModule`, `OrderModule`).

- **Must** import only what they need.
- **Must** export only their public API (usually just the Service).
- **Should** have their own `controllers`, `services`, and `dtos`.

### Shared Modules

Reusable logic shared across features (e.g., `EmailModule`, `StorageModule`).

- **Must** be stateless where possible.
- **Must** typically be imported by Feature Modules.
- **Avoid** circular dependencies with Feature Modules.

### Core Module

Global singletons and infrastructure (e.g., `DatabaseModule`, `ConfigModule`, `AuthModule`).

- **Imported once** in `AppModule`.
- Use `@Global()` decorator sparingly and only when truly necessary (e.g., Database connection).

## 2. Layer Responsibilities (Separation of Concerns)

Strictly enforce separation between HTTP layer and Business Logic.

### Controllers (`*.controller.ts`)

**Responsibility**: Handle HTTP requests, parsing, and response formatting.

- ❌ **NO** business logic.
- ❌ **NO** direct database access.
- ❌ **NO** `try-catch` blocks. Let exceptions bubble up to the Global Exception Filter.
- ✅ **DO** validate inputs using DTOs.
- ✅ **DO** delegate work to Services.
- ✅ **DO** return DTOs or simple types.

```typescript
// ✅ Correct
@Post()
async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
  const user = await this.userService.create(dto);
  return this.userMapper.toResponse(user);
}
```

### Services (`*.service.ts`)

**Responsibility**: Business logic, rules, and data orchestration.

- ❌ **NO** knowledge of HTTP details (req, res, headers).
- ✅ **DO** throw standard Exceptions (`NotFoundException`, etc.) which the framework filters handle.
- ✅ **DO** use Repositories for data access.

## 3. URL Structure & Naming

### Resource Naming

- Use **nouns** (plural).
- Use **kebab-case**.
- Max **2 levels** of nesting.

```
✅ GET /users/:id/orders
❌ GET /get-users (Verb)
❌ GET /user (Singular)
❌ GET /users/:id/orders/:orderId/items/:itemId (Too deep)
```

### HTTP Methods

- `GET`: Retrieve (Idempotent, Safe)
- `POST`: Create (Not Idempotent)
- `PUT`: Replace entire resource (Idempotent)
- `PATCH`: Update partial resource (Not Idempotent typically, but safe to retry if designed well)
- `DELETE`: Remove resource (Idempotent)

## 4. DTO Guidelines (Strict Validation)

All inputs **MUST** be validated using `class-validator`.

### Structure

Place DTOs in `src/<module>/dtos/`.

### Validation Rules

- **Never** use `any`.
- **Always** use specific validators (`@IsEmail`, `@IsInt`, `@Min`, etc.).
- **Always** whitelist properties (configure `ValidationPipe({ whitelist: true })` globally).
- **Always** use `@Type(() => Number)` (from `class-transformer`) for Number fields in Query Payloads (because query params are parsed as strings by default).

**Create DTO:**

```typescript
export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
```

**Update DTO:**
Use Mapped Types to partial strictness.

```typescript
import { PartialType } from "@nestjs/swagger"; // or @nestjs/mapped-types

export class UpdateProductDto extends PartialType(CreateProductDto) {}
```

## 5. Security Integration in Design

### Guards

Apply `@UseGuards()` for authentication and authorization.

- Prefer class-level guards if they apply to all endpoints.
- Use `SetMetadata` or custom decorators (e.g., `@Roles('admin')`) for granular control.

### Interceptors

Use Interceptors for response transformation (e.g., `ClassSerializerInterceptor` to hide password fields).

```typescript
@UseInterceptors(ClassSerializerInterceptor)
@Get(':id')
async findOne(@Param('id') id: string): Promise<UserEntity> {
  return this.userService.findOne(id);
}
```

### Pipes

Use Pipes for simple data transformation (e.g., `ParseIntPipe`, `ParseUUIDPipe`).

```typescript
@Get(':id')
findOne(@Param('id', ParseUUIDPipe) id: string) { ... }
```
