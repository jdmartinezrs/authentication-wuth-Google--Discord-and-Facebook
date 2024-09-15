const { MongoClient } = require("mongodb");

class ConnectToDatabase {
  static instanceConnect;
  db;
  connection;
  user;
  #password;

  constructor({ user = process.env.MONGO_USER, pwd = process.env.MONGO_PWD } = {}) {
    if (ConnectToDatabase.instanceConnect) {
      return ConnectToDatabase.instanceConnect;
    }
    this.user = user;
    this.setPassword = pwd;
    ConnectToDatabase.instanceConnect = this;
  }

  async connectOpen() {
    if (this.connection && this.connection.isConnected()) {
      return; // Already connected
    }

    this.connection = new MongoClient(
      `mongodb://${this.user}:${encodeURIComponent(this.getPassword)}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`
    );

    try {
      await this.connection.connect();
      this.db = this.connection.db(process.env.MONGO_DB_NAME);
    } catch (error) {
      this.connection = undefined;
      console.error('Error connecting to MongoDB:', error);
      throw new Error('Error connecting to MongoDB');
    }
  }

  async connectClose() {
    if (this.connection) {
      await this.connection.close();
    }
  }

  get getPassword() {
    return this.#password;
  }

  set setPassword(pwd) {
    this.#password = pwd;
  }
}

module.exports = ConnectToDatabase;
