const express = require('express');
const router = express.Router();
const { getUserInfo, updateUser } = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware d'authentification

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour la gestion des utilisateurs
 */

/**
 * @swagger
 * /api/user/info:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     tags: [Users]
 *     security:
 *       - bearerAuth: [] # Utilisation d'un token Bearer pour l'authentification
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Le nom d'utilisateur
 *                 email:
 *                   type: string
 *                   description: L'email de l'utilisateur
 *       401:
 *         description: Non autorisé, token invalide ou non fourni
 *       500:
 *         description: Erreur serveur
 */
router.get('/info', authMiddleware, getUserInfo);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Mettre à jour les informations de l'utilisateur connecté
 *     tags: [Users]
 *     security:
 *       - bearerAuth: [] # Utilisation d'un token Bearer pour l'authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nouveau nom d'utilisateur (facultatif)
 *               email:
 *                 type: string
 *                 description: Nouvel email de l'utilisateur (facultatif)
 *               currentPassword:
 *                 type: string
 *                 description: Mot de passe actuel (requis pour modifier le mot de passe)
 *               newPassword:
 *                 type: string
 *                 description: Nouveau mot de passe (facultatif)
 *     responses:
 *       200:
 *         description: Informations utilisateur mises à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation de la mise à jour
 *       400:
 *         description: Erreur de validation des données
 *       401:
 *         description: Non autorisé, token invalide ou non fourni
 *       500:
 *         description: Erreur serveur
 */
router.put('/update', authMiddleware, updateUser);

module.exports = router;
