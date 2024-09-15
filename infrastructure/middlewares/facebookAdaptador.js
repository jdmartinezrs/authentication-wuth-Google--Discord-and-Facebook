// src/infrastructure/authentication/facebookAuthAdapter.js
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const AuthenticationPort = require('../../domain/authentication/authenticationPort');

// Configura Passport con la estrategia de Facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  (accessToken, refreshToken, profile, done) => {
    // Puedes hacer más aquí, como guardar el perfil en la base de datos
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

class FacebookAuthAdapter extends AuthenticationPort {
  async authenticateUser(req, res, next) {
    return new Promise((resolve, reject) => {
      passport.authenticate('facebook', (err, user, info) => {
        if (err) {
          return reject(err);
        }
        if (!user) {
          return reject(new Error('Authentication failed'));
        }
        resolve(user);
      })(req, res, next);
    });
  }
}

module.exports = FacebookAuthAdapter;
