import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h4>Daily Hustle</h4>
      <NavLink to="/dashboard" className="nav-link">
        <i className="bi bi-speedometer2 me-2"></i> Dashboard
      </NavLink>
      <NavLink to="/create-campaign" className="nav-link">
        <i className="bi bi-plus-circle me-2"></i> Create Campaign
      </NavLink>
      <NavLink to="/analytics" className="nav-link">
        <i className="bi bi-bar-chart-line me-2"></i> Analytics
      </NavLink>
      <NavLink to="/workers" className="nav-link">
        <i className="bi bi-people me-2"></i> My Workers
      </NavLink>
      <NavLink to="/approvals" className="nav-link">
        <i className="bi bi-check2-square me-2"></i> Approvals
      </NavLink>
      <NavLink to="/wallet" className="nav-link">
        <i className="bi bi-wallet2 me-2"></i> Wallet
      </NavLink>
      <NavLink to="/settings" className="nav-link">
        <i className="bi bi-gear me-2"></i> Settings
      </NavLink>
    </aside>
  );
}
