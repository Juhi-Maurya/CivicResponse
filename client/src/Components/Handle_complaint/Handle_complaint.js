import React, { useState, useEffect } from "react";
import "./Handle_complaint.css";
import Admin_nav from "../Admin_nav/Admin_nav";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const Handle_complaint = () => {
  const { state } = useLocation(); // complaint data passed from previous page
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(state?.complaint || {});
  const [status, setStatus] = useState(complaint.status || "pending");
  const [remarks, setRemarks] = useState("");
  // function to save  admin response in database
  const handleResponse = async () => {
    try {
      const res = await axios.post(
        `http://localhost:1600/api/complaints/respond/${complaint._id}`,
        { status, remark: remarks, adminName: "admin1" }
      );
      alert("Response submitted successfully ");

      setComplaint(res.data.complaint); //  update local complaint

      // navigate("/Admin_ReceivedComplaint"); //  go back to list
    } catch (err) {
      console.error("Error submitting response:", err);
      alert("Failed to submit response");
    }
  };

  return (
    <div>
      <Admin_nav />
      <div className="handle_complaint">
        <h1>Handle and View Complaint</h1>

        {/* 🔹 Complaint Info (Block layout, no table) */}
        <div className="info_details_box">
          <h2>Complaint Information</h2>
          <div className="ad_complaint_info">
            <p>
              <b>Complaint ID:</b> {complaint?.complaintId}
            </p>
            <p>
              <b>Name:</b> {complaint?.username}
            </p>
            <p>
              <b>Email:</b> {complaint?.email}
            </p>
            <p>
              <b>Phone:</b> {complaint?.number}
            </p>
            <p>
              <b>Country:</b> {complaint?.country}
            </p>
            <p>
              <b>State:</b> {complaint?.state}
            </p>
            <p>
              <b>District:</b> {complaint?.district}
            </p>
            <p>
              <b>Area:</b> {complaint?.area}
            </p>
            <p>
              <b>Pincode:</b> {complaint?.pincode}
            </p>
            <p>
              <b>Address:</b> {complaint?.address}
            </p>
            <p>
              <b>Problem Type:</b> {complaint?.problem_type}
            </p>
            <p>
              <b>Priority:</b> {complaint?.priority}
            </p>
            <p>
              <b> Complaint Description:</b> {complaint?.complaint_desc}
            </p>
            <p>
              <b>Date/Time:</b>{" "}
              {new Date(complaint?.createdAt).toLocaleString()}
            </p>
            <p>
              <b>Status:</b> {status}
            </p>
          </div>
        </div>

        {/* 🔹 Admin Actions */}
        <div className="admin_actions">
          <h2>Relevant Authorities Actions</h2>
          <div className="admin_actions_box">
            <p>
              <b>Change Status:</b>
              {/* <br /> */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="unresolved">Unresolved</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </p>

            <p>
              <b>Remark /Admin Actions:</b>
              <br />
              <textarea
                name=""
                onChange={(e) => setRemarks(e.target.value)} //  added binding
                value={remarks}
                rows="3"
                required
              >
                {" "}
              </textarea>
              <br />
              <b>Actions:</b>
              {/* <br /> */}
              <button
                className="admin_resolve_btn"
                onClick={handleResponse} //  call DB update
              >
                submit
              </button>
            </p>
          </div>
        </div>
        <div className="admin_previous_actions">
          <h2>Previous Actions </h2>

          {complaint?.responses?.length > 0 ? ( // removed filter for admin1 only
            complaint.responses.map((resp, index) => (
              <div key={index} className="admin_response1">
                <p>
                  <b>Admin Name:</b> {resp.adminName}
                </p>
                <p>
                  <b>Status:</b> {resp.status}
                </p>
                <p>
                  <b>Remark:</b> {resp.remark}
                </p>
                <p>
                  <b>Responded At:</b>{" "}
                  {new Date(resp.respondedAt).toLocaleString()}
                </p>
                <hr />
              </div>
            ))
          ) : (
            <p>No Relevant Authorities responses yet.</p>
          )}
          {/* <button>View</button> */}
        </div>
      </div>
    </div>
  );
};
export default Handle_complaint;
