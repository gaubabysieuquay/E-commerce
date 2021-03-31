"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      orderItems: DataTypes.JSON,
      shippingAddress: DataTypes.JSON,
      paymentMethod: DataTypes.STRING,
      paymentResult: DataTypes.JSON,
      itemsPrice: DataTypes.FLOAT,
      shippingPrice: DataTypes.FLOAT,
      taxPrice: DataTypes.FLOAT,
      totalPrice: DataTypes.FLOAT,
      user: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "User",
          key: "id",
        },
      },
      isPaid: DataTypes.BOOLEAN,
      paidAt: DataTypes.DATE,
      isDelivered: DataTypes.BOOLEAN,
      deliveredAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
