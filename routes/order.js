module.exports = (app) => {
  const orders = require("../controllers/order");
  const cors = require("cors");
  const router = require("express").Router();
  const { isAuth } = require("../middlewares/verifySignUp");
  router.use(cors());

  router.post("/", isAuth, orders.create);

  router.get("/", orders.findAll);

  router.get("/:id", isAuth, orders.findOne);

  router.get("/order/mine", isAuth, orders.findOrderHistory);

  //router.put("/:id", products.update);

  //router.delete("/:id", products.delete);

  //router.delete("/", products.deleteAll);

  app.use("/api/orders", router);
};
