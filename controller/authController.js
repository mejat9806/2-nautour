/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
dotenv.config({ path: '../config.env' });
import { promisify } from 'util';
import { catchAsync } from '../utils/catchAsync.js';
import { User } from '../model/userModel.js';
import { AppError } from '../utils/appError.js';
import { sendEmail } from '../utils/email.js';

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

//!password reset

export const forgotPassword = catchAsync(async (req, res, next) => {
  // Step 1: Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(AppError('user not found', 404));
  }
  // Step 2: Generate random reset token

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // Step 3: Send the reset token back as an email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/resetPassword/${resetToken}`; //this way to get the url from the request
  const message = `forgot your password? Submit a PATCH request with your new password and passwordConfirm to ${resetURL}.\n if you did not forget your password ,pls ignore this message`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'your password reset token valid for 10 min',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'your reset token  password email have been send',
    });
  } catch (error) {
    console.log(error);
    user.passwordResetToken = undefined;
    user.passwordResetExpired = undefined; //this is hjust modified the data it did not save it we need to run save()
    await user.save({ validateBeforeSave: false });
    return next(AppError('There wass a error while sending a email ', 500));
  }
}); //! this will set the password Reset and expired to undefined to reset it so the user can request it again
//!
//!reset password
export const resetPassword = catchAsync(async (req, res, next) => {
  //! 1) get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpired: { $gt: Date.now() }, //this use to compare the expire time
  });
  //! 2) if yoken has not expired and there is user then set a new password
  if (!user) {
    return next(AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirmed = req.body.passwordConfirmed;
  user.passwordResetExpired = undefined;
  user.passwordResetToken = undefined; //this is hjust modified the data it did not save it we need to run save()
  await user.save();
  //! 3) update changedPasswordAt property for the user

  //! 4) log the user in ,send JWT
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

//! in user and password related we need to use Save() instead of findOneAndUpdate() because we need the validator
