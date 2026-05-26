// Pure JS localStorage-backed progress store. No React imports.
// Persistence key: dts.v1.progress
// Schema version: 1 (additive — see normalize() for fields tolerated as missing)
// Falls back to in-memory storage if localStorage is unavailable, parse fails,
// or a write throws (e.g. QuotaExceededError).

export const STORAGE_KEY = 'dts.v1.progress';
export const SCHEMA_VERSION = 1;
export const COMPLETION_THRESHOLD = 80;
export const ATTEMPTS_PER_MODULE_CAP = 20;
export const EXAM_ATTEMPTS_CAP = 20;

function emptyState() {
  return { version: SCHEMA_VERSION, attemptsByModule: {}, examAttempts: [] };
}

let memoryState = emptyState();
let usingMemoryFallback = false;

function getStorage() {
  try {
    if (typeof window === 'undefined') return null;
    const ls = window.localStorage;
    if (!ls) return null;
    return ls;
  } catch {
    return null;
  }
}

function normalize(raw) {
  if (!raw || typeof raw !== 'object') return emptyState();
  if (raw.version !== SCHEMA_VERSION) return emptyState();
  const attemptsByModule = raw.attemptsByModule;
  const cleaned = {};
  if (attemptsByModule && typeof attemptsByModule === 'object') {
    for (const [slug, attempts] of Object.entries(attemptsByModule)) {
      if (Array.isArray(attempts)) {
        cleaned[slug] = attempts.filter((a) => a && typeof a === 'object');
      }
    }
  }
  // examAttempts is additive — older payloads without this field still load.
  const exam = Array.isArray(raw.examAttempts)
    ? raw.examAttempts.filter((a) => a && typeof a === 'object')
    : [];
  return { version: SCHEMA_VERSION, attemptsByModule: cleaned, examAttempts: exam };
}

export function loadAll() {
  if (usingMemoryFallback) {
    return clone(memoryState);
  }
  const ls = getStorage();
  if (!ls) {
    usingMemoryFallback = true;
    return clone(memoryState);
  }
  try {
    const raw = ls.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    return normalize(parsed);
  } catch {
    usingMemoryFallback = true;
    return clone(memoryState);
  }
}

export function saveAll(state) {
  const next = normalize(state);
  if (usingMemoryFallback) {
    memoryState = next;
    return next;
  }
  const ls = getStorage();
  if (!ls) {
    usingMemoryFallback = true;
    memoryState = next;
    return next;
  }
  try {
    ls.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    usingMemoryFallback = true;
    memoryState = next;
    return next;
  }
}

function clone(state) {
  return {
    version: state.version,
    attemptsByModule: Object.fromEntries(
      Object.entries(state.attemptsByModule).map(([k, v]) => [k, v.slice()]),
    ),
    examAttempts: Array.isArray(state.examAttempts) ? state.examAttempts.slice() : [],
  };
}

export function recordAttempt(attempt) {
  if (!attempt || !attempt.moduleSlug) return loadAll();
  const state = loadAll();
  const slug = attempt.moduleSlug;
  const list = state.attemptsByModule[slug] ? state.attemptsByModule[slug].slice() : [];
  list.push(attempt);
  // Cap per mode so attempts in one mode can't evict the history that
  // backs another (quiz history backs completed status, etc.).
  const quizAttempts = list.filter(isQuizAttempt).slice(-ATTEMPTS_PER_MODULE_CAP);
  const reviewAttempts = list.filter(isReviewAttempt).slice(-ATTEMPTS_PER_MODULE_CAP);
  const sprintAttempts = list.filter(isSprintAttempt).slice(-ATTEMPTS_PER_MODULE_CAP);
  const keep = new Set([...quizAttempts, ...reviewAttempts, ...sprintAttempts]);
  // Preserve overall chronological order.
  state.attemptsByModule[slug] = list.filter((a) => keep.has(a));
  return saveAll(state);
}

export function getAttemptsForModule(slug) {
  const state = loadAll();
  return state.attemptsByModule[slug] ? state.attemptsByModule[slug].slice() : [];
}

// Attempts without an explicit mode are legacy v1 quiz attempts.
function isQuizAttempt(a) {
  return !a.mode || a.mode === 'quiz';
}

function isReviewAttempt(a) {
  return a && a.mode === 'review';
}

function isSprintAttempt(a) {
  return a && a.mode === 'sprint';
}

export function getQuizAttemptsForModule(slug) {
  return getAttemptsForModule(slug).filter(isQuizAttempt);
}

export function getReviewAttemptsForModule(slug) {
  return getAttemptsForModule(slug).filter(isReviewAttempt);
}

export function getSprintAttemptsForModule(slug) {
  return getAttemptsForModule(slug).filter(isSprintAttempt);
}

export function getLatestAttempt(slug, { mode } = {}) {
  const list = getAttemptsForModule(slug);
  const filtered = mode
    ? list.filter((a) => (mode === 'quiz' ? isQuizAttempt(a) : a.mode === mode))
    : list;
  if (!filtered.length) return null;
  return filtered[filtered.length - 1];
}

// Stats reported here describe the user's quiz progress on a module —
// completed status and best percentage are computed from quiz attempts
// only, matching Phase 3 semantics. Review attempts are tracked
// separately and do not change module completion.
export function getModuleStats(slug) {
  const allAttempts = getAttemptsForModule(slug);
  const attempts = allAttempts.filter(isQuizAttempt);
  if (!attempts.length) {
    return {
      slug,
      attemptCount: 0,
      bestPercentage: 0,
      latestPercentage: 0,
      completed: false,
      distinctQuestions: 0,
    };
  }
  let best = 0;
  for (const a of attempts) {
    if (typeof a.percentage === 'number' && a.percentage > best) best = a.percentage;
  }
  // distinctQuestions counts every question the user has answered in any
  // mode (quiz or review) so review practice contributes to that stat.
  const seenQuestions = new Set();
  for (const a of allAttempts) {
    if (Array.isArray(a.perQuestion)) {
      for (const pq of a.perQuestion) {
        if (pq && pq.questionId) seenQuestions.add(pq.questionId);
      }
    }
  }
  const latest = attempts[attempts.length - 1];
  return {
    slug,
    attemptCount: attempts.length,
    bestPercentage: best,
    latestPercentage: typeof latest.percentage === 'number' ? latest.percentage : 0,
    completed: best >= COMPLETION_THRESHOLD,
    distinctQuestions: seenQuestions.size,
  };
}

export function getGlobalStats() {
  const state = loadAll();
  const moduleSlugs = Object.keys(state.attemptsByModule);
  const distinct = new Set();
  let totalAttempts = 0;
  let completedModules = 0;
  let weakest = null; // { slug, bestPercentage, attemptCount }
  const perModule = [];

  for (const slug of moduleSlugs) {
    const stats = getModuleStats(slug);
    if (stats.attemptCount === 0) continue;
    totalAttempts += stats.attemptCount;
    if (stats.completed) completedModules += 1;
    perModule.push(stats);
    const attempts = state.attemptsByModule[slug];
    for (const a of attempts) {
      if (Array.isArray(a.perQuestion)) {
        for (const pq of a.perQuestion) {
          if (pq && pq.questionId) distinct.add(pq.questionId);
        }
      }
    }
    if (!weakest || stats.bestPercentage < weakest.bestPercentage) {
      weakest = stats;
    }
  }

  return {
    completedModules,
    distinctQuestions: distinct.size,
    totalAttempts,
    weakestModuleSlug: weakest ? weakest.slug : null,
    weakestBestPercentage: weakest ? weakest.bestPercentage : 0,
    perModule,
  };
}

// --- Exam attempt history (Phase 20, additive) ----------------------------
// Mock exam attempts are stored top-level (not per-module) because the exam
// pool spans modules. Each entry is a small summary record, capped at
// EXAM_ATTEMPTS_CAP (oldest dropped first), to mirror per-module caps.

export function recordExamAttempt(attempt) {
  if (!attempt || typeof attempt !== 'object') return loadAll();
  const state = loadAll();
  const list = Array.isArray(state.examAttempts) ? state.examAttempts.slice() : [];
  list.push(attempt);
  state.examAttempts = list.slice(-EXAM_ATTEMPTS_CAP);
  return saveAll(state);
}

export function getExamAttempts({ examMode } = {}) {
  const state = loadAll();
  const list = Array.isArray(state.examAttempts) ? state.examAttempts.slice() : [];
  return examMode ? list.filter((a) => a && a.examMode === examMode) : list;
}

export function getBestExamPercentage(examMode) {
  const list = getExamAttempts(examMode ? { examMode } : undefined);
  let best = 0;
  for (const a of list) {
    if (typeof a.percentage === 'number' && a.percentage > best) best = a.percentage;
  }
  return best;
}

export function resetAll() {
  memoryState = emptyState();
  const ls = getStorage();
  if (ls) {
    try {
      ls.removeItem(STORAGE_KEY);
    } catch {
      usingMemoryFallback = true;
    }
  }
  return emptyState();
}

export function isUsingMemoryFallback() {
  return usingMemoryFallback;
}

export function makeAttemptId() {
  return `att-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
