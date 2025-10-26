import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { toast } from "react-toastify";

export const AppDataContext = createContext(null);
export const useAppData = () => {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within <AppDataProvider>");
  return ctx;
};

export default function AppDataProvider({ children }) {
  // ============================================================
  // ✅ Default user + verified KYC object (always true)
  // ============================================================
  const DEFAULT_USER_DATA = {
    username: "tester",
    balance: 10000,
    isAuthenticated: true,
    kyc: { status: "verified", date: new Date().toISOString() },
    tasks: [],
    notifications: [],
    transactions: [],
  };

  // ============================================================
  // ✅ Unified open + closed review tasks
  // ============================================================
  const DEFAULT_TASKS = [
    {
      id: "t1",
      title: "Follow Instagram",
      category: "Social Media",
      payout: 200,
      slots: 40,
      completedSlots: 12,
      closed: false,
      description: "Follow our Instagram handle and stay active for updates.",
      link: "https://www.instagram.com/dailyhustleapp",
    },
    {
      id: "t2",
      title: "Join Telegram",
      category: "Community",
      payout: 150,
      slots: 60,
      completedSlots: 30,
      closed: false,
      description:
        "Join our Telegram group for the latest Daily Hustle updates.",
      link: "https://t.me/dailyhustleofficial",
    },
    {
      id: "t3",
      title: "Like YouTube Video",
      category: "Engagement",
      payout: 250,
      slots: 80,
      completedSlots: 45,
      closed: false,
      description: "Watch and like our latest video to increase engagement.",
      link: "https://youtube.com/@dailyhustleofficial",
    },
    {
      id: "t4",
      title: "Follow on TikTok",
      category: "Social Media",
      payout: 180,
      slots: 70,
      completedSlots: 38,
      closed: false,
      description: "Follow our TikTok page and like our pinned post.",
      link: "https://tiktok.com/@dailyhustleapp",
    },
    {
      id: "t5",
      title: "Download App",
      category: "App Install",
      payout: 300,
      slots: 30,
      completedSlots: 10,
      closed: false,
      description: "Download and install our Daily Hustle app to get started.",
      link: "https://dailyhustleapp.com/download",
    },
    {
      id: "t6",
      title: "Share Post on Facebook",
      category: "Promotion",
      payout: 250,
      slots: 100,
      completedSlots: 67,
      closed: false,
      description:
        "Share our official Facebook post and take a screenshot as proof.",
      link: "https://facebook.com/dailyhustleapp",
    },

    // --- Closed Review Tasks -----------------------------------
    {
      id: "t7",
      title: "Google Play Review",
      category: "Review",
      payout: 500,
      slots: 25,
      completedSlots: 25,
      closed: true,
      description: "Submit a Play Store review using the text below.",
      link: "https://play.google.com/store/apps/details?id=com.dailyhustle.app",
      reviewText:
        "Great app! Loved the effortless earning system. Payments are legit and simple to withdraw. ⭐⭐⭐⭐⭐",
    },
    {
      id: "t8",
      title: "App Store Review (iOS)",
      category: "Review",
      payout: 450,
      slots: 20,
      completedSlots: 20,
      closed: true,
      description: "Leave a positive review on App Store using our app link.",
      link: "https://apps.apple.com/ng/app/dailyhustle/id1234567",
      reviewText:
        "Fantastic service! I earn daily without hassle. Safe and easy to use! ⭐⭐⭐⭐⭐",
    },
    {
      id: "t9",
      title: "TrustPilot Review",
      category: "Community Rating",
      payout: 400,
      slots: 35,
      completedSlots: 35,
      closed: true,
      description: "Leave a review about your experience on TrustPilot.",
      link: "https://trustpilot.com/review/dailyhustle.com",
      reviewText:
        "Very reliable platform, no delays in payout, excellent support. ⭐⭐⭐⭐⭐",
    },
    {
      id: "t10",
      title: "Twitter Mention",
      category: "Social Review",
      payout: 350,
      slots: 50,
      completedSlots: 50,
      closed: true,
      description: "Tweet about your experience earning with Daily Hustle.",
      link: "https://twitter.com/dailyhustleapp",
      reviewText:
        "Been using Daily Hustle for months — awesome app for side hustle! 💸 #DailyHustleApp ⭐⭐⭐⭐⭐",
    },
    {
      id: "t11",
      title: "Nairaland Comment Review",
      category: "Community",
      payout: 300,
      slots: 40,
      completedSlots: 40,
      closed: true,
      description: "Comment on our Nairaland thread about your experience.",
      link: "https://nairaland.com/dailyhustle",
      reviewText:
        "Daily Hustle pays 100%. No stress, no scam. It’s genuine. ⭐⭐⭐⭐⭐",
    },
    {
      id: "t12",
      title: "Reddit Thread Review",
      category: "Community Discussion",
      payout: 350,
      slots: 40,
      completedSlots: 40,
      closed: true,
      description:
        "Reply on our Reddit thread with your feedback using the provided format.",
      link: "https://reddit.com/r/dailyhustleapp",
      reviewText:
        "Started with doubts, but now I earn daily and withdraw weekly! Legit hustle app. ⭐⭐⭐⭐⭐",
    },
  ];

  // ============================================================
  // 🔒 State & Persistence
  // ============================================================
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("dh_tasks")) || DEFAULT_TASKS
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("dh_user")) || DEFAULT_USER_DATA
  );

  // ✅ Ensure verified KYC object persists and updates automatically
  useEffect(() => {
    if (!userData.kyc || userData.kyc.status !== "verified") {
      const fixed = {
        ...userData,
        kyc: { status: "verified", date: new Date().toISOString() },
      };
      setUserData(fixed);
      localStorage.setItem("dh_user", JSON.stringify(fixed));
    }
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("dh_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("dh_user", JSON.stringify(userData));
  }, [userData]);

  // ============================================================
  // ⚙️ Utilities & Actions
  // ============================================================
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

  // ============================================================
  // 💾 Expose Context
  // ============================================================
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
