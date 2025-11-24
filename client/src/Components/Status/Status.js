import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Status.css";
import Navbar2 from "../Navbar2/Navbar2";
import axios from "axios";
import ChatBot from "../ChatBot/ChatBot";

function Status() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const userEmail = userData?.email;
        if (!userEmail) return;
        const response = await axios.get(
          `http://localhost:1600/api/complaints?email=${userEmail}`
        );

        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);
  // Add new complaint from navigation state if present
  useEffect(() => {
    if (location.state && location.state.newComplaint) {
      setComplaints((prevComplaints) => [
        location.state.newComplaint,
        ...prevComplaints,
      ]);
    }
  }, [location.state]);

  return (
    <div>
      <Navbar2 />
      <ChatBot /> 
      <div className="table-container">
        <h2 className="table-title">Complaints Status</h2>
        <table className="status_table">
          <thead>
            <tr className="status_box">
              <th>Complaint Id</th>
              <th>Complaint Type</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="4">No complaints found</td>
              </tr>
            ) : (
              complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td style={{ width: "120px" }}>{complaint.complaintId}</td>
                  <td style={{ maxWidth: "300px" }}>
                    {complaint.problem_type}
                  </td>
                  <td>{complaint.status}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate("/ComplaintDetails", {
                          state: { complaint },
                        })
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Status;
