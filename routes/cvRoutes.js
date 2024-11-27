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
 * components:
 *   schemas:
 *     CV:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         personalInfo:
 *           type: object
 *           properties:
 *             nom:
 *               type: string
 *             prenom:
 *               type: string
 *             description:
 *               type: string
 *         education:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               diplomes:
 *                 type: string
 *               certification:
 *                 type: string
 *               formations:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *         experience:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               postes_occupes:
 *                 type: string
 *               missions:
 *                 type: string
 *               entreprises:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *         visibility:
 *           type: boolean
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
 *             $ref: '#/components/schemas/CV'
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
 *             $ref: '#/components/schemas/CV'
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
 *                 $ref: '#/components/schemas/CV'
 */
router.get('/', getVisibleCV);

module.exports = router;
