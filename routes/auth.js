const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');

// get config vars
dotenv.config();

const secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';

module.exports = (app, nextMain) => {
  // asynchronous function
  app.post('/auth', (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      //return res.status(400).json({ error: "Please provide email and password" });
      return next(400);
    }
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
          // return res.status(200).send({ token });
        }
      });
  });
  return nextMain();
}
const generateAccessToken = (user) => {
  // Use email from user to generate the token
  return jwt.sign(user, secret, { expiresIn: '1h' });
}
