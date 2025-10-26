import { useState, useMemo } from "react";
import { Pagination } from "react-bootstrap";
// You'd need to create/use an AdvertiserDataContext similar to AppDataContext
import { useAdvertiserData } from "../context/Advertiser/AdvertiserDataContext";
import { useTheme } from "../context/ThemeContext";

// Modal for campaign details/edit/create
import ModalCampaign from "../components/ModalCampaign";

export default function AdvertiserCampaigns() {
  const { theme } = useTheme();
  const { campaigns, onCreateCampaign, onEditCampaign } = useAdvertiserData();

  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [modalMode, setModalMode] = useState("create"); // "create" or "edit" or "view"
  const [page, setPage] = useState(1);
  const perPage = 6;

  const isDark = theme === "dark";
  const palette = useMemo(
    () => ({
      bg: isDark ? "#121212" : "#f8f9fa",
      cardBg: isDark ? "#1c1c1e" : "#fff",
      text: isDark ? "#f8f9fa" : "#212529",
      label: isDark ? "#adb5bd" : "#6c757d",
      red: "var(--dh-red)",
      redHover: "#c92b2b",
    }),
    [isDark]
  );

  const totalPages = Math.ceil(campaigns.length / perPage);
  const visible = campaigns.slice((page - 1) * perPage, page * perPage);

  // Pagination and Modal styles
  const paginationStyle = `
    .pagination .page-item .page-link {
      color: var(--dh-red);
      border-radius: 50%;
      margin: 0 3px;
      border: 1px solid var(--dh-red);
    }
    .pagination .page-item.active .page-link {
      background-color: var(--dh-red);
      color: #fff;
      border-color: var(--dh-red);
    }
    .pagination .page-item .page-link:hover {
      background-color: #c92b2b;
      color: #fff;
      border-color: #c92b2b;
    }
  `;

  return (
    <div
      className="container-fluid py-4 px-3 min-vh-100"
      style={{ background: palette.bg, color: palette.text }}
    >
      <style>{paginationStyle}</style>
      <h2 className="text-center fw-bold mb-4" style={{ color: palette.red }}>
        Campaigns
      </h2>

      {/* Create Campaign Button */}
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn fw-bold rounded-pill"
          style={{
            backgroundColor: palette.red,
            color: "#fff",
            minWidth: "160px",
            border: "none",
          }}
          onClick={() => {
            setSelectedCampaign(null);
            setModalMode("create");
            setShowModal(true);
          }}
        >
          + Create Campaign
        </button>
      </div>

      {/* Campaign List */}
      {visible.length ? (
        visible.map((c) => (
          <div
            key={c.id}
            className="p-3 mb-3 rounded shadow-sm"
            style={{
              backgroundColor: palette.cardBg,
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">{c.title}</h6>
                <p
                  className="small text-uppercase mb-1"
                  style={{ color: palette.label }}
                >
                  {c.category}
                </p>
                <p className="small mb-2">{c.description}</p>
                <div className="d-flex flex-wrap gap-3 small">
                  <span style={{ color: palette.red }}>
                    Budget: ₦{c.budget?.toLocaleString()}
                  </span>
                  <span style={{ color: palette.label }}>
                    Status: {c.status}
                  </span>
                  <span className="small text-success">
                    {c.completedTasks} / {c.totalTasks} completed
                  </span>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn fw-bold rounded-pill"
                  style={{
                    backgroundColor: palette.red,
                    color: "#fff",
                    minWidth: "130px",
                    border: "none",
                  }}
                  onClick={() => {
                    setSelectedCampaign(c);
                    setModalMode("edit");
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn rounded-pill"
                  style={{
                    backgroundColor: palette.cardBg,
                    color: palette.red,
                    minWidth: "130px",
                    border: `1px solid ${palette.red}`,
                  }}
                  onClick={() => {
                    setSelectedCampaign(c);
                    setModalMode("view");
                    setShowModal(true);
                  }}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-5" style={{ color: palette.label }}>
          No campaigns yet.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination style={{ color: palette.red }}>
            <Pagination.Prev
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === page}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            />
          </Pagination>
        </div>
      )}

      {/* MODAL */}
      <ModalCampaign
        campaign={selectedCampaign}
        show={showModal}
        mode={modalMode}
        onClose={() => setShowModal(false)}
        onCreate={onCreateCampaign}
        onEdit={onEditCampaign}
      />
    </div>
  );
}
