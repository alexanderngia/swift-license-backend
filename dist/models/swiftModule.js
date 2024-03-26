"use strict";

module.exports = function (sequelize, DataTypes) {
  var SwiftModule = sequelize.define("SwiftModule", {
    codeModule: DataTypes.TEXT("long")
  }, {
    freezeTableName: true
  });
  return SwiftModule;
};