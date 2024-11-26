const User = require('../models/User');
const CV = require('../models/Cv');

const userInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const myCV = await CV.find({ userId: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user, myCV });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { userInfo };

