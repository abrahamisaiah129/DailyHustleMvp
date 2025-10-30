import React from "react";
import { Link } from "react-router-dom";
import { useAdvertiserData } from "../../context/Advertiser/AdvertiserDataContext";

export default function MyCampaigns() {
  const { campaigns, submissions } = useAdvertiserData();

  // EXAMPLE: If you want to filter to only campaigns for this user, add a userId filter here.
  // For now, shows all campaigns (same as AdvertiserCampaigns).
  // To limit to logged-in user campaigns, add logic as needed.

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-list-task me-2 text-success" />
        My Campaigns
      </h2>
      {campaigns.length === 0 ? (
        <div className="alert alert-info rounded-4 shadow-sm">
          No campaigns yet.{" "}
          <Link to="/tasks/new" className="fw-bold">
            Create your first campaign
          </Link>
        </div>
      ) : (
        <div className="row g-3">
          {campaigns.map((c) => (
            <div key={c.id} className="col-md-6 col-lg-4">
              <div className="campaign-card h-100 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0">{c.title}</h6>
                  <span
                    className={
                      "badge px-2 " +
                      (c.status === "active"
                        ? "bg-success"
                        : c.status === "completed"
                        ? "bg-secondary"
                        : "bg-light text-muted")
                    }
                  >
                    {c.status}
                  </span>
                </div>
                <div className="small text-muted mb-2">{c.category}</div>
                <div className="mb-2">{c.description}</div>
                <div className="mb-2">
                  <span className="me-2">
                    <i className="bi bi-people me-1" />
                    {c.completedTasks} / {c.totalTasks} tasks
                  </span>
                  <span>
                    <i className="bi bi-wallet2 me-1" />₦
                    {c.budget.toLocaleString()}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="fw-bold text-success">
                    {submissions.filter((s) => s.campaignId === c.id).length}
                  </span>
                  &nbsp;submissions
                </div>
                <div className="d-flex gap-2 mt-2">
                  <Link
                    to={`/tasks/details/${c.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/tasks/submissions?campaign=${c.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Review
                  </Link>
                  <Link
                    to={`/tasks/edit/${c.id}`}
                    className="btn btn-sm btn-outline-success"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
