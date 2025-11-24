const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      number,
      country,
      state,
      district,
      area,
      pincode,
      address,
      problem_type,
      priority,
      complaint_desc,
    } = req.body;

    const existingComplaint = await Complaint.findOne({ problem_type, email });
    if (existingComplaint) {
      return res.status(400).json({ message: "Complaint already registered" });
    }
    const newComplaint = new Complaint({
      username,
      email,
      number,
      country,
      state,
      district,
      area,
      pincode,
      address,
      problem_type,
      priority,
      complaint_desc,
    });
    const savedComplaint = await newComplaint.save();
    res.status(201).json({
      message: "Complaint registered Successfully!",
      complaint: savedComplaint,
    });
  } catch (err) {
    console.error("Error while registering complaint:", err);
  }
});

//get count for dashboard
// router.get("/counts", async (req, res) => {
//   try {
//     const { email } = req.query;
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }
//     const total = await Complaint.countDocuments({ email });
//     const pending = await Complaint.countDocuments({
//       email,
//       status: "pending",
//     });
//     const closed = await Complaint.countDocuments({ email, status: "closed" });
//     res.json({ total, pending, closed });
//   } catch (error) {
//     // res.status(500).json({ message: "server error", error: err.message });
//     console.error("Error while registering complaint:", err);
//   }
// });
//get count for dashboard
router.get("/counts", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const total = await Complaint.countDocuments({ email });

    // FIXED: Correct pending calculation
    // Pending = all complaints that are NOT closed or resolved
    const pending = await Complaint.countDocuments({
      email,
      status: { $nin: ["closed", "resolved"] }, // <-- ADDED
    });

    // FIXED: Correct closed calculation
    // Closed = closed + resolved
    const closed = await Complaint.countDocuments({
      email,
      status: { $in: ["closed", "resolved"] }, // <-- ADDED
    });

    res.json({ total, pending, closed });
  } catch (error) {
    console.error("Error while counting complaints:", error); // <-- FIXED err → error
  }
});

//closed a complaint status
router.put("/:id/close", async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: "closed" },
      {
        new: true,
      }
    );
    if (!complaint) {
      return res.status(404).json({
        message: "complaint not found",
      });
    }
    res.json({ message: "Complaint closed succesfully", complaint });
  } catch (error) {
    // res.status(500).json({ message: "server error", error: err.message });
    console.error("Error while registering complaint:", err);
  }
});
router.get("/", async (req, res) => {
  try {
    // for particular user
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const complaints = await Complaint.find({ email });
    res.json(complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    // res.status(500).json({ message: "server error", error: err.message });
    console.error("Error while registering complaint:", err);
  }
});
//  NEW: admin - get all complaints
router.get("/all", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error("Error fetching all complaints:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/feedback/:id", async (req, res) => {
  try {
    const { feedbackStatus, feedbackMessage } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { feedbackStatus, feedbackMessage },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({
      message: "Feedback submitted successfully",
      complaint: updatedComplaint,
    });
  } catch (err) {
    console.error("Error updating feedback:", err);
    res.status(500).json({ message: "Server error" });
  }
});
//  ADMIN RESPONSE
router.post("/respond/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();
    const { status, remark, adminName, feedbackStatus } = req.body;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Update status
    if (status) {
      complaint.status = status.trim().toLowerCase();
    }

    // Update feedback
    if (feedbackStatus) {
      complaint.feedbackStatus = feedbackStatus;
    }

    if (remark) complaint.remark = remark;
    if (adminName) complaint.lastUpdatedBy = adminName;

    complaint.updatedAt = new Date();
    // Compute visibility for the response
    const visibleToUser =
      adminName === "admin1" ||
      (adminName === "admin2" && complaint.status === "closed");

    // Save admin response history
    if (!complaint.responses) complaint.responses = [];
    complaint.responses.push({
      adminName,
      status: complaint.status,
      remark,
      respondedAt: new Date(),
      // visibleToUser: true,
      visibleToUser:
        adminName === "admin1" ||
        (adminName === "admin2" && complaint.status === "closed"),
    });

    await complaint.save();

    console.log(`Complaint ${id} updated to status "${complaint.status}"`);

    res.json({
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (err) {
    console.error("Error updating complaint:", err);
    res.status(500).json({ message: "Error updating complaint" });
  }
});

// router.post("/respond/:id", async (req, res) => {
//   try {
//     const id = req.params.id.trim();
//     const { status, remark, adminName, feedback_Status } = req.body;
//     const complaint = await Complaint.findById(id);
//     if (!complaint) {
//       return res.status(404).json({ message: "Complaint not found" });
//     }

//     //  Update fields
//     // if (status) complaint.status = status.trim().toLowerCase();
//     if (feedback_status) {
//       complaint.feedbackStatus = feedback_status;
//     }
//     if (remark) complaint.remark = remark;
//     if (adminName) complaint.lastUpdatedBy = adminName;
//     complaint.updatedAt = new Date();
//     //  Optional: save history (if you support responses array)
//     if (!complaint.responses) complaint.responses = [];
//     complaint.responses.push({
//       adminName,
//       status: complaint.status,
//       remark,
//       respondedAt: new Date(),
//     });
//     await complaint.save(); //
//     console.log(`Complaint ${id} updated to status "${complaint.status}"`); //
//     res.json({
//       message: "Complaint updated successfully",
//       complaint,
//     });
//   } catch (err) {
//     console.error("Error updating complaint:", err);
//     res.status(500).json({ message: "Error updating complaint" });
//   }
// });

// router.get("/notice", async (req, res) => {
//   try {
//     const complaints = await Complaint.find({
//       $or: [{ status: "sent-back" }, { status: "resent" }],
//     }).sort({ createdAt: -1 });

//     res.json(complaints);
//   } catch (err) {
//     console.error("Error fetching notice complaints:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.get("/notice", async (req, res) => {
  try {
    const complaints = await Complaint.find({
      $or: [
        { status: "sent-back" }, // complaints returned to higher authority
        { status: "resent" }, // complaints resent to lower admin
        { responseFeedbackStatus: { $exists: true } }, // include Admin1 feedback
        { status: "closed" }, // include closed complaints
      ],
    }).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    console.error("Error fetching notice complaints:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// //  Get full complaint details by ID (used by Admin2 to see previous actions)
// router.get("/:id", async (req, res) => {
//   try {
//     const complaint = await Complaint.findById(req.params.id);

//     if (!complaint) {
//       return res.status(404).json({ message: "Complaint not found" });
//     }

//     // Send full complaint details (includes `responses`, feedback, etc.)
//     res.json(complaint);
//   } catch (err) {
//     console.error("Error fetching complaint details:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// router.get("/:id", async (req, res) => {
//   try {
//     const complaint = await Complaint.findById(req.params.id);

//     if (!complaint) {
//       return res.status(404).json({ message: "Complaint not found" });
//     }

//     // Make all existing responses visible to user if not already set
//     let updated = false;
//     complaint.responses?.forEach((resp) => {
//       if (resp.visibleToUser !== true) {
//         resp.visibleToUser = true;
//         updated = true;
//       }
//     });

//     // Save changes if any
//     if (updated) await complaint.save();

//     res.json(complaint);
//   } catch (err) {
//     console.error("Error fetching complaint details:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
router.get("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Only show responses that should be visible to user
    const visibleResponses = complaint.responses?.filter(
      (resp) => resp.visibleToUser === true
    );

    // Return complaint with filtered responses
    res.json({
      ...complaint.toObject(),
      responses: visibleResponses,
    });
  } catch (err) {
    console.error("Error fetching complaint details:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//forword or assign complaint to  another  authority
router.put("/assign/:id", async (req, res) => {
  try {
    const { assigned_to, adminName, remark } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not  found" });
    }

    complaint.assigned_to = assigned_to;
    complaint.adminMessage = remark || `Forwarded to ${assigned_to}`;

    await complaint.save();
    res.json({
      message: `Complaint successfully forwarded to ${assigned_to}`,
      complaint,
    });
  } catch (err) {
    console.error("Error assigning complaint:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//  Higher authority sends a notice to a lower admin (with action history)
router.post("/notice/:id", async (req, res) => {
  const { noticeFrom, noticeRemark } = req.body;

  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    complaint.responses.push({
      adminName: noticeFrom || "Higher Authority",
      status: "sent-back",
      remark: noticeRemark || "No remark provided",
      respondedAt: new Date(),
      visibleToUser: false, // hide from user
    });
    complaint.status = "sent-back";

    await complaint.save();

    // //  Update notice fields
    // complaint.noticeFrom = noticeFrom || "Higher Authority";
    // complaint.noticeRemark = noticeRemark || "No remark provided";
    // complaint.status = "sent-back"; // mark as sent back for review

    // await complaint.save();

    res.json({
      message: "Notice sent successfully and logged in action history",
      complaint,
    });
  } catch (err) {
    console.error("Error sending notice:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Send feedback FROM lower admin back to higher authority
// router.post("/feedback/send", async (req, res) => {
//   try {
//     const { complaintId, feedback, remark } = req.body;

//     if (!complaintId || !feedback || !remark) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const complaint = await Complaint.findById(complaintId);
//     if (!complaint) {
//       return res.status(404).json({ message: "Complaint not found" });
//     }

//     // Save feedback inside complaint schema
//     complaint.feedbackStatus = "sent";
//     complaint.feedbackMessage = feedback;
//     complaint.noticeRemark = remark; // update last remark
//     complaint.status = "resent"; // returned to higher authority

//     await complaint.save();

//     res.json({
//       message: "Feedback sent successfully",
//       complaint,
//     });
//   } catch (error) {
//     console.error("Error sending feedback:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// router.post("/response-feedback/send", async (req, res) => {
//   try {
//     const { complaintId, responseFeedbackMessage, responseRemark } = req.body;

//     if (!complaintId || !responseFeedbackMessage || !responseRemark) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const complaint = await Complaint.findById(complaintId);
//     if (!complaint) {
//       return res.status(404).json({ message: "Complaint not found" });
//     }

//     // Save lower admin feedback (DO NOT modify complaint.status)
//     complaint.responseFeedbackStatus = "sent";
//     complaint.responseFeedbackMessage = responseFeedbackMessage;
//     complaint.responseRemark = responseRemark;
//     // Only update status if not closed
// if (complaint.status !== "closed") {
//   complaint.status = "resent"; // for complaints still open
// }

//     // complaint.status = "resent";

//     await complaint.save();

//     res.json({
//       message: "Response feedback sent successfully",
//       complaint,
//     });
//   } catch (error) {
//     console.error("Error sending response feedback:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// router.post("/response-feedback/send", async (req, res) => {
//   try {
//     const { complaintId, responseFeedbackMessage, responseRemark, adminName } =
//       req.body;

//     if (!complaintId || !responseFeedbackMessage || !responseRemark) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const complaint = await Complaint.findById(complaintId);
//     if (!complaint)
//       return res.status(404).json({ message: "Complaint not found" });

//     // Initialize an array for Admin1 responses
//     if (!complaint.admin1Responses) complaint.admin1Responses = [];

//     // Save Admin1 response here, separate from higher authority notice
//     complaint.admin1Responses.push({
//       adminName: adminName || "Admin1",
//       responseMessage: responseFeedbackMessage,
//       remark: responseRemark,
//       respondedAt: new Date(),
//       status: complaint.status, // keep current status
//     });

//     // Only update status if it's not closed
//     // if (complaint.status !== "closed") {
//     //   complaint.status = "resent"; // only for open complaints
//     // }

//     await complaint.save();

//     res.json({
//       message: "Response feedback sent successfully",
//       complaint,
//     });
//   } catch (error) {
//     console.error("Error sending response feedback:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
router.post("/response-feedback/send", async (req, res) => {
  try {
    const { complaintId, responseFeedbackMessage, responseRemark, adminName } =
      req.body;

    if (!complaintId || !responseFeedbackMessage || !responseRemark) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    // Initialize an array for Admin1 responses if not exists
    if (!complaint.admin1Responses) complaint.admin1Responses = [];

    // Save Admin1 feedback without changing main status
    complaint.admin1Responses.push({
      adminName: adminName || "Admin1",
      responseMessage: responseFeedbackMessage,
      remark: responseRemark,
      respondedAt: new Date(),
      statusAtTime: complaint.status, // store current handling status
    });

    await complaint.save();

    res.json({
      message: "Response feedback sent successfully",
      complaint,
    });
  } catch (error) {
    console.error("Error sending response feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
