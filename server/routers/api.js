const express = require("express");
const router = express.Router();
const { apiController } = require("../controllers");

router
  .get("/api/follow", apiController.getFollowers)
  .post("/api/follow/:id", apiController.saveFollowers);

module.exports = router;
