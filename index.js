const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
var ObjectID = require('mongodb').ObjectID;
const app = express();
const dotenv = require('dotenv');
dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const uri = process.env.DB_URL || 'mongodb://localhost:27017/test';
console.log(uri);
MongoClient.connect(uri, (err, db) => {
  if (err) return console.log(err)

  app.listen(3000, () => {
    console.log('app working on 3000')
  });

  let dbase = db.db("ajidefideo");

  app.post('/name/add', (req, res, next) => {

    let name = {
      first_name: req.body.first_name,
      last_name: req.body.last_name
    };

    dbase.collection("name").save(name, (err, result) => {
      if(err) {
        console.log(err);
      }

      res.send('name added successfully');
    });

  });

  app.get('/products', (req, res, next) => {
    dbase.collection('products').find().toArray( (err, results) => {
      res.send(results)
    });
  });

  app.get('/name/:id', (req, res, next) => {
    if(err) {
      throw err;
    }

    let id = ObjectID(req.params.id);
    dbase.collection('name').find(id).toArray( (err, result) => {
      if(err) {
        throw err;
      }

      res.send(result);
    });
  });

  app.put('/name/update/:id', (req, res, next) => {
    var id = {
      _id: new ObjectID(req.params.id)
    };

    dbase.collection("name").update(id, {$set:{first_name: req.body.first_name, last_name: req.body.last_name}}, (err, result) => {
      if(err) {
        throw err;
      }

      res.send('user updated sucessfully');
    });
  });


  app.delete('/name/delete/:id', (req, res, next) => {
    let id = ObjectID(req.params.id);

    dbase.collection('name').deleteOne({_id: id}, (err, result) => {
      if(err) {
        throw err;
      }

      res.send('user deleted');
    });
  });

});
