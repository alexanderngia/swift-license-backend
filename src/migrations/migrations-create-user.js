"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullNameUser: {
        type: Sequelize.STRING,
      },
      emailUser: {
        type: Sequelize.STRING,
      },
      passwordUser: {
        type: Sequelize.STRING,
      },
      phoneUser: {
        type: Sequelize.STRING,
      },
      genderUser: {
        type: Sequelize.BOOLEAN,
      },
      adressUser: {
        type: Sequelize.STRING,
      },
      typeRole: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Users");
  },
};
