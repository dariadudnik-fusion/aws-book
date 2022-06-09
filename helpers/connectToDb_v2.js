const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../models/user");
const BookModel = require("../models/book");

let sequelize = null;
let models = null;

module.exports = class SequelizeClient {
  constructor() {}

  static async getSequelize(configuration, options){
    if(!sequelize){
      console.log('no connection')
      sequelize = await SequelizeClient.#loadSequelize(configuration, options)
    }

    if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
      delete sequelize.connectionManager.getConnection;
    }

    return sequelize;
  }
 
  static #initSequelize(options) {
    return new Sequelize(
      options.database,
      options.user,
      options.password,
      {
        host: options.host,
        port: parseInt(options.port) || 5432,
        logging: console.log,
        dialect: "postgres",
      }
    );
  }
 
  static async #loadSequelize(configuration, options) {
    sequelize = SequelizeClient.#initSequelize(configuration);

    if (options?.needToSync) {
      console.log("sync");
      await sequelize.sync();
    } else {
      console.log("authenticate");
      await sequelize.authenticate();
    }

    return sequelize;
  }

  static async getModels(sequelize) {
    if (models) {
      return models;
    }
    const User = await UserModel(sequelize, DataTypes);
    const Book = await BookModel(sequelize, DataTypes);

    models = { User, Book };

      Object.keys(models).forEach((modelName) => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });

    return models;
  }

  static closeConnections() {
    sequelize.connectionManager.close();
  }
};
