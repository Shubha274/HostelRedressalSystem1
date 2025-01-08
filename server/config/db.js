const mysql = require("mysql2/promise"); // Use mysql2 for Promise support
require("dotenv").config(); // Load environment variables from .env

// Create a new connection for each request
const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.HOST || "localhost",
      user: process.env.USER || "root",
      password: process.env.PASSWORD || "1234",
      database: process.env.DATABASE || "bvhostelportal",
      port: process.env.SQLPORT || 3306,
    });
    console.log("Connected to MySQL database");
    return connection; // Return the connection for use
  } catch (error) {
    console.error("Error connecting to MySQL:", error.message);
    throw error; // Throw error for further handling
  }
};

module.exports = connectDB;
