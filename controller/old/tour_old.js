/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-object-spread */
//! for all of the handlers

//!this C part of MVC
//?this controller will handle requests and responds only to or from user

import Tour from '../model/tourModel.js';
import { APIfeature } from '../utils/apiFeature.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

///!this is module way to use __dirname

// //! get data

//!middleware

//!
//!Route handlers
//! GET routes

//!Aliasing this for most popular routes
export function aliasTopTour(req, res, next) {
  //this middleware
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  //all all this will be place on the qeury string as a default when we go to /top-5-cheap
  next();
}

//!
export const getAllTours = catchAsync(async (req, res, next) => {
  const amountOfDoc = await Tour.countDocuments();

  const feature = await APIfeature(Tour, req);
  const allTours = await feature;
  //!send response
  res.status(200).json({
    status: 'success',
    amountOfDoc,
    timeRequesteds: req.requestTimes,
    result: allTours.length,
    data: {
      allTours,
    },
  });
});

export const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate('reviews');
  // .populate({
  //   path: 'guides',
  //   select: '-__v -passwordChangedAt',
  // }); //this is for referencing data for the tour in a query(find)
  if (!tour) {
    const err = AppError('Tour not found', 404);
    return next(err);
  }
  res.status(200).json({
    status: 'success',
    timeRequesteds: req.requestTimes,
    data: {
      tour,
    },
  });
});

export const postTour = catchAsync(async (req, res, next) => {
  // const newTour = new Tour({});
  // newTour.save();

  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'successful',
    data: {
      //tour: newTour,
      newTour,
    },
  });
});
export const patchTour = catchAsync(async (req, res, next) => {
  const editedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  editedTour;
  if (!editedTour) {
    const err = AppError('Tour not found', 404);
    return next(err);
  }
  res.status(200).json({
    status: 'success',
    data: {
      editedTour,
    },
  });
});
export const deleteTour = catchAsync(async (req, res, next) => {
  const deletedTour = await Tour.findByIdAndDelete(req.params.id);
  deletedTour;
  if (!deletedTour) {
    const err = AppError('Tour not found', 404);
    return next(err);
  }
  res.status(204).json({
    status: 'success',
    message: 'Tour deleted successfully',
  });
});

//!aggregation pipeline
//!use to create aggregated data like calculated average ,minmax
export const getTourstats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }, //match will filter out data that only match certain criteria for the next state in the pipeline
    },
    {
      $group: {
        //group allows us to group data using acumulator like cal average
        _id: { $toLower: `$difficulty` }, //with this we will get the data grouped by the difficulty //toUpper is uppercase
        numsTour: { $sum: 1 },
        numRatings: { $sum: `$ratingsQuantity` },
        avgRating: { $avg: `$ratingsAverage` },
        avgPrice: { $avg: `$price` },
        minPrice: { $min: `$price` },
        maxPrie: { $max: `$price` },
      },
    },
    {
      $sort: { avgPrice: 1 }, // will sort the data by avgPrice ascending we use avgPrice because we need to use the previous state data
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } },
    // },
    // {
    //   $group: {
    //     //group allows us to group data using acumulator like cal average
    //     _id: null, //id will determited what is our data group by //null beacuse we want to make all data in one group
    //     numsTour: { $sum: 1 },
    //     numRatings: { $sum: `$ratingsQuantity` },
    //     avgRating: { $avg: `$ratingsAverage` },
    //     avgPrice: { $avg: `$price` },
    //     minPrice: { $min: `$price` },
    //     maxPrie: { $max: `$price` },
    //   },
    // },
  ]);
  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});
//!what in here is the handler

export const getmonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: `$startDates`, //!Deconstructs an array field from the input documents to output a document for each element. Each output document is the input document with the value of the array field replaced by the element.//example here will create new document with eacth of start dates
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        numTourStarts: { $sum: 1 }, //this will add 1 each time it get the same months
        tours: { $push: { name: `$name`, image: `$imageCover` } }, //this push operator will push the name from the tour into an array base on date
        _id: { $month: `$startDates` }, //this month will get the month num from the startDates in match
      },
    },
    {
      $addFields: { month: `$_id` }, //this will add a field with month as a key an the id as a value
    },
    {
      $project: {
        _id: 0, //this use to remove the field
      },
    },
    {
      $sort: { numTourStarts: 1 },
    },
  ]);
  res.status(200).json({
    status: 'success aggregate',
    message: 'working',
    data: { plan },
  });
});
