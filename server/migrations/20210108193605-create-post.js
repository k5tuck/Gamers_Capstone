"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      username: {
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "username",
        },
      },
      displayname: {
        type: Sequelize.STRING,
      },
      userphoto: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      media: {
        type: Sequelize.STRING,
      },
      mediatype: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Posts");
  },
};
