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

    const createdOrder = await Order.create(orderData);
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  }
});

exports.findOne = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findOne({
    where: { id: id },
  });
  if (order) {
    res.send({
      order: order,
      orderItems: JSON.parse(order.orderItems),
      shippingAddress: JSON.parse(order.shippingAddress),
    });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

exports.findAll = expressAsyncHandler(async (req, res) => {
  const order = await Order.findAll({});
  if (order) {
    res.send({
      order: order,
      orderItems: JSON.parse(order.orderItems),
    });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});
