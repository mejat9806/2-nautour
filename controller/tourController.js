/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-object-spread */
//! for all of the handlers
//!this C part of MVC

import Tour from '../model/tourModel.js';
import { APIfeature } from '../utils/apiFeature.js';

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
export async function getAllTours(req, res) {
  try {
    const amountOfDoc = await Tour.countDocuments();

    // const feature = new APIfeature(Tour.find(), req.query) //the tour.find is the query obj and req.query is the query stirng
    //   .filter()
    //   .sort()
    //   .limitFields()
    //   .pagination();
    // const allTours = await feature.query;
    //!function version
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
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
}

export async function getTour(req, res) {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',

      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      timeRequesteds: req.requestTimes,

      message: error.message,
    });
  }
}
export async function postTour(req, res) {
  // const newTour = new Tour({});
  // newTour.save();
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success full',
      data: {
        //tour: newTour,
        newTour,
      },
    });
  } catch (error) {
    //when error happens we send back this message.the error happen is the req.body fail to complying to the Tour model
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}
export async function patchTour(req, res) {
  try {
    const editedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        editedTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
}
export async function deleteTour(req, res) {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({});
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
}

//!aggregation pipeline
//!use to create aggregated data like calculated average ,minmax
export async function getTourstats(req, res) {
  try {
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
  } catch (error) {
    res.status(404).json({
      status: 'fali',
      message: error.message,
    });
  }
}
//!what in here is the handler

export async function getmonthlyPlan(req, res) {
  try {
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
      status: 'success link',
      message: 'working',
      data: { plan },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fali',
      message: error.message,
    });
  }
}
