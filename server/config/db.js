// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// // Load environment variables from .env file
// dotenv.config();

// const connectDB = async () => {
//   try {
//     // Connect to MongoDB using the URI from the .env file
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message);
//     process.exit(1); // Exit the process with failure
//   }
// };

// module.exports = connectDB;
const { MongoClient } = require("mongodb");
require("dotenv").config(); // Load environment variables from .env

// MongoDB connection string from .env
const uri = process.env.MONGO_URI;

// Create a MongoClient instance
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to connect to the database
const connectDB = async () => {
  try {
    // Ensure the client is connected
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
      console.log("Connected to MongoDB Atlas");
    }
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectDB;
