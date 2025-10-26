import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemeToggleButton from "./ThemeToggleButton";

export default function ResponsiveNav() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);

  // Sidebar links can be reused for mobile/desktop
  const navLinks = (
    <>
      <NavLink className="nav-link" to="/" end>
        Dashboard
      </NavLink>
      <NavLink className="nav-link" to="/campaigns/create">
        Create Campaign
      </NavLink>
      <NavLink className="nav-link" to="/wallet">
        Wallet
      </NavLink>

      {/* Add more as needed */}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`d-none d-lg-flex flex-column vh-100 sidebar shadow`}
        style={{
          width: 220,
          background: isDark ? "#191c1f" : "#fff",
          borderRight: isDark ? "1px solid #222" : "1px solid #eee",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1030,
        }}
      >
        <div
          className="p-3 fw-bold text-center"
          style={{ color: "var(--dh-red)", fontSize: 22 }}
        >
          DailyHustle
        </div>
        <nav className="nav flex-column px-2 gap-2">{navLinks}</nav>
        <div className="mt-auto mb-3 px-2">
          <ThemeToggleButton />
        </div>
      </div>

      {/* Mobile Navbar */}
      <nav
        className={`navbar navbar-expand-lg d-lg-none shadow-sm ${
          isDark ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
      >
        <div className="container-fluid">
          <span
            className="navbar-brand fw-bold"
            style={{ color: "var(--dh-red)" }}
          >
            DailyHustle
          </span>
          <button
            className="navbar-toggler"
            onClick={() => setOpen((prev) => !prev)}
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse${open ? " show" : ""}`}>
            <nav className="navbar-nav">{navLinks}</nav>
            <div className="mt-3 mb-2">
              <ThemeToggleButton />
            </div>
          </div>
        </div>
      </nav>
      {/* content shift for sidebar */}
      <div className="d-lg-block" style={{ marginLeft: 220 }}></div>
    </>
  );
}
