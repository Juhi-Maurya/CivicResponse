import React from "react";
import "./Navbar2.css";
import { useNavigate } from "react-router-dom";
function Navbar2() {
  const navigate = useNavigate();
  // logout

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("userEmail");
      navigate("/"); // redirect to welcome page
    }
  };
  return (
    <div className="navbar2">
      <div className="nav_title">
        <h2>Civic Response</h2>
        <p>“Making Every Voice Count — From Concern to Change.”</p>
      </div>

      <div className="nav2_link">
        <a href="/Dashboard">Dashboard</a>
        {/* <a href="/ComplaintForm">Register Complaint</a>
        <a href="/Status">View Status</a> */}
        {/* <a href="#">Notification</a> */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar2;
