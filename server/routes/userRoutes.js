const express = require("express");
const router = express.Router();
const validToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Route to fetch student
router.get("/student", validToken, authorizeRoles("student"), (req, res) => {
  res.json({ message: "Welcome student" });
});

// Route to fetch by admin
router.get("/admin", validToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome admin" });
});

// Route to fetch by warden
router.get("/warden", validToken, authorizeRoles("warden"), (req, res) => {
  res.json({ message: "Welcome warden" });
});

module.exports = router;
