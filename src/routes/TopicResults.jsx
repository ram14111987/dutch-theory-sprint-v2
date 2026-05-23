import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getModuleBySlug } from '../content/index.js';
import { isAnswerCorrect } from '../quiz/scoring.js';
import { ResultContext } from '../quiz/ResultContext.js';
import ResultSummary from '../components/ResultSummary.jsx';
import EmptyState from '../components/EmptyState.jsx';

function TopicResults() {
  const { slug } = useParams();
  const mod = slug ? getModuleBySlug(slug) : null;
  const { result } = useContext(ResultContext);

  const valid =
    result && result.mode === 'topic' && result.moduleSlug === slug;

  if (!valid) {
    return (
      <section className="panel results-page">
        <EmptyState
          eyebrow="Topic Deep Dive"
          title="No results to show"
          message="Finish a topic practice session to see your results here."
          actions={
            <>
              {mod ? (
                <Link to={`/topics/${mod.slug}/practice`} className="btn btn--primary">
                  Start topic practice
                </Link>
              ) : (
                <Link to="/topics" className="btn btn--primary">
                  Pick a topic
                </Link>
              )}
              <Link to="/topics" className="btn">Back to topics</Link>
            </>
          }
        />
      </section>
    );
  }

  const { correct, total, percentage, questions, answers, moduleTitle } = result;
  const incorrect = questions.filter(
    (q) => !isAnswerCorrect(q, answers[q.id] ?? null),
  );

  return (
    <section className="panel results-page">
      <header className="results-page__header">
        <p className="eyebrow">Topic Deep Dive · Results</p>
        <h2>{moduleTitle}</h2>
        <p>You scored {percentage}%.</p>
      </header>

      <ResultSummary correct={correct} total={total} percentage={percentage} />

      {incorrect.length > 0 ? (
        <div className="results-page__review">
          <h3>Incorrect answers ({incorrect.length})</h3>
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
        <Link to={`/topics/${slug}/practice`} className="btn btn--primary">
          Practice topic again
        </Link>
        <Link to={`/topics/${slug}`} className="btn">
          Back to topic
        </Link>
        <Link to="/topics" className="btn btn--ghost">
          All topics
        </Link>
      </div>
    </section>
  );
}

export default TopicResults;
