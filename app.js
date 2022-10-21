// pacotes
require('dotenv/config');
const express = require('express');

// DB
require('./db');

const app = express();

// configurações
const config = require('./config');
config(app);
// require('./config')(app); // mesma coisa q as 2 linhas de cima

// middlewares

// rotas
// const projectRoutes = require('./routes/project.routes')
app.use('/auth', require('./routes/auth.routes')) // autenticação
app.use('/projects', require('./routes/project.routes')); // projetos
app.use('/tasks', require('./routes/task.routes')); // tarefas

module.exports = app;