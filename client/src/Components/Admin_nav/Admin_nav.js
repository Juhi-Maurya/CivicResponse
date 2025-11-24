import React from "react";
import "./Admin_nav.css";
import { useNavigate } from "react-router-dom";
function Admin_nav() {
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
    <div className="admin_navbar">
      <div className="admin_nav_title">
        <h2>Civic Response</h2>
        <p>“Making Every Voice Count — From Concern to Change.”</p>
      </div>

      <div className="admin_nav_link">
        <a href="/AdminDashboard">Dashboard</a>
    
        <button onClick={handleLogout }>Logout</button>
      </div>
    </div>
  );
}

export default Admin_nav;
