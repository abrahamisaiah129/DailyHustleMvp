// Login.jsx - simple placeholder login page
import React from "react";
import { useNavigate } from "react-router-dom";

/* Note: This is only a UI placeholder. Implement proper auth in production. */
export default function Login(){
  const nav = useNavigate();
  function handle(e){
    e.preventDefault();
    // default fake login: navigate to dashboard
    nav("/dashboard");
  }
  return (
    <div style={{maxWidth:420, margin:"40px auto"}}>
      <div className="card">
        <h2 style={{marginTop:0}}>Login</h2>
        <form onSubmit={handle}>
          <div className="form-row">
            <label className="label">Email</label>
            <input className="input" placeholder="you@example.com" />
          </div>
          <div className="form-row">
            <label className="label">Password</label>
            <input className="input" type="password" />
          </div>
          <div className="flex" style={{justifyContent:"flex-end"}}>
            <button className="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
        <small style={{color:"var(--muted)"}}>Default demo login — no backend attached.</small>
      </div>
    </div>
  );
}
