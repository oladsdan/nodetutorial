const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');


//we define our router

router.post('/', registerController.handleNewUser)

module.exports = router