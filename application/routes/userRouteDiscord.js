// src/application/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Ruta para iniciar la autenticación con Discord
router.get('/discord', passport.authenticate('discord'));

// Ruta para manejar el callback de Discord
router.get('/discord/callback', passport.authenticate('discord', {
  failureRedirect: '/'
}), (req, res) => {
  // Autenticación exitosa, redirigir al usuario
  res.redirect('/profile');
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
