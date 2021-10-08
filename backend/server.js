require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const DBConnect = require("./database");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
app.use("/storage", express.static("storage"));
const PORT = process.env.PORT || 5500;
DBConnect();
app.use(
  express.json({
    limit: "8mb",
  })
);
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
app.use(router);
app.get("/", (req, res) => {
  res.send("hello from express");
});
