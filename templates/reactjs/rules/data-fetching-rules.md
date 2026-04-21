---
trigger: glob
globs: *.tsx
---

# Data Fetching & State Management Rules

This document outlines how we call APIs and manage data (Server State) using **TanStack React Query**.

## 1. Server State vs Global State Philosophy

- **React Query manages ALL Server State**: All data fetched from the Database/Backend, including their corresponding Loading/Error states, must be stored and managed within React Query's cache.
- **Absolutely DO NOT**: Fetch APIs using local variables/`useEffect` and then push the response into a global store like Zustand, Redux, or React Context. Global Stores are strictly reserved for **Client-Side/UI State** (e.g., Dark/Light mode, Sidebar open/closed state, or an active step in a frontend wizard).

## 2. Organization and Encapsulation Rules

To keep the project maintainable, writing random scattered `useQuery` hooks with manual parameters is forbidden. You must adhere to the Custom Hooks structure wrapped within the FSD (Feature-Sliced Design) architecture.

### Query Keys Factory

Maintain a unified set of Query Keys instead of hard-coding arrays.

```ts
// shared/api/query-keys.ts or entities/[name]/api/keys.ts
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};
```

### Custom Hooks Encapsulation

Wrap `useQuery` and `useMutation` inside a single Custom Hook and place it in the correct Layer (`entities/` or `features/`).

```ts
// entities/user/api/use-user-query.ts
import { useQuery } from '@tanstack/react-query';
import { userKeys } from './keys';
import { fetchUserById } from './http';

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUserById(id),
    staleTime: 5 * 60 * 1000, // Customize behavior per entity
  });
}
```

## 3. Mutations and Invalidations

When performing a Mutation (POST, PUT, DELETE) - this operation belongs to the **Features** layer. On successful mutation, we must `invalidateQueries` to trigger refetches for the relevant lists.

```ts
// features/user/update-profile/api/use-update-profile.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/entities/user';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserPayload) => putProfile(data),
    onSuccess: () => {
      // Invalidate the exact keys updated
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      // Add Toast notification logic here
    },
  });
}
```

## 4. Error Handling and Authentication (API Layer)

Data fetching core logic (Axios instance, fetch wrapper) resides in `shared/api/`.
- Token Handling (Attaching to headers) should be done via HTTP client Interceptors.
- Refresh Token Handling: Handled automatically at the Interceptor level before the error ever reaches React Query.
- UI Error Handling: When Axios throws an error, the error is passed down to React Query's `error` variable, allowing the Component (via `isLoading, isError, error`) or a higher-level React Error Boundary to catch and display warnings using our standard `ui-styling` components.
