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

module.exports = {
  getAll,
  getById
};