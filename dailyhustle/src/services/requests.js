// src/api/user.js - COMPLETE 25 ENDPOINTS FOR USER CONTEXT
import api from "./api"; // ✅ FIXED: 1 LINE!

// ============================================================================
// 🔐 AUTHENTICATION (6 ENDPOINTS)
// ============================================================================
export const authenticateUser = (credentials) => {
  return api.post("/auth/login", credentials); // ✅ FIXED: api.
};

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

export const refreshToken = (refreshToken) => {
  return api.post("/auth/refresh", { refreshToken });
};

export const logoutUser = () => {
  return api.post("/auth/logout");
};

export const resetPassword = (email) => {
  return api.post("/auth/reset-password", { email });
};

export const changePassword = (userId, newPassword) => {
  return api.put("/auth/change-password", { userId, newPassword });
};

// ============================================================================
// 👤 USER PROFILE (8 ENDPOINTS)
// ============================================================================
export const getUser = (userId) => {
  return api.get(`/users/${userId}`);
};

export const getUserProfile = () => {
  return api.get("/users/profile");
};

export const createUser = (userData) => {
  return api.post("/users", userData);
};

export const updateUser = (userId, userData) => {
  return api.put(`/users/${userId}`, userData);
};

export const updateProfile = (userData) => {
  return api.put("/users/profile", userData);
};

export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`);
};

export const getAllUsers = () => {
  return api.get("/users");
};

export const searchUsers = (query) => {
  return api.get("/users/search", { params: { q: query } });
};

// ============================================================================
// 💳 WALLET & STATS (4 ENDPOINTS)
// ============================================================================
export const getWalletBalance = () => {
  return api.get("/wallet/balance");
};

export const getUserStats = () => {
  return api.get("/users/stats");
};

export const getReferralCode = () => {
  return api.get("/users/referral-code");
};

export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  return api.post("/users/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ============================================================================
// 🆔 KYC (3 ENDPOINTS)
// ============================================================================
export const submitKYC = (documents) => {
  const formData = new FormData();
  Object.keys(documents).forEach((key) => {
    formData.append(key, documents[key]);
  });
  return api.post("/kyc/submit", formData);
};

export const getKYCStatus = () => {
  return api.get("/kyc/status");
};

export const verifyKYC = (status) => {
  return api.put("/kyc/verify", { status });
};

// ============================================================================
// 🔔 NOTIFICATIONS (4 ENDPOINTS)
// ============================================================================
export const getNotifications = (params = {}) => {
  return api.get("/notifications", { params });
};

export const markNotificationRead = (notificationId) => {
  return api.put(`/notifications/${notificationId}/read`);
};

export const deleteNotification = (notificationId) => {
  return api.delete(`/notifications/${notificationId}`);
};

export const clearAllNotifications = () => {
  return api.delete("/notifications/all");
};

// ============================================================================
// 📋 TOTAL: 25 ENDPOINTS ✅ READY!
