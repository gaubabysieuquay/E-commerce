//Authorization
module.exports = (app) => {
  const { verifySignUp, generateToken } = require("../middlewares");
  const controller = require("../controllers/user");
  const cors = require("cors");
  const router = require("express").Router();
  router.use(cors());

  router.post("/signin", controller.signin);

  router.post(
    "/register",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.register
  );

  app.use("/api/users", router);
};
