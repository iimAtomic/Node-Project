const express = require('express');
const { createCV, updateCV, deleteCV, getVisibleCV } = require('../controllers/cvController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createCV);
router.put('/:id', authMiddleware, updateCV);
router.delete('/:id', authMiddleware, deleteCV);
router.get('/', getVisibleCV);

module.exports = router;
