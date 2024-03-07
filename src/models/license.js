"use strict";

module.exports = (sequelize, DataTypes) => {
  const LicenseList = sequelize.define("License", {
    customerName: DataTypes.STRING,
    customerEmail: DataTypes.STRING,
    domain: DataTypes.STRING,
    shopId: DataTypes.TEXT("long"),
    licenseKey: DataTypes.TEXT("long"),
  },{
    freezeTableName: true
  });

  return LicenseList;
};
