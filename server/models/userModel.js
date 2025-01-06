const mongoose = require("mongoose");
// User Schema
const userModel = new mongoose.Schema({
  name: { type: String, required: true }, // Full name
  email: { type: String, unique: true, required: true }, // Email address
  password: { type: String, unique: true, required: true }, // University ID as password
  role: { type: String, enum: ["student", "warden", "admin"], required: true }, // Role
  hostel: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel" }, // Associated hostel
  contact: { type: String }, // Contact info
  course: { type: String }, // Course name (students only)
  year: { type: Number }, // Year of study (students only)
  createdAt: { type: Date, default: Date.now }, // User creation timestamp
});
const User = mongoose.model("User", userModel);
module.exports = User;
