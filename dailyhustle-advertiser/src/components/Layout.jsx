// Layout.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Layout({ children, theme, setTheme }) {
  const [open, setOpen] = useState(false); // mobile sidebar toggle

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`layout ${theme}`}>
      {/* Header */}
      <header className="header d-flex justify-content-between align-items-center px-3 py-2 shadow-sm">
        <div className="d-flex align-items-center gap-2">
          {/* Mobile menu button */}
          <button
            className="btn btn-ghost d-md-none"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 logo">
            <img src="/logo-placeholder.png" alt="logo" height={32} />
            <strong>DailyHustle</strong>
          </Link>
        </div>

        {/* Right controls */}
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-ghost" onClick={toggleTheme}>
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <Link to="/settings" className="btn btn-ghost">
            Settings
          </Link>
        </div>
      </header>

      {/* App container */}
      <div className="d-flex">
        {/* Sidebar */}
        <aside
          className={`sidebar bg-dark text-white p-3 ${
            open ? "sidebar-open" : ""
          }`}
          onClick={() => setOpen(false)}
        >
          <div className="logo mb-3 d-flex align-items-center gap-2">
            <img src="/logo-placeholder.png" alt="logo" height={28} />
            <strong>DailyHustle</strong>
          </div>

          <nav>
            <ul className="nav flex-column gap-2">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/posts">
                  Posts / Ads
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/settings">
                  Settings
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-4">
            <small className="text-muted">DailyHustle • Admin</small>
          </div>
        </aside>

        {/* Main content */}
        <main className="main flex-grow-1 p-4">{children}</main>
      </div>

      {/* Minimal CSS for transitions */}
      <style jsx>{`
        .layout {
          height: 100vh;
          overflow-x: hidden;
        }
        .sidebar {
          width: 260px;
          min-width: 260px;
          transition: transform 0.3s ease;
        }
        .sidebar-open {
          transform: translateX(0);
        }
        .sidebar {
          transform: translateX(-100%);
        }
        @media (min-width: 768px) {
          .sidebar {
            transform: translateX(0);
          }
        }
        .main {
          transition: margin-left 0.3s ease;
        }
      `}</style>
    </div>
  );
}
