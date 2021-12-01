const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//UPDATE USER
router.put("/:id", async function (req, res) {
  //should be the same user who is logged in
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body, //update all the requested body
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account !");
  }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // body userId and params.id are equla means they are same user
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Your Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can only delete you Account!");
  }
});

//GET A USER: whenever we use a get - it is always recommended to use params instead of body
router.get("/:id", async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc; //just ignore password and updatedAt fields
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//FOLLOW A USER
router.put("/:id/follow", async (req, res) => {
  // if the user who is logged in not the same user.
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id); //the user we want to follow
      const currentUser = await User.findById(req.body.userId); //current user who is logged in and trying to make a request
      if (!user.followers.includes(req.body.userId)) {
        //if in the followers list of the user we want to follow is not included the logged in user, then :
        await user.updateOne({ $push: { followers: req.body.userId } }); //push the id of the logged in user in to the user that has been just followed.
        await currentUser.updateOne({ $push: { followings: req.params.id } }); // also update the current user following list
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("you already followed this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself !");
  }
});

//UNFLOLLOW A USER -- this is just the opposit of the follow request.
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.send(401).json("You already unfollowed this user");
      }
    } catch (err) {
      res.status(403).json("You can't unfollow yourself !");
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
});

module.exports = router;
