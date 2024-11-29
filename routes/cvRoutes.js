const express = require('express');
const { createCV, updateCV, deleteCV, getVisibleCV, getUserCVs } = require('../controllers/cvController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware d'authentification
const router = express.Router();
const CV = require('../models/Cv');

/**
 * @swagger
 * tags:
 *   name: CV Manager
 *   description: API for managing CVs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CV:
 *       type: object
 *       required:
 *         - userId
 *         - personalInfo
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
 *       201:
 *         description: CV created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
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
 *       401:
 *         description: Unauthorized
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
 *       401:
 *         description: Unauthorized
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

/**
 * @swagger
 * /api/cv/user:
 *   get:
 *     summary: Get CVs of the logged-in user
 *     tags: [CV Manager]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of CVs for the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CV'
 *       401:
 *         description: Unauthorized
 */
router.get('/user', authMiddleware, getUserCVs);

/**
 * @swagger
 * /api/cv/{id}:
 *   get:
 *     summary: Get a CV by ID
 *     tags: [CV Manager]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The CV ID
 *     responses:
 *       200:
 *         description: The CV details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       404:
 *         description: CV not found
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cv = await CV.findById(id); // Assurez-vous que CvModel est importé
        if (!cv) {
            return res.status(404).json({ message: "CV introuvable" });
        }
        res.status(200).json(cv);
    } catch (error) {
        console.error("Erreur lors de la récupération du CV :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});


module.exports = router;
