import Tour from '../model/tourModel.js';
import { User } from '../model/userModel.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getOverView = catchAsync(async (req, res, next) => {
  // 1) get tour data from collection
  const tours = await Tour.find();
  // 2) build template
  // 3) render the template
  res.status(200).render('overview', {
    title: 'ALL tours',
    tours,
  });
});
export const getTourView = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'reviw rating user',
  });
  if (!tour) return next(AppError('there is no tour with that name', 404));
  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
});

export const getLoginView = (req, res) => {
  res.status(200).render('login', { title: 'Login' });
};

export const getAccount = (req, res) => {
  res.status(200).render('account', { title: 'your account' });
};

export const upadateUserdata = catchAsync(async (req, res, next) => {
  const UpdateUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true, runValidators: true },
  );
  res
    .status(200)
    .render('account', { title: 'your account', user: UpdateUser });
});
