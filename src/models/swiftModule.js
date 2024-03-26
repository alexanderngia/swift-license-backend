"use strict";

module.exports = (sequelize, DataTypes) => {
  const SwiftModule = sequelize.define(
    "SwiftModule",
    {
      codeModule: DataTypes.TEXT("long"),
    },
    {
      freezeTableName: true,
    }
  );

  return SwiftModule;
};
