import { useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllQuizQuestions } from '../content/index.js';
import {
  buildMockExamQuestions,
  scoreMockExam,
  MOCK_EXAM_SIZE,
  MOCK_EXAM_PASS_PERCENTAGE,
} from '../quiz/mockExam.js';
import { ResultContext } from '../quiz/ResultContext.js';
import ChoiceList from '../components/ChoiceList.jsx';
import QuizProgress from '../components/QuizProgress.jsx';

function MockExam() {
  const navigate = useNavigate();
  const { setResult } = useContext(ResultContext);

  const entries = useMemo(() => {
    const pool = getAllQuizQuestions();
    return buildMockExamQuestions(pool, { size: MOCK_EXAM_SIZE });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!entries.length) {
    return (
      <section className="panel">
        <div className="panel__header">
          <p className="eyebrow">Mock Exam</p>
          <h2>No questions available</h2>
          <p>Mock Exam needs at least one quiz-enabled module with questions.</p>
        </div>
        <Link to="/" className="btn">Back home</Link>
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

  const handleSelect = (choiceId) => {
    setAnswers((prev) => ({ ...prev, [question.id]: choiceId }));
  };

  const handleNext = () => {
    setCurrentIndex((i) => Math.min(i + 1, entries.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const handleFinish = () => {
    const score = scoreMockExam(entries, answers);
    setResult({
      mode: 'exam',
      questions: entries.map((e) => e.question),
      answers,
      correct: score.correct,
      total: score.total,
      percentage: score.percentage,
      passed: score.passed,
      passPercentage: score.passPercentage,
    });
    navigate('/exam/results');
  };

  return (
    <section className="panel quiz-page">
      <header className="quiz-page__header">
        <p className="eyebrow">
          Mock Exam · pass at {MOCK_EXAM_PASS_PERCENTAGE}%
        </p>
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
              onClick={handleFinish}
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
