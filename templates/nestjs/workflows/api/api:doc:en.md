---
description: Generate API documentation for client integration (English)
---

# Generate API Documentation

Process for creating clear API documentation for client integration.

> [!CAUTION] > **DO NOT FABRICATE INFORMATION**. You must read and understand all related code before writing docs. If unclear, ask user or read more code.

## 1. Identify the API

Get from user:

- Which API endpoint(s) to document
- Module containing the API (user, order, auth, ...)
- Target audience (frontend, mobile, third-party)
- Any specific integration notes

### Output Structure

Documentation is created in the `docs/apis/` directory, organized by module:

```
docs/
└── apis/
    ├── user.md          # All user-related APIs
    ├── auth.md          # All auth-related APIs
    ├── order.md         # All order-related APIs
    └── ...
```

> [!NOTE]
> Each module has **one single file** containing all APIs of that module. When adding a new API, append to existing file instead of creating a new file.

## 2. Read All Related Code (MOST IMPORTANT)

> [!IMPORTANT]
> This is the **most important step**. You must carefully read and understand **all** related code, no matter how small, before writing docs.

### 2.1. Read Controller

```bash
// turbo
find . -name "*.controller.ts" -path "*/<module>/*"
```

Identify:

- HTTP method and full route
- Decorators: `@Get`, `@Post`, `@Put`, `@Patch`, `@Delete`
- Guards: `@UseGuards()` - determine auth requirements
- Pipes: `@UsePipes()` - determine validation

### 2.2. Read DTOs

```bash
// turbo
find . -name "*.dto.ts" -path "*/<module>/*"
```

Identify:

- Request DTO: body, query, params
- Response DTO: output format
- Validation rules: `@IsString()`, `@IsEmail()`, `@Min()`, etc.
- Optional vs required fields

### 2.3. Read Service

```bash
// turbo
find . -name "*.service.ts" -path "*/<module>/*"
```

Identify:

- Business logic handling the request
- Error cases being thrown
- Data transformations
- Database queries and mutations

### 2.4. Read Core/Shared (VERY IMPORTANT)

```bash
// turbo
find . -name "*.interceptor.ts" -o -name "*.filter.ts" -o -name "*.guard.ts" -o -name "*.pipe.ts" | head -20
```

Read and understand:

- **Interceptors**: Transform response format, logging, caching
- **Filters**: Error handling, exception formatting
- **Guards**: Authentication, authorization logic
- **Pipes**: Global validation, transformation

> [!WARNING]
> Actual response format may differ from service return type due to Interceptor transformation. Must read Interceptor to know exact output.

### 2.5. Read Schema/Entity

```bash
// turbo
find . -name "*.schema.ts" -o -name "*.entity.ts" -path "*/<module>/*"
```

Understand data structure to accurately describe response fields.

## 3. Generate Documentation

Use this format:

````markdown
## [Endpoint Name]

Brief description of what this endpoint does.

### Request

**Method**: `POST` | `GET` | `PUT` | `PATCH` | `DELETE`

**URL**: `/api/v1/resource/:id`

**Headers**:

| Header        | Required | Description      |
| ------------- | -------- | ---------------- |
| Authorization | Yes      | Bearer token     |
| Content-Type  | Yes      | application/json |

**Path Parameters**:

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | Yes      | Resource ID |

**Query Parameters**:

| Parameter | Type   | Default | Description    |
| --------- | ------ | ------- | -------------- |
| offset    | number | 0       | Page offset    |
| limit     | number | 10      | Items per page |

**Request Body**:

```json
{
  "field1": "string (required) - Description",
  "field2": 123,
  "field3": true
}
```
````

### Response

**Success (200)**:

```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "field1": "value"
  }
}
```

**Error Responses**:

| Status | Error Code       | Description              |
| ------ | ---------------- | ------------------------ |
| 400    | VALIDATION_ERROR | Invalid input data       |
| 401    | UNAUTHORIZED     | Missing or invalid token |
| 404    | NOT_FOUND        | Resource not found       |

### Example

```bash
curl -X POST "https://api.example.com/api/v1/resource" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"field1": "value"}'
```

````

## 4. Add Integration Notes

Include:

- Authentication flow (how to get token)
- Rate limiting info
- Pagination patterns
- Common error handling
- Webhook callbacks (if any)

## 5. Validate

Ensure:

- [ ] All required fields marked
- [ ] All error cases documented
- [ ] Example requests are accurate
- [ ] Response matches actual API (verified through Interceptor/Filter)

## 6. Save File

Save documentation to the correct location:

```bash
# Create directory if not exists
mkdir -p docs/apis

# Output file per module
# docs/apis/<module>.md
```

If file already exists, **append** new endpoint to the end of file.

## 7. Report

```markdown
## API Documentation Generated

### Endpoints Documented

1. `POST /api/v1/resource` - Create resource
2. `GET /api/v1/resource/:id` - Get resource

### Output Location

`docs/apis/<module>.md`

### Notes

- Any special integration notes
- Known limitations
````

User can request additional endpoints or format changes.
