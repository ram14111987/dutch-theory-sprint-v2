# Release Notes — v1.0.0

First public release of **Dutch Theory Sprint v2**. A self-contained, browser-only study app for the Dutch (CBR) car driving theory exam.

## Highlights

- Six study modes covering everything from a 5-question warm-up to a full CBR-style mock exam
- 12 quiz-enabled modules, 49 lessons, and 196 questions — all bundled JSON, no backend
- Local progress tracking with completed-module status, weakest-area detection, and Mistake Review
- A CBR-faithful Realistic Mock Exam: **50 questions, 30 minutes, pass at 44 correct**

## Feature set

### Study modes

- **Normal quiz** — 5 randomized questions per module. Best attempt ≥ 80% completes the module.
- **Mistake Review** — replays previously-wrong questions across all modes, latest-answer-wins.
- **Quick Sprint** — 10 mixed questions, 120-second wall-time countdown, auto-submits on timeout.
- **Topic Deep Dive** — focused practice through a single module's full question bank.
- **Practice Mock Exam** — 25 questions, no timer, pass at 80%.
- **Realistic Mock Exam** — 50 questions, 30-minute countdown, pass at 44 correct (CBR rules).

### Progress and persistence

- All progress stored locally in `window.localStorage` under `dts.v1.progress` (schema version 1).
- Per-module retention: most recent 20 attempts.
- Aggregates (completed count, distinct questions practiced, weakest area, best %, attempt count) are derived on read.
- Graceful fallback to in-memory store if `localStorage` is unavailable or throws.
- Global **Reset progress** with confirmation on the Home page.

### Content totals

| Item | Count |
| --- | --- |
| Modules (total) | 14 |
| Modules (quiz-enabled) | 12 |
| Lessons | 49 |
| Questions | 196 |

## Phase history

The path to v1, summarized at a high level:

- **Phase 0–1** — Project scaffold, routing, module/lesson rendering.
- **Phase 2** — In-memory normal quiz (started with `signs` only).
- **Phase 3** — `localStorage`-backed progress store with schema versioning.
- **Phase 4** — Mistake Review.
- **Phase 5** — Quick Sprint with wall-time timer.
- **Phase 6** — Topic Deep Dive.
- **Phase 7–9** — Mock Exam (practice mode, then mode framework).
- **Phase 10** — Front-end polish: empty states, focus, mobile, CTA consistency.
- **Phase 11A / 11B** — Content expansion across special roads, safe driving, vehicle knowledge, legislation, eco driving, advanced hazard prediction.
- **Phase 12** — Content balancing across all 11 expansion modules.
- **Phase 13** — Realistic Mock Exam (50 q / 30 min / 44 to pass).
- **Phase 14** — v1 release readiness (this release: documentation, manual QA checklist, version alignment, lint/build verification).

## Known limitations

- **No accounts or sync.** Clearing browser storage clears all progress. There is no cloud backup, no export/import.
- **English only.** The UI and content are not localized.
- **No images, audio, or video** in any lesson or question.
- **One placeholder module** (`special-users`) ships without lessons or quizzes.
- **No automated test suite.** Verification is via ESLint, Vite build, and the [manual QA checklist](manual-qa-checklist.md).
- **No PWA / installable offline mode.** The app is static and small, so it works offline once cached by the browser, but there is no service worker or manifest.
- **No analytics or telemetry.**
- **Single-user, single-device.** Multiple browsers or devices each keep independent progress.

## Future roadmap (high level, not committed)

These are areas the v1 architecture leaves room for, listed for context only. None are scheduled and none are implemented in this release:

- Additional content for the two placeholder modules
- Localization (Dutch, possibly others)
- Optional images / diagrams in lessons and questions
- Export / import of local progress
- Spaced-repetition scheduling for Mistake Review
- PWA install / offline manifest
- Accessibility audit pass

## Verification

Before tagging v1.0.0:

- `npm run lint` — clean
- `npm run build` — clean
- Walked the [manual QA checklist](manual-qa-checklist.md) in a recent build of Chrome
