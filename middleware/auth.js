const jwt = require('jsonwebtoken');
const users = require('../controller/users');

module.exports = (secret) => (req, res, next) => {
  // authorization is a string, looks like: "TYPE TOKEN"
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  // TODO: Check what happens if type is empty
  // Make sure the type of authentication is bearer
  if (type.toLowerCase() !== 'bearer') {
    return next(); // invalid authentication
  }

  jwt.verify(token, secret, function (err, decodedToken) {
    if (err) {
      console.log(err.message);
      return next(403); // token invalid
    }
    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
    // decodeToken is an object that has an uid property
    users.getUserById(decodedToken.uid)
      .then((user) => {
        if (!user)
          next(401); // not user found
        // TODO: Ask if add user to request or to the body of request?
        req.user = user;
        next();
      })
      .catch(err => next(400)) // bad request. TODO: with or without number???
  });
};

module.exports.isAuthenticated = (req) => {
  if (req.user) {
    console.log(req.user);
    return true;
  }
  return false;
};

module.exports.isAdmin = (req) => {
  if (req.user.roles.admin) {
    return true;
  }
  return false;
};

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);