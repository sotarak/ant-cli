---
trigger: glob
globs: "**/*.ts"
---

You are an Expert Clean Code Practitioner. Follow these strict guidelines regarding coding style, naming conventions, and documentation in TypeScript.

## 1. Language & Naming Conventions

- **English Only**: All comments, documentation, variable names, and function names MUST be in English to ensure the codebase is easily understandable natively and globally.
- **Meaningful Names**: Use highly descriptive names. Example: `isFrameworkDetected` is better than `checkFw`. Code should be self-documenting.
- **Casing**:
  - `camelCase` for variables, functions, and method names.
  - `PascalCase` for classes, interfaces, and types.
  - `UPPER_SNAKE_CASE` for global constant variables.

## 2. Clean Code Principles

- **SOLID & DRY**: Do Not Repeat Yourself. If logic is duplicated across commands or modules, extract it to `src/utils/` or a shared helper immediately.
- **Small Testable Functions**: A function should do exactly one thing. If a function goes over ~50 lines, break it down.
- **Immutability**: Prefer `const` over `let`. Avoid mutating objects/arrays directly; instead use spread operators (`...`) or array methods like `map`, `filter`, and `reduce`.
- **ESM Modules**: Always use standard ES modules (`import`/`export`).

## 3. JSDoc Standard

- Focus on making the documentation **clear and easy to understand** for other developers. Don't restrict readability for the sake of strict syntax.
- Every **exported** function, class, and critical type MUST have a JSDoc block.
- **Types in JSDoc**: While TypeScript handles strict typing, adding types in JSDoc (e.g. `{string}`) is optional but encouraged if it clarifies intent or boundaries without needing to hover the IDE checking TS definitions.

**Example Standard:**

```typescript
/**
 * Detects the project framework by analyzing the package.json file.
 * We look for specific dependencies (like 'react' or '@nestjs/core') to determine the type.
 *
 * @param projectPath - The absolute path to the project root directory.
 * @returns The detected framework enum, or null if unknown.
 * @throws If the package.json cannot be read or parsed.
 */
export async function detectFramework(
  projectPath: string,
): Promise<Framework | null> {
  // implementation...
}
```

- **In-line comments**: Limit them. If you write an in-line comment, it should explain **WHY** a block of code exists (the business reasoning or edge case), not **WHAT** it is doing. The code structure itself should explain what it does.
