"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderItems: {
        type: Sequelize.JSON,
      },
      shippingAddress: {
        type: Sequelize.JSON,
      },
      paymentMethod: {
        type: Sequelize.STRING,
      },
      paymentResult: {
        type: Sequelize.JSON,
      },
      itemsPrice: {
        type: Sequelize.FLOAT,
      },
      shippingPrice: {
        type: Sequelize.FLOAT,
      },
      taxPrice: {
        type: Sequelize.FLOAT,
      },
      totalPrice: {
        type: Sequelize.FLOAT,
      },
      user: {
        type: Sequelize.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Users",
          key: "id",
        },
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
      },
      paidAt: {
        type: Sequelize.DATE,
      },
      isDelivered: {
        type: Sequelize.BOOLEAN,
      },
      deliveredAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
