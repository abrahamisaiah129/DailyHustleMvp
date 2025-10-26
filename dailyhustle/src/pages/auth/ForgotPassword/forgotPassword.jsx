// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/otp/send", { email });
      if (res.status === 200 || res.data.success) {
        toast.success("📩 OTP sent to your email!");
        setOtpSent(true);
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (res.status === 200 || res.data.success) {
        toast.success("✅ Password reset successful!");
        setTimeout(() => (window.location.href = "/login"), 1500);
      } else {
        toast.error("Invalid OTP or request expired");
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
      style={{ background: "linear-gradient(135deg, #fff, #ffe5e5)", fontFamily: "Poppins, sans-serif" }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "420px", borderTop: "5px solid #dc3545" }}>
        <h4 className="fw-bold text-center text-danger mb-3">Forgot Password</h4>
        {!otpSent ? (
          <form onSubmit={handleSendOTP}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control py-2 rounded-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-danger w-100 py-2 rounded-3 fw-semibold" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label className="form-label fw-semibold">OTP</label>
              <input
                type="text"
                className="form-control py-2 rounded-3 text-center"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">New Password</label>
              <input
                type="password"
                className="form-control py-2 rounded-3"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-danger w-100 py-2 rounded-3 fw-semibold" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
