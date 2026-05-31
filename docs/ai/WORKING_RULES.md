# Dutch Theory Sprint V2 — Working Rules

## Core workflow
Use this project workflow by default:
1. Inspect the repository and current state first
2. Propose a bounded phase before implementation
3. Stop and wait for approval
4. After approval, implement only within the approved scope
5. Verify the result
6. Report the final delivery in a precise structured summary

## Phase design rules
- Prefer small, reviewable phases
- Prefer additive improvements over rewrites
- Avoid mixing unrelated concerns in one phase
- Split infrastructure changes from UI/content changes when that reduces risk
- Keep blast radius small
- Preserve existing working flows unless explicitly approved otherwise

## Scope discipline
Unless explicitly approved, do not:
- rewrite the app
- redesign the whole UI
- introduce backend or auth
- add cross-device sync
- change schema broadly
- touch unrelated modules/files
- change quiz engine behavior
- add new dependencies casually

## Preferred implementation style
- Reuse existing patterns where sensible
- Keep content schema stable unless change is clearly necessary
- Prefer local, minimal fixes
- Avoid broad refactors hidden inside feature work
- If a proposed refactor is optional, call it out explicitly

## Reporting requirements after implementation
Always report:
- exact files changed
- whether anything differed from approved scope
- lint status
- build status
- browser smoke results if relevant
- commit hash
- whether push to `origin/main` succeeded

## Verification expectations
- Run `npm run lint` when code changes warrant it
- Run `npm run build` for product/content changes unless the phase is explicitly read-only
- Run focused browser/manual smoke checks when UI behavior or rendering is affected
- Keep verification proportional to the phase

## Product strategy preferences
- Prioritize user value over theoretical elegance
- Prefer content completeness before decorative improvements
- Prefer usability and clarity before richer visuals
- Before broad visual rollout, ensure infrastructure is safe enough to scale
- Before sync, harden local storage and migration behavior

## How proposals should be written
Good proposals should include:
- exact scope
- exact files likely to change
- required constraints
- acceptance criteria
- risks and scope boundaries
- explicit out-of-scope items
- expected verification

## How recommendations should be framed
When giving roadmap advice, distinguish between:
- do now
- do soon
- do later
- not worth prioritizing yet
