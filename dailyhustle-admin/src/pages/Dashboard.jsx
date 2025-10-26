// Dashboard.jsx
import React from "react";

/* Dashboard shows small cards and a sample activity feed */
export default function Dashboard(){
  return (
    <div>
      <h1 style={{marginTop:0}}>Dashboard</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
        <div className="card">
          <h3>Active Users</h3>
          <p style={{fontSize:24,fontWeight:700}}>1,234</p>
        </div>
        <div className="card">
          <h3>Active Ads</h3>
          <p style={{fontSize:24,fontWeight:700}}>87</p>
        </div>
        <div className="card">
          <h3>Pending Tasks</h3>
          <p style={{fontSize:24,fontWeight:700}}>5</p>
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <h3>Recent Activity</h3>
        <ul>
          <li>User 'mirajohn01' created a new post</li>
          <li>Ad 102 scheduled for review</li>
          <li>System backup completed</li>
        </ul>
      </div>
    </div>
  );
}
