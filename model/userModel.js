import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'must be a valid email'],
  },
  photo: { type: String, default: 'default.jpg' },
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
  active: { type: Boolean, default: true, select: false },
  passwordChangedAt: Date,
  passwordResetToken: String,
  isValidated: { type: Boolean, default: false, select: false },
  passwordResetExpired: Date,
});

userSchema.pre('save', async function (next) {
  //!turn this back on for deployment
  //this is for encrything the password
  if (!this.isModified('password')) return next(); //this isModified('fields') will check if certain fields are modified or not
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirmed = undefined; //use undefined because we want to delete the password confirmation because it only use for input validation
});

userSchema.pre('save', function (next) {
  // This middleware will run when the password is modified, except when a new user is created.
  // It updates the passwordChangedAt field to the current date and time minus 1000 milliseconds.
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//! filter out inactive user
userSchema.pre(/^find/, function (next) {
  //this point to current query
  this.find({ active: { $ne: false } }); //this will get all the active users with true
  next();
});
//!

//!instance method //is a method that avaliable for certain collection
userSchema.methods.correctPassword = async function (
  //methd bassically allow us to add methods(method is like function) to certain model
  candidatePassword,
  userPassword,
) {
  const result = await bcrypt.compare(candidatePassword, userPassword);
  return result;
};

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
userSchema.methods.createPasswordResetToken = function () {
  const randRestToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(randRestToken)
    .digest('hex'); //this is for security reasons we dont want to save plain passwords reset token
  this.passwordResetExpired = Date.now() + 10 * 60 * 1000; //this is for security reasons we dont want to keep the password reset token forever
  return randRestToken;
};

//!

export const User = mongoose.model('User', userSchema);
