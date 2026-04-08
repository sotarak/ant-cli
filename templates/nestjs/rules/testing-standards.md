---
trigger: glob
globs: *.spec.ts, *.test.ts
---

You are a senior QA/SDET. Follow these standards for robust, reliable testing.

## 1. The Testing Pyramid

Strictly adhere to the pyramid ratios:

- **Unit Tests (70%)**: Fast, isolated, mock everything.
- **Integration Tests (20%)**: Test interactions (Service + DB, or Controller + Service).
- **E2E Tests (10%)**: Full flow (HTTP Request -> DB).

## 2. Unit Testing Standards

### Isolation

- **NEVER** use real databases or network calls in Unit Tests.
- **ALWAYS** mock dependencies.

### Mocking Tooling

- Use `@golevelup/ts-jest` for auto-mocking NestJS providers.
- Avoid manual `jest.fn()` wherever possible to reduce maintenance.

```typescript
// ✅ Correct
const service: UserService;
const repo: DeepMocked<UserRepository>;

beforeEach(async () => {
  const module = await Test.createTestingModule({
    providers: [
      UserService,
      { provide: UserRepository, useValue: createMock<UserRepository>() },
    ],
  }).compile();

  service = module.get(UserService);
  repo = module.get(UserRepository);
});
```

### Naming

- Describe the **Behavior**, not the function name.
- Pattern: `describe('MethodName')` -> `it('should return X when Y')`.

```typescript
describe('createUser', () => {
  it('should throw ConflictException when email exists', () => { ... });
  it('should return UserDto on success', () => { ... });
});
```

## 3. E2E Testing Standards

### Infrastructure

- Use **TestContainers** or **In-Memory Database** (sqlite :memory:) for E2E tests.
- **NEVER** rely on a shared pre-existing database. Use a fresh instance per test suite.

### Scope

- Test the critical paths ("Happy Path").
- Test critical error boundaries (Auth failure, Validation failure).

```typescript
it("/POST users (201)", () => {
  return request(app.getHttpServer())
    .post("/users")
    .send(validPayload)
    .expect(201)
    .expect((res) => {
      expect(res.body.id).toBeDefined();
    });
});
```

## 4. Test Quality

### Determinism

- Tests **MUST** pass 100% of the time. Flaky tests are deleted immediately.
- Do not rely on `Date.now()`, `Math.random()`. Mock them or use fixed inputs.

### Coverage

- Aim for **80%** coverage on Branch and Line.
- 100% coverage on Utils/Helpers.
