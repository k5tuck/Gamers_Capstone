"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Follower.hasMany(models.User, {
        foreignKey: ["followeeid", "followerid"],
      });
    }
  }
  Follower.init(
    {
      followeeid: DataTypes.INTEGER,
      followerid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Follower",
    }
  );
  return Follower;
};
