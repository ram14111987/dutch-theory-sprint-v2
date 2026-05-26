# Sync architecture note (future, non-binding)

This is a short scoping note for a possible future phase that adds cross-device
sync of local progress. It is **non-binding**: nothing in the current app is
designed against it, no API is defined, and no provider has been chosen.

## Minimum future requirements (only)

- Preserve the existing additive local schema (`dts.v1.progress`, schema
  version `1`) as the source of truth on each device. Sync layers must read
  and write the same shape (`attemptsByModule`, top-level `examAttempts`).
- Support last-write-wins per attempt id at minimum; attempts already carry
  stable ids (`makeAttemptId`) and a `finishedAt` timestamp, so a future merge
  strategy can rely on them.
- Allow the app to keep working with no network and no account — sync must be
  opt-in, layered on top of local storage, not a replacement for it.
- Capping rules (per-module and exam-attempt caps) remain authoritative on the
  local side; sync must not resurrect dropped attempts past those caps.

## Explicitly out of scope here

- API design / endpoint shape
- Auth provider selection (no account model is implied today)
- Backend implementation details beyond the high-level needs above
- Conflict UI, retention policy beyond current caps, or migration to a v2 schema

If/when sync is picked up, this note should be replaced by a real design doc.
