const CV = require('../models/Cvgit');

// Créer un CV
const createCV = async (req, res) => {
   const { nom, prenom, description, education, experience } = req.body;
   const cv = new CV({
       userId: req.user.id,
       personalInfo: { nom, prenom, description },
       education,
       experience,
   });
   await cv.save();
   res.status(201).json(cv);
};

// Modifier un CV
const updateCV = async (req, res) => {
   const { id } = req.params;
   const cv = await CV.findById(id);
   if (!cv || cv.userId.toString() !== req.user.id.toString()) {
       return res.status(404).json({ message: 'CV non trouvé ou vous n\'êtes pas autorisé.' });
   }

   cv.personalInfo = req.body.personalInfo || cv.personalInfo;
   cv.education = req.body.education || cv.education;
   cv.experience = req.body.experience || cv.experience;
   await cv.save();
   res.status(200).json(cv);
};

// Supprimer un CV
const deleteCV = async (req, res) => {
    const { id } = req.params;

    try {
        const cv = await CV.findById(id);
        if (!cv) {
            return res.status(404).json({ message: 'CV non trouvé.' });
        }

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
   const cvList = await CV.find({ visibility: true });
   res.status(200).json(cvList);
};

module.exports = { createCV, updateCV, deleteCV, getVisibleCV };
