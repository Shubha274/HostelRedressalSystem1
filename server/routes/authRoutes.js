const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController"); // Only loginUser is needed now

// POST route for login
router.post("/login", loginUser);

module.exports = router;
