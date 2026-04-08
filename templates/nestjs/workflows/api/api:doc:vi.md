---
description: Tạo tài liệu API cho client tích hợp (Tiếng Việt)
---

# Tạo Tài Liệu API

Quy trình tạo tài liệu API rõ ràng cho client tích hợp.

> [!CAUTION] > **KHÔNG ĐƯỢC BỊA THÔNG TIN**. Phải đọc và hiểu toàn bộ code liên quan trước khi viết docs. Nếu chưa rõ, hỏi lại user hoặc đọc thêm code.

## 1. Xác Định API

Thu thập từ user:

- Endpoint(s) cần tạo docs
- Module chứa API (user, order, auth, ...)
- Đối tượng sử dụng (frontend, mobile, third-party)
- Ghi chú đặc biệt nếu có

### Cấu Trúc Output

Tài liệu được tạo trong thư mục `docs/apis/`, chia theo module:

```
docs/
└── apis/
    ├── user.md          # Tất cả API liên quan đến user
    ├── auth.md          # Tất cả API liên quan đến auth
    ├── order.md         # Tất cả API liên quan đến order
    └── ...
```

> [!NOTE]
> Mỗi module có **một file duy nhất** chứa tất cả API của module đó. Khi thêm API mới, append vào file hiện có thay vì tạo file mới.

## 2. Đọc Toàn Bộ Code Liên Quan (QUAN TRỌNG NHẤT)

> [!IMPORTANT]
> Đây là bước **quan trọng nhất**. Phải đọc kỹ và hiểu **tất cả** code liên quan, dù nhỏ nhất, trước khi viết docs.

### 2.1. Đọc Controller

```bash
// turbo
find . -name "*.controller.ts" -path "*/<module>/*"
```

Xác định:

- HTTP method và route đầy đủ
- Decorators: `@Get`, `@Post`, `@Put`, `@Patch`, `@Delete`
- Guards: `@UseGuards()` - xác định auth requirements
- Pipes: `@UsePipes()` - xác định validation

### 2.2. Đọc DTOs

```bash
// turbo
find . -name "*.dto.ts" -path "*/<module>/*"
```

Xác định:

- Request DTO: body, query, params
- Response DTO: output format
- Validation rules: `@IsString()`, `@IsEmail()`, `@Min()`, etc.
- Optional vs required fields

### 2.3. Đọc Service

```bash
// turbo
find . -name "*.service.ts" -path "*/<module>/*"
```

Xác định:

- Business logic xử lý request
- Error cases được throw
- Data transformations
- Database queries và mutations

### 2.4. Đọc Core/Shared (RẤT QUAN TRỌNG)

```bash
// turbo
find . -name "*.interceptor.ts" -o -name "*.filter.ts" -o -name "*.guard.ts" -o -name "*.pipe.ts" | head -20
```

Đọc và hiểu:

- **Interceptors**: Transform response format, logging, caching
- **Filters**: Error handling, exception formatting
- **Guards**: Authentication, authorization logic
- **Pipes**: Global validation, transformation

> [!WARNING]
> Response format thực tế có thể khác với return type trong service do Interceptor transform. Phải đọc Interceptor để biết chính xác output.

### 2.5. Đọc Schema/Entity

```bash
// turbo
find . -name "*.schema.ts" -o -name "*.entity.ts" -path "*/<module>/*"
```

Hiểu data structure để mô tả chính xác response fields.

## 3. Tạo Tài Liệu

Sử dụng format sau:

````markdown
## [Tên Endpoint]

Mô tả ngắn gọn chức năng của endpoint.

### Request

**Method**: `POST` | `GET` | `PUT` | `PATCH` | `DELETE`

**URL**: `/api/v1/resource/:id`

**Headers**:

| Header        | Bắt buộc | Mô tả            |
| ------------- | -------- | ---------------- |
| Authorization | Có       | Bearer token     |
| Content-Type  | Có       | application/json |

**Path Parameters**:

| Parameter | Kiểu   | Bắt buộc | Mô tả           |
| --------- | ------ | -------- | --------------- |
| id        | string | Có       | ID của resource |

**Query Parameters**:

| Parameter | Kiểu   | Mặc định | Mô tả          |
| --------- | ------ | -------- | -------------- |
| offset    | number | 0        | Số trang       |
| limit     | number | 10       | Số items/trang |

**Request Body**:

```json
{
  "field1": "string (bắt buộc) - Mô tả",
  "field2": 123,
  "field3": true
}
```
````

### Response

**Thành công (200)**:

```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "field1": "value"
  }
}
```

**Lỗi**:

| Status | Error Code       | Mô tả                   |
| ------ | ---------------- | ----------------------- |
| 400    | VALIDATION_ERROR | Dữ liệu không hợp lệ    |
| 401    | UNAUTHORIZED     | Token không hợp lệ      |
| 404    | NOT_FOUND        | Không tìm thấy resource |

### Ví dụ

```bash
curl -X POST "https://api.example.com/api/v1/resource" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"field1": "value"}'
```

````

## 4. Thêm Ghi Chú Tích Hợp

Bao gồm:

- Luồng authentication (cách lấy token)
- Rate limiting
- Pagination patterns
- Xử lý lỗi chung
- Webhook callbacks (nếu có)

## 5. Kiểm Tra

Đảm bảo:

- [ ] Tất cả required fields được đánh dấu
- [ ] Tất cả error cases được document
- [ ] Example requests chính xác
- [ ] Response khớp với API thực tế (đã verify qua Interceptor/Filter)

## 6. Lưu File

Lưu tài liệu vào đúng vị trí:

```bash
# Tạo thư mục nếu chưa có
mkdir -p docs/apis

# File output theo module
# docs/apis/<module>.md
```

Nếu file đã tồn tại, **append** endpoint mới vào cuối file.

## 7. Báo Cáo

```markdown
## Tài Liệu API Đã Tạo

### Endpoints

1. `POST /api/v1/resource` - Tạo resource
2. `GET /api/v1/resource/:id` - Lấy resource

### Vị trí

`docs/apis/<module>.md`

### Ghi chú

- Các lưu ý tích hợp đặc biệt
- Giới hạn đã biết
````

User có thể yêu cầu thêm endpoints hoặc thay đổi format.
