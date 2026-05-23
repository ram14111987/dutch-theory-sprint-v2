// Pure helpers for Mock Exam Foundation. No React, no storage/localStorage.
// A mock exam draws a fixed number of questions randomly from the pooled
// question banks of every quiz-enabled module, deduplicated by question id.
// Attempts are kept in-memory only and never written to the progress store.
//
// Two modes:
//   - practice:  25 questions, no timer, pass at 80% (existing behaviour)
//   - realistic: 50 questions, 30-minute timer, pass at 44 correct
//     (mirrors the renewed CBR B theorie-examen rules effective 7 April 2025;
//     verified via the cbr.nl 'vernieuwd theorie-examen B-rijbewijs' news page).

import { shuffle } from './selection.js';
import { isAnswerCorrect } from './scoring.js';

export const MOCK_EXAM_MODES = {
  practice: {
    id: 'practice',
    label: 'Practice Mock Exam',
    size: 25,
    durationSeconds: null,
    passPercentage: 80,
    passCorrect: null,
  },
  realistic: {
    id: 'realistic',
    label: 'Realistic Mock Exam',
    size: 50,
    durationSeconds: 30 * 60,
    passPercentage: null,
    passCorrect: 44,
  },
};

// Back-compat exports used by existing call sites.
export const MOCK_EXAM_SIZE = MOCK_EXAM_MODES.practice.size;
export const MOCK_EXAM_PASS_PERCENTAGE = MOCK_EXAM_MODES.practice.passPercentage;

export function getMockExamMode(id) {
  return MOCK_EXAM_MODES[id] || MOCK_EXAM_MODES.practice;
}

// Pool is an array of { question, moduleSlug, moduleTitle } entries gathered
// from every quiz-enabled module (see getAllQuizQuestions). Deduplicates by
// question id (first occurrence wins) before shuffling and slicing.
export function buildMockExamQuestions(pool, { size = MOCK_EXAM_SIZE, rng = Math.random } = {}) {
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

// Score a mock exam. Unanswered questions count as incorrect. Returns
// aggregate score, per-question records, and a pass flag at the configured
// threshold (either a percentage or a minimum correct count).
export function scoreMockExam(
  entries,
  answers,
  {
    passPercentage = MOCK_EXAM_PASS_PERCENTAGE,
    passCorrect = null,
  } = {},
) {
  const total = entries.length;
  let correct = 0;
  const perQuestion = [];
  for (const entry of entries) {
    const q = entry.question;
    const selected = answers[q.id] ?? null;
    const ok = isAnswerCorrect(q, selected);
    if (ok) correct += 1;
    perQuestion.push({ questionId: q.id, selectedChoiceId: selected, correct: ok });
  }
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
  let passed;
  if (passCorrect != null) {
    passed = total > 0 && correct >= passCorrect;
  } else {
    passed = total > 0 && percentage >= passPercentage;
  }
  return {
    correct,
    total,
    percentage,
    passed,
    passPercentage,
    passCorrect,
    perQuestion,
  };
}

// Wall-clock countdown for timed exams. Mirrors the sprint helpers so the
// timer keeps accurate time even if setInterval is throttled.
export function remainingSeconds(startedAt, durationSeconds, now = Date.now()) {
  if (!durationSeconds) return null;
  const elapsed = Math.max(0, now - startedAt);
  const remaining = durationSeconds * 1000 - elapsed;
  if (remaining <= 0) return 0;
  return Math.ceil(remaining / 1000);
}

export function elapsedSeconds(startedAt, now = Date.now()) {
  return Math.max(0, Math.floor((now - startedAt) / 1000));
}

export function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}
