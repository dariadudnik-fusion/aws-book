const { responseBuilder, errorBuilder } = require("../helpers/response");
const { getBooks } = require("../data/getBooks");
const { getUserById } = require("../data/getUserById");
const { validateMethod } = require('../helpers/validation');
const { connectToDB } = require('../helpers/connectToDB');
const { dbConnect } = require('../config');


exports.handler = async (event) => {
    try {
        const { pathParameters, requestContext } = event;
        const httpMethod = requestContext.http.method;
        const id = pathParameters.id;
        validateMethod(httpMethod, "GET");
            
        const { Book } = await connectToDB(dbConnect, false);
        const list = await Book.findAll();
        const listFromApi = await getBooks();
        const user = getUserById(id);

        return responseBuilder("200", { booksFromDb: list, apiList: listFromApi, user });
    } catch (error) {
        return errorBuilder(error);
    }
};
