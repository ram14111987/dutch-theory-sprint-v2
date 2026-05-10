import modules from './modules.json';
import signsLessons from './lessons/signs.json';
import signsQuestions from './questions/signs.json';

export const studyModes = [
  'Quick Sprint',
  'Topic Deep Dive',
  'Mock Exam',
  'Mistake Review',
];

const lessonsByModuleSlug = {
  signs: signsLessons,
};

const questionBanks = {
  signs: signsQuestions,
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
