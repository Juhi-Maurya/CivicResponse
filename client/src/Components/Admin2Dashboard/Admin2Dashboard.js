import React from "react";
import "./Admin2Dashboard.css";
import { useNavigate } from "react-router-dom";
import { HiChartPie } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GiProgression } from "react-icons/gi";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { LuLogOut } from "react-icons/lu";
import Admin2_nav from "../Admin2_nav/Admin2_nav";
import UnresolvedComplaint from "../UnresolvedComplaint/UnresolvedComplaint";
import Admin2_Sidebar from "../Admin2_Sidebar/Admin2_Sidebar";
export const Admin2Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("userEmail");
      navigate("/"); // redirect to welcome page
    }
  };
  return (
    <div className="admin2_dash">
      <Admin2_nav />
      <Admin2_Sidebar />
      {/* <h2>admin Dashboard</h2> */}
      <div className="admin2-dash1">
        <div className="admin2_wel_info">
          {" "}
          <p className="admin2_scroll-text scroll1">
            Welcome to Civic Response Platform! &nbsp; &nbsp; This platform
            helps citizens report civic issues like broken roads, water supply,
            waste management, broken streets, and their resolution by local
            authorities. &nbsp; &nbsp;
          </p>
        </div>
        <div className="admin1_animated-icons">
          <img src="/Image/publicsector.webp" alt="City" />
        </div>
        {/* <hr /> */}
        <h2>Complaint Panel</h2>
        <div className="admin2_section2">
          <button
            className="admin2_submit_complaint"
            onClick={() => navigate("/UnresolvedComplaint")}
          >
            <b>Unresolved Complaints</b>
          </button>
          
          <button
            className="admin2_notification"
            onClick={() => navigate("/ResolutionFeedback")}
          >
            <b> Resolution Feedback </b>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Admin2Dashboard;
