
const mongoose = require("mongoose");
const Counter = require("./counter");

const complaintSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },

    country: { type: String, required: true, default: "India" },
    state: { type: String, required: true, default: "Uttar Pradesh" },
    district: { type: String, required: true, default: "Prayagraj" },
    area: { type: String, required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },

    problem_type: {
      type: String,
      required: true,
      enum: [
        "Water Supply Issues",
        "Poor Road Maintenance",
        "Garbage Collection",
        "Electricity Supply Issues",
        "Street Light Problem",
        "Public Transport Issues",
        "Poor Health Care Facilities",
        "Drainage and Sewage Problems",
        "Environmental Health Problems",
        "Emergency Public Issues",
      ],
    },

    priority: {
      type: String,
      required: true,
      enum: ["high", "low"],
    },

    // USER FEEDBACK
    feedbackStatus: {
      type: String,
      enum: ["", "Resolved", "Unresolved", "sent"],
      default: "",
    },
    feedbackMessage: { type: String, default: "" },

    // LOWER ADMIN RESPONSE (NEW)
    responseFeedbackStatus: {
      type: String,
      enum: ["", "sent"],
      default: "",
    },
    responseFeedbackMessage: { type: String, default: "" },
    responseRemark: { type: String, default: "" },

    complaint_desc: { type: String, required: true },
    complaintId: { type: String, unique: true },

    status: {
      type: String,
      enum: [
        "resolved",
        "unresolved",
        "pending",
        "closed",
        "in-progress",
        "sent-back",
        "resent",
      ],
      default: "pending",
    },

    responses: [
      {
        remark: String,
        status: String,
        adminName: String,
        respondedAt: { type: Date, default: Date.now },
        visibleToUser: { type: Boolean, default: false },
      },
    ],

    escalatedAt: { type: Date, default: null },

    assigned_to: { type: String, default: "admin1" },

    // Higher authority notice
    noticeFrom: { type: String, default: "" },
    noticeRemark: { type: String, default: "" },

    adminMessage: { type: String, default: "" }, // Only one copy kept
  },
  { timestamps: true } // THIS automatically adds createdAt, updatedAt
);

// AUTO GENERATE COMPLAINT ID
complaintSchema.pre("save", async function (next) {
  if (this.complaintId) return next();

  try {
    const year = new Date().getFullYear();

    const counter = await Counter.findOneAndUpdate(
      { name: "complaintId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const seqNum = String(counter.seq).padStart(3, "0");
    this.complaintId = `CMP-${year}-${seqNum}`;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Complaint", complaintSchema);
