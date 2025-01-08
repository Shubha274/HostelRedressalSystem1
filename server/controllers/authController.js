const jwt = require("jsonwebtoken");
const connectDB = require("../config/db"); // Ensure this is your MySQL connection module

const loginUser = async (req, res) => {
  const { userId } = req.body;

  console.log(userId);

  // Validate inputs
  if (!userId) {
    return res.status(400).json({ message: "Please provide userId." });
  }

  try {
    // Connect to the database
    const connection = await connectDB();

    // Query the user by userId
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE username = ?",
      [userId]
    );

    // Check if user exists
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.username, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json({
      message: "Login successful",
      token,
      userData: user, // Return all fields from the database dynamically
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = { loginUser };
