import React, { useState } from "react";
import "./AdminDashboard.css";
import Admin_ReceivedComplaint from "../Admin_ReceivedComplaint/Admin_ReceivedComplaint";
import Admin1_Sidebar from "../Admin1_Sidebar/Admin1_Sidebar";
import Handle_complaint from "../Handle_complaint/Handle_complaint";
import { useNavigate } from "react-router-dom";
import Admin_nav from "../Admin_nav/Admin_nav";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // logout

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("userEmail");
      navigate("/"); // redirect to welcome page
    }
  };
  return (
    <div className="admin_dash">
      <Admin_nav />
      <Admin1_Sidebar />


      {/* <h2>admin Dashboard</h2> */}
      <div className="admin-dash1">
        {/* <hr /> */}
        <div className="admin1_wel_info">
          {" "}
          <p className="admin1_scroll-text scroll1">
            Welcome to Civic Response Platform! &nbsp; &nbsp; This platform
            helps citizens report civic issues like broken roads, water supply,
            waste management, broken streets, and their resolution by local
            authorities. &nbsp; &nbsp;
          </p>
        </div>
        <div className="admin1_animated-icons">
          <img src="/Image/publicsector.webp" alt="City" />
          {/* <div className="admin1_section1"></div> */}
        </div>
        <h2>Complaint Panel</h2>
        <div className="admin_section2">
          <button
            className="admin_submit_complaint"
            onClick={() => navigate("/Admin_ReceivedComplaint")}
          >
            <b>Received Complaint</b>
          </button>

          <button
            className="admin_check_status"
            onClick={() => navigate("/NoticeComplaint")}
          >
            <b>Notice from higher authorities</b>
          </button>
   
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
