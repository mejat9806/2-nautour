import { Review } from '../model/reviewModel.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.params.tourId) {
    //this will only run if we in nested routes
    filter = { tour: req.params.tourId }; //this wll update the filter with the tour id
  }

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'ok',
    reviewsCount: reviews.length,
    data: {
      reviews,
    },
  });
});

export const creteaReview = catchAsync(async (req, res, next) => {
  //Allows nested route
  //this two below will add object (tour:tourId) and this two below will add object (user:userId) if it doesn't exist yet
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id; //this come from protect middleware
  req.body, 'ok';
  const reviews = await Review.create(req.body);

  res.status(200).json({
    status: 'ok',
    data: {
      reviews,
    },
  });
});
