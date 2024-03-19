"use strict";

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    fullNameUser: DataTypes.STRING,
    emailUser: DataTypes.STRING,
    passwordUser: DataTypes.STRING,
    phoneUser: DataTypes.STRING,
    genderUser: DataTypes.BOOLEAN,
    adressUser: DataTypes.STRING,
    typeRole: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  return User;
};