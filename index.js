const express = require('express');
const dotenv = require('dotenv');

const client = require('./db');
const authMiddleware = require('./middleware/auth');
const routes = require('./routes');
const pkg = require('./package.json');

dotenv.config();
const port = process.env.PORT || '3000';
const uri = process.env.DB_URL || 'mongodb://localhost:27017/test';
const secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
const app = express();

app.set('pkg', pkg);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware(secret));

// Register routes
routes(app, (err) => {
  if (err) {
    throw err;
  }
  // connect to Mongo on start
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

});


