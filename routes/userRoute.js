import express from 'express';
import {
  createUser,
  deleteMe,
  deleteUser,
  getAlluser,
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
} from '../controller/authController.js';

export const router = express.Router(); //this is called mounting the router
//!auth route
router.post('/signup', signUp);
router.patch('/signup/:token', confirmSignUp);

router.post('/login', login);
router.patch('/updateYourData', protect, updateME);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword); //use patch because we only want to update the password
router.patch('/updateMyPassword', protect, passwordUpdate);
router.delete('/deleteMe', protect, deleteMe); //thsi dont really delete it because we only disable the account
//!
//! this is the rest arch
router.route('/').get(getAlluser).post(createUser);
router.route('/:id').get(getUser).patch(patchUser).delete(deleteUser);
//!

//!what in here is the handler
