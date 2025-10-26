import React, { useState, useCallback, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useThemeContext"; // Theme hook (stay as is)
import { useAppData } from "../../context/App/AppDataContext"; // ✅ Updated hook

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const navigate = useNavigate();

  // ✅ Updated hook for theme and app data
  const { theme, toggleTheme } = useTheme();
  const { userData } = useAppData();
  const user = userData || {}; // fallback in case context is empty
  const isDark = theme === "dark";

  // ✅ Memoized handlers prevent re-renders
  const handleWalletClick = useCallback(() => navigate("/wallet"), [navigate]);
  const handleAvatarChange = useCallback(() => {
    document.getElementById("avatarInput")?.click();
  }, []);
  const handleLogout = useCallback(() => {
    navigate("/login");
    window.location.reload();
  }, [navigate]);

  // ✅ Default avatar safely handled
  const avatar =
    user.avatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  // ✅ Navigation links (memoized for stability)
  const navLinks = useMemo(
    () => [
      { name: "Dashboard", path: "/dashboard", icon: "bi-house-door-fill" },
      { name: "Tasks", path: "/tasks", icon: "bi-briefcase-fill" },
      { name: "Wallet", path: "/wallet", icon: "bi-wallet2" },
      { name: "Notifications", path: "/notifications", icon: "bi-bell-fill" },
      { name: "Transactions", path: "/transactions", icon: "bi-list-ul" },
      { name: "Referrals", path: "/referrals", icon: "bi-people-fill" },
      { name: "Support", path: "/support", icon: "bi-headset" },
      { name: "Settings", path: "/settings", icon: "bi-gear-fill" },
    ],
    []
  );

  // ✅ Balance formatter
  const formattedBalance =
    user.balance != null ? `₦${user.balance.toLocaleString()}` : "₦0";

  return (
    <div
      className={`sidebar d-flex flex-column p-3 ${collapsed ? "collapsed" : ""}`}
      style={{
        // width: collapsed ? "80px" : "260px",
        width: collapsed ? "80px" : "100%",
        backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
        color: isDark ? "#f8f9fa" : "#212529",
        transition: "all 0.3s ease",
        minHeight: "100vh",
      }}
    >
      {/* Collapse Toggle */}
      <button
        className="btn btn-sm btn-outline-danger mb-3"
        onClick={() => setCollapsed(!collapsed)}
      >
        <i
          className={`bi ${
            collapsed ? "bi-arrow-right-square" : "bi-arrow-left-square"
          }`}
        />
      </button>

      {/* Avatar Section */}
      <div className="text-center mb-3">
        <img
          src={avatar}
          alt="User avatar"
          className="rounded-circle mb-2"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            display: "block",
            margin: "0 auto",
          }}
        />
        {!collapsed && (
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleAvatarChange}
          >
            Change Avatar
          </button>
        )}
        <input type="file" id="avatarInput" style={{ display: "none" }} />
      </div>

      {/* Wallet / Balance */}
      {!collapsed && (
        <div
          className="balance-section mb-3 d-flex align-items-center justify-content-between px-2"
          style={{ cursor: "pointer" }}
        >
          <div
            className="balance-info d-flex align-items-center"
            onClick={handleWalletClick}
          >
            <i className="bi bi-wallet2 fs-5 me-2" />
            <span className="fw-bold">
              {showBalance ? formattedBalance : "₦••••••"}
            </span>
          </div>
          <i
            className={`bi ${showBalance ? "bi-eye" : "bi-eye-slash"} fs-5`}
            onClick={() => setShowBalance(!showBalance)}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}

      {/* Navigation Links */}
      <nav className="nav flex-column">
        {navLinks.map((link) => (
          <NavLink
            to={link.path}
            className="nav-link-item"
            key={link.name}
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#dc3545" : "transparent",
              color: isActive ? "#fff" : isDark ? "#f8f9fa" : "#212529",
              borderRadius: "10px",
              padding: "8px 10px",
              marginBottom: "4px",
              transition: "0.3s",
            })}
          >
            <i className={`bi ${link.icon}`} />
            {!collapsed && <span className="ms-2">{link.name}</span>}
          </NavLink>
        ))}

        {/* Logout */}
        <button
          className="btn btn-outline-danger mt-3"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-left" />
          {!collapsed && <span className="ms-2">Logout</span>}
        </button>

        {/* Theme Toggle */}
        <button
          className="btn btn-outline-secondary mt-2"
          onClick={toggleTheme}
        >
          <i className={`bi ${isDark ? "bi-sun-fill" : "bi-moon-fill"}`} />
          {!collapsed && (
            <span className="ms-2">{isDark ? "Light" : "Dark"} Mode</span>
          )}
        </button>
      </nav>
    </div>
  );
}
