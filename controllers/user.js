const bcrypt = require("bcryptjs");
const { generateToken } = require("../middlewares");
const expressAsyncHandler = require("express-async-handler");
const db = require("../models");
const User = db.User;

exports.signin = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
});

exports.register = expressAsyncHandler(async (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  const createUser = await User.create(userData);
  res.send({
    id: createUser.id,
    name: createUser.name,
    email: createUser.email,
    isAdmin: createUser.isAdmin,
    token: generateToken(createUser),
  });
});

exports.findOne = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});
