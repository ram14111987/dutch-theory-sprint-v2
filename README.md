# Dutch Theory Sprint v2

A React + Vite single-page app for practicing the Dutch (CBR) car driving theory exam. All data lives in the browser — there is no backend, account, sync, or analytics.

**Status:** v1.0.0. Phase 0 through Phase 13 are complete and pushed to `main`.

## Content

- **12 quiz-enabled modules** (plus 2 placeholder modules — `hazard-perception` and `special-users` — that intentionally have no quiz yet)
- **49 total lessons**
- **196 total questions** across the quiz-enabled modules

All content (modules, lessons, questions) is bundled JSON under `src/content/`.

## Study modes

| Mode | Route | Size | Timer | Pass | Notes |
| --- | --- | --- | --- | --- | --- |
| Normal quiz | `#/quiz/:slug` | 5 questions | none | ≥ 80% best attempt completes a module | Per-module, randomized from that module's bank |
| Mistake Review | `#/review`, `#/review/:slug` | up to 10 | none | informational | Drawn only from questions you previously answered wrong (latest-answer-wins) |
| Quick Sprint | `#/sprint` | 10 mixed | 120 s | informational | Mixed pool across all quiz-enabled modules; unanswered = incorrect on timeout |
| Topic Deep Dive | `#/topics`, `#/topics/:slug`, `#/topics/:slug/practice` | per-topic | none | informational | Focused practice for a single module's full bank |
| Practice Mock Exam | `#/exam?mode=practice` | 25 | none | ≥ 80% | Mixed pool across modules |
| Realistic Mock Exam | `#/exam?mode=realistic` | 50 | 30 minutes | ≥ 44 correct | CBR-style: 50 questions / 30 min / 44 to pass |

Routing uses `react-router-dom`'s `HashRouter`, so all routes live under `#/`.

## Install and run

Requires Node.js 18+ (Node 20+ recommended).

```bash
npm install
npm run dev       # start Vite dev server with HMR
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint      # run ESLint
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Routes

- `#/` — home (study modes, modules, progress summary)
- `#/modules`, `#/modules/:slug` — module list and detail
- `#/lessons/:slug` — single lesson
- `#/quiz/:slug`, `#/quiz/:slug/results` — normal quiz
- `#/review`, `#/review/:slug`, `#/review/:slug/results` — Mistake Review
- `#/sprint`, `#/sprint/results` — Quick Sprint
- `#/topics`, `#/topics/:slug`, `#/topics/:slug/practice`, `#/topics/:slug/results` — Topic Deep Dive
- `#/exam`, `#/exam/results` — Mock Exam (practice or realistic via `?mode=`)

## Progress and persistence

Quiz, sprint, review, topic, and mock-exam attempts are persisted locally so progress survives reloads.

- **Storage:** `window.localStorage` under the key `dts.v1.progress`.
- **Schema version:** `1`. A different version or unparseable payload is treated as empty and replaced on next write.
- **Privacy:** All data lives in the user's browser. Nothing is uploaded; there is no backend, sync, account, or analytics.
- **What is stored:** Per-module attempts with `id`, `moduleSlug`, `mode`, `finishedAt`, `correct`, `total`, `percentage`, and a per-question breakdown (`questionId`, `selectedChoiceId`, `correct`).
- **Retention:** The most recent **20 attempts per module** are kept; older ones are dropped on write.
- **Aggregates** (completed count, distinct questions practiced, weakest area, best %, attempt count) are derived from attempts on read.
- **Completion threshold:** A module is "completed" when its best normal-quiz attempt is ≥ **80%**.
- **Reset:** The Home page has a **Reset progress** button (with confirm) that clears all attempts globally. No per-module reset.
- **Fallback:** If `localStorage` is unavailable, throws, or hits quota, the store transparently falls back to an in-memory copy for the rest of the session.

The store lives in `src/storage/progressStore.js` — pure JS, no React imports, kept outside `src/quiz/*.js`.

## Mode-specific behavior notes

- **Sprint** uses elapsed wall time (`startedAt + Date.now()`) so the countdown does not drift if the tab is throttled. Sprint attempts are tagged by **source module** (one stored attempt per source module touched in a sprint) and share a `finishedAt`. Sprint attempts do **not** count toward completed-module status or best normal-quiz score, but they **do** contribute to distinct questions practiced and feed Mistake Review.
- **Mistake Review** derives the wrong-question pool using latest-answer-wins across all attempt modes.
- **Mock Exam — Realistic** auto-submits on timeout; unanswered questions count as incorrect. A guarded finalize prevents double-submit.
- **Topic Deep Dive** practices a single module's full question bank without affecting the normal-quiz completion threshold.

Pure logic for each mode lives in `src/quiz/` (`engine.js`, `selection.js`, `scoring.js`, `sprint.js`, `topic.js`, `mistakes.js`, `mockExam.js`) and has no React or storage imports.

## Known limitations (v1)

- No accounts, login, sync, or cloud backup — clearing browser storage clears all progress.
- No images, audio, or video in lessons or questions.
- Two placeholder modules (`hazard-perception`, `special-users`) have no lessons or quiz yet.
- No localization — UI and content are English-only.
- No automated test suite. Verification is via lint, build, and the [manual QA checklist](docs/manual-qa-checklist.md).
- No PWA / offline install manifest. Works offline once loaded only because the SPA bundle is small and static.
- No analytics or telemetry of any kind.

## Documentation

- [`docs/manual-qa-checklist.md`](docs/manual-qa-checklist.md) — pre-release manual QA checklist
- [`docs/release-notes-v1.md`](docs/release-notes-v1.md) — v1.0.0 release notes

## Tech stack

- React 19 + Vite 8
- `react-router-dom` 7 (HashRouter)
- ESLint 10 with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`
- No CSS framework — plain CSS in `src/App.css` and `src/index.css`
