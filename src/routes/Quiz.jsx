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
import QuestionCard from '../components/QuestionCard.jsx';
import QuizProgress from '../components/QuizProgress.jsx';

function Quiz() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setResult } = useContext(ResultContext);

  const mod = getModuleBySlug(slug);
  const bank = useMemo(() => getQuestionsForModule(slug), [slug]);

  const [session, setSession] = useState(() => createSession(bank, { count: 5 }));

  if (!mod) {
    return (
      <section className="panel">
        <div className="panel__header">
          <h2>Module not found</h2>
        </div>
        <Link to="/" className="btn">Back home</Link>
      </section>
    );
  }

  if (!session.questions.length) {
    return (
      <section className="panel">
        <div className="panel__header">
          <h2>{mod.title}</h2>
          <p>No questions are available for this module yet.</p>
        </div>
        <Link to={`/modules/${mod.slug}`} className="btn">
          Back to module
        </Link>
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
      setResult({
        moduleSlug: mod.slug,
        questions: session.questions,
        answers: session.answers,
        ...score,
      });
      navigate(`/quiz/${mod.slug}/results`);
      return;
    }
    setSession((s) => advance(s));
  };

  return (
    <section className="panel quiz-page">
      <header className="quiz-page__header">
        <p className="eyebrow">Quiz · {mod.title}</p>
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
          Exit quiz
        </Link>
      </div>
    </section>
  );
}

export default Quiz;
