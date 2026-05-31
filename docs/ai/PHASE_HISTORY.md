# Dutch Theory Sprint V2 — Recent Phase History

This file is a lightweight rolling history for AI/project context. It is not meant to be a full changelog.

## Phase 15B / 15C
- Expanded question coverage in approved modules
- Total questions reached 252 after Phase 15C
- Work stayed within approved content scope

## Phase 15D
- Revised scope replaced placeholder `hazard-perception` with `hazard-awareness`
- Updated approved lesson/question files only
- Total questions increased to 268

## Phase 16
- Product/docs phase completed within approved scope
- Build succeeded

## Phase 17
- Expanded scenario-heavy question coverage in priority modules
- Total questions increased to 304
- Lint/build passed and work was pushed cleanly

## Phase 18A
- Static visual pilot implemented in:
  - `signs`
  - `hazard-awareness`
- Added up to 12 static SVG educational visuals
- Mobile smoke check later found one SVG sizing issue, which was fixed
- Final mobile smoke check passed

## Phase 19A
- Added a very small richer-visual pilot in `hazard-awareness`
- Introduced step-reveal diagrams in 2 lesson sections only
- No question logic changes
- No animation framework
- Intended as a reversible pilot, not a broad rollout

## Phase 20
- Bounded local usability/progress phase
- Improved module completion visibility
- Added richer local attempt/result history
- Added mock exam attempt persistence locally
- Kept schema additive and browser-local only
- No backend, login, sync, or broader visual rollout

## Phase 21
- Completed the previously empty `special-users` module
- Added:
  - 4 lessons
  - 20 total lesson sections
  - 24 quiz questions
- Enabled quiz support and content linkage
- App total question count is now 328

## Phase 22A
- UI polish and code hygiene; no schema, content, or storage-flow changes
- Fixed module-card progress text visibility: replaced `eyebrow--dark` (white text) with `eyebrow--on-card` (#475569) so status is readable on white cards
- Added a static informational banner to Topic Practice clarifying that answers there do not count toward Mistake Review or module progress
- Added a dismissible `localStorage`-unavailable warning banner in AppShell, surfaced via `isUsingMemoryFallback()`
- Extracted shared `formatTimestamp` and `formatDelta` helpers into `src/utils/format.js` (were verbatim duplicates in Results.jsx and MockExamResults.jsx); `formatDuration` intentionally kept separate due to differing output formats
- Files changed: `src/App.css`, `src/components/AppShell.jsx`, `src/components/ModuleCard.jsx`, `src/routes/MockExamResults.jsx`, `src/routes/Results.jsx`, `src/routes/TopicPractice.jsx`, `src/utils/format.js`

## Phase 22B
- Infrastructure refactor of `src/content/imageRegistry.js`; no lesson/question JSON changes, no UI component changes
- Replaced 12 manual ES `import` statements and a hand-maintained registry object with a single `import.meta.glob('./images/**/*.svg', { eager: true })` call
- Keys are normalised by stripping the `./images/` prefix, preserving the short-key format (`signs/warning-triangle.svg`) stored in JSON files
- `resolveImageSrc()` public API is unchanged
- Purpose: new SVGs added under `src/content/images/<module>/` are now picked up automatically at build time without editing `imageRegistry.js`
- Files changed: `src/content/imageRegistry.js`

## Current next-step context
- Phase 22A and 22B are complete and committed to `main`
- imageRegistry infrastructure is now scalable; broader visual rollout across additional modules is unblocked
- Suggested next directions: add SVG visuals to more content modules, or continue content/usability improvements
