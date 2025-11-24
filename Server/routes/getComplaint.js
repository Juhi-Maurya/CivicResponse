// import Complaint from "../models/Complaint";

// router.get("/", async (req, res) => {
//   const problem_type = req.query.problem_type;
//   if (!problem_type)
//     return res.status(400).json({ message: "Type Of Problem is required" });
//   try {
//     const complaint = await Complaint.findOne({ problem_type });
//     if (!complaint)
//       return res.status(404).json({ message: "Complaint not found" });
//     res.json(complaint);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
