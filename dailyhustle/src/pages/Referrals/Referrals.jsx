// src/pages/Referrals/Referrals.jsx
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useUserData } from "../../context/UserDataContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Referrals() {
    const { theme } = useTheme();
    const { userData, addNotification } = useUserData();
    const navigate = useNavigate();

    const [copied, setCopied] = useState(false);

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
        referralCode = "HUSTLE123",
        referralIncome = 0,
        referrals = 0,
        kycVerified = false,
    } = userData || {};

    const referralLink = `https://dailyhustle.com/ref/${referralCode}`;
    const earningsPerReferral = 500;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            toast.success("✅ Referral link copied!");
            setTimeout(() => setCopied(false), 2000);

            addNotification({
                title: "Referral Link Copied!",
                message: "Share with friends to earn ₦500 each!",
                type: "success",
                category: "referral",
            });
        } catch {
            // ✅ FIXED: Removed unused 'err'
            toast.error("❌ Failed to copy!");
        }
    };

    const shareReferral = () => {
        if (navigator.share) {
            navigator.share({
                title: `Join ${username}'s Daily Hustle Team!`,
                text: `Earn ₦500 daily with me! Use my link:`,
                url: referralLink,
            });
        } else {
            copyToClipboard();
        }
    };

    if (!kycVerified) {
        return (
            <div
                className="p-4 text-center"
                style={{
                    backgroundColor: containerBg,
                    color: textColor,
                    minHeight: "100vh",
                }}
            >
                <div
                    className="rounded-4 p-5 mb-4"
                    style={{
                        background: gradientBg,
                        color: "#fff",
                        maxWidth: "500px",
                        margin: "auto",
                    }}
                >
                    <i className="bi bi-shield-slash fs-1 mb-3"></i>
                    <h1 className="fw-bold mb-3">KYC Required</h1>
                    <p className="mb-4">
                        Complete verification to access referrals
                    </p>
                    <button
                        className="btn btn-light fw-bold px-5 py-3 rounded-pill shadow-lg"
                        onClick={() => navigate("/dashboard")}
                    >
                        Verify KYC Now
                    </button>
                </div>
            </div>
        );
    }

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
                        Referrals
                    </h1>
                    <small style={{ color: labelColor }}>
                        Invite friends, earn ₦500 each!
                    </small>
                </div>
            </div>

            {/* Stats Hero Card */}
            <div className="row g-3 mb-5">
                <div className="col-12">
                    <div className="position-relative overflow-hidden rounded-4 shadow-lg p-5 text-center">
                        <div
                            className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
                            style={{ background: gradientBg }}
                        ></div>
                        <div
                            style={{
                                backgroundColor: cardBg,
                                borderRadius: "24px",
                                padding: "2rem",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            <div className="row g-4 mb-4">
                                <div className="col-md-4 text-center">
                                    <div
                                        className="fs-1 fw-bold"
                                        style={{ color: "#ffc107" }}
                                    >
                                        {referrals}
                                    </div>
                                    <small style={{ color: labelColor }}>
                                        Friends
                                    </small>
                                </div>
                                <div className="col-md-4 text-center">
                                    <div className="fs-1 fw-bold text-success">
                                        ₦{referralIncome.toLocaleString()}
                                    </div>
                                    <small style={{ color: labelColor }}>
                                        Earned
                                    </small>
                                </div>
                                <div className="col-md-4 text-center">
                                    <div
                                        className="fs-1 fw-bold"
                                        style={{ color: primary }}
                                    >
                                        {Math.round(referrals * 100)}%
                                    </div>
                                    <small style={{ color: labelColor }}>
                                        Growth
                                    </small>
                                </div>
                            </div>
                            <div
                                style={{ color: labelColor }}
                                className="mb-3 fs-5"
                            >
                                Earn ₦{earningsPerReferral.toLocaleString()} per
                                referral!
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Referral Link Card */}
            <div className="row g-4 mb-5">
                <div className="col-lg-8">
                    <div
                        className="rounded-4 p-4 shadow-sm"
                        style={{ backgroundColor: cardBg }}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5
                                className="fw-bold mb-0"
                                style={{ color: textColor }}
                            >
                                <i
                                    className="bi bi-link-45deg me-2"
                                    style={{ color: primary }}
                                ></i>
                                Your Referral Link
                            </h5>
                        </div>
                        <div
                            className="input-group mb-3"
                            style={{
                                backgroundColor: isDark ? "#2a2a2d" : "#f8f9fa",
                                borderRadius: "12px",
                                border: `1px solid ${borderColor}`,
                            }}
                        >
                            <input
                                type="text"
                                className="form-control border-0"
                                value={referralLink}
                                readOnly
                                style={{
                                    backgroundColor: "transparent",
                                    color: textColor,
                                    fontSize: "1rem",
                                }}
                            />
                            <button
                                className="btn btn-outline-secondary border-0"
                                type="button"
                                onClick={copyToClipboard}
                                style={{
                                    borderLeft: `1px solid ${borderColor}`,
                                }}
                            >
                                {copied ? (
                                    <i className="bi bi-check-lg text-success"></i>
                                ) : (
                                    <i className="bi bi-copy"></i>
                                )}
                            </button>
                        </div>
                        <small style={{ color: labelColor }}>
                            Anyone who signs up with this link earns you ₦500
                            instantly!
                        </small>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div
                        className="rounded-4 p-4 shadow-sm text-center h-100"
                        style={{ backgroundColor: cardBg }}
                    >
                        <i
                            className="bi bi-share fs-1 mb-3"
                            style={{ color: "#ffc107" }}
                        ></i>
                        <h6
                            className="fw-bold mb-3"
                            style={{ color: textColor }}
                        >
                            Quick Share
                        </h6>
                        <button
                            className="btn w-100 mb-2 fw-bold rounded-pill"
                            style={{
                                background: gradientBg,
                                border: "none",
                                color: "#fff",
                                padding: "12px",
                            }}
                            onClick={shareReferral}
                        >
                            <i className="bi bi-send me-2"></i>
                            Share Now
                        </button>
                        <div className="d-grid gap-2">
                            <button
                                className="btn btn-outline-primary rounded-pill"
                                onClick={() => toast.info("Coming soon!")}
                            >
                                <i className="bi bi-whatsapp me-2"></i>WhatsApp
                            </button>
                            <button
                                className="btn btn-outline-info rounded-pill"
                                onClick={() => toast.info("Coming soon!")}
                            >
                                <i className="bi bi-twitter-x me-2"></i>Twitter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="mb-5">
                <h5 className="fw-bold mb-4" style={{ color: textColor }}>
                    <i
                        className="bi bi-lightbulb me-2"
                        style={{ color: primary }}
                    ></i>
                    How It Works
                </h5>
                <div className="row g-4">
                    {[
                        {
                            step: "1",
                            title: "Share Link",
                            desc: "Send your unique referral link to friends",
                            icon: "share",
                        },
                        {
                            step: "2",
                            title: "They Join",
                            desc: "Friends sign up using your link",
                            icon: "person-plus",
                        },
                        {
                            step: "3",
                            title: "You Earn",
                            desc: "Get ₦500 instantly when they complete first task",
                            icon: "cash-stack",
                        },
                    ].map((item, i) => (
                        <div className="col-md-4" key={i}>
                            <div
                                className="text-center p-4 rounded-4 h-100"
                                style={{
                                    backgroundColor: cardBg,
                                    border: `1px solid ${borderColor}`,
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform =
                                        "translateY(-4px)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform =
                                        "translateY(0)")
                                }
                            >
                                <div
                                    className="fs-2 fw-bold mb-3"
                                    style={{ color: primary }}
                                >
                                    {item.step}
                                </div>
                                <i
                                    className={`bi bi-${item.icon} fs-3 mb-3`}
                                    style={{ color: "#ffc107" }}
                                ></i>
                                <h6
                                    className="fw-bold mb-2"
                                    style={{ color: textColor }}
                                >
                                    {item.title}
                                </h6>
                                <small style={{ color: labelColor }}>
                                    {item.desc}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Referral History */}
            <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0" style={{ color: textColor }}>
                        Referral History
                    </h5>
                    <small style={{ color: labelColor }}>
                        {referrals} total
                    </small>
                </div>
                <div
                    className="rounded-4 overflow-hidden shadow-sm"
                    style={{ backgroundColor: cardBg }}
                >
                    {referrals > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead
                                    style={{
                                        backgroundColor: isDark
                                            ? "#2a2a2d"
                                            : "#f8f9fa",
                                    }}
                                >
                                    <tr>
                                        <th
                                            style={{
                                                color: textColor,
                                                border: "none",
                                            }}
                                        >
                                            Friend
                                        </th>
                                        <th
                                            style={{
                                                color: textColor,
                                                border: "none",
                                            }}
                                        >
                                            Date
                                        </th>
                                        <th
                                            style={{
                                                color: textColor,
                                                border: "none",
                                            }}
                                        >
                                            Earnings
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({
                                        length: Math.min(referrals, 5),
                                    }).map((_, i) => (
                                        <tr key={i}>
                                            <td
                                                style={{
                                                    color: textColor,
                                                    border: "none",
                                                }}
                                            >
                                                <i className="bi bi-person-circle me-2"></i>
                                                Friend {i + 1}
                                            </td>
                                            <td
                                                style={{
                                                    color: labelColor,
                                                    border: "none",
                                                }}
                                            >
                                                {new Date(
                                                    Date.now() - i * 86400000
                                                ).toLocaleDateString()}
                                            </td>
                                            <td
                                                style={{
                                                    color: primary,
                                                    border: "none",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                +₦
                                                {earningsPerReferral.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div
                            className="text-center py-5"
                            style={{ color: labelColor }}
                        >
                            <i className="bi bi-people fs-1 mb-3 opacity-50"></i>
                            <h6 className="mb-0">No referrals yet</h6>
                            <small className="text-muted">
                                Share your link to get started!
                            </small>
                            <button
                                className="btn mt-3 fw-bold rounded-pill"
                                style={{
                                    background: gradientBg,
                                    color: "#fff",
                                    border: "none",
                                }}
                                onClick={shareReferral}
                            >
                                Start Referring
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
