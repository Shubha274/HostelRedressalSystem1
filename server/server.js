const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
dotenv.config();
connectDB();
//import and configure cors to accept request from frontend
const cors = require("cors");
const corsOptions = {
  //in this vite server run on
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
//for configure route
app.get("/", (req, res) => {
  res.send({ fruits: ["apple", "orange", "banana"] });
});
//to run route
const PORT = process.env.PORT || 8080;
app.listen(8080, console.log(`server started on port ${PORT}`));
