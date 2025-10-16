import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout(){
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="page flex-fill">
        <Header />
        <div className="container-fluid mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
