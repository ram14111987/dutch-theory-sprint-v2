// Pure helpers for Mock Exam Foundation. No React, no storage/localStorage.
// A mock exam draws a fixed number of questions randomly from the pooled
// question banks of every quiz-enabled module, deduplicated by question id.
// Attempts are kept in-memory only and never written to the progress store.

import { shuffle } from './selection.js';
import { isAnswerCorrect } from './scoring.js';

export const MOCK_EXAM_SIZE = 25;
export const MOCK_EXAM_PASS_PERCENTAGE = 80;

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
// threshold.
export function scoreMockExam(entries, answers, { passPercentage = MOCK_EXAM_PASS_PERCENTAGE } = {}) {
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
  const passed = total > 0 && percentage >= passPercentage;
  return { correct, total, percentage, passed, passPercentage, perQuestion };
}
