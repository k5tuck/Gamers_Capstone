"use strict";

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
    return await queryInterface.bulkInsert("Users", [
      {
        name: "Josh L",
        username: "jlopez28",
        displayname: "FocusJosh",
        photo: "",
        hash: "$2a$10$z2.xgy/P5CK1CyMXSCEPhuL8ZQzOU3LicQxwpR/gkpwD2Sy53EKvy",
        email: "jlopez28@gamersparadise.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ian S",
        username: "istorms30",
        displayname: "Stormy",
        photo: "",
        hash: "$2a$10$5lkZFKdEgf6qp.O.nZDK9Ot2RKrtRA4GJO9D49vjQYVXUmdQM46Ry",
        email: "istorms30@gamersparadise.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sho U",
        username: "suddin29",
        displayname: "NukeSho",
        photo: "",
        hash: "$2a$10$gCktHc/KASRoxoYltwmAhew3oh9p8wAt5J2yN1lbwA1.9av4FAU/y",
        email: "suddin29@gamersparadise.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kevin T",
        username: "ktuck31",
        displayname: "Aegon",
        photo: "",
        hash: "$2a$10$/d8XOvGpAwdK.x5Sv5R/selO1cLlpwJrZ6bWgyat09uUU3Oc2SASy",
        email: "ktuck31@gamersparadise.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("Users", null, {});
  },
};
