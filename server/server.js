const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
dotenv.config();
connectDB();
//import and configure cors to accept request from frontend
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend's origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Set to true if your requests include credentials like cookies
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));

//in user routes abstract user

// Routes
app.use(express.json());
app.use("/api", authRoutes);

//to run route
const port = process.env.PORT || 8080;
// API endpoint to send the backend URL to the frontend
app.get("/api/config", (req, res) => {
  res.json("http://localhost:8080/api/login");
});
app.use(morgan("dev"));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
