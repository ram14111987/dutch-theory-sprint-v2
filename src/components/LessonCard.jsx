import { Link } from 'react-router-dom';

function LessonCard({ lesson }) {
  return (
    <article className="card">
      <h3>{lesson.title}</h3>
      {lesson.summary && <p>{lesson.summary}</p>}
      <Link to={`/lessons/${lesson.slug}`} className="card__link">
        Open lesson
      </Link>
    </article>
  );
}

export default LessonCard;
