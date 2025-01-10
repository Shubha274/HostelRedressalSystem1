// const Users = require("../models/userModel"); // Adjust path to your Users model

// // Fetch user by userId
// const getUserById = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     // Find user by userId
//     const user = await Users.find({ userId }).populate("hostel"); // Populate hostel details if needed

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Respond with user details
//     res.status(200).json({
//       message: "connection successfull",
//       name: user.name,
//       email: user.email,
//       userId: user.userId,
//       role: user.role,
//       hostel: user.hostel,
//       contact: user.contact,
//       course: user.course,
//       year: user.year,
//     });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = { getUserById };
const connectDB = require("../config/db"); // MongoDB connection

const getUserById = async (req, res) => {
  // const { userId } = req.params;
  // try {
  //   const client = await connectDB();
  //   const database = client.db("Bv-Hostel-Portal"); // Replace with your database name
  //   const collection = database.collection("Users"); // Replace with your collection name
  //   const user = await collection.findOne({ username: userId });
  //   if (!user) {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  //   res.status(200).json({
  //     message: "Login successful",
  //     userData: {
  //       name: user.name,
  //     },
  //   });
  // } catch (error) {
  //   console.error("Error fetching user:", error);
  //   res.status(500).json({ message: "Internal server error" });
  // }
};

module.exports = { getUserById };
