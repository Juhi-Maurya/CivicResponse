// import User from "../models/User";

// router.get("/", async (req, res) => {

//  // const email = req.query.email;
//  // if (!email) return res.status(400).json({ message: "Email is required" });

//  const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ message: "Email and password are required" });

//   try {
//     // Hardcoded admin
//     if (email === "admin1@gmail.com" && password === "admin123") {
//       return res.json({ message: "Login successful", role: "admin" });
//     }

//   // try {

//     const user = await User.findOne({ email });
//     if (!user||user.password!==password)
//       return res.status(404).json({ message: "user not found" });
//     res.json(
//       //user
// { message: "Login successful", role: "user" }
//     );
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
