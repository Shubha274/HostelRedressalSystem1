// controllers/authController.js
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Validate input
    if (!userId || !password) {
      return res
        .status(400)
        .json({ error: "Please enter both userId and password." });
    }

    // Find user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the provided password matches the stored password
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, userId: user.userId, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { login };
