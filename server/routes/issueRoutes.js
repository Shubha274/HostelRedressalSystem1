const express = require("express");
const { createIssue } = require("../controllers/issueController");

const router = express.Router();

// Route to create a new issue
router.post("/create", createIssue);

// Route to get all issues
// router.get("/", getIssues);

// // Route to update issue status
// router.put("/update-status", updateIssueStatus);

module.exports = router;
