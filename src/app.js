require('dotenv').config();

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

require('./database/mongoose');

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  };

  middlewares = () => {
    this.app.use(express.static(__dirname + '/src/public'));
    this.app.use(express.json());
    this.app.use(cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }))
  };

  routes = () => {
    this.app.use('/api', apiRoutes);
    this.app.use((req, res, next) => {
      // If no routes match, send them the React HTML.
      res.sendFile(__dirname + "/public/index.html");
    });
  };
}

module.exports = new App().app;
