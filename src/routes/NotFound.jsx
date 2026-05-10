import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="panel">
      <div className="panel__header">
        <h2>Page not found</h2>
        <p>The page you tried to open doesn't exist.</p>
      </div>
      <Link to="/" className="btn btn--primary">Back to home</Link>
    </section>
  );
}

export default NotFound;
