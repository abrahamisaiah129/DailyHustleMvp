import React from 'react'

export default function ModalJob({job, onSubmit, show=false}){
  if(!job) return null
  return (
    <div className={`modal ${show ? 'd-block' : ''}`} tabIndex="-1" style={{background: show ? 'rgba(0,0,0,0.4)': 'transparent'}}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content rounded-4">
          <div className="modal-header border-0">
            <h5 className="modal-title">{job.title}</h5>
            <button type="button" className="btn-close" onClick={()=> onSubmit(null)}></button>
          </div>
          <div className="modal-body">
            <p className="small-muted">{job.short}</p>
            <div className="row">
              <div className="col-md-6"><div className="border rounded p-3">Reward <div className="fw-bold text-success">₦{job.payout}</div></div></div>
              <div className="col-md-6"><div className="border rounded p-3">Proof <div className="fw-bold">{job.proof}</div></div></div>
            </div>
          </div>
          <div className="modal-footer border-0">
            <button className="btn btn-secondary" onClick={()=> onSubmit(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=> alert('Submit logic here')}>Submit Proof</button>
          </div>
        </div>
      </div>
    </div>
  )
}
