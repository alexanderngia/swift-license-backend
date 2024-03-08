"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("License", [
      {
        licenseStatus: 0,
        customerName: "Markus Greuter",
        customerEmail: "finance@uniteddeluxe.de",
        domain: "12412321nbj21b312j31231j23.myshopify.com",
        shopId: 123412525,
        licenseKey: "LIC-asf8a7s9f879as7f97asf97as9f87as9f9saf_KEY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        licenseStatus: 0,
        customerName: "Mike Barnardo",
        customerEmail: "hello@totalsmile.co.za",
        domain: "hello.myshopify.com",
        shopId: 987654321,
        licenseKey: "LIC-asf8a7s9f8gasgasgasg9f87as9f9saf_KEY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        licenseStatus: 0,
        customerName: "Adams Lowe",
        customerEmail: "support@trucksrus.shop",
        domain: "swifthemee.myshopify.com",
        shopId: 526412525,
        licenseKey: "LIC-asf8a7s9f879as7f125125125s9f9saf_KEY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
