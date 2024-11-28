const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
// Import des routes
const authRoutes = require('./routes/auth');
const cvRoutes = require('./routes/cvRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const userRoutes = require('./routes/userRoutes');
const morgan = require('morgan');



dotenv.config();
const app = express();

// Middleware

// Middleware pour logger les requêtes
app.use(morgan('combined'));

// Middleware pour activer CORS
app.use(cors({
    origin: '*', // Autoriser votre frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Si vous utilisez des cookies ou des tokens
}));

// Répondre aux requêtes OPTIONS
app.options('*', (req, res) => {
    console.log('Handling OPTIONS request for', req.url);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({ error: err.message });
});


app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/user' , userRoutes);

//Corse entete
app.use(cors());




//Recommandation
app.use('/api/recommendations', recommendationRoutes);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'A simple Express API',
        },
        servers: [
            {
                url: process.env.SERVER_URL || 'http://localhost:3000/'
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Les fichiers contenant vos routes
};

const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));



mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => console.error(err));

