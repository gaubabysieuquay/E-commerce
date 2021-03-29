"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Box set Harry Potter",
          author: "J.K. Rowling",
          category: "Novels",
          image: "harry-potter.png",
          price: 120,
          countInStock: 10,
          description: "high quality product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chronicle of Narnia",
          author: "C. S. Lewis",
          category: "Novels",
          image: "harry-potter.png",
          price: 100,
          countInStock: 20,
          description: "high quality product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Clean Code",
          author: "Robert Martin",
          category: "Science",
          image: "harry-potter.png",
          price: 220,
          countInStock: 0,
          description: "high quality product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Doraemon",
          author: "Fujiko F. Fuji",
          category: "Comic",
          image: "harry-potter.png",
          price: 78,
          countInStock: 15,
          description: "high quality product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Conan",
          author: "Aoyama Gosho",
          category: "Comic",
          image: "harry-potter.png",
          price: 78,
          countInStock: 15,
          description: "high quality product",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
