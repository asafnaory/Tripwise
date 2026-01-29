# Feature Specification: Main Trip Wizard

**Feature Branch**: `[1-main-trip-wizard]`  
**Created**: 2026-01-29  
**Status**: Draft  
**Input**: User description: "main trip wizard: overview: A multi-step wizard that collects trip preferences including destination, group type, budget, transportation, food preferences, travel vibe, and inspiration images in order to generate a personalized trip."

## Tech Stack & Testing (Project Constraints)

- Framework: Next.js + React + TypeScript (MANDATORY)
- Styling: CSS Modules for component/app styles; Tailwind usage limited to shadcn/ui components
- Mapping: Mapbox MUST be used for geo/map features
- Tests: Component tests using React Testing Library are REQUIRED; TDD is NOT required

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Complete trip wizard (Priority: P1)

A user provides a destination, selects travel dates, chooses who they're traveling with, picks a daily budget level, selects transportation preferences (modes + whether they rent a car), picks food preferences, selects travel vibe(s), optionally uploads or pastes an inspiration image, reviews the summary, and creates a trip.

**Why this priority**: This is the primary end-to-end flow that delivers the core product value: a personalized trip plan.

**Independent Test**: Start the wizard, fill each step with valid inputs, submit "Create Trip" and verify a trip is generated (or queued) that includes at least destination and dates.

**Acceptance Scenarios**:

1. **Given** the user opens the wizard, **When** they select a destination and valid date range and complete each step, **Then** the "Create Trip" action returns success and the created trip includes destination and start/end dates.
2. **Given** incomplete required fields (e.g., destination missing), **When** user attempts to progress/create, **Then** the UI prevents progress and highlights the missing input.

---

### User Story 2 - Edit before create (Priority: P2)

A user reviews collected preferences on the final screen, edits any section (jump back to that step or click edit), updates values, and then re-submits.

**Why this priority**: Improves usability—users must be able to correct mistakes or change mind before committing.

**Independent Test**: Fill wizard, reach Review, click Edit on a section, change value, return to Review, and assert updated values are persisted and used when creating the trip.

**Acceptance Scenarios**:

1. **Given** the user is on Review, **When** they choose to edit "Food Preferences" and add/remove items, **Then** the Review page reflects the new preferences and subsequent trip creation includes the updated preferences.

---

### User Story 3 - Upload/replace inspiration image (Priority: P3)

A user can provide an inspiration image either via URL or file upload. The UI shows a preview and allows replacing the image before creating the trip.

**Why this priority**: Visual cues can improve AI prompt quality and user satisfaction; optional but valuable.

**Independent Test**: Upload an image file or paste an image URL, verify preview appears, replace it with another image and verify preview updates.

**Acceptance Scenarios**:

1. **Given** a user uploads a JPEG, **When** upload completes, **Then** a preview is displayed and the file reference is included in the trip payload (or the image URL is saved for later upload).
2. **Given** a user pastes a valid image URL, **When** they confirm, **Then** the preview displays and the URL persists through Review.

---

### Edge Cases

- What if the user provides invalid dates (end before start)? UI must validate and block progression.
- What if the image upload fails or CORS blocks URL preview? Show a clear error and allow retry or removal.
- What if localStorage is unavailable (privacy mode)? Preferences should still be collected in-memory and user warned that preferences won't persist between sessions.
- What if destination list/API is unavailable? Provide a fallback free-text destination input and surface an explanatory message.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The wizard MUST present the following ordered steps: Destination, Dates, Group, Budget, Transportation, Food Preferences, Travel Vibe, Inspiration Images, Review & Create.
- **FR-002**: Destination input MUST support a searchable dropdown and surface a short list of "popular destinations"; a free-text fallback MUST be available when autocomplete is unavailable.
- **FR-003**: Dates input MUST require a valid date range (start <= end) and prevent selecting past-only ranges where the start is before today.
- **FR-004**: Group selection MUST be a single-select with the provided options (solo, couple, family_with_children, family_no_children, group_men, group_women).
- **FR-005**: Budget selection MUST be a single-select mapped to numeric levels 1-4 and display the provided descriptions.
- **FR-006**: Transportation MUST allow multi-select modes and a single-select for "Do you rent a car?"; captured output must include modes array and boolean rentCar.
- **FR-007**: Food Preferences and Travel Vibe MUST allow multi-select choices and persist selections to the final review.
- **FR-008**: Inspiration images MUST accept either an image URL or a file upload, show a preview, and allow replacing/removing the image prior to create.
- **FR-009**: Review screen MUST display all collected preferences and provide actions: editSection (jump to that step) and createTrip.
- **FR-010**: On Create Trip, the system MUST at minimum send destination, startDate, endDate to the trip generation backend. Preferences MUST be retained client-side and optionally sent to backend if supported.
- **FR-011**: The UI MUST gracefully handle failure cases (network errors, upload errors) by surfacing user-friendly error messages and retry options.

### Key Entities

- **TripPreference**: { destination: string, startDate: string, endDate: string, groupType?: string, budgetLevel?: number, transportation?: { modes: string[], rentCar?: boolean }, foodPreferences?: string[], travelVibe?: string[], inspirationImage?: string }
- **InspirationImage**: { source: 'url' | 'upload', url?: string, filename?: string, mimeType?: string }
- **TripRequest**: Payload sent to trip generation containing at minimum { destination, startDate, endDate } and optionally { preferences: TripPreference }

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 90% of users who start the wizard complete it (Create Trip) within 4 minutes for standard flows (destination + dates + defaults for optional steps).
- **SC-002**: 95% of valid date ranges submitted are properly validated (i.e., invalid ranges are blocked and show an error message).
- **SC-003**: 95% of image previews render successfully for valid image URLs or uploaded images in supported browsers.
- **SC-004**: 98% of created trips include destination and start/end dates in the returned trip object or subsequent UI state.
- **SC-005**: If preferences are persisted to client storage, 95% of sessions with storage available restore preferences on reload.

## Assumptions

- Authentication is not required to use the wizard; trips can be created anonymously or via an existing session.
- The backend trip generation service requires at minimum `destination`, `startDate`, and `endDate`; additional preferences may be accepted if API extended.
- Popular destinations list will be supplied by a lightweight API or static asset; if unavailable, free-text fallback is acceptable.
- Image uploads may be stored externally (S3, signed URL flow) or represented as a temporary client-side URL for preview; spec avoids mandating storage implementation.
- Local UX choices (exact layout, icons, microcopy) are left to the UI designer; spec focuses on behavior and acceptance.

## Deliverables

- `specs/1-main-trip-wizard/spec.md` (this file)
- `specs/1-main-trip-wizard/checklists/requirements.md` (quality checklist)


