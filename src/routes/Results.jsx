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
  const { result } = useContext(ResultContext);
  const mod = getModuleBySlug(slug);

  const effective = useMemo(() => {
    if (
      result &&
      result.moduleSlug === slug &&
      (result.mode === 'review') === isReview
    ) {
      return result;
    }
    return hydrateFromAttempt(slug, isReview ? 'review' : 'quiz');
  }, [result, slug, isReview]);

  if (!effective || !effective.questions.length) {
    return (
      <section className="panel results-page">
        <div className="panel__header">
          {isReview && <p className="eyebrow">Mistake Review</p>}
          <h2>No results to show</h2>
          <p>
            {isReview
              ? 'Finish a review session to see your results here.'
              : 'Start a quiz to see your results here.'}
          </p>
        </div>
        <div className="results-page__actions">
          {mod && !isReview && (
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
        {isReview && <p className="eyebrow">Mistake Review</p>}
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
        {isReview ? (
          <Link to={`/review/${slug}`} className="btn btn--primary">
            Review again
          </Link>
        ) : (
          <Link to={`/quiz/${slug}`} className="btn btn--primary">
            Retry quiz
          </Link>
        )}
        <Link to={`/modules/${slug}`} className="btn">
          Back to module
        </Link>
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
