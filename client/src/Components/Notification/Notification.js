import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Notification.css";
import Navbar2 from "../Navbar2/Navbar2";
import axios from "axios";
import ChatBot from "../ChatBot/ChatBot";

export const Notification = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();

  //  Fetch complaints from backend
  const fetchComplaints = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userEmail = userData?.email;
      if (!userEmail) return;
      // const userEmail = localStorage.getItem("userEmail");
      const response = await axios.get(
        `http://localhost:1600/api/complaints?email=${userEmail}`
      );
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  //  Fetch every 10 seconds to detect admin changes
  useEffect(() => {
    fetchComplaints();
    const interval = setInterval(fetchComplaints, 10000);
    return () => clearInterval(interval);
  }, []);

  //  Detect admin changes — keep old notifications untouched
  useEffect(() => {
    if (complaints.length > 0) {
      setNotifications((prev) => {
        const newOnes = [];

        complaints.forEach((c) => {
          const currentStatus = (c.status || "unresolved").trim().toLowerCase();

          //  Check for new admin remarks only (ignore status now)
          c.responses?.forEach((r) => {
            const already = prev.some(
              (n) =>
                n.complaintId === c.complaintId &&
                n.type === "response" &&
                n.remark === r.remark
            );
            if (!already) {
              newOnes.push({
                _id: `${c._id}-${Date.now()}`,
                complaintId: c.complaintId,
                problem_type: c.problem_type,
                remark: r.remark,
                adminName: r.adminName,
                type: "response",
                date: r.respondedAt || new Date(),
              });
            }
          });
        });

        return [...newOnes, ...prev];
      });
    }
  }, [complaints]);

  return (
    <div className="notification1">
      <Navbar2 />
      <ChatBot />
      <div className="notification_box">
        <h2>Notifications</h2>

        <table className="notification_table">
          <thead>
            <tr>
              <th>Complaint Id</th>
              <th>Issue Type</th>
              {/*  Removed Status column */}
              <th>Date & Time</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {notifications.length === 0 ? (
              <tr>
                <td colSpan="4">No Notification Found</td>
              </tr>
            ) : (
              notifications.map((n) => (
                <tr key={n._id}>
                  <td>{n.complaintId}</td>
                  <td>{n.problem_type}</td>
                  {/*  Removed status cell */}
                  <td>{new Date(n.date || Date.now()).toLocaleString()}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate("/ComplaintDetails", {
                          state: {
                            complaint: complaints.find(
                              (c) => c.complaintId === n.complaintId
                            ),
                          },
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
};

export default Notification;
