import React from "react";
import "./Admin2_nav.css";
import { useNavigate } from "react-router-dom";
function Admin2_nav() {
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
    <div className="admin2_navbar">
      <div className="admin2_nav_title">
        <h2>Civic Response</h2>
        <p>“Making Every Voice Count — From Concern to Change.”</p>
      </div>

      <div className="admin2_nav_link">
        <a href="/Admin2Dashboard">Dashboard</a>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Admin2_nav;
