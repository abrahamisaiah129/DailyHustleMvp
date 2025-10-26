// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
const [formData, setFormData] = useState({
  identifier: "", // can be either email or username
  password: "",
});

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("https://daily-hustle-backend-ob8r9.sevalla.app/api/v1/auths/users/login", formData);

      if (res.status === 200 || res.data.success) {
        toast.success("✅ Login successful!");
        localStorage.setItem("userToken", res.data.token);
        setTimeout(() => (window.location.href = "/dashboard"), 1500);
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #fff, #ffe5e5)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "400px",
          borderRadius: "16px",
          borderTop: "5px solid #dc3545",
        }}
      >
        <h2 className="fw-bold text-center mb-3 text-danger">Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email or Username</label>
            <input
              type="text"
              name="identifier"
              className="form-control rounded-3 py-2"
              value={formData.identifier}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control rounded-3 py-2"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 py-2 rounded-3 fw-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-3">
            Don’t have an account?{" "}
            <a href="/signup" className="text-danger text-decoration-none fw-semibold">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
