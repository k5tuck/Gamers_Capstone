"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game_Junction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static top(howMany = 5) {
      return sequelize.query(`
      SELECT title, gameid, COUNT(gameid) as freq FROM "Game_Junctions" as GJ 
        Join "Games" as G on G.id = GJ.gameid 
        group by gameid, title
        order by freq desc
        limit ${howMany}
      `);
    }
    static personaltop(id, howMany = 5) {
      return sequelize.query(`
      SELECT title, gameid, COUNT(gameid) as freq FROM "Game_Junctions" AS GJ 
      Join "Games" as G on G.id = GJ.gameid 
      WHERE GJ.userid = ${id} 
        group by gameid, title
        order by freq desc
        limit ${howMany}
      `);
    }
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
