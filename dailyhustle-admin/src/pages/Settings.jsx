// Settings.jsx
import React from "react";

/* Settings page: include account and appearance settings */
export default function Settings(){
  return (
    <div>
      <h1>Settings</h1>
      <div className="card">
        <h3>Account</h3>
        <p>Default admin@example.com (replace with real user management)</p>
      </div>

      <div className="card">
        <h3>Appearance</h3>
        <p>Use the theme toggle in the top-right to switch between light/dark.</p>
      </div>
    </div>
  );
}
