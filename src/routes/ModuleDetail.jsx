import { Link, useParams } from 'react-router-dom';
import { getModuleBySlug, getLessonsForModule, hasQuiz } from '../content/index.js';
import { getModuleStats } from '../storage/progressStore.js';
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
          <Link to={`/quiz/${mod.slug}`} className="btn btn--primary">
            {ctaLabel}
          </Link>
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
