import React, { useState, useEffect } from "react";
import Navbar from "../NavigationBar/Navbar";
import ChatBot from "../ChatBot/ChatBot";
import AboutDynamic from "../AboutDynamic/AboutDynamic";
import { useNavigate } from "react-router-dom";
import "./Welcomepage.css";

function Welcomepage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div id="Wel_page">
        <div id="wel_info">
          {" "}
          <p className="scroll-text scroll1">
            Welcome to Civic Response Platform! &nbsp; &nbsp; This platform
            helps citizens report civic issues like broken roads, water supply,
            waste management, broken streets, and their resolution by local
            authorities. &nbsp; &nbsp;
          </p>
        </div>
        <div id="herosection">
          <div id="title">
            <h1>Civic Response</h1>
            <p>“Making Every Voice Count — From Concern to Change.”</p>
          </div>
        </div>
        <div className="animated-icons">
          <img src="/Image/publicsector.webp" alt="City" />

          <img src="/Image/water.jpg" alt="City" />
          <img src="/Image/electricity.jpg" alt="City" />
        </div>
        <div id="how">
          <h2>How It Works</h2>
          <div id="how-steps">
            <div id="step1">
              <h3>Step 1</h3>
              <p>Signup / Login to your account</p>
            </div>
            <div id="step2">
              <h3>Step 2</h3>
              <p>Register your complaint with details</p>
            </div>
            <div id="step3">
              <h3>Step 3</h3>
              <p>Get response by local authorities </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcomepage;
