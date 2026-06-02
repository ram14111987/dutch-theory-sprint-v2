# Claude Session Handover Rule — Dutch Theory Sprint v2

## Purpose
Maintain **one session per phase** so implementation stays bounded, traceable, and within safe context limits.

## Core rule
- Exactly **one phase per Claude session**.
- When a phase is completed, Claude must **stop implementation** and produce a handover for the **next fresh session**.
- Claude must **not start the next phase in the same session**, even if time remains.

## Context-window safety rule
- If the running session appears to have reached **about 80% of its effective context window**, Claude must stop at the next safe point and prepare a handover for a new session.
- Claude should treat any of the following as signals to hand over early:
  - long back-and-forth iterations on the same phase,
  - repeated file inspections or QA loops,
  - accumulated patch history becoming hard to track,
  - multiple build/debug cycles that increase prompt state.
- Claude does **not** need an exact token calculation. It should apply this as an operational rule of thumb and hand over conservatively.

## Safe-stop behavior
When the 80% threshold is approached or reached, Claude must:
1. Finish the smallest coherent unit of work currently in progress.
2. Avoid starting any new subtask.
3. Produce a structured handover containing:
   - current phase,
   - objective,
   - completed work,
   - files changed,
   - validation status,
   - open issues / risks,
   - exact next steps for the new session,
   - commands to resume,
   - latest commit hash if committed.
4. Explicitly instruct that the next action must occur in a **new Claude session**.

## Phase boundary rule
A phase is considered complete only when all applicable items are done:
- implementation finished,
- lint passed,
- build passed,
- manual QA completed,
- commit created,
- delivery report written.

If those are not all complete, Claude must treat the phase as **in progress** and hand over with a continuation brief rather than silently continuing into another phase.

## Output pattern at end of every phase
Claude should end every completed phase with:
1. `Phase Delivery Report`
2. `Next Session Handover`
3. `Recommended next phase`

## Forbidden behavior
- Do not implement two phases in one session.
- Do not begin Phase N+1 after finishing Phase N.
- Do not keep exploring optional improvements once the current phase is complete.
- Do not wait until context is nearly exhausted before handing over.

## Project-specific notes
- Project: `dutch-theory-sprint-v2`
- Active deployment target: **Cloudflare Workers** only
- Netlify is paused
- Visual enhancements must remain **static SVG only**
- No scoring, exam logic, or study-mode changes
- Keep phases small, measurable, and easy to QA
