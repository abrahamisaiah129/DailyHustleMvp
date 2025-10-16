import React from "react";
import SummaryCard from "../../components/SummaryCard";
import tasks from "../../data/tasksData";

export default function Dashboard() {
    return (
        <>
            <h1 className="fw-bold mb-4">Dashboard Summary</h1>
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <SummaryCard
                        icon="bi-wallet2"
                        label="Earnings"
                        value="₦124,500"
                        color="success"
                    />
                </div>
                <div className="col-md-3">
                    <SummaryCard
                        icon="bi-cash-stack"
                        label="Available Balance"
                        value="₦4,500"
                        color="primary"
                    />
                </div>
                <div className="col-md-3">
                    <SummaryCard
                        icon="bi-check2-circle"
                        label="Tasks Completed (30d)"
                        value="142"
                        color="info"
                    />
                </div>
                <div className="col-md-3">
                    <SummaryCard
                        icon="bi-hourglass-split"
                        label="Pending Review"
                        value="5"
                        color="warning"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-8">
                    <h5 className="fw-bold">Recent Activity</h5>
                    <div className="tasks-table p-2">
                        {tasks.slice(0, 3).map((j) => (
                            <div key={j.id}>
                                {j.title} — {j.short}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-lg-4">
                    <h5 className="fw-bold">Referrals</h5>
                    <div className="summary-card p-3">
                        <div className="label">Referral Income</div>
                        <div className="value">₦12,500</div>
                    </div>
                </div>
            </div>
        </>
    );
}
