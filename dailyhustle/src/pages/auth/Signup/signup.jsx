import React, { useState } from "react"; // ❌ REMOVED unused useEffect
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    referral_code: "",
    role: "User",
    country: "Ghana",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Send OTP automatically when email field loses focus (onBlur)
  const handleEmailBlur = async () => {
    // ✅ REMOVED unused 'e' param
    if (formData.email && !otpSent) {
      setLoading(true);
      try {
        // First call: Send OTP via register endpoint
        await axios.post(
          "https://daily-hustle-backend-ob8r9.sevalla.app/api/v1/auths/users/register",
          {
            email: formData.email,
            otp_type: "CREATE_ACCOUNT", // Assuming this triggers OTP
          }
        );
        toast.success("✅ OTP sent to your email!");
        setOtpSent(true);
        setShowOtp(true);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to send OTP");
      } finally {
        setLoading(false);
      }
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    // ✅ REMOVED unused 'e' param
    if (!otp || otp.length !== 6) return toast.error("Enter valid 6-digit OTP");
    setLoading(true);
    try {
      const res = await axios.post(
        "https://daily-hustle-backend-ob8r9.sevalla.app/api/v1/auths/users/register/validate-token",
        {
          verification_code: otp,
          email: formData.email,
        }
      );
      if (res.status === 200) {
        toast.success("🎉 OTP verified successfully!");
        setOtpVerified(true);
      } else {
        toast.error(res.data?.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Register with ALL fields
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!otpVerified) return toast.error("Please verify OTP first");

    // Validation
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.username ||
      !formData.phone ||
      !formData.email ||
      !formData.password
    ) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        referral_code: formData.referral_code || "",
        role: formData.role,
        country: formData.country,
      };

      const res = await axios.post(
        "https://daily-hustle-backend-ob8r9.sevalla.app/api/v1/auths/users/register",
        payload
      );

      if (res.status === 201 || res.data.success) {
        toast.success("🎉 Account created successfully!");
        setTimeout(() => (window.location.href = "/login"), 2000);
      } else {
        toast.error(res.data?.message || "Signup failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #ffffff, #ffe5e5)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "500px",
          borderRadius: "16px",
          borderTop: "5px solid #dc3545",
        }}
      >
        <h2 className="fw-bold text-center mb-3 text-danger">Create Account</h2>

        <form onSubmit={handleRegister}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">First Name</label>
              <input
                type="text"
                name="first_name"
                className="form-control rounded-3 py-2"
                value={formData.first_name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Last Name</label>
              <input
                type="text"
                name="last_name"
                className="form-control rounded-3 py-2"
                value={formData.last_name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              name="username"
              className="form-control rounded-3 py-2"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-control rounded-3 py-2"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Email Address *</label>
            <input
              type="email"
              name="email"
              className={`form-control rounded-3 py-2 ${
                otpSent ? "border-success" : ""
              }`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              required
              disabled={loading || otpVerified}
            />
            {otpSent && (
              <small className="text-success position-absolute bottom-0 end-0 me-2">
                ✓ OTP Sent
              </small>
            )}
          </div>

          {/* OTP Verification - Shows after email blur */}
          {showOtp && !otpVerified && (
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Enter OTP (sent to {formData.email})
              </label>
              <div className="input-group">
                <input
                  type="text"
                  maxLength="6"
                  className="form-control rounded-start-3 py-2"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-success rounded-end-3"
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length !== 6}
                >
                  Verify
                </button>
              </div>
              {otpVerified && (
                <small className="text-success d-block mt-1">✓ Verified</small>
              )}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control rounded-3 py-2"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Referral Code</label>
              <input
                type="text"
                name="referral_code"
                className="form-control rounded-3 py-2"
                value={formData.referral_code}
                onChange={handleChange}
                placeholder="REF90876"
                disabled={loading}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Country</label>
              <select
                name="country"
                className="form-select rounded-3 py-2"
                value={formData.country}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Ghana">Ghana</option>
                <option value="Nigeria">Nigeria</option>
                <option value="USA">USA</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className={`btn w-100 py-2 rounded-3 fw-semibold ${
              otpVerified ? "btn-danger" : "btn-secondary"
            }`}
            disabled={loading || !otpVerified}
          >
            {loading
              ? "Creating Account..."
              : otpVerified
              ? "Create Account"
              : "Complete OTP Verification"}
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-danger text-decoration-none fw-semibold"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
