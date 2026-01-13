---
name: component-patterns
description: Applies React/Vue/Angular/Svelte best practices including accessibility, performance optimization, and type safety
category: frontend
priority: 75
allowed-tools:
  - Read
  - Edit
  - Write
  - Grep
  - Glob
triggers:
  - patterns: ["components/", "*.tsx", "*.vue", "*.svelte", "*.component.ts"]
  - keywords: ["component", "UI", "frontend", "React", "Vue", "Angular", "Svelte"]
---

# Component Patterns Skill

Automatically applies frontend component best practices across frameworks.

## When to Activate

This skill auto-activates when:
- Creating or editing component files
- Conversation mentions UI, components, or frontend
- Working in components directories
- Any framework-specific component work

## Universal Component Principles

### 1. Component Structure
```
components/
├── ui/                    # Shared UI primitives (Button, Input, Card)
├── features/              # Feature-specific components
│   └── auth/
│       ├── LoginForm.tsx
│       └── SignupForm.tsx
└── layouts/               # Page layouts (Header, Footer, Sidebar)
```

### 2. Naming Conventions
- **PascalCase** for component names: `UserProfile`, `LoginForm`
- **camelCase** for props and handlers: `onClick`, `isLoading`
- **Descriptive names**: `UserProfileCard` not `UPC`
- **Boolean props**: `isLoading`, `hasError`, `canSubmit`

### 3. Props Design
```typescript
// Good: Explicit, typed, with defaults
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

// Bad: any types, unclear naming
interface Props {
  type: any;
  data: any;
  cb: Function;
}
```

## React Patterns

### Functional Component Template
```tsx
import { memo, useCallback, useMemo } from 'react';
import type { FC } from 'react';

interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
  className?: string;
}

export const UserCard: FC<UserCardProps> = memo(function UserCard({
  user,
  onSelect,
  className,
}) {
  const handleClick = useCallback(() => {
    onSelect?.(user);
  }, [user, onSelect]);

  const displayName = useMemo(
    () => `${user.firstName} ${user.lastName}`,
    [user.firstName, user.lastName]
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label={`Select ${displayName}`}
    >
      <span>{displayName}</span>
      <span>{user.email}</span>
    </button>
  );
});
```

### Custom Hook Pattern
```tsx
function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      try {
        setIsLoading(true);
        const data = await getUser(userId);
        if (!cancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchUser();
    return () => { cancelled = true; };
  }, [userId]);

  return { user, isLoading, error };
}
```

## Vue 3 Patterns

### Composition API Template
```vue
<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  user: User;
  variant?: 'default' | 'compact';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
});

const emit = defineEmits<{
  select: [user: User];
}>();

const isHovered = ref(false);

const displayName = computed(() =>
  `${props.user.firstName} ${props.user.lastName}`
);

function handleSelect() {
  emit('select', props.user);
}
</script>

<template>
  <button
    type="button"
    :class="['user-card', variant, { 'is-hovered': isHovered }]"
    :aria-label="`Select ${displayName}`"
    @click="handleSelect"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <span>{{ displayName }}</span>
    <span>{{ user.email }}</span>
  </button>
</template>
```

## Svelte 5 Patterns

### Runes Template
```svelte
<script lang="ts">
  interface Props {
    user: User;
    onSelect?: (user: User) => void;
  }

  let { user, onSelect }: Props = $props();

  let isHovered = $state(false);

  const displayName = $derived(`${user.firstName} ${user.lastName}`);

  function handleSelect() {
    onSelect?.(user);
  }
</script>

<button
  type="button"
  class="user-card"
  class:hovered={isHovered}
  aria-label="Select {displayName}"
  onclick={handleSelect}
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
>
  <span>{displayName}</span>
  <span>{user.email}</span>
</button>
```

## Accessibility Requirements

### Mandatory for All Components
```tsx
// 1. Semantic HTML
<button>Click me</button>        // Not: <div onClick={...}>
<nav>...</nav>                   // Not: <div className="nav">
<main>...</main>                 // Not: <div className="main">

// 2. ARIA labels for non-text elements
<button aria-label="Close dialog">
  <CloseIcon />
</button>

// 3. Keyboard navigation
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>

// 4. Focus management
const inputRef = useRef<HTMLInputElement>(null);
useEffect(() => {
  inputRef.current?.focus();
}, []);

// 5. Color contrast
// Ensure 4.5:1 for normal text, 3:1 for large text

// 6. Alt text for images
<img src={url} alt="User avatar showing profile picture" />
```

### Focus States
```css
/* Always visible focus indicator */
:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}

/* Don't remove focus for keyboard users */
:focus:not(:focus-visible) {
  outline: none;
}
```

## Performance Optimization

### React
```tsx
// 1. Memoize expensive computations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// 2. Memoize callbacks
const handleClick = useCallback(() => {
  onClick(item.id);
}, [item.id, onClick]);

// 3. Memoize components
export const ExpensiveList = memo(function ExpensiveList({ items }) {
  return items.map(item => <ExpensiveItem key={item.id} item={item} />);
});

// 4. Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'));

// 5. Virtualize long lists
import { useVirtualizer } from '@tanstack/react-virtual';
```

### Vue
```vue
<script setup>
import { computed, shallowRef } from 'vue';

// Use shallowRef for large objects
const largeData = shallowRef(initialData);

// v-memo for list items
</script>

<template>
  <div v-for="item in items" :key="item.id" v-memo="[item.id, item.updated]">
    {{ item.name }}
  </div>
</template>
```

## Quality Checklist

Before completing component creation:
- [ ] TypeScript types defined for all props
- [ ] Default values for optional props
- [ ] Semantic HTML elements used
- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Memoization for expensive operations
- [ ] No inline object/array creation in JSX
- [ ] Event handlers properly typed
- [ ] Component is testable (accepts test IDs)
