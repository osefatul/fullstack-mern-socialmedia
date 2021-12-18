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
const path = require("path");

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

//middlewares
app.use("/images", express.static(path.join(__dirname, "public/images"))); //whenever someone request to http://localhost:8000/images.. then you should direct them to the api/public/images directory.
app.use(express.json()); // To recognize the incoming Request Object as a JSON Object.
app.use(helmet());
app.use(morgan("common")); // simplifies the process of logger

//################# Uploading file using Multer ###########################

//destination for uploaded file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    //cb(null, file.originalname); use this when there is no file name has been made while sending file data in to form as we did in the share component
    cb(null, req.body.name);
  },
});

//uploading a single file as post request.
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

//#################################################################

//Routes
app.use("/api/users", userRoute);
app.use("/api/auths", authRoute);
app.use("/api/posts", postRoute);

// commencing server
app.listen(8000, () => {
  console.log("backend server is running");
});
