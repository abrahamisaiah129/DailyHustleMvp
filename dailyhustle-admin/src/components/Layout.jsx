// Layout.jsx - Header + Sidebar + Mobile responsive behavior
import React, { useState } from "react";
import { Link } from "react-router-dom";

/*
  Props:
   - children: page content
   - theme, setTheme: theme controls passed from App
*/
export default function Layout({children, theme, setTheme}){
  const [open, setOpen] = useState(false); // mobile sidebar open

  // Toggle theme between 'light' and 'dark'
  function toggleTheme(){
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div>
      {/* Header / Navbar */}
      <header className="header">
        <div className="flex">
          {/* mobile menu button */}
          <button className="btn btn-ghost" onClick={()=>setOpen(o=>!o)} aria-label="Toggle menu">☰</button>

          {/* Logo: default placeholder image (you can replace with real logo) */}
          <Link to="/" className="logo" aria-label="DailyHustle home">
            <img src="/logo-placeholder.png" alt="logo" />
            <span>DailyHustle</span>
          </Link>
        </div>

        {/* Right side: theme toggle */}
        <div className="flex">
          <button className="btn btn-ghost" onClick={toggleTheme}>
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <Link to="/settings" className="btn btn-ghost">Settings</Link>
        </div>
      </header>

      {/* App container with sidebar + main */}
      <div className="app">
        <aside className={`sidebar ${open ? "open" : ""}`} onClick={()=>setOpen(false)}>
          {/* Sidebar shows logo again for mobile */}
          <div className="logo" style={{marginBottom:12}}>
            <img src="/logo-placeholder.png" alt="logo" />
            <strong>DailyHustle</strong>
          </div>

          {/* Simple nav links */}
          <nav>
            <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:8}}>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/posts">Posts / Ads</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </nav>

          <div style={{marginTop:16}}>
            <small style={{color:"var(--muted)"}}>DailyHustle • Admin</small>
          </div>
        </aside>

        <main className="main">
          {/* page content */}
          {children}
        </main>
      </div>
    </div>
  );
}
