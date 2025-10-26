// notifocation shoud change icon color and number tag should be at te top












// ### OwoDaily Features Overview

// Based on the official OwoDaily website (owodaily.com) and related resources, OwoDaily is a Nigerian-based marketplace platform that connects businesses with micro-workers, affiliates, and shoppers through micro-jobs, cashback deals, and bounty rewards. It operates as a CPA (Cost Per Action) network, where advertisers pay for verified actions, workers earn from completing jobs, and admins manage the ecosystem. The platform has been paying out millions weekly since 2020, with features tailored to each role.

// Below, I'll break down the key features for **Advertiser**, **Worker**, and **Admin** roles, based on the site's documentation, FAQ, and app descriptions. Features are focused on core functionalities like job posting, earning, verification, and management.

// #### Features as an Advertiser (Business Owner/Brand)
// Advertisers use OwoDaily to promote products, services, or social media presence by posting micro-jobs or bounties. You pay only for verified results, making it a low-risk way to drive engagement and sales.

// - **Job Posting & Targeting**:
//   - Post micro-jobs or bounties for jobs like social media promotion (e.g., likes, shares, follows on Facebook, Instagram, Twitter, YouTube), app testing, surveys, or content engagement.
//   - Target workers by country, category (e.g., social, bounty, field jobs), sub-category, gender, and more to reach the right audience.
//   - Set minimum payouts per sub-category to attract quality workers (e.g., higher pay for complex jobs).

// - **Verification & Approval**:
//   - Define step-by-step job instructions and required proof (e.g., screenshots, custom verification codes, questions only completers would know).
//   - Choose self-approval (moderate submissions via "My jobs" page) or hire OwoDaily for automated verification.
//   - Enable bounty mode for performance-based campaigns with automatic code delivery or creative demos for validation.

// - **Campaign Management**:
//   - Track submissions, approve/reject proofs, and pay only for successful actions.
//   - Access analytics on worker performance, engagement rates, and ROI (e.g., sales driven from promotions).
//   - Integrate cashback deals for shoppers, where you offer discounts and OwoDaily handles reward claims.

// - **Pricing & Payouts**:
//   - Fixed commissions per action (e.g., ₦2500 for promoting a cashback deal).
//   - Weekly payouts to workers, but you control budget and results before payment.

// - **Support Tools**:
//   - Dashboard for creating jobs, uploading images for instructions, and setting deadlines.
//   - Privacy and security features, including data encryption for campaigns.

// #### Features as a Worker (Micro-Worker/Freelancer)
// Workers (e.g., students, micro-creators) earn cash by completing simple, verified jobs. No skills required—just follow instructions and submit proof. Earnings start small but scale with bounties.

// - **Task Discovery & Earning**:
//   - Browse micro-jobs in categories like social media (e.g., promote deals, listen/follow on Spotify), bounty (e.g., sales challenges), field jobs (e.g., distribute flyers), or research (e.g., surveys, app testing).
//   - Complete jobs with step-by-step instructions (e.g., share a post and earn ₦30–₦15,000 per job).
//   - Unlock high-paying bounties as you build reputation (e.g., drive sales for commissions).

// - **Cashback & Rewards**:
//   - Activate cashback on shopping deals from top brands—buy online, get real cash (not points) starting from ₦1000 after verification.
//   - Redeem rewards via unique codes in the app, turning everyday shopping into income.

// - **Submission & Payout**:
//   - Submit proof (e.g., screenshots, photos) for verification—jobs are reviewed for quick approval.
//   - Get paid weekly (every Friday) for verified earnings, with a minimum withdrawal of ₦1000.
//   - Track progress in real-time via the app/dashboard, including earnings and task history.

// - **App & Accessibility**:
//   - Mobile app (Android/iOS) for easy task completion, code redemption, and notifications.
//   - No upfront fees—free registration, with jobs available 24/7.

// - **Growth Tools**:
//   - Build reputation for higher-paying jobs; track monthly income from jobs and cashback.
//   - Security: Advanced encryption protects your data and payments.

// #### Features as an Admin (Platform Manager/Owner)
// Admins (OwoDaily staff or super-users) manage the marketplace, ensuring smooth operations, verification, and growth. This role is internal but involves platform-wide tools for moderation and analytics.

// - **Platform Management**:
//   - Moderate job submissions, approve/reject proofs, and handle disputes (e.g., if a brand fails to honor cashback).
//   - Hire admins or use automated verification for bounties (e.g., custom codes, questions for validation).

// - **User & Job Oversight**:
//   - Monitor worker performance, advertiser campaigns, and task categories (e.g., social, bounty, field).
//   - Set minimum payouts, targeting options (country, gender), and job guidelines to maintain quality.

// - **Analytics & Reporting**:
//   - Track payouts (millions weekly), engagement rates, and ROI for advertisers.
//   - Investigate claims (e.g., unresolved cashback) and issue refunds if valid.

// - **Security & Compliance**:
//   - Enforce privacy protocols, data encryption, and transaction safety.
//   - Manage user onboarding, app updates, and support (e.g., FAQ for proof submission).

// - **Growth Features**:
//   - Update platform regularly (e.g., new task types, bounty modes).
//   - Handle weekly payouts and minimum withdrawal thresholds (₦1000).

// ### Summary
// OwoDaily is designed for quick, verified earnings in Nigeria/Africa, with a focus on micro-jobs and cashback. Advertisers get targeted promotion tools, workers get easy cash from jobs/shopping, and admins ensure verification and payouts. For more details, visit [owodaily.com](https://owodaily.com/) or download the app. If you need help signing up or specific examples, let me know!











































//    // --- Handle Apply ---
//     const handleApply = (task) => {
       

//      };











// //  if (!userData?.isAuthenticated) {
// //             toast.error("Please log in to apply for tasks!", {
// //                 position: "top-center",
// //             });
// //             navigate("/login");
// //             return;
// //         }

























  
  
// // src/pages/Tasks/Tasks.jsx
// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import ModalTask from "../../components/ModalTask";
// import { useTheme } from "../../hooks/useThemeContext";
// import { useUserData } from "../../hooks/useUserDataContext";
// import { GeneralContext } from "../../hooks/useGeneralContext";
// /**
//  * ============================================================================
//  * ✅ TASKS PAGE — Show Available & My Tasks (Newest First)
//  * ============================================================================
//  */
// export default function Tasks() {
//   const navigate = useNavigate();
//   const { theme } = useTheme();
//   const { userData, onApplyFunc } = useUserData();
//   const { tasks: alltasks } = useContext(GeneralContext);

//   const [activeTab, setActiveTab] = useState("available"); // "available" | "mytasks"
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   // Extract user's applied tasks
//   const myTasksArr = userData?.myTask || [];

//   /**
//    * ✅ Merge myTask (user-applied) with full task info from alltasks
//    * and show most recent applications first
//    */
//   const getMyTasksWithStatus = () => {
//     if (!Array.isArray(myTasksArr) || !Array.isArray(alltasks)) return [];

//     const matchedTasks = myTasksArr
//       .map((myTask) => {
//         const fullTask = alltasks.find((task) => task.id === myTask.id);
//         if (!fullTask) return null;

//         return {
//           ...fullTask,
//           status: myTask.status || "Pending Approval",
//           appliedAt: myTask.appliedAt,
//         };
//       })
//       .filter(Boolean)
//       .sort(
//         (a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
//       ); // 🧠 Sort newest first

//     return matchedTasks;
//   };

//   const myTasks = getMyTasksWithStatus();

//   /**
//    * ✅ Handle Apply Task — adds task and switches to “My Tasks” tab
//    */
//   const handleApply = (taskId) => {
//     onApplyFunc(taskId);
//     setActiveTab("mytasks");
//   };

//   /**
//    * ✅ Render Task Card
//    */
//   const renderTaskCard = (task, isMyTask = false) => {
//     const cardBg = theme === "dark" ? "#1f1f1f" : "#fff";
//     const textColor = theme === "dark" ? "#eaeaea" : "#222";

//     return (
//       <div
//         key={task.id}
//         className="rounded-2xl p-3 mb-4 shadow-md"
//         style={{
//           background: cardBg,
//           color: textColor,
//           border: theme === "dark" ? "1px solid #333" : "1px solid #ddd",
//         }}
//       >
//         <h5 className="fw-bold mb-2">{task.title}</h5>
//         <p className="small mb-1">Payout: ₦{task.payout}</p>
//         <p className="small mb-2">Slots: {task.slots}</p>
//         {isMyTask && (
//           <>
//             <p className="small text-info mb-1">Status: {task.status}</p>
//             <p className="small text-muted">
//               Applied: {new Date(task.appliedAt).toLocaleString()}
//             </p>
//           </>
//         )}
//         <div className="mt-2">
//           {isMyTask ? (
//             <button
//               className="btn btn-outline-primary btn-sm rounded-pill"
//               onClick={() => {
//                 setSelectedTask(task);
//                 setModalOpen(true);
//               }}
//             >
//               View Task
//             </button>
//           ) : (
//             <button
//               className="btn btn-primary btn-sm rounded-pill"
//               onClick={() => handleApply(task.id)}
//             >
//               Apply Now
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="container py-4">
//       <h3 className="fw-bold mb-3 text-center">My Tasks</h3>

//       {/* 🔹 Tabs */}
//       <div className="d-flex justify-content-center gap-2 mb-4">
//         <button
//           className={`btn btn-sm rounded-pill ${
//             activeTab === "available" ? "btn-primary" : "btn-outline-primary"
//           }`}
//           onClick={() => setActiveTab("available")}
//         >
//           Available Tasks
//         </button>
//         <button
//           className={`btn btn-sm rounded-pill ${
//             activeTab === "mytasks" ? "btn-primary" : "btn-outline-primary"
//           }`}
//           onClick={() => setActiveTab("mytasks")}
//         >
//           My Tasks
//         </button>
//       </div>

//       {/* 🔹 Task List */}
//       {activeTab === "available" && (
//         <div>
//           {alltasks && alltasks.length > 0 ? (
//             alltasks.map((task) => renderTaskCard(task))
//           ) : (
//             <p className="text-center text-muted">No tasks available yet.</p>
//           )}
//         </div>
//       )}

//       {activeTab === "mytasks" && (
//         <div>
//           {myTasks.length > 0 ? (
//             myTasks.map((task) => renderTaskCard(task, true))
//           ) : (
//             <p className="text-center text-muted">
//               You haven’t applied for any tasks yet.
//             </p>
//           )}
//         </div>
//       )}

//       {/* 🔹 Modal */}
//       {modalOpen && selectedTask && (
//         <ModalTask task={selectedTask} onClose={() => setModalOpen(false)} />
//       )}
//     </div>
//   );
// }






























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































