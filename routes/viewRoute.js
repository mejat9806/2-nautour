import express from 'express';
import {
  getAccount,
  getLoginView,
  getMyTours,
  getOverView,
  getTourView,
  upadateUserdata,
} from '../controller/viewController.js';
import { isLogin, protect } from '../controller/authController.js';
import { createBookingCheckout } from '../controller/bookingController.js';

export const router = express.Router();

//!pug routes//
router.get('/', createBookingCheckout, isLogin, getOverView);
router.get('/tour/:slug', isLogin, getTourView);
router.get('/login', isLogin, getLoginView);
router.get('/me', protect, getAccount);
router.get('/my-tours', protect, getMyTours);
router.post('/submit-user-data', protect, upadateUserdata);

//!router
