const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: { type: String, required: true, max: 50, unique: true },
  password: { type: String, required: true, min: 6 },
  profilePicture: { type: String, default: "" },
  coverPicture: { type: String, default: "" },
  followers: { type: Array, default: [] }, // we are going to keep user ids inside this array
  followings: { type: Array, default: [] },
  isAdmin: { type: Boolean, default: false },
});
