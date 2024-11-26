const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();  
    }

    console.log("Mot de passe avant hachage : ", this.password);  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("Mot de passe après hachage : ", this.password);  
    next();
});

module.exports = mongoose.model('User', UserSchema);
