const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    cvId: { type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
