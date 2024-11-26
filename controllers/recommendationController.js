const Recommendation = require('../models/Recommendation');
const CV = require('../models/Cv');

// Ajouter une recommandation
const addRecommendation = async (req, res) => {
    const { cvId, message } = req.body;

    try {
        // Vérifier que le CV existe
        const cv = await CV.findById(cvId);
        if (!cv || !cv.visibility) {
            return res.status(404).json({ message: 'CV non trouvé ou non visible.' });
        }

        // Créer et sauvegarder la recommandation
        const recommendation = new Recommendation({
            cvId,
            userId: req.user.id, // Utilisateur authentifié
            message,
        });

        await recommendation.save();
        res.status(201).json(recommendation);
    } catch (error) {
        console.error("Erreur lors de l'ajout de la recommandation :", error);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

// Obtenir les recommandations pour un CV spécifique
const getRecommendationsForCV = async (req, res) => {
    const { cvId } = req.params;

    try {
        const recommendations = await Recommendation.find({ cvId }).populate('userId', 'username');
        res.status(200).json(recommendations);
    } catch (error) {
        console.error("Erreur lors de la récupération des recommandations :", error);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

// Obtenir les recommandations laissées par un utilisateur authentifié
const getUserRecommendations = async (req, res) => {
    try {
        const recommendations = await Recommendation.find({ userId: req.user.id });
        res.status(200).json(recommendations);
    } catch (error) {
        console.error("Erreur lors de la récupération des recommandations utilisateur :", error);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

// Supprimer une recommandation
const deleteRecommendation = async (req, res) => {
    const { id } = req.params;

    try {
        const recommendation = await Recommendation.findById(id);

        if (!recommendation) {
            return res.status(404).json({ message: 'Recommandation non trouvée.' });
        }

        // Vérifier si l'utilisateur est l'auteur de la recommandation
        if (recommendation.userId.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: 'Action non autorisée.' });
        }

        await recommendation.deleteOne();
        res.status(200).json({ message: 'Recommandation supprimée avec succès.' });
    } catch (error) {
        console.error("Erreur lors de la suppression de la recommandation :", error);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

module.exports = {
    addRecommendation,
    getRecommendationsForCV,
    getUserRecommendations,
    deleteRecommendation,
};
