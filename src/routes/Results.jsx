import { useContext, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getModuleBySlug, getQuestionsForModule } from '../content/index.js';
import { performanceLabel, isAnswerCorrect } from '../quiz/scoring.js';
import { ResultContext } from '../quiz/ResultContext.js';
import { getLatestAttempt } from '../storage/progressStore.js';
import ResultSummary from '../components/ResultSummary.jsx';

function hydrateFromAttempt(slug, mode) {
  const attempt = getLatestAttempt(slug, mode ? { mode } : undefined);
  if (!attempt) return null;
  const bank = getQuestionsForModule(slug);
  const byId = new Map(bank.map((q) => [q.id, q]));
  const questions = [];
  const answers = {};
  if (Array.isArray(attempt.perQuestion)) {
    for (const pq of attempt.perQuestion) {
      const q = byId.get(pq.questionId);
      if (!q) continue; // safely skip unknown IDs
      questions.push(q);
      if (pq.selectedChoiceId != null) {
        answers[q.id] = pq.selectedChoiceId;
      }
    }
  }
  return {
    moduleSlug: slug,
    mode: attempt.mode === 'review' ? 'review' : 'quiz',
    questions,
    answers,
    correct: typeof attempt.correct === 'number' ? attempt.correct : 0,
    total: typeof attempt.total === 'number' ? attempt.total : questions.length,
    percentage: typeof attempt.percentage === 'number' ? attempt.percentage : 0,
    hydrated: true,
  };
}

function Results() {
  const { slug } = useParams();
  const location = useLocation();
  const isReview = location.pathname.startsWith('/review/');
  const isSprint = location.pathname.startsWith('/sprint');
  const { result } = useContext(ResultContext);
  const mod = slug ? getModuleBySlug(slug) : null;

  const effective = useMemo(() => {
    if (isSprint) {
      // Sprint results live only in the in-memory ResultContext — there
      // is no synthetic sprint module to hydrate from on refresh.
      if (result && result.mode === 'sprint') return result;
      return null;
    }
    if (
      result &&
      result.moduleSlug === slug &&
      (result.mode === 'review') === isReview
    ) {
      return result;
    }
    return hydrateFromAttempt(slug, isReview ? 'review' : 'quiz');
  }, [result, slug, isReview, isSprint]);

  if (!effective || !effective.questions.length) {
    return (
      <section className="panel results-page">
        <div className="panel__header">
          {isSprint && <p className="eyebrow">Quick Sprint</p>}
          {isReview && <p className="eyebrow">Mistake Review</p>}
          <h2>No results to show</h2>
          <p>
            {isSprint
              ? 'Finish a Quick Sprint to see your results here.'
              : isReview
              ? 'Finish a review session to see your results here.'
              : 'Start a quiz to see your results here.'}
          </p>
        </div>
        <div className="results-page__actions">
          {isSprint && (
            <Link to="/sprint" className="btn btn--primary">
              Start Quick Sprint
            </Link>
          )}
          {mod && !isReview && !isSprint && (
            <Link to={`/quiz/${mod.slug}`} className="btn btn--primary">
              Start quiz
            </Link>
          )}
          {mod && isReview && (
            <Link to={`/review/${mod.slug}`} className="btn btn--primary">
              Start review
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

  const { correct, total, percentage, questions, answers } = effective;
  const label = performanceLabel(percentage);

  return (
    <section className="panel results-page">
      <header className="results-page__header">
        {isSprint && <p className="eyebrow">Quick Sprint</p>}
        {isReview && <p className="eyebrow">Mistake Review</p>}
        <p className="eyebrow">
          Results · {isSprint ? 'Quick Sprint' : mod ? mod.title : slug}
        </p>
        {isSprint && effective.timedOut && (
          <p className="eyebrow eyebrow--dark">Submitted on timeout</p>
        )}
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
        {isSprint ? (
          <Link to="/sprint" className="btn btn--primary">
            New Quick Sprint
          </Link>
        ) : isReview ? (
          <Link to={`/review/${slug}`} className="btn btn--primary">
            Review again
          </Link>
        ) : (
          <Link to={`/quiz/${slug}`} className="btn btn--primary">
            Retry quiz
          </Link>
        )}
        {!isSprint && (
          <Link to={`/modules/${slug}`} className="btn">
            Back to module
          </Link>
        )}
        {isSprint && (
          <Link to="/" className="btn">
            Back home
          </Link>
        )}
        {isReview && (
          <Link to="/review" className="btn btn--ghost">
            Back to Mistake Review
          </Link>
        )}
      </div>
    </section>
  );
}

export default Results;
