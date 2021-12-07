const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//This code snippet, however, would enable CORS for all resources on your server.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//middleware
app.use(express.json()); // To recognize the incoming Request Object as a JSON Object.
app.use(helmet());
app.use(morgan("common")); // simplifies the process of logger

//Routes
app.use("/api/users", userRoute);
app.use("/api/auths", authRoute);
app.use("/api/posts", postRoute);

// commencing server
app.listen(8000, () => {
  console.log("backend server is running");
});
