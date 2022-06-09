const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../models/user");
const BookModel = require("../models/book");

const initSequelize = (option) => {
  return new Sequelize(
    option.database,
    option.user,
    option.password,
    {
      host: option.host,
      port: parseInt(option.port) || 5432,
      logging: console.log,
      dialect: "postgres",
    }
  );
};
 
exports.connectToDB = async (dbConnect, needToSync) => {
  let sequelize = initSequelize(dbConnect);
  const connection = {};
  const User = await UserModel(sequelize, DataTypes);
  const Book = await BookModel(sequelize, DataTypes);
  const Models = { User, Book };
  
  Object.keys(Models).forEach((modelName) => {
    if ("associate" in Models[modelName]) {
      Models[modelName].associate(Models);
    }
  });
  if (connection.isConnected) {
    console.log("=> Using existing connection.");
    return Models;
  }
  
  if (needToSync) {
    console.log("sync");
    await sequelize.sync();
  }
    console.log("authenticate");
  await sequelize.authenticate();
  connection.isConnected = true;
  console.log("=> Created a new connection.");

  return Models;
};
