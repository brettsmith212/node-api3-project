const express = require("express");
const Posts = require("../posts/posts-model");
const Users = require("./users-model");
const {
  logger,
  validatePost,
  validateUser,
  validateUserId,
} = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let users = await Users.get();
    console.log(users);
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: "error getting users" });
  }
});

router.get("/:id", validateUserId, (req, res) => {
  let user = req.user;
  res.status(200).json(user);
});

router.post("/", validateUser, async (req, res) => {
  let newUser = await Users.insert({ name: req.body.name });
  if (!newUser) {
    res.status(500).json({ message: "error adding new user" });
  }
  res.status(201).json(newUser);
});

router.put("/:id", validateUserId, validateUser, async (req, res) => {
  let { id } = req.params;
  let updatedUser = await Users.update(id, { name: req.body.name });
  if (!updatedUser) {
    res.status(500).json({ message: "error updating user" });
  }
  res.status(200).json(updatedUser);
});

router.delete("/:id", validateUserId, async (req, res) => {
  let { id } = req.params;
  let deletedUser = await Users.remove(id);
  if (!deletedUser) {
    res.status(500).json({ message: "error deleting user" });
  }
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  let { id } = req.params;
  let posts = await Posts.getById(id);
  if (!posts) {
    res.status(500).json({ message: "error getting posts" });
  }
  res.status(200).json(posts);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
