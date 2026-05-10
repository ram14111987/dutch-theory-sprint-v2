function Explanation({ correct, explanation }) {
  if (!explanation) return null;
  return (
    <div className={`explanation ${correct ? 'explanation--correct' : 'explanation--wrong'}`}>
      <p className="explanation__verdict">{correct ? 'Correct' : 'Not quite'}</p>
      {explanation.short && <p className="explanation__short">{explanation.short}</p>}
      {explanation.examTip && (
        <p className="explanation__tip">
          <strong>Exam tip: </strong>
          {explanation.examTip}
        </p>
      )}
    </div>
  );
}

export default Explanation;
