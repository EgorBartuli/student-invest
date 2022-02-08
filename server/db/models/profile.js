"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Profile.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      login: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      info: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      interests: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      country: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      language: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
