---
description: React conventions and patterns
---

# React Patterns & Principles

1. **Functional Components**: Strictly use functional components and hooks. Avoid Class components.
2. **Custom Hooks**: Extract complex stateful logic or side effects into custom hooks (`useXYZ`).
3. **State Management**:
   - Keep state as local as possible.
   - For global state, use lightweight libraries like Zustand, or simply React Context.
4. **Memoization**:
   - Apply `useMemo` for expensive computations.
   - Use `useCallback` when passing functions down to heavily optimized child components.
5. **Styling**: Always stick to the unified styling engine the user initialized the project with (e.g. TailwindCSS, Styled Components, Modules).
