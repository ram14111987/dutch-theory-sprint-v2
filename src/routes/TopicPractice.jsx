import { useContext, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getModuleBySlug,
  getQuestionsForModule,
  hasQuiz,
} from '../content/index.js';
import { buildTopicQuestions, scoreTopic } from '../quiz/topic.js';
import { ResultContext } from '../quiz/ResultContext.js';
import ChoiceList from '../components/ChoiceList.jsx';
import QuizProgress from '../components/QuizProgress.jsx';

function TopicPractice() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setResult } = useContext(ResultContext);

  const mod = slug ? getModuleBySlug(slug) : null;

  const questions = useMemo(() => {
    if (!mod || !hasQuiz(mod.slug)) return [];
    return buildTopicQuestions(getQuestionsForModule(mod.slug));
  }, [mod]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!mod || !hasQuiz(mod.slug) || questions.length === 0) {
    return (
      <section className="panel">
        <div className="panel__header">
          <p className="eyebrow">Topic Deep Dive</p>
          <h2>No questions available</h2>
          <p>This topic has no quiz questions yet.</p>
        </div>
        <Link to="/topics" className="btn">Back to topics</Link>
      </section>
    );
  }

  const question = questions[currentIndex];
  const selectedId = answers[question.id] ?? null;
  const last = currentIndex === questions.length - 1;
  const answeredCount = questions.reduce(
    (n, q) => (answers[q.id] ? n + 1 : n),
    0,
  );

  const handleSelect = (choiceId) => {
    setAnswers((prev) => ({ ...prev, [question.id]: choiceId }));
  };

  const handleNext = () => {
    setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const handleFinish = () => {
    const score = scoreTopic(questions, answers);
    setResult({
      mode: 'topic',
      moduleSlug: mod.slug,
      moduleTitle: mod.title,
      questions,
      answers,
      correct: score.correct,
      total: score.total,
      percentage: score.percentage,
    });
    navigate(`/topics/${mod.slug}/results`);
  };

  return (
    <section className="panel quiz-page">
      <header className="quiz-page__header">
        <p className="eyebrow">Topic Deep Dive · {mod.title}</p>
        <QuizProgress current={currentIndex + 1} total={questions.length} />
        <p className="eyebrow eyebrow--dark">
          Answered {answeredCount} of {questions.length}
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
              Finish topic
            </button>
          )}
        </div>
      </article>

      <div className="quiz-page__footer">
        <Link to={`/topics/${mod.slug}`} className="btn btn--ghost">
          Exit topic
        </Link>
      </div>
    </section>
  );
}

export default TopicPractice;
