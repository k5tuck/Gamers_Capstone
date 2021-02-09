"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment, {
        foreignKey: "userid",
      });
      User.hasMany(models.Post, {
        foreignKey: "userid",
      });
      User.hasMany(models.Post, {
        foreignKey: "username",
      });
      User.hasMany(models.Game_Junction, {
        foreignKey: "userid",
      });
      User.hasMany(models.Like, {
        foreignKey: "userid",
      });
      User.belongsToMany(models.User, {
        foreignKey: "followeeid",
        as: "followees",
        through: models.Follower,
      });
      User.belongsToMany(models.User, {
        foreignKey: "followerid",
        as: "followers",
        through: models.Follower,
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      displayname: DataTypes.STRING,
      photo: DataTypes.STRING,
      username: DataTypes.STRING,
      hash: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
