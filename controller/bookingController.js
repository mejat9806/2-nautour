import dotenv from 'dotenv';

import Stripe from 'stripe';
import Tour from '../model/tourModel.js';
import { catchAsync } from '../utils/catchAsync.js';
import { Booking } from '../model/bookingModel.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';

dotenv.config({ path: './.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const getCheckoutSession = catchAsync(async (req, res, next) => {
  //! get currently book tour
  console.log();
  const tour = await Tour.findById(req.params.tourId);
  console.log(tour.slug);
  //!2 create checkout session
  const session = await stripe.checkout.sessions.create({
    mode: `payment`,
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&pricee${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    line_items: [
      //this is the information for the product //if there is multiple item use map to loop
      {
        quantity: 1,
        price_data: {
          unit_amount: tour.price * 100,
          currency: 'MYR',
          product_data: {
            name: `${tour.name} Tour`,
            description: `${tour.summary}`,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          },
        },
      },
    ],
  });
  //!3 create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

export const createBookingCheckout = catchAsync(async (req, res, next) => {
  //this is only temperory fbecause it is not secure
  // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
  const { tour, user, price } = req.query;

  if (!tour && !user && !price) return next();
  await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});

export const createBooking = createOne(Booking);
export const getAllBooking = getAll(Booking);
export const getOneBooking = getOne(Booking);
export const deleteBooking = deleteOne(Booking);
export const updateBooking = updateOne(Booking);
