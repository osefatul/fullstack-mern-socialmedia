const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//craete a post
router.post("/", async (req, res) => {
  const newPost = await new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post
router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  try {
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated successfully");
    } else {
      res.status(403).json("You can not update this post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/:id", async function (req, res) {
  const post = await Post.findById(req.params.id);

  try {
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(404).json("the post cannot be deleted");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like/dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Timeline post
router.get("/timeline/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id }); //find all posts of this currentuser

    //we are using prmise.all because we are using a loop otherwise it is not gonna fetch all of this. if we use "await map" this is not gonna work or fetch anyting.
    //so, to avoid this issue with mapping, we will use promis.all
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts)); // this will return the user's and whoever he is followings posts
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
