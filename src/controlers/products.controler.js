const Product = require('../models/Products');

class ProductsControler {
  listAll = (req, res) => {
    Product.find()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  };

  listOne = (req, res) => {

  };

  store = (req, res) => {

  };

  editOne = (req, res) => {

  };

  deleteOne = (req, res) => {

  };
}

module.exports = new ProductsControler();
