import React, { useEffect, useState } from "react";
import "./UnresolvedComplaint.css";
import Admin2_nav from "../Admin2_nav/Admin2_nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UnresolvedComplaint = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [poorFeedbackComplaints, setPoorFeedbackComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchComplaints = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:1600/api/complaints/all");
  //     console.log(
  //       "Complaint statuses:",
  //       res.data.map((c) => c.status)
  //     );

  //     // const unresolved = res.data.filter((c) => {
  //     //   const status = (c.status || "").toLowerCase();
  //     //   return (
  //     //     status.includes("unresolved") ||
  //     //     status === "pending" ||
  //     //     status === "sent_back" ||
  //     //     status === "reopened"
  //     //   );
  //     // });
  //     const unresolved = res.data.filter((c) => {
  //       const status = (c.status || "").trim().toLowerCase();
  //       return ["unresolved", "pending", "in-progress"].includes(status);
  //     });

  //     setComplaints(unresolved);
  //   } catch (err) {
  //     console.error("Error fetching complaints:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:1600/api/complaints/all");
      console.log(
        "Complaint statuses:",
        res.data.map((c) => c.status)
      );

      //  Filter unresolved/pending/in-progress
      const unresolved = res.data.filter((c) => {
        const status = (c.status || "").trim().toLowerCase();
        return ["pending", "resent", "unresolved"].includes(status);
      });

      setComplaints(unresolved);

      //  Filter complaints where feedbackStatus is "Unresolved"
      const poorFeedback = res.data.filter(
        (c) => (c.feedbackStatus || "").trim().toLowerCase() === "unresolved"
      );

      setPoorFeedbackComplaints(poorFeedback);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  //  Auto refresh every 10 seconds like Notification.jsx
  useEffect(() => {
    fetchComplaints();
    const interval = setInterval(fetchComplaints, 10000);
    return () => clearInterval(interval);
  }, []);

  //  Handle navigation to complaint details
  const handleViewComplaint = (complaint) => {
    navigate("/PendingComplaint", { state: { complaint } });
  };

  return (
    <div>
      <Admin2_nav />

      <div className="admin2_received_complaint">
        <h1>Unresolved Complaints</h1>

        <div className="admin2_unresolvedComplaint">
          <h2>Complaints Pending with Lower Authorities</h2>

          <table className="admin2_unresolved_table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>User</th>
                <th>Location</th>
                <th>Issue Type</th>
                <th>Priority</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8">Loading complaints...</td>
                </tr>
              ) : complaints.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-complaint">
                    All complaints are resolved!
                  </td>
                </tr>
              ) : (
                complaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td>
                      {complaint.complaintId}{" "}
                      {complaint.status === "pending" && (
                        <span className="new-inline">NEW</span>
                      )}
                    </td>
                    <td>{complaint.email}</td>
                    <td>
                      {complaint.state}, {complaint.district}, {complaint.area},{" "}
                      {complaint.pincode}
                    </td>
                    <td>{complaint.problem_type}</td>
                    <td>{complaint.priority}</td>
                    <td>{new Date(complaint.createdAt).toLocaleString()}</td>
                    <td>
                      {/* <span
                        className={`status-tag ${
                          complaint.status === "pending"
                            ? "pending"
                            : complaint.status === "sent_back"
                            ? "sentback"
                            : "unresolved"
                        }`}
                      >
                        {complaint.status.toUpperCase()}
                      </span> */}
                      {/* <span
                        className={`status-tag ${
                          complaint.status === "pending"
                            ? "pending"
                            : complaint.status === "sent-back"
                            ? "sent-back"
                            : complaint.status === "resent"
                            ? "resent"
                            : "unresolved"
                        }`}
                      >
                        {complaint.status}
                      </span> */}
                      <span
                        className={`status-tag ${
                          complaint.status === "pending"
                            ? "pending"
                            : complaint.status === "sent-back"
                            ? "sent-back"
                            : complaint.status === "resent"
                            ? "resent"
                            : "unresolved"
                        }`}
                      >
                        {complaint.status
                          ? complaint.status.charAt(0).toUpperCase() +
                            complaint.status.slice(1)
                          : "—"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleViewComplaint(complaint)}
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

        <div className="admin2_unresolvedComplaint">
          <h2>Unresolved / Poor Feedback Complaints</h2>
          <table className="admin2_unresolved_table2">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>User</th>
                <th>Issue Type</th>
                <th>Status</th>
                <th>Feedback</th>

                {/* <th>Date & Time</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {poorFeedbackComplaints.length === 0 ? (
                <tr>
                  <td colSpan="7">No poor feedback complaints found</td>
                </tr>
              ) : (
                poorFeedbackComplaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td>{complaint.complaintId}</td>
                    <td>{complaint.email}</td>
                    <td>{complaint.problem_type}</td>

                    <td>
                      {/* <span className={`status-tag ${complaint.status}`}>
                        {complaint.status.toUpperCase()}
                      </span> */}
                      <span
                        className={`status-tag ${
                          complaint.status === "pending"
                            ? "pending"
                            : complaint.status === "sent_back"
                            ? "sentback"
                            : "unresolved"
                        }`}
                      >
                        {complaint.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      {complaint.feedbackStatus
                        ? complaint.feedbackStatus
                        : "—"}
                    </td>
                    {/* {/* <td>{new Date(complaint.createdAt).toLocaleString()}</td> */}
                    <td>
                      <button
                        className="view-btn"
                        onClick={() =>
                          navigate("/PoorFeedback", {
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
    </div>
  );
};

export default UnresolvedComplaint;
