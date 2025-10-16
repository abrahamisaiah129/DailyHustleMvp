import React from 'react'

export default function JobRow({job, onOpen}){
  return (
    <div className="job-row d-flex align-items-center">
      <div className={`job-icon ${job.category}`}><i className={`bi ${job.icon || 'bi-briefcase-fill'}`}></i></div>
      <div style={{flex:1}}>
        <div className="job-title">{job.title}</div>
        <div className="job-meta">{job.short} · <small className="text-capitalize">{job.category}</small></div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="payout-badge">₦{job.payout.toLocaleString()}</div>
        <button className="apply-btn btn btn-sm mt-2" onClick={()=> onOpen(job.id)}>{job.locked ? 'View' : 'Start'}</button>
      </div>
    </div>
  )
}
