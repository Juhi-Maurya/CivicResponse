import React, { useEffect, useState } from "react";
import "./ResolutionFeedback.css";
import Admin2_nav from "../Admin2_nav/Admin2_nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ResolutionFeedback = () => {
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchResponseData = async () => {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:1600/api/complaints/notice"
  //       );
  //       // Only include complaints where user has given feedback
  //       // const userFeedbackResponses = res.data.filter(
  //       //   (item) => item.responseFeedbackStatus || item.responseFeedbackMessage
  //       // );
  //       const admin1Responses = res.data.filter(
  //         (item) =>
  //           item.responses &&
  //           item.responses.some((r) => r.adminName === "admin1")
  //       );

  //       setResponses(admin1Responses);
  //     } catch (error) {
  //       console.error("Error fetching lower admin responses:", error);
  //     }
  //   };

  //   fetchResponseData();
  // }, []);

  useEffect(() => {
    const fetchResponseData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1600/api/complaints/notice"
        );

        // Filter only complaints where feedback from lower admin has been sent
        const feedbackSentComplaints = res.data.filter(
          (item) => item.responseFeedbackStatus === "sent"
        );

        setResponses(feedbackSentComplaints);
      } catch (error) {
        console.error("Error fetching lower admin responses:", error);
      }
    };

    fetchResponseData();
  }, []);

  const openComplaintDetails = (item) => {
    navigate("/ResponseComplaintDetails", {
      state: { complaint: item },
    });
  };
  return (
    <div>
      <Admin2_nav />
      <div className="Resolutionfeedback">
        <h1>Response Box</h1>

        {/* <h2>Lower Authorities Response</h2> */}
        <div className="response">
          <h2>Lower Authorities Response</h2>
          {responses.length === 0 ? (
            <p>No responses found</p>
          ) : (
            responses.map((item) => (
              <div className="response" key={item._id}>
                {/* <h2>Lower Authorities Response</h2> */}
                <div className="response1">
                  <p>
                    <b> Response From:</b>
                    lower authorities
                  </p>

                  <p>
                    <b>Complaint Id:</b>
                    {item.complaintId}
                  </p>
                  <p>
                    <b>Response Message:</b>
                    {item.responseFeedbackMessage || "N/A"}
                  </p>
                  <p>
                    <b> Remark:</b>
                    {item.responseRemark || "N/A"}
                  </p>

                  <p>
                    <b>Status:</b> {item.responseFeedbackStatus || "Pending"}
                  </p>
                  <p>
                    <b>Date/Time:</b>{" "}
                    {new Date(item.updatedAt).toLocaleString()}
                  </p>
                  {/* <button >
                    {" "}
                    Complaint Details
                  </button> */}
                  <button onClick={() => openComplaintDetails(item)}>
                    Complaint Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default ResolutionFeedback;
