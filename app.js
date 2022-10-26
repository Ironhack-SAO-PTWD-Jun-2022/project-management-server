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
const { isAuthenticated } = require('./middlewares/jwt.middleware');

// rotas
// const projectRoutes = require('./routes/project.routes')
app.use('/auth', require('./routes/auth.routes')); // autenticação
app.use('/users', isAuthenticated, require('./routes/user.routes')); // usuário
app.use('/projects', isAuthenticated, require('./routes/project.routes')); // projetos
app.use('/tasks', isAuthenticated, require('./routes/task.routes')); // tarefas

const handleError = require('./error-handling');
handleError(app);

module.exports = app;