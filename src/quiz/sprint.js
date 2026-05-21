// Pure helpers for Quick Sprint mode. No React, no storage/localStorage.
// A sprint draws a fixed number of questions from a pooled set of
// quiz-enabled modules, dedupes by question id, shuffles, and answers
// against a fixed countdown.

import { shuffle } from './selection.js';
import { isAnswerCorrect } from './scoring.js';

export const SPRINT_SIZE = 10;
export const SPRINT_DURATION_SECONDS = 120;

// Pool is an array of { question, moduleSlug } entries gathered from
// every quiz-enabled module. We dedupe by question id (first occurrence
// wins) before shuffling and slicing to SPRINT_SIZE.
export function buildSprintQuestions(pool, { size = SPRINT_SIZE, rng = Math.random } = {}) {
  if (!Array.isArray(pool) || pool.length === 0) return [];
  const seen = new Set();
  const deduped = [];
  for (const entry of pool) {
    if (!entry || !entry.question || !entry.question.id) continue;
    if (seen.has(entry.question.id)) continue;
    seen.add(entry.question.id);
    deduped.push(entry);
  }
  const shuffled = shuffle(deduped, rng);
  return shuffled.slice(0, Math.min(size, shuffled.length));
}

export function remainingSeconds(startedAt, durationSeconds = SPRINT_DURATION_SECONDS, now = Date.now()) {
  const elapsed = Math.max(0, now - startedAt);
  const remaining = durationSeconds * 1000 - elapsed;
  if (remaining <= 0) return 0;
  return Math.ceil(remaining / 1000);
}

export function isExpired(startedAt, durationSeconds = SPRINT_DURATION_SECONDS, now = Date.now()) {
  return now - startedAt >= durationSeconds * 1000;
}

// Score a sprint where unanswered questions count as incorrect.
// `entries` is the array returned by buildSprintQuestions; `answers`
// is an object keyed by questionId. Returns aggregate score plus
// per-question records grouped by source module so callers can persist
// one attempt per source module touched.
export function scoreSprint(entries, answers) {
  const total = entries.length;
  let correct = 0;
  const perModule = new Map(); // moduleSlug -> array of perQuestion records

  for (const entry of entries) {
    const q = entry.question;
    const selected = answers[q.id] ?? null;
    const ok = isAnswerCorrect(q, selected);
    if (ok) correct += 1;
    const record = { questionId: q.id, selectedChoiceId: selected, correct: ok };
    const list = perModule.get(entry.moduleSlug) || [];
    list.push(record);
    perModule.set(entry.moduleSlug, list);
  }
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, percentage, perModule };
}
