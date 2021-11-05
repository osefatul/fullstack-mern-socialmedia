const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//REGIRSTER
router.post("/register", async (req, res) => {
  try {
    // create new password
    const salt = await bcrypt.genSalt(10); //first salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Generate new password
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //Save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
