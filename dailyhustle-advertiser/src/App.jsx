import { Routes, Route, Navigate } from "react-router-dom";
import AdvertiserDataProvider from "./context/Advertiser/AdvertiserDataProvider";
import AdvertiserDashboard from "./pages/AdvertiserDashboard";
import AdvertiserCampaigns from "./pages/AdvertiserCampaigns";
import AdvertiserWallet from "./pages/AdvertiserWallet";

// Add other pages as needed

export default function App() {
  return (
    <AdvertiserDataProvider>
      {/* Add navigation here (Navbar, Sidebar, etc.) if needed */}
      <Routes>
        <Route path="/" element={<AdvertiserDashboard />} />
        <Route path="/campaigns" element={<AdvertiserCampaigns />} />
        <Route path="/wallet" element={<AdvertiserWallet />} />
        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AdvertiserDataProvider>
  );
}
