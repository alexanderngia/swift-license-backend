"use strict";

module.exports = (sequelize, DataTypes) => {
  const LicenseList = sequelize.define(
    "License",
    {
      licenseStatus: DataTypes.INTEGER,
      customerName: DataTypes.STRING,
      customerEmail: DataTypes.STRING,
      domain: DataTypes.STRING,
      shopId: DataTypes.TEXT("long"),
      licenseKey: DataTypes.TEXT("long"),
    },
    {
      freezeTableName: true,
    }
  );

  return LicenseList;
};
