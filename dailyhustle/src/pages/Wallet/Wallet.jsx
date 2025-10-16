// src/pages/Wallet/Wallet.jsx
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useUserData } from "../../context/UserDataContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
    const { theme } = useTheme();
    const { userData, addNotification } = useUserData();
    const navigate = useNavigate();

    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [method, setMethod] = useState("bank");
    const [loading, setLoading] = useState(false);
    const [showBalance, setShowBalance] = useState(true); // ✅ NEW: Eye toggle state

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
        balance = 0,
        kycVerified = false,
        transactions = [],
    } = userData || {};
    const minWithdraw = 1000;
    const canWithdraw = balance >= minWithdraw && kycVerified;

    const handleWithdraw = async (e) => {
        e.preventDefault();
        if (!canWithdraw) {
            toast.error("❌ Complete KYC & minimum ₦1,000 to withdraw!");
            return;
        }

        if (parseFloat(withdrawAmount) < minWithdraw) {
            toast.error(
                `❌ Minimum withdrawal is ₦${minWithdraw.toLocaleString()}`
            );
            return;
        }

        if (parseFloat(withdrawAmount) > balance) {
            toast.error("❌ Insufficient balance!");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            addNotification({
                title: "Withdrawal Requested!",
                message: `₦${parseFloat(
                    withdrawAmount
                ).toLocaleString()} to ${method.toUpperCase()} - Processing...`,
                type: "success",
                category: "wallet",
            });

            toast.success("✅ Withdrawal requested! Processing in 24hrs.");
            setShowWithdrawModal(false);
            setWithdrawAmount("");
            setLoading(false);
        }, 2000);
    };

    const toggleBalanceVisibility = () => {
        setShowBalance(!showBalance);
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
                        Complete verification to withdraw earnings
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
                        Earnings Wallet
                    </h1>
                    <small style={{ color: labelColor }}>
                        Manage your daily hustle earnings
                    </small>
                </div>
            </div>

            {/* Balance Card - HERO STYLE WITH EYE TOGGLE */}
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
                            <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                                <div
                                    style={{ color: labelColor }}
                                    className="fs-5"
                                >
                                    Available Balance
                                </div>
                                <i
                                    className={`bi ${
                                        showBalance ? "bi-eye-slash" : "bi-eye"
                                    } cursor-pointer fs-5`}
                                    style={{ color: labelColor }}
                                    onClick={toggleBalanceVisibility}
                                    title={
                                        showBalance
                                            ? "Hide Balance"
                                            : "Show Balance"
                                    }
                                ></i>
                            </div>
                            <div
                                className="fw-bold mb-4"
                                style={{
                                    fontSize: "3.5rem",
                                    color: primary,
                                    textShadow: "0 2px 4px rgba(25,135,84,0.3)",
                                }}
                            >
                                {showBalance
                                    ? `₦${balance.toLocaleString()}`
                                    : "₦••••••"}
                            </div>
                            <div className="d-flex justify-content-center gap-4 mb-4">
                                <div
                                    className="text-center"
                                    style={{ color: labelColor }}
                                >
                                    <div
                                        className="fs-5 fw-bold"
                                        style={{ color: primary }}
                                    >
                                        ₦{minWithdraw.toLocaleString()}
                                    </div>
                                    <small>Minimum</small>
                                </div>
                                <div
                                    className="vr"
                                    style={{ color: labelColor }}
                                ></div>
                                <div
                                    className="text-center"
                                    style={{ color: labelColor }}
                                >
                                    <div className="fs-5 fw-bold text-success">
                                        {Math.round(balance / minWithdraw)}x
                                    </div>
                                    <small>Withdrawals</small>
                                </div>
                            </div>
                            {canWithdraw ? (
                                <button
                                    className="btn fw-bold mt-2 px-5 py-3 rounded-pill shadow-lg"
                                    style={{
                                        background: gradientBg,
                                        border: "none",
                                        color: "#fff",
                                        fontSize: "1.1rem",
                                        transition: "all 0.3s ease",
                                    }}
                                    onClick={() => setShowWithdrawModal(true)}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.transform =
                                            "scale(1.05)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform =
                                            "scale(1)")
                                    }
                                >
                                    <i className="bi bi-arrow-down-circle me-2"></i>
                                    Withdraw Now
                                </button>
                            ) : (
                                <button
                                    className="btn btn-outline-secondary mt-2 px-5 py-3 rounded-pill"
                                    disabled
                                >
                                    <i className="bi bi-lock-fill me-2"></i>
                                    Cannot Withdraw
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions - BEAUTIFUL CARDS */}
            <div className="row g-4 mb-5">
                {[
                    {
                        icon: "credit-card",
                        title: "Add Funds",
                        desc: "Top up wallet",
                        color: primary,
                        action: () => toast.info("Coming soon!"),
                    },
                    {
                        icon: "people",
                        title: "Referrals",
                        desc: "Earn from friends",
                        color: "#ffc107",
                        action: () => navigate("/referrals"),
                    },
                    {
                        icon: "arrow-down-circle",
                        title: "Withdraw",
                        desc: "Cash out earnings",
                        color: "#dc3545",
                        action: () => setShowWithdrawModal(true),
                    },
                ].map((card, i) => (
                    <div className="col-md-4" key={i}>
                        <div
                            className="p-4 rounded-4 shadow-sm text-center h-100 cursor-pointer"
                            style={{
                                backgroundColor: cardBg,
                                border: `1px solid ${borderColor}`,
                                transition: "all 0.3s ease",
                            }}
                            onClick={card.action}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-8px)";
                                e.currentTarget.style.boxShadow =
                                    "0 15px 30px rgba(0,0,0,0.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 4px 8px rgba(0,0,0,0.1)";
                            }}
                        >
                            <i
                                className={`bi bi-${card.icon} fs-1 mb-3`}
                                style={{ color: card.color }}
                            ></i>
                            <div
                                className="fw-bold mb-2"
                                style={{ color: textColor }}
                            >
                                {card.title}
                            </div>
                            <small style={{ color: labelColor }}>
                                {card.desc}
                            </small>
                        </div>
                    </div>
                ))}
            </div>

            {/* Transaction History - ELEGANT TABLE */}
            <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0" style={{ color: textColor }}>
                        Recent Transactions
                    </h5>
                    <small style={{ color: labelColor }}>
                        {transactions.length} total • Last 30 days
                    </small>
                </div>
                <div
                    className="rounded-4 overflow-hidden shadow-sm"
                    style={{ backgroundColor: cardBg }}
                >
                    {transactions.length > 0 ? (
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
                                            <i className="bi bi-clock me-2"></i>
                                            Date
                                        </th>
                                        <th
                                            style={{
                                                color: textColor,
                                                border: "none",
                                            }}
                                        >
                                            Type
                                        </th>
                                        <th
                                            style={{
                                                color: textColor,
                                                border: "none",
                                            }}
                                        >
                                            Amount
                                        </th>
                                        <th
                                            style={{
                                                color: textColor,
                                                border: "none",
                                            }}
                                        >
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.slice(0, 10).map((tx, i) => (
                                        <tr key={i} className="align-middle">
                                            <td
                                                style={{
                                                    color: labelColor,
                                                    border: "none",
                                                }}
                                            >
                                                {new Date(
                                                    tx.date
                                                ).toLocaleDateString()}
                                            </td>
                                            <td
                                                style={{
                                                    color: textColor,
                                                    border: "none",
                                                }}
                                            >
                                                <span
                                                    className="badge"
                                                    style={{
                                                        backgroundColor:
                                                            tx.type ===
                                                            "Withdrawal"
                                                                ? "#dc3545"
                                                                : primary,
                                                        color: "#fff",
                                                    }}
                                                >
                                                    {tx.type}
                                                </span>
                                            </td>
                                            <td
                                                style={{
                                                    color:
                                                        tx.type === "Withdrawal"
                                                            ? "#dc3545"
                                                            : primary,
                                                    border: "none",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {tx.type === "Withdrawal"
                                                    ? "-"
                                                    : "+"}
                                                ₦{tx.amount.toLocaleString()}
                                            </td>
                                            <td style={{ border: "none" }}>
                                                <span
                                                    className={`badge ${
                                                        tx.status ===
                                                        "Completed"
                                                            ? "bg-success"
                                                            : tx.status ===
                                                              "Pending"
                                                            ? "bg-warning"
                                                            : "bg-danger"
                                                    }`}
                                                >
                                                    {tx.status}
                                                </span>
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
                            <i className="bi bi-wallet2 fs-1 mb-3 opacity-50"></i>
                            <h6 className="mb-0">No transactions yet</h6>
                            <small className="text-muted">
                                Complete tasks to see your earnings history
                            </small>
                        </div>
                    )}
                </div>
            </div>

            {/* Withdrawal Modal - PREMIUM DESIGN */}
            {showWithdrawModal && (
                <div
                    className="modal fade show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div
                            className="modal-content rounded-4 overflow-hidden"
                            style={{
                                backgroundColor: cardBg,
                                color: textColor,
                                border: "none",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                            }}
                        >
                            <div
                                className="modal-header border-0 pb-0"
                                style={{
                                    background: gradientBg,
                                    color: "#fff",
                                }}
                            >
                                <h5 className="modal-title fw-bold mb-0">
                                    <i className="bi bi-arrow-down-circle me-2"></i>
                                    Withdraw Funds
                                </h5>
                                <button
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowWithdrawModal(false)}
                                />
                            </div>
                            <form onSubmit={handleWithdraw}>
                                <div className="modal-body p-4">
                                    <div
                                        className="mb-4 p-3 rounded-3 text-center"
                                        style={{
                                            backgroundColor: isDark
                                                ? "#2a2a2d"
                                                : "#f8f9fa",
                                            border: `1px solid ${borderColor}`,
                                        }}
                                    >
                                        <i
                                            className="bi bi-wallet2 fs-2 mb-2"
                                            style={{ color: primary }}
                                        ></i>
                                        <div style={{ color: labelColor }}>
                                            Available Balance
                                        </div>
                                        <div
                                            className="fw-bold h4 mb-0"
                                            style={{ color: primary }}
                                        >
                                            ₦{balance.toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            className="form-label fw-semibold mb-2"
                                            style={{ color: textColor }}
                                        >
                                            Amount (₦)
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control rounded-3 py-3"
                                            value={withdrawAmount}
                                            onChange={(e) =>
                                                setWithdrawAmount(
                                                    e.target.value
                                                )
                                            }
                                            min={minWithdraw}
                                            placeholder={minWithdraw.toLocaleString()}
                                            style={{
                                                backgroundColor: isDark
                                                    ? "#2a2a2d"
                                                    : "#fff",
                                                color: textColor,
                                                border: `2px solid ${borderColor}`,
                                                fontSize: "1.2rem",
                                            }}
                                            required
                                        />
                                        <small style={{ color: labelColor }}>
                                            Minimum: ₦
                                            {minWithdraw.toLocaleString()}
                                        </small>
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            className="form-label fw-semibold mb-2"
                                            style={{ color: textColor }}
                                        >
                                            Withdrawal Method
                                        </label>
                                        <select
                                            className="form-select rounded-3 py-3"
                                            value={method}
                                            onChange={(e) =>
                                                setMethod(e.target.value)
                                            }
                                            style={{
                                                backgroundColor: isDark
                                                    ? "#2a2a2d"
                                                    : "#fff",
                                                color: textColor,
                                                border: `2px solid ${borderColor}`,
                                                fontSize: "1.1rem",
                                            }}
                                        >
                                            <option value="bank">
                                                🏦 Bank Transfer
                                            </option>
                                            <option value="mobile">
                                                📱 Mobile Money
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer border-0 p-4">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-4 py-2 rounded-pill"
                                        onClick={() =>
                                            setShowWithdrawModal(false)
                                        }
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn fw-bold px-5 py-2 rounded-pill shadow-sm"
                                        style={{
                                            background: gradientBg,
                                            border: "none",
                                            color: "#fff",
                                        }}
                                        disabled={loading || !canWithdraw}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-arrow-down-circle me-2"></i>
                                                Withdraw ₦
                                                {withdrawAmount ||
                                                    minWithdraw.toLocaleString()}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
