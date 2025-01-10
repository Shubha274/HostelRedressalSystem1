const express = require("express");
const router = express.Router();
const { loginUser, logout } = require("../controllers/authController"); // Only loginUser is needed now

// POST route for login
router.post("/login", loginUser);
router.post("/logout", logout);
module.exports = router;
