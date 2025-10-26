import React, { useState } from "react";
import { useTheme } from "../../hooks/useThemeContext";
import { useAppData } from "../../context/App/AppDataContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { userData, updateUserData, addNotification, recordTaskHistory } = useAppData();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const isDark = theme === "dark";
  const cardBg = isDark ? "#1c1c1e" : "#fff";
  const containerBg = isDark ? "#121212" : "#f8f9fa";
  const textColor = isDark ? "#f8f9fa" : "#212529";
  const labelColor = isDark ? "#adb5bd" : "#6c757d";
  const borderColor = isDark ? "#333" : "#dee2e6";
  const primary = "var(--dh-red)";
  const gradientBg = isDark
    ? "linear-gradient(135deg, #660000, #240000)"
    : "linear-gradient(135deg, var(--dh-red), #ff4c4c)";

  const {
    username = "User",
    email = "user@email.com",
    phone = "+234 800 000 0000",
    kyc = {},
    notificationsEnabled = true,
    autoWithdraw = false,
  } = userData || {};

  const kycVerified = kyc.status === "verified";

  const tabs = [
    { id: "profile", icon: "person", title: "Profile" },
    { id: "security", icon: "shield-lock", title: "Security" },
    { id: "notifications", icon: "bell", title: "Notifications" },
    { id: "payments", icon: "credit-card", title: "Payments" },
    { id: "privacy", icon: "eye-slash", title: "Privacy" },
  ];

  // -----------------------
  // PROFILE SAVE
  // -----------------------
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      updateUserData({ username, email, phone });
      toast.success("✅ Profile updated successfully!");

      addNotification({
        title: "Profile Updated",
        message: "Your profile settings have been successfully saved.",
        type: "success",
        category: "profile",
      });

      recordTaskHistory(
        "profile_update",
        "updated",
        `Profile details updated (${username}, ${email})`
      );
      setLoading(false);
    }, 800);
  };

  // -----------------------
  // NOTIFICATIONS TOGGLE
  // -----------------------
  const toggleNotifications = () => {
    const newValue = !notificationsEnabled;
    updateUserData({ notificationsEnabled: newValue });

    addNotification({
      title: newValue ? "Notifications Enabled" : "Notifications Disabled",
      message: newValue
        ? "You will now receive in-app alerts."
        : "All notifications have been muted.",
      type: newValue ? "info" : "warning",
      category: "notifications",
    });
    recordTaskHistory(
      "notifications",
      newValue ? "enabled" : "disabled",
      `User toggled notification system`
    );

    toast.success(
      newValue ? "🔔 Notifications enabled" : "🔕 Notifications disabled"
    );
  };

  // -----------------------
  // KYC VERIFY
  // -----------------------
  const verifyKYC = () => {
    navigate("/kyc");
    addNotification({
      title: "KYC Started!",
      message: "Finish verification to unlock withdrawals.",
      type: "success",
      category: "kyc",
    });
    recordTaskHistory("kyc", "started", "User began KYC verification");
  };

  // -----------------------
  // LOGOUT
  // -----------------------
  const logout = () => {
    if (window.confirm("Logout from Daily Hustle?")) {
      recordTaskHistory("session", "logout", "User logged out");
      toast.info("👋 Logged out successfully!");
      navigate("/");
    }
  };

  // -----------------------
  // PROFILE TAB
  // -----------------------
  const renderProfileTab = () => (
    <form onSubmit={handleSaveProfile}>
      <div
        className="mb-4 p-3 rounded-3"
        style={{ backgroundColor: isDark ? "#2a2a2d" : "#f8f9fa" }}
      >
        <label className="form-label fw-bold mb-2" style={{ color: textColor }}>
          <i className="bi bi-person-circle me-2"></i>Full Name
        </label>
        <input
          type="text"
          className="form-control rounded-3 py-3"
          value={username}
          onChange={(e) => updateUserData({ username: e.target.value })}
          style={{
            backgroundColor: cardBg,
            color: textColor,
            borderColor: borderColor,
          }}
        />
      </div>
      <div
        className="mb-4 p-3 rounded-3"
        style={{ backgroundColor: isDark ? "#2a2a2d" : "#f8f9fa" }}
      >
        <label className="form-label fw-bold mb-2" style={{ color: textColor }}>
          <i className="bi bi-envelope me-2"></i>Email
        </label>
        <input
          type="email"
          className="form-control rounded-3 py-3"
          value={email}
          onChange={(e) => updateUserData({ email: e.target.value })}
          style={{
            backgroundColor: cardBg,
            color: textColor,
            borderColor: borderColor,
          }}
        />
      </div>
      <div
        className="mb-4 p-3 rounded-3"
        style={{ backgroundColor: isDark ? "#2a2a2d" : "#f8f9fa" }}
      >
        <label className="form-label fw-bold mb-2" style={{ color: textColor }}>
          <i className="bi bi-telephone me-2"></i>Phone Number
        </label>
        <input
          type="tel"
          className="form-control rounded-3 py-3"
          value={phone}
          onChange={(e) => updateUserData({ phone: e.target.value })}
          style={{
            backgroundColor: cardBg,
            color: textColor,
            borderColor: borderColor,
          }}
        />
      </div>

      <button
        type="submit"
        className="btn w-100 fw-bold py-3 rounded-pill"
        style={{
          background: gradientBg,
          color: "#fff",
          border: "none",
        }}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Saving...
          </>
        ) : (
          <>
            <i className="bi bi-check-circle me-2"></i>Save Profile
          </>
        )}
      </button>
    </form>
  );

  // -----------------------
  // SECURITY TAB
  // -----------------------
  const renderSecurityTab = () => (
    <div className="row g-4">
      <div className="col-12">
        <div
          className="p-4 rounded-4"
          style={{
            backgroundColor: cardBg,
            border: `2px solid ${kycVerified ? primary : "#dc3545"}`,
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-1" style={{ color: textColor }}>
                KYC Verification
              </h6>
              <small
                style={{
                  color: kycVerified ? primary : "#dc3545",
                }}
              >
                {kycVerified ? "Verified ✅" : "Not Verified"}
              </small>
            </div>
            <button
              className="btn fw-bold rounded-pill px-4"
              style={{
                backgroundColor: kycVerified ? primary : gradientBg,
                color: "#fff",
              }}
              onClick={verifyKYC}
              disabled={kycVerified}
            >
              {kycVerified ? "Verified" : "Verify Now"}
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div
          className="p-4 rounded-4"
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
          }}
          onClick={() => toast.info("Change Password feature coming soon!")}
        >
          <i
            className="bi bi-key fs-3 mb-3"
            style={{ color: primary }}
          ></i>
          <h6 className="fw-bold mb-2" style={{ color: textColor }}>
            Change Password
          </h6>
          <small style={{ color: labelColor }}>
            Update account password securely
          </small>
        </div>
      </div>

      <div className="col-md-6">
        <div
          className="p-4 rounded-4 cursor-pointer"
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
          }}
          onClick={logout}
        >
          <i
            className="bi bi-box-arrow-right fs-3 mb-3"
            style={{ color: "#dc3545" }}
          ></i>
          <h6 className="fw-bold mb-2" style={{ color: textColor }}>
            Logout
          </h6>
          <small style={{ color: labelColor }}>Sign out from account</small>
        </div>
      </div>
    </div>
  );

  // -----------------------
  // NOTIFICATIONS TAB
  // -----------------------
  const renderNotificationsTab = () => (
    <div className="row g-4">
      {[
        {
          title: "Task Reminders",
          desc: "Daily task notifications",
        },
        {
          title: "Payment Updates",
          desc: "Withdrawal status alerts",
        },
        {
          title: "Referral Bonus",
          desc: "New friend joined your link",
        },
      ].map((item, i) => (
        <div className="col-md-6" key={i}>
          <div
            className="p-4 rounded-4"
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-1" style={{ color: textColor }}>
                  {item.title}
                </h6>
                <small style={{ color: labelColor }}>{item.desc}</small>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={toggleNotifications}
                  style={{
                    backgroundColor: notificationsEnabled ? primary : labelColor,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="p-4"
      style={{ backgroundColor: containerBg, color: textColor, minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1" style={{ color: primary }}>
            ⚙️ Settings
          </h1>
          <small style={{ color: labelColor }}>
            Manage your Daily Hustle account
          </small>
        </div>
        <button
          className="btn rounded-pill px-3"
          onClick={toggleTheme}
          style={{
            backgroundColor: isDark ? "#fff" : "#000",
            color: isDark ? "#000" : "#fff",
          }}
        >
          <i className={`bi bi-${isDark ? "sun" : "moon"}`}></i>
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-4 text-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`btn rounded-pill mx-1 px-4 py-2 fw-bold ${
              activeTab === tab.id ? "text-white shadow" : ""
            }`}
            style={{
              backgroundColor: activeTab === tab.id ? primary : "transparent",
              color: activeTab === tab.id ? "#fff" : textColor,
              border: `1px solid ${activeTab === tab.id ? primary : borderColor}`,
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={`bi bi-${tab.icon} me-2`}></i>
            {tab.title}
          </button>
        ))}
      </div>

      <div
        className="rounded-4 p-4 shadow-sm"
        style={{ backgroundColor: cardBg }}
      >
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "security" && renderSecurityTab()}
        {activeTab === "notifications" && renderNotificationsTab()}
      </div>
    </div>
  );
}
