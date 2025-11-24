import React, { useState } from "react";
import { useEffect } from "react";

import "./ComplaintForm.css";
import Navbar2 from "../Navbar2/Navbar2";
import { useNavigate } from "react-router-dom";
import ChatBot from "../ChatBot/ChatBot";

function ComplaintForm() {
  const [formData, setFormData] = useState({
    username: "",
    // email: "",
    number: "",
    country: "",
    state: "",
    district: "",
    area: "",
    pincode: "",
    address: "",
    problem_type: "",
    priority: "",
    complaint_desc: "",
    // image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")); // get full user object
    if (userData?.email) {
      setFormData((prev) => ({ ...prev, email: userData.email }));
    }
  }, []);

  // for radio by deafult

  const priorityMapping = {
    "Emergency Public Issues": "high",
    "Poor Health Care Facilities": "low",
    "Electricity Supply Issues": "high",
    "Water Supply Issues": "high",
    "Poor Road Maintenance": "low",
    "Drainage and Sewage Problems": "high",
    "Garbage Collection": "high",
    "Street Light Problem": "low",
    "Public Transport Issues": "low",
    "Environmental Health Problems": "low",
  };

  const handlechange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };
      if (name === "problem_type") {
        updatedForm.priority = priorityMapping[value] || "";
      }

      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const res = await fetch("http://localhost:1600/api/complaints/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // send as JSON
      });

      const data = await res.json();

      if (res.ok) {
        // alert("Complaint registered successfully!");
        setFormData({
          username: "",
          email: "",
          number: "",
          country: "",
          state: "",
          district: "",
          area: "",
          pincode: "",
          address: "",
          problem_type: "",
          priority: "",
          complaint_desc: "",
          image: null,
        });
      }
     
      console.log("API Response:", data);

      alert(data.message);
   
    } catch (error) {
      console.error("Error:", error);
      alert("compliant failed");
    }
  };
  return (
    <>
      <ChatBot />
      {/* <Navbar2 /> */}
      <div className="complaint">
        <Navbar2 />
        <div className="complaint-form">
          <form onSubmit={handleSubmit}>
            {" "}
            <h1>Complaint Form</h1>
            {/* section1 */}
            <h2>Applicant Details:</h2>
            <div className="com-section1">
              <div className="form-s1">
                <p>Name:</p>
                <input
                  type="text"
                  name="username"
                  required
                  onChange={handlechange}
                  value={formData.username}
                />
              </div>

              <div className="form-s1">
                <p>Email Id:</p>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  readOnly
                />
              </div>

              <div className="form-s1">
                <p>Phone Number:</p>
                <input
                  type="tel"
                  name="number"
                  required
                  onChange={handlechange}
                  value={formData.number}
                />
              </div>
            </div>
            {/* section2 */}
            <h2>Address Details:</h2>
            <div className="com-section2">
              {/* Country */}
              <div className="com-add">
                <div className="form-address">
                  <p>Country:</p>
                  <select
                    name="country"
                    required
                    onChange={handlechange}
                    value={formData.country}
                  >
                    <option value="">-- Select Country --</option>
                    <option value="india">India</option>
                  </select>
                </div>

                {/* State */}
                <div className="form-address">
                  <p>State:</p>
                  <select
                    name="state"
                    required
                    onChange={handlechange}
                    value={formData.state}
                  >
                    <option value="">-- Select State --</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                {/* District */}
                <div className="form-address">
                  <p>District:</p>
                  <select
                    name="district"
                    required
                    onChange={handlechange}
                    value={formData.district}
                  >
                    <option value="">-- Select District --</option>
                    <option value="Prayagraj">Prayagraj</option>
                  </select>
                </div>
              </div>
              <div className="com-add1">
                <div className="area">
                  <p>Area:</p>
                  <input
                    type="text"
                    name="area"
                    required
                    onChange={handlechange}
                    value={formData.area}
                  ></input>
                </div>
                <div className="com-pincode">
                  <p>Area Pincode:</p>
                  <input
                    type="text"
                    name="pincode"
                    required
                    onChange={handlechange}
                    value={formData.pincode}
                  ></input>
                </div>
              </div>
              <div className="add-discription">
                <p> Address Description :</p>
                <textarea
                  name="address"
                  rows="3"
                  required
                  onChange={handlechange}
                  value={formData.address}
                  // cols="5"
                >
                  {" "}
                </textarea>
              </div>
            </div>
            {/* section3 */}
            <h2>Complaint Details</h2>
            <div className="com-section3">
              <div>
                <p>Problem type:</p>
                <select
                  name="problem_type"
                  required
                  onChange={handlechange}
                  value={formData.problem_type}
                >
                  <option value="">--Select an issue type</option>
                  <option value="Water Supply Issues">
                    Water Supply Issues
                  </option>
                  <option value="Poor Road Maintenance">
                    Poor Road Maintenance
                  </option>
                  <option value="Garbage Collection">Garbage Collection</option>
                  <option value="Electricity Supply Issues">
                    Electricity Supply Issues
                  </option>
                  <option value="Street Light Problem">
                    Street Light Problem
                  </option>
                  <option value="Public Transport Issues">
                    Public Transport Issues
                  </option>
                  <option value="Poor Health Care Facilities">
                    Poor Health Care Facilities
                  </option>
                  <option value="Drainage and Sewage Problems">
                    Drainage and Sewage Problems
                  </option>
                  <option value="Environmental Health Problems">
                    Environmental Health Problems
                  </option>
                  <option value="Emergency Public Issues">
                    Emergency Public Issues
                  </option>
                </select>
              </div>
              {/* priority */}

              <div className="priority-group">
                {/* <p>Priority:</p> */}
                <label>
                  <input
                    type="radio"
                    name="priority"
                    required
                    onChange={handlechange}
                    value="high"
                    checked={formData.priority === "high"}
                    disabled
                    // readOnly
                  />
                  Higher Priority
                </label>
                {/* <label>
                  <input
                    type="radio"
                    name="priority"
                    onChange={handlechange}
                    value="medium"
                    checked={formData.priority === "medium"}
                  />
                  Medium Priority
                </label> */}
                <label>
                  <input
                    type="radio"
                    name="priority"
                    onChange={handlechange}
                    value="low"
                    checked={formData.priority === "low"}
                    disabled
                    // readOnly
                  />
                  Lower Priority
                </label>
              </div>
              <div className="com-discription">
                <p> Complaint Description :</p>
                <textarea
                  name="complaint_desc"
                  onChange={handlechange}
                  value={formData.complaint_desc}
                  rows="3"
                  // cols="5"

                  // placeholder="Enter detailed complaint description here..."
                >
                  {" "}
                </textarea>
              </div>
            </div>
            <div className="com-section4">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ComplaintForm;
