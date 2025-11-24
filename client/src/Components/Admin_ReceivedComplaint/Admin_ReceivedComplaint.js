import React, { useEffect, useState } from "react";
import "./Admin_ReceivedComplaint.css";
import Admin_nav from "../Admin_nav/Admin_nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Admin_ReceivedComplaint = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  // Fetch complaints from backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:1600/api/complaints/all");
        console.log("Complaints received", res.data);
        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div>
      <Admin_nav />
      <div className="admin_received_complaint">
        <h1>Complaint Box</h1>
        <div className="admin_newComplaint">
          {/* <h2>New Complaints</h2> */}
          <table className="admin_status_table">
            <thead>
              <tr className="admin_status_box">
                <th>Complaint Id</th>
                <th>UserId</th>
                <th>Location</th>
                <th>Issue Type</th>
                <th>Priority</th>
                <th>Date&Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan="8">No complaints found</td>
                </tr>
              ) : (
                complaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td>
                      {complaint?.complaintId}{" "}
                      {complaint.status === "pending" && (
                        <span className="new-inline">NEW**</span>
                      )}
                    </td>
                    <td>{complaint.email}</td>
                    <td>
                      {complaint.state},{complaint.district},{complaint.area},
                      {complaint.pincode}
                    </td>
                    <td>{complaint.problem_type}</td>
                    <td>{complaint.priority}</td>
                    <td>{new Date(complaint.createdAt).toLocaleString()}</td>
                    <td>{complaint.status || "pending"}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => {
                          //  update local state to remove NEW
                          setComplaints((prev) =>
                            prev.map((c) =>
                              c._id === complaint._id
                                ? { ...c, status: "seen" }
                                : c
                            )
                          );

                          navigate("/Handle_complaint", {
                            state: { complaint },
                          });
                        }}
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
    </div>
  );
};
export default Admin_ReceivedComplaint;
