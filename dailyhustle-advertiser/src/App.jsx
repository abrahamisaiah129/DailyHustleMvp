import React from "react";
import { Routes, Route } from "react-router-dom";
import ResponsiveNav from "./components/ResponsiveNav"; // <-- Navigation component
import AdvertiserDashboard from "./pages/AdvertiserDashboard";
import AdvertiserCampaigns from "./pages/AdvertiserCampaigns";
import AdvertiserWallet from "./pages/AdvertiserWallet";
import CampaignCreate from "./pages/CampaignCreate";
// Add more imports as needed

export default function App() {
  return (
    <>
      <ResponsiveNav />
      <div
        style={{
          // Offset for sidebar on desktop (width: 220px), and navbar height on mobile (56px)
          marginLeft: window.innerWidth >= 992 ? 220 : 0,
          marginTop: window.innerWidth < 992 ? 56 : 0,
          padding: "24px",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/campaigns/create" element={<CampaignCreate />} />
          <Route path="/" element={<AdvertiserDashboard />} />
          <Route path="/campaigns" element={<AdvertiserCampaigns />} />
          <Route path="/wallet" element={<AdvertiserWallet />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </>
  );
}
