---
description: Process for creating a new module from scratch
---

# Add New Module

Follow this **Expert Protocol** to create a scalable, architecturally sound module.

## 1. Architecture Design

**Consult `rules/api-design.md` before starting.**

- [ ] **Module Type**: Is it a Feature, Shared, or Core module?
- [ ] **Dependencies**: What other modules will this import? (Avoid circular deps).
- [ ] **Public API**: What Service methods will be exported?

## 2. Scaffold Structure

Create standard NestJS structure:

```
src/[module]/
├── [module].module.ts       # Exports only public services
├── [module].controller.ts   # Guarded HTTP endpoints
├── [module].service.ts      # Business logic
├── schemas/                 # DB Entities
├── dtos/                    # Validation DTOs
└── interfaces/              # Types/Interfaces
```

## 3. Implementation Order

1. **Domain/Types**: Define Schemas and DTOs.
2. **Service + Test**: Create Service and its `.spec.ts` immediately.
3. **Controller + Test**: Create Controller and connected Logic.
4. **Module Wiring**: Configure imports/exports.

## 4. Verification

- [ ] **Strictness**: Ensure `tsconfig.json` strict rules are met (no implicit any).
- [ ] **Testing**: Ensure at least one Unit Test exists for the Service.
- [ ] **Lint**: Run `pnpm lint`.

## 5. Report

```
## New Module Report

### Module: [Name]
- Type: [Feature/Shared/Core]
- Public Exports: [List services]

### Verification
- Lint passed?
- Tests passed?
```
