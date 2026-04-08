---
description: Process for fixing a specific bug
---

# Fix Bug

Follow this **Systematic Debugging Protocol** (`skills/systematic-debugging`).

> **The Iron Law**: NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.

## 1. Root Cause Phase

**Do not guess. Gather evidence.**

- [ ] **Reproduce**: Create a reliable reproduction case.
- [ ] **Trace**: Trace data flow backwards from the error.
- [ ] **Log**: Add logs to confirm where state goes wrong.

## 2. Failing Test Case (Mandatory)

**You must prove the bug exists with code.**

- [ ] **Write Test**: Create a Unit or E2E test that fails because of this bug.
- [ ] **Run Test**: Confirm it fails RED.

## 3. Hypothesis & Pattern

- [ ] **Compare**: Check working usage vs broken usage.
- [ ] **Hypothesis**: "I think X is causing Y because Z".

## 4. Fix & Verify

- [ ] **Apply Fix**: Make the minimal change required.
- [ ] **Verify**: Run the failing test -> MUST be GREEN now.
- [ ] **Regression**: Run all module tests to ensure no side effects.

## 5. Report

```
## Bug Fix Report

### Root Cause
[Explain exactly why it broke]

### Reproduction
[How to reproduce]

### Verification
- Test file: [path]
- Status: [Passed]
```
