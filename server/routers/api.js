const express = require("express");
const router = express.Router();
const { apiController, userController } = require("../controllers");

router
  // Followers/Following
  .get("/follow", apiController.getFollowers)
  .post("/follow/:id", apiController.saveFollowers)
  .post("/login", userController.processLogin)
  .post("/signup", userController.processNewUser)

  // Games
  .get("/games", apiController.getAllGames)
  .get("/topfivegames", apiController.getGames)
  .post("/savegames/:id", apiController.saveGames)

module.exports = router;
