const mongoose = require('mongoose');

const Product = require('../models/Products');

const products = [
  {
    name: 'Iron Man Action Figure',
    price: 200,
    stock: 5,
    image: 'https://res.cloudinary.com/dobzwgcvl/image/upload/v1590105272/iron-geek-ecommerce/iron-man.jpg',
  },
  {
    name: 'Captain America Action Figure',
    price: 180,
    stock: 0,
    image: 'https://res.cloudinary.com/dobzwgcvl/image/upload/v1590105272/iron-geek-ecommerce/cap-america.jpg',
  },
  {
    name: 'Hulk Action Figure',
    price: 200,
    stock: 2,
    image: 'https://res.cloudinary.com/dobzwgcvl/image/upload/v1590105272/iron-geek-ecommerce/hulk.jpg',
  },
  {
    name: 'Spider Man Action Figure',
    price: 130,
    stock: 6,
    image: 'https://res.cloudinary.com/dobzwgcvl/image/upload/v1590105272/iron-geek-ecommerce/spider-man.png',
  },
];

mongoose.connect('mongodb://heroku_5r08j4wz:ce2p637rsj75sovm4mef9u96k6@ds211268.mlab.com:11268/heroku_5r08j4wz', { useNewUrlParser: true })
  .then(() => 'connected to database');

Product.insertMany(products)
  .then(() => {
    console.log('products inserted');

    mongoose.connection.close();
  })
