import { getAllModules } from '../content/index.js';
import ModuleCard from '../components/ModuleCard.jsx';

function Modules() {
  const modules = getAllModules();
  return (
    <section className="panel">
      <div className="panel__header">
        <h2>All modules</h2>
        <p>Pick a topic to dive into its lessons and practice.</p>
      </div>

      <div className="card-grid">
        {modules.map((module) => (
          <ModuleCard module={module} key={module.slug} />
        ))}
      </div>
    </section>
  );
}

export default Modules;
