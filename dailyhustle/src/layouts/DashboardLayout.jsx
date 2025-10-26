import React, { useState } from "react";
import Sidebar from "../components/Navigation/Sidebar";
import Header from "../components/Navigation/Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useThemeContext";
// import "../styles/DailyHustleLayout.css"; // include the fixed CSS file

export default function DashboardLayout() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div
      className="dashboard-layout"
      data-bs-theme={isDark ? "dark" : "light"}
      style={{
        backgroundColor: isDark ? "#121212" : "#f8f9fa",
        color: isDark ? "#f8f9fa" : "#212529",
        minHeight: "100vh",
        overflowX: "hidden",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* SIDEBAR */}
      <aside
        className={`dashboard-sidebar ${collapsed ? "collapsed" : ""}`}
        style={{
          width: collapsed ? "70px" : "240px", // ALWAYS fixed numbers for smooth content offset
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          overflowY: "auto",
          backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
          borderRight: isDark ? "1px solid #2c2c2e" : "1px solid #dee2e6",
          transition: "width 0.3s ease, background 0.3s ease",
          zIndex: 1030,
        }}
      >
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      </aside>

      {/* MAIN SECTION */}
      <div
        className="dashboard-main"
        style={{
          marginLeft: collapsed ? "70px" : "240px",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: isDark ? "#181818" : "#fdfdfd",
        }}
      >
        {/* HEADER */}
        <header
          className="dashboard-header sticky-top shadow-sm"
          style={{
            backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
            borderBottom: isDark ? "1px solid #2c2c2e" : "1px solid #dee2e6",
            zIndex: 1040,
            height: "70px",
          }}
        >
          <Header />
        </header>

        {/* MAIN CONTENT */}
        <main
          className="dashboard-content flex-grow-1 p-3"
          style={{
            backgroundColor: isDark ? "#181818" : "#f8f9fa",
            transition: "background 0.3s ease, color 0.3s ease",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
