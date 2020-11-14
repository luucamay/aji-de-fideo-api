const express = require('express');
const dotenv = require('dotenv');

const client = require('../db');
const authMiddleware = require('../middleware/auth');

dotenv.config();
const port = process.env.PORT || '3000';
const uri = process.env.DB_URL || 'mongodb://localhost:27017/test';
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', authMiddleware, (req, res) => {
  res.send('Hello World!')
})


client.connect(uri, (err) => {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.info(`App listening on port ${port}`);
    });
  }
});
