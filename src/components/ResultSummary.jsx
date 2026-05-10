import { performanceLabel } from '../quiz/scoring.js';

function ResultSummary({ correct, total, percentage }) {
  const label = performanceLabel(percentage);
  return (
    <div className="result-summary">
      <p className="result-summary__score">
        {correct} / {total}
      </p>
      <p className="result-summary__percentage">{percentage}%</p>
      <p className="result-summary__label">{label}</p>
    </div>
  );
}

export default ResultSummary;
