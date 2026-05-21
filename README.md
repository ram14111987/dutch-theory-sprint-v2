# Dutch Theory Sprint v2

A React + Vite scaffold for practicing Dutch driving theory.

Routing uses `react-router-dom`'s `HashRouter`, so all routes live under `#/`.

## Routes

- `#/` — home (study modes, modules, progress placeholder)
- `#/modules` — list of all modules
- `#/modules/:slug` — module detail (lessons + Start quiz when available)
- `#/lessons/:slug` — single lesson
- `#/quiz/:slug` — in-memory randomized 5-question quiz (Phase 2; only `signs` is enabled)
- `#/quiz/:slug/results` — quiz results page

## Quiz scaffold (Phase 2)

The signs module ships with an in-memory quiz. From the home page or modules
list, open "Road signs and markings" and click **Start quiz** (or visit
`#/quiz/signs`). Each session is a fresh randomized 5-question set drawn from
`src/content/questions/signs.json`. Answers, scoring, and the results page are
ephemeral — nothing is persisted.

Pure quiz logic lives in `src/quiz/{engine,selection,scoring}.js` and has no
React imports.

## Progress and persistence (Phase 3)

Quiz results are persisted locally so progress survives reloads.

- **Storage:** `window.localStorage` under the key `dts.v1.progress`.
- **Schema version:** `1`. If a stored payload has a different version or
  fails to parse, it is treated as empty and replaced on the next write.
- **Privacy:** All data lives in the user's browser. Nothing is uploaded; there
  is no backend, sync, account, or analytics.
- **What is stored:** Per-module attempts, each with `id`, `moduleSlug`,
  `finishedAt`, `correct`, `total`, `percentage`, and a per-question
  breakdown (`questionId`, `selectedChoiceId`, `correct`).
- **Retention:** The most recent **20 attempts per module** are kept; older
  ones are dropped on write.
- **Aggregates** (completed count, distinct questions practiced, weakest
  area, best %, attempt count) are derived from attempts on read — there is
  no separate aggregate write path.
- **Completion threshold:** A module is "completed" when its best attempt is
  ≥ **80%**.
- **Reset:** The Home page has a **Reset progress** button (with confirm)
  that clears all attempts globally. There is no per-module reset.
- **Fallback:** If `localStorage` is unavailable, throws on read/write, or
  hits a quota error, the store transparently falls back to an in-memory copy
  for the rest of the session. Progress will appear to work normally but will
  not persist across reloads.

The store lives in `src/storage/progressStore.js`. It is pure JS with no React
imports and is kept outside `src/quiz/*.js`.

## React + Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
