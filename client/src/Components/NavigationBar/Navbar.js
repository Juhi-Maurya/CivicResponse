import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div id="navbar">
      {/* <div className="nav-left">
        <div id="logo" />
      </div> */}
      <div id="navlink">
        <a href="Welcomepage">Home</a>
        {/* <a href="#">Submit Complaint</a> */}
        {/* <a href="#">Track Complaint</a> */}
        <a href="#">About</a>
        {/* <a href="#">Contact Us</a> */}
        <button type="submit" onClick={() => navigate("/signup")}>
          Sign Up/Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
