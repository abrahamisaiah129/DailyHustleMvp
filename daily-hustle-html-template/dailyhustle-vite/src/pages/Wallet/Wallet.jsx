import React from "react";

export default function Wallet() {
    return (
        <>
            <h1 className="fw-bold mb-4">Earnings Wallet</h1>
            <div className="row g-3">
                <div className="col-md-4">
                    <div className="summary-card p-3">
                        <div className="label">Available for Withdrawal</div>
                        <div className="value text-success">₦4,500</div>
                        <button className="btn btn-success mt-3 w-100">
                            Withdraw Now
                        </button>
                    </div>
                </div>
                <div className="col-md-8">
                    <h6>Payment History</h6>
                    <div className="wallet-history-table p-2">
                        No Notifications yet (demo)
                    </div>
                </div>
            </div>
        </>
    );
}
