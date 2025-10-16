// src/pages/Tasks/Tasks.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ModalTask from "../../components/ModalTask";
import { useTheme } from "../../context/ThemeContext";
import { useUserData } from "../../context/UserDataContext";
import { GeneralContext } from "../../context/GeneralContext";

export default function Tasks() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { userData, apply } = useUserData();
    const { tasks: alltasks } = useContext(GeneralContext);

    const [selected, setSelected] = useState(null);
    const [activeTab, setActiveTab] = useState("find");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    // ✅ NEW: Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Show 5 tasks per page

    const isDark = theme === "dark";

    // awodaily Theme colors
    const primary = "#198754"; // Forest Green for awodaily
    // const secondary = "#0d6efd";
    const cardBg = isDark ? "#1c1c1e" : "#ffffff";
    const containerBg = isDark ? "#121212" : "#f8f9fa";
    const textColor = isDark ? "#f8f9fa" : "#212529";
    const labelColor = isDark ? "#adb5bd" : "#6c757d";
    const buttonActiveBg = primary;
    const buttonInactiveBg = isDark ? "#343a40" : "#e9ecef";
    const buttonActiveBorder = isDark ? "#20c997" : "#198754";

    // ✅ NOW USING REAL CONTEXT DATA
    const myTasks = userData?.myTasks || [];

    // --- Displayed Tasks ---
    const displayedTasks = activeTab === "find" ? alltasks : myTasks;

    // --- Search + Filter ---
    const filteredTasks = displayedTasks
        .filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (filter === "Highest Paying") return b.payout - a.payout;
            if (filter === "Newest")
                return new Date(b.dateAdded) - new Date(a.dateAdded);
            if (filter === "Workers Needed") return b.slots - a.slots;
            return 0;
        });

    // ✅ NEW: Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top of tasks list
        document.querySelector(".tasks-table")?.scrollIntoView({
            behavior: "smooth",
        });
    };

    // --- Handle Apply ---
    const handleApply = (task) => {
        if (!userData?.isAuthenticated) {
            toast.error("Please log in to apply for tasks!", {
                position: "top-center",
            });
            navigate("/login");
            return;
        }

        if (!userData?.kycVerified) {
            toast.warning(
                <div className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-exclamation-triangle-fill fs-5 text-warning"></i>
                        <div>
                            <strong>Action Required:</strong> Complete your KYC
                            verification
                        </div>
                    </div>
                    <div>
                        Verify your account to unlock earning opportunities on
                        awodaily.
                    </div>
                    <button
                        className="btn btn-sm btn-outline-warning fw-semibold"
                        onClick={() => {
                            navigate("/kyc");
                            toast.dismiss();
                        }}
                    >
                        Verify Now
                    </button>
                </div>,
                { position: "top-center", autoClose: 6000 }
            );
            return;
        }

        apply(task.id);
        toast.success(
            <div className="d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-success"></i>
                <span>
                    Task applied successfully! Awaiting approval on awodaily.
                </span>
            </div>,
            { position: "top-center" }
        );
        setSelected(null);
    };

    return (
        <div
            className="tasks-container p-3"
            style={{
                backgroundColor: containerBg,
                color: textColor,
                minHeight: "100vh",
                transition: "background-color 0.3s ease, color 0.3s ease",
            }}
        >
            {/* ✅ NEW: Breadcrumbs */}
            <nav aria-label="breadcrumb" className="mb-3">
                <ol
                    className="breadcrumb breadcrumb-sm mb-0"
                    style={{
                        backgroundColor: "transparent",
                        padding: "0.25rem 0",
                    }}
                >
                    <li className="breadcrumb-item">
                        <a
                            href="/"
                            style={{ color: primary, textDecoration: "none" }}
                        >
                            <i className="bi bi-house-door me-1"></i>dailyhustle
                        </a>
                    </li>
                    <li
                        className="breadcrumb-item active"
                        aria-current="page"
                        style={{ color: labelColor }}
                    >
                        {activeTab === "find" ? "Find Tasks" : "My Tasks"}
                    </li>
                </ol>
            </nav>

            {/* awodaily Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h1 className="fw-bold mb-0" style={{ color: primary }}>
                    {activeTab === "find" ? "Find Tasks" : "My Tasks"}
                </h1>
                <div className="text-end">
                    <small style={{ color: labelColor }}>
                        Balance: ₦{userData?.balance?.toLocaleString() || "0"}
                    </small>
                </div>
            </div>

            {/* awodaily Tabs */}
            <div className="d-flex gap-2 mb-3">
                {["find", "my"].map((tab) => (
                    <button
                        key={tab}
                        className="btn btn-sm fw-bold"
                        style={{
                            backgroundColor:
                                activeTab === tab
                                    ? buttonActiveBg
                                    : buttonInactiveBg,
                            color: activeTab === tab ? "#fff" : textColor,
                            border:
                                activeTab === tab
                                    ? `2px solid ${buttonActiveBorder}`
                                    : "none",
                            borderRadius: "8px",
                            padding: "0.5rem 1rem",
                            transition: "all 0.3s ease",
                        }}
                        onClick={() => {
                            setActiveTab(tab);
                            setCurrentPage(1); // Reset to page 1
                        }}
                    >
                        {tab === "find" ? "Find Tasks" : "My Tasks"}
                        {tab === "my" && myTasks.length > 0 && (
                            <span className="ms-1 badge bg-secondary">
                                {myTasks.length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Search + Filter */}
            <div
                className="filter-card mb-3 p-3 d-flex flex-wrap gap-2 align-items-center rounded shadow-sm"
                style={{ backgroundColor: cardBg }}
            >
                <input
                    className="form-control form-control-sm flex-grow-1"
                    placeholder={`Search ${
                        activeTab === "find" ? "tasks" : "my tasks"
                    } on awodaily...`}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // Reset pagination on search
                    }}
                    style={{
                        backgroundColor: isDark ? "#2c2c2e" : "#fff",
                        color: textColor,
                        borderColor: isDark ? "#495057" : "#ced4da",
                    }}
                />
                <select
                    className="form-select form-select-sm"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setCurrentPage(1); // Reset pagination on filter
                    }}
                    style={{
                        width: "220px",
                        backgroundColor: isDark ? "#2c2c2e" : "#fff",
                        color: textColor,
                        borderColor: isDark ? "#495057" : "#ced4da",
                    }}
                >
                    {["All", "Highest Paying", "Newest", "Workers Needed"].map(
                        (option) => (
                            <option key={option}>{option}</option>
                        )
                    )}
                </select>
            </div>

            {/* ✅ NEW: Tasks Counter */}
            <div className="mb-3" style={{ color: labelColor }}>
                <small>
                    Showing {currentTasks.length} of {filteredTasks.length}{" "}
                    tasks
                    {activeTab === "my" && " • "}
                    {activeTab === "my" && `${myTasks.length} total applied`}
                </small>
            </div>

            {/* Task List */}
            <div
                className="tasks-table"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
            >
                {currentTasks.length ? (
                    currentTasks.map((t) => {
                        const progress = Math.min(
                            ((t.completedSlots || 0) / (t.slots || 1)) * 100,
                            100
                        );

                        return (
                            <div
                                key={t.id}
                                className="p-3 mb-3 rounded shadow-sm d-flex justify-content-between align-items-center"
                                style={{
                                    backgroundColor: cardBg,
                                    cursor:
                                        activeTab === "find"
                                            ? "pointer"
                                            : "default",
                                    borderLeft: `5px solid ${t.color}`,
                                    transition: "transform 0.2s ease",
                                }}
                                onClick={() =>
                                    activeTab === "find" && setSelected(t)
                                }
                            >
                                <div className="flex-grow-1 me-3">
                                    <h6 className="fw-bold mb-1">{t.title}</h6>
                                    <small style={{ color: labelColor }}>
                                        {t.category} • {t.completedSlots}/
                                        {t.slots} Done
                                    </small>
                                    <div
                                        className="progress mt-1"
                                        style={{
                                            height: "6px",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${progress}%`,
                                                backgroundColor: t.color,
                                            }}
                                            aria-valuenow={progress}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                </div>

                                <div className="text-end">
                                    <div className="fw-bold text-success mb-2">
                                        ₦{t.payout.toLocaleString()}
                                    </div>
                                    {activeTab === "find" ? (
                                        <button
                                            className="btn btn-sm btn-success fw-bold"
                                            style={{ backgroundColor: primary }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelected(t);
                                            }}
                                        >
                                            Apply Now
                                        </button>
                                    ) : (
                                        <span
                                            className={`badge fw-semibold ${
                                                t.status === "Approved"
                                                    ? "bg-success"
                                                    : t.status ===
                                                      "Pending Approval"
                                                    ? "bg-warning text-dark"
                                                    : "bg-danger"
                                            }`}
                                        >
                                            {t.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div
                        className="text-center py-5"
                        style={{ color: labelColor }}
                    >
                        {activeTab === "find" ? (
                            <>
                                <i className="bi bi-search fs-1 mb-3 opacity-50"></i>
                                <p className="mb-0">
                                    No tasks found matching your search.
                                </p>
                                <small>
                                    Try adjusting your filters or search terms.
                                </small>
                            </>
                        ) : (
                            <>
                                <i className="bi bi-clipboard-x fs-1 mb-3 opacity-50"></i>
                                <p className="mb-2">
                                    You haven't applied to any tasks yet!
                                </p>
                                <button
                                    className="btn btn-success fw-semibold"
                                    style={{ backgroundColor: primary }}
                                    onClick={() => setActiveTab("find")}
                                >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Find Tasks
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* ✅ NEW: Pagination */}
            {totalPages > 1 && (
                <div
                    className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top"
                    style={{ borderColor: isDark ? "#343a40" : "#dee2e6" }}
                >
                    {/* Pages Info */}
                    <small style={{ color: labelColor }}>
                        Page {currentPage} of {totalPages}
                    </small>

                    {/* Pagination Buttons */}
                    <nav aria-label="Task pagination">
                        <ul className="pagination pagination-sm mb-0">
                            <li
                                className={`page-item ${
                                    currentPage === 1 ? "disabled" : ""
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    style={{
                                        color: primary,
                                        borderColor: primary,
                                        backgroundColor: "transparent",
                                    }}
                                >
                                    <i className="bi bi-chevron-left"></i>
                                </button>
                            </li>

                            {/* Page Numbers */}
                            {[...Array(totalPages)].map((_, i) => (
                                <li
                                    key={i + 1}
                                    className={`page-item ${
                                        currentPage === i + 1 ? "active" : ""
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => paginate(i + 1)}
                                        style={{
                                            color:
                                                currentPage === i + 1
                                                    ? "#fff"
                                                    : primary,
                                            backgroundColor:
                                                currentPage === i + 1
                                                    ? primary
                                                    : "transparent",
                                            borderColor: primary,
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}

                            <li
                                className={`page-item ${
                                    currentPage === totalPages ? "disabled" : ""
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        color: primary,
                                        borderColor: primary,
                                        backgroundColor: "transparent",
                                    }}
                                >
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}

            {/* Task Modal */}
            {selected && (
                <ModalTask
                    task={selected}
                    show={!!selected}
                    onClose={() => setSelected(null)}
                    onApply={handleApply}
                />
            )}
        </div>
    );
}
