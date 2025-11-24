// import React from "react";
// import "./Sidebar.css";
// import { HiChartPie } from "react-icons/hi2";
// import { HiOutlinePencilSquare } from "react-icons/hi2";
// import { GiProgression } from "react-icons/gi";
// import { RiNotificationBadgeFill } from "react-icons/ri";
// import { HiSquare3Stack3D } from "react-icons/hi2";
// import { LuLogOut } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
// function Sidebar() {
//   const navigate = useNavigate();
//   // logout

//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (confirmLogout) {
//       localStorage.removeItem("userEmail");
//       navigate("/"); // redirect to welcome page
//     }
//   };
//   return (
//     <div className="sidebar">
//       <div className="sidebar_link">
//         <a href="/Dashboard">
//           <HiSquare3Stack3D />
//           User Dashboard
//         </a>

//         <a href="/ComplaintForm">
//           <HiOutlinePencilSquare />
//           Register Complaint
//         </a>

//         <a href="/Status">
//           <GiProgression /> Status
//         </a>

//         <a href="#">
//           <RiNotificationBadgeFill />
//           Notification
//         </a>

//         <button onClick={handleLogout}>
//           <LuLogOut />
//           Logout
//         </button>
//         {/* <hr /> */}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
import React, { useState } from "react";
import "./Sidebar.css";
import { HiChartPie } from "react-icons/hi2";
import { HiOutlinePencilSquare, HiSquare3Stack3D } from "react-icons/hi2";
import { GiProgression } from "react-icons/gi";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Sidebar() {
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
      <button className="Admin_sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={isOpen ? "Asidebar open" : "Asidebar"}>
        <div className="Asidebar_link">
          <a href="/Dashboard">
            <HiSquare3Stack3D />
            User Dashboard
          </a>
          <a href="/ComplaintForm">
            <HiOutlinePencilSquare />
            Register Complaint
          </a>
          <a href="/Status">
            <GiProgression /> Status
          </a>
          <a href="#">
            <RiNotificationBadgeFill />
            Notification
          </a>
          <button onClick={handleLogout}>
            <LuLogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
