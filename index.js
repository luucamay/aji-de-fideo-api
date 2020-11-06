const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
var ObjectID = require('mongodb').ObjectID;
const app = express();
const dotenv = require('dotenv');
dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const uri = process.env.DB_URL || 'mongodb://localhost:27017/test';
console.log(uri);
MongoClient.connect(uri, (err, db) => {
  if (err) return console.log(err)

  app.listen(3000, () => {
    console.log('app working on 3000')
  });

  let dbase = db.db("ajidefideo");

  app.post('/products', (req, res, next) => {

    let newProduct = {
      name: req.body.name,
      price: req.body.price,
      image: 'image url',
      type: req.body.type,
      dataEntry: new Date()
    };

    dbase.collection("products").insertOne(newProduct, (err, result) => {
      if (err) {
        console.log(err);
      }

      res.send('product added successfully');
    });

  });

  app.get('/products', (req, res, next) => {
    dbase.collection('products').find().toArray((err, results) => {
      res.send(results)
    });
  });

  app.get('/products/:productId', (req, res, next) => {
    dbase.collection("products")
      .findOne({ _id: ObjectID(req.params.productId) }).then(result => {
        if (result) {
          res.send(result);
        } else {
          console.log(`Product not found`);
        }
      });
  });

  app.put('/products/:productId', (req, res, next) => {

    dbase.collection("products").updateOne({ _id: ObjectID(req.params.productId) }, { $set: req.body }, (err, result) => {
      if (err) {
        throw err;
      }

      res.send('product updated sucessfully');
    });
  });


  app.delete('/products/:productId', (req, res, next) => {
    let id = ObjectID(req.params.productId);

    dbase.collection('products').deleteOne({ _id: id }, (err, result) => {
      if (err) {
        throw err;
      }

      res.send('product deleted');
    });
  });

});
