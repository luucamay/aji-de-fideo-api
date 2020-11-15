const client = require('../db');
const { ObjectID } = require('../db');

const getUsers = () => {
  const users = client.db('ajidefideo').collection('users');
  const query = {};
  const options = {
    projection: { password: 0 },
  }
  return users.find(query, options).toArray();
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

const createUser = (newUser) => {
  const users = client.db('ajidefideo').collection('users');
  return users.insertOne(newUser);
}

const updateUser = (uid, updateFields) => {
  const users = client.db('ajidefideo').collection('users');
  const updateDocumentUser = { $set: updateFields };
  const options = {
    projection: { password: 0 },
    returnOriginal: false
  }
  try {
    const filter = { _id: ObjectID(uid) };
    return users.findOneAndUpdate(filter, updateDocumentUser, options);
  } catch {
    const filter = { email: uid };
    return users.findOneAndUpdate(filter, updateDocumentUser, options);
  }
}

const deleteUser = (uid) => {
  let filter = {};
  try {
    filter = { _id: ObjectID(uid) };
  }
  catch {
    filter = { email: uid };
  }
  const users = client.db('ajidefideo').collection('users');
  const options = { projection: { password: 0 } }
  return users.findOneAndDelete(filter, options);
}

module.exports = {
  getOneUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};