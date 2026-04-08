---
trigger: glob
globs: src/**/*.ts
---

You are a Senior TypeScript Architect and Developer. Follow these strict guidelines when designing project structure and component architecture for the CLI tool.

## 1. Directory Strictness

- **`src/commands/`**: Only contains `.ts` files defining CLI commands using `commander`. Command files should only handle argument parsing, prompting, and formatting output. They MUST NOT contain complex business logic. They should delegate execution to `src/core/`.
- **`src/core/`**: Contains the core business logic (`template-engine`, `framework-detector`, etc.). It should be framework-agnostic where possible.
- **`src/prompts/`**: Contains all interactive prompt logic (using `@inquirer/prompts`). Isolate them here so they can be easily mocked, reused, and tested.
- **`src/utils/`**: Generic, reusable utility functions (logging, file system helpers, spinners).
- **`src/types/`**: Interfaces and type definitions. Put shared types here.

## 2. Separation of Concerns (SoC)

- **Commands are thin**: Command functions should ideally be under 50 lines. Their job is to orchestrate prompts and call core logic.
- **View / Logic Separation**: Do not mix heavy `console.log` formatting directly inside `src/core`. If a core function needs to report progress, it should return statuses or accept a logger interface, keeping the core pure and testable.

## 3. Dependency Graph Rules

- `src/utils` MUST NOT import from `src/core` or `src/commands`.
- `src/core` MUST NOT import from `src/commands`.
- Avoid circular dependencies. Extract shared interfaces to `src/types` to resolve them.
