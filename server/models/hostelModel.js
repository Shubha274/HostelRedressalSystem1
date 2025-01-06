const hostelModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  wardens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Validation: Ensure that there is at least one warden
hostelModel.path("wardens").validate(function (value) {
  return value && value.length > 0; // At least one warden is required
}, "A hostel must have at least one warden.");

const Hostel = mongoose.model("Hostel", hostelModel,"Hostel");
module.exports = Hostel;
