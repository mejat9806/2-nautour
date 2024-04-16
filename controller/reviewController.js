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
  const reviews = await Review.create(req.body);

  res.status(200).json({
    status: 'ok',
    data: {
      reviews,
    },
  });
});
