import modules from './modules.json';
import signsLessons from './lessons/signs.json';
import signsQuestions from './questions/signs.json';
import priorityLessons from './lessons/priority.json';
import priorityQuestions from './questions/priority.json';
import speedStoppingLessons from './lessons/speed-stopping.json';
import speedStoppingQuestions from './questions/speed-stopping.json';
import trafficRulesRoadPositionLessons from './lessons/traffic-rules-road-position.json';
import trafficRulesRoadPositionQuestions from './questions/traffic-rules-road-position.json';
import hazardAwarenessLessons from './lessons/hazard-awareness.json';
import hazardAwarenessQuestions from './questions/hazard-awareness.json';
import parkingStoppingRulesLessons from './lessons/parking-stopping-rules.json';
import parkingStoppingRulesQuestions from './questions/parking-stopping-rules.json';
import specialRoadsManoeuvresLessons from './lessons/special-roads-manoeuvres.json';
import specialRoadsManoeuvresQuestions from './questions/special-roads-manoeuvres.json';
import safeDrivingEmergenciesLessons from './lessons/safe-driving-emergencies.json';
import safeDrivingEmergenciesQuestions from './questions/safe-driving-emergencies.json';
import vehicleKnowledgeLessons from './lessons/vehicle-knowledge.json';
import vehicleKnowledgeQuestions from './questions/vehicle-knowledge.json';
import legislationDocumentsLessons from './lessons/legislation-documents.json';
import legislationDocumentsQuestions from './questions/legislation-documents.json';
import responsibleEcoDrivingLessons from './lessons/responsible-eco-driving.json';
import responsibleEcoDrivingQuestions from './questions/responsible-eco-driving.json';
import advancedHazardPredictionLessons from './lessons/advanced-hazard-prediction.json';
import advancedHazardPredictionQuestions from './questions/advanced-hazard-prediction.json';
import specialUsersLessons from './lessons/special-users.json';
import specialUsersQuestions from './questions/special-users.json';

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
  'traffic-rules-road-position': trafficRulesRoadPositionLessons,
  'hazard-awareness': hazardAwarenessLessons,
  'parking-stopping-rules': parkingStoppingRulesLessons,
  'special-roads-manoeuvres': specialRoadsManoeuvresLessons,
  'safe-driving-emergencies': safeDrivingEmergenciesLessons,
  'vehicle-knowledge': vehicleKnowledgeLessons,
  'legislation-documents': legislationDocumentsLessons,
  'responsible-eco-driving': responsibleEcoDrivingLessons,
  'advanced-hazard-prediction': advancedHazardPredictionLessons,
  'special-users': specialUsersLessons,
};

const questionBanks = {
  signs: signsQuestions,
  priority: priorityQuestions,
  'speed-stopping': speedStoppingQuestions,
  'traffic-rules-road-position': trafficRulesRoadPositionQuestions,
  'hazard-awareness': hazardAwarenessQuestions,
  'parking-stopping-rules': parkingStoppingRulesQuestions,
  'special-roads-manoeuvres': specialRoadsManoeuvresQuestions,
  'safe-driving-emergencies': safeDrivingEmergenciesQuestions,
  'vehicle-knowledge': vehicleKnowledgeQuestions,
  'legislation-documents': legislationDocumentsQuestions,
  'responsible-eco-driving': responsibleEcoDrivingQuestions,
  'advanced-hazard-prediction': advancedHazardPredictionQuestions,
  'special-users': specialUsersQuestions,
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
