const express = require('express');
const {login} = require("../controllers/authController");
const {register} = require("../controllers/authController");
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Vous êtes autorisé.', user: req.user });
});

module.exports = router ;