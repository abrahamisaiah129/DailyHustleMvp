import React, { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { AppDataContext } from "./AppDataContext"; // import from the new context file

export default function AppDataProvider({ children }) {
  // ... all logic as previously discussed (default states, actions, etc.)
  // (copy the implementation from the previous response and replace the context definition with the import above)
  const DEFAULT_USER_DATA = {
    username: "tester",
    balance: 10000,
    isAuthenticated: true,
    kyc: { status: "verified", date: new Date().toISOString() },
    tasks: [],
    notifications: [],
    transactions: [],
  };
  const DEFAULT_TASKS = [
    // ... All tasks (open+closed) as before
  ];
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [userData, setUserData] = useState(DEFAULT_USER_DATA);

  useEffect(() => {
    if (!userData.kyc || userData.kyc.status !== "verified") {
      const fixed = {
        ...userData,
        kyc: { status: "verified", date: new Date().toISOString() },
      };
      setUserData(fixed);
    }
  }, [userData]);

  const showNotification = useCallback((msg, type = "info") => {
    toast[type](msg, {
      autoClose: 2000,
      position: "top-right",
      theme: "colored",
    });
  }, []);

  const onApplyFunc = useCallback(
    (task) => {
      if (!task?.id) return;
      if (userData.tasks.some((t) => t.id === task.id))
        return showNotification("Task already applied.", "warning");

      setUserData((p) => ({
        ...p,
        tasks: [{ ...task, status: "pending" }, ...p.tasks],
      }));
      showNotification(`Applied for "${task.title}".`, "success");
    },
    [showNotification, userData.tasks]
  );

  const recordCopiedReviewText = useCallback(
    (taskId) => {
      const copiedTime = new Date().toISOString();
      setTasks((p) =>
        p.map((t) =>
          t.id === taskId ? { ...t, copied: true, lastCopied: copiedTime } : t
        )
      );
      showNotification(`Review text copied for ${taskId}`, "info");
    },
    [showNotification]
  );

  const updateUserWallet = useCallback(
    (amount) => {
      setUserData((u) => ({ ...u, balance: u.balance + amount }));
      showNotification(
        `${amount >= 0 ? "₦" + amount : "₦" + Math.abs(amount)} ${
          amount >= 0 ? "added" : "deducted"
        } from your wallet.`,
        "success"
      );
    },
    [showNotification]
  );

  const contextValue = useMemo(
    () => ({
      userData,
      tasks,
      setTasks,
      onApplyFunc,
      recordCopiedReviewText,
      updateUserWallet,
    }),
    [userData, tasks, onApplyFunc, recordCopiedReviewText, updateUserWallet]
  );

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
}
