import modules from './modules.json';
import signsLessons from './lessons/signs.json';
import signsQuestions from './questions/signs.json';
import priorityLessons from './lessons/priority.json';
import priorityQuestions from './questions/priority.json';
import speedStoppingLessons from './lessons/speed-stopping.json';
import speedStoppingQuestions from './questions/speed-stopping.json';

export const studyModes = [
  'Quick Sprint',
  'Topic Deep Dive',
  'Mock Exam',
  'Mistake Review',
];

const lessonsByModuleSlug = {
  signs: signsLessons,
  priority: priorityLessons,
  'speed-stopping': speedStoppingLessons,
};

const questionBanks = {
  signs: signsQuestions,
  priority: priorityQuestions,
  'speed-stopping': speedStoppingQuestions,
};

function allLessons() {
  return Object.values(lessonsByModuleSlug).flat();
}

export function getAllModules() {
  return modules;
}

export function getModules() {
  return modules;
}

export function getModuleBySlug(slug) {
  return modules.find((m) => m.slug === slug) || null;
}

export function getModuleById(id) {
  return modules.find((m) => m.id === id) || null;
}

export function getLessonsForModule(slug) {
  return lessonsByModuleSlug[slug] || [];
}

export function getLessonBySlug(slug) {
  return allLessons().find((l) => l.slug === slug) || null;
}

export function getQuestionsForModule(moduleSlug) {
  const mod = getModuleBySlug(moduleSlug);
  if (!mod || !mod.quizEnabled) return [];
  const bankId = mod.questionBankId || moduleSlug;
  return questionBanks[bankId] || [];
}

export function hasQuiz(moduleSlug) {
  const mod = getModuleBySlug(moduleSlug);
  return Boolean(mod && mod.quizEnabled && getQuestionsForModule(moduleSlug).length > 0);
}

// Returns a flat list of { question, moduleSlug, moduleTitle } entries
// pulled from every quiz-enabled module. Used by Quick Sprint to build a
// pooled question set without losing the source-module info needed to
// persist attempts by their original module.
export function getAllQuizQuestions() {
  const pool = [];
  for (const mod of modules) {
    if (!mod.quizEnabled) continue;
    const questions = getQuestionsForModule(mod.slug);
    for (const q of questions) {
      pool.push({ question: q, moduleSlug: mod.slug, moduleTitle: mod.title });
    }
  }
  return pool;
}
