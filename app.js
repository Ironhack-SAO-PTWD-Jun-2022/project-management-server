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
app.use('/projects', require('./routes/project.routes')); // projetos
app.use('/tasks', require('./routes/task.routes')); // tarefas



module.exports = app;