import React from "react";
import { Link } from "react-router-dom";
import { useAdvertiserData } from "../../context/Advertiser/AdvertiserDataContext";

export default function AdvertiserCampaigns() {
  const { campaigns, submissions } = useAdvertiserData();

  // Calculate submissions per campaign for label
  const getTotalSubmissions = (campaignId) =>
    submissions.filter((s) => s.campaignId === campaignId).length;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-bullseye me-2 text-primary" />
        All Campaigns/Jobs
      </h2>
      <div>
        {campaigns.length === 0 ? (
          <div className="alert alert-info rounded-4 shadow-sm">
            No campaigns found.{" "}
            <Link to="/tasks/new" className="fw-bold">
              Post your first campaign
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle table-hover shadow-sm">
              <thead>
                <tr>
                  <th>Title</th>
                  <th className="d-none d-md-table-cell">Category</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Spent</th>
                  <th>Submissions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <Link
                        to={`/tasks/details/${c.id}`}
                        className="fw-bold text-primary text-decoration-none"
                      >
                        {c.title}
                      </Link>
                    </td>
                    <td className="d-none d-md-table-cell">{c.category}</td>
                    <td>
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
                    </td>
                    <td>₦{c.budget.toLocaleString()}</td>
                    <td>₦{(c.spent || 0).toLocaleString()}</td>
                    <td>
                      <span className="fw-semibold">
                        {getTotalSubmissions(c.id)}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/tasks/details/${c.id}`}
                        className="btn btn-sm btn-outline-primary me-1"
                      >
                        Details
                      </Link>
                      <Link
                        to={`/tasks/submissions?campaign=${c.id}`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Submissions
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
