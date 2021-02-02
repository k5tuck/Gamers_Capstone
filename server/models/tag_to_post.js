"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag_to_Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag_to_Post.belongsTo(models.Tag, {
        foreignKey: "tagid",
      });
      Tag_to_Post.belongsTo(models.Post, {
        foreignKey: "postid",
      });
    }
  }
  Tag_to_Post.init(
    {
      tagid: DataTypes.INTEGER,
      postid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tag_to_Post",
    }
  );
  return Tag_to_Post;
};
