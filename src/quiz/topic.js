// Pure helpers for Topic Deep Dive. No React, no storage/localStorage.
// A topic session draws every question from a single quiz-enabled module,
// shuffled, no duplicates. Attempts are kept in-memory only and never written
// to the progress store.

import { shuffle } from './selection.js';
import { isAnswerCorrect } from './scoring.js';

// Build a topic question list from a module question bank. Deduplicates by
// question id (first occurrence wins) and shuffles. Uses every question
// available for the module.
export function buildTopicQuestions(bank, { rng = Math.random } = {}) {
  if (!Array.isArray(bank) || bank.length === 0) return [];
  const seen = new Set();
  const deduped = [];
  for (const q of bank) {
    if (!q || !q.id) continue;
    if (seen.has(q.id)) continue;
    seen.add(q.id);
    deduped.push(q);
  }
  return shuffle(deduped, rng);
}

// Score a topic session. Unanswered questions count as incorrect.
export function scoreTopic(questions, answers) {
  const total = questions.length;
  let correct = 0;
  for (const q of questions) {
    const selected = answers[q.id] ?? null;
    if (isAnswerCorrect(q, selected)) correct += 1;
  }
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, percentage };
}
