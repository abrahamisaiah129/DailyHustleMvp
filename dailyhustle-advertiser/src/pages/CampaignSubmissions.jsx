import React, { useMemo, useState } from "react";
import { useTheme } from "../../hooks/useThemeContext";
import { useAdvertiserData } from "../../context/Advertiser/AdvertiserDataContext";

export default function CampaignSubmissions({ campaignId }) {
  const { theme } = useTheme();
  const { getSubmissionsForCampaign, onApproveSubmission, onRejectSubmission } =
    useAdvertiserData();
  const [page, setPage] = useState(1);
  const perPage = 8;
  const submissions = getSubmissionsForCampaign(campaignId);

  const isDark = theme === "dark";
  const palette = useMemo(
    () => ({
      bg: isDark ? "#121212" : "#f8f9fa",
      cardBg: isDark ? "#1c1c1e" : "#fff",
      text: isDark ? "#f8f9fa" : "#212529",
      label: isDark ? "#adb5bd" : "#6c757d",
      red: "var(--dh-red)",
      green: "#38d995",
    }),
    [isDark]
  );

  const totalPages = Math.ceil(submissions.length / perPage);
  const visible = submissions.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="container py-4" style={{ background: palette.bg }}>
      <h2 className="fw-bold mb-4" style={{ color: palette.red }}>
        Review Submissions
      </h2>
      {visible.length ? (
        visible.map((sub) => (
          <div
            key={sub.id}
            className="p-3 mb-3 rounded shadow-sm"
            style={{ background: palette.cardBg }}
          >
            <div className="fw-bold mb-1">{sub.workerName}</div>
            <div className="small mb-2">
              Proof: {sub.proof || "No proof provided"}
            </div>
            <div>
              <button
                className="btn btn-success mx-1"
                onClick={() => onApproveSubmission(sub.id)}
                disabled={sub.status === "approved"}
              >
                Approve
              </button>
              <button
                className="btn btn-danger mx-1"
                onClick={() => onRejectSubmission(sub.id)}
                disabled={sub.status === "rejected"}
              >
                Reject
              </button>
              <span
                className="small ms-2"
                style={{
                  color:
                    sub.status === "approved"
                      ? palette.green
                      : sub.status === "rejected"
                      ? palette.red
                      : palette.label,
                }}
              >
                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-5" style={{ color: palette.label }}>
          No submissions yet.
        </div>
      )}
      {/* ... pagination, if needed ... */}
    </div>
  );
}
