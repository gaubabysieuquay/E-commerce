const sequelize = require("sequelize");
const expressAsyncHandler = require("express-async-handler");
const db = require("../models");
const Order = db.Order;

exports.create = expressAsyncHandler(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    const orderData = {
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user.id,
    };
    console.log(orderData)
    const createdOrder = await Order.create(orderData);
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  }
});

exports.findAll = expressAsyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    where: condition,
    include: [
      { model: db.User },
    ],
  });
});
