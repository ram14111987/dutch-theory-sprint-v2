import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllQuizQuestions } from '../content/index.js';
import {
  buildMockExamQuestions,
  scoreMockExam,
  getMockExamMode,
  remainingSeconds,
  elapsedSeconds,
  formatDuration,
} from '../quiz/mockExam.js';
import { ResultContext } from '../quiz/ResultContext.js';
import ChoiceList from '../components/ChoiceList.jsx';
import QuizProgress from '../components/QuizProgress.jsx';
import EmptyState from '../components/EmptyState.jsx';
import {
  recordExamAttempt,
  makeAttemptId,
  getExamAttempts,
} from '../storage/progressStore.js';

const TIMES_UP_LINGER_MS = 900;

function MockExam() {
  const navigate = useNavigate();
  const { setResult } = useContext(ResultContext);
  const [searchParams] = useSearchParams();
  const mode = useMemo(
    () => getMockExamMode(searchParams.get('mode')),
    [searchParams],
  );

  const entries = useMemo(() => {
    const pool = getAllQuizQuestions();
    return buildMockExamQuestions(pool, { size: mode.size });
  }, [mode]);

  const [startedAt] = useState(() => Date.now());
  const finalizedRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timesUp, setTimesUp] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(() =>
    mode.durationSeconds
      ? remainingSeconds(startedAt, mode.durationSeconds)
      : null,
  );

  const finalize = useCallback(
    (opts = {}) => {
      if (finalizedRef.current) return;
      finalizedRef.current = true;
      const score = scoreMockExam(entries, answers, {
        passPercentage: mode.passPercentage,
        passCorrect: mode.passCorrect,
      });
      const timeUsed = elapsedSeconds(startedAt);
      const finishedAtMs = Date.now();
      const timeUsedSeconds = opts.timedOut ? mode.durationSeconds : timeUsed;
      const prior = getExamAttempts({ examMode: mode.id });
      const attemptNumber = prior.length + 1;
      let bestPriorPercentage = 0;
      for (const a of prior) {
        if (typeof a.percentage === 'number' && a.percentage > bestPriorPercentage) {
          bestPriorPercentage = a.percentage;
        }
      }
      const previousPercentage = prior.length
        ? (typeof prior[prior.length - 1].percentage === 'number'
            ? prior[prior.length - 1].percentage
            : null)
        : null;
      recordExamAttempt({
        id: makeAttemptId(),
        examMode: mode.id,
        startedAt: new Date(startedAt).toISOString(),
        finishedAt: new Date(finishedAtMs).toISOString(),
        durationSeconds: typeof timeUsedSeconds === 'number' ? timeUsedSeconds : null,
        correct: score.correct,
        total: score.total,
        percentage: score.percentage,
        passed: score.passed,
        passPercentage: score.passPercentage,
        passCorrect: score.passCorrect,
        timedOut: Boolean(opts.timedOut),
      });
      setResult({
        mode: 'exam',
        examMode: mode.id,
        questions: entries.map((e) => e.question),
        answers,
        correct: score.correct,
        total: score.total,
        percentage: score.percentage,
        passed: score.passed,
        passPercentage: score.passPercentage,
        passCorrect: score.passCorrect,
        durationSeconds: mode.durationSeconds,
        timeUsedSeconds,
        timedOut: Boolean(opts.timedOut),
        attemptNumber,
        bestPriorPercentage,
        previousPercentage,
        finishedAt: new Date(finishedAtMs).toISOString(),
      });
      if (opts.timedOut) {
        setTimesUp(true);
        window.setTimeout(() => navigate('/exam/results'), TIMES_UP_LINGER_MS);
      } else {
        navigate('/exam/results');
      }
    },
    [entries, answers, mode, navigate, setResult, startedAt],
  );

  useEffect(() => {
    if (!entries.length) return undefined;
    if (!mode.durationSeconds) return undefined;
    const id = window.setInterval(() => {
      const left = remainingSeconds(startedAt, mode.durationSeconds);
      setSecondsLeft(left);
      if (left === 0 && !finalizedRef.current) {
        finalize({ timedOut: true });
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [entries.length, mode.durationSeconds, startedAt, finalize]);

  if (!entries.length) {
    return (
      <section className="panel">
        <EmptyState
          eyebrow={mode.label}
          title="No questions available"
          message="Mock Exam needs at least one quiz-enabled module with questions."
          actions={<Link to="/" className="btn">Back home</Link>}
        />
      </section>
    );
  }

  if (timesUp) {
    return (
      <section className="panel quiz-page">
        <header className="quiz-page__header">
          <p className="eyebrow">{mode.label}</p>
          <h2 className="sprint-timesup">Time's up</h2>
          <p>Tallying your exam…</p>
        </header>
      </section>
    );
  }

  const entry = entries[currentIndex];
  const question = entry.question;
  const selectedId = answers[question.id] ?? null;
  const last = currentIndex === entries.length - 1;
  const answeredCount = entries.reduce(
    (n, e) => (answers[e.question.id] ? n + 1 : n),
    0,
  );
  const timerLow = secondsLeft != null && secondsLeft <= 60;

  const passLabel =
    mode.passCorrect != null
      ? `pass at ${mode.passCorrect}/${mode.size} correct`
      : `pass at ${mode.passPercentage}%`;

  const handleSelect = (choiceId) => {
    setAnswers((prev) => ({ ...prev, [question.id]: choiceId }));
  };

  const handleNext = () => {
    setCurrentIndex((i) => Math.min(i + 1, entries.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <section className="panel quiz-page">
      <header className="quiz-page__header">
        <div className="sprint-header">
          <p className="eyebrow">
            {mode.label} · {passLabel}
          </p>
          {mode.durationSeconds && (
            <span
              className={`sprint-timer${timerLow ? ' sprint-timer--low' : ''}`}
              aria-live="polite"
            >
              {formatDuration(secondsLeft ?? 0)}
            </span>
          )}
        </div>
        <QuizProgress current={currentIndex + 1} total={entries.length} />
        <p className="eyebrow eyebrow--dark">
          Answered {answeredCount} of {entries.length}
        </p>
      </header>

      <article className="question-card">
        <h2 className="question-card__stem">{question.stem}</h2>

        <ChoiceList
          choices={question.choices}
          selectedId={selectedId}
          correctIds={[]}
          submitted={false}
          onSelect={handleSelect}
        />

        <div className="question-card__actions">
          <button
            type="button"
            className="btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          {!last ? (
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleNext}
            >
              Next question
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => finalize()}
            >
              Finish exam
            </button>
          )}
        </div>
      </article>

      <div className="quiz-page__footer">
        <Link to="/" className="btn btn--ghost">
          Exit exam
        </Link>
      </div>
    </section>
  );
}

export default MockExam;
