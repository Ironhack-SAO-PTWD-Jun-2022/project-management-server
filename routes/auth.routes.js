const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

// middlewares
const { isAuthenticated } = require('../middlewares/jwt.middleware');

const User = require('../models/User.model');

const SALT_ROUNDS = 10;

// cadastro de usuário
router.post('/signup', async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      const error = new Error('Campos do formulário são obrigatórios!');
      error.status = 400;
      throw error;
      // res.status(400).json('Campos do formulário são obrigatórios!');
      // return;
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!regex.test(password)) {
      const error = new Error('Senha precisa de ao menos 1 letra minúscula, 1 letra maiúscula, 1 número e ao menos 6 caracteres.')
      error.status = 400;
      throw error;
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    
    const userFromDB = await User.create({
      username,
      email,
      passwordHash: hash,
    });

    res.status(201).json(userFromDB);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError) {
      res.status(400).json(error.message);
      return;
    }
    if(error.code === 11000) {
      res.status(500).json('Nome de usuário ou email já existe.');
      return;
    }
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if(!email || !password) {
      return res.status(400).json('Os campos email e senha são obrigatórios.');
    }

    // buscando usuário pelo email;
    const userFromDB = await User.findOne({ email });

    // caso eu não encontre usuário, respondo com status 401, não autorizado.
    if(!userFromDB) {
      return res.status(401).json('Usuário ou senha não encontrados.');
    }

    // comparo a senha com o hash q estava no banco de dados
    const verify = bcrypt.compareSync(password, userFromDB.passwordHash);

    // caso senha não valide o hash, respondo com status 401, não autorizado.
    if (!verify) {
      return res.status(401).json('Usuário ou senha não encontrados.');
    }

    // const { _id, username, email } = userFromDB;
    // const payload = { _id, username, email };

    // informações q vão dentro do token
    const payload = {
      _id: userFromDB._id,
      username: userFromDB.username,
      email: userFromDB.email,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '6h'
      }
    )

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

router.get('/verify', isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
})

module.exports = router;