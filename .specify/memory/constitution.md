<!--
Sync Impact Report

- Version change: template -> 1.0.0
- Modified principles: (placeholders -> concrete)
	- [PRINCIPLE_1_NAME] -> Clean Code Discipline
	- [PRINCIPLE_2_NAME] -> Simplicity & Minimal Dependencies
	- [PRINCIPLE_3_NAME] -> Responsive Design & Accessibility
	- [PRINCIPLE_4_NAME] -> Testing Policy (no TDD; component tests)
	- [PRINCIPLE_5_NAME] -> Tech Stack Constraints (Next.js, React, CSS Modules, Mapbox)
- Added sections: explicit Tech Stack & Testing guidance
- Removed sections: none
- Templates requiring updates:
	- .specify/templates/plan-template.md ✅ updated
	- .specify/templates/spec-template.md ✅ updated
	- .specify/templates/tasks-template.md ✅ updated
	- .specify/templates/commands/*.md ⚠ pending (directory not found)
- Follow-up TODOs:
	- RATIFICATION_DATE: TODO(RATIFICATION_DATE): original adoption date unknown; set on final ratification
-->

# my-trip-ai Constitution

## Core Principles

### Clean Code Discipline
All code MUST be readable, well-structured, and easy to reason about. Functions and components
MUST have a single responsibility, small surface area, and explicit types. Naming MUST be
descriptive. Comments are allowed only to explain non-obvious rationale; prefer clear code over
comments. Rationale: maintainability and easy onboarding for future contributors.

### Simplicity & Minimal Dependencies
Design solutions that are as simple as possible to meet requirements. External dependencies
MUST be minimized and justified; prefer built-in platform features or small, well-maintained
libraries. New dependencies REQUIRE a short justification in PR description. Rationale: smaller
footprint, easier security review, and simpler upgrades.

### Responsive Design & Accessibility
UI components MUST be responsive across common device widths. Accessibility basics MUST be
implemented (semantic HTML, keyboard focus, alt text where appropriate). Rationale: broad reach
and better UX for all users.

### Testing Policy (No TDD; Component Tests Required)
The project does NOT mandate Test-Driven Development (TDD). Instead, the project REQUIRES
lightweight component tests using React Testing Library that assert general behavior (render
sanity, interactions, and props-driven output). Tests MUST be simple and focused—avoid
overly complex fixtures or mocked internals. Integration tests are optional when justified.

### Tech Stack Constraints
The project MUST use Next.js v16.1.4 and React v19.2.3 with TypeScript. Styling MUST use CSS
Modules for application styles; Tailwind is allowed only for `shadcn/ui` components already in
`package.json` and its usage MUST be limited to those components. Map visuals MUST use
Mapbox (`mapbox-gl` v3.x as present in the project). UI components MUST be implemented using
`shadcn/ui` only — no other third-party component libraries are permitted. Rationale:
predictable build pipeline, minimal cognitive overhead, and consistent component design.

## Implementation Constraints
- Framework: Next.js with React and TypeScript.
- Styling: CSS Modules for app-specific styles; Tailwind only for shadcn components already listed
		in `package.json`.
- Runtime libs: Next.js v16.1.4, React v19.2.3, React DOM v19.2.3, Mapbox GL v3.x.
- React compiler: This project uses the React compiler (`babel-plugin-react-compiler`), so
	reliance on `useMemo`, `useCallback`, and `React.memo` for routine performance optimizations
	is discouraged. Prefer plain components and let the compiler handle common optimizations.
	Use of these hooks or APIs MUST be justified in a PR when used for non-trivial cases.
- Component libraries: UI components MUST use `shadcn/ui` only; importing other component
	libraries is disallowed unless a justified exception is approved in the PR.
- Mapping: Mapbox for map rendering and interaction.
- Tests: React Testing Library for component tests; Vitest or Jest are acceptable if already in
	project dependencies; keep tests shallow and behavior-focused.
- Dependency policy: Add a dependency only if it is essential; document justification in the PR.

## Development Workflow
- Pull Requests MUST include a short rationale for any added dependency or architectural change.
- Code review MUST verify adherence to this constitution: clean code, minimal dependencies,
	responsive design, basic accessibility, and appropriate component tests.
- Merge allowed only after 1 reviewer approves and CI passes (lint/build/tests as applicable).

## Governance
Amendments to this constitution require: (1) a proposed change committed as a PR against
`.specify/memory/constitution.md`, (2) a concise migration plan for any behavioral changes,
and (3) approval from the project maintainers listed in repository settings. Versioning follows
semantic versioning for the constitution itself:

- MAJOR: Backward-incompatible governance or principle removals/redefinitions.
- MINOR: New principle or materially expanded guidance.
- PATCH: Clarifications, wording fixes, or non-semantic refinements.

Compliance reviews: Periodic checks SHOULD be performed on larger merges to ensure the
constitution is maintained. Non-compliant changes MUST include a remediation plan in the PR.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): set original adoption date | **Last Amended**: 2026-01-28
