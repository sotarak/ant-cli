---
description: Process for implementing a new feature in an existing module
---

# Implement New Feature

Follow this **Expert Protocol** to ensure high-quality, secure feature delivery.

## 1. Analysis & Design Lock

**Do not code until requirements are strictly defined.**

- [ ] **Requirements**: What is the feature? What are the edge cases?
- [ ] **Design Approach**:
  - What data structures change?
  - What new dependencies are needed?
  - **Brainstorming**: If complex, perform a brainstorming session (see `skills/brainstorming`).
- [ ] **Security Impact**:
  - Does this expose PII?
  - Does this require new permissions?

## 2. Research & Context

- Read related Modules/Services.
- Check `rules/code-style-guide.md` for naming conventions.

## 3. Test-Driven Development (TDD) Hybrid

**Standard: Test Logic First**

1. **DTOs/Interfaces**: Define the shapes first.
2. **Unit Test**: Write a test for the Service method that _will_ exist.
   - Mock dependencies.
   - Assert expected return values.
   - Run test -> FAIL.

## 4. Implementation

1. **Data Layer**: Update Schemas/Entites.
2. **Service Layer**: Implement logic to make the Unit Test pass.
3. **API Layer**: Expose via Controller (if applicable).
4. **Module**: Register new providers/imports.

## 5. Quality Assurance

- [ ] **Lint**: Zero errors.
- [ ] **Tests**: All tests pass (Unit + E2E).
- [ ] **Code Review Self-Check**:
  - Functions < 20 lines?
  - No `any`?
  - Comments explain "Why", not "What"?

## 6. Report

```
## Feature Report

### Summary
[Feature Name]: [Description]

### Changes
- Database: [Schema changes]
- API: [New endpoints]

### Verification
- Unit Tests: [Pass/Fail]
- Security Check: [Pass/Fail]
```
