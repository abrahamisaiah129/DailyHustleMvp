import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import AvailableTasks from './pages/Tasks/AvailableTasks'
import Wallet from './pages/Wallet/Wallet'
import Referrals from './pages/Referrals/Referrals'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Support from './pages/Support/Support'
import Settings from './pages/Settings/Settings'
import Layout from './layouts/DashboardLayout'
import { ToastContainer } from 'react-toastify'

export default function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<AvailableTasks />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="referrals" element={<Referrals />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="support" element={<Support />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}
