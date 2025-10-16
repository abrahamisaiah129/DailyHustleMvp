// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import Wallet from "./pages/Wallet/Wallet";
import Referrals from "./pages/Referrals/Referrals";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Notifications from "./pages/Notification/Notifications";
import Transaction from "./pages/Transaction/Transaction";
import Support from "./pages/Support/Support";
import Settings from "./pages/Settings/Settings";
import Layout from "./layouts/DashboardLayout";
import { ToastContainer } from "react-toastify";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={<Navigate to="/dashboard" replace />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="wallet" element={<Wallet />} />
                    <Route path="referrals" element={<Referrals />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                    <Route path="transaction" element={<Transaction />} />
                    <Route path="support" element={<Support />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
            <ToastContainer />
        </>
    );
}
