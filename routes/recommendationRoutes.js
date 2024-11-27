const express = require('express');
const {
    addRecommendation,
    getRecommendationsForCV,
    getUserRecommendations,
    deleteRecommendation
} = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: API for managing recommendations
 */

/**
 * @swagger
 * /api/recommendations:
 *   post:
 *     summary: Add a new recommendation
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cvId:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recommendation added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', authMiddleware, addRecommendation);

/**
 * @swagger
 * /api/recommendations/{cvId}:
 *   get:
 *     summary: Get recommendations for a specific CV
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cvId
 *         schema:
 *           type: string
 *         required: true
 *         description: The CV ID
 *     responses:
 *       200:
 *         description: A list of recommendations for the CV
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   cvId:
 *                     type: string
 *                   comment:
 *                     type: string
 *       404:
 *         description: CV not found
 */
router.get('/:cvId', authMiddleware, getRecommendationsForCV);

/**
 * @swagger
 * /api/recommendations/user:
 *   get:
 *     summary: Get recommendations left by an authenticated user
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of recommendations left by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   cvId:
 *                     type: string
 *                   comment:
 *                     type: string
 *       401:
 *         description: Unauthorized access
 */
router.get('/user', authMiddleware, getUserRecommendations);

/**
 * @swagger
 * /api/recommendations/{id}:
 *   delete:
 *     summary: Delete a recommendation
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The recommendation ID
 *     responses:
 *       200:
 *         description: Recommendation deleted successfully
 *       404:
 *         description: Recommendation not found
 */
router.delete('/:id', authMiddleware, deleteRecommendation);

module.exports = router;
