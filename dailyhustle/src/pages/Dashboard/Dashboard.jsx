import React, { useMemo } from "react";
import { useAppData } from "../../context/App/AppDataContext";
import { useTheme } from "../../hooks/useThemeContext";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Dashboard() {
  const { userData, tasks } = useAppData();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // --------------------------
  // Safe Defaults
  // --------------------------
  const safeUserData = userData || {};
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const userTasks = Array.isArray(safeUserData.tasks)
    ? safeUserData.tasks
    : [];

  // --------------------------
  // Filter Tasks Logic
  // --------------------------
  const unavailableIds = userTasks
    .filter((t) => t.status !== "rejected")
    .map((t) => t.id);
  const availableTasks = safeTasks.filter(
    (t) => !unavailableIds.includes(t.id)
  );

  // --------------------------
  // Stats
  // --------------------------
  const walletBalance = safeUserData.balance || 0;
  const completedTasks = userTasks.filter(
    (t) =>
      t.status === "verified" ||
      t.status === "completed" ||
      t.status === "approved"
  ).length;
  const referrals = Array.isArray(safeUserData.referrals)
    ? safeUserData.referrals.length
    : 0;
  const totalTasks = safeTasks.length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = useMemo(
    () => [
      {
        title: "Wallet Balance",
        icon: "bi-wallet2",
        value: `₦${walletBalance.toLocaleString()}`,
        color: "var(--dh-green)",
        progressValue: 80,
      },
      {
        title: "Completed Tasks",
        icon: "bi-clipboard-check",
        value: `${completedTasks} / ${totalTasks}`,
        color: "var(--dh-blue)",
        progressValue: completionRate,
      },
      {
        title: "Referrals",
        icon: "bi-people",
        value: `${referrals} / 50`,
        color: "var(--dh-yellow)",
        progressValue: Math.min((referrals / 50) * 100, 100),
      },
    ],
    [walletBalance, completedTasks, totalTasks, referrals, completionRate]
  );

  return (
    <section
      className="dashboard-section container-fluid px-3 py-4"
      data-bs-theme={isDark ? "dark" : "light"}
      style={{
        backgroundColor: isDark ? "#121212" : "#f8f9fa",
        minHeight: "100vh",
        color: isDark ? "#f8f9fa" : "#212529",
        transition: "all 0.4s ease",
      }}
    >
      <h2 className="mb-4 fw-bold" style={{ color: "var(--dh-red)" }}>
        <i className="bi bi-speedometer2 me-2"></i> User Dashboard
      </h2>

      {/* Stats Row */}
      <div className="row g-4 mb-5">
        {stats.map((item, i) => (
          <div key={i} className="col-md-4 col-sm-6 col-12">
            <div
              className="card-custom shadow-sm p-3 text-center"
              style={{
                backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
                borderRadius: "12px",
                border: isDark ? "1px solid #2c2c2e" : "1px solid #dee2e6",
              }}
            >
              <i
                className={`${item.icon} fs-1 mb-3`}
                style={{ color: item.color }}
              ></i>
              <h5 className="fw-semibold">{item.title}</h5>
              <p className="fs-5 fw-bold mb-2">{item.value}</p>
              <div
                className="progress mt-3"
                style={{
                  height: "8px",
                  backgroundColor: isDark ? "#333" : "#e9ecef",
                }}
              >
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${item.progressValue}%`,
                    backgroundColor: item.color,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Available Tasks */}
      <div
        className="list-card mt-4 p-4 shadow-sm"
        style={{
          backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
          borderRadius: "12px",
          border: isDark ? "1px solid #2c2c2e" : "1px solid #dee2e6",
          transition: "all 0.3s ease",
        }}
      >
        <h5 className="fw-bold mb-3" style={{ color: "var(--dh-red)" }}>
          📋 Available Tasks ({availableTasks.length})
        </h5>
        <ul className="list-group">
          {availableTasks.length > 0 ? (
            availableTasks.map((task, idx) => (
              <li
                key={idx}
                className={`list-group-item ${
                  isDark ? "bg-dark text-light" : "bg-light"
                }`}
                style={{
                  border: "none",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  padding: "10px 15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "0.2s",
                  cursor: "default",
                }}
              >
                <span>
                  <i
                    className="bi bi-check-circle me-2"
                    style={{ color: "var(--dh-green)" }}
                  ></i>
                  {task.title}
                </span>
                <span className="badge rounded-pill text-bg-danger">
                  ₦{task.payout.toLocaleString()}
                </span>
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted text-center border-0">
              All tasks completed or none available!
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
