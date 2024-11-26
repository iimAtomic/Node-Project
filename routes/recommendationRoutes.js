const express = require('express');
const { 
    addRecommendation, 
    getRecommendationsForCV, 
    getUserRecommendations, 
    deleteRecommendation 
} = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Ajouter une recommandation
router.post('/', authMiddleware, addRecommendation);

// Obtenir les recommandations pour un CV spécifique
router.get('/:cvId', authMiddleware, getRecommendationsForCV);

// Obtenir les recommandations laissées par un utilisateur authentifié
router.get('/user', authMiddleware, getUserRecommendations);

// Supprimer une recommandation
router.delete('/:id', authMiddleware, deleteRecommendation);

module.exports = router;
