import './App.css';

const studyModes = [
  'Quick Sprint',
  'Topic Deep Dive',
  'Mock Exam',
  'Mistake Review',
];

const modules = [
  'Road signs and markings',
  'Priority and junctions',
  'Hazard perception',
  'Speed and stopping distance',
  'Vehicle knowledge and safety',
  'Special road users and situations',
];

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero__content">
          <p className="eyebrow">Dutch Driving Theory Trainer</p>
          <h1>Dutch Theory Sprint v2</h1>
          <p className="hero__text">
            Gamified Dutch driving theory practice in bite-sized modules.
          </p>
        </div>
      </header>

      <main className="dashboard">
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
              <article className="card" key={module}>
                <h3>{module}</h3>
                <p>Micro-lessons, drills, and review questions for this topic.</p>
              </article>
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
              <p>0 of 12 completed</p>
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
      </main>
    </div>
  );
}

export default App;