// Pure helpers for deriving the current set of "mistakes" from persisted
// attempts. No React, no direct localStorage access — callers pass in
// attempts arrays and question banks.
//
// A question is currently a mistake if the user's MOST RECENT attempt on
// that question (across both quiz and review modes) was incorrect.
// Latest-answer-wins: a later correct answer clears it; a later wrong
// answer puts it back. Questions never attempted are not mistakes.

import { isAnswerCorrect } from './scoring.js';

export const REVIEW_SESSION_CAP = 10;

// Returns a Map<questionId, { questionId, lastCorrect, lastAt, lastSelectedChoiceId }>
// derived from the given attempts list (newest attempts may appear last;
// we walk in order and overwrite, so the final entry is the latest).
function latestPerQuestion(attempts) {
  const latest = new Map();
  if (!Array.isArray(attempts)) return latest;
  for (const a of attempts) {
    if (!a || !Array.isArray(a.perQuestion)) continue;
    const at = a.finishedAt || '';
    for (const pq of a.perQuestion) {
      if (!pq || !pq.questionId) continue;
      latest.set(pq.questionId, {
        questionId: pq.questionId,
        lastCorrect: Boolean(pq.correct),
        lastAt: at,
        lastSelectedChoiceId: pq.selectedChoiceId ?? null,
      });
    }
  }
  return latest;
}

// Returns the list of question objects (from the supplied bank) that are
// currently mistakes for this module, ordered by the bank's natural order.
export function getMistakeQuestions(attempts, bank) {
  if (!Array.isArray(bank) || bank.length === 0) return [];
  const latest = latestPerQuestion(attempts);
  return bank.filter((q) => {
    const entry = latest.get(q.id);
    return entry && !entry.lastCorrect;
  });
}

export function getMistakeCount(attempts, bank) {
  return getMistakeQuestions(attempts, bank).length;
}

// Build a review session: at most REVIEW_SESSION_CAP questions, drawn from
// the current mistakes for the module. Order preserves bank order.
export function buildReviewSession(attempts, bank, cap = REVIEW_SESSION_CAP) {
  const mistakes = getMistakeQuestions(attempts, bank);
  return mistakes.slice(0, cap);
}

// Given an attempt object (any mode), determine which previously-mistaken
// questions would be cleared by it. Used only for tests/diagnostics — the
// derivation in getMistakeQuestions already does latest-answer-wins.
export function questionsClearedBy(attempt, priorAttempts, bank) {
  if (!attempt || !Array.isArray(attempt.perQuestion)) return [];
  const before = new Set(
    getMistakeQuestions(priorAttempts, bank).map((q) => q.id),
  );
  const cleared = [];
  for (const pq of attempt.perQuestion) {
    if (!pq || !pq.questionId) continue;
    if (before.has(pq.questionId) && pq.correct) cleared.push(pq.questionId);
  }
  return cleared;
}

// Re-export for convenience so callers don't need to import scoring directly
// just to score a single answer when building per-question records.
export { isAnswerCorrect };
