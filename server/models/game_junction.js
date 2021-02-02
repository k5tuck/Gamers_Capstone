"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game_Junction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game_Junction.belongsTo(models.Game, {
        foreignKey: "gameid",
      });
      Game_Junction.belongsTo(models.User, {
        foreignKey: "userid",
      });
    }
  }
  Game_Junction.init(
    {
      gameid: DataTypes.INTEGER,
      userid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Game_Junction",
    }
  );
  return Game_Junction;
};
