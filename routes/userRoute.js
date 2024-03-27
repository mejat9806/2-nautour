import express from 'express';
import {
  createUser,
  deleteUser,
  getAlluser,
  getUser,
  patchUser,
} from '../controller/userController.js';

export const router = express.Router(); //this is called mounting the router

router.route('/').get(getAlluser).post(createUser);
router.route('/:id').get(getUser).patch(patchUser).delete(deleteUser);

//!what in here is the handler
