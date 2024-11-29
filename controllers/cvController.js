const CV = require('../models/Cv');

// Créer un CV
const createCV = async (req, res) => {
    try {
        const { nom, prenom, description, education, experience } = req.body;

        // Log des données reçues
        console.log("Données reçues :", { nom, prenom, description, education, experience });

        const cv = new CV({
            userId: req.user.id, // ID de l'utilisateur connecté
            personalInfo: { nom, prenom, description },
            education,
            experience,
        });

        // Log du document avant sauvegarde
        console.log("Document avant sauvegarde :", cv);

        const savedCV = await cv.save();

        // Log du document après sauvegarde
        console.log("Document après sauvegarde :", savedCV);

        res.status(201).json(savedCV);
    } catch (error) {
        console.error("Erreur lors de la création du CV :", error);
        res.status(500).json({ message: 'Erreur lors de la création du CV.' });
    }
};


// Modifier un CV
const updateCV = async (req, res) => {
    try {
        const { id } = req.params;
        const { personalInfo, education, experience, visibility } = req.body;

        // Vérification de l'existence du CV
        const cv = await CV.findById(id);

        if (!cv) {
            return res.status(404).json({ message: 'CV non trouvé.' });
        }

        // Vérification que l'utilisateur est le propriétaire
        if (cv.userId.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: 'Action non autorisée.' });
        }

        // Mise à jour des champs
        if (personalInfo) cv.personalInfo = personalInfo;
        if (education) cv.education = education;
        if (experience) cv.experience = experience;
        if (visibility !== undefined) cv.visibility = visibility;

        await cv.save();
        res.status(200).json(cv);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du CV :", error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du CV.' });
    }
};

// Supprimer un CV
const deleteCV = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérification de l'existence du CV
        const cv = await CV.findById(id);

        if (!cv) {
            return res.status(404).json({ message: 'CV non trouvé.' });
        }

        // Vérification que l'utilisateur est le propriétaire
        if (cv.userId.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: 'Action non autorisée.' });
        }

        await CV.deleteOne({ _id: id });
        res.status(200).json({ message: 'CV supprimé avec succès.' });
    } catch (error) {
        console.error("Erreur lors de la suppression du CV :", error);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

// Obtenir tous les CV visibles
const getVisibleCV = async (req, res) => {
    try {
        // Récupérer les CV publics
        const cvList = await CV.find({ visibility: true })
            .select('personalInfo education experience visibility');

        res.status(200).json(cvList);
    } catch (error) {
        console.error("Erreur lors de la récupération des CV visibles :", error);
        res.status(500).json({ message: 'Erreur lors de la récupération des CV visibles.' });
    }
};

// Obtenir les CV de l'utilisateur actuellement connecté
const getUserCVs = async (req, res) => {
    try {
        // Récupérer les CV de l'utilisateur connecté
        const userCVs = await CV.find({ userId: req.user.id })
            .select('personalInfo education experience visibility');

        res.status(200).json(userCVs);
    } catch (error) {
        console.error("Erreur lors de la récupération des CV de l'utilisateur :", error);
        res.status(500).json({ message: 'Erreur lors de la récupération de vos CV.' });
    }
};




module.exports = { createCV, updateCV, deleteCV, getVisibleCV, getUserCVs };
