const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
require('./database/mongoose');

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  };

  middlewares = () => {
    this.app.use(express.json());
  };

  routes = () => {
    this.app.use('/api', apiRoutes);
  };
}

module.exports = new App().app;
