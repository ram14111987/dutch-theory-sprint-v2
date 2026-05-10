import ChoiceList from './ChoiceList.jsx';
import Explanation from './Explanation.jsx';

function QuestionCard({
  question,
  selectedId,
  submitted,
  onSelect,
  onSubmit,
  onNext,
  isLast,
}) {
  const correctIds = question.correctChoiceIds || [];
  const isCorrect = submitted && selectedId && correctIds.includes(selectedId);
  const canSubmit = !submitted && Boolean(selectedId);

  return (
    <article className="question-card">
      <h2 className="question-card__stem">{question.stem}</h2>

      <ChoiceList
        choices={question.choices}
        selectedId={selectedId}
        correctIds={correctIds}
        submitted={submitted}
        onSelect={onSelect}
      />

      {submitted && (
        <Explanation correct={isCorrect} explanation={question.explanation} />
      )}

      <div className="question-card__actions">
        {!submitted ? (
          <button
            type="button"
            className="btn btn--primary"
            disabled={!canSubmit}
            onClick={onSubmit}
          >
            Submit answer
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={onNext}>
            {isLast ? 'Finish' : 'Next question'}
          </button>
        )}
      </div>
    </article>
  );
}

export default QuestionCard;
