import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import Navbar from "../NavigationBar/Navbar";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1600/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // parse JSON first

      if (res.ok) {
        // Store role and full user data for dashboard
        localStorage.setItem("userRole", "user");
        localStorage.setItem(
          "userData",
          JSON.stringify({
            name: formData.name,
            email: formData.email,
            role: "user",
          })
        );

        // Reset form
        setFormData({ name: "", email: "", password: "" });

        alert(data.message);

        // Redirect to user dashboard
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error during signup:", err);

      alert("Signup failed!");
    }
  };

  return (
    <>
      <Navbar />

      <div id="signup">
        <form onSubmit={handleSubmit}>
          <h2>Create an Account</h2>

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handlechange}
            required
          />

          <label>Email Id</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handlechange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handlechange}
            required
          />

          <button type="submit">Sign Up</button>
          <p>
            Already have an account? <a href="/LoginPage">Login here</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUpPage;
