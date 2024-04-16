import express from 'express';
import { creteaReview, getAllReviews } from '../controller/reviewController.js';
import { protect } from '../controller/authController.js';

export const router = express.Router();

router.route('/').get(protect, getAllReviews).post(creteaReview);
