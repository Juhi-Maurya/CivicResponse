const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ name, email, password,role:"user" });
    await newUser.save();

    res.status(201).json({ message: "User registred Successfully!" });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
});

// Login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Hardcoded admin users
    if (email === "admin1@gmail.com" && password === "admin123") {
      return res.json({ message: "Login successful", role: "admin1", user: { name: "Admin One", email } });
    }
    if (email === "admin2@gmail.com" && password === "admin223") {
      return res.json({ message: "Login successful", role: "admin2", user: { name: "Admin Two", email } });
    }

    // Normal users from DB
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
        // ✅ Send role and user info for valid users
    res.json({ message: "Login successful", role: user.role, user });

  //  try {
  //   const user = await User.findOne({ email });
  //   if (!user || user.password !== password) {
  //     return res.status(400).json({ message: "Invalid credentials" });
  //   }

  //   // Send role to frontend
  //   res.json({ message: "Login successful", role: user.role, user });
  // }
  // // try {
  //     // Hardcoded admin login
  //   // if (email === "admin1@gmail.com" && password === "admin123") {
  //     // return res.json({ message: "Login successful", role: "admin1" });}

  // if (email === "admin2@gmail.com" && password === "admin223") {
  //     return res.json({ message: "Login successful", role: "admin2" });}
      
  //   const user = await User.findOne({ email });
  //   if (!user || user.password !== password) {
  //     return res.status(400).json({ message: "Invalid credentials" });
  //   }

  //   res.json({ message: "Login successful",role:"user", user });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
