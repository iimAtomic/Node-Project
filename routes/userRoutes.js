const express = require('express');
const {userInfo} = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get('/userInfo' , authMiddleware ,userInfo)

module.exports = router ;