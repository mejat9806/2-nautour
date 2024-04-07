import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'name is required'] },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'email is already exist'],
  },
  photo: { type: String },
  password: {
    type: String,
    required: [true, 'please enter password'],
    minLength: 8,
  },
  passwordConfirmed: {
    type: String,
    required: [true, 'please enter password again'],
  },
});

export const User = mongoose.model('User', userSchema);
