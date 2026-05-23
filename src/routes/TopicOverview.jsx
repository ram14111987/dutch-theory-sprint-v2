import { Link, useParams } from 'react-router-dom';
import {
  getModuleBySlug,
  getLessonsForModule,
  getQuestionsForModule,
  hasQuiz,
} from '../content/index.js';
import LessonCard from '../components/LessonCard.jsx';

function TopicOverview() {
  const { slug } = useParams();
  const mod = slug ? getModuleBySlug(slug) : null;

  if (!mod || !hasQuiz(mod.slug)) {
    return (
      <section className="panel">
        <div className="panel__header">
          <p className="eyebrow">Topic Deep Dive</p>
          <h2>Topic not available</h2>
          <p>This topic has no quiz questions yet.</p>
        </div>
        <Link to="/topics" className="btn">Back to topics</Link>
      </section>
    );
  }

  const lessons = getLessonsForModule(mod.slug);
  const questionCount = getQuestionsForModule(mod.slug).length;

  return (
    <>
      <section className="panel">
        <div className="panel__header">
          <p className="eyebrow">Topic Deep Dive</p>
          <h2>{mod.title}</h2>
          <p>{mod.description}</p>
          <p className="eyebrow" style={{ marginTop: 12, opacity: 1 }}>
            {lessons.length} lesson{lessons.length === 1 ? '' : 's'} · {questionCount} question
            {questionCount === 1 ? '' : 's'}
          </p>
        </div>

        <div className="results-page__actions">
          <Link to={`/topics/${mod.slug}/practice`} className="btn btn--primary">
            Start topic practice
          </Link>
          <Link to="/topics" className="btn">Back to topics</Link>
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <h2>Lessons in this topic</h2>
        </div>

        {lessons.length > 0 ? (
          <div className="card-grid">
            {lessons.map((lesson) => (
              <LessonCard lesson={lesson} key={lesson.slug} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No lessons for this topic yet.</p>
        )}
      </section>
    </>
  );
}

export default TopicOverview;
