"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vote.belongsTo(models.User, {
        foreignKey: "userid",
      });
      Vote.belongsTo(models.Post, {
        foreignKey: "postid",
      });
    }
  }
  Vote.init(
    {
      userid: DataTypes.INTEGER,
      postid: DataTypes.INTEGER,
      upvote: DataTypes.INTEGER,
      downvote: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  return Vote;
};
