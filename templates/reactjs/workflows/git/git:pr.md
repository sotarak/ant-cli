---
description: Create Pull Request with proper description and review checklist
---

# Git Pull Request

Follow this process to create a well-documented Pull Request.

## 1. Ensure Branch is Ready

```bash
// turbo
git status --short
git branch --show-current
```

Ensure all changes are committed and pushed.

## 2. Sync with Target Branch

```bash
git fetch origin
git rebase origin/<target-branch>
```

If conflicts, resolve them first (see `/git:merge`).

Push updated branch:

```bash
git push origin <current-branch> --force-with-lease
```

## 3. Review Changes

```bash
// turbo
git log origin/<target-branch>..HEAD --oneline
```

View all changes that will be in the PR:

```bash
// turbo
git diff origin/<target-branch>...HEAD --stat
```

Read the diff to understand changes:

```bash
// turbo
git diff origin/<target-branch>...HEAD
```

## 4. Check for PR Template

Look for PR template in repository:

```bash
// turbo
find . -path "./.git" -prune -o -name "PULL_REQUEST_TEMPLATE*" -print -o -name "pull_request_template*" -print 2>/dev/null | head -5
```

If found, read and follow the template format.

## 5. Generate PR Content

Based on commits and changes, create:

### PR Title

Follow commit convention:

```
<type>(<scope>): <brief description>
```

### PR Description

```markdown
## Summary

Brief description of what this PR does.

## Changes

- Change 1
- Change 2
- Change 3

## Type of Change

- [ ] 🚀 New feature
- [ ] 🐛 Bug fix
- [ ] 🔧 Refactoring
- [ ] 📝 Documentation
- [ ] 🧪 Tests
- [ ] 🔨 Chore

## Testing

Describe how this was tested:

- [ ] Unit tests pass
- [ ] Manual testing done
- [ ] Integration tests pass

## Screenshots (if applicable)

Add screenshots for UI changes.

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if needed)
- [ ] No breaking changes (or documented)
```

## 6. Create PR via CLI (if gh installed)

Check if GitHub CLI is available:

```bash
// turbo
which gh
```

If available:

```bash
gh pr create --title "<title>" --body "<body>" --base <target-branch>
```

With reviewers:

```bash
gh pr create --title "<title>" --body "<body>" --base <target-branch> --reviewer <user1>,<user2>
```

## 7. Create PR Manually

If CLI not available, provide the URL:

```bash
// turbo
git remote get-url origin
```

Open in browser:

- GitHub: `https://github.com/<owner>/<repo>/compare/<target>...<source>`
- GitLab: `https://gitlab.com/<owner>/<repo>/-/merge_requests/new`
- Bitbucket: `https://bitbucket.org/<owner>/<repo>/pull-requests/new`

## 8. Report

```markdown
## Pull Request Created

### PR Details

- **Title**: `<pr-title>`
- **Source**: `<source-branch>`
- **Target**: `<target-branch>`
- **Commits**: <number>
- **Files changed**: <number>

### PR Link

[<PR URL or instructions>]

### Description

<generated PR description>

### Next Steps

- Wait for CI checks
- Request review from team members
- Address review comments
```

User can request changes to PR title, description, or reviewers.
