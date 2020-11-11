const express = require('express');
const app = express();

const client = require('./db');
const users = require('./controller/user.controller');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.DB_URL || 'mongodb://localhost:27017/test';
const secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';

const generateAccessToken = (user) => {
  // Use email from user to generate the token
  return jwt.sign(user, secret, { expiresIn: '1h' });
}

// asynchronous function
app.post('/auth', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }
  users.getUser('users', email, password).then(
    (user) => {
      if (!user)
        return res.status(404).json({ error: "User email or password not found!" });
      const token = generateAccessToken({ email, password });
      res.status(200);
      res.json({ token });
    }
  )
});

// connect to Mongo on start
client.connect(uri, (err) => {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log('Listening on port 3000...');
    });
  }
});
