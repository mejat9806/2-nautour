import express from 'express';
import {
  getLoginView,
  getOverView,
  getTourView,
} from '../controller/viewController.js';
import { isLogin } from '../controller/authController.js';

export const router = express.Router();

//!pug routes//
router.use(isLogin);
router.get('/', getOverView);

router.get('/tours/:slug', getTourView);

router.get('/login', getLoginView);

//!router
