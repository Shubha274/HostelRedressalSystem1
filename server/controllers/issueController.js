const jwt = require("jsonwebtoken");
const connectDB = require("../config/db"); // Ensure this is your MySQL connection module

exports.createIssue = async (req, res) => {
  const { name, roomNo, issueDescription, username, role } = req.body;

  try {
    // Decode token to get the username
    const connection = await connectDB();
    // Validate required fields based on role
    if (!name || !issueDescription) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (role === "student" && !roomNo) {
      return res
        .status(400)
        .json({ message: "Room number is required for students" });
    }

    // Prepare the SQL query
    const query = `
      INSERT INTO issues (uname,room,description,userid,issueGenerated,solved,issueStatus)
      VALUES (?, ?, ?, ?,NOW(),0,'pending')
    `;

    const values =
      role === "warden"
        ? [name, null, issueDescription, username] // Exclude roomNo for wardens
        : [name, roomNo, issueDescription, username]; // Include roomNo for students

    const [result] = await connection.execute(query, values);

    res.status(201).json({
      message: "Issue created successfully",
      issueId: result.cid,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Failed to create issue" });
  }
};
