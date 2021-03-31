module.exports = (app) => {
  const orders = require("../controllers/order");
  const cors = require("cors");
  const router = require("express").Router();
  const { isAuth } = require("../middlewares/verifySignUp");
  router.use(cors());

  router.post("/", orders.create, isAuth);

  //router.get("/", orders.findAll);

  //router.get("/:id", orders.findOne);

  //router.get("/name", products.findAllByName)

  //router.put("/:id", products.update);

  //router.delete("/:id", products.delete);

  //router.delete("/", products.deleteAll);

  app.use("/api/orders", router);
};
