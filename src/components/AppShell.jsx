import { Link, NavLink, Outlet } from 'react-router-dom';

function AppShell() {
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

      <main className="dashboard">
        <Outlet />
      </main>
    </div>
  );
}

export default AppShell;
