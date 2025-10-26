// src/pages/KYCForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const KYCForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    nin: "",
    address: "",
    idCard: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "idCard") {
      setFormData({ ...formData, idCard: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    for (let key in formData) data.append(key, formData[key]);

    try {
      // mock endpoint for now
      const res = await axios.post("http://localhost:5000/api/kyc/submit", data);
      if (res.status === 200 || res.data.success) {
        toast.success("✅ KYC submitted successfully!");
      } else {
        toast.error(res.data.message || "Failed to submit KYC");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="card shadow-lg mx-auto p-4" style={{ maxWidth: "600px", borderTop: "5px solid #dc3545" }}>
        <h3 className="fw-bold text-center text-danger mb-3">KYC Verification</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="form-control rounded-3 py-2"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="form-control rounded-3 py-2"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">NIN/BVN</label>
            <input
              type="text"
              name="nin"
              value={formData.nin}
              onChange={handleChange}
              className="form-control rounded-3 py-2"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Residential Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control rounded-3 py-2"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Upload ID Card</label>
            <input
              type="file"
              name="idCard"
              accept="image/*,application/pdf"
              className="form-control rounded-3 py-2"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100 py-2 fw-semibold rounded-3" disabled={loading}>
            {loading ? "Submitting..." : "Submit KYC"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default KYCForm;
