import { Link } from 'react-router-dom';

function ModuleCard({ module }) {
  return (
    <article className="card">
      <h3>{module.title}</h3>
      <p>{module.description}</p>
      <Link to={`/modules/${module.slug}`} className="card__link">
        Open module
      </Link>
    </article>
  );
}

export default ModuleCard;
