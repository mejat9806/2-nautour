/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config({ path: '../config.env' });
import { promisify } from 'util';
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
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
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

//!this is for protect route
export const protect = catchAsync(async (req, res, next) => {
  // console.log('hello this form the protect middleware');
  let token;

  //!step 1  Get the token from client and check if it there
  if (
    // if this fail it will go straight to global error handler
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]; //this will get an array and we just use the [1]
  }
  if (!token) {
    return next(AppError('token did not exit', 401));
  }
  //!
  //! step 2 validate the token (check if the token is modified or expired)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //use to translate the token to readable object of string
  //!
  //! step 3 check if user is exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(AppError('User no longer exist'), 401);
  }
  //!
  //! step 4 check if user changed password after jwt token was issues token is issued on login
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(AppError('User changed password recently'), 401);
  }
  //!
  //Grant access to protected route
  req.user = currentUser; // we update the req.user to use in next middleware ,we can update req
  next();
});
//!

//!role based authentication
export function restrictTo(...roles) {
  //roles is an array of agurment
  //you cant pass argument to middleware but we can bypass this by wrap it in function and spread the agurment
  return (req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      //we can use this because it was set up by the previous middleware (protect) .
      return next(AppError('you did not have permission to access this', 403));
    }

    next();
  };
}
//!
