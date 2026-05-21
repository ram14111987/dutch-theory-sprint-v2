import { useCallback, useState } from 'react';
import { studyModes, getAllModules } from '../content/index.js';
import ModuleCard from '../components/ModuleCard.jsx';
import { getGlobalStats, resetAll } from '../storage/progressStore.js';

function Home() {
  const modules = getAllModules();
  const [stats, setStats] = useState(() => getGlobalStats());

  const handleReset = useCallback(() => {
    const ok = typeof window !== 'undefined'
      ? window.confirm('Reset all progress? This clears every recorded attempt. This cannot be undone.')
      : true;
    if (!ok) return;
    resetAll();
    setStats(getGlobalStats());
  }, []);

  const weakestModule = stats.weakestModuleSlug
    ? modules.find((m) => m.slug === stats.weakestModuleSlug)
    : null;

  const completedSlugs = new Set(
    stats.perModule.filter((s) => s.completed).map((s) => s.slug),
  );
  const nextQuizModule = modules.find(
    (m) => m.quizEnabled && !completedSlugs.has(m.slug),
  );

  let recommendedText;
  if (stats.totalAttempts === 0) {
    recommendedText = 'Start with Road signs and markings';
  } else if (weakestModule && stats.weakestBestPercentage < 80) {
    recommendedText = `Practice ${weakestModule.title}`;
  } else if (nextQuizModule) {
    recommendedText = `Try ${nextQuizModule.title}`;
  } else {
    recommendedText = 'All available quizzes mastered — great work!';
  }

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
          <p>Tracked locally in your browser.</p>
        </div>

        <div className="card-grid">
          <article className="card">
            <h3>Completed Modules</h3>
            <p>
              {stats.completedModules} of {modules.length} completed
            </p>
          </article>

          <article className="card">
            <h3>Questions Practiced</h3>
            <p>
              {stats.distinctQuestions === 0
                ? '0 answered so far'
                : `${stats.distinctQuestions} distinct answered`}
            </p>
          </article>

          <article className="card">
            <h3>Weakest Area</h3>
            <p>
              {weakestModule
                ? `${weakestModule.title} (best ${stats.weakestBestPercentage}%)`
                : 'Not enough data yet'}
            </p>
          </article>

          <article className="card">
            <h3>Recommended Next Step</h3>
            <p>{recommendedText}</p>
          </article>
        </div>

        <div className="results-page__actions" style={{ marginTop: 20 }}>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={handleReset}
            disabled={stats.totalAttempts === 0}
          >
            Reset progress
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;
