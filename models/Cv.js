const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    personalInfo: {
        firstName: String,
        lastName: String,
        description: String,
    },
    education: [
        {
            degree: String,
            institution: String,
            year: Number,
        }
    ],
    experience: [
        {
            jobTitle: String,
            company: String,
            description: String,
            startDate: Date,
            endDate: Date,
        }
    ],
    visibility: { type: Boolean, default: true },
});

module.exports = mongoose.model('CV', cvSchema);
