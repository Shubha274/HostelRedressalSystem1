const express = require("express");
const app = express();
//import and configure cors to accept request from frontend
const cors = require("cors");
const corsOptions = {
  //in this vite server run on
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
//for configure route
app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "orange", "banana"] });
});
//to run route
app.listen(8080, () => {
  console.log("server started on port 8080");
});
