import React, { useState, useEffect } from "react";
import "./ResponseComplaintDetails.css";
import Admin2_nav from "../Admin2_nav/Admin2_nav";
import { useLocation } from "react-router-dom";
import axios from "axios";
export const ResponseComplaintDetails = () => {
  const location = useLocation();
  const { complaint } = location.state || {};
  const [showHistory, setShowhistory] = useState(false);
  const [responses, setResponses] = useState([]);
  const [userFeedback, setUserFeedback] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [remark, setRemark] = useState("");
  useEffect(() => {
    if (complaint?._id) {
      fetchComplaintDetails();
    }
  }, [complaint]);

  const fetchComplaintDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:1600/api/complaints/${complaint._id}`
      );
      const data = res.data; //  define data properly

      setResponses(data.responses || []);
      setFeedbackStatus(data.feedbackStatus || "No feedback yet");
      setFeedbackMessage(data.feedbackMessage || "No review provided");
    } catch (err) {
      console.error("Error fetching complaint details:", err);
    }
  };
  //  Send Back to Lower Authorities
  const handleSendBack = async () => {
    if (!remark.trim()) {
      alert("Please enter a remark before sending back.");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:1600/api/complaints/respond/${complaint._id}`,
        {
          status: "sent-back", // or "reopened"
          remark,
          adminName: "admin2",
        }
      );
      alert("Complaint sent back to lower authorities successfully!");
      setResponses(res.data.complaint.responses);
      setRemark("");
    } catch (err) {
      console.error("Error sending back complaint:", err);
      alert("Failed to send back complaint.");
    }
  };

  //  Close Complaint
  const handleCloseComplaint = async () => {
    if (!remark.trim()) {
      alert("Please enter a remark before closing the complaint.");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:1600/api/complaints/respond/${complaint._id}`,
        {
          status: "closed",
          feedback_status: "resolved",
          remark,
          adminName: "admin2",
        }
      );
      alert("Complaint closed successfully!");
      setResponses(res.data.complaint.responses);
      setRemark("");
    } catch (err) {
      console.error("Error closing complaint:", err);
      alert("Failed to close complaint.");
    }
  };
  return (
    <div>
      <Admin2_nav />
      <div className="ResponseComplaintDetails">
        <h1>Response Complaint Details</h1>

        <div className="ResponseCmpDetails">
          <h2>Complaint Information</h2>
          <div className="Response_cmp_details">
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
              <b>Description:</b> {complaint?.complaint_desc}
            </p>
            <p>
              <b>Date/Time:</b>{" "}
              {new Date(complaint?.createdAt).toLocaleString()}
            </p>
            <p>
              <b>Status:</b> {complaint?.status}
            </p>
          </div>
        </div>

        {/*  Complaint history section (shows only when clicked) */}
        <div className="Rcmp_history_box">
          <h2>Complaint History</h2>
          {/* <p>
            <b>User Feedback:</b> {userFeedback || "No feedback available"}
          </p> */}
          <div className="Rfeedback_display_box">
            <p>
              <b>User Feedback:</b>
            </p>
            <p>
              <b>Feedback Status:</b> {feedbackStatus}
            </p>
            <p>
              <b>Review / Message:</b> {feedbackMessage}
            </p>
          </div>

          <button onClick={() => setShowhistory(!showHistory)}>
            <b>
              {showHistory
                ? "Hide Actions by Relevant Authorities"
                : "Taken Action by Relevant Authorities"}
            </b>
          </button>

          {showHistory && (
            <>
              {responses.length > 0 ? (
                responses.map((resp, index) => (
                  <div key={index} className="R_admin_response">
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
                <p>No admin responses yet.</p>
              )}
            </>
          )}
        </div>

        {/* <div className="admin2_actions">
          <h2>Admin Actions</h2>
          <div className="admin2_actions_box">
            <p>
              <b>Remark / Notice:</b>
              <br />
              <textarea rows="3" required></textarea>
              <br />
              <button>Send Back to lower authorities</button>
            </p>
          </div>
        </div> */}
        {/* <div className="R_admin2_actions">
          <h2>Admin Actions</h2>
          <div className="R_admin2_actions_box">
            <p>
              <b>Remark / Notice:</b>
              <br />
              <textarea
                rows="3"
                required
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              ></textarea>
              <br />
              <button onClick={handleSendBack}>
                Send Back to Lower Authorities
              </button>{" "}
              <button onClick={handleCloseComplaint}>Close Complaint</button>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default ResponseComplaintDetails;
