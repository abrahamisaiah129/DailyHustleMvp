import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Pagination } from "react-bootstrap";
import { useAppData } from "../../context/App/AppDataContext";
import { useTheme } from "../../hooks/useThemeContext";
import ModalTask from "../../components/Modal/ModalTask";

export default function Tasks() {
  const { theme } = useTheme();
  const { userData, tasks, onApplyFunc } = useAppData();

  const [activeTab, setActiveTab] = useState("available");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const isDark = theme === "dark";
  const palette = useMemo(
    () => ({
      bg: isDark ? "#121212" : "#f8f9fa",
      cardBg: isDark ? "#1c1c1e" : "#fff",
      text: isDark ? "#f8f9fa" : "#212529",
      label: isDark ? "#adb5bd" : "#6c757d",
      red: "var(--dh-red)",
      redHover: "#c92b2b",
    }),
    [isDark]
  );

  // Filter tasks based on active tab
  useEffect(() => {
    if (activeTab === "available") {
      // Filter out tasks you have applied for and are neither rejected nor not_attempted
      setFilteredTasks(
        tasks.filter(
          (task) =>
            !userData.tasks?.some(
              (myTask) =>
                myTask.id === task.id &&
                myTask.status !== "rejected" &&
                myTask.status !== "not_attempted"
            )
        )
      );
    } else {
      setFilteredTasks(userData.tasks || []);
    }
    setPage(1);
  }, [activeTab, tasks, userData.tasks]);

  const totalPages = Math.ceil(filteredTasks.length / perPage);
  const visible = filteredTasks.slice((page - 1) * perPage, page * perPage);

  const handleApply = useCallback(
    (task) => {
      onApplyFunc(task);
      setShowModal(false);
    },
    [onApplyFunc]
  );

  const paginationStyle = `
    .pagination .page-item .page-link {
      color: var(--dh-red);
      border-radius: 50%;
      margin: 0 3px;
      border: 1px solid var(--dh-red);
    }
    .pagination .page-item.active .page-link {
      background-color: var(--dh-red);
      color: #fff;
      border-color: var(--dh-red);
    }
    .pagination .page-item .page-link:hover {
      background-color: #c92b2b;
      color: #fff;
      border-color: #c92b2b;
    }
  `;

  return (
    <div
      className="container-fluid py-4 px-3 min-vh-100"
      style={{ background: palette.bg, color: palette.text }}
    >
      <style>{paginationStyle}</style>
      <h2 className="text-center fw-bold mb-4" style={{ color: palette.red }}>
        Tasks
      </h2>

      {/* Tabs */}
      <div className="d-flex justify-content-center mb-4">
        {["available", "myTasks"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn mx-2 rounded-pill ${
              activeTab === tab ? "text-white" : ""
            }`}
            style={{
              backgroundColor: activeTab === tab ? palette.red : "transparent",
              color: activeTab === tab ? "#fff" : palette.label,
              border: `1px solid ${palette.red}`,
              transition: "all 0.3s ease",
            }}
          >
            {tab === "available" ? "Available Tasks" : "My Tasks"}
          </button>
        ))}
      </div>

      {/* List */}
      {visible.length ? (
        visible.map((t) => (
          <div
            key={t.id}
            className="p-3 mb-3 rounded shadow-sm"
            style={{
              backgroundColor: palette.cardBg,
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">{t.title}</h6>
                <p
                  className="small text-uppercase mb-1"
                  style={{ color: palette.label }}
                >
                  {t.category}
                </p>
                <p className="small mb-2">{t.description}</p>
                <div className="d-flex flex-wrap gap-3 small">
                  <span style={{ color: palette.red }}>
                    Reward: ₦{t.payout?.toLocaleString()}
                  </span>
                  <span style={{ color: palette.label }}>
                    Slots: {t.completedSlots}/{t.slots}
                  </span>
                  {t.closed && (
                    <span className="text-danger small">Closed Review</span>
                  )}
                </div>
              </div>
              <button
                className="btn fw-bold rounded-pill text-white"
                style={{
                  backgroundColor: palette.red,
                  minWidth: "130px",
                  border: "none",
                }}
                onClick={() => {
                  setSelectedTask(t);
                  setShowModal(true);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-5" style={{ color: palette.label }}>
          No tasks available.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination style={{ color: palette.red }}>
            <Pagination.Prev
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === page}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            />
          </Pagination>
        </div>
      )}

      {/* MODAL */}
      {selectedTask && (
        <ModalTask
          task={selectedTask}
          show={showModal}
          onClose={() => setShowModal(false)}
          onApply={activeTab === "available" ? handleApply : undefined}
          previewOnly={activeTab !== "available"}
          isReview={selectedTask.closed}
        />
      )}
    </div>
  );
}
