// AppDataProvider.jsx
import React, { createContext, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

// ---------------------------
// CONTEXT SETUP
// ---------------------------
export const AppDataContext = createContext(null);
export const useAppData = () => React.useContext(AppDataContext);

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

// Shared global tasks (formerly from GeneralData)
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
      "4. Screenshot showing our account followed",
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
      "Share your honest review on Play Store to help others discover earning opportunities.",
    reviewText:
      "Excellent app! Daily Hustle changed my life - earning ₦500 daily is real! ⭐⭐⭐⭐⭐",
    link: "https://play.google.com/store/apps/details?id=com.dailyhustle.app",
  },
];

// ---------------------------
// MAIN PROVIDER
// ---------------------------
export default function AppDataProvider({ children }) {
  const [userData, setUserData] = useState(DEFAULT_USER_DATA);
  const [allTasks, setAllTasks] = useState(DEFAULT_TASKS); // Global all tasks
  const [loading, setLoading] = useState(false);

  // (1) Show toast notifications globally
  const showNotification = useCallback((message, type = "info") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  }, []);

  // (2) Add in-app or backend notification
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

  // (3) Mark notification as read
  const markNotificationAsRead = useCallback((id) => {
    setUserData((prev) => ({
      ...prev,
      notifications: (prev.notifications || []).map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  }, []);

  // (4) Delete single notification
  const deleteNotification = useCallback((id) => {
    setUserData((prev) => ({
      ...prev,
      notifications: (prev.notifications || []).filter((n) => n.id !== id),
    }));
  }, []);

  // ---------------------------
  // WALLET MANAGEMENT
  // ---------------------------
  // (5) Add or subtract funds
  const updateUserWallet = useCallback(
    (amount) => {
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
    },
    [addNotification]
  );

  // (6) Set specific wallet amount
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
        message: `Wallet balance set to ₦${newBalance}`,
        type: "success",
      });
    },
    [addNotification]
  );

  // ---------------------------
  // TASK MANAGEMENT
  // ---------------------------
  // (7) Filter out tasks user has already applied for
  const filteredAvailableTasks = useMemo(() => {
    if (!Array.isArray(allTasks)) return [];
    const userTaskIds = new Set(
      (userData.tasks || []).map((t) => String(t.id).toLowerCase())
    );
    return allTasks.filter(
      (task) => !userTaskIds.has(String(task.id).toLowerCase())
    );
  }, [allTasks, userData.tasks]);

  // (8) Apply for task (adds to user list)
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

      // Auto complete (demo)
      setTimeout(() => completeTask(task.id), 2500);
    },
    [userData.tasks, addNotification]
  );

  // (9) Complete selected task
  const completeTask = useCallback(
    (taskId) => {
      setAllTasks((prev) =>
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
      const task = allTasks.find((t) => t.id === taskId);
      if (!task) return;
      updateUserWallet(task.payout);
      addNotification({
        title: "Task Completed",
        message: `You earned ₦${task.payout} from ${task.title}.`,
        type: "success",
      });
    },
    [allTasks, updateUserWallet, addNotification]
  );

  // (10) Add new global task (Admin)
  const addNewTask = useCallback(
    (taskData) => {
      const exists = allTasks.some(
        (t) => String(t.id).toLowerCase() === String(taskData.id).toLowerCase()
      );
      if (exists) {
        addNotification({
          message: `Task "${taskData.title}" already exists.`,
          type: "info",
        });
        return;
      }
      setAllTasks((prev) => [...prev, taskData]);
      addNotification({
        message: `New task "${taskData.title}" added successfully!`,
        type: "success",
      });
    },
    [allTasks, addNotification]
  );

  // (11) Remove a task globally (Admin)
  const removeTask = useCallback(
    (taskId) => {
      setAllTasks((prev) => prev.filter((t) => t.id !== taskId));
      addNotification({
        message: `Task with ID ${taskId} removed globally.`,
        type: "warning",
      });
    },
    [addNotification]
  );

  // ---------------------------
  // KYC & TRANSACTIONS
  // ---------------------------
  // (12) Record new transaction in user history
  const addTransaction = useCallback((transaction) => {
    setUserData((prev) => ({
      ...prev,
      transactions: [...(prev.transactions || []), transaction],
    }));
  }, []);

  // (13) Submit new KYC
  const submitKYC = useCallback(
    (kycData) => {
      if (!kycData?.type || !kycData?.idNumber || !kycData?.documentUrl) {
        addNotification({
          message: "Incomplete KYC data. Fill all fields.",
          type: "error",
        });
        return;
      }
      setUserData((prev) => ({
        ...prev,
        kyc: { status: "pending", data: kycData },
      }));
      addNotification({
        message: "KYC uploaded successfully. Under review.",
        type: "info",
      });
    },
    [addNotification]
  );

  // (14) Verify or reject KYC
  const verifyKYC = useCallback(
    (status) => {
      if (!["verified", "rejected"].includes(status)) {
        addNotification({
          message: "Invalid KYC verification status.",
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
            : "KYC rejected. Please reapply.",
        type: status === "verified" ? "success" : "warning",
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
      allTasks,
      filteredAvailableTasks,
      loading,
      addNotification,
      markNotificationAsRead,
      deleteNotification,
      showNotification,
      updateUserWallet,
      setUserWalletBalance,
      onApplyFunc,
      completeTask,
      addTransaction,
      submitKYC,
      verifyKYC,
      addNewTask,
      removeTask,
      setLoading,
    }),
    [
      userData,
      allTasks,
      filteredAvailableTasks,
      loading,
      addNotification,
      markNotificationAsRead,
      deleteNotification,
      showNotification,
      updateUserWallet,
      setUserWalletBalance,
      onApplyFunc,
      completeTask,
      addTransaction,
      submitKYC,
      verifyKYC,
      addNewTask,
      removeTask,
      setLoading,
    ]
  );

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
}
