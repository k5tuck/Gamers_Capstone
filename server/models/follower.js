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
      // Follower.hasMany(models.User, {
      //   foreignKey: ["followeeid", "followerid"],
      // });
    }
    static following(follower) {
      return sequelize.query(`
      SELECT displayname, photo, followeeid as followee  FROM "Followers" as FE
      Join "Users" as U on U.id = FE.followeeid 
     Where FE.followerid = ${follower}
      `);
    }
    static followers(followee) {
      return sequelize.query(`
      SELECT displayname, photo, followeeid as followee, followerid as follower  FROM "Followers" as FE
      Join "Users" as U on U.id = FE.followerid 
     Where FE.followeeid = ${followee}
      `);
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
