const express = require('express');
const { createCV, updateCV, deleteCV, getVisibleCV } = require('../controllers/cvController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CV Manager
 *   description: API for CV Managing
 */

/**
 * @swagger
 * /api/cv/create:
 *   post:
 *     summary: Create a new CV
 *     tags: [CV Manager]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               experience:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: CV created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/create', authMiddleware, createCV);

/**
 * @swagger
 * /api/cv/{id}:
 *   put:
 *     summary: Update an existing CV
 *     tags: [CV Manager]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The CV ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               experience:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: CV updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: CV not found
 */
router.put('/:id', authMiddleware, updateCV);

/**
 * @swagger
 * /api/cv/{id}:
 *   delete:
 *     summary: Delete an existing CV
 *     tags: [CV Manager]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The CV ID
 *     responses:
 *       200:
 *         description: CV deleted successfully
 *       404:
 *         description: CV not found
 */
router.delete('/:id', authMiddleware, deleteCV);

/**
 * @swagger
 * /api/cv:
 *   get:
 *     summary: Get all visible CVs
 *     tags: [CV Manager]
 *     responses:
 *       200:
 *         description: A list of visible CVs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   experience:
 *                     type: string
 *                   skills:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get('/', getVisibleCV);

module.exports = router;
