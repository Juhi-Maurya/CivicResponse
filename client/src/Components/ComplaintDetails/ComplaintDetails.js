import React, { useState } from "react";
import "./ComplaintDetails.css";
import { useLocation } from "react-router-dom";

import axios from "axios";
import Navbar2 from "../Navbar2/Navbar2";
import ChatBot from "../ChatBot/ChatBot";
export const ComplaintDetails = () => {
  const location = useLocation();
  const { complaint } = location.state || {}; //  fetch complaint data

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  // CHANGED HERE → Check if user already gave feedback
  const alreadyGivenFeedback = complaint?.feedbackStatus ? true : false;

  const canGiveFeedback = ["resolved", "closed"].includes(
    complaint?.status?.trim().toLowerCase()
  );

  const filteredResponses = complaint.responses.filter((resp) => {
    if (resp.adminName === "admin1") return true; // always show admin1 responses
    if (
      resp.adminName === "admin2" &&
      resp.status === "closed" &&
      resp.visibleToUser
    )
      return true; // show only admin2 responses that are closed & visible
    return false; // hide everything else, including "sent-back"
  });

  const handleSubmitFeedback = async () => {
    if (!feedbackStatus) {
      alert("Please select feedback status!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:1600/api/complaints/feedback/${complaint._id}`,
        {
          feedbackStatus,
          feedbackMessage,
        }
      );

      alert("Feedback submitted successfully!");

      // Update local complaint state to show feedback immediately
      complaint.feedbackStatus = feedbackStatus;
      complaint.feedbackMessage = feedbackMessage;

      setShowFeedback(false);
      setFeedbackStatus("");
      setFeedbackMessage("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Try again.");
    }
  };
  return (
    <div>
      <Navbar2 />
      <ChatBot />
      <div className="Cmp_details">
        <h2>Complaint Status</h2>
        <div className="details-box">
          <h3>Complaint Details</h3>
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
            <b>Description:</b> {complaint?.complaint_desc}
          </p>
          <p>
            <b>Date/Time:</b> {new Date(complaint?.createdAt).toLocaleString()}
          </p>
          <p>
            <b>Status:</b> {complaint?.status}
          </p>
        </div>

        <div className="complaint_action_box">
          {/* <h3>Admin Response</h3> */}
          <h3> Relevant Authorities Response</h3>
          {filteredResponses.length > 0 ? (
            filteredResponses.map((resp, index) => (
              <div key={index} className="admin_response">
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

          {/* feedback form  */}
          {canGiveFeedback && !alreadyGivenFeedback && (
            <>
              {!showFeedback ? (
                <button
                  className="complaint_feedback_btn"
                  onClick={() => setShowFeedback(true)}
                >
                  Feedback
                </button>
              ) : (
                <div className="complaint_feedback_form">
                  <hr />
                  <h3>Feedback</h3>
                  <p>
                    <b>Are you satisfied with the resolution?</b>
                  </p>
                  <div className="complaint_feedback_options">
                    <label className="radio1">
                      <input
                        type="radio"
                        name="feedback"
                        value="Resolved"
                        required
                        onChange={(e) => setFeedbackStatus(e.target.value)}
                      />
                      {""} Resolved(Satisfied)
                    </label>
                    <label className="radio2">
                      <input
                        type="radio"
                        name="feedback"
                        value="Unresolved"
                        required
                        onChange={(e) => setFeedbackStatus(e.target.value)}
                      />{" "}
                      Unresolved (Not Satisfied)
                    </label>
                    <br />
                    <p>
                      {" "}
                      <b>Review</b>(optional):
                    </p>
                    <textarea
                      // placeholder="Optional message..."
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                    />

                    <div className="feedback-buttons">
                      <button onClick={handleSubmitFeedback}>Submit</button>
                      <button onClick={() => setShowFeedback(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {/* Show user's existing feedback instead of button */}
          {alreadyGivenFeedback && (
            <div className="already-feedback">
              <hr />
              <h3>Your Feedback</h3>

              <p>
                <b>Status:</b> {complaint.feedbackStatus}
              </p>
              <p>
                <b>Review:</b> {complaint.feedbackMessage || "No review given"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ComplaintDetails;
