import React, { useState, useMemo, useCallback } from "react";
import { useAppData } from "../../hooks/AppDataContext";
import { useTheme } from "../../hooks/useThemeContext";
import { useNavigate } from "react-router-dom";
import EarningsOverview from "../../components/subcomponents/EarningsOverview";
import "bootstrap-icons/font/bootstrap-icons.css";

const NAV_SHORTCUTS = [
  { name: "Tasks", path: "/tasks", icon: "bi-briefcase-fill" },
  { name: "Wallet", path: "/wallet", icon: "bi-wallet2" },
  { name: "Notifications", path: "/notifications", icon: "bi-bell-fill" },
  { name: "Transactions", path: "/transactions", icon: "bi-list-ul" },
  { name: "Referrals", path: "/referrals", icon: "bi-people-fill" },
];

export default function Dashboard() {
  const { userData, tasks = [], notifications = [] } = useAppData();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);

  const isDark = theme === "dark";

  const {
    username = "User",
    balance = 0,
    currency = "₦",
    tasks: userTasks = [],
  } = userData || {};

  const stats = useMemo(() => {
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    const safeUserTasks = Array.isArray(userTasks) ? userTasks : [];
    return {
      pending: safeUserTasks.filter((t) => t.status === "pending").length,
      available: safeTasks.filter(
        (t) => !safeUserTasks.some((ut) => ut.id === t.id)
      ).length,
      completed: safeUserTasks.filter((t) =>
        ["verified", "completed", "approved"].includes(t.status)
      ).length,
    };
  }, [tasks, userTasks]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const handleNavigate = useCallback(
    (path) => () => navigate(path),
    [navigate]
  );
  const toggleBalance = () => setShowBalance((s) => !s);

  return (
    <section className={`fintech-ui dash-ui ${isDark ? "dark-mode" : ""}`}>
      <div
        className="dash-notification-bar"
        onClick={handleNavigate("/notifications")}
        role="button"
        tabIndex={0}
      >
        <div className="noti-bell">
          <i className="bi bi-bell" />
          {unreadCount > 0 && <span className="noti-badge">{unreadCount}</span>}
        </div>
        <div className="noti-text">
          <div>
            Welcome, <strong className="user-name">{username}</strong> 👋
          </div>
        </div>
      </div>

      <div className="dash-balance-card boxed-card">
        <div className="balance-info">
          <span className="balance-label">Wallet Balance</span>
          <div className="balance-amount" aria-live="polite">
            <i className="bi bi-wallet2 me-1" />
            {showBalance ? (
              <strong>
                {currency}
                {balance.toLocaleString()}
              </strong>
            ) : (
              <span className="balance-hidden">{currency}•••••</span>
            )}
            <button
              className="eye-btn"
              onClick={toggleBalance}
              aria-label={showBalance ? "Hide" : "Show"}
            >
              <i className={`bi ${showBalance ? "bi-eye-slash" : "bi-eye"}`} />
            </button>
          </div>
        </div>
        <button className="btn-costom " onClick={handleNavigate("/wallet")}>
          Add Money
        </button>
      </div>

      <div className="dash-stats-card boxed-card">
        <h3 className="stats-title">
          <i className="bi bi-bar-chart-fill me-2"></i>
          Task Summary
        </h3>
        <div className="stats-grid">
          <div className="stat-item pending">
            <i className="bi bi-clock-history" />
            <div>
              <span className="stat-label">Pending</span>
              <strong className="stat-value">{stats.pending}</strong>
            </div>
          </div>
          <div className="stat-item available">
            <i className="bi bi-check2-circle" />
            <div>
              <span className="stat-label">Available</span>
              <strong className="stat-value">{stats.available}</strong>
            </div>
          </div>
          <div className="stat-item completed">
            <i className="bi bi-check2-all" />
            <div>
              <span className="stat-label">Completed</span>
              <strong className="stat-value">{stats.completed}</strong>
            </div>
          </div>
        </div>
      </div>

      <EarningsOverview />

      <div className="dash-nav-card boxed-card">
        <h3 className="nav-title">
          <i className="bi bi-compass me-2"></i>
          Quick Access
        </h3>
        <div className="nav-grid">
          {NAV_SHORTCUTS.map((item) => (
            <button
              key={item.name}
              className="nav-btn"
              onClick={handleNavigate(item.path)}
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
