const {
  requireAuth,
  requireAdmin,
  requireSameUserOrAdmin,
} = require('../middleware/auth');

const {
  getUsers,
  getOneUser,
  createUser
} = require('../controller/users');
const { response } = require('express');

/** @module users */
module.exports = (app, nextMain) => {
  /**
   * @name GET /users
   * @description Lista usuarias
   * @path {GET} /users
   * @query {String} [page=1] Página del listado a consultar
   * @query {String} [limit=10] Cantitad de elementos por página
   * @header {Object} link Parámetros de paginación
   * @header {String} link.first Link a la primera página
   * @header {String} link.prev Link a la página anterior
   * @header {String} link.next Link a la página siguiente
   * @header {String} link.last Link a la última página
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @response {Array} users
   * @response {String} users[]._id
   * @response {Object} users[].email
   * @response {Object} users[].roles
   * @response {Boolean} users[].roles.admin
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es ni admin
   */
  app.get('/users', requireAdmin, (req, res, next) => {
    getUsers()
      .then((users) => {
        // TODO: Do not return user passwords!!!
        if (!users)
          return res.status(200).json({ "users": [] });
        return res.status(200).json({ users });
      })
      .catch(err => next(503));
  });

  /**
   * @name GET /users/:uid
   * @description Obtiene información de una usuaria
   * @path {GET} /users/:uid
   * @params {String} :uid `id` o `email` de la usuaria a consultar
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin** o la usuaria a consultar
   * @response {Object} user
   * @response {String} user._id
   * @response {Object} user.email
   * @response {Object} user.roles
   * @response {Boolean} user.roles.admin
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es ni admin o la misma usuaria
   * @code {404} si la usuaria solicitada no existe
   */
  app.get('/users/:uid', requireSameUserOrAdmin, (req, res) => {
    const uid = req.params.uid;
    getOneUser(uid)
      .then(user => {
        if (!user)
          return res.status(200).send({ message: "User not found" });
        delete user.password;
        res.status(200).json(user);
      })
      .catch(err => res.status(400).send({ message: err.message }));
  });

  /**
   * @name POST /users
   * @description Crea una usuaria
   * @path {POST} /users
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @body {Object} [roles]
   * @body {Boolean} [roles.admin]
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @response {Object} user
   * @response {String} user._id
   * @response {Object} user.email
   * @response {Object} user.roles
   * @response {Boolean} user.roles.admin
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si ya existe usuaria con ese `email`
   */
  app.post('/users', requireAdmin, (req, res, next) => {
    const { email, password, roles } = req.body;

    if (!email || !password)
      return res.status(400).send('Please send email and password');

    if (!emailIsValid(email))
      return res.status(500).send('Please use a valid email');

    const user = { email, password };
    // TODO: check if the email is valid with a regex?
    // TODO: Validate roles object - JSON schema?
    if (roles) {
      user.roles = roles;
    }

    createUser(user)
      .then((result) => {
        // result.ops has the array of documents inserted, see the docs below:
        // http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~insertOneWriteOpResult
        const userInserted = result.ops[0];
        delete userInserted.password;
        res.status(200).json(userInserted);
      })
      .catch(err => {
        // res.send('User already exists)
        next(403);
      })
  });

  nextMain();
};

const emailIsValid = (email) => {
  return /\S+@\S+\.\S+/.test(email)
}