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

## 6. React Native / Mobile (NativeWind)

- **ALWAYS** use NativeWind (`className`) for styling. **NEVER** use `StyleSheet.create` or inline `style` objects for static styles.
- Only use inline `style` for truly dynamic values that cannot be expressed in Tailwind (e.g., computed dimensions from constants, conditional hex colors based on runtime state).
- Use `contentContainerClassName` instead of `contentContainerStyle` on `ScrollView` / `FlatList`.
- Use arbitrary values (`w-[110px]`, `text-[13px]`) when Tailwind doesn't have matching utilities.
- Use opacity modifiers for semi-transparent colors: `bg-black/50`, `border-charcoal-400/20`.

```tsx
// ✅ Good
<View className='flex-row items-center gap-3 rounded-xl border border-charcoal-200/15 px-3 py-2.5'>
  <Text className='text-[15px] font-bold text-charcoal-900 dark:text-white'>{value}</Text>
</View>

// ✅ Acceptable — dynamic color based on runtime state
<View className='w-[84px] items-center rounded-md py-1.5' style={{ backgroundColor: isUp ? '#22c55e' : '#ef4444' }}>

// ❌ Bad — static styles in StyleSheet
const styles = StyleSheet.create({ card: { flexDirection: 'row', padding: 12 } })
<View style={styles.card}>
```

## 7. Color Token Enforcement

**NEVER hardcode hex color values.** All colors must reference design tokens defined in `src/components/ui/colors.js`.

### Available Semantic Tokens

| Token         | Tailwind class         | Hex       | Usage               |
| ------------- | ---------------------- | --------- | ------------------- |
| `buy`         | `text-buy`, `bg-buy`   | `#10b981` | Buy/bid price text  |
| `sell`        | `text-sell`, `bg-sell` | `#ef4444` | Sell/ask price text |
| `success-500` | `text-success-500`     | `#22C55E` | Positive change %   |
| `danger-500`  | `text-danger-500`      | `#EF4444` | Negative change %   |
| `primary-500` | `text-primary-500`     | `#FFC80C` | Brand accent        |
| `warning-500` | `text-warning-500`     | `#F59E0B` | Warning states      |
| `charcoal-*`  | `text-charcoal-900`    | —         | Neutral text/bg     |

### Rules

1. **Static styles**: Use Tailwind classes (`text-success-500`, `bg-danger-500/12`).
2. **Dynamic styles (runtime conditional)**: Use `className` with ternary, not inline `style`:

   ```tsx
   // ✅ Good
   <Text className={`text-[11px] ${isUp ? 'text-success-500' : 'text-danger-500'}`}>

   // ❌ Bad
   <Text style={{ color: isUp ? '#22c55e' : '#ef4444' }}>
   ```

3. **Reanimated / worklet animations**: Import colors and reference their values — never duplicate hex strings:

   ```tsx
   import colors from "@/components/ui/colors";

   // ✅ Good — imported from single source of truth
   const baseColor = isBid ? colors.buy : colors.sell;
   interpolateColor(progress, [0, 1], [colors.buy, colors.white]);

   // ❌ Bad — hardcoded hex duplicates
   const COLOR_BUY = "#10b981";
   ```

4. **SVG / Charts**: Import colors and use directly:

   ```tsx
   import colors from '@/components/ui/colors'

   const chartColor = item.isUp ? colors.success[500] : colors.danger[500]
   <Path stroke={chartColor} />
   ```

5. **Opacity modifiers**: Use Tailwind opacity syntax: `bg-success-500/12`, `border-charcoal-400/20`.

## 8. Anti-Patterns (Refusal Criteria)

Using these patterns in code review will result in rejection:

- ❌ **Hardcoded Hex Colors**: `style={{ color: '#333' }}`. Use Tailwind classes or token constants.
- ❌ **Random Colors**: Using `red-500` then `red-600` inconsistently. Use semantic tokens (`success`, `danger`).
- ❌ **Inconsistent Radius**: Mixing `rounded-md` and `rounded-xl`.
- ❌ **Z-Index Wars**: Using `z-100`, `z-9999`. Use a standard scale (`z-10`, `z-20`, `z-30`, `z-40`, `z-50`).
- ❌ **Non-worklet functions in Reanimated worklets**: Never call JS-only functions (e.g., `toLocaleString`, `formatPrice`) inside `useAnimatedReaction`, `useAnimatedStyle`, or `useDerivedValue`. Use `runOnJS` to call them on the JS thread.
