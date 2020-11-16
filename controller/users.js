const client = require('../db');
const { ObjectID } = require('../db');

const getUsers = (page, limit) => {
  const users = client.db('ajidefideo').collection('users');

  return users.estimatedDocumentCount()
    .then(userCount => {
      const lastPage = Math.ceil(userCount / limit);
      // TODO: Check for number parameters

      if (page < 1)
        page = 1;
      if (page > lastPage)
        page = lastPage;
      if (limit > userCount)
        limit = userCount;
      if (limit < 0)
        limit = 0;
      const skip = (page * limit) - limit;
      if (page == lastPage) { // TODO: Change to numbers page and limit
        limit = userCount - skip;
      }

      const options = {
        projection: { password: 0 },
        skip,
        limit,
      }

      const query = {};
      return users.find(query, options).toArray();

    })
    .catch(err => next(503))
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