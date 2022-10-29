const router = require('express').Router();

const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');

router.post('/upload', fileUploader.single('imageUrl'), async (req, res, next) => {
  try {
    console.log('payload', req.payload);
    console.log('arquivo:', req.file);
    console.log('body', req.body);
    if(!req.file) {
      const error = new Error('Requisição sem arquivo.');
      error.status = 400;
      throw error;
    }
    // const {username, email} = req.body;
    await User.findByIdAndUpdate(req.payload._id, { ...req.body, profileImageUrl: req.file.path });

    res.json(`Arquivo ${req.file.originalname} foi salvo com sucesso!`);
  } catch (error) {
    if (error.code === 11000) {
      error.status = 400;
      error.message = 'Nome de usuário já existe.'
    }
    next(error);
  }
});

router.get('/profile', async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const userFromDB = await User.findById(userId, {username: 1, email: 1, profileImageUrl: 1, _id: 0 });
    res.status(200).json(userFromDB);
  } catch (error) {
    next(error)
  }
})

module.exports = router;