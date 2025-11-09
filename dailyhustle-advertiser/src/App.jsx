import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import ViewCampaign from "./pages/Tasks/ViewCampaign";
import AllCampaigns from "./pages/Tasks/AllCampaigns";
import AdvertiserDashboard from "./pages/Dashboard/AdvertiserDashboard";
// import CampaignDetails from "../bin/CampaignDetails";
import MyCampaigns from "./pages/Tasks/MyCampaigns";
import QuickSignup from "./pages/auth/Signup/signup";
import Login from "./pages/auth/Login/login";
import KYCForm from "./pages/auth/Kyc/kyc";
import ForgotPassword from "./pages/auth/ForgotPassword/forgotPassword";
import NewCampaign from "./pages/Tasks/NewCampaign";
import Trainings from "./pages/Training/Trainings";
// import WalletTransactions from "./pages/Wallet/WalletTransactions";
import AdvertiserWallet from "./pages/Wallet/AdvertiserWallet";
import AdvertiserSettings from "./pages/Settings/AdvertiserSettings";
import AdvertiserSupport from "./pages/Support/AdvertiserSupport";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Plans from "./pages/Plans/Plans";
import AdvertiserNotifications from "./pages/Notifications/AdvertiserNotifications";
import { useState } from "react";
// Add more imports as needed

export default function App() {
  // const [theme, setTheme] = useState("light");
  // const user = { name: "Alex Johnson", email: "alex@dailyhustle.app" };
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AdvertiserDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/QuickSignup" element={<QuickSignup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/kyc" element={<KYCForm />} />
          <Route path="/jobs/my-campaigns" element={<MyCampaigns />} />
          <Route path="/jobs/new" element={<NewCampaign />} />
          <Route path="/jobs/allcampaigns" element={<AllCampaigns />} />
          <Route path="/wallet" element={<AdvertiserWallet />} />
          <Route path="/viewcampaign/:param" element={<ViewCampaign />} />
          {/* <Route path="/wallet/transactions" element={<WalletTransactions />} /> */}
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
