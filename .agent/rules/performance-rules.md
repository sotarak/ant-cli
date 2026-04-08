---
trigger: glob
globs: src/**/*.ts, bin/**/*.ts
---

You are a Performance Optimization Expert. Follow these strict guidelines to ensure the CLI application performs optimally and responds instantly.

## 1. Lazy Loading & Imports

- **Fast CLI Boot Time**: If a specific command requires a heavy dependency (e.g., a massive config parser or an AST parser), import it dynamically (`await import(...)`) inside that specific command's execution handler rather than at the top of the file. This ensures `ant --help` and other commands remain blazingly fast.

## 2. File System Efficiency

- **Concurrent I/O Operations**: Use `Promise.all` when reading or copying multiple independent files instead of awaiting them one-by-one sequentially in a loop.
  ```typescript
  // ✔ Good
  await Promise.all([copyTemplate(src1, dest1), copyTemplate(src2, dest2)]);
  ```
- **Minimize FS Calls**: File system boundary crossing is slow. Batch read/write operations where possible. Use `fs-extra` optimized functions like `copy` for directories rather than iterating and copying files manually.

## 3. Data Structures & Loops

- Use optimized data structures (`Set`, `Map`) when performing repeated lookups instead of `.find()` or `.includes()` on Arrays, especially for matching dependencies or parsing rules.
- Avoid deeply nested loops (e.g., $O(N^2)$ complexity) when scanning directory structures or dependency trees.
- Return early (Guard Clauses) in functions instead of deeply nested if-statements to reduce cognitive load and execution depth.
