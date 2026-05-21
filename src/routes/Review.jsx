import { useContext, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getModuleBySlug, getQuestionsForModule } from '../content/index.js';
import {
  createSession,
  currentQuestion,
  isLastQuestion,
  recordAnswer,
  markSubmitted,
  advance,
} from '../quiz/engine.js';
import { scoreSession } from '../quiz/scoring.js';
import { ResultContext } from '../quiz/ResultContext.js';
import {
  recordAttempt,
  makeAttemptId,
  getAttemptsForModule,
} from '../storage/progressStore.js';
import { getMistakeQuestions, REVIEW_SESSION_CAP } from '../quiz/mistakes.js';
import QuestionCard from '../components/QuestionCard.jsx';
import QuizProgress from '../components/QuizProgress.jsx';

function Review() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setResult } = useContext(ResultContext);

  const mod = getModuleBySlug(slug);
  const mistakeBank = useMemo(() => {
    const attempts = getAttemptsForModule(slug);
    const bank = getQuestionsForModule(slug);
    return getMistakeQuestions(attempts, bank);
  }, [slug]);

  const [session, setSession] = useState(() =>
    createSession(mistakeBank, { count: REVIEW_SESSION_CAP }),
  );

  if (!mod) {
    return (
      <section className="panel">
        <div className="panel__header">
          <h2>Module not found</h2>
        </div>
        <Link to="/review" className="btn">Back to Mistake Review</Link>
      </section>
    );
  }

  if (!session.questions.length) {
    return (
      <section className="panel">
        <div className="panel__header">
          <p className="eyebrow">Mistake Review · {mod.title}</p>
          <h2>No mistakes to review</h2>
          <p>You've answered every question in this module correctly on your most recent attempt. Try a quiz to find new ones to practice.</p>
        </div>
        <div className="results-page__actions">
          <Link to={`/quiz/${mod.slug}`} className="btn btn--primary">Take quiz</Link>
          <Link to="/review" className="btn">Back to Mistake Review</Link>
        </div>
      </section>
    );
  }

  const question = currentQuestion(session);
  const selectedId = session.answers[question.id] ?? null;
  const submitted = Boolean(session.submitted[question.id]);
  const last = isLastQuestion(session);

  const handleSelect = (choiceId) => {
    if (submitted) return;
    setSession((s) => recordAnswer(s, question.id, choiceId));
  };

  const handleSubmit = () => {
    if (!selectedId) return;
    setSession((s) => markSubmitted(s, question.id));
  };

  const handleNext = () => {
    if (last) {
      const score = scoreSession(session.questions, session.answers);
      const attempt = {
        id: makeAttemptId(),
        moduleSlug: mod.slug,
        mode: 'review',
        finishedAt: new Date().toISOString(),
        correct: score.correct,
        total: score.total,
        percentage: score.percentage,
        perQuestion: score.details.map((d) => ({
          questionId: d.questionId,
          selectedChoiceId: d.selectedChoiceId,
          correct: d.correct,
        })),
      };
      recordAttempt(attempt);
      setResult({
        moduleSlug: mod.slug,
        mode: 'review',
        questions: session.questions,
        answers: session.answers,
        ...score,
      });
      navigate(`/review/${mod.slug}/results`);
      return;
    }
    setSession((s) => advance(s));
  };

  return (
    <section className="panel quiz-page">
      <header className="quiz-page__header">
        <p className="eyebrow">Mistake Review · {mod.title}</p>
        <QuizProgress
          current={session.currentIndex + 1}
          total={session.questions.length}
        />
      </header>

      <QuestionCard
        question={question}
        selectedId={selectedId}
        submitted={submitted}
        onSelect={handleSelect}
        onSubmit={handleSubmit}
        onNext={handleNext}
        isLast={last}
      />

      <div className="quiz-page__footer">
        <Link to={`/modules/${mod.slug}`} className="btn btn--ghost">
          Exit review
        </Link>
      </div>
    </section>
  );
}

export default Review;
