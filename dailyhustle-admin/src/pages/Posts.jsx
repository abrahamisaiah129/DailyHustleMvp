// Posts.jsx - page for creating and managing posts / ads
import React, { useState } from "react";

/*
  This page provides a simple form to create posts/ads and a list below.
  In a real app, you'd hook this up to your backend APIs.
*/
export default function Posts() {
  const [items, setItems] = useState([
    { id: 1, title: "Sample ad 1", status: "Published" },
    { id: 2, title: "Worker post: I can do plumbing", status: "Draft" },
  ]);
  const [title, setTitle] = useState("");

  function add() {
    if (!title) return alert("Please add a title");
    const next = { id: Date.now(), title, status: "Draft" };
    setItems([next, ...items]);
    setTitle("");
  }

  return (
    <div>
      <h1>Posts / Ads</h1>

      <div className="card">
        <div className="form-row">
          <label className="label">Title</label>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ad or post title"
          />
        </div>

        <div className="form-row">
          <label className="label">Body</label>
          <textarea
            className="input"
            rows={4}
            placeholder="Write ad content..."
          />
        </div>

        <div className="flex">
          <button className="btn btn-primary" onClick={add}>
            Create
          </button>
          <button className="btn btn-ghost">Save draft</button>
        </div>
      </div>

      <div className="card">
        <h3>Your posts & ads</h3>
        <ul>
          {items.map((i) => (
            <li key={i.id} style={{ marginBottom: 8 }}>
              <strong>{i.title}</strong>{" "}
              <small style={{ color: "var(--muted)" }}>- {i.status}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
