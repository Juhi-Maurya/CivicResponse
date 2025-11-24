const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const complaintRoutes = require("./routes/complaint");
const Complaint = require("./models/Complaint");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Users", {})
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.error("Connection error", err));

// AUTO-ESCALATE overdue complaints (every 30 seconds for demo)
setInterval(async () => {
  console.log(" Checking for overdue complaints (every 24hour)...");

  const now = Date.now();
  const timeLimit = 24 * 60 * 60 * 1000;

  try {
    const overdueComplaints = await Complaint.find({
      status: "pending",
      assigned_to: "admin1",
      createdAt: { $lt: new Date(now - timeLimit) },
    });

    for (const complaint of overdueComplaints) {
      complaint.status = "escalated"; // or “escalated”
      complaint.assigned_to = "admin2";
      // complaint.updatedAt = new Date();
      complaint.adminMessage =
        "Auto-escalated: lower authority did not respond within time limit.";
      complaint.updatedAt = new Date();
      await complaint.save();

      console.log(`Escalated complaint: ${complaint._id}`);
    }
  } catch (err) {
    console.error("Error escalating complaints:", err);
  }
}, 24 * 60 * 60 * 1000); // every 24hour

app.listen(1600, () => {
  console.log("Server Activated on port 1600");
});
