import { Link } from 'react-router-dom';
import {
  getAllModules,
  getLessonsForModule,
  getQuestionsForModule,
  hasQuiz,
} from '../content/index.js';

function TopicIndex() {
  const modules = getAllModules();
  const topics = modules.filter((m) => hasQuiz(m.slug));

  return (
    <section className="panel">
      <div className="panel__header">
        <p className="eyebrow">Topic Deep Dive</p>
        <h2>Pick a topic</h2>
        <p>Focus on one module. Practice every question, see what you missed.</p>
      </div>

      {topics.length === 0 ? (
        <p className="empty-state">No quiz-enabled topics yet.</p>
      ) : (
        <div className="card-grid">
          {topics.map((mod) => {
            const lessonCount = getLessonsForModule(mod.slug).length;
            const questionCount = getQuestionsForModule(mod.slug).length;
            return (
              <article className="card" key={mod.slug}>
                <h3>{mod.title}</h3>
                <p>
                  {lessonCount} lesson{lessonCount === 1 ? '' : 's'} · {questionCount} question
                  {questionCount === 1 ? '' : 's'}
                </p>
                <Link to={`/topics/${mod.slug}`} className="card__link">
                  Open topic
                </Link>
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

export default TopicIndex;
