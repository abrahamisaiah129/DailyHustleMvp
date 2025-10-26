// App.jsx - sets up routes, layout, theme, and error boundary
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";

/* App component:
 - Provides a simple theme toggle stored in localStorage
 - Sets up routes for the project pages
 - Wraps pages in ErrorBoundary to catch runtime errors
*/
export default function App(){
  const [theme,setTheme] = useState(localStorage.getItem("dh-theme") || "light");

  // apply theme to document root using data-theme attribute (used by CSS variables)
  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    localStorage.setItem("dh-theme", theme);
  },[theme]);

  return (
    // ErrorBoundary catches rendering errors from children
    <ErrorBoundary>
      <Layout theme={theme} setTheme={setTheme}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/settings" element={<Settings />} />
          {/* fallback route */}
          <Route path="*" element={<div className='card'>Page not found</div>} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
}
