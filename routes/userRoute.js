import express from 'express';
import {
  createUser,
  deleteMe,
  deleteUser,
  getAlluser,
  getMe,
  getUser,
  patchUser,
  updateME,
} from '../controller/userController.js';
import {
  resetPassword,
  forgotPassword,
  login,
  signUp,
  passwordUpdate,
  protect,
  confirmSignUp,
  restrictTo,
  logOut,
  // refreshToken,
} from '../controller/authController.js';

export const router = express.Router(); //this is called mounting the router
//!auth route

// router.post('/refresh', refreshToken);
router.post('/signup', signUp);
router.patch('/signup/:token', confirmSignUp);
router.post('/login', login);
// router.post('/logout', logOut);
router.get('/logout', logOut);
router.patch('/resetPassword/:token', resetPassword); //use patch because we only want to update the password
router.post('/forgotPassword', forgotPassword); //the forgot password will genereate the reset token for reset password

router.use(protect); //this middleware will make sure that all middlewares after this get protected
router.patch('/updateYourData', updateME);
router.get('/me', getMe, getUser);
router.patch('/updateMyPassword', passwordUpdate);
router.delete('/deleteMe', deleteMe); //thsi dont really delete it because we only disable the account
//!
//! this is the rest arch
router.use(restrictTo('admin')); //you need to be admin to access this route
router.route('/').get(getAlluser).post(createUser);
router.route('/:id').get(getUser).patch(patchUser).delete(deleteUser);
//!

//!what in here is the handler
