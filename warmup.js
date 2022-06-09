const warmupChecker = (event, callback) => {
  if (event.trigger === 'warmup') {
    return 'Warming';
  }
  return callback(event);
};

// враппер 
export const exportedFunctions = (functionList) =>
  Object.keys(functionList).reduce((result, item) => {
    result[item] = (event) => {
      return warmupChecker(event, functionList[item]);
    };
    return result;
  }, {});

// сам хэндлер
const getBooks = async (event) => {
  const page = event.queryStringParameters.page || 1;
  try {
    const list = await getBookList(page);
    return responseBuilder(200, list);
  } catch (error) {
    return errorBuilder(error);
  }
};

// как экспортится
const functionList = {
  getBooks
};

module.exports = exportedFunctions(functionList);





