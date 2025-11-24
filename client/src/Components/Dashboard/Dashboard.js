import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Navbar2 from "../Navbar2/Navbar2";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import ChatBot from "../ChatBot/ChatBot";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [pendingComplaints, setPendingComplaints] = useState(0);
  const [closedComplaints, setClosedComplaints] = useState(0);

  useEffect(() => {
    // Role check
    const role = localStorage.getItem("userRole");
    if (role !== "user") {
      if (role === "admin1") navigate("/AdminDashboard");
      else if (role === "admin2") navigate("/Admin2Dashboard");
      else navigate("/login");
    }

    // Fetch complaint counts
    const fetchCounts = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const userEmail = userData?.email;
        const response = await axios.get(
          `http://localhost:1600/api/complaints/counts?email=${userEmail}`
        );
        const { total, pending, closed } = response.data;
        setTotalComplaints(total);
        setPendingComplaints(pending);
        setClosedComplaints(closed);
      } catch (error) {
        console.error("Error fetching complaint counts:", error);
      }
    };

    fetchCounts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    navigate("/login"); // redirect to login page
  };

  return (
    <>
      <div className="public-dash">
        <Navbar2 />
        <Sidebar /> <ChatBot />
        <div className="public-dash1">
          <div className="user_wel_info">
            {" "}
            <p className="user_scroll-text scroll1">
              Welcome to Civic Response Platform! &nbsp; &nbsp; This platform
              helps citizens report civic issues like broken roads, water
              supply, waste management, broken streets, and their resolution by
              local authorities. &nbsp; &nbsp;
            </p>
          </div>
          <div className="user_animated-icons">
            <img src="/Image/publicsector.webp" alt="City" />
            <div className="public_section1">
              <div className="card one">
                <p>Total Complaint Registerd</p>
                <h2>{totalComplaints}</h2>
              </div>
              <div className="card two">
                <p>No. of Complaint Pending</p>
                <h2>{pendingComplaints}</h2>
              </div>
              <div className="card three">
                <p>Number of Complaint Closed</p>
                <h2>{closedComplaints}</h2>
              </div>
            </div>
          </div>

          <h2>Complaint Panel</h2>
          <div className="public_section2">
            <button
              className="submit_complaint"
              onClick={() => navigate("/ComplaintForm")}
            >
              <b>Register Complaint</b>
            </button>

            <button
              className="check_status"
              onClick={() => navigate("/Status")}
            >
              <b> View Status</b>
            </button>
            <button
              className="notification"
              onClick={() => navigate("/Notification")}
            >
              <b>Notification</b>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
