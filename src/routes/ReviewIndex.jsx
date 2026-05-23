import { Link } from 'react-router-dom';
import { getAllModules, getQuestionsForModule, hasQuiz } from '../content/index.js';
import { getAttemptsForModule } from '../storage/progressStore.js';
import { getMistakeCount, REVIEW_SESSION_CAP } from '../quiz/mistakes.js';
import EmptyState from '../components/EmptyState.jsx';

function ReviewIndex() {
  const modules = getAllModules();
  const rows = modules
    .filter((m) => hasQuiz(m.slug))
    .map((m) => {
      const attempts = getAttemptsForModule(m.slug);
      const bank = getQuestionsForModule(m.slug);
      const count = getMistakeCount(attempts, bank);
      return { module: m, count };
    });

  const totalMistakes = rows.reduce((sum, r) => sum + r.count, 0);

  return (
    <section className="panel">
      <header className="panel__header">
        <p className="eyebrow">Mistake Review</p>
        <h2>Practice what you got wrong</h2>
        <p>
          Pulled from your most recent answer on each question. Up to {REVIEW_SESSION_CAP} per session.
        </p>
      </header>

      {totalMistakes === 0 ? (
        <EmptyState
          title="No mistakes to review"
          message="Take a quiz first — questions you miss will show up here so you can practice them again."
          actions={
            <>
              <Link to="/modules" className="btn btn--primary">Browse modules</Link>
              <Link to="/" className="btn">Back home</Link>
            </>
          }
        />
      ) : (
        <div className="card-grid">
          {rows.map(({ module, count }) => {
            const enabled = count > 0;
            return (
              <article className="card" key={module.slug}>
                <h3>{module.title}</h3>
                <p>
                  {enabled
                    ? `${count} mistake${count === 1 ? '' : 's'} to review`
                    : 'No mistakes — keep it up.'}
                </p>
                {enabled ? (
                  <Link to={`/review/${module.slug}`} className="card__link">
                    Review mistakes ({Math.min(count, REVIEW_SESSION_CAP)})
                  </Link>
                ) : (
                  <span className="card__link" style={{ opacity: 0.5 }}>
                    Review mistakes (0)
                  </span>
                )}
              </article>
            );
          })}
        </div>
      )}

      <div className="results-page__actions" style={{ marginTop: 20 }}>
        <Link to="/" className="btn">Back home</Link>
      </div>
    </section>
  );
}

export default ReviewIndex;
