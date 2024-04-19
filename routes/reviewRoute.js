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

router.use(protect);
router
  .route('/')
  .get(restrictTo('user'), getAllReviews)
  .post(protect, restrictTo('user'), setTourUserId, createReview);

router.use(protect); //proctect all routes after this
router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), patchReview)
  .delete(restrictTo('user', 'admin'), deleteReview);
