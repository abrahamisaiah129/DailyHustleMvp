// src/components/Header.jsx
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useThemeContext";
import { useAppData } from "../../context/App/AppDataContext"; // ✅ Updated hook

// Navigation items
const NAV = [
  { name: "Dashboard", path: "/dashboard", icon: "bi-house-door-fill" },
  { name: "Tasks", path: "/tasks", icon: "bi-briefcase-fill" },
  { name: "Wallet", path: "/wallet", icon: "bi-wallet2" },
  { name: "Notifications", path: "/notifications", icon: "bi-bell-fill" },
  { name: "Transactions", path: "/transactions", icon: "bi-list-ul" },
  { name: "Referrals", path: "/referrals", icon: "bi-people-fill" },
  { name: "Support", path: "/support", icon: "bi-headset" },
  { name: "Settings", path: "/settings", icon: "bi-gear" },
];

export default function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Theme control
  const { userData } = useAppData(); // ✅ Unified context access

  const [menuOpen, setMenuOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const isDark = theme === "dark";
  const avatar =
    userData.avatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  const balance = userData.balance ?? 0;

  // ✅ Toggle theme & navigation handlers
  const handleToggleTheme = useCallback(() => toggleTheme(), [toggleTheme]);
  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      setMenuOpen(false);
    },
    [navigate]
  );

  return (
    <>
      {/* Overlay when menu open */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ✅ Mobile Header */}
      <header className="mobile-header d-flex d-md-none">
        <div className="d-flex align-items-center justify-content-between w-100">
          <span className="h5 mb-0 fw-bold" style={{ color: "var(--dh-red)" }}>
            🔥 Daily Hustle
          </span>

          {/* Theme and burger buttons */}
          <div className="d-flex align-items-center gap-2">
            {/* Theme Toggle */}
            <button
              className="btn btn-sm rounded-circle"
              onClick={handleToggleTheme}
              style={{
                width: "36px",
                height: "36px",
                border: `1px solid ${isDark ? "#fff" : "var(--dh-red)"}`,
                color: isDark ? "#fff" : "var(--dh-red)",
              }}
            >
              <i
                className={`bi ${isDark ? "bi-sun-fill" : "bi-moon-fill"}`}
              ></i>
            </button>

            {/* Menu Toggle */}
            <button
              className="btn btn-sm rounded-circle"
              onClick={() => setMenuOpen((prev) => !prev)}
              style={{
                width: "36px",
                height: "36px",
                border: `1px solid ${isDark ? "#fff" : "var(--dh-red)"}`,
                color: isDark ? "#fff" : "var(--dh-red)",
              }}
            >
              <i className={`bi ${menuOpen ? "bi-x" : "bi-grid-fill"}`}></i>
            </button>
          </div>
        </div>

        {/* ✅ Mobile Drawer */}
        {menuOpen && (
          <div
            className="mobile-menu-drawer"
            style={{
              backgroundColor: isDark ? "#1e1e1e" : "#fff",
              color: isDark ? "#fff" : "#212529",
            }}
          >
            {/* Avatar */}
            <div className="text-center py-3 border-bottom">
              <img
                src={avatar}
                alt="avatar"
                className="rounded-circle mb-2"
                style={{
                  width: "60px",
                  height: "60px",
                  border: "3px solid var(--dh-red)",
                  objectFit: "cover",
                }}
              />
              <button className="btn btn-sm btn-outline-danger rounded-pill px-3">
                Change Avatar
              </button>
            </div>

            {/* Wallet balance */}
            <div
              className="px-3 py-3 d-flex align-items-center justify-content-between border-bottom"
              onClick={() => handleNavigate("/wallet")}
            >
              <div className="d-flex align-items-center">
                <i
                  className="bi bi-wallet2 fs-5 me-2"
                  style={{ color: "var(--dh-green)" }}
                ></i>
                <span className="fw-bold">
                  {showBalance
                    ? `₦${balance.toLocaleString()}`
                    : "₦••••••"}
                </span>
              </div>
              <i
                className={`bi ${
                  showBalance ? "bi-eye-slash" : "bi-eye"
                } fs-5`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBalance((prev) => !prev);
                }}
                style={{ color: "var(--dh-muted)", cursor: "pointer" }}
              />
            </div>

            {/* Navigation Links */}
            <div className="nav-links">
              {NAV.map((item, index) => (
                <button
                  key={index}
                  className="nav-link-item w-100"
                  onClick={() => handleNavigate(item.path)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    textAlign: "left",
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    color: "inherit",
                  }}
                >
                  <i className={`bi ${item.icon}`}></i>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
