---
description: Process for adding a new API endpoint to an existing module
---

# Add New API

Follow this **Expert Protocol** when adding a new API endpoint.

## 1. Design & Security Gate (Mandatory)

**Before any code is written**, you must lock the design.

- [ ] **Define Contract**:
  - Method & URL (compliant with `rules/api-design.md`)
  - Input DTO (with validation constraints)
  - Output DTO (response shape)
- [ ] **Security Check** (`rules/security-best-practices.md`):
  - Is it Public or Private? (Default: Private)
  - Who can access it? (Roles/Guards)
  - Is input validated completely?

## 2. Research Module

- Read `*.module.ts` (Dependencies)
- Read `*.service.ts` (Business Logic)
- Read `dtos/*.dto.ts` (Existing patterns)

## 3. Test-First Implementation

**You must define how you will test this before implementation.**

- [ ] **Create DTOs**: Implement input/output DTOs with strict `class-validator` rules.
- [ ] **Write Failing Test**:
  - Create/Update `*.spec.ts` (Unit) or `*.e2e-spec.ts`.
  - Assert the new endpoint behavior (status code, response structure).
  - Verify it fails as expected.

## 4. Implementation

1. **Controller**: Add endpoint decorator. Use `@UseGuards()` and DTOs.
2. **Service**: Implement business logic.
3. **Connect**: Call service from controller.

## 5. Verification Policy

- [ ] **Lint**: `pnpm lint` (Zero errors allowd)
- [ ] **Types**: No `any` used.
- [ ] **Tests**: The test you wrote in Step 3 MUST pass now.
- [ ] **Security**: Manual check against OWASP Top 10 (Injection, Auth).

## 6. Report

```
## New API Report

### Endpoint
[METHOD] /[route]

### Design vs Implementation
- Contract met? [Yes/No]
- Security guards applied? [List guards]

### Verification
- Test file: [path/to/test]
- Coverage: [Did you verify happy & error paths?]
```
