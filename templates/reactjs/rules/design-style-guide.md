# Design Style Guide

This guide defines the design principles and standards for our React applications, integrating **shadcn/ui**, **Tailwind CSS**, and our strict **Three-Layer Design System Tokens**.

## 1. Core Principles

- **Token-Driven**: Never use raw hex codes or arbitrary utility classes (e.g., `text-indigo-600` or `bg-slate-900`) for themed elements.
- **Minimalism & Functionality**: "Less is more". Avoid clutter. Use whitespace effectively. Design for the user's goal.
- **Component Reusability**: Rely on standard UI components (shadcn/ui) rather than building bespoke DOM structures.
- **Mobile-First**: Always design, build, and verify for responsive views.

## 2. Design System Architecture

We strictly adhere to a three-layer token architecture managed by the `design-system` skill.

### Three-Layer Structure

1. **Primitive Tokens**: The raw values (e.g., `--color-blue-600: #2563eb;`). _Do not use directly in components._
2. **Semantic Tokens**: Purpose aliases (e.g., `--color-primary: var(--color-blue-600);`). _Use these for general layouts._
3. **Component Tokens**: Component-specific values (e.g., `--button-bg: var(--color-primary);`). _Use inside components._

**Example in code:**

```css
/* CORRECT: Using tokens */
background: hsl(var(--background));
color: hsl(var(--primary));

/* INCORRECT: Hardcoding Tailwind colors */
background: theme("colors.slate.900");
```

## 3. Component Patterns (ui-styling)

We use **shadcn/ui** via the `ui-styling` skill. Do not write custom CSS unless absolutely necessary. Build interfaces by composing primitive components.

### Buttons

Always use the `<Button>` component provided by shadcn instead of raw HTML buttons with long Tailwind strings.

```tsx
// Primary
<Button variant="default">Save Changes</Button>

// Secondary / Outline
<Button variant="outline">Cancel</Button>

// Ghost
<Button variant="ghost">Settings</Button>
```

### Cards

Compose panels using the standard `Card` primitives for consistent padding and borders.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>{children}</CardContent>
</Card>
```

### Inputs

```tsx
// Using shadcn's Input component
<Input type="email" placeholder="Enter email..." />
```

## 4. Typography & Spacing

Both typography and spacing should rely on the configured Tailwind theme extended by our design-system CSS variables.

- **Typography**: Utilize logical utility classes like `text-2xl`, `text-xl`, and `text-muted-foreground` (which maps to our semantic token).
- **Spacing**: Use standard 4px grid utilities (`p-4`, `gap-4`, `my-6`). Avoid arbitrary values like `p-[17px]`.

## 5. Dark Mode

Ensure consistency in Dark Mode. Because we use Semantic Tokens (`--background`, `--foreground`, `--primary`, `--muted`), dark mode will automatically be supported by the tokens CSS.

- **Do NOT** use `dark:bg-slate-900` manually unless creating a major exception.
- Trust the design system variables (`bg-background`, `text-foreground`).

## 6. Anti-Patterns (Refusal Criteria)

Using these patterns in code review will result in rejection:

- ❌ **Hardcoded Values**: `width: 350px`, `color: #333`. Avoid `color: theme('colors.red.500')`.
- ❌ **Arbitrary Tailwind Colors**: Using `bg-slate-500` or `text-indigo-600` instead of `bg-muted` or `text-primary`.
- ❌ **Custom Implementations**: Building your own Dialog or Select dropdown instead of running `npx shadcn@latest add dialog`.
- ❌ **Z-Index Wars**: Using `z-[100]`, `z-[9999]`. Use a standard scale based on UI layers.
