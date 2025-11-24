import React, { useState } from "react";
import "./Admin2_Sidebar.css";
import { HiChartPie } from "react-icons/hi2";
import { HiOutlinePencilSquare, HiSquare3Stack3D } from "react-icons/hi2";
import { GiProgression } from "react-icons/gi";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
export const Admin2_Sidebar = () => {
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
        className="Admin2_sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <div className={isOpen ? "A2sidebar open" : "A2sidebar"}>
        <div className="A2sidebar_link">
          <a href="#">
            {/* <HiChartPie /> */}
            <HiSquare3Stack3D />
            Admin Dashboard
          </a>

          <a href="UnresolvedComplaint">
            {/* <HiOutlinePencilSquare /> */}
            <RiNotificationBadgeFill />
            Unresolved Complaints
          </a>

          {/* <a href="/#">
            {/* <GiProgression /> rr */}
          {/* <HiOutlinePencilSquare /> Check Complaints
          </a> */}
          <a href="ResolutionFeedback">
            {/* <RiNotificationBadgeFill /> */}
            <GiProgression />
            Resolution Feedback
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

export default Admin2_Sidebar;
