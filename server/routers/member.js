const express = require("express");
const router = express.Router();
const { requireLogin } = require("../auth");
const { memberController } = require("../controllers");
const UPLOAD_URL = "/uploads/media/";
const multer = require("multer");
const upload = multer({
  dest: "public" + UPLOAD_URL,
});

router
  .get("/", requireLogin, memberController.member)
  .get("/profile/:id", requireLogin, memberController.profile);

router
  .get("/create", requireLogin, memberController.createPost)
  // .post("/create", requireLogin, upload.single("media"), memberController.processPost)

  .get("/post/:id/edit", requireLogin, memberController.editPost)
  .post(
    "/post/:id/edit",
    requireLogin,
    upload.single("media"),
    memberController.processEditPost
  )

  .get("/post/:id/delete", requireLogin, memberController.deletePost)
  .post("/post/:id/delete", requireLogin, memberController.processDeletePost);

router
  .get("/post/:id/comment", requireLogin, memberController.createComment)
  .post("/post/:id/comment", requireLogin, memberController.processComment)

  .get("/comment/:id/edit", requireLogin, memberController.editComment)
  .post("/comment/:id/edit", requireLogin, memberController.processEditComment)

  .get("/comment/:id/delete", requireLogin, memberController.deleteComment)
  .post(
    "/comment/:id/delete",
    requireLogin,
    memberController.processDeleteComment
  );

router
  // .get("/search", requireLogin, memberController.search)
  .post("/search", requireLogin, memberController.processSearch)
  .post("/game/search", requireLogin, memberController.ProcessGameSearch);

router.get("/game/:id", requireLogin, memberController.game);

router;
// .get("/about", requireLogin, memberController.about)

// .get("/contact", requireLogin, memberController.contact)

router.get("/logout", memberController.logout);

module.exports = router;
