const mongoose = require("mongoose");
const hostelModel = new mongoose.Schema({
  name: { type: String, required: true }, // Hostel name
  wardens: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of wardens
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of students
  createdAt: { type: Date, default: Date.now }, // Creation timestamp
});
const Hostel = mongoose.model("Hostel", hostelModel);
module.exports = Hostel;
