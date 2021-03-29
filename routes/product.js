module.exports = (app) => {
    const products = require("../controllers/product");
    const cors = require("cors");
    const router = require("express").Router();
    router.use(cors());
  
    //router.post("/", products.create);
  
    router.get("/", products.findAll);
  
    router.get("/:id", products.findOne);
  
    //router.get("/name", products.findAllByName)
  
    //router.put("/:id", products.update);
  
    //router.delete("/:id", products.delete);
  
    //router.delete("/", products.deleteAll);
  
    app.use("/api/products", router);
  };
  