"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.Comment, {
        foreignKey: "postid",
      });
      Post.belongsTo(models.User, {
        foreignKey: "userid",
      });
      Post.belongsTo(models.Game, {
        foreignKey: "gameid",
      });
      Post.belongsTo(models.User, {
        foreignKey: "username",
      });
      Post.hasMany(models.Tag_to_Post, {
        foreignKey: "postid",
      });
      Post.hasMany(models.Vote, {
        foreignKey: "postid",
      });
    }
  }
  Post.init(
    {
      userid: DataTypes.INTEGER,
      username: DataTypes.STRING,
      gameid: DataTypes.INTEGER,
      title: DataTypes.STRING,
      media: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
