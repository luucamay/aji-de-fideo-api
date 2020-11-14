const client = require('../db');
const { ObjectID } = require('../db');

const getUserByEmail = (email) => {
  const users = client.db('ajidefideo').collection('users');
  return users.findOne({ email })
}

const getUserById = (id) => {
  const users = client.db('ajidefideo').collection('users');
  return users.findOne({ _id: ObjectID(id) })
}

const getUsers = () => {
  const users = client.db('ajidefideo').collection('users');
  return users.find();
}

module.exports = {
  getUserByEmail,
  getUserById
};