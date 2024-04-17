import { Review } from '../model/reviewModel.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'ok',
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
  const reviews = await Review.create(req.body);

  res.status(200).json({
    status: 'ok',
    data: {
      reviews,
    },
  });
});
