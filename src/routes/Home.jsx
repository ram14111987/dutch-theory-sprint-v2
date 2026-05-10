import { studyModes, getAllModules } from '../content/index.js';
import ModuleCard from '../components/ModuleCard.jsx';

function Home() {
  const modules = getAllModules();
  return (
    <>
      <section className="panel">
        <div className="panel__header">
          <h2>Study Modes</h2>
          <p>Choose how you want to practice.</p>
        </div>

        <div className="card-grid">
          {studyModes.map((mode) => (
            <article className="card" key={mode}>
              <h3>{mode}</h3>
              <p>Structured practice flow for focused exam preparation.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <h2>Modules</h2>
          <p>Core Dutch theory topics you need to master.</p>
        </div>

        <div className="card-grid">
          {modules.map((module) => (
            <ModuleCard module={module} key={module.slug} />
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <h2>Your Progress</h2>
          <p>A simple placeholder for the future mastery system.</p>
        </div>

        <div className="card-grid">
          <article className="card">
            <h3>Completed Modules</h3>
            <p>0 of {modules.length} completed</p>
          </article>

          <article className="card">
            <h3>Questions Practiced</h3>
            <p>0 answered so far</p>
          </article>

          <article className="card">
            <h3>Weakest Area</h3>
            <p>Not enough data yet</p>
          </article>

          <article className="card">
            <h3>Recommended Next Step</h3>
            <p>Start with Road Signs and Markings</p>
          </article>
        </div>
      </section>
    </>
  );
}

export default Home;
