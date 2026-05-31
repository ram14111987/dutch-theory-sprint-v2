import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ResultContext } from '../quiz/ResultContext.js';
import { isAnswerCorrect } from '../quiz/scoring.js';
import { formatDuration, getMockExamMode } from '../quiz/mockExam.js';
import { getExamAttempts } from '../storage/progressStore.js';
import ResultSummary from '../components/ResultSummary.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { formatTimestamp, formatDelta } from '../utils/format.js';



function MockExamResults() {
  const { result } = useContext(ResultContext);

  const history = useMemo(() => {
    if (!result || result.mode !== 'exam') return [];
    return getExamAttempts({ examMode: result.examMode });
  }, [result]);

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
    attemptNumber,
    bestPriorPercentage,
    previousPercentage,
    finishedAt,
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
  } else if (typeof timeUsedSeconds === 'number') {
    timeLine = `Time used: ${formatDuration(timeUsedSeconds)}.`;
  }

  const restartHref = mode.id === 'realistic' ? '/exam?mode=realistic' : '/exam';

  const finishedAtText = formatTimestamp(finishedAt);
  const bestSoFar = Math.max(
    typeof bestPriorPercentage === 'number' ? bestPriorPercentage : 0,
    typeof percentage === 'number' ? percentage : 0,
  );
  const delta =
    typeof previousPercentage === 'number' && typeof percentage === 'number'
      ? percentage - previousPercentage
      : null;
  const deltaText = formatDelta(delta);

  return (
    <section className="panel results-page">
      <header className="results-page__header">
        <p className="eyebrow">{mode.label} · Results</p>
        <h2>{passed ? 'Passed' : 'Did not pass'}</h2>
        <p>{thresholdLine}</p>
        {timeLine && <p>{timeLine}</p>}
      </header>

      <ResultSummary correct={correct} total={total} percentage={percentage} />

      <ul className="results-page__meta">
        {typeof attemptNumber === 'number' && (
          <li>Attempt #{attemptNumber}</li>
        )}
        <li>Best: {bestSoFar}%</li>
        {deltaText && <li>vs previous: {deltaText}%</li>}
        {finishedAtText && <li>Finished: {finishedAtText}</li>}
      </ul>

      {history.length > 1 && (
        <div className="results-page__review">
          <h3>{mode.label} history ({history.length})</h3>
          <ol className="review-list">
            {history.slice().reverse().map((a) => {
              const when = formatTimestamp(a.finishedAt);
              const dur =
                typeof a.durationSeconds === 'number'
                  ? formatDuration(a.durationSeconds)
                  : null;
              const passedTag = a.passed ? 'Passed' : 'Did not pass';
              return (
                <li key={a.id} className="review-item">
                  <p className="review-item__line">
                    <strong>
                      {a.correct}/{a.total} ({a.percentage}%) — {passedTag}
                    </strong>
                  </p>
                  <p className="review-item__line">
                    {when ? when : 'Unknown time'}
                    {dur ? ` · ${dur}` : ''}
                    {a.timedOut ? ' · timed out' : ''}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      )}

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
