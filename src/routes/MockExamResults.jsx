import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ResultContext } from '../quiz/ResultContext.js';
import { isAnswerCorrect } from '../quiz/scoring.js';
import { formatDuration, getMockExamMode } from '../quiz/mockExam.js';
import ResultSummary from '../components/ResultSummary.jsx';
import EmptyState from '../components/EmptyState.jsx';

function MockExamResults() {
  const { result } = useContext(ResultContext);

  if (!result || result.mode !== 'exam') {
    return (
      <section className="panel results-page">
        <EmptyState
          eyebrow="Mock Exam"
          title="No results to show"
          message="Finish a Mock Exam to see your results here."
          actions={
            <>
              <Link to="/exam" className="btn btn--primary">
                Start Practice Mock Exam
              </Link>
              <Link to="/exam?mode=realistic" className="btn">
                Start Realistic Mock Exam
              </Link>
              <Link to="/" className="btn">Back home</Link>
            </>
          }
        />
      </section>
    );
  }

  const {
    correct,
    total,
    percentage,
    passed,
    passPercentage,
    passCorrect,
    questions,
    answers,
    examMode,
    durationSeconds,
    timeUsedSeconds,
    timedOut,
  } = result;

  const mode = getMockExamMode(examMode);
  const incorrect = questions.filter(
    (q) => !isAnswerCorrect(q, answers[q.id] ?? null),
  );

  const thresholdLine =
    passCorrect != null
      ? `Pass threshold: ${passCorrect}/${total} correct. You scored ${correct}/${total} (${percentage}%).`
      : `Pass threshold: ${passPercentage}%. You scored ${percentage}%.`;

  let timeLine = null;
  if (durationSeconds) {
    timeLine = timedOut
      ? `Time expired after ${formatDuration(durationSeconds)}.`
      : `Time used: ${formatDuration(timeUsedSeconds)} of ${formatDuration(durationSeconds)}.`;
  } else if (timeUsedSeconds != null) {
    timeLine = `Time used: ${formatDuration(timeUsedSeconds)}.`;
  }

  const restartHref = mode.id === 'realistic' ? '/exam?mode=realistic' : '/exam';

  return (
    <section className="panel results-page">
      <header className="results-page__header">
        <p className="eyebrow">{mode.label} · Results</p>
        <h2>{passed ? 'Passed' : 'Did not pass'}</h2>
        <p>{thresholdLine}</p>
        {timeLine && <p>{timeLine}</p>}
      </header>

      <ResultSummary correct={correct} total={total} percentage={percentage} />

      {incorrect.length > 0 ? (
        <div className="results-page__review">
          <h3>Review your mistakes ({incorrect.length})</h3>
          <ol className="review-list">
            {incorrect.map((q) => {
              const selected = answers[q.id] ?? null;
              const selectedChoice = q.choices.find((c) => c.id === selected);
              const correctChoice = q.choices.find((c) =>
                q.correctChoiceIds.includes(c.id),
              );
              return (
                <li key={q.id} className="review-item review-item--wrong">
                  <p className="review-item__stem">{q.stem}</p>
                  <p className="review-item__line">
                    <strong>Your answer: </strong>
                    {selectedChoice ? selectedChoice.text : 'No answer'}
                  </p>
                  {correctChoice && (
                    <p className="review-item__line">
                      <strong>Correct answer: </strong>
                      {correctChoice.text}
                    </p>
                  )}
                  {q.explanation?.short && (
                    <p className="review-item__explanation">
                      {q.explanation.short}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <div className="results-page__review">
          <h3>Perfect score</h3>
          <p>No incorrect answers to review.</p>
        </div>
      )}

      <div className="results-page__actions">
        <Link to={restartHref} className="btn btn--primary">
          Restart {mode.label}
        </Link>
        <Link to="/" className="btn">Back home</Link>
      </div>
    </section>
  );
}

export default MockExamResults;
