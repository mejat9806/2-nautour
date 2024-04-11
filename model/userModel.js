import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

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
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'please enter password'],
    minLength: 8,
    select: false, //this is not show up when we fetch the user
  },
  passwordConfirmed: {
    type: String,
    required: [true, 'please enter password again'],
    validate: {
      validator: function (el) {
        //this only works on CREATE/SAVE
        return el === this.password;
      },
      message: 'passwords do not match ',
    },
  },
  passwordChangedAt: Date,
});

// eslint-disable-next-line prefer-arrow-callback
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); //this isModified('fields') will check if certain fields are modified or not
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirmed = undefined; //use undefined because we want to delete the password confirmation because it only use for input validation
});

//!instead method //is a method that avaliable for certain collection
userSchema.methods.correctPassword = async function (
  //methd bassically allow us to add methods(method is like function) to certain model
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
//!

userSchema.methods.changedPasswordAfter = function (JWTtimestamp) {
  //JWTtimestamp is when the JWT is created
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTtimestamp < changedTimeStamp;
  }
  return false; //if the password was not changed
};

export const User = mongoose.model('User', userSchema);
