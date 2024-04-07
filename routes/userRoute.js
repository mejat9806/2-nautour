import express from 'express';
import {
  createUser,
  deleteUser,
  getAlluser,
  getUser,
  patchUser,
} from '../controller/userController.js';
import { signUp } from '../controller/authController.js';

export const router = express.Router(); //this is called mounting the router
//!auth route
router.post('/signup', signUp);
//!
//! this is the rest arch
router.route('/').get(getAlluser).post(createUser);
router.route('/:id').get(getUser).patch(patchUser).delete(deleteUser);
//!
//!what in here is the handler
