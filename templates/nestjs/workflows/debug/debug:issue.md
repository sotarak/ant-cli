---
description: Process for debugging and finding root cause of issues
---

# Debug Issue

Follow this process when debugging and finding root cause of issues.

## 1. Gather Error Information

Get from user:

- Description of what error occurred
- Steps to reproduce
- Error message or logs (if available)

Identify scope:

- Which service/module has the error
- Related endpoint or function

## 2. Reproduce the Issue

- Read code related to the error
- Trace the processing flow: Controller → Service → Repository
- Identify potential error points

## 3. Analyze Root Cause

Check common causes:

- Unhandled null/undefined
- If/else conditions not covering all cases
- Incorrect data types
- Wrong database queries
- Race conditions
- Missing validation

## 4. Confirm Root Cause

- Add temporary logs to trace data (if needed)
- Confirm exact root cause before fixing

## 5. Propose Fix

Send to user:

```
## Debug Report

### Root Cause
[Describe root cause]

### Proposed Fix
[Describe how to fix]

### Files to Modify
- file.ts (line X)
```

Wait for user confirmation before proceeding with fix.
