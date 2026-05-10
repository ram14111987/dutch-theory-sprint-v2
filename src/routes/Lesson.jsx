import { Link, useParams } from 'react-router-dom';
import { getLessonBySlug, getModuleBySlug } from '../content/index.js';

function Lesson() {
  const { slug } = useParams();
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    return (
      <section className="panel">
        <div className="panel__header">
          <h2>Lesson not found</h2>
          <p>We couldn't find a lesson with that name.</p>
        </div>
        <Link to="/modules" className="btn">All modules</Link>
      </section>
    );
  }

  const mod = getModuleBySlug(lesson.moduleSlug);

  return (
    <section className="panel">
      <div className="panel__header">
        {mod && (
          <p className="eyebrow">
            <Link to={`/modules/${mod.slug}`} className="eyebrow__link">
              {mod.title}
            </Link>
          </p>
        )}
        <h2>{lesson.title}</h2>
        {lesson.summary && <p>{lesson.summary}</p>}
      </div>

      <div className="lesson-body">
        {lesson.sections?.map((section, idx) => (
          <article className="lesson-section" key={idx}>
            {section.heading && <h3>{section.heading}</h3>}
            {section.body && <p>{section.body}</p>}
          </article>
        ))}
      </div>

      {mod && (
        <div className="lesson-body__footer">
          <Link to={`/modules/${mod.slug}`} className="btn btn--ghost">
            Back to {mod.title}
          </Link>
        </div>
      )}
    </section>
  );
}

export default Lesson;
