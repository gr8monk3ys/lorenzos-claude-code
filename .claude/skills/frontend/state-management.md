---
name: state-management
description: Guides state management decisions between local state, context, and global stores with framework-specific patterns
category: frontend
priority: 60
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
triggers:
  - keywords: ["state", "store", "context", "Zustand", "Redux", "Pinia", "signals"]
  - patterns: ["store/", "context/", "state/"]
---

# State Management Skill

Guides appropriate state management solutions based on use case.

## When to Activate

This skill auto-activates when:
- Discussion involves state, stores, or context
- Creating state management infrastructure
- Components have complex state logic
- Deciding between state management approaches

## Decision Framework

### Quick Reference
| State Type | Scope | Solution | Example |
|------------|-------|----------|---------|
| **UI State** | Single component | useState/ref | Form inputs, toggles |
| **Derived** | Computed from other state | useMemo/computed | Filtered lists |
| **Shared** | Sibling components | Lift state up | Accordion groups |
| **Feature** | Feature module | Context/provide | Theme, auth status |
| **Global** | App-wide | Zustand/Pinia | User session, cart |
| **Server** | Remote data | TanStack Query | API responses |
| **URL** | Shareable state | URL params | Filters, pagination |

### Decision Tree
```
Is the state used by only one component?
├── Yes → useState / ref
└── No → Is it used by parent-child hierarchy only?
    ├── Yes → Lift state to common parent
    └── No → Is it feature-scoped (auth, theme)?
        ├── Yes → React Context / Vue provide
        └── No → Is it truly global?
            ├── Yes → Zustand / Pinia / signals
            └── No → Is it server data?
                ├── Yes → TanStack Query / SWR
                └── No → Should it be in URL?
                    ├── Yes → URL state
                    └── No → Re-evaluate scope
```

## React State Management

### Local State (useState)
```tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

### Complex Local State (useReducer)
```tsx
type State = { count: number; step: number };
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });
  // ...
}
```

### Feature Context
```tsx
// auth-context.tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async (credentials: Credentials) => {
    const user = await authService.login(credentials);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  useEffect(() => {
    authService.getSession().then(setUser).finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### Global State (Zustand - Recommended)
```tsx
// store/user-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  preferences: Preferences;
  setUser: (user: User | null) => void;
  updatePreferences: (prefs: Partial<Preferences>) => void;
  reset: () => void;
}

const initialState = {
  user: null,
  preferences: { theme: 'light', notifications: true },
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user }),
      updatePreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
      reset: () => set(initialState),
    }),
    { name: 'user-storage' }
  )
);

// Usage in components
function UserProfile() {
  const user = useUserStore((state) => state.user);
  const updatePreferences = useUserStore((state) => state.updatePreferences);
  // Only re-renders when user or updatePreferences changes
}
```

### Server State (TanStack Query)
```tsx
// hooks/use-users.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => api.getUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDTO) => api.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Usage
function UserList() {
  const { data: users, isLoading, error } = useUsers();
  const createUser = useCreateUser();

  if (isLoading) return <Spinner />;
  if (error) return <Error error={error} />;

  return (
    <ul>
      {users.map(user => <UserItem key={user.id} user={user} />)}
    </ul>
  );
}
```

## Vue 3 State Management

### Local State (ref/reactive)
```vue
<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

// Primitive values
const count = ref(0);

// Objects
const form = reactive({
  name: '',
  email: '',
});

// Derived state
const isValid = computed(() => form.name.length > 0 && form.email.includes('@'));
</script>
```

### Composables (Feature State)
```typescript
// composables/useAuth.ts
import { ref, computed } from 'vue';

const user = ref<User | null>(null);
const isLoading = ref(true);

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value);

  async function login(credentials: Credentials) {
    const response = await authService.login(credentials);
    user.value = response.user;
  }

  function logout() {
    authService.logout();
    user.value = null;
  }

  return {
    user: readonly(user),
    isAuthenticated,
    isLoading: readonly(isLoading),
    login,
    logout,
  };
}
```

### Global State (Pinia - Recommended)
```typescript
// stores/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    preferences: {
      theme: 'light' as 'light' | 'dark',
      notifications: true,
    },
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    displayName: (state) => state.user?.name ?? 'Guest',
  },

  actions: {
    async login(credentials: Credentials) {
      const response = await authService.login(credentials);
      this.user = response.user;
    },

    logout() {
      this.user = null;
      this.$reset();
    },

    updatePreferences(prefs: Partial<typeof this.preferences>) {
      this.preferences = { ...this.preferences, ...prefs };
    },
  },

  persist: true, // with pinia-plugin-persistedstate
});
```

## Svelte 5 State Management

### Runes (Local & Shared)
```svelte
<script lang="ts">
  // Local state
  let count = $state(0);

  // Derived state
  const doubled = $derived(count * 2);

  // Deep reactivity
  let user = $state<User>({
    name: '',
    settings: { theme: 'light' }
  });

  // Effects
  $effect(() => {
    console.log('Count changed:', count);
  });
</script>
```

### Shared Stores
```typescript
// stores/user.svelte.ts
class UserStore {
  user = $state<User | null>(null);
  preferences = $state({ theme: 'light', notifications: true });

  isAuthenticated = $derived(!!this.user);

  async login(credentials: Credentials) {
    const response = await authService.login(credentials);
    this.user = response.user;
  }

  logout() {
    this.user = null;
  }
}

export const userStore = new UserStore();
```

## Anti-Patterns to Avoid

```typescript
// DON'T: Put everything in global state
const useStore = create(() => ({
  isModalOpen: false,        // Should be local
  formData: {},              // Should be local
  mousePosition: { x: 0 },   // Should be local
  serverData: [],            // Should be TanStack Query
  user: null,                // This IS global ✓
}));

// DON'T: Duplicate server state
const [users, setUsers] = useState([]);
useEffect(() => {
  fetchUsers().then(setUsers);
}, []);
// Use TanStack Query instead

// DON'T: Prop drill through many levels
<App>
  <Layout user={user}>
    <Sidebar user={user}>
      <UserMenu user={user}>  // Use context instead
```

## Checklist

When implementing state management:
- [ ] Identified correct state category (local/feature/global/server)
- [ ] Chose appropriate solution for scope
- [ ] State is normalized (no duplication)
- [ ] Selectors used for derived data
- [ ] Server state uses dedicated library
- [ ] URL state for shareable filters/pages
- [ ] No unnecessary global state
- [ ] Proper TypeScript types
