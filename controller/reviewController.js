import { Review } from '../model/reviewModel.js';
// import { catchAsync } from '../utils/catchAsync.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';

// export const getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};

//   if (req.params.tourId) {
//     //this will only run if we in nested routes
//     filter = { tour: req.params.tourId }; //this wll update the filter with the tour id
//   }

//   const reviews = await Review.find(filter);

//   res.status(200).json({
//     status: 'ok',
//     reviewsCount: reviews.length,
//     data: {
//       reviews,
//     },
//   });
// });
export const setTourUserId = (req, res, next) => {
  //!this middleWare will update the body before we get to createReview
  //this two below will add object (tour:tourId) and this two below will add object (user:userId) if it doesn't exist yet
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id; //this come from protect middleware
  next();
};
export const getAllReviews = getAll(Review);
export const getReview = getOne(Review);
export const createReview = createOne(Review);
export const deleteReview = deleteOne(Review);
export const patchReview = updateOne(Review);

// export const createReview = catchAsync(async (req, res, next) => {
//   console.log(req.body, 'ok');
//   const reviews = await Review.create(req.body);

//   res.status(200).json({
//     status: 'ok',
//     data: {
//       reviews,
//     },
//   });
// });
// export const createReview = catchAsync(async (req, res, next) => {
//   //Allows nested route
//   //this two below will add object (tour:tourId) and this two below will add object (user:userId) if it doesn't exist yet
//   if (!req.body.tour) req.body.tour = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id; //this come from protect middleware
//   console.log(req.body, 'ok');
//   const reviews = await Review.create(req.body);

//   res.status(200).json({
//     status: 'ok',
//     data: {
//       reviews,
//     },
//   });
// });
