---
trigger: always_on
---

# Skills — React Native + TypeScript + React Navigation + Axios

This file defines **how to think, structure, and implement features** in the React Native codebase.

- `rules.md` = enforcement (strict)
- `skills.md` = engineering mindset (how to build correctly)

---

# 0. Decision-Making Framework

Before writing code:

1. **Does this already exist?**
   - Check module: utils, constants, config, hooks

2. **Where does this belong?**
   - API → `*Api.ts`
   - Logic → hooks
   - State sharing → context
   - UI → screens/components
   - Static values → `*.constants.ts`

3. **Is this the simplest solution?**
   - No abstraction before 3rd repetition

4. **Can this be understood in 5 seconds?**
   - If not → refactor

---

# 1. Mental Model of Architecture

```

Types → Constants → API → Hooks → Context → UI (Screens/Components)

```

---

# 2. Module Thinking (CRITICAL)

Each module is **self-contained**

```

modules/
feature/
FeatureScreen.tsx
FeatureContext.tsx
featureApi.ts
feature.types.ts
feature.constants.ts
feature.config.ts
featureUtils.ts
components/

````

---

## Core Idea

- Hooks = logic
- Context = composition
- Screens = entry UI
- Components = reusable UI

---

# 3. Navigation Thinking (React Navigation)

### Rule

- Navigation is **centralized**
- Screens are registered once

---

### Pattern

```ts
export type RootStackParamList = {
  Home: undefined
  Details: { id: string }
}
````

---

### Mental Model

```
Navigator → Screen → Component
```

---

### Rules

* No navigation logic scattered
* No hardcoded route names
* Use typed navigation always

---

# 4. Constants & Domain Modeling (STRICT)

### Pattern

```ts
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

export type UserStatus =
  (typeof USER_STATUS)[keyof typeof USER_STATUS]
```

---

### Rule

* No raw strings
* No inline unions
* Always const object → derived type

---

# 5. API Thinking

### Pattern

```ts
export async function fetchUsers(): Promise<User[]> {
  const { data } = await api.get('/users')
  return data
}
```

---

### Mental Model

```
Component → Context → API → Data → State
```

---

### Rules

* No API calls in UI
* Always typed response
* Always return clean data

---

# 6. Hook Design (CORE LOGIC)

Hooks own:

* state
* side effects
* business logic

---

### Pattern

```ts
function useUsers() {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsersData = async () => {
    const data = await fetchUsers()
    setUsers(data)
  }

  return {
    users,
    fetchUsersData,
  }
}
```

---

### Rule

* Hooks return clean API
* No UI logic inside hooks

---

# 7. Context Design

### Pattern

```
useSubHook → combine → Context → Screen
```

---

### Rule

* Start with one context per module
* Split only when necessary

---

# 8. Screen vs Component Thinking

| Type      | Purpose                      |
| --------- | ---------------------------- |
| Screen    | Full page (navigation entry) |
| Component | Reusable UI                  |

---

### Rule

* Screens connect to context
* Components stay reusable and clean

---

# 9. Component Structure

```
Hooks → Derived Values → Handlers → JSX
```

---

### Pattern

```tsx
export function UserCard({ user }: UserCardProps) {
  const [isActive, setIsActive] = useState(false)

  const handlePress = () => {
    setIsActive((prev) => !prev)
  }

  if (!user) return null

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{user.name}</Text>
    </TouchableOpacity>
  )
}
```

---

### Rules

* No logic inside JSX
* No API calls
* Keep components small

---

# 10. Styling Thinking (React Native)

### Rule

* No inline styles
* Always use StyleSheet

---

### Pattern

```ts
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
```

---

### Dynamic Styles

```tsx
<View style={[styles.card, isActive && styles.active]} />
```

---

# 11. Derived State Thinking

Never store computed data in state

---

### ❌ Wrong

```ts
const [filteredUsers, setFilteredUsers] = useState([])
```

---

### ✅ Correct

```ts
const filteredUsers = useMemo(() => {
  return users.filter(...)
}, [users])
```

---

# 12. Error Handling

### Mental Model

```
API → throw → Hook catches → Context stores → UI renders
```

---

### Pattern

```ts
try {
  await fetchUsersData()
} catch (error) {
  setError('Failed to fetch users')
}
```

---

### Rule

* Errors are data
* Store message, not boolean

---

# 13. Performance Thinking

| Problem             | Solution    |
| ------------------- | ----------- |
| Re-renders          | useMemo     |
| Function recreation | useCallback |
| Large lists         | FlatList    |
| Heavy UI            | lazy load   |

---

### FlatList Pattern

```tsx
<FlatList
  data={users}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <UserCard user={item} />}
/>
```

---

# 14. Reusability Thinking

Before writing logic:

* Seen twice → duplicate
* Seen thrice → extract

---

### Extract to:

* utils → pure functions
* hooks → shared logic
* config → mappings

---

# 15. File Creation Flow

```
1. types
2. constants
3. config (if needed)
4. API
5. hook
6. context
7. screen
8. components
```

---

# 16. Clean Code Heuristics

* If you need comment → rename
* If function > 50 lines → split
* If nested logic → extract
* If repeated → utility

---

# 17. Anti-Patterns (STRICT)

| ❌ Wrong                   | ✅ Correct             |
| ------------------------- | --------------------- |
| API in component          | use API layer         |
| Inline styles             | StyleSheet            |
| Raw strings               | constants             |
| Derived state in useState | useMemo               |
| Business logic in JSX     | move to hooks         |
| Large screens             | split into components |

---

# 🔐 Auth Thinking (Mobile)

### Rules

* Never store tokens in AsyncStorage
* Use secure storage (Keychain / SecureStore)
* Attach token via interceptor

---

### Pattern

```ts
api.interceptors.request.use(async (config) => {
  const token = await getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

---

# FINAL PRINCIPLE

```
Types → Constants → API → Logic → UI
```

Breaking this order = bad architecture.


### ✅ What this gives you

- Same **mental model as your web rules**
- Mobile-specific adaptations (navigation, styling, storage)
- No conflicts with your strict rules philosophy
- Clean enough for **company-level enforcement**

