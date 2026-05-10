function ChoiceList({ choices, selectedId, correctIds, submitted, onSelect }) {
  return (
    <ul className="choice-list">
      {choices.map((choice) => {
        const isSelected = selectedId === choice.id;
        const isCorrect = submitted && correctIds.includes(choice.id);
        const isWrongSelection = submitted && isSelected && !isCorrect;

        const classes = ['choice'];
        if (isSelected && !submitted) classes.push('choice--selected');
        if (isCorrect) classes.push('choice--correct');
        if (isWrongSelection) classes.push('choice--wrong');

        return (
          <li key={choice.id}>
            <button
              type="button"
              className={classes.join(' ')}
              disabled={submitted}
              onClick={() => onSelect(choice.id)}
              aria-pressed={isSelected}
            >
              <span className="choice__letter">{choice.id.toUpperCase()}</span>
              <span className="choice__text">{choice.text}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default ChoiceList;
