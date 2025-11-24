import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NoticeComplaint.css";
import Admin_nav from "../Admin_nav/Admin_nav";
import { useNavigate } from "react-router-dom";

export const NoticeComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:1600/api/complaints/notice");
      //  Filter only complaints sent back by Admin2
      const sentBackComplaints = res.data.filter(
        (c) => c.status === "sent-back" || c.status === "resent"
      );
      setComplaints(sentBackComplaints);
    } catch (err) {
      console.error("Error fetching notice complaints:", err);
    }
  };
  fetchComplaints();
}, []);


  //  When admin clicks "View", navigate to detail page
  const handleView = (complaint) => {
    navigate("/NoticeDetails", { state: { complaint } });
  };

  return (
    <div>
      <Admin_nav />
      <div className="notice_received_complaint">
        <h1>Notice Box</h1>

        <div className="notice_Complaint">
          <table className="notice_table">
            <thead>
              <tr className="notice_box">
                <th>Complaint ID</th>
                <th>Issue Type</th>
                <th>Priority</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Notice From</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length > 0 ? (
                complaints.map((c) => (
                  <tr key={c._id}>
                    <td>{c.complaintId || "N/A"}</td>
                    <td>{c.problem_type}</td>
                    <td>{c.priority}</td>
                    <td>{new Date(c.createdAt).toLocaleString()}</td>
                    <td>{c.status}</td>
                    <td>{c.noticeFrom || "Higher Authority"}</td>
                    <td>
                      <button
                        className="view_btn"
                        onClick={() => handleView(c)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No notices received
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NoticeComplaint;
