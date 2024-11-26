const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const {login, register} = require("../controllers/authController");

const router = express.Router();

// Appliquer le middleware d'authentification à toutes les routes
router.use(authMiddleware);



module.exports = router;
