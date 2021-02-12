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
      Post.hasMany(models.TagToPost, {
        foreignKey: "postid",
      });
      Post.hasMany(models.Like, {
        foreignKey: "postid",
      });
    }
  }
  Post.init(
    {
      userid: DataTypes.INTEGER,
      username: DataTypes.STRING,
      displayname: DataTypes.STRING,
      userphoto: DataTypes.STRING,
      gameid: DataTypes.INTEGER,
      title: DataTypes.STRING,
      media: DataTypes.STRING,
      mediatype: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
