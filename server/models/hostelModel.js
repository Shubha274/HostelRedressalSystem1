const hostelModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }, // Hostel name
  wardens: [
    {
      type: String,
      ref: "Users", // Refers to the userId field in the Users model
    },
  ], // Warden userIds
  students: [
    {
      type: String,
      ref: "Users", // Refers to the userId field in the Users model
    },
  ], // Student userIds
});

const Hostel = mongoose.model("Hostel", hostelModel);

module.exports = Hostel;
