import React from 'react'

export default function SummaryCard({ icon, label, value, color='primary' }){
  return (
    <div className="summary-card p-3">
      <div className={`icon-wrapper bg-${color} me-3`}><i className={`bi ${icon}`}></i></div>
      <div>
        <div className="label">{label}</div>
        <div className="value">{value}</div>
      </div>
    </div>
  )
}
