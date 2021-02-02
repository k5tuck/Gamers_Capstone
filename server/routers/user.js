const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();


router
    .get("/signup", userController.newUser)

    .post("/signup", userController.processNewUser)

router
  .get("/login", userController.login)
  .post("/login", userController.processLogin)

  
module.exports = router;