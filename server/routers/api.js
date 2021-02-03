const express = require("express");
const router = express.Router();
const { apiController } = require("../controllers");

router
  // Followers/Following
  .get("/follow", apiController.getFollowers)
  .post("/follow/:id", apiController.saveFollowers)

  // Games
  .get("/games", apiController.getAllGames)
  .get("/topfivegames", apiController.getGames)
  .post("/savegames/:id", apiController.saveGames);

module.exports = router;
