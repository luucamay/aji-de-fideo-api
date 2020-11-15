const client = require('../db');
const { ObjectID } = require('../db');

const getUsers = () => {
  const users = client.db('ajidefideo').collection('users');
  return users.find().toArray();
}

const getOneUser = (uid) => {
  const users = client.db('ajidefideo').collection('users');
  try {
    const id = ObjectID(uid);
    return users.findOne({ _id: id })
  } catch {
    return users.findOne({ "email": uid });
  }
}
module.exports = {
  getOneUser,
  getUsers
};