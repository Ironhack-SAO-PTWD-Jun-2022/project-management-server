// pacotes
require('dotenv/config');
const express = require('express');

// DB
require('./db');

const app = express();

// middlewares
app.use(express.json());

// rotas
// const projectRoutes = require('./routes/project.routes')
app.use('/projects', require('./routes/project.routes'));

module.exports = app;