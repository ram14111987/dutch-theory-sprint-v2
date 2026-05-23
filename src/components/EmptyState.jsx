function EmptyState({ eyebrow, title, message, actions }) {
  return (
    <div className="empty-state-block">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="empty-state-block__title">{title}</h2>
      {message && <p className="empty-state-block__message">{message}</p>}
      {actions && <div className="results-page__actions">{actions}</div>}
    </div>
  );
}

export default EmptyState;
