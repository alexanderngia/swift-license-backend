"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("License", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      licenseStatus: {
        type: Sequelize.INTEGER,
      },
      customerName: {
        type: Sequelize.TEXT("long"),
      },
      customerEmail: {
        type: Sequelize.TEXT("long"),
      },
      domain: {
        type: Sequelize.TEXT("long"),
      },
      shopId: {
        type: Sequelize.INTEGER,
      },
      licenseKey: {
        type: Sequelize.TEXT("long"),
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
    await queryInterface.dropTable("License");
  },
};
