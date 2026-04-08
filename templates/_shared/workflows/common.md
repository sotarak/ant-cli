---
description: Shared Git and CI/CD workflows
---

# Common Workflows

## 1. Commit Changes

Use conventional commits (e.g., `feat:`, `fix:`, `chore:`, `docs:`). Make sure to run the linting before committing:

```bash
pnpm lint
```

## 2. CI / CD

Push your branch and create a PR. Do not commit directly to `main`.
