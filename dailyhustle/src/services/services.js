// src/api/userServices.js
import api from "./api";

/* -------------------------------------------------------------------------- */
/*                                 USER AUTH                                  */
/* -------------------------------------------------------------------------- */

/**
 * Send OTP to user
 * POST /auths/users/send-otp
 * @param {Object} data - { phone: string }
 * Body:
 * {
 *   "phone": "string"
 * }
 */
export const userSendOTP = (data) => api.post("/auths/users/send-otp", data);

/**
 * Verify OTP
 * POST /auths/users/verify-otp
 * @param {Object} data - { phone: string, otp: string }
 * Body:
 * {
 *   "phone": "string",
 *   "otp": "string"
 * }
 */
export const userVerifyOTP = (data) =>
  api.post("/auths/users/verify-otp", data);

/**
 * Register a new user
 * POST /auths/users/register
 * @param {Object} data - { username: string, password: string, ... }
 * Body:
 * {
 *   "username": "string",
 *   "password": "string",
 *   // other registration fields
 * }
 */
export const userRegister = (data) => api.post("/auths/users/register", data);

/**
 * Validate user registration token
 * POST /auths/users/register/validate-token
 * @param {Object} data - { token: string }
 * Body:
 * {
 *   "token": "string"
 * }
 */
export const userValidateRegistrationToken = (data) =>
  api.post("/auths/users/register/validate-token", data);

/**
 * User login
 * POST /auths/users/login
 * @param {Object} data - { username: string, password: string }
 * Body:
 * {
 *   "username": "string",
 *   "password": "string"
 * }
 */
export const userLogin = (data) => api.post("/auths/users/login", data);

/**
 * Check if username exists
 * POST /auths/users/verify-username
 * @param {Object} data - { username: string }
 * Body:
 * {
 *   "username": "string"
 * }
 */
export const userUsernameExists = (data) =>
  api.post("/auths/users/verify-username", data);

/**
 * Reset password
 * POST /auths/users/reset-password
 * @param {Object} data - { phone: string, otp: string, new_password: string }
 * Body:
 * {
 *   "phone": "string",
 *   "otp": "string",
 *   "new_password": "string"
 * }
 */
export const userResetPassword = (data) =>
  api.post("/auths/users/reset-password", data);

/* -------------------------------------------------------------------------- */
/*                                 USER PROFILE                               */
/* -------------------------------------------------------------------------- */

/**
 * Get current user profile
 * GET /users/me
 * No params or body
 */
export const userGetProfile = () => api.get("/users/me");

/**
 * Update user profile
 * PATCH /users/me
 * @param {Object} data - { ...profileFields }
 * Body:
 * {
 *   // profile fields to update
 * }
 */
export const userUpdateProfile = (data) => api.patch("/users/me", data);

/**
 * Submit KYC
 * PATCH /users/me
 * @param {Object} data - { ...kycFields }
 * Body:
 * {
 *   // KYC fields to update
 * }
 */
export const userSubmitKYC = (data) => api.patch("/users/me", data);

/* -------------------------------------------------------------------------- */
/*                                 TASKS                                      */
/* -------------------------------------------------------------------------- */

/**
 * Get available tasks
 * GET /tasks
 * No params or body
 */
export const userGetAvailableTasks = () => api.get("/tasks");

/**
 * View a single task
 * GET /tasks/{task_id}
 * @param {string} taskId
 * No body
 */
export const userViewTask = (taskId) => api.get(`/tasks/${taskId}`);

/**
 * Start a task
 * POST /task-proof
 * @param {Object} data - { task_id: string }
 * Body:
 * {
 *   "task_id": "string"
 * }
 */
export const userStartTask = (data) => api.post("/task-proof", data);

/**
 * Get my tasks (task proofs)
 * GET /task-proof/users
 * No params or body
 */
export const userGetMyTasks = () => api.get("/task-proof/users");

/**
 * Submit task proof
 * PATCH /task-proof/users/{task_proof_id}
 * @param {string} taskProofId
 * @param {Object} data - { ...proofFields }
 * Body:
 * {
 *   // proof fields to update
 * }
 */
export const userSubmitTaskProof = (taskProofId, data) =>
  api.patch(`/task-proof/users/${taskProofId}`, data);

/* -------------------------------------------------------------------------- */
/*                                 REFERRALS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Get referral history
 * GET /users/me/referrals
 * No params or body
 */
export const userGetReferralHistory = () => api.get("/users/me/referrals");

/**
 * Get referral stats
 * GET /users/me/referrals/stats
 * No params or body
 */
export const userGetReferralStats = () => api.get("/users/me/referrals/stats");

/* -------------------------------------------------------------------------- */
/*                                 DASHBOARD                                  */
/* -------------------------------------------------------------------------- */

/**
 * Get user stats
 * GET /task-proof/users/stats
 * No params or body
 */
export const userGetStats = () => api.get("/task-proof/users/stats");

/**
 * Get wallet balance
 * GET /users/me/wallet-balance
 * No params or body
 */
export const userGetWalletBalance = () => api.get("/users/me/wallet-balance");

/* -------------------------------------------------------------------------- */
/*                                 FILE UPLOAD                                */
/* -------------------------------------------------------------------------- */

/**
 * Upload a file
 * POST /files
 * @param {FormData} formData - FormData object with file
 * Body:
 *   FormData: { file: File }
 */
export const userUploadFile = (formData) =>
  api.post("/files", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// // src/api/services.js
// import api from "./api";

// /* -------------------------------------------------------------------------- */
// /*                               USER PROFILE                               */
// /* -------------------------------------------------------------------------- */
// export const getUser = () => api.get("/users/me");
// export const updateUser = (updates) => api.patch("/users/me", updates);
// export const getBalance = () => api.get("/users/me/wallet-balance");

// /* -------------------------------------------------------------------------- */
// /*                                   TASKS                                  */
// /* -------------------------------------------------------------------------- */
// export const allTasks = () => api.get("/tasks");

// export const startTask = (payload) => {
//   // ENSURE task_id IS STRING
//   const body = {
//     task_id: String(payload.task_id || payload),
//   };

//   console.log("Sending to /task-proof:", body); // DEBUG

//   return api.post("/task-proof", body);
// };
// export const viewTask = (taskId) => api.get(`/tasks/${taskId}`);

// export const myTasks = () => api.get("/task-proof/users");

// export const submitTask = (taskId, data) =>
//   api.patch(`/task-proof/users/${taskId}`, data);

// /* -------------------------------------------------------------------------- */
// /*                             DASHBOARD / STATS                            */
// /* -------------------------------------------------------------------------- */
// export const getTaskStats = () => api.get("/task-proof/users/stats");
// export const getReferralStats = () => api.get("/users/me/referrals/stats");
// export const getReferralHistory = () => api.get("/users/me/referrals");

// /* -------------------------------------------------------------------------- */
// /*                               FILE UPLOAD                                */
// /* -------------------------------------------------------------------------- */
// export const uploadFile = (file) => {
//   const formData = new FormData();
//   formData.append("files", file); // keep the key that the backend expects
//   return api.post("/files", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// };

// export const uploadImage = uploadFile; // identical

// /* -------------------------------------------------------------------------- */
// /*                         PATCH USER WITH FILE URL                         */
// /* -------------------------------------------------------------------------- */
// /**
//  * @param {Object}   payload
//  * @param {string}   payload.type      - field name (e.g. "photo")
//  * @param {string}   payload.fileUrl   - URL returned from uploadFile
//  * @param {Object}   [payload.user]    - optional profile fields
//  */
// export const fileUrlUpdate = async ({ type, fileUrl, user } = {}) => {
//   const body = {};

//   if (user?.firstname) body.first_name = user.firstname;
//   if (user?.lastname) body.last_name = user.lastname;
//   if (type === "photo") body.photo = fileUrl;
//   // console.log(fileUrl);

//   if (user?.phone) {
//     // Convert +234XXXXXXXXXX → 0XXXXXXXXXX for the backend
//     const normalized = user.phone.startsWith("+234")
//       ? "0" + user.phone.slice(4)
//       : user.phone;
//     body.phone = normalized;
//   }

//   if (type && fileUrl) body[type] = fileUrl;

//   if (Object.keys(body).length === 0) {
//     return Promise.resolve({ data: {} });
//   }

//   return api.patch("/users/me", body).then((e) => console.log(e));
// };
