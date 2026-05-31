import { Link } from 'react-router-dom';

function ModuleCard({ module, stats }) {
  const completed = stats && stats.completed;
  const attempted = stats && stats.attemptCount > 0;
  let statusText = null;
  if (completed) {
    statusText = `Completed · best ${stats.bestPercentage}%`;
  } else if (attempted) {
    statusText = `In progress · best ${stats.bestPercentage}% · ${stats.attemptCount} attempt${stats.attemptCount === 1 ? '' : 's'}`;
  }
  return (
    <article className="card">
      <h3>{module.title}</h3>
      {statusText && (
        <p className="eyebrow eyebrow--on-card">{statusText}</p>
      )}
      <p>{module.description}</p>
      <Link to={`/modules/${module.slug}`} className="card__link">
        Open module
      </Link>
    </article>
  );
}

export default ModuleCard;
