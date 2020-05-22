const mongoose = require('mongoose');

module.exports = mongoose.connect(
  'mongodb://localhost/iron-geek-ecommerce',
  { useNewUrlParser: true, useUnifiedTopology: true },
).then(() => console.log('Comnected in database'));
