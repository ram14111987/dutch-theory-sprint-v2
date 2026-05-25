# Manual QA Checklist — Dutch Theory Sprint v1

Use this checklist before tagging a release. Everything here is exercisable in a single browser session against `npm run dev` or `npm run preview`. There is no automated test suite, so this checklist is the source of truth for "ready to ship."

Assume a clean profile: open the app, then click **Reset progress** on the Home page (and confirm) to clear `localStorage` before starting.

## 1. Lint and build

- [ ] `npm install` completes without errors
- [ ] `npm run lint` exits 0 with no warnings
- [ ] `npm run build` completes successfully and emits `dist/`
- [ ] `npm run preview` serves the build and the app loads at the printed URL

## 2. Navigation and shell

- [ ] App loads at `#/` with no console errors or warnings
- [ ] Header / nav links route correctly to Home, Modules, Sprint, Topics, Mock Exam, Review
- [ ] Direct deep-link to a module (e.g. `#/modules/signs`) loads correctly
- [ ] Unknown route (e.g. `#/does-not-exist`) shows the NotFound page
- [ ] Browser **Back** and **Forward** work correctly between routes
- [ ] Page reload preserves the current route (HashRouter)

## 3. Modules and lessons

- [ ] `#/modules` lists all 13 modules (12 quiz-enabled + 1 placeholder)
- [ ] Placeholder module (`special-users`) does not show a "Start quiz" CTA
- [ ] Each quiz-enabled module detail page shows its lessons and a **Start quiz** button
- [ ] Every lesson route (`#/lessons/:slug`) renders the lesson body without errors

## 4. Normal quiz

- [ ] Starting a quiz from a module shows 5 randomized questions
- [ ] Selecting an answer enables progression; correct/incorrect feedback is shown
- [ ] Finishing routes to `#/quiz/:slug/results` with score and per-question breakdown
- [ ] Refreshing the results page does not crash (may redirect home if context cleared — acceptable)
- [ ] After scoring ≥ 80%, the module is marked **completed** on the Home page
- [ ] After scoring < 80% twice, the *best* attempt is the one reflected in progress
- [ ] Wrong answers appear in Mistake Review afterwards

## 5. Mistake Review

- [ ] With zero attempts, `#/review` shows a clear **empty state** ("no mistakes yet" or equivalent)
- [ ] After failing some questions, `#/review` lists modules with mistake counts
- [ ] `#/review/:slug` serves only previously-wrong questions for that module
- [ ] Answering a previously-wrong question correctly in Review removes it from the next Review session (latest-answer-wins)

## 6. Quick Sprint

- [ ] `#/sprint` shows a 10-question mixed session and a 120-second countdown
- [ ] Countdown decrements smoothly; switching tabs and returning does not skip wildly (wall-time based)
- [ ] Letting the timer reach zero auto-submits; unanswered questions count as **incorrect**
- [ ] Manually finishing before timeout produces the same results UX
- [ ] Sprint attempts appear in Mistake Review for the wrong questions

## 7. Topic Deep Dive

- [ ] `#/topics` lists all quiz-enabled modules
- [ ] Each topic overview shows lesson + question count and a **Practice** button
- [ ] Practice runs through that module's question bank and routes to topic results
- [ ] Topic results do not affect the normal-quiz completion threshold

## 8. Mock Exam — Practice mode

- [ ] `#/exam?mode=practice` starts a 25-question untimed exam
- [ ] Results page shows pass/fail at **80%**
- [ ] No countdown timer is visible

## 9. Mock Exam — Realistic mode

- [ ] `#/exam?mode=realistic` starts a **50-question** exam with a **30:00** countdown
- [ ] Countdown ticks once per second and never goes negative
- [ ] Reaching `0:00` auto-submits; unanswered questions count as incorrect
- [ ] Pass threshold is **44 correct out of 50**
- [ ] Manually finishing produces the same results screen
- [ ] Double-clicking **Finish** does not produce duplicate attempts in storage

## 10. Progress and reset

- [ ] Home page shows attempt count, distinct questions practiced, weakest area, and best %
- [ ] Completed-modules count reflects modules with best normal-quiz attempt ≥ 80%
- [ ] **Reset progress** prompts for confirmation
- [ ] After confirm, all aggregates return to zero and `localStorage` key `dts.v1.progress` is empty/absent

## 11. Empty states

- [ ] First-load Home renders with no attempts and shows a sensible empty/welcome state
- [ ] First-load Mistake Review shows its empty state
- [ ] After Reset progress, all surfaces return to their empty states without console errors

## 12. Persistence and privacy

- [ ] After completing a quiz, reloading the tab preserves progress
- [ ] DevTools → Application → Local Storage shows only `dts.v1.progress`
- [ ] No network requests to third parties (DevTools → Network); only static assets served from origin
- [ ] No cookies set by the app

## 13. Storage fallback

- [ ] In DevTools, set `localStorage` to throw (e.g. block site data) and reload — app still functions; attempts persist within the session but are lost on reload

## 14. Mobile and responsive

- [ ] At 375 × 667 (iPhone SE), all primary routes are usable without horizontal scrolling
- [ ] Tap targets (buttons, answer choices, nav links) are large enough to hit comfortably
- [ ] Mock Exam countdown and answer grid remain readable on small screens

## 15. Keyboard and focus

- [ ] `Tab` reaches all interactive elements in a logical order on Home, Module Detail, Quiz, and Mock Exam
- [ ] Focus ring is visible on focused elements
- [ ] `Enter` / `Space` activates focused buttons and answer choices
- [ ] After navigating to a new route, focus is not lost into the void (page is scrollable/focusable)

## 16. Cross-browser sanity

- [ ] Latest Chrome — full pass
- [ ] Latest Firefox — full pass on at least navigation, one quiz, one sprint, and Realistic Mock Exam
- [ ] Latest Safari (if available) — same minimal pass as Firefox

## 17. Console hygiene

- [ ] No errors in the DevTools console during any happy-path flow
- [ ] No React key warnings, hydration warnings, or router warnings
