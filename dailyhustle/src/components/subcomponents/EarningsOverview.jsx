import React, { useEffect, useState } from "react";
import { useAppData } from "../../hooks/AppDataContext";

const FALLBACK_DATA = {
  totalEarned: 0,
  thisMonth: 0,
  referralBonus: 0,
  tasksCompleted: 0,
  currency: "₦",
};

const EarningsOverview = () => {
  const { userData } = useAppData();
  const [animated, setAnimated] = useState(false);

  const { balance = 0, currency = "₦", tasks: userTasks = [] } = userData || {};

  const realEarnings = {
    totalEarned: balance,
    thisMonth: Math.floor(balance * 0.7),
    referralBonus: 3200,
    tasksCompleted: (userTasks || []).filter((t) =>
      ["verified", "completed", "approved"].includes(t.status)
    ).length,
    currency,
  };

  const data = realEarnings.totalEarned > 0 ? realEarnings : FALLBACK_DATA;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="earnings-overview boxed-card">
      <div className="earnings-header">
        <h3 className="earnings-title">
          <i className="bi bi-graph-up-arrow"></i>
          Earnings Overview
        </h3>
        <span className="earnings-badge">This Month</span>
      </div>
      <div className="earnings-body">
        <EarningItem
          highlight
          icon="bi-wallet2"
          label="Total Earned"
          value={data.totalEarned}
          currency={data.currency}
          animated={animated}
        />
        <EarningItem
          icon="bi-calendar3"
          label="This Month"
          value={data.thisMonth}
          currency={data.currency}
          animated={animated}
          iconClass="text-success"
        />
        <EarningItem
          icon="bi-people"
          label="Referral Bonus"
          value={data.referralBonus}
          currency={data.currency}
          animated={animated}
          iconClass="text-info"
        />
        <EarningItem
          icon="bi-check2-all"
          label="Tasks Completed"
          value={data.tasksCompleted}
          currency=""
          animated={false}
          iconClass="text-primary"
        />
      </div>
      <div className="earnings-footer">
        <small className="text-muted">Updated just now</small>
      </div>
    </div>
  );
};

const EarningItem = ({
  highlight,
  icon,
  label,
  value,
  currency,
  animated,
  iconClass = "",
}) => (
  <div className={`earning-item${highlight ? " highlight" : ""}`}>
    <div className={`earning-icon ${iconClass}`}>
      <i className={`bi ${icon}`}></i>
    </div>
    <div className="earning-content">
      <span className="earning-label">{label}</span>
      <div className={`earning-value${iconClass ? ` ${iconClass}` : ""}`}>
        {animated ? (
          <AnimatedNumber value={value} currency={currency} />
        ) : (
          <>
            {currency}
            {value.toLocaleString()}
          </>
        )}
      </div>
    </div>
  </div>
);

const AnimatedNumber = ({ value, currency }) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    if (value === 0) {
      setDisplayValue(0);
      return;
    }
    const duration = 1200;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <>
      {currency}
      {displayValue.toLocaleString()}
    </>
  );
};

export default EarningsOverview;
