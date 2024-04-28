import express from 'express';
import {
  getLoginView,
  getOverView,
  getTourView,
} from '../controller/viewController.js';
import { isLogin } from '../controller/authController.js';

export const router = express.Router();

//!pug routes//
router.get('/', isLogin, getOverView);

router.get('/tour/:slug', isLogin, getTourView);

router.get('/login', getLoginView);

//!router
