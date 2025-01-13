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
      INSERT INTO issues (iname,room,description,userid,issueGenerated,solved,issueStatus)
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
exports.getLatestIssue = async (req, res) => {
  const { username } = req.params;

  try {
    const connection = await connectDB();
    const query = `
    SELECT 
    iname, 
    DATE_FORMAT(issueGenerated, '%Y-%m-%dT%H:%i:%sZ') AS issueGenerated,
    DATE_FORMAT(issueSolved, '%Y-%m-%dT%H:%i:%sZ') AS issueSolved,
    issueStatus
FROM issues
WHERE userid = ?
ORDER BY issueGenerated DESC
LIMIT 1`;

    const [rows] = await connection.query(query, [username]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No issues found." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching the latest issue:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getIssues = async (req, res) => {
  const connection = await connectDB();
  const { role, userId } = req.params; // Corrected: Use `req.params` to get `role` and `userId`
  let query = "";
  let rows = []; // Initialize rows here to ensure it's always defined.

  // Validate inputs
  if (!role || !userId) {
    return res.status(400).json({ message: "Invalid role or userId" });
  }

  try {
    // Connect to the database
    const connection = await connectDB();

    // Query depending on the role
    if (role === "student") {
      query = `
        SELECT 
          iname, 
          description, 
          issueGenerated, 
          issueSolved, 
          issueStatus
        FROM issues
        WHERE userid = ?`;
    }
    // } else if (role === "warden") {
    //   // Query for wardens
    //   query = `
    //     SELECT
    //       u.name AS studentName,
    //       u.course,
    //       i.room,
    //       i.iname,
    //       i.description,
    //       i.issueGenerated,
    //       i.issueSolved,
    //       i.issueStatus
    //     FROM issues i
    //     JOIN users u ON i.userid = u.username
    //     WHERE u.hostel = (
    //       SELECT hostel
    //       FROM users
    //       WHERE username = ?
    //     )`;
    // } else if (role === "admin") {
    //   // Query for admins
    //   query = `
    //     SELECT
    //       w.name AS wardenName,
    //       h.hostelname AS wardenHostel,
    //       i.iname AS issueName,
    //       i.description AS issueDescription,
    //       i.issueGenerated,
    //       i.issueSolved,
    //       i.issueStatus
    //     FROM issues i
    //     JOIN users w ON i.userid = w.username
    //     JOIN hostel h ON w.hostel = h.hid
    //     WHERE w.hostel = (
    //       SELECT hostel
    //       FROM users
    //       WHERE username = ?  -- User's username (or userId)
    //     )
    //     ORDER BY i.issueGenerated DESC`; // Optional: Order by issue generation time (latest first)
    // }

    // Execute the query and get the result
    const [resultRows] = await connection.execute(query, [userId]);

    // Assign result to rows
    rows = resultRows;

    // Check if rows exist
    if (rows.length === 0) {
      return res.status(404).json({ message: "No issues found." });
    }

    // Return the rows with issues
    res.json(rows);
  } catch (err) {
    console.error("Error fetching issues:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to update issue status
const updateIssueStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const query = `UPDATE issues SET status = ? WHERE id = ?`;
    await db.query(query, [status, id]);
    res.json({ message: "Issue status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getIssues = async (req, res) => {
  const { role } = req.user;

  try {
    let query = "";
    if (role === "student") {
      query = `SELECT issueName, issueGenerated,issueSolved, issueStatus FROM issues WHERE username = ?`;
      const issues = await db.query(query, [req.user.id]);
      return res.json(issues);
    }

    if (role === "warden") {
      query = `
        SELECT s.name AS studentName, s.course, s.roomNumber, i.issueName, i.generateDate, i.resolvedDate, i.status, i.id
        FROM issues i
        JOIN students s ON i.studentId = s.id
        WHERE s.hostelId = ?`;
      const issues = await db.query(query, [req.user.hostelId]);
      return res.json(issues);
    }

    if (role === "admin") {
      query = `
        SELECT w.name AS wardenName, h.name AS hostelName, i.issueDescription, i.generateDate, i.resolvedDate, i.status, i.id
        FROM issues i
        JOIN wardens w ON i.wardenId = w.id
        JOIN hostels h ON w.hostelId = h.id`;
      const issues = await db.query(query);
      return res.json(issues);
    }

    res.status(403).json({ message: "Unauthorized role" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
