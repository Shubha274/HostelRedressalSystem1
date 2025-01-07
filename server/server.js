const express = require("express");
const app = express();
const dotenv = require("dotenv");

//for accepting post form data
const bodyParser = require("express").json;
const morgan = require("morgan");
const cors = require("cors");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
dotenv.config();
connectDB();
// Use CORS middleware
const corsOptions = {
  origin: "http://localhost:5173", // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // If you need to send cookies or headers
};

app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Routes

app.use("/api", authRoutes);

// Use routes

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
