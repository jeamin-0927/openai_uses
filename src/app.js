require('dotenv').config();
const express = require('express');

const fs = require('fs');
const cors = require('cors');

const { serviceRouter } = require('./services');

const PORT = process.env.PORT;

class App {
  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.initRouter();
    this.openServer();
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  initRouter() {
    this.app.use('/', serviceRouter);
    /*fs.readdirSync('./src/services').forEach((service) => {
      this.app.use('/' + service , require(`./services/${service}`));
    });*/
  }

  openServer() {
    this.app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  }
}

module.exports = new App().app;