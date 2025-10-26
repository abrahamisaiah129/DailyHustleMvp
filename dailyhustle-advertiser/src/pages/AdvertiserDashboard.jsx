import React, { useMemo } from "react";
import { useAdvertiserData } from "../context/Advertiser/AdvertiserDataContext";
import { useTheme } from "../context/ThemeContext"; // <-- Correct path!
import ThemeToggleButton from "../components/ThemeToggleButton";

export default function AdvertiserDashboard() {
  const { theme } = useTheme();
  const { campaigns, wallet } = useAdvertiserData();

  const isDark = theme === "dark";
  const palette = useMemo(
    () => ({
      bg: isDark ? "#121212" : "#f8f9fa",
      cardBg: isDark ? "#1c1c1e" : "#fff",
      text: isDark ? "#f8f9fa" : "#212529",
      label: isDark ? "#adb5bd" : "#6c757d",
      red: "var(--dh-red)",
    }),
    [isDark]
  );

  const totalCampaigns = campaigns.length;
  const running = campaigns.filter((c) => c.status === "active").length;
  const completed = campaigns.filter((c) => c.status === "completed").length;
  const totalSpent = campaigns.reduce((sum, c) => sum + (c.spent || 0), 0);

  return (
    <div className="container py-4" style={{ background: palette.bg }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="fw-bold" style={{ color: "var(--dh-red)" }}>
          Dashboard
        </h2>
        <ThemeToggleButton />
      </div>
      <div className="row">
        <div className="col-md-3 mb-3">
          <div
            className="p-3 rounded shadow-sm"
            style={{ background: palette.cardBg }}
          >
            <div className="fw-bold small" style={{ color: palette.label }}>
              Wallet Balance
            </div>
            <div className="h4 mb-0" style={{ color: palette.red }}>
              ₦{wallet.balance?.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div
            className="p-3 rounded shadow-sm"
            style={{ background: palette.cardBg }}
          >
            <div className="fw-bold small" style={{ color: palette.label }}>
              Campaigns
            </div>
            <div className="h4 mb-0">{totalCampaigns}</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div
            className="p-3 rounded shadow-sm"
            style={{ background: palette.cardBg }}
          >
            <div className="fw-bold small" style={{ color: palette.label }}>
              Running
            </div>
            <div className="h4 mb-0">{running}</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div
            className="p-3 rounded shadow-sm"
            style={{ background: palette.cardBg }}
          >
            <div className="fw-bold small" style={{ color: palette.label }}>
              Spent
            </div>
            <div className="h4 mb-0">₦{totalSpent.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
