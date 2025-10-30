import React, { useState, useMemo } from "react";
import { useAdvertiserData } from "../../context/Advertiser/AdvertiserDataContext";

export default function WalletTransactions() {
  const { wallet } = useAdvertiserData();
  const [filter, setFilter] = useState("All");

  // Filter transactions based on 'filter'
  const filteredTransactions = useMemo(() => {
    if (filter === "All") return wallet.transactions;
    return wallet.transactions.filter((txn) => txn.type === filter);
  }, [wallet.transactions, filter]);

  // CSV Export utility
  const handleExportCSV = () => {
    const headers = "Type,Amount,Date\n";
    const rows = filteredTransactions
      .map(
        (txn) =>
          `${txn.type},${txn.amount},${new Date(txn.date).toLocaleDateString()}`
      )
      .join("\n");
    const csv = headers + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "transactions.csv";
    a.click();
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-list-ul text-info me-2" />
        Transaction History
      </h2>
      <div className="d-flex align-items-center gap-3 mb-3">
        <label className="fw-semibold me-2">Filter:</label>
        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Deposit</option>
          <option>Payment</option>
        </select>
        <button
          className="btn btn-outline-success ms-auto"
          onClick={handleExportCSV}
        >
          Export CSV
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.type}</td>
                  <td
                    className={txn.amount > 0 ? "text-success" : "text-danger"}
                  >
                    {txn.amount > 0 ? "+" : ""}₦
                    {Math.abs(txn.amount).toLocaleString()}
                  </td>
                  <td>{new Date(txn.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-muted text-center">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="alert alert-light mt-3">
        Full history of wallet credits, deductions, and campaign payments
        visible here.
      </div>
    </div>
  );
}
