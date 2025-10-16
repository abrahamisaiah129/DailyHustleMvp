// src/pages/Settings/Settings.jsx
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useUserData } from "../../context/UserDataContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Settings() {
    const { theme, toggleTheme } = useTheme();
    const { userData, updateUserData, addNotification } = useUserData();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);

    const isDark = theme === "dark";
    const cardBg = isDark ? "#1c1c1e" : "#ffffff";
    const containerBg = isDark ? "#121212" : "#f8f9fa";
    const textColor = isDark ? "#f8f9fa" : "#212529";
    const labelColor = isDark ? "#adb5bd" : "#6c757d";
    const primary = "#198754";
    const borderColor = isDark ? "#333" : "#dee2e6";
    const gradientBg = isDark
        ? "linear-gradient(135deg, #5a189a, #240046)"
        : "linear-gradient(135deg, #198754, #20c997)";

    const {
        username = "User",
        email = "user@email.com",
        phone = "+234 800 000 0000",
        kycVerified = false,
        notificationsEnabled = true,
        autoWithdraw = false,
    } = userData || {};

    const tabs = [
        { id: "profile", icon: "person", title: "Profile" },
        { id: "security", icon: "shield-lock", title: "Security" },
        { id: "notifications", icon: "bell", title: "Notifications" },
        { id: "payments", icon: "credit-card", title: "Payments" },
        { id: "privacy", icon: "eye-slash", title: "Privacy" },
    ];

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            updateUserData({ username, email, phone });
            toast.success("✅ Profile updated successfully!");
            setLoading(false);
        }, 1000);
    };

    const toggleNotifications = () => {
        updateUserData({ notificationsEnabled: !notificationsEnabled });
        toast.success(
            notificationsEnabled
                ? "🔔 Notifications disabled"
                : "🔔 Notifications enabled"
        );
    };

    const verifyKYC = () => {
        navigate("/dashboard");
        addNotification({
            title: "KYC Started!",
            message: "Complete verification to unlock withdrawals",
            type: "success",
            category: "kyc",
        });
    };

    const logout = () => {
        if (window.confirm("Logout and return to home?")) {
            toast.info("👋 See you soon!");
            navigate("/");
        }
    };

    const renderProfileTab = () => (
        <form onSubmit={handleSaveProfile}>
            <div
                className="mb-4 p-3 rounded-3"
                style={{ backgroundColor: isDark ? "#2a2a2d" : "#f8f9fa" }}
            >
                <label
                    className="form-label fw-bold mb-2"
                    style={{ color: textColor }}
                >
                    <i className="bi bi-person-circle me-2"></i>Full Name
                </label>
                <input
                    type="text"
                    className="form-control rounded-3 py-3"
                    value={username}
                    onChange={(e) =>
                        updateUserData({ username: e.target.value })
                    }
                    style={{
                        backgroundColor: cardBg,
                        color: textColor,
                        borderColor: borderColor,
                    }}
                />
            </div>
            <div
                className="mb-4 p-3 rounded-3"
                style={{ backgroundColor: isDark ? "#2a2a2d" : "#f8f9fa" }}
            >
                <label
                    className="form-label fw-bold mb-2"
                    style={{ color: textColor }}
                >
                    <i className="bi bi-envelope me-2"></i>Email
                </label>
                <input
                    type="email"
                    className="form-control rounded-3 py-3"
                    value={email}
                    onChange={(e) => updateUserData({ email: e.target.value })}
                    style={{
                        backgroundColor: cardBg,
                        color: textColor,
                        borderColor: borderColor,
                    }}
                />
            </div>
            <div
                className="mb-4 p-3 rounded-3"
                style={{ backgroundColor: isDark ? "#2a2a2d" : "#f8f9fa" }}
            >
                <label
                    className="form-label fw-bold mb-2"
                    style={{ color: textColor }}
                >
                    <i className="bi bi-telephone me-2"></i>Phone
                </label>
                <input
                    type="tel"
                    className="form-control rounded-3 py-3"
                    value={phone}
                    onChange={(e) => updateUserData({ phone: e.target.value })}
                    style={{
                        backgroundColor: cardBg,
                        color: textColor,
                        borderColor: borderColor,
                    }}
                />
            </div>
            <button
                type="submit"
                className="btn w-100 fw-bold py-3 rounded-pill"
                style={{
                    background: gradientBg,
                    color: "#fff",
                    border: "none",
                }}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                    </>
                ) : (
                    <>
                        <i className="bi bi-check-circle me-2"></i>
                        Save Profile
                    </>
                )}
            </button>
        </form>
    );

    const renderSecurityTab = () => (
        <div className="row g-4">
            <div className="col-12">
                <div
                    className="p-4 rounded-4"
                    style={{
                        backgroundColor: cardBg,
                        border: `2px solid ${
                            kycVerified ? primary : "#dc3545"
                        }`,
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6
                                className="fw-bold mb-1"
                                style={{ color: textColor }}
                            >
                                KYC Verification
                            </h6>
                            <small
                                style={{
                                    color: kycVerified ? primary : "#dc3545",
                                }}
                            >
                                {kycVerified ? "Verified ✅" : "Not verified"}
                            </small>
                        </div>
                        <button
                            className="btn fw-bold rounded-pill px-4"
                            style={{
                                backgroundColor: kycVerified
                                    ? primary
                                    : gradientBg,
                                color: "#fff",
                            }}
                            onClick={verifyKYC}
                            disabled={kycVerified}
                        >
                            {kycVerified ? "Verified" : "Verify Now"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div
                    className="p-4 rounded-4 cursor-pointer"
                    style={{
                        backgroundColor: cardBg,
                        border: `1px solid ${borderColor}`,
                    }}
                    onClick={() => toast.info("Coming soon!")}
                >
                    <i
                        className="bi bi-key fs-3 mb-3"
                        style={{ color: primary }}
                    ></i>
                    <h6 className="fw-bold mb-2" style={{ color: textColor }}>
                        Change Password
                    </h6>
                    <small style={{ color: labelColor }}>
                        Update your account password
                    </small>
                </div>
            </div>
            <div className="col-md-6">
                <div
                    className="p-4 rounded-4 cursor-pointer"
                    style={{
                        backgroundColor: cardBg,
                        border: `1px solid ${borderColor}`,
                    }}
                    onClick={logout}
                >
                    <i
                        className="bi bi-box-arrow-right fs-3 mb-3"
                        style={{ color: "#dc3545" }}
                    ></i>
                    <h6 className="fw-bold mb-2" style={{ color: textColor }}>
                        Logout
                    </h6>
                    <small style={{ color: labelColor }}>
                        Sign out of account
                    </small>
                </div>
            </div>
        </div>
    );

    const renderNotificationsTab = () => (
        <div className="row g-4">
            {[
                {
                    title: "Task Reminders",
                    desc: "Daily task notifications",
                    type: "tasks",
                },
                {
                    title: "Payment Alerts",
                    desc: "Withdrawal status updates",
                    type: "payments",
                },
                {
                    title: "Referral Bonus",
                    desc: "New referral earnings",
                    type: "referrals",
                },
                {
                    title: "Leaderboard",
                    desc: "Rank changes & prizes",
                    type: "leaderboard",
                },
            ].map((item, i) => (
                <div className="col-md-6" key={i}>
                    <div
                        className="p-4 rounded-4"
                        style={{
                            backgroundColor: cardBg,
                            border: `1px solid ${borderColor}`,
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6
                                    className="fw-bold mb-1"
                                    style={{ color: textColor }}
                                >
                                    {item.title}
                                </h6>
                                <small style={{ color: labelColor }}>
                                    {item.desc}
                                </small>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={notificationsEnabled}
                                    onChange={toggleNotifications}
                                    style={{
                                        backgroundColor: notificationsEnabled
                                            ? primary
                                            : labelColor,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderPaymentsTab = () => (
        <div className="row g-4">
            <div className="col-md-6">
                <div
                    className="p-4 rounded-4"
                    style={{
                        backgroundColor: cardBg,
                        border: `1px solid ${borderColor}`,
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h6
                                className="fw-bold mb-0"
                                style={{ color: textColor }}
                            >
                                Auto Withdraw
                            </h6>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={autoWithdraw}
                                onChange={(e) =>
                                    updateUserData({
                                        autoWithdraw: e.target.checked,
                                    })
                                }
                                style={{
                                    backgroundColor: autoWithdraw
                                        ? primary
                                        : labelColor,
                                }}
                            />
                        </div>
                    </div>
                    <small style={{ color: labelColor }}>
                        Automatically withdraw when balance ≥ ₦5,000
                    </small>
                </div>
            </div>
            <div className="col-md-6">
                <div
                    className="p-4 rounded-4 cursor-pointer"
                    style={{
                        backgroundColor: cardBg,
                        border: `1px solid ${borderColor}`,
                    }}
                    onClick={() => toast.info("Coming soon!")}
                >
                    <i
                        className="bi bi-bank fs-3 mb-3"
                        style={{ color: primary }}
                    ></i>
                    <h6 className="fw-bold mb-2" style={{ color: textColor }}>
                        Bank Details
                    </h6>
                    <small style={{ color: labelColor }}>
                        Update bank account
                    </small>
                </div>
            </div>
        </div>
    );

    const renderPrivacyTab = () => (
        <div className="row g-4">
            {[
                {
                    title: "Profile Visibility",
                    desc: "Show your rank publicly",
                    icon: "eye",
                    color: primary,
                },
                {
                    title: "Data Sharing",
                    desc: "Share anonymized stats",
                    icon: "graph-up",
                    color: "#ffc107",
                },
                {
                    title: "Delete Account",
                    desc: "Permanently remove account",
                    icon: "trash",
                    color: "#dc3545",
                },
            ].map((item, i) => (
                <div className="col-md-4" key={i}>
                    <div
                        className="p-4 rounded-4 text-center h-100 cursor-pointer"
                        style={{
                            backgroundColor: cardBg,
                            border: `1px solid ${borderColor}`,
                        }}
                        onClick={() =>
                            item.icon === "trash"
                                ? logout()
                                : toast.info("Coming soon!")
                        }
                    >
                        <i
                            className={`bi bi-${item.icon} fs-2 mb-3`}
                            style={{ color: item.color }}
                        ></i>
                        <h6
                            className="fw-bold mb-2"
                            style={{ color: textColor }}
                        >
                            {item.title}
                        </h6>
                        <small style={{ color: labelColor }}>{item.desc}</small>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div
            className="p-4"
            style={{
                backgroundColor: containerBg,
                color: textColor,
                minHeight: "100vh",
            }}
        >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="fw-bold mb-1" style={{ color: primary }}>
                        ⚙️ Settings
                    </h1>
                    <small style={{ color: labelColor }}>
                        Customize your Daily Hustle experience
                    </small>
                </div>
                <button
                    className="btn rounded-pill px-3"
                    onClick={toggleTheme}
                    style={{
                        backgroundColor: isDark ? "#fff" : "#000",
                        color: isDark ? "#000" : "#fff",
                    }}
                >
                    <i className={`bi bi-${isDark ? "sun" : "moon"}`}></i>
                </button>
            </div>

            {/* Tabs */}
            <div className="mb-4">
                <div className="d-flex gap-2 justify-content-center flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`btn rounded-pill px-4 py-2 fw-bold ${
                                activeTab === tab.id ? "shadow-lg" : ""
                            }`}
                            style={{
                                backgroundColor:
                                    activeTab === tab.id
                                        ? gradientBg
                                        : "transparent",
                                color:
                                    activeTab === tab.id ? "#fff" : textColor,
                                border: `2px solid ${
                                    activeTab === tab.id ? "#fff" : borderColor
                                }`,
                            }}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <i className={`bi bi-${tab.icon} me-2`}></i>
                            {tab.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div
                className="rounded-4 p-4 shadow-lg"
                style={{ backgroundColor: cardBg }}
            >
                {activeTab === "profile" && renderProfileTab()}
                {activeTab === "security" && renderSecurityTab()}
                {activeTab === "notifications" && renderNotificationsTab()}
                {activeTab === "payments" && renderPaymentsTab()}
                {activeTab === "privacy" && renderPrivacyTab()}
            </div>
        </div>
    );
}
