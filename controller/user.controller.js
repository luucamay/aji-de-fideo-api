const client = require('../db');
const { ObjectID } = require('../db');

const getUserByEmail = (collection, email) => {
  const users = client.db('ajidefideo').collection(collection);
  return users.findOne({email})
}

module.exports = {
  getUserByEmail
};