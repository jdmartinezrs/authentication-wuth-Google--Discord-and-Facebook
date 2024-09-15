// src/application/controllers/authController.js
const FacebookAuthAdapter = require('../../infrastructure/authentication/facebookAuthAdapter');
const facebookAuthAdapter = new FacebookAuthAdapter();

class AuthController {
  async authenticateWithFacebook(req, res, next) {
    try {
      const user = await facebookAuthAdapter.authenticateUser(req, res, next);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
