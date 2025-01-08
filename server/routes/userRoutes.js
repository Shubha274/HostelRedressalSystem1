const express = require("express");
const router = express.Router();
const { getUserById } = require("../controllers/userInfoControllers"); // Adjust path to your controller

// Route to fetch user details by userId
router.get("/user/:userId", getUserById);

module.exports = router;
