import express from 'express';
import {
  getAccount,
  getLoginView,
  getOverView,
  getTourView,
  upadateUserdata,
} from '../controller/viewController.js';
import { isLogin, protect } from '../controller/authController.js';

export const router = express.Router();

//!pug routes//
router.get('/', isLogin, getOverView);
router.get('/tour/:slug', isLogin, getTourView);
router.get('/login', isLogin, getLoginView);
router.get('/me', protect, getAccount);
router.post('/submit-user-data', protect, upadateUserdata);

//!router
