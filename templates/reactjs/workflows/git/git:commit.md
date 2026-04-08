---
description: Auto-generate commit message based on project conventions and commit history, then commit and sync
---

# Git Commit

Follow this process to create a properly formatted commit message based on project conventions and push changes.

## 1. Check Commitlint Configuration

Look for commit lint config files:

```bash
// turbo
find . -maxdepth 2 -name "commitlint.config.*" -o -name ".commitlintrc*" -o -name ".commitlintrc" 2>/dev/null | head -5
```

If found, read the config file to understand commit message rules:

- Commit types allowed (feat, fix, chore, etc.)
- Scope requirements
- Subject length limits
- Other conventions

## 2. Check Git Status

```bash
// turbo
git status --short
```

Identify what files have been changed, added, or deleted.

## 3. View Changes

```bash
// turbo
git diff
git diff --cached
```

Read and understand:

- What functionality was added/modified/removed
- Which modules/components were affected
- The scope and purpose of changes

## 4. Read Commit History

Get the last 20 commit messages to understand project conventions:

```bash
// turbo
git log --oneline -n 20
```

Analyze the patterns:

- Common prefixes (feat:, fix:, chore:, etc.)
- Scope format (e.g., feat(module): message)
- Message style (imperative, lowercase/uppercase, etc.)
- Language used (English/Vietnamese)

## 5. Stage Changes (If Needed)

If there are unstaged changes that should be committed:

```bash
git add .
```

Or stage specific files:

```bash
git add <file1> <file2> ...
```

## 6. Generate Commit Message

Based on:

1. **Commitlint config** (if exists) - follow the rules strictly
2. **Commit history patterns** - match the style of recent commits
3. **Changes made** - accurately describe what was changed

Create a commit message following this format:

```
<type>(<scope>): <subject>

[optional body]
```

Common types:

- `feat`: New feature
- `fix`: Bug fix
- `chore`: Maintenance tasks
- `refactor`: Code refactoring
- `docs`: Documentation
- `style`: Code style changes
- `test`: Adding/updating tests
- `perf`: Performance improvements

## 7. Commit

```bash
git commit -m "<generated message>"
```

## 8. Sync with Remote

First, pull any remote changes:

```bash
git pull --rebase origin <current-branch>
```

If conflicts occur:

- Resolve conflicts
- `git add .`
- `git rebase --continue`

Then push:

```bash
git push origin <current-branch>
```

Or if force push needed after rebase:

```bash
git push --force-with-lease origin <current-branch>
```

## 9. Report

```markdown
## Git Commit Report

### Commit Message
```

<the generated commit message>
```

### Changes Included

- [list of files/changes included]

### Sync Status

- ✅ Pushed to <branch>
- OR: ⚠️ Conflicts resolved and pushed
- OR: ❌ Issue encountered: [description]

```

User can request adjustments to commit message or additional commits.
```
