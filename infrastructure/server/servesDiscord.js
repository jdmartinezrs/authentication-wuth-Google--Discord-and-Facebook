// src/infrastructure/server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('../application/routes/authRoutes');
const { connect } = require('./database/mongoClient');
const './auth/discordStrategy'; // Importa la configuración de Passport para Discord

const app = express();

// Configuración de la conexión a MongoDB
connect().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware para analizar cuerpos de solicitudes JSON
app.use(bodyParser.json());

// Configuración de sesiones
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.use('/auth', authRoutes);

module.exports = app;
