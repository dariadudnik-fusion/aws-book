const { connectToDB } = require('../helpers/connectToDB');
const { notFound } = require('../helpers/errors');
const { dbConnect } = require('../config');

exports.getUserById = async (id) => {
  const { User } = await connectToDB(dbConnect, false);
  const user = await User.findByPk(id);

  if(!user) throw notFound('User not found');

  return user;
};
