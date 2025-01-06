const mongoose = require("mongoose");
const complaintModel = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the person raising the issue
  roomNo: { type: String, required: true }, // Room number
  issue: { type: String, required: true }, // Issue description
  raisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Who raised the issue
  hostel: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel" }, // Associated hostel
  type: { type: String, enum: ["student", "warden"], required: true }, // Who raised the issue
  visibility: { type: String, enum: ["warden", "admin"], required: true }, // Who can view it
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending",
  }, // Status
  createdAt: { type: Date, default: Date.now }, // Creation timestamp
  updatedAt: { type: Date, default: Date.now }, // Last update timestamp
});
const Complaint = mongoose.model("Complaint", complaintModel, "Complaint");
module.exports = Complaint;
