import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Welcomepage from "./Components/WelcomePage/Welcomepage";
import Navbar from "./Components/NavigationBar/Navbar";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import ComplaintForm from "./Components/ComplaintForm/ComplaintForm";
import Dashboard from "./Components/Dashboard/Dashboard";
import Navbar2 from "./Components/Navbar2/Navbar2";
import Sidebar from "./Components/Sidebar/Sidebar";
import Status from "./Components/Status/Status";
import ComplaintDetails from "./Components/ComplaintDetails/ComplaintDetails";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import Admin_nav from "./Components/Admin_nav/Admin_nav";
import Admin_ReceivedComplaint from "./Components/Admin_ReceivedComplaint/Admin_ReceivedComplaint";
import Handle_complaint from "./Components/Handle_complaint/Handle_complaint";
import Notification from "./Components/Notification/Notification";
import Admin2Dashboard from "./Components/Admin2Dashboard/Admin2Dashboard";
import Admin2_nav from "./Components/Admin2_nav/Admin2_nav";
import UnresolvedComplaint from "./Components/UnresolvedComplaint/UnresolvedComplaint";
import PendingComplaint from "./Components/PendingComplaint/PendingComplaint";
import PoorFeedback from "./Components/PoorFeedback/PoorFeedback";
import NoticeComplaint from "./Components/NoticeComplaint/NoticeComplaint";
import NoticeDetails from "./Components/NoticeDetails/NoticeDetails";
import ResolutionFeedback from "./Components/ResolutionFeedback/ResolutionFeedback";
import ResponseComplaintDetails from "./Components/ResponseComplaintDetails/ResponseComplaintDetails";
import ChatBot from "./Components/ChatBot/ChatBot";
import Admin1_Sidebar from "./Components/Admin1_Sidebar/Admin1_Sidebar";
import Admin2_Sidebar from "./Components/Admin2_Sidebar/Admin2_Sidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/Welcomepage" element={<Welcomepage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/ComplaintForm" element={<ComplaintForm />} />
      <Route path="./Navbar2" element={<Navbar2 />} />
      <Route path="/Sidebar" element={<Sidebar />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Status" element={<Status />} />
      <Route path="/ComplaintDetails" element={<ComplaintDetails />} />
      <Route path="/Admin1_Sidebar" element={<Admin1_Sidebar />} />
      <Route path="/Admin2_Sidebar" element={<Admin2_Sidebar />} />
      <Route path="/Admin_nav" element={<Admin_nav />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="Handle_complaint" element={<Handle_complaint />} />
      <Route
        path="/Admin_ReceivedComplaint"
        element={<Admin_ReceivedComplaint />}
      />
      <Route path="/Notification" element={<Notification />} />
      <Route path="/Admin2Dashboard" element={<Admin2Dashboard />} />
      <Route path="/Admin2_nav" element={<Admin2_nav />} />
      <Route path="/UnresolvedComplaint" element={<UnresolvedComplaint />} />
      <Route path="/PendingComplaint" element={<PendingComplaint />} />
      <Route path="/PoorFeedback" element={<PoorFeedback />} />
      <Route path="/NoticeComplaint" element={<NoticeComplaint />} />{" "}
      <Route path="/NoticeDetails" element={<NoticeDetails />} />
      <Route path="/ChatBot" element={<ChatBot />} />
      <Route path="/ResolutionFeedback" element={<ResolutionFeedback />} />
      <Route
        path="/ResponseComplaintDetails"
        element={<ResponseComplaintDetails />}
      />
    </Routes>
  </BrowserRouter>
);
