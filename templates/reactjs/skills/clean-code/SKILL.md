---
name: clean-code
description: Clean code standards, optimized, enforcing SOLID principles and easy to maintain.
---

# Clean Code - Coding Standards & Maintainability (NestJS)

> **CRITICAL SKILL** - This module serves as an internal, self-contained standard (independent). It requires that all Agents perform a self-check on their generated code. We emphasize tight architecture, optimization, and scalable standards.

---

## 1. Core Principles

Strictly adhere to the **5 SOLID principles** to ensure the application is easily maintainable, easy to upgrade, and resilient to breaking changes when scaling:

| Principle                     | Detailed Description                                                                                                             |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **S** (Single Responsibility) | Each class/function/module is allowed to handle exactly ONE responsibility (keep it simple and clear).                           |
| **O** (Open-Closed)           | The design must be flexible enough to allow **extensions** (adding new features) **without modifying** existing source code.     |
| **L** (Liskov Substitution)   | Child classes must be substitutable for their parent classes without affecting the correctness of the entire program.            |
| **I** (Interface Segregation) | Split large interfaces into multiple smaller, specialized interfaces rather than one monolithic interface.                       |
| **D** (Dependency Inversion)  | Depend on abstractions (interfaces), not implementations (concrete classes). Maximize the use of Dependency Injection in NestJS. |

---

## 2. File & Function Rules

| Rule                | Guidelines                                                                                                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File Size Limit** | Limit file sizes strictly. **Maximum 200 - 300 lines**. Extraneous code or long logic sequences must be decoupled into separate services, components, or helper functions. |
| **Small Functions** | Functions must be concise and straightforward (usually < 20 lines). If a function requires multiple distinct steps, extract them into clearly named `private` methods.     |
| **Guard Clauses**   | Apply _early returns_ at the start of functions to handle missing or invalid inputs, avoiding nested IF statements wherever possible (maximum 2 levels of nesting).        |
| **No Side Effects** | Functions should not sneakily alter external variables or states. Inputs and outputs must behave consistently.                                                             |

---

## 3. Documentation & Comments

This standard aims for code clarity, seamless handovers, and future maintainability:

| Standard                      | Application                                                                                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mandatory JSDoc Comments**  | Every distinct method, class, and interface MUST be described using professional JSDoc comments. Never leave a function uncommented unless its logic is universally obvious.        |
| **Explain the Logic ("Why")** | For complex business logic, unique algorithms, or specific conditionals, provide a short inline comment explaining the rationale. Code explains "What", but Comments explain "Why". |
| **Meaningful Variable Names** | Minimize ambiguous terminology (`x`, `y`, `flag`, `data2`). Variables/Functions must fully express their role (e.g., `hasPermission`, `isValidUser`, `fetchActiveCampaigns`).       |

---

## 4. Optimization & Refactoring

- Avoid duplicating code (**DRY** - Don't Repeat Yourself). If identical logic appears twice, consider extracting it into a shared function.
- Keep the import order tidy (System Modules -> External Libraries -> Internal Code). Remove unused imports completely.
- Strictly eliminate **Magic Numbers** (hardcoded numbers with no context) and **Hardcode Strings**, replacing them with explicit **Constants** or **Enums**.

---

## 5. Independent Self-Review Checklist

> 🔴 **MANDATORY:** This skill does not depend on any external scripts mapping or external reference files. The process is completely self-contained via this Self-Review Checklist.

**Before declaring any edits or features complete, MUST ask these 5 questions and ensure compliance:**

1. [ ] Does the new or modified file exceed the **300 line** limit? _(If yes: divide and conquer immediately)._
2. [ ] Do all Modules, Services, and Controllers strictly adhere to **SOLID principles** without cramming logic into one place?
3. [ ] Have all important Functions, Classes, and complex logic blocks been provided with sufficient **JSDoc / Comments**?
4. [ ] Have lengthy IF/ELSE blocks been refactored into **Guard Clauses (Early Returns)**?
5. [ ] Could a new developer joining the project understand the purpose of this code block within 3 minutes of reading, without needing to ask questions?

> ❌ **VIOLATION:** It is strictly prohibited to hand over a task when the file is a mess (bad SOLID compliance), exceeds the recommended size limit, lacks all comments, or references non-existent modules.
