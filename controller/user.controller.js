const client = require('../db');
const { ObjectID } = require('../db');

const getUser = (collection, email, password) => {
  const users = client.db('ajidefideo').collection(collection);
  const filter = {email: email, password: password};
  return users.findOne(filter)
}

module.exports = {
  findOne,
  getUser
};