import React from "react";
import { useAdvertiserData } from "../../context/Advertiser/AdvertiserDataContext";

export default function AdvertiserDashboard() {
  const { campaigns, wallet, submissions } = useAdvertiserData();

  const activeCampaigns = campaigns.filter((c) => c.status === "active");
  const completedCampaigns = campaigns.filter((c) => c.status === "completed");
  const pendingSubmissions = submissions.filter((s) => s.status === "pending");
  const approvedSubmissions = submissions.filter(
    (s) => s.status === "approved"
  );
  const totalSpent = campaigns.reduce((sum, c) => sum + (c.spent || 0), 0);

  const latestTransaction = wallet.transactions[0];
  const latestSubmission = submissions[0];

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-house-door-fill text-primary me-2" />
        Advertiser Dashboard
      </h2>

      <div className="row g-4 mb-4">
        <div className="col-6 col-md-3">
          <div className="stat-card">
            <i className="bi bi-bullseye" />
            <div className="fs-4 fw-bold mt-2">{activeCampaigns.length}</div>
            <div className="small text-muted">Active Campaigns</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-card">
            <i className="bi bi-clipboard-check" />
            <div className="fs-4 fw-bold mt-2">{completedCampaigns.length}</div>
            <div className="small text-muted">Completed Campaigns</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-card">
            <i className="bi bi-wallet2" />
            <div className="fs-4 fw-bold mt-2">
              ₦{wallet.balance.toLocaleString()}
            </div>
            <div className="small text-muted">Wallet Balance</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-card">
            <i className="bi bi-cash-stack" />
            <div className="fs-4 fw-bold mt-2">
              ₦{totalSpent.toLocaleString()}
            </div>
            <div className="small text-muted">Total Spent</div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card p-3 h-100">
            <div className="fw-bold mb-2">Recent Activity</div>
            <div>
              <span className="text-primary fw-semibold">
                Last Transaction:
              </span>{" "}
              {latestTransaction ? (
                <>
                  <span>
                    {latestTransaction.type} &bull;{" "}
                    {latestTransaction.amount > 0 ? "+" : ""}₦
                    {latestTransaction.amount.toLocaleString()}
                  </span>
                  <span className="text-muted ms-2">
                    {new Date(latestTransaction.date).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-muted">No transactions yet.</span>
              )}
            </div>
            <div className="mt-2">
              <span className="text-primary fw-semibold">Last Submission:</span>{" "}
              {latestSubmission ? (
                <>
                  <span>
                    {latestSubmission.workerName} &bull;{" "}
                    <span className="text-capitalize">
                      {latestSubmission.status}
                    </span>
                  </span>
                  <span className="ms-2 text-secondary">
                    {latestSubmission.proof &&
                      `Proof: ${latestSubmission.proof}`}
                  </span>
                </>
              ) : (
                <span className="text-muted">No submissions yet.</span>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 h-100">
            <div className="fw-bold mb-2">Submissions Overview</div>
            <div className="mb-2">
              <span className="fw-semibold">{pendingSubmissions.length}</span>{" "}
              pending &nbsp;
              <span className="fw-semibold">
                {approvedSubmissions.length}
              </span>{" "}
              approved
            </div>
            <div className="progress mt-2" style={{ height: 8 }}>
              <div
                className="progress-bar bg-success"
                style={{
                  width: `${
                    submissions.length
                      ? (approvedSubmissions.length / submissions.length) * 100
                      : 0
                  }%`,
                  transition: "width 0.5s",
                }}
              />
            </div>
            <div className="text-muted mt-1" style={{ fontSize: 13 }}>
              Submission review efficiency
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-primary rounded-3">
        Manage campaigns, track spending, review proofs — everything for
        advertisers in one place!
      </div>
    </div>
  );
}
