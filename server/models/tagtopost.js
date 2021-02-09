"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TagToPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TagToPost.belongsTo(models.Tag, {
        foreignKey: "tagid",
      });
      TagToPost.belongsTo(models.Post, {
        foreignKey: "postid",
      });
    }
  }
  TagToPost.init(
    {
      tagid: DataTypes.INTEGER,
      postid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TagToPost",
    }
  );
  return TagToPost;
};
