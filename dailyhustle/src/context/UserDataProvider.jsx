// src/context/UserDataProvider.jsx
import { useState } from "react";
import { UserDataContext } from "./UserDataContext";

/**
 * UserDataProvider:
 * Provides in-memory user data for the app.
 * Currently mock logic — ready for backend integration later.
 */
export default function UserDataProvider({ children }) {
    // Default user structure
    const defaultUserData = {
        id: null,
        username: "",
        avatar: "vite.svg",
        email: "",
        balance: 0,
        totalEarnings: 0,
        referralIncome: 0,
        referrals: 0,
        jobsCompleted: 0,
        jobsPendingReview: 0,
        successfulSubmissions: 0,
        rejectedSubmissions: 0,
        notifications: [],
        isAuthenticated: false,
        myTasks: [],
        kycVerified: false,
        kycStatus: "pending",
        // ✅ UPDATED: Wallet transactions
        transactions: [],
        // ✅ UPDATED: Referral list
        referralList: [],
    };

    // --- Initial mock data ---
    const [userData, setUserData] = useState({
        ...defaultUserData,
        username: "avgmp",
        avatar: "vite.svg",
        email: "avgmp@example.com",
        balance: 4500,
        totalEarnings: 25000,
        referralIncome: 5000,
        referrals: 10,
        jobsCompleted: 15,
        jobsPendingReview: 7,
        isAuthenticated: true,
        kycVerified: true,
        kycStatus: "completed",
        myTasks: [
            // ... (existing tasks)
        ],
        notifications: [
            // ... (existing notifications)
        ],
        // ✅ UPDATED: Hardcoded wallet transactions
        transactions: [
            {
                id: "tx1",
                type: "Task Payment",
                amount: 5000,
                status: "Completed",
                date: "2025-10-14T17:01:00Z",
            },
            {
                id: "tx2",
                type: "Referral Bonus",
                amount: 500,
                status: "Completed",
                date: "2025-10-13T12:00:00Z",
            },
            {
                id: "tx3",
                type: "Withdrawal",
                amount: 2000,
                status: "Pending",
                date: "2025-10-12T09:30:00Z",
            },
            // Add more as needed
        ],
        // ✅ UPDATED: Hardcoded referral list
        referralList: [
            {
                id: "ref1",
                name: "Friend A",
                joined: "2025-10-14",
                earnings: 500,
                status: "Active",
            },
            {
                id: "ref2",
                name: "Friend B",
                joined: "2025-10-13",
                earnings: 500,
                status: "Active",
            },
            // Add more as needed
        ],
    });

    const [error, setError] = useState(null);

    /**
     * ✅ NEW: addNotification
     * Adds a notification globally
     */
    const addNotification = (notificationData) => {
        const notification = {
            id: `n${Date.now()}`,
            title: notificationData.title || "New Notification",
            message: notificationData.message || "",
            type: notificationData.type || "info",
            category: notificationData.category || "general",
            taskId: notificationData.taskId || null,
            isRead: false,
            createdAt: new Date().toISOString(),
            ...notificationData,
        };

        setUserData((prev) => ({
            ...prev,
            notifications: [notification, ...prev.notifications],
        }));
    };

    /**
     * ✅ NEW: markNotificationAsRead
     * Marks single notification as read
     */
    const markNotificationAsRead = (notificationId) => {
        setUserData((prev) => ({
            ...prev,
            notifications: prev.notifications.map((notif) =>
                notif.id === notificationId ? { ...notif, isRead: true } : notif
            ),
        }));
    };

    /**
     * ✅ NEW: deleteNotification
     * Deletes single notification
     */
    const deleteNotification = (notificationId) => {
        setUserData((prev) => ({
            ...prev,
            notifications: prev.notifications.filter(
                (notif) => notif.id !== notificationId
            ),
        }));
    };

    /**
     * ✅ NEW: clearAllNotifications
     * Clears all unread notifications
     */
    const clearAllNotifications = () => {
        setUserData((prev) => ({
            ...prev,
            notifications: prev.notifications.filter((notif) => notif.isRead),
        }));
    };

    /**
     * login
     * Mock login — adds welcome notification
     */
    const login = async ({ email, password }) => {
        try {
            setError(null);

            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            const userInfo = {
                ...defaultUserData,
                username: "avgmp",
                email,
                balance: 32,
                totalEarnings: 25000,
                referralIncome: 5000,
                jobsCompleted: 15,
                jobsPendingReview: 7,
                myTasks: [...userData.myTasks],
                notifications: [...userData.notifications],
                isAuthenticated: true,
                kycVerified: true,
                kycStatus: "completed",
            };

            addNotification({
                title: "Welcome Back to awodaily!",
                message: `Hi ${email}, ready to earn today?`,
                type: "success",
                category: "login",
            });

            setUserData(userInfo);
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Failed to log in. Please try again.");
            throw err;
        }
    };

    /**
     * apply
     * Adds task and notification
     */
    const apply = (taskId) => {
        setUserData((prev) => {
            const alreadyApplied = prev.myTasks.some((t) => t.id === taskId);
            if (alreadyApplied) return prev;

            const newTask = {
                id: taskId,
                title: `Task #${taskId}`,
                category: "General",
                payout: 2000,
                color: "#6f42c1",
                status: "Pending Approval",
                completedSlots: 0,
                slots: 1,
                dateAdded: new Date().toISOString(),
            };

            addNotification({
                title: `Applied for Task #${taskId}`,
                message: "Your application is under review",
                type: "info",
                category: "task",
                taskId: taskId,
            });

            return {
                ...prev,
                myTasks: [newTask, ...prev.myTasks],
            };
        });
    };

    /**
     * updateTaskStatus
     * Updates task and adds notification
     */
    const updateTaskStatus = (taskId, newStatus) => {
        setUserData((prev) => {
            const updatedTasks = prev.myTasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            );

            addNotification({
                title: `Task #${taskId}: ${newStatus}`,
                message:
                    newStatus === "Approved"
                        ? `Congratulations! ₦${updatedTasks
                              .find((t) => t.id === taskId)
                              ?.payout?.toLocaleString()} earned!`
                        : newStatus === "Rejected"
                        ? "Task didn't meet our guidelines"
                        : "Status updated",
                type:
                    newStatus === "Approved"
                        ? "success"
                        : newStatus === "Rejected"
                        ? "error"
                        : "info",
                category: "task",
                taskId: taskId,
            });

            return {
                ...prev,
                myTasks: updatedTasks,
            };
        });
    };

    /**
     * submitKYC
     * Submits KYC and adds notification
     */
    const submitKYC = async (kycData) => {
        setUserData((prev) => {
            addNotification({
                title: "KYC Submitted",
                message: `Processing ${kycData.type} verification`,
                type: "info",
                category: "kyc",
            });

            return {
                ...prev,
                kycStatus: "submitted",
            };
        });
    };

    /**
     * verifyKYC
     * Verifies KYC and adds notification
     */
    const verifyKYC = (status) => {
        addNotification({
            title: `KYC ${status === "verified" ? "Approved" : "Rejected"}`,
            message:
                status === "verified"
                    ? "Your account is now fully verified! Start earning!"
                    : "Please resubmit with valid documents",
            type: status === "verified" ? "success" : "error",
            category: "kyc",
        });

        setUserData((prev) => ({
            ...prev,
            kycVerified: status === "verified",
            kycStatus: status,
        }));
    };

    console.log("User tasks:", userData.myTasks);
    console.log("🔔 Notifications:", userData.notifications);

    return (
        <UserDataContext.Provider
            value={{
                userData,
                error,
                login,
                apply,
                submitKYC,
                verifyKYC,
                updateTaskStatus,
                addNotification,
                markNotificationAsRead,
                deleteNotification,
                clearAllNotifications,
                // ✅ NEW: Update user data for settings
                updateUserData: (newData) =>
                    setUserData((prev) => ({ ...prev, ...newData })),
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
}
