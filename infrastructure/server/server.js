// src/infrastructure/server.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('../application/routes/authRoutes');

const app = express();

// Configuración de sesiones
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.use('/auth', authRoutes);

module.exports = app;
