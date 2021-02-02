const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home')

router
    .get('/', homeController.home)
    .get('/about', homeController.about)
    .get('/contact', homeController.contact)
    .get('/unauthorized', homeController.unauthorized)
    .get('/errorsignup', homeController.errorsignup)
    .get("/takensignup", homeController.taken)

module.exports = router;