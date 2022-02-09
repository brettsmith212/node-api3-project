const Posts = require("../posts/posts-model");
const Users = require("../users/users-model");

function logger(req, res, next) {
  console.log(`${req.method} ${req.get("host")} ${Date.now()}`);
  next();
}

async function validateUserId(req, res, next) {
  let { id } = req.params;
  let user = await Users.getById(id);
  if (!user) {
    res.status(404).json({ message: "user not found" });
  } else {
    req.user = user;
    next();
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
