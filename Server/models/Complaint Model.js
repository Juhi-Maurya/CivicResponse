const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "Closed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Complaint", complaintSchema);
