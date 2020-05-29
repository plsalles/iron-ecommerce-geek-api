const Product = require('../../models/Products');
const ProductsMapper = require('./products.mapper');

class ProductsControler {
  listAll = (req, res) => {
    Product.find()
      .then((data) => {
        const response = ProductsMapper.allProducts(data);

        res.status(200).json(response);
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
