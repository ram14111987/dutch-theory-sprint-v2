# Dutch Theory Sprint V2 — Project Summary

## What this project is
Dutch Theory Sprint V2 is a Dutch driving theory preparation app built for CBR-style study. It is a frontend-only React application designed around lessons, module quizzes, review flows, sprint mode, mock exams, and browser-local progress tracking.

## Current stack
- React 19
- Vite 8
- react-router-dom 7
- Static JSON content for lessons and questions
- Browser-local persistence via localStorage with in-memory fallback

## Product shape
The app currently supports:
- module-based lessons
- per-module quizzes
- Topic Deep Dive / practice mode
- review and sprint flows
- mock exams
- module progress and local attempt history
- limited visual support using SVG-based educational images

## Current status
As of the latest completed work:
- Phase 0 through Phase 22B are complete and committed to `main`
- the app has 13 modules
- total question count is 328
- `special-users` is now a real completed module, no longer a placeholder
- local usability/progress improvements are complete (Phase 20)
- imageRegistry now uses `import.meta.glob` — new SVGs are auto-discovered without editing the registry file
- broader visual rollout has not yet happened but is now unblocked

## Important recent phases
### Phase 18A — Static visual pilot
- Added a small static SVG pilot in `signs` and `hazard-awareness`
- Kept the implementation schema-safe and additive
- Verified build/lint and mobile smoke check

### Phase 19A — Richer visual pilot
- Added a very small step-reveal diagram pilot in `hazard-awareness`
- Lessons only, no question logic changes
- No animation framework, no audio/video, no broader rollout

### Phase 20 — Local usability and progress
- Improved visibility of module completion/progress
- Added local attempt/result history improvements
- Added mock exam attempt persistence locally
- Kept everything browser-local only
- No backend, login, sync, or cross-device persistence added

### Phase 21 — Special road users completion
- Completed the previously empty `special-users` module
- Added 4 lessons
- Added 24 questions
- Enabled quiz support and content linkage
- Total app question count increased to 328

### Phase 22A — UI polish and code hygiene
- Fixed module-card progress text color (readable on white cards)
- Added Topic Practice informational banner
- Added dismissible localStorage-unavailable warning banner in AppShell
- Extracted shared format helpers (`formatTimestamp`, `formatDelta`) into `src/utils/format.js`
- No schema, content, or storage-flow changes

### Phase 22B — imageRegistry infrastructure
- Replaced manual SVG import list with `import.meta.glob` (eager)
- New SVGs under `src/content/images/` are now auto-discovered at build time
- `resolveImageSrc()` API unchanged; no lesson/question JSON changes

## Current product priorities
Short-term priorities:
- small UX polish and infrastructure improvements
- improve visual rollout infrastructure before scaling visuals broadly
- continue bounded phases, not rewrites

Medium-term priorities:
- broader static visual rollout across more modules
- storage hardening before any sync work
- clearer progress and study guidance

Longer-term priorities:
- cross-device sync
- potential login/backend persistence
- richer readiness or study-planning features

## Important architecture facts
- Content is organized per module in JSON files
- Module slugs act as stable identifiers across content and progress
- Quiz/session logic is separated from React components
- Progress is currently browser-local only
- Visual support is currently limited and uses an image registry pattern

## What is intentionally not in scope yet
- No backend
- No authentication
- No cross-device sync
- No full rewrite
- No broad design-system overhaul yet

## Guidance for future work
This project is being developed in bounded, reviewable phases.
Preferred approach:
1. Inspect current state
2. Propose a tightly scoped next phase
3. Wait for approval
4. Implement only within approved scope
5. Report exact files changed, verification status, commit hash, push status, and any scope deviations
