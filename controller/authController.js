/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config({ path: '../config.env' });

import { catchAsync } from '../utils/catchAsync.js';
import { User } from '../model/userModel.js';
import { AppError } from '../utils/appError.js';

function signToken(userID) {
  const token = jwt.sign({ id: userID._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}
export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    //! like this because this will only allow data that we want user to input to prevent users to manually add is admin
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmed: req.body.passwordConfirmed,
  });

  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'User succeffully created',
    token,
    data: { user: newUser },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //!step for check login credential
  //!1) check email and password if it exists
  if (!email || !password) {
    const err = AppError('please provide email and password', 400);
    return next(err); //finish because we want to stop the function here
  }
  //!
  //!2) check is the user exist password is correct
  const user = await User.findOne({ email: email }).select('+password'); //select use to get the password from DB eventhough they are on selected by default refer to password in userModel
  if (!user || !(await user.correctPassword(password, user.password))) {
    const err = AppError('please provide correct Email or password  ', 401);
    return next(err);
  }
  //!3) if everything ok ,send the token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
