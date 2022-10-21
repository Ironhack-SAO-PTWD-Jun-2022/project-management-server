const bcrypt = require('bcryptjs');
const router = require('express').Router();

const User = require('../models/User.model');

const SALT_ROUNDS = 10;

// cadastro de usuário
router.post('/signup', async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    
    const userFromDB = await User.create({
      username,
      email,
      passwordHash: hash,
    });

    res.status(201).json(userFromDB);
  } catch (error) {
    res.status(error.status || 500).json({ msg: 'Erro ao cadastrar usuário', error: error.message || error});
  }
});

module.exports = router;