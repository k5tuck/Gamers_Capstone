const express = require("express");
const router = express.Router();
const { apiController, userController } = require("../controllers");

router
  // SignUp
  .post("/signup", apiController.processNewUser)

  // Login
  .post("/login", apiController.processLogin)

  // Logout
  .post("/logout", apiController.processLogout)

  // Main Page
  .get("/getmain", apiController.pullMainContent)

  // Comments
  // .post("/comments", apiController)
  // .put("/comments", apiController)
  // .delete("/comments", apiController)

  // Posts
  // .get("/posts", apiController) // All The Post

  // .get("/post", apiController) // Single Post
  // .post("/post", apiController)
  // .put("/post", apiController)
  // .delete("/post", apiController)

  // Followers/Following
  .get("/follow", apiController.getFollowers)

  .post("/follow", apiController.saveFollowers)

  // Likes
  // .post("/likes", apiController)
  // .put("/likes", apiController)

  // // Tags
  // .get("/tags", apiController)
  // .post("/tags", apiController)

  // Games
  .get("/games", apiController.getAllGames)
  // .get("/game", apiController) // Get Specific Game
  // .get("/maintopfive", apiController.grabMainTopFive)
  .post("/savetopfive", apiController.saveTopFive)
  .get("/pertopfive", apiController.personalTopFive);

module.exports = router;
