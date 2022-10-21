const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'campo username é obrigatório!'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'campo email é obrigatório!'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, 'campo passwordHash é obrigatório'],
  },
}, { timestamps: true });

module.exports = model('User', userSchema);