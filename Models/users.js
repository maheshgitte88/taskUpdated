const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    validate: {
      validator: (value) => {
        const schema = Joi.string().min(3).required();
        const { error } = schema.validate(value);
        return !error;
      },
      message: 'Username validation failed'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        const schema = Joi.string().email().required();
        const { error } = schema.validate(value);
        return !error;
      },
      message: 'Email validation failed'
    }
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
