import React, { useState, useEffect } from "react";
import "./NoticeDetails.css";
import Admin_nav from "../Admin_nav/Admin_nav";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const NoticeDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { complaint } = location.state || {};
  const [complaintDetails, setComplaintDetails] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (complaint?._id) {
      fetchComplaintDetails(complaint._id);
    }
  }, [complaint]);

  const fetchComplaintDetails = async (id) => {
    try {
      const res = await axios.get(`http://localhost:1600/api/complaints/${id}`);
      const complaintData = res.data;

      //  Extract latest admin2 remark (if exists)
      let latestResponse = null;
      if (complaintData.responses && complaintData.responses.length > 0) {
        latestResponse =
          complaintData.responses[complaintData.responses.length - 1];
      } else if (complaintData.admin2Response) {
        latestResponse = complaintData.admin2Response;
      }

      setComplaintDetails({ ...complaintData, latestResponse });
    } catch (err) {
      console.error("Error fetching complaint details:", err);
    }
  };

  const handleSendFeedback = async () => {
    if (!feedback.trim() || !remark.trim()) {
      alert("Please fill both fields before sending.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:1600/api/complaints/response-feedback/send",
        {
          complaintId: complaintDetails._id,
          responseFeedbackMessage: feedback,
          responseRemark: remark,
        }
      );

      alert(" Feedback sent successfully!");
      setFeedback("");
      setRemark("");
      setShowFeedbackForm(false);
    } catch (err) {
      console.error("Error sending feedback:", err);
      alert(" Failed to send feedback.");
    } finally {
      setLoading(false);
    }
  };

  if (!complaintDetails) {
    return (
      <div>
        <Admin_nav />
        <div className="notice_details">
          <h1>Notice Details</h1>
          <p>Loading details...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Admin_nav />
      <div className="notice_details">
        <h1>Notice Details</h1>

        <div className="notice_details_box">
          <h2>Higher Authorities Notice</h2>
          <div className="noticeDetails_complaint_info">
          
            {/* Higher Authority Notice */}
            <div className="higher_authority_notice">
              <h3>Notice From Higher Authority</h3>
              <p>
                <b>By:</b> {complaintDetails.noticeFrom || "Higher Authority"}
              </p>
              <p>
                <b>Remark:</b>{" "}
                {complaintDetails.noticeRemark || "No remark provided"}
              </p>
              <p>
                <b>Status:</b> {complaintDetails.noticeStatus || "sent-back"}
              </p>
              <p>
                <b>Date:</b>{" "}
                {new Date(
                  complaintDetails.noticeDate || complaintDetails.createdAt
                ).toLocaleString()}
              </p>
            </div>

            {/* Latest Admin2 Response */}
            {complaintDetails.latestResponse && (
              <div className="admin2_response_section">
                <h3>Latest Response (Admin2)</h3>
                <p>
                  <b>By:</b>{" "}
                  {complaintDetails.latestResponse.adminName || "Admin2"}
                </p>
                <p>
                  <b>Remark:</b>{" "}
                  {complaintDetails.latestResponse.remark || "No remark given"}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  {complaintDetails.latestResponse.status || "N/A"}
                </p>
                <p>
                  <b>Date:</b>{" "}
                  {new Date(
                    complaintDetails.latestResponse.respondedAt
                  ).toLocaleString()}
                </p>
              </div>
            )}

            <div className="noticeDetails_buttons">
              <button
                className="NoticeDetails_handle_btn"
                onClick={() =>
                  navigate("/Handle_complaint", {
                    state: { complaint: complaintDetails },
                  })
                }
              >
                View Complaint and Handle
              </button>

              <button
                className="NoticeDetails_feedback_btn"
                onClick={() => setShowFeedbackForm(!showFeedbackForm)}
              >
                {" "}
                {/* Send response to higher authorities */}
                {showFeedbackForm
                  ? "Cancel Feedback"
                  : "Send Feedback to Higher Authority"}
              </button>
            </div>

            {/*  Feedback Section */}
            {showFeedbackForm && (
              <div className="feedback_section">
                <h3>Send Response to Higher Authority</h3>

                <label>Response Message:</label>
                <br />

                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <br />
                <label>Remark:</label>
                <br />
                <input
                  type="text"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />

                <button
                  className="send_btn"
                  onClick={handleSendFeedback}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Response"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetails;
