const mongoose = require("mongoose");

// Helper function to get only the date part
const getDate = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

const complaintModel = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the person raising the issue
    roomNo: { type: String, required: true }, // Room number
    issue: { type: String, required: true }, // Issue description
    userId: { type: String, required: true }, // User ID from User schema
    hostel: { type: String, required: true }, // Hostel name
    type: { type: String, enum: ["student", "warden"], required: true }, // Who raised the issue
    visibility: { type: String, enum: ["warden", "admin"], required: true }, // Who can view it
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    }, // Status
    isDeleted: { type: Boolean, default: false }, // Soft delete flag
    createdAt: { type: Date, default: getDate }, // Creation date (no time)
    updatedAt: { type: Date, default: getDate }, // Last update date (no time)
  },
  { collection: "Complaint" }
);

// Middleware to update `updatedAt` with only the date
complaintModel.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = getDate();
  next();
});

const Complaint = mongoose.model("Complaint", complaintModel);
module.exports = Complaint;
