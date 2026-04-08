---
description: Generate curl commands to test API endpoints (Vietnamese by default)
---

# API Curl Generator

Follow this process to generate curl commands for testing APIs.

**Language**: Generate comments and descriptions in **Vietnamese by default**. Only use English if user explicitly requests.

## 1. Identify the API

Get from user:

- Which API endpoint(s) to generate curls for
- Base URL (localhost, staging, production)
- Language preference (default: Vietnamese)
- Authentication token (if needed)

## 2. Read API Code

Read relevant files:

```bash
// turbo
# Find controller and DTOs
find . -name "*.controller.ts" -path "*/<module>/*"
find . -name "*.dto.ts" -path "*/<module>/*"
```

For each endpoint, gather:

- HTTP method and full route
- Request body structure from DTO
- Required headers
- Path/query parameters

## 3. Generate Curl Commands

### Template for Each Endpoint

```bash
# [Endpoint Description]
# [METHOD] /path/to/endpoint
curl -X [METHOD] "[BASE_URL]/path/to/endpoint" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "field1": "value1",
    "field2": "value2"
  }'
```

### Common Patterns

**GET with Query Params**:

```bash
curl -X GET "[BASE_URL]/api/v1/users?offset=0&limit=10" \
  -H "Authorization: Bearer <TOKEN>"
```

**GET with Path Params**:

```bash
curl -X GET "[BASE_URL]/api/v1/users/123" \
  -H "Authorization: Bearer <TOKEN>"
```

**POST with JSON Body**:

```bash
curl -X POST "[BASE_URL]/api/v1/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "Test@123"
  }'
```

**PUT/PATCH Update**:

```bash
curl -X PATCH "[BASE_URL]/api/v1/users/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "name": "Updated Name"
  }'
```

**DELETE**:

```bash
curl -X DELETE "[BASE_URL]/api/v1/users/123" \
  -H "Authorization: Bearer <TOKEN>"
```

**File Upload**:

```bash
curl -X POST "[BASE_URL]/api/v1/upload" \
  -H "Authorization: Bearer <TOKEN>" \
  -F "file=@/path/to/file.pdf"
```

## 4. Generate Test Cases

Create curls for multiple scenarios:

### Success Cases

```bash
# Case 1: Create user - Success
curl -X POST "[BASE_URL]/api/v1/users" \
  -H "Content-Type: application/json" \
  -d '{"email": "valid@email.com", "name": "Valid User"}'
```

### Error Cases

```bash
# Case 2: Create user - Missing required field
curl -X POST "[BASE_URL]/api/v1/users" \
  -H "Content-Type: application/json" \
  -d '{"name": "No Email User"}'

# Case 3: Create user - Invalid email format
curl -X POST "[BASE_URL]/api/v1/users" \
  -H "Content-Type: application/json" \
  -d '{"email": "invalid-email", "name": "Bad Email"}'

# Case 4: Get user - Not found
curl -X GET "[BASE_URL]/api/v1/users/non-existent-id" \
  -H "Authorization: Bearer <TOKEN>"

# Case 5: Unauthorized access
curl -X GET "[BASE_URL]/api/v1/users" \
  -H "Authorization: Bearer invalid-token"
```

## 5. Add Useful Options

Suggest helpful curl options:

```bash
# Show response headers
curl -i ...

# Pretty print JSON (with jq)
curl ... | jq .

# Save response to file
curl ... -o response.json

# Verbose mode (debug)
curl -v ...

# Follow redirects
curl -L ...

# Set timeout
curl --max-time 30 ...
```

## 6. Report

```markdown
## Curl Commands Generated

### Base URL

`[BASE_URL]` = `http://localhost:3000` (or configured URL)

### Authentication

Replace `<TOKEN>` with actual Bearer token.
Get token via: `POST /api/v1/auth/login`

### Commands

[Generated curl commands here]

### Test Results Expected

| Case | Expected Status | Expected Response |
| ---- | --------------- | ----------------- |
| 1    | 201             | Created user      |
| 2    | 400             | Validation error  |
| 3    | 401             | Unauthorized      |
```

User can request additional test cases or different base URLs.
