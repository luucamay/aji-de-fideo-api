const express = require('express');
const app = express();

const client = require('./db');
const products = require('./controller/product.controller');
const bodyParser = require('body-parser');

// var ObjectID = require('mongodb').ObjectID;

const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.DB_URL || 'mongodb://localhost:27017/test';

// const dbase = client.db("ajidefideo");

app.post('/products', products.create);

app.get('/products', products.getAll);

app.get('/products/:productId', products.getById);

app.put('/products/:productId', products.update);


app.delete('/products/:productId', (req, res, next) => {
  const filter = { _id: ObjectID(req.params.productId) };

  dbase.collection('products').deleteOne(filter)
    .then(() => {
      // TO DO: check here about deleted code!
      res.send('product deleted');
    })
    .catch(console.error);
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
