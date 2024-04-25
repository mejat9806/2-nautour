import Tour from '../model/tourModel.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getOverView = catchAsync(async (req, res, next) => {
  // 1) get tour data from collection
  const tours = await Tour.find();
  // 2) build template
  // 3) render the template
  res.status(200).render('overview', {
    title: 'ALl tours',
    tours,
  });
});
export const getTourView = catchAsync(async (req, res) => {
  console.log(req.params.slug);
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'reviw rating user',
  });
  res.status(200).render('tour', {
    tour,
  });
});

// export const getOverView = (req, res) => {
//   res.status(200).render('base', {
//     tour: 'Forest hiker',
//     user: 'amer',
//   });
// };
