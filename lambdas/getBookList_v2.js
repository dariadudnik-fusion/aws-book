const { responseBuilder, errorBuilder } = require("../helpers/response");
const { validateMethod } = require('../helpers/validation');
const SequelizeClient = require("../helpers/connectToDb_v2.js");
const { dbConnect } = require('../config');

exports.handler = async (event) => {
    try {
        const { pathParameters, requestContext } = event;
        const httpMethod = requestContext.http.method;
        const id = pathParameters.id;
        validateMethod(httpMethod, "GET");
        const sequelize = await SequelizeClient.getSequelize(dbConnect);
        const { Book } = await SequelizeClient.getModels(sequelize);
        const list = await Book.findAll();

        return responseBuilder("200", list);
    } catch (error) {
         console.log(error, "error")
        return errorBuilder(error);
    } finally {
      SequelizeClient.closeConnections();
  }
};
