// Users.jsx
import React from "react";

/* Users page: shows a simple users table (static sample). Replace with API logic later. */
export default function Users(){
  const sample = [
    {id:1, name:"Miracle Johnson", role:"Worker"},
    {id:2, name:"Tunde A.", role:"Advertiser"},
    {id:3, name:"Aisha M.", role:"Admin"}
  ];

  return (
    <div>
      <h1>Users</h1>
      <div className="card">
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead style={{textAlign:"left",borderBottom:"1px solid rgba(0,0,0,0.06)"}}>
            <tr><th>Name</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {sample.map(u=>(
              <tr key={u.id}>
                <td style={{padding:"8px 0"}}>{u.name}</td>
                <td>{u.role}</td>
                <td>
                  <button className="btn btn-ghost">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
