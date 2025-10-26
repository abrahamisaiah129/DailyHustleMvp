import { useMemo } from "react";
import { useAdvertiserData } from "../context/Advertiser/AdvertiserDataContext";
import { useTheme } from "../context/ThemeContext";


export default function AdvertiserWallet() {
  const { theme } = useTheme();
  const { wallet, onAddFunds } = useAdvertiserData();

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

  return (
    <div className="container py-4" style={{ background: palette.bg }}>
      <h2 className="fw-bold mb-4" style={{ color: palette.red }}>
        Wallet & Billing
      </h2>
      <div
        className="p-3 rounded shadow-sm mb-4"
        style={{ background: palette.cardBg }}
      >
        <div className="fw-bold small mb-1" style={{ color: palette.label }}>
          Balance
        </div>
        <div className="h3 mb-2" style={{ color: palette.red }}>
          ₦{wallet.balance?.toLocaleString()}
        </div>
        <button
          className="btn fw-bold rounded-pill"
          style={{
            backgroundColor: palette.red,
            color: "#fff",
            minWidth: "160px",
            border: "none",
          }}
          onClick={onAddFunds}
        >
          Add Funds
        </button>
      </div>
      <div
        className="p-3 rounded shadow-sm"
        style={{ background: palette.cardBg }}
      >
        <div className="fw-bold small mb-3" style={{ color: palette.label }}>
          Transactions
        </div>
        <ul className="list-unstyled mb-0">
          {wallet.transactions.map((txn) => (
            <li key={txn.id} className="d-flex justify-content-between mb-2">
              <span>
                {txn.type} ({txn.date})
              </span>
              <span className={txn.amount > 0 ? "text-success" : "text-danger"}>
                ₦{txn.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
