const express = require('express');

// pacotes de configuração
const logger = require('morgan');
const cors = require('cors');

const config = (app) => {
  app.set('trust proxy', 1);

  app.use(cors()); // cors aberto para o público em geral.

  app.use(logger('dev'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }))
}

module.exports = config;