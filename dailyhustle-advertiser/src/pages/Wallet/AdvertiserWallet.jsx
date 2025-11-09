import { useMemo } from "react";
import { useAdvertiserData } from "../hooks/useAppDataContext";
import { useTheme } from "../../context/ThemeContext";
import {
  Wallet,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

export default function AdvertiserWallet() {
  const { theme } = useTheme();
  const { wallet, onAddFunds } = useAdvertiserData();

  const isDark = theme === "dark";
  const palette = useMemo(
    () => ({
      bg: isDark ? "#121212" : "#f8f9fa",
      cardBg: isDark ? "#1c1c1e" : "#fff",
      text: isDark ? "#f7f7fa" : "#212529",
      label: isDark ? "#adb5bd" : "#6c757d",
      muted: isDark ? "#cad1e1" : "#6c757d",
      red: "#ed3224",
      success: "#28a745",
      danger: "#dc3545",
      border: isDark ? "#313843" : "#dee2e6",
    }),
    [isDark]
  );

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: palette.bg,
        minHeight: "100vh",
        color: palette.text,
      }}
    >
      {/* HEADER */}
      <div className="mb-5">
        <h1
          className="fw-bold mb-2"
          style={{
            fontSize: "2rem",
            color: palette.text,
            letterSpacing: "0.5px",
          }}
        >
          <Wallet size={32} style={{ color: palette.red }} className="me-2" />
          Wallet & Billing
        </h1>
        <p style={{ color: palette.label }}>
          Manage your funds and view transaction history
        </p>
      </div>

      {/* BALANCE CARD */}
      <div className="row mb-4 g-4">
        <div className="col-lg-4 col-md-6">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              background: palette.cardBg,
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${palette.red}, #ff6b5b)`,
                height: "6px",
              }}
            />
            <div className="card-body p-4">
              <div
                className="mb-3"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: palette.label,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Current Balance
              </div>
              <h2
                className="fw-bold mb-4"
                style={{
                  fontSize: "2.5rem",
                  color: palette.red,
                  lineHeight: "1",
                }}
              >
                ₦{wallet.balance?.toLocaleString() || "0"}
              </h2>
              <button
                className="btn fw-bold rounded-pill w-100"
                style={{
                  backgroundColor: palette.red,
                  color: "#fff",
                  padding: "12px 24px",
                  fontSize: "1rem",
                  border: "none",
                  transition: "all 0.3s ease",
                  boxShadow: `0 4px 15px ${palette.red}40`,
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = `0 6px 20px ${palette.red}60`;
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = `0 4px 15px ${palette.red}40`;
                }}
                onClick={onAddFunds}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add Funds
              </button>
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="col-lg-4 col-md-6">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              background: palette.cardBg,
              borderRadius: "16px",
            }}
          >
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div className="mb-3 d-flex align-items-center justify-content-between">
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: palette.label,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Total Spent
                </span>
                <ArrowDownLeft size={20} style={{ color: palette.danger }} />
              </div>
              <h3
                className="fw-bold"
                style={{
                  fontSize: "1.8rem",
                  color: palette.danger,
                }}
              >
                ₦
                {wallet.transactions
                  ?.filter((t) => t.amount < 0)
                  .reduce((sum, t) => sum + Math.abs(t.amount), 0)
                  .toLocaleString() || "0"}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              background: palette.cardBg,
              borderRadius: "16px",
            }}
          >
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div className="mb-3 d-flex align-items-center justify-content-between">
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: palette.label,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Total Received
                </span>
                <ArrowUpRight size={20} style={{ color: palette.success }} />
              </div>
              <h3
                className="fw-bold"
                style={{
                  fontSize: "1.8rem",
                  color: palette.success,
                }}
              >
                ₦
                {wallet.transactions
                  ?.filter((t) => t.amount > 0)
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString() || "0"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS SECTION */}
      <div
        className="card border-0 shadow-sm"
        style={{
          background: palette.cardBg,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div
          className="card-header border-0 p-4"
          style={{
            background: palette.bg,
            borderBottom: `1px solid ${palette.border}`,
          }}
        >
          <h5
            className="fw-bold mb-0"
            style={{
              fontSize: "1.1rem",
              color: palette.text,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Calendar size={20} style={{ color: palette.red }} />
            Transaction History
          </h5>
        </div>

        <div className="card-body p-4">
          {wallet.transactions?.length === 0 ? (
            <div
              className="text-center py-5"
              style={{
                background: palette.bg,
                borderRadius: "12px",
                color: palette.label,
              }}
            >
              <i
                className="bi bi-inbox"
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "10px",
                  display: "block",
                }}
              ></i>
              <p className="mb-0">No transactions yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table
                className="table table-hover mb-0"
                style={{ color: palette.text }}
              >
                <thead style={{ borderColor: palette.border }}>
                  <tr style={{ borderBottom: `2px solid ${palette.border}` }}>
                    <th
                      className="fw-bold small"
                      style={{
                        color: palette.label,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        padding: "12px 16px",
                      }}
                    >
                      Type
                    </th>
                    <th
                      className="fw-bold small"
                      style={{
                        color: palette.label,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        padding: "12px 16px",
                      }}
                    >
                      Date
                    </th>
                    <th
                      className="fw-bold small text-end"
                      style={{
                        color: palette.label,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        padding: "12px 16px",
                      }}
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wallet.transactions?.map((txn) => (
                    <tr
                      key={txn.id}
                      style={{
                        borderBottom: `1px solid ${palette.border}`,
                        transition: "background 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = palette.bg)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td style={{ padding: "16px" }}>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "8px",
                              background:
                                txn.amount > 0
                                  ? `${palette.success}20`
                                  : `${palette.danger}20`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color:
                                txn.amount > 0
                                  ? palette.success
                                  : palette.danger,
                            }}
                          >
                            {txn.amount > 0 ? (
                              <ArrowDownLeft size={18} />
                            ) : (
                              <ArrowUpRight size={18} />
                            )}
                          </div>
                          <span className="fw-semibold">{txn.type}</span>
                        </div>
                      </td>
                      <td style={{ padding: "16px", color: palette.label }}>
                        <div className="d-flex align-items-center gap-1">
                          <Calendar size={16} />
                          {new Date(txn.date).toLocaleDateString("en-NG", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          textAlign: "right",
                          fontWeight: "600",
                          color:
                            txn.amount > 0 ? palette.success : palette.danger,
                        }}
                      >
                        {txn.amount > 0 ? "+" : ""}₦
                        {Math.abs(txn.amount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
