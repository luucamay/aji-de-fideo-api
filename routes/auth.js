const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const users = require('../controller/user.controller');

// get config vars
dotenv.config();

const secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  // asynchronous function
  app.post('/auth', (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      //return res.status(400).json({ error: "Please provide email and password" });
      return next(400);
    }

    // Authenticate user
    users.getUserByEmail('users', email)
      .then((user) => {
        if (!user)
          //return res.status(404).json({ error: "User not found!" });
          next(404);
        else if (user.password !== password)
          // res.status(400).json({ error: "Wrong password" })
          next(400);
        else {
          const token = generateAccessToken({ email, password });
          return res.status(200).json({ token });
        }
      });
  });
  return nextMain();
}

const generateAccessToken = (user) => {
  return jwt.sign(user, secret, { expiresIn: '1h' });
}
