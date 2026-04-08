# Design Style Guide

This guide defines the design principles and standards for our React applications, focusing on **Tailwind CSS** and **Minimalist Design**.

## 1. Core Principles

- **Minimalism**: "Less is more". Avoid clutter. Use whitespace effectively.
- **Consistency**: Use standardized tokens for colors, spacing, and typography.
- **Functionality**: Design for the user's goal, not for decoration.
- **Mobile-First**: Always design and verify for mobile responsiveness.

## 2. Tailwind Configuration

We stick to the default Tailwind palette with specific constraints to ensure consistency.

### Colors (Palette: Slate)

Use `slate` for neutrals to give a premium, slightly cool technical feel.

- **Backgrounds**:
  - `bg-white`: Cards, main content areas.
  - `bg-slate-50`: Page backgrounds, inputs.
  - `bg-slate-100`: Hover states, dividers.
- **Text**:
  - `text-slate-900`: Primary headings, body text.
  - `text-slate-500`: Secondary text, labels, icons.
  - `text-slate-400`: Placeholders.
- **Borders**:
  - `border-slate-200`: Default borders.

### Primary Color (Brand)

Define a semantic `primary` color (e.g., `indigo`, `blue`, or `violet`).

- `bg-indigo-600`: Primary buttons, active states.
- `text-indigo-600`: Links, accents.

## 3. Component Patterns

### Buttons

```tsx
// Primary
<button className="h-9 px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
  Save Changes
</button>

// Secondary / Outline
<button className="h-9 px-4 py-2 bg-white text-slate-900 border border-slate-200 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
  Cancel
</button>

// Ghost
<button className="h-9 px-4 py-2 text-slate-500 hover:text-slate-900 rounded-md text-sm font-medium hover:bg-slate-100 transition-colors">
  Settings
</button>
```

### Cards

```tsx
<div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
  {children}
</div>
```

### Inputs

```tsx
<input className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-900 disabled:cursor-not-allowed disabled:opacity-50" />
```

## 4. Typography

Use a variable font setup (e.g., Inter).

- **H1**: `text-2xl font-bold tracking-tight text-slate-900`
- **H2**: `text-xl font-semibold tracking-tight text-slate-900`
- **H3**: `text-lg font-semibold tracking-tight text-slate-900`
- **Body**: `text-sm leading-relaxed text-slate-900`
- **Small**: `text-xs text-slate-500`

## 5. Spacing

Use the 4px grid.

- `p-4` (16px) is the standard padding for cards.
- `gap-4` (16px) is the standard gap for grids/flex.
- `my-6` (24px) for section separation.

## 6. Anti-Patterns (Refusal Criteria)

Using these patterns in code review will result in rejection:

- ❌ **Hardcoded Values**: `width: 350px`, `color: #333`. (Use `w-[350px]` only if strictly necessary, never hex colors).
- ❌ **Random Colors**: Using `red-500` then `red-600` inconsistently.
- ❌ **Inconsistent Radius**: Mixing `rounded-md` and `rounded-xl`.
- ❌ **Z-Index Wars**: Using `z-100`, `z-9999`. Use a standard scale (`z-10`, `z-20`, `z-30`, `z-40`, `z-50`).
