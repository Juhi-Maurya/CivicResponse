import React from "react";
import "./LoginPage.css";
import Navbar from "../NavigationBar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await axios.post("http://localhost:1600/api/auth/login", {
        email,
        password,
      });
      const { role, user } = res.data;

      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", user.email);
      switch (role) {
        case "admin1":
          navigate("/AdminDashboard");
          break;
        case "admin2":
          navigate("/Admin2Dashboard");
          break;
        case "user":
          navigate("/Dashboard");
          break;
        default:
          alert("Unknown role. Please contact support.");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Login failed. Please check your credentials.");
    }
  };
  return (
    <>
      <Navbar />
      <div id="login_container">
        <form onSubmit={handleLogin}>
          <h2>Login to Your Account</h2>

          <label>Email ID</label>
          <input type="email" name="email" required />

          <label id="password">Password</label>
          <input type="password" name="password" required />

          <button type="submit">Login</button>

          <p>
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
