const Users = require("../models/userModel"); // Ensure correct path
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { userId, password } = req.body;
  console.log(userId);
  console.log(password);
  // Validate inputs
  if (!userId || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both userId and password." });
  }

  if (userId !== password) {
    return res
      .status(400)
      .json({ message: "UserId and password must be the same." });
  }

  try {
    // Check if the user exists in the database
    const user = await Users.findOne({ username: userId }); // Use findOne instead of find to return a single user
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a JWT token with the userId and role as payload
    const token = jwt.sign(
      { userId: user.userId, role: user.role }, // Include role in the token
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Respond with token and user data
    return res.status(200).json({
      message: "Login successful",
      token,
      userData: {
        name: user.name,
        email: user.email,
        userId: user.userId,
        role: user.role,
        hostel: user.hostel,
        contact: user.contact,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = { loginUser };
