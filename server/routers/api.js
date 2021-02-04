const express = require("express");
const router = express.Router();
const multer = require("multer");
const UPLOAD_URL = "/uploads/media/";

const upload = multer({ dest: "public" + UPLOAD_URL });
const { apiController, userController } = require("../controllers");

router
  // SignUp
  .post("/signup", apiController.processNewUser)
  .put("/signup/:id", upload.single("file"), apiController.addImageToNewUser)

  // Login
  .post("/login", apiController.processLogin)

  // Logout
  .post("/logout", apiController.processLogout)

  // Main Page
  .get("/photo", apiController.getMainPhoto)
  .get("/getmain", apiController.pullMainContent)

  // Comments
  // .post("/comments", apiController)
  // .put("/comments", apiController)
  // .delete("/comments", apiController)

  // Posts
  // .get("/posts", apiController) // All The Post

  // .get("/post", apiController) // Single Post
  // .post("/post", upload.single("file"), apiController)
  // .put("/post", upload.single("file"), apiController)
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
