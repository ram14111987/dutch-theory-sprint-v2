function QuizProgress({ current, total }) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);
  return (
    <div className="quiz-progress">
      <div className="quiz-progress__label">
        Question {current} of {total}
      </div>
      <div className="quiz-progress__track">
        <div className="quiz-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default QuizProgress;
