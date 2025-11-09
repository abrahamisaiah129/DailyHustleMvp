// src/context/Advertiser/AppDataProvider.jsx
import React, {
  // createContext,
  // useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AdvertiserDataContext } from "../../pages/hooks/useAppDataContext";
/* --------------------------  DEFAULT DATA  -------------------------- */
const DEFAULT_CAMPAIGNS = [
  {
    id: "c1",
    title: "Instagram Followers Campaign",
    category: "Social Media",
    budget: 10000,
    status: "active",
    description: "Grow our Instagram follower count.",
    completedjobs: 18,
    totaljobs: 25,
    spent: 7200,
  },
  {
    id: "c2",
    title: "App Review Blitz",
    category: "App Review",
    budget: 30000,
    status: "completed",
    description: "Get positive reviews on Google Play and App Store.",
    completedjobs: 50,
    totaljobs: 50,
    spent: 30000,
  },
];

const DEFAULT_WALLET = {
  balance: 15000,
  transactions: [
    { id: "w1", type: "Deposit", amount: 20000, date: "2025-09-16" },
    { id: "w2", type: "Payment", amount: -5000, date: "2025-09-17" },
  ],
};

const DEFAULT_SUBMISSIONS = [
  {
    id: "s1",
    campaignId: "c1",
    workerName: "Tester1",
    proof: "Screenshot",
    status: "pending",
  },
  {
    id: "s2",
    campaignId: "c1",
    workerName: "Tester2",
    proof: "Profile link",
    status: "approved",
  },
];

const DEFAULT_USER = {
  username: "tester",
  balance: 10000,
  currency: "NGN",
  isAuthenticated: false,
  kyc: { status: "verified", date: new Date().toISOString() },
  tasks: [],
  notifications: [],
  transactions: [],
};

/* --------------------------  CONTEXT  -------------------------- */
//   const AdvertiserDataContext = useContext(undefined);

// export const useAdvertiserData = () => {
//   const ctx = useContext(AdvertiserDataContext);
//   if (!ctx) {
//     throw new Error(
//       "useAdvertiserData must be used within AdvertiserDataProvider"
//     );
//   }
//   return ctx;
// };

/* --------------------------  PROVIDER  -------------------------- */
export default function AdvertiserDataProvider({ children }) {
  // ---------- state ----------
  const [campaigns, setCampaigns] = useState(DEFAULT_CAMPAIGNS);
  const [wallet, setWallet] = useState(DEFAULT_WALLET);
  const [submissions, setSubmissions] = useState(DEFAULT_SUBMISSIONS);
  const [userAppData, setUserAppData] = useState(DEFAULT_USER);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  // ---------- toast helper ----------
  const showNotification = useCallback((msg, type = "info") => {
    toast[type](msg, {
      autoClose: 2000,
      position: "top-right",
      theme: "colored",
    });
  }, []);

  // ---------- fetch advertiser profile ----------
  const fetchAdvertiser = useCallback(async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    try {
      const { data } = await axios.get(
        "https://daily-hustle-backend-ob8r9.sevalla.app/api/v1/advertiser/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const fetched = data?.data ?? data;
      setUserAppData((prev) => ({
        ...prev,
        ...fetched,
        isAuthenticated: true,
      }));
    } catch (err) {
      console.error("Failed to load advertiser:", err);
    }
  }, []);

  // run when login flag flips
  useEffect(() => {
    if (isUserLoggedIn) fetchAdvertiser();
  }, [isUserLoggedIn, fetchAdvertiser]);

  // ---------- campaign actions ----------
  const onCreateCampaign = useCallback(
    (campaign) => {
      setCampaigns((prev) => [
        { ...campaign, id: Date.now().toString() },
        ...prev,
      ]);
      showNotification("Campaign created!", "success");
    },
    [showNotification]
  );

  const onEditCampaign = useCallback(
    (updated) => {
      setCampaigns((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      showNotification("Campaign updated!", "success");
    },
    [showNotification]
  );

  const onDeleteCampaign = useCallback(
    (id) => {
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      setSubmissions((prev) => prev.filter((s) => s.campaignId !== id));
      showNotification("Campaign deleted.", "warning");
    },
    [showNotification]
  );

  // ---------- submission actions ----------
  const onApproveSubmission = useCallback(
    (subId) => {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === subId ? { ...s, status: "approved" } : s))
      );
      showNotification("Submission approved!", "success");
    },
    [showNotification]
  );

  const onRejectSubmission = useCallback(
    (subId) => {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === subId ? { ...s, status: "rejected" } : s))
      );
      showNotification("Submission rejected.", "warning");
    },
    [showNotification]
  );

  const getSubmissionsForCampaign = useCallback(
    (id) => submissions.filter((s) => s.campaignId === id),
    [submissions]
  );

  // ---------- wallet actions ----------
  const onAddFunds = useCallback(() => {
    const amount = 10000;
    setWallet((w) => ({
      ...w,
      balance: w.balance + amount,
      transactions: [
        {
          id: Date.now().toString(),
          type: "Deposit",
          amount,
          date: new Date().toISOString(),
        },
        ...w.transactions,
      ],
    }));
    showNotification("Funds added!", "success");
  }, [showNotification]);

  const onSpendFromCampaign = useCallback(
    (amount, campaignId) => {
      setWallet((w) => ({
        ...w,
        balance: w.balance - amount,
        transactions: [
          {
            id: Date.now().toString(),
            type: "Payment",
            amount: -amount,
            date: new Date().toISOString(),
          },
          ...w.transactions,
        ],
      }));
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === campaignId ? { ...c, spent: (c.spent || 0) + amount } : c
        )
      );
      showNotification("Campaign funds spent.", "info");
    },
    [showNotification]
  );

  const onApproveAmount = useCallback(
    (id, amount) => {
      if (!id || !amount) {
        showNotification("Payment couldn't be processed.", "warning");
        return;
      }
      // simulate the payments
      // change the ui
      onApproveSubmission(id);
    },
    [onApproveSubmission, showNotification]
  );

  // ---------- filter helper ----------
  const filterCampaigns = useCallback(
    ({ status, category }) =>
      campaigns.filter(
        (c) =>
          (status ? c.status === status : true) &&
          (category ? c.category === category : true)
      ),
    [campaigns]
  );

  const stat = useCallback(() => {
    // fetch and push to context
    // replace later
    return 100;
  }, []);

  // ---------- context value ----------
  const contextValue = useMemo(
    () => ({
      userAppData,
      stat,
      setUserLoggedIn,
      campaigns,
      wallet,
      submissions,
      onCreateCampaign,
      onEditCampaign,
      onDeleteCampaign,
      getSubmissionsForCampaign,
      onApproveSubmission,
      onRejectSubmission,
      onAddFunds,
      onSpendFromCampaign,
      onApproveAmount,
      filterCampaigns,
      setCampaigns,
      setWallet,
      setSubmissions,
    }),
    [
      userAppData,
      stat,
      campaigns,
      wallet,
      submissions,
      onCreateCampaign,
      onEditCampaign,
      onDeleteCampaign,
      getSubmissionsForCampaign,
      onApproveSubmission,
      onRejectSubmission,
      onAddFunds,
      onSpendFromCampaign,
      onApproveAmount,
      filterCampaigns,
    ]
  );

  return (
    <AdvertiserDataContext.Provider value={contextValue}>
      {children}
    </AdvertiserDataContext.Provider>
  );
}
