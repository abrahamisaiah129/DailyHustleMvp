import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: 'bi-house-door-fill' },
  { to: '/tasks', label: 'Tasks', icon: 'bi-briefcase-fill' },
  { to: '/wallet', label: 'Wallet', icon: 'bi-wallet2' },
  { to: '/referrals', label: 'Referrals', icon: 'bi-people-fill' },
  { to: '/leaderboard', label: 'Leaderboard', icon: 'bi-trophy-fill' },
  { to: '/support', label: 'Support', icon: 'bi-headset' },
  { to: '/settings', label: 'Settings', icon: 'bi-gear' },
]

export default function Sidebar(){
  const { theme } = useTheme()
  return (
    <aside className={`sidebar p-3 ${theme === 'dark' ? 'sidebar-dark' : ''}`}>
      <h3 className="mb-4">🚀 Daily Hustle</h3>
      {NAV.map(i=>(
        <NavLink key={i.to} to={i.to} className="d-block nav-link-item mb-1">
          <i className={`bi ${i.icon} me-2`}></i> {i.label}
        </NavLink>
      ))}
    </aside>
  )
}
