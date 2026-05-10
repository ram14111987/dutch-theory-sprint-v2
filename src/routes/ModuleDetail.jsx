import { Link, useParams } from 'react-router-dom';
import { getModuleBySlug, getLessonsForModule, hasQuiz } from '../content/index.js';
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

  return (
    <>
      <section className="panel">
        <div className="panel__header">
          <p className="eyebrow">Module</p>
          <h2>{mod.title}</h2>
          <p>{mod.description}</p>
        </div>

        {quizAvailable && (
          <Link to={`/quiz/${mod.slug}`} className="btn btn--primary">
            Start quiz
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
