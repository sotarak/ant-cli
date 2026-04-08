---
description: Review code changes that haven't been committed yet
---

# Review Uncommitted Code

Follow this process when reviewing code changes before commit.

## 1. Collect Changes

Get list of changed files and view diff:

```bash
git status --short
git diff
git diff --cached
```

## 2. Read And Understand Context

Read all newly written code:

- Read each changed file
- Understand the purpose of each change
- Identify the logic flow of new code

Read related code for each changed file:

- **Imports**: Imported modules/services
- **Dependencies**: Classes/functions being called
- **Callers**: Where the modified function/method is called from
- **Schema/Entity**: Related data structures
- **DTOs**: Input/output types

Understand business context:

- What does this feature do?
- How is data being processed?
- Are there any side effects?

## 3. Evaluate Code

Check for logic errors:

- [ ] Does the logic match business requirements?
- [ ] Do if/else conditions cover all cases?
- [ ] Are return values correct type and expected value?
- [ ] Is error handling complete and reasonable?

Detect potential bugs:

- [ ] **Null/undefined**: Are null checks done before accessing properties?
- [ ] **Race conditions**: Any conflicts when handling concurrent requests?
- [ ] **Memory leaks**: Any subscriptions/listeners that need cleanup?
- [ ] **N+1 queries**: Any queries inside loops?
- [ ] **Type safety**: Using `any` or unsafe type casting?
- [ ] **Edge cases**: Handling empty array, empty string, negative numbers, zero?

Evaluate security:

- [ ] SQL/NoSQL injection
- [ ] XSS vulnerabilities
- [ ] Sensitive data exposure (logs, responses)
- [ ] Authorization checks complete

Evaluate performance:

- [ ] Are queries optimized?
- [ ] Need to add database indexes?
- [ ] Should cache results?
- [ ] Can batch operations?

Evaluate code quality:

- [ ] Clear naming conventions
- [ ] Reasonable function size (< 20 lines)
- [ ] No code duplication
- [ ] Comments explain WHY, not WHAT

## 4. Report

**Important**: Always respond in the same language as the user's input.

```markdown
## Code Review Report

### Feature Changes

1. **[Feature name]**: Short description
2. **[Feature name]**: Short description

### Issues Found

1. `file.ts:42` - Issue description (🔴 Critical)
2. `file.ts:58` - Issue description (🟡 Warning)

> If no issues: "No issues found"

### Optimization Suggestions

1. `file.ts` - Optimization description

> If no suggestions: "Code is well optimized"

### Summary

Write 2-3 sentences summarizing code quality, readiness to commit, and priority fixes if any.
```

User can request to fix any issue in the report.
