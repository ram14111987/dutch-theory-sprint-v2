import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getModuleBySlug } from '../content/index.js';
import { performanceLabel, isAnswerCorrect } from '../quiz/scoring.js';
import { ResultContext } from '../quiz/ResultContext.js';
import ResultSummary from '../components/ResultSummary.jsx';

function Results() {
  const { slug } = useParams();
  const { result } = useContext(ResultContext);
  const mod = getModuleBySlug(slug);

  if (!result || result.moduleSlug !== slug) {
    return (
      <section className="panel results-page">
        <div className="panel__header">
          <h2>No results to show</h2>
          <p>Start a quiz to see your results here.</p>
        </div>
        <div className="results-page__actions">
          {mod && (
            <Link to={`/quiz/${mod.slug}`} className="btn btn--primary">
              Start quiz
            </Link>
          )}
          <Link
            to={mod ? `/modules/${mod.slug}` : '/'}
            className="btn"
          >
            {mod ? 'Back to module' : 'Back home'}
          </Link>
        </div>
      </section>
    );
  }

  const { correct, total, percentage, questions, answers } = result;
  const label = performanceLabel(percentage);

  return (
    <section className="panel results-page">
      <header className="results-page__header">
        <p className="eyebrow">Results · {mod ? mod.title : slug}</p>
        <h2>{label}</h2>
      </header>

      <ResultSummary correct={correct} total={total} percentage={percentage} />

      <div className="results-page__review">
        <h3>Review your answers</h3>
        <ol className="review-list">
          {questions.map((q) => {
            const selected = answers[q.id] ?? null;
            const ok = isAnswerCorrect(q, selected);
            const selectedChoice = q.choices.find((c) => c.id === selected);
            const correctChoice = q.choices.find((c) =>
              q.correctChoiceIds.includes(c.id),
            );
            return (
              <li
                key={q.id}
                className={`review-item ${ok ? 'review-item--correct' : 'review-item--wrong'}`}
              >
                <p className="review-item__stem">{q.stem}</p>
                <p className="review-item__line">
                  <strong>Your answer: </strong>
                  {selectedChoice ? selectedChoice.text : 'No answer'}
                </p>
                {!ok && correctChoice && (
                  <p className="review-item__line">
                    <strong>Correct answer: </strong>
                    {correctChoice.text}
                  </p>
                )}
                {q.explanation?.short && (
                  <p className="review-item__explanation">{q.explanation.short}</p>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="results-page__actions">
        <Link to={`/quiz/${slug}`} className="btn btn--primary">
          Retry quiz
        </Link>
        <Link to={`/modules/${slug}`} className="btn">
          Back to module
        </Link>
      </div>
    </section>
  );
}

export default Results;
