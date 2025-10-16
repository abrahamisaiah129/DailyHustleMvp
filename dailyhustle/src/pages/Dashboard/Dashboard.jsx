import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";
import { useUserData } from "../../context/UserDataContext";
import SummaryCard from "../../components/SummaryCard";
import KycVerificationModal from "../../components/KycVerificationModal";
import NotificationModal from "../../components/NotificationModal";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { theme } = useTheme();
    const { userData, addNotification } = useUserData();
    const navigate = useNavigate();

    const [showKycModal, setShowKycModal] = useState(false);
    const [showWalletModal, setShowWalletModal] = useState(false);
    const [showBalance, setShowBalance] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    // ✅ NEW: Selected notification ID
    const [selectedNotificationId, setSelectedNotificationId] = useState(null);

    const isDark = theme === "dark";
    const cardBg = isDark ? "#1c1c1e" : "#ffffff";
    const containerBg = isDark ? "#121212" : "#f8f9fa";
    const textColor = isDark ? "#f8f9fa" : "#212529";
    const labelColor = isDark ? "#adb5bd" : "#6c757d";
    const primary = "#198754"; // awodaily green

    const {
        username = "User",
        balance = 0,
        totalEarnings = 0,
        referralIncome = 0,
        referrals = 0,
        jobsCompleted = 0,
        jobsPendingReview = 0,
        notifications = [],
        kycVerified = false,
    } = userData || {};

    // ✅ UPDATE: Calculate unread count
    useEffect(() => {
        setUnreadCount(notifications.filter((n) => !n.isRead).length);
    }, [notifications]);

    useEffect(() => {
        if (!userData) {
            toast.error("User data not loaded. Please try again.", {
                position: "top-center",
                className: "bg-light text-dark border border-danger rounded-3",
            });
        }
    }, [userData]);

    const handleOpenKyc = () => setShowKycModal(true);
    const handleCloseKyc = () => setShowKycModal(false);
    const handleOpenWallet = () => setShowWalletModal(true);
    const handleCloseWallet = () => setShowWalletModal(false);
    const toggleBalance = () => setShowBalance(!showBalance);

    // ✅ FIXED: Handle notification bell click (opens first unread)
    const handleBellClick = () => {
        const firstUnread = notifications.find((n) => !n.isRead);
        setSelectedNotificationId(firstUnread?.id || notifications[0]?.id);
        setShowNotifications(true);
        // Add welcome notification if first visit
        if (unreadCount === 0) {
            addNotification({
                title: "Welcome to Dashboard!",
                message: `Hi ${username}, check out your earnings summary!`,
                type: "info",
                category: "dashboard",
            });
        }
    };

    // Type colors for awodaily
    const getTypeConfig = (type) => {
        const configs = {
            success: { color: "#198754", icon: "bi-check-circle-fill" },
            error: { color: "#dc3545", icon: "bi-x-circle-fill" },
            info: { color: "#0d6efd", icon: "bi-info-circle-fill" },
            warning: { color: "#ffc107", icon: "bi-exclamation-triangle-fill" },
            login: { color: "#198754", icon: "bi-box-arrow-in-right" },
            kyc: { color: "#17a2b8", icon: "bi-shield-check" },
        };
        return configs[type] || configs.info;
    };

    return (
        <div
            className="dashboard-container p-4"
            style={{
                backgroundColor: containerBg,
                color: textColor,
                minHeight: "100vh",
                transition: "background-color 0.3s ease, color 0.3s ease",
            }}
        >
            {/* Header with Notification Bell */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold" style={{ color: primary }}>
                        Welcome back, {username}
                    </h2>
                    <p style={{ color: labelColor }}>
                        Here's your latest summary
                    </p>
                </div>

                {/* ✅ NEW: Notification Bell */}
                <button
                    className="btn position-relative p-2"
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: textColor,
                    }}
                    onClick={handleBellClick}
                >
                    <i className="bi bi-bell fs-4"></i>
                    {unreadCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Summary Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <SummaryCard
                        icon="bi-wallet2"
                        label="Total Earnings"
                        value={`₦${totalEarnings.toLocaleString()}`}
                        color="success"
                        bg={cardBg}
                        textColor={textColor}
                        labelColor={labelColor}
                    />
                </div>

                {/* Balance with Eye Toggle + Wallet Click */}
                <div className="col-md-3">
                    <div
                        className="p-3 rounded shadow-sm d-flex flex-column justify-content-center"
                        style={{
                            backgroundColor: cardBg,
                            color: textColor,
                            cursor: "pointer",
                            transition:
                                "background-color 0.3s ease, color 0.3s ease",
                        }}
                        onClick={handleOpenWallet}
                    >
                        <div
                            className="d-flex align-items-center justify-content-between"
                            style={{ color: labelColor }}
                        >
                            <span>Available Balance</span>
                            <i
                                className={`bi ${
                                    showBalance
                                        ? "bi-eye-slash-fill"
                                        : "bi-eye-fill"
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBalance();
                                }}
                                style={{
                                    cursor: "pointer",
                                    fontSize: "1.2rem",
                                    color: textColor,
                                }}
                                title={
                                    showBalance
                                        ? "Hide Balance"
                                        : "Show Balance"
                                }
                            />
                        </div>
                        <div className="fw-bold fs-4 mt-2">
                            {showBalance
                                ? `₦${balance.toLocaleString()}`
                                : "₦••••••"}
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <SummaryCard
                        icon="bi-check2-circle"
                        label="Jobs Completed"
                        value={jobsCompleted}
                        color="info"
                        bg={cardBg}
                        textColor={textColor}
                        labelColor={labelColor}
                    />
                </div>
                <div className="col-md-3">
                    <SummaryCard
                        icon="bi-hourglass-split"
                        label="Pending Review"
                        value={jobsPendingReview}
                        color="warning"
                        bg={cardBg}
                        textColor={textColor}
                        labelColor={labelColor}
                    />
                </div>
            </div>

            {/* ✅ FIXED: Recent Notifications - WRAPPED IN ROW/COL */}
            <div className="row g-4">
                {/* Recent Activity - NOW NOTIFICATIONS! (FIXED VERSION) */}
                <div className="col-lg-8">
                    <h5 className="fw-bold mb-3" style={{ color: textColor }}>
                        Recent Notifications
                        {unreadCount > 0 && (
                            <span className="badge bg-danger ms-2">
                                {unreadCount} New
                            </span>
                        )}
                    </h5>
                    <div
                        className="notifications-list"
                        style={{ maxHeight: "400px", overflowY: "auto" }}
                    >
                        {notifications.length > 0 ? (
                            <>
                                {notifications
                                    .filter(
                                        (n) =>
                                            !n.isRead ||
                                            notifications.indexOf(n) < 3
                                    ) // Unread + 3 recent
                                    .slice(0, 5)
                                    .map((notification) => {
                                        const { color, icon } = getTypeConfig(
                                            notification.type
                                        );
                                        return (
                                            <div
                                                key={notification.id}
                                                className="notification-card d-flex align-items-start p-3 mb-2 rounded shadow-sm"
                                                style={{
                                                    backgroundColor:
                                                        !notification.isRead
                                                            ? "#e7f3ff"
                                                            : cardBg,
                                                    color: textColor,
                                                    borderLeft: `5px solid ${color}`,
                                                    cursor: "pointer",
                                                    transition: "all 0.2s ease",
                                                }}
                                                onClick={() => {
                                                    // ✅ FIXED: Pass CORRECT ID
                                                    setSelectedNotificationId(
                                                        notification.id
                                                    );
                                                    setShowNotifications(true);
                                                }}
                                            >
                                                <i
                                                    className={`${icon} me-3`}
                                                    style={{
                                                        fontSize: "1.5rem",
                                                        color: color,
                                                    }}
                                                />
                                                <div className="flex-grow-1">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="fw-bold">
                                                            {notification.title}
                                                        </div>
                                                        {!notification.isRead && (
                                                            <span className="badge bg-primary">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div
                                                        style={{
                                                            color: labelColor,
                                                        }}
                                                        className="small mb-1"
                                                    >
                                                        {notification.message
                                                            .length > 60
                                                            ? `${notification.message.substring(
                                                                  0,
                                                                  60
                                                              )}...`
                                                            : notification.message}
                                                    </div>
                                                    <small
                                                        style={{
                                                            color: labelColor,
                                                        }}
                                                    >
                                                        <i className="bi bi-clock me-1"></i>
                                                        {new Date(
                                                            notification.createdAt
                                                        ).toLocaleString()}
                                                    </small>
                                                </div>
                                            </div>
                                        );
                                    })}

                                {/* ✅ FIXED: See All goes to NOTIFICATIONS PAGE! */}
                                <button
                                    className="btn btn-outline-success rounded-pill mt-3"
                                    style={{
                                        borderColor: primary,
                                        color: primary,
                                    }}
                                    onClick={() => navigate("/notifications")}
                                >
                                    <i className="bi bi-bell me-2"></i>
                                    See All Notifications (
                                    {notifications.length})
                                </button>
                            </>
                        ) : (
                            <div
                                className="text-center py-4"
                                style={{ color: labelColor }}
                            >
                                <i className="bi bi-bell-slash fs-2 mb-3"></i>
                                <p>No notifications yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Referrals and KYC */}
                <div className="col-lg-4">
                    <h5 className="fw-bold mb-3" style={{ color: textColor }}>
                        Referrals
                    </h5>
                    <div
                        className="summary-card p-3 rounded shadow-sm d-flex flex-column justify-content-center align-items-start mb-4"
                        style={{
                            backgroundColor: cardBg,
                            color: textColor,
                            minHeight: "150px",
                        }}
                    >
                        <div
                            style={{ color: labelColor }}
                            className="label mb-2"
                        >
                            Referral Income
                        </div>
                        <div className="value fw-bold fs-4">
                            ₦{referralIncome.toLocaleString()}
                        </div>
                        <div
                            style={{ color: labelColor }}
                            className="small mt-2"
                        >
                            Total earnings from {referrals} referrals this month
                        </div>
                    </div>

                    <h5 className="fw-bold mb-3" style={{ color: textColor }}>
                        KYC Verification
                    </h5>
                    <div
                        className="p-3 rounded shadow-sm"
                        style={{
                            backgroundColor: cardBg,
                            color: textColor,
                        }}
                    >
                        {kycVerified ? (
                            <div className="text-success fw-bold d-flex align-items-center">
                                <i className="bi bi-shield-check me-2"></i>
                                Your KYC is verified!
                            </div>
                        ) : (
                            <div>
                                <p
                                    style={{ color: labelColor }}
                                    className="mb-2"
                                >
                                    Your account is not verified yet. Complete
                                    your KYC to unlock all earning
                                    opportunities.
                                </p>
                                <button
                                    className="btn btn-success fw-bold rounded-pill w-100"
                                    style={{ backgroundColor: primary }}
                                    onClick={handleOpenKyc}
                                >
                                    Verify Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Wallet Modal */}
            {showWalletModal && (
                <div
                    className="modal fade show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div
                            className="modal-content rounded-4"
                            style={{
                                backgroundColor: cardBg,
                                color: textColor,
                            }}
                        >
                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold">
                                    My Wallet
                                </h5>
                                <button
                                    className="btn-close"
                                    onClick={handleCloseWallet}
                                    style={{
                                        filter: isDark ? "invert(1)" : "none",
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p className="fw-semibold mb-2">
                                    Current Balance:
                                </p>
                                <h3 className="fw-bold">
                                    ₦{balance.toLocaleString()}
                                </h3>
                                <hr />
                                <p style={{ color: labelColor }}>
                                    You can deposit, withdraw, or view your
                                    transaction summary from here.
                                </p>
                            </div>
                            <div className="modal-footer border-0">
                                <button
                                    onClick={() => navigate("/wallet")}
                                    className="btn btn-success rounded-pill"
                                    style={{ backgroundColor: primary }}
                                >
                                    Add Funds
                                </button>
                                <button
                                    className="btn btn-outline-secondary rounded-pill"
                                    onClick={handleCloseWallet}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ FIXED: Notification Modal with ID */}
            <NotificationModal
                show={showNotifications}
                onHide={() => {
                    setShowNotifications(false);
                    setSelectedNotificationId(null);
                }}
                notificationId={selectedNotificationId}
            />

            {/* KYC Modal */}
            <KycVerificationModal show={showKycModal} onHide={handleCloseKyc} />
        </div>
    );
}
