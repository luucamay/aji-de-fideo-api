let client = require('../db');

const getAll = (req, res, next) => {
  let products = client.db('ajidefideo').collection('products');
  products.find().toArray((err, results) => {
    res.send(results)
  });
}

module.exports = {
  getAll
};