import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUserData } from "../context/UserDataContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Sidebar.css";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [showBalance, setShowBalance] = useState(true);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const {
        userData: { balance },
        userData: { avatar },
    } = useUserData();
    const isDark = theme === "dark";

    const handleWalletClick = () => navigate("/wallet");

    const handleAvatarChange = () => {
        document.getElementById("avatarInput").click();
    };

    return (
        <div
            className={`sidebar d-flex flex-column p-3 ${
                collapsed ? "collapsed" : ""
            }`}
            style={{
                width: collapsed ? "80px" : "260px",
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
                        collapsed
                            ? "bi-arrow-right-square"
                            : "bi-arrow-left-square"
                    }`}
                ></i>
            </button>

            {/* Avatar */}
            <div className="text-center mb-3">
                <img
                    src={avatar} // ✅ use a public folder avatar
                    alt="avatar"
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
                        className="btn btn-sm btn-outline-primary"
                        onClick={handleAvatarChange}
                    >
                        Change Avatar
                    </button>
                )}
                <input
                    type="file"
                    id="avatarInput"
                    style={{ display: "none" }}
                />
            </div>

            {/* Balance Section */}
            {!collapsed && (
                <div
                    className="balance-section mb-3 d-flex align-items-center justify-content-between px-2"
                    style={{ cursor: "pointer" }}
                >
                    <div
                        className="balance-info d-flex align-items-center"
                        onClick={handleWalletClick}
                    >
                        <i className="bi bi-wallet2 fs-5 me-2"></i>
                        <span className="fw-bold">
                            {showBalance
                                ? `₦${balance.toLocaleString()}`
                                : "₦••••••"}
                        </span>
                    </div>
                    <i
                        className={`bi ${
                            showBalance ? "bi-eye" : "bi-eye-slash"
                        } fs-5`}
                        onClick={() => setShowBalance(!showBalance)}
                        style={{ cursor: "pointer" }}
                    ></i>
                </div>
            )}

            {/* Navigation Links */}
            <nav className="nav flex-column flex-grow-1">
                <NavLink to="/dashboard" className="nav-link-item">
                    <i className="bi bi-house-door-fill"></i>
                    {!collapsed && <span>Dashboard</span>}
                </NavLink>

                <NavLink to="/tasks" className="nav-link-item">
                    <i className="bi bi-briefcase-fill"></i>
                    {!collapsed && <span>Tasks</span>}
                </NavLink>

                <NavLink to="/wallet" className="nav-link-item">
                    <i className="bi bi-wallet2"></i>
                    {!collapsed && <span>Wallet</span>}
                </NavLink>

                <NavLink to="/notifications" className="nav-link-item">
                    <i className="bi bi-bell"></i>
                    {!collapsed && <span>Notifications</span>}
                </NavLink>

                <NavLink to="/referrals" className="nav-link-item">
                    <i className="bi bi-people-fill"></i>
                    {!collapsed && <span>Referrals</span>}
                </NavLink>

                <NavLink to="/leaderboard" className="nav-link-item">
                    <i className="bi bi-trophy-fill"></i>
                    {!collapsed && <span>Leaderboard</span>}
                </NavLink>

                <NavLink to="/support" className="nav-link-item">
                    <i className="bi bi-headset"></i>
                    {!collapsed && <span>Support</span>}
                </NavLink>

                <NavLink to="/settings" className="nav-link-item">
                    <i className="bi bi-gear"></i>
                    {!collapsed && <span>Settings</span>}
                </NavLink>

                {/* Theme Toggle Button */}
                <button
                    className="nav-link-item btn btn-outline-secondary mt-2"
                    onClick={toggleTheme}
                >
                    <i
                        className={`bi ${
                            isDark ? "bi-sun-fill" : "bi-moon-fill"
                        }`}
                    ></i>
                    {!collapsed && (
                        <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                    )}
                </button>
            </nav>
        </div>
    );
}
