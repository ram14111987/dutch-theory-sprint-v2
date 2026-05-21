import { Link, useParams } from 'react-router-dom';
import { getModuleBySlug, getLessonsForModule, getQuestionsForModule, hasQuiz } from '../content/index.js';
import { getModuleStats, getAttemptsForModule } from '../storage/progressStore.js';
import { getMistakeCount, REVIEW_SESSION_CAP } from '../quiz/mistakes.js';
import LessonCard from '../components/LessonCard.jsx';

function ModuleDetail() {
  const { slug } = useParams();
  const mod = getModuleBySlug(slug);

  if (!mod) {
    return (
      <section className="panel">
        <div className="panel__header">
          <h2>Module not found</h2>
          <p>We couldn't find a module with that name.</p>
        </div>
        <Link to="/" className="btn">Back home</Link>
      </section>
    );
  }

  const lessons = getLessonsForModule(mod.slug);
  const quizAvailable = hasQuiz(mod.slug);
  const moduleStats = getModuleStats(mod.slug);
  const hasAttempts = moduleStats.attemptCount > 0;
  const ctaLabel = hasAttempts ? 'Retry quiz' : 'Start quiz';
  const mistakeCount = quizAvailable
    ? getMistakeCount(getAttemptsForModule(mod.slug), getQuestionsForModule(mod.slug))
    : 0;
  const reviewCount = Math.min(mistakeCount, REVIEW_SESSION_CAP);

  return (
    <>
      <section className="panel">
        <div className="panel__header">
          <p className="eyebrow">Module</p>
          <h2>{mod.title}</h2>
          <p>{mod.description}</p>
          {quizAvailable && hasAttempts && (
            <p className="eyebrow" style={{ marginTop: 12, opacity: 1 }}>
              Best: {moduleStats.bestPercentage}% · {moduleStats.attemptCount} attempt{moduleStats.attemptCount === 1 ? '' : 's'}
            </p>
          )}
        </div>

        {quizAvailable && (
          <div className="results-page__actions">
            <Link to={`/quiz/${mod.slug}`} className="btn btn--primary">
              {ctaLabel}
            </Link>
            {mistakeCount > 0 ? (
              <Link to={`/review/${mod.slug}`} className="btn">
                Review mistakes ({reviewCount})
              </Link>
            ) : (
              <button type="button" className="btn" disabled title="No mistakes to review yet">
                Review mistakes (0)
              </button>
            )}
          </div>
        )}
      </section>

      <section className="panel">
        <div className="panel__header">
          <h2>Lessons</h2>
          <p>Bite-sized explanations to build the basics.</p>
        </div>

        {lessons.length > 0 ? (
          <div className="card-grid">
            {lessons.map((lesson) => (
              <LessonCard lesson={lesson} key={lesson.slug} />
            ))}
          </div>
        ) : (
          <p className="empty-state">Lessons for this module are coming soon.</p>
        )}
      </section>
    </>
  );
}

export default ModuleDetail;
