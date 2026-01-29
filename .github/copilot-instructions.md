# Copilot Instructions

Target: GitHub Copilot (AI assistant)


Tech stack (high level)
- React + TypeScript

## TypeScript

- Prefer `type` over `interface` unless you need inheritance or declaration merging.
 - Use explicit types; never use `any` and prefer narrowing/type-guards when needed.
 - Do not enable `strict` globally yet; plan phased migration per package.
 - Avoid adding explanatory comments in code; if necessary, keep them very short and explicit.
 - Don't use as any or as unknown

# React

- For component props prefer `type` aliases (e.g. `type Props = { ... }`).
- Do not use `React.FC`; declare the function and return `JSX.Element` explicitly.
- Keep components as functional components and prefer early returns for guards.
- When writing React components, place helper functions (use the `function` keyword) below the component's `return` statement (i.e., after the JSX).
 - Always import and use React hooks directly (e.g. `useEffect`, `useMemo`) rather than calling them as `React.useEffect` or `React.useMemo`.
 - You don't usually need `useMemo` or `useCallback` when using the React compiler; use them only for proven performance bottlenecks.


# Javascript 
- use Boolean instead of !!

# CSS
- Prefer plain CSS modules for component styles.
- Prefer modern layout methods: use `flex` and `grid` over floats and manual positioning (absolute/relative) when possible.

## Linting/Formatting
- Use ESLint + Prettier for consistent style; integrate rules in CI (no Husky or commit hooks).
- Enforce `@typescript-eslint` recommended rules; run lint in PRs.

## Testing
- Use Vitest + React Testing Library for component tests.
- Name tests like `Component.test.tsx` and place near component files or in `__tests__`.

## Comments
- Avoid comments in code; when used they must be very short and explicit (one line).

## Plan Mode
- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
