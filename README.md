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

## React + Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
