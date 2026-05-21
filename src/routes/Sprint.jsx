import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllQuizQuestions } from '../content/index.js';
import {
  buildSprintQuestions,
  scoreSprint,
  remainingSeconds,
  SPRINT_SIZE,
  SPRINT_DURATION_SECONDS,
} from '../quiz/sprint.js';
import { ResultContext } from '../quiz/ResultContext.js';
import { recordAttempt, makeAttemptId } from '../storage/progressStore.js';
import QuestionCard from '../components/QuestionCard.jsx';
import QuizProgress from '../components/QuizProgress.jsx';

const TIMES_UP_LINGER_MS = 900;

function Sprint() {
  const navigate = useNavigate();
  const { setResult } = useContext(ResultContext);

  const entries = useMemo(() => {
    const pool = getAllQuizQuestions();
    return buildSprintQuestions(pool, { size: SPRINT_SIZE });
  }, []);

  const [startedAt] = useState(() => Date.now());
  const finalizedRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [timesUp, setTimesUp] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(() =>
    remainingSeconds(startedAt, SPRINT_DURATION_SECONDS),
  );

  const finalize = useCallback(
    (opts = {}) => {
      if (finalizedRef.current) return;
      finalizedRef.current = true;
      const score = scoreSprint(entries, answers);
      const finishedAt = new Date().toISOString();
      // Persist one attempt per source module touched, tagged mode: 'sprint'.
      for (const [moduleSlug, perQuestion] of score.perModule.entries()) {
        const moduleCorrect = perQuestion.filter((p) => p.correct).length;
        const moduleTotal = perQuestion.length;
        const attempt = {
          id: makeAttemptId(),
          moduleSlug,
          mode: 'sprint',
          finishedAt,
          correct: moduleCorrect,
          total: moduleTotal,
          percentage: moduleTotal === 0 ? 0 : Math.round((moduleCorrect / moduleTotal) * 100),
          perQuestion,
        };
        recordAttempt(attempt);
      }
      setResult({
        mode: 'sprint',
        questions: entries.map((e) => e.question),
        answers,
        correct: score.correct,
        total: score.total,
        percentage: score.percentage,
        timedOut: Boolean(opts.timedOut),
      });
      if (opts.timedOut) {
        setTimesUp(true);
        window.setTimeout(() => navigate('/sprint/results'), TIMES_UP_LINGER_MS);
      } else {
        navigate('/sprint/results');
      }
    },
    [entries, answers, navigate, setResult],
  );

  useEffect(() => {
    if (!entries.length) return undefined;
    const id = window.setInterval(() => {
      const left = remainingSeconds(startedAt, SPRINT_DURATION_SECONDS);
      setSecondsLeft(left);
      if (left === 0 && !finalizedRef.current) {
        finalize({ timedOut: true });
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [entries.length, startedAt, finalize]);

  if (!entries.length) {
    return (
      <section className="panel">
        <div className="panel__header">
          <p className="eyebrow">Quick Sprint</p>
          <h2>No questions available</h2>
          <p>Quick Sprint needs at least one quiz-enabled module with questions.</p>
        </div>
        <Link to="/" className="btn">Back home</Link>
      </section>
    );
  }

  if (timesUp) {
    return (
      <section className="panel quiz-page">
        <header className="quiz-page__header">
          <p className="eyebrow">Quick Sprint</p>
          <h2 className="sprint-timesup">Time's up</h2>
          <p>Tallying your sprint…</p>
        </header>
      </section>
    );
  }

  const entry = entries[currentIndex];
  const question = entry.question;
  const selectedId = answers[question.id] ?? null;
  const isSubmitted = Boolean(submitted[question.id]);
  const last = currentIndex === entries.length - 1;
  const timerLow = secondsLeft <= 15;

  const handleSelect = (choiceId) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [question.id]: choiceId }));
  };

  const handleSubmit = () => {
    if (!selectedId) return;
    setSubmitted((prev) => ({ ...prev, [question.id]: true }));
  };

  const handleNext = () => {
    if (last) {
      finalize();
      return;
    }
    setCurrentIndex((i) => i + 1);
  };

  return (
    <section className="panel quiz-page">
      <header className="quiz-page__header">
        <div className="sprint-header">
          <p className="eyebrow">Quick Sprint</p>
          <span
            className={`sprint-timer${timerLow ? ' sprint-timer--low' : ''}`}
            aria-live="polite"
          >
            {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
          </span>
        </div>
        <QuizProgress current={currentIndex + 1} total={entries.length} />
      </header>

      <QuestionCard
        question={question}
        selectedId={selectedId}
        submitted={isSubmitted}
        onSelect={handleSelect}
        onSubmit={handleSubmit}
        onNext={handleNext}
        isLast={last}
      />

      <div className="quiz-page__footer">
        <Link to="/" className="btn btn--ghost">
          Exit sprint
        </Link>
      </div>
    </section>
  );
}

export default Sprint;
