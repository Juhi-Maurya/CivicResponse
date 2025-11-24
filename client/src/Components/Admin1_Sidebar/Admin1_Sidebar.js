import React, { useState } from "react";
import "./Admin1_Sidebar.css";
import { HiChartPie } from "react-icons/hi2";
import { HiOutlinePencilSquare, HiSquare3Stack3D } from "react-icons/hi2";
import { GiProgression } from "react-icons/gi";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
export const Admin1_Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("userEmail");
      navigate("/");
    }
  };
  return (
    <>
      {/* Toggle Button */}
      <button
        className="Admin_sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <div className={isOpen ? "sidebar open" : "sidebar"}>
        <div className="sidebar_link">
          <a href="/Dashboard">
            <HiSquare3Stack3D />
            Admin Dashboard
          </a>
          <a href="Admin_ReceivedComplaint">
            {/* <HiOutlinePencilSquare /> */}
            <RiNotificationBadgeFill />
            Received Complaint
          </a>

          <a href="NoticeComplaint">
            {/* <GiProgression /> rr */}
            <HiOutlinePencilSquare /> Notice
          </a>

          <button onClick={handleLogout}>
            <LuLogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Admin1_Sidebar;
