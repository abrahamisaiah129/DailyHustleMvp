import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import AdvertiserCampaigns from "./pages/Tasks/AdvertiserCampaigns";
import AdvertiserDashboard from "./pages/Dashboard/AdvertiserDashboard";
import CampaignDetails from "./pages/Tasks/CampaignDetails";
import MyCampaigns from "./pages/Tasks/MyCampaigns";
import NewCampaign from "./pages/Tasks/NewCampaign";
import CampaignSubmissions from "./pages/Tasks/CampaignSubmissions";
import Trainings from "./pages/Training/Trainings";
import WalletTransactions from "./pages/Wallet/WalletTransactions";
import AdvertiserWallet from "./pages/Wallet/AdvertiserWallet";
import AdvertiserSettings from "./pages/Settings/AdvertiserSettings";
import AdvertiserSupport from "./pages/Support/AdvertiserSupport";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Plans from "./pages/Plans/Plans";
import AdvertiserNotifications from "./pages/Notifications/AdvertiserNotifications";

// Add more imports as needed

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AdvertiserDashboard />} />
          <Route path="/tasks/campaigns" element={<AdvertiserCampaigns />} />
          <Route path="/tasks/my-campaigns" element={<MyCampaigns />} />
          <Route path="/tasks/new" element={<NewCampaign />} />
          <Route path="/tasks/submissions" element={<CampaignSubmissions />} />
          <Route path="/tasks/details/:id" element={<CampaignDetails />} />
          <Route path="/wallet" element={<AdvertiserWallet />} />
          <Route path="/wallet/transactions" element={<WalletTransactions />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/training" element={<Trainings />} />
          <Route path="/notifications" element={<AdvertiserNotifications />} />
          <Route path="/settings" element={<AdvertiserSettings />} />
          <Route path="/support" element={<AdvertiserSupport />} />
          {/* ...add other routes or 404 */}
        </Route>
      </Routes>
    </>
  );
}
