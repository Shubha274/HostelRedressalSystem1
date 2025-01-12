const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
//for accepting post form data
const bodyParser = require("express").json;
const morgan = require("morgan");
const cors = require("cors");
const issueRoutes = require("./routes/issueRoutes");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
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
app.use(cookieParser());
// Middleware to parse JSON
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/issues", issueRoutes);
// Use routes

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
