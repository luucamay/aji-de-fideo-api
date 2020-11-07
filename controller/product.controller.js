const client = require('../db');
const { ObjectID } = require('../db');

const getAll = (req, res, next) => {
  let products = client.db('ajidefideo').collection('products');
  products.find().toArray((err, results) => {
    res.send(results)
  });
}

const getById = (req, res, next) => {
  let products = client.db('ajidefideo').collection('products');
  products.findOne({ _id: ObjectID(req.params.productId) })
    .then(result => {
      if (result) {
        res.send(result);
      } else {
        console.log(`Product not found`);
      }
    });
}

const create = (req, res, next) => {

  let newProduct = {
    name: req.body.name,
    price: req.body.price,
    image: 'image url',
    type: req.body.type,
    dataEntry: new Date()
  };
  let products = client.db('ajidefideo').collection('products');
  products.insertOne(newProduct)
    .then(result => {
      res.send('product added successfully');
    })
    .catch(console.error);

}

module.exports = {
  getAll,
  getById,
  create
};