import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'

export default function Header(){
  const { theme, toggleTheme } = useTheme()
  const nav = useNavigate()
  return (
    <div className="d-flex align-items-center justify-content-between">
      <div>
        <button className="btn btn-sm btn-outline-secondary d-lg-none me-2" onClick={()=> {
          document.querySelector('.sidebar')?.classList.toggle('show')
        }}>
          <i className="bi bi-list"></i>
        </button>
        <span className="h5 mb-0">Daily Hustle</span>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-sm btn-outline-primary" onClick={()=> nav('/support')}>Get Support</button>
        <button className="btn btn-sm btn-outline-secondary" onClick={toggleTheme}>
          {theme === 'dark' ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-fill"></i>}
        </button>
      </div>
    </div>
  )
}
