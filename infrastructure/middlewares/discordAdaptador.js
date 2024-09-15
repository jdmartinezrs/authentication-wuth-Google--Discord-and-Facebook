// src/infrastructure/auth/discordStrategy.js
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const UserService = require('../../application/services/userService'); // Asegúrate de que el servicio esté configurado correctamente

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DISCORD_CALLBACK_URL,
  scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Aquí puedes usar el perfil para encontrar o crear un usuario en tu base de datos
    const user = await UserService.findOrCreateDiscordUser(profile);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserService.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
