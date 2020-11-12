const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';

module.exports = (req, res, next) => {
  try {
    // authorization is a string, looks like: "TYPE TOKEN"
    const { authorization } = req.headers;

    if (!authorization) {
      return next();
    }

    const [type, token] = authorization.split(' ');

    // Make sure the type of authentication is bearer
    if (type.toLowerCase() !== 'bearer') {
      return next();
    }

    jwt.verify(token, secret, function (err, decodedToken) {
      if (err) {
        console.log(err.message);
        return next(403);
      }
      // TODO: Verificar identidad del usuario usando `decodeToken.uid`
      // decodeToken is an object that has an uid property

      next();
    });
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};