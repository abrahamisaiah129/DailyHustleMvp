import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUserData } from "../context/UserDataContext";

import "../styles/Header.css";

const NAV = [
    { to: "/dashboard", label: "Dashboard", icon: "bi-house-door-fill" },
    { to: "/jobs", label: "jobs", icon: "bi-briefcase-fill" },
    { to: "/wallet", label: "Wallet", icon: "bi-wallet2" },
    { to: "/referrals", label: "Referrals", icon: "bi-people-fill" },
    { to: "/notification", label: "Notifications", icon: "bi-bell-fill" },
    { to: "/leaderboard", label: "Leaderboard", icon: "bi-trophy-fill" },
    { to: "/support", label: "Support", icon: "bi-headset" },
    { to: "/settings", label: "Settings", icon: "bi-gear" },
];

export default function Header() {
    const {
        userData: { balance },
        userData: { avatar },
    } = useUserData();
    const [showBalance, setShowBalance] = useState(true);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [themeActive, setThemeActive] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const handleWalletClick = () => navigate("/wallet");
    const drawerRef = useRef(null);
    const [drawerHeight, setDrawerHeight] = useState(0);

    const handleAvatarChange = () => {
        document.getElementById("avatarInput").click();
    };

    useEffect(() => {
        if (drawerRef.current) {
            setDrawerHeight(drawerRef.current.scrollHeight);
        }
        if (menuOpen) {
            setTimeout(() => setOverlayVisible(true), 20);
        } else {
            setOverlayVisible(false);
        }
    }, [menuOpen]);

    const headerBg = theme === "dark" ? "#000" : "#fff";
    const btnOutlineColor = theme === "dark" ? "light" : "dark";

    const handleThemeToggle = () => {
        setThemeActive(true);
        toggleTheme();
        setTimeout(() => setThemeActive(false), 300);
    };

    return (
        <>
            {/* Overlay */}
            {menuOpen && (
                <div
                    className="mobile-menu-overlay"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        opacity: overlayVisible ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        zIndex: 998,
                    }}
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}

            <header
                className="d-flex d-md-none flex-column shadow-sm p-2"
                style={{
                    backgroundColor: headerBg,
                    color: theme === "dark" ? "#fff" : "#000",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    position: "relative",
                    zIndex: 1000,
                }}
            >
                {/* Top row */}
                <div className="d-flex align-items-center justify-content-between">
                    <span className="h5 mb-0 fw-bold" style={{ color: "red" }}>
                        Daily Hustle
                    </span>

                    <div className="d-flex align-items-center gap-2">
                        {/* Theme toggle */}
                        <button
                            className={`btn btn-sm ${
                                themeActive
                                    ? "btn-danger"
                                    : `btn-outline-${btnOutlineColor}`
                            }`}
                            onClick={handleThemeToggle}
                        >
                            {theme === "dark" ? (
                                <i className="bi bi-sun-fill"></i>
                            ) : (
                                <i className="bi bi-moon-fill"></i>
                            )}
                        </button>

                        {/* Menu toggle */}
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <i
                                className="bi bi-grid-fill"
                                style={{
                                    transform: menuOpen
                                        ? "rotate(90deg)"
                                        : "rotate(0deg)",
                                    transition: "transform 0.3s ease",
                                }}
                            ></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                <div
                    ref={drawerRef}
                    className="mobile-menu-drawer"
                    style={{
                        position: "absolute",
                        top: 50,
                        left: 0,
                        width: "100%",
                        height: menuOpen ? `${drawerHeight}px` : 0,
                        backgroundColor: theme === "dark" ? "#111" : "#fff",
                        borderBottomLeftRadius: "12px",
                        borderBottomRightRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        transition:
                            "height 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
                        zIndex: 999,
                    }}
                >
                    {/* Avatar */}
                    <div className="text-center mb-3 mt-2">
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
                        {
                            <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={handleAvatarChange}
                            >
                                Change Avatar
                            </button>
                        }
                        <input
                            type="file"
                            id="avatarInput"
                            style={{ display: "none" }}
                        />
                    </div>

                    {/* Balance Section */}
                    {
                        <div
                            className="mt-3  mb-3 d-flex align-items-center justify-content-between px-3"
                            style={{ cursor: "pointer" }}
                        >
                            <div
                                className="px-1 d-flex align-items-center"
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
                    }

                    {NAV.map((item, index) => (
                        <button
                            key={item.to}
                            className="mobile-nav-link d-flex align-items-center"
                            onClick={() => {
                                navigate(item.to);
                                setMenuOpen(false);
                            }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                width: "100%",
                                padding: "12px 20px",
                                border: "none",
                                borderBottom:
                                    index !== NAV.length - 1
                                        ? `1px solid ${
                                              theme === "dark" ? "#222" : "#eee"
                                          }`
                                        : "none",
                                backgroundColor:
                                    theme === "dark" ? "#111" : "#fff",
                                color: theme === "dark" ? "#fff" : "#000",
                                opacity: menuOpen ? 1 : 0,
                                transform: menuOpen
                                    ? "translateY(0)"
                                    : "translateY(-15px)",
                                transition: `opacity 0.3s ease ${
                                    index * 0.05
                                }s, transform 0.3s ease ${index * 0.05}s`,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    theme === "dark" ? "#222" : "#ffe6e6";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    theme === "dark" ? "#111" : "#fff";
                            }}
                        >
                            {/* Icon with tiny slide-in animation */}
                            <i
                                className={`bi ${item.icon}`}
                                style={{
                                    fontSize: "1.2rem",
                                    transform: menuOpen
                                        ? "translateX(0)"
                                        : "translateX(-10px)",
                                    opacity: menuOpen ? 1 : 0,
                                    transition: `all 0.3s ease ${
                                        index * 0.05
                                    }s`,
                                }}
                            ></i>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </header>
        </>
    );
}
