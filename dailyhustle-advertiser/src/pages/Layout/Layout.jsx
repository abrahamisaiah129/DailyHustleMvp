import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Navigation/Sidebar";
import MobileHeader from "../../components/Navigation/Header";

export default function Layout({ theme = "light", setTheme, user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((o) => !o);

  return (
    <div className={`layout ${theme}`}>
      {/* Sidebar (desktop only, or toggle with open state) */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Header always present, but with two modes: */}
      {/* .header-appbar: fixed mobile/tablet (visible <992px), 'Header' props should render as .header-appbar */}
      {/* .header-desktop: regular, relative block on desktop (hidden <992px) */}
      <MobileHeader
        theme={theme}
        setTheme={setTheme}
        user={user}
        onMenuClick={toggleSidebar}
      />

      {/* Main content—pushes for sidebar/header as needed */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
