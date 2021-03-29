const sequelize = require("sequelize");
const expressAsyncHandler = require("express-async-handler");
const db = require("../models");
const Product = db.Product;

exports.findAll = expressAsyncHandler(async (req, res) => {
  const products = await Product.findAll({});
  res.send(products);
});

exports.findOne = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({
    where: { id: id },
  });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found " });
  }
});
