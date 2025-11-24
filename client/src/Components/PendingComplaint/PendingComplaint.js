import React, { useState, useEffect } from "react";
import "./PendingComplaint.css";
import Admin2_nav from "../Admin2_nav/Admin2_nav";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const PendingComplaint = () => {
  const location = useLocation();

  const { state } = useLocation(); // complaint data passed from previous page
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(state?.complaint || {});
  const [status, setStatus] = useState(complaint.status || "pending");
  const [remarks, setRemarks] = useState("");

  // function to save  admin response in database
  const handleResponse = async (newStatus) => {
    try {
      const res = await axios.post(
        `http://localhost:1600/api/complaints/respond/${complaint._id}`,
        {
          status: newStatus.toLowerCase(),
          remark: remarks,
          adminName: "Admin2",
        }
      );
      alert("Response submitted successfully ");
      setComplaint(res.data.complaint); //  update local complaint
      // navigate("/Admin_ReceivedComplaint"); //  go back to list
      setStatus(newStatus);
    } catch (err) {
      console.error("Error submitting response:", err);
      alert("Failed to submit response");
    }
  };
  return (
    <div>
      <Admin2_nav />
      <div className="pendingComplaint">
        <h1>Pending Complaint</h1>
        <div className="pending_cmp">
          <h2>Complaint Information</h2>
          <div className="pending_cmp_details">
            {/* <h2>Complaint Details</h2> */}
            <p>
              <b>Complaint ID:</b>
              {complaint?.complaintId}
            </p>
            <p>
              <b>Name:</b>
              {complaint?.username}
            </p>
            <p>
              <b>Email:</b>
              {complaint?.email}
            </p>
            <p>
              <b>Phone:</b>
              {complaint?.number}
            </p>
            <p>
              <b>Country:</b>
              {complaint?.country}
            </p>
            <p>
              <b>State:</b>
              {complaint?.state}
            </p>
            <p>
              <b>District:</b>
              {complaint?.district}
            </p>
            <p>
              <b>Area:</b>
              {complaint?.area}
            </p>
            <p>
              <b>Pincode:</b>
              {complaint?.pincode}
            </p>
            <p>
              <b>Address:</b>
              {complaint?.address}
            </p>
            <p>
              <b>Problem Type:</b>
              {complaint?.problem_type}
            </p>
            <p>
              <b>Priority:</b> {complaint?.priority}
            </p>
            <p>
              <b>Description:</b>
              {complaint?.complaint_desc}
            </p>
            <p>
              <b>Date/Time:</b>
              {new Date(complaint?.createdAt).toLocaleString()}
            </p>
            <p>
              <b>Status:</b>
              {complaint?.status}
            </p>
          </div>
        </div>
        <div>
          <div className="admin2_actions_pending">
            <h2>Admin Actions</h2>
            <div className="admin2_actions_box_pending">
              <p>
                <b>Remark /Notice:</b>
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
                <br />
                {/* <button
                  className="admin2_resolve_btn"
                  onClick={() => {
                    setStatus("sentBack");
                    // handleResponse();
                  }}
                  //  call DB update
                >
                  SendBack to lower authorities
                </button> */}
                <button
                  className="admin2_resolve_btn"
                  onClick={() =>
                    // setStatus("resent");
                    handleResponse("sent-back")
                  }
                >
                  Send Back to Lower Authorities
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PendingComplaint;
