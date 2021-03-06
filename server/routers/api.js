const express = require("express");
const router = express.Router();
const multer = require("multer");
const UPLOAD_URL = "/uploads/media/";

const upload = multer({ dest: "public" + UPLOAD_URL });
const { apiController } = require("../controllers");

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

  // Profile Page Picture
  .get("/photo/:id", apiController.getProfilePagePic)

  // Edit Profile Details
  .post("/eprofile/:id", upload.single("file"), apiController.updateProfile)

  // Not Using
  // .put(
  //   "/eprofilepic/:id",
  //   upload.single("file"),
  //   apiController.updateProfilePic
  // )

  // Comments

  .get("/comments/:id", apiController.getComment)
  .post("/comments/:id", apiController.addComment)
  .put("/comments/:id", apiController.editComment)
  .delete("/comments/:id", apiController.deleteComment)

  // Posts
  .post("/post", apiController.processPost) // Add a Post

  .get("/posts", apiController.pullMainContent) // All The Post
  .get("/gameposts/:id", apiController.getGamePosts) // Pull Game Posts
  .get("/posts/:id", apiController.getProfilePosts) // Pull Profile Posts

  .get("/repost/:id", apiController.editPost) // Single Post

  .put("/postimage/:id", upload.single("file"), apiController.processPostImage)
  .put("/editpost/:id", upload.single("file"), apiController.processEditPost)
  .delete("/delpost/:id", apiController.processDeletePost)

  // Followers/Following
  .get("/follow", apiController.getFollowers)
  .post("/follower/:id", apiController.saveFollower) //Add Follower Button
  .post("/removefollower/:id", apiController.removeFollower) // Remove Follower Button
  .get("/follows/:id", apiController.getProfileFollows)

  // Likes
  .put("/like/:id", apiController.makeLike)
  .delete("/like/:id", apiController.deleteLike)

  // // Tags
  .post("/searchtag", apiController.getTag)
  .post("/tags/:id", apiController.makeTag)

  // Games
  .get("/games", apiController.getAllGames)
  // .get("/game", apiController) // Get Specific Game
  .get("/maintopfive", apiController.grabMainTopFive)
  .post("/savetopfive", apiController.saveTopFive)
  .get("/pertopfive/:id", apiController.personalTopFive)

  //Game Page
  .get("/game/:id", apiController.game)

  // Search
  .post("/searchpost", apiController.searchPost)
  .post("/searchgame", apiController.searchGame);
module.exports = router;
