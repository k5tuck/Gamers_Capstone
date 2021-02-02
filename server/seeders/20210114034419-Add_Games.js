"use strict";

const { GetFirstPage, GetPages } = require("../AddGametoDB");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const games = await GetFirstPage();
    const bulkgames = await GetPages();
    await queryInterface.bulkInsert("Games", [...games, ...bulkgames], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Games", null, {});
  },
};
