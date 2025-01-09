const mongoose = require("mongoose");

// User Schema
const userModel = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Full name
    email: { type: String, unique: true, required: true }, // Email address
    username: { type: String, unique: true, required: true }, // University ID (used as password)
    role: {
      type: String,
      enum: ["student", "warden", "admin"],
      required: true,
      default: "student",
    }, // Role
    hostel: {
      type: String,
      ref: "Hostel", // Refers to `name` field in the Hostel model
    }, // Associated hostel name
    contact: {
      type: String,
      // default: "",
      // validate: {
      //   validator: (v) => /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(v),
      //   message: (props) => `${props.value} is not a valid phone number!`,
      // },
    }, // Contact info (optional)
    course: { type: String, default: "" }, // Course name (students only)
    year: {
      type: Number,
      min: [1, "Year must be at least 1"],
      max: [5, "Year must be at most 5"],
    }, // Year of study (students only)
  },
  { collection: "Users" }
);

// Pre-save validation for role-specific fields
userModel.pre("save", function (next) {
  if (this.role === "student" && (!this.course || !this.year)) {
    return next(new Error("Course and year are required for students."));
  }
  if (this.role !== "student" && (this.course || this.year)) {
    return next(
      new Error("Course and year should only be defined for students.")
    );
  }
  next();
});

const Users = mongoose.model("Users", userModel);

module.exports = Users;
