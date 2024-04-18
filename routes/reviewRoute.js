import express from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  patchReview,
  setTourUserId,
} from '../controller/reviewController.js';
import { protect, restrictTo } from '../controller/authController.js';

export const router = express.Router({
  mergeParams: true, //this will allow review to access other routes params like to access tourId /:tourId/reviews
});

router
  .route('/')
  .get(protect, restrictTo('user'), getAllReviews)
  .post(protect, restrictTo('user'), setTourUserId, createReview);

router
  .route('/:id')
  .get(getReview)
  .delete(protect, restrictTo('user'), deleteReview)
  .patch(protect, restrictTo('user'), patchReview);
