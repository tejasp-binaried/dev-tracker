# 🔥 React Native Engineering Rules (Company Enforcement Edition)

> \*\*Non-compliance = PR rejection\*\*
> These rules are enforced via \*\*code reviews, linters, CI checks, and architecture audits\*\*

\---

## 🚨 0. Enforcement Policy

* Every PR must pass:

  * ✅ ESLint (strict config)
  * ✅ TypeScript (no warnings allowed)
  * ✅ Unit tests
  * ✅ Architecture validation
* ❌ Merge is **blocked** if:

  * Any rule is violated
  * Any `any` type exists
  * Any hardcoded domain value exists

\---

## 1\. Architecture (NON-NEGOTIABLE)

### Mandatory Structure

```
src/
  modules/
  shared/
  navigation/
  services/
```

### Rules

* Feature-based modular architecture only
* ❌ No global dumping ground files
* ❌ No cross-module imports (except shared)

\---

## 2\. State Management Policy (STRICT BAN RULE)

### Allowed

* `useState`
* `useReducer`
* `useContext`

### Forbidden

* ❌ Redux
* ❌ Zustand
* ❌ MobX
* ❌ Recoil

> Exception requires \*\*architect approval\*\*

\---

## 3\. TypeScript Policy (ZERO TOLERANCE)

### Absolute Bans

* ❌ `any`
* ❌ `unknown`
* ❌ `@ts-ignore`
* ❌ `@ts-expect-error`

### CI Rule

* `"noImplicitAny": true`
* `"strict": true`

### Enforcement

* PR fails if:

  * Any implicit type exists
  * Any unsafe assertion exists

\---

## 4\. Domain Modeling Rules (CRITICAL)

### ❌ Forbidden

```ts
type Status = 'loading' | 'success';
```

### ✅ Mandatory Pattern

```ts
export const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
} as const;

export type Status = typeof STATUS\[keyof typeof STATUS];
```

### Enforcement

* All domain states MUST use const objects
* Raw string comparisons → PR rejection

\---

## 5\. Constants Policy (ZERO INLINE RULE)

### ❌ Forbidden

```ts
if (status === 'loading') {}
```

### ✅ Required

```ts
if (status === STATUS.LOADING) {}
```

### Rules

* All:

  * API paths
  * Routes
  * Labels
  * Status values
* Must be in `\*.constants.ts`

\---

## 6\. Naming Violations = Auto Reject

### ❌ Forbidden Names

* `data`
* `item`
* `temp`
* `obj`
* `value`

### Enforcement

* ESLint custom rule
* PR auto-fails on vague names

\---

## 7\. Component Complexity Rules

### Hard Limits

* Max 200 lines per component
* Max 50 lines per function

### JSX Rules

* ❌ Nested ternary → reject
* ❌ Inline logic → reject

\---

## 8\. Styling Policy (STRICT)

### Allowed

* `StyleSheet.create`

### Forbidden

* ❌ Inline styles (except dynamic)
* ❌ Random style objects

### Enforcement

* ESLint rule: `no-inline-styles`

\---

## 9\. API Layer Governance

### Mandatory

* One API file per module
* Centralized HTTP client

### ❌ Forbidden

* Direct `fetch` inside components
* Inline API calls

### Required Pattern

```ts
export const getUser = async (): Promise<User> => {
  return (await api.get('/user')).data;
};
```

\---

## 10\. Import Discipline (AUTO CHECKED)

Order must be:

1. React
2. External libs
3. Internal aliases
4. Relative imports

Violation → PR reject

\---

## 11\. Logging Policy

### ❌ Forbidden

* `console.log` in production code

### ✅ Allowed

* Inside `catch` only

\---

## 12\. Error Handling (MANDATORY UX RULE)

* Every API call MUST:

  * Handle error
  * Show user feedback

### ❌ Forbidden

* Silent failures
* Empty catch blocks

\---

## 13\. Performance Rules

### Mandatory

* `useMemo` for derived data
* `useCallback` for handlers

### Lists

* > 50 items → must use `FlatList`

\---

## 14\. Security Rules (CRITICAL)

### ❌ Forbidden

* AsyncStorage for tokens

### ✅ Required

* Secure storage:

  * Expo SecureStore
  * Keychain

### Also

* No logging tokens
* Sanitize inputs

\---

## 15\. Testing Enforcement

### Required Coverage

* Utils → 100%
* Hooks → Required
* Context → Required

### CI Rule

* Coverage threshold enforced

\---

## 16\. Git Discipline (STRICT)

### ❌ Forbidden

* `--no-verify`
* Force push to main

### Required

* Conventional commits
* PR review mandatory

\---

## 17\. CI/CD Gates

Every PR must pass:

* ✅ Lint
* ✅ Type check
* ✅ Tests
* ✅ Build

\---

## 🚫 AUTO-REJECT CHECKLIST

PR will be rejected if it contains:

* `any`
* Hardcoded domain values
* Inline API calls
* Nested ternaries
* Poor naming
* Inline styles abuse
* Missing types
* Missing error handling

\---

## 🔑 Engineering Principle

```
Strict Types > Clean Architecture > Predictable Code > Zero Ambiguity
```

\---

## 🔥 Final Rule

> If a reviewer has to \*\*guess your intent\*\*, the code is wrong.

