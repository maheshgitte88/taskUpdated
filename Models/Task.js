const mongoose = require('mongoose');
const Joi = require('joi');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    validate: {
      validator: (value) => {
        const schema = Joi.string().min(3).max(250).required();
        const { error } = schema.validate(value);
        return !error;
      },
      message: 'Title validation failed'
    }
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    validate: {
      validator: (value) => {
        const schema = Joi.string().min(10).required();
        const { error } = schema.validate(value);
        return !error;
      },
      message: 'Description validation failed'
    }
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: (value) => {
        const schema = Joi.required();
        const { error } = schema.validate(value);
        return !error;
      },
      message: 'User validation failed'
    }
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
