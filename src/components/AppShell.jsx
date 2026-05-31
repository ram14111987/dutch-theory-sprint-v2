import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { isUsingMemoryFallback } from '../storage/progressStore.js';

function AppShell() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const showFallbackWarning = isUsingMemoryFallback() && !bannerDismissed;

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero__content">
          <p className="eyebrow eyebrow--dark">Dutch Driving Theory Trainer</p>
          <h1>
            <Link to="/" className="hero__title-link">
              Dutch Theory Sprint v2
            </Link>
          </h1>
          <p className="hero__text">
            Gamified Dutch driving theory practice in bite-sized modules.
          </p>
          <nav className="hero__nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'hero__nav-link hero__nav-link--active' : 'hero__nav-link'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/modules"
              className={({ isActive }) =>
                isActive ? 'hero__nav-link hero__nav-link--active' : 'hero__nav-link'
              }
            >
              Modules
            </NavLink>
          </nav>
        </div>
      </header>

      {showFallbackWarning && (
        <div className="storage-warning" role="alert">
          <span>
            <strong>Progress can&apos;t be saved</strong> — your answers won&apos;t persist after you close this tab. localStorage is unavailable in this browser session.
          </span>
          <button
            type="button"
            className="storage-warning__dismiss"
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss warning"
          >
            ✕
          </button>
        </div>
      )}

      <main className="dashboard">
        <Outlet />
      </main>
    </div>
  );
}

export default AppShell;
