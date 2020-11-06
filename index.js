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
MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((client) => {
    app.listen(3000, () => {
      console.log('app working on 3000')
    });

    const dbase = client.db("ajidefideo");

    app.post('/products', (req, res, next) => {

      let newProduct = {
        name: req.body.name,
        price: req.body.price,
        image: 'image url',
        type: req.body.type,
        dataEntry: new Date()
      };

      dbase.collection("products").insertOne(newProduct)
        .then(result => {
          res.send('product added successfully');
        })
        .catch(console.error);

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
      const filter = { _id: ObjectID(req.params.productId) };
      const updateDocumentProduct = { $set: req.body };
      dbase.collection("products").updateOne(filter, updateDocumentProduct)
        .then(() => {
          res.send('product updated sucessfully');
        })
        .catch(console.error);
    });


    app.delete('/products/:productId', (req, res, next) => {
      const filter = { _id: ObjectID(req.params.productId) };

      dbase.collection('products').deleteOne(filter)
        .then(() => {
          // TO DO: check here about deleted code!
          res.send('product deleted');
        })
        .catch(console.error);
    });

  })
  .catch(console.error);
