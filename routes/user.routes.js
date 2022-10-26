const router = require('express').Router();

const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');

router.post('/upload', fileUploader.single('imageUrl'), async (req, res, next) => {
  try {
    console.log('payload', req.payload);
    console.log('arquivo:', req.file);
    if(!req.file) {
      const error = new Error('Requisição sem arquivo.');
      error.status = 400;
      throw error;
    }
    await User.findByIdAndUpdate(req.payload._id, { profileImageUrl: req.file.path });

    res.json(`Arquivo ${req.file.originalname} foi salvo com sucesso!`)
  } catch (error) {
    next(error);
  }
});

// router.get('/profile')

module.exports = router;