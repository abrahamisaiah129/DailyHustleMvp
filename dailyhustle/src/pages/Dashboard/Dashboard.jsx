import React, { useState } from "react";
import { useAppData } from "../../hooks/AppDataContext";
import { useTheme } from "../../hooks/useThemeContext";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/Dashboard.css";

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

export default function Dashboard() {
  const { userData, tasks, notifications } = useAppData();
  const { theme } = useTheme();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const isDark = theme === "dark";
  const [showBalance, setShowBalance] = useState(false);

  const name = userData?.username || "User";
  const safeUserData = userData || {};
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const userTasks = Array.isArray(safeUserData.tasks) ? safeUserData.tasks : [];
  const walletBalance = safeUserData.balance || 0;
  const pendingCount = userTasks.filter((t) => t.status === "pending").length;
  const completedCount = userTasks.filter((t) =>
    ["verified", "completed", "approved"].includes(t.status)
  ).length;
  const availableCount = safeTasks.filter(
    (t) => !userTasks.map((u) => u.id).includes(t.id)
  ).length;

  // Unread notifications preview
  const unreadNotifications = Array.isArray(notifications)
    ? notifications.filter((n) => !n.read).slice(0, 3)
    : [];

  return (
    <section className="fintech-ui dash-ui">
      {/* Notification & Greeting Bar + Notification Preview */}
      <div
        className="dash-notification-bar"
        onClick={() => navigate("/notifications")}
        style={{ cursor: "pointer" }}
      >
        <div className="noti-bell">
          <i className="bi bi-bell"></i>
          {unreadNotifications.length > 0 && (
            <span className="noti-badge">{unreadNotifications.length}</span>
          )}
        </div>
        <div className="noti-text">
          Welcome, <span className="user-name">{name}</span> 👋
          {unreadNotifications.length > 0 && (
            <div className="noti-preview-list">
              {unreadNotifications.map((n, i) => (
                <div key={n.id || i} className="noti-preview-item">
                  <i className="bi bi-dot noti-dot" />
                  {n.title || n.message || "Notification"}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Wallet Balance Card */}
      <div className="dash-balance-card">
        <div>
          <span className="balance-label">Wallet Balance</span>
          <div className="balance-amount">
            <i className="bi bi-wallet2 me-1"></i>
            {showBalance ? `₦${walletBalance.toLocaleString()}` : "₦••••••"}
            <button
              className="eye-btn"
              aria-label={showBalance ? "Hide Balance" : "Show Balance"}
              onClick={() => setShowBalance((s) => !s)}
            >
              <i
                className={`bi ${showBalance ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
          </div>
        </div>
        <button className="primary-btn">Add Money</button>
      </div>

      {/* Task Status Cards */}
      <div className="dash-summary-grid">
        <div className="summary-card">
          <div className="summary-label">
            <i className="bi bi-clock-history me-2 summary-icon" />
            Pending
          </div>
          <div className="summary-value">{pendingCount}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">
            <i className="bi bi-check2-circle me-2 summary-icon" />
            Available
          </div>
          <div className="summary-value">{availableCount}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">
            <i className="bi bi-check2-all me-2 summary-icon" />
            Completed
          </div>
          <div className="summary-value">{completedCount}</div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="dash-nav-shortcuts">
        {NAV.slice(0, 5).map((item) => (
          <button
            key={item.name}
            className="nav-shortcut-card"
            onClick={() => navigate(item.path)}
          >
            <i className={`bi ${item.icon} nav-shortcut-icon`} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
