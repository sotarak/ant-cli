---
description: How to build the React application for production
---

# Production Build

To build your application and prepare it for deployment, follow these commands.

// turbo-all

1. Check for TypeScript errors across the codebase first:
   pnpm typecheck

2. Create optimized production build:
   pnpm build

3. Verify the built assets in `dist/`.
