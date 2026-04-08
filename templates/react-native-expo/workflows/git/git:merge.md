---
description: Merge branches with proper conflict resolution and sync
---

# Git Merge

Follow this process to merge branches safely.

## 1. Check Current State

```bash
// turbo
git status --short
git branch --show-current
```

Ensure working directory is clean.

## 2. Identify Branches

Confirm:

- **Source branch**: The branch with changes to merge
- **Target branch**: The branch to merge into (usually `main` or `develop`)

```bash
// turbo
git branch -a --sort=-committerdate | head -15
```

## 3. Update Both Branches

```bash
git fetch origin
git checkout <target-branch>
git pull origin <target-branch>
git checkout <source-branch>
git pull origin <source-branch>
```

## 4. Review Changes to Merge

```bash
// turbo
git log <target-branch>..<source-branch> --oneline
```

View file changes:

```bash
// turbo
git diff <target-branch>...<source-branch> --stat
```

## 5. Choose Merge Strategy

### Option A: Merge Commit (default)

Preserves full history with a merge commit:

```bash
git checkout <target-branch>
git merge <source-branch>
```

### Option B: Squash Merge

Combines all commits into one:

```bash
git checkout <target-branch>
git merge --squash <source-branch>
git commit -m "<squash commit message>"
```

### Option C: Rebase (linear history)

Replay commits on top of target:

```bash
git checkout <source-branch>
git rebase <target-branch>
git checkout <target-branch>
git merge <source-branch>
```

## 6. Handle Conflicts (If Any)

If conflicts occur:

```bash
// turbo
git status
```

For each conflicted file:

1. Open and resolve conflicts manually
2. Remove conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Stage resolved files:

```bash
git add <resolved-file>
```

Complete the merge:

```bash
git commit
```

Or if rebasing:

```bash
git rebase --continue
```

## 7. Push Merged Changes

```bash
git push origin <target-branch>
```

## 8. Cleanup (Optional)

Delete merged branch locally and remotely:

```bash
git branch -d <source-branch>
git push origin --delete <source-branch>
```

## 9. Report

```markdown
## Merge Report

### Merge Details

- **Source**: `<source-branch>`
- **Target**: `<target-branch>`
- **Strategy**: merge | squash | rebase
- **Commits merged**: <number>

### Conflict Resolution

- ✅ No conflicts
- OR: ⚠️ Resolved conflicts in: [file list]

### Status

- ✅ Pushed to `<target-branch>`
- 🗑️ Source branch deleted: Yes | No

### Merged Changes

- [summary of what was merged]
```

User can request different merge strategy or abort merge.
