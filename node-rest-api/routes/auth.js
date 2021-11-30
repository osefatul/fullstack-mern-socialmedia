const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//REGIRSTER
router.post("/register", async (req, res) => {
  try {
    // create new password
    const salt = await bcrypt.genSalt(10); //first salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //Save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found"); //if username is not valid

    const valiPassword = await bcrypt.compare(req.body.password, user.password);
    !valiPassword && res.status(404).json("Wrong password"); //if password is not valid

    //if both are valid
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
