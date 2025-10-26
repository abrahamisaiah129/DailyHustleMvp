import React, { useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { AdvertiserDataContext } from "./AdvertiserDataContext";

// Demo campaigns
const DEFAULT_CAMPAIGNS = [
  {
    id: "c1",
    title: "Instagram Followers Campaign",
    category: "Social Media",
    budget: 10000,
    status: "active",
    description: "Grow our Instagram follower count.",
    completedTasks: 18,
    totalTasks: 25,
    spent: 7200,
  },
  {
    id: "c2",
    title: "App Review Blitz",
    category: "App Review",
    budget: 30000,
    status: "completed",
    description: "Get positive reviews on Google Play and App Store.",
    completedTasks: 50,
    totalTasks: 50,
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

export default function AdvertiserDataProvider({ children }) {
  const [campaigns, setCampaigns] = useState(DEFAULT_CAMPAIGNS);
  const [wallet, setWallet] = useState(DEFAULT_WALLET);
  const [submissions, setSubmissions] = useState(DEFAULT_SUBMISSIONS);

  // Actions
  const showNotification = useCallback((msg, type = "info") => {
    toast[type](msg, {
      autoClose: 2000,
      position: "top-right",
      theme: "colored",
    });
  }, []);

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
        prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
      );
      showNotification("Campaign updated!", "success");
    },
    [showNotification]
  );

  const getSubmissionsForCampaign = useCallback(
    (id) => submissions.filter((s) => s.campaignId === id),
    [submissions]
  );

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

  const onAddFunds = useCallback(() => {
    setWallet((w) => ({
      ...w,
      balance: w.balance + 10000,
      transactions: [
        {
          id: Date.now().toString(),
          type: "Deposit",
          amount: 10000,
          date: new Date().toISOString(),
        },
        ...w.transactions,
      ],
    }));
    showNotification("Funds added!", "success");
  }, [showNotification]);

  // Memo context value
  const contextValue = useMemo(
    () => ({
      campaigns,
      wallet,
      submissions,
      onCreateCampaign,
      onEditCampaign,
      getSubmissionsForCampaign,
      onApproveSubmission,
      onRejectSubmission,
      onAddFunds,
    }),
    [
      campaigns,
      wallet,
      submissions,
      onCreateCampaign,
      onEditCampaign,
      getSubmissionsForCampaign,
      onApproveSubmission,
      onRejectSubmission,
      onAddFunds,
    ]
  );

  return (
    <AdvertiserDataContext.Provider value={contextValue}>
      {children}
    </AdvertiserDataContext.Provider>
  );
}
