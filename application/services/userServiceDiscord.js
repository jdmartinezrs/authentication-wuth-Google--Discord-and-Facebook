// src/application/services/userService.js
const MongoUserRepository = require('../../infrastructure/repositories/userRepository');
const User = require('../../domain/models/user');

class UserService {
  constructor() {
    this.userRepository = new MongoUserRepository();
  }

  async createUser(email, name) {
    const user = new User(null, email, name);
    return await this.userRepository.save(user);
  }

  async getUserById(id) {
    return await this.userRepository.findById(id);
  }

  // Encuentra o crea un usuario basado en el perfil de Discord
  async findOrCreateDiscordUser(profile) {
    const { id, username, discriminator, email } = profile;
    let user = await this.userRepository.findByDiscordId(id);

    if (!user) {
      user = new User(null, email, `${username}#${discriminator}`);
      user.discordId = id;
      await this.userRepository.save(user);
    }

    return user;
  }
}

module.exports = new UserService();
