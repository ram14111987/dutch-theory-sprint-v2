import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ResultContext } from '../quiz/ResultContext.js';
import { isAnswerCorrect } from '../quiz/scoring.js';
import ResultSummary from '../components/ResultSummary.jsx';

function MockExamResults() {
  const { result } = useContext(ResultContext);

  if (!result || result.mode !== 'exam') {
    return (
      <section className="panel results-page">
        <div className="panel__header">
          <p className="eyebrow">Mock Exam</p>
          <h2>No results to show</h2>
          <p>Finish a Mock Exam to see your results here.</p>
        </div>
        <div className="results-page__actions">
          <Link to="/exam" className="btn btn--primary">
            Start Mock Exam
          </Link>
          <Link to="/" className="btn">Back home</Link>
        </div>
      </section>
    );
  }

  const {
    correct,
    total,
    percentage,
    passed,
    passPercentage,
    questions,
    answers,
  } = result;

  const incorrect = questions.filter(
    (q) => !isAnswerCorrect(q, answers[q.id] ?? null),
  );

  return (
    <section className="panel results-page">
      <header className="results-page__header">
        <p className="eyebrow">Mock Exam · Results</p>
        <h2>{passed ? 'Passed' : 'Did not pass'}</h2>
        <p>
          Pass threshold: {passPercentage}%. You scored {percentage}%.
        </p>
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
        <Link to="/exam" className="btn btn--primary">
          Restart Mock Exam
        </Link>
        <Link to="/" className="btn">Back home</Link>
      </div>
    </section>
  );
}

export default MockExamResults;
