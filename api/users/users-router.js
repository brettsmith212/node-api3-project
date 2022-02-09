const express = require("express");
const Posts = require("../posts/posts-model");
const Users = require("./users-model");
const {
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

router.post("/", validateUser, (req, res) => {
  let newUser = req.newUser;
  res.status(200).json(newUser);
});

router.put("/:id", (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
