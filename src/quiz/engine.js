import { selectQuestions } from './selection.js';

export function createSession(bank, { count = 5, rng = Math.random } = {}) {
  const questions = selectQuestions(bank, count, rng);
  return {
    questions,
    answers: {},
    submitted: {},
    currentIndex: 0,
  };
}

export function currentQuestion(session) {
  if (!session || !session.questions.length) return null;
  return session.questions[session.currentIndex] || null;
}

export function isLastQuestion(session) {
  if (!session || !session.questions.length) return false;
  return session.currentIndex === session.questions.length - 1;
}

export function recordAnswer(session, questionId, choiceId) {
  return {
    ...session,
    answers: { ...session.answers, [questionId]: choiceId },
  };
}

export function markSubmitted(session, questionId) {
  return {
    ...session,
    submitted: { ...session.submitted, [questionId]: true },
  };
}

export function advance(session) {
  if (isLastQuestion(session)) return session;
  return { ...session, currentIndex: session.currentIndex + 1 };
}
