import React, { useState, useCallback, useMemo } from "react";
import {AppDataProvider                              } from "../../hooks/uAppDataProvider                               ";
import { toast } from "react-toastify";

// ---------------------------
// DEFAULT INITIALIZATION
// ---------------------------
const DEFAULT_USER_DATA = {
  username: "avgmp",
  balance: 4500,
  isAuthenticated: true,
  tasks: [],
  notifications: [],
  transactions: [],
  kyc: {
    status: "verified",
    data: {
      type: "NIN",
      idNumber: "12345678901",
      documentUrl: "https://example.com/kyc-document.jpg",
    },
  },
};

const DEFAULT_TASKS = [
  {
    id: "t1",
    title: "Follow Instagram",
    category: "Social Media",
    payout: 200,
    slots: 50,
    completedSlots: 12,
    color: "#ffc107",
    status: "Open",
    closed: false,
    description:
      "Follow our official Instagram account to stay updated with daily earning opportunities and exclusive tips.",
    instructions: [
      "1. Click the Instagram link provided",
      '2. Tap \"Follow\" button',
      "3. Stay following for 24 hours",
      "4. Screenshot your profile showing our account followed",
      "5. Submit screenshot for instant approval",
    ],
    link: "https://www.instagram.com/dailyhustleapp",
  },
  {
    id: "t2",
    title: "Review Mobile App",
    category: "App Review",
    payout: 500,
    slots: 30,
    completedSlots: 8,
    color: "#198754",
    status: "Open",
    closed: true,
    description:
      "Share your honest review of our mobile app on Google Play Store to help others discover earning opportunities.",
    instructions: [
      "1. Download Daily Hustle app from Play Store",
      "2. Use app for 5 minutes",
      "3. Go to Play Store > Our App > Reviews",
      "4. Copy-paste EXACT review text below",
      "5. Take screenshot of posted review",
      "6. Submit screenshot",
    ],
    reviewText:
      "Excellent app! Daily Hustle changed my life - earning ₦500 daily is real! ⭐⭐⭐⭐⭐",
    link: "https://play.google.com/store/apps/details?id=com.dailyhustle.app",
  },
];

// ---------------------------
// MAIN CONTEXT PROVIDER
// ---------------------------
export default function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(DEFAULT_USER_DATA);
  const [tasks, setTasks] = useState(DEFAULT_TASKS);

  // ---------------------------
  // TOAST + NOTIFICATIONS
  // ---------------------------
  const showNotification = useCallback((message, type = "info") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }, []);

  const addNotification = useCallback(
    (notificationData) => {
      if (!notificationData?.message) return;
      const notification = {
        id: `n${Date.now()}`,
        title: notificationData.title || "Notification",
        message: notificationData.message,
        type: notificationData.type || "info",
        read: false,
        timestamp: new Date().toISOString(),
      };

      setUserData((prev) => ({
        ...prev,
        notifications: [notification, ...(prev.notifications || [])],
      }));
      showNotification(notification.message, notification.type);
    },
    [showNotification]
  );

  const markNotificationAsRead = useCallback((id) => {
    setUserData((prev) => ({
      ...prev,
      notifications: (prev.notifications || []).map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  }, []);

  const deleteNotification = useCallback((id) => {
    setUserData((prev) => ({
      ...prev,
      notifications: (prev.notifications || []).filter((n) => n.id !== id),
    }));
  }, []);

  // ---------------------------
  // WALLET
  // ---------------------------
  const updateUserWallet = useCallback((amount) => {
    const delta = typeof amount === "number" && !isNaN(amount) ? amount : 0;
    setUserData((prev) => ({
      ...prev,
      balance: (prev.balance || 0) + delta,
    }));
    if (delta > 0)
      addNotification({
        message: `₦${delta} credited to wallet.`,
        type: "success",
      });
  }, [addNotification]);

  const setUserWalletBalance = useCallback(
    (newBalance) => {
      if (typeof newBalance !== "number" || newBalance < 0) {
        addNotification({
          message: "Invalid wallet balance value.",
          type: "error",
        });
        return;
      }
      setUserData((prev) => ({ ...prev, balance: newBalance }));
      addNotification({
        message: `Wallet balance updated to ₦${newBalance}`,
        type: "success",
      });
    },
    [addNotification]
  );

  // ---------------------------
  // TASKS
  // ---------------------------
  const completeTask = useCallback(
    (taskId) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                completedSlots: t.completedSlots + 1,
                status:
                  t.completedSlots + 1 >= t.slots ? "Completed" : t.status,
              }
            : t
        )
      );

      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      updateUserWallet(task.payout);
      addNotification({
        title: "Task Completed",
        message: `You earned ₦${task.payout} for completing ${task.title}`,
        type: "success",
      });
    },
    [tasks, updateUserWallet, addNotification]
  );

  const onApplyFunc = useCallback(
    (task) => {
      if (!task?.id) {
        addNotification({
          message: "Invalid task. Please try again.",
          type: "error",
        });
        return;
      }
      const exists = userData.tasks.find((t) => t.id === task.id);
      if (exists) {
        addNotification({
          message: `Task ${task.title} already applied.`,
          type: "info",
        });
        return;
      }

      const newTask = { ...task, status: "pending" };
      setUserData((prev) => ({
        ...prev,
        tasks: [...(prev.tasks || []), newTask],
      }));
      addNotification({
        message: `Applied for ${task.title}. Awaiting approval.`,
        type: "info",
      });

      // Auto verification after delay (demo)
      setTimeout(() => completeTask(task.id), 2500);
    },
    [userData.tasks, completeTask, addNotification]
  );

  // ---------------------------
  // TRANSACTIONS
  // ---------------------------
  const addTransaction = useCallback((transaction) => {
    setUserData((prev) => ({
      ...prev,
      transactions: [...(prev.transactions || []), transaction],
    }));
  }, []);

  // ---------------------------
  // KYC
  // ---------------------------
  const submitKYC = useCallback(
    (kycData) => {
      if (!kycData?.type || !kycData?.idNumber || !kycData?.documentUrl) {
        addNotification({
          message: "Invalid KYC information. Please fill all fields.",
          type: "error",
        });
        return;
      }
      setUserData((prev) => ({
        ...prev,
        kyc: { status: "pending", data: kycData },
      }));
      addNotification({
        message: "KYC submitted successfully.",
        type: "info",
      });
    },
    [addNotification]
  );

  const verifyKYC = useCallback(
    (status) => {
      if (!["verified", "rejected"].includes(status)) {
        addNotification({
          message: "Invalid KYC status provided.",
          type: "error",
        });
        return;
      }
      setUserData((prev) => ({
        ...prev,
        kyc: { ...prev.kyc, status },
      }));
      addNotification({
        message:
          status === "verified"
            ? "KYC verified successfully!"
            : "KYC was rejected. Please try again.",
        type: status === "verified" ? "success" : "error",
      });
    },
    [addNotification]
  );

  // ---------------------------
  // MEMOIZED CONTEXT VALUE
  // ---------------------------
  const contextValue = useMemo(
    () => ({
      userData,
      tasks,
      setTasks,
      updateTask: (id, updates) => {
        setUserData((prev) => ({
          ...prev,
          tasks: prev.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }));
      },
      onApplyFunc,
      completeTask,
      addTransaction,
      submitKYC,
      verifyKYC,
      updateUserWallet,
      setUserWalletBalance,
      addNotification,
      markNotificationAsRead,
      deleteNotification,
      showNotification,
    }),
    [
      userData,
      tasks,
      onApplyFunc,
      completeTask,
      addTransaction,
      submitKYC,
      verifyKYC,
      updateUserWallet,
      setUserWalletBalance,
      addNotification,
      markNotificationAsRead,
      deleteNotification,
      showNotification,
    ]
  );

  return (
    <AppDataProvider.Provider value={contextValue}>
      {children}
    <AppDataProvider.Provider>
  );
}
