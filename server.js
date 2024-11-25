const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import des routes
const authRoutes = require('./routes/auth');
const cvRoutes = require('./routes/cvRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => console.error(err));

