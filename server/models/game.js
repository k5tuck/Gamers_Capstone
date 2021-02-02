"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.hasMany(models.Game_Junction, {
        foreignKey: "gameid",
      });
      Game.hasMany(models.Post, {
        foreignKey: "gameid",
      });
    }
  }
  Game.init(
    {
      genre: DataTypes.STRING,
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      desc: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      review: DataTypes.STRING,
      platform: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
