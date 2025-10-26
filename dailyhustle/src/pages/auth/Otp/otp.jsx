// src/pages/OTPVerification.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/otp/verify", { email, otp });
      if (res.status === 200 || res.data.success) {
        toast.success("🎉 OTP Verified Successfully!");
        window.location.href = "/login";
      } else {
        toast.error("Invalid or expired OTP");
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
      <div className="card shadow-lg p-4 text-center" style={{ maxWidth: "400px", borderTop: "5px solid #dc3545" }}>
        <h4 className="fw-bold text-danger mb-3">OTP Verification</h4>
        <form onSubmit={handleVerify}>
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

          <div className="mb-3">
            <label className="form-label fw-semibold">Enter OTP</label>
            <input
              type="text"
              className="form-control py-2 rounded-3 text-center fs-5 fw-bold"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-danger w-100 fw-semibold rounded-3 py-2" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
