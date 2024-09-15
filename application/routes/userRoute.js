// src/application/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para iniciar sesión con Facebook
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Ruta de callback de Facebook
router.get('/auth/facebook/callback', authController.authenticateWithFacebook);

module.exports = router;
