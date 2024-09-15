// src/infrastructure/repositories/userRepository.js
const { ObjectId } = require('mongodb');
const UserRepository = require('../../domain/repositories/userRepository');
const User = require('../../domain/models/user');
const { connect } = require('../database/mongoClient');

class MongoUserRepository extends UserRepository {
  async save(user) {
    const db = await connect();
    const collection = db.collection('users');

    const result = await collection.insertOne({
      email: user.email,
      name: user.name,
      discordId: user.discordId,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return new User(result.insertedId, user.email, user.name);
  }

  async findById(id) {
    const db = await connect();
    const collection = db.collection('users');

    const userDoc = await collection.findOne({ _id: new ObjectId(id) });
    if (!userDoc) {
      return null;
    }

    return new User(userDoc._id, userDoc.email, userDoc.name);
  }

  // Encuentra un usuario por su ID de Discord
  async findByDiscordId(discordId) {
    const db = await connect();
    const collection = db.collection('users');

    const userDoc = await collection.findOne({ discordId });
    if (!userDoc) {
      return null;
    }

    return new User(userDoc._id, userDoc.email, userDoc.name);
  }
}

module.exports = MongoUserRepository;
