import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { studyModes, getAllModules, getAllQuizQuestions, getQuestionsForModule, hasQuiz } from '../content/index.js';
import ModuleCard from '../components/ModuleCard.jsx';
import {
  getGlobalStats,
  resetAll,
  getAttemptsForModule,
} from '../storage/progressStore.js';
import { getMistakeCount } from '../quiz/mistakes.js';

function computeMistakeTotal(modules) {
  let total = 0;
  for (const m of modules) {
    if (!hasQuiz(m.slug)) continue;
    total += getMistakeCount(getAttemptsForModule(m.slug), getQuestionsForModule(m.slug));
  }
  return total;
}

function Home() {
  const modules = getAllModules();
  const [stats, setStats] = useState(() => getGlobalStats());
  const [mistakeTotal, setMistakeTotal] = useState(() => computeMistakeTotal(modules));
  const sprintPoolSize = getAllQuizQuestions().length;

  const handleReset = useCallback(() => {
    const ok = typeof window !== 'undefined'
      ? window.confirm('Reset all progress? This clears every recorded attempt. This cannot be undone.')
      : true;
    if (!ok) return;
    resetAll();
    setStats(getGlobalStats());
    setMistakeTotal(computeMistakeTotal(modules));
  }, [modules]);

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
          {studyModes.map((mode) => {
            if (mode === 'Mistake Review') {
              const enabled = mistakeTotal > 0;
              return (
                <article className="card" key={mode}>
                  <h3>{mode}</h3>
                  <p>
                    {enabled
                      ? `${mistakeTotal} question${mistakeTotal === 1 ? '' : 's'} waiting based on your latest answers.`
                      : 'Take a quiz first — questions you miss will appear here so you can practice them again.'}
                  </p>
                  {enabled ? (
                    <Link to="/review" className="card__link">
                      Start Mistake Review
                    </Link>
                  ) : (
                    <span className="card__link" style={{ opacity: 0.5 }} aria-disabled="true">
                      Nothing to review yet
                    </span>
                  )}
                </article>
              );
            }
            if (mode === 'Quick Sprint') {
              const enabled = sprintPoolSize > 0;
              return (
                <article className="card" key={mode}>
                  <h3>{mode}</h3>
                  <p>
                    {enabled
                      ? '10 questions, 120 seconds. Mixed from every quiz-enabled module.'
                      : 'No quiz-enabled modules yet — Quick Sprint will unlock once questions are available.'}
                  </p>
                  {enabled ? (
                    <Link to="/sprint" className="card__link">
                      Start Quick Sprint
                    </Link>
                  ) : (
                    <span className="card__link" style={{ opacity: 0.5 }} aria-disabled="true">
                      Coming soon
                    </span>
                  )}
                </article>
              );
            }
            return (
              <article className="card" key={mode}>
                <h3>{mode}</h3>
                <p>Coming soon — structured practice flow for focused exam preparation.</p>
                <span className="card__link" style={{ opacity: 0.5 }} aria-disabled="true">
                  Coming soon
                </span>
              </article>
            );
          })}
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
