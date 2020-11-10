const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');

// get config vars
dotenv.config();

const secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
console.log(secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const generateAccessToken = (user) => {
  // Use email from user to generate the token
  return jwt.sign(user, secret, { expiresIn: '1h' });
}

app.post('/auth', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(400);
  }
  // TO DO only create token if user is in the database
  const token = generateAccessToken({ email: req.body.email });
  console.log("here is your token", token);
  res.json(token);
  // TO DO should I use the next function?
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});