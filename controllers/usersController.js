const User = require('../models/User');
const bcrypt = require('bcryptjs');

const updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userId = req.userId; // Supposons que l'ID de l'utilisateur soit extrait via un middleware d'authentification

        // Trouver l'utilisateur dans la base de données
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Mettre à jour les informations si elles sont fournies
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Sauvegarder les modifications
        await user.save();

        res.status(200).json({ message: "Utilisateur mis à jour avec succès", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error });
    }
};

const getUserInfo = async (req, res) => {
    try {
        const userId = req.userId; // Supposons que l'ID de l'utilisateur soit extrait via un middleware d'authentification

        // Rechercher l'utilisateur dans la base de données
        const user = await User.findById(userId).select('-password'); // Exclure le mot de passe des données retournées
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des informations utilisateur", error });
    }
};

module.exports = { getUserInfo ,updateUser };

