const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    personalInfo: {
        nom: String,
        prenom: String,
        description: String,
    },
    education: [
        {
            diplomes: String,
            certification: String,
            formations : Number,
            startDate: Date,
            endDate: Date,
        }
    ],
    experience: [
        {
            postes_occupes: String,
            missions: String,
            entreprises: String,
            startDate: Date,
            endDate: Date,
        }
    ],
    visibility: { type: Boolean, default: true },
});

module.exports = mongoose.models.CV || mongoose.model('CV', cvSchema);
