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

async function validateUser(req, res, next) {
  let { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "missing required name field" });
  }
  next();
}

function validatePost(req, res, next) {
  let { text } = req.body;
  if (!text) {
    res.status(400).json({ message: "missing required text field" });
  }
  next();
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
