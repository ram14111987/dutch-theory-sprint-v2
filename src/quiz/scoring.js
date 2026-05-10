export function isAnswerCorrect(question, selectedChoiceId) {
  if (!question || !selectedChoiceId) return false;
  const correct = question.correctChoiceIds;
  if (!Array.isArray(correct) || correct.length !== 1) return false;
  return correct[0] === selectedChoiceId;
}

export function scoreSession(questions, answers) {
  const total = questions.length;
  let correct = 0;
  const details = questions.map((q) => {
    const selected = answers[q.id] ?? null;
    const ok = isAnswerCorrect(q, selected);
    if (ok) correct += 1;
    return { questionId: q.id, selectedChoiceId: selected, correct: ok };
  });
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, percentage, details };
}

export function performanceLabel(percentage) {
  if (percentage >= 80) return 'Strong start';
  if (percentage >= 60) return 'Keep practicing';
  return 'Review this topic again';
}
