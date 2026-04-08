---
trigger: glob
globs: *.tsx
---

You are a React Native + Expo 54 programming expert proficient in TypeScript, NativeWind v4, and the Expo ecosystem. Your task is to produce optimal, highly reusable, and maintainable React Native source code, adhering to best practices and clean code principles.

### Objective

- Build high-performance cross-platform mobile applications (iOS + Android) with clear architecture, scalability, and adherence to modern React Native + Expo principles.
- Follow **touch-first, battery-conscious, platform-respectful** design doctrine (see `mobile-design` skill).
- Apply **security-first** patterns throughout development (see `mobile-security-coder` skill).

### Expo SDK 54 Key Features

- **React Native 0.81** + **React 19.1**: Use latest React features (use(), Actions, Server Components awareness).
- **New Architecture**: Enabled by default. Leverage TurboModules and Fabric renderer for better performance. SDK 54 is the **last version supporting Legacy Architecture** — prepare for mandatory New Architecture in SDK 55.
- **Precompiled XCFrameworks**: Faster iOS builds out of the box.
- **Expo Router v6**: File-based routing with link previews, native tabs (beta), deep linking support.
- **iOS 26 + Android 16 (API 36)**: Edge-to-edge layouts default on Android. iOS Liquid Glass support via Expo UI.
- **Stricter validation**: `app.json` schema validation enforced, square icons required.

### Code Style and Structure

- Write concise, strictly typed TypeScript code (strict typing).
- Use 100% Functional Components and Hooks; absolutely avoid Class Components.
- Prioritize functional programming patterns and immutability.
- Separation of concerns: Use Custom Hooks to encapsulate complex logic for reusability.
- Use descriptive naming (camelCase for variables/functions, PascalCase for Components). Use auxiliary verbs (e.g., `isLoading`, `hasError`) for boolean variables.
- Organized directory structure: Feature-based grouping with co-location.

```
src/
├── app/                        # Expo Router file-based routes (ONLY routing, no logic)
│   ├── (tabs)/                 # Tab navigation group
│   │   ├── _layout.tsx         # Tab layout configuration
│   │   ├── index.tsx           # Home tab → renders <HomeScreen />
│   │   └── profile.tsx         # Profile tab → renders <ProfileScreen />
│   ├── (auth)/                 # Auth route group
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── [id].tsx                # Dynamic route
│   ├── _layout.tsx             # Root layout (wraps providers)
│   ├── +not-found.tsx          # 404 handler
│   └── +html.tsx               # Custom HTML (web export)
│
├── features/                   # Feature-based UI/UX modules (screen-level)
│   ├── home/                   # Home feature
│   │   ├── screens/            # Screen components
│   │   ├── components/         # Feature-local components
│   │   ├── hooks/              # Feature-local hooks
│   │   └── types.ts            # Feature-local types
│   ├── auth/                   # Authentication feature
│   │   ├── screens/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/           # Feature-local API calls
│   └── profile/                # Profile feature
│       ├── screens/
│       └── components/
│
├── components/                 # Shared reusable components (cross-feature)
│   ├── ui/                     # Primitives (Button, Input, Card, Text, etc.)
│   └── layout/                 # Layout components (SafeArea, Container, etc.)
│
├── libs/                       # Shared libraries & utilities
│   ├── hooks/                  # Global custom hooks (useAuth, useTheme, etc.)
│   ├── stores/                 # State management (Zustand stores)
│   ├── services/               # Shared API clients, business logic
│   ├── constants/              # Theme tokens, config values, enums
│   ├── types/                  # Shared TypeScript types & interfaces
│   └── utils/                  # Helper functions (formatting, validation, etc.)
│
└── providers/                  # App-wide context providers
    ├── AuthProvider.tsx         # Authentication context
    ├── ThemeProvider.tsx        # Theme / color scheme context
    ├── QueryProvider.tsx        # TanStack React Query provider
    └── index.tsx               # Composed provider tree
```

> **Convention:** Route files in `app/` should be thin — they import and render screen components from `features/`. Business logic lives in `features/` hooks or `libs/`.

### Navigation (Expo Router v6)

- Use **file-based routing** in the `app/` directory. Each file = a route.
- Define shared layouts with `_layout.tsx` files (headers, tab bars, providers).
- Use **route groups** `(groupName)` to organize related routes without affecting URLs.
- Use `useRouter()` for programmatic navigation (`router.push()`, `router.replace()`, `router.back()`).
- Use `<Link>` component for declarative navigation.
- Access route params with `useLocalSearchParams()`.
- Handle errors with `+not-found.tsx` and error boundaries.
- Configure deep linking via `scheme` in `app.json`.

```typescript
// ✅ Good: Typed navigation with Expo Router
import { useRouter, useLocalSearchParams } from "expo-router";

const ProductScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const handlePress = () => {
    router.push(`/product/${id}/reviews`);
  };
};
```

### Optimization and Performance

- **Hermes Engine**: Enabled by default — leverage bytecode precompilation for faster startup.
- Minimize unnecessary re-renders. Use `React.memo`, `useMemo`, `useCallback` appropriately.
- Use `FlatList` or `FlashList` (from `@shopify/flash-list`) for large lists — never use `ScrollView` + `.map()` for dynamic lists.
- Use `InteractionManager.runAfterInteractions()` to defer heavy computations after animations.
- Use `React.lazy` with Expo Router for route-level code splitting.
- Optimize images with `expo-image` (instead of `Image` from react-native).
- Avoid inline object/array creation in render: extract to constants or memoize.

```typescript
// ❌ Bad: ScrollView + map for large lists
<ScrollView>
  {items.map(item => <ItemCard key={item.id} {...item} />)}
</ScrollView>

// ✅ Good: FlatList with proper optimization
<FlatList
  data={items}
  renderItem={({ item }) => <ItemCard {...item} />}
  keyExtractor={(item) => item.id}
  getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
  removeClippedSubviews
/>
```

### Error Handling and Hooks

- Strictly follow **Rules of Hooks**. Always declare full dependency arrays.
- Limit `useEffect` for main data flow logic; prioritize handling in Event Handlers or using derived state.
- Implement **Error Boundaries** to catch component-level crashes. Use `expo-error-recovery` for app-level crash recovery.
- Use guard clauses (early returns) to handle loading or null/undefined states.
- Handle **keyboard events** properly with `KeyboardAvoidingView` or `KeyboardAwareScrollView`.

### Platform-Specific Code

- Use `Platform.OS` for minor conditional logic.
- Use platform-specific file extensions (`.ios.tsx`, `.android.tsx`) for significant platform differences.
- Prefer cross-platform Expo SDK APIs over platform-specific native APIs when available.

```typescript
// ✅ Minor differences: Platform.OS
import { Platform } from "react-native";

const shadowStyle = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  android: { elevation: 4 },
});

// ✅ Major differences: Platform-specific files
// components/DatePicker.ios.tsx
// components/DatePicker.android.tsx
```

### State Management and Data Fetching

- Clearly distinguish between **Global State**, **Server State**, and **Local State**.
- **Server State**: Prioritize using **TanStack React Query** for caching, fetching, and synchronization.
- **Global State**: Use Context API for simple state (theme, user session). Use **Zustand** for complex data flows.
- **Secure Storage**: Use `expo-secure-store` for sensitive data (tokens, credentials). Never use `AsyncStorage` for secrets.
- **Local Storage**: Use `expo-sqlite` built-in `localStorage` for simple persistence.
- Use **Zod** for schema validation.

### Native Modules and APIs

- Prefer **Expo SDK modules** (`expo-camera`, `expo-media-library`, `expo-haptics`, `expo-sensors`, `expo-secure-store`) over community alternatives.
- Use **Expo Modules API** for creating custom native modules when needed.
- Use **Config Plugins** to customize native project configuration without ejecting.
- Use `expo-file-system` (new object-oriented API in SDK 54) for file operations.

### Security and Safety

- Use `expo-secure-store` for sensitive data storage. Never use `AsyncStorage` for tokens or secrets.
- Validate all external input with Zod schemas.
- Pin SSL certificates for sensitive API calls in production.
- Ensure dependencies are updated and secure.
- Never store API keys or secrets in client-side code — use environment variables via `expo-constants`.
- Implement root/jailbreak detection for sensitive apps.
- Follow OWASP MASVS guidelines for mobile security.

> For comprehensive mobile security patterns (WebView security, biometric auth, cert pinning, code protection), see the `mobile-security-coder` skill.

### Testing and Documentation

- Write clear documentation for complex Custom Hooks and Utility functions.
- Use JSDoc to describe props and logic for IDE intellisense.
- Use `jest` + `@testing-library/react-native` for component tests.
- Test on both iOS and Android platforms before submission.

### Methodology

1. **Understand Navigation Flow**: Master Expo Router's file-based routing and layout system.
2. **Composition Thinking**: Prioritize Composition over Inheritance or deep prop drilling.
3. **Platform Awareness**: Always consider iOS and Android differences during implementation.
4. **Iterative Refinement**: Start with a simple solution, then optimize and refactor as needed.

**Process**:

1. **Requirement Analysis**: Define required props, state, navigation flow, and platform considerations.
2. **Component Design**: Outline the Component Tree, data flow, and navigation structure.
3. **Implementation**: Write precise logic, handle edge cases (loading, error, empty, offline).
4. **Review and Optimize**: Check for re-renders, hook dependencies, memory leaks, and platform-specific issues.
5. **Finalization**: Test on both platforms, ensure clean code, proper formatting, and passing tests.

---

### Related Skills

| Task                | Skill                       | When to Use                                                      |
| ------------------- | --------------------------- | ---------------------------------------------------------------- |
| Architecture design | `react-native-architecture` | Navigation patterns, native modules, offline-first, CI/CD setup  |
| Mobile UX/UI        | `mobile-design`             | Touch-first doctrine, MFRI scoring, platform conventions         |
| Security            | `mobile-security-coder`     | Secure storage, WebView security, cert pinning, OWASP compliance |
| Deployment          | `expo-deployment`           | EAS Build, app store submission, OTA updates, release management |
| SDK Upgrade         | `upgrading-expo`            | SDK version upgrades, breaking changes, dependency migration     |
| Code quality        | `react-patterns`            | Hooks, composition, state management patterns                    |
| Type system         | `typescript-expert`         | TypeScript advanced patterns, type migrations                    |
