---
trigger: glob
globs: *.ts
---

You are a professional NestJS developer. When writing code, follow these commenting guidelines.

## Language Principles

### Must use English

- Variable names, functions, classes, interfaces, enums
- File and directory names
- Log messages (console.log, Logger)
- Error messages and exceptions
- Constants and environment variables
- Code logic and syntax

### Use user's input language

- Code explanation comments
- JSDoc descriptions
- TODO, FIXME, NOTE comments

## Commenting Rules

### 1. Keep comments short and focused

```typescript
// ❌ Wrong - too verbose
// This is a function used to get user information from the database by using the user's id to query

// ✅ Correct - concise and clear
// Get user info by ID
async findById(id: string): Promise<User> { }
```

### 2. Explain "WHY", not "WHAT"

```typescript
// ❌ Wrong - stating the obvious
// Check if user exists
if (!user) throw new NotFoundException();

// ✅ Correct - explain the reason
// Return 404 to let client know user doesn't exist, avoid exposing system info
if (!user) throw new NotFoundException();
```

### 3. Use JSDoc for public methods and classes

```typescript
/**
 * Service handling order business logic
 * @description Manages order creation, update, and cancellation
 */
@Injectable()
export class OrderService { }

/**
 * Create a new order
 * @param dto - Order data from client
 * @returns Newly created order with tracking code
 * @throws BadRequestException if cart is empty
 */
async createOrder(dto: CreateOrderDto): Promise<Order> { }
```

### 4. Comment complex logic

```typescript
async calculateDiscount(order: Order): Promise<number> {
  // Apply voucher first, then calculate membership discount
  // Reason: vouchers have expiration, encourage users to use them

  let discount = 0;

  // Step 1: Apply voucher (if available)
  if (order.voucherCode) {
    discount += await this.applyVoucher(order.voucherCode);
  }

  // Step 2: Add membership discount (VIP: 10%, Gold: 5%)
  discount += this.getMembershipDiscount(order.userId);

  // Cap at 50% max to ensure profitability
  return Math.min(discount, 0.5);
}
```

### 5. Use TODO, FIXME, NOTE markers

```typescript
// TODO: Add caching to optimize performance with high request volume
// FIXME: Handle race condition when 2 users buy the last product simultaneously
// NOTE: Third-party API has rate limit of 100 req/min, needs throttling
```

### 6. Comment DTOs, Interfaces and Types

#### For Interfaces/Types: Use inline comments

```typescript
// ✅ Correct - inline comments at end of line for conciseness
export interface User {
  id: string; // Unique user identifier
  email: string; // Login email, must be unique
  isActive: boolean; // Whether account is active
  createdAt: Date; // Account creation timestamp
}

export type OrderStatus =
  | "pending" // Order created, awaiting payment
  | "paid" // Payment confirmed
  | "shipped" // Order dispatched
  | "delivered"; // Order received by customer
```

#### For DTOs with Decorators: Use JSDoc above decorator

```typescript
// ✅ Correct - JSDoc for DTOs with validation decorators
export class CreateUserDto {
  /** Login email, must be unique in the system */
  @IsEmail()
  email: string;

  /** Password minimum 8 characters, including letters and numbers */
  @IsStrongPassword()
  password: string;

  /** VN phone number (starts with 0 or +84) */
  @IsPhoneNumber("VN")
  phone: string;
}
```

### 7. Comment configs and constants

```typescript
export const ORDER_CONFIG = {
  /** Maximum payment waiting time (15 minutes) */
  PAYMENT_TIMEOUT_MS: 15 * 60 * 1000,

  /** Number of retries when payment gateway fails */
  MAX_PAYMENT_RETRIES: 3,

  /** Orders below this amount get free shipping */
  FREE_SHIPPING_THRESHOLD: 500000,
};
```

## What NOT to do

```typescript
// ❌ Redundant comment - code is self-explanatory
// Declare count variable
const count = 0;

// ❌ Outdated comment - doesn't match current code
// Get 10 latest users
const users = await this.userRepo.find({ take: 20 });

// ❌ Commented-out code instead of deleting
// const oldLogic = await this.doSomethingOld();
const newLogic = await this.doSomethingNew();

// ❌ Comment too long in one line
// This function handles new user registration including email validation, password hashing, saving to database and sending confirmation email
```

## Important Notes

1. **Logs and errors always in English** for easier debugging and searching

```typescript
// Create new user and send welcome email
Logger.log(`Creating new user with email: ${email}`);
throw new BadRequestException("Email already exists");
```

2. **Update comments when changing code** - Wrong comments are worse than no comments

3. **Don't over-comment** - Good code is mostly self-explanatory
