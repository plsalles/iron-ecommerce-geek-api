const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  image: [{ type: String, required: true }],
});

const Products = mongoose.model('Product', ProductSchema);

module.exports = Products;
