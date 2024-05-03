import express from 'express';
import {
  createBooking,
  deleteBooking,
  getAllBooking,
  getCheckoutSession,
  getOneBooking,
  updateBooking,
} from '../controller/bookingController.js';
import { protect, restrictTo } from '../controller/authController.js';

export const router = express.Router();
router.use(protect);
router.get('/checkout-session/:tourId', getCheckoutSession); //need to id to fill out the tour data

router.use(restrictTo('admin', 'lead-guide'));

router.get('/', getAllBooking).post(createBooking);

router
  .route('/:id')
  .get(getOneBooking)
  .delete(deleteBooking)
  .patch(updateBooking);
