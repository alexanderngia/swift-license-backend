"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullNameUser: DataTypes.STRING,
      emailUser: DataTypes.STRING,
      passwordUser: DataTypes.STRING,
      phoneUser: DataTypes.STRING,
      genderUser: DataTypes.BOOLEAN,
      adressUser: DataTypes.STRING,
      typeRole: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );

  return User;
};
