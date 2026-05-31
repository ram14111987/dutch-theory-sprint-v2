# Dutch Theory Sprint V2 — Next Phase Template

Use this template when starting a new bounded phase with Claude or another coding assistant.

---

## Standard prompt template

```text
Repository: https://github.com/ram14111987/dutch-theory-sprint-v2

Before doing anything else, read these project context files first:
- docs/ai/PROJECT_SUMMARY.md
- docs/ai/WORKING_RULES.md
- docs/ai/PHASE_HISTORY.md

Then inspect the repository directly.

Current confirmed state:
- [Insert latest completed phase here]
- [Insert latest relevant commit or current branch state if useful]
- [Insert any latest totals, counts, or important status notes]

Objective:
[Describe the single next objective clearly.]

Do not start implementation yet.

First propose the next phase as a tightly bounded change.

The proposal must include:
- exact scope
- exact files likely to change
- whether any schema/storage/content-model change is required
- acceptance criteria
- risks and scope boundaries
- what must explicitly remain out of scope
- what verification should be run

Important constraints:
- keep the phase small, reviewable, and additive
- do not rewrite the app
- do not broaden scope beyond the stated objective
- split the work into smaller phases if needed
- stop and wait for my approval before implementation
```

---

## Example: bug fix / polish phase

```text
Repository: https://github.com/ram14111987/dutch-theory-sprint-v2

Before doing anything else, read these project context files first:
- docs/ai/PROJECT_SUMMARY.md
- docs/ai/WORKING_RULES.md
- docs/ai/PHASE_HISTORY.md

Then inspect the repository directly.

Current confirmed state:
- Phase 21 complete and pushed
- total question count is 328
- current focus is short-term polish before broader visual rollout

Objective:
Propose a small UI polish / infrastructure phase.

Do not start implementation yet.

First propose the next phase as a tightly bounded change.

The proposal must include:
- exact scope
- exact files likely to change
- whether the fix is purely UI, infrastructure, or storage-related
- acceptance criteria
- risks and scope boundaries
- what must explicitly remain out of scope
- required browser/manual smoke checks

Important constraints:
- keep the phase small, reviewable, and additive
- no broad visual rollout in this phase
- no backend/auth/sync work
- no schema redesign unless absolutely necessary
- stop and wait for my approval before implementation
```

---

## Example: content completion phase

```text
Repository: https://github.com/ram14111987/dutch-theory-sprint-v2

Before doing anything else, read these project context files first:
- docs/ai/PROJECT_SUMMARY.md
- docs/ai/WORKING_RULES.md
- docs/ai/PHASE_HISTORY.md

Then inspect the repository directly.

Current confirmed state:
- [Insert current latest completed phase]
- [Insert current total question count]

Objective:
Propose a bounded content-completion phase for [module name] only.

Do not start implementation yet.

The proposal must include:
- whether the module is missing lessons, questions, linkage, quiz enablement, or is merely thin
- exact scope
- exact files likely to change
- expected lesson/question counts after completion
- whether scenario-based questions should be added
- acceptance criteria
- risks and boundaries
- what must remain explicitly out of scope

Important constraints:
- keep the phase limited to one module unless repo inspection proves otherwise
- prefer existing schema only
- no UI redesign
- no broader visual rollout
- stop and wait for my approval before implementation
```

---

## Example: post-implementation verification prompt

```text
Repository: https://github.com/ram14111987/dutch-theory-sprint-v2

Current confirmed state:
- [Insert approved phase and scope]

First verify whether the implementation stayed within the approved scope.
Do not make any changes unless a real defect is found.

Check:
- approved files changed only
- expected counts/totals
- expected behavior in the running app where relevant
- no unintended scope expansion

If no issues are found:
- do not change any files
- report verification only

If issues are found:
- fix only the minimal files required
- keep the fix tightly scoped
- run lint/build if relevant
- commit directly to main
- push to origin/main

After finishing, report exactly:
- whether verification passed or failed
- which cases were checked
- whether any issues were found
- exact files changed, if any
- lint status, if run
- build status, if run
- commit hash, if any
- whether push to origin/main succeeded
- whether anything differed from approved scope
```

---

## Suggested habit

For each new phase:
1. Update `docs/ai/PHASE_HISTORY.md` after the last phase is complete.
2. Paste the standard prompt template.
3. Replace the placeholders with the current objective.
4. Get the proposal first.
5. Approve or tighten the proposal.
6. Only then allow implementation.
